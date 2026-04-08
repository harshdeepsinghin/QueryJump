<p align="center">
  <img src="icons/QueryJump_Logo.png" alt="QueryJump Logo" width="128" height="128" style="border-radius: 20px;">
</p>

<h1 align="center">QueryJump</h1>

<p align="center">
  <strong>Select text → press hotkey → instantly search.</strong><br>
  Minimal. Fast. Private. Keyboard-first.
</p>

<p align="center">
  <a href="https://github.com/harshdeepsinghin/QueryJump/releases"><img src="https://img.shields.io/github/v/release/harshdeepsinghin/QueryJump?style=flat-square&color=2481cc" alt="Release"></a>
  <a href="https://github.com/harshdeepsinghin/QueryJump/blob/main/LICENSE"><img src="https://img.shields.io/github/license/harshdeepsinghin/QueryJump?style=flat-square" alt="License"></a>
  <img src="https://img.shields.io/badge/manifest-v3-green?style=flat-square" alt="MV3">
  <img src="https://img.shields.io/badge/chrome-%E2%9C%93-4285F4?style=flat-square&logo=googlechrome&logoColor=white" alt="Chrome">
  <img src="https://img.shields.io/badge/firefox-%E2%9C%93-FF7139?style=flat-square&logo=firefox&logoColor=white" alt="Firefox">
  <img src="https://img.shields.io/badge/brave-%E2%9C%93-FB542B?style=flat-square&logo=brave&logoColor=white" alt="Brave">
  <img src="https://img.shields.io/badge/edge-%E2%9C%93-0078D7?style=flat-square&logo=microsoftedge&logoColor=white" alt="Edge">
</p>

---

## ✨ What is QueryJump?

QueryJump is a **minimal, privacy-focused browser extension** that lets you search any selected text with a single hotkey. No right-click menus, no popups, no friction — just pure keyboard-driven speed.

**Select → Press `Alt/option + S` → Done.**

## 🚀 Features

- **⌨️ Hotkey-First** — Select text, press `Alt/option + S`, search opens instantly
- **🔍 Multiple Engines** — Google, DuckDuckGo, or your own custom URL
- **🔐 Privacy-First** — Zero tracking, zero analytics, zero data collection
- **🌐 Cross-Browser** — Chrome, Brave, Edge, and Firefox
- **⚡ Lightweight** — No dependencies, no build step, under 25KB total
- **🪟 Tab Control** — Open results in foreground or background tab

## 📦 Installation

### From Releases (Recommended)

1. Go to [**Releases**](https://github.com/harshdeepsinghin/QueryJump/releases)
2. Download the `.zip` for your browser
3. Follow the browser-specific steps below

### Chrome / Brave / Edge

1. Navigate to `chrome://extensions` (or `brave://extensions` / `edge://extensions`)
2. Enable **Developer mode** (top-right toggle)
3. Click **Load unpacked**
4. Select the extracted `QueryJump` folder

### Firefox

1. Navigate to `about:debugging#/runtime/this-firefox`
2. Click **Load Temporary Add-on**
3. Select the `manifest.json` file from the extracted folder

> **Note:** For permanent Firefox installation, the extension needs to be signed via [AMO](https://addons.mozilla.org).

## ⚙️ Configuration

Open the extension's **Options page** to configure:

| Setting | Options | Default |
|---------|---------|---------|
| Search Engine | Google, DuckDuckGo, Custom URL | Google |
| Tab Behavior | Foreground / Background | Foreground |
| Keyboard Shortcut | Configurable via browser settings | `Alt/option + S` |

### Changing the Shortcut

- **Chrome / Brave / Edge:** `chrome://extensions/shortcuts`
- **Firefox:** `about:addons` → ⚙️ → Manage Extension Shortcuts

## 🏗️ Project Structure

```
QueryJump/
├── manifest.json          # MV3 manifest (Chrome + Firefox)
├── background.js          # Service worker / background script
├── options.html           # Settings + About page
├── options.css            # Light theme, sidebar layout
├── options.js             # Settings logic & navigation
├── icons/
│   ├── QueryJump_Logo.png # Source logo (1080×1080)
│   ├── icon128.png        # 128×128
│   ├── icon48.png         # 48×48
│   └── icon16.png         # 16×16
└── .github/
    └── workflows/
        └── release.yml    # Auto-release on version tags
```

## 🔐 Permissions

QueryJump uses the **absolute minimum** permissions required:

| Permission | Why |
|------------|-----|
| `activeTab` | Access the current tab *only* when you press the hotkey |
| `scripting` | Read your text selection from the page |
| `storage` | Save your preferences locally |

**No host permissions. No background data access. No network requests beyond your search.**

## 🤝 Contributing

Contributions are welcome! Feel free to:

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/awesome`)
3. Commit your changes (`git commit -m 'Add awesome feature'`)
4. Push to the branch (`git push origin feature/awesome`)
5. Open a Pull Request

## 📄 License

This project is licensed under the [MIT License](LICENSE).

## 👤 Author

**Harshdeep Singh** — [@harshdeepsinghin](https://github.com/harshdeepsinghin)

---

<p align="center">
  <sub>Built with ❤️ for keyboard-first workflows</sub>
</p>
