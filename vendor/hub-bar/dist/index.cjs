"use strict";Object.defineProperty(exports,Symbol.toStringTag,{value:"Module"});const e=require("react/jsx-runtime"),i=require("react"),se=require("react-dom"),V="https://my.theonestack.com",I=[{id:"psa",name:"PSA",url:"https://app.theonepsa.com",icon:"briefcase",color:"#3b82f6"},{id:"crm",name:"CRM",url:"https://app.theonecrm.app",icon:"target",color:"#0ea5e9"},{id:"rmm",name:"RMM",url:"https://app.theonermm.app",icon:"monitor",color:"#14b8a6"},{id:"security",name:"Security",url:"https://app.theonesecurity.app",icon:"shield-check",color:"#4f46e5"},{id:"defend",name:"Defend",url:"https://app.theonedefend.app",icon:"shield-alert",color:"#E63946"},{id:"backups",name:"Backups",url:"https://app.theonebackups.app",icon:"hard-drive",color:"#10b981"},{id:"projects",name:"Projects",url:"https://app.theoneprojects.app",icon:"folder-kanban",color:"#f59e0b"},{id:"books",name:"Books",url:"https://app.theonebooks.app",icon:"book-open",color:"#14b8a6"},{id:"voice",name:"Voice",url:"https://app.theonevoice.app",icon:"phone",color:"#06b6d4"},{id:"ai-studio",name:"AI Studio",url:"https://app.theonestudio.app",icon:"sparkles",color:"#6366f1"},{id:"livekit",name:"LiveKit",url:"https://live.theonelivekit.app",icon:"video",color:"#2563eb"},{id:"mission",name:"Mission",url:"https://app.theonemission.app",icon:"heart",color:"#e11d48"},{id:"ams",name:"AMS",url:"https://app.theoneams.com",icon:"building-2",color:"#f59e0b"},{id:"fleet",name:"Fleet",url:"https://app.theonefleet.app",icon:"truck",color:"#10b981"},{id:"people",name:"People",url:"https://app.theonepeople.app",icon:"users",color:"#f43f5e"},{id:"cmdb",name:"CMDB",url:"https://app.theonecmdb.app",icon:"database",color:"#06b6d4"},{id:"oncall",name:"On-Call",url:"https://app.theoneoncall.app",icon:"bell-ring",color:"#f43f5e"},{id:"visitor",name:"Visitor",url:"https://app.theonevisitor.app",icon:"door-open",color:"#0ea5e9"},{id:"legal",name:"Legal",url:"https://app.theonelegal.app",icon:"scale",color:"#2563eb"},{id:"collective",name:"Collective",url:"https://app.mspcollective.io",icon:"globe",color:"#8b5cf6"},{id:"crawl",name:"Crawl",url:"https://crawl.theonestack.com",icon:"search",color:"#f97316"},{id:"portal",name:"Portal",url:"https://app.theoneportal.app",icon:"globe",color:"#ec4899"},{id:"bridge",name:"Bridge",url:"https://app.theonebridge.app",icon:"arrow-left-right",color:"#f97316"},{id:"canvas",name:"Canvas",url:"https://app.theonecanvas.app",icon:"pen-tool",color:"#f59e0b"},{id:"brand",name:"Brand",url:"https://app.theonebrand.app",icon:"palette",color:"#e11d48"},{id:"migrate",name:"Migrate",url:"https://app.theonemigrate.app",icon:"arrow-right-left",color:"#0891b2"},{id:"relay",name:"Relay",url:"https://app.theonerelay.app",icon:"mail",color:"#f97316"},{id:"code",name:"Code",url:"https://app.theonecode.app",icon:"shield-check",color:"#06b6d4"},{id:"ai",name:"The One AI",url:"https://app.theoneai.app",icon:"bot",color:"#818cf8"},{id:"status",name:"Status",url:"https://app.theonestatus.app",icon:"activity",color:"#2dd4bf"},{id:"hub",name:"Hub",url:"https://my.theonestack.com",icon:"layout-grid",color:"#8b5cf6"},{id:"ops-center",name:"Ops Center",url:"https://theoneops.app",icon:"activity",color:"#818cf8"},{id:"agents",name:"Agents",url:"https://app.theoneagents.app",icon:"bot",color:"#7c3aed"},{id:"protect",name:"Protect",url:"https://app.theoneprotect.app",icon:"shield",color:"#10b981"}],F={info:"#60a5fa",success:"#34d399",warning:"#fbbf24",error:"#f87171"},ae=48,ye=`
  .hb-root {
    all: initial;
    font-family: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;
    font-size: 14px;
    line-height: 1.5;
    color: #f1f5f9;
    box-sizing: border-box;
  }
  .hb-root *, .hb-root *::before, .hb-root *::after {
    box-sizing: inherit;
  }
  .hb-bar {
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    height: 48px;
    background: #09090b;
    border-bottom: 1px solid rgba(255,255,255,0.06);
    display: flex;
    align-items: center;
    padding: 0 12px;
    gap: 8px;
    z-index: 9999;
    -webkit-font-smoothing: antialiased;
  }
  .hb-logo {
    display: flex;
    align-items: center;
    gap: 8px;
    padding: 0 8px;
    flex-shrink: 0;
    text-decoration: none;
    color: #f1f5f9;
  }
  .hb-logo-bird {
    width: 22px;
    height: 22px;
    flex-shrink: 0;
    color: #f97316;
  }
  .hb-logo-name {
    font-weight: 600;
    font-size: 13px;
    color: #f1f5f9;
    white-space: nowrap;
  }
  .hb-divider {
    width: 1px;
    height: 24px;
    background: rgba(255,255,255,0.06);
    flex-shrink: 0;
  }

  /* Waffle Button */
  .hb-waffle-btn {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 36px;
    height: 36px;
    background: transparent;
    border: none;
    border-radius: 8px;
    cursor: pointer;
    transition: background 0.15s;
    flex-shrink: 0;
    padding: 0;
  }
  .hb-waffle-btn:hover { background: rgba(255,255,255,0.04); }
  .hb-waffle-btn.open { background: rgba(255,255,255,0.06); }

  /* Waffle Grid Panel */
  .hb-waffle-panel {
    position: absolute;
    top: calc(100% + 6px);
    left: 0;
    width: 380px;
    max-height: 80vh;
    overflow-y: auto;
    background: #09090b;
    border: 1px solid rgba(255,255,255,0.06);
    border-radius: 12px;
    box-shadow: 0 16px 48px rgba(0,0,0,0.6);
    z-index: 10000;
    padding: 16px;
    animation: hb-panel-slide 0.2s cubic-bezier(0.25, 0.1, 0.25, 1);
  }
  .hb-waffle-header {
    font-size: 13px;
    font-weight: 600;
    color: #8c8c8c;
    margin-bottom: 12px;
  }
  .hb-waffle-grid {
    display: grid;
    grid-template-columns: repeat(4, 1fr);
    gap: 4px;
  }
  .hb-waffle-tile {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 6px;
    padding: 12px 4px;
    border-radius: 10px;
    cursor: pointer;
    text-decoration: none;
    color: inherit;
    transition: background 0.12s;
  }
  .hb-waffle-tile:hover { background: rgba(255,255,255,0.04); }
  .hb-waffle-tile.inactive { opacity: 0.35; }
  .hb-waffle-tile-icon {
    width: 40px;
    height: 40px;
    border-radius: 10px;
    display: flex;
    align-items: center;
    justify-content: center;
    transition: transform 0.15s ease, box-shadow 0.15s ease;
  }
  .hb-waffle-tile:hover .hb-waffle-tile-icon {
    transform: scale(1.08);
    box-shadow: 0 0 16px currentColor;
  }
  .hb-waffle-tile-icon.current {
    box-shadow: 0 0 0 2px currentColor;
    animation: hb-tile-pulse 2s ease-in-out infinite;
  }
  .hb-waffle-tile-name {
    font-size: 11px;
    font-weight: 500;
    color: #e8eaec;
    text-align: center;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
    max-width: 72px;
  }
  .hb-waffle-sep {
    height: 1px;
    background: rgba(255,255,255,0.06);
    margin: 12px 0;
    grid-column: 1 / -1;
  }
  .hb-waffle-section-label {
    font-size: 11px;
    font-weight: 600;
    color: #8c8c8c;
    margin-bottom: 8px;
    grid-column: 1 / -1;
  }
  .hb-waffle-explore {
    display: block;
    text-align: center;
    font-size: 12px;
    font-weight: 500;
    color: #f97316;
    text-decoration: none;
    padding: 12px 0 4px;
    transition: opacity 0.15s;
  }
  .hb-waffle-explore:hover { opacity: 0.7; }

  /* Product Switcher (legacy text dropdown - now hidden, waffle replaces it) */
  .hb-switcher {
    position: relative;
    flex-shrink: 0;
  }
  .hb-switcher-btn {
    display: flex;
    align-items: center;
    gap: 6px;
    padding: 6px 10px;
    background: transparent;
    border: none;
    border-radius: 6px;
    color: #f1f5f9;
    font-size: 14px;
    font-weight: 500;
    cursor: pointer;
    transition: background 0.15s;
    white-space: nowrap;
  }
  .hb-switcher-btn:hover { background: rgba(255,255,255,0.04); }
  .hb-chevron {
    width: 14px;
    height: 14px;
    opacity: 0.6;
    transition: transform 0.2s;
    flex-shrink: 0;
  }
  .hb-chevron.open { transform: rotate(180deg); }
  .hb-product-dot {
    width: 8px;
    height: 8px;
    border-radius: 50%;
    flex-shrink: 0;
  }

  /* Chat button */
  .hb-chat-btn {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 36px;
    height: 36px;
    background: transparent;
    border: none;
    border-radius: 8px;
    color: #94a3b8;
    cursor: pointer;
    transition: background 0.15s, color 0.15s;
  }
  .hb-chat-btn:hover { background: rgba(255,255,255,0.04); color: #f1f5f9; }

  /* Search */
  .hb-search-wrap {
    flex: 1;
    max-width: 480px;
    margin: 0 auto;
    position: relative;
  }
  .hb-search-trigger {
    display: flex;
    align-items: center;
    gap: 8px;
    width: 100%;
    padding: 7px 12px;
    background: rgba(255,255,255,0.04);
    border: 1px solid rgba(255,255,255,0.06);
    border-radius: 8px;
    color: #64748b;
    font-size: 13px;
    cursor: pointer;
    transition: border-color 0.15s, background 0.15s;
  }
  .hb-search-trigger:hover {
    border-color: rgba(255,255,255,0.1);
    background: rgba(255,255,255,0.06);
  }
  .hb-search-trigger-text { flex: 1; text-align: left; }
  .hb-kbd {
    display: flex;
    align-items: center;
    gap: 2px;
    flex-shrink: 0;
  }
  .hb-kbd kbd {
    display: inline-block;
    padding: 1px 5px;
    background: rgba(255,255,255,0.06);
    border-radius: 4px;
    font-size: 11px;
    font-family: inherit;
    color: #94a3b8;
    border: 1px solid rgba(255,255,255,0.1);
  }

  /* Search Overlay */
  .hb-search-overlay {
    position: fixed;
    inset: 0;
    background: rgba(0,0,0,0.6);
    z-index: 10001;
    display: flex;
    flex-direction: column;
    align-items: center;
    padding-top: 80px;
    animation: hb-fade-in 0.1s ease;
  }
  .hb-search-modal {
    width: 600px;
    max-width: calc(100vw - 32px);
    background: #09090b;
    border: 1px solid rgba(255,255,255,0.06);
    border-radius: 12px;
    box-shadow: 0 24px 64px rgba(0,0,0,0.7);
    overflow: hidden;
  }
  .hb-search-input-row {
    display: flex;
    align-items: center;
    gap: 10px;
    padding: 14px 16px;
    border-bottom: 1px solid rgba(255,255,255,0.06);
  }
  .hb-search-input {
    flex: 1;
    background: transparent;
    border: none;
    outline: none;
    color: #f1f5f9;
    font-size: 16px;
    font-family: inherit;
    caret-color: #f97316;
  }
  .hb-search-input::placeholder { color: #475569; }
  .hb-search-results {
    max-height: 400px;
    overflow-y: auto;
    padding: 8px;
  }
  .hb-search-results:empty::after {
    content: 'No results';
    display: block;
    text-align: center;
    color: #475569;
    padding: 24px;
    font-size: 13px;
  }
  .hb-search-group-label {
    font-size: 11px;
    font-weight: 600;
    text-transform: uppercase;
    letter-spacing: 0.06em;
    color: #475569;
    padding: 8px 8px 4px;
  }
  .hb-search-item {
    display: flex;
    align-items: center;
    gap: 10px;
    padding: 9px 10px;
    border-radius: 7px;
    cursor: pointer;
    transition: background 0.1s;
    text-decoration: none;
    color: inherit;
  }
  .hb-search-item:hover, .hb-search-item.focused {
    background: rgba(255,255,255,0.04);
  }
  .hb-search-item-icon {
    width: 32px;
    height: 32px;
    border-radius: 8px;
    background: rgba(255,255,255,0.04);
    display: flex;
    align-items: center;
    justify-content: center;
    flex-shrink: 0;
    font-size: 14px;
  }
  .hb-search-item-body { flex: 1; min-width: 0; }
  .hb-search-item-title {
    font-size: 14px;
    font-weight: 500;
    color: #f1f5f9;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  }
  .hb-search-item-sub {
    font-size: 12px;
    color: #64748b;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  }
  .hb-source-badge {
    font-size: 10px;
    font-weight: 600;
    padding: 2px 6px;
    border-radius: 4px;
    background: rgba(255,255,255,0.04);
    color: #94a3b8;
    flex-shrink: 0;
    text-transform: uppercase;
    letter-spacing: 0.04em;
  }
  .hb-search-loading {
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 24px;
    color: #475569;
    font-size: 13px;
    gap: 8px;
  }
  .hb-spinner {
    width: 16px;
    height: 16px;
    border: 2px solid rgba(255,255,255,0.06);
    border-top-color: #f97316;
    border-radius: 50%;
    animation: hb-spin 0.6s linear infinite;
  }
  .hb-search-empty {
    text-align: center;
    padding: 32px 16px;
    color: #475569;
    font-size: 13px;
  }
  .hb-search-empty-hint {
    font-size: 12px;
    color: #334155;
    margin-top: 4px;
  }

  /* Notifications */
  .hb-notif {
    position: relative;
    flex-shrink: 0;
  }
  .hb-notif-btn {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 36px;
    height: 36px;
    background: transparent;
    border: none;
    border-radius: 8px;
    color: #94a3b8;
    cursor: pointer;
    transition: background 0.15s, color 0.15s;
    position: relative;
  }
  .hb-notif-btn:hover { background: rgba(255,255,255,0.04); color: #f1f5f9; }
  .hb-badge {
    position: absolute;
    top: 4px;
    right: 4px;
    min-width: 16px;
    height: 16px;
    background: #ef4444;
    border-radius: 8px;
    font-size: 10px;
    font-weight: 700;
    color: #fff;
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 0 3px;
    pointer-events: none;
  }
  .hb-notif-dropdown {
    position: absolute;
    top: calc(100% + 6px);
    right: 0;
    width: 360px;
    background: #09090b;
    border: 1px solid rgba(255,255,255,0.06);
    border-radius: 10px;
    box-shadow: 0 8px 32px rgba(0,0,0,0.5);
    z-index: 10000;
    animation: hb-fade-in 0.12s ease;
    overflow: hidden;
  }
  .hb-notif-header {
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 12px 14px;
    border-bottom: 1px solid rgba(255,255,255,0.06);
  }
  .hb-notif-title {
    font-size: 13px;
    font-weight: 600;
    color: #f1f5f9;
  }
  .hb-notif-mark-read {
    font-size: 12px;
    color: #f97316;
    background: none;
    border: none;
    cursor: pointer;
    padding: 0;
    transition: opacity 0.15s;
  }
  .hb-notif-mark-read:hover { opacity: 0.7; }
  .hb-notif-list {
    max-height: 360px;
    overflow-y: auto;
  }
  .hb-notif-item {
    display: flex;
    align-items: flex-start;
    gap: 0;
    padding: 0;
    position: relative;
    border-bottom: 1px solid rgba(255,255,255,0.03);
    transition: background 0.1s;
  }
  .hb-notif-item:hover { background: rgba(255,255,255,0.04); }
  .hb-notif-item.unread { background: rgba(249,115,22,0.04); }
  .hb-notif-item.unread:hover { background: rgba(249,115,22,0.07); }
  .hb-notif-item-link {
    display: flex;
    align-items: flex-start;
    gap: 10px;
    padding: 11px 14px;
    padding-right: 32px;
    flex: 1;
    min-width: 0;
    text-decoration: none;
    color: inherit;
    cursor: pointer;
  }
  .hb-notif-icon {
    width: 8px;
    height: 8px;
    border-radius: 50%;
    flex-shrink: 0;
    margin-top: 6px;
  }
  .hb-notif-body { flex: 1; min-width: 0; }
  .hb-notif-body-title {
    font-size: 13px;
    font-weight: 500;
    color: #e2e8f0;
    display: flex;
    align-items: center;
    gap: 6px;
  }
  .hb-notif-body-text {
    font-size: 12px;
    color: #94a3b8;
    margin-top: 2px;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  }
  .hb-notif-group-badge {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    min-width: 18px;
    height: 18px;
    border-radius: 9px;
    background: rgba(249,115,22,0.15);
    color: #fb923c;
    font-size: 10px;
    font-weight: 700;
    padding: 0 4px;
    flex-shrink: 0;
  }
  .hb-notif-meta {
    display: flex;
    align-items: center;
    gap: 6px;
    margin-top: 2px;
  }
  .hb-notif-time {
    font-size: 11px;
    color: #475569;
  }
  .hb-notif-dismiss {
    position: absolute;
    top: 8px;
    right: 8px;
    width: 24px;
    height: 24px;
    display: flex;
    align-items: center;
    justify-content: center;
    background: none;
    border: none;
    border-radius: 4px;
    color: #475569;
    cursor: pointer;
    opacity: 0;
    transition: opacity 0.15s, background 0.15s, color 0.15s;
  }
  .hb-notif-item:hover .hb-notif-dismiss { opacity: 1; }
  .hb-notif-dismiss:hover { background: rgba(255,255,255,0.06); color: #94a3b8; }
  .hb-notif-empty {
    text-align: center;
    padding: 32px 16px;
    color: #475569;
    font-size: 13px;
  }
  .hb-notif-footer {
    padding: 8px 14px;
    border-top: 1px solid rgba(255,255,255,0.06);
  }
  .hb-notif-footer-row {
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: 8px;
  }
  .hb-notif-mute-group {
    display: flex;
    gap: 6px;
  }
  .hb-notif-mute-btn {
    font-size: 11px;
    color: #64748b;
    background: none;
    border: 1px solid rgba(255,255,255,0.06);
    border-radius: 4px;
    padding: 3px 8px;
    cursor: pointer;
    transition: color 0.15s, border-color 0.15s;
    font-family: inherit;
  }
  .hb-notif-mute-btn:hover { color: #94a3b8; border-color: rgba(255,255,255,0.12); }
  .hb-notif-settings-link {
    display: flex;
    align-items: center;
    gap: 4px;
    font-size: 12px;
    color: #64748b;
    text-decoration: none;
    transition: color 0.15s;
  }
  .hb-notif-settings-link:hover { color: #94a3b8; }

  /* Toast Notifications */
  .hb-toast-container {
    position: fixed;
    bottom: 16px;
    right: 16px;
    display: flex;
    flex-direction: column-reverse;
    gap: 8px;
    z-index: 10002;
    pointer-events: none;
  }
  .hb-toast {
    display: flex;
    align-items: flex-start;
    gap: 10px;
    padding: 12px 14px;
    background: #09090b;
    border: 1px solid rgba(255,255,255,0.08);
    border-left: 3px solid #60a5fa;
    border-radius: 10px;
    box-shadow: 0 8px 32px rgba(0,0,0,0.5);
    min-width: 320px;
    max-width: 420px;
    animation: hb-toast-enter 0.3s cubic-bezier(0.25, 0.1, 0.25, 1);
    pointer-events: auto;
    font-family: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;
    color: #e2e8f0;
  }
  .hb-toast-dot {
    width: 8px;
    height: 8px;
    border-radius: 50%;
    flex-shrink: 0;
    margin-top: 4px;
  }
  .hb-toast-body {
    flex: 1;
    min-width: 0;
  }
  .hb-toast-title {
    font-size: 13px;
    font-weight: 600;
    color: #f1f5f9;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  }
  .hb-toast-text {
    font-size: 12px;
    color: #94a3b8;
    margin-top: 2px;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  }
  .hb-toast-link {
    display: inline-block;
    margin-top: 4px;
    font-size: 12px;
    font-weight: 600;
    color: #f97316;
    text-decoration: none;
    transition: opacity 0.15s;
  }
  .hb-toast-link:hover { opacity: 0.7; }
  .hb-toast-close {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 24px;
    height: 24px;
    background: none;
    border: none;
    border-radius: 4px;
    color: #475569;
    cursor: pointer;
    flex-shrink: 0;
    transition: background 0.15s, color 0.15s;
  }
  .hb-toast-close:hover { background: rgba(255,255,255,0.06); color: #94a3b8; }
  @keyframes hb-toast-enter {
    from { opacity: 0; transform: translateY(12px) scale(0.95); }
    to   { opacity: 1; transform: translateY(0) scale(1); }
  }
  @media (max-width: 480px) {
    .hb-toast-container { left: 8px; right: 8px; }
    .hb-toast { min-width: 0; max-width: 100%; }
  }

  /* User Menu */
  .hb-user {
    position: relative;
    flex-shrink: 0;
  }
  .hb-user-btn {
    display: flex;
    align-items: center;
    gap: 7px;
    padding: 4px 8px 4px 4px;
    background: transparent;
    border: none;
    border-radius: 8px;
    color: #f1f5f9;
    cursor: pointer;
    transition: background 0.15s;
  }
  .hb-user-btn:hover { background: rgba(255,255,255,0.04); }
  .hb-avatar {
    width: 28px;
    height: 28px;
    border-radius: 50%;
    background: linear-gradient(135deg, #6366f1, #8b5cf6);
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 11px;
    font-weight: 700;
    color: #fff;
    flex-shrink: 0;
  }
  .hb-user-name {
    font-size: 13px;
    font-weight: 500;
    max-width: 100px;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  }
  .hb-user-dropdown {
    position: absolute;
    top: calc(100% + 6px);
    right: 0;
    width: 220px;
    background: #09090b;
    border: 1px solid rgba(255,255,255,0.06);
    border-radius: 10px;
    padding: 6px;
    box-shadow: 0 8px 32px rgba(0,0,0,0.5);
    z-index: 10000;
    animation: hb-fade-in 0.12s ease;
  }
  .hb-user-info {
    padding: 8px 10px 10px;
    border-bottom: 1px solid rgba(255,255,255,0.06);
    margin-bottom: 4px;
  }
  .hb-user-email {
    font-size: 12px;
    color: #64748b;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  }
  .hb-user-tenant {
    font-size: 11px;
    color: #475569;
    margin-top: 2px;
  }
  .hb-menu-item {
    display: flex;
    align-items: center;
    gap: 9px;
    padding: 8px 10px;
    border-radius: 6px;
    color: #94a3b8;
    font-size: 13px;
    cursor: pointer;
    transition: background 0.12s, color 0.12s;
    text-decoration: none;
    background: none;
    border: none;
    width: 100%;
    text-align: left;
    font-family: inherit;
  }
  .hb-menu-item:hover { background: rgba(255,255,255,0.04); color: #f1f5f9; }
  .hb-menu-item.danger { color: #f87171; }
  .hb-menu-item.danger:hover { background: #2d1515; color: #fca5a5; }
  .hb-menu-sep {
    height: 1px;
    background: rgba(255,255,255,0.06);
    margin: 4px 0;
  }
  .hb-add-product {
    display: flex;
    align-items: center;
    gap: 8px;
    padding: 7px 8px;
    border-radius: 6px;
    color: #f97316;
    font-size: 13px;
    font-weight: 500;
    cursor: pointer;
    transition: background 0.12s;
    text-decoration: none;
  }
  .hb-add-product:hover { background: rgba(255,255,255,0.04); }

  /* Reduce motion */
  @media (prefers-reduced-motion: reduce) {
    .hb-waffle-tile,
    .hb-waffle-panel,
    .hb-notif-dropdown,
    .hb-user-dropdown,
    .hb-sp-panel,
    .hb-jv-panel {
      animation: none !important;
      opacity: 1 !important;
    }
    .hb-waffle-tile-icon { transition: none !important; }
    .hb-waffle-tile-icon.current { animation: none !important; }
  }

  /* Responsive */
  @media (max-width: 640px) {
    .hb-search-wrap { display: none; }
    .hb-logo-name { display: none; }
    .hb-user-name { display: none; }
    .hb-waffle-panel { width: 100vw; border-radius: 0; }
  }

  /* Animations */
  /* Tile stagger animation */
  .hb-waffle-tile {
    opacity: 0;
    animation: hb-tile-enter 0.2s ease forwards;
  }
  .hb-waffle-tile:nth-child(1) { animation-delay: 0ms; }
  .hb-waffle-tile:nth-child(2) { animation-delay: 30ms; }
  .hb-waffle-tile:nth-child(3) { animation-delay: 60ms; }
  .hb-waffle-tile:nth-child(4) { animation-delay: 90ms; }
  .hb-waffle-tile:nth-child(5) { animation-delay: 120ms; }
  .hb-waffle-tile:nth-child(6) { animation-delay: 150ms; }
  .hb-waffle-tile:nth-child(7) { animation-delay: 180ms; }
  .hb-waffle-tile:nth-child(8) { animation-delay: 210ms; }
  .hb-waffle-tile:nth-child(9) { animation-delay: 240ms; }
  .hb-waffle-tile:nth-child(10) { animation-delay: 270ms; }
  .hb-waffle-tile:nth-child(11) { animation-delay: 300ms; }
  .hb-waffle-tile:nth-child(12) { animation-delay: 330ms; }
  .hb-waffle-tile:nth-child(n+13) { animation-delay: 360ms; }

  @keyframes hb-tile-enter {
    from { opacity: 0; transform: scale(0.9); }
    to   { opacity: 1; transform: scale(1); }
  }
  @keyframes hb-tile-pulse {
    0%, 100% { box-shadow: 0 0 0 2px currentColor; }
    50% { box-shadow: 0 0 12px currentColor, 0 0 0 2px currentColor; }
  }
  @keyframes hb-panel-slide {
    from { opacity: 0; transform: translateY(-8px) scale(0.97); }
    to   { opacity: 1; transform: translateY(0) scale(1); }
  }
  @keyframes hb-fade-in {
    from { opacity: 0; transform: translateY(-4px); }
    to   { opacity: 1; transform: translateY(0); }
  }
  @keyframes hb-spin {
    to { transform: rotate(360deg); }
  }
  @keyframes hb-sp-slide-in {
    from { transform: translateX(100%); opacity: 0; }
    to   { transform: translateX(0); opacity: 1; }
  }

  /* ── Support Panel ─────────────────────────────────────────────────── */

  /* Overlay */
  .hb-sp-overlay {
    position: fixed;
    inset: 0;
    background: rgba(0,0,0,0.45);
    z-index: 10010;
    animation: hb-fade-in 0.15s ease;
  }

  /* Panel */
  .hb-sp-panel {
    position: fixed;
    top: 0;
    right: 0;
    bottom: 0;
    width: 420px;
    max-width: 100vw;
    background: #0f0f11;
    border-left: 1px solid rgba(255,255,255,0.07);
    box-shadow: -16px 0 48px rgba(0,0,0,0.6);
    display: flex;
    flex-direction: column;
    font-family: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;
    font-size: 14px;
    line-height: 1.5;
    color: #e2e8f0;
    -webkit-font-smoothing: antialiased;
    z-index: 10011;
    animation: hb-sp-slide-in 0.2s ease;
  }
  .hb-sp-panel *, .hb-sp-panel *::before, .hb-sp-panel *::after {
    box-sizing: border-box;
  }

  /* Header */
  .hb-sp-header {
    display: flex;
    align-items: center;
    gap: 8px;
    padding: 0 14px;
    height: 52px;
    border-bottom: 1px solid rgba(255,255,255,0.07);
    flex-shrink: 0;
  }
  .hb-sp-header-title {
    font-size: 15px;
    font-weight: 600;
    color: #f1f5f9;
    flex: 1;
  }
  .hb-sp-back-btn {
    background: none;
    border: none;
    color: #f97316;
    font-size: 13px;
    font-weight: 500;
    cursor: pointer;
    padding: 4px 8px 4px 0;
    font-family: inherit;
    flex-shrink: 0;
    transition: opacity 0.15s;
  }
  .hb-sp-back-btn:hover { opacity: 0.7; }
  .hb-sp-close-btn {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 32px;
    height: 32px;
    background: none;
    border: none;
    border-radius: 6px;
    color: #64748b;
    cursor: pointer;
    transition: background 0.15s, color 0.15s;
    flex-shrink: 0;
    margin-left: auto;
  }
  .hb-sp-close-btn:hover { background: rgba(255,255,255,0.06); color: #f1f5f9; }

  /* Scrollable content area */
  .hb-sp-content {
    flex: 1;
    overflow-y: auto;
    overflow-x: hidden;
  }
  .hb-sp-content::-webkit-scrollbar { width: 4px; }
  .hb-sp-content::-webkit-scrollbar-track { background: transparent; }
  .hb-sp-content::-webkit-scrollbar-thumb { background: rgba(255,255,255,0.1); border-radius: 2px; }

  /* Hub page */
  .hb-sp-hub { padding: 20px 16px; }
  .hb-sp-hub-header { margin-bottom: 20px; }
  .hb-sp-hub-title {
    font-size: 20px;
    font-weight: 700;
    color: #f1f5f9;
    margin-bottom: 4px;
  }
  .hb-sp-hub-sub { font-size: 13px; color: #64748b; }
  .hb-sp-hub-grid {
    display: flex;
    flex-direction: column;
    gap: 8px;
    margin-bottom: 20px;
  }
  .hb-sp-card {
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    gap: 3px;
    padding: 14px 16px;
    background: rgba(255,255,255,0.03);
    border: 1px solid rgba(255,255,255,0.07);
    border-radius: 10px;
    cursor: pointer;
    text-align: left;
    transition: background 0.15s, border-color 0.15s;
    font-family: inherit;
    width: 100%;
  }
  .hb-sp-card:hover { background: rgba(249,115,22,0.06); border-color: rgba(249,115,22,0.25); }
  .hb-sp-card-label { font-size: 14px; font-weight: 600; color: #f1f5f9; }
  .hb-sp-card-desc { font-size: 12px; color: #64748b; }
  .hb-sp-hub-links { display: flex; flex-direction: column; }
  .hb-sp-link-item {
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 13px 4px;
    border-bottom: 1px solid rgba(255,255,255,0.05);
    cursor: pointer;
    background: none;
    border-left: none;
    border-right: none;
    border-top: none;
    color: #94a3b8;
    font-size: 13px;
    font-weight: 500;
    font-family: inherit;
    text-align: left;
    width: 100%;
    transition: color 0.15s;
  }
  .hb-sp-link-item:last-child { border-bottom: none; }
  .hb-sp-link-item:hover { color: #f1f5f9; }
  .hb-sp-chevron { font-size: 18px; color: #475569; }
  .hb-sp-section-label {
    font-size: 11px; font-weight: 600; text-transform: uppercase;
    letter-spacing: 0.05em; color: #475569; padding: 4px 0 6px;
  }

  /* Forms */
  .hb-sp-form-page { padding: 16px; display: flex; flex-direction: column; gap: 14px; }
  .hb-sp-field { display: flex; flex-direction: column; gap: 6px; }
  .hb-sp-label { font-size: 12px; font-weight: 600; color: #94a3b8; text-transform: uppercase; letter-spacing: 0.04em; }
  .hb-sp-input {
    width: 100%;
    padding: 8px 10px;
    background: rgba(255,255,255,0.04);
    border: 1px solid rgba(255,255,255,0.1);
    border-radius: 8px;
    color: #f1f5f9;
    font-size: 14px;
    font-family: inherit;
    outline: none;
    transition: border-color 0.15s;
  }
  .hb-sp-input:focus { border-color: #f97316; }
  .hb-sp-input::placeholder { color: #475569; }
  .hb-sp-textarea {
    width: 100%;
    padding: 8px 10px;
    background: rgba(255,255,255,0.04);
    border: 1px solid rgba(255,255,255,0.1);
    border-radius: 8px;
    color: #f1f5f9;
    font-size: 14px;
    font-family: inherit;
    outline: none;
    resize: vertical;
    min-height: 80px;
    transition: border-color 0.15s;
  }
  .hb-sp-textarea:focus { border-color: #f97316; }
  .hb-sp-textarea::placeholder { color: #475569; }
  .hb-sp-char-count { font-size: 11px; color: #475569; text-align: right; }
  .hb-sp-type-row { display: flex; gap: 6px; flex-wrap: wrap; }
  .hb-sp-type-btn {
    padding: 5px 12px;
    border-radius: 6px;
    border: 1px solid rgba(255,255,255,0.1);
    background: transparent;
    color: #94a3b8;
    font-size: 12px;
    font-weight: 500;
    font-family: inherit;
    cursor: pointer;
    transition: all 0.15s;
  }
  .hb-sp-type-btn:hover { border-color: rgba(255,255,255,0.2); color: #f1f5f9; }
  .hb-sp-type-btn.active { background: #f97316; border-color: #f97316; color: #fff; }
  .hb-sp-chip-row { display: flex; gap: 6px; flex-wrap: wrap; }
  .hb-sp-chip {
    padding: 4px 10px;
    border-radius: 20px;
    border: 1px solid rgba(255,255,255,0.1);
    background: transparent;
    color: #94a3b8;
    font-size: 12px;
    font-family: inherit;
    cursor: pointer;
    transition: all 0.15s;
  }
  .hb-sp-chip:hover { border-color: rgba(255,255,255,0.2); color: #f1f5f9; }
  .hb-sp-chip.active { background: rgba(249,115,22,0.15); border-color: #f97316; color: #fb923c; }
  .hb-sp-error { font-size: 13px; color: #f87171; padding: 8px 12px; background: rgba(239,68,68,0.08); border-radius: 8px; border: 1px solid rgba(239,68,68,0.2); }

  /* Buttons */
  .hb-sp-btn {
    padding: 9px 18px;
    border-radius: 8px;
    border: none;
    font-size: 14px;
    font-weight: 600;
    font-family: inherit;
    cursor: pointer;
    transition: opacity 0.15s, background 0.15s;
    width: 100%;
  }
  .hb-sp-btn:disabled { opacity: 0.4; cursor: not-allowed; }
  .hb-sp-btn-primary { background: #f97316; color: #fff; }
  .hb-sp-btn-primary:hover:not(:disabled) { background: #ea6c0c; }
  .hb-sp-btn-secondary { background: rgba(255,255,255,0.06); color: #f1f5f9; }
  .hb-sp-btn-secondary:hover:not(:disabled) { background: rgba(255,255,255,0.09); }
  .hb-sp-btn-ghost { background: none; color: #64748b; }
  .hb-sp-btn-ghost:hover:not(:disabled) { color: #94a3b8; }

  /* Success state */
  .hb-sp-success {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 12px;
    padding: 40px 24px;
    text-align: center;
  }
  .hb-sp-success-icon {
    width: 52px;
    height: 52px;
    border-radius: 50%;
    background: rgba(34,197,94,0.12);
    border: 2px solid #22c55e;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 24px;
    color: #22c55e;
  }
  .hb-sp-success-title { font-size: 18px; font-weight: 700; color: #f1f5f9; }
  .hb-sp-success-num { font-size: 13px; color: #64748b; }
  .hb-sp-success-actions { display: flex; flex-direction: column; gap: 8px; width: 100%; margin-top: 8px; }

  /* List pages */
  .hb-sp-list-page { padding: 12px 0; }
  .hb-sp-filter-row { display: flex; gap: 6px; padding: 4px 16px 12px; flex-wrap: wrap; }
  .hb-sp-filter-btn {
    padding: 4px 12px;
    border-radius: 20px;
    border: 1px solid rgba(255,255,255,0.1);
    background: transparent;
    color: #94a3b8;
    font-size: 12px;
    font-weight: 500;
    font-family: inherit;
    cursor: pointer;
    transition: all 0.15s;
  }
  .hb-sp-filter-btn:hover { border-color: rgba(255,255,255,0.2); color: #f1f5f9; }
  .hb-sp-filter-btn.active { background: rgba(249,115,22,0.12); border-color: #f97316; color: #fb923c; }
  .hb-sp-filter-btn-new { color: #f97316; border-color: rgba(249,115,22,0.3); margin-left: auto; }
  .hb-sp-filter-btn-new:hover { background: rgba(249,115,22,0.08); }
  .hb-sp-list { display: flex; flex-direction: column; }
  .hb-sp-list-item {
    display: flex;
    flex-direction: column;
    gap: 4px;
    padding: 13px 16px;
    cursor: pointer;
    background: none;
    border: none;
    border-bottom: 1px solid rgba(255,255,255,0.04);
    text-align: left;
    font-family: inherit;
    transition: background 0.1s;
    width: 100%;
  }
  .hb-sp-list-item:hover { background: rgba(255,255,255,0.03); }

  /* Ticket list */
  .hb-sp-ticket-top { display: flex; align-items: center; justify-content: space-between; }
  .hb-sp-ticket-num { font-size: 11px; font-weight: 700; color: #64748b; font-family: monospace; }
  .hb-sp-ticket-title { font-size: 14px; color: #e2e8f0; font-weight: 500; }
  .hb-sp-ticket-meta { font-size: 11px; color: #475569; }
  .hb-sp-badge {
    display: inline-block;
    padding: 2px 8px;
    border-radius: 12px;
    font-size: 11px;
    font-weight: 600;
    background: rgba(255,255,255,0.06);
    color: #94a3b8;
  }

  /* Ticket detail */
  .hb-sp-detail-page { padding: 16px; display: flex; flex-direction: column; gap: 12px; }
  .hb-sp-detail-header { display: flex; align-items: center; gap: 8px; }
  .hb-sp-detail-title { font-size: 17px; font-weight: 700; color: #f1f5f9; }
  .hb-sp-detail-desc { font-size: 13px; color: #94a3b8; white-space: pre-wrap; }
  .hb-sp-activity { display: flex; flex-direction: column; gap: 0; }
  .hb-sp-activity-title { font-size: 12px; font-weight: 700; color: #475569; text-transform: uppercase; letter-spacing: 0.06em; margin-bottom: 8px; }
  .hb-sp-activity-item {
    padding: 10px 0;
    border-top: 1px solid rgba(255,255,255,0.05);
    display: flex;
    flex-direction: column;
    gap: 3px;
  }
  .hb-sp-activity-actor { font-size: 12px; font-weight: 600; color: #94a3b8; }
  .hb-sp-activity-content { font-size: 13px; color: #e2e8f0; white-space: pre-wrap; }
  .hb-sp-activity-time { font-size: 11px; color: #475569; }
  .hb-sp-reply { display: flex; flex-direction: column; gap: 8px; padding-top: 8px; border-top: 1px solid rgba(255,255,255,0.07); }

  /* Changelog */
  .hb-sp-release { padding: 16px; border-bottom: 1px solid rgba(255,255,255,0.05); }
  .hb-sp-release-header { display: flex; align-items: center; gap: 8px; margin-bottom: 4px; }
  .hb-sp-release-ver { font-size: 12px; font-weight: 700; color: #f97316; font-family: monospace; }
  .hb-sp-release-date { font-size: 11px; color: #475569; }
  .hb-sp-release-title { font-size: 15px; font-weight: 600; color: #f1f5f9; margin-bottom: 6px; }
  .hb-sp-release-notes { font-size: 13px; color: #94a3b8; white-space: pre-wrap; }

  /* Features */
  .hb-sp-feature-item {
    display: flex;
    align-items: flex-start;
    gap: 12px;
    padding: 14px 16px;
    border-bottom: 1px solid rgba(255,255,255,0.04);
  }
  .hb-sp-feature-body { flex: 1; min-width: 0; display: flex; flex-direction: column; gap: 4px; }
  .hb-sp-feature-title { font-size: 14px; font-weight: 600; color: #e2e8f0; }
  .hb-sp-feature-desc { font-size: 12px; color: #64748b; }
  .hb-sp-vote-btn {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 2px;
    padding: 6px 10px;
    border-radius: 8px;
    border: 1px solid rgba(255,255,255,0.1);
    background: transparent;
    color: #94a3b8;
    font-size: 12px;
    font-weight: 600;
    font-family: inherit;
    cursor: pointer;
    transition: all 0.15s;
    flex-shrink: 0;
  }
  .hb-sp-vote-btn:hover { border-color: #f97316; color: #f97316; }
  .hb-sp-vote-btn.voted { background: rgba(249,115,22,0.1); border-color: #f97316; color: #fb923c; }
  .hb-sp-vote-btn:disabled { opacity: 0.5; cursor: not-allowed; }

  /* KB */
  .hb-sp-search-row { padding: 12px 16px 8px; }
  .hb-sp-kb-cats { display: flex; flex-direction: column; }
  .hb-sp-kb-cat {
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 13px 16px;
    border-bottom: 1px solid rgba(255,255,255,0.04);
    cursor: pointer;
    background: none;
    border-left: none;
    border-right: none;
    border-top: none;
    color: #e2e8f0;
    font-size: 14px;
    font-weight: 500;
    font-family: inherit;
    text-align: left;
    width: 100%;
    transition: background 0.1s;
  }
  .hb-sp-kb-cat:hover { background: rgba(255,255,255,0.03); }
  .hb-sp-kb-cat-count {
    font-size: 12px;
    color: #475569;
    background: rgba(255,255,255,0.04);
    padding: 2px 8px;
    border-radius: 12px;
  }

  /* KB article content */
  .hb-sp-article-content { font-size: 14px; color: #cbd5e1; line-height: 1.7; }
  .hb-sp-article-content h1,
  .hb-sp-article-content h2,
  .hb-sp-article-content h3 { color: #f1f5f9; margin: 16px 0 8px; font-weight: 600; }
  .hb-sp-article-content h1 { font-size: 20px; }
  .hb-sp-article-content h2 { font-size: 17px; }
  .hb-sp-article-content h3 { font-size: 15px; }
  .hb-sp-article-content p { margin: 0 0 12px; }
  .hb-sp-article-content ul,
  .hb-sp-article-content ol { padding-left: 20px; margin: 0 0 12px; }
  .hb-sp-article-content li { margin-bottom: 4px; }
  .hb-sp-article-content code {
    background: rgba(255,255,255,0.06);
    padding: 1px 5px;
    border-radius: 4px;
    font-size: 12px;
    font-family: 'Fira Code', 'Cascadia Code', monospace;
  }
  .hb-sp-article-content pre {
    background: rgba(0,0,0,0.4);
    padding: 12px;
    border-radius: 8px;
    overflow-x: auto;
    margin: 0 0 12px;
    font-size: 12px;
  }
  .hb-sp-article-content a { color: #f97316; text-decoration: none; }
  .hb-sp-article-content a:hover { text-decoration: underline; }
  .hb-sp-article-content blockquote {
    border-left: 3px solid rgba(249,115,22,0.4);
    margin: 0 0 12px;
    padding: 8px 12px;
    color: #94a3b8;
  }

  /* Loading / empty / skeleton */
  .hb-sp-loading { padding: 32px 16px; text-align: center; font-size: 13px; color: #475569; }
  .hb-sp-empty { padding: 40px 16px; display: flex; flex-direction: column; align-items: center; gap: 12px; }
  .hb-sp-empty-text { font-size: 14px; color: #475569; text-align: center; }
  .hb-sp-skeleton {
    height: 68px;
    background: linear-gradient(90deg, rgba(255,255,255,0.03) 25%, rgba(255,255,255,0.06) 50%, rgba(255,255,255,0.03) 75%);
    background-size: 200% 100%;
    animation: hb-sp-shimmer 1.4s infinite;
    border-radius: 8px;
    margin: 6px 16px;
  }
  @keyframes hb-sp-shimmer {
    0% { background-position: 200% 0; }
    100% { background-position: -200% 0; }
  }

  /* Responsive */
  @media (max-width: 480px) {
    .hb-sp-panel { width: 100vw; }
  }

  /* ── Jarvis AI Assistant ────────────────────────────────────────────────── */

  /* Trigger button */
  .hb-jv-btn {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 36px;
    height: 36px;
    background: transparent;
    border: none;
    border-radius: 8px;
    color: #94a3b8;
    cursor: pointer;
    transition: background 0.15s, color 0.15s;
    position: relative;
  }
  .hb-jv-btn:hover { background: rgba(255,255,255,0.04); color: #f97316; }
  .hb-jv-btn.active { color: #f97316; background: rgba(249,115,22,0.08); }
  .hb-jv-btn.pulse::after {
    content: '';
    position: absolute;
    top: 4px;
    right: 4px;
    width: 8px;
    height: 8px;
    background: #f97316;
    border-radius: 50%;
    animation: hb-jv-pulse 2s ease-in-out infinite;
  }
  @keyframes hb-jv-pulse {
    0%, 100% { opacity: 1; transform: scale(1); }
    50% { opacity: 0.5; transform: scale(1.3); }
  }

  /* Overlay */
  .hb-jv-overlay {
    position: fixed;
    inset: 0;
    background: rgba(0,0,0,0.45);
    z-index: 10010;
    animation: hb-fade-in 0.15s ease;
  }

  /* Panel */
  .hb-jv-panel {
    position: fixed;
    top: 0;
    right: 0;
    bottom: 0;
    width: 400px;
    max-width: 100vw;
    background: #0f0f11;
    border-left: 1px solid rgba(255,255,255,0.07);
    box-shadow: -16px 0 48px rgba(0,0,0,0.6);
    display: flex;
    flex-direction: column;
    font-family: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;
    font-size: 14px;
    line-height: 1.5;
    color: #e2e8f0;
    -webkit-font-smoothing: antialiased;
    z-index: 10011;
    animation: hb-sp-slide-in 0.2s ease;
  }
  .hb-jv-panel *, .hb-jv-panel *::before, .hb-jv-panel *::after {
    box-sizing: border-box;
  }

  /* Header */
  .hb-jv-header {
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 0 14px;
    height: 52px;
    border-bottom: 1px solid rgba(255,255,255,0.07);
    flex-shrink: 0;
  }
  .hb-jv-header-left {
    display: flex;
    align-items: center;
    gap: 8px;
  }
  .hb-jv-header-title {
    font-size: 15px;
    font-weight: 600;
    color: #f1f5f9;
  }
  .hb-jv-model-badge {
    font-size: 10px;
    font-weight: 600;
    padding: 2px 6px;
    border-radius: 4px;
    background: rgba(249,115,22,0.1);
    color: #fb923c;
    letter-spacing: 0.02em;
  }
  .hb-jv-header-right {
    display: flex;
    align-items: center;
    gap: 4px;
  }
  .hb-jv-clear-btn {
    font-size: 12px;
    color: #64748b;
    background: none;
    border: none;
    cursor: pointer;
    padding: 4px 8px;
    border-radius: 4px;
    font-family: inherit;
    transition: color 0.15s, background 0.15s;
  }
  .hb-jv-clear-btn:hover { color: #94a3b8; background: rgba(255,255,255,0.04); }
  .hb-jv-close-btn {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 32px;
    height: 32px;
    background: none;
    border: none;
    border-radius: 6px;
    color: #64748b;
    cursor: pointer;
    transition: background 0.15s, color 0.15s;
  }
  .hb-jv-close-btn:hover { background: rgba(255,255,255,0.06); color: #f1f5f9; }

  /* Messages area */
  .hb-jv-messages {
    flex: 1;
    overflow-y: auto;
    overflow-x: hidden;
    padding: 16px 14px;
    display: flex;
    flex-direction: column;
    gap: 16px;
  }
  .hb-jv-messages::-webkit-scrollbar { width: 4px; }
  .hb-jv-messages::-webkit-scrollbar-track { background: transparent; }
  .hb-jv-messages::-webkit-scrollbar-thumb { background: rgba(255,255,255,0.1); border-radius: 2px; }

  /* Welcome state */
  .hb-jv-welcome {
    display: flex;
    flex-direction: column;
    align-items: center;
    text-align: center;
    padding: 40px 16px 20px;
    gap: 12px;
  }
  .hb-jv-welcome-icon {
    width: 56px;
    height: 56px;
    border-radius: 16px;
    background: rgba(249,115,22,0.08);
    border: 1px solid rgba(249,115,22,0.15);
    display: flex;
    align-items: center;
    justify-content: center;
  }
  .hb-jv-welcome-title {
    font-size: 18px;
    font-weight: 700;
    color: #f1f5f9;
  }
  .hb-jv-welcome-sub {
    font-size: 13px;
    color: #64748b;
    max-width: 280px;
    line-height: 1.5;
  }
  .hb-jv-welcome-context {
    font-size: 11px;
    color: #475569;
    padding: 4px 10px;
    background: rgba(255,255,255,0.03);
    border-radius: 6px;
    margin-top: 4px;
  }
  .hb-jv-welcome-context strong { color: #94a3b8; }

  /* Message layout */
  .hb-jv-msg { display: flex; gap: 8px; }
  .hb-jv-msg-user { justify-content: flex-end; }
  .hb-jv-msg-assistant { justify-content: flex-start; align-items: flex-start; }

  .hb-jv-avatar {
    width: 28px;
    height: 28px;
    border-radius: 8px;
    background: rgba(249,115,22,0.08);
    border: 1px solid rgba(249,115,22,0.15);
    display: flex;
    align-items: center;
    justify-content: center;
    flex-shrink: 0;
    margin-top: 2px;
  }

  .hb-jv-bubble-wrap {
    display: flex;
    flex-direction: column;
    gap: 8px;
    max-width: calc(100% - 40px);
    min-width: 0;
  }

  /* Bubbles */
  .hb-jv-bubble {
    padding: 10px 14px;
    border-radius: 12px;
    font-size: 13px;
    line-height: 1.6;
    word-break: break-word;
  }
  .hb-jv-bubble-user {
    background: #f97316;
    color: #fff;
    border-bottom-right-radius: 4px;
    max-width: 280px;
  }
  .hb-jv-bubble-assistant {
    background: rgba(255,255,255,0.04);
    border: 1px solid rgba(255,255,255,0.06);
    color: #e2e8f0;
    border-bottom-left-radius: 4px;
  }
  .hb-jv-bubble-assistant.error {
    border-color: rgba(248,113,113,0.2);
    background: rgba(248,113,113,0.06);
    color: #fca5a5;
  }

  /* Markdown content in assistant bubbles */
  .hb-jv-bubble-assistant strong { color: #f1f5f9; }
  .hb-jv-bubble-assistant em { font-style: italic; color: #cbd5e1; }
  .hb-jv-inline-code {
    background: rgba(255,255,255,0.06);
    padding: 1px 5px;
    border-radius: 4px;
    font-size: 12px;
    font-family: 'Fira Code', 'Cascadia Code', monospace;
  }
  .hb-jv-code-block {
    background: rgba(0,0,0,0.4);
    padding: 10px 12px;
    border-radius: 6px;
    overflow-x: auto;
    margin: 6px 0;
    font-size: 12px;
    font-family: 'Fira Code', 'Cascadia Code', monospace;
    line-height: 1.5;
  }
  .hb-jv-code-block code { background: none; padding: 0; }
  .hb-jv-link { color: #f97316; text-decoration: none; }
  .hb-jv-link:hover { text-decoration: underline; }
  .hb-jv-list {
    padding-left: 16px;
    margin: 4px 0;
    list-style-type: disc;
  }
  .hb-jv-list li { margin-bottom: 2px; }

  /* Tool calls */
  .hb-jv-tool-calls {
    display: flex;
    flex-direction: column;
    gap: 4px;
  }
  .hb-jv-tool-call {
    display: flex;
    align-items: center;
    gap: 8px;
    padding: 6px 10px;
    background: rgba(255,255,255,0.02);
    border: 1px solid rgba(255,255,255,0.05);
    border-radius: 8px;
    font-size: 12px;
    color: #94a3b8;
  }
  .hb-jv-tool-call.running { border-color: rgba(249,115,22,0.15); }
  .hb-jv-tool-call.error { border-color: rgba(248,113,113,0.15); }
  .hb-jv-tool-icon {
    width: 16px;
    height: 16px;
    display: flex;
    align-items: center;
    justify-content: center;
    flex-shrink: 0;
    font-size: 11px;
  }
  .hb-jv-tool-spinner {
    width: 12px;
    height: 12px;
    border: 2px solid rgba(249,115,22,0.2);
    border-top-color: #f97316;
    border-radius: 50%;
    animation: hb-spin 0.6s linear infinite;
  }
  .hb-jv-tool-label { font-weight: 500; }
  .hb-jv-tool-summary { color: #64748b; margin-left: auto; }

  /* Typing indicator */
  .hb-jv-typing {
    display: inline-flex;
    gap: 4px;
    padding: 4px 0;
  }
  .hb-jv-typing span {
    width: 6px;
    height: 6px;
    background: #64748b;
    border-radius: 50%;
    animation: hb-jv-typing-bounce 1.4s ease-in-out infinite;
  }
  .hb-jv-typing span:nth-child(2) { animation-delay: 0.16s; }
  .hb-jv-typing span:nth-child(3) { animation-delay: 0.32s; }
  @keyframes hb-jv-typing-bounce {
    0%, 80%, 100% { transform: scale(0.6); opacity: 0.4; }
    40% { transform: scale(1); opacity: 1; }
  }

  /* Quick actions */
  .hb-jv-quick-actions {
    display: flex;
    flex-wrap: wrap;
    gap: 6px;
    padding: 0 14px 12px;
    flex-shrink: 0;
  }
  .hb-jv-quick-chip {
    padding: 6px 12px;
    border-radius: 20px;
    border: 1px solid rgba(255,255,255,0.08);
    background: transparent;
    color: #94a3b8;
    font-size: 12px;
    font-weight: 500;
    font-family: inherit;
    cursor: pointer;
    transition: all 0.15s;
    white-space: nowrap;
  }
  .hb-jv-quick-chip:hover {
    border-color: rgba(249,115,22,0.3);
    color: #fb923c;
    background: rgba(249,115,22,0.06);
  }
  .hb-jv-quick-chip:disabled { opacity: 0.4; cursor: not-allowed; }

  /* Input area */
  .hb-jv-input-area {
    border-top: 1px solid rgba(255,255,255,0.07);
    padding: 12px 14px;
    flex-shrink: 0;
  }
  .hb-jv-input-row {
    display: flex;
    align-items: flex-end;
    gap: 8px;
    background: rgba(255,255,255,0.04);
    border: 1px solid rgba(255,255,255,0.08);
    border-radius: 12px;
    padding: 8px 8px 8px 14px;
    transition: border-color 0.15s;
  }
  .hb-jv-input-row:focus-within {
    border-color: rgba(249,115,22,0.4);
  }
  .hb-jv-input {
    flex: 1;
    background: transparent;
    border: none;
    outline: none;
    color: #f1f5f9;
    font-size: 13px;
    font-family: inherit;
    resize: none;
    max-height: 120px;
    line-height: 1.5;
    caret-color: #f97316;
  }
  .hb-jv-input::placeholder { color: #475569; }
  .hb-jv-input:disabled { opacity: 0.5; }
  .hb-jv-send-btn {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 32px;
    height: 32px;
    background: #f97316;
    border: none;
    border-radius: 8px;
    color: #fff;
    cursor: pointer;
    flex-shrink: 0;
    transition: background 0.15s, opacity 0.15s;
  }
  .hb-jv-send-btn:hover { background: #ea6c0c; }
  .hb-jv-send-btn:disabled { opacity: 0.3; cursor: not-allowed; }
  .hb-jv-stop-btn {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 32px;
    height: 32px;
    background: rgba(248,113,113,0.12);
    border: 1px solid rgba(248,113,113,0.3);
    border-radius: 8px;
    color: #f87171;
    cursor: pointer;
    flex-shrink: 0;
    transition: background 0.15s;
  }
  .hb-jv-stop-btn:hover { background: rgba(248,113,113,0.2); }
  .hb-jv-stop-icon {
    display: block;
    width: 10px;
    height: 10px;
    background: #f87171;
    border-radius: 2px;
  }

  /* Input hint */
  .hb-jv-input-hint {
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 6px 2px 0;
  }
  .hb-jv-kbd-hint {
    display: flex;
    align-items: center;
    gap: 2px;
    font-size: 11px;
    color: #334155;
  }
  .hb-jv-kbd-hint kbd {
    display: inline-block;
    padding: 0px 4px;
    background: rgba(255,255,255,0.04);
    border-radius: 3px;
    font-size: 10px;
    font-family: inherit;
    color: #475569;
    border: 1px solid rgba(255,255,255,0.06);
  }
  .hb-jv-powered {
    font-size: 11px;
    color: #334155;
  }

  /* Jarvis responsive */
  @media (max-width: 480px) {
    .hb-jv-panel { width: 100vw; }
  }

  /* Reduce motion for Jarvis */
  @media (prefers-reduced-motion: reduce) {
    .hb-jv-panel { animation: none !important; }
    .hb-jv-typing span { animation: none !important; opacity: 0.6; }
    .hb-jv-tool-spinner { animation: none !important; }
    .hb-jv-btn.pulse::after { animation: none !important; }
  }
`;function ke(s){if(typeof document>"u")return null;const t=document.cookie.match(new RegExp("(?:^|;\\s*)"+s+"=([^;]*)"));if(!t)return null;try{return decodeURIComponent(t[1])}catch{return null}}function we(s){try{const t=s.split(".");if(t.length!==3)return null;const a=t[1].replace(/-/g,"+").replace(/_/g,"/"),n=a+"=".repeat((4-a.length%4)%4);return JSON.parse(atob(n))}catch{return null}}function je(s,t,a){if(t&&a)return(t[0]+a[0]).toUpperCase();if(t)return t.slice(0,2).toUpperCase();const n=s.split("@")[0].split(/[._-]/);return n.length>=2?(n[0][0]+n[1][0]).toUpperCase():s.slice(0,2).toUpperCase()}function ne(s){return i.useMemo(()=>{if(s)return s;const t=ke("hub_session");if(!t)return null;const a=we(t);if(!a)return null;const n=a.userId||a.sub||"",o=a.tenantId||a.tenant_id||"",d=a.tenantSlug||"",p=a.tenantName||d,l=a.email||"",c=a.role||"member",r=a.orgRole,u=a.entitlements,b=a.firstName,v=a.lastName;return!n||!l?null:{userId:n,tenantId:o,tenantSlug:d,tenantName:p,email:l,role:c,orgRole:r,entitlements:u,firstName:b,lastName:v,initials:je(l,b,v)}},[s])}function ie(s,t){const[a,n]=i.useState([]),[o,d]=i.useState(!1),[p,l]=i.useState(null);return i.useEffect(()=>{if(!t){n(I.map(r=>({...r,active:!1})));return}d(!0),l(null);const c=new AbortController;return fetch(`${s}/api/bus/products?tenant_id=${encodeURIComponent(t)}`,{credentials:"include",signal:c.signal}).then(r=>{if(!r.ok)throw new Error(`Products API returned ${r.status}`);return r.json()}).then(r=>{const u=new Set(r.activeProductIds);n(I.map(b=>({...b,active:u.has(b.id)}))),d(!1)}).catch(r=>{r.name!=="AbortError"&&(n(I.map(u=>({...u,active:!1}))),l(r.message),d(!1))}),()=>c.abort()},[s,t]),{products:a,loading:o,error:p}}function re(s,t,a,n){const[o,d]=i.useState([]),[p,l]=i.useState([]),[c,r]=i.useState(!1),u=i.useRef(null),b=i.useRef(null);i.useEffect(()=>{if(!a||!n)return;const j=new AbortController;return fetch(`${s}/api/bus/notifications?user_id=${encodeURIComponent(n)}&limit=20`,{credentials:"include",signal:j.signal}).then(w=>w.ok?w.json():Promise.resolve({notifications:[]})).then(w=>{d(w.notifications??[])}).catch(()=>{}),()=>j.abort()},[s,a,n]),i.useEffect(()=>{if(!t||!a)return;let j=!1;return(async()=>{try{const{HubConnectionBuilder:w,LogLevel:g}=await Promise.resolve().then(()=>require("./index-BcawcpwG.cjs")),N=new w().withUrl(`${t}?tenantId=${encodeURIComponent(a)}`).withAutomaticReconnect().configureLogging(g.Warning).build();N.on("notification",y=>{d(S=>[y,...S.slice(0,49)]),u.current||(l(S=>[...S,y]),setTimeout(()=>{l(S=>S.filter(z=>z.id!==y.id))},5e3))}),N.on("notificationsRead",y=>{const S=new Set(y);d(z=>z.map(E=>S.has(E.id)?{...E,read:!0}:E))}),N.on("busEvent",y=>{const S={id:y.event_id,productId:y.source,productName:y.source.toUpperCase(),title:y.title,body:y.detail,severity:y.severity==="critical"?"error":y.severity,read:!1,deepLink:y.entity_url||"",createdAt:y.timestamp};d(z=>[S,...z.slice(0,49)]),u.current||(l(z=>[...z,S]),setTimeout(()=>{l(z=>z.filter(E=>E.id!==S.id))},5e3))}),j||(await N.start(),b.current=N)}catch{}})(),()=>{var w;j=!0,(w=b.current)==null||w.stop(),b.current=null}},[t,a]);const v=i.useCallback(j=>{d(w=>w.map(g=>g.id===j?{...g,read:!0}:g)),fetch(`${s}/api/bus/notifications/${encodeURIComponent(j)}/read`,{method:"POST",credentials:"include"}).catch(()=>{})},[s]),f=i.useCallback(()=>{d(j=>j.map(w=>({...w,read:!0}))),fetch(`${s}/api/bus/notifications/mark-all-read`,{method:"POST",credentials:"include"}).catch(()=>{})},[s]),m=i.useCallback(j=>{d(w=>w.filter(g=>g.id!==j)),fetch(`${s}/api/bus/notifications/${encodeURIComponent(j)}/dismiss`,{method:"POST",credentials:"include"}).catch(()=>{})},[s]),_=i.useCallback(j=>{r(!0),u.current&&clearTimeout(u.current),u.current=setTimeout(()=>{r(!1),u.current=null},j)},[]),x=i.useCallback(()=>{r(!1),u.current&&(clearTimeout(u.current),u.current=null)},[]),h=i.useCallback(j=>{l(w=>w.filter(g=>g.id!==j))},[]),C=o.filter(j=>!j.read).length;return{notifications:o,unreadCount:C,markAllRead:f,markRead:v,dismiss:m,muted:c,muteUntil:_,unmute:x,toastQueue:p,dismissToast:h}}const k=s=>function({size:a=16,className:n,color:o="currentColor"}){const d=Array.isArray(s)?s:[s];return e.jsx("svg",{xmlns:"http://www.w3.org/2000/svg",width:a,height:a,viewBox:"0 0 24 24",fill:"none",stroke:o,strokeWidth:"2",strokeLinecap:"round",strokeLinejoin:"round",className:n,children:d.map((p,l)=>e.jsx("path",{d:p},l))})},W=k("M21 21l-4.35-4.35M17 11A6 6 0 1 1 5 11a6 6 0 0 1 12 0z"),Ne=k(["M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9","M13.73 21a2 2 0 0 1-3.46 0"]),D=k("M18 6 6 18M6 6l12 12"),Se=k(["M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2","M12 3a4 4 0 1 0 0 8 4 4 0 0 0 0-8z"]),oe=k(["M12 20a8 8 0 1 0 0-16 8 8 0 0 0 0 16z","M12 14a2 2 0 1 0 0-4 2 2 0 0 0 0 4z"]),Ce=k(["M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4","M16 17l5-5-5-5","M21 12H9"]),ze=k(["M7 16V4m0 0L3 8m4-4 4 4","M17 8v12m0 0 4-4m-4 4-4-4"]),Me=k(["M12 22a10 10 0 1 0 0-20 10 10 0 0 0 0 20z","M12 16a4 4 0 1 0 0-8 4 4 0 0 0 0 8z","M4.93 4.93l4.24 4.24","M14.83 14.83l4.24 4.24","M14.83 9.17l4.24-4.24","M14.83 9.17l3.53-3.53","M4.93 19.07l4.24-4.24"]),_e=k(["M16 20V4a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16","M2 10a2 2 0 0 1 2-2h16a2 2 0 0 1 2 2v10H2z"]),Te=k(["M22 12h-4","M6 12H2","M12 6V2","M12 22v-4","M12 8a4 4 0 1 0 0 8 4 4 0 0 0 0-8z"]),Ee=k(["M2 3h20v14H2z","M8 21h8","M12 17v4"]),Ae=k(["M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z","M9 12l2 2 4-4"]),Le=k(["M22 12H2","M5.45 5.11 2 12v6a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2v-6l-3.45-6.89A2 2 0 0 0 16.76 4H7.24a2 2 0 0 0-1.79 1.11z","M6 16h.01","M10 16h.01"]),Oe=k(["M20 20a2 2 0 0 0 2-2V8a2 2 0 0 0-2-2h-7.9a2 2 0 0 1-1.69-.9L9.6 3.9A2 2 0 0 0 7.93 3H4a2 2 0 0 0-2 2v13a2 2 0 0 0 2 2z","M8 10v4","M12 10v2","M16 10v6"]),$e=k(["M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z","M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z"]),Re=k("M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"),P=k(["M9.937 15.5A2 2 0 0 0 8.5 14.063l-6.135-1.582a.5.5 0 0 1 0-.962L8.5 9.936A2 2 0 0 0 9.937 8.5l1.582-6.135a.5.5 0 0 1 .963 0L14.063 8.5A2 2 0 0 0 15.5 9.937l6.135 1.581a.5.5 0 0 1 0 .964L15.5 14.063a2 2 0 0 0-1.437 1.437l-1.582 6.135a.5.5 0 0 1-.963 0z","M20 3v4","M22 5h-4"]),Ie=k(["M23 7l-7 5 7 5V7z","M14 5H3a2 2 0 0 0-2 2v10a2 2 0 0 0 2 2h11a2 2 0 0 0 2-2V7a2 2 0 0 0-2-2z"]),Pe=k(["M18 22V8l-6-6-6 6v14","M2 22h20","M10 22v-4a2 2 0 0 1 4 0v4","M12 7v5","M10 9h4"]),De=k(["M6 22V4a2 2 0 0 1 2-2h8a2 2 0 0 1 2 2v18","M6 12H4a2 2 0 0 1-2-2V7a2 2 0 0 1 2-2h2","M18 12h2a2 2 0 0 1 2 2v3a2 2 0 0 1-2 2h-2","M10 6h4","M10 10h4","M10 14h4","M10 18h4"]),He=k(["M14 18V6a2 2 0 0 0-2-2H4a2 2 0 0 0-2 2v11a1 1 0 0 0 1 1h1","M15 18h6a1 1 0 0 0 1-1v-3.65a1 1 0 0 0-.22-.624l-3.48-4.35A1 1 0 0 0 17.52 8H14","M7 18a2 2 0 1 0 0 4 2 2 0 0 0 0-4z","M17 18a2 2 0 1 0 0 4 2 2 0 0 0 0-4z"]),Fe=k(["M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2","M9 3a4 4 0 1 0 0 8 4 4 0 0 0 0-8z","M22 21v-2a4 4 0 0 0-3-3.87","M16 3.13a4 4 0 0 1 0 7.75"]),Ue=k(["M12 2a9 3 0 1 0 0 6 9 3 0 0 0 0-6z","M21 12c0 1.66-4 3-9 3s-9-1.34-9-3","M3 5v14c0 1.66 4 3 9 3s9-1.34 9-3V5"]),Be=k(["M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9","M13.73 21a2 2 0 0 1-3.46 0","M2 8c0-2.2.7-4.3 2-6","M22 8a10 10 0 0 0-2-6"]),Ke=k(["M13 4h3a2 2 0 0 1 2 2v14","M2 20h3","M13 20h9","M10 12v.01","M13 4.562v16.157a1 1 0 0 1-1.242.97L5 20V5.562a2 2 0 0 1 1.515-1.94l4.243-1.06A2 2 0 0 1 13 4.561z"]),qe=k(["M16 2l5 5-14 14L2 16z","M12 8l-2-2","M8 12l-2-2"]),We=k(["M12 2a10 10 0 1 0 0 20 10 10 0 0 0 0-20z","M2 12h20","M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"]),Ve=k(["M3 3h7v7H3z","M14 3h7v7h-7z","M14 14h7v7h-7z","M3 14h7v7H3z"]),Je=k("M22 12h-4l-3 9L9 3l-3 9H2"),Ge=k(["M9 20H4a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h3.9a2 2 0 0 1 1.69.9l.81 1.2a2 2 0 0 0 1.67.9H20a2 2 0 0 1 2 2v1","M12 10v4h4","M12 14c1.5-2 3.5-3 6-3","M20 18v-4h-4","M20 14c-1.5 2-3.5 3-6 3"]),Ye={briefcase:_e,target:Te,monitor:Ee,"shield-check":Ae,"hard-drive":Le,"folder-kanban":Oe,"book-open":$e,phone:Re,sparkles:P,video:Ie,church:Pe,"building-2":De,truck:He,users:Fe,database:Ue,"bell-ring":Be,"door-open":Ke,scale:qe,globe:We,search:W,"layout-grid":Ve,activity:Je,"folder-sync":Ge};function Qe(){const s=[];for(let t=0;t<3;t++)for(let a=0;a<3;a++)s.push([6+a*7,6+t*7]);return e.jsx("svg",{width:"20",height:"20",viewBox:"0 0 24 24",fill:"none",xmlns:"http://www.w3.org/2000/svg",children:s.map(([t,a],n)=>e.jsx("circle",{cx:t,cy:a,r:"2",fill:"#94a3b8"},n))})}function Q({icon:s,size:t=20}){const a=Ye[s];return a?e.jsx(a,{size:t,color:"#fff"}):e.jsx("span",{style:{color:"#fff",fontSize:14,fontWeight:700},children:s.charAt(0).toUpperCase()})}function le({currentProduct:s,products:t,open:a,onToggle:n,onClose:o,hubUrl:d}){const p=i.useRef(null),l=t.filter(r=>r.active),c=t.filter(r=>!r.active);return i.useEffect(()=>{if(!a)return;function r(b){p.current&&!p.current.contains(b.target)&&o()}function u(b){b.key==="Escape"&&o()}return document.addEventListener("mousedown",r),document.addEventListener("keydown",u),()=>{document.removeEventListener("mousedown",r),document.removeEventListener("keydown",u)}},[a,o]),e.jsxs("div",{className:"hb-switcher",ref:p,style:{position:"relative"},"data-tour":"product-switcher",children:[e.jsx("button",{className:`hb-waffle-btn${a?" open":""}`,onClick:n,"aria-expanded":a,"aria-label":"App launcher",children:e.jsx(Qe,{})}),a&&e.jsxs("div",{className:"hb-waffle-panel",role:"menu",children:[e.jsx("div",{className:"hb-waffle-header",children:"Apps"}),e.jsx("div",{className:"hb-waffle-grid",children:l.map(r=>e.jsxs("a",{href:r.url,className:"hb-waffle-tile",onClick:o,role:"menuitem",children:[e.jsx("div",{className:`hb-waffle-tile-icon${r.id===s?" current":""}`,style:{background:r.color,color:r.color},children:e.jsx(Q,{icon:r.icon,color:r.color})}),e.jsx("span",{className:"hb-waffle-tile-name",children:r.name})]},r.id))}),c.length>0&&e.jsxs(e.Fragment,{children:[e.jsx("div",{className:"hb-waffle-sep"}),e.jsx("div",{className:"hb-waffle-section-label",children:"Available"}),e.jsx("div",{className:"hb-waffle-grid",children:c.map(r=>e.jsxs("a",{href:`${d}/products/${r.id}`,className:"hb-waffle-tile inactive",onClick:o,role:"menuitem",children:[e.jsx("div",{className:"hb-waffle-tile-icon",style:{background:r.color},children:e.jsx(Q,{icon:r.icon,color:r.color})}),e.jsx("span",{className:"hb-waffle-tile-name",children:r.name})]},r.id))})]}),e.jsx("a",{href:`${d}/products`,className:"hb-waffle-explore",onClick:o,children:"Explore all products →"})]})]})}function ce(s,t,a,n=200){const[o,d]=i.useState([]),[p,l]=i.useState(!1),c=i.useRef(null);return i.useEffect(()=>{c.current&&clearTimeout(c.current);const r=a.trim();if(!r||!t){d([]),l(!1);return}l(!0);const u=new AbortController;return c.current=setTimeout(()=>{fetch(`${s}/api/bus/search?q=${encodeURIComponent(r)}&tenant_id=${encodeURIComponent(t)}`,{credentials:"include",signal:u.signal}).then(b=>b.ok?b.json():Promise.resolve({groups:[]})).then(b=>{d(b.groups??[]),l(!1)}).catch(b=>{b.name!=="AbortError"&&(d([]),l(!1))})},n),()=>{u.abort(),c.current&&clearTimeout(c.current)}},[s,t,a,n]),{results:o,loading:p}}function de({apiBase:s,tenantId:t}){const[a,n]=i.useState(!1),[o,d]=i.useState(""),[p,l]=i.useState(-1),c=i.useRef(null),{results:r,loading:u}=ce(s,t,o),b=r.flatMap(x=>x.results),v=i.useCallback(()=>{n(!0),d(""),l(-1),setTimeout(()=>{var x;return(x=c.current)==null?void 0:x.focus()},0)},[]),f=i.useCallback(()=>{n(!1),d(""),l(-1)},[]);i.useEffect(()=>{function x(h){(h.metaKey||h.ctrlKey)&&h.key==="k"&&(h.preventDefault(),a?f():v()),h.key==="Escape"&&a&&f()}return document.addEventListener("keydown",x),()=>document.removeEventListener("keydown",x)},[a,v,f]);function m(x){if(x.key==="ArrowDown")x.preventDefault(),l(h=>Math.min(h+1,b.length-1));else if(x.key==="ArrowUp")x.preventDefault(),l(h=>Math.max(h-1,-1));else if(x.key==="Enter"&&p>=0){const h=b[p];h&&(window.location.href=h.deepLink,f())}}const _=typeof navigator<"u"&&/Mac/i.test(navigator.platform);return e.jsxs(e.Fragment,{children:[e.jsx("div",{className:"hb-search-wrap","data-tour":"unified-search",children:e.jsxs("button",{className:"hb-search-trigger",onClick:v,"aria-label":"Search (Cmd+K)",children:[e.jsx(W,{size:14}),e.jsx("span",{className:"hb-search-trigger-text",children:"Search everything..."}),e.jsxs("span",{className:"hb-kbd",children:[e.jsx("kbd",{children:_?"⌘":"Ctrl"}),e.jsx("kbd",{children:"K"})]})]})}),a&&e.jsx("div",{className:"hb-search-overlay",onMouseDown:x=>{x.target===x.currentTarget&&f()},role:"dialog","aria-label":"Search","aria-modal":"true",children:e.jsxs("div",{className:"hb-search-modal",children:[e.jsxs("div",{className:"hb-search-input-row",children:[e.jsx(W,{size:18,color:"#f97316"}),e.jsx("input",{ref:c,className:"hb-search-input",placeholder:"Search everything...",value:o,onChange:x=>{d(x.target.value),l(-1)},onKeyDown:m,autoComplete:"off",spellCheck:!1}),o&&e.jsx("button",{style:{background:"none",border:"none",cursor:"pointer",padding:0,color:"#64748b"},onClick:()=>d(""),"aria-label":"Clear",children:e.jsx(D,{size:16})})]}),e.jsx(Xe,{query:o,loading:u,results:r,focusedIndex:p,onNavigate:f})]})})]})}function Xe({query:s,loading:t,results:a,focusedIndex:n,onNavigate:o}){if(!s.trim())return e.jsxs("div",{className:"hb-search-empty",children:[e.jsx("div",{children:"Type to search across all products"}),e.jsx("div",{className:"hb-search-empty-hint",children:"Contacts, tickets, invoices, devices, and more"})]});if(t)return e.jsxs("div",{className:"hb-search-loading",children:[e.jsx("div",{className:"hb-spinner"}),"Searching..."]});if(!a.length)return e.jsxs("div",{className:"hb-search-empty",children:["No results for “",s,"”"]});let d=0;return e.jsx("div",{className:"hb-search-results",children:a.map(p=>e.jsxs("div",{children:[e.jsxs("div",{className:"hb-search-group-label",children:[p.productName," — ",p.results.length," result",p.results.length!==1?"s":""]}),p.results.map(l=>{const c=d++;return e.jsxs("a",{href:l.deepLink,className:`hb-search-item${n===c?" focused":""}`,onClick:o,children:[e.jsx("div",{className:"hb-search-item-icon",children:l.icon??l.title.slice(0,1).toUpperCase()}),e.jsxs("div",{className:"hb-search-item-body",children:[e.jsx("div",{className:"hb-search-item-title",children:l.title}),l.subtitle&&e.jsx("div",{className:"hb-search-item-sub",children:l.subtitle})]}),e.jsx("span",{className:"hb-source-badge",children:p.productName})]},l.id)})]},p.productId))})}function Ze(s){const t=Math.floor((Date.now()-new Date(s).getTime())/1e3);return t<60?"just now":t<3600?`${Math.floor(t/60)}m ago`:t<86400?`${Math.floor(t/3600)}h ago`:`${Math.floor(t/86400)}d ago`}function pe({notifications:s,unreadCount:t,open:a,onToggle:n,onClose:o,onMarkAllRead:d,onMarkRead:p,onDismiss:l,muted:c,onMute:r,onUnmute:u,hubUrl:b}){const v=i.useRef(null);return i.useEffect(()=>{if(!a)return;function f(m){v.current&&!v.current.contains(m.target)&&o()}return document.addEventListener("mousedown",f),()=>document.removeEventListener("mousedown",f)},[a,o]),e.jsxs("div",{className:"hb-notif",ref:v,"data-tour":"notifications",children:[e.jsxs("button",{className:"hb-notif-btn",onClick:n,"aria-label":`Notifications${t>0?` (${t} unread)`:""}`,"aria-expanded":a,children:[e.jsx(Ne,{size:18}),t>0&&e.jsx("span",{className:"hb-badge","aria-hidden":"true",children:t>99?"99+":t})]}),a&&e.jsxs("div",{className:"hb-notif-dropdown",role:"dialog","aria-label":"Notifications",children:[e.jsxs("div",{className:"hb-notif-header",children:[e.jsx("span",{className:"hb-notif-title",children:"Notifications"}),t>0&&e.jsx("button",{className:"hb-notif-mark-read",onClick:d,children:"Mark all read"})]}),e.jsx("div",{className:"hb-notif-list",role:"list",children:s.length===0?e.jsx("div",{className:"hb-notif-empty",children:"No notifications"}):s.slice(0,20).map(f=>e.jsxs("div",{className:`hb-notif-item${f.read?"":" unread"}`,role:"listitem",children:[e.jsxs("a",{href:f.deepLink,className:"hb-notif-item-link",onClick:()=>{p(f.id),o()},children:[e.jsx("span",{className:"hb-notif-icon",style:{background:F[f.severity]},"aria-hidden":"true"}),e.jsxs("div",{className:"hb-notif-body",children:[e.jsxs("div",{className:"hb-notif-body-title",children:[f.title,f.groupCount&&f.groupCount>1&&e.jsx("span",{className:"hb-notif-group-badge",children:f.groupCount})]}),f.body&&e.jsx("div",{className:"hb-notif-body-text",children:f.body}),e.jsxs("div",{className:"hb-notif-meta",children:[e.jsx("span",{className:"hb-source-badge",children:f.productName}),e.jsx("span",{className:"hb-notif-time",children:Ze(f.createdAt)})]})]})]}),e.jsx("button",{className:"hb-notif-dismiss",onClick:m=>{m.stopPropagation(),l(f.id)},"aria-label":"Dismiss notification",children:e.jsx(D,{size:14})})]},f.id))}),e.jsx("div",{className:"hb-notif-footer",children:e.jsxs("div",{className:"hb-notif-footer-row",children:[c?e.jsx("button",{className:"hb-notif-mute-btn",onClick:u,children:"Unmute notifications"}):e.jsxs("div",{className:"hb-notif-mute-group",children:[e.jsx("button",{className:"hb-notif-mute-btn",onClick:()=>r(3600*1e3),children:"Mute 1h"}),e.jsx("button",{className:"hb-notif-mute-btn",onClick:()=>{const f=new Date,m=new Date(f.getFullYear(),f.getMonth(),f.getDate()+1);r(m.getTime()-f.getTime())},children:"Mute today"})]}),e.jsxs("a",{href:`${b}/notifications/settings`,onClick:o,className:"hb-notif-settings-link",children:[e.jsx(oe,{size:14}),"Settings"]})]})})]})]})}function he({toasts:s,onDismiss:t}){return s.length===0?null:e.jsx("div",{className:"hb-toast-container",role:"status","aria-live":"polite",children:s.slice(0,3).map(a=>{const n=I.find(o=>o.id===a.productId);return e.jsxs("div",{className:"hb-toast",style:{borderLeftColor:F[a.severity]},children:[e.jsx("span",{className:"hb-toast-dot",style:{background:(n==null?void 0:n.color)||F[a.severity]}}),e.jsxs("div",{className:"hb-toast-body",children:[e.jsx("div",{className:"hb-toast-title",children:a.title}),a.body&&e.jsx("div",{className:"hb-toast-text",children:a.body}),a.deepLink&&e.jsx("a",{href:a.deepLink,className:"hb-toast-link",children:"View"})]}),e.jsx("button",{className:"hb-toast-close",onClick:()=>t(a.id),"aria-label":"Dismiss",children:e.jsx(D,{size:14})})]},a.id)})})}function be({session:s,open:t,onToggle:a,onClose:n,onLogout:o,hubUrl:d}){const p=i.useRef(null);i.useEffect(()=>{if(!t)return;function c(r){p.current&&!p.current.contains(r.target)&&n()}return document.addEventListener("mousedown",c),()=>document.removeEventListener("mousedown",c)},[t,n]);function l(){n(),o?o():window.location.href=`${d}/logout`}return e.jsxs("div",{className:"hb-user",ref:p,"data-tour":"user-menu",children:[e.jsxs("button",{className:"hb-user-btn",onClick:a,"aria-expanded":t,"aria-label":"User menu",children:[e.jsx("div",{className:"hb-avatar",children:s.initials}),e.jsx("span",{className:"hb-user-name",children:s.firstName??s.email.split("@")[0]}),e.jsx("svg",{width:"12",height:"12",viewBox:"0 0 24 24",fill:"none",stroke:"currentColor",strokeWidth:"2",strokeLinecap:"round",strokeLinejoin:"round",style:{opacity:.5},children:e.jsx("path",{d:"m6 9 6 6 6-6"})})]}),t&&e.jsxs("div",{className:"hb-user-dropdown",role:"menu",children:[e.jsxs("div",{className:"hb-user-info",children:[e.jsx("div",{style:{fontWeight:600,fontSize:13,color:"#f1f5f9"},children:s.firstName&&s.lastName?`${s.firstName} ${s.lastName}`:s.email.split("@")[0]}),e.jsx("div",{className:"hb-user-email",children:s.email}),s.tenantName&&e.jsx("div",{className:"hb-user-tenant",children:s.tenantName})]}),e.jsxs("a",{href:`${d}/profile`,className:"hb-menu-item",onClick:n,role:"menuitem",children:[e.jsx(Se,{size:14}),"Profile"]}),e.jsxs("a",{href:`${d}/settings`,className:"hb-menu-item",onClick:n,role:"menuitem",children:[e.jsx(oe,{size:14}),"Hub Settings"]}),e.jsx("div",{className:"hb-menu-sep"}),e.jsxs("a",{href:`${d}/switch-tenant`,className:"hb-menu-item",onClick:n,role:"menuitem",children:[e.jsx(ze,{size:14}),"Switch Tenant"]}),e.jsx("div",{className:"hb-menu-sep"}),e.jsxs("button",{className:"hb-menu-item danger",onClick:l,role:"menuitem",children:[e.jsx(Ce,{size:14}),"Log Out"]})]})]})}class et{constructor(t){this.baseUrl=t.apiBaseUrl.replace(/\/$/,""),this.apiKey=t.apiKey,this.platformId=t.platformId}async request(t,a={}){const n=`${this.baseUrl}${t}`,o=await fetch(n,{...a,headers:{"Content-Type":"application/json","X-Api-Key":this.apiKey,...a.headers}});if(!o.ok){const d=await o.text().catch(()=>"");throw new Error(`Ops Center API error ${o.status}: ${d}`)}if(o.status!==204)return o.json()}async createTicket(t){return this.request("/api/tickets",{method:"POST",body:JSON.stringify({...t,platform:this.platformId})})}async listTickets(t={}){const a=new URLSearchParams({platform:this.platformId});return t.reporter_email&&a.set("reporter_email",t.reporter_email),t.status&&a.set("status",t.status),t.ticket_type&&a.set("ticket_type",t.ticket_type),t.page&&a.set("page",String(t.page)),t.page_size&&a.set("page_size",String(t.page_size)),this.request(`/api/tickets?${a}`)}async getTicket(t){return this.request(`/api/tickets/${t}`)}async getTicketActivity(t){return this.request(`/api/tickets/${t}/activity`)}async addComment(t,a){return this.request(`/api/tickets/${t}/comment`,{method:"POST",body:JSON.stringify(a)})}async voteOnTicket(t,a){return this.request(`/api/tickets/${t}/vote`,{method:"POST",body:JSON.stringify(a)})}async removeVote(t){return this.request(`/api/tickets/${t}/vote`,{method:"DELETE"})}async getPublicReleases(){const t=await fetch(`${this.baseUrl}/api/releases-public/${this.platformId}`);if(!t.ok)throw new Error(`Failed to fetch releases: ${t.status}`);return t.json()}async getFeatures(){return this.request(`/api/features?platform=${this.platformId}&status=proposed,planned,in_progress,shipped`)}async getKBCategories(){const t=await fetch(`${this.baseUrl}/api/kb-public/${this.platformId}/categories`);if(!t.ok)throw new Error(`Failed to fetch KB categories: ${t.status}`);return t.json()}async getKBArticles(t){const a=t?`?category=${encodeURIComponent(t)}`:"",n=await fetch(`${this.baseUrl}/api/kb-public/${this.platformId}/articles${a}`);if(!n.ok)throw new Error(`Failed to fetch KB articles: ${n.status}`);return n.json()}async getKBArticle(t){const a=await fetch(`${this.baseUrl}/api/kb-public/${this.platformId}/articles/${t}`);if(!a.ok)throw new Error(`Failed to fetch KB article: ${a.status}`);return a.json()}async searchKB(t){const a=await fetch(`${this.baseUrl}/api/kb-public/${this.platformId}/search?q=${encodeURIComponent(t)}`);if(!a.ok)throw new Error(`Failed to search KB: ${a.status}`);return a.json()}async startChat(t,a,n){return this.request("/api/chat/sessions",{method:"POST",body:JSON.stringify({message:t,user_name:a,user_email:n,platform:this.platformId})})}async sendChatMessage(t,a){return this.request(`/api/chat/sessions/${t}/messages`,{method:"POST",body:JSON.stringify({message:a})})}async getChatSession(t){return this.request(`/api/chat/sessions/${t}`)}async listChatSessions(t){return this.request(`/api/chat/sessions?email=${encodeURIComponent(t)}`)}async endChat(t,a,n){return this.request(`/api/chat/sessions/${t}/end`,{method:"POST",body:JSON.stringify({rating:a,feedback:n})})}async escalateChat(t){return this.request(`/api/chat/sessions/${t}/escalate`,{method:"POST",body:JSON.stringify({})})}async sendCobrowseEvents(t,a,n){return this.request(`/api/chat/sessions/${t}/cobrowse`,{method:"POST",body:JSON.stringify({events:a,sequence:n})})}}const ue=i.createContext(null);function L(){const s=i.useContext(ue);if(!s)throw new Error("useSupportContext must be used within <SupportProvider>");return s}function tt({config:s,user:t,children:a}){const n=i.useMemo(()=>new et(s),[s]),o=i.useMemo(()=>({client:n,config:s,user:t}),[n,s,t]);return e.jsx(ue.Provider,{value:o,children:a})}function st(s){const{client:t,user:a}=L(),[n,o]=i.useState([]),[d,p]=i.useState(!0),[l,c]=i.useState(null),r=i.useCallback(async()=>{p(!0),c(null);try{const u=await t.listTickets({reporter_email:a.email,status:s==null?void 0:s.status,ticket_type:s==null?void 0:s.ticket_type});o(u)}catch(u){c(u instanceof Error?u.message:"Failed to load tickets")}finally{p(!1)}},[t,a.email,s==null?void 0:s.status,s==null?void 0:s.ticket_type]);return i.useEffect(()=>{r()},[r]),{tickets:n,loading:d,error:l,refresh:r}}function at(s){const{client:t}=L(),[a,n]=i.useState(null),[o,d]=i.useState([]),[p,l]=i.useState(!0),[c,r]=i.useState(null),u=i.useCallback(async()=>{if(s){l(!0),r(null);try{const[b,v]=await Promise.all([t.getTicket(s),t.getTicketActivity(s)]);n(b),d(v)}catch(b){r(b instanceof Error?b.message:"Failed to load ticket")}finally{l(!1)}}},[t,s]);return i.useEffect(()=>{u()},[u]),{ticket:a,activity:o,loading:p,error:c,refresh:u}}function nt(){const{client:s,user:t}=L(),[a,n]=i.useState(!1),[o,d]=i.useState(null);return{createTicket:i.useCallback(async l=>{n(!0),d(null);try{return await s.createTicket({...l,reporter_email:t.email,reporter_name:t.name})}catch(c){return d(c instanceof Error?c.message:"Failed to create ticket"),null}finally{n(!1)}},[s,t]),submitting:a,error:o}}function it(){const{client:s,user:t}=L(),[a,n]=i.useState(!1),[o,d]=i.useState(null);return{addComment:i.useCallback(async(l,c)=>{n(!0),d(null);try{return await s.addComment(l,{content:c,actor_email:t.email,actor_name:t.name}),!0}catch(r){return d(r instanceof Error?r.message:"Failed to add comment"),!1}finally{n(!1)}},[s,t]),submitting:a,error:o}}function rt(){const{client:s}=L(),[t,a]=i.useState([]),[n,o]=i.useState(!0),[d,p]=i.useState(null),l=i.useCallback(async()=>{o(!0),p(null);try{const c=await s.getPublicReleases();a(c)}catch(c){p(c instanceof Error?c.message:"Failed to load release notes")}finally{o(!1)}},[s]);return i.useEffect(()=>{l()},[l]),{releases:t,loading:n,error:d,refresh:l}}function ot(){const{client:s}=L(),[t,a]=i.useState([]),[n,o]=i.useState(!0),[d,p]=i.useState(null),l=i.useCallback(async()=>{o(!0),p(null);try{const c=await s.getFeatures();a(c)}catch(c){p(c instanceof Error?c.message:"Failed to load features")}finally{o(!1)}},[s]);return i.useEffect(()=>{l()},[l]),{features:t,loading:n,error:d,refresh:l}}function lt(){const{client:s,user:t}=L(),[a,n]=i.useState(null),[o,d]=i.useState(null),p=i.useCallback(async c=>{n(c),d(null);try{return await s.voteOnTicket(c,{user_email:t.email,user_name:t.name}),!0}catch(r){return d(r instanceof Error?r.message:"Failed to vote"),!1}finally{n(null)}},[s,t]),l=i.useCallback(async c=>{n(c),d(null);try{return await s.removeVote(c),!0}catch(r){return d(r instanceof Error?r.message:"Failed to remove vote"),!1}finally{n(null)}},[s]);return{vote:p,removeVote:l,voting:a,error:o}}function ct(){const{client:s}=L(),[t,a]=i.useState([]),[n,o]=i.useState(!0),[d,p]=i.useState(null),l=i.useCallback(async()=>{o(!0),p(null);try{const c=await s.getKBCategories();a(c)}catch(c){p(c instanceof Error?c.message:"Failed to load categories")}finally{o(!1)}},[s]);return i.useEffect(()=>{l()},[l]),{categories:t,loading:n,error:d,refresh:l}}function dt(s){const{client:t}=L(),[a,n]=i.useState([]),[o,d]=i.useState(!0),[p,l]=i.useState(null),c=i.useCallback(async()=>{d(!0),l(null);try{const r=await t.getKBArticles(s);n(r)}catch(r){l(r instanceof Error?r.message:"Failed to load articles")}finally{d(!1)}},[t,s]);return i.useEffect(()=>{c()},[c]),{articles:a,loading:o,error:p,refresh:c}}function pt(s){const{client:t}=L(),[a,n]=i.useState(null),[o,d]=i.useState(!0),[p,l]=i.useState(null),c=i.useCallback(async()=>{if(s){d(!0),l(null);try{const r=await t.getKBArticle(s);n(r)}catch(r){l(r instanceof Error?r.message:"Failed to load article")}finally{d(!1)}}},[t,s]);return i.useEffect(()=>{c()},[c]),{article:a,loading:o,error:p,refresh:c}}function ht(){const{client:s}=L(),[t,a]=i.useState([]),[n,o]=i.useState(!1),[d,p]=i.useState(null),l=i.useCallback(async c=>{if(!c.trim()){a([]);return}o(!0),p(null);try{const r=await s.searchKB(c);a(r)}catch(r){p(r instanceof Error?r.message:"Failed to search")}finally{o(!1)}},[s]);return{results:t,loading:n,error:d,search:l}}const H="https://docs.theonestack.com",X={psa:{path:"/docs/psa/",articles:[{title:"PSA Overview",path:"/docs/psa/"},{title:"Working with Tickets",path:"/docs/psa/tickets/"},{title:"Time Tracking",path:"/docs/psa/time-tracking/"},{title:"SLA Management",path:"/docs/psa/sla-management/"}]},crm:{path:"/docs/crm/",articles:[{title:"CRM Overview",path:"/docs/crm/"},{title:"Companies & Contacts",path:"/docs/crm/companies-contacts/"},{title:"Deals & Pipeline",path:"/docs/crm/deals-pipeline/"}]},books:{path:"/docs/books/",articles:[{title:"Books Overview",path:"/docs/books/"},{title:"Invoices & Payments",path:"/docs/books/invoices-payments/"},{title:"Chart of Accounts",path:"/docs/books/chart-of-accounts/"}]},rmm:{path:"/docs/rmm/",articles:[{title:"RMM Overview",path:"/docs/rmm/"},{title:"Device Management",path:"/docs/rmm/device-management/"},{title:"Monitoring & Alerts",path:"/docs/rmm/monitoring-alerts/"}]},security:{path:"/docs/security/",articles:[{title:"Security Overview",path:"/docs/security/"},{title:"Threat Detection",path:"/docs/security/threat-detection/"}]},defend:{path:"/docs/defend/",articles:[{title:"Defend Overview",path:"/docs/defend/"},{title:"Endpoint Detection",path:"/docs/defend/detection-rules/"},{title:"Incident Response",path:"/docs/defend/response-actions/"}]},hub:{path:"/docs/getting-started/",articles:[{title:"Hub Overview",path:"/docs/hub/"},{title:"Team Setup",path:"/docs/getting-started/team-setup/"},{title:"Permissions & Roles",path:"/docs/admin/permissions/"},{title:"Billing & Subscriptions",path:"/docs/admin/billing/"}]},collective:{path:"/docs/collective/",articles:[{title:"Collective Overview",path:"/docs/collective/"},{title:"Community",path:"/docs/collective/community/"}]},voice:{path:"/docs/voice/",articles:[{title:"Voice Overview",path:"/docs/voice/"},{title:"Call Management",path:"/docs/voice/call-routing/"}]},oncall:{path:"/docs/oncall/",articles:[{title:"On-Call Overview",path:"/docs/oncall/"},{title:"Schedules",path:"/docs/oncall/on-call-schedules/"},{title:"Escalation Policies",path:"/docs/oncall/escalation-policies/"}]},cmdb:{path:"/docs/cmdb/",articles:[{title:"CMDB Overview",path:"/docs/cmdb/"},{title:"Asset Discovery",path:"/docs/cmdb/asset-inventory/"},{title:"Password Vault",path:"/docs/cmdb/password-vault/"}]},projects:{path:"/docs/projects/",articles:[{title:"Projects Overview",path:"/docs/projects/"},{title:"Task Management",path:"/docs/projects/task-management/"},{title:"Gantt View",path:"/docs/projects/gantt-view/"}]},agents:{path:"/docs/agents/",articles:[{title:"Agents Overview",path:"/docs/agents/"},{title:"Agent Builder",path:"/docs/agents/building-agents/"}]},compliance:{path:"/docs/compliance/",articles:[{title:"Compliance Overview",path:"/docs/compliance/"},{title:"Frameworks",path:"/docs/compliance/frameworks/"}]},protect:{path:"/docs/protect/",articles:[{title:"Protect Overview",path:"/docs/protect/"},{title:"Dark Web Monitoring",path:"/docs/protect/dark-web-monitoring/"}]},backups:{path:"/docs/backups/",articles:[{title:"Backups Overview",path:"/docs/backups/"},{title:"Restore Procedures",path:"/docs/backups/restore-procedures/"}]}},bt=[{title:"Quick Start Guide",path:"/docs/getting-started/quick-start/"},{title:"API Reference",path:"/docs/api-reference/"},{title:"Troubleshooting",path:"/docs/troubleshooting/common-issues/"}],ut={hub:"Support",submit:"Submit a Ticket",tickets:"My Tickets",ticket:"Ticket",changelog:"What's New",features:"Feature Requests",kb:"Knowledge Base","kb-article":"Article",docs:"Documentation",chat:"Chat"},ft=[{id:"bug",label:"Report a Bug",desc:"Something not working? We'll fix it.",type:"bug_report"},{id:"feature",label:"Request a Feature",desc:"Have an idea? We want to hear it.",type:"feature_request"},{id:"help",label:"Get Help",desc:"Need assistance with something?",type:"service_request"}];function mt({onNav:s}){const{config:t}=L();return e.jsxs("div",{className:"hb-sp-hub",children:[e.jsxs("div",{className:"hb-sp-hub-header",children:[e.jsx("div",{className:"hb-sp-hub-title",children:"How can we help?"}),e.jsxs("div",{className:"hb-sp-hub-sub",children:["Get support for ",t.platformName,"."]})]}),e.jsx("div",{className:"hb-sp-hub-grid",children:ft.map(a=>e.jsxs("button",{className:"hb-sp-card",onClick:()=>s({id:"submit",ticketType:a.type}),children:[e.jsx("div",{className:"hb-sp-card-label",children:a.label}),e.jsx("div",{className:"hb-sp-card-desc",children:a.desc})]},a.id))}),e.jsxs("div",{className:"hb-sp-hub-links",children:[e.jsxs("button",{className:"hb-sp-link-item",onClick:()=>s({id:"tickets"}),children:[e.jsx("span",{children:"My Tickets"}),e.jsx("span",{className:"hb-sp-chevron",children:"›"})]}),e.jsxs("button",{className:"hb-sp-link-item",onClick:()=>s({id:"kb"}),children:[e.jsx("span",{children:"Knowledge Base"}),e.jsx("span",{className:"hb-sp-chevron",children:"›"})]}),e.jsxs("button",{className:"hb-sp-link-item",onClick:()=>s({id:"docs"}),children:[e.jsx("span",{children:"Documentation"}),e.jsx("span",{className:"hb-sp-chevron",children:"›"})]}),e.jsxs("button",{className:"hb-sp-link-item",onClick:()=>s({id:"changelog"}),children:[e.jsx("span",{children:"What's New"}),e.jsx("span",{className:"hb-sp-chevron",children:"›"})]}),e.jsxs("button",{className:"hb-sp-link-item",onClick:()=>s({id:"features"}),children:[e.jsx("span",{children:"Feature Requests"}),e.jsx("span",{className:"hb-sp-chevron",children:"›"})]})]})]})}function xt({currentProduct:s}){const t=X[s]??X.hub,a=s==="hub"?"Hub":s.charAt(0).toUpperCase()+s.slice(1);return e.jsxs("div",{className:"hb-sp-list-page",children:[e.jsx("div",{className:"hb-sp-filter-row",style:{marginBottom:12},children:e.jsx("a",{href:H,target:"_blank",rel:"noopener noreferrer",className:"hb-sp-filter-btn",style:{textDecoration:"none"},children:"docs.theonestack.com ↗"})}),e.jsxs("div",{className:"hb-sp-section-label",children:[a," Docs"]}),t.articles.map(n=>e.jsx("a",{href:`${H}${n.path}`,target:"_blank",rel:"noopener noreferrer",className:"hb-sp-list-item",style:{textDecoration:"none"},children:e.jsx("div",{className:"hb-sp-ticket-title",children:n.title})},n.path)),e.jsx("a",{href:`${H}${t.path}`,target:"_blank",rel:"noopener noreferrer",className:"hb-sp-list-item",style:{textDecoration:"none",color:"#f97316"},children:e.jsxs("div",{className:"hb-sp-ticket-title",children:["View all ",a," docs →"]})}),e.jsx("div",{className:"hb-sp-section-label",style:{marginTop:16},children:"Quick Links"}),bt.map(n=>e.jsx("a",{href:`${H}${n.path}`,target:"_blank",rel:"noopener noreferrer",className:"hb-sp-list-item",style:{textDecoration:"none"},children:e.jsx("div",{className:"hb-sp-ticket-title",children:n.title})},n.path))]})}const gt=[{value:"bug_report",label:"Bug Report"},{value:"feature_request",label:"Feature Request"},{value:"service_request",label:"Service Request"}],vt=[{value:"low",label:"Low"},{value:"medium",label:"Medium"},{value:"high",label:"High"},{value:"critical",label:"Critical"}],yt=[{value:"cosmetic",label:"Cosmetic"},{value:"minor",label:"Minor"},{value:"major",label:"Major"},{value:"blocker",label:"Blocker"}];function kt({initialType:s,onNav:t}){const[a,n]=i.useState(s||"bug_report"),[o,d]=i.useState(""),[p,l]=i.useState(""),[c,r]=i.useState("medium"),[u,b]=i.useState("minor"),{createTicket:v,submitting:f,error:m}=nt(),[_,x]=i.useState(null);return _?e.jsxs("div",{className:"hb-sp-success",children:[e.jsx("div",{className:"hb-sp-success-icon",children:"✓"}),e.jsx("div",{className:"hb-sp-success-title",children:"Ticket Submitted"}),e.jsx("div",{className:"hb-sp-success-num",children:_}),e.jsxs("div",{className:"hb-sp-success-actions",children:[e.jsx("button",{className:"hb-sp-btn hb-sp-btn-secondary",onClick:()=>t({id:"tickets"}),children:"View My Tickets"}),e.jsx("button",{className:"hb-sp-btn hb-sp-btn-ghost",onClick:()=>t({id:"hub"}),children:"Back to Support"})]})]}):e.jsxs("div",{className:"hb-sp-form-page",children:[e.jsxs("div",{className:"hb-sp-field",children:[e.jsx("label",{className:"hb-sp-label",children:"Type"}),e.jsx("div",{className:"hb-sp-type-row",children:gt.map(h=>e.jsx("button",{type:"button",className:`hb-sp-type-btn${a===h.value?" active":""}`,onClick:()=>n(h.value),children:h.label},h.value))})]}),e.jsxs("div",{className:"hb-sp-field",children:[e.jsx("label",{className:"hb-sp-label",htmlFor:"sp-title",children:"Title"}),e.jsx("input",{id:"sp-title",className:"hb-sp-input",value:o,onChange:h=>d(h.target.value),placeholder:"Brief description...",maxLength:200}),e.jsxs("div",{className:"hb-sp-char-count",children:[o.length,"/200"]})]}),e.jsxs("div",{className:"hb-sp-field",children:[e.jsx("label",{className:"hb-sp-label",htmlFor:"sp-desc",children:"Description"}),e.jsx("textarea",{id:"sp-desc",className:"hb-sp-textarea",value:p,onChange:h=>l(h.target.value),placeholder:"Provide as much detail as possible...",rows:6,maxLength:5e3}),e.jsxs("div",{className:"hb-sp-char-count",children:[p.length,"/5000"]})]}),e.jsxs("div",{className:"hb-sp-field",children:[e.jsx("label",{className:"hb-sp-label",children:"Priority"}),e.jsx("div",{className:"hb-sp-chip-row",children:vt.map(h=>e.jsx("button",{type:"button",className:`hb-sp-chip${c===h.value?" active":""}`,onClick:()=>r(h.value),children:h.label},h.value))})]}),a==="bug_report"&&e.jsxs("div",{className:"hb-sp-field",children:[e.jsx("label",{className:"hb-sp-label",children:"Severity"}),e.jsx("div",{className:"hb-sp-chip-row",children:yt.map(h=>e.jsx("button",{type:"button",className:`hb-sp-chip${u===h.value?" active":""}`,onClick:()=>b(h.value),children:h.label},h.value))})]}),m&&e.jsx("div",{className:"hb-sp-error",children:m}),e.jsx("button",{className:"hb-sp-btn hb-sp-btn-primary",disabled:f||!o.trim()||!p.trim(),onClick:async()=>{const h=await v({ticket_type:a,title:o.trim(),description:p.trim(),priority:c,severity:a==="bug_report"?u:void 0});h&&x(h.ticket_number)},children:f?"Submitting…":"Submit Ticket"})]})}const fe={new:"New",triaged:"Triaged",in_progress:"In Progress",waiting_reporter:"Waiting on You",waiting_external:"Waiting",on_hold:"On Hold",resolved:"Resolved",closed:"Closed",cancelled:"Cancelled"};function wt({onNav:s}){const[t,a]=i.useState(""),{tickets:n,loading:o,error:d}=st({status:t||void 0});return e.jsxs("div",{className:"hb-sp-list-page",children:[e.jsxs("div",{className:"hb-sp-filter-row",children:[[["","All"],["new,triaged,in_progress,waiting_reporter,waiting_external,on_hold","Open"],["resolved,closed","Closed"]].map(([p,l])=>e.jsx("button",{className:`hb-sp-filter-btn${t===p?" active":""}`,onClick:()=>a(p),children:l},p)),e.jsx("button",{className:"hb-sp-filter-btn hb-sp-filter-btn-new",onClick:()=>s({id:"submit"}),children:"+ New"})]}),o?e.jsx("div",{className:"hb-sp-list",children:[0,1,2].map(p=>e.jsx("div",{className:"hb-sp-skeleton"},p))}):d?e.jsx("div",{className:"hb-sp-error",children:d}):n.length===0?e.jsxs("div",{className:"hb-sp-empty",children:[e.jsx("div",{className:"hb-sp-empty-text",children:"No tickets found"}),e.jsx("button",{className:"hb-sp-btn hb-sp-btn-secondary",onClick:()=>s({id:"submit"}),children:"Submit a Ticket"})]}):e.jsx("div",{className:"hb-sp-list",children:n.map(p=>e.jsxs("button",{className:"hb-sp-list-item",onClick:()=>s({id:"ticket",ticketId:p.id}),children:[e.jsxs("div",{className:"hb-sp-ticket-top",children:[e.jsx("span",{className:"hb-sp-ticket-num",children:p.ticket_number}),e.jsx("span",{className:"hb-sp-badge",children:fe[p.status]??p.status})]}),e.jsx("div",{className:"hb-sp-ticket-title",children:p.title}),e.jsx("div",{className:"hb-sp-ticket-meta",children:new Date(p.created_at).toLocaleDateString(void 0,{month:"short",day:"numeric",year:"numeric"})})]},p.id))})]})}function jt({ticketId:s}){const{ticket:t,activity:a,loading:n,error:o}=at(s),{addComment:d,submitting:p}=it(),[l,c]=i.useState("");return n?e.jsx("div",{className:"hb-sp-loading",children:"Loading ticket…"}):o||!t?e.jsx("div",{className:"hb-sp-error",children:o??"Ticket not found"}):e.jsxs("div",{className:"hb-sp-detail-page",children:[e.jsxs("div",{className:"hb-sp-detail-header",children:[e.jsx("span",{className:"hb-sp-ticket-num",children:t.ticket_number}),e.jsx("span",{className:"hb-sp-badge",children:fe[t.status]??t.status})]}),e.jsx("div",{className:"hb-sp-detail-title",children:t.title}),e.jsx("div",{className:"hb-sp-detail-desc",children:t.description}),a.length>0&&e.jsxs("div",{className:"hb-sp-activity",children:[e.jsx("div",{className:"hb-sp-activity-title",children:"Activity"}),a.filter(r=>!r.is_internal).map(r=>e.jsxs("div",{className:"hb-sp-activity-item",children:[e.jsx("div",{className:"hb-sp-activity-actor",children:r.actor_name}),r.content&&e.jsx("div",{className:"hb-sp-activity-content",children:r.content}),e.jsx("div",{className:"hb-sp-activity-time",children:new Date(r.created_at).toLocaleString()})]},r.id))]}),e.jsxs("div",{className:"hb-sp-reply",children:[e.jsx("textarea",{className:"hb-sp-textarea",rows:3,placeholder:"Add a comment…",value:l,onChange:r=>c(r.target.value)}),e.jsx("button",{className:"hb-sp-btn hb-sp-btn-primary",disabled:p||!l.trim(),onClick:async()=>{await d(t.id,l.trim())&&c("")},children:p?"Sending…":"Send"})]})]})}function Nt(){const{releases:s,loading:t,error:a}=rt();return t?e.jsx("div",{className:"hb-sp-loading",children:"Loading releases…"}):a?e.jsx("div",{className:"hb-sp-error",children:a}):s.length===0?e.jsx("div",{className:"hb-sp-empty",children:e.jsx("div",{className:"hb-sp-empty-text",children:"No releases yet."})}):e.jsx("div",{className:"hb-sp-list-page",children:s.map((n,o)=>e.jsxs("div",{className:"hb-sp-release",children:[e.jsxs("div",{className:"hb-sp-release-header",children:[e.jsxs("span",{className:"hb-sp-release-ver",children:["v",n.version]}),e.jsx("span",{className:"hb-sp-release-date",children:new Date(n.released_date).toLocaleDateString(void 0,{month:"short",day:"numeric",year:"numeric"})})]}),e.jsx("div",{className:"hb-sp-release-title",children:n.title}),e.jsx("div",{className:"hb-sp-release-notes",children:n.release_notes})]},o))})}const St={proposed:"Proposed",planned:"Planned",in_progress:"In Progress",shipped:"Shipped",cancelled:"Cancelled"};function Ct(){const{features:s,loading:t,error:a}=ot(),{vote:n,voting:o}=lt(),[d,p]=i.useState(new Set);return t?e.jsx("div",{className:"hb-sp-loading",children:"Loading features…"}):a?e.jsx("div",{className:"hb-sp-error",children:a}):s.length===0?e.jsx("div",{className:"hb-sp-empty",children:e.jsx("div",{className:"hb-sp-empty-text",children:"No feature requests yet."})}):e.jsx("div",{className:"hb-sp-list-page",children:s.map(l=>{var c;return e.jsxs("div",{className:"hb-sp-feature-item",children:[e.jsxs("div",{className:"hb-sp-feature-body",children:[e.jsx("div",{className:"hb-sp-feature-title",children:l.title}),e.jsx("div",{className:"hb-sp-feature-desc",children:l.description}),e.jsx("span",{className:"hb-sp-badge",children:St[l.status]??l.status})]}),e.jsxs("button",{className:`hb-sp-vote-btn${d.has(l.id)?" voted":""}`,disabled:o===l.id,onClick:async()=>{await n(l.id)&&p(u=>new Set([...u,l.id]))},children:["▲ ",((c=l.tags)==null?void 0:c.length)??0]})]},l.id)})})}function zt({onNav:s,category:t}){const{categories:a,loading:n}=ct(),{articles:o,loading:d}=dt(t),{search:p,results:l,loading:c}=ht(),[r,u]=i.useState(""),b=i.useRef(null),v=m=>{u(m),b.current&&clearTimeout(b.current),b.current=setTimeout(()=>p(m),300)},f=r.trim().length>0;return e.jsxs("div",{className:"hb-sp-list-page",children:[e.jsx("div",{className:"hb-sp-search-row",children:e.jsx("input",{className:"hb-sp-input",placeholder:"Search knowledge base…",value:r,onChange:m=>v(m.target.value)})}),f?c?e.jsx("div",{className:"hb-sp-loading",children:"Searching…"}):l.length===0?e.jsx("div",{className:"hb-sp-empty",children:e.jsxs("div",{className:"hb-sp-empty-text",children:['No results for "',r,'"']})}):e.jsx("div",{className:"hb-sp-list",children:l.map(m=>e.jsxs("button",{className:"hb-sp-list-item",onClick:()=>s({id:"kb-article",slug:m.slug}),children:[e.jsx("div",{className:"hb-sp-ticket-title",children:m.title}),m.excerpt&&e.jsx("div",{className:"hb-sp-ticket-meta",children:m.excerpt})]},m.id))}):e.jsxs(e.Fragment,{children:[!t&&!n&&a.length>0&&e.jsx("div",{className:"hb-sp-kb-cats",children:a.map(m=>e.jsxs("button",{className:"hb-sp-kb-cat",onClick:()=>s({id:"kb",category:m.slug}),children:[e.jsx("span",{children:m.name}),e.jsx("span",{className:"hb-sp-kb-cat-count",children:m.article_count})]},m.id))}),d?e.jsx("div",{className:"hb-sp-loading",children:"Loading…"}):o.length===0?e.jsx("div",{className:"hb-sp-empty",children:e.jsx("div",{className:"hb-sp-empty-text",children:"No articles in this category."})}):e.jsx("div",{className:"hb-sp-list",children:o.map(m=>e.jsxs("button",{className:"hb-sp-list-item",onClick:()=>s({id:"kb-article",slug:m.slug}),children:[e.jsx("div",{className:"hb-sp-ticket-title",children:m.title}),m.excerpt&&e.jsx("div",{className:"hb-sp-ticket-meta",children:m.excerpt})]},m.id))})]})]})}function Mt({slug:s}){const{article:t,loading:a,error:n}=pt(s);return a?e.jsx("div",{className:"hb-sp-loading",children:"Loading article…"}):n||!t?e.jsx("div",{className:"hb-sp-error",children:n??"Article not found"}):e.jsxs("div",{className:"hb-sp-detail-page",children:[e.jsx("div",{className:"hb-sp-detail-title",children:t.title}),e.jsx("div",{className:"hb-sp-article-content",dangerouslySetInnerHTML:{__html:t.content}})]})}function _t({page:s,onNav:t,currentProduct:a}){return s.id==="hub"?e.jsx(mt,{onNav:t}):s.id==="submit"?e.jsx(kt,{initialType:s.ticketType,onNav:t}):s.id==="tickets"?e.jsx(wt,{onNav:t}):s.id==="ticket"?e.jsx(jt,{ticketId:s.ticketId}):s.id==="changelog"?e.jsx(Nt,{}):s.id==="features"?e.jsx(Ct,{}):s.id==="kb"?e.jsx(zt,{onNav:t,category:s.category}):s.id==="kb-article"?e.jsx(Mt,{slug:s.slug}):s.id==="docs"?e.jsx(xt,{currentProduct:a}):s.id==="chat"?e.jsx("div",{className:"hb-sp-empty",children:e.jsx("div",{className:"hb-sp-empty-text",children:"Live chat coming soon."})}):null}function me({config:s,user:t,currentProduct:a="hub"}){const[n,o]=i.useState(!1),[d,p]=i.useState({id:"hub"}),[l,c]=i.useState([]),r=i.useRef(null),u=i.useCallback(x=>{c(h=>[...h,d]),p(x),r.current&&(r.current.scrollTop=0)},[d]),b=i.useCallback(()=>{c(x=>{const h=[...x],C=h.pop();return C&&p(C),h}),r.current&&(r.current.scrollTop=0)},[]),v=i.useCallback(()=>{o(!1),setTimeout(()=>{p({id:"hub"}),c([])},200)},[]);i.useEffect(()=>{if(!n)return;const x=h=>{h.key==="Escape"&&v()};return document.addEventListener("keydown",x),()=>document.removeEventListener("keydown",x)},[n,v]);const f=l.length>0,m=ut[d.id]??"Support",_=n?se.createPortal(e.jsx("div",{className:"hb-sp-overlay",onClick:v,"aria-hidden":"true",children:e.jsxs("div",{className:`hb-sp-panel${n?" open":""}`,onClick:x=>x.stopPropagation(),role:"dialog","aria-modal":"true","aria-label":"Support",children:[e.jsxs("div",{className:"hb-sp-header",children:[f?e.jsx("button",{className:"hb-sp-back-btn",onClick:b,"aria-label":"Go back",children:"‹ Back"}):e.jsx("div",{className:"hb-sp-header-title",children:m}),f&&e.jsx("div",{className:"hb-sp-header-title",children:m}),e.jsx("button",{className:"hb-sp-close-btn",onClick:v,"aria-label":"Close support panel",children:e.jsx(D,{size:16})})]}),e.jsx("div",{className:"hb-sp-content",ref:r,children:e.jsx(tt,{config:s,user:t,children:e.jsx(_t,{page:d,onNav:u,currentProduct:a})})})]})}),document.body):null;return e.jsxs(e.Fragment,{children:[e.jsx("button",{className:`hb-chat-btn${n?" open":""}`,title:"Support","aria-label":"Open support panel","aria-expanded":n,onClick:()=>o(x=>!x),children:e.jsx(Me,{size:18})}),_]})}const Tt={"theonepsa.com":"psa","theonecrm.app":"crm","theonermm.app":"rmm","theonesecurity.app":"security","theonebackups.app":"backups","theoneprojects.app":"projects","theonebooks.app":"books","theonevoice.app":"voice","theonestudio.app":"ai-studio","theonelivekit.app":"livekit","theonemission.app":"mission","theoneams.com":"ams","theonefleet.app":"fleet","theonepeople.app":"people","theonecmdb.app":"cmdb","theoneoncall.app":"oncall","theonevisitor.app":"visitor","theonelegal.app":"legal","mspcollective.io":"collective","theoneportal.app":"portal","theonebridge.app":"bridge","theonecanvas.app":"canvas","theonemigrate.app":"migrate","theonebrand.app":"brand","theoneops.app":"ops-center","theonestack.com":"hub"};function Et(s){for(const[t,a]of Object.entries(Tt))if(s.includes(t))return a;return null}const At=[[/\/tickets?\/([\w-]+)/,"ticket"],[/\/companies?\/([\w-]+)/,"company"],[/\/contacts?\/([\w-]+)/,"contact"],[/\/devices?\/([\w-]+)/,"device"],[/\/invoices?\/([\w-]+)/,"invoice"],[/\/opportunities?\/([\w-]+)/,"opportunity"],[/\/projects?\/([\w-]+)/,"project"],[/\/incidents?\/([\w-]+)/,"incident"],[/\/contracts?\/([\w-]+)/,"contract"],[/\/employees?\/([\w-]+)/,"employee"],[/\/configurations?\/([\w-]+)/,"configuration_item"],[/\/alerts?\/([\w-]+)/,"alert"],[/\/calls?\/([\w-]+)/,"call"],[/\/recordings?\/([\w-]+)/,"call"],[/\/recaps?\/([\w-]+)/,"call"]];function Lt(s){for(const[t,a]of At){const n=s.match(t);if(n!=null&&n[1]&&n[1]!=="new"&&n[1]!=="list")return{entity_type:a,entity_id:n[1]}}return{}}function K(){const s=Et(window.location.hostname),{entity_type:t,entity_id:a}=Lt(window.location.pathname);return{product:s,page:window.location.pathname,entity_type:t,entity_id:a}}const q={ticket:[{label:"Summarize this ticket",prompt:"Summarize this ticket including its history and current status."},{label:"Find similar tickets",prompt:"Search for similar tickets that might be related to this one."},{label:"Draft a response",prompt:"Draft a professional response to the client for this ticket."},{label:"Check SLA status",prompt:"What is the SLA status for this ticket? Is it at risk of breaching?"}],company:[{label:"Full company picture",prompt:"Give me a complete picture of this company — tickets, revenue, devices, security posture."},{label:"Open tickets",prompt:"What are the open tickets for this company?"},{label:"Revenue summary",prompt:"Show me the revenue summary for this company."},{label:"Device health",prompt:"What is the device health status for this company?"}],device:[{label:"What's wrong?",prompt:"What's wrong with this device? Show me recent alerts and issues."},{label:"Recent alerts",prompt:"Show me the recent alerts for this device."},{label:"Similar issues",prompt:"Are there similar issues on other devices?"}],invoice:[{label:"Payment status",prompt:"What is the payment status of this invoice?"},{label:"Customer history",prompt:"Show me the payment history for this customer."}],call:[{label:"Call summary",prompt:"Summarize this call — what was discussed, sentiment, and any action items."},{label:"Extract action items",prompt:"Extract all action items from this call and suggest ticket creation for each."},{label:"Full transcript",prompt:"Show me the full transcript of this call."},{label:"Follow up",prompt:"Draft a follow-up message to the caller based on this call."}],contact:[{label:"Text this contact",prompt:"Help me draft and send an SMS to this contact."},{label:"Call this contact",prompt:"Connect me to this contact via phone."},{label:"Communication history",prompt:"Show me all recent calls and messages with this contact."},{label:"Email this contact",prompt:"Help me draft and send an email to this contact."}],dashboard:[{label:"What needs attention?",prompt:"What needs my attention today? Show me critical items across all products."},{label:"Show overdue items",prompt:"What items are overdue — tickets, invoices, tasks?"},{label:"SLA alerts",prompt:"Are there any SLA alerts or at-risk tickets right now?"},{label:"Revenue this month",prompt:"What's our revenue looking like this month?"}]};function Ot(s){return s.entity_type&&q[s.entity_type]?q[s.entity_type]:s.page==="/"||s.page.includes("dashboard")?q.dashboard:[{label:"What needs attention?",prompt:"What needs my attention today?"},{label:"Search tickets",prompt:"Search for recent open tickets."},{label:"Company health",prompt:"Show me a summary of company health scores."}]}const U="jarvis_messages",xe=50;function $t(){try{const s=sessionStorage.getItem(U);return s?JSON.parse(s).slice(-xe):[]}catch{return[]}}function Rt(s){try{sessionStorage.setItem(U,JSON.stringify(s.slice(-xe)))}catch{sessionStorage.removeItem(U)}}let It=0;function Z(){return`jm_${Date.now()}_${++It}`}function ge(s,t,a){const[n,o]=i.useState($t),[d,p]=i.useState(!1),[l,c]=i.useState(K),[r,u]=i.useState([]),b=i.useRef(null),v=i.useRef("");i.useEffect(()=>{const x=()=>{const C=K();c(C),u(Ot(C))};x(),window.addEventListener("popstate",x);const h=new MutationObserver(()=>{K().page!==l.page&&x()});return h.observe(document.querySelector("title")||document.head,{childList:!0,subtree:!0}),()=>{window.removeEventListener("popstate",x),h.disconnect()}},[l.page]),i.useEffect(()=>{Rt(n)},[n]);const f=i.useCallback(async x=>{if(!x.trim()||d||!t)return;const h={id:Z(),role:"user",content:x.trim(),timestamp:new Date().toISOString()},C={id:Z(),role:"assistant",content:"",tool_calls:[],timestamp:new Date().toISOString()};o(w=>[...w,h,C]),p(!0),v.current="";const j=new AbortController;b.current=j;try{const g={model:"gpt-4.1-mini",messages:[...n.slice(-18),h].map(T=>({role:T.role,content:T.content})),stream:!0,context:{product:l.product,entity_type:l.entity_type,entity_id:l.entity_id,page_url:window.location.href}},N=await fetch(`${s}/api/ai/chat`,{method:"POST",headers:{"Content-Type":"application/json","x-tenant-id":t,"x-ai-tier":"jarvis_free"},credentials:"include",body:JSON.stringify(g),signal:j.signal});if(!N.ok){const T=await N.json().catch(()=>({error:N.statusText}));throw new Error(T.error||T.message||`Error ${N.status}`)}if(!N.body)throw new Error("No response body");const y=N.body.getReader(),S=new TextDecoder;let z="";const E=[];for(;;){const{done:T,value:B}=await y.read();if(T)break;z+=S.decode(B,{stream:!0});const J=z.split(`
`);z=J.pop()||"";for(const G of J){if(!G.startsWith("data: "))continue;const Y=G.slice(6).trim();if(Y==="[DONE]")break;try{const A=JSON.parse(Y);if(A.type==="content_delta"&&A.text){v.current+=A.text;const R=v.current;o($=>{const M=[...$],O=M[M.length-1];return O&&O.id===C.id&&(M[M.length-1]={...O,content:R}),M})}else if(A.type==="tool_use_start"&&A.name){E.push({name:A.name,status:"running"});const R=[...E];o($=>{const M=[...$],O=M[M.length-1];return O&&O.id===C.id&&(M[M.length-1]={...O,tool_calls:R}),M})}else if(A.type==="message_stop"){E.forEach($=>{$.status==="running"&&($.status="done")});const R=[...E];o($=>{const M=[...$],O=M[M.length-1];return O&&O.id===C.id&&(M[M.length-1]={...O,tool_calls:R}),M})}else if(A.type==="error")throw new Error(A.message||"Stream error")}catch(A){if(A instanceof Error&&A.message!=="Stream error")continue;throw A}}}}catch(w){if(!(w instanceof DOMException&&w.name==="AbortError")){const g=w instanceof Error?w.message:"Something went wrong. Please try again.";o(N=>{const y=[...N],S=y[y.length-1];return S&&S.id===C.id&&(y[y.length-1]={...S,content:S.content||g,error:!0}),y})}}finally{p(!1),b.current=null}},[s,t,n,d,l]),m=i.useCallback(()=>{b.current&&(b.current.abort(),b.current=null)},[]),_=i.useCallback(()=>{o([]),sessionStorage.removeItem(U)},[]);return{messages:n,streaming:d,context:l,quickActions:r,sendMessage:f,stopStreaming:m,clearMessages:_}}function Pt(s){return s?s.replace(/&/g,"&amp;").replace(/</g,"&lt;").replace(/>/g,"&gt;").replace(/```(\w*)\n?([\s\S]*?)```/g,'<pre class="hb-jv-code-block"><code>$2</code></pre>').replace(/`([^`]+)`/g,'<code class="hb-jv-inline-code">$1</code>').replace(/\*\*(.+?)\*\*/g,"<strong>$1</strong>").replace(/\*(.+?)\*/g,"<em>$1</em>").replace(/\[([^\]]+)\]\(([^)]+)\)/g,'<a href="$2" target="_blank" rel="noopener noreferrer" class="hb-jv-link">$1</a>').replace(/^[•\-\*] (.+)$/gm,"<li>$1</li>").replace(/^\d+\. (.+)$/gm,"<li>$1</li>").replace(/(<li>[\s\S]*?<\/li>)/g,'<ul class="hb-jv-list">$1</ul>').replace(/<\/ul>\s*<ul class="hb-jv-list">/g,"").replace(/\n/g,"<br>"):""}const Dt={search_tickets:"Searching tickets",get_ticket:"Fetching ticket details",create_ticket:"Creating ticket",update_ticket:"Updating ticket",get_company_info:"Looking up company",search_companies:"Searching companies",search_contacts:"Searching contacts",get_deals:"Fetching deals",get_invoices:"Fetching invoices",get_revenue_summary:"Calculating revenue",get_device_status:"Checking device status",search_devices:"Searching devices",run_device_command:"Running command",get_security_alerts:"Checking security alerts",send_message:"Sending message",get_call_history:"Fetching call history",get_company_360:"Building company overview",get_health_score:"Calculating health score",get_briefing:"Generating daily briefing",cross_search:"Searching across products"};function Ht({tool:s}){const t=Dt[s.name]||s.name.replace(/_/g," "),a=s.status==="running",n=s.status==="error";return e.jsxs("div",{className:`hb-jv-tool-call${a?" running":""}${n?" error":""}`,children:[e.jsx("div",{className:"hb-jv-tool-icon",children:a?e.jsx("span",{className:"hb-jv-tool-spinner"}):n?e.jsx("span",{style:{color:"#f87171"},children:"!"}):e.jsx("span",{style:{color:"#34d399"},children:"✓"})}),e.jsxs("span",{className:"hb-jv-tool-label",children:[t,a?"…":""]}),s.summary&&e.jsx("span",{className:"hb-jv-tool-summary",children:s.summary})]})}function Ft({message:s,isStreaming:t}){if(s.role==="user")return e.jsx("div",{className:"hb-jv-msg hb-jv-msg-user",children:e.jsx("div",{className:"hb-jv-bubble hb-jv-bubble-user",children:s.content})});const n=s.content.length>0,o=s.tool_calls&&s.tool_calls.length>0;return e.jsxs("div",{className:"hb-jv-msg hb-jv-msg-assistant",children:[e.jsx("div",{className:"hb-jv-avatar",children:e.jsx(P,{size:14,color:"#f97316"})}),e.jsxs("div",{className:"hb-jv-bubble-wrap",children:[o&&e.jsx("div",{className:"hb-jv-tool-calls",children:s.tool_calls.map((d,p)=>e.jsx(Ht,{tool:d},p))}),n&&e.jsx("div",{className:`hb-jv-bubble hb-jv-bubble-assistant${s.error?" error":""}`,dangerouslySetInnerHTML:{__html:Pt(s.content)}}),!n&&t&&e.jsx("div",{className:"hb-jv-bubble hb-jv-bubble-assistant",children:e.jsxs("span",{className:"hb-jv-typing",children:[e.jsx("span",{}),e.jsx("span",{}),e.jsx("span",{})]})})]})]})}function Ut({actions:s,onSelect:t,disabled:a}){return s.length===0?null:e.jsx("div",{className:"hb-jv-quick-actions",children:s.map((n,o)=>e.jsx("button",{className:"hb-jv-quick-chip",onClick:()=>t(n.prompt),disabled:a,children:n.label},o))})}function ve({apiBase:s,tenantId:t,userId:a}){const[n,o]=i.useState(!1),{messages:d,streaming:p,context:l,quickActions:c,sendMessage:r,stopStreaming:u,clearMessages:b}=ge(s,t),[v,f]=i.useState(""),m=i.useRef(null),_=i.useRef(null),[x]=i.useState(!1);i.useEffect(()=>{const g=N=>{(N.metaKey||N.ctrlKey)&&N.key==="j"&&(N.preventDefault(),o(y=>!y)),N.key==="Escape"&&n&&o(!1)};return document.addEventListener("keydown",g),()=>document.removeEventListener("keydown",g)},[n]),i.useEffect(()=>{m.current&&m.current.scrollIntoView({behavior:"smooth"})},[d]),i.useEffect(()=>{n&&_.current&&setTimeout(()=>{var g;return(g=_.current)==null?void 0:g.focus()},100)},[n]);const h=i.useCallback(()=>{!v.trim()||p||(r(v.trim()),f(""))},[v,p,r]),C=i.useCallback(g=>{r(g)},[r]),j=i.useCallback(g=>{g.key==="Enter"&&!g.shiftKey&&(g.preventDefault(),h())},[h]),w=n?se.createPortal(e.jsx("div",{className:"hb-jv-overlay",onClick:()=>o(!1),children:e.jsxs("div",{className:"hb-jv-panel",onClick:g=>g.stopPropagation(),role:"dialog","aria-modal":"true","aria-label":"THEO AI Assistant",children:[e.jsxs("div",{className:"hb-jv-header",children:[e.jsxs("div",{className:"hb-jv-header-left",children:[e.jsx(P,{size:16,color:"#f97316"}),e.jsx("span",{className:"hb-jv-header-title",children:"THEO"}),e.jsx("span",{className:"hb-jv-model-badge",children:"GPT-4.1 mini"})]}),e.jsxs("div",{className:"hb-jv-header-right",children:[d.length>0&&e.jsx("button",{className:"hb-jv-clear-btn",onClick:b,title:"Clear conversation","aria-label":"Clear conversation",children:"Clear"}),e.jsx("button",{className:"hb-jv-close-btn",onClick:()=>o(!1),"aria-label":"Close THEO",children:e.jsx(D,{size:16})})]})]}),e.jsxs("div",{className:"hb-jv-messages",children:[d.length===0?e.jsxs("div",{className:"hb-jv-welcome",children:[e.jsx("div",{className:"hb-jv-welcome-icon",children:e.jsx(P,{size:28,color:"#f97316"})}),e.jsx("div",{className:"hb-jv-welcome-title",children:"Hey, I'm THEO"}),e.jsx("div",{className:"hb-jv-welcome-sub",children:"Your AI operations assistant for The One Stack. I can help you with tickets, clients, devices, and more."}),l.product&&e.jsxs("div",{className:"hb-jv-welcome-context",children:["Currently viewing: ",e.jsx("strong",{children:l.product.toUpperCase()}),l.entity_type&&` — ${l.entity_type}`,l.entity_id&&` ${l.entity_id}`]})]}):d.map((g,N)=>e.jsx(Ft,{message:g,isStreaming:p&&N===d.length-1&&g.role==="assistant"},g.id)),e.jsx("div",{ref:m})]}),d.length===0&&e.jsx(Ut,{actions:c,onSelect:C,disabled:p}),e.jsxs("div",{className:"hb-jv-input-area",children:[e.jsxs("div",{className:"hb-jv-input-row",children:[e.jsx("textarea",{ref:_,className:"hb-jv-input",placeholder:"Ask THEO anything...",value:v,onChange:g=>f(g.target.value),onKeyDown:j,rows:1,disabled:p}),p?e.jsx("button",{className:"hb-jv-stop-btn",onClick:u,title:"Stop generating","aria-label":"Stop generating",children:e.jsx("span",{className:"hb-jv-stop-icon"})}):e.jsx("button",{className:"hb-jv-send-btn",onClick:h,disabled:!v.trim(),title:"Send message","aria-label":"Send message",children:e.jsxs("svg",{width:"16",height:"16",viewBox:"0 0 24 24",fill:"none",stroke:"currentColor",strokeWidth:"2",strokeLinecap:"round",strokeLinejoin:"round",children:[e.jsx("path",{d:"M22 2L11 13"}),e.jsx("path",{d:"M22 2L15 22L11 13L2 9L22 2Z"})]})})]}),e.jsxs("div",{className:"hb-jv-input-hint",children:[e.jsxs("span",{className:"hb-jv-kbd-hint",children:[e.jsx("kbd",{children:"⌘"}),e.jsx("kbd",{children:"J"})," to toggle"]}),e.jsx("span",{className:"hb-jv-powered",children:"Powered by The One AI"})]})]})]})}),document.body):null;return e.jsxs(e.Fragment,{children:[e.jsx("button",{className:`hb-jv-btn${n?" active":""}${x?" pulse":""}`,title:"THEO (⌘J)","aria-label":"Open THEO","aria-expanded":n,onClick:()=>o(g=>!g),children:e.jsx(P,{size:18})}),w]})}const Bt="https://docs.theonestack.com/docs/changelog/",ee="hb_last_changelog_seen",te="2026-03-08";function Kt({className:s}){const[t,a]=i.useState(!1);i.useEffect(()=>{try{const o=localStorage.getItem(ee);(!o||o<te)&&a(!0)}catch{}},[]);const n=()=>{try{localStorage.setItem(ee,te)}catch{}a(!1),window.open(Bt,"_blank","noopener,noreferrer")};return t?e.jsxs("button",{onClick:n,title:"What's New — View latest updates","aria-label":"New updates available",className:s,style:{position:"relative",display:"inline-flex",alignItems:"center",gap:4,padding:"3px 8px",borderRadius:12,background:"rgba(249,115,22,0.15)",color:"#f97316",fontSize:11,fontWeight:600,border:"none",cursor:"pointer",whiteSpace:"nowrap",transition:"background 0.15s",fontFamily:'-apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif'},onMouseEnter:o=>{o.currentTarget.style.background="rgba(249,115,22,0.25)"},onMouseLeave:o=>{o.currentTarget.style.background="rgba(249,115,22,0.15)"},children:[e.jsx("span",{style:{width:6,height:6,borderRadius:"50%",background:"#f97316",animation:"hb-pulse 2s ease-in-out infinite"}}),"New"]}):null}const qt=`
@keyframes hb-pulse {
  0%, 100% { opacity: 1; }
  50% { opacity: 0.4; }
}
`;function Wt(){return e.jsx("svg",{className:"hb-logo-bird",width:"22",height:"22",viewBox:"0 0 1200 1200",xmlns:"http://www.w3.org/2000/svg","aria-hidden":"true",children:e.jsx("g",{transform:"scale(13.5) translate(-5.5555488798353405, -5.55552503797743)",children:e.jsx("g",{fill:"#f97316",children:e.jsx("g",{transform:"translate(0,-952.36218)",children:e.jsx("path",{d:"m 60.7828,964.36215 27.1809,0.8834 -27.1809,25.9958 z m -1.9745,1.4513 0,26.7845 -25.2681,0 c 8.6166,-8.7334 16.8796,-17.8103 25.2681,-26.7845 z m 27.7053,3.628 3.4864,1.1989 -12.5877,7.4768 z m -68.1835,2.9656 5.5226,0 12.8654,14.0705 -5.9854,6.1204 -12.4026,0 c 9e-4,-6.7347 0,-13.4597 0,-20.1909 z m -1.9746,1.2304 0,5.8364 -6.3555,0 z m 3.363,20.9796 38.627,0 -10.7675,29.43465 z m 39.0898,4.54286 0,41.20229 -12.5878,-6.8775 c 4.1972,-11.443 8.3886,-22.879 12.5878,-34.32479 z"})})})})})}function Vt({currentProduct:s,apiBase:t,signalrEndpoint:a,session:n,onLogout:o,hubUrl:d=V,chatSlot:p,supportConfig:l,orgBranding:c}){const r=ne(n),u=i.useRef(!1);return i.useEffect(()=>{if(u.current||(u.current=!0,document.getElementById("hb-styles")))return;const b=document.createElement("style");b.id="hb-styles",b.textContent=ye+qt,document.head.appendChild(b)},[]),i.useEffect(()=>{const b=document.body.style.paddingTop;return document.body.style.paddingTop=`${ae}px`,()=>{document.body.style.paddingTop=b}},[]),r?e.jsx(Jt,{currentProduct:s,apiBase:t,signalrEndpoint:a,session:r,onLogout:o,hubUrl:d,chatSlot:p,supportConfig:l,orgBranding:c}):e.jsx("div",{className:"hb-root",role:"banner",children:e.jsx("div",{className:"hb-bar hb-bar--guest","aria-hidden":"true"})})}function Jt({currentProduct:s,apiBase:t,signalrEndpoint:a,session:n,onLogout:o,hubUrl:d=V,chatSlot:p,supportConfig:l,orgBranding:c}){var E;const{products:r}=ie(t,n.tenantId??null),{notifications:u,unreadCount:b,markAllRead:v,markRead:f,dismiss:m,muted:_,muteUntil:x,unmute:h,toastQueue:C,dismissToast:j}=re(t,a,n.tenantId??null,n.userId??null),[w,g]=i.useState(!1),[N,y]=i.useState(!1),[S,z]=i.useState(!1);return e.jsxs("div",{className:"hb-root",role:"banner",children:[e.jsx(he,{toasts:C,onDismiss:j}),e.jsxs("div",{className:"hb-bar",style:(E=c==null?void 0:c.colors)!=null&&E.header_bg?{background:c.colors.header_bg,color:c.colors.header_text||"#f1f5f9"}:void 0,children:[e.jsx(le,{currentProduct:s,products:r,open:w,onToggle:()=>{y(!1),z(!1),g(T=>!T)},onClose:()=>g(!1),hubUrl:d}),e.jsxs("a",{href:d,className:"hb-logo","aria-label":c!=null&&c.company_name?`${c.company_name} — Home`:"The One Stack — Home",children:[c!=null&&c.logo_icon_url||c!=null&&c.logo_url?e.jsx("img",{src:c.logo_icon_url||c.logo_url,alt:c.company_name||"Logo",style:{height:22,width:"auto",objectFit:"contain"}}):e.jsx(Wt,{}),e.jsx("span",{className:"hb-logo-name",children:(c==null?void 0:c.company_name)||"The One"})]}),e.jsx("div",{className:"hb-divider","aria-hidden":"true"}),(()=>{const T=r.find(B=>B.id===s);return T?e.jsx("span",{style:{fontSize:14,fontWeight:500,color:"#f1f5f9",whiteSpace:"nowrap"},children:T.name}):null})(),e.jsx("div",{style:{flex:1}}),e.jsx(de,{apiBase:t,tenantId:(n==null?void 0:n.tenantId)??null}),e.jsx("div",{style:{flex:1}}),l?e.jsx(me,{config:l,currentProduct:s,user:{email:(n==null?void 0:n.email)??"",name:n?`${n.firstName??""} ${n.lastName??""}`.trim()||n.email:""}}):p??null,e.jsx(ve,{apiBase:t,tenantId:n.tenantId??null,userId:n.userId??null,currentProduct:s}),e.jsx(Kt,{}),e.jsx(pe,{notifications:u,unreadCount:b,open:N,onToggle:()=>{g(!1),z(!1),y(T=>!T)},onClose:()=>y(!1),onMarkAllRead:v,onMarkRead:f,onDismiss:m,muted:_,onMute:x,onUnmute:h,hubUrl:d}),e.jsx(be,{session:n,open:S,onToggle:()=>{g(!1),y(!1),z(T=>!T)},onClose:()=>z(!1),onLogout:o,hubUrl:d})]})]})}exports.ALL_PRODUCTS=I;exports.HUB_BAR_HEIGHT=ae;exports.HUB_URL=V;exports.HubBar=Vt;exports.JarvisButton=ve;exports.NotificationBell=pe;exports.NotificationToast=he;exports.ProductSwitcher=le;exports.SEVERITY_COLORS=F;exports.SupportButton=me;exports.UnifiedSearch=de;exports.UserMenu=be;exports.useHubSession=ne;exports.useJarvis=ge;exports.useNotifications=re;exports.useProducts=ie;exports.useSearch=ce;
