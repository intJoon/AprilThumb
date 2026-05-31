import {
  fetchAllComments,
  postComment,
  renderBubble,
  formatMeta,
} from "./comments-lib.js";

function el(id) {
  return document.getElementById(id);
}

export function mountFeedbackPanel(ctx) {
  const section = el("feedback-section");
  const details = el("feedback-disclosure");
  const summaryLabel = el("feedback-summary-label");
  const list = el("feedback-list");
  const empty = el("feedback-empty");
  const form = el("feedback-form");
  const meta = el("feedback-meta");
  const bodyInput = el("feedback-body");
  const submitBtn = el("btn-feedback-submit");
  const labelBody = el("label-feedback-body");

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

  function updateLabels() {
    summaryLabel.textContent = ctx.ui("commentsTitle");
    bodyInput.placeholder = ctx.ui("commentsPlaceholder");
    submitBtn.textContent = ctx.ui("commentsSubmit");
    labelBody.textContent = ctx.ui("commentsPlaceholder");
    meta.textContent = contextLine();
    empty.textContent = ctx.ui("commentsEmpty");
    setDisclosureAria();
  }

  function renderList(items) {
    list.replaceChildren();
    if (!items.length) {
      empty.hidden = false;
      return;
    }
    empty.hidden = true;
    for (const item of items) list.appendChild(renderBubble(item, ctx));
  }

  async function refresh() {
    const track = ctx.selectedTrack();
    const lang = ctx.selectedLang();
    updateLabels();
    if (!track || !lang) {
      section.hidden = true;
      details.open = false;
      return;
    }
    section.hidden = false;
    try {
      const items = await fetchAllComments();
      renderList(items);
    } catch {
      renderList([]);
    }
  }

  details.addEventListener("toggle", () => {
    setDisclosureAria();
    if (details.open) refresh();
  });

  form.addEventListener("submit", async (e) => {
    e.preventDefault();
    const track = ctx.selectedTrack();
    const lang = ctx.selectedLang();
    const body = bodyInput.value.trim();
    if (!track || !lang || !body) return;

    const honeypot = form.querySelector('[name="website"]');
    submitBtn.disabled = true;
    try {
      await postComment({
        track,
        lang,
        body,
        website: honeypot?.value || "",
      });
      bodyInput.value = "";
      ctx.showToast(ctx.ui("commentsPosted"));
      await refresh();
    } catch {
      ctx.showToast(ctx.ui("commentsError"));
    } finally {
      submitBtn.disabled = false;
    }
  });

  updateLabels();

  return { updateLabels, refresh };
}
