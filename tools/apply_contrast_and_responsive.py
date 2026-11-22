import os
import re

css_path = os.path.join(os.path.dirname(os.path.dirname(os.path.abspath(__file__))), "src", "styles.css")
if not os.path.exists(css_path):
    css_path = os.path.join(os.getcwd(), "src", "styles.css")
if not os.path.exists(css_path):
    css_path = os.path.join(os.getcwd(), "oxford5000-app 1.5 coding", "src", "styles.css")

with open(css_path, "r", encoding="utf-8") as f:
    css = f.read()

# Replace the v1.5 styles section up to @media print
css_marker = "/* ========================================================\n     TOOLBAR 4-COLUMN GRIDS & BUTTONS"
if css_marker not in css:
    css_marker = "/* ========================================================\r\n     TOOLBAR 4-COLUMN GRIDS & BUTTONS"

end_marker = "/* ========================================================\n     PRINT MEDIA QUERY FOR A4 STUDY SHEETS"
if end_marker not in css:
    end_marker = "/* ========================================================\r\n     PRINT MEDIA QUERY FOR A4 STUDY SHEETS"

new_css_section = r"""/* ========================================================
     STREAMLINED TOOLBAR & TOOLS HUB DRAWER
     ======================================================== */
  .toolbar {
    display: flex;
    flex-direction: column;
    gap: 12px;
    width: 100%;
    margin: 18px auto 0;
  }
  .primary-grid.four-col {
    display: grid;
    grid-template-columns: repeat(4, 1fr);
    gap: 10px;
    width: 100%;
  }

  .tools-hub-btn {
    background: linear-gradient(135deg, rgba(31, 111, 109, 0.4), rgba(22, 79, 77, 0.65)) !important;
    border: 1px solid rgba(46, 204, 113, 0.45) !important;
    color: #fffdf7 !important;
    font-weight: 800;
    box-shadow: 0 4px 14px rgba(0, 0, 0, 0.25);
  }
  .tools-hub-btn:hover {
    background: linear-gradient(135deg, rgba(31, 111, 109, 0.6), rgba(22, 79, 77, 0.85)) !important;
    border-color: rgba(46, 204, 113, 0.7) !important;
  }
  .tools-hub-btn[aria-expanded="true"] {
    background: linear-gradient(135deg, rgba(217, 164, 65, 0.45), rgba(185, 130, 43, 0.65)) !important;
    border-color: rgba(217, 164, 65, 0.75) !important;
  }

  .tools-hub-drawer {
    background: rgba(14, 19, 29, 0.82);
    backdrop-filter: blur(14px);
    -webkit-backdrop-filter: blur(14px);
    border: 1px solid rgba(217, 164, 65, 0.28);
    border-radius: 20px;
    padding: 16px;
    display: flex;
    flex-direction: column;
    gap: 14px;
    box-shadow: 0 10px 30px rgba(0, 0, 0, 0.4);
    animation: drawerIn 0.25s cubic-bezier(0.2, 0.8, 0.3, 1);
  }
  .tools-hub-drawer[hidden] {
    display: none !important;
  }
  @keyframes drawerIn {
    from { opacity: 0; transform: translateY(-8px); }
    to { opacity: 1; transform: translateY(0); }
  }
  .tools-hub-section {
    display: flex;
    flex-direction: column;
    gap: 8px;
  }
  .tools-hub-heading {
    display: flex;
    align-items: center;
    justify-content: flex-start;
  }
  .tools-hub-badge {
    font-size: 11.5px;
    font-weight: 800;
    color: var(--gold);
    letter-spacing: 0.04em;
    padding: 2px 9px;
    background: rgba(217, 164, 65, 0.14);
    border-radius: 6px;
    border: 1px solid rgba(217, 164, 65, 0.22);
  }
  .tools-hub-grid {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(135px, 1fr));
    gap: 8px;
  }

  .handsfree-tool {
    background: linear-gradient(135deg, rgba(142, 68, 173, 0.38), rgba(108, 52, 131, 0.58));
    border: 1px solid rgba(187, 143, 206, 0.55);
    color: #fffdf7;
    font-weight: 800;
    box-shadow: 0 6px 18px rgba(0, 0, 0, 0.3), 0 0 16px rgba(155, 89, 182, 0.28);
  }
  .accent-tool {
    background: rgba(255, 255, 255, 0.06);
    border: 1px solid rgba(217, 164, 65, 0.28);
    color: var(--text-on-ink);
  }
  .accent-tool:hover:not(:disabled) {
    background: rgba(217, 164, 65, 0.16);
    border-color: rgba(217, 164, 65, 0.65);
    color: #fffdf7;
  }

  /* ========================================================
     HIGH-CONTRAST MODAL PANELS (CRISP & BEAUTIFULLY LEGIBLE)
     ======================================================== */
  .review-panel {
    color: #10161f;
  }
  .review-panel .review-head h3 {
    color: #10161f !important;
    font-weight: 900 !important;
  }

  /* 1. Hands-Free High-Contrast Styling */
  .hf-status-badge {
    font-size: 11px;
    font-weight: 800;
    padding: 3px 10px;
    border-radius: 999px;
    background: rgba(34, 27, 16, 0.08);
    color: #635035;
    border: 1px solid rgba(34, 27, 16, 0.2);
  }
  .hf-status-badge.active {
    background: rgba(39, 174, 96, 0.2);
    color: #1e824c;
    border-color: rgba(39, 174, 96, 0.45);
    animation: hfPulse 2s infinite;
  }
  .handsfree-body {
    padding: 20px;
    display: flex;
    flex-direction: column;
    gap: 16px;
  }
  .hf-display-card {
    background: #ffffff;
    border: 1.5px solid rgba(217, 164, 65, 0.45);
    border-radius: 20px;
    padding: 24px;
    text-align: center;
    position: relative;
    overflow: hidden;
    box-shadow: 0 4px 16px rgba(0, 0, 0, 0.05);
  }
  .hf-badge {
    display: inline-block;
    padding: 3px 12px;
    border-radius: 8px;
    font-size: 11px;
    font-weight: 900;
    background: var(--gold);
    color: #10161f;
    margin-bottom: 8px;
  }
  .hf-word {
    font-size: 34px;
    font-weight: 900;
    margin: 4px 0;
    color: #10161f !important;
    letter-spacing: -0.02em;
  }
  .hf-ipa {
    font-family: var(--font-mono);
    color: var(--teal-deep) !important;
    font-size: 15px;
    font-weight: 700;
    margin-bottom: 8px;
  }
  .hf-tr {
    font-size: 19px;
    color: #2b2011 !important;
    margin: 0;
    font-weight: 700;
  }
  .hf-progress-bar-wrap {
    height: 6px;
    background: #ece4d0;
    border-radius: 999px;
    margin-top: 18px;
    overflow: hidden;
  }
  .hf-progress-bar {
    height: 100%;
    background: linear-gradient(90deg, var(--gold), #27ae60);
    width: 0%;
    transition: width 0.25s linear;
  }
  .hf-controls {
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 16px;
  }
  .hf-btn {
    padding: 12px 20px;
    border-radius: 14px;
    border: 1.5px solid rgba(34, 27, 16, 0.2);
    background: #ebe4d0;
    color: #10161f;
    font-size: 16px;
    font-weight: 800;
    cursor: pointer;
    transition: all 0.2s cubic-bezier(0.34, 1.56, 0.64, 1);
  }
  .hf-btn:hover {
    background: #dfd6be;
    transform: translateY(-2px);
  }
  .hf-play-btn {
    padding: 14px 34px;
    background: linear-gradient(135deg, var(--gold), var(--gold-deep));
    color: #10161f;
    border: none;
    font-size: 18px;
    font-weight: 900;
    box-shadow: 0 6px 20px rgba(217, 164, 65, 0.4);
  }
  .hf-play-btn.playing {
    background: linear-gradient(135deg, #e74c3c, #c0392b);
    color: #ffffff;
    box-shadow: 0 6px 20px rgba(231, 76, 60, 0.4);
  }
  .hf-settings-grid {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    gap: 12px;
    margin-top: 6px;
  }
  .hf-setting-item label {
    display: block;
    font-size: 12px;
    font-weight: 800;
    margin-bottom: 4px;
    color: #4a3e2c;
  }
  .hf-setting-item select {
    width: 100%;
    padding: 9px 12px;
    border-radius: 12px;
    background: #ffffff;
    border: 1.5px solid #d8cdb2;
    color: #10161f;
    font-size: 13px;
    font-weight: 700;
  }

  /* 2. Badges High-Contrast Styling */
  .badges-body {
    padding: 20px;
    overflow-y: auto;
    max-height: calc(85vh - 75px);
  }
  .badges-summary {
    background: #ffffff;
    border: 1.5px solid rgba(217, 164, 65, 0.45);
    border-radius: 16px;
    padding: 16px 20px;
    margin-bottom: 18px;
    box-shadow: 0 4px 16px rgba(0, 0, 0, 0.05);
  }
  .badges-progress-label {
    display: flex;
    justify-content: space-between;
    align-items: center;
    font-size: 16px;
    font-weight: 900;
    color: #10161f !important;
    margin-bottom: 10px;
  }
  .badges-bar-wrap {
    height: 8px;
    background: #ece4d0;
    border-radius: 999px;
    overflow: hidden;
  }
  .badges-bar {
    height: 100%;
    background: linear-gradient(90deg, var(--gold), #27ae60);
    border-radius: 999px;
    transition: width 0.5s ease;
  }
  .badges-grid {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(260px, 1fr));
    gap: 14px;
  }
  .badge-card {
    display: flex;
    align-items: flex-start;
    gap: 14px;
    padding: 16px;
    border-radius: 16px;
    border: 1.5px solid #e2d7be;
    background: #ffffff;
    transition: all 0.2s ease;
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.04);
  }
  .badge-card.unlocked {
    background: #fdfaf3;
    border-color: var(--gold);
    box-shadow: 0 4px 16px rgba(217, 164, 65, 0.2);
  }
  .badge-card.locked {
    opacity: 0.72;
    background: #fbf9f4;
  }
  .badge-icon {
    font-size: 28px;
    flex-shrink: 0;
    width: 48px;
    height: 48px;
    display: flex;
    align-items: center;
    justify-content: center;
    border-radius: 14px;
    background: #f0e9d8;
  }
  .badge-card.unlocked .badge-icon {
    background: rgba(217, 164, 65, 0.25);
    box-shadow: 0 0 12px rgba(217, 164, 65, 0.35);
  }
  .badge-info {
    flex: 1;
    min-width: 0;
  }
  .badge-title {
    font-size: 15px;
    font-weight: 900;
    color: #10161f !important;
    margin-bottom: 3px;
  }
  .badge-desc {
    font-size: 12.5px;
    color: #4a3e2a !important;
    line-height: 1.45;
    margin-bottom: 8px;
    font-weight: 500;
  }
  .badge-tag {
    display: inline-block;
    font-size: 10.5px;
    font-weight: 800;
    padding: 3px 8px;
    border-radius: 6px;
    letter-spacing: 0.04em;
  }
  .badge-card.unlocked .badge-tag {
    background: rgba(39, 174, 96, 0.18);
    color: #155724;
    border: 1px solid rgba(39, 174, 96, 0.35);
  }
  .badge-card.locked .badge-tag {
    background: #ece4d0;
    color: #635035;
    border: 1px solid #d8cdb2;
  }

  /* 3. Ambient Focus High-Contrast Styling */
  .ambient-sub-badge {
    font-size: 11px;
    font-weight: 800;
    padding: 3px 9px;
    border-radius: 6px;
    background: rgba(31, 111, 109, 0.15);
    color: var(--teal-deep);
    border: 1px solid rgba(31, 111, 109, 0.35);
  }
  .ambient-master-card {
    background: #ffffff;
    border: 1.5px solid rgba(217, 164, 65, 0.45);
    border-radius: 16px;
    padding: 16px 20px;
    box-shadow: 0 4px 16px rgba(0, 0, 0, 0.05);
  }
  .ambient-master-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 12px;
  }
  .ambient-master-title {
    font-size: 15px;
    font-weight: 900;
    color: #10161f !important;
  }
  .ambient-mute-btn {
    padding: 7px 16px;
    font-size: 12.5px;
    font-weight: 800;
    border-radius: 10px;
    background: #f0e9d8;
    color: #10161f;
    border: 1.5px solid #d8cdb2;
  }
  .ambient-slider {
    width: 100%;
    accent-color: var(--gold-deep);
    cursor: pointer;
  }
  .ambient-tracks {
    display: flex;
    flex-direction: column;
    gap: 12px;
  }
  .ambient-track-card {
    background: #ffffff;
    border: 1.5px solid #e2d7be;
    border-radius: 16px;
    padding: 16px 20px;
    transition: all 0.2s ease;
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.04);
  }
  .ambient-track-card.active {
    background: #f4faf7;
    border-color: #27ae60;
    box-shadow: 0 4px 16px rgba(39, 174, 96, 0.18);
  }
  .ambient-track-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 10px;
  }
  .ambient-track-info {
    display: flex;
    align-items: center;
    gap: 12px;
  }
  .ambient-icon { font-size: 24px; }
  .ambient-track-info strong {
    display: block;
    font-size: 15px;
    font-weight: 900;
    color: #10161f !important;
  }
  .ambient-track-info small {
    color: #554834 !important;
    font-size: 12.5px;
    font-weight: 600;
  }
  .ambient-track-toggle {
    padding: 7px 18px;
    border-radius: 10px;
    border: 1.5px solid #c9bda1;
    background: #f0e9d8;
    color: #10161f;
    font-weight: 800;
    font-size: 12.5px;
    cursor: pointer;
    transition: all 0.2s ease;
  }
  .ambient-track-card.active .ambient-track-toggle {
    background: #1f6f6d;
    color: #ffffff;
    border-color: #1f6f6d;
  }

  /* 4. Print Sheets High-Contrast Styling */
  .print-desc {
    font-size: 14px;
    color: #3d3220 !important;
    margin: 0;
    line-height: 1.6;
    font-weight: 600;
  }
  .print-config-group {
    display: flex;
    flex-direction: column;
    gap: 8px;
  }
  .print-label {
    font-size: 14px;
    font-weight: 900;
    color: var(--teal-deep) !important;
  }
  .print-options-row, .print-options-grid {
    color: #10161f;
    font-weight: 700;
  }
  .print-select {
    padding: 10px 14px;
    border-radius: 12px;
    background: #ffffff;
    border: 1.5px solid #d8cdb2;
    color: #10161f;
    font-size: 14px;
    font-weight: 700;
  }

  /* 5. Leech Hunter High-Contrast Styling */
  .leeches-header-card {
    background: #fff5f5;
    border: 1.5px solid rgba(184, 84, 63, 0.45);
    border-radius: 16px;
    padding: 18px;
    display: flex;
    align-items: center;
    justify-content: space-between;
    flex-wrap: wrap;
    gap: 14px;
  }
  .leeches-count-num {
    font-size: 32px;
    font-weight: 900;
    color: #c0392b !important;
    margin-right: 8px;
  }
  .leeches-count-label {
    font-size: 15px;
    font-weight: 800;
    color: #10161f !important;
  }
  .leech-item {
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 12px 16px;
    border-radius: 12px;
    background: #ffffff;
    border: 1.5px solid #e2d7be;
    box-shadow: 0 2px 6px rgba(0, 0, 0, 0.04);
  }
  .leech-word {
    font-size: 16px;
    font-weight: 900;
    color: #10161f !important;
  }
  .leech-sub {
    font-size: 13px;
    color: #4a3e2a !important;
    font-weight: 600;
    margin-left: 8px;
  }

  /* OLED Theme Override for High-Contrast Modals */
  [data-theme="oled"] .review-panel {
    background: #080a0f !important;
    color: #f0f3f8 !important;
    border: 1px solid rgba(255, 255, 255, 0.18) !important;
  }
  [data-theme="oled"] .review-panel .review-head h3 {
    color: #ffffff !important;
  }
  [data-theme="oled"] .hf-display-card,
  [data-theme="oled"] .badges-summary,
  [data-theme="oled"] .badge-card,
  [data-theme="oled"] .ambient-master-card,
  [data-theme="oled"] .ambient-track-card,
  [data-theme="oled"] .leeches-header-card,
  [data-theme="oled"] .leech-item {
    background: #11141c !important;
    border-color: rgba(255, 255, 255, 0.14) !important;
  }
  [data-theme="oled"] .hf-word,
  [data-theme="oled"] .badge-title,
  [data-theme="oled"] .ambient-master-title,
  [data-theme="oled"] .ambient-track-info strong,
  [data-theme="oled"] .leech-word,
  [data-theme="oled"] .badges-progress-label,
  [data-theme="oled"] .leeches-count-label,
  [data-theme="oled"] .hf-tr {
    color: #ffffff !important;
  }
  [data-theme="oled"] .badge-desc,
  [data-theme="oled"] .ambient-track-info small,
  [data-theme="oled"] .print-desc,
  [data-theme="oled"] .leech-sub,
  [data-theme="oled"] .hf-setting-item label {
    color: #a0aec0 !important;
  }
  [data-theme="oled"] select,
  [data-theme="oled"] input[type="text"] {
    background: #1a1e28 !important;
    color: #ffffff !important;
    border-color: rgba(255, 255, 255, 0.2) !important;
  }

  /* ========================================================
     RESPONSIVE BREAKPOINTS (MOBILE, TABLET, DESKTOP)
     ======================================================== */
  /* Desktop (1025px+) */
  @media (min-width: 1025px) {
    .app { max-width: 780px; margin: 0 auto; }
    .card { padding: 32px 28px; border-radius: 28px; }
    .the-word { font-size: 40px; }
    .primary-grid.four-col { grid-template-columns: repeat(4, 1fr); }
  }

  /* Tablet / iPad (641px - 1024px) */
  @media (min-width: 641px) and (max-width: 1024px) {
    .app { max-width: 680px; margin: 0 auto; padding: 0 16px; }
    .card { padding: 26px 20px; border-radius: 24px; }
    .the-word { font-size: 34px; }
    .primary-grid.four-col { grid-template-columns: repeat(2, 1fr); gap: 8px; }
    .review-panel { max-width: 580px; }
  }

  /* Mobile / Phone (<= 640px) */
  @media (max-width: 640px) {
    html, body { font-size: 14.5px; }
    .app { width: 100%; padding: 0 8px; }
    .app-header-island {
      border-radius: 16px;
      padding: 6px 10px;
      margin: 6px auto 10px;
      width: 96%;
    }
    .top-nav-bar { flex-wrap: wrap; gap: 6px; }
    .deck { min-height: 480px; height: auto; margin-bottom: 12px; }
    .card {
      padding: 18px 12px 14px;
      border-radius: 20px;
      width: 100%;
    }
    .the-word {
      font-size: clamp(26px, 7.5vw, 34px);
      letter-spacing: -0.01em;
    }
    .example-card { padding: 10px 12px; margin-top: 10px; border-radius: 14px; }
    .sent-text { font-size: 14.5px; line-height: 1.45; }
    .controls {
      display: grid;
      grid-template-columns: 1fr 1fr;
      gap: 10px;
      width: 100%;
      padding: 0 4px;
    }
    .ctrl-btn { min-height: 52px; font-size: 14px; }
    #btnUndo { grid-column: span 2; min-height: 40px; }
    .primary-grid.four-col {
      grid-template-columns: repeat(2, 1fr);
      gap: 8px;
    }
    .tool-btn {
      padding: 10px 8px;
      font-size: 12px;
      min-height: 42px;
    }
    .tools-hub-grid {
      grid-template-columns: repeat(2, 1fr);
      gap: 6px;
    }
    .review-panel {
      width: 96vw;
      max-height: 86vh;
      border-radius: 18px;
      margin: 0 auto;
    }
    .badges-grid {
      grid-template-columns: 1fr;
    }
    .hf-controls {
      gap: 10px;
    }
    .hf-btn {
      padding: 10px 14px;
      font-size: 14px;
    }
    .hf-play-btn {
      padding: 12px 22px;
      font-size: 16px;
    }
  }

  """

# Find the section to replace
idx_start = css.find(css_marker)
idx_end = css.find(end_marker)

if idx_start != -1 and idx_end != -1:
    css = css[:idx_start] + new_css_section + css[idx_end:]
    print("Replaced CSS section with high-contrast, streamlined responsive styles!")
else:
    print(f"WARNING: markers not found! start={idx_start}, end={idx_end}")

with open(css_path, "w", encoding="utf-8") as f:
    f.write(css)

print("Updated styles.css successfully!")
