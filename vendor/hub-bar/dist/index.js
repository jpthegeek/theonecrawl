import { jsx as e, jsxs as p, Fragment as $ } from "react/jsx-runtime";
import { useMemo as _, useState as h, useEffect as N, useRef as C, useCallback as w, createContext as H, useContext as F } from "react";
import { createPortal as U } from "react-dom";
const j = "https://my.theonefamily.app", L = [
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
  { id: "chms", name: "CHMS", url: "https://app.theonechms.com", icon: "church", color: "#10b981" },
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
  { id: "hub", name: "Hub", url: "https://my.theonefamily.app", icon: "layout-grid", color: "#8b5cf6" },
  { id: "ops-center", name: "Ops Center", url: "https://theoneops.app", icon: "activity", color: "#818cf8" }
], K = {
  info: "#60a5fa",
  success: "#34d399",
  warning: "#fbbf24",
  error: "#f87171"
}, q = 48, D = `
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
    animation: hb-fade-in 0.12s ease;
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
  }
  .hb-waffle-tile-icon.current {
    box-shadow: 0 0 0 2px currentColor;
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

  /* Responsive */
  @media (max-width: 640px) {
    .hb-search-wrap { display: none; }
    .hb-logo-name { display: none; }
    .hb-user-name { display: none; }
    .hb-waffle-panel { width: 100vw; border-radius: 0; }
  }

  /* Animations */
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
function W(r) {
  try {
    const t = r.split(".");
    if (t.length !== 3) return null;
    const n = t[1].replace(/-/g, "+").replace(/_/g, "/"), o = n + "=".repeat((4 - n.length % 4) % 4);
    return JSON.parse(atob(o));
  } catch {
    return null;
  }
}
function J(r, t, n) {
  if (t && n)
    return (t[0] + n[0]).toUpperCase();
  if (t)
    return t.slice(0, 2).toUpperCase();
  const o = r.split("@")[0].split(/[._-]/);
  return o.length >= 2 ? (o[0][0] + o[1][0]).toUpperCase() : r.slice(0, 2).toUpperCase();
}
function G(r) {
  return _(() => {
    if (r) return r;
    const t = V("hub_session");
    if (!t) return null;
    const n = W(t);
    if (!n) return null;
    const o = n.userId || n.sub || "", l = n.tenantId || n.tenant_id || "", c = n.tenantSlug || "", d = n.tenantName || c, s = n.email || "", a = n.role || "member", i = n.firstName, b = n.lastName;
    return !o || !s ? null : {
      userId: o,
      tenantId: l,
      tenantSlug: c,
      tenantName: d,
      email: s,
      role: a,
      firstName: i,
      lastName: b,
      initials: J(s, i, b)
    };
  }, [r]);
}
function Y(r, t) {
  const [n, o] = h([]), [l, c] = h(!1), [d, s] = h(null);
  return N(() => {
    if (!t) {
      o(L.map((i) => ({ ...i, active: !1 })));
      return;
    }
    c(!0), s(null);
    const a = new AbortController();
    return fetch(`${r}/api/bus/products?tenant_id=${encodeURIComponent(t)}`, {
      credentials: "include",
      signal: a.signal
    }).then((i) => {
      if (!i.ok) throw new Error(`Products API returned ${i.status}`);
      return i.json();
    }).then((i) => {
      const b = new Set(i.activeProductIds);
      o(
        L.map((f) => ({ ...f, active: b.has(f.id) }))
      ), c(!1);
    }).catch((i) => {
      i.name !== "AbortError" && (o(L.map((b) => ({ ...b, active: !1 }))), s(i.message), c(!1));
    }), () => a.abort();
  }, [r, t]), { products: n, loading: l, error: d };
}
function X(r, t, n) {
  const [o, l] = h([]), c = C(null);
  N(() => {
    if (!n) return;
    const i = new AbortController();
    return fetch(`${r}/api/bus/notifications?tenant_id=${encodeURIComponent(n)}&limit=20`, {
      credentials: "include",
      signal: i.signal
    }).then((b) => b.ok ? b.json() : Promise.resolve({ notifications: [] })).then((b) => {
      l(b.notifications ?? []);
    }).catch(() => {
    }), () => i.abort();
  }, [r, n]), N(() => {
    if (!t || !n) return;
    let i = !1;
    return (async () => {
      try {
        const { HubConnectionBuilder: b, LogLevel: f } = await import("./index-CrDahL0u.js"), k = new b().withUrl(`${t}?tenantId=${encodeURIComponent(n)}`).withAutomaticReconnect().configureLogging(f.Warning).build();
        k.on("notification", (y) => {
          l((m) => [y, ...m.slice(0, 49)]);
        }), k.on("notificationsRead", (y) => {
          const m = new Set(y);
          l(
            (v) => v.map((g) => m.has(g.id) ? { ...g, read: !0 } : g)
          );
        }), i || (await k.start(), c.current = k);
      } catch {
      }
    })(), () => {
      var b;
      i = !0, (b = c.current) == null || b.stop(), c.current = null;
    };
  }, [t, n]);
  const d = w((i) => {
    l(
      (b) => b.map((f) => f.id === i ? { ...f, read: !0 } : f)
    ), fetch(`${r}/api/bus/notifications/${encodeURIComponent(i)}/read`, {
      method: "POST",
      credentials: "include"
    }).catch(() => {
    });
  }, [r]), s = w(() => {
    l((i) => i.map((b) => ({ ...b, read: !0 }))), fetch(`${r}/api/bus/notifications/mark-all-read`, {
      method: "POST",
      credentials: "include"
    }).catch(() => {
    });
  }, [r]), a = o.filter((i) => !i.read).length;
  return { notifications: o, unreadCount: a, markAllRead: s, markRead: d };
}
const x = (r) => function({ size: n = 16, className: o, color: l = "currentColor" }) {
  const c = Array.isArray(r) ? r : [r];
  return /* @__PURE__ */ e(
    "svg",
    {
      xmlns: "http://www.w3.org/2000/svg",
      width: n,
      height: n,
      viewBox: "0 0 24 24",
      fill: "none",
      stroke: l,
      strokeWidth: "2",
      strokeLinecap: "round",
      strokeLinejoin: "round",
      className: o,
      children: c.map((d, s) => /* @__PURE__ */ e("path", { d }, s))
    }
  );
}, E = x("M21 21l-4.35-4.35M17 11A6 6 0 1 1 5 11a6 6 0 0 1 12 0z"), Q = x([
  "M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9",
  "M13.73 21a2 2 0 0 1-3.46 0"
]), R = x("M18 6 6 18M6 6l12 12"), Z = x(["M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2", "M12 3a4 4 0 1 0 0 8 4 4 0 0 0 0-8z"]), ee = x([
  "M12 20a8 8 0 1 0 0-16 8 8 0 0 0 0 16z",
  "M12 14a2 2 0 1 0 0-4 2 2 0 0 0 0 4z"
]), te = x([
  "M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4",
  "M16 17l5-5-5-5",
  "M21 12H9"
]), re = x([
  "M7 16V4m0 0L3 8m4-4 4 4",
  "M17 8v12m0 0 4-4m-4 4-4-4"
]), ne = x("M7.9 20A9 9 0 1 0 4 16.1L2 22z"), ie = x([
  "M12 22a10 10 0 1 0 0-20 10 10 0 0 0 0 20z",
  "M12 16a4 4 0 1 0 0-8 4 4 0 0 0 0 8z",
  "M4.93 4.93l4.24 4.24",
  "M14.83 14.83l4.24 4.24",
  "M14.83 9.17l4.24-4.24",
  "M14.83 9.17l3.53-3.53",
  "M4.93 19.07l4.24-4.24"
]), ae = x(["M16 20V4a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16", "M2 10a2 2 0 0 1 2-2h16a2 2 0 0 1 2 2v10H2z"]), oe = x(["M22 12h-4", "M6 12H2", "M12 6V2", "M12 22v-4", "M12 8a4 4 0 1 0 0 8 4 4 0 0 0 0-8z"]), se = x(["M2 3h20v14H2z", "M8 21h8", "M12 17v4"]), le = x(["M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z", "M9 12l2 2 4-4"]), ce = x(["M22 12H2", "M5.45 5.11 2 12v6a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2v-6l-3.45-6.89A2 2 0 0 0 16.76 4H7.24a2 2 0 0 0-1.79 1.11z", "M6 16h.01", "M10 16h.01"]), de = x(["M20 20a2 2 0 0 0 2-2V8a2 2 0 0 0-2-2h-7.9a2 2 0 0 1-1.69-.9L9.6 3.9A2 2 0 0 0 7.93 3H4a2 2 0 0 0-2 2v13a2 2 0 0 0 2 2z", "M8 10v4", "M12 10v2", "M16 10v6"]), pe = x(["M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z", "M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z"]), he = x("M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"), be = x(["M9.937 15.5A2 2 0 0 0 8.5 14.063l-6.135-1.582a.5.5 0 0 1 0-.962L8.5 9.936A2 2 0 0 0 9.937 8.5l1.582-6.135a.5.5 0 0 1 .963 0L14.063 8.5A2 2 0 0 0 15.5 9.937l6.135 1.581a.5.5 0 0 1 0 .964L15.5 14.063a2 2 0 0 0-1.437 1.437l-1.582 6.135a.5.5 0 0 1-.963 0z", "M20 3v4", "M22 5h-4"]), ue = x(["M23 7l-7 5 7 5V7z", "M14 5H3a2 2 0 0 0-2 2v10a2 2 0 0 0 2 2h11a2 2 0 0 0 2-2V7a2 2 0 0 0-2-2z"]), fe = x(["M18 22V8l-6-6-6 6v14", "M2 22h20", "M10 22v-4a2 2 0 0 1 4 0v4", "M12 7v5", "M10 9h4"]), me = x(["M6 22V4a2 2 0 0 1 2-2h8a2 2 0 0 1 2 2v18", "M6 12H4a2 2 0 0 1-2-2V7a2 2 0 0 1 2-2h2", "M18 12h2a2 2 0 0 1 2 2v3a2 2 0 0 1-2 2h-2", "M10 6h4", "M10 10h4", "M10 14h4", "M10 18h4"]), ge = x(["M14 18V6a2 2 0 0 0-2-2H4a2 2 0 0 0-2 2v11a1 1 0 0 0 1 1h1", "M15 18h6a1 1 0 0 0 1-1v-3.65a1 1 0 0 0-.22-.624l-3.48-4.35A1 1 0 0 0 17.52 8H14", "M7 18a2 2 0 1 0 0 4 2 2 0 0 0 0-4z", "M17 18a2 2 0 1 0 0 4 2 2 0 0 0 0-4z"]), xe = x(["M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2", "M9 3a4 4 0 1 0 0 8 4 4 0 0 0 0-8z", "M22 21v-2a4 4 0 0 0-3-3.87", "M16 3.13a4 4 0 0 1 0 7.75"]), ve = x(["M12 2a9 3 0 1 0 0 6 9 3 0 0 0 0-6z", "M21 12c0 1.66-4 3-9 3s-9-1.34-9-3", "M3 5v14c0 1.66 4 3 9 3s9-1.34 9-3V5"]), ye = x(["M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9", "M13.73 21a2 2 0 0 1-3.46 0", "M2 8c0-2.2.7-4.3 2-6", "M22 8a10 10 0 0 0-2-6"]), ke = x(["M13 4h3a2 2 0 0 1 2 2v14", "M2 20h3", "M13 20h9", "M10 12v.01", "M13 4.562v16.157a1 1 0 0 1-1.242.97L5 20V5.562a2 2 0 0 1 1.515-1.94l4.243-1.06A2 2 0 0 1 13 4.561z"]), we = x(["M16 2l5 5-14 14L2 16z", "M12 8l-2-2", "M8 12l-2-2"]), Ne = x(["M12 2a10 10 0 1 0 0 20 10 10 0 0 0 0-20z", "M2 12h20", "M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"]), ze = x(["M3 3h7v7H3z", "M14 3h7v7h-7z", "M14 14h7v7h-7z", "M3 14h7v7H3z"]), Se = x("M22 12h-4l-3 9L9 3l-3 9H2"), Ce = {
  briefcase: ae,
  target: oe,
  monitor: se,
  "shield-check": le,
  "hard-drive": ce,
  "folder-kanban": de,
  "book-open": pe,
  phone: he,
  sparkles: be,
  video: ue,
  church: fe,
  "building-2": me,
  truck: ge,
  users: xe,
  database: ve,
  "bell-ring": ye,
  "door-open": ke,
  scale: we,
  globe: Ne,
  search: E,
  "layout-grid": ze,
  activity: Se
};
function Me() {
  const r = [];
  for (let t = 0; t < 3; t++)
    for (let n = 0; n < 3; n++)
      r.push([6 + n * 7, 6 + t * 7]);
  return /* @__PURE__ */ e("svg", { width: "20", height: "20", viewBox: "0 0 24 24", fill: "none", xmlns: "http://www.w3.org/2000/svg", children: r.map(([t, n], o) => /* @__PURE__ */ e("circle", { cx: t, cy: n, r: "2", fill: "#94a3b8" }, o)) });
}
function P({ icon: r, size: t = 20 }) {
  const n = Ce[r];
  return n ? /* @__PURE__ */ e(n, { size: t, color: "#fff" }) : /* @__PURE__ */ e("span", { style: { color: "#fff", fontSize: 14, fontWeight: 700 }, children: r.charAt(0).toUpperCase() });
}
function Te({
  currentProduct: r,
  products: t,
  open: n,
  onToggle: o,
  onClose: l,
  hubUrl: c
}) {
  const d = C(null), s = t.filter((i) => i.active), a = t.filter((i) => !i.active);
  return N(() => {
    if (!n) return;
    function i(f) {
      d.current && !d.current.contains(f.target) && l();
    }
    function b(f) {
      f.key === "Escape" && l();
    }
    return document.addEventListener("mousedown", i), document.addEventListener("keydown", b), () => {
      document.removeEventListener("mousedown", i), document.removeEventListener("keydown", b);
    };
  }, [n, l]), /* @__PURE__ */ p("div", { className: "hb-switcher", ref: d, style: { position: "relative" }, children: [
    /* @__PURE__ */ e(
      "button",
      {
        className: `hb-waffle-btn${n ? " open" : ""}`,
        onClick: o,
        "aria-expanded": n,
        "aria-label": "App launcher",
        children: /* @__PURE__ */ e(Me, {})
      }
    ),
    n && /* @__PURE__ */ p("div", { className: "hb-waffle-panel", role: "menu", children: [
      /* @__PURE__ */ e("div", { className: "hb-waffle-header", children: "Apps" }),
      /* @__PURE__ */ e("div", { className: "hb-waffle-grid", children: s.map((i) => /* @__PURE__ */ p(
        "a",
        {
          href: i.url,
          className: "hb-waffle-tile",
          onClick: l,
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
      a.length > 0 && /* @__PURE__ */ p($, { children: [
        /* @__PURE__ */ e("div", { className: "hb-waffle-sep" }),
        /* @__PURE__ */ e("div", { className: "hb-waffle-section-label", children: "Available" }),
        /* @__PURE__ */ e("div", { className: "hb-waffle-grid", children: a.map((i) => /* @__PURE__ */ p(
          "a",
          {
            href: `${c}/products/${i.id}`,
            className: "hb-waffle-tile inactive",
            onClick: l,
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
          href: `${c}/products`,
          className: "hb-waffle-explore",
          onClick: l,
          children: "Explore all products →"
        }
      )
    ] })
  ] });
}
function $e(r, t, n, o = 200) {
  const [l, c] = h([]), [d, s] = h(!1), a = C(null);
  return N(() => {
    a.current && clearTimeout(a.current);
    const i = n.trim();
    if (!i || !t) {
      c([]), s(!1);
      return;
    }
    s(!0);
    const b = new AbortController();
    return a.current = setTimeout(() => {
      fetch(
        `${r}/api/bus/search?q=${encodeURIComponent(i)}&tenant_id=${encodeURIComponent(t)}`,
        { credentials: "include", signal: b.signal }
      ).then((f) => f.ok ? f.json() : Promise.resolve({ groups: [] })).then((f) => {
        c(f.groups ?? []), s(!1);
      }).catch((f) => {
        f.name !== "AbortError" && (c([]), s(!1));
      });
    }, o), () => {
      b.abort(), a.current && clearTimeout(a.current);
    };
  }, [r, t, n, o]), { results: l, loading: d };
}
function Le({ apiBase: r, tenantId: t }) {
  const [n, o] = h(!1), [l, c] = h(""), [d, s] = h(-1), a = C(null), { results: i, loading: b } = $e(r, t, l), f = i.flatMap((g) => g.results), k = w(() => {
    o(!0), c(""), s(-1), setTimeout(() => {
      var g;
      return (g = a.current) == null ? void 0 : g.focus();
    }, 0);
  }, []), y = w(() => {
    o(!1), c(""), s(-1);
  }, []);
  N(() => {
    function g(u) {
      (u.metaKey || u.ctrlKey) && u.key === "k" && (u.preventDefault(), n ? y() : k()), u.key === "Escape" && n && y();
    }
    return document.addEventListener("keydown", g), () => document.removeEventListener("keydown", g);
  }, [n, k, y]);
  function m(g) {
    if (g.key === "ArrowDown")
      g.preventDefault(), s((u) => Math.min(u + 1, f.length - 1));
    else if (g.key === "ArrowUp")
      g.preventDefault(), s((u) => Math.max(u - 1, -1));
    else if (g.key === "Enter" && d >= 0) {
      const u = f[d];
      u && (window.location.href = u.deepLink, y());
    }
  }
  const v = typeof navigator < "u" && /Mac/i.test(navigator.platform);
  return /* @__PURE__ */ p($, { children: [
    /* @__PURE__ */ e("div", { className: "hb-search-wrap", children: /* @__PURE__ */ p("button", { className: "hb-search-trigger", onClick: k, "aria-label": "Search (Cmd+K)", children: [
      /* @__PURE__ */ e(E, { size: 14 }),
      /* @__PURE__ */ e("span", { className: "hb-search-trigger-text", children: "Search everything..." }),
      /* @__PURE__ */ p("span", { className: "hb-kbd", children: [
        /* @__PURE__ */ e("kbd", { children: v ? "⌘" : "Ctrl" }),
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
                ref: a,
                className: "hb-search-input",
                placeholder: "Search everything...",
                value: l,
                onChange: (g) => {
                  c(g.target.value), s(-1);
                },
                onKeyDown: m,
                autoComplete: "off",
                spellCheck: !1
              }
            ),
            l && /* @__PURE__ */ e(
              "button",
              {
                style: { background: "none", border: "none", cursor: "pointer", padding: 0, color: "#64748b" },
                onClick: () => c(""),
                "aria-label": "Clear",
                children: /* @__PURE__ */ e(R, { size: 16 })
              }
            )
          ] }),
          /* @__PURE__ */ e(
            _e,
            {
              query: l,
              loading: b,
              results: i,
              focusedIndex: d,
              onNavigate: y
            }
          )
        ] })
      }
    )
  ] });
}
function _e({ query: r, loading: t, results: n, focusedIndex: o, onNavigate: l }) {
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
  let c = 0;
  return /* @__PURE__ */ e("div", { className: "hb-search-results", children: n.map((d) => /* @__PURE__ */ p("div", { children: [
    /* @__PURE__ */ p("div", { className: "hb-search-group-label", children: [
      d.productName,
      " — ",
      d.results.length,
      " result",
      d.results.length !== 1 ? "s" : ""
    ] }),
    d.results.map((s) => {
      const a = c++;
      return /* @__PURE__ */ p(
        "a",
        {
          href: s.deepLink,
          className: `hb-search-item${o === a ? " focused" : ""}`,
          onClick: l,
          children: [
            /* @__PURE__ */ e("div", { className: "hb-search-item-icon", children: s.icon ?? s.title.slice(0, 1).toUpperCase() }),
            /* @__PURE__ */ p("div", { className: "hb-search-item-body", children: [
              /* @__PURE__ */ e("div", { className: "hb-search-item-title", children: s.title }),
              s.subtitle && /* @__PURE__ */ e("div", { className: "hb-search-item-sub", children: s.subtitle })
            ] }),
            /* @__PURE__ */ e("span", { className: "hb-source-badge", children: d.productName })
          ]
        },
        s.id
      );
    })
  ] }, d.productId)) });
}
function Ee(r) {
  const t = Math.floor((Date.now() - new Date(r).getTime()) / 1e3);
  return t < 60 ? "just now" : t < 3600 ? `${Math.floor(t / 60)}m ago` : t < 86400 ? `${Math.floor(t / 3600)}h ago` : `${Math.floor(t / 86400)}d ago`;
}
function Ae({
  notifications: r,
  unreadCount: t,
  open: n,
  onToggle: o,
  onClose: l,
  onMarkAllRead: c,
  onMarkRead: d,
  hubUrl: s
}) {
  const a = C(null);
  return N(() => {
    if (!n) return;
    function i(b) {
      a.current && !a.current.contains(b.target) && l();
    }
    return document.addEventListener("mousedown", i), () => document.removeEventListener("mousedown", i);
  }, [n, l]), /* @__PURE__ */ p("div", { className: "hb-notif", ref: a, children: [
    /* @__PURE__ */ p(
      "button",
      {
        className: "hb-notif-btn",
        onClick: o,
        "aria-label": `Notifications${t > 0 ? ` (${t} unread)` : ""}`,
        "aria-expanded": n,
        children: [
          /* @__PURE__ */ e(Q, { size: 18 }),
          t > 0 && /* @__PURE__ */ e("span", { className: "hb-badge", "aria-hidden": "true", children: t > 99 ? "99+" : t })
        ]
      }
    ),
    n && /* @__PURE__ */ p("div", { className: "hb-notif-dropdown", role: "dialog", "aria-label": "Notifications", children: [
      /* @__PURE__ */ p("div", { className: "hb-notif-header", children: [
        /* @__PURE__ */ e("span", { className: "hb-notif-title", children: "Notifications" }),
        t > 0 && /* @__PURE__ */ e("button", { className: "hb-notif-mark-read", onClick: c, children: "Mark all read" })
      ] }),
      /* @__PURE__ */ e("div", { className: "hb-notif-list", role: "list", children: r.length === 0 ? /* @__PURE__ */ e("div", { className: "hb-notif-empty", children: "No notifications" }) : r.slice(0, 20).map((i) => /* @__PURE__ */ p(
        "a",
        {
          href: i.deepLink,
          className: `hb-notif-item${i.read ? "" : " unread"}`,
          onClick: () => {
            d(i.id), l();
          },
          role: "listitem",
          children: [
            /* @__PURE__ */ e(
              "span",
              {
                className: "hb-notif-icon",
                style: { background: K[i.severity] },
                "aria-hidden": "true"
              }
            ),
            /* @__PURE__ */ p("div", { className: "hb-notif-body", children: [
              /* @__PURE__ */ e("div", { className: "hb-notif-body-title", children: i.title }),
              /* @__PURE__ */ p("div", { className: "hb-notif-meta", children: [
                /* @__PURE__ */ e("span", { className: "hb-source-badge", children: i.productName }),
                /* @__PURE__ */ e("span", { className: "hb-notif-time", children: Ee(i.createdAt) })
              ] })
            ] })
          ]
        },
        i.id
      )) }),
      /* @__PURE__ */ e("div", { className: "hb-notif-footer", children: /* @__PURE__ */ e("a", { href: `${s}/notifications/settings`, onClick: l, children: "Notification Settings" }) })
    ] })
  ] });
}
function Pe({
  session: r,
  open: t,
  onToggle: n,
  onClose: o,
  onLogout: l,
  hubUrl: c
}) {
  const d = C(null);
  N(() => {
    if (!t) return;
    function a(i) {
      d.current && !d.current.contains(i.target) && o();
    }
    return document.addEventListener("mousedown", a), () => document.removeEventListener("mousedown", a);
  }, [t, o]);
  function s() {
    o(), l ? l() : window.location.href = `${c}/logout`;
  }
  return /* @__PURE__ */ p("div", { className: "hb-user", ref: d, children: [
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
          href: `${c}/profile`,
          className: "hb-menu-item",
          onClick: o,
          role: "menuitem",
          children: [
            /* @__PURE__ */ e(Z, { size: 14 }),
            "Profile"
          ]
        }
      ),
      /* @__PURE__ */ p(
        "a",
        {
          href: `${c}/settings`,
          className: "hb-menu-item",
          onClick: o,
          role: "menuitem",
          children: [
            /* @__PURE__ */ e(ee, { size: 14 }),
            "Hub Settings"
          ]
        }
      ),
      /* @__PURE__ */ e("div", { className: "hb-menu-sep" }),
      /* @__PURE__ */ p(
        "a",
        {
          href: `${c}/switch-tenant`,
          className: "hb-menu-item",
          onClick: o,
          role: "menuitem",
          children: [
            /* @__PURE__ */ e(re, { size: 14 }),
            "Switch Tenant"
          ]
        }
      ),
      /* @__PURE__ */ e("div", { className: "hb-menu-sep" }),
      /* @__PURE__ */ p(
        "button",
        {
          className: "hb-menu-item danger",
          onClick: s,
          role: "menuitem",
          children: [
            /* @__PURE__ */ e(te, { size: 14 }),
            "Log Out"
          ]
        }
      )
    ] })
  ] });
}
class Re {
  constructor(t) {
    this.baseUrl = t.apiBaseUrl.replace(/\/$/, ""), this.apiKey = t.apiKey, this.platformId = t.platformId;
  }
  async request(t, n = {}) {
    const o = `${this.baseUrl}${t}`, l = await fetch(o, {
      ...n,
      headers: {
        "Content-Type": "application/json",
        "X-Api-Key": this.apiKey,
        ...n.headers
      }
    });
    if (!l.ok) {
      const c = await l.text().catch(() => "");
      throw new Error(`Ops Center API error ${l.status}: ${c}`);
    }
    if (l.status !== 204)
      return l.json();
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
    const n = t ? `?category=${encodeURIComponent(t)}` : "", o = await fetch(`${this.baseUrl}/api/kb-public/${this.platformId}/articles${n}`);
    if (!o.ok) throw new Error(`Failed to fetch KB articles: ${o.status}`);
    return o.json();
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
  async startChat(t, n, o) {
    return this.request("/api/chat/sessions", {
      method: "POST",
      body: JSON.stringify({ message: t, user_name: n, user_email: o, platform: this.platformId })
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
  async endChat(t, n, o) {
    return this.request(`/api/chat/sessions/${t}/end`, {
      method: "POST",
      body: JSON.stringify({ rating: n, feedback: o })
    });
  }
  async escalateChat(t) {
    return this.request(`/api/chat/sessions/${t}/escalate`, {
      method: "POST",
      body: JSON.stringify({})
    });
  }
  async sendCobrowseEvents(t, n, o) {
    return this.request(`/api/chat/sessions/${t}/cobrowse`, {
      method: "POST",
      body: JSON.stringify({ events: n, sequence: o })
    });
  }
}
const B = H(null);
function z() {
  const r = F(B);
  if (!r) throw new Error("useSupportContext must be used within <SupportProvider>");
  return r;
}
function Be({ config: r, user: t, children: n }) {
  const o = _(() => new Re(r), [r]), l = _(() => ({ client: o, config: r, user: t }), [o, r, t]);
  return /* @__PURE__ */ e(B.Provider, { value: l, children: n });
}
function Ie(r) {
  const { client: t, user: n } = z(), [o, l] = h([]), [c, d] = h(!0), [s, a] = h(null), i = w(async () => {
    d(!0), a(null);
    try {
      const b = await t.listTickets({
        reporter_email: n.email,
        status: r == null ? void 0 : r.status,
        ticket_type: r == null ? void 0 : r.ticket_type
      });
      l(b);
    } catch (b) {
      a(b instanceof Error ? b.message : "Failed to load tickets");
    } finally {
      d(!1);
    }
  }, [t, n.email, r == null ? void 0 : r.status, r == null ? void 0 : r.ticket_type]);
  return N(() => {
    i();
  }, [i]), { tickets: o, loading: c, error: s, refresh: i };
}
function Oe(r) {
  const { client: t } = z(), [n, o] = h(null), [l, c] = h([]), [d, s] = h(!0), [a, i] = h(null), b = w(async () => {
    if (r) {
      s(!0), i(null);
      try {
        const [f, k] = await Promise.all([
          t.getTicket(r),
          t.getTicketActivity(r)
        ]);
        o(f), c(k);
      } catch (f) {
        i(f instanceof Error ? f.message : "Failed to load ticket");
      } finally {
        s(!1);
      }
    }
  }, [t, r]);
  return N(() => {
    b();
  }, [b]), { ticket: n, activity: l, loading: d, error: a, refresh: b };
}
function He() {
  const { client: r, user: t } = z(), [n, o] = h(!1), [l, c] = h(null);
  return { createTicket: w(async (s) => {
    o(!0), c(null);
    try {
      return await r.createTicket({
        ...s,
        reporter_email: t.email,
        reporter_name: t.name
      });
    } catch (a) {
      return c(a instanceof Error ? a.message : "Failed to create ticket"), null;
    } finally {
      o(!1);
    }
  }, [r, t]), submitting: n, error: l };
}
function Fe() {
  const { client: r, user: t } = z(), [n, o] = h(!1), [l, c] = h(null);
  return { addComment: w(async (s, a) => {
    o(!0), c(null);
    try {
      return await r.addComment(s, {
        content: a,
        actor_email: t.email,
        actor_name: t.name
      }), !0;
    } catch (i) {
      return c(i instanceof Error ? i.message : "Failed to add comment"), !1;
    } finally {
      o(!1);
    }
  }, [r, t]), submitting: n, error: l };
}
function Ue() {
  const { client: r } = z(), [t, n] = h([]), [o, l] = h(!0), [c, d] = h(null), s = w(async () => {
    l(!0), d(null);
    try {
      const a = await r.getPublicReleases();
      n(a);
    } catch (a) {
      d(a instanceof Error ? a.message : "Failed to load release notes");
    } finally {
      l(!1);
    }
  }, [r]);
  return N(() => {
    s();
  }, [s]), { releases: t, loading: o, error: c, refresh: s };
}
function je() {
  const { client: r } = z(), [t, n] = h([]), [o, l] = h(!0), [c, d] = h(null), s = w(async () => {
    l(!0), d(null);
    try {
      const a = await r.getFeatures();
      n(a);
    } catch (a) {
      d(a instanceof Error ? a.message : "Failed to load features");
    } finally {
      l(!1);
    }
  }, [r]);
  return N(() => {
    s();
  }, [s]), { features: t, loading: o, error: c, refresh: s };
}
function Ke() {
  const { client: r, user: t } = z(), [n, o] = h(null), [l, c] = h(null), d = w(async (a) => {
    o(a), c(null);
    try {
      return await r.voteOnTicket(a, {
        user_email: t.email,
        user_name: t.name
      }), !0;
    } catch (i) {
      return c(i instanceof Error ? i.message : "Failed to vote"), !1;
    } finally {
      o(null);
    }
  }, [r, t]), s = w(async (a) => {
    o(a), c(null);
    try {
      return await r.removeVote(a), !0;
    } catch (i) {
      return c(i instanceof Error ? i.message : "Failed to remove vote"), !1;
    } finally {
      o(null);
    }
  }, [r]);
  return { vote: d, removeVote: s, voting: n, error: l };
}
function qe() {
  const { client: r } = z(), [t, n] = h([]), [o, l] = h(!0), [c, d] = h(null), s = w(async () => {
    l(!0), d(null);
    try {
      const a = await r.getKBCategories();
      n(a);
    } catch (a) {
      d(a instanceof Error ? a.message : "Failed to load categories");
    } finally {
      l(!1);
    }
  }, [r]);
  return N(() => {
    s();
  }, [s]), { categories: t, loading: o, error: c, refresh: s };
}
function De(r) {
  const { client: t } = z(), [n, o] = h([]), [l, c] = h(!0), [d, s] = h(null), a = w(async () => {
    c(!0), s(null);
    try {
      const i = await t.getKBArticles(r);
      o(i);
    } catch (i) {
      s(i instanceof Error ? i.message : "Failed to load articles");
    } finally {
      c(!1);
    }
  }, [t, r]);
  return N(() => {
    a();
  }, [a]), { articles: n, loading: l, error: d, refresh: a };
}
function Ve(r) {
  const { client: t } = z(), [n, o] = h(null), [l, c] = h(!0), [d, s] = h(null), a = w(async () => {
    if (r) {
      c(!0), s(null);
      try {
        const i = await t.getKBArticle(r);
        o(i);
      } catch (i) {
        s(i instanceof Error ? i.message : "Failed to load article");
      } finally {
        c(!1);
      }
    }
  }, [t, r]);
  return N(() => {
    a();
  }, [a]), { article: n, loading: l, error: d, refresh: a };
}
function We() {
  const { client: r } = z(), [t, n] = h([]), [o, l] = h(!1), [c, d] = h(null), s = w(async (a) => {
    if (!a.trim()) {
      n([]);
      return;
    }
    l(!0), d(null);
    try {
      const i = await r.searchKB(a);
      n(i);
    } catch (i) {
      d(i instanceof Error ? i.message : "Failed to search");
    } finally {
      l(!1);
    }
  }, [r]);
  return { results: t, loading: o, error: c, search: s };
}
const Je = {
  hub: "Support",
  submit: "Submit a Ticket",
  tickets: "My Tickets",
  ticket: "Ticket",
  changelog: "What's New",
  features: "Feature Requests",
  kb: "Knowledge Base",
  "kb-article": "Article",
  chat: "Chat"
}, Ge = [
  { id: "bug", label: "Report a Bug", desc: "Something not working? We'll fix it.", type: "bug_report" },
  { id: "feature", label: "Request a Feature", desc: "Have an idea? We want to hear it.", type: "feature_request" },
  { id: "help", label: "Get Help", desc: "Need assistance with something?", type: "service_request" }
];
function Ye({ onNav: r }) {
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
    /* @__PURE__ */ e("div", { className: "hb-sp-hub-grid", children: Ge.map((n) => /* @__PURE__ */ p("button", { className: "hb-sp-card", onClick: () => r({ id: "submit", ticketType: n.type }), children: [
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
const Xe = [
  { value: "bug_report", label: "Bug Report" },
  { value: "feature_request", label: "Feature Request" },
  { value: "service_request", label: "Service Request" }
], Qe = [
  { value: "low", label: "Low" },
  { value: "medium", label: "Medium" },
  { value: "high", label: "High" },
  { value: "critical", label: "Critical" }
], Ze = [
  { value: "cosmetic", label: "Cosmetic" },
  { value: "minor", label: "Minor" },
  { value: "major", label: "Major" },
  { value: "blocker", label: "Blocker" }
];
function et({ initialType: r, onNav: t }) {
  const [n, o] = h(r || "bug_report"), [l, c] = h(""), [d, s] = h(""), [a, i] = h("medium"), [b, f] = h("minor"), { createTicket: k, submitting: y, error: m } = He(), [v, g] = h(null);
  return v ? /* @__PURE__ */ p("div", { className: "hb-sp-success", children: [
    /* @__PURE__ */ e("div", { className: "hb-sp-success-icon", children: "✓" }),
    /* @__PURE__ */ e("div", { className: "hb-sp-success-title", children: "Ticket Submitted" }),
    /* @__PURE__ */ e("div", { className: "hb-sp-success-num", children: v }),
    /* @__PURE__ */ p("div", { className: "hb-sp-success-actions", children: [
      /* @__PURE__ */ e("button", { className: "hb-sp-btn hb-sp-btn-secondary", onClick: () => t({ id: "tickets" }), children: "View My Tickets" }),
      /* @__PURE__ */ e("button", { className: "hb-sp-btn hb-sp-btn-ghost", onClick: () => t({ id: "hub" }), children: "Back to Support" })
    ] })
  ] }) : /* @__PURE__ */ p("div", { className: "hb-sp-form-page", children: [
    /* @__PURE__ */ p("div", { className: "hb-sp-field", children: [
      /* @__PURE__ */ e("label", { className: "hb-sp-label", children: "Type" }),
      /* @__PURE__ */ e("div", { className: "hb-sp-type-row", children: Xe.map((u) => /* @__PURE__ */ e(
        "button",
        {
          type: "button",
          className: `hb-sp-type-btn${n === u.value ? " active" : ""}`,
          onClick: () => o(u.value),
          children: u.label
        },
        u.value
      )) })
    ] }),
    /* @__PURE__ */ p("div", { className: "hb-sp-field", children: [
      /* @__PURE__ */ e("label", { className: "hb-sp-label", htmlFor: "sp-title", children: "Title" }),
      /* @__PURE__ */ e(
        "input",
        {
          id: "sp-title",
          className: "hb-sp-input",
          value: l,
          onChange: (u) => c(u.target.value),
          placeholder: "Brief description...",
          maxLength: 200
        }
      ),
      /* @__PURE__ */ p("div", { className: "hb-sp-char-count", children: [
        l.length,
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
          value: d,
          onChange: (u) => s(u.target.value),
          placeholder: "Provide as much detail as possible...",
          rows: 6,
          maxLength: 5e3
        }
      ),
      /* @__PURE__ */ p("div", { className: "hb-sp-char-count", children: [
        d.length,
        "/5000"
      ] })
    ] }),
    /* @__PURE__ */ p("div", { className: "hb-sp-field", children: [
      /* @__PURE__ */ e("label", { className: "hb-sp-label", children: "Priority" }),
      /* @__PURE__ */ e("div", { className: "hb-sp-chip-row", children: Qe.map((u) => /* @__PURE__ */ e(
        "button",
        {
          type: "button",
          className: `hb-sp-chip${a === u.value ? " active" : ""}`,
          onClick: () => i(u.value),
          children: u.label
        },
        u.value
      )) })
    ] }),
    n === "bug_report" && /* @__PURE__ */ p("div", { className: "hb-sp-field", children: [
      /* @__PURE__ */ e("label", { className: "hb-sp-label", children: "Severity" }),
      /* @__PURE__ */ e("div", { className: "hb-sp-chip-row", children: Ze.map((u) => /* @__PURE__ */ e(
        "button",
        {
          type: "button",
          className: `hb-sp-chip${b === u.value ? " active" : ""}`,
          onClick: () => f(u.value),
          children: u.label
        },
        u.value
      )) })
    ] }),
    m && /* @__PURE__ */ e("div", { className: "hb-sp-error", children: m }),
    /* @__PURE__ */ e(
      "button",
      {
        className: "hb-sp-btn hb-sp-btn-primary",
        disabled: y || !l.trim() || !d.trim(),
        onClick: async () => {
          const u = await k({
            ticket_type: n,
            title: l.trim(),
            description: d.trim(),
            priority: a,
            severity: n === "bug_report" ? b : void 0
          });
          u && g(u.ticket_number);
        },
        children: y ? "Submitting…" : "Submit Ticket"
      }
    )
  ] });
}
const I = {
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
function tt({ onNav: r }) {
  const [t, n] = h(""), { tickets: o, loading: l, error: c } = Ie({ status: t || void 0 });
  return /* @__PURE__ */ p("div", { className: "hb-sp-list-page", children: [
    /* @__PURE__ */ p("div", { className: "hb-sp-filter-row", children: [
      [["", "All"], ["new,triaged,in_progress,waiting_reporter,waiting_external,on_hold", "Open"], ["resolved,closed", "Closed"]].map(([d, s]) => /* @__PURE__ */ e(
        "button",
        {
          className: `hb-sp-filter-btn${t === d ? " active" : ""}`,
          onClick: () => n(d),
          children: s
        },
        d
      )),
      /* @__PURE__ */ e("button", { className: "hb-sp-filter-btn hb-sp-filter-btn-new", onClick: () => r({ id: "submit" }), children: "+ New" })
    ] }),
    l ? /* @__PURE__ */ e("div", { className: "hb-sp-list", children: [0, 1, 2].map((d) => /* @__PURE__ */ e("div", { className: "hb-sp-skeleton" }, d)) }) : c ? /* @__PURE__ */ e("div", { className: "hb-sp-error", children: c }) : o.length === 0 ? /* @__PURE__ */ p("div", { className: "hb-sp-empty", children: [
      /* @__PURE__ */ e("div", { className: "hb-sp-empty-text", children: "No tickets found" }),
      /* @__PURE__ */ e("button", { className: "hb-sp-btn hb-sp-btn-secondary", onClick: () => r({ id: "submit" }), children: "Submit a Ticket" })
    ] }) : /* @__PURE__ */ e("div", { className: "hb-sp-list", children: o.map((d) => /* @__PURE__ */ p("button", { className: "hb-sp-list-item", onClick: () => r({ id: "ticket", ticketId: d.id }), children: [
      /* @__PURE__ */ p("div", { className: "hb-sp-ticket-top", children: [
        /* @__PURE__ */ e("span", { className: "hb-sp-ticket-num", children: d.ticket_number }),
        /* @__PURE__ */ e("span", { className: "hb-sp-badge", children: I[d.status] ?? d.status })
      ] }),
      /* @__PURE__ */ e("div", { className: "hb-sp-ticket-title", children: d.title }),
      /* @__PURE__ */ e("div", { className: "hb-sp-ticket-meta", children: new Date(d.created_at).toLocaleDateString(void 0, { month: "short", day: "numeric", year: "numeric" }) })
    ] }, d.id)) })
  ] });
}
function rt({ ticketId: r }) {
  const { ticket: t, activity: n, loading: o, error: l } = Oe(r), { addComment: c, submitting: d } = Fe(), [s, a] = h("");
  return o ? /* @__PURE__ */ e("div", { className: "hb-sp-loading", children: "Loading ticket…" }) : l || !t ? /* @__PURE__ */ e("div", { className: "hb-sp-error", children: l ?? "Ticket not found" }) : /* @__PURE__ */ p("div", { className: "hb-sp-detail-page", children: [
    /* @__PURE__ */ p("div", { className: "hb-sp-detail-header", children: [
      /* @__PURE__ */ e("span", { className: "hb-sp-ticket-num", children: t.ticket_number }),
      /* @__PURE__ */ e("span", { className: "hb-sp-badge", children: I[t.status] ?? t.status })
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
          value: s,
          onChange: (i) => a(i.target.value)
        }
      ),
      /* @__PURE__ */ e(
        "button",
        {
          className: "hb-sp-btn hb-sp-btn-primary",
          disabled: d || !s.trim(),
          onClick: async () => {
            await c(t.id, s.trim()) && a("");
          },
          children: d ? "Sending…" : "Send"
        }
      )
    ] })
  ] });
}
function nt() {
  const { releases: r, loading: t, error: n } = Ue();
  return t ? /* @__PURE__ */ e("div", { className: "hb-sp-loading", children: "Loading releases…" }) : n ? /* @__PURE__ */ e("div", { className: "hb-sp-error", children: n }) : r.length === 0 ? /* @__PURE__ */ e("div", { className: "hb-sp-empty", children: /* @__PURE__ */ e("div", { className: "hb-sp-empty-text", children: "No releases yet." }) }) : /* @__PURE__ */ e("div", { className: "hb-sp-list-page", children: r.map((o, l) => /* @__PURE__ */ p("div", { className: "hb-sp-release", children: [
    /* @__PURE__ */ p("div", { className: "hb-sp-release-header", children: [
      /* @__PURE__ */ p("span", { className: "hb-sp-release-ver", children: [
        "v",
        o.version
      ] }),
      /* @__PURE__ */ e("span", { className: "hb-sp-release-date", children: new Date(o.released_date).toLocaleDateString(void 0, { month: "short", day: "numeric", year: "numeric" }) })
    ] }),
    /* @__PURE__ */ e("div", { className: "hb-sp-release-title", children: o.title }),
    /* @__PURE__ */ e("div", { className: "hb-sp-release-notes", children: o.release_notes })
  ] }, l)) });
}
const it = {
  proposed: "Proposed",
  planned: "Planned",
  in_progress: "In Progress",
  shipped: "Shipped",
  cancelled: "Cancelled"
};
function at() {
  const { features: r, loading: t, error: n } = je(), { vote: o, voting: l } = Ke(), [c, d] = h(/* @__PURE__ */ new Set());
  return t ? /* @__PURE__ */ e("div", { className: "hb-sp-loading", children: "Loading features…" }) : n ? /* @__PURE__ */ e("div", { className: "hb-sp-error", children: n }) : r.length === 0 ? /* @__PURE__ */ e("div", { className: "hb-sp-empty", children: /* @__PURE__ */ e("div", { className: "hb-sp-empty-text", children: "No feature requests yet." }) }) : /* @__PURE__ */ e("div", { className: "hb-sp-list-page", children: r.map((s) => {
    var a;
    return /* @__PURE__ */ p("div", { className: "hb-sp-feature-item", children: [
      /* @__PURE__ */ p("div", { className: "hb-sp-feature-body", children: [
        /* @__PURE__ */ e("div", { className: "hb-sp-feature-title", children: s.title }),
        /* @__PURE__ */ e("div", { className: "hb-sp-feature-desc", children: s.description }),
        /* @__PURE__ */ e("span", { className: "hb-sp-badge", children: it[s.status] ?? s.status })
      ] }),
      /* @__PURE__ */ p(
        "button",
        {
          className: `hb-sp-vote-btn${c.has(s.id) ? " voted" : ""}`,
          disabled: l === s.id,
          onClick: async () => {
            await o(s.id) && d((b) => /* @__PURE__ */ new Set([...b, s.id]));
          },
          children: [
            "▲ ",
            ((a = s.tags) == null ? void 0 : a.length) ?? 0
          ]
        }
      )
    ] }, s.id);
  }) });
}
function ot({ onNav: r, category: t }) {
  const { categories: n, loading: o } = qe(), { articles: l, loading: c } = De(t), { search: d, results: s, loading: a } = We(), [i, b] = h(""), f = C(null), k = (m) => {
    b(m), f.current && clearTimeout(f.current), f.current = setTimeout(() => d(m), 300);
  }, y = i.trim().length > 0;
  return /* @__PURE__ */ p("div", { className: "hb-sp-list-page", children: [
    /* @__PURE__ */ e("div", { className: "hb-sp-search-row", children: /* @__PURE__ */ e(
      "input",
      {
        className: "hb-sp-input",
        placeholder: "Search knowledge base…",
        value: i,
        onChange: (m) => k(m.target.value)
      }
    ) }),
    y ? a ? /* @__PURE__ */ e("div", { className: "hb-sp-loading", children: "Searching…" }) : s.length === 0 ? /* @__PURE__ */ e("div", { className: "hb-sp-empty", children: /* @__PURE__ */ p("div", { className: "hb-sp-empty-text", children: [
      'No results for "',
      i,
      '"'
    ] }) }) : /* @__PURE__ */ e("div", { className: "hb-sp-list", children: s.map((m) => /* @__PURE__ */ p("button", { className: "hb-sp-list-item", onClick: () => r({ id: "kb-article", slug: m.slug }), children: [
      /* @__PURE__ */ e("div", { className: "hb-sp-ticket-title", children: m.title }),
      m.excerpt && /* @__PURE__ */ e("div", { className: "hb-sp-ticket-meta", children: m.excerpt })
    ] }, m.id)) }) : /* @__PURE__ */ p($, { children: [
      !t && !o && n.length > 0 && /* @__PURE__ */ e("div", { className: "hb-sp-kb-cats", children: n.map((m) => /* @__PURE__ */ p("button", { className: "hb-sp-kb-cat", onClick: () => r({ id: "kb", category: m.slug }), children: [
        /* @__PURE__ */ e("span", { children: m.name }),
        /* @__PURE__ */ e("span", { className: "hb-sp-kb-cat-count", children: m.article_count })
      ] }, m.id)) }),
      c ? /* @__PURE__ */ e("div", { className: "hb-sp-loading", children: "Loading…" }) : l.length === 0 ? /* @__PURE__ */ e("div", { className: "hb-sp-empty", children: /* @__PURE__ */ e("div", { className: "hb-sp-empty-text", children: "No articles in this category." }) }) : /* @__PURE__ */ e("div", { className: "hb-sp-list", children: l.map((m) => /* @__PURE__ */ p("button", { className: "hb-sp-list-item", onClick: () => r({ id: "kb-article", slug: m.slug }), children: [
        /* @__PURE__ */ e("div", { className: "hb-sp-ticket-title", children: m.title }),
        m.excerpt && /* @__PURE__ */ e("div", { className: "hb-sp-ticket-meta", children: m.excerpt })
      ] }, m.id)) })
    ] })
  ] });
}
function st({ slug: r }) {
  const { article: t, loading: n, error: o } = Ve(r);
  return n ? /* @__PURE__ */ e("div", { className: "hb-sp-loading", children: "Loading article…" }) : o || !t ? /* @__PURE__ */ e("div", { className: "hb-sp-error", children: o ?? "Article not found" }) : /* @__PURE__ */ p("div", { className: "hb-sp-detail-page", children: [
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
function lt({ page: r, onNav: t }) {
  return r.id === "hub" ? /* @__PURE__ */ e(Ye, { onNav: t }) : r.id === "submit" ? /* @__PURE__ */ e(et, { initialType: r.ticketType, onNav: t }) : r.id === "tickets" ? /* @__PURE__ */ e(tt, { onNav: t }) : r.id === "ticket" ? /* @__PURE__ */ e(rt, { ticketId: r.ticketId }) : r.id === "changelog" ? /* @__PURE__ */ e(nt, {}) : r.id === "features" ? /* @__PURE__ */ e(at, {}) : r.id === "kb" ? /* @__PURE__ */ e(ot, { onNav: t, category: r.category }) : r.id === "kb-article" ? /* @__PURE__ */ e(st, { slug: r.slug }) : r.id === "chat" ? /* @__PURE__ */ e("div", { className: "hb-sp-empty", children: /* @__PURE__ */ e("div", { className: "hb-sp-empty-text", children: "Live chat coming soon." }) }) : null;
}
function ct({ config: r, user: t }) {
  const [n, o] = h(!1), [l, c] = h({ id: "hub" }), [d, s] = h([]), a = C(null), i = w((v) => {
    s((g) => [...g, l]), c(v), a.current && (a.current.scrollTop = 0);
  }, [l]), b = w(() => {
    s((v) => {
      const g = [...v], u = g.pop();
      return u && c(u), g;
    }), a.current && (a.current.scrollTop = 0);
  }, []), f = w(() => {
    o(!1), setTimeout(() => {
      c({ id: "hub" }), s([]);
    }, 200);
  }, []);
  N(() => {
    if (!n) return;
    const v = (g) => {
      g.key === "Escape" && f();
    };
    return document.addEventListener("keydown", v), () => document.removeEventListener("keydown", v);
  }, [n, f]);
  const k = d.length > 0, y = Je[l.id] ?? "Support", m = n ? U(
    /* @__PURE__ */ e("div", { className: "hb-sp-overlay", onClick: f, "aria-hidden": "true", children: /* @__PURE__ */ p(
      "div",
      {
        className: `hb-sp-panel${n ? " open" : ""}`,
        onClick: (v) => v.stopPropagation(),
        role: "dialog",
        "aria-modal": "true",
        "aria-label": "Support",
        children: [
          /* @__PURE__ */ p("div", { className: "hb-sp-header", children: [
            k ? /* @__PURE__ */ e("button", { className: "hb-sp-back-btn", onClick: b, "aria-label": "Go back", children: "‹ Back" }) : /* @__PURE__ */ e("div", { className: "hb-sp-header-title", children: y }),
            k && /* @__PURE__ */ e("div", { className: "hb-sp-header-title", children: y }),
            /* @__PURE__ */ e("button", { className: "hb-sp-close-btn", onClick: f, "aria-label": "Close support panel", children: /* @__PURE__ */ e(R, { size: 16 }) })
          ] }),
          /* @__PURE__ */ e("div", { className: "hb-sp-content", ref: a, children: /* @__PURE__ */ e(Be, { config: r, user: t, children: /* @__PURE__ */ e(lt, { page: l, onNav: i }) }) })
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
        onClick: () => o((v) => !v),
        children: /* @__PURE__ */ e(ie, { size: 18 })
      }
    ),
    m
  ] });
}
function dt() {
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
  session: o,
  onLogout: l,
  hubUrl: c = j,
  chatSlot: d,
  supportConfig: s
}) {
  const a = G(o), { products: i } = Y(t, (a == null ? void 0 : a.tenantId) ?? null), { notifications: b, unreadCount: f, markAllRead: k, markRead: y } = X(
    t,
    n,
    (a == null ? void 0 : a.tenantId) ?? null
  ), [m, v] = h(!1), [g, u] = h(!1), [O, T] = h(!1), A = C(!1);
  return N(() => {
    if (A.current || (A.current = !0, document.getElementById("hb-styles"))) return;
    const M = document.createElement("style");
    M.id = "hb-styles", M.textContent = D, document.head.appendChild(M);
  }, []), N(() => {
    const S = document.body.style.paddingTop;
    return document.body.style.paddingTop = `${q}px`, () => {
      document.body.style.paddingTop = S;
    };
  }, []), /* @__PURE__ */ e("div", { className: "hb-root", role: "banner", children: /* @__PURE__ */ p("div", { className: "hb-bar", children: [
    /* @__PURE__ */ e(
      Te,
      {
        currentProduct: r,
        products: i,
        open: m,
        onToggle: () => {
          u(!1), T(!1), v((S) => !S);
        },
        onClose: () => v(!1),
        hubUrl: c
      }
    ),
    /* @__PURE__ */ p("a", { href: c, className: "hb-logo", "aria-label": "The One Family — Home", children: [
      /* @__PURE__ */ e(dt, {}),
      /* @__PURE__ */ e("span", { className: "hb-logo-name", children: "The One" })
    ] }),
    /* @__PURE__ */ e("div", { className: "hb-divider", "aria-hidden": "true" }),
    (() => {
      const S = i.find((M) => M.id === r);
      return S ? /* @__PURE__ */ e("span", { style: { fontSize: 14, fontWeight: 500, color: "#f1f5f9", whiteSpace: "nowrap" }, children: S.name }) : null;
    })(),
    /* @__PURE__ */ e("div", { style: { flex: 1 } }),
    /* @__PURE__ */ e(Le, { apiBase: t, tenantId: (a == null ? void 0 : a.tenantId) ?? null }),
    /* @__PURE__ */ e("div", { style: { flex: 1 } }),
    s ? /* @__PURE__ */ e(
      ct,
      {
        config: s,
        user: {
          email: (a == null ? void 0 : a.email) ?? "",
          name: a ? `${a.firstName ?? ""} ${a.lastName ?? ""}`.trim() || a.email : ""
        }
      }
    ) : d ?? /* @__PURE__ */ e(
      "button",
      {
        className: "hb-chat-btn",
        title: "Chat — Coming Soon",
        "aria-label": "Chat — Coming Soon",
        children: /* @__PURE__ */ e(ne, { size: 18 })
      }
    ),
    /* @__PURE__ */ e(
      Ae,
      {
        notifications: b,
        unreadCount: f,
        open: g,
        onToggle: () => {
          v(!1), T(!1), u((S) => !S);
        },
        onClose: () => u(!1),
        onMarkAllRead: k,
        onMarkRead: y,
        hubUrl: c
      }
    ),
    a ? /* @__PURE__ */ e(
      Pe,
      {
        session: a,
        open: O,
        onToggle: () => {
          v(!1), u(!1), T((S) => !S);
        },
        onClose: () => T(!1),
        onLogout: l,
        hubUrl: c
      }
    ) : /* @__PURE__ */ e(
      "a",
      {
        href: `${c}/login`,
        style: {
          fontSize: 13,
          color: "#f97316",
          fontWeight: 500,
          padding: "4px 10px",
          borderRadius: 6,
          textDecoration: "none"
        },
        children: "Sign In"
      }
    )
  ] }) });
}
export {
  L as ALL_PRODUCTS,
  q as HUB_BAR_HEIGHT,
  j as HUB_URL,
  ut as HubBar,
  Ae as NotificationBell,
  Te as ProductSwitcher,
  K as SEVERITY_COLORS,
  ct as SupportButton,
  Le as UnifiedSearch,
  Pe as UserMenu,
  G as useHubSession,
  X as useNotifications,
  Y as useProducts,
  $e as useSearch
};
