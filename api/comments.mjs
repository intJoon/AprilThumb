import { createHmac } from "node:crypto";
import { getSql } from "../lib/db.mjs";
import { isValidLocale, isValidTrack } from "../lib/manifest.mjs";

const MAX_BODY = 500;
const DEFAULT_PAGE_SIZE = 5;
const MAX_PAGE_SIZE = 100;
const DAILY_POST_LIMIT = 2;

function json(res, status, body) {
  res.statusCode = status;
  res.setHeader("Content-Type", "application/json; charset=utf-8");
  res.setHeader("Cache-Control", "no-store");
  res.end(JSON.stringify(body));
}

function noDb(res) {
  json(res, 503, { error: "comments_unavailable" });
}

function parseBody(raw) {
  if (!raw) return null;
  try {
    return JSON.parse(raw);
  } catch {
    return null;
  }
}

async function readJsonBody(req) {
  const chunks = [];
  for await (const chunk of req) chunks.push(chunk);
  return parseBody(Buffer.concat(chunks).toString("utf8"));
}

function clientIp(req) {
  const forwarded = req.headers["x-forwarded-for"];
  if (Array.isArray(forwarded)) return forwarded[0] || "unknown";
  return String(forwarded || req.socket?.remoteAddress || "unknown")
    .split(",")[0]
    .trim();
}

function dailyRateLimitIdentity(req) {
  const secret = process.env.RATE_LIMIT_SECRET;
  if (!secret) return null;
  const day = new Date().toISOString().slice(0, 10);
  const ipHash = createHmac("sha256", secret)
    .update(`${day}\n${clientIp(req)}`)
    .digest("hex");
  return { day, ipHash };
}

async function insertComment(sql, req, track, lang, body) {
  const identity = dailyRateLimitIdentity(req);
  if (!identity) return null;
  return sql`
    WITH cleanup AS (
      DELETE FROM feedback_rate_limits
      WHERE day < CAST(${identity.day} AS date) - 7
      RETURNING 1
    ),
    quota AS (
      INSERT INTO feedback_rate_limits (day, ip_hash, post_count)
      VALUES (${identity.day}, ${identity.ipHash}, 1)
      ON CONFLICT (day, ip_hash) DO UPDATE
      SET post_count = feedback_rate_limits.post_count + 1
      WHERE feedback_rate_limits.post_count < ${DAILY_POST_LIMIT}
      RETURNING 1
    )
    INSERT INTO comments (track_id, locale, body)
    SELECT ${track}, ${lang}, ${body} FROM quota
    RETURNING id, track_id AS "trackId", locale, body, created_at AS "createdAt"
  `;
}

export default async function handler(req, res) {
  const sql = getSql();
  if (!sql) return noDb(res);

  if (req.method === "GET") {
    const url = new URL(req.url || "/", "http://localhost");
    const track = url.searchParams.get("track");
    const lang = url.searchParams.get("lang");

    if (track && !isValidTrack(track)) {
      return json(res, 400, { error: "invalid_track" });
    }
    if (lang && !isValidLocale(lang)) {
      return json(res, 400, { error: "invalid_locale" });
    }

    const limitRaw = parseInt(url.searchParams.get("limit") || String(DEFAULT_PAGE_SIZE), 10);
    const offsetRaw = parseInt(url.searchParams.get("offset") || "0", 10);
    const limit = Math.min(
      Math.max(Number.isFinite(limitRaw) ? limitRaw : DEFAULT_PAGE_SIZE, 1),
      MAX_PAGE_SIZE
    );
    const offset = Math.max(Number.isFinite(offsetRaw) ? offsetRaw : 0, 0);

    try {
      let rows;
      let total;
      if (track && lang) {
        const countRows = await sql`
          SELECT COUNT(*)::int AS total FROM comments
          WHERE track_id = ${track} AND locale = ${lang}
        `;
        total = countRows[0]?.total ?? 0;
        rows = await sql`
          SELECT id, track_id AS "trackId", locale, body, created_at AS "createdAt"
          FROM comments
          WHERE track_id = ${track} AND locale = ${lang}
          ORDER BY created_at DESC
          LIMIT ${limit} OFFSET ${offset}
        `;
      } else if (track) {
        const countRows = await sql`
          SELECT COUNT(*)::int AS total FROM comments
          WHERE track_id = ${track}
        `;
        total = countRows[0]?.total ?? 0;
        rows = await sql`
          SELECT id, track_id AS "trackId", locale, body, created_at AS "createdAt"
          FROM comments
          WHERE track_id = ${track}
          ORDER BY created_at DESC
          LIMIT ${limit} OFFSET ${offset}
        `;
      } else {
        const countRows = await sql`SELECT COUNT(*)::int AS total FROM comments`;
        total = countRows[0]?.total ?? 0;
        rows = await sql`
          SELECT id, track_id AS "trackId", locale, body, created_at AS "createdAt"
          FROM comments
          ORDER BY created_at DESC
          LIMIT ${limit} OFFSET ${offset}
        `;
      }
      return json(res, 200, {
        comments: rows,
        total,
        hasMore: offset + rows.length < total,
      });
    } catch {
      return json(res, 500, { error: "read_failed" });
    }
  }

  if (req.method === "POST") {
    const payload = await readJsonBody(req);
    if (!payload) return json(res, 400, { error: "invalid_json" });

    if (payload.website) return json(res, 200, { ok: true });

    const track = payload.track;
    const lang = payload.lang ?? payload.locale;
    const body =
      typeof payload.body === "string" ? payload.body.trim() : "";

    if (!isValidTrack(track)) return json(res, 400, { error: "invalid_track" });
    if (!isValidLocale(lang)) return json(res, 400, { error: "invalid_locale" });
    if (!body || body.length > MAX_BODY) {
      return json(res, 400, { error: "invalid_body" });
    }

    try {
      const inserted = await insertComment(sql, req, track, lang, body);
      if (inserted === null) {
        return json(res, 503, { error: "rate_limit_unavailable" });
      }
      if (!inserted.length) {
        res.setHeader("Retry-After", "86400");
        return json(res, 429, { error: "rate_limited" });
      }
      return json(res, 201, { comment: inserted[0] });
    } catch {
      return json(res, 500, { error: "write_failed" });
    }
  }

  res.setHeader("Allow", "GET, POST");
  return json(res, 405, { error: "method_not_allowed" });
}
