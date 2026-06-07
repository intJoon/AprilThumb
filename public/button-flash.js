export function flashButton(btn, message, { error = false, restoreText, okClass } = {}) {
  if (!btn) return;
  const prev = restoreText ?? btn.textContent;
  btn.textContent = message;
  btn.classList.remove("btn-status-ok", "btn-status-error");
  if (okClass) btn.classList.remove(okClass);
  btn.classList.add(error ? "btn-status-error" : "btn-status-ok");
  if (!error && okClass) btn.classList.add(okClass);
  clearTimeout(btn._flashTimer);
  btn._flashTimer = setTimeout(() => {
    btn.textContent = prev;
    btn.classList.remove("btn-status-ok", "btn-status-error");
    if (okClass) btn.classList.remove(okClass);
  }, 1600);
}

export function flashLabel(labelEl, hostBtn, message, { error = false, restoreText } = {}) {
  if (!labelEl) return;
  const prev = restoreText ?? labelEl.textContent;
  labelEl.textContent = message;
  if (hostBtn) {
    hostBtn.classList.remove("btn-status-ok", "btn-status-error");
    hostBtn.classList.add(error ? "btn-status-error" : "btn-status-ok");
  }
  clearTimeout(labelEl._flashTimer);
  labelEl._flashTimer = setTimeout(() => {
    labelEl.textContent = prev;
    if (hostBtn) hostBtn.classList.remove("btn-status-ok", "btn-status-error");
  }, 1600);
}

export function flashIconButtonWithLabel(
  btn,
  labelEl,
  message,
  { restoreLabel, ariaMessage, okClass = "copied", error = false } = {}
) {
  if (!btn || !labelEl) return;
  const prevAria = restoreLabel ?? btn.getAttribute("aria-label") ?? "";
  const aria = ariaMessage ?? message;
  labelEl.hidden = false;
  labelEl.textContent = message;
  btn.setAttribute("aria-label", aria);
  btn.classList.remove("btn-status-ok", "btn-status-error");
  if (okClass) btn.classList.remove(okClass);
  btn.classList.add(error ? "btn-status-error" : "btn-status-ok");
  if (!error && okClass) btn.classList.add(okClass);
  clearTimeout(btn._flashTimer);
  btn._flashTimer = setTimeout(() => {
    labelEl.hidden = true;
    labelEl.textContent = "";
    btn.classList.remove("btn-status-ok");
    if (okClass) btn.classList.remove(okClass);
    if (prevAria) btn.setAttribute("aria-label", prevAria);
    else btn.removeAttribute("aria-label");
  }, 1600);
}
