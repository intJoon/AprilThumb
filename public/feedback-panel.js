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

  let cachedCount = 0;
  let loadState = "idle";

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

  function setLoadState(state) {
    loadState = state;
    if (!details.open) return;
    loading.hidden = state !== "loading";
    errorEl.hidden = state !== "error";
    empty.hidden = true;
    list.hidden = state === "loading" || state === "error";
  }

  function renderList(items, highlightNewest = false) {
    list.replaceChildren();
    list.hidden = false;
    if (loadState === "loading" || loadState === "error") return;

    if (!items.length) {
      empty.hidden = false;
      return;
    }
    empty.hidden = true;
    for (const item of items) list.appendChild(renderBubble(item, ctx));
    if (highlightNewest && items.length) {
      const newest = list.firstElementChild;
      if (newest) {
        newest.classList.add("comment-bubble--new");
        setTimeout(() => newest.classList.remove("comment-bubble--new"), HIGHLIGHT_MS);
      }
    }
  }

  async function refresh(highlightNewest = false) {
    const track = ctx.selectedTrack();
    const lang = ctx.selectedLang();
    updateLabels();
    if (!track || !lang) {
      section.hidden = true;
      details.open = false;
      return;
    }
    section.hidden = false;

    if (details.open) {
      setLoadState("loading");
    }

    try {
      const items = await fetchAllComments();
      cachedCount = items.length;
      updateSummary();
      if (details.open) {
        setLoadState("ok");
        renderList(items, highlightNewest);
      }
    } catch {
      if (details.open) {
        setLoadState("error");
        list.replaceChildren();
        list.hidden = true;
      }
    }
  }

  details.addEventListener("toggle", () => {
    setDisclosureAria();
    if (details.open) refresh();
  });

  retryBtn.addEventListener("click", () => refresh());

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
      await refresh(true);
    } catch {
      ctx.showToast(ctx.ui("commentsError"));
    } finally {
      submitBtn.disabled = false;
      submitBtn.removeAttribute("aria-busy");
    }
  });

  updateLabels();

  return { updateLabels, refresh };
}
