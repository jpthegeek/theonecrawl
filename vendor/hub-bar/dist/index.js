import { jsx as e, jsxs as p, Fragment as $ } from "react/jsx-runtime";
import { useMemo as _, useState as h, useEffect as N, useRef as M, useCallback as w, createContext as H, useContext as F } from "react";
import { createPortal as U } from "react-dom";
const R = "https://my.theonestack.com", L = [
  { id: "psa", name: "PSA", url: "https://app.theonepsa.com", icon: "briefcase", color: "#3b82f6" },
  { id: "crm", name: "CRM", url: "https://app.theonecrm.app", icon: "target", color: "#0ea5e9" },
  { id: "rmm", name: "RMM", url: "https://app.theonermm.app", icon: "monitor", color: "#14b8a6" },
  { id: "security", name: "Security", url: "https://app.theonesecurity.app", icon: "shield-check", color: "#4f46e5" },
  { id: "backups", name: "Backups", url: "https://app.theonebackups.app", icon: "hard-drive", color: "#10b981" },
  { id: "projects", name: "Projects", url: "https://app.theoneprojects.app", icon: "folder-kanban", color: "#f59e0b" },
  { id: "books", name: "Books", url: "https://app.theonebooks.app", icon: "book-open", color: "#14b8a6" },
  { id: "voice", name: "Voice", url: "https://app.theonevoice.app", icon: "phone", color: "#06b6d4" },
  { id: "ai-studio", name: "AI Studio", url: "https://app.theonestudio.app", icon: "sparkles", color: "#6366f1" },
  { id: "livekit", name: "LiveKit", url: "https://live.theonelivekit.app", icon: "video", color: "#2563eb" },
  { id: "mission", name: "Mission", url: "https://app.theonemission.app", icon: "heart", color: "#e11d48" },
  { id: "ams", name: "AMS", url: "https://app.theoneams.com", icon: "building-2", color: "#f59e0b" },
  { id: "fleet", name: "Fleet", url: "https://app.theonefleet.app", icon: "truck", color: "#10b981" },
  { id: "people", name: "People", url: "https://app.theonepeople.app", icon: "users", color: "#f43f5e" },
  { id: "cmdb", name: "CMDB", url: "https://app.theonecmdb.app", icon: "database", color: "#06b6d4" },
  { id: "oncall", name: "On-Call", url: "https://app.theoneoncall.app", icon: "bell-ring", color: "#f43f5e" },
  { id: "visitor", name: "Visitor", url: "https://app.theonevisitor.app", icon: "door-open", color: "#0ea5e9" },
  { id: "legal", name: "Legal", url: "https://app.theonelegal.app", icon: "scale", color: "#2563eb" },
  { id: "collective", name: "Collective", url: "https://app.mspcollective.io", icon: "globe", color: "#8b5cf6" },
  { id: "crawl", name: "Crawl", url: "https://crawl.theonestack.com", icon: "search", color: "#f97316" },
  { id: "portal", name: "Portal", url: "https://app.theoneportal.app", icon: "globe", color: "#ec4899" },
  { id: "bridge", name: "Bridge", url: "https://app.theonebridge.app", icon: "arrow-left-right", color: "#f97316" },
  { id: "canvas", name: "Canvas", url: "https://app.theonecanvas.app", icon: "pen-tool", color: "#f59e0b" },
  { id: "mission", name: "Mission", url: "https://app.theonemission.app", icon: "heart", color: "#a855f7" },
  { id: "hub", name: "Hub", url: "https://my.theonestack.com", icon: "layout-grid", color: "#8b5cf6" },
  { id: "ops-center", name: "Ops Center", url: "https://theoneops.app", icon: "activity", color: "#818cf8" }
], j = {
  info: "#60a5fa",
  success: "#34d399",
  warning: "#fbbf24",
  error: "#f87171"
}, K = 48, q = `
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
`;
function V(r) {
  if (typeof document > "u") return null;
  const t = document.cookie.match(new RegExp("(?:^|;\\s*)" + r + "=([^;]*)"));
  if (!t) return null;
  try {
    return decodeURIComponent(t[1]);
  } catch {
    return null;
  }
}
function D(r) {
  try {
    const t = r.split(".");
    if (t.length !== 3) return null;
    const n = t[1].replace(/-/g, "+").replace(/_/g, "/"), a = n + "=".repeat((4 - n.length % 4) % 4);
    return JSON.parse(atob(a));
  } catch {
    return null;
  }
}
function W(r, t, n) {
  if (t && n)
    return (t[0] + n[0]).toUpperCase();
  if (t)
    return t.slice(0, 2).toUpperCase();
  const a = r.split("@")[0].split(/[._-]/);
  return a.length >= 2 ? (a[0][0] + a[1][0]).toUpperCase() : r.slice(0, 2).toUpperCase();
}
function J(r) {
  return _(() => {
    if (r) return r;
    const t = V("hub_session");
    if (!t) return null;
    const n = D(t);
    if (!n) return null;
    const a = n.userId || n.sub || "", s = n.tenantId || n.tenant_id || "", d = n.tenantSlug || "", c = n.tenantName || d, o = n.email || "", l = n.role || "member", i = n.orgRole, b = n.entitlements, u = n.firstName, v = n.lastName;
    return !a || !o ? null : {
      userId: a,
      tenantId: s,
      tenantSlug: d,
      tenantName: c,
      email: o,
      role: l,
      orgRole: i,
      entitlements: b,
      firstName: u,
      lastName: v,
      initials: W(o, u, v)
    };
  }, [r]);
}
function G(r, t) {
  const [n, a] = h([]), [s, d] = h(!1), [c, o] = h(null);
  return N(() => {
    if (!t) {
      a(L.map((i) => ({ ...i, active: !1 })));
      return;
    }
    d(!0), o(null);
    const l = new AbortController();
    return fetch(`${r}/api/bus/products?tenant_id=${encodeURIComponent(t)}`, {
      credentials: "include",
      signal: l.signal
    }).then((i) => {
      if (!i.ok) throw new Error(`Products API returned ${i.status}`);
      return i.json();
    }).then((i) => {
      const b = new Set(i.activeProductIds);
      a(
        L.map((u) => ({ ...u, active: b.has(u.id) }))
      ), d(!1);
    }).catch((i) => {
      i.name !== "AbortError" && (a(L.map((b) => ({ ...b, active: !1 }))), o(i.message), d(!1));
    }), () => l.abort();
  }, [r, t]), { products: n, loading: s, error: c };
}
function Y(r, t, n) {
  const [a, s] = h([]), d = M(null);
  N(() => {
    if (!n) return;
    const i = new AbortController();
    return fetch(`${r}/api/bus/notifications?tenant_id=${encodeURIComponent(n)}&limit=20`, {
      credentials: "include",
      signal: i.signal
    }).then((b) => b.ok ? b.json() : Promise.resolve({ notifications: [] })).then((b) => {
      s(b.notifications ?? []);
    }).catch(() => {
    }), () => i.abort();
  }, [r, n]), N(() => {
    if (!t || !n) return;
    let i = !1;
    return (async () => {
      try {
        const { HubConnectionBuilder: b, LogLevel: u } = await import("./index-CrDahL0u.js"), v = new b().withUrl(`${t}?tenantId=${encodeURIComponent(n)}`).withAutomaticReconnect().configureLogging(u.Warning).build();
        v.on("notification", (y) => {
          s((m) => [y, ...m.slice(0, 49)]);
        }), v.on("notificationsRead", (y) => {
          const m = new Set(y);
          s(
            (k) => k.map((g) => m.has(g.id) ? { ...g, read: !0 } : g)
          );
        }), i || (await v.start(), d.current = v);
      } catch {
      }
    })(), () => {
      var b;
      i = !0, (b = d.current) == null || b.stop(), d.current = null;
    };
  }, [t, n]);
  const c = w((i) => {
    s(
      (b) => b.map((u) => u.id === i ? { ...u, read: !0 } : u)
    ), fetch(`${r}/api/bus/notifications/${encodeURIComponent(i)}/read`, {
      method: "POST",
      credentials: "include"
    }).catch(() => {
    });
  }, [r]), o = w(() => {
    s((i) => i.map((b) => ({ ...b, read: !0 }))), fetch(`${r}/api/bus/notifications/mark-all-read`, {
      method: "POST",
      credentials: "include"
    }).catch(() => {
    });
  }, [r]), l = a.filter((i) => !i.read).length;
  return { notifications: a, unreadCount: l, markAllRead: o, markRead: c };
}
const x = (r) => function({ size: n = 16, className: a, color: s = "currentColor" }) {
  const d = Array.isArray(r) ? r : [r];
  return /* @__PURE__ */ e(
    "svg",
    {
      xmlns: "http://www.w3.org/2000/svg",
      width: n,
      height: n,
      viewBox: "0 0 24 24",
      fill: "none",
      stroke: s,
      strokeWidth: "2",
      strokeLinecap: "round",
      strokeLinejoin: "round",
      className: a,
      children: d.map((c, o) => /* @__PURE__ */ e("path", { d: c }, o))
    }
  );
}, E = x("M21 21l-4.35-4.35M17 11A6 6 0 1 1 5 11a6 6 0 0 1 12 0z"), X = x([
  "M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9",
  "M13.73 21a2 2 0 0 1-3.46 0"
]), B = x("M18 6 6 18M6 6l12 12"), Q = x(["M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2", "M12 3a4 4 0 1 0 0 8 4 4 0 0 0 0-8z"]), Z = x([
  "M12 20a8 8 0 1 0 0-16 8 8 0 0 0 0 16z",
  "M12 14a2 2 0 1 0 0-4 2 2 0 0 0 0 4z"
]), ee = x([
  "M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4",
  "M16 17l5-5-5-5",
  "M21 12H9"
]), te = x([
  "M7 16V4m0 0L3 8m4-4 4 4",
  "M17 8v12m0 0 4-4m-4 4-4-4"
]), re = x("M7.9 20A9 9 0 1 0 4 16.1L2 22z"), ne = x([
  "M12 22a10 10 0 1 0 0-20 10 10 0 0 0 0 20z",
  "M12 16a4 4 0 1 0 0-8 4 4 0 0 0 0 8z",
  "M4.93 4.93l4.24 4.24",
  "M14.83 14.83l4.24 4.24",
  "M14.83 9.17l4.24-4.24",
  "M14.83 9.17l3.53-3.53",
  "M4.93 19.07l4.24-4.24"
]), ie = x(["M16 20V4a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16", "M2 10a2 2 0 0 1 2-2h16a2 2 0 0 1 2 2v10H2z"]), ae = x(["M22 12h-4", "M6 12H2", "M12 6V2", "M12 22v-4", "M12 8a4 4 0 1 0 0 8 4 4 0 0 0 0-8z"]), oe = x(["M2 3h20v14H2z", "M8 21h8", "M12 17v4"]), se = x(["M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z", "M9 12l2 2 4-4"]), le = x(["M22 12H2", "M5.45 5.11 2 12v6a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2v-6l-3.45-6.89A2 2 0 0 0 16.76 4H7.24a2 2 0 0 0-1.79 1.11z", "M6 16h.01", "M10 16h.01"]), ce = x(["M20 20a2 2 0 0 0 2-2V8a2 2 0 0 0-2-2h-7.9a2 2 0 0 1-1.69-.9L9.6 3.9A2 2 0 0 0 7.93 3H4a2 2 0 0 0-2 2v13a2 2 0 0 0 2 2z", "M8 10v4", "M12 10v2", "M16 10v6"]), de = x(["M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z", "M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z"]), pe = x("M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"), he = x(["M9.937 15.5A2 2 0 0 0 8.5 14.063l-6.135-1.582a.5.5 0 0 1 0-.962L8.5 9.936A2 2 0 0 0 9.937 8.5l1.582-6.135a.5.5 0 0 1 .963 0L14.063 8.5A2 2 0 0 0 15.5 9.937l6.135 1.581a.5.5 0 0 1 0 .964L15.5 14.063a2 2 0 0 0-1.437 1.437l-1.582 6.135a.5.5 0 0 1-.963 0z", "M20 3v4", "M22 5h-4"]), be = x(["M23 7l-7 5 7 5V7z", "M14 5H3a2 2 0 0 0-2 2v10a2 2 0 0 0 2 2h11a2 2 0 0 0 2-2V7a2 2 0 0 0-2-2z"]), ue = x(["M18 22V8l-6-6-6 6v14", "M2 22h20", "M10 22v-4a2 2 0 0 1 4 0v4", "M12 7v5", "M10 9h4"]), fe = x(["M6 22V4a2 2 0 0 1 2-2h8a2 2 0 0 1 2 2v18", "M6 12H4a2 2 0 0 1-2-2V7a2 2 0 0 1 2-2h2", "M18 12h2a2 2 0 0 1 2 2v3a2 2 0 0 1-2 2h-2", "M10 6h4", "M10 10h4", "M10 14h4", "M10 18h4"]), me = x(["M14 18V6a2 2 0 0 0-2-2H4a2 2 0 0 0-2 2v11a1 1 0 0 0 1 1h1", "M15 18h6a1 1 0 0 0 1-1v-3.65a1 1 0 0 0-.22-.624l-3.48-4.35A1 1 0 0 0 17.52 8H14", "M7 18a2 2 0 1 0 0 4 2 2 0 0 0 0-4z", "M17 18a2 2 0 1 0 0 4 2 2 0 0 0 0-4z"]), ge = x(["M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2", "M9 3a4 4 0 1 0 0 8 4 4 0 0 0 0-8z", "M22 21v-2a4 4 0 0 0-3-3.87", "M16 3.13a4 4 0 0 1 0 7.75"]), xe = x(["M12 2a9 3 0 1 0 0 6 9 3 0 0 0 0-6z", "M21 12c0 1.66-4 3-9 3s-9-1.34-9-3", "M3 5v14c0 1.66 4 3 9 3s9-1.34 9-3V5"]), ve = x(["M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9", "M13.73 21a2 2 0 0 1-3.46 0", "M2 8c0-2.2.7-4.3 2-6", "M22 8a10 10 0 0 0-2-6"]), ye = x(["M13 4h3a2 2 0 0 1 2 2v14", "M2 20h3", "M13 20h9", "M10 12v.01", "M13 4.562v16.157a1 1 0 0 1-1.242.97L5 20V5.562a2 2 0 0 1 1.515-1.94l4.243-1.06A2 2 0 0 1 13 4.561z"]), ke = x(["M16 2l5 5-14 14L2 16z", "M12 8l-2-2", "M8 12l-2-2"]), we = x(["M12 2a10 10 0 1 0 0 20 10 10 0 0 0 0-20z", "M2 12h20", "M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"]), Ne = x(["M3 3h7v7H3z", "M14 3h7v7h-7z", "M14 14h7v7h-7z", "M3 14h7v7H3z"]), ze = x("M22 12h-4l-3 9L9 3l-3 9H2"), Ce = {
  briefcase: ie,
  target: ae,
  monitor: oe,
  "shield-check": se,
  "hard-drive": le,
  "folder-kanban": ce,
  "book-open": de,
  phone: pe,
  sparkles: he,
  video: be,
  church: ue,
  "building-2": fe,
  truck: me,
  users: ge,
  database: xe,
  "bell-ring": ve,
  "door-open": ye,
  scale: ke,
  globe: we,
  search: E,
  "layout-grid": Ne,
  activity: ze
};
function Me() {
  const r = [];
  for (let t = 0; t < 3; t++)
    for (let n = 0; n < 3; n++)
      r.push([6 + n * 7, 6 + t * 7]);
  return /* @__PURE__ */ e("svg", { width: "20", height: "20", viewBox: "0 0 24 24", fill: "none", xmlns: "http://www.w3.org/2000/svg", children: r.map(([t, n], a) => /* @__PURE__ */ e("circle", { cx: t, cy: n, r: "2", fill: "#94a3b8" }, a)) });
}
function P({ icon: r, size: t = 20 }) {
  const n = Ce[r];
  return n ? /* @__PURE__ */ e(n, { size: t, color: "#fff" }) : /* @__PURE__ */ e("span", { style: { color: "#fff", fontSize: 14, fontWeight: 700 }, children: r.charAt(0).toUpperCase() });
}
function Se({
  currentProduct: r,
  products: t,
  open: n,
  onToggle: a,
  onClose: s,
  hubUrl: d
}) {
  const c = M(null), o = t.filter((i) => i.active), l = t.filter((i) => !i.active);
  return N(() => {
    if (!n) return;
    function i(u) {
      c.current && !c.current.contains(u.target) && s();
    }
    function b(u) {
      u.key === "Escape" && s();
    }
    return document.addEventListener("mousedown", i), document.addEventListener("keydown", b), () => {
      document.removeEventListener("mousedown", i), document.removeEventListener("keydown", b);
    };
  }, [n, s]), /* @__PURE__ */ p("div", { className: "hb-switcher", ref: c, style: { position: "relative" }, children: [
    /* @__PURE__ */ e(
      "button",
      {
        className: `hb-waffle-btn${n ? " open" : ""}`,
        onClick: a,
        "aria-expanded": n,
        "aria-label": "App launcher",
        children: /* @__PURE__ */ e(Me, {})
      }
    ),
    n && /* @__PURE__ */ p("div", { className: "hb-waffle-panel", role: "menu", children: [
      /* @__PURE__ */ e("div", { className: "hb-waffle-header", children: "Apps" }),
      /* @__PURE__ */ e("div", { className: "hb-waffle-grid", children: o.map((i) => /* @__PURE__ */ p(
        "a",
        {
          href: i.url,
          className: "hb-waffle-tile",
          onClick: s,
          role: "menuitem",
          children: [
            /* @__PURE__ */ e(
              "div",
              {
                className: `hb-waffle-tile-icon${i.id === r ? " current" : ""}`,
                style: {
                  background: i.color,
                  color: i.color
                },
                children: /* @__PURE__ */ e(P, { icon: i.icon, color: i.color })
              }
            ),
            /* @__PURE__ */ e("span", { className: "hb-waffle-tile-name", children: i.name })
          ]
        },
        i.id
      )) }),
      l.length > 0 && /* @__PURE__ */ p($, { children: [
        /* @__PURE__ */ e("div", { className: "hb-waffle-sep" }),
        /* @__PURE__ */ e("div", { className: "hb-waffle-section-label", children: "Available" }),
        /* @__PURE__ */ e("div", { className: "hb-waffle-grid", children: l.map((i) => /* @__PURE__ */ p(
          "a",
          {
            href: `${d}/products/${i.id}`,
            className: "hb-waffle-tile inactive",
            onClick: s,
            role: "menuitem",
            children: [
              /* @__PURE__ */ e(
                "div",
                {
                  className: "hb-waffle-tile-icon",
                  style: { background: i.color },
                  children: /* @__PURE__ */ e(P, { icon: i.icon, color: i.color })
                }
              ),
              /* @__PURE__ */ e("span", { className: "hb-waffle-tile-name", children: i.name })
            ]
          },
          i.id
        )) })
      ] }),
      /* @__PURE__ */ e(
        "a",
        {
          href: `${d}/products`,
          className: "hb-waffle-explore",
          onClick: s,
          children: "Explore all products →"
        }
      )
    ] })
  ] });
}
function Te(r, t, n, a = 200) {
  const [s, d] = h([]), [c, o] = h(!1), l = M(null);
  return N(() => {
    l.current && clearTimeout(l.current);
    const i = n.trim();
    if (!i || !t) {
      d([]), o(!1);
      return;
    }
    o(!0);
    const b = new AbortController();
    return l.current = setTimeout(() => {
      fetch(
        `${r}/api/bus/search?q=${encodeURIComponent(i)}&tenant_id=${encodeURIComponent(t)}`,
        { credentials: "include", signal: b.signal }
      ).then((u) => u.ok ? u.json() : Promise.resolve({ groups: [] })).then((u) => {
        d(u.groups ?? []), o(!1);
      }).catch((u) => {
        u.name !== "AbortError" && (d([]), o(!1));
      });
    }, a), () => {
      b.abort(), l.current && clearTimeout(l.current);
    };
  }, [r, t, n, a]), { results: s, loading: c };
}
function $e({ apiBase: r, tenantId: t }) {
  const [n, a] = h(!1), [s, d] = h(""), [c, o] = h(-1), l = M(null), { results: i, loading: b } = Te(r, t, s), u = i.flatMap((g) => g.results), v = w(() => {
    a(!0), d(""), o(-1), setTimeout(() => {
      var g;
      return (g = l.current) == null ? void 0 : g.focus();
    }, 0);
  }, []), y = w(() => {
    a(!1), d(""), o(-1);
  }, []);
  N(() => {
    function g(f) {
      (f.metaKey || f.ctrlKey) && f.key === "k" && (f.preventDefault(), n ? y() : v()), f.key === "Escape" && n && y();
    }
    return document.addEventListener("keydown", g), () => document.removeEventListener("keydown", g);
  }, [n, v, y]);
  function m(g) {
    if (g.key === "ArrowDown")
      g.preventDefault(), o((f) => Math.min(f + 1, u.length - 1));
    else if (g.key === "ArrowUp")
      g.preventDefault(), o((f) => Math.max(f - 1, -1));
    else if (g.key === "Enter" && c >= 0) {
      const f = u[c];
      f && (window.location.href = f.deepLink, y());
    }
  }
  const k = typeof navigator < "u" && /Mac/i.test(navigator.platform);
  return /* @__PURE__ */ p($, { children: [
    /* @__PURE__ */ e("div", { className: "hb-search-wrap", children: /* @__PURE__ */ p("button", { className: "hb-search-trigger", onClick: v, "aria-label": "Search (Cmd+K)", children: [
      /* @__PURE__ */ e(E, { size: 14 }),
      /* @__PURE__ */ e("span", { className: "hb-search-trigger-text", children: "Search everything..." }),
      /* @__PURE__ */ p("span", { className: "hb-kbd", children: [
        /* @__PURE__ */ e("kbd", { children: k ? "⌘" : "Ctrl" }),
        /* @__PURE__ */ e("kbd", { children: "K" })
      ] })
    ] }) }),
    n && /* @__PURE__ */ e(
      "div",
      {
        className: "hb-search-overlay",
        onMouseDown: (g) => {
          g.target === g.currentTarget && y();
        },
        role: "dialog",
        "aria-label": "Search",
        "aria-modal": "true",
        children: /* @__PURE__ */ p("div", { className: "hb-search-modal", children: [
          /* @__PURE__ */ p("div", { className: "hb-search-input-row", children: [
            /* @__PURE__ */ e(E, { size: 18, color: "#f97316" }),
            /* @__PURE__ */ e(
              "input",
              {
                ref: l,
                className: "hb-search-input",
                placeholder: "Search everything...",
                value: s,
                onChange: (g) => {
                  d(g.target.value), o(-1);
                },
                onKeyDown: m,
                autoComplete: "off",
                spellCheck: !1
              }
            ),
            s && /* @__PURE__ */ e(
              "button",
              {
                style: { background: "none", border: "none", cursor: "pointer", padding: 0, color: "#64748b" },
                onClick: () => d(""),
                "aria-label": "Clear",
                children: /* @__PURE__ */ e(B, { size: 16 })
              }
            )
          ] }),
          /* @__PURE__ */ e(
            Le,
            {
              query: s,
              loading: b,
              results: i,
              focusedIndex: c,
              onNavigate: y
            }
          )
        ] })
      }
    )
  ] });
}
function Le({ query: r, loading: t, results: n, focusedIndex: a, onNavigate: s }) {
  if (!r.trim())
    return /* @__PURE__ */ p("div", { className: "hb-search-empty", children: [
      /* @__PURE__ */ e("div", { children: "Type to search across all products" }),
      /* @__PURE__ */ e("div", { className: "hb-search-empty-hint", children: "Contacts, tickets, invoices, devices, and more" })
    ] });
  if (t)
    return /* @__PURE__ */ p("div", { className: "hb-search-loading", children: [
      /* @__PURE__ */ e("div", { className: "hb-spinner" }),
      "Searching..."
    ] });
  if (!n.length)
    return /* @__PURE__ */ p("div", { className: "hb-search-empty", children: [
      "No results for “",
      r,
      "”"
    ] });
  let d = 0;
  return /* @__PURE__ */ e("div", { className: "hb-search-results", children: n.map((c) => /* @__PURE__ */ p("div", { children: [
    /* @__PURE__ */ p("div", { className: "hb-search-group-label", children: [
      c.productName,
      " — ",
      c.results.length,
      " result",
      c.results.length !== 1 ? "s" : ""
    ] }),
    c.results.map((o) => {
      const l = d++;
      return /* @__PURE__ */ p(
        "a",
        {
          href: o.deepLink,
          className: `hb-search-item${a === l ? " focused" : ""}`,
          onClick: s,
          children: [
            /* @__PURE__ */ e("div", { className: "hb-search-item-icon", children: o.icon ?? o.title.slice(0, 1).toUpperCase() }),
            /* @__PURE__ */ p("div", { className: "hb-search-item-body", children: [
              /* @__PURE__ */ e("div", { className: "hb-search-item-title", children: o.title }),
              o.subtitle && /* @__PURE__ */ e("div", { className: "hb-search-item-sub", children: o.subtitle })
            ] }),
            /* @__PURE__ */ e("span", { className: "hb-source-badge", children: c.productName })
          ]
        },
        o.id
      );
    })
  ] }, c.productId)) });
}
function _e(r) {
  const t = Math.floor((Date.now() - new Date(r).getTime()) / 1e3);
  return t < 60 ? "just now" : t < 3600 ? `${Math.floor(t / 60)}m ago` : t < 86400 ? `${Math.floor(t / 3600)}h ago` : `${Math.floor(t / 86400)}d ago`;
}
function Ee({
  notifications: r,
  unreadCount: t,
  open: n,
  onToggle: a,
  onClose: s,
  onMarkAllRead: d,
  onMarkRead: c,
  hubUrl: o
}) {
  const l = M(null);
  return N(() => {
    if (!n) return;
    function i(b) {
      l.current && !l.current.contains(b.target) && s();
    }
    return document.addEventListener("mousedown", i), () => document.removeEventListener("mousedown", i);
  }, [n, s]), /* @__PURE__ */ p("div", { className: "hb-notif", ref: l, children: [
    /* @__PURE__ */ p(
      "button",
      {
        className: "hb-notif-btn",
        onClick: a,
        "aria-label": `Notifications${t > 0 ? ` (${t} unread)` : ""}`,
        "aria-expanded": n,
        children: [
          /* @__PURE__ */ e(X, { size: 18 }),
          t > 0 && /* @__PURE__ */ e("span", { className: "hb-badge", "aria-hidden": "true", children: t > 99 ? "99+" : t })
        ]
      }
    ),
    n && /* @__PURE__ */ p("div", { className: "hb-notif-dropdown", role: "dialog", "aria-label": "Notifications", children: [
      /* @__PURE__ */ p("div", { className: "hb-notif-header", children: [
        /* @__PURE__ */ e("span", { className: "hb-notif-title", children: "Notifications" }),
        t > 0 && /* @__PURE__ */ e("button", { className: "hb-notif-mark-read", onClick: d, children: "Mark all read" })
      ] }),
      /* @__PURE__ */ e("div", { className: "hb-notif-list", role: "list", children: r.length === 0 ? /* @__PURE__ */ e("div", { className: "hb-notif-empty", children: "No notifications" }) : r.slice(0, 20).map((i) => /* @__PURE__ */ p(
        "a",
        {
          href: i.deepLink,
          className: `hb-notif-item${i.read ? "" : " unread"}`,
          onClick: () => {
            c(i.id), s();
          },
          role: "listitem",
          children: [
            /* @__PURE__ */ e(
              "span",
              {
                className: "hb-notif-icon",
                style: { background: j[i.severity] },
                "aria-hidden": "true"
              }
            ),
            /* @__PURE__ */ p("div", { className: "hb-notif-body", children: [
              /* @__PURE__ */ e("div", { className: "hb-notif-body-title", children: i.title }),
              /* @__PURE__ */ p("div", { className: "hb-notif-meta", children: [
                /* @__PURE__ */ e("span", { className: "hb-source-badge", children: i.productName }),
                /* @__PURE__ */ e("span", { className: "hb-notif-time", children: _e(i.createdAt) })
              ] })
            ] })
          ]
        },
        i.id
      )) }),
      /* @__PURE__ */ e("div", { className: "hb-notif-footer", children: /* @__PURE__ */ e("a", { href: `${o}/notifications/settings`, onClick: s, children: "Notification Settings" }) })
    ] })
  ] });
}
function Ae({
  session: r,
  open: t,
  onToggle: n,
  onClose: a,
  onLogout: s,
  hubUrl: d
}) {
  const c = M(null);
  N(() => {
    if (!t) return;
    function l(i) {
      c.current && !c.current.contains(i.target) && a();
    }
    return document.addEventListener("mousedown", l), () => document.removeEventListener("mousedown", l);
  }, [t, a]);
  function o() {
    a(), s ? s() : window.location.href = `${d}/logout`;
  }
  return /* @__PURE__ */ p("div", { className: "hb-user", ref: c, children: [
    /* @__PURE__ */ p("button", { className: "hb-user-btn", onClick: n, "aria-expanded": t, "aria-label": "User menu", children: [
      /* @__PURE__ */ e("div", { className: "hb-avatar", children: r.initials }),
      /* @__PURE__ */ e("span", { className: "hb-user-name", children: r.firstName ?? r.email.split("@")[0] }),
      /* @__PURE__ */ e(
        "svg",
        {
          width: "12",
          height: "12",
          viewBox: "0 0 24 24",
          fill: "none",
          stroke: "currentColor",
          strokeWidth: "2",
          strokeLinecap: "round",
          strokeLinejoin: "round",
          style: { opacity: 0.5 },
          children: /* @__PURE__ */ e("path", { d: "m6 9 6 6 6-6" })
        }
      )
    ] }),
    t && /* @__PURE__ */ p("div", { className: "hb-user-dropdown", role: "menu", children: [
      /* @__PURE__ */ p("div", { className: "hb-user-info", children: [
        /* @__PURE__ */ e("div", { style: { fontWeight: 600, fontSize: 13, color: "#f1f5f9" }, children: r.firstName && r.lastName ? `${r.firstName} ${r.lastName}` : r.email.split("@")[0] }),
        /* @__PURE__ */ e("div", { className: "hb-user-email", children: r.email }),
        r.tenantName && /* @__PURE__ */ e("div", { className: "hb-user-tenant", children: r.tenantName })
      ] }),
      /* @__PURE__ */ p(
        "a",
        {
          href: `${d}/profile`,
          className: "hb-menu-item",
          onClick: a,
          role: "menuitem",
          children: [
            /* @__PURE__ */ e(Q, { size: 14 }),
            "Profile"
          ]
        }
      ),
      /* @__PURE__ */ p(
        "a",
        {
          href: `${d}/settings`,
          className: "hb-menu-item",
          onClick: a,
          role: "menuitem",
          children: [
            /* @__PURE__ */ e(Z, { size: 14 }),
            "Hub Settings"
          ]
        }
      ),
      /* @__PURE__ */ e("div", { className: "hb-menu-sep" }),
      /* @__PURE__ */ p(
        "a",
        {
          href: `${d}/switch-tenant`,
          className: "hb-menu-item",
          onClick: a,
          role: "menuitem",
          children: [
            /* @__PURE__ */ e(te, { size: 14 }),
            "Switch Tenant"
          ]
        }
      ),
      /* @__PURE__ */ e("div", { className: "hb-menu-sep" }),
      /* @__PURE__ */ p(
        "button",
        {
          className: "hb-menu-item danger",
          onClick: o,
          role: "menuitem",
          children: [
            /* @__PURE__ */ e(ee, { size: 14 }),
            "Log Out"
          ]
        }
      )
    ] })
  ] });
}
class Pe {
  constructor(t) {
    this.baseUrl = t.apiBaseUrl.replace(/\/$/, ""), this.apiKey = t.apiKey, this.platformId = t.platformId;
  }
  async request(t, n = {}) {
    const a = `${this.baseUrl}${t}`, s = await fetch(a, {
      ...n,
      headers: {
        "Content-Type": "application/json",
        "X-Api-Key": this.apiKey,
        ...n.headers
      }
    });
    if (!s.ok) {
      const d = await s.text().catch(() => "");
      throw new Error(`Ops Center API error ${s.status}: ${d}`);
    }
    if (s.status !== 204)
      return s.json();
  }
  // ─── Tickets ───────────────────────────────────────────────
  async createTicket(t) {
    return this.request("/api/tickets", {
      method: "POST",
      body: JSON.stringify({ ...t, platform: this.platformId })
    });
  }
  async listTickets(t = {}) {
    const n = new URLSearchParams({ platform: this.platformId });
    return t.reporter_email && n.set("reporter_email", t.reporter_email), t.status && n.set("status", t.status), t.ticket_type && n.set("ticket_type", t.ticket_type), t.page && n.set("page", String(t.page)), t.page_size && n.set("page_size", String(t.page_size)), this.request(`/api/tickets?${n}`);
  }
  async getTicket(t) {
    return this.request(`/api/tickets/${t}`);
  }
  async getTicketActivity(t) {
    return this.request(`/api/tickets/${t}/activity`);
  }
  async addComment(t, n) {
    return this.request(`/api/tickets/${t}/comment`, {
      method: "POST",
      body: JSON.stringify(n)
    });
  }
  async voteOnTicket(t, n) {
    return this.request(`/api/tickets/${t}/vote`, {
      method: "POST",
      body: JSON.stringify(n)
    });
  }
  async removeVote(t) {
    return this.request(`/api/tickets/${t}/vote`, {
      method: "DELETE"
    });
  }
  // ─── Releases (public, no auth needed) ─────────────────────
  async getPublicReleases() {
    const t = await fetch(`${this.baseUrl}/api/releases-public/${this.platformId}`);
    if (!t.ok) throw new Error(`Failed to fetch releases: ${t.status}`);
    return t.json();
  }
  // ─── Features ──────────────────────────────────────────────
  async getFeatures() {
    return this.request(`/api/features?platform=${this.platformId}&status=proposed,planned,in_progress,shipped`);
  }
  // ─── Knowledge Base (public, no auth needed) ───────────────
  async getKBCategories() {
    const t = await fetch(`${this.baseUrl}/api/kb-public/${this.platformId}/categories`);
    if (!t.ok) throw new Error(`Failed to fetch KB categories: ${t.status}`);
    return t.json();
  }
  async getKBArticles(t) {
    const n = t ? `?category=${encodeURIComponent(t)}` : "", a = await fetch(`${this.baseUrl}/api/kb-public/${this.platformId}/articles${n}`);
    if (!a.ok) throw new Error(`Failed to fetch KB articles: ${a.status}`);
    return a.json();
  }
  async getKBArticle(t) {
    const n = await fetch(`${this.baseUrl}/api/kb-public/${this.platformId}/articles/${t}`);
    if (!n.ok) throw new Error(`Failed to fetch KB article: ${n.status}`);
    return n.json();
  }
  async searchKB(t) {
    const n = await fetch(`${this.baseUrl}/api/kb-public/${this.platformId}/search?q=${encodeURIComponent(t)}`);
    if (!n.ok) throw new Error(`Failed to search KB: ${n.status}`);
    return n.json();
  }
  // ─── Chat ────────────────────────────────────────────────────
  async startChat(t, n, a) {
    return this.request("/api/chat/sessions", {
      method: "POST",
      body: JSON.stringify({ message: t, user_name: n, user_email: a, platform: this.platformId })
    });
  }
  async sendChatMessage(t, n) {
    return this.request(`/api/chat/sessions/${t}/messages`, {
      method: "POST",
      body: JSON.stringify({ message: n })
    });
  }
  async getChatSession(t) {
    return this.request(`/api/chat/sessions/${t}`);
  }
  async listChatSessions(t) {
    return this.request(`/api/chat/sessions?email=${encodeURIComponent(t)}`);
  }
  async endChat(t, n, a) {
    return this.request(`/api/chat/sessions/${t}/end`, {
      method: "POST",
      body: JSON.stringify({ rating: n, feedback: a })
    });
  }
  async escalateChat(t) {
    return this.request(`/api/chat/sessions/${t}/escalate`, {
      method: "POST",
      body: JSON.stringify({})
    });
  }
  async sendCobrowseEvents(t, n, a) {
    return this.request(`/api/chat/sessions/${t}/cobrowse`, {
      method: "POST",
      body: JSON.stringify({ events: n, sequence: a })
    });
  }
}
const I = H(null);
function z() {
  const r = F(I);
  if (!r) throw new Error("useSupportContext must be used within <SupportProvider>");
  return r;
}
function Re({ config: r, user: t, children: n }) {
  const a = _(() => new Pe(r), [r]), s = _(() => ({ client: a, config: r, user: t }), [a, r, t]);
  return /* @__PURE__ */ e(I.Provider, { value: s, children: n });
}
function Be(r) {
  const { client: t, user: n } = z(), [a, s] = h([]), [d, c] = h(!0), [o, l] = h(null), i = w(async () => {
    c(!0), l(null);
    try {
      const b = await t.listTickets({
        reporter_email: n.email,
        status: r == null ? void 0 : r.status,
        ticket_type: r == null ? void 0 : r.ticket_type
      });
      s(b);
    } catch (b) {
      l(b instanceof Error ? b.message : "Failed to load tickets");
    } finally {
      c(!1);
    }
  }, [t, n.email, r == null ? void 0 : r.status, r == null ? void 0 : r.ticket_type]);
  return N(() => {
    i();
  }, [i]), { tickets: a, loading: d, error: o, refresh: i };
}
function Ie(r) {
  const { client: t } = z(), [n, a] = h(null), [s, d] = h([]), [c, o] = h(!0), [l, i] = h(null), b = w(async () => {
    if (r) {
      o(!0), i(null);
      try {
        const [u, v] = await Promise.all([
          t.getTicket(r),
          t.getTicketActivity(r)
        ]);
        a(u), d(v);
      } catch (u) {
        i(u instanceof Error ? u.message : "Failed to load ticket");
      } finally {
        o(!1);
      }
    }
  }, [t, r]);
  return N(() => {
    b();
  }, [b]), { ticket: n, activity: s, loading: c, error: l, refresh: b };
}
function Oe() {
  const { client: r, user: t } = z(), [n, a] = h(!1), [s, d] = h(null);
  return { createTicket: w(async (o) => {
    a(!0), d(null);
    try {
      return await r.createTicket({
        ...o,
        reporter_email: t.email,
        reporter_name: t.name
      });
    } catch (l) {
      return d(l instanceof Error ? l.message : "Failed to create ticket"), null;
    } finally {
      a(!1);
    }
  }, [r, t]), submitting: n, error: s };
}
function He() {
  const { client: r, user: t } = z(), [n, a] = h(!1), [s, d] = h(null);
  return { addComment: w(async (o, l) => {
    a(!0), d(null);
    try {
      return await r.addComment(o, {
        content: l,
        actor_email: t.email,
        actor_name: t.name
      }), !0;
    } catch (i) {
      return d(i instanceof Error ? i.message : "Failed to add comment"), !1;
    } finally {
      a(!1);
    }
  }, [r, t]), submitting: n, error: s };
}
function Fe() {
  const { client: r } = z(), [t, n] = h([]), [a, s] = h(!0), [d, c] = h(null), o = w(async () => {
    s(!0), c(null);
    try {
      const l = await r.getPublicReleases();
      n(l);
    } catch (l) {
      c(l instanceof Error ? l.message : "Failed to load release notes");
    } finally {
      s(!1);
    }
  }, [r]);
  return N(() => {
    o();
  }, [o]), { releases: t, loading: a, error: d, refresh: o };
}
function Ue() {
  const { client: r } = z(), [t, n] = h([]), [a, s] = h(!0), [d, c] = h(null), o = w(async () => {
    s(!0), c(null);
    try {
      const l = await r.getFeatures();
      n(l);
    } catch (l) {
      c(l instanceof Error ? l.message : "Failed to load features");
    } finally {
      s(!1);
    }
  }, [r]);
  return N(() => {
    o();
  }, [o]), { features: t, loading: a, error: d, refresh: o };
}
function je() {
  const { client: r, user: t } = z(), [n, a] = h(null), [s, d] = h(null), c = w(async (l) => {
    a(l), d(null);
    try {
      return await r.voteOnTicket(l, {
        user_email: t.email,
        user_name: t.name
      }), !0;
    } catch (i) {
      return d(i instanceof Error ? i.message : "Failed to vote"), !1;
    } finally {
      a(null);
    }
  }, [r, t]), o = w(async (l) => {
    a(l), d(null);
    try {
      return await r.removeVote(l), !0;
    } catch (i) {
      return d(i instanceof Error ? i.message : "Failed to remove vote"), !1;
    } finally {
      a(null);
    }
  }, [r]);
  return { vote: c, removeVote: o, voting: n, error: s };
}
function Ke() {
  const { client: r } = z(), [t, n] = h([]), [a, s] = h(!0), [d, c] = h(null), o = w(async () => {
    s(!0), c(null);
    try {
      const l = await r.getKBCategories();
      n(l);
    } catch (l) {
      c(l instanceof Error ? l.message : "Failed to load categories");
    } finally {
      s(!1);
    }
  }, [r]);
  return N(() => {
    o();
  }, [o]), { categories: t, loading: a, error: d, refresh: o };
}
function qe(r) {
  const { client: t } = z(), [n, a] = h([]), [s, d] = h(!0), [c, o] = h(null), l = w(async () => {
    d(!0), o(null);
    try {
      const i = await t.getKBArticles(r);
      a(i);
    } catch (i) {
      o(i instanceof Error ? i.message : "Failed to load articles");
    } finally {
      d(!1);
    }
  }, [t, r]);
  return N(() => {
    l();
  }, [l]), { articles: n, loading: s, error: c, refresh: l };
}
function Ve(r) {
  const { client: t } = z(), [n, a] = h(null), [s, d] = h(!0), [c, o] = h(null), l = w(async () => {
    if (r) {
      d(!0), o(null);
      try {
        const i = await t.getKBArticle(r);
        a(i);
      } catch (i) {
        o(i instanceof Error ? i.message : "Failed to load article");
      } finally {
        d(!1);
      }
    }
  }, [t, r]);
  return N(() => {
    l();
  }, [l]), { article: n, loading: s, error: c, refresh: l };
}
function De() {
  const { client: r } = z(), [t, n] = h([]), [a, s] = h(!1), [d, c] = h(null), o = w(async (l) => {
    if (!l.trim()) {
      n([]);
      return;
    }
    s(!0), c(null);
    try {
      const i = await r.searchKB(l);
      n(i);
    } catch (i) {
      c(i instanceof Error ? i.message : "Failed to search");
    } finally {
      s(!1);
    }
  }, [r]);
  return { results: t, loading: a, error: d, search: o };
}
const We = {
  hub: "Support",
  submit: "Submit a Ticket",
  tickets: "My Tickets",
  ticket: "Ticket",
  changelog: "What's New",
  features: "Feature Requests",
  kb: "Knowledge Base",
  "kb-article": "Article",
  chat: "Chat"
}, Je = [
  { id: "bug", label: "Report a Bug", desc: "Something not working? We'll fix it.", type: "bug_report" },
  { id: "feature", label: "Request a Feature", desc: "Have an idea? We want to hear it.", type: "feature_request" },
  { id: "help", label: "Get Help", desc: "Need assistance with something?", type: "service_request" }
];
function Ge({ onNav: r }) {
  const { config: t } = z();
  return /* @__PURE__ */ p("div", { className: "hb-sp-hub", children: [
    /* @__PURE__ */ p("div", { className: "hb-sp-hub-header", children: [
      /* @__PURE__ */ e("div", { className: "hb-sp-hub-title", children: "How can we help?" }),
      /* @__PURE__ */ p("div", { className: "hb-sp-hub-sub", children: [
        "Get support for ",
        t.platformName,
        "."
      ] })
    ] }),
    /* @__PURE__ */ e("div", { className: "hb-sp-hub-grid", children: Je.map((n) => /* @__PURE__ */ p("button", { className: "hb-sp-card", onClick: () => r({ id: "submit", ticketType: n.type }), children: [
      /* @__PURE__ */ e("div", { className: "hb-sp-card-label", children: n.label }),
      /* @__PURE__ */ e("div", { className: "hb-sp-card-desc", children: n.desc })
    ] }, n.id)) }),
    /* @__PURE__ */ p("div", { className: "hb-sp-hub-links", children: [
      /* @__PURE__ */ p("button", { className: "hb-sp-link-item", onClick: () => r({ id: "tickets" }), children: [
        /* @__PURE__ */ e("span", { children: "My Tickets" }),
        /* @__PURE__ */ e("span", { className: "hb-sp-chevron", children: "›" })
      ] }),
      /* @__PURE__ */ p("button", { className: "hb-sp-link-item", onClick: () => r({ id: "kb" }), children: [
        /* @__PURE__ */ e("span", { children: "Knowledge Base" }),
        /* @__PURE__ */ e("span", { className: "hb-sp-chevron", children: "›" })
      ] }),
      /* @__PURE__ */ p("button", { className: "hb-sp-link-item", onClick: () => r({ id: "changelog" }), children: [
        /* @__PURE__ */ e("span", { children: "What's New" }),
        /* @__PURE__ */ e("span", { className: "hb-sp-chevron", children: "›" })
      ] }),
      /* @__PURE__ */ p("button", { className: "hb-sp-link-item", onClick: () => r({ id: "features" }), children: [
        /* @__PURE__ */ e("span", { children: "Feature Requests" }),
        /* @__PURE__ */ e("span", { className: "hb-sp-chevron", children: "›" })
      ] })
    ] })
  ] });
}
const Ye = [
  { value: "bug_report", label: "Bug Report" },
  { value: "feature_request", label: "Feature Request" },
  { value: "service_request", label: "Service Request" }
], Xe = [
  { value: "low", label: "Low" },
  { value: "medium", label: "Medium" },
  { value: "high", label: "High" },
  { value: "critical", label: "Critical" }
], Qe = [
  { value: "cosmetic", label: "Cosmetic" },
  { value: "minor", label: "Minor" },
  { value: "major", label: "Major" },
  { value: "blocker", label: "Blocker" }
];
function Ze({ initialType: r, onNav: t }) {
  const [n, a] = h(r || "bug_report"), [s, d] = h(""), [c, o] = h(""), [l, i] = h("medium"), [b, u] = h("minor"), { createTicket: v, submitting: y, error: m } = Oe(), [k, g] = h(null);
  return k ? /* @__PURE__ */ p("div", { className: "hb-sp-success", children: [
    /* @__PURE__ */ e("div", { className: "hb-sp-success-icon", children: "✓" }),
    /* @__PURE__ */ e("div", { className: "hb-sp-success-title", children: "Ticket Submitted" }),
    /* @__PURE__ */ e("div", { className: "hb-sp-success-num", children: k }),
    /* @__PURE__ */ p("div", { className: "hb-sp-success-actions", children: [
      /* @__PURE__ */ e("button", { className: "hb-sp-btn hb-sp-btn-secondary", onClick: () => t({ id: "tickets" }), children: "View My Tickets" }),
      /* @__PURE__ */ e("button", { className: "hb-sp-btn hb-sp-btn-ghost", onClick: () => t({ id: "hub" }), children: "Back to Support" })
    ] })
  ] }) : /* @__PURE__ */ p("div", { className: "hb-sp-form-page", children: [
    /* @__PURE__ */ p("div", { className: "hb-sp-field", children: [
      /* @__PURE__ */ e("label", { className: "hb-sp-label", children: "Type" }),
      /* @__PURE__ */ e("div", { className: "hb-sp-type-row", children: Ye.map((f) => /* @__PURE__ */ e(
        "button",
        {
          type: "button",
          className: `hb-sp-type-btn${n === f.value ? " active" : ""}`,
          onClick: () => a(f.value),
          children: f.label
        },
        f.value
      )) })
    ] }),
    /* @__PURE__ */ p("div", { className: "hb-sp-field", children: [
      /* @__PURE__ */ e("label", { className: "hb-sp-label", htmlFor: "sp-title", children: "Title" }),
      /* @__PURE__ */ e(
        "input",
        {
          id: "sp-title",
          className: "hb-sp-input",
          value: s,
          onChange: (f) => d(f.target.value),
          placeholder: "Brief description...",
          maxLength: 200
        }
      ),
      /* @__PURE__ */ p("div", { className: "hb-sp-char-count", children: [
        s.length,
        "/200"
      ] })
    ] }),
    /* @__PURE__ */ p("div", { className: "hb-sp-field", children: [
      /* @__PURE__ */ e("label", { className: "hb-sp-label", htmlFor: "sp-desc", children: "Description" }),
      /* @__PURE__ */ e(
        "textarea",
        {
          id: "sp-desc",
          className: "hb-sp-textarea",
          value: c,
          onChange: (f) => o(f.target.value),
          placeholder: "Provide as much detail as possible...",
          rows: 6,
          maxLength: 5e3
        }
      ),
      /* @__PURE__ */ p("div", { className: "hb-sp-char-count", children: [
        c.length,
        "/5000"
      ] })
    ] }),
    /* @__PURE__ */ p("div", { className: "hb-sp-field", children: [
      /* @__PURE__ */ e("label", { className: "hb-sp-label", children: "Priority" }),
      /* @__PURE__ */ e("div", { className: "hb-sp-chip-row", children: Xe.map((f) => /* @__PURE__ */ e(
        "button",
        {
          type: "button",
          className: `hb-sp-chip${l === f.value ? " active" : ""}`,
          onClick: () => i(f.value),
          children: f.label
        },
        f.value
      )) })
    ] }),
    n === "bug_report" && /* @__PURE__ */ p("div", { className: "hb-sp-field", children: [
      /* @__PURE__ */ e("label", { className: "hb-sp-label", children: "Severity" }),
      /* @__PURE__ */ e("div", { className: "hb-sp-chip-row", children: Qe.map((f) => /* @__PURE__ */ e(
        "button",
        {
          type: "button",
          className: `hb-sp-chip${b === f.value ? " active" : ""}`,
          onClick: () => u(f.value),
          children: f.label
        },
        f.value
      )) })
    ] }),
    m && /* @__PURE__ */ e("div", { className: "hb-sp-error", children: m }),
    /* @__PURE__ */ e(
      "button",
      {
        className: "hb-sp-btn hb-sp-btn-primary",
        disabled: y || !s.trim() || !c.trim(),
        onClick: async () => {
          const f = await v({
            ticket_type: n,
            title: s.trim(),
            description: c.trim(),
            priority: l,
            severity: n === "bug_report" ? b : void 0
          });
          f && g(f.ticket_number);
        },
        children: y ? "Submitting…" : "Submit Ticket"
      }
    )
  ] });
}
const O = {
  new: "New",
  triaged: "Triaged",
  in_progress: "In Progress",
  waiting_reporter: "Waiting on You",
  waiting_external: "Waiting",
  on_hold: "On Hold",
  resolved: "Resolved",
  closed: "Closed",
  cancelled: "Cancelled"
};
function et({ onNav: r }) {
  const [t, n] = h(""), { tickets: a, loading: s, error: d } = Be({ status: t || void 0 });
  return /* @__PURE__ */ p("div", { className: "hb-sp-list-page", children: [
    /* @__PURE__ */ p("div", { className: "hb-sp-filter-row", children: [
      [["", "All"], ["new,triaged,in_progress,waiting_reporter,waiting_external,on_hold", "Open"], ["resolved,closed", "Closed"]].map(([c, o]) => /* @__PURE__ */ e(
        "button",
        {
          className: `hb-sp-filter-btn${t === c ? " active" : ""}`,
          onClick: () => n(c),
          children: o
        },
        c
      )),
      /* @__PURE__ */ e("button", { className: "hb-sp-filter-btn hb-sp-filter-btn-new", onClick: () => r({ id: "submit" }), children: "+ New" })
    ] }),
    s ? /* @__PURE__ */ e("div", { className: "hb-sp-list", children: [0, 1, 2].map((c) => /* @__PURE__ */ e("div", { className: "hb-sp-skeleton" }, c)) }) : d ? /* @__PURE__ */ e("div", { className: "hb-sp-error", children: d }) : a.length === 0 ? /* @__PURE__ */ p("div", { className: "hb-sp-empty", children: [
      /* @__PURE__ */ e("div", { className: "hb-sp-empty-text", children: "No tickets found" }),
      /* @__PURE__ */ e("button", { className: "hb-sp-btn hb-sp-btn-secondary", onClick: () => r({ id: "submit" }), children: "Submit a Ticket" })
    ] }) : /* @__PURE__ */ e("div", { className: "hb-sp-list", children: a.map((c) => /* @__PURE__ */ p("button", { className: "hb-sp-list-item", onClick: () => r({ id: "ticket", ticketId: c.id }), children: [
      /* @__PURE__ */ p("div", { className: "hb-sp-ticket-top", children: [
        /* @__PURE__ */ e("span", { className: "hb-sp-ticket-num", children: c.ticket_number }),
        /* @__PURE__ */ e("span", { className: "hb-sp-badge", children: O[c.status] ?? c.status })
      ] }),
      /* @__PURE__ */ e("div", { className: "hb-sp-ticket-title", children: c.title }),
      /* @__PURE__ */ e("div", { className: "hb-sp-ticket-meta", children: new Date(c.created_at).toLocaleDateString(void 0, { month: "short", day: "numeric", year: "numeric" }) })
    ] }, c.id)) })
  ] });
}
function tt({ ticketId: r }) {
  const { ticket: t, activity: n, loading: a, error: s } = Ie(r), { addComment: d, submitting: c } = He(), [o, l] = h("");
  return a ? /* @__PURE__ */ e("div", { className: "hb-sp-loading", children: "Loading ticket…" }) : s || !t ? /* @__PURE__ */ e("div", { className: "hb-sp-error", children: s ?? "Ticket not found" }) : /* @__PURE__ */ p("div", { className: "hb-sp-detail-page", children: [
    /* @__PURE__ */ p("div", { className: "hb-sp-detail-header", children: [
      /* @__PURE__ */ e("span", { className: "hb-sp-ticket-num", children: t.ticket_number }),
      /* @__PURE__ */ e("span", { className: "hb-sp-badge", children: O[t.status] ?? t.status })
    ] }),
    /* @__PURE__ */ e("div", { className: "hb-sp-detail-title", children: t.title }),
    /* @__PURE__ */ e("div", { className: "hb-sp-detail-desc", children: t.description }),
    n.length > 0 && /* @__PURE__ */ p("div", { className: "hb-sp-activity", children: [
      /* @__PURE__ */ e("div", { className: "hb-sp-activity-title", children: "Activity" }),
      n.filter((i) => !i.is_internal).map((i) => /* @__PURE__ */ p("div", { className: "hb-sp-activity-item", children: [
        /* @__PURE__ */ e("div", { className: "hb-sp-activity-actor", children: i.actor_name }),
        i.content && /* @__PURE__ */ e("div", { className: "hb-sp-activity-content", children: i.content }),
        /* @__PURE__ */ e("div", { className: "hb-sp-activity-time", children: new Date(i.created_at).toLocaleString() })
      ] }, i.id))
    ] }),
    /* @__PURE__ */ p("div", { className: "hb-sp-reply", children: [
      /* @__PURE__ */ e(
        "textarea",
        {
          className: "hb-sp-textarea",
          rows: 3,
          placeholder: "Add a comment…",
          value: o,
          onChange: (i) => l(i.target.value)
        }
      ),
      /* @__PURE__ */ e(
        "button",
        {
          className: "hb-sp-btn hb-sp-btn-primary",
          disabled: c || !o.trim(),
          onClick: async () => {
            await d(t.id, o.trim()) && l("");
          },
          children: c ? "Sending…" : "Send"
        }
      )
    ] })
  ] });
}
function rt() {
  const { releases: r, loading: t, error: n } = Fe();
  return t ? /* @__PURE__ */ e("div", { className: "hb-sp-loading", children: "Loading releases…" }) : n ? /* @__PURE__ */ e("div", { className: "hb-sp-error", children: n }) : r.length === 0 ? /* @__PURE__ */ e("div", { className: "hb-sp-empty", children: /* @__PURE__ */ e("div", { className: "hb-sp-empty-text", children: "No releases yet." }) }) : /* @__PURE__ */ e("div", { className: "hb-sp-list-page", children: r.map((a, s) => /* @__PURE__ */ p("div", { className: "hb-sp-release", children: [
    /* @__PURE__ */ p("div", { className: "hb-sp-release-header", children: [
      /* @__PURE__ */ p("span", { className: "hb-sp-release-ver", children: [
        "v",
        a.version
      ] }),
      /* @__PURE__ */ e("span", { className: "hb-sp-release-date", children: new Date(a.released_date).toLocaleDateString(void 0, { month: "short", day: "numeric", year: "numeric" }) })
    ] }),
    /* @__PURE__ */ e("div", { className: "hb-sp-release-title", children: a.title }),
    /* @__PURE__ */ e("div", { className: "hb-sp-release-notes", children: a.release_notes })
  ] }, s)) });
}
const nt = {
  proposed: "Proposed",
  planned: "Planned",
  in_progress: "In Progress",
  shipped: "Shipped",
  cancelled: "Cancelled"
};
function it() {
  const { features: r, loading: t, error: n } = Ue(), { vote: a, voting: s } = je(), [d, c] = h(/* @__PURE__ */ new Set());
  return t ? /* @__PURE__ */ e("div", { className: "hb-sp-loading", children: "Loading features…" }) : n ? /* @__PURE__ */ e("div", { className: "hb-sp-error", children: n }) : r.length === 0 ? /* @__PURE__ */ e("div", { className: "hb-sp-empty", children: /* @__PURE__ */ e("div", { className: "hb-sp-empty-text", children: "No feature requests yet." }) }) : /* @__PURE__ */ e("div", { className: "hb-sp-list-page", children: r.map((o) => {
    var l;
    return /* @__PURE__ */ p("div", { className: "hb-sp-feature-item", children: [
      /* @__PURE__ */ p("div", { className: "hb-sp-feature-body", children: [
        /* @__PURE__ */ e("div", { className: "hb-sp-feature-title", children: o.title }),
        /* @__PURE__ */ e("div", { className: "hb-sp-feature-desc", children: o.description }),
        /* @__PURE__ */ e("span", { className: "hb-sp-badge", children: nt[o.status] ?? o.status })
      ] }),
      /* @__PURE__ */ p(
        "button",
        {
          className: `hb-sp-vote-btn${d.has(o.id) ? " voted" : ""}`,
          disabled: s === o.id,
          onClick: async () => {
            await a(o.id) && c((b) => /* @__PURE__ */ new Set([...b, o.id]));
          },
          children: [
            "▲ ",
            ((l = o.tags) == null ? void 0 : l.length) ?? 0
          ]
        }
      )
    ] }, o.id);
  }) });
}
function at({ onNav: r, category: t }) {
  const { categories: n, loading: a } = Ke(), { articles: s, loading: d } = qe(t), { search: c, results: o, loading: l } = De(), [i, b] = h(""), u = M(null), v = (m) => {
    b(m), u.current && clearTimeout(u.current), u.current = setTimeout(() => c(m), 300);
  }, y = i.trim().length > 0;
  return /* @__PURE__ */ p("div", { className: "hb-sp-list-page", children: [
    /* @__PURE__ */ e("div", { className: "hb-sp-search-row", children: /* @__PURE__ */ e(
      "input",
      {
        className: "hb-sp-input",
        placeholder: "Search knowledge base…",
        value: i,
        onChange: (m) => v(m.target.value)
      }
    ) }),
    y ? l ? /* @__PURE__ */ e("div", { className: "hb-sp-loading", children: "Searching…" }) : o.length === 0 ? /* @__PURE__ */ e("div", { className: "hb-sp-empty", children: /* @__PURE__ */ p("div", { className: "hb-sp-empty-text", children: [
      'No results for "',
      i,
      '"'
    ] }) }) : /* @__PURE__ */ e("div", { className: "hb-sp-list", children: o.map((m) => /* @__PURE__ */ p("button", { className: "hb-sp-list-item", onClick: () => r({ id: "kb-article", slug: m.slug }), children: [
      /* @__PURE__ */ e("div", { className: "hb-sp-ticket-title", children: m.title }),
      m.excerpt && /* @__PURE__ */ e("div", { className: "hb-sp-ticket-meta", children: m.excerpt })
    ] }, m.id)) }) : /* @__PURE__ */ p($, { children: [
      !t && !a && n.length > 0 && /* @__PURE__ */ e("div", { className: "hb-sp-kb-cats", children: n.map((m) => /* @__PURE__ */ p("button", { className: "hb-sp-kb-cat", onClick: () => r({ id: "kb", category: m.slug }), children: [
        /* @__PURE__ */ e("span", { children: m.name }),
        /* @__PURE__ */ e("span", { className: "hb-sp-kb-cat-count", children: m.article_count })
      ] }, m.id)) }),
      d ? /* @__PURE__ */ e("div", { className: "hb-sp-loading", children: "Loading…" }) : s.length === 0 ? /* @__PURE__ */ e("div", { className: "hb-sp-empty", children: /* @__PURE__ */ e("div", { className: "hb-sp-empty-text", children: "No articles in this category." }) }) : /* @__PURE__ */ e("div", { className: "hb-sp-list", children: s.map((m) => /* @__PURE__ */ p("button", { className: "hb-sp-list-item", onClick: () => r({ id: "kb-article", slug: m.slug }), children: [
        /* @__PURE__ */ e("div", { className: "hb-sp-ticket-title", children: m.title }),
        m.excerpt && /* @__PURE__ */ e("div", { className: "hb-sp-ticket-meta", children: m.excerpt })
      ] }, m.id)) })
    ] })
  ] });
}
function ot({ slug: r }) {
  const { article: t, loading: n, error: a } = Ve(r);
  return n ? /* @__PURE__ */ e("div", { className: "hb-sp-loading", children: "Loading article…" }) : a || !t ? /* @__PURE__ */ e("div", { className: "hb-sp-error", children: a ?? "Article not found" }) : /* @__PURE__ */ p("div", { className: "hb-sp-detail-page", children: [
    /* @__PURE__ */ e("div", { className: "hb-sp-detail-title", children: t.title }),
    /* @__PURE__ */ e(
      "div",
      {
        className: "hb-sp-article-content",
        dangerouslySetInnerHTML: { __html: t.content }
      }
    )
  ] });
}
function st({ page: r, onNav: t }) {
  return r.id === "hub" ? /* @__PURE__ */ e(Ge, { onNav: t }) : r.id === "submit" ? /* @__PURE__ */ e(Ze, { initialType: r.ticketType, onNav: t }) : r.id === "tickets" ? /* @__PURE__ */ e(et, { onNav: t }) : r.id === "ticket" ? /* @__PURE__ */ e(tt, { ticketId: r.ticketId }) : r.id === "changelog" ? /* @__PURE__ */ e(rt, {}) : r.id === "features" ? /* @__PURE__ */ e(it, {}) : r.id === "kb" ? /* @__PURE__ */ e(at, { onNav: t, category: r.category }) : r.id === "kb-article" ? /* @__PURE__ */ e(ot, { slug: r.slug }) : r.id === "chat" ? /* @__PURE__ */ e("div", { className: "hb-sp-empty", children: /* @__PURE__ */ e("div", { className: "hb-sp-empty-text", children: "Live chat coming soon." }) }) : null;
}
function lt({ config: r, user: t }) {
  const [n, a] = h(!1), [s, d] = h({ id: "hub" }), [c, o] = h([]), l = M(null), i = w((k) => {
    o((g) => [...g, s]), d(k), l.current && (l.current.scrollTop = 0);
  }, [s]), b = w(() => {
    o((k) => {
      const g = [...k], f = g.pop();
      return f && d(f), g;
    }), l.current && (l.current.scrollTop = 0);
  }, []), u = w(() => {
    a(!1), setTimeout(() => {
      d({ id: "hub" }), o([]);
    }, 200);
  }, []);
  N(() => {
    if (!n) return;
    const k = (g) => {
      g.key === "Escape" && u();
    };
    return document.addEventListener("keydown", k), () => document.removeEventListener("keydown", k);
  }, [n, u]);
  const v = c.length > 0, y = We[s.id] ?? "Support", m = n ? U(
    /* @__PURE__ */ e("div", { className: "hb-sp-overlay", onClick: u, "aria-hidden": "true", children: /* @__PURE__ */ p(
      "div",
      {
        className: `hb-sp-panel${n ? " open" : ""}`,
        onClick: (k) => k.stopPropagation(),
        role: "dialog",
        "aria-modal": "true",
        "aria-label": "Support",
        children: [
          /* @__PURE__ */ p("div", { className: "hb-sp-header", children: [
            v ? /* @__PURE__ */ e("button", { className: "hb-sp-back-btn", onClick: b, "aria-label": "Go back", children: "‹ Back" }) : /* @__PURE__ */ e("div", { className: "hb-sp-header-title", children: y }),
            v && /* @__PURE__ */ e("div", { className: "hb-sp-header-title", children: y }),
            /* @__PURE__ */ e("button", { className: "hb-sp-close-btn", onClick: u, "aria-label": "Close support panel", children: /* @__PURE__ */ e(B, { size: 16 }) })
          ] }),
          /* @__PURE__ */ e("div", { className: "hb-sp-content", ref: l, children: /* @__PURE__ */ e(Re, { config: r, user: t, children: /* @__PURE__ */ e(st, { page: s, onNav: i }) }) })
        ]
      }
    ) }),
    document.body
  ) : null;
  return /* @__PURE__ */ p($, { children: [
    /* @__PURE__ */ e(
      "button",
      {
        className: `hb-chat-btn${n ? " open" : ""}`,
        title: "Support",
        "aria-label": "Open support panel",
        "aria-expanded": n,
        onClick: () => a((k) => !k),
        children: /* @__PURE__ */ e(ne, { size: 18 })
      }
    ),
    m
  ] });
}
function ct() {
  return /* @__PURE__ */ e(
    "svg",
    {
      className: "hb-logo-bird",
      width: "22",
      height: "22",
      viewBox: "0 0 1200 1200",
      xmlns: "http://www.w3.org/2000/svg",
      "aria-hidden": "true",
      children: /* @__PURE__ */ e("g", { transform: "scale(13.5) translate(-5.5555488798353405, -5.55552503797743)", children: /* @__PURE__ */ e("g", { fill: "#f97316", children: /* @__PURE__ */ e("g", { transform: "translate(0,-952.36218)", children: /* @__PURE__ */ e("path", { d: "m 60.7828,964.36215 27.1809,0.8834 -27.1809,25.9958 z m -1.9745,1.4513 0,26.7845 -25.2681,0 c 8.6166,-8.7334 16.8796,-17.8103 25.2681,-26.7845 z m 27.7053,3.628 3.4864,1.1989 -12.5877,7.4768 z m -68.1835,2.9656 5.5226,0 12.8654,14.0705 -5.9854,6.1204 -12.4026,0 c 9e-4,-6.7347 0,-13.4597 0,-20.1909 z m -1.9746,1.2304 0,5.8364 -6.3555,0 z m 3.363,20.9796 38.627,0 -10.7675,29.43465 z m 39.0898,4.54286 0,41.20229 -12.5878,-6.8775 c 4.1972,-11.443 8.3886,-22.879 12.5878,-34.32479 z" }) }) }) })
    }
  );
}
function ut({
  currentProduct: r,
  apiBase: t,
  signalrEndpoint: n,
  session: a,
  onLogout: s,
  hubUrl: d = R,
  chatSlot: c,
  supportConfig: o
}) {
  const l = J(a);
  return l ? /* @__PURE__ */ e(
    dt,
    {
      currentProduct: r,
      apiBase: t,
      signalrEndpoint: n,
      session: l,
      onLogout: s,
      hubUrl: d,
      chatSlot: c,
      supportConfig: o
    }
  ) : null;
}
function dt({
  currentProduct: r,
  apiBase: t,
  signalrEndpoint: n,
  session: a,
  onLogout: s,
  hubUrl: d = R,
  chatSlot: c,
  supportConfig: o
}) {
  const { products: l } = G(t, a.tenantId ?? null), { notifications: i, unreadCount: b, markAllRead: u, markRead: v } = Y(
    t,
    n,
    a.tenantId ?? null
  ), [y, m] = h(!1), [k, g] = h(!1), [f, T] = h(!1), A = M(!1);
  return N(() => {
    if (A.current || (A.current = !0, document.getElementById("hb-styles"))) return;
    const S = document.createElement("style");
    S.id = "hb-styles", S.textContent = q, document.head.appendChild(S);
  }, []), N(() => {
    const C = document.body.style.paddingTop;
    return document.body.style.paddingTop = `${K}px`, () => {
      document.body.style.paddingTop = C;
    };
  }, []), /* @__PURE__ */ e("div", { className: "hb-root", role: "banner", children: /* @__PURE__ */ p("div", { className: "hb-bar", children: [
    /* @__PURE__ */ e(
      Se,
      {
        currentProduct: r,
        products: l,
        open: y,
        onToggle: () => {
          g(!1), T(!1), m((C) => !C);
        },
        onClose: () => m(!1),
        hubUrl: d
      }
    ),
    /* @__PURE__ */ p("a", { href: d, className: "hb-logo", "aria-label": "The One Family — Home", children: [
      /* @__PURE__ */ e(ct, {}),
      /* @__PURE__ */ e("span", { className: "hb-logo-name", children: "The One" })
    ] }),
    /* @__PURE__ */ e("div", { className: "hb-divider", "aria-hidden": "true" }),
    (() => {
      const C = l.find((S) => S.id === r);
      return C ? /* @__PURE__ */ e("span", { style: { fontSize: 14, fontWeight: 500, color: "#f1f5f9", whiteSpace: "nowrap" }, children: C.name }) : null;
    })(),
    /* @__PURE__ */ e("div", { style: { flex: 1 } }),
    /* @__PURE__ */ e($e, { apiBase: t, tenantId: (a == null ? void 0 : a.tenantId) ?? null }),
    /* @__PURE__ */ e("div", { style: { flex: 1 } }),
    o ? /* @__PURE__ */ e(
      lt,
      {
        config: o,
        user: {
          email: (a == null ? void 0 : a.email) ?? "",
          name: a ? `${a.firstName ?? ""} ${a.lastName ?? ""}`.trim() || a.email : ""
        }
      }
    ) : c ?? /* @__PURE__ */ e(
      "button",
      {
        className: "hb-chat-btn",
        title: "Chat — Coming Soon",
        "aria-label": "Chat — Coming Soon",
        children: /* @__PURE__ */ e(re, { size: 18 })
      }
    ),
    /* @__PURE__ */ e(
      Ee,
      {
        notifications: i,
        unreadCount: b,
        open: k,
        onToggle: () => {
          m(!1), T(!1), g((C) => !C);
        },
        onClose: () => g(!1),
        onMarkAllRead: u,
        onMarkRead: v,
        hubUrl: d
      }
    ),
    /* @__PURE__ */ e(
      Ae,
      {
        session: a,
        open: f,
        onToggle: () => {
          m(!1), g(!1), T((C) => !C);
        },
        onClose: () => T(!1),
        onLogout: s,
        hubUrl: d
      }
    )
  ] }) });
}
export {
  L as ALL_PRODUCTS,
  K as HUB_BAR_HEIGHT,
  R as HUB_URL,
  ut as HubBar,
  Ee as NotificationBell,
  Se as ProductSwitcher,
  j as SEVERITY_COLORS,
  lt as SupportButton,
  $e as UnifiedSearch,
  Ae as UserMenu,
  J as useHubSession,
  Y as useNotifications,
  G as useProducts,
  Te as useSearch
};
