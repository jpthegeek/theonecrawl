"use strict";Object.defineProperty(exports,Symbol.toStringTag,{value:"Module"});const e=require("react/jsx-runtime"),i=require("react"),q=require("react-dom"),z="https://my.theonestack.com",S=[{id:"psa",name:"PSA",url:"https://app.theonepsa.com",icon:"briefcase",color:"#3b82f6"},{id:"crm",name:"CRM",url:"https://app.theonecrm.app",icon:"target",color:"#0ea5e9"},{id:"rmm",name:"RMM",url:"https://app.theonermm.app",icon:"monitor",color:"#14b8a6"},{id:"security",name:"Security",url:"https://app.theonesecurity.app",icon:"shield-check",color:"#4f46e5"},{id:"backups",name:"Backups",url:"https://app.theonebackups.app",icon:"hard-drive",color:"#10b981"},{id:"projects",name:"Projects",url:"https://app.theoneprojects.app",icon:"folder-kanban",color:"#f59e0b"},{id:"books",name:"Books",url:"https://app.theonebooks.app",icon:"book-open",color:"#14b8a6"},{id:"voice",name:"Voice",url:"https://app.theonevoice.app",icon:"phone",color:"#06b6d4"},{id:"ai-studio",name:"AI Studio",url:"https://app.theonestudio.app",icon:"sparkles",color:"#6366f1"},{id:"livekit",name:"LiveKit",url:"https://live.theonelivekit.app",icon:"video",color:"#2563eb"},{id:"mission",name:"Mission",url:"https://app.theonemission.app",icon:"heart",color:"#e11d48"},{id:"ams",name:"AMS",url:"https://app.theoneams.com",icon:"building-2",color:"#f59e0b"},{id:"fleet",name:"Fleet",url:"https://app.theonefleet.app",icon:"truck",color:"#10b981"},{id:"people",name:"People",url:"https://app.theonepeople.app",icon:"users",color:"#f43f5e"},{id:"cmdb",name:"CMDB",url:"https://app.theonecmdb.app",icon:"database",color:"#06b6d4"},{id:"oncall",name:"On-Call",url:"https://app.theoneoncall.app",icon:"bell-ring",color:"#f43f5e"},{id:"visitor",name:"Visitor",url:"https://app.theonevisitor.app",icon:"door-open",color:"#0ea5e9"},{id:"legal",name:"Legal",url:"https://app.theonelegal.app",icon:"scale",color:"#2563eb"},{id:"collective",name:"Collective",url:"https://app.mspcollective.io",icon:"globe",color:"#8b5cf6"},{id:"crawl",name:"Crawl",url:"https://crawl.theonestack.com",icon:"search",color:"#f97316"},{id:"portal",name:"Portal",url:"https://app.theoneportal.app",icon:"globe",color:"#ec4899"},{id:"bridge",name:"Bridge",url:"https://app.theonebridge.app",icon:"arrow-left-right",color:"#f97316"},{id:"canvas",name:"Canvas",url:"https://app.theonecanvas.app",icon:"pen-tool",color:"#f59e0b"},{id:"mission",name:"Mission",url:"https://app.theonemission.app",icon:"heart",color:"#a855f7"},{id:"hub",name:"Hub",url:"https://my.theonestack.com",icon:"layout-grid",color:"#8b5cf6"},{id:"ops-center",name:"Ops Center",url:"https://theoneops.app",icon:"activity",color:"#818cf8"}],E={info:"#60a5fa",success:"#34d399",warning:"#fbbf24",error:"#f87171"},L=48,D=`
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
    gap: 10px;
    padding: 11px 14px;
    cursor: pointer;
    transition: background 0.1s;
    text-decoration: none;
    color: inherit;
    border-bottom: 1px solid rgba(255,255,255,0.03);
  }
  .hb-notif-item:hover { background: rgba(255,255,255,0.04); }
  .hb-notif-item.unread { background: rgba(249,115,22,0.04); }
  .hb-notif-item.unread:hover { background: rgba(249,115,22,0.07); }
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
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
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
  .hb-notif-empty {
    text-align: center;
    padding: 32px 16px;
    color: #475569;
    font-size: 13px;
  }
  .hb-notif-footer {
    padding: 10px 14px;
    border-top: 1px solid rgba(255,255,255,0.06);
    text-align: center;
  }
  .hb-notif-footer a {
    font-size: 12px;
    color: #64748b;
    text-decoration: none;
    transition: color 0.15s;
  }
  .hb-notif-footer a:hover { color: #94a3b8; }

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
    .hb-sp-panel {
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
`;function V(s){if(typeof document>"u")return null;const t=document.cookie.match(new RegExp("(?:^|;\\s*)"+s+"=([^;]*)"));if(!t)return null;try{return decodeURIComponent(t[1])}catch{return null}}function W(s){try{const t=s.split(".");if(t.length!==3)return null;const a=t[1].replace(/-/g,"+").replace(/_/g,"/"),n=a+"=".repeat((4-a.length%4)%4);return JSON.parse(atob(n))}catch{return null}}function G(s,t,a){if(t&&a)return(t[0]+a[0]).toUpperCase();if(t)return t.slice(0,2).toUpperCase();const n=s.split("@")[0].split(/[._-]/);return n.length>=2?(n[0][0]+n[1][0]).toUpperCase():s.slice(0,2).toUpperCase()}function _(s){return i.useMemo(()=>{if(s)return s;const t=V("hub_session");if(!t)return null;const a=W(t);if(!a)return null;const n=a.userId||a.sub||"",l=a.tenantId||a.tenant_id||"",p=a.tenantSlug||"",d=a.tenantName||p,o=a.email||"",c=a.role||"member",r=a.orgRole,h=a.entitlements,b=a.firstName,g=a.lastName;return!n||!o?null:{userId:n,tenantId:l,tenantSlug:p,tenantName:d,email:o,role:c,orgRole:r,entitlements:h,firstName:b,lastName:g,initials:G(o,b,g)}},[s])}function $(s,t){const[a,n]=i.useState([]),[l,p]=i.useState(!1),[d,o]=i.useState(null);return i.useEffect(()=>{if(!t){n(S.map(r=>({...r,active:!1})));return}p(!0),o(null);const c=new AbortController;return fetch(`${s}/api/bus/products?tenant_id=${encodeURIComponent(t)}`,{credentials:"include",signal:c.signal}).then(r=>{if(!r.ok)throw new Error(`Products API returned ${r.status}`);return r.json()}).then(r=>{const h=new Set(r.activeProductIds);n(S.map(b=>({...b,active:h.has(b.id)}))),p(!1)}).catch(r=>{r.name!=="AbortError"&&(n(S.map(h=>({...h,active:!1}))),o(r.message),p(!1))}),()=>c.abort()},[s,t]),{products:a,loading:l,error:d}}function R(s,t,a){const[n,l]=i.useState([]),p=i.useRef(null);i.useEffect(()=>{if(!a)return;const r=new AbortController;return fetch(`${s}/api/bus/notifications?tenant_id=${encodeURIComponent(a)}&limit=20`,{credentials:"include",signal:r.signal}).then(h=>h.ok?h.json():Promise.resolve({notifications:[]})).then(h=>{l(h.notifications??[])}).catch(()=>{}),()=>r.abort()},[s,a]),i.useEffect(()=>{if(!t||!a)return;let r=!1;return(async()=>{try{const{HubConnectionBuilder:h,LogLevel:b}=await Promise.resolve().then(()=>require("./index-BcawcpwG.cjs")),g=new h().withUrl(`${t}?tenantId=${encodeURIComponent(a)}`).withAutomaticReconnect().configureLogging(b.Warning).build();g.on("notification",v=>{l(f=>[v,...f.slice(0,49)])}),g.on("notificationsRead",v=>{const f=new Set(v);l(y=>y.map(m=>f.has(m.id)?{...m,read:!0}:m))}),r||(await g.start(),p.current=g)}catch{}})(),()=>{var h;r=!0,(h=p.current)==null||h.stop(),p.current=null}},[t,a]);const d=i.useCallback(r=>{l(h=>h.map(b=>b.id===r?{...b,read:!0}:b)),fetch(`${s}/api/bus/notifications/${encodeURIComponent(r)}/read`,{method:"POST",credentials:"include"}).catch(()=>{})},[s]),o=i.useCallback(()=>{l(r=>r.map(h=>({...h,read:!0}))),fetch(`${s}/api/bus/notifications/mark-all-read`,{method:"POST",credentials:"include"}).catch(()=>{})},[s]),c=n.filter(r=>!r.read).length;return{notifications:n,unreadCount:c,markAllRead:o,markRead:d}}const x=s=>function({size:a=16,className:n,color:l="currentColor"}){const p=Array.isArray(s)?s:[s];return e.jsx("svg",{xmlns:"http://www.w3.org/2000/svg",width:a,height:a,viewBox:"0 0 24 24",fill:"none",stroke:l,strokeWidth:"2",strokeLinecap:"round",strokeLinejoin:"round",className:n,children:p.map((d,o)=>e.jsx("path",{d},o))})},C=x("M21 21l-4.35-4.35M17 11A6 6 0 1 1 5 11a6 6 0 0 1 12 0z"),J=x(["M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9","M13.73 21a2 2 0 0 1-3.46 0"]),A=x("M18 6 6 18M6 6l12 12"),Y=x(["M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2","M12 3a4 4 0 1 0 0 8 4 4 0 0 0 0-8z"]),X=x(["M12 20a8 8 0 1 0 0-16 8 8 0 0 0 0 16z","M12 14a2 2 0 1 0 0-4 2 2 0 0 0 0 4z"]),Q=x(["M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4","M16 17l5-5-5-5","M21 12H9"]),Z=x(["M7 16V4m0 0L3 8m4-4 4 4","M17 8v12m0 0 4-4m-4 4-4-4"]),ee=x("M7.9 20A9 9 0 1 0 4 16.1L2 22z"),te=x(["M12 22a10 10 0 1 0 0-20 10 10 0 0 0 0 20z","M12 16a4 4 0 1 0 0-8 4 4 0 0 0 0 8z","M4.93 4.93l4.24 4.24","M14.83 14.83l4.24 4.24","M14.83 9.17l4.24-4.24","M14.83 9.17l3.53-3.53","M4.93 19.07l4.24-4.24"]),se=x(["M16 20V4a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16","M2 10a2 2 0 0 1 2-2h16a2 2 0 0 1 2 2v10H2z"]),ae=x(["M22 12h-4","M6 12H2","M12 6V2","M12 22v-4","M12 8a4 4 0 1 0 0 8 4 4 0 0 0 0-8z"]),re=x(["M2 3h20v14H2z","M8 21h8","M12 17v4"]),ne=x(["M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z","M9 12l2 2 4-4"]),ie=x(["M22 12H2","M5.45 5.11 2 12v6a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2v-6l-3.45-6.89A2 2 0 0 0 16.76 4H7.24a2 2 0 0 0-1.79 1.11z","M6 16h.01","M10 16h.01"]),oe=x(["M20 20a2 2 0 0 0 2-2V8a2 2 0 0 0-2-2h-7.9a2 2 0 0 1-1.69-.9L9.6 3.9A2 2 0 0 0 7.93 3H4a2 2 0 0 0-2 2v13a2 2 0 0 0 2 2z","M8 10v4","M12 10v2","M16 10v6"]),le=x(["M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z","M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z"]),ce=x("M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"),de=x(["M9.937 15.5A2 2 0 0 0 8.5 14.063l-6.135-1.582a.5.5 0 0 1 0-.962L8.5 9.936A2 2 0 0 0 9.937 8.5l1.582-6.135a.5.5 0 0 1 .963 0L14.063 8.5A2 2 0 0 0 15.5 9.937l6.135 1.581a.5.5 0 0 1 0 .964L15.5 14.063a2 2 0 0 0-1.437 1.437l-1.582 6.135a.5.5 0 0 1-.963 0z","M20 3v4","M22 5h-4"]),pe=x(["M23 7l-7 5 7 5V7z","M14 5H3a2 2 0 0 0-2 2v10a2 2 0 0 0 2 2h11a2 2 0 0 0 2-2V7a2 2 0 0 0-2-2z"]),he=x(["M18 22V8l-6-6-6 6v14","M2 22h20","M10 22v-4a2 2 0 0 1 4 0v4","M12 7v5","M10 9h4"]),be=x(["M6 22V4a2 2 0 0 1 2-2h8a2 2 0 0 1 2 2v18","M6 12H4a2 2 0 0 1-2-2V7a2 2 0 0 1 2-2h2","M18 12h2a2 2 0 0 1 2 2v3a2 2 0 0 1-2 2h-2","M10 6h4","M10 10h4","M10 14h4","M10 18h4"]),ue=x(["M14 18V6a2 2 0 0 0-2-2H4a2 2 0 0 0-2 2v11a1 1 0 0 0 1 1h1","M15 18h6a1 1 0 0 0 1-1v-3.65a1 1 0 0 0-.22-.624l-3.48-4.35A1 1 0 0 0 17.52 8H14","M7 18a2 2 0 1 0 0 4 2 2 0 0 0 0-4z","M17 18a2 2 0 1 0 0 4 2 2 0 0 0 0-4z"]),fe=x(["M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2","M9 3a4 4 0 1 0 0 8 4 4 0 0 0 0-8z","M22 21v-2a4 4 0 0 0-3-3.87","M16 3.13a4 4 0 0 1 0 7.75"]),me=x(["M12 2a9 3 0 1 0 0 6 9 3 0 0 0 0-6z","M21 12c0 1.66-4 3-9 3s-9-1.34-9-3","M3 5v14c0 1.66 4 3 9 3s9-1.34 9-3V5"]),xe=x(["M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9","M13.73 21a2 2 0 0 1-3.46 0","M2 8c0-2.2.7-4.3 2-6","M22 8a10 10 0 0 0-2-6"]),ge=x(["M13 4h3a2 2 0 0 1 2 2v14","M2 20h3","M13 20h9","M10 12v.01","M13 4.562v16.157a1 1 0 0 1-1.242.97L5 20V5.562a2 2 0 0 1 1.515-1.94l4.243-1.06A2 2 0 0 1 13 4.561z"]),ve=x(["M16 2l5 5-14 14L2 16z","M12 8l-2-2","M8 12l-2-2"]),ye=x(["M12 2a10 10 0 1 0 0 20 10 10 0 0 0 0-20z","M2 12h20","M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"]),ke=x(["M3 3h7v7H3z","M14 3h7v7h-7z","M14 14h7v7h-7z","M3 14h7v7H3z"]),we=x("M22 12h-4l-3 9L9 3l-3 9H2"),je={briefcase:se,target:ae,monitor:re,"shield-check":ne,"hard-drive":ie,"folder-kanban":oe,"book-open":le,phone:ce,sparkles:de,video:pe,church:he,"building-2":be,truck:ue,users:fe,database:me,"bell-ring":xe,"door-open":ge,scale:ve,globe:ye,search:C,"layout-grid":ke,activity:we};function Ne(){const s=[];for(let t=0;t<3;t++)for(let a=0;a<3;a++)s.push([6+a*7,6+t*7]);return e.jsx("svg",{width:"20",height:"20",viewBox:"0 0 24 24",fill:"none",xmlns:"http://www.w3.org/2000/svg",children:s.map(([t,a],n)=>e.jsx("circle",{cx:t,cy:a,r:"2",fill:"#94a3b8"},n))})}function T({icon:s,size:t=20}){const a=je[s];return a?e.jsx(a,{size:t,color:"#fff"}):e.jsx("span",{style:{color:"#fff",fontSize:14,fontWeight:700},children:s.charAt(0).toUpperCase()})}function P({currentProduct:s,products:t,open:a,onToggle:n,onClose:l,hubUrl:p}){const d=i.useRef(null),o=t.filter(r=>r.active),c=t.filter(r=>!r.active);return i.useEffect(()=>{if(!a)return;function r(b){d.current&&!d.current.contains(b.target)&&l()}function h(b){b.key==="Escape"&&l()}return document.addEventListener("mousedown",r),document.addEventListener("keydown",h),()=>{document.removeEventListener("mousedown",r),document.removeEventListener("keydown",h)}},[a,l]),e.jsxs("div",{className:"hb-switcher",ref:d,style:{position:"relative"},children:[e.jsx("button",{className:`hb-waffle-btn${a?" open":""}`,onClick:n,"aria-expanded":a,"aria-label":"App launcher",children:e.jsx(Ne,{})}),a&&e.jsxs("div",{className:"hb-waffle-panel",role:"menu",children:[e.jsx("div",{className:"hb-waffle-header",children:"Apps"}),e.jsx("div",{className:"hb-waffle-grid",children:o.map(r=>e.jsxs("a",{href:r.url,className:"hb-waffle-tile",onClick:l,role:"menuitem",children:[e.jsx("div",{className:`hb-waffle-tile-icon${r.id===s?" current":""}`,style:{background:r.color,color:r.color},children:e.jsx(T,{icon:r.icon,color:r.color})}),e.jsx("span",{className:"hb-waffle-tile-name",children:r.name})]},r.id))}),c.length>0&&e.jsxs(e.Fragment,{children:[e.jsx("div",{className:"hb-waffle-sep"}),e.jsx("div",{className:"hb-waffle-section-label",children:"Available"}),e.jsx("div",{className:"hb-waffle-grid",children:c.map(r=>e.jsxs("a",{href:`${p}/products/${r.id}`,className:"hb-waffle-tile inactive",onClick:l,role:"menuitem",children:[e.jsx("div",{className:"hb-waffle-tile-icon",style:{background:r.color},children:e.jsx(T,{icon:r.icon,color:r.color})}),e.jsx("span",{className:"hb-waffle-tile-name",children:r.name})]},r.id))})]}),e.jsx("a",{href:`${p}/products`,className:"hb-waffle-explore",onClick:l,children:"Explore all products →"})]})]})}function B(s,t,a,n=200){const[l,p]=i.useState([]),[d,o]=i.useState(!1),c=i.useRef(null);return i.useEffect(()=>{c.current&&clearTimeout(c.current);const r=a.trim();if(!r||!t){p([]),o(!1);return}o(!0);const h=new AbortController;return c.current=setTimeout(()=>{fetch(`${s}/api/bus/search?q=${encodeURIComponent(r)}&tenant_id=${encodeURIComponent(t)}`,{credentials:"include",signal:h.signal}).then(b=>b.ok?b.json():Promise.resolve({groups:[]})).then(b=>{p(b.groups??[]),o(!1)}).catch(b=>{b.name!=="AbortError"&&(p([]),o(!1))})},n),()=>{h.abort(),c.current&&clearTimeout(c.current)}},[s,t,a,n]),{results:l,loading:d}}function O({apiBase:s,tenantId:t}){const[a,n]=i.useState(!1),[l,p]=i.useState(""),[d,o]=i.useState(-1),c=i.useRef(null),{results:r,loading:h}=B(s,t,l),b=r.flatMap(m=>m.results),g=i.useCallback(()=>{n(!0),p(""),o(-1),setTimeout(()=>{var m;return(m=c.current)==null?void 0:m.focus()},0)},[]),v=i.useCallback(()=>{n(!1),p(""),o(-1)},[]);i.useEffect(()=>{function m(u){(u.metaKey||u.ctrlKey)&&u.key==="k"&&(u.preventDefault(),a?v():g()),u.key==="Escape"&&a&&v()}return document.addEventListener("keydown",m),()=>document.removeEventListener("keydown",m)},[a,g,v]);function f(m){if(m.key==="ArrowDown")m.preventDefault(),o(u=>Math.min(u+1,b.length-1));else if(m.key==="ArrowUp")m.preventDefault(),o(u=>Math.max(u-1,-1));else if(m.key==="Enter"&&d>=0){const u=b[d];u&&(window.location.href=u.deepLink,v())}}const y=typeof navigator<"u"&&/Mac/i.test(navigator.platform);return e.jsxs(e.Fragment,{children:[e.jsx("div",{className:"hb-search-wrap",children:e.jsxs("button",{className:"hb-search-trigger",onClick:g,"aria-label":"Search (Cmd+K)",children:[e.jsx(C,{size:14}),e.jsx("span",{className:"hb-search-trigger-text",children:"Search everything..."}),e.jsxs("span",{className:"hb-kbd",children:[e.jsx("kbd",{children:y?"⌘":"Ctrl"}),e.jsx("kbd",{children:"K"})]})]})}),a&&e.jsx("div",{className:"hb-search-overlay",onMouseDown:m=>{m.target===m.currentTarget&&v()},role:"dialog","aria-label":"Search","aria-modal":"true",children:e.jsxs("div",{className:"hb-search-modal",children:[e.jsxs("div",{className:"hb-search-input-row",children:[e.jsx(C,{size:18,color:"#f97316"}),e.jsx("input",{ref:c,className:"hb-search-input",placeholder:"Search everything...",value:l,onChange:m=>{p(m.target.value),o(-1)},onKeyDown:f,autoComplete:"off",spellCheck:!1}),l&&e.jsx("button",{style:{background:"none",border:"none",cursor:"pointer",padding:0,color:"#64748b"},onClick:()=>p(""),"aria-label":"Clear",children:e.jsx(A,{size:16})})]}),e.jsx(Se,{query:l,loading:h,results:r,focusedIndex:d,onNavigate:v})]})})]})}function Se({query:s,loading:t,results:a,focusedIndex:n,onNavigate:l}){if(!s.trim())return e.jsxs("div",{className:"hb-search-empty",children:[e.jsx("div",{children:"Type to search across all products"}),e.jsx("div",{className:"hb-search-empty-hint",children:"Contacts, tickets, invoices, devices, and more"})]});if(t)return e.jsxs("div",{className:"hb-search-loading",children:[e.jsx("div",{className:"hb-spinner"}),"Searching..."]});if(!a.length)return e.jsxs("div",{className:"hb-search-empty",children:["No results for “",s,"”"]});let p=0;return e.jsx("div",{className:"hb-search-results",children:a.map(d=>e.jsxs("div",{children:[e.jsxs("div",{className:"hb-search-group-label",children:[d.productName," — ",d.results.length," result",d.results.length!==1?"s":""]}),d.results.map(o=>{const c=p++;return e.jsxs("a",{href:o.deepLink,className:`hb-search-item${n===c?" focused":""}`,onClick:l,children:[e.jsx("div",{className:"hb-search-item-icon",children:o.icon??o.title.slice(0,1).toUpperCase()}),e.jsxs("div",{className:"hb-search-item-body",children:[e.jsx("div",{className:"hb-search-item-title",children:o.title}),o.subtitle&&e.jsx("div",{className:"hb-search-item-sub",children:o.subtitle})]}),e.jsx("span",{className:"hb-source-badge",children:d.productName})]},o.id)})]},d.productId))})}function Ce(s){const t=Math.floor((Date.now()-new Date(s).getTime())/1e3);return t<60?"just now":t<3600?`${Math.floor(t/60)}m ago`:t<86400?`${Math.floor(t/3600)}h ago`:`${Math.floor(t/86400)}d ago`}function I({notifications:s,unreadCount:t,open:a,onToggle:n,onClose:l,onMarkAllRead:p,onMarkRead:d,hubUrl:o}){const c=i.useRef(null);return i.useEffect(()=>{if(!a)return;function r(h){c.current&&!c.current.contains(h.target)&&l()}return document.addEventListener("mousedown",r),()=>document.removeEventListener("mousedown",r)},[a,l]),e.jsxs("div",{className:"hb-notif",ref:c,children:[e.jsxs("button",{className:"hb-notif-btn",onClick:n,"aria-label":`Notifications${t>0?` (${t} unread)`:""}`,"aria-expanded":a,children:[e.jsx(J,{size:18}),t>0&&e.jsx("span",{className:"hb-badge","aria-hidden":"true",children:t>99?"99+":t})]}),a&&e.jsxs("div",{className:"hb-notif-dropdown",role:"dialog","aria-label":"Notifications",children:[e.jsxs("div",{className:"hb-notif-header",children:[e.jsx("span",{className:"hb-notif-title",children:"Notifications"}),t>0&&e.jsx("button",{className:"hb-notif-mark-read",onClick:p,children:"Mark all read"})]}),e.jsx("div",{className:"hb-notif-list",role:"list",children:s.length===0?e.jsx("div",{className:"hb-notif-empty",children:"No notifications"}):s.slice(0,20).map(r=>e.jsxs("a",{href:r.deepLink,className:`hb-notif-item${r.read?"":" unread"}`,onClick:()=>{d(r.id),l()},role:"listitem",children:[e.jsx("span",{className:"hb-notif-icon",style:{background:E[r.severity]},"aria-hidden":"true"}),e.jsxs("div",{className:"hb-notif-body",children:[e.jsx("div",{className:"hb-notif-body-title",children:r.title}),e.jsxs("div",{className:"hb-notif-meta",children:[e.jsx("span",{className:"hb-source-badge",children:r.productName}),e.jsx("span",{className:"hb-notif-time",children:Ce(r.createdAt)})]})]})]},r.id))}),e.jsx("div",{className:"hb-notif-footer",children:e.jsx("a",{href:`${o}/notifications/settings`,onClick:l,children:"Notification Settings"})})]})]})}function H({session:s,open:t,onToggle:a,onClose:n,onLogout:l,hubUrl:p}){const d=i.useRef(null);i.useEffect(()=>{if(!t)return;function c(r){d.current&&!d.current.contains(r.target)&&n()}return document.addEventListener("mousedown",c),()=>document.removeEventListener("mousedown",c)},[t,n]);function o(){n(),l?l():window.location.href=`${p}/logout`}return e.jsxs("div",{className:"hb-user",ref:d,children:[e.jsxs("button",{className:"hb-user-btn",onClick:a,"aria-expanded":t,"aria-label":"User menu",children:[e.jsx("div",{className:"hb-avatar",children:s.initials}),e.jsx("span",{className:"hb-user-name",children:s.firstName??s.email.split("@")[0]}),e.jsx("svg",{width:"12",height:"12",viewBox:"0 0 24 24",fill:"none",stroke:"currentColor",strokeWidth:"2",strokeLinecap:"round",strokeLinejoin:"round",style:{opacity:.5},children:e.jsx("path",{d:"m6 9 6 6 6-6"})})]}),t&&e.jsxs("div",{className:"hb-user-dropdown",role:"menu",children:[e.jsxs("div",{className:"hb-user-info",children:[e.jsx("div",{style:{fontWeight:600,fontSize:13,color:"#f1f5f9"},children:s.firstName&&s.lastName?`${s.firstName} ${s.lastName}`:s.email.split("@")[0]}),e.jsx("div",{className:"hb-user-email",children:s.email}),s.tenantName&&e.jsx("div",{className:"hb-user-tenant",children:s.tenantName})]}),e.jsxs("a",{href:`${p}/profile`,className:"hb-menu-item",onClick:n,role:"menuitem",children:[e.jsx(Y,{size:14}),"Profile"]}),e.jsxs("a",{href:`${p}/settings`,className:"hb-menu-item",onClick:n,role:"menuitem",children:[e.jsx(X,{size:14}),"Hub Settings"]}),e.jsx("div",{className:"hb-menu-sep"}),e.jsxs("a",{href:`${p}/switch-tenant`,className:"hb-menu-item",onClick:n,role:"menuitem",children:[e.jsx(Z,{size:14}),"Switch Tenant"]}),e.jsx("div",{className:"hb-menu-sep"}),e.jsxs("button",{className:"hb-menu-item danger",onClick:o,role:"menuitem",children:[e.jsx(Q,{size:14}),"Log Out"]})]})]})}class ze{constructor(t){this.baseUrl=t.apiBaseUrl.replace(/\/$/,""),this.apiKey=t.apiKey,this.platformId=t.platformId}async request(t,a={}){const n=`${this.baseUrl}${t}`,l=await fetch(n,{...a,headers:{"Content-Type":"application/json","X-Api-Key":this.apiKey,...a.headers}});if(!l.ok){const p=await l.text().catch(()=>"");throw new Error(`Ops Center API error ${l.status}: ${p}`)}if(l.status!==204)return l.json()}async createTicket(t){return this.request("/api/tickets",{method:"POST",body:JSON.stringify({...t,platform:this.platformId})})}async listTickets(t={}){const a=new URLSearchParams({platform:this.platformId});return t.reporter_email&&a.set("reporter_email",t.reporter_email),t.status&&a.set("status",t.status),t.ticket_type&&a.set("ticket_type",t.ticket_type),t.page&&a.set("page",String(t.page)),t.page_size&&a.set("page_size",String(t.page_size)),this.request(`/api/tickets?${a}`)}async getTicket(t){return this.request(`/api/tickets/${t}`)}async getTicketActivity(t){return this.request(`/api/tickets/${t}/activity`)}async addComment(t,a){return this.request(`/api/tickets/${t}/comment`,{method:"POST",body:JSON.stringify(a)})}async voteOnTicket(t,a){return this.request(`/api/tickets/${t}/vote`,{method:"POST",body:JSON.stringify(a)})}async removeVote(t){return this.request(`/api/tickets/${t}/vote`,{method:"DELETE"})}async getPublicReleases(){const t=await fetch(`${this.baseUrl}/api/releases-public/${this.platformId}`);if(!t.ok)throw new Error(`Failed to fetch releases: ${t.status}`);return t.json()}async getFeatures(){return this.request(`/api/features?platform=${this.platformId}&status=proposed,planned,in_progress,shipped`)}async getKBCategories(){const t=await fetch(`${this.baseUrl}/api/kb-public/${this.platformId}/categories`);if(!t.ok)throw new Error(`Failed to fetch KB categories: ${t.status}`);return t.json()}async getKBArticles(t){const a=t?`?category=${encodeURIComponent(t)}`:"",n=await fetch(`${this.baseUrl}/api/kb-public/${this.platformId}/articles${a}`);if(!n.ok)throw new Error(`Failed to fetch KB articles: ${n.status}`);return n.json()}async getKBArticle(t){const a=await fetch(`${this.baseUrl}/api/kb-public/${this.platformId}/articles/${t}`);if(!a.ok)throw new Error(`Failed to fetch KB article: ${a.status}`);return a.json()}async searchKB(t){const a=await fetch(`${this.baseUrl}/api/kb-public/${this.platformId}/search?q=${encodeURIComponent(t)}`);if(!a.ok)throw new Error(`Failed to search KB: ${a.status}`);return a.json()}async startChat(t,a,n){return this.request("/api/chat/sessions",{method:"POST",body:JSON.stringify({message:t,user_name:a,user_email:n,platform:this.platformId})})}async sendChatMessage(t,a){return this.request(`/api/chat/sessions/${t}/messages`,{method:"POST",body:JSON.stringify({message:a})})}async getChatSession(t){return this.request(`/api/chat/sessions/${t}`)}async listChatSessions(t){return this.request(`/api/chat/sessions?email=${encodeURIComponent(t)}`)}async endChat(t,a,n){return this.request(`/api/chat/sessions/${t}/end`,{method:"POST",body:JSON.stringify({rating:a,feedback:n})})}async escalateChat(t){return this.request(`/api/chat/sessions/${t}/escalate`,{method:"POST",body:JSON.stringify({})})}async sendCobrowseEvents(t,a,n){return this.request(`/api/chat/sessions/${t}/cobrowse`,{method:"POST",body:JSON.stringify({events:a,sequence:n})})}}const F=i.createContext(null);function k(){const s=i.useContext(F);if(!s)throw new Error("useSupportContext must be used within <SupportProvider>");return s}function Me({config:s,user:t,children:a}){const n=i.useMemo(()=>new ze(s),[s]),l=i.useMemo(()=>({client:n,config:s,user:t}),[n,s,t]);return e.jsx(F.Provider,{value:l,children:a})}function Te(s){const{client:t,user:a}=k(),[n,l]=i.useState([]),[p,d]=i.useState(!0),[o,c]=i.useState(null),r=i.useCallback(async()=>{d(!0),c(null);try{const h=await t.listTickets({reporter_email:a.email,status:s==null?void 0:s.status,ticket_type:s==null?void 0:s.ticket_type});l(h)}catch(h){c(h instanceof Error?h.message:"Failed to load tickets")}finally{d(!1)}},[t,a.email,s==null?void 0:s.status,s==null?void 0:s.ticket_type]);return i.useEffect(()=>{r()},[r]),{tickets:n,loading:p,error:o,refresh:r}}function Ee(s){const{client:t}=k(),[a,n]=i.useState(null),[l,p]=i.useState([]),[d,o]=i.useState(!0),[c,r]=i.useState(null),h=i.useCallback(async()=>{if(s){o(!0),r(null);try{const[b,g]=await Promise.all([t.getTicket(s),t.getTicketActivity(s)]);n(b),p(g)}catch(b){r(b instanceof Error?b.message:"Failed to load ticket")}finally{o(!1)}}},[t,s]);return i.useEffect(()=>{h()},[h]),{ticket:a,activity:l,loading:d,error:c,refresh:h}}function Le(){const{client:s,user:t}=k(),[a,n]=i.useState(!1),[l,p]=i.useState(null);return{createTicket:i.useCallback(async o=>{n(!0),p(null);try{return await s.createTicket({...o,reporter_email:t.email,reporter_name:t.name})}catch(c){return p(c instanceof Error?c.message:"Failed to create ticket"),null}finally{n(!1)}},[s,t]),submitting:a,error:l}}function _e(){const{client:s,user:t}=k(),[a,n]=i.useState(!1),[l,p]=i.useState(null);return{addComment:i.useCallback(async(o,c)=>{n(!0),p(null);try{return await s.addComment(o,{content:c,actor_email:t.email,actor_name:t.name}),!0}catch(r){return p(r instanceof Error?r.message:"Failed to add comment"),!1}finally{n(!1)}},[s,t]),submitting:a,error:l}}function $e(){const{client:s}=k(),[t,a]=i.useState([]),[n,l]=i.useState(!0),[p,d]=i.useState(null),o=i.useCallback(async()=>{l(!0),d(null);try{const c=await s.getPublicReleases();a(c)}catch(c){d(c instanceof Error?c.message:"Failed to load release notes")}finally{l(!1)}},[s]);return i.useEffect(()=>{o()},[o]),{releases:t,loading:n,error:p,refresh:o}}function Re(){const{client:s}=k(),[t,a]=i.useState([]),[n,l]=i.useState(!0),[p,d]=i.useState(null),o=i.useCallback(async()=>{l(!0),d(null);try{const c=await s.getFeatures();a(c)}catch(c){d(c instanceof Error?c.message:"Failed to load features")}finally{l(!1)}},[s]);return i.useEffect(()=>{o()},[o]),{features:t,loading:n,error:p,refresh:o}}function Ae(){const{client:s,user:t}=k(),[a,n]=i.useState(null),[l,p]=i.useState(null),d=i.useCallback(async c=>{n(c),p(null);try{return await s.voteOnTicket(c,{user_email:t.email,user_name:t.name}),!0}catch(r){return p(r instanceof Error?r.message:"Failed to vote"),!1}finally{n(null)}},[s,t]),o=i.useCallback(async c=>{n(c),p(null);try{return await s.removeVote(c),!0}catch(r){return p(r instanceof Error?r.message:"Failed to remove vote"),!1}finally{n(null)}},[s]);return{vote:d,removeVote:o,voting:a,error:l}}function Pe(){const{client:s}=k(),[t,a]=i.useState([]),[n,l]=i.useState(!0),[p,d]=i.useState(null),o=i.useCallback(async()=>{l(!0),d(null);try{const c=await s.getKBCategories();a(c)}catch(c){d(c instanceof Error?c.message:"Failed to load categories")}finally{l(!1)}},[s]);return i.useEffect(()=>{o()},[o]),{categories:t,loading:n,error:p,refresh:o}}function Be(s){const{client:t}=k(),[a,n]=i.useState([]),[l,p]=i.useState(!0),[d,o]=i.useState(null),c=i.useCallback(async()=>{p(!0),o(null);try{const r=await t.getKBArticles(s);n(r)}catch(r){o(r instanceof Error?r.message:"Failed to load articles")}finally{p(!1)}},[t,s]);return i.useEffect(()=>{c()},[c]),{articles:a,loading:l,error:d,refresh:c}}function Oe(s){const{client:t}=k(),[a,n]=i.useState(null),[l,p]=i.useState(!0),[d,o]=i.useState(null),c=i.useCallback(async()=>{if(s){p(!0),o(null);try{const r=await t.getKBArticle(s);n(r)}catch(r){o(r instanceof Error?r.message:"Failed to load article")}finally{p(!1)}}},[t,s]);return i.useEffect(()=>{c()},[c]),{article:a,loading:l,error:d,refresh:c}}function Ie(){const{client:s}=k(),[t,a]=i.useState([]),[n,l]=i.useState(!1),[p,d]=i.useState(null),o=i.useCallback(async c=>{if(!c.trim()){a([]);return}l(!0),d(null);try{const r=await s.searchKB(c);a(r)}catch(r){d(r instanceof Error?r.message:"Failed to search")}finally{l(!1)}},[s]);return{results:t,loading:n,error:p,search:o}}const He={hub:"Support",submit:"Submit a Ticket",tickets:"My Tickets",ticket:"Ticket",changelog:"What's New",features:"Feature Requests",kb:"Knowledge Base","kb-article":"Article",chat:"Chat"},Fe=[{id:"bug",label:"Report a Bug",desc:"Something not working? We'll fix it.",type:"bug_report"},{id:"feature",label:"Request a Feature",desc:"Have an idea? We want to hear it.",type:"feature_request"},{id:"help",label:"Get Help",desc:"Need assistance with something?",type:"service_request"}];function Ue({onNav:s}){const{config:t}=k();return e.jsxs("div",{className:"hb-sp-hub",children:[e.jsxs("div",{className:"hb-sp-hub-header",children:[e.jsx("div",{className:"hb-sp-hub-title",children:"How can we help?"}),e.jsxs("div",{className:"hb-sp-hub-sub",children:["Get support for ",t.platformName,"."]})]}),e.jsx("div",{className:"hb-sp-hub-grid",children:Fe.map(a=>e.jsxs("button",{className:"hb-sp-card",onClick:()=>s({id:"submit",ticketType:a.type}),children:[e.jsx("div",{className:"hb-sp-card-label",children:a.label}),e.jsx("div",{className:"hb-sp-card-desc",children:a.desc})]},a.id))}),e.jsxs("div",{className:"hb-sp-hub-links",children:[e.jsxs("button",{className:"hb-sp-link-item",onClick:()=>s({id:"tickets"}),children:[e.jsx("span",{children:"My Tickets"}),e.jsx("span",{className:"hb-sp-chevron",children:"›"})]}),e.jsxs("button",{className:"hb-sp-link-item",onClick:()=>s({id:"kb"}),children:[e.jsx("span",{children:"Knowledge Base"}),e.jsx("span",{className:"hb-sp-chevron",children:"›"})]}),e.jsxs("button",{className:"hb-sp-link-item",onClick:()=>s({id:"changelog"}),children:[e.jsx("span",{children:"What's New"}),e.jsx("span",{className:"hb-sp-chevron",children:"›"})]}),e.jsxs("button",{className:"hb-sp-link-item",onClick:()=>s({id:"features"}),children:[e.jsx("span",{children:"Feature Requests"}),e.jsx("span",{className:"hb-sp-chevron",children:"›"})]})]})]})}const Ke=[{value:"bug_report",label:"Bug Report"},{value:"feature_request",label:"Feature Request"},{value:"service_request",label:"Service Request"}],qe=[{value:"low",label:"Low"},{value:"medium",label:"Medium"},{value:"high",label:"High"},{value:"critical",label:"Critical"}],De=[{value:"cosmetic",label:"Cosmetic"},{value:"minor",label:"Minor"},{value:"major",label:"Major"},{value:"blocker",label:"Blocker"}];function Ve({initialType:s,onNav:t}){const[a,n]=i.useState(s||"bug_report"),[l,p]=i.useState(""),[d,o]=i.useState(""),[c,r]=i.useState("medium"),[h,b]=i.useState("minor"),{createTicket:g,submitting:v,error:f}=Le(),[y,m]=i.useState(null);return y?e.jsxs("div",{className:"hb-sp-success",children:[e.jsx("div",{className:"hb-sp-success-icon",children:"✓"}),e.jsx("div",{className:"hb-sp-success-title",children:"Ticket Submitted"}),e.jsx("div",{className:"hb-sp-success-num",children:y}),e.jsxs("div",{className:"hb-sp-success-actions",children:[e.jsx("button",{className:"hb-sp-btn hb-sp-btn-secondary",onClick:()=>t({id:"tickets"}),children:"View My Tickets"}),e.jsx("button",{className:"hb-sp-btn hb-sp-btn-ghost",onClick:()=>t({id:"hub"}),children:"Back to Support"})]})]}):e.jsxs("div",{className:"hb-sp-form-page",children:[e.jsxs("div",{className:"hb-sp-field",children:[e.jsx("label",{className:"hb-sp-label",children:"Type"}),e.jsx("div",{className:"hb-sp-type-row",children:Ke.map(u=>e.jsx("button",{type:"button",className:`hb-sp-type-btn${a===u.value?" active":""}`,onClick:()=>n(u.value),children:u.label},u.value))})]}),e.jsxs("div",{className:"hb-sp-field",children:[e.jsx("label",{className:"hb-sp-label",htmlFor:"sp-title",children:"Title"}),e.jsx("input",{id:"sp-title",className:"hb-sp-input",value:l,onChange:u=>p(u.target.value),placeholder:"Brief description...",maxLength:200}),e.jsxs("div",{className:"hb-sp-char-count",children:[l.length,"/200"]})]}),e.jsxs("div",{className:"hb-sp-field",children:[e.jsx("label",{className:"hb-sp-label",htmlFor:"sp-desc",children:"Description"}),e.jsx("textarea",{id:"sp-desc",className:"hb-sp-textarea",value:d,onChange:u=>o(u.target.value),placeholder:"Provide as much detail as possible...",rows:6,maxLength:5e3}),e.jsxs("div",{className:"hb-sp-char-count",children:[d.length,"/5000"]})]}),e.jsxs("div",{className:"hb-sp-field",children:[e.jsx("label",{className:"hb-sp-label",children:"Priority"}),e.jsx("div",{className:"hb-sp-chip-row",children:qe.map(u=>e.jsx("button",{type:"button",className:`hb-sp-chip${c===u.value?" active":""}`,onClick:()=>r(u.value),children:u.label},u.value))})]}),a==="bug_report"&&e.jsxs("div",{className:"hb-sp-field",children:[e.jsx("label",{className:"hb-sp-label",children:"Severity"}),e.jsx("div",{className:"hb-sp-chip-row",children:De.map(u=>e.jsx("button",{type:"button",className:`hb-sp-chip${h===u.value?" active":""}`,onClick:()=>b(u.value),children:u.label},u.value))})]}),f&&e.jsx("div",{className:"hb-sp-error",children:f}),e.jsx("button",{className:"hb-sp-btn hb-sp-btn-primary",disabled:v||!l.trim()||!d.trim(),onClick:async()=>{const u=await g({ticket_type:a,title:l.trim(),description:d.trim(),priority:c,severity:a==="bug_report"?h:void 0});u&&m(u.ticket_number)},children:v?"Submitting…":"Submit Ticket"})]})}const U={new:"New",triaged:"Triaged",in_progress:"In Progress",waiting_reporter:"Waiting on You",waiting_external:"Waiting",on_hold:"On Hold",resolved:"Resolved",closed:"Closed",cancelled:"Cancelled"};function We({onNav:s}){const[t,a]=i.useState(""),{tickets:n,loading:l,error:p}=Te({status:t||void 0});return e.jsxs("div",{className:"hb-sp-list-page",children:[e.jsxs("div",{className:"hb-sp-filter-row",children:[[["","All"],["new,triaged,in_progress,waiting_reporter,waiting_external,on_hold","Open"],["resolved,closed","Closed"]].map(([d,o])=>e.jsx("button",{className:`hb-sp-filter-btn${t===d?" active":""}`,onClick:()=>a(d),children:o},d)),e.jsx("button",{className:"hb-sp-filter-btn hb-sp-filter-btn-new",onClick:()=>s({id:"submit"}),children:"+ New"})]}),l?e.jsx("div",{className:"hb-sp-list",children:[0,1,2].map(d=>e.jsx("div",{className:"hb-sp-skeleton"},d))}):p?e.jsx("div",{className:"hb-sp-error",children:p}):n.length===0?e.jsxs("div",{className:"hb-sp-empty",children:[e.jsx("div",{className:"hb-sp-empty-text",children:"No tickets found"}),e.jsx("button",{className:"hb-sp-btn hb-sp-btn-secondary",onClick:()=>s({id:"submit"}),children:"Submit a Ticket"})]}):e.jsx("div",{className:"hb-sp-list",children:n.map(d=>e.jsxs("button",{className:"hb-sp-list-item",onClick:()=>s({id:"ticket",ticketId:d.id}),children:[e.jsxs("div",{className:"hb-sp-ticket-top",children:[e.jsx("span",{className:"hb-sp-ticket-num",children:d.ticket_number}),e.jsx("span",{className:"hb-sp-badge",children:U[d.status]??d.status})]}),e.jsx("div",{className:"hb-sp-ticket-title",children:d.title}),e.jsx("div",{className:"hb-sp-ticket-meta",children:new Date(d.created_at).toLocaleDateString(void 0,{month:"short",day:"numeric",year:"numeric"})})]},d.id))})]})}function Ge({ticketId:s}){const{ticket:t,activity:a,loading:n,error:l}=Ee(s),{addComment:p,submitting:d}=_e(),[o,c]=i.useState("");return n?e.jsx("div",{className:"hb-sp-loading",children:"Loading ticket…"}):l||!t?e.jsx("div",{className:"hb-sp-error",children:l??"Ticket not found"}):e.jsxs("div",{className:"hb-sp-detail-page",children:[e.jsxs("div",{className:"hb-sp-detail-header",children:[e.jsx("span",{className:"hb-sp-ticket-num",children:t.ticket_number}),e.jsx("span",{className:"hb-sp-badge",children:U[t.status]??t.status})]}),e.jsx("div",{className:"hb-sp-detail-title",children:t.title}),e.jsx("div",{className:"hb-sp-detail-desc",children:t.description}),a.length>0&&e.jsxs("div",{className:"hb-sp-activity",children:[e.jsx("div",{className:"hb-sp-activity-title",children:"Activity"}),a.filter(r=>!r.is_internal).map(r=>e.jsxs("div",{className:"hb-sp-activity-item",children:[e.jsx("div",{className:"hb-sp-activity-actor",children:r.actor_name}),r.content&&e.jsx("div",{className:"hb-sp-activity-content",children:r.content}),e.jsx("div",{className:"hb-sp-activity-time",children:new Date(r.created_at).toLocaleString()})]},r.id))]}),e.jsxs("div",{className:"hb-sp-reply",children:[e.jsx("textarea",{className:"hb-sp-textarea",rows:3,placeholder:"Add a comment…",value:o,onChange:r=>c(r.target.value)}),e.jsx("button",{className:"hb-sp-btn hb-sp-btn-primary",disabled:d||!o.trim(),onClick:async()=>{await p(t.id,o.trim())&&c("")},children:d?"Sending…":"Send"})]})]})}function Je(){const{releases:s,loading:t,error:a}=$e();return t?e.jsx("div",{className:"hb-sp-loading",children:"Loading releases…"}):a?e.jsx("div",{className:"hb-sp-error",children:a}):s.length===0?e.jsx("div",{className:"hb-sp-empty",children:e.jsx("div",{className:"hb-sp-empty-text",children:"No releases yet."})}):e.jsx("div",{className:"hb-sp-list-page",children:s.map((n,l)=>e.jsxs("div",{className:"hb-sp-release",children:[e.jsxs("div",{className:"hb-sp-release-header",children:[e.jsxs("span",{className:"hb-sp-release-ver",children:["v",n.version]}),e.jsx("span",{className:"hb-sp-release-date",children:new Date(n.released_date).toLocaleDateString(void 0,{month:"short",day:"numeric",year:"numeric"})})]}),e.jsx("div",{className:"hb-sp-release-title",children:n.title}),e.jsx("div",{className:"hb-sp-release-notes",children:n.release_notes})]},l))})}const Ye={proposed:"Proposed",planned:"Planned",in_progress:"In Progress",shipped:"Shipped",cancelled:"Cancelled"};function Xe(){const{features:s,loading:t,error:a}=Re(),{vote:n,voting:l}=Ae(),[p,d]=i.useState(new Set);return t?e.jsx("div",{className:"hb-sp-loading",children:"Loading features…"}):a?e.jsx("div",{className:"hb-sp-error",children:a}):s.length===0?e.jsx("div",{className:"hb-sp-empty",children:e.jsx("div",{className:"hb-sp-empty-text",children:"No feature requests yet."})}):e.jsx("div",{className:"hb-sp-list-page",children:s.map(o=>{var c;return e.jsxs("div",{className:"hb-sp-feature-item",children:[e.jsxs("div",{className:"hb-sp-feature-body",children:[e.jsx("div",{className:"hb-sp-feature-title",children:o.title}),e.jsx("div",{className:"hb-sp-feature-desc",children:o.description}),e.jsx("span",{className:"hb-sp-badge",children:Ye[o.status]??o.status})]}),e.jsxs("button",{className:`hb-sp-vote-btn${p.has(o.id)?" voted":""}`,disabled:l===o.id,onClick:async()=>{await n(o.id)&&d(h=>new Set([...h,o.id]))},children:["▲ ",((c=o.tags)==null?void 0:c.length)??0]})]},o.id)})})}function Qe({onNav:s,category:t}){const{categories:a,loading:n}=Pe(),{articles:l,loading:p}=Be(t),{search:d,results:o,loading:c}=Ie(),[r,h]=i.useState(""),b=i.useRef(null),g=f=>{h(f),b.current&&clearTimeout(b.current),b.current=setTimeout(()=>d(f),300)},v=r.trim().length>0;return e.jsxs("div",{className:"hb-sp-list-page",children:[e.jsx("div",{className:"hb-sp-search-row",children:e.jsx("input",{className:"hb-sp-input",placeholder:"Search knowledge base…",value:r,onChange:f=>g(f.target.value)})}),v?c?e.jsx("div",{className:"hb-sp-loading",children:"Searching…"}):o.length===0?e.jsx("div",{className:"hb-sp-empty",children:e.jsxs("div",{className:"hb-sp-empty-text",children:['No results for "',r,'"']})}):e.jsx("div",{className:"hb-sp-list",children:o.map(f=>e.jsxs("button",{className:"hb-sp-list-item",onClick:()=>s({id:"kb-article",slug:f.slug}),children:[e.jsx("div",{className:"hb-sp-ticket-title",children:f.title}),f.excerpt&&e.jsx("div",{className:"hb-sp-ticket-meta",children:f.excerpt})]},f.id))}):e.jsxs(e.Fragment,{children:[!t&&!n&&a.length>0&&e.jsx("div",{className:"hb-sp-kb-cats",children:a.map(f=>e.jsxs("button",{className:"hb-sp-kb-cat",onClick:()=>s({id:"kb",category:f.slug}),children:[e.jsx("span",{children:f.name}),e.jsx("span",{className:"hb-sp-kb-cat-count",children:f.article_count})]},f.id))}),p?e.jsx("div",{className:"hb-sp-loading",children:"Loading…"}):l.length===0?e.jsx("div",{className:"hb-sp-empty",children:e.jsx("div",{className:"hb-sp-empty-text",children:"No articles in this category."})}):e.jsx("div",{className:"hb-sp-list",children:l.map(f=>e.jsxs("button",{className:"hb-sp-list-item",onClick:()=>s({id:"kb-article",slug:f.slug}),children:[e.jsx("div",{className:"hb-sp-ticket-title",children:f.title}),f.excerpt&&e.jsx("div",{className:"hb-sp-ticket-meta",children:f.excerpt})]},f.id))})]})]})}function Ze({slug:s}){const{article:t,loading:a,error:n}=Oe(s);return a?e.jsx("div",{className:"hb-sp-loading",children:"Loading article…"}):n||!t?e.jsx("div",{className:"hb-sp-error",children:n??"Article not found"}):e.jsxs("div",{className:"hb-sp-detail-page",children:[e.jsx("div",{className:"hb-sp-detail-title",children:t.title}),e.jsx("div",{className:"hb-sp-article-content",dangerouslySetInnerHTML:{__html:t.content}})]})}function et({page:s,onNav:t}){return s.id==="hub"?e.jsx(Ue,{onNav:t}):s.id==="submit"?e.jsx(Ve,{initialType:s.ticketType,onNav:t}):s.id==="tickets"?e.jsx(We,{onNav:t}):s.id==="ticket"?e.jsx(Ge,{ticketId:s.ticketId}):s.id==="changelog"?e.jsx(Je,{}):s.id==="features"?e.jsx(Xe,{}):s.id==="kb"?e.jsx(Qe,{onNav:t,category:s.category}):s.id==="kb-article"?e.jsx(Ze,{slug:s.slug}):s.id==="chat"?e.jsx("div",{className:"hb-sp-empty",children:e.jsx("div",{className:"hb-sp-empty-text",children:"Live chat coming soon."})}):null}function K({config:s,user:t}){const[a,n]=i.useState(!1),[l,p]=i.useState({id:"hub"}),[d,o]=i.useState([]),c=i.useRef(null),r=i.useCallback(y=>{o(m=>[...m,l]),p(y),c.current&&(c.current.scrollTop=0)},[l]),h=i.useCallback(()=>{o(y=>{const m=[...y],u=m.pop();return u&&p(u),m}),c.current&&(c.current.scrollTop=0)},[]),b=i.useCallback(()=>{n(!1),setTimeout(()=>{p({id:"hub"}),o([])},200)},[]);i.useEffect(()=>{if(!a)return;const y=m=>{m.key==="Escape"&&b()};return document.addEventListener("keydown",y),()=>document.removeEventListener("keydown",y)},[a,b]);const g=d.length>0,v=He[l.id]??"Support",f=a?q.createPortal(e.jsx("div",{className:"hb-sp-overlay",onClick:b,"aria-hidden":"true",children:e.jsxs("div",{className:`hb-sp-panel${a?" open":""}`,onClick:y=>y.stopPropagation(),role:"dialog","aria-modal":"true","aria-label":"Support",children:[e.jsxs("div",{className:"hb-sp-header",children:[g?e.jsx("button",{className:"hb-sp-back-btn",onClick:h,"aria-label":"Go back",children:"‹ Back"}):e.jsx("div",{className:"hb-sp-header-title",children:v}),g&&e.jsx("div",{className:"hb-sp-header-title",children:v}),e.jsx("button",{className:"hb-sp-close-btn",onClick:b,"aria-label":"Close support panel",children:e.jsx(A,{size:16})})]}),e.jsx("div",{className:"hb-sp-content",ref:c,children:e.jsx(Me,{config:s,user:t,children:e.jsx(et,{page:l,onNav:r})})})]})}),document.body):null;return e.jsxs(e.Fragment,{children:[e.jsx("button",{className:`hb-chat-btn${a?" open":""}`,title:"Support","aria-label":"Open support panel","aria-expanded":a,onClick:()=>n(y=>!y),children:e.jsx(te,{size:18})}),f]})}function tt(){return e.jsx("svg",{className:"hb-logo-bird",width:"22",height:"22",viewBox:"0 0 1200 1200",xmlns:"http://www.w3.org/2000/svg","aria-hidden":"true",children:e.jsx("g",{transform:"scale(13.5) translate(-5.5555488798353405, -5.55552503797743)",children:e.jsx("g",{fill:"#f97316",children:e.jsx("g",{transform:"translate(0,-952.36218)",children:e.jsx("path",{d:"m 60.7828,964.36215 27.1809,0.8834 -27.1809,25.9958 z m -1.9745,1.4513 0,26.7845 -25.2681,0 c 8.6166,-8.7334 16.8796,-17.8103 25.2681,-26.7845 z m 27.7053,3.628 3.4864,1.1989 -12.5877,7.4768 z m -68.1835,2.9656 5.5226,0 12.8654,14.0705 -5.9854,6.1204 -12.4026,0 c 9e-4,-6.7347 0,-13.4597 0,-20.1909 z m -1.9746,1.2304 0,5.8364 -6.3555,0 z m 3.363,20.9796 38.627,0 -10.7675,29.43465 z m 39.0898,4.54286 0,41.20229 -12.5878,-6.8775 c 4.1972,-11.443 8.3886,-22.879 12.5878,-34.32479 z"})})})})})}function st({currentProduct:s,apiBase:t,signalrEndpoint:a,session:n,onLogout:l,hubUrl:p=z,chatSlot:d,supportConfig:o}){const c=_(n);return c?e.jsx(at,{currentProduct:s,apiBase:t,signalrEndpoint:a,session:c,onLogout:l,hubUrl:p,chatSlot:d,supportConfig:o}):null}function at({currentProduct:s,apiBase:t,signalrEndpoint:a,session:n,onLogout:l,hubUrl:p=z,chatSlot:d,supportConfig:o}){const{products:c}=$(t,n.tenantId??null),{notifications:r,unreadCount:h,markAllRead:b,markRead:g}=R(t,a,n.tenantId??null),[v,f]=i.useState(!1),[y,m]=i.useState(!1),[u,N]=i.useState(!1),M=i.useRef(!1);return i.useEffect(()=>{if(M.current||(M.current=!0,document.getElementById("hb-styles")))return;const j=document.createElement("style");j.id="hb-styles",j.textContent=D,document.head.appendChild(j)},[]),i.useEffect(()=>{const w=document.body.style.paddingTop;return document.body.style.paddingTop=`${L}px`,()=>{document.body.style.paddingTop=w}},[]),e.jsx("div",{className:"hb-root",role:"banner",children:e.jsxs("div",{className:"hb-bar",children:[e.jsx(P,{currentProduct:s,products:c,open:v,onToggle:()=>{m(!1),N(!1),f(w=>!w)},onClose:()=>f(!1),hubUrl:p}),e.jsxs("a",{href:p,className:"hb-logo","aria-label":"The One Family — Home",children:[e.jsx(tt,{}),e.jsx("span",{className:"hb-logo-name",children:"The One"})]}),e.jsx("div",{className:"hb-divider","aria-hidden":"true"}),(()=>{const w=c.find(j=>j.id===s);return w?e.jsx("span",{style:{fontSize:14,fontWeight:500,color:"#f1f5f9",whiteSpace:"nowrap"},children:w.name}):null})(),e.jsx("div",{style:{flex:1}}),e.jsx(O,{apiBase:t,tenantId:(n==null?void 0:n.tenantId)??null}),e.jsx("div",{style:{flex:1}}),o?e.jsx(K,{config:o,user:{email:(n==null?void 0:n.email)??"",name:n?`${n.firstName??""} ${n.lastName??""}`.trim()||n.email:""}}):d??e.jsx("button",{className:"hb-chat-btn",title:"Chat — Coming Soon","aria-label":"Chat — Coming Soon",children:e.jsx(ee,{size:18})}),e.jsx(I,{notifications:r,unreadCount:h,open:y,onToggle:()=>{f(!1),N(!1),m(w=>!w)},onClose:()=>m(!1),onMarkAllRead:b,onMarkRead:g,hubUrl:p}),e.jsx(H,{session:n,open:u,onToggle:()=>{f(!1),m(!1),N(w=>!w)},onClose:()=>N(!1),onLogout:l,hubUrl:p})]})})}exports.ALL_PRODUCTS=S;exports.HUB_BAR_HEIGHT=L;exports.HUB_URL=z;exports.HubBar=st;exports.NotificationBell=I;exports.ProductSwitcher=P;exports.SEVERITY_COLORS=E;exports.SupportButton=K;exports.UnifiedSearch=O;exports.UserMenu=H;exports.useHubSession=_;exports.useNotifications=R;exports.useProducts=$;exports.useSearch=B;
