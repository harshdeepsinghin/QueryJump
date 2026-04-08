/**
 * QueryJump — Background Script / Service Worker
 * Cross-browser (Chrome, Firefox, Edge, Brave)
 * Handles hotkey commands, injects content script, and opens search tabs.
 */

// Use browser namespace with chrome fallback for cross-browser support
const api = typeof browser !== 'undefined' ? browser : chrome;

const SEARCH_ENGINES = {
  google: 'https://www.google.com/search?q={query}',
  duckduckgo: 'https://duckduckgo.com/?q={query}',
};

const DEFAULTS = {
  engine: 'google',
  customUrl: '',
  openInBackground: false,
};

/**
 * Retrieve user settings from storage.sync, falling back to defaults.
 */
async function getSettings() {
  try {
    // browser.storage.sync.get returns a Promise in Firefox
    const result = await api.storage.sync.get(DEFAULTS);
    return result;
  } catch (e) {
    // Fallback for callback-based API
    return new Promise((resolve) => {
      api.storage.sync.get(DEFAULTS, (settings) => resolve(settings));
    });
  }
}

/**
 * Build the search URL from the selected text and user settings.
 */
function buildSearchUrl(text, settings) {
  const encoded = encodeURIComponent(text);
  let template;

  if (settings.engine === 'custom' && settings.customUrl) {
    template = settings.customUrl;
  } else {
    template = SEARCH_ENGINES[settings.engine] || SEARCH_ENGINES.google;
  }

  return template.replace('{query}', encoded);
}

/**
 * Injected into the active tab to retrieve selected text.
 * Handles normal selections, input/textarea, and contentEditable.
 */
function getSelectedText() {
  // 1. Try window.getSelection first
  const selection = window.getSelection().toString().trim();
  if (selection) return selection;

  // 2. Fallback: active element (input / textarea)
  const el = document.activeElement;
  if (el && (el.tagName === 'INPUT' || el.tagName === 'TEXTAREA')) {
    const { value, selectionStart, selectionEnd } = el;
    if (typeof selectionStart === 'number' && selectionStart !== selectionEnd) {
      return value.substring(selectionStart, selectionEnd).trim();
    }
  }

  return '';
}

// Listen for the registered command
api.commands.onCommand.addListener(async (command) => {
  if (command !== 'search-selected') return;

  // Get the currently active tab
  const tabs = await api.tabs.query({ active: true, currentWindow: true });
  const tab = tabs[0];
  if (!tab?.id) return;

  // Inject the content script function to grab selected text
  let results;
  try {
    results = await api.scripting.executeScript({
      target: { tabId: tab.id },
      func: getSelectedText,
    });
  } catch (e) {
    // Injection may fail on restricted pages (chrome://, about:, etc.) — silently bail
    return;
  }

  const text = results?.[0]?.result;
  if (!text) return; // No selection — do nothing

  const settings = await getSettings();
  const url = buildSearchUrl(text, settings);

  api.tabs.create({
    url,
    active: !settings.openInBackground,
  });
});
