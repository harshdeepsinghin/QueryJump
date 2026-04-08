/**
 * QueryJump — Options Page Logic
 * Handles navigation, settings loading/saving, and UI interactions.
 * Cross-browser compatible (Chrome / Firefox / Edge / Brave).
 */

// Use browser namespace with chrome fallback
const api = typeof browser !== 'undefined' ? browser : chrome;

const DEFAULTS = {
  engine: 'google',
  customUrl: '',
  openInBackground: false,
};

// ——— DOM Elements ———
const navItems = document.querySelectorAll('.nav-item[data-page]');
const pages = document.querySelectorAll('.page');
const engineSelect = document.getElementById('engine');
const customUrlGroup = document.getElementById('custom-url-group');
const customUrlInput = document.getElementById('custom-url');
const bgToggle = document.getElementById('bg-toggle');
const saveBtn = document.getElementById('save-btn');

// ——— Page Navigation ———
navItems.forEach((item) => {
  item.addEventListener('click', (e) => {
    e.preventDefault();
    const targetPage = item.getAttribute('data-page');

    // Update nav
    navItems.forEach((n) => n.classList.remove('active'));
    item.classList.add('active');

    // Update pages
    pages.forEach((p) => p.classList.remove('active'));
    const target = document.getElementById('page-' + targetPage);
    if (target) target.classList.add('active');
  });
});

// ——— Load Settings ———
async function loadSettings() {
  try {
    const settings = await api.storage.sync.get(DEFAULTS);
    applySettings(settings);
  } catch (e) {
    // Callback fallback for older Chrome
    api.storage.sync.get(DEFAULTS, (settings) => applySettings(settings));
  }
}

function applySettings(settings) {
  engineSelect.value = settings.engine;
  customUrlInput.value = settings.customUrl || '';
  toggleCustomUrl(settings.engine === 'custom', false);
  setToggleState(settings.openInBackground);
}

loadSettings();

// ——— Engine Dropdown ———
engineSelect.addEventListener('change', () => {
  toggleCustomUrl(engineSelect.value === 'custom', true);
});

function toggleCustomUrl(show, animate) {
  if (show) {
    customUrlGroup.style.display = 'block';
    if (animate) {
      requestAnimationFrame(() => customUrlGroup.classList.add('visible'));
    } else {
      customUrlGroup.classList.add('visible');
    }
  } else {
    customUrlGroup.classList.remove('visible');
    if (animate) {
      setTimeout(() => {
        if (!customUrlGroup.classList.contains('visible')) {
          customUrlGroup.style.display = 'none';
        }
      }, 300);
    } else {
      customUrlGroup.style.display = 'none';
    }
  }
}

// ——— Toggle Switch ———
bgToggle.addEventListener('click', () => {
  const current = bgToggle.getAttribute('aria-checked') === 'true';
  setToggleState(!current);
});

function setToggleState(on) {
  bgToggle.setAttribute('aria-checked', on ? 'true' : 'false');
}

// ——— Save ———
saveBtn.addEventListener('click', async () => {
  const settings = {
    engine: engineSelect.value,
    customUrl: customUrlInput.value.trim(),
    openInBackground: bgToggle.getAttribute('aria-checked') === 'true',
  };

  // Validate custom URL
  if (settings.engine === 'custom') {
    if (!settings.customUrl) {
      shakeInput(customUrlInput);
      return;
    }
    if (!settings.customUrl.includes('{query}')) {
      shakeInput(customUrlInput);
      showTooltip(customUrlInput, 'URL must include {query}');
      return;
    }
  }

  try {
    await api.storage.sync.set(settings);
    showSaved();
  } catch (e) {
    api.storage.sync.set(settings, () => showSaved());
  }
});

function showSaved() {
  saveBtn.classList.add('saved');
  setTimeout(() => saveBtn.classList.remove('saved'), 1500);
}

function shakeInput(el) {
  el.style.borderColor = '#ef4444';
  el.style.animation = 'shake 0.4s ease';
  el.focus();
  setTimeout(() => {
    el.style.borderColor = '';
    el.style.animation = '';
  }, 2000);
}

function showTooltip(el, msg) {
  // Simple alert fallback — keeps the extension minimal
  alert(msg);
}

// Add shake animation dynamically
const style = document.createElement('style');
style.textContent = `
  @keyframes shake {
    0%, 100% { transform: translateX(0); }
    20%, 60% { transform: translateX(-6px); }
    40%, 80% { transform: translateX(6px); }
  }
`;
document.head.appendChild(style);
