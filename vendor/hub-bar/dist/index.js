import { jsx as e, jsxs as c, Fragment as q } from "react/jsx-runtime";
import { useMemo as Y, useState as h, useEffect as M, useRef as A, useCallback as j, createContext as ce, useContext as de } from "react";
import { createPortal as re } from "react-dom";
const ie = "https://my.theonestack.com", W = [
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
  { id: "brand", name: "Brand", url: "https://app.theonebrand.app", icon: "palette", color: "#e11d48" },
  { id: "migrate", name: "Migrate", url: "https://app.theonemigrate.app", icon: "arrow-right-left", color: "#0891b2" },
  { id: "relay", name: "Relay", url: "https://app.theonerelay.app", icon: "mail", color: "#f97316" },
  { id: "code", name: "Code", url: "https://app.theonecode.app", icon: "shield-check", color: "#06b6d4" },
  { id: "hub", name: "Hub", url: "https://my.theonestack.com", icon: "layout-grid", color: "#8b5cf6" },
  { id: "ops-center", name: "Ops Center", url: "https://theoneops.app", icon: "activity", color: "#818cf8" }
], Q = {
  info: "#60a5fa",
  success: "#34d399",
  warning: "#fbbf24",
  error: "#f87171"
}, pe = 48, he = `
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
`;
function be(n) {
  if (typeof document > "u") return null;
  const t = document.cookie.match(new RegExp("(?:^|;\\s*)" + n + "=([^;]*)"));
  if (!t) return null;
  try {
    return decodeURIComponent(t[1]);
  } catch {
    return null;
  }
}
function ue(n) {
  try {
    const t = n.split(".");
    if (t.length !== 3) return null;
    const r = t[1].replace(/-/g, "+").replace(/_/g, "/"), i = r + "=".repeat((4 - r.length % 4) % 4);
    return JSON.parse(atob(i));
  } catch {
    return null;
  }
}
function fe(n, t, r) {
  if (t && r)
    return (t[0] + r[0]).toUpperCase();
  if (t)
    return t.slice(0, 2).toUpperCase();
  const i = n.split("@")[0].split(/[._-]/);
  return i.length >= 2 ? (i[0][0] + i[1][0]).toUpperCase() : n.slice(0, 2).toUpperCase();
}
function me(n) {
  return Y(() => {
    if (n) return n;
    const t = be("hub_session");
    if (!t) return null;
    const r = ue(t);
    if (!r) return null;
    const i = r.userId || r.sub || "", l = r.tenantId || r.tenant_id || "", d = r.tenantSlug || "", p = r.tenantName || d, a = r.email || "", s = r.role || "member", o = r.orgRole, f = r.entitlements, b = r.firstName, y = r.lastName;
    return !i || !a ? null : {
      userId: i,
      tenantId: l,
      tenantSlug: d,
      tenantName: p,
      email: a,
      role: s,
      orgRole: o,
      entitlements: f,
      firstName: b,
      lastName: y,
      initials: fe(a, b, y)
    };
  }, [n]);
}
function ge(n, t) {
  const [r, i] = h([]), [l, d] = h(!1), [p, a] = h(null);
  return M(() => {
    if (!t) {
      i(W.map((o) => ({ ...o, active: !1 })));
      return;
    }
    d(!0), a(null);
    const s = new AbortController();
    return fetch(`${n}/api/bus/products?tenant_id=${encodeURIComponent(t)}`, {
      credentials: "include",
      signal: s.signal
    }).then((o) => {
      if (!o.ok) throw new Error(`Products API returned ${o.status}`);
      return o.json();
    }).then((o) => {
      const f = new Set(o.activeProductIds);
      i(
        W.map((b) => ({ ...b, active: f.has(b.id) }))
      ), d(!1);
    }).catch((o) => {
      o.name !== "AbortError" && (i(W.map((f) => ({ ...f, active: !1 }))), a(o.message), d(!1));
    }), () => s.abort();
  }, [n, t]), { products: r, loading: l, error: p };
}
function xe(n, t, r, i) {
  const [l, d] = h([]), [p, a] = h([]), [s, o] = h(!1), f = A(null), b = A(null);
  M(() => {
    if (!r || !i) return;
    const S = new AbortController();
    return fetch(`${n}/api/bus/notifications?user_id=${encodeURIComponent(i)}&limit=20`, {
      credentials: "include",
      signal: S.signal
    }).then((N) => N.ok ? N.json() : Promise.resolve({ notifications: [] })).then((N) => {
      d(N.notifications ?? []);
    }).catch(() => {
    }), () => S.abort();
  }, [n, r, i]), M(() => {
    if (!t || !r) return;
    let S = !1;
    return (async () => {
      try {
        const { HubConnectionBuilder: N, LogLevel: v } = await import("./index-CrDahL0u.js"), z = new N().withUrl(`${t}?tenantId=${encodeURIComponent(r)}`).withAutomaticReconnect().configureLogging(v.Warning).build();
        z.on("notification", (w) => {
          d((_) => [w, ..._.slice(0, 49)]), f.current || (a((_) => [..._, w]), setTimeout(() => {
            a((_) => _.filter((E) => E.id !== w.id));
          }, 5e3));
        }), z.on("notificationsRead", (w) => {
          const _ = new Set(w);
          d(
            (E) => E.map((I) => _.has(I.id) ? { ...I, read: !0 } : I)
          );
        }), z.on("busEvent", (w) => {
          const _ = {
            id: w.event_id,
            productId: w.source,
            productName: w.source.toUpperCase(),
            title: w.title,
            body: w.detail,
            severity: w.severity === "critical" ? "error" : w.severity,
            read: !1,
            deepLink: w.entity_url || "",
            createdAt: w.timestamp
          };
          d((E) => [_, ...E.slice(0, 49)]), f.current || (a((E) => [...E, _]), setTimeout(() => {
            a((E) => E.filter((I) => I.id !== _.id));
          }, 5e3));
        }), S || (await z.start(), b.current = z);
      } catch {
      }
    })(), () => {
      var N;
      S = !0, (N = b.current) == null || N.stop(), b.current = null;
    };
  }, [t, r]);
  const y = j((S) => {
    d(
      (N) => N.map((v) => v.id === S ? { ...v, read: !0 } : v)
    ), fetch(`${n}/api/bus/notifications/${encodeURIComponent(S)}/read`, {
      method: "POST",
      credentials: "include"
    }).catch(() => {
    });
  }, [n]), m = j(() => {
    d((S) => S.map((N) => ({ ...N, read: !0 }))), fetch(`${n}/api/bus/notifications/mark-all-read`, {
      method: "POST",
      credentials: "include"
    }).catch(() => {
    });
  }, [n]), g = j((S) => {
    d((N) => N.filter((v) => v.id !== S)), fetch(`${n}/api/bus/notifications/${encodeURIComponent(S)}/dismiss`, {
      method: "POST",
      credentials: "include"
    }).catch(() => {
    });
  }, [n]), C = j((S) => {
    o(!0), f.current && clearTimeout(f.current), f.current = setTimeout(() => {
      o(!1), f.current = null;
    }, S);
  }, []), x = j(() => {
    o(!1), f.current && (clearTimeout(f.current), f.current = null);
  }, []), u = j((S) => {
    a((N) => N.filter((v) => v.id !== S));
  }, []), L = l.filter((S) => !S.read).length;
  return { notifications: l, unreadCount: L, markAllRead: m, markRead: y, dismiss: g, muted: s, muteUntil: C, unmute: x, toastQueue: p, dismissToast: u };
}
const k = (n) => function({ size: r = 16, className: i, color: l = "currentColor" }) {
  const d = Array.isArray(n) ? n : [n];
  return /* @__PURE__ */ e(
    "svg",
    {
      xmlns: "http://www.w3.org/2000/svg",
      width: r,
      height: r,
      viewBox: "0 0 24 24",
      fill: "none",
      stroke: l,
      strokeWidth: "2",
      strokeLinecap: "round",
      strokeLinejoin: "round",
      className: i,
      children: d.map((p, a) => /* @__PURE__ */ e("path", { d: p }, a))
    }
  );
}, X = k("M21 21l-4.35-4.35M17 11A6 6 0 1 1 5 11a6 6 0 0 1 12 0z"), ve = k([
  "M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9",
  "M13.73 21a2 2 0 0 1-3.46 0"
]), B = k("M18 6 6 18M6 6l12 12"), ye = k(["M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2", "M12 3a4 4 0 1 0 0 8 4 4 0 0 0 0-8z"]), ae = k([
  "M12 20a8 8 0 1 0 0-16 8 8 0 0 0 0 16z",
  "M12 14a2 2 0 1 0 0-4 2 2 0 0 0 0 4z"
]), ke = k([
  "M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4",
  "M16 17l5-5-5-5",
  "M21 12H9"
]), we = k([
  "M7 16V4m0 0L3 8m4-4 4 4",
  "M17 8v12m0 0 4-4m-4 4-4-4"
]), Ne = k(["M12 22a10 10 0 1 0 0-20 10 10 0 0 0 0 20z", "M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3", "M12 17h.01"]), je = k([
  "M12 22a10 10 0 1 0 0-20 10 10 0 0 0 0 20z",
  "M12 16a4 4 0 1 0 0-8 4 4 0 0 0 0 8z",
  "M4.93 4.93l4.24 4.24",
  "M14.83 14.83l4.24 4.24",
  "M14.83 9.17l4.24-4.24",
  "M14.83 9.17l3.53-3.53",
  "M4.93 19.07l4.24-4.24"
]), Se = k(["M16 20V4a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16", "M2 10a2 2 0 0 1 2-2h16a2 2 0 0 1 2 2v10H2z"]), Ce = k(["M22 12h-4", "M6 12H2", "M12 6V2", "M12 22v-4", "M12 8a4 4 0 1 0 0 8 4 4 0 0 0 0-8z"]), ze = k(["M2 3h20v14H2z", "M8 21h8", "M12 17v4"]), Me = k(["M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z", "M9 12l2 2 4-4"]), _e = k(["M22 12H2", "M5.45 5.11 2 12v6a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2v-6l-3.45-6.89A2 2 0 0 0 16.76 4H7.24a2 2 0 0 0-1.79 1.11z", "M6 16h.01", "M10 16h.01"]), Te = k(["M20 20a2 2 0 0 0 2-2V8a2 2 0 0 0-2-2h-7.9a2 2 0 0 1-1.69-.9L9.6 3.9A2 2 0 0 0 7.93 3H4a2 2 0 0 0-2 2v13a2 2 0 0 0 2 2z", "M8 10v4", "M12 10v2", "M16 10v6"]), Ee = k(["M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z", "M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z"]), $e = k("M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"), K = k(["M9.937 15.5A2 2 0 0 0 8.5 14.063l-6.135-1.582a.5.5 0 0 1 0-.962L8.5 9.936A2 2 0 0 0 9.937 8.5l1.582-6.135a.5.5 0 0 1 .963 0L14.063 8.5A2 2 0 0 0 15.5 9.937l6.135 1.581a.5.5 0 0 1 0 .964L15.5 14.063a2 2 0 0 0-1.437 1.437l-1.582 6.135a.5.5 0 0 1-.963 0z", "M20 3v4", "M22 5h-4"]), Le = k(["M23 7l-7 5 7 5V7z", "M14 5H3a2 2 0 0 0-2 2v10a2 2 0 0 0 2 2h11a2 2 0 0 0 2-2V7a2 2 0 0 0-2-2z"]), Ae = k(["M18 22V8l-6-6-6 6v14", "M2 22h20", "M10 22v-4a2 2 0 0 1 4 0v4", "M12 7v5", "M10 9h4"]), Ie = k(["M6 22V4a2 2 0 0 1 2-2h8a2 2 0 0 1 2 2v18", "M6 12H4a2 2 0 0 1-2-2V7a2 2 0 0 1 2-2h2", "M18 12h2a2 2 0 0 1 2 2v3a2 2 0 0 1-2 2h-2", "M10 6h4", "M10 10h4", "M10 14h4", "M10 18h4"]), Re = k(["M14 18V6a2 2 0 0 0-2-2H4a2 2 0 0 0-2 2v11a1 1 0 0 0 1 1h1", "M15 18h6a1 1 0 0 0 1-1v-3.65a1 1 0 0 0-.22-.624l-3.48-4.35A1 1 0 0 0 17.52 8H14", "M7 18a2 2 0 1 0 0 4 2 2 0 0 0 0-4z", "M17 18a2 2 0 1 0 0 4 2 2 0 0 0 0-4z"]), Oe = k(["M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2", "M9 3a4 4 0 1 0 0 8 4 4 0 0 0 0-8z", "M22 21v-2a4 4 0 0 0-3-3.87", "M16 3.13a4 4 0 0 1 0 7.75"]), Pe = k(["M12 2a9 3 0 1 0 0 6 9 3 0 0 0 0-6z", "M21 12c0 1.66-4 3-9 3s-9-1.34-9-3", "M3 5v14c0 1.66 4 3 9 3s9-1.34 9-3V5"]), Fe = k(["M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9", "M13.73 21a2 2 0 0 1-3.46 0", "M2 8c0-2.2.7-4.3 2-6", "M22 8a10 10 0 0 0-2-6"]), He = k(["M13 4h3a2 2 0 0 1 2 2v14", "M2 20h3", "M13 20h9", "M10 12v.01", "M13 4.562v16.157a1 1 0 0 1-1.242.97L5 20V5.562a2 2 0 0 1 1.515-1.94l4.243-1.06A2 2 0 0 1 13 4.561z"]), De = k(["M16 2l5 5-14 14L2 16z", "M12 8l-2-2", "M8 12l-2-2"]), Ue = k(["M12 2a10 10 0 1 0 0 20 10 10 0 0 0 0-20z", "M2 12h20", "M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"]), Ke = k(["M3 3h7v7H3z", "M14 3h7v7h-7z", "M14 14h7v7h-7z", "M3 14h7v7H3z"]), qe = k("M22 12h-4l-3 9L9 3l-3 9H2"), Be = k(["M9 20H4a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h3.9a2 2 0 0 1 1.69.9l.81 1.2a2 2 0 0 0 1.67.9H20a2 2 0 0 1 2 2v1", "M12 10v4h4", "M12 14c1.5-2 3.5-3 6-3", "M20 18v-4h-4", "M20 14c-1.5 2-3.5 3-6 3"]), We = {
  briefcase: Se,
  target: Ce,
  monitor: ze,
  "shield-check": Me,
  "hard-drive": _e,
  "folder-kanban": Te,
  "book-open": Ee,
  phone: $e,
  sparkles: K,
  video: Le,
  church: Ae,
  "building-2": Ie,
  truck: Re,
  users: Oe,
  database: Pe,
  "bell-ring": Fe,
  "door-open": He,
  scale: De,
  globe: Ue,
  search: X,
  "layout-grid": Ke,
  activity: qe,
  "folder-sync": Be
};
function Ve() {
  const n = [];
  for (let t = 0; t < 3; t++)
    for (let r = 0; r < 3; r++)
      n.push([6 + r * 7, 6 + t * 7]);
  return /* @__PURE__ */ e("svg", { width: "20", height: "20", viewBox: "0 0 24 24", fill: "none", xmlns: "http://www.w3.org/2000/svg", children: n.map(([t, r], i) => /* @__PURE__ */ e("circle", { cx: t, cy: r, r: "2", fill: "#94a3b8" }, i)) });
}
function te({ icon: n, size: t = 20 }) {
  const r = We[n];
  return r ? /* @__PURE__ */ e(r, { size: t, color: "#fff" }) : /* @__PURE__ */ e("span", { style: { color: "#fff", fontSize: 14, fontWeight: 700 }, children: n.charAt(0).toUpperCase() });
}
function Je({
  currentProduct: n,
  products: t,
  open: r,
  onToggle: i,
  onClose: l,
  hubUrl: d
}) {
  const p = A(null), a = t.filter((o) => o.active), s = t.filter((o) => !o.active);
  return M(() => {
    if (!r) return;
    function o(b) {
      p.current && !p.current.contains(b.target) && l();
    }
    function f(b) {
      b.key === "Escape" && l();
    }
    return document.addEventListener("mousedown", o), document.addEventListener("keydown", f), () => {
      document.removeEventListener("mousedown", o), document.removeEventListener("keydown", f);
    };
  }, [r, l]), /* @__PURE__ */ c("div", { className: "hb-switcher", ref: p, style: { position: "relative" }, children: [
    /* @__PURE__ */ e(
      "button",
      {
        className: `hb-waffle-btn${r ? " open" : ""}`,
        onClick: i,
        "aria-expanded": r,
        "aria-label": "App launcher",
        children: /* @__PURE__ */ e(Ve, {})
      }
    ),
    r && /* @__PURE__ */ c("div", { className: "hb-waffle-panel", role: "menu", children: [
      /* @__PURE__ */ e("div", { className: "hb-waffle-header", children: "Apps" }),
      /* @__PURE__ */ e("div", { className: "hb-waffle-grid", children: a.map((o) => /* @__PURE__ */ c(
        "a",
        {
          href: o.url,
          className: "hb-waffle-tile",
          onClick: l,
          role: "menuitem",
          children: [
            /* @__PURE__ */ e(
              "div",
              {
                className: `hb-waffle-tile-icon${o.id === n ? " current" : ""}`,
                style: {
                  background: o.color,
                  color: o.color
                },
                children: /* @__PURE__ */ e(te, { icon: o.icon, color: o.color })
              }
            ),
            /* @__PURE__ */ e("span", { className: "hb-waffle-tile-name", children: o.name })
          ]
        },
        o.id
      )) }),
      s.length > 0 && /* @__PURE__ */ c(q, { children: [
        /* @__PURE__ */ e("div", { className: "hb-waffle-sep" }),
        /* @__PURE__ */ e("div", { className: "hb-waffle-section-label", children: "Available" }),
        /* @__PURE__ */ e("div", { className: "hb-waffle-grid", children: s.map((o) => /* @__PURE__ */ c(
          "a",
          {
            href: `${d}/products/${o.id}`,
            className: "hb-waffle-tile inactive",
            onClick: l,
            role: "menuitem",
            children: [
              /* @__PURE__ */ e(
                "div",
                {
                  className: "hb-waffle-tile-icon",
                  style: { background: o.color },
                  children: /* @__PURE__ */ e(te, { icon: o.icon, color: o.color })
                }
              ),
              /* @__PURE__ */ e("span", { className: "hb-waffle-tile-name", children: o.name })
            ]
          },
          o.id
        )) })
      ] }),
      /* @__PURE__ */ e(
        "a",
        {
          href: `${d}/products`,
          className: "hb-waffle-explore",
          onClick: l,
          children: "Explore all products →"
        }
      )
    ] })
  ] });
}
function Ge(n, t, r, i = 200) {
  const [l, d] = h([]), [p, a] = h(!1), s = A(null);
  return M(() => {
    s.current && clearTimeout(s.current);
    const o = r.trim();
    if (!o || !t) {
      d([]), a(!1);
      return;
    }
    a(!0);
    const f = new AbortController();
    return s.current = setTimeout(() => {
      fetch(
        `${n}/api/bus/search?q=${encodeURIComponent(o)}&tenant_id=${encodeURIComponent(t)}`,
        { credentials: "include", signal: f.signal }
      ).then((b) => b.ok ? b.json() : Promise.resolve({ groups: [] })).then((b) => {
        d(b.groups ?? []), a(!1);
      }).catch((b) => {
        b.name !== "AbortError" && (d([]), a(!1));
      });
    }, i), () => {
      f.abort(), s.current && clearTimeout(s.current);
    };
  }, [n, t, r, i]), { results: l, loading: p };
}
function Ye({ apiBase: n, tenantId: t }) {
  const [r, i] = h(!1), [l, d] = h(""), [p, a] = h(-1), s = A(null), { results: o, loading: f } = Ge(n, t, l), b = o.flatMap((x) => x.results), y = j(() => {
    i(!0), d(""), a(-1), setTimeout(() => {
      var x;
      return (x = s.current) == null ? void 0 : x.focus();
    }, 0);
  }, []), m = j(() => {
    i(!1), d(""), a(-1);
  }, []);
  M(() => {
    function x(u) {
      (u.metaKey || u.ctrlKey) && u.key === "k" && (u.preventDefault(), r ? m() : y()), u.key === "Escape" && r && m();
    }
    return document.addEventListener("keydown", x), () => document.removeEventListener("keydown", x);
  }, [r, y, m]);
  function g(x) {
    if (x.key === "ArrowDown")
      x.preventDefault(), a((u) => Math.min(u + 1, b.length - 1));
    else if (x.key === "ArrowUp")
      x.preventDefault(), a((u) => Math.max(u - 1, -1));
    else if (x.key === "Enter" && p >= 0) {
      const u = b[p];
      u && (window.location.href = u.deepLink, m());
    }
  }
  const C = typeof navigator < "u" && /Mac/i.test(navigator.platform);
  return /* @__PURE__ */ c(q, { children: [
    /* @__PURE__ */ e("div", { className: "hb-search-wrap", children: /* @__PURE__ */ c("button", { className: "hb-search-trigger", onClick: y, "aria-label": "Search (Cmd+K)", children: [
      /* @__PURE__ */ e(X, { size: 14 }),
      /* @__PURE__ */ e("span", { className: "hb-search-trigger-text", children: "Search everything..." }),
      /* @__PURE__ */ c("span", { className: "hb-kbd", children: [
        /* @__PURE__ */ e("kbd", { children: C ? "⌘" : "Ctrl" }),
        /* @__PURE__ */ e("kbd", { children: "K" })
      ] })
    ] }) }),
    r && /* @__PURE__ */ e(
      "div",
      {
        className: "hb-search-overlay",
        onMouseDown: (x) => {
          x.target === x.currentTarget && m();
        },
        role: "dialog",
        "aria-label": "Search",
        "aria-modal": "true",
        children: /* @__PURE__ */ c("div", { className: "hb-search-modal", children: [
          /* @__PURE__ */ c("div", { className: "hb-search-input-row", children: [
            /* @__PURE__ */ e(X, { size: 18, color: "#f97316" }),
            /* @__PURE__ */ e(
              "input",
              {
                ref: s,
                className: "hb-search-input",
                placeholder: "Search everything...",
                value: l,
                onChange: (x) => {
                  d(x.target.value), a(-1);
                },
                onKeyDown: g,
                autoComplete: "off",
                spellCheck: !1
              }
            ),
            l && /* @__PURE__ */ e(
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
            Qe,
            {
              query: l,
              loading: f,
              results: o,
              focusedIndex: p,
              onNavigate: m
            }
          )
        ] })
      }
    )
  ] });
}
function Qe({ query: n, loading: t, results: r, focusedIndex: i, onNavigate: l }) {
  if (!n.trim())
    return /* @__PURE__ */ c("div", { className: "hb-search-empty", children: [
      /* @__PURE__ */ e("div", { children: "Type to search across all products" }),
      /* @__PURE__ */ e("div", { className: "hb-search-empty-hint", children: "Contacts, tickets, invoices, devices, and more" })
    ] });
  if (t)
    return /* @__PURE__ */ c("div", { className: "hb-search-loading", children: [
      /* @__PURE__ */ e("div", { className: "hb-spinner" }),
      "Searching..."
    ] });
  if (!r.length)
    return /* @__PURE__ */ c("div", { className: "hb-search-empty", children: [
      "No results for “",
      n,
      "”"
    ] });
  let d = 0;
  return /* @__PURE__ */ e("div", { className: "hb-search-results", children: r.map((p) => /* @__PURE__ */ c("div", { children: [
    /* @__PURE__ */ c("div", { className: "hb-search-group-label", children: [
      p.productName,
      " — ",
      p.results.length,
      " result",
      p.results.length !== 1 ? "s" : ""
    ] }),
    p.results.map((a) => {
      const s = d++;
      return /* @__PURE__ */ c(
        "a",
        {
          href: a.deepLink,
          className: `hb-search-item${i === s ? " focused" : ""}`,
          onClick: l,
          children: [
            /* @__PURE__ */ e("div", { className: "hb-search-item-icon", children: a.icon ?? a.title.slice(0, 1).toUpperCase() }),
            /* @__PURE__ */ c("div", { className: "hb-search-item-body", children: [
              /* @__PURE__ */ e("div", { className: "hb-search-item-title", children: a.title }),
              a.subtitle && /* @__PURE__ */ e("div", { className: "hb-search-item-sub", children: a.subtitle })
            ] }),
            /* @__PURE__ */ e("span", { className: "hb-source-badge", children: p.productName })
          ]
        },
        a.id
      );
    })
  ] }, p.productId)) });
}
function Xe(n) {
  const t = Math.floor((Date.now() - new Date(n).getTime()) / 1e3);
  return t < 60 ? "just now" : t < 3600 ? `${Math.floor(t / 60)}m ago` : t < 86400 ? `${Math.floor(t / 3600)}h ago` : `${Math.floor(t / 86400)}d ago`;
}
function Ze({
  notifications: n,
  unreadCount: t,
  open: r,
  onToggle: i,
  onClose: l,
  onMarkAllRead: d,
  onMarkRead: p,
  onDismiss: a,
  muted: s,
  onMute: o,
  onUnmute: f,
  hubUrl: b
}) {
  const y = A(null);
  return M(() => {
    if (!r) return;
    function m(g) {
      y.current && !y.current.contains(g.target) && l();
    }
    return document.addEventListener("mousedown", m), () => document.removeEventListener("mousedown", m);
  }, [r, l]), /* @__PURE__ */ c("div", { className: "hb-notif", ref: y, children: [
    /* @__PURE__ */ c(
      "button",
      {
        className: "hb-notif-btn",
        onClick: i,
        "aria-label": `Notifications${t > 0 ? ` (${t} unread)` : ""}`,
        "aria-expanded": r,
        children: [
          /* @__PURE__ */ e(ve, { size: 18 }),
          t > 0 && /* @__PURE__ */ e("span", { className: "hb-badge", "aria-hidden": "true", children: t > 99 ? "99+" : t })
        ]
      }
    ),
    r && /* @__PURE__ */ c("div", { className: "hb-notif-dropdown", role: "dialog", "aria-label": "Notifications", children: [
      /* @__PURE__ */ c("div", { className: "hb-notif-header", children: [
        /* @__PURE__ */ e("span", { className: "hb-notif-title", children: "Notifications" }),
        t > 0 && /* @__PURE__ */ e("button", { className: "hb-notif-mark-read", onClick: d, children: "Mark all read" })
      ] }),
      /* @__PURE__ */ e("div", { className: "hb-notif-list", role: "list", children: n.length === 0 ? /* @__PURE__ */ e("div", { className: "hb-notif-empty", children: "No notifications" }) : n.slice(0, 20).map((m) => /* @__PURE__ */ c(
        "div",
        {
          className: `hb-notif-item${m.read ? "" : " unread"}`,
          role: "listitem",
          children: [
            /* @__PURE__ */ c(
              "a",
              {
                href: m.deepLink,
                className: "hb-notif-item-link",
                onClick: () => {
                  p(m.id), l();
                },
                children: [
                  /* @__PURE__ */ e(
                    "span",
                    {
                      className: "hb-notif-icon",
                      style: { background: Q[m.severity] },
                      "aria-hidden": "true"
                    }
                  ),
                  /* @__PURE__ */ c("div", { className: "hb-notif-body", children: [
                    /* @__PURE__ */ c("div", { className: "hb-notif-body-title", children: [
                      m.title,
                      m.groupCount && m.groupCount > 1 && /* @__PURE__ */ e("span", { className: "hb-notif-group-badge", children: m.groupCount })
                    ] }),
                    m.body && /* @__PURE__ */ e("div", { className: "hb-notif-body-text", children: m.body }),
                    /* @__PURE__ */ c("div", { className: "hb-notif-meta", children: [
                      /* @__PURE__ */ e("span", { className: "hb-source-badge", children: m.productName }),
                      /* @__PURE__ */ e("span", { className: "hb-notif-time", children: Xe(m.createdAt) })
                    ] })
                  ] })
                ]
              }
            ),
            /* @__PURE__ */ e(
              "button",
              {
                className: "hb-notif-dismiss",
                onClick: (g) => {
                  g.stopPropagation(), a(m.id);
                },
                "aria-label": "Dismiss notification",
                children: /* @__PURE__ */ e(B, { size: 14 })
              }
            )
          ]
        },
        m.id
      )) }),
      /* @__PURE__ */ e("div", { className: "hb-notif-footer", children: /* @__PURE__ */ c("div", { className: "hb-notif-footer-row", children: [
        s ? /* @__PURE__ */ e("button", { className: "hb-notif-mute-btn", onClick: f, children: "Unmute notifications" }) : /* @__PURE__ */ c("div", { className: "hb-notif-mute-group", children: [
          /* @__PURE__ */ e("button", { className: "hb-notif-mute-btn", onClick: () => o(3600 * 1e3), children: "Mute 1h" }),
          /* @__PURE__ */ e("button", { className: "hb-notif-mute-btn", onClick: () => {
            const m = /* @__PURE__ */ new Date(), g = new Date(m.getFullYear(), m.getMonth(), m.getDate() + 1);
            o(g.getTime() - m.getTime());
          }, children: "Mute today" })
        ] }),
        /* @__PURE__ */ c("a", { href: `${b}/notifications/settings`, onClick: l, className: "hb-notif-settings-link", children: [
          /* @__PURE__ */ e(ae, { size: 14 }),
          "Settings"
        ] })
      ] }) })
    ] })
  ] });
}
function et({ toasts: n, onDismiss: t }) {
  return n.length === 0 ? null : /* @__PURE__ */ e("div", { className: "hb-toast-container", role: "status", "aria-live": "polite", children: n.slice(0, 3).map((r) => {
    const i = W.find((l) => l.id === r.productId);
    return /* @__PURE__ */ c(
      "div",
      {
        className: "hb-toast",
        style: { borderLeftColor: Q[r.severity] },
        children: [
          /* @__PURE__ */ e(
            "span",
            {
              className: "hb-toast-dot",
              style: { background: (i == null ? void 0 : i.color) || Q[r.severity] }
            }
          ),
          /* @__PURE__ */ c("div", { className: "hb-toast-body", children: [
            /* @__PURE__ */ e("div", { className: "hb-toast-title", children: r.title }),
            r.body && /* @__PURE__ */ e("div", { className: "hb-toast-text", children: r.body }),
            r.deepLink && /* @__PURE__ */ e("a", { href: r.deepLink, className: "hb-toast-link", children: "View" })
          ] }),
          /* @__PURE__ */ e(
            "button",
            {
              className: "hb-toast-close",
              onClick: () => t(r.id),
              "aria-label": "Dismiss",
              children: /* @__PURE__ */ e(B, { size: 14 })
            }
          )
        ]
      },
      r.id
    );
  }) });
}
function tt({
  session: n,
  open: t,
  onToggle: r,
  onClose: i,
  onLogout: l,
  hubUrl: d
}) {
  const p = A(null);
  M(() => {
    if (!t) return;
    function s(o) {
      p.current && !p.current.contains(o.target) && i();
    }
    return document.addEventListener("mousedown", s), () => document.removeEventListener("mousedown", s);
  }, [t, i]);
  function a() {
    i(), l ? l() : window.location.href = `${d}/logout`;
  }
  return /* @__PURE__ */ c("div", { className: "hb-user", ref: p, children: [
    /* @__PURE__ */ c("button", { className: "hb-user-btn", onClick: r, "aria-expanded": t, "aria-label": "User menu", children: [
      /* @__PURE__ */ e("div", { className: "hb-avatar", children: n.initials }),
      /* @__PURE__ */ e("span", { className: "hb-user-name", children: n.firstName ?? n.email.split("@")[0] }),
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
    t && /* @__PURE__ */ c("div", { className: "hb-user-dropdown", role: "menu", children: [
      /* @__PURE__ */ c("div", { className: "hb-user-info", children: [
        /* @__PURE__ */ e("div", { style: { fontWeight: 600, fontSize: 13, color: "#f1f5f9" }, children: n.firstName && n.lastName ? `${n.firstName} ${n.lastName}` : n.email.split("@")[0] }),
        /* @__PURE__ */ e("div", { className: "hb-user-email", children: n.email }),
        n.tenantName && /* @__PURE__ */ e("div", { className: "hb-user-tenant", children: n.tenantName })
      ] }),
      /* @__PURE__ */ c(
        "a",
        {
          href: `${d}/profile`,
          className: "hb-menu-item",
          onClick: i,
          role: "menuitem",
          children: [
            /* @__PURE__ */ e(ye, { size: 14 }),
            "Profile"
          ]
        }
      ),
      /* @__PURE__ */ c(
        "a",
        {
          href: `${d}/settings`,
          className: "hb-menu-item",
          onClick: i,
          role: "menuitem",
          children: [
            /* @__PURE__ */ e(ae, { size: 14 }),
            "Hub Settings"
          ]
        }
      ),
      /* @__PURE__ */ e("div", { className: "hb-menu-sep" }),
      /* @__PURE__ */ c(
        "a",
        {
          href: `${d}/switch-tenant`,
          className: "hb-menu-item",
          onClick: i,
          role: "menuitem",
          children: [
            /* @__PURE__ */ e(we, { size: 14 }),
            "Switch Tenant"
          ]
        }
      ),
      /* @__PURE__ */ e("div", { className: "hb-menu-sep" }),
      /* @__PURE__ */ c(
        "button",
        {
          className: "hb-menu-item danger",
          onClick: a,
          role: "menuitem",
          children: [
            /* @__PURE__ */ e(ke, { size: 14 }),
            "Log Out"
          ]
        }
      )
    ] })
  ] });
}
class nt {
  constructor(t) {
    this.baseUrl = t.apiBaseUrl.replace(/\/$/, ""), this.apiKey = t.apiKey, this.platformId = t.platformId;
  }
  async request(t, r = {}) {
    const i = `${this.baseUrl}${t}`, l = await fetch(i, {
      ...r,
      headers: {
        "Content-Type": "application/json",
        "X-Api-Key": this.apiKey,
        ...r.headers
      }
    });
    if (!l.ok) {
      const d = await l.text().catch(() => "");
      throw new Error(`Ops Center API error ${l.status}: ${d}`);
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
    const r = new URLSearchParams({ platform: this.platformId });
    return t.reporter_email && r.set("reporter_email", t.reporter_email), t.status && r.set("status", t.status), t.ticket_type && r.set("ticket_type", t.ticket_type), t.page && r.set("page", String(t.page)), t.page_size && r.set("page_size", String(t.page_size)), this.request(`/api/tickets?${r}`);
  }
  async getTicket(t) {
    return this.request(`/api/tickets/${t}`);
  }
  async getTicketActivity(t) {
    return this.request(`/api/tickets/${t}/activity`);
  }
  async addComment(t, r) {
    return this.request(`/api/tickets/${t}/comment`, {
      method: "POST",
      body: JSON.stringify(r)
    });
  }
  async voteOnTicket(t, r) {
    return this.request(`/api/tickets/${t}/vote`, {
      method: "POST",
      body: JSON.stringify(r)
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
    const r = t ? `?category=${encodeURIComponent(t)}` : "", i = await fetch(`${this.baseUrl}/api/kb-public/${this.platformId}/articles${r}`);
    if (!i.ok) throw new Error(`Failed to fetch KB articles: ${i.status}`);
    return i.json();
  }
  async getKBArticle(t) {
    const r = await fetch(`${this.baseUrl}/api/kb-public/${this.platformId}/articles/${t}`);
    if (!r.ok) throw new Error(`Failed to fetch KB article: ${r.status}`);
    return r.json();
  }
  async searchKB(t) {
    const r = await fetch(`${this.baseUrl}/api/kb-public/${this.platformId}/search?q=${encodeURIComponent(t)}`);
    if (!r.ok) throw new Error(`Failed to search KB: ${r.status}`);
    return r.json();
  }
  // ─── Chat ────────────────────────────────────────────────────
  async startChat(t, r, i) {
    return this.request("/api/chat/sessions", {
      method: "POST",
      body: JSON.stringify({ message: t, user_name: r, user_email: i, platform: this.platformId })
    });
  }
  async sendChatMessage(t, r) {
    return this.request(`/api/chat/sessions/${t}/messages`, {
      method: "POST",
      body: JSON.stringify({ message: r })
    });
  }
  async getChatSession(t) {
    return this.request(`/api/chat/sessions/${t}`);
  }
  async listChatSessions(t) {
    return this.request(`/api/chat/sessions?email=${encodeURIComponent(t)}`);
  }
  async endChat(t, r, i) {
    return this.request(`/api/chat/sessions/${t}/end`, {
      method: "POST",
      body: JSON.stringify({ rating: r, feedback: i })
    });
  }
  async escalateChat(t) {
    return this.request(`/api/chat/sessions/${t}/escalate`, {
      method: "POST",
      body: JSON.stringify({})
    });
  }
  async sendCobrowseEvents(t, r, i) {
    return this.request(`/api/chat/sessions/${t}/cobrowse`, {
      method: "POST",
      body: JSON.stringify({ events: r, sequence: i })
    });
  }
}
const oe = ce(null);
function O() {
  const n = de(oe);
  if (!n) throw new Error("useSupportContext must be used within <SupportProvider>");
  return n;
}
function rt({ config: n, user: t, children: r }) {
  const i = Y(() => new nt(n), [n]), l = Y(() => ({ client: i, config: n, user: t }), [i, n, t]);
  return /* @__PURE__ */ e(oe.Provider, { value: l, children: r });
}
function it(n) {
  const { client: t, user: r } = O(), [i, l] = h([]), [d, p] = h(!0), [a, s] = h(null), o = j(async () => {
    p(!0), s(null);
    try {
      const f = await t.listTickets({
        reporter_email: r.email,
        status: n == null ? void 0 : n.status,
        ticket_type: n == null ? void 0 : n.ticket_type
      });
      l(f);
    } catch (f) {
      s(f instanceof Error ? f.message : "Failed to load tickets");
    } finally {
      p(!1);
    }
  }, [t, r.email, n == null ? void 0 : n.status, n == null ? void 0 : n.ticket_type]);
  return M(() => {
    o();
  }, [o]), { tickets: i, loading: d, error: a, refresh: o };
}
function at(n) {
  const { client: t } = O(), [r, i] = h(null), [l, d] = h([]), [p, a] = h(!0), [s, o] = h(null), f = j(async () => {
    if (n) {
      a(!0), o(null);
      try {
        const [b, y] = await Promise.all([
          t.getTicket(n),
          t.getTicketActivity(n)
        ]);
        i(b), d(y);
      } catch (b) {
        o(b instanceof Error ? b.message : "Failed to load ticket");
      } finally {
        a(!1);
      }
    }
  }, [t, n]);
  return M(() => {
    f();
  }, [f]), { ticket: r, activity: l, loading: p, error: s, refresh: f };
}
function ot() {
  const { client: n, user: t } = O(), [r, i] = h(!1), [l, d] = h(null);
  return { createTicket: j(async (a) => {
    i(!0), d(null);
    try {
      return await n.createTicket({
        ...a,
        reporter_email: t.email,
        reporter_name: t.name
      });
    } catch (s) {
      return d(s instanceof Error ? s.message : "Failed to create ticket"), null;
    } finally {
      i(!1);
    }
  }, [n, t]), submitting: r, error: l };
}
function st() {
  const { client: n, user: t } = O(), [r, i] = h(!1), [l, d] = h(null);
  return { addComment: j(async (a, s) => {
    i(!0), d(null);
    try {
      return await n.addComment(a, {
        content: s,
        actor_email: t.email,
        actor_name: t.name
      }), !0;
    } catch (o) {
      return d(o instanceof Error ? o.message : "Failed to add comment"), !1;
    } finally {
      i(!1);
    }
  }, [n, t]), submitting: r, error: l };
}
function lt() {
  const { client: n } = O(), [t, r] = h([]), [i, l] = h(!0), [d, p] = h(null), a = j(async () => {
    l(!0), p(null);
    try {
      const s = await n.getPublicReleases();
      r(s);
    } catch (s) {
      p(s instanceof Error ? s.message : "Failed to load release notes");
    } finally {
      l(!1);
    }
  }, [n]);
  return M(() => {
    a();
  }, [a]), { releases: t, loading: i, error: d, refresh: a };
}
function ct() {
  const { client: n } = O(), [t, r] = h([]), [i, l] = h(!0), [d, p] = h(null), a = j(async () => {
    l(!0), p(null);
    try {
      const s = await n.getFeatures();
      r(s);
    } catch (s) {
      p(s instanceof Error ? s.message : "Failed to load features");
    } finally {
      l(!1);
    }
  }, [n]);
  return M(() => {
    a();
  }, [a]), { features: t, loading: i, error: d, refresh: a };
}
function dt() {
  const { client: n, user: t } = O(), [r, i] = h(null), [l, d] = h(null), p = j(async (s) => {
    i(s), d(null);
    try {
      return await n.voteOnTicket(s, {
        user_email: t.email,
        user_name: t.name
      }), !0;
    } catch (o) {
      return d(o instanceof Error ? o.message : "Failed to vote"), !1;
    } finally {
      i(null);
    }
  }, [n, t]), a = j(async (s) => {
    i(s), d(null);
    try {
      return await n.removeVote(s), !0;
    } catch (o) {
      return d(o instanceof Error ? o.message : "Failed to remove vote"), !1;
    } finally {
      i(null);
    }
  }, [n]);
  return { vote: p, removeVote: a, voting: r, error: l };
}
function pt() {
  const { client: n } = O(), [t, r] = h([]), [i, l] = h(!0), [d, p] = h(null), a = j(async () => {
    l(!0), p(null);
    try {
      const s = await n.getKBCategories();
      r(s);
    } catch (s) {
      p(s instanceof Error ? s.message : "Failed to load categories");
    } finally {
      l(!1);
    }
  }, [n]);
  return M(() => {
    a();
  }, [a]), { categories: t, loading: i, error: d, refresh: a };
}
function ht(n) {
  const { client: t } = O(), [r, i] = h([]), [l, d] = h(!0), [p, a] = h(null), s = j(async () => {
    d(!0), a(null);
    try {
      const o = await t.getKBArticles(n);
      i(o);
    } catch (o) {
      a(o instanceof Error ? o.message : "Failed to load articles");
    } finally {
      d(!1);
    }
  }, [t, n]);
  return M(() => {
    s();
  }, [s]), { articles: r, loading: l, error: p, refresh: s };
}
function bt(n) {
  const { client: t } = O(), [r, i] = h(null), [l, d] = h(!0), [p, a] = h(null), s = j(async () => {
    if (n) {
      d(!0), a(null);
      try {
        const o = await t.getKBArticle(n);
        i(o);
      } catch (o) {
        a(o instanceof Error ? o.message : "Failed to load article");
      } finally {
        d(!1);
      }
    }
  }, [t, n]);
  return M(() => {
    s();
  }, [s]), { article: r, loading: l, error: p, refresh: s };
}
function ut() {
  const { client: n } = O(), [t, r] = h([]), [i, l] = h(!1), [d, p] = h(null), a = j(async (s) => {
    if (!s.trim()) {
      r([]);
      return;
    }
    l(!0), p(null);
    try {
      const o = await n.searchKB(s);
      r(o);
    } catch (o) {
      p(o instanceof Error ? o.message : "Failed to search");
    } finally {
      l(!1);
    }
  }, [n]);
  return { results: t, loading: i, error: d, search: a };
}
const ft = {
  hub: "Support",
  submit: "Submit a Ticket",
  tickets: "My Tickets",
  ticket: "Ticket",
  changelog: "What's New",
  features: "Feature Requests",
  kb: "Knowledge Base",
  "kb-article": "Article",
  chat: "Chat"
}, mt = [
  { id: "bug", label: "Report a Bug", desc: "Something not working? We'll fix it.", type: "bug_report" },
  { id: "feature", label: "Request a Feature", desc: "Have an idea? We want to hear it.", type: "feature_request" },
  { id: "help", label: "Get Help", desc: "Need assistance with something?", type: "service_request" }
];
function gt({ onNav: n }) {
  const { config: t } = O();
  return /* @__PURE__ */ c("div", { className: "hb-sp-hub", children: [
    /* @__PURE__ */ c("div", { className: "hb-sp-hub-header", children: [
      /* @__PURE__ */ e("div", { className: "hb-sp-hub-title", children: "How can we help?" }),
      /* @__PURE__ */ c("div", { className: "hb-sp-hub-sub", children: [
        "Get support for ",
        t.platformName,
        "."
      ] })
    ] }),
    /* @__PURE__ */ e("div", { className: "hb-sp-hub-grid", children: mt.map((r) => /* @__PURE__ */ c("button", { className: "hb-sp-card", onClick: () => n({ id: "submit", ticketType: r.type }), children: [
      /* @__PURE__ */ e("div", { className: "hb-sp-card-label", children: r.label }),
      /* @__PURE__ */ e("div", { className: "hb-sp-card-desc", children: r.desc })
    ] }, r.id)) }),
    /* @__PURE__ */ c("div", { className: "hb-sp-hub-links", children: [
      /* @__PURE__ */ c("button", { className: "hb-sp-link-item", onClick: () => n({ id: "tickets" }), children: [
        /* @__PURE__ */ e("span", { children: "My Tickets" }),
        /* @__PURE__ */ e("span", { className: "hb-sp-chevron", children: "›" })
      ] }),
      /* @__PURE__ */ c("button", { className: "hb-sp-link-item", onClick: () => n({ id: "kb" }), children: [
        /* @__PURE__ */ e("span", { children: "Knowledge Base" }),
        /* @__PURE__ */ e("span", { className: "hb-sp-chevron", children: "›" })
      ] }),
      /* @__PURE__ */ c("button", { className: "hb-sp-link-item", onClick: () => n({ id: "changelog" }), children: [
        /* @__PURE__ */ e("span", { children: "What's New" }),
        /* @__PURE__ */ e("span", { className: "hb-sp-chevron", children: "›" })
      ] }),
      /* @__PURE__ */ c("button", { className: "hb-sp-link-item", onClick: () => n({ id: "features" }), children: [
        /* @__PURE__ */ e("span", { children: "Feature Requests" }),
        /* @__PURE__ */ e("span", { className: "hb-sp-chevron", children: "›" })
      ] })
    ] })
  ] });
}
const xt = [
  { value: "bug_report", label: "Bug Report" },
  { value: "feature_request", label: "Feature Request" },
  { value: "service_request", label: "Service Request" }
], vt = [
  { value: "low", label: "Low" },
  { value: "medium", label: "Medium" },
  { value: "high", label: "High" },
  { value: "critical", label: "Critical" }
], yt = [
  { value: "cosmetic", label: "Cosmetic" },
  { value: "minor", label: "Minor" },
  { value: "major", label: "Major" },
  { value: "blocker", label: "Blocker" }
];
function kt({ initialType: n, onNav: t }) {
  const [r, i] = h(n || "bug_report"), [l, d] = h(""), [p, a] = h(""), [s, o] = h("medium"), [f, b] = h("minor"), { createTicket: y, submitting: m, error: g } = ot(), [C, x] = h(null);
  return C ? /* @__PURE__ */ c("div", { className: "hb-sp-success", children: [
    /* @__PURE__ */ e("div", { className: "hb-sp-success-icon", children: "✓" }),
    /* @__PURE__ */ e("div", { className: "hb-sp-success-title", children: "Ticket Submitted" }),
    /* @__PURE__ */ e("div", { className: "hb-sp-success-num", children: C }),
    /* @__PURE__ */ c("div", { className: "hb-sp-success-actions", children: [
      /* @__PURE__ */ e("button", { className: "hb-sp-btn hb-sp-btn-secondary", onClick: () => t({ id: "tickets" }), children: "View My Tickets" }),
      /* @__PURE__ */ e("button", { className: "hb-sp-btn hb-sp-btn-ghost", onClick: () => t({ id: "hub" }), children: "Back to Support" })
    ] })
  ] }) : /* @__PURE__ */ c("div", { className: "hb-sp-form-page", children: [
    /* @__PURE__ */ c("div", { className: "hb-sp-field", children: [
      /* @__PURE__ */ e("label", { className: "hb-sp-label", children: "Type" }),
      /* @__PURE__ */ e("div", { className: "hb-sp-type-row", children: xt.map((u) => /* @__PURE__ */ e(
        "button",
        {
          type: "button",
          className: `hb-sp-type-btn${r === u.value ? " active" : ""}`,
          onClick: () => i(u.value),
          children: u.label
        },
        u.value
      )) })
    ] }),
    /* @__PURE__ */ c("div", { className: "hb-sp-field", children: [
      /* @__PURE__ */ e("label", { className: "hb-sp-label", htmlFor: "sp-title", children: "Title" }),
      /* @__PURE__ */ e(
        "input",
        {
          id: "sp-title",
          className: "hb-sp-input",
          value: l,
          onChange: (u) => d(u.target.value),
          placeholder: "Brief description...",
          maxLength: 200
        }
      ),
      /* @__PURE__ */ c("div", { className: "hb-sp-char-count", children: [
        l.length,
        "/200"
      ] })
    ] }),
    /* @__PURE__ */ c("div", { className: "hb-sp-field", children: [
      /* @__PURE__ */ e("label", { className: "hb-sp-label", htmlFor: "sp-desc", children: "Description" }),
      /* @__PURE__ */ e(
        "textarea",
        {
          id: "sp-desc",
          className: "hb-sp-textarea",
          value: p,
          onChange: (u) => a(u.target.value),
          placeholder: "Provide as much detail as possible...",
          rows: 6,
          maxLength: 5e3
        }
      ),
      /* @__PURE__ */ c("div", { className: "hb-sp-char-count", children: [
        p.length,
        "/5000"
      ] })
    ] }),
    /* @__PURE__ */ c("div", { className: "hb-sp-field", children: [
      /* @__PURE__ */ e("label", { className: "hb-sp-label", children: "Priority" }),
      /* @__PURE__ */ e("div", { className: "hb-sp-chip-row", children: vt.map((u) => /* @__PURE__ */ e(
        "button",
        {
          type: "button",
          className: `hb-sp-chip${s === u.value ? " active" : ""}`,
          onClick: () => o(u.value),
          children: u.label
        },
        u.value
      )) })
    ] }),
    r === "bug_report" && /* @__PURE__ */ c("div", { className: "hb-sp-field", children: [
      /* @__PURE__ */ e("label", { className: "hb-sp-label", children: "Severity" }),
      /* @__PURE__ */ e("div", { className: "hb-sp-chip-row", children: yt.map((u) => /* @__PURE__ */ e(
        "button",
        {
          type: "button",
          className: `hb-sp-chip${f === u.value ? " active" : ""}`,
          onClick: () => b(u.value),
          children: u.label
        },
        u.value
      )) })
    ] }),
    g && /* @__PURE__ */ e("div", { className: "hb-sp-error", children: g }),
    /* @__PURE__ */ e(
      "button",
      {
        className: "hb-sp-btn hb-sp-btn-primary",
        disabled: m || !l.trim() || !p.trim(),
        onClick: async () => {
          const u = await y({
            ticket_type: r,
            title: l.trim(),
            description: p.trim(),
            priority: s,
            severity: r === "bug_report" ? f : void 0
          });
          u && x(u.ticket_number);
        },
        children: m ? "Submitting…" : "Submit Ticket"
      }
    )
  ] });
}
const se = {
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
function wt({ onNav: n }) {
  const [t, r] = h(""), { tickets: i, loading: l, error: d } = it({ status: t || void 0 });
  return /* @__PURE__ */ c("div", { className: "hb-sp-list-page", children: [
    /* @__PURE__ */ c("div", { className: "hb-sp-filter-row", children: [
      [["", "All"], ["new,triaged,in_progress,waiting_reporter,waiting_external,on_hold", "Open"], ["resolved,closed", "Closed"]].map(([p, a]) => /* @__PURE__ */ e(
        "button",
        {
          className: `hb-sp-filter-btn${t === p ? " active" : ""}`,
          onClick: () => r(p),
          children: a
        },
        p
      )),
      /* @__PURE__ */ e("button", { className: "hb-sp-filter-btn hb-sp-filter-btn-new", onClick: () => n({ id: "submit" }), children: "+ New" })
    ] }),
    l ? /* @__PURE__ */ e("div", { className: "hb-sp-list", children: [0, 1, 2].map((p) => /* @__PURE__ */ e("div", { className: "hb-sp-skeleton" }, p)) }) : d ? /* @__PURE__ */ e("div", { className: "hb-sp-error", children: d }) : i.length === 0 ? /* @__PURE__ */ c("div", { className: "hb-sp-empty", children: [
      /* @__PURE__ */ e("div", { className: "hb-sp-empty-text", children: "No tickets found" }),
      /* @__PURE__ */ e("button", { className: "hb-sp-btn hb-sp-btn-secondary", onClick: () => n({ id: "submit" }), children: "Submit a Ticket" })
    ] }) : /* @__PURE__ */ e("div", { className: "hb-sp-list", children: i.map((p) => /* @__PURE__ */ c("button", { className: "hb-sp-list-item", onClick: () => n({ id: "ticket", ticketId: p.id }), children: [
      /* @__PURE__ */ c("div", { className: "hb-sp-ticket-top", children: [
        /* @__PURE__ */ e("span", { className: "hb-sp-ticket-num", children: p.ticket_number }),
        /* @__PURE__ */ e("span", { className: "hb-sp-badge", children: se[p.status] ?? p.status })
      ] }),
      /* @__PURE__ */ e("div", { className: "hb-sp-ticket-title", children: p.title }),
      /* @__PURE__ */ e("div", { className: "hb-sp-ticket-meta", children: new Date(p.created_at).toLocaleDateString(void 0, { month: "short", day: "numeric", year: "numeric" }) })
    ] }, p.id)) })
  ] });
}
function Nt({ ticketId: n }) {
  const { ticket: t, activity: r, loading: i, error: l } = at(n), { addComment: d, submitting: p } = st(), [a, s] = h("");
  return i ? /* @__PURE__ */ e("div", { className: "hb-sp-loading", children: "Loading ticket…" }) : l || !t ? /* @__PURE__ */ e("div", { className: "hb-sp-error", children: l ?? "Ticket not found" }) : /* @__PURE__ */ c("div", { className: "hb-sp-detail-page", children: [
    /* @__PURE__ */ c("div", { className: "hb-sp-detail-header", children: [
      /* @__PURE__ */ e("span", { className: "hb-sp-ticket-num", children: t.ticket_number }),
      /* @__PURE__ */ e("span", { className: "hb-sp-badge", children: se[t.status] ?? t.status })
    ] }),
    /* @__PURE__ */ e("div", { className: "hb-sp-detail-title", children: t.title }),
    /* @__PURE__ */ e("div", { className: "hb-sp-detail-desc", children: t.description }),
    r.length > 0 && /* @__PURE__ */ c("div", { className: "hb-sp-activity", children: [
      /* @__PURE__ */ e("div", { className: "hb-sp-activity-title", children: "Activity" }),
      r.filter((o) => !o.is_internal).map((o) => /* @__PURE__ */ c("div", { className: "hb-sp-activity-item", children: [
        /* @__PURE__ */ e("div", { className: "hb-sp-activity-actor", children: o.actor_name }),
        o.content && /* @__PURE__ */ e("div", { className: "hb-sp-activity-content", children: o.content }),
        /* @__PURE__ */ e("div", { className: "hb-sp-activity-time", children: new Date(o.created_at).toLocaleString() })
      ] }, o.id))
    ] }),
    /* @__PURE__ */ c("div", { className: "hb-sp-reply", children: [
      /* @__PURE__ */ e(
        "textarea",
        {
          className: "hb-sp-textarea",
          rows: 3,
          placeholder: "Add a comment…",
          value: a,
          onChange: (o) => s(o.target.value)
        }
      ),
      /* @__PURE__ */ e(
        "button",
        {
          className: "hb-sp-btn hb-sp-btn-primary",
          disabled: p || !a.trim(),
          onClick: async () => {
            await d(t.id, a.trim()) && s("");
          },
          children: p ? "Sending…" : "Send"
        }
      )
    ] })
  ] });
}
function jt() {
  const { releases: n, loading: t, error: r } = lt();
  return t ? /* @__PURE__ */ e("div", { className: "hb-sp-loading", children: "Loading releases…" }) : r ? /* @__PURE__ */ e("div", { className: "hb-sp-error", children: r }) : n.length === 0 ? /* @__PURE__ */ e("div", { className: "hb-sp-empty", children: /* @__PURE__ */ e("div", { className: "hb-sp-empty-text", children: "No releases yet." }) }) : /* @__PURE__ */ e("div", { className: "hb-sp-list-page", children: n.map((i, l) => /* @__PURE__ */ c("div", { className: "hb-sp-release", children: [
    /* @__PURE__ */ c("div", { className: "hb-sp-release-header", children: [
      /* @__PURE__ */ c("span", { className: "hb-sp-release-ver", children: [
        "v",
        i.version
      ] }),
      /* @__PURE__ */ e("span", { className: "hb-sp-release-date", children: new Date(i.released_date).toLocaleDateString(void 0, { month: "short", day: "numeric", year: "numeric" }) })
    ] }),
    /* @__PURE__ */ e("div", { className: "hb-sp-release-title", children: i.title }),
    /* @__PURE__ */ e("div", { className: "hb-sp-release-notes", children: i.release_notes })
  ] }, l)) });
}
const St = {
  proposed: "Proposed",
  planned: "Planned",
  in_progress: "In Progress",
  shipped: "Shipped",
  cancelled: "Cancelled"
};
function Ct() {
  const { features: n, loading: t, error: r } = ct(), { vote: i, voting: l } = dt(), [d, p] = h(/* @__PURE__ */ new Set());
  return t ? /* @__PURE__ */ e("div", { className: "hb-sp-loading", children: "Loading features…" }) : r ? /* @__PURE__ */ e("div", { className: "hb-sp-error", children: r }) : n.length === 0 ? /* @__PURE__ */ e("div", { className: "hb-sp-empty", children: /* @__PURE__ */ e("div", { className: "hb-sp-empty-text", children: "No feature requests yet." }) }) : /* @__PURE__ */ e("div", { className: "hb-sp-list-page", children: n.map((a) => {
    var s;
    return /* @__PURE__ */ c("div", { className: "hb-sp-feature-item", children: [
      /* @__PURE__ */ c("div", { className: "hb-sp-feature-body", children: [
        /* @__PURE__ */ e("div", { className: "hb-sp-feature-title", children: a.title }),
        /* @__PURE__ */ e("div", { className: "hb-sp-feature-desc", children: a.description }),
        /* @__PURE__ */ e("span", { className: "hb-sp-badge", children: St[a.status] ?? a.status })
      ] }),
      /* @__PURE__ */ c(
        "button",
        {
          className: `hb-sp-vote-btn${d.has(a.id) ? " voted" : ""}`,
          disabled: l === a.id,
          onClick: async () => {
            await i(a.id) && p((f) => /* @__PURE__ */ new Set([...f, a.id]));
          },
          children: [
            "▲ ",
            ((s = a.tags) == null ? void 0 : s.length) ?? 0
          ]
        }
      )
    ] }, a.id);
  }) });
}
function zt({ onNav: n, category: t }) {
  const { categories: r, loading: i } = pt(), { articles: l, loading: d } = ht(t), { search: p, results: a, loading: s } = ut(), [o, f] = h(""), b = A(null), y = (g) => {
    f(g), b.current && clearTimeout(b.current), b.current = setTimeout(() => p(g), 300);
  }, m = o.trim().length > 0;
  return /* @__PURE__ */ c("div", { className: "hb-sp-list-page", children: [
    /* @__PURE__ */ e("div", { className: "hb-sp-search-row", children: /* @__PURE__ */ e(
      "input",
      {
        className: "hb-sp-input",
        placeholder: "Search knowledge base…",
        value: o,
        onChange: (g) => y(g.target.value)
      }
    ) }),
    m ? s ? /* @__PURE__ */ e("div", { className: "hb-sp-loading", children: "Searching…" }) : a.length === 0 ? /* @__PURE__ */ e("div", { className: "hb-sp-empty", children: /* @__PURE__ */ c("div", { className: "hb-sp-empty-text", children: [
      'No results for "',
      o,
      '"'
    ] }) }) : /* @__PURE__ */ e("div", { className: "hb-sp-list", children: a.map((g) => /* @__PURE__ */ c("button", { className: "hb-sp-list-item", onClick: () => n({ id: "kb-article", slug: g.slug }), children: [
      /* @__PURE__ */ e("div", { className: "hb-sp-ticket-title", children: g.title }),
      g.excerpt && /* @__PURE__ */ e("div", { className: "hb-sp-ticket-meta", children: g.excerpt })
    ] }, g.id)) }) : /* @__PURE__ */ c(q, { children: [
      !t && !i && r.length > 0 && /* @__PURE__ */ e("div", { className: "hb-sp-kb-cats", children: r.map((g) => /* @__PURE__ */ c("button", { className: "hb-sp-kb-cat", onClick: () => n({ id: "kb", category: g.slug }), children: [
        /* @__PURE__ */ e("span", { children: g.name }),
        /* @__PURE__ */ e("span", { className: "hb-sp-kb-cat-count", children: g.article_count })
      ] }, g.id)) }),
      d ? /* @__PURE__ */ e("div", { className: "hb-sp-loading", children: "Loading…" }) : l.length === 0 ? /* @__PURE__ */ e("div", { className: "hb-sp-empty", children: /* @__PURE__ */ e("div", { className: "hb-sp-empty-text", children: "No articles in this category." }) }) : /* @__PURE__ */ e("div", { className: "hb-sp-list", children: l.map((g) => /* @__PURE__ */ c("button", { className: "hb-sp-list-item", onClick: () => n({ id: "kb-article", slug: g.slug }), children: [
        /* @__PURE__ */ e("div", { className: "hb-sp-ticket-title", children: g.title }),
        g.excerpt && /* @__PURE__ */ e("div", { className: "hb-sp-ticket-meta", children: g.excerpt })
      ] }, g.id)) })
    ] })
  ] });
}
function Mt({ slug: n }) {
  const { article: t, loading: r, error: i } = bt(n);
  return r ? /* @__PURE__ */ e("div", { className: "hb-sp-loading", children: "Loading article…" }) : i || !t ? /* @__PURE__ */ e("div", { className: "hb-sp-error", children: i ?? "Article not found" }) : /* @__PURE__ */ c("div", { className: "hb-sp-detail-page", children: [
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
function _t({ page: n, onNav: t }) {
  return n.id === "hub" ? /* @__PURE__ */ e(gt, { onNav: t }) : n.id === "submit" ? /* @__PURE__ */ e(kt, { initialType: n.ticketType, onNav: t }) : n.id === "tickets" ? /* @__PURE__ */ e(wt, { onNav: t }) : n.id === "ticket" ? /* @__PURE__ */ e(Nt, { ticketId: n.ticketId }) : n.id === "changelog" ? /* @__PURE__ */ e(jt, {}) : n.id === "features" ? /* @__PURE__ */ e(Ct, {}) : n.id === "kb" ? /* @__PURE__ */ e(zt, { onNav: t, category: n.category }) : n.id === "kb-article" ? /* @__PURE__ */ e(Mt, { slug: n.slug }) : n.id === "chat" ? /* @__PURE__ */ e("div", { className: "hb-sp-empty", children: /* @__PURE__ */ e("div", { className: "hb-sp-empty-text", children: "Live chat coming soon." }) }) : null;
}
function Tt({ config: n, user: t }) {
  const [r, i] = h(!1), [l, d] = h({ id: "hub" }), [p, a] = h([]), s = A(null), o = j((C) => {
    a((x) => [...x, l]), d(C), s.current && (s.current.scrollTop = 0);
  }, [l]), f = j(() => {
    a((C) => {
      const x = [...C], u = x.pop();
      return u && d(u), x;
    }), s.current && (s.current.scrollTop = 0);
  }, []), b = j(() => {
    i(!1), setTimeout(() => {
      d({ id: "hub" }), a([]);
    }, 200);
  }, []);
  M(() => {
    if (!r) return;
    const C = (x) => {
      x.key === "Escape" && b();
    };
    return document.addEventListener("keydown", C), () => document.removeEventListener("keydown", C);
  }, [r, b]);
  const y = p.length > 0, m = ft[l.id] ?? "Support", g = r ? re(
    /* @__PURE__ */ e("div", { className: "hb-sp-overlay", onClick: b, "aria-hidden": "true", children: /* @__PURE__ */ c(
      "div",
      {
        className: `hb-sp-panel${r ? " open" : ""}`,
        onClick: (C) => C.stopPropagation(),
        role: "dialog",
        "aria-modal": "true",
        "aria-label": "Support",
        children: [
          /* @__PURE__ */ c("div", { className: "hb-sp-header", children: [
            y ? /* @__PURE__ */ e("button", { className: "hb-sp-back-btn", onClick: f, "aria-label": "Go back", children: "‹ Back" }) : /* @__PURE__ */ e("div", { className: "hb-sp-header-title", children: m }),
            y && /* @__PURE__ */ e("div", { className: "hb-sp-header-title", children: m }),
            /* @__PURE__ */ e("button", { className: "hb-sp-close-btn", onClick: b, "aria-label": "Close support panel", children: /* @__PURE__ */ e(B, { size: 16 }) })
          ] }),
          /* @__PURE__ */ e("div", { className: "hb-sp-content", ref: s, children: /* @__PURE__ */ e(rt, { config: n, user: t, children: /* @__PURE__ */ e(_t, { page: l, onNav: o }) }) })
        ]
      }
    ) }),
    document.body
  ) : null;
  return /* @__PURE__ */ c(q, { children: [
    /* @__PURE__ */ e(
      "button",
      {
        className: `hb-chat-btn${r ? " open" : ""}`,
        title: "Support",
        "aria-label": "Open support panel",
        "aria-expanded": r,
        onClick: () => i((C) => !C),
        children: /* @__PURE__ */ e(je, { size: 18 })
      }
    ),
    g
  ] });
}
const Et = {
  "theonepsa.com": "psa",
  "theonecrm.app": "crm",
  "theonermm.app": "rmm",
  "theonesecurity.app": "security",
  "theonebackups.app": "backups",
  "theoneprojects.app": "projects",
  "theonebooks.app": "books",
  "theonevoice.app": "voice",
  "theonestudio.app": "ai-studio",
  "theonelivekit.app": "livekit",
  "theonemission.app": "mission",
  "theoneams.com": "ams",
  "theonefleet.app": "fleet",
  "theonepeople.app": "people",
  "theonecmdb.app": "cmdb",
  "theoneoncall.app": "oncall",
  "theonevisitor.app": "visitor",
  "theonelegal.app": "legal",
  "mspcollective.io": "collective",
  "theoneportal.app": "portal",
  "theonebridge.app": "bridge",
  "theonecanvas.app": "canvas",
  "theonemigrate.app": "migrate",
  "theonebrand.app": "brand",
  "theoneops.app": "ops-center",
  "theonestack.com": "hub"
};
function $t(n) {
  for (const [t, r] of Object.entries(Et))
    if (n.includes(t)) return r;
  return null;
}
const Lt = [
  [/\/tickets?\/([\w-]+)/, "ticket"],
  [/\/companies?\/([\w-]+)/, "company"],
  [/\/contacts?\/([\w-]+)/, "contact"],
  [/\/devices?\/([\w-]+)/, "device"],
  [/\/invoices?\/([\w-]+)/, "invoice"],
  [/\/opportunities?\/([\w-]+)/, "opportunity"],
  [/\/projects?\/([\w-]+)/, "project"],
  [/\/incidents?\/([\w-]+)/, "incident"],
  [/\/contracts?\/([\w-]+)/, "contract"],
  [/\/employees?\/([\w-]+)/, "employee"],
  [/\/configurations?\/([\w-]+)/, "configuration_item"],
  [/\/alerts?\/([\w-]+)/, "alert"],
  [/\/calls?\/([\w-]+)/, "call"],
  [/\/recordings?\/([\w-]+)/, "call"],
  [/\/recaps?\/([\w-]+)/, "call"]
];
function At(n) {
  for (const [t, r] of Lt) {
    const i = n.match(t);
    if (i != null && i[1] && i[1] !== "new" && i[1] !== "list")
      return { entity_type: r, entity_id: i[1] };
  }
  return {};
}
function J() {
  const n = $t(window.location.hostname), { entity_type: t, entity_id: r } = At(window.location.pathname);
  return { product: n, page: window.location.pathname, entity_type: t, entity_id: r };
}
const G = {
  ticket: [
    { label: "Summarize this ticket", prompt: "Summarize this ticket including its history and current status." },
    { label: "Find similar tickets", prompt: "Search for similar tickets that might be related to this one." },
    { label: "Draft a response", prompt: "Draft a professional response to the client for this ticket." },
    { label: "Check SLA status", prompt: "What is the SLA status for this ticket? Is it at risk of breaching?" }
  ],
  company: [
    { label: "Full company picture", prompt: "Give me a complete picture of this company — tickets, revenue, devices, security posture." },
    { label: "Open tickets", prompt: "What are the open tickets for this company?" },
    { label: "Revenue summary", prompt: "Show me the revenue summary for this company." },
    { label: "Device health", prompt: "What is the device health status for this company?" }
  ],
  device: [
    { label: "What's wrong?", prompt: "What's wrong with this device? Show me recent alerts and issues." },
    { label: "Recent alerts", prompt: "Show me the recent alerts for this device." },
    { label: "Similar issues", prompt: "Are there similar issues on other devices?" }
  ],
  invoice: [
    { label: "Payment status", prompt: "What is the payment status of this invoice?" },
    { label: "Customer history", prompt: "Show me the payment history for this customer." }
  ],
  call: [
    { label: "Call summary", prompt: "Summarize this call — what was discussed, sentiment, and any action items." },
    { label: "Extract action items", prompt: "Extract all action items from this call and suggest ticket creation for each." },
    { label: "Full transcript", prompt: "Show me the full transcript of this call." },
    { label: "Follow up", prompt: "Draft a follow-up message to the caller based on this call." }
  ],
  contact: [
    { label: "Text this contact", prompt: "Help me draft and send an SMS to this contact." },
    { label: "Call this contact", prompt: "Connect me to this contact via phone." },
    { label: "Communication history", prompt: "Show me all recent calls and messages with this contact." },
    { label: "Email this contact", prompt: "Help me draft and send an email to this contact." }
  ],
  dashboard: [
    { label: "What needs attention?", prompt: "What needs my attention today? Show me critical items across all products." },
    { label: "Show overdue items", prompt: "What items are overdue — tickets, invoices, tasks?" },
    { label: "SLA alerts", prompt: "Are there any SLA alerts or at-risk tickets right now?" },
    { label: "Revenue this month", prompt: "What's our revenue looking like this month?" }
  ]
};
function It(n) {
  return n.entity_type && G[n.entity_type] ? G[n.entity_type] : n.page === "/" || n.page.includes("dashboard") ? G.dashboard : [
    { label: "What needs attention?", prompt: "What needs my attention today?" },
    { label: "Search tickets", prompt: "Search for recent open tickets." },
    { label: "Company health", prompt: "Show me a summary of company health scores." }
  ];
}
const V = "jarvis_messages", le = 50;
function Rt() {
  try {
    const n = sessionStorage.getItem(V);
    return n ? JSON.parse(n).slice(-le) : [];
  } catch {
    return [];
  }
}
function Ot(n) {
  try {
    sessionStorage.setItem(V, JSON.stringify(n.slice(-le)));
  } catch {
    sessionStorage.removeItem(V);
  }
}
let Pt = 0;
function ne() {
  return `jm_${Date.now()}_${++Pt}`;
}
function Ft(n, t, r) {
  const [i, l] = h(Rt), [d, p] = h(!1), [a, s] = h(J), [o, f] = h([]), b = A(null), y = A("");
  M(() => {
    const x = () => {
      const L = J();
      s(L), f(It(L));
    };
    x(), window.addEventListener("popstate", x);
    const u = new MutationObserver(() => {
      J().page !== a.page && x();
    });
    return u.observe(document.querySelector("title") || document.head, { childList: !0, subtree: !0 }), () => {
      window.removeEventListener("popstate", x), u.disconnect();
    };
  }, [a.page]), M(() => {
    Ot(i);
  }, [i]);
  const m = j(async (x) => {
    if (!x.trim() || d || !t) return;
    const u = {
      id: ne(),
      role: "user",
      content: x.trim(),
      timestamp: (/* @__PURE__ */ new Date()).toISOString()
    }, L = {
      id: ne(),
      role: "assistant",
      content: "",
      tool_calls: [],
      timestamp: (/* @__PURE__ */ new Date()).toISOString()
    };
    l((N) => [...N, u, L]), p(!0), y.current = "";
    const S = new AbortController();
    b.current = S;
    try {
      const v = {
        model: "gpt-4.1-mini",
        messages: [...i.slice(-18), u].map((F) => ({
          role: F.role,
          content: F.content
        })),
        stream: !0,
        context: {
          product: a.product,
          entity_type: a.entity_type,
          entity_id: a.entity_id,
          page_url: window.location.href
        }
      }, z = await fetch(`${n}/api/ai/chat`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "x-tenant-id": t,
          "x-ai-tier": "jarvis_free"
        },
        credentials: "include",
        body: JSON.stringify(v),
        signal: S.signal
      });
      if (!z.ok) {
        const F = await z.json().catch(() => ({ error: z.statusText }));
        throw new Error(F.error || F.message || `Error ${z.status}`);
      }
      if (!z.body) throw new Error("No response body");
      const w = z.body.getReader(), _ = new TextDecoder();
      let E = "";
      const I = [];
      for (; ; ) {
        const { done: F, value: T } = await w.read();
        if (F) break;
        E += _.decode(T, { stream: !0 });
        const H = E.split(`
`);
        E = H.pop() || "";
        for (const Z of H) {
          if (!Z.startsWith("data: ")) continue;
          const ee = Z.slice(6).trim();
          if (ee === "[DONE]") break;
          try {
            const R = JSON.parse(ee);
            if (R.type === "content_delta" && R.text) {
              y.current += R.text;
              const U = y.current;
              l((D) => {
                const $ = [...D], P = $[$.length - 1];
                return P && P.id === L.id && ($[$.length - 1] = { ...P, content: U }), $;
              });
            } else if (R.type === "tool_use_start" && R.name) {
              I.push({ name: R.name, status: "running" });
              const U = [...I];
              l((D) => {
                const $ = [...D], P = $[$.length - 1];
                return P && P.id === L.id && ($[$.length - 1] = { ...P, tool_calls: U }), $;
              });
            } else if (R.type === "message_stop") {
              I.forEach((D) => {
                D.status === "running" && (D.status = "done");
              });
              const U = [...I];
              l((D) => {
                const $ = [...D], P = $[$.length - 1];
                return P && P.id === L.id && ($[$.length - 1] = { ...P, tool_calls: U }), $;
              });
            } else if (R.type === "error")
              throw new Error(R.message || "Stream error");
          } catch (R) {
            if (R instanceof Error && R.message !== "Stream error") continue;
            throw R;
          }
        }
      }
    } catch (N) {
      if (!(N instanceof DOMException && N.name === "AbortError")) {
        const v = N instanceof Error ? N.message : "Something went wrong. Please try again.";
        l((z) => {
          const w = [...z], _ = w[w.length - 1];
          return _ && _.id === L.id && (w[w.length - 1] = {
            ..._,
            content: _.content || v,
            error: !0
          }), w;
        });
      }
    } finally {
      p(!1), b.current = null;
    }
  }, [n, t, i, d, a]), g = j(() => {
    b.current && (b.current.abort(), b.current = null);
  }, []), C = j(() => {
    l([]), sessionStorage.removeItem(V);
  }, []);
  return {
    messages: i,
    streaming: d,
    context: a,
    quickActions: o,
    sendMessage: m,
    stopStreaming: g,
    clearMessages: C
  };
}
function Ht(n) {
  return n ? n.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/```(\w*)\n?([\s\S]*?)```/g, '<pre class="hb-jv-code-block"><code>$2</code></pre>').replace(/`([^`]+)`/g, '<code class="hb-jv-inline-code">$1</code>').replace(/\*\*(.+?)\*\*/g, "<strong>$1</strong>").replace(/\*(.+?)\*/g, "<em>$1</em>").replace(/\[([^\]]+)\]\(([^)]+)\)/g, '<a href="$2" target="_blank" rel="noopener noreferrer" class="hb-jv-link">$1</a>').replace(/^[•\-\*] (.+)$/gm, "<li>$1</li>").replace(/^\d+\. (.+)$/gm, "<li>$1</li>").replace(/(<li>[\s\S]*?<\/li>)/g, '<ul class="hb-jv-list">$1</ul>').replace(/<\/ul>\s*<ul class="hb-jv-list">/g, "").replace(/\n/g, "<br>") : "";
}
const Dt = {
  search_tickets: "Searching tickets",
  get_ticket: "Fetching ticket details",
  create_ticket: "Creating ticket",
  update_ticket: "Updating ticket",
  get_company_info: "Looking up company",
  search_companies: "Searching companies",
  search_contacts: "Searching contacts",
  get_deals: "Fetching deals",
  get_invoices: "Fetching invoices",
  get_revenue_summary: "Calculating revenue",
  get_device_status: "Checking device status",
  search_devices: "Searching devices",
  run_device_command: "Running command",
  get_security_alerts: "Checking security alerts",
  send_message: "Sending message",
  get_call_history: "Fetching call history",
  get_company_360: "Building company overview",
  get_health_score: "Calculating health score",
  get_briefing: "Generating daily briefing",
  cross_search: "Searching across products"
};
function Ut({ tool: n }) {
  const t = Dt[n.name] || n.name.replace(/_/g, " "), r = n.status === "running", i = n.status === "error";
  return /* @__PURE__ */ c("div", { className: `hb-jv-tool-call${r ? " running" : ""}${i ? " error" : ""}`, children: [
    /* @__PURE__ */ e("div", { className: "hb-jv-tool-icon", children: r ? /* @__PURE__ */ e("span", { className: "hb-jv-tool-spinner" }) : i ? /* @__PURE__ */ e("span", { style: { color: "#f87171" }, children: "!" }) : /* @__PURE__ */ e("span", { style: { color: "#34d399" }, children: "✓" }) }),
    /* @__PURE__ */ c("span", { className: "hb-jv-tool-label", children: [
      t,
      r ? "…" : ""
    ] }),
    n.summary && /* @__PURE__ */ e("span", { className: "hb-jv-tool-summary", children: n.summary })
  ] });
}
function Kt({ message: n, isStreaming: t }) {
  if (n.role === "user")
    return /* @__PURE__ */ e("div", { className: "hb-jv-msg hb-jv-msg-user", children: /* @__PURE__ */ e("div", { className: "hb-jv-bubble hb-jv-bubble-user", children: n.content }) });
  const i = n.content.length > 0, l = n.tool_calls && n.tool_calls.length > 0;
  return /* @__PURE__ */ c("div", { className: "hb-jv-msg hb-jv-msg-assistant", children: [
    /* @__PURE__ */ e("div", { className: "hb-jv-avatar", children: /* @__PURE__ */ e(K, { size: 14, color: "#f97316" }) }),
    /* @__PURE__ */ c("div", { className: "hb-jv-bubble-wrap", children: [
      l && /* @__PURE__ */ e("div", { className: "hb-jv-tool-calls", children: n.tool_calls.map((d, p) => /* @__PURE__ */ e(Ut, { tool: d }, p)) }),
      i && /* @__PURE__ */ e(
        "div",
        {
          className: `hb-jv-bubble hb-jv-bubble-assistant${n.error ? " error" : ""}`,
          dangerouslySetInnerHTML: { __html: Ht(n.content) }
        }
      ),
      !i && t && /* @__PURE__ */ e("div", { className: "hb-jv-bubble hb-jv-bubble-assistant", children: /* @__PURE__ */ c("span", { className: "hb-jv-typing", children: [
        /* @__PURE__ */ e("span", {}),
        /* @__PURE__ */ e("span", {}),
        /* @__PURE__ */ e("span", {})
      ] }) })
    ] })
  ] });
}
function qt({ actions: n, onSelect: t, disabled: r }) {
  return n.length === 0 ? null : /* @__PURE__ */ e("div", { className: "hb-jv-quick-actions", children: n.map((i, l) => /* @__PURE__ */ e(
    "button",
    {
      className: "hb-jv-quick-chip",
      onClick: () => t(i.prompt),
      disabled: r,
      children: i.label
    },
    l
  )) });
}
function Bt({
  apiBase: n,
  tenantId: t,
  userId: r
}) {
  const [i, l] = h(!1), { messages: d, streaming: p, context: a, quickActions: s, sendMessage: o, stopStreaming: f, clearMessages: b } = Ft(n, t), [y, m] = h(""), g = A(null), C = A(null), [x] = h(!1);
  M(() => {
    const v = (z) => {
      (z.metaKey || z.ctrlKey) && z.key === "j" && (z.preventDefault(), l((w) => !w)), z.key === "Escape" && i && l(!1);
    };
    return document.addEventListener("keydown", v), () => document.removeEventListener("keydown", v);
  }, [i]), M(() => {
    g.current && g.current.scrollIntoView({ behavior: "smooth" });
  }, [d]), M(() => {
    i && C.current && setTimeout(() => {
      var v;
      return (v = C.current) == null ? void 0 : v.focus();
    }, 100);
  }, [i]);
  const u = j(() => {
    !y.trim() || p || (o(y.trim()), m(""));
  }, [y, p, o]), L = j((v) => {
    o(v);
  }, [o]), S = j((v) => {
    v.key === "Enter" && !v.shiftKey && (v.preventDefault(), u());
  }, [u]), N = i ? re(
    /* @__PURE__ */ e("div", { className: "hb-jv-overlay", onClick: () => l(!1), children: /* @__PURE__ */ c(
      "div",
      {
        className: "hb-jv-panel",
        onClick: (v) => v.stopPropagation(),
        role: "dialog",
        "aria-modal": "true",
        "aria-label": "Jarvis AI Assistant",
        children: [
          /* @__PURE__ */ c("div", { className: "hb-jv-header", children: [
            /* @__PURE__ */ c("div", { className: "hb-jv-header-left", children: [
              /* @__PURE__ */ e(K, { size: 16, color: "#f97316" }),
              /* @__PURE__ */ e("span", { className: "hb-jv-header-title", children: "Jarvis" }),
              /* @__PURE__ */ e("span", { className: "hb-jv-model-badge", children: "GPT-4.1 mini" })
            ] }),
            /* @__PURE__ */ c("div", { className: "hb-jv-header-right", children: [
              d.length > 0 && /* @__PURE__ */ e(
                "button",
                {
                  className: "hb-jv-clear-btn",
                  onClick: b,
                  title: "Clear conversation",
                  "aria-label": "Clear conversation",
                  children: "Clear"
                }
              ),
              /* @__PURE__ */ e(
                "button",
                {
                  className: "hb-jv-close-btn",
                  onClick: () => l(!1),
                  "aria-label": "Close Jarvis",
                  children: /* @__PURE__ */ e(B, { size: 16 })
                }
              )
            ] })
          ] }),
          /* @__PURE__ */ c("div", { className: "hb-jv-messages", children: [
            d.length === 0 ? /* @__PURE__ */ c("div", { className: "hb-jv-welcome", children: [
              /* @__PURE__ */ e("div", { className: "hb-jv-welcome-icon", children: /* @__PURE__ */ e(K, { size: 28, color: "#f97316" }) }),
              /* @__PURE__ */ e("div", { className: "hb-jv-welcome-title", children: "Hey, I'm Jarvis" }),
              /* @__PURE__ */ e("div", { className: "hb-jv-welcome-sub", children: "Your AI assistant for The One Stack. I can help you with tickets, clients, devices, and more." }),
              a.product && /* @__PURE__ */ c("div", { className: "hb-jv-welcome-context", children: [
                "Currently viewing: ",
                /* @__PURE__ */ e("strong", { children: a.product.toUpperCase() }),
                a.entity_type && ` — ${a.entity_type}`,
                a.entity_id && ` ${a.entity_id}`
              ] })
            ] }) : d.map((v, z) => /* @__PURE__ */ e(
              Kt,
              {
                message: v,
                isStreaming: p && z === d.length - 1 && v.role === "assistant"
              },
              v.id
            )),
            /* @__PURE__ */ e("div", { ref: g })
          ] }),
          d.length === 0 && /* @__PURE__ */ e(
            qt,
            {
              actions: s,
              onSelect: L,
              disabled: p
            }
          ),
          /* @__PURE__ */ c("div", { className: "hb-jv-input-area", children: [
            /* @__PURE__ */ c("div", { className: "hb-jv-input-row", children: [
              /* @__PURE__ */ e(
                "textarea",
                {
                  ref: C,
                  className: "hb-jv-input",
                  placeholder: "Ask Jarvis anything...",
                  value: y,
                  onChange: (v) => m(v.target.value),
                  onKeyDown: S,
                  rows: 1,
                  disabled: p
                }
              ),
              p ? /* @__PURE__ */ e(
                "button",
                {
                  className: "hb-jv-stop-btn",
                  onClick: f,
                  title: "Stop generating",
                  "aria-label": "Stop generating",
                  children: /* @__PURE__ */ e("span", { className: "hb-jv-stop-icon" })
                }
              ) : /* @__PURE__ */ e(
                "button",
                {
                  className: "hb-jv-send-btn",
                  onClick: u,
                  disabled: !y.trim(),
                  title: "Send message",
                  "aria-label": "Send message",
                  children: /* @__PURE__ */ c("svg", { width: "16", height: "16", viewBox: "0 0 24 24", fill: "none", stroke: "currentColor", strokeWidth: "2", strokeLinecap: "round", strokeLinejoin: "round", children: [
                    /* @__PURE__ */ e("path", { d: "M22 2L11 13" }),
                    /* @__PURE__ */ e("path", { d: "M22 2L15 22L11 13L2 9L22 2Z" })
                  ] })
                }
              )
            ] }),
            /* @__PURE__ */ c("div", { className: "hb-jv-input-hint", children: [
              /* @__PURE__ */ c("span", { className: "hb-jv-kbd-hint", children: [
                /* @__PURE__ */ e("kbd", { children: "⌘" }),
                /* @__PURE__ */ e("kbd", { children: "J" }),
                " to toggle"
              ] }),
              /* @__PURE__ */ e("span", { className: "hb-jv-powered", children: "Powered by The One AI" })
            ] })
          ] })
        ]
      }
    ) }),
    document.body
  ) : null;
  return /* @__PURE__ */ c(q, { children: [
    /* @__PURE__ */ e(
      "button",
      {
        className: `hb-jv-btn${i ? " active" : ""}${x ? " pulse" : ""}`,
        title: "Jarvis AI Assistant (⌘J)",
        "aria-label": "Open Jarvis AI Assistant",
        "aria-expanded": i,
        onClick: () => l((v) => !v),
        children: /* @__PURE__ */ e(K, { size: 18 })
      }
    ),
    N
  ] });
}
function Wt() {
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
function Qt({
  currentProduct: n,
  apiBase: t,
  signalrEndpoint: r,
  session: i,
  onLogout: l,
  hubUrl: d = ie,
  chatSlot: p,
  supportConfig: a,
  orgBranding: s
}) {
  const o = me(i);
  return o ? /* @__PURE__ */ e(
    Vt,
    {
      currentProduct: n,
      apiBase: t,
      signalrEndpoint: r,
      session: o,
      onLogout: l,
      hubUrl: d,
      chatSlot: p,
      supportConfig: a,
      orgBranding: s
    }
  ) : null;
}
function Vt({
  currentProduct: n,
  apiBase: t,
  signalrEndpoint: r,
  session: i,
  onLogout: l,
  hubUrl: d = ie,
  chatSlot: p,
  supportConfig: a,
  orgBranding: s
}) {
  var F;
  const { products: o } = ge(t, i.tenantId ?? null), { notifications: f, unreadCount: b, markAllRead: y, markRead: m, dismiss: g, muted: C, muteUntil: x, unmute: u, toastQueue: L, dismissToast: S } = xe(
    t,
    r,
    i.tenantId ?? null,
    i.userId ?? null
  ), [N, v] = h(!1), [z, w] = h(!1), [_, E] = h(!1), I = A(!1);
  return M(() => {
    if (I.current || (I.current = !0, document.getElementById("hb-styles"))) return;
    const H = document.createElement("style");
    H.id = "hb-styles", H.textContent = he, document.head.appendChild(H);
  }, []), M(() => {
    const T = document.body.style.paddingTop;
    return document.body.style.paddingTop = `${pe}px`, () => {
      document.body.style.paddingTop = T;
    };
  }, []), /* @__PURE__ */ c("div", { className: "hb-root", role: "banner", children: [
    /* @__PURE__ */ e(et, { toasts: L, onDismiss: S }),
    /* @__PURE__ */ c(
      "div",
      {
        className: "hb-bar",
        style: (F = s == null ? void 0 : s.colors) != null && F.header_bg ? {
          background: s.colors.header_bg,
          color: s.colors.header_text || "#f1f5f9"
        } : void 0,
        children: [
          /* @__PURE__ */ e(
            Je,
            {
              currentProduct: n,
              products: o,
              open: N,
              onToggle: () => {
                w(!1), E(!1), v((T) => !T);
              },
              onClose: () => v(!1),
              hubUrl: d
            }
          ),
          /* @__PURE__ */ c("a", { href: d, className: "hb-logo", "aria-label": s != null && s.company_name ? `${s.company_name} — Home` : "The One Stack — Home", children: [
            s != null && s.logo_icon_url || s != null && s.logo_url ? /* @__PURE__ */ e(
              "img",
              {
                src: s.logo_icon_url || s.logo_url,
                alt: s.company_name || "Logo",
                style: { height: 22, width: "auto", objectFit: "contain" }
              }
            ) : /* @__PURE__ */ e(Wt, {}),
            /* @__PURE__ */ e("span", { className: "hb-logo-name", children: (s == null ? void 0 : s.company_name) || "The One" })
          ] }),
          /* @__PURE__ */ e("div", { className: "hb-divider", "aria-hidden": "true" }),
          (() => {
            const T = o.find((H) => H.id === n);
            return T ? /* @__PURE__ */ e("span", { style: { fontSize: 14, fontWeight: 500, color: "#f1f5f9", whiteSpace: "nowrap" }, children: T.name }) : null;
          })(),
          /* @__PURE__ */ e("div", { style: { flex: 1 } }),
          /* @__PURE__ */ e(Ye, { apiBase: t, tenantId: (i == null ? void 0 : i.tenantId) ?? null }),
          /* @__PURE__ */ e("div", { style: { flex: 1 } }),
          a ? /* @__PURE__ */ e(
            Tt,
            {
              config: a,
              user: {
                email: (i == null ? void 0 : i.email) ?? "",
                name: i ? `${i.firstName ?? ""} ${i.lastName ?? ""}`.trim() || i.email : ""
              }
            }
          ) : p ?? null,
          /* @__PURE__ */ e(
            Bt,
            {
              apiBase: t,
              tenantId: i.tenantId ?? null,
              userId: i.userId ?? null,
              currentProduct: n
            }
          ),
          /* @__PURE__ */ e(
            "a",
            {
              href: `https://docs.theonestack.com/products/${n === "ops-center" ? "" : n + "/"}`,
              target: "_blank",
              rel: "noopener noreferrer",
              className: "hb-help-btn",
              title: "Help & Docs",
              "aria-label": "Help & Documentation",
              style: {
                display: "inline-flex",
                alignItems: "center",
                justifyContent: "center",
                width: 32,
                height: 32,
                borderRadius: "50%",
                color: "#94a3b8",
                textDecoration: "none",
                transition: "color 0.15s, background 0.15s"
              },
              onMouseEnter: (T) => {
                T.currentTarget.style.color = "#f1f5f9", T.currentTarget.style.background = "rgba(255,255,255,0.08)";
              },
              onMouseLeave: (T) => {
                T.currentTarget.style.color = "#94a3b8", T.currentTarget.style.background = "transparent";
              },
              children: /* @__PURE__ */ e(Ne, { size: 18 })
            }
          ),
          /* @__PURE__ */ e(
            Ze,
            {
              notifications: f,
              unreadCount: b,
              open: z,
              onToggle: () => {
                v(!1), E(!1), w((T) => !T);
              },
              onClose: () => w(!1),
              onMarkAllRead: y,
              onMarkRead: m,
              onDismiss: g,
              muted: C,
              onMute: x,
              onUnmute: u,
              hubUrl: d
            }
          ),
          /* @__PURE__ */ e(
            tt,
            {
              session: i,
              open: _,
              onToggle: () => {
                v(!1), w(!1), E((T) => !T);
              },
              onClose: () => E(!1),
              onLogout: l,
              hubUrl: d
            }
          )
        ]
      }
    )
  ] });
}
export {
  W as ALL_PRODUCTS,
  pe as HUB_BAR_HEIGHT,
  ie as HUB_URL,
  Qt as HubBar,
  Bt as JarvisButton,
  Ze as NotificationBell,
  et as NotificationToast,
  Je as ProductSwitcher,
  Q as SEVERITY_COLORS,
  Tt as SupportButton,
  Ye as UnifiedSearch,
  tt as UserMenu,
  me as useHubSession,
  Ft as useJarvis,
  xe as useNotifications,
  ge as useProducts,
  Ge as useSearch
};
