import {
  fetchCommentsPage,
  postComment,
  renderBubble,
  formatMeta,
  COMMENTS_PAGE_SIZE,
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
  const loadMoreWrap = el("feedback-load-more-wrap");
  const loadMoreBtn = el("btn-feedback-load-more");
  const form = el("feedback-form");
  const meta = el("feedback-meta");
  const bodyInput = el("feedback-body");
  const charCount = el("feedback-char-count");
  const submitBtn = el("btn-feedback-submit");
  const labelBody = el("label-feedback-body");

  let cachedItems = [];
  let cachedTotal = 0;
  let hasMore = false;
  let prefetchFailed = false;
  let loadingMore = false;
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

  function scrollPageToFeedback() {
    const motion = window.matchMedia("(prefers-reduced-motion: reduce)").matches
      ? "auto"
      : "smooth";
    requestAnimationFrame(() => {
      requestAnimationFrame(() => {
        section.scrollIntoView({ block: "start", behavior: motion });
      });
    });
  }

  function scrollListItem(node) {
    if (!node) return;
    const motion = window.matchMedia("(prefers-reduced-motion: reduce)").matches
      ? "auto"
      : "smooth";
    requestAnimationFrame(() => {
      node.scrollIntoView({ block: "nearest", behavior: motion });
    });
  }

  const inputMaxPx = () => {
    const line = parseFloat(getComputedStyle(bodyInput).lineHeight) || 25;
    return line * 5 + 28;
  };

  function autoResizeInput() {
    bodyInput.style.height = "auto";
    const cap = inputMaxPx();
    const h = Math.min(bodyInput.scrollHeight, cap);
    bodyInput.style.height = `${h}px`;
    bodyInput.style.overflowY = bodyInput.scrollHeight > cap ? "auto" : "hidden";
  }

  function updateCharCount() {
    const len = bodyInput.value.length;
    const show = len >= WARN_AT;
    charCount.classList.toggle("is-visible", show);
    if (show) {
      charCount.textContent = `${len}/${MAX_BODY}`;
      charCount.classList.toggle("comment-char-count--warn", len >= WARN_AT);
      charCount.classList.toggle("comment-char-count--limit", len >= MAX_BODY);
    } else {
      charCount.classList.remove("comment-char-count--warn", "comment-char-count--limit");
    }
    autoResizeInput();
  }

  function resetInputHeight() {
    bodyInput.value = "";
    bodyInput.style.height = "";
    bodyInput.style.overflowY = "hidden";
    updateCharCount();
  }

  function updateSummary() {
    if (prefetchFailed) {
      summaryLabel.textContent = ctx.ui("commentsSummaryLoadError");
    } else if (cachedTotal > 0) {
      summaryLabel.textContent = ctx
        .ui("commentsSummaryCount")
        .replace("{n}", String(cachedTotal));
    } else {
      summaryLabel.textContent = ctx.ui("commentsTitle");
    }
  }

  function updateLoadMore() {
    if (!loadMoreWrap || !loadMoreBtn) return;
    const show = details.open && cachedItems.length > 0 && hasMore;
    loadMoreWrap.hidden = !show;
    if (!show) {
      loadMoreBtn.disabled = false;
      loadMoreBtn.textContent = "";
      return;
    }
    loadMoreBtn.disabled = loadingMore;
    loadMoreBtn.textContent = loadingMore
      ? ctx.ui("commentsLoading")
      : ctx.ui("commentsLoadMore");
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
    updateLoadMore();
  }

  function showLoading(show) {
    loading.hidden = !show;
    if (show) {
      errorEl.hidden = true;
      list.hidden = true;
      empty.hidden = true;
      if (loadMoreWrap) loadMoreWrap.hidden = true;
    }
  }

  function showError(show) {
    errorEl.hidden = !show;
    if (show) {
      loading.hidden = true;
      list.hidden = true;
      empty.hidden = true;
      if (loadMoreWrap) loadMoreWrap.hidden = true;
    }
  }

  function renderList({ highlightIndex = -1, scrollToIndex = -1 } = {}) {
    list.replaceChildren();
    showLoading(false);
    showError(false);
    if (!cachedItems.length) {
      list.hidden = false;
      empty.hidden = false;
      updateLoadMore();
      return;
    }
    empty.hidden = true;
    list.hidden = false;
    for (const item of cachedItems) list.appendChild(renderBubble(item, ctx));
    if (highlightIndex >= 0 && list.children[highlightIndex]) {
      const node = list.children[highlightIndex];
      node.classList.add("comment-bubble--new");
      setTimeout(() => node.classList.remove("comment-bubble--new"), HIGHLIGHT_MS);
    }
    if (scrollToIndex >= 0 && list.children[scrollToIndex]) {
      scrollListItem(list.children[scrollToIndex]);
    }
    updateLoadMore();
  }

  function applyPage(page, { append = false, highlightIndex = -1, scrollToIndex = -1 } = {}) {
    cachedTotal = page.total;
    hasMore = append
      ? cachedItems.length + page.comments.length < page.total
      : page.hasMore;
    prefetchFailed = false;
    cachedItems = append ? [...cachedItems, ...page.comments] : page.comments;
    updateSummary();
    if (details.open) renderList({ highlightIndex, scrollToIndex });
    else updateLoadMore();
  }

  async function fetchPage(offset, signal, limit = COMMENTS_PAGE_SIZE) {
    return fetchCommentsPage({ offset, limit, signal });
  }

  async function prefetchCount() {
    if (feedAbort) feedAbort.abort();
    feedAbort = new AbortController();
    const signal = feedAbort.signal;
    try {
      if (details.open && cachedItems.length > COMMENTS_PAGE_SIZE) {
        const page = await fetchPage(0, signal, 1);
        if (signal.aborted) return;
        cachedTotal = page.total;
        hasMore = cachedItems.length < cachedTotal;
        prefetchFailed = false;
        updateSummary();
        updateLoadMore();
        return;
      }
      const page = await fetchPage(0, signal);
      if (signal.aborted) return;
      applyPage(page);
    } catch (e) {
      if (e.name === "AbortError") return;
      prefetchFailed = true;
      updateSummary();
    }
  }

  async function loadFeed() {
    if (!details.open) return;

    const keepLoaded = cachedItems.length;
    if (keepLoaded) {
      renderList();
    } else {
      showLoading(true);
    }

    if (feedAbort) feedAbort.abort();
    feedAbort = new AbortController();
    const signal = feedAbort.signal;
    const limit = Math.max(keepLoaded, COMMENTS_PAGE_SIZE);

    try {
      const page = await fetchPage(0, signal, limit);
      if (signal.aborted) return;
      applyPage(page);
    } catch (e) {
      if (e.name === "AbortError") return;
      if (cachedItems.length) {
        renderList();
        ctx.flashButton(retryBtn, ctx.ui("commentsLoadError"), {
          error: true,
          restoreText: ctx.ui("commentsRetry"),
        });
        return;
      }
      showError(true);
      list.replaceChildren();
      list.hidden = true;
      empty.hidden = true;
    }
  }

  async function loadMore() {
    if (!hasMore || loadingMore) return;
    const prevLen = cachedItems.length;
    loadingMore = true;
    updateLoadMore();
    try {
      const page = await fetchPage(prevLen);
      applyPage(page, { append: true, scrollToIndex: prevLen });
    } catch {
      ctx.flashButton(loadMoreBtn, ctx.ui("commentsLoadError"), {
        error: true,
        restoreText: ctx.ui("commentsLoadMore"),
      });
    } finally {
      loadingMore = false;
      updateLoadMore();
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
    if (details.open) {
      scrollPageToFeedback();
      loadFeed();
    } else if (feedAbort) feedAbort.abort();
  });

  retryBtn.addEventListener("click", () => loadFeed());
  loadMoreBtn?.addEventListener("click", () => loadMore());

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
      const comment = await postComment({
        track,
        lang,
        body,
        website: honeypot?.value || "",
      });
      resetInputHeight();
      const submitLabel = ctx.ui("commentsSubmit");
      ctx.flashButton(submitBtn, ctx.ui("commentsPosted"), { restoreText: submitLabel });
      if (comment) {
        cachedItems = [comment, ...cachedItems];
        cachedTotal += 1;
        hasMore = cachedItems.length < cachedTotal;
        prefetchFailed = false;
        updateSummary();
        if (details.open) renderList({ highlightIndex: 0 });
      } else {
        await prefetchCount();
      }
    } catch {
      const submitLabel = ctx.ui("commentsSubmit");
      ctx.flashButton(submitBtn, ctx.ui("commentsError"), {
        error: true,
        restoreText: submitLabel,
      });
    } finally {
      submitBtn.disabled = false;
      submitBtn.removeAttribute("aria-busy");
    }
  });

  updateLabels();
  autoResizeInput();

  return {
    updateLabels: () => {
      syncSection();
      updateLabels();
    },
    prefetchCount,
    refresh: loadFeed,
  };
}
