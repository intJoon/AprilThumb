import {
  fetchAllComments,
  postComment,
  renderBubble,
  formatMeta,
} from "./comments-lib.js";

const MAX_BODY = 500;
const WARN_AT = 450;
const HIGHLIGHT_MS = 2000;

function el(id) {
  return document.getElementById(id);
}

export function mountFeedbackPanel(ctx) {
  const section = el("feedback-section");
  const details = el("feedback-disclosure");
  const summaryLabel = el("feedback-summary-label");
  const list = el("feedback-list");
  const empty = el("feedback-empty");
  const loading = el("feedback-loading");
  const errorEl = el("feedback-error");
  const errorText = el("feedback-error-text");
  const retryBtn = el("btn-feedback-retry");
  const form = el("feedback-form");
  const meta = el("feedback-meta");
  const bodyInput = el("feedback-body");
  const charCount = el("feedback-char-count");
  const submitBtn = el("btn-feedback-submit");
  const labelBody = el("label-feedback-body");

  let cachedItems = null;
  let cachedCount = 0;
  let feedAbort = null;

  function contextLine() {
    const track = ctx.selectedTrack();
    const lang = ctx.selectedLang();
    if (!track || !lang) return "";
    return formatMeta({ trackId: track, locale: lang }, ctx);
  }

  function setDisclosureAria() {
    details.setAttribute(
      "aria-label",
      details.open ? ctx.ui("commentsCollapse") : ctx.ui("commentsExpand")
    );
  }

  function updateCharCount() {
    const len = bodyInput.value.length;
    charCount.textContent = `${len}/${MAX_BODY}`;
    charCount.classList.toggle("comment-char-count--warn", len >= WARN_AT);
    charCount.classList.toggle("comment-char-count--limit", len >= MAX_BODY);
  }

  function updateSummary() {
    if (cachedCount > 0) {
      summaryLabel.textContent = ctx
        .ui("commentsSummaryCount")
        .replace("{n}", String(cachedCount));
    } else {
      summaryLabel.textContent = ctx.ui("commentsTitle");
    }
  }

  function updateLabels() {
    updateSummary();
    bodyInput.placeholder = ctx.ui("commentsPlaceholder");
    submitBtn.textContent = ctx.ui("commentsSubmit");
    labelBody.textContent = ctx.ui("commentsPlaceholder");
    meta.textContent = contextLine();
    empty.textContent = ctx.ui("commentsEmpty");
    loading.textContent = ctx.ui("commentsLoading");
    errorText.textContent = ctx.ui("commentsLoadError");
    retryBtn.textContent = ctx.ui("commentsRetry");
    setDisclosureAria();
    updateCharCount();
  }

  function showLoading(show) {
    loading.hidden = !show;
    if (show) {
      errorEl.hidden = true;
      list.hidden = true;
      empty.hidden = true;
    }
  }

  function showError(show) {
    errorEl.hidden = !show;
    if (show) {
      loading.hidden = true;
      list.hidden = true;
      empty.hidden = true;
    }
  }

  function renderList(items, highlightNewest = false) {
    list.replaceChildren();
    showLoading(false);
    showError(false);
    if (!items.length) {
      list.hidden = false;
      empty.hidden = false;
      return;
    }
    empty.hidden = true;
    list.hidden = false;
    for (const item of items) list.appendChild(renderBubble(item, ctx));
    if (highlightNewest && items.length) {
      const newest = list.firstElementChild;
      if (newest) {
        newest.classList.add("comment-bubble--new");
        setTimeout(() => newest.classList.remove("comment-bubble--new"), HIGHLIGHT_MS);
      }
    }
  }

  function applyItems(items, highlightNewest = false) {
    cachedItems = items;
    cachedCount = items.length;
    updateSummary();
    if (details.open) renderList(items, highlightNewest);
  }

  async function prefetchCount() {
    if (feedAbort) feedAbort.abort();
    feedAbort = new AbortController();
    const signal = feedAbort.signal;
    try {
      const items = await fetchAllComments(signal);
      if (signal.aborted) return;
      applyItems(items);
    } catch (e) {
      if (e.name === "AbortError") return;
    }
  }

  async function loadFeed(highlightNewest = false) {
    if (!details.open) return;

    if (cachedItems) {
      renderList(cachedItems, highlightNewest);
    } else {
      showLoading(true);
    }

    if (feedAbort) feedAbort.abort();
    feedAbort = new AbortController();
    const signal = feedAbort.signal;

    try {
      const items = await fetchAllComments(signal);
      if (signal.aborted) return;
      applyItems(items, highlightNewest);
    } catch (e) {
      if (e.name === "AbortError") return;
      if (cachedItems) {
        renderList(cachedItems, highlightNewest);
        ctx.showToast(ctx.ui("commentsLoadError"));
        return;
      }
      showError(true);
      list.replaceChildren();
      list.hidden = true;
      empty.hidden = true;
    }
  }

  function syncSection() {
    const track = ctx.selectedTrack();
    const lang = ctx.selectedLang();
    updateLabels();
    if (!track || !lang) {
      section.hidden = true;
      details.open = false;
      return;
    }
    section.hidden = false;
  }

  details.addEventListener("toggle", () => {
    setDisclosureAria();
    if (details.open) loadFeed();
    else if (feedAbort) feedAbort.abort();
  });

  retryBtn.addEventListener("click", () => loadFeed());

  bodyInput.addEventListener("input", updateCharCount);

  form.addEventListener("submit", async (e) => {
    e.preventDefault();
    const track = ctx.selectedTrack();
    const lang = ctx.selectedLang();
    const body = bodyInput.value.trim();
    if (!track || !lang || !body) return;

    const honeypot = form.querySelector('[name="website"]');
    submitBtn.disabled = true;
    submitBtn.setAttribute("aria-busy", "true");
    try {
      await postComment({
        track,
        lang,
        body,
        website: honeypot?.value || "",
      });
      bodyInput.value = "";
      updateCharCount();
      ctx.showToast(ctx.ui("commentsPosted"));
      await loadFeed(true);
    } catch {
      ctx.showToast(ctx.ui("commentsError"));
    } finally {
      submitBtn.disabled = false;
      submitBtn.removeAttribute("aria-busy");
    }
  });

  updateLabels();

  return {
    updateLabels: () => {
      syncSection();
      updateLabels();
    },
    prefetchCount,
    refresh: loadFeed,
  };
}
