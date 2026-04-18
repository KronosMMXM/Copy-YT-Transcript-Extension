chrome.runtime.onMessage.addListener((msg, _sender, sendResponse) => {
  if (msg && msg.type === "YT_CT_COPY" && typeof msg.text === "string") {
    navigator.clipboard
      .writeText(msg.text)
      .then(() => {
        sendResponse({ ok: true });
      })
      .catch((e) => {
        sendResponse({
          ok: false,
          error: e && e.message ? e.message : String(e),
        });
      });
    return true;
  }
  return undefined;
});
