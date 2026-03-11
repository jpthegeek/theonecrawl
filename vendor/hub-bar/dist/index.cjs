"use strict";Object.defineProperty(exports,Symbol.toStringTag,{value:"Module"});const e=require("react/jsx-runtime"),r=require("react"),X=require("react-dom"),V="https://my.theonestack.com",H=[{id:"psa",name:"PSA",url:"https://app.theonepsa.com",icon:"briefcase",color:"#3b82f6"},{id:"crm",name:"CRM",url:"https://app.theonecrm.app",icon:"target",color:"#0ea5e9"},{id:"rmm",name:"RMM",url:"https://app.theonermm.app",icon:"monitor",color:"#14b8a6"},{id:"security",name:"Security",url:"https://app.theonesecurity.app",icon:"shield-check",color:"#4f46e5"},{id:"backups",name:"Backups",url:"https://app.theonebackups.app",icon:"hard-drive",color:"#10b981"},{id:"projects",name:"Projects",url:"https://app.theoneprojects.app",icon:"folder-kanban",color:"#f59e0b"},{id:"books",name:"Books",url:"https://app.theonebooks.app",icon:"book-open",color:"#14b8a6"},{id:"voice",name:"Voice",url:"https://app.theonevoice.app",icon:"phone",color:"#06b6d4"},{id:"ai-studio",name:"AI Studio",url:"https://app.theonestudio.app",icon:"sparkles",color:"#6366f1"},{id:"livekit",name:"LiveKit",url:"https://live.theonelivekit.app",icon:"video",color:"#2563eb"},{id:"mission",name:"Mission",url:"https://app.theonemission.app",icon:"heart",color:"#e11d48"},{id:"ams",name:"AMS",url:"https://app.theoneams.com",icon:"building-2",color:"#f59e0b"},{id:"fleet",name:"Fleet",url:"https://app.theonefleet.app",icon:"truck",color:"#10b981"},{id:"people",name:"People",url:"https://app.theonepeople.app",icon:"users",color:"#f43f5e"},{id:"cmdb",name:"CMDB",url:"https://app.theonecmdb.app",icon:"database",color:"#06b6d4"},{id:"oncall",name:"On-Call",url:"https://app.theoneoncall.app",icon:"bell-ring",color:"#f43f5e"},{id:"visitor",name:"Visitor",url:"https://app.theonevisitor.app",icon:"door-open",color:"#0ea5e9"},{id:"legal",name:"Legal",url:"https://app.theonelegal.app",icon:"scale",color:"#2563eb"},{id:"collective",name:"Collective",url:"https://app.mspcollective.io",icon:"globe",color:"#8b5cf6"},{id:"crawl",name:"Crawl",url:"https://crawl.theonestack.com",icon:"search",color:"#f97316"},{id:"portal",name:"Portal",url:"https://app.theoneportal.app",icon:"globe",color:"#ec4899"},{id:"bridge",name:"Bridge",url:"https://app.theonebridge.app",icon:"arrow-left-right",color:"#f97316"},{id:"canvas",name:"Canvas",url:"https://app.theonecanvas.app",icon:"pen-tool",color:"#f59e0b"},{id:"mission",name:"Mission",url:"https://app.theonemission.app",icon:"heart",color:"#a855f7"},{id:"brand",name:"Brand",url:"https://app.theonebrand.app",icon:"palette",color:"#e11d48"},{id:"migrate",name:"Migrate",url:"https://app.theonemigrate.app",icon:"arrow-right-left",color:"#0891b2"},{id:"relay",name:"Relay",url:"https://app.theonerelay.app",icon:"mail",color:"#f97316"},{id:"code",name:"Code",url:"https://app.theonecode.app",icon:"shield-check",color:"#06b6d4"},{id:"hub",name:"Hub",url:"https://my.theonestack.com",icon:"layout-grid",color:"#8b5cf6"},{id:"ops-center",name:"Ops Center",url:"https://theoneops.app",icon:"activity",color:"#818cf8"}],D={info:"#60a5fa",success:"#34d399",warning:"#fbbf24",error:"#f87171"},Z=48,me=`
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
`;function xe(s){if(typeof document>"u")return null;const t=document.cookie.match(new RegExp("(?:^|;\\s*)"+s+"=([^;]*)"));if(!t)return null;try{return decodeURIComponent(t[1])}catch{return null}}function ge(s){try{const t=s.split(".");if(t.length!==3)return null;const n=t[1].replace(/-/g,"+").replace(/_/g,"/"),a=n+"=".repeat((4-n.length%4)%4);return JSON.parse(atob(a))}catch{return null}}function ve(s,t,n){if(t&&n)return(t[0]+n[0]).toUpperCase();if(t)return t.slice(0,2).toUpperCase();const a=s.split("@")[0].split(/[._-]/);return a.length>=2?(a[0][0]+a[1][0]).toUpperCase():s.slice(0,2).toUpperCase()}function ee(s){return r.useMemo(()=>{if(s)return s;const t=xe("hub_session");if(!t)return null;const n=ge(t);if(!n)return null;const a=n.userId||n.sub||"",c=n.tenantId||n.tenant_id||"",d=n.tenantSlug||"",p=n.tenantName||d,i=n.email||"",l=n.role||"member",o=n.orgRole,u=n.entitlements,h=n.firstName,v=n.lastName;return!a||!i?null:{userId:a,tenantId:c,tenantSlug:d,tenantName:p,email:i,role:l,orgRole:o,entitlements:u,firstName:h,lastName:v,initials:ve(i,h,v)}},[s])}function te(s,t){const[n,a]=r.useState([]),[c,d]=r.useState(!1),[p,i]=r.useState(null);return r.useEffect(()=>{if(!t){a(H.map(o=>({...o,active:!1})));return}d(!0),i(null);const l=new AbortController;return fetch(`${s}/api/bus/products?tenant_id=${encodeURIComponent(t)}`,{credentials:"include",signal:l.signal}).then(o=>{if(!o.ok)throw new Error(`Products API returned ${o.status}`);return o.json()}).then(o=>{const u=new Set(o.activeProductIds);a(H.map(h=>({...h,active:u.has(h.id)}))),d(!1)}).catch(o=>{o.name!=="AbortError"&&(a(H.map(u=>({...u,active:!1}))),i(o.message),d(!1))}),()=>l.abort()},[s,t]),{products:n,loading:c,error:p}}function se(s,t,n,a){const[c,d]=r.useState([]),[p,i]=r.useState([]),[l,o]=r.useState(!1),u=r.useRef(null),h=r.useRef(null);r.useEffect(()=>{if(!n||!a)return;const w=new AbortController;return fetch(`${s}/api/bus/notifications?user_id=${encodeURIComponent(a)}&limit=20`,{credentials:"include",signal:w.signal}).then(j=>j.ok?j.json():Promise.resolve({notifications:[]})).then(j=>{d(j.notifications??[])}).catch(()=>{}),()=>w.abort()},[s,n,a]),r.useEffect(()=>{if(!t||!n)return;let w=!1;return(async()=>{try{const{HubConnectionBuilder:j,LogLevel:g}=await Promise.resolve().then(()=>require("./index-BcawcpwG.cjs")),S=new j().withUrl(`${t}?tenantId=${encodeURIComponent(n)}`).withAutomaticReconnect().configureLogging(g.Warning).build();S.on("notification",k=>{d(C=>[k,...C.slice(0,49)]),u.current||(i(C=>[...C,k]),setTimeout(()=>{i(C=>C.filter(M=>M.id!==k.id))},5e3))}),S.on("notificationsRead",k=>{const C=new Set(k);d(M=>M.map(E=>C.has(E.id)?{...E,read:!0}:E))}),S.on("busEvent",k=>{const C={id:k.event_id,productId:k.source,productName:k.source.toUpperCase(),title:k.title,body:k.detail,severity:k.severity==="critical"?"error":k.severity,read:!1,deepLink:k.entity_url||"",createdAt:k.timestamp};d(M=>[C,...M.slice(0,49)]),u.current||(i(M=>[...M,C]),setTimeout(()=>{i(M=>M.filter(E=>E.id!==C.id))},5e3))}),w||(await S.start(),h.current=S)}catch{}})(),()=>{var j;w=!0,(j=h.current)==null||j.stop(),h.current=null}},[t,n]);const v=r.useCallback(w=>{d(j=>j.map(g=>g.id===w?{...g,read:!0}:g)),fetch(`${s}/api/bus/notifications/${encodeURIComponent(w)}/read`,{method:"POST",credentials:"include"}).catch(()=>{})},[s]),f=r.useCallback(()=>{d(w=>w.map(j=>({...j,read:!0}))),fetch(`${s}/api/bus/notifications/mark-all-read`,{method:"POST",credentials:"include"}).catch(()=>{})},[s]),m=r.useCallback(w=>{d(j=>j.filter(g=>g.id!==w)),fetch(`${s}/api/bus/notifications/${encodeURIComponent(w)}/dismiss`,{method:"POST",credentials:"include"}).catch(()=>{})},[s]),N=r.useCallback(w=>{o(!0),u.current&&clearTimeout(u.current),u.current=setTimeout(()=>{o(!1),u.current=null},w)},[]),x=r.useCallback(()=>{o(!1),u.current&&(clearTimeout(u.current),u.current=null)},[]),b=r.useCallback(w=>{i(j=>j.filter(g=>g.id!==w))},[]),T=c.filter(w=>!w.read).length;return{notifications:c,unreadCount:T,markAllRead:f,markRead:v,dismiss:m,muted:l,muteUntil:N,unmute:x,toastQueue:p,dismissToast:b}}const y=s=>function({size:n=16,className:a,color:c="currentColor"}){const d=Array.isArray(s)?s:[s];return e.jsx("svg",{xmlns:"http://www.w3.org/2000/svg",width:n,height:n,viewBox:"0 0 24 24",fill:"none",stroke:c,strokeWidth:"2",strokeLinecap:"round",strokeLinejoin:"round",className:a,children:d.map((p,i)=>e.jsx("path",{d:p},i))})},J=y("M21 21l-4.35-4.35M17 11A6 6 0 1 1 5 11a6 6 0 0 1 12 0z"),ye=y(["M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9","M13.73 21a2 2 0 0 1-3.46 0"]),U=y("M18 6 6 18M6 6l12 12"),ke=y(["M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2","M12 3a4 4 0 1 0 0 8 4 4 0 0 0 0-8z"]),ne=y(["M12 20a8 8 0 1 0 0-16 8 8 0 0 0 0 16z","M12 14a2 2 0 1 0 0-4 2 2 0 0 0 0 4z"]),je=y(["M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4","M16 17l5-5-5-5","M21 12H9"]),we=y(["M7 16V4m0 0L3 8m4-4 4 4","M17 8v12m0 0 4-4m-4 4-4-4"]),Ne=y(["M12 22a10 10 0 1 0 0-20 10 10 0 0 0 0 20z","M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3","M12 17h.01"]),Se=y(["M12 22a10 10 0 1 0 0-20 10 10 0 0 0 0 20z","M12 16a4 4 0 1 0 0-8 4 4 0 0 0 0 8z","M4.93 4.93l4.24 4.24","M14.83 14.83l4.24 4.24","M14.83 9.17l4.24-4.24","M14.83 9.17l3.53-3.53","M4.93 19.07l4.24-4.24"]),Ce=y(["M16 20V4a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16","M2 10a2 2 0 0 1 2-2h16a2 2 0 0 1 2 2v10H2z"]),ze=y(["M22 12h-4","M6 12H2","M12 6V2","M12 22v-4","M12 8a4 4 0 1 0 0 8 4 4 0 0 0 0-8z"]),Me=y(["M2 3h20v14H2z","M8 21h8","M12 17v4"]),_e=y(["M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z","M9 12l2 2 4-4"]),Te=y(["M22 12H2","M5.45 5.11 2 12v6a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2v-6l-3.45-6.89A2 2 0 0 0 16.76 4H7.24a2 2 0 0 0-1.79 1.11z","M6 16h.01","M10 16h.01"]),Ee=y(["M20 20a2 2 0 0 0 2-2V8a2 2 0 0 0-2-2h-7.9a2 2 0 0 1-1.69-.9L9.6 3.9A2 2 0 0 0 7.93 3H4a2 2 0 0 0-2 2v13a2 2 0 0 0 2 2z","M8 10v4","M12 10v2","M16 10v6"]),Le=y(["M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z","M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z"]),$e=y("M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"),F=y(["M9.937 15.5A2 2 0 0 0 8.5 14.063l-6.135-1.582a.5.5 0 0 1 0-.962L8.5 9.936A2 2 0 0 0 9.937 8.5l1.582-6.135a.5.5 0 0 1 .963 0L14.063 8.5A2 2 0 0 0 15.5 9.937l6.135 1.581a.5.5 0 0 1 0 .964L15.5 14.063a2 2 0 0 0-1.437 1.437l-1.582 6.135a.5.5 0 0 1-.963 0z","M20 3v4","M22 5h-4"]),Ae=y(["M23 7l-7 5 7 5V7z","M14 5H3a2 2 0 0 0-2 2v10a2 2 0 0 0 2 2h11a2 2 0 0 0 2-2V7a2 2 0 0 0-2-2z"]),Re=y(["M18 22V8l-6-6-6 6v14","M2 22h20","M10 22v-4a2 2 0 0 1 4 0v4","M12 7v5","M10 9h4"]),Ie=y(["M6 22V4a2 2 0 0 1 2-2h8a2 2 0 0 1 2 2v18","M6 12H4a2 2 0 0 1-2-2V7a2 2 0 0 1 2-2h2","M18 12h2a2 2 0 0 1 2 2v3a2 2 0 0 1-2 2h-2","M10 6h4","M10 10h4","M10 14h4","M10 18h4"]),Oe=y(["M14 18V6a2 2 0 0 0-2-2H4a2 2 0 0 0-2 2v11a1 1 0 0 0 1 1h1","M15 18h6a1 1 0 0 0 1-1v-3.65a1 1 0 0 0-.22-.624l-3.48-4.35A1 1 0 0 0 17.52 8H14","M7 18a2 2 0 1 0 0 4 2 2 0 0 0 0-4z","M17 18a2 2 0 1 0 0 4 2 2 0 0 0 0-4z"]),Pe=y(["M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2","M9 3a4 4 0 1 0 0 8 4 4 0 0 0 0-8z","M22 21v-2a4 4 0 0 0-3-3.87","M16 3.13a4 4 0 0 1 0 7.75"]),He=y(["M12 2a9 3 0 1 0 0 6 9 3 0 0 0 0-6z","M21 12c0 1.66-4 3-9 3s-9-1.34-9-3","M3 5v14c0 1.66 4 3 9 3s9-1.34 9-3V5"]),Fe=y(["M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9","M13.73 21a2 2 0 0 1-3.46 0","M2 8c0-2.2.7-4.3 2-6","M22 8a10 10 0 0 0-2-6"]),Ue=y(["M13 4h3a2 2 0 0 1 2 2v14","M2 20h3","M13 20h9","M10 12v.01","M13 4.562v16.157a1 1 0 0 1-1.242.97L5 20V5.562a2 2 0 0 1 1.515-1.94l4.243-1.06A2 2 0 0 1 13 4.561z"]),De=y(["M16 2l5 5-14 14L2 16z","M12 8l-2-2","M8 12l-2-2"]),qe=y(["M12 2a10 10 0 1 0 0 20 10 10 0 0 0 0-20z","M2 12h20","M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"]),Ke=y(["M3 3h7v7H3z","M14 3h7v7h-7z","M14 14h7v7h-7z","M3 14h7v7H3z"]),Be=y("M22 12h-4l-3 9L9 3l-3 9H2"),Je=y(["M9 20H4a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h3.9a2 2 0 0 1 1.69.9l.81 1.2a2 2 0 0 0 1.67.9H20a2 2 0 0 1 2 2v1","M12 10v4h4","M12 14c1.5-2 3.5-3 6-3","M20 18v-4h-4","M20 14c-1.5 2-3.5 3-6 3"]),Ve={briefcase:Ce,target:ze,monitor:Me,"shield-check":_e,"hard-drive":Te,"folder-kanban":Ee,"book-open":Le,phone:$e,sparkles:F,video:Ae,church:Re,"building-2":Ie,truck:Oe,users:Pe,database:He,"bell-ring":Fe,"door-open":Ue,scale:De,globe:qe,search:J,"layout-grid":Ke,activity:Be,"folder-sync":Je};function We(){const s=[];for(let t=0;t<3;t++)for(let n=0;n<3;n++)s.push([6+n*7,6+t*7]);return e.jsx("svg",{width:"20",height:"20",viewBox:"0 0 24 24",fill:"none",xmlns:"http://www.w3.org/2000/svg",children:s.map(([t,n],a)=>e.jsx("circle",{cx:t,cy:n,r:"2",fill:"#94a3b8"},a))})}function Y({icon:s,size:t=20}){const n=Ve[s];return n?e.jsx(n,{size:t,color:"#fff"}):e.jsx("span",{style:{color:"#fff",fontSize:14,fontWeight:700},children:s.charAt(0).toUpperCase()})}function ae({currentProduct:s,products:t,open:n,onToggle:a,onClose:c,hubUrl:d}){const p=r.useRef(null),i=t.filter(o=>o.active),l=t.filter(o=>!o.active);return r.useEffect(()=>{if(!n)return;function o(h){p.current&&!p.current.contains(h.target)&&c()}function u(h){h.key==="Escape"&&c()}return document.addEventListener("mousedown",o),document.addEventListener("keydown",u),()=>{document.removeEventListener("mousedown",o),document.removeEventListener("keydown",u)}},[n,c]),e.jsxs("div",{className:"hb-switcher",ref:p,style:{position:"relative"},children:[e.jsx("button",{className:`hb-waffle-btn${n?" open":""}`,onClick:a,"aria-expanded":n,"aria-label":"App launcher",children:e.jsx(We,{})}),n&&e.jsxs("div",{className:"hb-waffle-panel",role:"menu",children:[e.jsx("div",{className:"hb-waffle-header",children:"Apps"}),e.jsx("div",{className:"hb-waffle-grid",children:i.map(o=>e.jsxs("a",{href:o.url,className:"hb-waffle-tile",onClick:c,role:"menuitem",children:[e.jsx("div",{className:`hb-waffle-tile-icon${o.id===s?" current":""}`,style:{background:o.color,color:o.color},children:e.jsx(Y,{icon:o.icon,color:o.color})}),e.jsx("span",{className:"hb-waffle-tile-name",children:o.name})]},o.id))}),l.length>0&&e.jsxs(e.Fragment,{children:[e.jsx("div",{className:"hb-waffle-sep"}),e.jsx("div",{className:"hb-waffle-section-label",children:"Available"}),e.jsx("div",{className:"hb-waffle-grid",children:l.map(o=>e.jsxs("a",{href:`${d}/products/${o.id}`,className:"hb-waffle-tile inactive",onClick:c,role:"menuitem",children:[e.jsx("div",{className:"hb-waffle-tile-icon",style:{background:o.color},children:e.jsx(Y,{icon:o.icon,color:o.color})}),e.jsx("span",{className:"hb-waffle-tile-name",children:o.name})]},o.id))})]}),e.jsx("a",{href:`${d}/products`,className:"hb-waffle-explore",onClick:c,children:"Explore all products →"})]})]})}function re(s,t,n,a=200){const[c,d]=r.useState([]),[p,i]=r.useState(!1),l=r.useRef(null);return r.useEffect(()=>{l.current&&clearTimeout(l.current);const o=n.trim();if(!o||!t){d([]),i(!1);return}i(!0);const u=new AbortController;return l.current=setTimeout(()=>{fetch(`${s}/api/bus/search?q=${encodeURIComponent(o)}&tenant_id=${encodeURIComponent(t)}`,{credentials:"include",signal:u.signal}).then(h=>h.ok?h.json():Promise.resolve({groups:[]})).then(h=>{d(h.groups??[]),i(!1)}).catch(h=>{h.name!=="AbortError"&&(d([]),i(!1))})},a),()=>{u.abort(),l.current&&clearTimeout(l.current)}},[s,t,n,a]),{results:c,loading:p}}function ie({apiBase:s,tenantId:t}){const[n,a]=r.useState(!1),[c,d]=r.useState(""),[p,i]=r.useState(-1),l=r.useRef(null),{results:o,loading:u}=re(s,t,c),h=o.flatMap(x=>x.results),v=r.useCallback(()=>{a(!0),d(""),i(-1),setTimeout(()=>{var x;return(x=l.current)==null?void 0:x.focus()},0)},[]),f=r.useCallback(()=>{a(!1),d(""),i(-1)},[]);r.useEffect(()=>{function x(b){(b.metaKey||b.ctrlKey)&&b.key==="k"&&(b.preventDefault(),n?f():v()),b.key==="Escape"&&n&&f()}return document.addEventListener("keydown",x),()=>document.removeEventListener("keydown",x)},[n,v,f]);function m(x){if(x.key==="ArrowDown")x.preventDefault(),i(b=>Math.min(b+1,h.length-1));else if(x.key==="ArrowUp")x.preventDefault(),i(b=>Math.max(b-1,-1));else if(x.key==="Enter"&&p>=0){const b=h[p];b&&(window.location.href=b.deepLink,f())}}const N=typeof navigator<"u"&&/Mac/i.test(navigator.platform);return e.jsxs(e.Fragment,{children:[e.jsx("div",{className:"hb-search-wrap",children:e.jsxs("button",{className:"hb-search-trigger",onClick:v,"aria-label":"Search (Cmd+K)",children:[e.jsx(J,{size:14}),e.jsx("span",{className:"hb-search-trigger-text",children:"Search everything..."}),e.jsxs("span",{className:"hb-kbd",children:[e.jsx("kbd",{children:N?"⌘":"Ctrl"}),e.jsx("kbd",{children:"K"})]})]})}),n&&e.jsx("div",{className:"hb-search-overlay",onMouseDown:x=>{x.target===x.currentTarget&&f()},role:"dialog","aria-label":"Search","aria-modal":"true",children:e.jsxs("div",{className:"hb-search-modal",children:[e.jsxs("div",{className:"hb-search-input-row",children:[e.jsx(J,{size:18,color:"#f97316"}),e.jsx("input",{ref:l,className:"hb-search-input",placeholder:"Search everything...",value:c,onChange:x=>{d(x.target.value),i(-1)},onKeyDown:m,autoComplete:"off",spellCheck:!1}),c&&e.jsx("button",{style:{background:"none",border:"none",cursor:"pointer",padding:0,color:"#64748b"},onClick:()=>d(""),"aria-label":"Clear",children:e.jsx(U,{size:16})})]}),e.jsx(Ge,{query:c,loading:u,results:o,focusedIndex:p,onNavigate:f})]})})]})}function Ge({query:s,loading:t,results:n,focusedIndex:a,onNavigate:c}){if(!s.trim())return e.jsxs("div",{className:"hb-search-empty",children:[e.jsx("div",{children:"Type to search across all products"}),e.jsx("div",{className:"hb-search-empty-hint",children:"Contacts, tickets, invoices, devices, and more"})]});if(t)return e.jsxs("div",{className:"hb-search-loading",children:[e.jsx("div",{className:"hb-spinner"}),"Searching..."]});if(!n.length)return e.jsxs("div",{className:"hb-search-empty",children:["No results for “",s,"”"]});let d=0;return e.jsx("div",{className:"hb-search-results",children:n.map(p=>e.jsxs("div",{children:[e.jsxs("div",{className:"hb-search-group-label",children:[p.productName," — ",p.results.length," result",p.results.length!==1?"s":""]}),p.results.map(i=>{const l=d++;return e.jsxs("a",{href:i.deepLink,className:`hb-search-item${a===l?" focused":""}`,onClick:c,children:[e.jsx("div",{className:"hb-search-item-icon",children:i.icon??i.title.slice(0,1).toUpperCase()}),e.jsxs("div",{className:"hb-search-item-body",children:[e.jsx("div",{className:"hb-search-item-title",children:i.title}),i.subtitle&&e.jsx("div",{className:"hb-search-item-sub",children:i.subtitle})]}),e.jsx("span",{className:"hb-source-badge",children:p.productName})]},i.id)})]},p.productId))})}function Ye(s){const t=Math.floor((Date.now()-new Date(s).getTime())/1e3);return t<60?"just now":t<3600?`${Math.floor(t/60)}m ago`:t<86400?`${Math.floor(t/3600)}h ago`:`${Math.floor(t/86400)}d ago`}function oe({notifications:s,unreadCount:t,open:n,onToggle:a,onClose:c,onMarkAllRead:d,onMarkRead:p,onDismiss:i,muted:l,onMute:o,onUnmute:u,hubUrl:h}){const v=r.useRef(null);return r.useEffect(()=>{if(!n)return;function f(m){v.current&&!v.current.contains(m.target)&&c()}return document.addEventListener("mousedown",f),()=>document.removeEventListener("mousedown",f)},[n,c]),e.jsxs("div",{className:"hb-notif",ref:v,children:[e.jsxs("button",{className:"hb-notif-btn",onClick:a,"aria-label":`Notifications${t>0?` (${t} unread)`:""}`,"aria-expanded":n,children:[e.jsx(ye,{size:18}),t>0&&e.jsx("span",{className:"hb-badge","aria-hidden":"true",children:t>99?"99+":t})]}),n&&e.jsxs("div",{className:"hb-notif-dropdown",role:"dialog","aria-label":"Notifications",children:[e.jsxs("div",{className:"hb-notif-header",children:[e.jsx("span",{className:"hb-notif-title",children:"Notifications"}),t>0&&e.jsx("button",{className:"hb-notif-mark-read",onClick:d,children:"Mark all read"})]}),e.jsx("div",{className:"hb-notif-list",role:"list",children:s.length===0?e.jsx("div",{className:"hb-notif-empty",children:"No notifications"}):s.slice(0,20).map(f=>e.jsxs("div",{className:`hb-notif-item${f.read?"":" unread"}`,role:"listitem",children:[e.jsxs("a",{href:f.deepLink,className:"hb-notif-item-link",onClick:()=>{p(f.id),c()},children:[e.jsx("span",{className:"hb-notif-icon",style:{background:D[f.severity]},"aria-hidden":"true"}),e.jsxs("div",{className:"hb-notif-body",children:[e.jsxs("div",{className:"hb-notif-body-title",children:[f.title,f.groupCount&&f.groupCount>1&&e.jsx("span",{className:"hb-notif-group-badge",children:f.groupCount})]}),f.body&&e.jsx("div",{className:"hb-notif-body-text",children:f.body}),e.jsxs("div",{className:"hb-notif-meta",children:[e.jsx("span",{className:"hb-source-badge",children:f.productName}),e.jsx("span",{className:"hb-notif-time",children:Ye(f.createdAt)})]})]})]}),e.jsx("button",{className:"hb-notif-dismiss",onClick:m=>{m.stopPropagation(),i(f.id)},"aria-label":"Dismiss notification",children:e.jsx(U,{size:14})})]},f.id))}),e.jsx("div",{className:"hb-notif-footer",children:e.jsxs("div",{className:"hb-notif-footer-row",children:[l?e.jsx("button",{className:"hb-notif-mute-btn",onClick:u,children:"Unmute notifications"}):e.jsxs("div",{className:"hb-notif-mute-group",children:[e.jsx("button",{className:"hb-notif-mute-btn",onClick:()=>o(3600*1e3),children:"Mute 1h"}),e.jsx("button",{className:"hb-notif-mute-btn",onClick:()=>{const f=new Date,m=new Date(f.getFullYear(),f.getMonth(),f.getDate()+1);o(m.getTime()-f.getTime())},children:"Mute today"})]}),e.jsxs("a",{href:`${h}/notifications/settings`,onClick:c,className:"hb-notif-settings-link",children:[e.jsx(ne,{size:14}),"Settings"]})]})})]})]})}function le({toasts:s,onDismiss:t}){return s.length===0?null:e.jsx("div",{className:"hb-toast-container",role:"status","aria-live":"polite",children:s.slice(0,3).map(n=>{const a=H.find(c=>c.id===n.productId);return e.jsxs("div",{className:"hb-toast",style:{borderLeftColor:D[n.severity]},children:[e.jsx("span",{className:"hb-toast-dot",style:{background:(a==null?void 0:a.color)||D[n.severity]}}),e.jsxs("div",{className:"hb-toast-body",children:[e.jsx("div",{className:"hb-toast-title",children:n.title}),n.body&&e.jsx("div",{className:"hb-toast-text",children:n.body}),n.deepLink&&e.jsx("a",{href:n.deepLink,className:"hb-toast-link",children:"View"})]}),e.jsx("button",{className:"hb-toast-close",onClick:()=>t(n.id),"aria-label":"Dismiss",children:e.jsx(U,{size:14})})]},n.id)})})}function ce({session:s,open:t,onToggle:n,onClose:a,onLogout:c,hubUrl:d}){const p=r.useRef(null);r.useEffect(()=>{if(!t)return;function l(o){p.current&&!p.current.contains(o.target)&&a()}return document.addEventListener("mousedown",l),()=>document.removeEventListener("mousedown",l)},[t,a]);function i(){a(),c?c():window.location.href=`${d}/logout`}return e.jsxs("div",{className:"hb-user",ref:p,children:[e.jsxs("button",{className:"hb-user-btn",onClick:n,"aria-expanded":t,"aria-label":"User menu",children:[e.jsx("div",{className:"hb-avatar",children:s.initials}),e.jsx("span",{className:"hb-user-name",children:s.firstName??s.email.split("@")[0]}),e.jsx("svg",{width:"12",height:"12",viewBox:"0 0 24 24",fill:"none",stroke:"currentColor",strokeWidth:"2",strokeLinecap:"round",strokeLinejoin:"round",style:{opacity:.5},children:e.jsx("path",{d:"m6 9 6 6 6-6"})})]}),t&&e.jsxs("div",{className:"hb-user-dropdown",role:"menu",children:[e.jsxs("div",{className:"hb-user-info",children:[e.jsx("div",{style:{fontWeight:600,fontSize:13,color:"#f1f5f9"},children:s.firstName&&s.lastName?`${s.firstName} ${s.lastName}`:s.email.split("@")[0]}),e.jsx("div",{className:"hb-user-email",children:s.email}),s.tenantName&&e.jsx("div",{className:"hb-user-tenant",children:s.tenantName})]}),e.jsxs("a",{href:`${d}/profile`,className:"hb-menu-item",onClick:a,role:"menuitem",children:[e.jsx(ke,{size:14}),"Profile"]}),e.jsxs("a",{href:`${d}/settings`,className:"hb-menu-item",onClick:a,role:"menuitem",children:[e.jsx(ne,{size:14}),"Hub Settings"]}),e.jsx("div",{className:"hb-menu-sep"}),e.jsxs("a",{href:`${d}/switch-tenant`,className:"hb-menu-item",onClick:a,role:"menuitem",children:[e.jsx(we,{size:14}),"Switch Tenant"]}),e.jsx("div",{className:"hb-menu-sep"}),e.jsxs("button",{className:"hb-menu-item danger",onClick:i,role:"menuitem",children:[e.jsx(je,{size:14}),"Log Out"]})]})]})}class Qe{constructor(t){this.baseUrl=t.apiBaseUrl.replace(/\/$/,""),this.apiKey=t.apiKey,this.platformId=t.platformId}async request(t,n={}){const a=`${this.baseUrl}${t}`,c=await fetch(a,{...n,headers:{"Content-Type":"application/json","X-Api-Key":this.apiKey,...n.headers}});if(!c.ok){const d=await c.text().catch(()=>"");throw new Error(`Ops Center API error ${c.status}: ${d}`)}if(c.status!==204)return c.json()}async createTicket(t){return this.request("/api/tickets",{method:"POST",body:JSON.stringify({...t,platform:this.platformId})})}async listTickets(t={}){const n=new URLSearchParams({platform:this.platformId});return t.reporter_email&&n.set("reporter_email",t.reporter_email),t.status&&n.set("status",t.status),t.ticket_type&&n.set("ticket_type",t.ticket_type),t.page&&n.set("page",String(t.page)),t.page_size&&n.set("page_size",String(t.page_size)),this.request(`/api/tickets?${n}`)}async getTicket(t){return this.request(`/api/tickets/${t}`)}async getTicketActivity(t){return this.request(`/api/tickets/${t}/activity`)}async addComment(t,n){return this.request(`/api/tickets/${t}/comment`,{method:"POST",body:JSON.stringify(n)})}async voteOnTicket(t,n){return this.request(`/api/tickets/${t}/vote`,{method:"POST",body:JSON.stringify(n)})}async removeVote(t){return this.request(`/api/tickets/${t}/vote`,{method:"DELETE"})}async getPublicReleases(){const t=await fetch(`${this.baseUrl}/api/releases-public/${this.platformId}`);if(!t.ok)throw new Error(`Failed to fetch releases: ${t.status}`);return t.json()}async getFeatures(){return this.request(`/api/features?platform=${this.platformId}&status=proposed,planned,in_progress,shipped`)}async getKBCategories(){const t=await fetch(`${this.baseUrl}/api/kb-public/${this.platformId}/categories`);if(!t.ok)throw new Error(`Failed to fetch KB categories: ${t.status}`);return t.json()}async getKBArticles(t){const n=t?`?category=${encodeURIComponent(t)}`:"",a=await fetch(`${this.baseUrl}/api/kb-public/${this.platformId}/articles${n}`);if(!a.ok)throw new Error(`Failed to fetch KB articles: ${a.status}`);return a.json()}async getKBArticle(t){const n=await fetch(`${this.baseUrl}/api/kb-public/${this.platformId}/articles/${t}`);if(!n.ok)throw new Error(`Failed to fetch KB article: ${n.status}`);return n.json()}async searchKB(t){const n=await fetch(`${this.baseUrl}/api/kb-public/${this.platformId}/search?q=${encodeURIComponent(t)}`);if(!n.ok)throw new Error(`Failed to search KB: ${n.status}`);return n.json()}async startChat(t,n,a){return this.request("/api/chat/sessions",{method:"POST",body:JSON.stringify({message:t,user_name:n,user_email:a,platform:this.platformId})})}async sendChatMessage(t,n){return this.request(`/api/chat/sessions/${t}/messages`,{method:"POST",body:JSON.stringify({message:n})})}async getChatSession(t){return this.request(`/api/chat/sessions/${t}`)}async listChatSessions(t){return this.request(`/api/chat/sessions?email=${encodeURIComponent(t)}`)}async endChat(t,n,a){return this.request(`/api/chat/sessions/${t}/end`,{method:"POST",body:JSON.stringify({rating:n,feedback:a})})}async escalateChat(t){return this.request(`/api/chat/sessions/${t}/escalate`,{method:"POST",body:JSON.stringify({})})}async sendCobrowseEvents(t,n,a){return this.request(`/api/chat/sessions/${t}/cobrowse`,{method:"POST",body:JSON.stringify({events:n,sequence:a})})}}const de=r.createContext(null);function $(){const s=r.useContext(de);if(!s)throw new Error("useSupportContext must be used within <SupportProvider>");return s}function Xe({config:s,user:t,children:n}){const a=r.useMemo(()=>new Qe(s),[s]),c=r.useMemo(()=>({client:a,config:s,user:t}),[a,s,t]);return e.jsx(de.Provider,{value:c,children:n})}function Ze(s){const{client:t,user:n}=$(),[a,c]=r.useState([]),[d,p]=r.useState(!0),[i,l]=r.useState(null),o=r.useCallback(async()=>{p(!0),l(null);try{const u=await t.listTickets({reporter_email:n.email,status:s==null?void 0:s.status,ticket_type:s==null?void 0:s.ticket_type});c(u)}catch(u){l(u instanceof Error?u.message:"Failed to load tickets")}finally{p(!1)}},[t,n.email,s==null?void 0:s.status,s==null?void 0:s.ticket_type]);return r.useEffect(()=>{o()},[o]),{tickets:a,loading:d,error:i,refresh:o}}function et(s){const{client:t}=$(),[n,a]=r.useState(null),[c,d]=r.useState([]),[p,i]=r.useState(!0),[l,o]=r.useState(null),u=r.useCallback(async()=>{if(s){i(!0),o(null);try{const[h,v]=await Promise.all([t.getTicket(s),t.getTicketActivity(s)]);a(h),d(v)}catch(h){o(h instanceof Error?h.message:"Failed to load ticket")}finally{i(!1)}}},[t,s]);return r.useEffect(()=>{u()},[u]),{ticket:n,activity:c,loading:p,error:l,refresh:u}}function tt(){const{client:s,user:t}=$(),[n,a]=r.useState(!1),[c,d]=r.useState(null);return{createTicket:r.useCallback(async i=>{a(!0),d(null);try{return await s.createTicket({...i,reporter_email:t.email,reporter_name:t.name})}catch(l){return d(l instanceof Error?l.message:"Failed to create ticket"),null}finally{a(!1)}},[s,t]),submitting:n,error:c}}function st(){const{client:s,user:t}=$(),[n,a]=r.useState(!1),[c,d]=r.useState(null);return{addComment:r.useCallback(async(i,l)=>{a(!0),d(null);try{return await s.addComment(i,{content:l,actor_email:t.email,actor_name:t.name}),!0}catch(o){return d(o instanceof Error?o.message:"Failed to add comment"),!1}finally{a(!1)}},[s,t]),submitting:n,error:c}}function nt(){const{client:s}=$(),[t,n]=r.useState([]),[a,c]=r.useState(!0),[d,p]=r.useState(null),i=r.useCallback(async()=>{c(!0),p(null);try{const l=await s.getPublicReleases();n(l)}catch(l){p(l instanceof Error?l.message:"Failed to load release notes")}finally{c(!1)}},[s]);return r.useEffect(()=>{i()},[i]),{releases:t,loading:a,error:d,refresh:i}}function at(){const{client:s}=$(),[t,n]=r.useState([]),[a,c]=r.useState(!0),[d,p]=r.useState(null),i=r.useCallback(async()=>{c(!0),p(null);try{const l=await s.getFeatures();n(l)}catch(l){p(l instanceof Error?l.message:"Failed to load features")}finally{c(!1)}},[s]);return r.useEffect(()=>{i()},[i]),{features:t,loading:a,error:d,refresh:i}}function rt(){const{client:s,user:t}=$(),[n,a]=r.useState(null),[c,d]=r.useState(null),p=r.useCallback(async l=>{a(l),d(null);try{return await s.voteOnTicket(l,{user_email:t.email,user_name:t.name}),!0}catch(o){return d(o instanceof Error?o.message:"Failed to vote"),!1}finally{a(null)}},[s,t]),i=r.useCallback(async l=>{a(l),d(null);try{return await s.removeVote(l),!0}catch(o){return d(o instanceof Error?o.message:"Failed to remove vote"),!1}finally{a(null)}},[s]);return{vote:p,removeVote:i,voting:n,error:c}}function it(){const{client:s}=$(),[t,n]=r.useState([]),[a,c]=r.useState(!0),[d,p]=r.useState(null),i=r.useCallback(async()=>{c(!0),p(null);try{const l=await s.getKBCategories();n(l)}catch(l){p(l instanceof Error?l.message:"Failed to load categories")}finally{c(!1)}},[s]);return r.useEffect(()=>{i()},[i]),{categories:t,loading:a,error:d,refresh:i}}function ot(s){const{client:t}=$(),[n,a]=r.useState([]),[c,d]=r.useState(!0),[p,i]=r.useState(null),l=r.useCallback(async()=>{d(!0),i(null);try{const o=await t.getKBArticles(s);a(o)}catch(o){i(o instanceof Error?o.message:"Failed to load articles")}finally{d(!1)}},[t,s]);return r.useEffect(()=>{l()},[l]),{articles:n,loading:c,error:p,refresh:l}}function lt(s){const{client:t}=$(),[n,a]=r.useState(null),[c,d]=r.useState(!0),[p,i]=r.useState(null),l=r.useCallback(async()=>{if(s){d(!0),i(null);try{const o=await t.getKBArticle(s);a(o)}catch(o){i(o instanceof Error?o.message:"Failed to load article")}finally{d(!1)}}},[t,s]);return r.useEffect(()=>{l()},[l]),{article:n,loading:c,error:p,refresh:l}}function ct(){const{client:s}=$(),[t,n]=r.useState([]),[a,c]=r.useState(!1),[d,p]=r.useState(null),i=r.useCallback(async l=>{if(!l.trim()){n([]);return}c(!0),p(null);try{const o=await s.searchKB(l);n(o)}catch(o){p(o instanceof Error?o.message:"Failed to search")}finally{c(!1)}},[s]);return{results:t,loading:a,error:d,search:i}}const dt={hub:"Support",submit:"Submit a Ticket",tickets:"My Tickets",ticket:"Ticket",changelog:"What's New",features:"Feature Requests",kb:"Knowledge Base","kb-article":"Article",chat:"Chat"},pt=[{id:"bug",label:"Report a Bug",desc:"Something not working? We'll fix it.",type:"bug_report"},{id:"feature",label:"Request a Feature",desc:"Have an idea? We want to hear it.",type:"feature_request"},{id:"help",label:"Get Help",desc:"Need assistance with something?",type:"service_request"}];function ht({onNav:s}){const{config:t}=$();return e.jsxs("div",{className:"hb-sp-hub",children:[e.jsxs("div",{className:"hb-sp-hub-header",children:[e.jsx("div",{className:"hb-sp-hub-title",children:"How can we help?"}),e.jsxs("div",{className:"hb-sp-hub-sub",children:["Get support for ",t.platformName,"."]})]}),e.jsx("div",{className:"hb-sp-hub-grid",children:pt.map(n=>e.jsxs("button",{className:"hb-sp-card",onClick:()=>s({id:"submit",ticketType:n.type}),children:[e.jsx("div",{className:"hb-sp-card-label",children:n.label}),e.jsx("div",{className:"hb-sp-card-desc",children:n.desc})]},n.id))}),e.jsxs("div",{className:"hb-sp-hub-links",children:[e.jsxs("button",{className:"hb-sp-link-item",onClick:()=>s({id:"tickets"}),children:[e.jsx("span",{children:"My Tickets"}),e.jsx("span",{className:"hb-sp-chevron",children:"›"})]}),e.jsxs("button",{className:"hb-sp-link-item",onClick:()=>s({id:"kb"}),children:[e.jsx("span",{children:"Knowledge Base"}),e.jsx("span",{className:"hb-sp-chevron",children:"›"})]}),e.jsxs("button",{className:"hb-sp-link-item",onClick:()=>s({id:"changelog"}),children:[e.jsx("span",{children:"What's New"}),e.jsx("span",{className:"hb-sp-chevron",children:"›"})]}),e.jsxs("button",{className:"hb-sp-link-item",onClick:()=>s({id:"features"}),children:[e.jsx("span",{children:"Feature Requests"}),e.jsx("span",{className:"hb-sp-chevron",children:"›"})]})]})]})}const bt=[{value:"bug_report",label:"Bug Report"},{value:"feature_request",label:"Feature Request"},{value:"service_request",label:"Service Request"}],ut=[{value:"low",label:"Low"},{value:"medium",label:"Medium"},{value:"high",label:"High"},{value:"critical",label:"Critical"}],ft=[{value:"cosmetic",label:"Cosmetic"},{value:"minor",label:"Minor"},{value:"major",label:"Major"},{value:"blocker",label:"Blocker"}];function mt({initialType:s,onNav:t}){const[n,a]=r.useState(s||"bug_report"),[c,d]=r.useState(""),[p,i]=r.useState(""),[l,o]=r.useState("medium"),[u,h]=r.useState("minor"),{createTicket:v,submitting:f,error:m}=tt(),[N,x]=r.useState(null);return N?e.jsxs("div",{className:"hb-sp-success",children:[e.jsx("div",{className:"hb-sp-success-icon",children:"✓"}),e.jsx("div",{className:"hb-sp-success-title",children:"Ticket Submitted"}),e.jsx("div",{className:"hb-sp-success-num",children:N}),e.jsxs("div",{className:"hb-sp-success-actions",children:[e.jsx("button",{className:"hb-sp-btn hb-sp-btn-secondary",onClick:()=>t({id:"tickets"}),children:"View My Tickets"}),e.jsx("button",{className:"hb-sp-btn hb-sp-btn-ghost",onClick:()=>t({id:"hub"}),children:"Back to Support"})]})]}):e.jsxs("div",{className:"hb-sp-form-page",children:[e.jsxs("div",{className:"hb-sp-field",children:[e.jsx("label",{className:"hb-sp-label",children:"Type"}),e.jsx("div",{className:"hb-sp-type-row",children:bt.map(b=>e.jsx("button",{type:"button",className:`hb-sp-type-btn${n===b.value?" active":""}`,onClick:()=>a(b.value),children:b.label},b.value))})]}),e.jsxs("div",{className:"hb-sp-field",children:[e.jsx("label",{className:"hb-sp-label",htmlFor:"sp-title",children:"Title"}),e.jsx("input",{id:"sp-title",className:"hb-sp-input",value:c,onChange:b=>d(b.target.value),placeholder:"Brief description...",maxLength:200}),e.jsxs("div",{className:"hb-sp-char-count",children:[c.length,"/200"]})]}),e.jsxs("div",{className:"hb-sp-field",children:[e.jsx("label",{className:"hb-sp-label",htmlFor:"sp-desc",children:"Description"}),e.jsx("textarea",{id:"sp-desc",className:"hb-sp-textarea",value:p,onChange:b=>i(b.target.value),placeholder:"Provide as much detail as possible...",rows:6,maxLength:5e3}),e.jsxs("div",{className:"hb-sp-char-count",children:[p.length,"/5000"]})]}),e.jsxs("div",{className:"hb-sp-field",children:[e.jsx("label",{className:"hb-sp-label",children:"Priority"}),e.jsx("div",{className:"hb-sp-chip-row",children:ut.map(b=>e.jsx("button",{type:"button",className:`hb-sp-chip${l===b.value?" active":""}`,onClick:()=>o(b.value),children:b.label},b.value))})]}),n==="bug_report"&&e.jsxs("div",{className:"hb-sp-field",children:[e.jsx("label",{className:"hb-sp-label",children:"Severity"}),e.jsx("div",{className:"hb-sp-chip-row",children:ft.map(b=>e.jsx("button",{type:"button",className:`hb-sp-chip${u===b.value?" active":""}`,onClick:()=>h(b.value),children:b.label},b.value))})]}),m&&e.jsx("div",{className:"hb-sp-error",children:m}),e.jsx("button",{className:"hb-sp-btn hb-sp-btn-primary",disabled:f||!c.trim()||!p.trim(),onClick:async()=>{const b=await v({ticket_type:n,title:c.trim(),description:p.trim(),priority:l,severity:n==="bug_report"?u:void 0});b&&x(b.ticket_number)},children:f?"Submitting…":"Submit Ticket"})]})}const pe={new:"New",triaged:"Triaged",in_progress:"In Progress",waiting_reporter:"Waiting on You",waiting_external:"Waiting",on_hold:"On Hold",resolved:"Resolved",closed:"Closed",cancelled:"Cancelled"};function xt({onNav:s}){const[t,n]=r.useState(""),{tickets:a,loading:c,error:d}=Ze({status:t||void 0});return e.jsxs("div",{className:"hb-sp-list-page",children:[e.jsxs("div",{className:"hb-sp-filter-row",children:[[["","All"],["new,triaged,in_progress,waiting_reporter,waiting_external,on_hold","Open"],["resolved,closed","Closed"]].map(([p,i])=>e.jsx("button",{className:`hb-sp-filter-btn${t===p?" active":""}`,onClick:()=>n(p),children:i},p)),e.jsx("button",{className:"hb-sp-filter-btn hb-sp-filter-btn-new",onClick:()=>s({id:"submit"}),children:"+ New"})]}),c?e.jsx("div",{className:"hb-sp-list",children:[0,1,2].map(p=>e.jsx("div",{className:"hb-sp-skeleton"},p))}):d?e.jsx("div",{className:"hb-sp-error",children:d}):a.length===0?e.jsxs("div",{className:"hb-sp-empty",children:[e.jsx("div",{className:"hb-sp-empty-text",children:"No tickets found"}),e.jsx("button",{className:"hb-sp-btn hb-sp-btn-secondary",onClick:()=>s({id:"submit"}),children:"Submit a Ticket"})]}):e.jsx("div",{className:"hb-sp-list",children:a.map(p=>e.jsxs("button",{className:"hb-sp-list-item",onClick:()=>s({id:"ticket",ticketId:p.id}),children:[e.jsxs("div",{className:"hb-sp-ticket-top",children:[e.jsx("span",{className:"hb-sp-ticket-num",children:p.ticket_number}),e.jsx("span",{className:"hb-sp-badge",children:pe[p.status]??p.status})]}),e.jsx("div",{className:"hb-sp-ticket-title",children:p.title}),e.jsx("div",{className:"hb-sp-ticket-meta",children:new Date(p.created_at).toLocaleDateString(void 0,{month:"short",day:"numeric",year:"numeric"})})]},p.id))})]})}function gt({ticketId:s}){const{ticket:t,activity:n,loading:a,error:c}=et(s),{addComment:d,submitting:p}=st(),[i,l]=r.useState("");return a?e.jsx("div",{className:"hb-sp-loading",children:"Loading ticket…"}):c||!t?e.jsx("div",{className:"hb-sp-error",children:c??"Ticket not found"}):e.jsxs("div",{className:"hb-sp-detail-page",children:[e.jsxs("div",{className:"hb-sp-detail-header",children:[e.jsx("span",{className:"hb-sp-ticket-num",children:t.ticket_number}),e.jsx("span",{className:"hb-sp-badge",children:pe[t.status]??t.status})]}),e.jsx("div",{className:"hb-sp-detail-title",children:t.title}),e.jsx("div",{className:"hb-sp-detail-desc",children:t.description}),n.length>0&&e.jsxs("div",{className:"hb-sp-activity",children:[e.jsx("div",{className:"hb-sp-activity-title",children:"Activity"}),n.filter(o=>!o.is_internal).map(o=>e.jsxs("div",{className:"hb-sp-activity-item",children:[e.jsx("div",{className:"hb-sp-activity-actor",children:o.actor_name}),o.content&&e.jsx("div",{className:"hb-sp-activity-content",children:o.content}),e.jsx("div",{className:"hb-sp-activity-time",children:new Date(o.created_at).toLocaleString()})]},o.id))]}),e.jsxs("div",{className:"hb-sp-reply",children:[e.jsx("textarea",{className:"hb-sp-textarea",rows:3,placeholder:"Add a comment…",value:i,onChange:o=>l(o.target.value)}),e.jsx("button",{className:"hb-sp-btn hb-sp-btn-primary",disabled:p||!i.trim(),onClick:async()=>{await d(t.id,i.trim())&&l("")},children:p?"Sending…":"Send"})]})]})}function vt(){const{releases:s,loading:t,error:n}=nt();return t?e.jsx("div",{className:"hb-sp-loading",children:"Loading releases…"}):n?e.jsx("div",{className:"hb-sp-error",children:n}):s.length===0?e.jsx("div",{className:"hb-sp-empty",children:e.jsx("div",{className:"hb-sp-empty-text",children:"No releases yet."})}):e.jsx("div",{className:"hb-sp-list-page",children:s.map((a,c)=>e.jsxs("div",{className:"hb-sp-release",children:[e.jsxs("div",{className:"hb-sp-release-header",children:[e.jsxs("span",{className:"hb-sp-release-ver",children:["v",a.version]}),e.jsx("span",{className:"hb-sp-release-date",children:new Date(a.released_date).toLocaleDateString(void 0,{month:"short",day:"numeric",year:"numeric"})})]}),e.jsx("div",{className:"hb-sp-release-title",children:a.title}),e.jsx("div",{className:"hb-sp-release-notes",children:a.release_notes})]},c))})}const yt={proposed:"Proposed",planned:"Planned",in_progress:"In Progress",shipped:"Shipped",cancelled:"Cancelled"};function kt(){const{features:s,loading:t,error:n}=at(),{vote:a,voting:c}=rt(),[d,p]=r.useState(new Set);return t?e.jsx("div",{className:"hb-sp-loading",children:"Loading features…"}):n?e.jsx("div",{className:"hb-sp-error",children:n}):s.length===0?e.jsx("div",{className:"hb-sp-empty",children:e.jsx("div",{className:"hb-sp-empty-text",children:"No feature requests yet."})}):e.jsx("div",{className:"hb-sp-list-page",children:s.map(i=>{var l;return e.jsxs("div",{className:"hb-sp-feature-item",children:[e.jsxs("div",{className:"hb-sp-feature-body",children:[e.jsx("div",{className:"hb-sp-feature-title",children:i.title}),e.jsx("div",{className:"hb-sp-feature-desc",children:i.description}),e.jsx("span",{className:"hb-sp-badge",children:yt[i.status]??i.status})]}),e.jsxs("button",{className:`hb-sp-vote-btn${d.has(i.id)?" voted":""}`,disabled:c===i.id,onClick:async()=>{await a(i.id)&&p(u=>new Set([...u,i.id]))},children:["▲ ",((l=i.tags)==null?void 0:l.length)??0]})]},i.id)})})}function jt({onNav:s,category:t}){const{categories:n,loading:a}=it(),{articles:c,loading:d}=ot(t),{search:p,results:i,loading:l}=ct(),[o,u]=r.useState(""),h=r.useRef(null),v=m=>{u(m),h.current&&clearTimeout(h.current),h.current=setTimeout(()=>p(m),300)},f=o.trim().length>0;return e.jsxs("div",{className:"hb-sp-list-page",children:[e.jsx("div",{className:"hb-sp-search-row",children:e.jsx("input",{className:"hb-sp-input",placeholder:"Search knowledge base…",value:o,onChange:m=>v(m.target.value)})}),f?l?e.jsx("div",{className:"hb-sp-loading",children:"Searching…"}):i.length===0?e.jsx("div",{className:"hb-sp-empty",children:e.jsxs("div",{className:"hb-sp-empty-text",children:['No results for "',o,'"']})}):e.jsx("div",{className:"hb-sp-list",children:i.map(m=>e.jsxs("button",{className:"hb-sp-list-item",onClick:()=>s({id:"kb-article",slug:m.slug}),children:[e.jsx("div",{className:"hb-sp-ticket-title",children:m.title}),m.excerpt&&e.jsx("div",{className:"hb-sp-ticket-meta",children:m.excerpt})]},m.id))}):e.jsxs(e.Fragment,{children:[!t&&!a&&n.length>0&&e.jsx("div",{className:"hb-sp-kb-cats",children:n.map(m=>e.jsxs("button",{className:"hb-sp-kb-cat",onClick:()=>s({id:"kb",category:m.slug}),children:[e.jsx("span",{children:m.name}),e.jsx("span",{className:"hb-sp-kb-cat-count",children:m.article_count})]},m.id))}),d?e.jsx("div",{className:"hb-sp-loading",children:"Loading…"}):c.length===0?e.jsx("div",{className:"hb-sp-empty",children:e.jsx("div",{className:"hb-sp-empty-text",children:"No articles in this category."})}):e.jsx("div",{className:"hb-sp-list",children:c.map(m=>e.jsxs("button",{className:"hb-sp-list-item",onClick:()=>s({id:"kb-article",slug:m.slug}),children:[e.jsx("div",{className:"hb-sp-ticket-title",children:m.title}),m.excerpt&&e.jsx("div",{className:"hb-sp-ticket-meta",children:m.excerpt})]},m.id))})]})]})}function wt({slug:s}){const{article:t,loading:n,error:a}=lt(s);return n?e.jsx("div",{className:"hb-sp-loading",children:"Loading article…"}):a||!t?e.jsx("div",{className:"hb-sp-error",children:a??"Article not found"}):e.jsxs("div",{className:"hb-sp-detail-page",children:[e.jsx("div",{className:"hb-sp-detail-title",children:t.title}),e.jsx("div",{className:"hb-sp-article-content",dangerouslySetInnerHTML:{__html:t.content}})]})}function Nt({page:s,onNav:t}){return s.id==="hub"?e.jsx(ht,{onNav:t}):s.id==="submit"?e.jsx(mt,{initialType:s.ticketType,onNav:t}):s.id==="tickets"?e.jsx(xt,{onNav:t}):s.id==="ticket"?e.jsx(gt,{ticketId:s.ticketId}):s.id==="changelog"?e.jsx(vt,{}):s.id==="features"?e.jsx(kt,{}):s.id==="kb"?e.jsx(jt,{onNav:t,category:s.category}):s.id==="kb-article"?e.jsx(wt,{slug:s.slug}):s.id==="chat"?e.jsx("div",{className:"hb-sp-empty",children:e.jsx("div",{className:"hb-sp-empty-text",children:"Live chat coming soon."})}):null}function he({config:s,user:t}){const[n,a]=r.useState(!1),[c,d]=r.useState({id:"hub"}),[p,i]=r.useState([]),l=r.useRef(null),o=r.useCallback(N=>{i(x=>[...x,c]),d(N),l.current&&(l.current.scrollTop=0)},[c]),u=r.useCallback(()=>{i(N=>{const x=[...N],b=x.pop();return b&&d(b),x}),l.current&&(l.current.scrollTop=0)},[]),h=r.useCallback(()=>{a(!1),setTimeout(()=>{d({id:"hub"}),i([])},200)},[]);r.useEffect(()=>{if(!n)return;const N=x=>{x.key==="Escape"&&h()};return document.addEventListener("keydown",N),()=>document.removeEventListener("keydown",N)},[n,h]);const v=p.length>0,f=dt[c.id]??"Support",m=n?X.createPortal(e.jsx("div",{className:"hb-sp-overlay",onClick:h,"aria-hidden":"true",children:e.jsxs("div",{className:`hb-sp-panel${n?" open":""}`,onClick:N=>N.stopPropagation(),role:"dialog","aria-modal":"true","aria-label":"Support",children:[e.jsxs("div",{className:"hb-sp-header",children:[v?e.jsx("button",{className:"hb-sp-back-btn",onClick:u,"aria-label":"Go back",children:"‹ Back"}):e.jsx("div",{className:"hb-sp-header-title",children:f}),v&&e.jsx("div",{className:"hb-sp-header-title",children:f}),e.jsx("button",{className:"hb-sp-close-btn",onClick:h,"aria-label":"Close support panel",children:e.jsx(U,{size:16})})]}),e.jsx("div",{className:"hb-sp-content",ref:l,children:e.jsx(Xe,{config:s,user:t,children:e.jsx(Nt,{page:c,onNav:o})})})]})}),document.body):null;return e.jsxs(e.Fragment,{children:[e.jsx("button",{className:`hb-chat-btn${n?" open":""}`,title:"Support","aria-label":"Open support panel","aria-expanded":n,onClick:()=>a(N=>!N),children:e.jsx(Se,{size:18})}),m]})}const St={"theonepsa.com":"psa","theonecrm.app":"crm","theonermm.app":"rmm","theonesecurity.app":"security","theonebackups.app":"backups","theoneprojects.app":"projects","theonebooks.app":"books","theonevoice.app":"voice","theonestudio.app":"ai-studio","theonelivekit.app":"livekit","theonemission.app":"mission","theoneams.com":"ams","theonefleet.app":"fleet","theonepeople.app":"people","theonecmdb.app":"cmdb","theoneoncall.app":"oncall","theonevisitor.app":"visitor","theonelegal.app":"legal","mspcollective.io":"collective","theoneportal.app":"portal","theonebridge.app":"bridge","theonecanvas.app":"canvas","theonemigrate.app":"migrate","theonebrand.app":"brand","theoneops.app":"ops-center","theonestack.com":"hub"};function Ct(s){for(const[t,n]of Object.entries(St))if(s.includes(t))return n;return null}const zt=[[/\/tickets?\/([\w-]+)/,"ticket"],[/\/companies?\/([\w-]+)/,"company"],[/\/contacts?\/([\w-]+)/,"contact"],[/\/devices?\/([\w-]+)/,"device"],[/\/invoices?\/([\w-]+)/,"invoice"],[/\/opportunities?\/([\w-]+)/,"opportunity"],[/\/projects?\/([\w-]+)/,"project"],[/\/incidents?\/([\w-]+)/,"incident"],[/\/contracts?\/([\w-]+)/,"contract"],[/\/employees?\/([\w-]+)/,"employee"],[/\/configurations?\/([\w-]+)/,"configuration_item"],[/\/alerts?\/([\w-]+)/,"alert"],[/\/calls?\/([\w-]+)/,"call"],[/\/recordings?\/([\w-]+)/,"call"],[/\/recaps?\/([\w-]+)/,"call"]];function Mt(s){for(const[t,n]of zt){const a=s.match(t);if(a!=null&&a[1]&&a[1]!=="new"&&a[1]!=="list")return{entity_type:n,entity_id:a[1]}}return{}}function K(){const s=Ct(window.location.hostname),{entity_type:t,entity_id:n}=Mt(window.location.pathname);return{product:s,page:window.location.pathname,entity_type:t,entity_id:n}}const B={ticket:[{label:"Summarize this ticket",prompt:"Summarize this ticket including its history and current status."},{label:"Find similar tickets",prompt:"Search for similar tickets that might be related to this one."},{label:"Draft a response",prompt:"Draft a professional response to the client for this ticket."},{label:"Check SLA status",prompt:"What is the SLA status for this ticket? Is it at risk of breaching?"}],company:[{label:"Full company picture",prompt:"Give me a complete picture of this company — tickets, revenue, devices, security posture."},{label:"Open tickets",prompt:"What are the open tickets for this company?"},{label:"Revenue summary",prompt:"Show me the revenue summary for this company."},{label:"Device health",prompt:"What is the device health status for this company?"}],device:[{label:"What's wrong?",prompt:"What's wrong with this device? Show me recent alerts and issues."},{label:"Recent alerts",prompt:"Show me the recent alerts for this device."},{label:"Similar issues",prompt:"Are there similar issues on other devices?"}],invoice:[{label:"Payment status",prompt:"What is the payment status of this invoice?"},{label:"Customer history",prompt:"Show me the payment history for this customer."}],call:[{label:"Call summary",prompt:"Summarize this call — what was discussed, sentiment, and any action items."},{label:"Extract action items",prompt:"Extract all action items from this call and suggest ticket creation for each."},{label:"Full transcript",prompt:"Show me the full transcript of this call."},{label:"Follow up",prompt:"Draft a follow-up message to the caller based on this call."}],contact:[{label:"Text this contact",prompt:"Help me draft and send an SMS to this contact."},{label:"Call this contact",prompt:"Connect me to this contact via phone."},{label:"Communication history",prompt:"Show me all recent calls and messages with this contact."},{label:"Email this contact",prompt:"Help me draft and send an email to this contact."}],dashboard:[{label:"What needs attention?",prompt:"What needs my attention today? Show me critical items across all products."},{label:"Show overdue items",prompt:"What items are overdue — tickets, invoices, tasks?"},{label:"SLA alerts",prompt:"Are there any SLA alerts or at-risk tickets right now?"},{label:"Revenue this month",prompt:"What's our revenue looking like this month?"}]};function _t(s){return s.entity_type&&B[s.entity_type]?B[s.entity_type]:s.page==="/"||s.page.includes("dashboard")?B.dashboard:[{label:"What needs attention?",prompt:"What needs my attention today?"},{label:"Search tickets",prompt:"Search for recent open tickets."},{label:"Company health",prompt:"Show me a summary of company health scores."}]}const q="jarvis_messages",be=50;function Tt(){try{const s=sessionStorage.getItem(q);return s?JSON.parse(s).slice(-be):[]}catch{return[]}}function Et(s){try{sessionStorage.setItem(q,JSON.stringify(s.slice(-be)))}catch{sessionStorage.removeItem(q)}}let Lt=0;function Q(){return`jm_${Date.now()}_${++Lt}`}function ue(s,t,n){const[a,c]=r.useState(Tt),[d,p]=r.useState(!1),[i,l]=r.useState(K),[o,u]=r.useState([]),h=r.useRef(null),v=r.useRef("");r.useEffect(()=>{const x=()=>{const T=K();l(T),u(_t(T))};x(),window.addEventListener("popstate",x);const b=new MutationObserver(()=>{K().page!==i.page&&x()});return b.observe(document.querySelector("title")||document.head,{childList:!0,subtree:!0}),()=>{window.removeEventListener("popstate",x),b.disconnect()}},[i.page]),r.useEffect(()=>{Et(a)},[a]);const f=r.useCallback(async x=>{if(!x.trim()||d||!t)return;const b={id:Q(),role:"user",content:x.trim(),timestamp:new Date().toISOString()},T={id:Q(),role:"assistant",content:"",tool_calls:[],timestamp:new Date().toISOString()};c(j=>[...j,b,T]),p(!0),v.current="";const w=new AbortController;h.current=w;try{const g={model:"gpt-4.1-mini",messages:[...a.slice(-18),b].map(R=>({role:R.role,content:R.content})),stream:!0,context:{product:i.product,entity_type:i.entity_type,entity_id:i.entity_id,page_url:window.location.href}},S=await fetch(`${s}/api/ai/chat`,{method:"POST",headers:{"Content-Type":"application/json","x-tenant-id":t,"x-ai-tier":"jarvis_free"},credentials:"include",body:JSON.stringify(g),signal:w.signal});if(!S.ok){const R=await S.json().catch(()=>({error:S.statusText}));throw new Error(R.error||R.message||`Error ${S.status}`)}if(!S.body)throw new Error("No response body");const k=S.body.getReader(),C=new TextDecoder;let M="";const E=[];for(;;){const{done:R,value:z}=await k.read();if(R)break;M+=C.decode(z,{stream:!0});const I=M.split(`
`);M=I.pop()||"";for(const W of I){if(!W.startsWith("data: "))continue;const G=W.slice(6).trim();if(G==="[DONE]")break;try{const L=JSON.parse(G);if(L.type==="content_delta"&&L.text){v.current+=L.text;const P=v.current;c(O=>{const _=[...O],A=_[_.length-1];return A&&A.id===T.id&&(_[_.length-1]={...A,content:P}),_})}else if(L.type==="tool_use_start"&&L.name){E.push({name:L.name,status:"running"});const P=[...E];c(O=>{const _=[...O],A=_[_.length-1];return A&&A.id===T.id&&(_[_.length-1]={...A,tool_calls:P}),_})}else if(L.type==="message_stop"){E.forEach(O=>{O.status==="running"&&(O.status="done")});const P=[...E];c(O=>{const _=[...O],A=_[_.length-1];return A&&A.id===T.id&&(_[_.length-1]={...A,tool_calls:P}),_})}else if(L.type==="error")throw new Error(L.message||"Stream error")}catch(L){if(L instanceof Error&&L.message!=="Stream error")continue;throw L}}}}catch(j){if(!(j instanceof DOMException&&j.name==="AbortError")){const g=j instanceof Error?j.message:"Something went wrong. Please try again.";c(S=>{const k=[...S],C=k[k.length-1];return C&&C.id===T.id&&(k[k.length-1]={...C,content:C.content||g,error:!0}),k})}}finally{p(!1),h.current=null}},[s,t,a,d,i]),m=r.useCallback(()=>{h.current&&(h.current.abort(),h.current=null)},[]),N=r.useCallback(()=>{c([]),sessionStorage.removeItem(q)},[]);return{messages:a,streaming:d,context:i,quickActions:o,sendMessage:f,stopStreaming:m,clearMessages:N}}function $t(s){return s?s.replace(/&/g,"&amp;").replace(/</g,"&lt;").replace(/>/g,"&gt;").replace(/```(\w*)\n?([\s\S]*?)```/g,'<pre class="hb-jv-code-block"><code>$2</code></pre>').replace(/`([^`]+)`/g,'<code class="hb-jv-inline-code">$1</code>').replace(/\*\*(.+?)\*\*/g,"<strong>$1</strong>").replace(/\*(.+?)\*/g,"<em>$1</em>").replace(/\[([^\]]+)\]\(([^)]+)\)/g,'<a href="$2" target="_blank" rel="noopener noreferrer" class="hb-jv-link">$1</a>').replace(/^[•\-\*] (.+)$/gm,"<li>$1</li>").replace(/^\d+\. (.+)$/gm,"<li>$1</li>").replace(/(<li>[\s\S]*?<\/li>)/g,'<ul class="hb-jv-list">$1</ul>').replace(/<\/ul>\s*<ul class="hb-jv-list">/g,"").replace(/\n/g,"<br>"):""}const At={search_tickets:"Searching tickets",get_ticket:"Fetching ticket details",create_ticket:"Creating ticket",update_ticket:"Updating ticket",get_company_info:"Looking up company",search_companies:"Searching companies",search_contacts:"Searching contacts",get_deals:"Fetching deals",get_invoices:"Fetching invoices",get_revenue_summary:"Calculating revenue",get_device_status:"Checking device status",search_devices:"Searching devices",run_device_command:"Running command",get_security_alerts:"Checking security alerts",send_message:"Sending message",get_call_history:"Fetching call history",get_company_360:"Building company overview",get_health_score:"Calculating health score",get_briefing:"Generating daily briefing",cross_search:"Searching across products"};function Rt({tool:s}){const t=At[s.name]||s.name.replace(/_/g," "),n=s.status==="running",a=s.status==="error";return e.jsxs("div",{className:`hb-jv-tool-call${n?" running":""}${a?" error":""}`,children:[e.jsx("div",{className:"hb-jv-tool-icon",children:n?e.jsx("span",{className:"hb-jv-tool-spinner"}):a?e.jsx("span",{style:{color:"#f87171"},children:"!"}):e.jsx("span",{style:{color:"#34d399"},children:"✓"})}),e.jsxs("span",{className:"hb-jv-tool-label",children:[t,n?"…":""]}),s.summary&&e.jsx("span",{className:"hb-jv-tool-summary",children:s.summary})]})}function It({message:s,isStreaming:t}){if(s.role==="user")return e.jsx("div",{className:"hb-jv-msg hb-jv-msg-user",children:e.jsx("div",{className:"hb-jv-bubble hb-jv-bubble-user",children:s.content})});const a=s.content.length>0,c=s.tool_calls&&s.tool_calls.length>0;return e.jsxs("div",{className:"hb-jv-msg hb-jv-msg-assistant",children:[e.jsx("div",{className:"hb-jv-avatar",children:e.jsx(F,{size:14,color:"#f97316"})}),e.jsxs("div",{className:"hb-jv-bubble-wrap",children:[c&&e.jsx("div",{className:"hb-jv-tool-calls",children:s.tool_calls.map((d,p)=>e.jsx(Rt,{tool:d},p))}),a&&e.jsx("div",{className:`hb-jv-bubble hb-jv-bubble-assistant${s.error?" error":""}`,dangerouslySetInnerHTML:{__html:$t(s.content)}}),!a&&t&&e.jsx("div",{className:"hb-jv-bubble hb-jv-bubble-assistant",children:e.jsxs("span",{className:"hb-jv-typing",children:[e.jsx("span",{}),e.jsx("span",{}),e.jsx("span",{})]})})]})]})}function Ot({actions:s,onSelect:t,disabled:n}){return s.length===0?null:e.jsx("div",{className:"hb-jv-quick-actions",children:s.map((a,c)=>e.jsx("button",{className:"hb-jv-quick-chip",onClick:()=>t(a.prompt),disabled:n,children:a.label},c))})}function fe({apiBase:s,tenantId:t,userId:n}){const[a,c]=r.useState(!1),{messages:d,streaming:p,context:i,quickActions:l,sendMessage:o,stopStreaming:u,clearMessages:h}=ue(s,t),[v,f]=r.useState(""),m=r.useRef(null),N=r.useRef(null),[x]=r.useState(!1);r.useEffect(()=>{const g=S=>{(S.metaKey||S.ctrlKey)&&S.key==="j"&&(S.preventDefault(),c(k=>!k)),S.key==="Escape"&&a&&c(!1)};return document.addEventListener("keydown",g),()=>document.removeEventListener("keydown",g)},[a]),r.useEffect(()=>{m.current&&m.current.scrollIntoView({behavior:"smooth"})},[d]),r.useEffect(()=>{a&&N.current&&setTimeout(()=>{var g;return(g=N.current)==null?void 0:g.focus()},100)},[a]);const b=r.useCallback(()=>{!v.trim()||p||(o(v.trim()),f(""))},[v,p,o]),T=r.useCallback(g=>{o(g)},[o]),w=r.useCallback(g=>{g.key==="Enter"&&!g.shiftKey&&(g.preventDefault(),b())},[b]),j=a?X.createPortal(e.jsx("div",{className:"hb-jv-overlay",onClick:()=>c(!1),children:e.jsxs("div",{className:"hb-jv-panel",onClick:g=>g.stopPropagation(),role:"dialog","aria-modal":"true","aria-label":"Jarvis AI Assistant",children:[e.jsxs("div",{className:"hb-jv-header",children:[e.jsxs("div",{className:"hb-jv-header-left",children:[e.jsx(F,{size:16,color:"#f97316"}),e.jsx("span",{className:"hb-jv-header-title",children:"Jarvis"}),e.jsx("span",{className:"hb-jv-model-badge",children:"GPT-4.1 mini"})]}),e.jsxs("div",{className:"hb-jv-header-right",children:[d.length>0&&e.jsx("button",{className:"hb-jv-clear-btn",onClick:h,title:"Clear conversation","aria-label":"Clear conversation",children:"Clear"}),e.jsx("button",{className:"hb-jv-close-btn",onClick:()=>c(!1),"aria-label":"Close Jarvis",children:e.jsx(U,{size:16})})]})]}),e.jsxs("div",{className:"hb-jv-messages",children:[d.length===0?e.jsxs("div",{className:"hb-jv-welcome",children:[e.jsx("div",{className:"hb-jv-welcome-icon",children:e.jsx(F,{size:28,color:"#f97316"})}),e.jsx("div",{className:"hb-jv-welcome-title",children:"Hey, I'm Jarvis"}),e.jsx("div",{className:"hb-jv-welcome-sub",children:"Your AI assistant for The One Stack. I can help you with tickets, clients, devices, and more."}),i.product&&e.jsxs("div",{className:"hb-jv-welcome-context",children:["Currently viewing: ",e.jsx("strong",{children:i.product.toUpperCase()}),i.entity_type&&` — ${i.entity_type}`,i.entity_id&&` ${i.entity_id}`]})]}):d.map((g,S)=>e.jsx(It,{message:g,isStreaming:p&&S===d.length-1&&g.role==="assistant"},g.id)),e.jsx("div",{ref:m})]}),d.length===0&&e.jsx(Ot,{actions:l,onSelect:T,disabled:p}),e.jsxs("div",{className:"hb-jv-input-area",children:[e.jsxs("div",{className:"hb-jv-input-row",children:[e.jsx("textarea",{ref:N,className:"hb-jv-input",placeholder:"Ask Jarvis anything...",value:v,onChange:g=>f(g.target.value),onKeyDown:w,rows:1,disabled:p}),p?e.jsx("button",{className:"hb-jv-stop-btn",onClick:u,title:"Stop generating","aria-label":"Stop generating",children:e.jsx("span",{className:"hb-jv-stop-icon"})}):e.jsx("button",{className:"hb-jv-send-btn",onClick:b,disabled:!v.trim(),title:"Send message","aria-label":"Send message",children:e.jsxs("svg",{width:"16",height:"16",viewBox:"0 0 24 24",fill:"none",stroke:"currentColor",strokeWidth:"2",strokeLinecap:"round",strokeLinejoin:"round",children:[e.jsx("path",{d:"M22 2L11 13"}),e.jsx("path",{d:"M22 2L15 22L11 13L2 9L22 2Z"})]})})]}),e.jsxs("div",{className:"hb-jv-input-hint",children:[e.jsxs("span",{className:"hb-jv-kbd-hint",children:[e.jsx("kbd",{children:"⌘"}),e.jsx("kbd",{children:"J"})," to toggle"]}),e.jsx("span",{className:"hb-jv-powered",children:"Powered by The One AI"})]})]})]})}),document.body):null;return e.jsxs(e.Fragment,{children:[e.jsx("button",{className:`hb-jv-btn${a?" active":""}${x?" pulse":""}`,title:"Jarvis AI Assistant (⌘J)","aria-label":"Open Jarvis AI Assistant","aria-expanded":a,onClick:()=>c(g=>!g),children:e.jsx(F,{size:18})}),j]})}function Pt(){return e.jsx("svg",{className:"hb-logo-bird",width:"22",height:"22",viewBox:"0 0 1200 1200",xmlns:"http://www.w3.org/2000/svg","aria-hidden":"true",children:e.jsx("g",{transform:"scale(13.5) translate(-5.5555488798353405, -5.55552503797743)",children:e.jsx("g",{fill:"#f97316",children:e.jsx("g",{transform:"translate(0,-952.36218)",children:e.jsx("path",{d:"m 60.7828,964.36215 27.1809,0.8834 -27.1809,25.9958 z m -1.9745,1.4513 0,26.7845 -25.2681,0 c 8.6166,-8.7334 16.8796,-17.8103 25.2681,-26.7845 z m 27.7053,3.628 3.4864,1.1989 -12.5877,7.4768 z m -68.1835,2.9656 5.5226,0 12.8654,14.0705 -5.9854,6.1204 -12.4026,0 c 9e-4,-6.7347 0,-13.4597 0,-20.1909 z m -1.9746,1.2304 0,5.8364 -6.3555,0 z m 3.363,20.9796 38.627,0 -10.7675,29.43465 z m 39.0898,4.54286 0,41.20229 -12.5878,-6.8775 c 4.1972,-11.443 8.3886,-22.879 12.5878,-34.32479 z"})})})})})}function Ht({currentProduct:s,apiBase:t,signalrEndpoint:n,session:a,onLogout:c,hubUrl:d=V,chatSlot:p,supportConfig:i,orgBranding:l}){const o=ee(a);return o?e.jsx(Ft,{currentProduct:s,apiBase:t,signalrEndpoint:n,session:o,onLogout:c,hubUrl:d,chatSlot:p,supportConfig:i,orgBranding:l}):null}function Ft({currentProduct:s,apiBase:t,signalrEndpoint:n,session:a,onLogout:c,hubUrl:d=V,chatSlot:p,supportConfig:i,orgBranding:l}){var R;const{products:o}=te(t,a.tenantId??null),{notifications:u,unreadCount:h,markAllRead:v,markRead:f,dismiss:m,muted:N,muteUntil:x,unmute:b,toastQueue:T,dismissToast:w}=se(t,n,a.tenantId??null,a.userId??null),[j,g]=r.useState(!1),[S,k]=r.useState(!1),[C,M]=r.useState(!1),E=r.useRef(!1);return r.useEffect(()=>{if(E.current||(E.current=!0,document.getElementById("hb-styles")))return;const I=document.createElement("style");I.id="hb-styles",I.textContent=me,document.head.appendChild(I)},[]),r.useEffect(()=>{const z=document.body.style.paddingTop;return document.body.style.paddingTop=`${Z}px`,()=>{document.body.style.paddingTop=z}},[]),e.jsxs("div",{className:"hb-root",role:"banner",children:[e.jsx(le,{toasts:T,onDismiss:w}),e.jsxs("div",{className:"hb-bar",style:(R=l==null?void 0:l.colors)!=null&&R.header_bg?{background:l.colors.header_bg,color:l.colors.header_text||"#f1f5f9"}:void 0,children:[e.jsx(ae,{currentProduct:s,products:o,open:j,onToggle:()=>{k(!1),M(!1),g(z=>!z)},onClose:()=>g(!1),hubUrl:d}),e.jsxs("a",{href:d,className:"hb-logo","aria-label":l!=null&&l.company_name?`${l.company_name} — Home`:"The One Stack — Home",children:[l!=null&&l.logo_icon_url||l!=null&&l.logo_url?e.jsx("img",{src:l.logo_icon_url||l.logo_url,alt:l.company_name||"Logo",style:{height:22,width:"auto",objectFit:"contain"}}):e.jsx(Pt,{}),e.jsx("span",{className:"hb-logo-name",children:(l==null?void 0:l.company_name)||"The One"})]}),e.jsx("div",{className:"hb-divider","aria-hidden":"true"}),(()=>{const z=o.find(I=>I.id===s);return z?e.jsx("span",{style:{fontSize:14,fontWeight:500,color:"#f1f5f9",whiteSpace:"nowrap"},children:z.name}):null})(),e.jsx("div",{style:{flex:1}}),e.jsx(ie,{apiBase:t,tenantId:(a==null?void 0:a.tenantId)??null}),e.jsx("div",{style:{flex:1}}),i?e.jsx(he,{config:i,user:{email:(a==null?void 0:a.email)??"",name:a?`${a.firstName??""} ${a.lastName??""}`.trim()||a.email:""}}):p??null,e.jsx(fe,{apiBase:t,tenantId:a.tenantId??null,userId:a.userId??null,currentProduct:s}),e.jsx("a",{href:`https://docs.theonestack.com/products/${s==="ops-center"?"":s+"/"}`,target:"_blank",rel:"noopener noreferrer",className:"hb-help-btn",title:"Help & Docs","aria-label":"Help & Documentation",style:{display:"inline-flex",alignItems:"center",justifyContent:"center",width:32,height:32,borderRadius:"50%",color:"#94a3b8",textDecoration:"none",transition:"color 0.15s, background 0.15s"},onMouseEnter:z=>{z.currentTarget.style.color="#f1f5f9",z.currentTarget.style.background="rgba(255,255,255,0.08)"},onMouseLeave:z=>{z.currentTarget.style.color="#94a3b8",z.currentTarget.style.background="transparent"},children:e.jsx(Ne,{size:18})}),e.jsx(oe,{notifications:u,unreadCount:h,open:S,onToggle:()=>{g(!1),M(!1),k(z=>!z)},onClose:()=>k(!1),onMarkAllRead:v,onMarkRead:f,onDismiss:m,muted:N,onMute:x,onUnmute:b,hubUrl:d}),e.jsx(ce,{session:a,open:C,onToggle:()=>{g(!1),k(!1),M(z=>!z)},onClose:()=>M(!1),onLogout:c,hubUrl:d})]})]})}exports.ALL_PRODUCTS=H;exports.HUB_BAR_HEIGHT=Z;exports.HUB_URL=V;exports.HubBar=Ht;exports.JarvisButton=fe;exports.NotificationBell=oe;exports.NotificationToast=le;exports.ProductSwitcher=ae;exports.SEVERITY_COLORS=D;exports.SupportButton=he;exports.UnifiedSearch=ie;exports.UserMenu=ce;exports.useHubSession=ee;exports.useJarvis=ue;exports.useNotifications=se;exports.useProducts=te;exports.useSearch=re;
