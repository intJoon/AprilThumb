export const API = "/api/comments";
export const COMMENTS_PAGE_SIZE = 5;

const commentClamps = [];

export function formatAbsolute(iso, locale = "en-GB") {
  const date = new Date(iso);
  if (Number.isNaN(date.getTime())) return "";
  try {
    return new Intl.DateTimeFormat(locale, {
      year: "numeric",
      month: "short",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    }).format(date);
  } catch {
    const y = date.getFullYear();
    const m = String(date.getMonth() + 1).padStart(2, "0");
    const d = String(date.getDate()).padStart(2, "0");
    const hh = String(date.getHours()).padStart(2, "0");
    const mm = String(date.getMinutes()).padStart(2, "0");
    return `${y}-${m}-${d} ${hh}:${mm}`;
  }
}

export function escapeText(s) {
  return s
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}

export function formatMeta(item, ctx) {
  return `${ctx.langLabel(item.locale)} · ${ctx.trackLabel(item.trackId)}`;
}

export function remountCommentClamps() {
  for (let i = commentClamps.length - 1; i >= 0; i -= 1) {
    const entry = commentClamps[i];
    if (!entry.bodyEl.isConnected) {
      commentClamps.splice(i, 1);
      continue;
    }
    entry.sync();
  }
}

export function wireCommentBodyClamp(bodyEl, toggleEl, labels) {
  const expandLabel = labels?.expand || "Expand";
  const collapseLabel = labels?.collapse || "Collapse";
  const sync = () => {
    const expanded = bodyEl.classList.contains("is-expanded");
    bodyEl.classList.remove("is-expanded");
    bodyEl.classList.add("is-clamped");
    const needsToggle = bodyEl.scrollHeight > bodyEl.clientHeight + 1;
    if (!needsToggle) {
      bodyEl.classList.remove("is-clamped");
      toggleEl.hidden = true;
      return;
    }
    toggleEl.hidden = false;
    if (expanded) {
      bodyEl.classList.remove("is-clamped");
      bodyEl.classList.add("is-expanded");
      toggleEl.textContent = collapseLabel;
    } else {
      toggleEl.textContent = expandLabel;
    }
  };
  toggleEl.addEventListener("click", () => {
    const expanded = bodyEl.classList.toggle("is-expanded");
    bodyEl.classList.toggle("is-clamped", !expanded);
    toggleEl.textContent = expanded ? collapseLabel : expandLabel;
  });
  commentClamps.push({ bodyEl, sync });
  requestAnimationFrame(() => requestAnimationFrame(sync));
}

export function renderBubble(item, ctx) {
  const li = document.createElement("li");
  li.className = "comment-bubble";

  const meta = document.createElement("p");
  meta.className = "comment-meta";
  meta.textContent = formatMeta(item, ctx);

  const body = document.createElement("p");
  body.className = "comment-body";
  body.textContent = item.body || "";

  const toggle = document.createElement("button");
  toggle.type = "button";
  toggle.className = "comment-expand";
  toggle.hidden = true;

  const when = document.createElement("time");
  when.className = "comment-when";
  when.dateTime = item.createdAt;
  when.textContent = formatAbsolute(item.createdAt, ctx.selectedLang?.() || "en-GB");

  li.append(meta, body, toggle, when);
  wireCommentBodyClamp(body, toggle, {
    expand: ctx.ui("commentsExpandBody"),
    collapse: ctx.ui("commentsCollapseBody"),
  });
  return li;
}

export async function fetchCommentsPage({ offset = 0, limit = COMMENTS_PAGE_SIZE, signal } = {}) {
  const url = `${API}?limit=${limit}&offset=${offset}`;
  const res = await fetch(url, signal ? { signal } : undefined);
  if (!res.ok) throw new Error("load");
  const data = await res.json();
  return {
    comments: Array.isArray(data.comments) ? data.comments : [],
    total: typeof data.total === "number" ? data.total : 0,
    hasMore: Boolean(data.hasMore),
  };
}

export async function fetchAllComments(signal) {
  const page = await fetchCommentsPage({ offset: 0, limit: COMMENTS_PAGE_SIZE, signal });
  return page.comments;
}

export async function postComment({ track, lang, body, website = "" }) {
  const res = await fetch(API, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ track, lang, body, website }),
  });
  if (res.status === 429) {
    const err = new Error("rate_limited");
    err.code = "rate_limited";
    throw err;
  }
  if (!res.ok) throw new Error("post");
  const data = await res.json();
  return data.comment ?? null;
}
