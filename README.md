
# Tower.im UI Auto-Translate (EN) — v0.6

**What's new**
- Translates **placeholder**, **title**, **aria-label/aria-placeholder**, **data-placeholder/data-title** attributes.
- Observes attribute changes so dynamic placeholders also get translated.
- Keeps default **STRICT**; auto **RELAXED** within activity/log feeds; regex captures for dynamic sentences remain.

**Install**
1) Download the ZIP and extract.
2) `chrome://extensions` → Developer mode → Load unpacked → select the folder.
3) Open `tower.im`.

**Notes**
- Attribute translation uses **STRICT first**, then **RELAXED fallback** (placeholders通常是短 UI 文案).  
- 若个别 placeholder 不应翻译，可给该元素或父容器加 `.notranslate` 或 `data-no-translate`。
- 欢迎把未命中的 placeholder 文案/截图给我，我会补充到词典或正则规则里。
