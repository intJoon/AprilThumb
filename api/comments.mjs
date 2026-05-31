import { getSql } from "../lib/db.mjs";
import { isValidLocale, isValidTrack } from "../lib/manifest.mjs";

const MAX_BODY = 500;
const LIST_LIMIT = 200;

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

    try {
      let rows;
      if (track && lang) {
        rows = await sql`
          SELECT id, track_id AS "trackId", locale, body, created_at AS "createdAt"
          FROM comments
          WHERE track_id = ${track} AND locale = ${lang}
          ORDER BY created_at DESC
          LIMIT ${LIST_LIMIT}
        `;
      } else if (track) {
        rows = await sql`
          SELECT id, track_id AS "trackId", locale, body, created_at AS "createdAt"
          FROM comments
          WHERE track_id = ${track}
          ORDER BY created_at DESC
          LIMIT ${LIST_LIMIT}
        `;
      } else {
        rows = await sql`
          SELECT id, track_id AS "trackId", locale, body, created_at AS "createdAt"
          FROM comments
          ORDER BY created_at DESC
          LIMIT ${LIST_LIMIT}
        `;
      }
      return json(res, 200, { comments: rows });
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
      const inserted = await sql`
        INSERT INTO comments (track_id, locale, body)
        VALUES (${track}, ${lang}, ${body})
        RETURNING id, track_id AS "trackId", locale, body, created_at AS "createdAt"
      `;
      return json(res, 201, { comment: inserted[0] });
    } catch {
      return json(res, 500, { error: "write_failed" });
    }
  }

  res.setHeader("Allow", "GET, POST");
  return json(res, 405, { error: "method_not_allowed" });
}
