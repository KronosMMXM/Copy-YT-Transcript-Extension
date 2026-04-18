const STORAGE_KEYS = {
  format: "format",
  includeTimestamps: "includeTimestamps",
};

const DEFAULTS = {
  format: "plain",
  includeTimestamps: false,
};

function $(id) {
  return document.getElementById(id);
}

function setStatus(message) {
  const el = $("status");
  if (el) el.textContent = message || "";
}

function loadSettings() {
  return new Promise((resolve) => {
    chrome.storage.sync.get(DEFAULTS, (items) => {
      if (chrome.runtime.lastError) {
        setStatus("Could not load settings.");
        resolve(DEFAULTS);
        return;
      }
      resolve(items);
    });
  });
}

function savePartial(partial) {
  return new Promise((resolve) => {
    chrome.storage.sync.set(partial, () => {
      if (chrome.runtime.lastError) {
        setStatus("Could not save settings.");
      } else {
        setStatus("Saved.");
        window.setTimeout(() => setStatus(""), 1500);
      }
      resolve();
    });
  });
}

async function init() {
  const formatEl = $("format");
  const tsEl = $("includeTimestamps");
  const settings = await loadSettings();

  formatEl.value =
    settings.format === "markdown" ? "markdown" : "plain";
  tsEl.checked = Boolean(settings.includeTimestamps);

  formatEl.addEventListener("change", () => {
    savePartial({ [STORAGE_KEYS.format]: formatEl.value });
  });

  tsEl.addEventListener("change", () => {
    savePartial({
      [STORAGE_KEYS.includeTimestamps]: tsEl.checked,
    });
  });
}

init();
