export const API = "/api/comments";

export function formatRelative(iso, ui) {
  const then = new Date(iso).getTime();
  const diff = Math.max(0, Date.now() - then);
  const mins = Math.floor(diff / 60000);
  if (mins < 1) return ui("commentsJustNow");
  if (mins < 60) return ui("commentsMinutesAgo").replace("{n}", String(mins));
  const hours = Math.floor(mins / 60);
  if (hours < 24) return ui("commentsHoursAgo").replace("{n}", String(hours));
  const days = Math.floor(hours / 24);
  return ui("commentsDaysAgo").replace("{n}", String(days));
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

export function renderBubble(item, ctx) {
  const li = document.createElement("li");
  li.className = "comment-bubble";
  li.innerHTML = `<p class="comment-meta"></p>
<p class="comment-body"></p>
<time class="comment-when"></time>`;
  li.querySelector(".comment-meta").textContent = formatMeta(item, ctx);
  li.querySelector(".comment-body").textContent = item.body;
  const when = li.querySelector(".comment-when");
  when.dateTime = item.createdAt;
  when.textContent = formatRelative(item.createdAt, ctx.ui);
  return li;
}

export async function fetchAllComments(signal) {
  const res = await fetch(API, signal ? { signal } : undefined);
  if (!res.ok) throw new Error("load");
  const data = await res.json();
  return Array.isArray(data.comments) ? data.comments : [];
}

export async function postComment({ track, lang, body, website = "" }) {
  const res = await fetch(API, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ track, lang, body, website }),
  });
  if (!res.ok) throw new Error("post");
}
