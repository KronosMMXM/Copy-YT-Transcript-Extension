chrome.runtime.onMessage.addListener((msg, _sender, sendResponse) => {
  if (msg && msg.type === "YT_CT_COPY" && typeof msg.text === "string") {
    navigator.clipboard
      .writeText(msg.text)
      .then(() => {
        // #region agent log
        fetch("http://127.0.0.1:7325/ingest/8ace1656-e870-4660-9cbb-9aad5243a749", {
          method: "POST",
          headers: { "Content-Type": "application/json", "X-Debug-Session-Id": "20da2f" },
          body: JSON.stringify({
            sessionId: "20da2f",
            location: "background.js:YT_CT_COPY",
            message: "sw clipboard write ok",
            data: { textLen: msg.text.length },
            timestamp: Date.now(),
            hypothesisId: "E",
          }),
        }).catch(() => {});
        // #endregion
        sendResponse({ ok: true });
      })
      .catch((e) => {
        // #region agent log
        fetch("http://127.0.0.1:7325/ingest/8ace1656-e870-4660-9cbb-9aad5243a749", {
          method: "POST",
          headers: { "Content-Type": "application/json", "X-Debug-Session-Id": "20da2f" },
          body: JSON.stringify({
            sessionId: "20da2f",
            location: "background.js:YT_CT_COPY",
            message: "sw clipboard write failed",
            data: { err: e && e.message ? e.message : String(e) },
            timestamp: Date.now(),
            hypothesisId: "E",
          }),
        }).catch(() => {});
        // #endregion
        sendResponse({ ok: false, error: e && e.message ? e.message : String(e) });
      });
    return true;
  }
  return undefined;
});
