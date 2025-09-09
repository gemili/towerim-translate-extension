
# Tower.im UI Auto-Translate (EN) — v0.6.9

**What's new in v0.6.9**
- Add more translations for Reports/Knowledge and dialogs (e.g., global tag edit confirmation)
- Translate selector field function names: `.selector-field-result .func-name`
- Improve activity parsing (trash items, reply patterns)

**What's new in v0.6.8**
- Add translation coverage for selector field result and function name areas
- Minor fixes to activity item handling

**What's new in v0.6.7**
- Ensure deletion-related activity text is translated; include `.trash-item` in activity scope

**What's new in v0.6.6**
- Support full Chinese datetime format: `YYYY年MM月DD日 HH:MM`

**What's new in v0.6.5**
- Fix translation in grid date cells and ensure display-only cells are handled safely

**What's new in v0.6.4**
- Performance Optimization: Significantly reduced list page lag
  - Reduced timer frequency from 500ms to 1000ms
  - Added debounce mechanism to prevent duplicate translations
  - Optimized scanning to only scan critical elements where possible
  - Replaced full-page text node traversal with targeted queries
  - Batch processing for MutationObserver events
- Smart Filtering: Only process text nodes containing Chinese characters
- Caching System: Avoid re-translating already processed elements

**Earlier changes**
- CKEditor UI elements (placeholders, tooltips, button labels)
- Dynamic text detection for status messages and notifications
- Visitor permission descriptions and editor help text
- Support for text split by HTML tags (like `<br>`)
- Fixed date format translation for task completion time changes
- Attribute translation: placeholder, title, aria-label/aria-placeholder, data-placeholder/data-title
- Default STRICT; auto RELAXED in activity/log feeds; regex captures for dynamic sentences

**Install**
1) Download the ZIP and extract.
2) `chrome://extensions` → Developer mode → Load unpacked → select the folder.
3) Open `tower.im`.

**Notes**
- Attribute translation uses STRICT first, then RELAXED fallback.
- If any element should not be translated, add `.notranslate` or `data-no-translate` to it or its container.
- If you find untranslated phrases, please share; we’ll extend the dictionary or regex rules.
