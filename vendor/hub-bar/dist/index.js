import { jsx as e, jsxs as s, Fragment as U } from "react/jsx-runtime";
import { useMemo as Y, useState as b, useEffect as z, useRef as O, useCallback as S, createContext as be, useContext as ue } from "react";
import { createPortal as ee } from "react-dom";
const le = "https://my.theonestack.com", V = [
  { id: "psa", name: "PSA", url: "https://app.theonepsa.com", icon: "briefcase", color: "#3b82f6" },
  { id: "crm", name: "CRM", url: "https://app.theonecrm.app", icon: "target", color: "#0ea5e9" },
  { id: "rmm", name: "RMM", url: "https://app.theonermm.app", icon: "monitor", color: "#14b8a6" },
  { id: "security", name: "Security", url: "https://app.theonesecurity.app", icon: "shield-check", color: "#4f46e5" },
  { id: "defend", name: "Defend", url: "https://app.theonedefend.app", icon: "shield-alert", color: "#E63946" },
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
  { id: "brand", name: "Brand", url: "https://app.theonebrand.app", icon: "palette", color: "#e11d48" },
  { id: "migrate", name: "Migrate", url: "https://app.theonemigrate.app", icon: "arrow-right-left", color: "#0891b2" },
  { id: "relay", name: "Relay", url: "https://app.theonerelay.app", icon: "mail", color: "#f97316" },
  { id: "code", name: "Code", url: "https://app.theonecode.app", icon: "shield-check", color: "#06b6d4" },
  { id: "ai", name: "The One AI", url: "https://app.theoneai.app", icon: "bot", color: "#818cf8" },
  { id: "status", name: "Status", url: "https://app.theonestatus.app", icon: "activity", color: "#2dd4bf" },
  { id: "hub", name: "Hub", url: "https://my.theonestack.com", icon: "layout-grid", color: "#8b5cf6" },
  { id: "ops-center", name: "Ops Center", url: "https://theoneops.app", icon: "activity", color: "#818cf8" },
  { id: "agents", name: "Agents", url: "https://app.theoneagents.app", icon: "bot", color: "#7c3aed" },
  { id: "protect", name: "Protect", url: "https://app.theoneprotect.app", icon: "shield", color: "#10b981" }
], X = {
  info: "#60a5fa",
  success: "#34d399",
  warning: "#fbbf24",
  error: "#f87171"
}, me = 48, fe = `
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
function ge(a) {
  if (typeof document > "u") return null;
  const t = document.cookie.match(new RegExp("(?:^|;\\s*)" + a + "=([^;]*)"));
  if (!t) return null;
  try {
    return decodeURIComponent(t[1]);
  } catch {
    return null;
  }
}
function xe(a) {
  try {
    const t = a.split(".");
    if (t.length !== 3) return null;
    const i = t[1].replace(/-/g, "+").replace(/_/g, "/"), n = i + "=".repeat((4 - i.length % 4) % 4);
    return JSON.parse(atob(n));
  } catch {
    return null;
  }
}
function ve(a, t, i) {
  if (t && i)
    return (t[0] + i[0]).toUpperCase();
  if (t)
    return t.slice(0, 2).toUpperCase();
  const n = a.split("@")[0].split(/[._-]/);
  return n.length >= 2 ? (n[0][0] + n[1][0]).toUpperCase() : a.slice(0, 2).toUpperCase();
}
function ye(a) {
  return Y(() => {
    if (a) return a;
    const t = ge("hub_session");
    if (!t) return null;
    const i = xe(t);
    if (!i) return null;
    const n = i.userId || i.sub || "", o = i.tenantId || i.tenant_id || "", d = i.tenantSlug || "", p = i.tenantName || d, r = i.email || "", c = i.role || "member", l = i.orgRole, m = i.entitlements, u = i.firstName, y = i.lastName;
    return !n || !r ? null : {
      userId: n,
      tenantId: o,
      tenantSlug: d,
      tenantName: p,
      email: r,
      role: c,
      orgRole: l,
      entitlements: m,
      firstName: u,
      lastName: y,
      initials: ve(r, u, y)
    };
  }, [a]);
}
function ke(a, t) {
  const [i, n] = b([]), [o, d] = b(!1), [p, r] = b(null);
  return z(() => {
    if (!t) {
      n(V.map((l) => ({ ...l, active: !1 })));
      return;
    }
    d(!0), r(null);
    const c = new AbortController();
    return fetch(`${a}/api/bus/products?tenant_id=${encodeURIComponent(t)}`, {
      credentials: "include",
      signal: c.signal
    }).then((l) => {
      if (!l.ok) throw new Error(`Products API returned ${l.status}`);
      return l.json();
    }).then((l) => {
      const m = new Set(l.activeProductIds);
      n(
        V.map((u) => ({ ...u, active: m.has(u.id) }))
      ), d(!1);
    }).catch((l) => {
      l.name !== "AbortError" && (n(V.map((m) => ({ ...m, active: !1 }))), r(l.message), d(!1));
    }), () => c.abort();
  }, [a, t]), { products: i, loading: o, error: p };
}
function we(a, t, i, n) {
  const [o, d] = b([]), [p, r] = b([]), [c, l] = b(!1), m = O(null), u = O(null);
  z(() => {
    if (!i || !n) return;
    const j = new AbortController();
    return fetch(`${a}/api/bus/notifications?user_id=${encodeURIComponent(n)}&limit=20`, {
      credentials: "include",
      signal: j.signal
    }).then((C) => C.ok ? C.json() : Promise.resolve({ notifications: [] })).then((C) => {
      d(C.notifications ?? []);
    }).catch(() => {
    }), () => j.abort();
  }, [a, i, n]), z(() => {
    if (!t || !i) return;
    let j = !1;
    return (async () => {
      try {
        const { HubConnectionBuilder: C, LogLevel: v } = await import("./index-CrDahL0u.js"), M = new C().withUrl(`${t}?tenantId=${encodeURIComponent(i)}`).withAutomaticReconnect().configureLogging(v.Warning).build();
        M.on("notification", (N) => {
          d((_) => [N, ..._.slice(0, 49)]), m.current || (r((_) => [..._, N]), setTimeout(() => {
            r((_) => _.filter((T) => T.id !== N.id));
          }, 5e3));
        }), M.on("notificationsRead", (N) => {
          const _ = new Set(N);
          d(
            (T) => T.map((L) => _.has(L.id) ? { ...L, read: !0 } : L)
          );
        }), M.on("busEvent", (N) => {
          const _ = {
            id: N.event_id,
            productId: N.source,
            productName: N.source.toUpperCase(),
            title: N.title,
            body: N.detail,
            severity: N.severity === "critical" ? "error" : N.severity,
            read: !1,
            deepLink: N.entity_url || "",
            createdAt: N.timestamp
          };
          d((T) => [_, ...T.slice(0, 49)]), m.current || (r((T) => [...T, _]), setTimeout(() => {
            r((T) => T.filter((L) => L.id !== _.id));
          }, 5e3));
        }), j || (await M.start(), u.current = M);
      } catch {
      }
    })(), () => {
      var C;
      j = !0, (C = u.current) == null || C.stop(), u.current = null;
    };
  }, [t, i]);
  const y = S((j) => {
    d(
      (C) => C.map((v) => v.id === j ? { ...v, read: !0 } : v)
    ), fetch(`${a}/api/bus/notifications/${encodeURIComponent(j)}/read`, {
      method: "POST",
      credentials: "include"
    }).catch(() => {
    });
  }, [a]), g = S(() => {
    d((j) => j.map((C) => ({ ...C, read: !0 }))), fetch(`${a}/api/bus/notifications/mark-all-read`, {
      method: "POST",
      credentials: "include"
    }).catch(() => {
    });
  }, [a]), h = S((j) => {
    d((C) => C.filter((v) => v.id !== j)), fetch(`${a}/api/bus/notifications/${encodeURIComponent(j)}/dismiss`, {
      method: "POST",
      credentials: "include"
    }).catch(() => {
    });
  }, [a]), w = S((j) => {
    l(!0), m.current && clearTimeout(m.current), m.current = setTimeout(() => {
      l(!1), m.current = null;
    }, j);
  }, []), x = S(() => {
    l(!1), m.current && (clearTimeout(m.current), m.current = null);
  }, []), f = S((j) => {
    r((C) => C.filter((v) => v.id !== j));
  }, []), A = o.filter((j) => !j.read).length;
  return { notifications: o, unreadCount: A, markAllRead: g, markRead: y, dismiss: h, muted: c, muteUntil: w, unmute: x, toastQueue: p, dismissToast: f };
}
const k = (a) => function({ size: i = 16, className: n, color: o = "currentColor" }) {
  const d = Array.isArray(a) ? a : [a];
  return /* @__PURE__ */ e(
    "svg",
    {
      xmlns: "http://www.w3.org/2000/svg",
      width: i,
      height: i,
      viewBox: "0 0 24 24",
      fill: "none",
      stroke: o,
      strokeWidth: "2",
      strokeLinecap: "round",
      strokeLinejoin: "round",
      className: n,
      children: d.map((p, r) => /* @__PURE__ */ e("path", { d: p }, r))
    }
  );
}, Z = k("M21 21l-4.35-4.35M17 11A6 6 0 1 1 5 11a6 6 0 0 1 12 0z"), Ne = k([
  "M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9",
  "M13.73 21a2 2 0 0 1-3.46 0"
]), K = k("M18 6 6 18M6 6l12 12"), Se = k(["M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2", "M12 3a4 4 0 1 0 0 8 4 4 0 0 0 0-8z"]), ce = k([
  "M12 20a8 8 0 1 0 0-16 8 8 0 0 0 0 16z",
  "M12 14a2 2 0 1 0 0-4 2 2 0 0 0 0 4z"
]), Ce = k([
  "M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4",
  "M16 17l5-5-5-5",
  "M21 12H9"
]), je = k([
  "M7 16V4m0 0L3 8m4-4 4 4",
  "M17 8v12m0 0 4-4m-4 4-4-4"
]), ze = k(["M12 22a10 10 0 1 0 0-20 10 10 0 0 0 0 20z", "M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3", "M12 17h.01"]), Me = k([
  "M12 22a10 10 0 1 0 0-20 10 10 0 0 0 0 20z",
  "M12 16a4 4 0 1 0 0-8 4 4 0 0 0 0 8z",
  "M4.93 4.93l4.24 4.24",
  "M14.83 14.83l4.24 4.24",
  "M14.83 9.17l4.24-4.24",
  "M14.83 9.17l3.53-3.53",
  "M4.93 19.07l4.24-4.24"
]), _e = k(["M16 20V4a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16", "M2 10a2 2 0 0 1 2-2h16a2 2 0 0 1 2 2v10H2z"]), Te = k(["M22 12h-4", "M6 12H2", "M12 6V2", "M12 22v-4", "M12 8a4 4 0 1 0 0 8 4 4 0 0 0 0-8z"]), Ee = k(["M2 3h20v14H2z", "M8 21h8", "M12 17v4"]), Oe = k(["M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z", "M9 12l2 2 4-4"]), Ae = k(["M22 12H2", "M5.45 5.11 2 12v6a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2v-6l-3.45-6.89A2 2 0 0 0 16.76 4H7.24a2 2 0 0 0-1.79 1.11z", "M6 16h.01", "M10 16h.01"]), Le = k(["M20 20a2 2 0 0 0 2-2V8a2 2 0 0 0-2-2h-7.9a2 2 0 0 1-1.69-.9L9.6 3.9A2 2 0 0 0 7.93 3H4a2 2 0 0 0-2 2v13a2 2 0 0 0 2 2z", "M8 10v4", "M12 10v2", "M16 10v6"]), $e = k(["M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z", "M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z"]), Ie = k("M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"), q = k(["M9.937 15.5A2 2 0 0 0 8.5 14.063l-6.135-1.582a.5.5 0 0 1 0-.962L8.5 9.936A2 2 0 0 0 9.937 8.5l1.582-6.135a.5.5 0 0 1 .963 0L14.063 8.5A2 2 0 0 0 15.5 9.937l6.135 1.581a.5.5 0 0 1 0 .964L15.5 14.063a2 2 0 0 0-1.437 1.437l-1.582 6.135a.5.5 0 0 1-.963 0z", "M20 3v4", "M22 5h-4"]), Re = k(["M23 7l-7 5 7 5V7z", "M14 5H3a2 2 0 0 0-2 2v10a2 2 0 0 0 2 2h11a2 2 0 0 0 2-2V7a2 2 0 0 0-2-2z"]), Pe = k(["M18 22V8l-6-6-6 6v14", "M2 22h20", "M10 22v-4a2 2 0 0 1 4 0v4", "M12 7v5", "M10 9h4"]), He = k(["M6 22V4a2 2 0 0 1 2-2h8a2 2 0 0 1 2 2v18", "M6 12H4a2 2 0 0 1-2-2V7a2 2 0 0 1 2-2h2", "M18 12h2a2 2 0 0 1 2 2v3a2 2 0 0 1-2 2h-2", "M10 6h4", "M10 10h4", "M10 14h4", "M10 18h4"]), De = k(["M14 18V6a2 2 0 0 0-2-2H4a2 2 0 0 0-2 2v11a1 1 0 0 0 1 1h1", "M15 18h6a1 1 0 0 0 1-1v-3.65a1 1 0 0 0-.22-.624l-3.48-4.35A1 1 0 0 0 17.52 8H14", "M7 18a2 2 0 1 0 0 4 2 2 0 0 0 0-4z", "M17 18a2 2 0 1 0 0 4 2 2 0 0 0 0-4z"]), Fe = k(["M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2", "M9 3a4 4 0 1 0 0 8 4 4 0 0 0 0-8z", "M22 21v-2a4 4 0 0 0-3-3.87", "M16 3.13a4 4 0 0 1 0 7.75"]), Ue = k(["M12 2a9 3 0 1 0 0 6 9 3 0 0 0 0-6z", "M21 12c0 1.66-4 3-9 3s-9-1.34-9-3", "M3 5v14c0 1.66 4 3 9 3s9-1.34 9-3V5"]), Be = k(["M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9", "M13.73 21a2 2 0 0 1-3.46 0", "M2 8c0-2.2.7-4.3 2-6", "M22 8a10 10 0 0 0-2-6"]), Ke = k(["M13 4h3a2 2 0 0 1 2 2v14", "M2 20h3", "M13 20h9", "M10 12v.01", "M13 4.562v16.157a1 1 0 0 1-1.242.97L5 20V5.562a2 2 0 0 1 1.515-1.94l4.243-1.06A2 2 0 0 1 13 4.561z"]), We = k(["M16 2l5 5-14 14L2 16z", "M12 8l-2-2", "M8 12l-2-2"]), qe = k(["M12 2a10 10 0 1 0 0 20 10 10 0 0 0 0-20z", "M2 12h20", "M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"]), Ve = k(["M3 3h7v7H3z", "M14 3h7v7h-7z", "M14 14h7v7h-7z", "M3 14h7v7H3z"]), Ge = k("M22 12h-4l-3 9L9 3l-3 9H2"), Je = k(["M9 20H4a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h3.9a2 2 0 0 1 1.69.9l.81 1.2a2 2 0 0 0 1.67.9H20a2 2 0 0 1 2 2v1", "M12 10v4h4", "M12 14c1.5-2 3.5-3 6-3", "M20 18v-4h-4", "M20 14c-1.5 2-3.5 3-6 3"]), Qe = {
  briefcase: _e,
  target: Te,
  monitor: Ee,
  "shield-check": Oe,
  "hard-drive": Ae,
  "folder-kanban": Le,
  "book-open": $e,
  phone: Ie,
  sparkles: q,
  video: Re,
  church: Pe,
  "building-2": He,
  truck: De,
  users: Fe,
  database: Ue,
  "bell-ring": Be,
  "door-open": Ke,
  scale: We,
  globe: qe,
  search: Z,
  "layout-grid": Ve,
  activity: Ge,
  "folder-sync": Je
};
function Ye() {
  const a = [];
  for (let t = 0; t < 3; t++)
    for (let i = 0; i < 3; i++)
      a.push([6 + i * 7, 6 + t * 7]);
  return /* @__PURE__ */ e("svg", { width: "20", height: "20", viewBox: "0 0 24 24", fill: "none", xmlns: "http://www.w3.org/2000/svg", children: a.map(([t, i], n) => /* @__PURE__ */ e("circle", { cx: t, cy: i, r: "2", fill: "#94a3b8" }, n)) });
}
function ie({ icon: a, size: t = 20 }) {
  const i = Qe[a];
  return i ? /* @__PURE__ */ e(i, { size: t, color: "#fff" }) : /* @__PURE__ */ e("span", { style: { color: "#fff", fontSize: 14, fontWeight: 700 }, children: a.charAt(0).toUpperCase() });
}
function Xe({
  currentProduct: a,
  products: t,
  open: i,
  onToggle: n,
  onClose: o,
  hubUrl: d
}) {
  const p = O(null), r = t.filter((l) => l.active), c = t.filter((l) => !l.active);
  return z(() => {
    if (!i) return;
    function l(u) {
      p.current && !p.current.contains(u.target) && o();
    }
    function m(u) {
      u.key === "Escape" && o();
    }
    return document.addEventListener("mousedown", l), document.addEventListener("keydown", m), () => {
      document.removeEventListener("mousedown", l), document.removeEventListener("keydown", m);
    };
  }, [i, o]), /* @__PURE__ */ s("div", { className: "hb-switcher", ref: p, style: { position: "relative" }, "data-tour": "product-switcher", children: [
    /* @__PURE__ */ e(
      "button",
      {
        className: `hb-waffle-btn${i ? " open" : ""}`,
        onClick: n,
        "aria-expanded": i,
        "aria-label": "App launcher",
        children: /* @__PURE__ */ e(Ye, {})
      }
    ),
    i && /* @__PURE__ */ s("div", { className: "hb-waffle-panel", role: "menu", children: [
      /* @__PURE__ */ e("div", { className: "hb-waffle-header", children: "Apps" }),
      /* @__PURE__ */ e("div", { className: "hb-waffle-grid", children: r.map((l) => /* @__PURE__ */ s(
        "a",
        {
          href: l.url,
          className: "hb-waffle-tile",
          onClick: o,
          role: "menuitem",
          children: [
            /* @__PURE__ */ e(
              "div",
              {
                className: `hb-waffle-tile-icon${l.id === a ? " current" : ""}`,
                style: {
                  background: l.color,
                  color: l.color
                },
                children: /* @__PURE__ */ e(ie, { icon: l.icon, color: l.color })
              }
            ),
            /* @__PURE__ */ e("span", { className: "hb-waffle-tile-name", children: l.name })
          ]
        },
        l.id
      )) }),
      c.length > 0 && /* @__PURE__ */ s(U, { children: [
        /* @__PURE__ */ e("div", { className: "hb-waffle-sep" }),
        /* @__PURE__ */ e("div", { className: "hb-waffle-section-label", children: "Available" }),
        /* @__PURE__ */ e("div", { className: "hb-waffle-grid", children: c.map((l) => /* @__PURE__ */ s(
          "a",
          {
            href: `${d}/products/${l.id}`,
            className: "hb-waffle-tile inactive",
            onClick: o,
            role: "menuitem",
            children: [
              /* @__PURE__ */ e(
                "div",
                {
                  className: "hb-waffle-tile-icon",
                  style: { background: l.color },
                  children: /* @__PURE__ */ e(ie, { icon: l.icon, color: l.color })
                }
              ),
              /* @__PURE__ */ e("span", { className: "hb-waffle-tile-name", children: l.name })
            ]
          },
          l.id
        )) })
      ] }),
      /* @__PURE__ */ e(
        "a",
        {
          href: `${d}/products`,
          className: "hb-waffle-explore",
          onClick: o,
          children: "Explore all products →"
        }
      )
    ] })
  ] });
}
function Ze(a, t, i, n = 200) {
  const [o, d] = b([]), [p, r] = b(!1), c = O(null);
  return z(() => {
    c.current && clearTimeout(c.current);
    const l = i.trim();
    if (!l || !t) {
      d([]), r(!1);
      return;
    }
    r(!0);
    const m = new AbortController();
    return c.current = setTimeout(() => {
      fetch(
        `${a}/api/bus/search?q=${encodeURIComponent(l)}&tenant_id=${encodeURIComponent(t)}`,
        { credentials: "include", signal: m.signal }
      ).then((u) => u.ok ? u.json() : Promise.resolve({ groups: [] })).then((u) => {
        d(u.groups ?? []), r(!1);
      }).catch((u) => {
        u.name !== "AbortError" && (d([]), r(!1));
      });
    }, n), () => {
      m.abort(), c.current && clearTimeout(c.current);
    };
  }, [a, t, i, n]), { results: o, loading: p };
}
function et({ apiBase: a, tenantId: t }) {
  const [i, n] = b(!1), [o, d] = b(""), [p, r] = b(-1), c = O(null), { results: l, loading: m } = Ze(a, t, o), u = l.flatMap((x) => x.results), y = S(() => {
    n(!0), d(""), r(-1), setTimeout(() => {
      var x;
      return (x = c.current) == null ? void 0 : x.focus();
    }, 0);
  }, []), g = S(() => {
    n(!1), d(""), r(-1);
  }, []);
  z(() => {
    function x(f) {
      (f.metaKey || f.ctrlKey) && f.key === "k" && (f.preventDefault(), i ? g() : y()), f.key === "Escape" && i && g();
    }
    return document.addEventListener("keydown", x), () => document.removeEventListener("keydown", x);
  }, [i, y, g]);
  function h(x) {
    if (x.key === "ArrowDown")
      x.preventDefault(), r((f) => Math.min(f + 1, u.length - 1));
    else if (x.key === "ArrowUp")
      x.preventDefault(), r((f) => Math.max(f - 1, -1));
    else if (x.key === "Enter" && p >= 0) {
      const f = u[p];
      f && (window.location.href = f.deepLink, g());
    }
  }
  const w = typeof navigator < "u" && /Mac/i.test(navigator.platform);
  return /* @__PURE__ */ s(U, { children: [
    /* @__PURE__ */ e("div", { className: "hb-search-wrap", "data-tour": "unified-search", children: /* @__PURE__ */ s("button", { className: "hb-search-trigger", onClick: y, "aria-label": "Search (Cmd+K)", children: [
      /* @__PURE__ */ e(Z, { size: 14 }),
      /* @__PURE__ */ e("span", { className: "hb-search-trigger-text", children: "Search everything..." }),
      /* @__PURE__ */ s("span", { className: "hb-kbd", children: [
        /* @__PURE__ */ e("kbd", { children: w ? "⌘" : "Ctrl" }),
        /* @__PURE__ */ e("kbd", { children: "K" })
      ] })
    ] }) }),
    i && /* @__PURE__ */ e(
      "div",
      {
        className: "hb-search-overlay",
        onMouseDown: (x) => {
          x.target === x.currentTarget && g();
        },
        role: "dialog",
        "aria-label": "Search",
        "aria-modal": "true",
        children: /* @__PURE__ */ s("div", { className: "hb-search-modal", children: [
          /* @__PURE__ */ s("div", { className: "hb-search-input-row", children: [
            /* @__PURE__ */ e(Z, { size: 18, color: "#f97316" }),
            /* @__PURE__ */ e(
              "input",
              {
                ref: c,
                className: "hb-search-input",
                placeholder: "Search everything...",
                value: o,
                onChange: (x) => {
                  d(x.target.value), r(-1);
                },
                onKeyDown: h,
                autoComplete: "off",
                spellCheck: !1
              }
            ),
            o && /* @__PURE__ */ e(
              "button",
              {
                style: { background: "none", border: "none", cursor: "pointer", padding: 0, color: "#64748b" },
                onClick: () => d(""),
                "aria-label": "Clear",
                children: /* @__PURE__ */ e(K, { size: 16 })
              }
            )
          ] }),
          /* @__PURE__ */ e(
            tt,
            {
              query: o,
              loading: m,
              results: l,
              focusedIndex: p,
              onNavigate: g
            }
          )
        ] })
      }
    )
  ] });
}
function tt({ query: a, loading: t, results: i, focusedIndex: n, onNavigate: o }) {
  if (!a.trim())
    return /* @__PURE__ */ s("div", { className: "hb-search-empty", children: [
      /* @__PURE__ */ e("div", { children: "Type to search across all products" }),
      /* @__PURE__ */ e("div", { className: "hb-search-empty-hint", children: "Contacts, tickets, invoices, devices, and more" })
    ] });
  if (t)
    return /* @__PURE__ */ s("div", { className: "hb-search-loading", children: [
      /* @__PURE__ */ e("div", { className: "hb-spinner" }),
      "Searching..."
    ] });
  if (!i.length)
    return /* @__PURE__ */ s("div", { className: "hb-search-empty", children: [
      "No results for “",
      a,
      "”"
    ] });
  let d = 0;
  return /* @__PURE__ */ e("div", { className: "hb-search-results", children: i.map((p) => /* @__PURE__ */ s("div", { children: [
    /* @__PURE__ */ s("div", { className: "hb-search-group-label", children: [
      p.productName,
      " — ",
      p.results.length,
      " result",
      p.results.length !== 1 ? "s" : ""
    ] }),
    p.results.map((r) => {
      const c = d++;
      return /* @__PURE__ */ s(
        "a",
        {
          href: r.deepLink,
          className: `hb-search-item${n === c ? " focused" : ""}`,
          onClick: o,
          children: [
            /* @__PURE__ */ e("div", { className: "hb-search-item-icon", children: r.icon ?? r.title.slice(0, 1).toUpperCase() }),
            /* @__PURE__ */ s("div", { className: "hb-search-item-body", children: [
              /* @__PURE__ */ e("div", { className: "hb-search-item-title", children: r.title }),
              r.subtitle && /* @__PURE__ */ e("div", { className: "hb-search-item-sub", children: r.subtitle })
            ] }),
            /* @__PURE__ */ e("span", { className: "hb-source-badge", children: p.productName })
          ]
        },
        r.id
      );
    })
  ] }, p.productId)) });
}
function at(a) {
  const t = Math.floor((Date.now() - new Date(a).getTime()) / 1e3);
  return t < 60 ? "just now" : t < 3600 ? `${Math.floor(t / 60)}m ago` : t < 86400 ? `${Math.floor(t / 3600)}h ago` : `${Math.floor(t / 86400)}d ago`;
}
function it({
  notifications: a,
  unreadCount: t,
  open: i,
  onToggle: n,
  onClose: o,
  onMarkAllRead: d,
  onMarkRead: p,
  onDismiss: r,
  muted: c,
  onMute: l,
  onUnmute: m,
  hubUrl: u
}) {
  const y = O(null);
  return z(() => {
    if (!i) return;
    function g(h) {
      y.current && !y.current.contains(h.target) && o();
    }
    return document.addEventListener("mousedown", g), () => document.removeEventListener("mousedown", g);
  }, [i, o]), /* @__PURE__ */ s("div", { className: "hb-notif", ref: y, "data-tour": "notifications", children: [
    /* @__PURE__ */ s(
      "button",
      {
        className: "hb-notif-btn",
        onClick: n,
        "aria-label": `Notifications${t > 0 ? ` (${t} unread)` : ""}`,
        "aria-expanded": i,
        children: [
          /* @__PURE__ */ e(Ne, { size: 18 }),
          t > 0 && /* @__PURE__ */ e("span", { className: "hb-badge", "aria-hidden": "true", children: t > 99 ? "99+" : t })
        ]
      }
    ),
    i && /* @__PURE__ */ s("div", { className: "hb-notif-dropdown", role: "dialog", "aria-label": "Notifications", children: [
      /* @__PURE__ */ s("div", { className: "hb-notif-header", children: [
        /* @__PURE__ */ e("span", { className: "hb-notif-title", children: "Notifications" }),
        t > 0 && /* @__PURE__ */ e("button", { className: "hb-notif-mark-read", onClick: d, children: "Mark all read" })
      ] }),
      /* @__PURE__ */ e("div", { className: "hb-notif-list", role: "list", children: a.length === 0 ? /* @__PURE__ */ e("div", { className: "hb-notif-empty", children: "No notifications" }) : a.slice(0, 20).map((g) => /* @__PURE__ */ s(
        "div",
        {
          className: `hb-notif-item${g.read ? "" : " unread"}`,
          role: "listitem",
          children: [
            /* @__PURE__ */ s(
              "a",
              {
                href: g.deepLink,
                className: "hb-notif-item-link",
                onClick: () => {
                  p(g.id), o();
                },
                children: [
                  /* @__PURE__ */ e(
                    "span",
                    {
                      className: "hb-notif-icon",
                      style: { background: X[g.severity] },
                      "aria-hidden": "true"
                    }
                  ),
                  /* @__PURE__ */ s("div", { className: "hb-notif-body", children: [
                    /* @__PURE__ */ s("div", { className: "hb-notif-body-title", children: [
                      g.title,
                      g.groupCount && g.groupCount > 1 && /* @__PURE__ */ e("span", { className: "hb-notif-group-badge", children: g.groupCount })
                    ] }),
                    g.body && /* @__PURE__ */ e("div", { className: "hb-notif-body-text", children: g.body }),
                    /* @__PURE__ */ s("div", { className: "hb-notif-meta", children: [
                      /* @__PURE__ */ e("span", { className: "hb-source-badge", children: g.productName }),
                      /* @__PURE__ */ e("span", { className: "hb-notif-time", children: at(g.createdAt) })
                    ] })
                  ] })
                ]
              }
            ),
            /* @__PURE__ */ e(
              "button",
              {
                className: "hb-notif-dismiss",
                onClick: (h) => {
                  h.stopPropagation(), r(g.id);
                },
                "aria-label": "Dismiss notification",
                children: /* @__PURE__ */ e(K, { size: 14 })
              }
            )
          ]
        },
        g.id
      )) }),
      /* @__PURE__ */ e("div", { className: "hb-notif-footer", children: /* @__PURE__ */ s("div", { className: "hb-notif-footer-row", children: [
        c ? /* @__PURE__ */ e("button", { className: "hb-notif-mute-btn", onClick: m, children: "Unmute notifications" }) : /* @__PURE__ */ s("div", { className: "hb-notif-mute-group", children: [
          /* @__PURE__ */ e("button", { className: "hb-notif-mute-btn", onClick: () => l(3600 * 1e3), children: "Mute 1h" }),
          /* @__PURE__ */ e("button", { className: "hb-notif-mute-btn", onClick: () => {
            const g = /* @__PURE__ */ new Date(), h = new Date(g.getFullYear(), g.getMonth(), g.getDate() + 1);
            l(h.getTime() - g.getTime());
          }, children: "Mute today" })
        ] }),
        /* @__PURE__ */ s("a", { href: `${u}/notifications/settings`, onClick: o, className: "hb-notif-settings-link", children: [
          /* @__PURE__ */ e(ce, { size: 14 }),
          "Settings"
        ] })
      ] }) })
    ] })
  ] });
}
function nt({ toasts: a, onDismiss: t }) {
  return a.length === 0 ? null : /* @__PURE__ */ e("div", { className: "hb-toast-container", role: "status", "aria-live": "polite", children: a.slice(0, 3).map((i) => {
    const n = V.find((o) => o.id === i.productId);
    return /* @__PURE__ */ s(
      "div",
      {
        className: "hb-toast",
        style: { borderLeftColor: X[i.severity] },
        children: [
          /* @__PURE__ */ e(
            "span",
            {
              className: "hb-toast-dot",
              style: { background: (n == null ? void 0 : n.color) || X[i.severity] }
            }
          ),
          /* @__PURE__ */ s("div", { className: "hb-toast-body", children: [
            /* @__PURE__ */ e("div", { className: "hb-toast-title", children: i.title }),
            i.body && /* @__PURE__ */ e("div", { className: "hb-toast-text", children: i.body }),
            i.deepLink && /* @__PURE__ */ e("a", { href: i.deepLink, className: "hb-toast-link", children: "View" })
          ] }),
          /* @__PURE__ */ e(
            "button",
            {
              className: "hb-toast-close",
              onClick: () => t(i.id),
              "aria-label": "Dismiss",
              children: /* @__PURE__ */ e(K, { size: 14 })
            }
          )
        ]
      },
      i.id
    );
  }) });
}
function ot({
  session: a,
  open: t,
  onToggle: i,
  onClose: n,
  onLogout: o,
  hubUrl: d
}) {
  const p = O(null);
  z(() => {
    if (!t) return;
    function c(l) {
      p.current && !p.current.contains(l.target) && n();
    }
    return document.addEventListener("mousedown", c), () => document.removeEventListener("mousedown", c);
  }, [t, n]);
  function r() {
    n(), o ? o() : window.location.href = `${d}/logout`;
  }
  return /* @__PURE__ */ s("div", { className: "hb-user", ref: p, "data-tour": "user-menu", children: [
    /* @__PURE__ */ s("button", { className: "hb-user-btn", onClick: i, "aria-expanded": t, "aria-label": "User menu", children: [
      /* @__PURE__ */ e("div", { className: "hb-avatar", children: a.initials }),
      /* @__PURE__ */ e("span", { className: "hb-user-name", children: a.firstName ?? a.email.split("@")[0] }),
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
    t && /* @__PURE__ */ s("div", { className: "hb-user-dropdown", role: "menu", children: [
      /* @__PURE__ */ s("div", { className: "hb-user-info", children: [
        /* @__PURE__ */ e("div", { style: { fontWeight: 600, fontSize: 13, color: "#f1f5f9" }, children: a.firstName && a.lastName ? `${a.firstName} ${a.lastName}` : a.email.split("@")[0] }),
        /* @__PURE__ */ e("div", { className: "hb-user-email", children: a.email }),
        a.tenantName && /* @__PURE__ */ e("div", { className: "hb-user-tenant", children: a.tenantName })
      ] }),
      /* @__PURE__ */ s(
        "a",
        {
          href: `${d}/profile`,
          className: "hb-menu-item",
          onClick: n,
          role: "menuitem",
          children: [
            /* @__PURE__ */ e(Se, { size: 14 }),
            "Profile"
          ]
        }
      ),
      /* @__PURE__ */ s(
        "a",
        {
          href: `${d}/settings`,
          className: "hb-menu-item",
          onClick: n,
          role: "menuitem",
          children: [
            /* @__PURE__ */ e(ce, { size: 14 }),
            "Hub Settings"
          ]
        }
      ),
      /* @__PURE__ */ e("div", { className: "hb-menu-sep" }),
      /* @__PURE__ */ s(
        "a",
        {
          href: `${d}/switch-tenant`,
          className: "hb-menu-item",
          onClick: n,
          role: "menuitem",
          children: [
            /* @__PURE__ */ e(je, { size: 14 }),
            "Switch Tenant"
          ]
        }
      ),
      /* @__PURE__ */ e("div", { className: "hb-menu-sep" }),
      /* @__PURE__ */ s(
        "button",
        {
          className: "hb-menu-item danger",
          onClick: r,
          role: "menuitem",
          children: [
            /* @__PURE__ */ e(Ce, { size: 14 }),
            "Log Out"
          ]
        }
      )
    ] })
  ] });
}
class rt {
  constructor(t) {
    this.baseUrl = t.apiBaseUrl.replace(/\/$/, ""), this.apiKey = t.apiKey, this.platformId = t.platformId;
  }
  async request(t, i = {}) {
    const n = `${this.baseUrl}${t}`, o = await fetch(n, {
      ...i,
      headers: {
        "Content-Type": "application/json",
        "X-Api-Key": this.apiKey,
        ...i.headers
      }
    });
    if (!o.ok) {
      const d = await o.text().catch(() => "");
      throw new Error(`Ops Center API error ${o.status}: ${d}`);
    }
    if (o.status !== 204)
      return o.json();
  }
  // ─── Tickets ───────────────────────────────────────────────
  async createTicket(t) {
    return this.request("/api/tickets", {
      method: "POST",
      body: JSON.stringify({ ...t, platform: this.platformId })
    });
  }
  async listTickets(t = {}) {
    const i = new URLSearchParams({ platform: this.platformId });
    return t.reporter_email && i.set("reporter_email", t.reporter_email), t.status && i.set("status", t.status), t.ticket_type && i.set("ticket_type", t.ticket_type), t.page && i.set("page", String(t.page)), t.page_size && i.set("page_size", String(t.page_size)), this.request(`/api/tickets?${i}`);
  }
  async getTicket(t) {
    return this.request(`/api/tickets/${t}`);
  }
  async getTicketActivity(t) {
    return this.request(`/api/tickets/${t}/activity`);
  }
  async addComment(t, i) {
    return this.request(`/api/tickets/${t}/comment`, {
      method: "POST",
      body: JSON.stringify(i)
    });
  }
  async voteOnTicket(t, i) {
    return this.request(`/api/tickets/${t}/vote`, {
      method: "POST",
      body: JSON.stringify(i)
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
    const i = t ? `?category=${encodeURIComponent(t)}` : "", n = await fetch(`${this.baseUrl}/api/kb-public/${this.platformId}/articles${i}`);
    if (!n.ok) throw new Error(`Failed to fetch KB articles: ${n.status}`);
    return n.json();
  }
  async getKBArticle(t) {
    const i = await fetch(`${this.baseUrl}/api/kb-public/${this.platformId}/articles/${t}`);
    if (!i.ok) throw new Error(`Failed to fetch KB article: ${i.status}`);
    return i.json();
  }
  async searchKB(t) {
    const i = await fetch(`${this.baseUrl}/api/kb-public/${this.platformId}/search?q=${encodeURIComponent(t)}`);
    if (!i.ok) throw new Error(`Failed to search KB: ${i.status}`);
    return i.json();
  }
  // ─── Chat ────────────────────────────────────────────────────
  async startChat(t, i, n) {
    return this.request("/api/chat/sessions", {
      method: "POST",
      body: JSON.stringify({ message: t, user_name: i, user_email: n, platform: this.platformId })
    });
  }
  async sendChatMessage(t, i) {
    return this.request(`/api/chat/sessions/${t}/messages`, {
      method: "POST",
      body: JSON.stringify({ message: i })
    });
  }
  async getChatSession(t) {
    return this.request(`/api/chat/sessions/${t}`);
  }
  async listChatSessions(t) {
    return this.request(`/api/chat/sessions?email=${encodeURIComponent(t)}`);
  }
  async endChat(t, i, n) {
    return this.request(`/api/chat/sessions/${t}/end`, {
      method: "POST",
      body: JSON.stringify({ rating: i, feedback: n })
    });
  }
  async escalateChat(t) {
    return this.request(`/api/chat/sessions/${t}/escalate`, {
      method: "POST",
      body: JSON.stringify({})
    });
  }
  async sendCobrowseEvents(t, i, n) {
    return this.request(`/api/chat/sessions/${t}/cobrowse`, {
      method: "POST",
      body: JSON.stringify({ events: i, sequence: n })
    });
  }
}
const de = be(null);
function R() {
  const a = ue(de);
  if (!a) throw new Error("useSupportContext must be used within <SupportProvider>");
  return a;
}
function st({ config: a, user: t, children: i }) {
  const n = Y(() => new rt(a), [a]), o = Y(() => ({ client: n, config: a, user: t }), [n, a, t]);
  return /* @__PURE__ */ e(de.Provider, { value: o, children: i });
}
function lt(a) {
  const { client: t, user: i } = R(), [n, o] = b([]), [d, p] = b(!0), [r, c] = b(null), l = S(async () => {
    p(!0), c(null);
    try {
      const m = await t.listTickets({
        reporter_email: i.email,
        status: a == null ? void 0 : a.status,
        ticket_type: a == null ? void 0 : a.ticket_type
      });
      o(m);
    } catch (m) {
      c(m instanceof Error ? m.message : "Failed to load tickets");
    } finally {
      p(!1);
    }
  }, [t, i.email, a == null ? void 0 : a.status, a == null ? void 0 : a.ticket_type]);
  return z(() => {
    l();
  }, [l]), { tickets: n, loading: d, error: r, refresh: l };
}
function ct(a) {
  const { client: t } = R(), [i, n] = b(null), [o, d] = b([]), [p, r] = b(!0), [c, l] = b(null), m = S(async () => {
    if (a) {
      r(!0), l(null);
      try {
        const [u, y] = await Promise.all([
          t.getTicket(a),
          t.getTicketActivity(a)
        ]);
        n(u), d(y);
      } catch (u) {
        l(u instanceof Error ? u.message : "Failed to load ticket");
      } finally {
        r(!1);
      }
    }
  }, [t, a]);
  return z(() => {
    m();
  }, [m]), { ticket: i, activity: o, loading: p, error: c, refresh: m };
}
function dt() {
  const { client: a, user: t } = R(), [i, n] = b(!1), [o, d] = b(null);
  return { createTicket: S(async (r) => {
    n(!0), d(null);
    try {
      return await a.createTicket({
        ...r,
        reporter_email: t.email,
        reporter_name: t.name
      });
    } catch (c) {
      return d(c instanceof Error ? c.message : "Failed to create ticket"), null;
    } finally {
      n(!1);
    }
  }, [a, t]), submitting: i, error: o };
}
function pt() {
  const { client: a, user: t } = R(), [i, n] = b(!1), [o, d] = b(null);
  return { addComment: S(async (r, c) => {
    n(!0), d(null);
    try {
      return await a.addComment(r, {
        content: c,
        actor_email: t.email,
        actor_name: t.name
      }), !0;
    } catch (l) {
      return d(l instanceof Error ? l.message : "Failed to add comment"), !1;
    } finally {
      n(!1);
    }
  }, [a, t]), submitting: i, error: o };
}
function ht() {
  const { client: a } = R(), [t, i] = b([]), [n, o] = b(!0), [d, p] = b(null), r = S(async () => {
    o(!0), p(null);
    try {
      const c = await a.getPublicReleases();
      i(c);
    } catch (c) {
      p(c instanceof Error ? c.message : "Failed to load release notes");
    } finally {
      o(!1);
    }
  }, [a]);
  return z(() => {
    r();
  }, [r]), { releases: t, loading: n, error: d, refresh: r };
}
function bt() {
  const { client: a } = R(), [t, i] = b([]), [n, o] = b(!0), [d, p] = b(null), r = S(async () => {
    o(!0), p(null);
    try {
      const c = await a.getFeatures();
      i(c);
    } catch (c) {
      p(c instanceof Error ? c.message : "Failed to load features");
    } finally {
      o(!1);
    }
  }, [a]);
  return z(() => {
    r();
  }, [r]), { features: t, loading: n, error: d, refresh: r };
}
function ut() {
  const { client: a, user: t } = R(), [i, n] = b(null), [o, d] = b(null), p = S(async (c) => {
    n(c), d(null);
    try {
      return await a.voteOnTicket(c, {
        user_email: t.email,
        user_name: t.name
      }), !0;
    } catch (l) {
      return d(l instanceof Error ? l.message : "Failed to vote"), !1;
    } finally {
      n(null);
    }
  }, [a, t]), r = S(async (c) => {
    n(c), d(null);
    try {
      return await a.removeVote(c), !0;
    } catch (l) {
      return d(l instanceof Error ? l.message : "Failed to remove vote"), !1;
    } finally {
      n(null);
    }
  }, [a]);
  return { vote: p, removeVote: r, voting: i, error: o };
}
function mt() {
  const { client: a } = R(), [t, i] = b([]), [n, o] = b(!0), [d, p] = b(null), r = S(async () => {
    o(!0), p(null);
    try {
      const c = await a.getKBCategories();
      i(c);
    } catch (c) {
      p(c instanceof Error ? c.message : "Failed to load categories");
    } finally {
      o(!1);
    }
  }, [a]);
  return z(() => {
    r();
  }, [r]), { categories: t, loading: n, error: d, refresh: r };
}
function ft(a) {
  const { client: t } = R(), [i, n] = b([]), [o, d] = b(!0), [p, r] = b(null), c = S(async () => {
    d(!0), r(null);
    try {
      const l = await t.getKBArticles(a);
      n(l);
    } catch (l) {
      r(l instanceof Error ? l.message : "Failed to load articles");
    } finally {
      d(!1);
    }
  }, [t, a]);
  return z(() => {
    c();
  }, [c]), { articles: i, loading: o, error: p, refresh: c };
}
function gt(a) {
  const { client: t } = R(), [i, n] = b(null), [o, d] = b(!0), [p, r] = b(null), c = S(async () => {
    if (a) {
      d(!0), r(null);
      try {
        const l = await t.getKBArticle(a);
        n(l);
      } catch (l) {
        r(l instanceof Error ? l.message : "Failed to load article");
      } finally {
        d(!1);
      }
    }
  }, [t, a]);
  return z(() => {
    c();
  }, [c]), { article: i, loading: o, error: p, refresh: c };
}
function xt() {
  const { client: a } = R(), [t, i] = b([]), [n, o] = b(!1), [d, p] = b(null), r = S(async (c) => {
    if (!c.trim()) {
      i([]);
      return;
    }
    o(!0), p(null);
    try {
      const l = await a.searchKB(c);
      i(l);
    } catch (l) {
      p(l instanceof Error ? l.message : "Failed to search");
    } finally {
      o(!1);
    }
  }, [a]);
  return { results: t, loading: n, error: d, search: r };
}
const vt = {
  hub: "Support",
  submit: "Submit a Ticket",
  tickets: "My Tickets",
  ticket: "Ticket",
  changelog: "What's New",
  features: "Feature Requests",
  kb: "Knowledge Base",
  "kb-article": "Article",
  chat: "Chat"
}, yt = [
  { id: "bug", label: "Report a Bug", desc: "Something not working? We'll fix it.", type: "bug_report" },
  { id: "feature", label: "Request a Feature", desc: "Have an idea? We want to hear it.", type: "feature_request" },
  { id: "help", label: "Get Help", desc: "Need assistance with something?", type: "service_request" }
];
function kt({ onNav: a }) {
  const { config: t } = R();
  return /* @__PURE__ */ s("div", { className: "hb-sp-hub", children: [
    /* @__PURE__ */ s("div", { className: "hb-sp-hub-header", children: [
      /* @__PURE__ */ e("div", { className: "hb-sp-hub-title", children: "How can we help?" }),
      /* @__PURE__ */ s("div", { className: "hb-sp-hub-sub", children: [
        "Get support for ",
        t.platformName,
        "."
      ] })
    ] }),
    /* @__PURE__ */ e("div", { className: "hb-sp-hub-grid", children: yt.map((i) => /* @__PURE__ */ s("button", { className: "hb-sp-card", onClick: () => a({ id: "submit", ticketType: i.type }), children: [
      /* @__PURE__ */ e("div", { className: "hb-sp-card-label", children: i.label }),
      /* @__PURE__ */ e("div", { className: "hb-sp-card-desc", children: i.desc })
    ] }, i.id)) }),
    /* @__PURE__ */ s("div", { className: "hb-sp-hub-links", children: [
      /* @__PURE__ */ s("button", { className: "hb-sp-link-item", onClick: () => a({ id: "tickets" }), children: [
        /* @__PURE__ */ e("span", { children: "My Tickets" }),
        /* @__PURE__ */ e("span", { className: "hb-sp-chevron", children: "›" })
      ] }),
      /* @__PURE__ */ s("button", { className: "hb-sp-link-item", onClick: () => a({ id: "kb" }), children: [
        /* @__PURE__ */ e("span", { children: "Knowledge Base" }),
        /* @__PURE__ */ e("span", { className: "hb-sp-chevron", children: "›" })
      ] }),
      /* @__PURE__ */ s("button", { className: "hb-sp-link-item", onClick: () => a({ id: "changelog" }), children: [
        /* @__PURE__ */ e("span", { children: "What's New" }),
        /* @__PURE__ */ e("span", { className: "hb-sp-chevron", children: "›" })
      ] }),
      /* @__PURE__ */ s("button", { className: "hb-sp-link-item", onClick: () => a({ id: "features" }), children: [
        /* @__PURE__ */ e("span", { children: "Feature Requests" }),
        /* @__PURE__ */ e("span", { className: "hb-sp-chevron", children: "›" })
      ] })
    ] })
  ] });
}
const wt = [
  { value: "bug_report", label: "Bug Report" },
  { value: "feature_request", label: "Feature Request" },
  { value: "service_request", label: "Service Request" }
], Nt = [
  { value: "low", label: "Low" },
  { value: "medium", label: "Medium" },
  { value: "high", label: "High" },
  { value: "critical", label: "Critical" }
], St = [
  { value: "cosmetic", label: "Cosmetic" },
  { value: "minor", label: "Minor" },
  { value: "major", label: "Major" },
  { value: "blocker", label: "Blocker" }
];
function Ct({ initialType: a, onNav: t }) {
  const [i, n] = b(a || "bug_report"), [o, d] = b(""), [p, r] = b(""), [c, l] = b("medium"), [m, u] = b("minor"), { createTicket: y, submitting: g, error: h } = dt(), [w, x] = b(null);
  return w ? /* @__PURE__ */ s("div", { className: "hb-sp-success", children: [
    /* @__PURE__ */ e("div", { className: "hb-sp-success-icon", children: "✓" }),
    /* @__PURE__ */ e("div", { className: "hb-sp-success-title", children: "Ticket Submitted" }),
    /* @__PURE__ */ e("div", { className: "hb-sp-success-num", children: w }),
    /* @__PURE__ */ s("div", { className: "hb-sp-success-actions", children: [
      /* @__PURE__ */ e("button", { className: "hb-sp-btn hb-sp-btn-secondary", onClick: () => t({ id: "tickets" }), children: "View My Tickets" }),
      /* @__PURE__ */ e("button", { className: "hb-sp-btn hb-sp-btn-ghost", onClick: () => t({ id: "hub" }), children: "Back to Support" })
    ] })
  ] }) : /* @__PURE__ */ s("div", { className: "hb-sp-form-page", children: [
    /* @__PURE__ */ s("div", { className: "hb-sp-field", children: [
      /* @__PURE__ */ e("label", { className: "hb-sp-label", children: "Type" }),
      /* @__PURE__ */ e("div", { className: "hb-sp-type-row", children: wt.map((f) => /* @__PURE__ */ e(
        "button",
        {
          type: "button",
          className: `hb-sp-type-btn${i === f.value ? " active" : ""}`,
          onClick: () => n(f.value),
          children: f.label
        },
        f.value
      )) })
    ] }),
    /* @__PURE__ */ s("div", { className: "hb-sp-field", children: [
      /* @__PURE__ */ e("label", { className: "hb-sp-label", htmlFor: "sp-title", children: "Title" }),
      /* @__PURE__ */ e(
        "input",
        {
          id: "sp-title",
          className: "hb-sp-input",
          value: o,
          onChange: (f) => d(f.target.value),
          placeholder: "Brief description...",
          maxLength: 200
        }
      ),
      /* @__PURE__ */ s("div", { className: "hb-sp-char-count", children: [
        o.length,
        "/200"
      ] })
    ] }),
    /* @__PURE__ */ s("div", { className: "hb-sp-field", children: [
      /* @__PURE__ */ e("label", { className: "hb-sp-label", htmlFor: "sp-desc", children: "Description" }),
      /* @__PURE__ */ e(
        "textarea",
        {
          id: "sp-desc",
          className: "hb-sp-textarea",
          value: p,
          onChange: (f) => r(f.target.value),
          placeholder: "Provide as much detail as possible...",
          rows: 6,
          maxLength: 5e3
        }
      ),
      /* @__PURE__ */ s("div", { className: "hb-sp-char-count", children: [
        p.length,
        "/5000"
      ] })
    ] }),
    /* @__PURE__ */ s("div", { className: "hb-sp-field", children: [
      /* @__PURE__ */ e("label", { className: "hb-sp-label", children: "Priority" }),
      /* @__PURE__ */ e("div", { className: "hb-sp-chip-row", children: Nt.map((f) => /* @__PURE__ */ e(
        "button",
        {
          type: "button",
          className: `hb-sp-chip${c === f.value ? " active" : ""}`,
          onClick: () => l(f.value),
          children: f.label
        },
        f.value
      )) })
    ] }),
    i === "bug_report" && /* @__PURE__ */ s("div", { className: "hb-sp-field", children: [
      /* @__PURE__ */ e("label", { className: "hb-sp-label", children: "Severity" }),
      /* @__PURE__ */ e("div", { className: "hb-sp-chip-row", children: St.map((f) => /* @__PURE__ */ e(
        "button",
        {
          type: "button",
          className: `hb-sp-chip${m === f.value ? " active" : ""}`,
          onClick: () => u(f.value),
          children: f.label
        },
        f.value
      )) })
    ] }),
    h && /* @__PURE__ */ e("div", { className: "hb-sp-error", children: h }),
    /* @__PURE__ */ e(
      "button",
      {
        className: "hb-sp-btn hb-sp-btn-primary",
        disabled: g || !o.trim() || !p.trim(),
        onClick: async () => {
          const f = await y({
            ticket_type: i,
            title: o.trim(),
            description: p.trim(),
            priority: c,
            severity: i === "bug_report" ? m : void 0
          });
          f && x(f.ticket_number);
        },
        children: g ? "Submitting…" : "Submit Ticket"
      }
    )
  ] });
}
const pe = {
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
function jt({ onNav: a }) {
  const [t, i] = b(""), { tickets: n, loading: o, error: d } = lt({ status: t || void 0 });
  return /* @__PURE__ */ s("div", { className: "hb-sp-list-page", children: [
    /* @__PURE__ */ s("div", { className: "hb-sp-filter-row", children: [
      [["", "All"], ["new,triaged,in_progress,waiting_reporter,waiting_external,on_hold", "Open"], ["resolved,closed", "Closed"]].map(([p, r]) => /* @__PURE__ */ e(
        "button",
        {
          className: `hb-sp-filter-btn${t === p ? " active" : ""}`,
          onClick: () => i(p),
          children: r
        },
        p
      )),
      /* @__PURE__ */ e("button", { className: "hb-sp-filter-btn hb-sp-filter-btn-new", onClick: () => a({ id: "submit" }), children: "+ New" })
    ] }),
    o ? /* @__PURE__ */ e("div", { className: "hb-sp-list", children: [0, 1, 2].map((p) => /* @__PURE__ */ e("div", { className: "hb-sp-skeleton" }, p)) }) : d ? /* @__PURE__ */ e("div", { className: "hb-sp-error", children: d }) : n.length === 0 ? /* @__PURE__ */ s("div", { className: "hb-sp-empty", children: [
      /* @__PURE__ */ e("div", { className: "hb-sp-empty-text", children: "No tickets found" }),
      /* @__PURE__ */ e("button", { className: "hb-sp-btn hb-sp-btn-secondary", onClick: () => a({ id: "submit" }), children: "Submit a Ticket" })
    ] }) : /* @__PURE__ */ e("div", { className: "hb-sp-list", children: n.map((p) => /* @__PURE__ */ s("button", { className: "hb-sp-list-item", onClick: () => a({ id: "ticket", ticketId: p.id }), children: [
      /* @__PURE__ */ s("div", { className: "hb-sp-ticket-top", children: [
        /* @__PURE__ */ e("span", { className: "hb-sp-ticket-num", children: p.ticket_number }),
        /* @__PURE__ */ e("span", { className: "hb-sp-badge", children: pe[p.status] ?? p.status })
      ] }),
      /* @__PURE__ */ e("div", { className: "hb-sp-ticket-title", children: p.title }),
      /* @__PURE__ */ e("div", { className: "hb-sp-ticket-meta", children: new Date(p.created_at).toLocaleDateString(void 0, { month: "short", day: "numeric", year: "numeric" }) })
    ] }, p.id)) })
  ] });
}
function zt({ ticketId: a }) {
  const { ticket: t, activity: i, loading: n, error: o } = ct(a), { addComment: d, submitting: p } = pt(), [r, c] = b("");
  return n ? /* @__PURE__ */ e("div", { className: "hb-sp-loading", children: "Loading ticket…" }) : o || !t ? /* @__PURE__ */ e("div", { className: "hb-sp-error", children: o ?? "Ticket not found" }) : /* @__PURE__ */ s("div", { className: "hb-sp-detail-page", children: [
    /* @__PURE__ */ s("div", { className: "hb-sp-detail-header", children: [
      /* @__PURE__ */ e("span", { className: "hb-sp-ticket-num", children: t.ticket_number }),
      /* @__PURE__ */ e("span", { className: "hb-sp-badge", children: pe[t.status] ?? t.status })
    ] }),
    /* @__PURE__ */ e("div", { className: "hb-sp-detail-title", children: t.title }),
    /* @__PURE__ */ e("div", { className: "hb-sp-detail-desc", children: t.description }),
    i.length > 0 && /* @__PURE__ */ s("div", { className: "hb-sp-activity", children: [
      /* @__PURE__ */ e("div", { className: "hb-sp-activity-title", children: "Activity" }),
      i.filter((l) => !l.is_internal).map((l) => /* @__PURE__ */ s("div", { className: "hb-sp-activity-item", children: [
        /* @__PURE__ */ e("div", { className: "hb-sp-activity-actor", children: l.actor_name }),
        l.content && /* @__PURE__ */ e("div", { className: "hb-sp-activity-content", children: l.content }),
        /* @__PURE__ */ e("div", { className: "hb-sp-activity-time", children: new Date(l.created_at).toLocaleString() })
      ] }, l.id))
    ] }),
    /* @__PURE__ */ s("div", { className: "hb-sp-reply", children: [
      /* @__PURE__ */ e(
        "textarea",
        {
          className: "hb-sp-textarea",
          rows: 3,
          placeholder: "Add a comment…",
          value: r,
          onChange: (l) => c(l.target.value)
        }
      ),
      /* @__PURE__ */ e(
        "button",
        {
          className: "hb-sp-btn hb-sp-btn-primary",
          disabled: p || !r.trim(),
          onClick: async () => {
            await d(t.id, r.trim()) && c("");
          },
          children: p ? "Sending…" : "Send"
        }
      )
    ] })
  ] });
}
function Mt() {
  const { releases: a, loading: t, error: i } = ht();
  return t ? /* @__PURE__ */ e("div", { className: "hb-sp-loading", children: "Loading releases…" }) : i ? /* @__PURE__ */ e("div", { className: "hb-sp-error", children: i }) : a.length === 0 ? /* @__PURE__ */ e("div", { className: "hb-sp-empty", children: /* @__PURE__ */ e("div", { className: "hb-sp-empty-text", children: "No releases yet." }) }) : /* @__PURE__ */ e("div", { className: "hb-sp-list-page", children: a.map((n, o) => /* @__PURE__ */ s("div", { className: "hb-sp-release", children: [
    /* @__PURE__ */ s("div", { className: "hb-sp-release-header", children: [
      /* @__PURE__ */ s("span", { className: "hb-sp-release-ver", children: [
        "v",
        n.version
      ] }),
      /* @__PURE__ */ e("span", { className: "hb-sp-release-date", children: new Date(n.released_date).toLocaleDateString(void 0, { month: "short", day: "numeric", year: "numeric" }) })
    ] }),
    /* @__PURE__ */ e("div", { className: "hb-sp-release-title", children: n.title }),
    /* @__PURE__ */ e("div", { className: "hb-sp-release-notes", children: n.release_notes })
  ] }, o)) });
}
const _t = {
  proposed: "Proposed",
  planned: "Planned",
  in_progress: "In Progress",
  shipped: "Shipped",
  cancelled: "Cancelled"
};
function Tt() {
  const { features: a, loading: t, error: i } = bt(), { vote: n, voting: o } = ut(), [d, p] = b(/* @__PURE__ */ new Set());
  return t ? /* @__PURE__ */ e("div", { className: "hb-sp-loading", children: "Loading features…" }) : i ? /* @__PURE__ */ e("div", { className: "hb-sp-error", children: i }) : a.length === 0 ? /* @__PURE__ */ e("div", { className: "hb-sp-empty", children: /* @__PURE__ */ e("div", { className: "hb-sp-empty-text", children: "No feature requests yet." }) }) : /* @__PURE__ */ e("div", { className: "hb-sp-list-page", children: a.map((r) => {
    var c;
    return /* @__PURE__ */ s("div", { className: "hb-sp-feature-item", children: [
      /* @__PURE__ */ s("div", { className: "hb-sp-feature-body", children: [
        /* @__PURE__ */ e("div", { className: "hb-sp-feature-title", children: r.title }),
        /* @__PURE__ */ e("div", { className: "hb-sp-feature-desc", children: r.description }),
        /* @__PURE__ */ e("span", { className: "hb-sp-badge", children: _t[r.status] ?? r.status })
      ] }),
      /* @__PURE__ */ s(
        "button",
        {
          className: `hb-sp-vote-btn${d.has(r.id) ? " voted" : ""}`,
          disabled: o === r.id,
          onClick: async () => {
            await n(r.id) && p((m) => /* @__PURE__ */ new Set([...m, r.id]));
          },
          children: [
            "▲ ",
            ((c = r.tags) == null ? void 0 : c.length) ?? 0
          ]
        }
      )
    ] }, r.id);
  }) });
}
function Et({ onNav: a, category: t }) {
  const { categories: i, loading: n } = mt(), { articles: o, loading: d } = ft(t), { search: p, results: r, loading: c } = xt(), [l, m] = b(""), u = O(null), y = (h) => {
    m(h), u.current && clearTimeout(u.current), u.current = setTimeout(() => p(h), 300);
  }, g = l.trim().length > 0;
  return /* @__PURE__ */ s("div", { className: "hb-sp-list-page", children: [
    /* @__PURE__ */ e("div", { className: "hb-sp-search-row", children: /* @__PURE__ */ e(
      "input",
      {
        className: "hb-sp-input",
        placeholder: "Search knowledge base…",
        value: l,
        onChange: (h) => y(h.target.value)
      }
    ) }),
    g ? c ? /* @__PURE__ */ e("div", { className: "hb-sp-loading", children: "Searching…" }) : r.length === 0 ? /* @__PURE__ */ e("div", { className: "hb-sp-empty", children: /* @__PURE__ */ s("div", { className: "hb-sp-empty-text", children: [
      'No results for "',
      l,
      '"'
    ] }) }) : /* @__PURE__ */ e("div", { className: "hb-sp-list", children: r.map((h) => /* @__PURE__ */ s("button", { className: "hb-sp-list-item", onClick: () => a({ id: "kb-article", slug: h.slug }), children: [
      /* @__PURE__ */ e("div", { className: "hb-sp-ticket-title", children: h.title }),
      h.excerpt && /* @__PURE__ */ e("div", { className: "hb-sp-ticket-meta", children: h.excerpt })
    ] }, h.id)) }) : /* @__PURE__ */ s(U, { children: [
      !t && !n && i.length > 0 && /* @__PURE__ */ e("div", { className: "hb-sp-kb-cats", children: i.map((h) => /* @__PURE__ */ s("button", { className: "hb-sp-kb-cat", onClick: () => a({ id: "kb", category: h.slug }), children: [
        /* @__PURE__ */ e("span", { children: h.name }),
        /* @__PURE__ */ e("span", { className: "hb-sp-kb-cat-count", children: h.article_count })
      ] }, h.id)) }),
      d ? /* @__PURE__ */ e("div", { className: "hb-sp-loading", children: "Loading…" }) : o.length === 0 ? /* @__PURE__ */ e("div", { className: "hb-sp-empty", children: /* @__PURE__ */ e("div", { className: "hb-sp-empty-text", children: "No articles in this category." }) }) : /* @__PURE__ */ e("div", { className: "hb-sp-list", children: o.map((h) => /* @__PURE__ */ s("button", { className: "hb-sp-list-item", onClick: () => a({ id: "kb-article", slug: h.slug }), children: [
        /* @__PURE__ */ e("div", { className: "hb-sp-ticket-title", children: h.title }),
        h.excerpt && /* @__PURE__ */ e("div", { className: "hb-sp-ticket-meta", children: h.excerpt })
      ] }, h.id)) })
    ] })
  ] });
}
function Ot({ slug: a }) {
  const { article: t, loading: i, error: n } = gt(a);
  return i ? /* @__PURE__ */ e("div", { className: "hb-sp-loading", children: "Loading article…" }) : n || !t ? /* @__PURE__ */ e("div", { className: "hb-sp-error", children: n ?? "Article not found" }) : /* @__PURE__ */ s("div", { className: "hb-sp-detail-page", children: [
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
function At({ page: a, onNav: t }) {
  return a.id === "hub" ? /* @__PURE__ */ e(kt, { onNav: t }) : a.id === "submit" ? /* @__PURE__ */ e(Ct, { initialType: a.ticketType, onNav: t }) : a.id === "tickets" ? /* @__PURE__ */ e(jt, { onNav: t }) : a.id === "ticket" ? /* @__PURE__ */ e(zt, { ticketId: a.ticketId }) : a.id === "changelog" ? /* @__PURE__ */ e(Mt, {}) : a.id === "features" ? /* @__PURE__ */ e(Tt, {}) : a.id === "kb" ? /* @__PURE__ */ e(Et, { onNav: t, category: a.category }) : a.id === "kb-article" ? /* @__PURE__ */ e(Ot, { slug: a.slug }) : a.id === "chat" ? /* @__PURE__ */ e("div", { className: "hb-sp-empty", children: /* @__PURE__ */ e("div", { className: "hb-sp-empty-text", children: "Live chat coming soon." }) }) : null;
}
function Lt({ config: a, user: t }) {
  const [i, n] = b(!1), [o, d] = b({ id: "hub" }), [p, r] = b([]), c = O(null), l = S((w) => {
    r((x) => [...x, o]), d(w), c.current && (c.current.scrollTop = 0);
  }, [o]), m = S(() => {
    r((w) => {
      const x = [...w], f = x.pop();
      return f && d(f), x;
    }), c.current && (c.current.scrollTop = 0);
  }, []), u = S(() => {
    n(!1), setTimeout(() => {
      d({ id: "hub" }), r([]);
    }, 200);
  }, []);
  z(() => {
    if (!i) return;
    const w = (x) => {
      x.key === "Escape" && u();
    };
    return document.addEventListener("keydown", w), () => document.removeEventListener("keydown", w);
  }, [i, u]);
  const y = p.length > 0, g = vt[o.id] ?? "Support", h = i ? ee(
    /* @__PURE__ */ e("div", { className: "hb-sp-overlay", onClick: u, "aria-hidden": "true", children: /* @__PURE__ */ s(
      "div",
      {
        className: `hb-sp-panel${i ? " open" : ""}`,
        onClick: (w) => w.stopPropagation(),
        role: "dialog",
        "aria-modal": "true",
        "aria-label": "Support",
        children: [
          /* @__PURE__ */ s("div", { className: "hb-sp-header", children: [
            y ? /* @__PURE__ */ e("button", { className: "hb-sp-back-btn", onClick: m, "aria-label": "Go back", children: "‹ Back" }) : /* @__PURE__ */ e("div", { className: "hb-sp-header-title", children: g }),
            y && /* @__PURE__ */ e("div", { className: "hb-sp-header-title", children: g }),
            /* @__PURE__ */ e("button", { className: "hb-sp-close-btn", onClick: u, "aria-label": "Close support panel", children: /* @__PURE__ */ e(K, { size: 16 }) })
          ] }),
          /* @__PURE__ */ e("div", { className: "hb-sp-content", ref: c, children: /* @__PURE__ */ e(st, { config: a, user: t, children: /* @__PURE__ */ e(At, { page: o, onNav: l }) }) })
        ]
      }
    ) }),
    document.body
  ) : null;
  return /* @__PURE__ */ s(U, { children: [
    /* @__PURE__ */ e(
      "button",
      {
        className: `hb-chat-btn${i ? " open" : ""}`,
        title: "Support",
        "aria-label": "Open support panel",
        "aria-expanded": i,
        onClick: () => n((w) => !w),
        children: /* @__PURE__ */ e(Me, { size: 18 })
      }
    ),
    h
  ] });
}
const B = "https://docs.theonestack.com", ne = {
  psa: {
    path: "/docs/psa/",
    articles: [
      { title: "PSA Overview", path: "/docs/psa/" },
      { title: "Working with Tickets", path: "/docs/psa/tickets/" },
      { title: "Time Tracking", path: "/docs/psa/time-tracking/" },
      { title: "SLA Management", path: "/docs/psa/sla-management/" },
      { title: "Service Catalog", path: "/docs/psa/service-catalog/" }
    ]
  },
  crm: {
    path: "/docs/crm/",
    articles: [
      { title: "CRM Overview", path: "/docs/crm/" },
      { title: "Companies & Contacts", path: "/docs/crm/companies-contacts/" },
      { title: "Deals & Pipeline", path: "/docs/crm/deals-pipeline/" },
      { title: "Lead Scoring", path: "/docs/crm/lead-scoring/" }
    ]
  },
  books: {
    path: "/docs/books/",
    articles: [
      { title: "Books Overview", path: "/docs/books/" },
      { title: "Invoices & Payments", path: "/docs/books/invoices-payments/" },
      { title: "Chart of Accounts", path: "/docs/books/chart-of-accounts/" }
    ]
  },
  rmm: {
    path: "/docs/rmm/",
    articles: [
      { title: "RMM Overview", path: "/docs/rmm/" },
      { title: "Device Management", path: "/docs/rmm/device-management/" },
      { title: "Monitoring & Alerts", path: "/docs/rmm/monitoring-alerts/" }
    ]
  },
  security: {
    path: "/docs/security/",
    articles: [
      { title: "Security Overview", path: "/docs/security/" },
      { title: "Threat Detection", path: "/docs/security/threat-detection/" }
    ]
  },
  collective: {
    path: "/docs/collective/",
    articles: [
      { title: "Collective Overview", path: "/docs/collective/" },
      { title: "Community", path: "/docs/collective/community/" },
      { title: "Marketplace", path: "/docs/collective/marketplace/" }
    ]
  },
  hub: {
    path: "/docs/getting-started/",
    articles: [
      { title: "Hub Overview", path: "/docs/hub/" },
      { title: "Team Setup", path: "/docs/getting-started/team-setup/" },
      { title: "Permissions & Roles", path: "/docs/admin/permissions/" },
      { title: "Billing & Subscriptions", path: "/docs/admin/billing/" }
    ]
  },
  defend: {
    path: "/docs/defend/",
    articles: [
      { title: "Defend Overview", path: "/docs/defend/" },
      { title: "Endpoint Detection", path: "/docs/defend/detection-rules/" },
      { title: "Threat Hunting", path: "/docs/defend/threat-investigation/" },
      { title: "Incident Response", path: "/docs/defend/response-actions/" }
    ]
  },
  backups: {
    path: "/docs/backups/",
    articles: [
      { title: "Backups Overview", path: "/docs/backups/" },
      { title: "Backup Policies", path: "/docs/backups/backup-policies/" },
      { title: "Restore Procedures", path: "/docs/backups/restore-procedures/" },
      { title: "Disaster Recovery", path: "/docs/backups/dr-testing/" }
    ]
  },
  voice: {
    path: "/docs/voice/",
    articles: [
      { title: "Voice Overview", path: "/docs/voice/" },
      { title: "Call Management", path: "/docs/voice/call-routing/" },
      { title: "Voicemail", path: "/docs/voice/voicemail/" },
      { title: "Screen Pop", path: "/docs/voice/integrations/" }
    ]
  },
  portal: {
    path: "/docs/portal/",
    articles: [
      { title: "Portal Overview", path: "/docs/portal/" },
      { title: "Custom Domains", path: "/docs/portal/multi-org-routing/" },
      { title: "Client Access", path: "/docs/portal/client-login/" },
      { title: "Knowledge Base", path: "/docs/portal/knowledge-base/" }
    ]
  },
  oncall: {
    path: "/docs/oncall/",
    articles: [
      { title: "On-Call Overview", path: "/docs/oncall/" },
      { title: "Schedules", path: "/docs/oncall/on-call-schedules/" },
      { title: "Escalation Policies", path: "/docs/oncall/escalation-policies/" },
      { title: "Alerting", path: "/docs/oncall/alert-routing/" }
    ]
  },
  agents: {
    path: "/docs/agents/",
    articles: [
      { title: "Agents Overview", path: "/docs/agents/" },
      { title: "Agent Builder", path: "/docs/agents/building-agents/" },
      { title: "Dispatch", path: "/docs/agents/core-concepts/" },
      { title: "System Agents", path: "/docs/agents/system-agents/" }
    ]
  },
  fleet: {
    path: "/docs/fleet/",
    articles: [
      { title: "Fleet Overview", path: "/docs/fleet/" },
      { title: "Vehicle Tracking", path: "/docs/fleet/gps-tracking/" },
      { title: "Maintenance", path: "/docs/fleet/maintenance-scheduling/" },
      { title: "Trip Logs", path: "/docs/fleet/reports/" }
    ]
  },
  cmdb: {
    path: "/docs/cmdb/",
    articles: [
      { title: "CMDB Overview", path: "/docs/cmdb/" },
      { title: "Asset Discovery", path: "/docs/cmdb/asset-inventory/" },
      { title: "Configuration Items", path: "/docs/cmdb/flexible-assets/" },
      { title: "Relationships", path: "/docs/cmdb/ci-relationships/" }
    ]
  },
  projects: {
    path: "/docs/projects/",
    articles: [
      { title: "Projects Overview", path: "/docs/projects/" },
      { title: "Task Management", path: "/docs/projects/task-management/" },
      { title: "Milestones", path: "/docs/projects/milestones/" },
      { title: "Gantt View", path: "/docs/projects/gantt-view/" }
    ]
  },
  people: {
    path: "/docs/people/",
    articles: [
      { title: "People Overview", path: "/docs/people/" },
      { title: "Employee Directory", path: "/docs/people/employee-directory/" },
      { title: "Onboarding", path: "/docs/people/onboarding-workflows/" },
      { title: "Time Off", path: "/docs/people/time-off/" }
    ]
  },
  legal: {
    path: "/docs/legal/",
    articles: [
      { title: "Legal Overview", path: "/docs/legal/" },
      { title: "Contracts", path: "/docs/legal/matter-management/" },
      { title: "eDiscovery", path: "/docs/legal/document-vault/" },
      { title: "Compliance", path: "/docs/legal/compliance-dashboard/" }
    ]
  },
  brand: {
    path: "/docs/brand/",
    articles: [
      { title: "Brand Overview", path: "/docs/brand/" },
      { title: "Brand Kit", path: "/docs/brand/brand-library/" },
      { title: "Design System", path: "/docs/brand/brand-settings/" },
      { title: "Assets", path: "/docs/brand/collateral/" }
    ]
  },
  visitor: {
    path: "/docs/visitor/",
    articles: [
      { title: "Visitor Overview", path: "/docs/visitor/overview/" },
      { title: "Check-In", path: "/docs/visitor/visitor-check-in/" },
      { title: "Badge Printing", path: "/docs/visitor/badge-printing/" },
      { title: "Host Notification", path: "/docs/visitor/host-notifications/" }
    ]
  },
  status: {
    path: "/docs/status/",
    articles: [
      { title: "Status Overview", path: "/docs/status/" },
      { title: "Status Pages", path: "/docs/status/status-page-setup/" },
      { title: "Incidents", path: "/docs/status/incident-creation/" },
      { title: "Maintenance", path: "/docs/status/maintenance-windows/" }
    ]
  },
  mission: {
    path: "/docs/mission/",
    articles: [
      { title: "Mission Overview", path: "/docs/mission/" },
      { title: "Giving", path: "/docs/mission/giving/" },
      { title: "Events", path: "/docs/mission/events/" },
      { title: "Groups", path: "/docs/mission/groups/" }
    ]
  },
  ams: {
    path: "/docs/ams/",
    articles: [
      { title: "AMS Overview", path: "/docs/ams/" },
      { title: "Membership", path: "/docs/ams/member-management/" },
      { title: "Events", path: "/docs/ams/events/" },
      { title: "Communications", path: "/docs/ams/communications/" }
    ]
  },
  code: {
    path: "/docs/code/",
    articles: [
      { title: "Code Overview", path: "/docs/code/" },
      { title: "Repositories", path: "/docs/code/github-integration/" },
      { title: "Code Review", path: "/docs/code/security-scanning/" },
      { title: "AppSec", path: "/docs/code/compliance/" }
    ]
  },
  "ai-platform": {
    path: "/docs/ai-platform/",
    articles: [
      { title: "AI Platform Overview", path: "/docs/ai-platform/" },
      { title: "AI Studio", path: "/docs/ai-platform/studio/" },
      { title: "Model Management", path: "/docs/ai-platform/model-selection/" },
      { title: "Prompts", path: "/docs/ai-platform/prompt-templates/" }
    ]
  },
  migrate: {
    path: "/docs/migrate/",
    articles: [
      { title: "Migrate Overview", path: "/docs/migrate/" },
      { title: "Getting Started", path: "/docs/migrate/getting-started/" },
      { title: "Data Mapping", path: "/docs/migrate/jobs/" },
      { title: "Progress Tracking", path: "/docs/migrate/progress-tracking/" }
    ]
  },
  relay: {
    path: "/docs/relay/",
    articles: [
      { title: "Relay Overview", path: "/docs/relay/" },
      { title: "Email Relay", path: "/docs/relay/sending-emails/" },
      { title: "Shared Mailboxes", path: "/docs/relay/inbound-routing/" },
      { title: "Routing", path: "/docs/relay/domain-setup/" }
    ]
  },
  compliance: {
    path: "/docs/compliance/",
    articles: [
      { title: "Compliance Overview", path: "/docs/compliance/" },
      { title: "Frameworks", path: "/docs/compliance/frameworks/" },
      { title: "Evidence Collection", path: "/docs/compliance/evidence-collection/" },
      { title: "Audit Prep", path: "/docs/compliance/audit-prep/" }
    ]
  },
  protect: {
    path: "/docs/protect/",
    articles: [
      { title: "Protect Overview", path: "/docs/protect/" },
      { title: "SaaS Security", path: "/docs/protect/saas-security/" },
      { title: "Dark Web Monitoring", path: "/docs/protect/dark-web-monitoring/" },
      { title: "Email Security", path: "/docs/protect/email-security/" }
    ]
  }
}, $t = [
  { title: "Quick Start Guide", path: "/docs/getting-started/quick-start/" },
  { title: "API Authentication", path: "/docs/api-reference/" },
  { title: "Troubleshooting", path: "/docs/troubleshooting/common-issues/" },
  { title: "Changelog", path: "/docs/changelog/" }
], It = `
.hb-help-panel-overlay {
  position: fixed; inset: 0; z-index: 100001;
  background: rgba(0,0,0,0.3); backdrop-filter: blur(2px);
  animation: hb-hp-fadein 0.15s ease;
}
.hb-help-panel {
  position: fixed; top: 0; right: 0; bottom: 0; width: 380px; max-width: 100vw;
  z-index: 100002; background: #0f172a; color: #e2e8f0;
  display: flex; flex-direction: column;
  box-shadow: -4px 0 24px rgba(0,0,0,0.4);
  animation: hb-hp-slidein 0.2s ease;
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;
}
@keyframes hb-hp-fadein { from { opacity: 0 } to { opacity: 1 } }
@keyframes hb-hp-slidein { from { transform: translateX(100%) } to { transform: translateX(0) } }

.hb-help-panel-header {
  display: flex; align-items: center; justify-content: space-between;
  padding: 16px 20px; border-bottom: 1px solid rgba(255,255,255,0.08);
}
.hb-help-panel-title { font-size: 16px; font-weight: 600; }
.hb-help-panel-close {
  background: none; border: none; color: #94a3b8; cursor: pointer; padding: 4px;
  border-radius: 6px; display: flex; align-items: center;
}
.hb-help-panel-close:hover { color: #f1f5f9; background: rgba(255,255,255,0.08); }

.hb-help-panel-body {
  flex: 1; overflow-y: auto; padding: 16px 20px;
}

.hb-help-search {
  width: 100%; padding: 8px 12px; border-radius: 8px;
  background: rgba(255,255,255,0.06); border: 1px solid rgba(255,255,255,0.1);
  color: #e2e8f0; font-size: 14px; outline: none; margin-bottom: 16px;
}
.hb-help-search:focus { border-color: #f97316; }
.hb-help-search::placeholder { color: #64748b; }

.hb-help-section { margin-bottom: 20px; }
.hb-help-section-title {
  font-size: 11px; font-weight: 600; text-transform: uppercase; letter-spacing: 0.05em;
  color: #64748b; margin-bottom: 8px;
}

.hb-help-article {
  display: block; padding: 8px 12px; border-radius: 6px;
  color: #cbd5e1; text-decoration: none; font-size: 14px;
  transition: background 0.1s, color 0.1s; cursor: pointer;
}
.hb-help-article:hover { background: rgba(255,255,255,0.06); color: #f1f5f9; }

.hb-help-result-excerpt {
  font-size: 12px; color: #64748b; margin-top: 2px; line-height: 1.4;
}

.hb-help-footer {
  padding: 12px 20px; border-top: 1px solid rgba(255,255,255,0.08);
  display: flex; gap: 8px;
}
.hb-help-footer-btn {
  flex: 1; padding: 8px 12px; border-radius: 8px;
  font-size: 13px; font-weight: 500; cursor: pointer; text-align: center;
  border: none; text-decoration: none; display: inline-flex; align-items: center; justify-content: center; gap: 6px;
}
.hb-help-footer-btn-primary { background: #f97316; color: #fff; }
.hb-help-footer-btn-primary:hover { background: #ea580c; }
.hb-help-footer-btn-secondary { background: rgba(255,255,255,0.06); color: #cbd5e1; }
.hb-help-footer-btn-secondary:hover { background: rgba(255,255,255,0.1); color: #f1f5f9; }

.hb-help-no-results { color: #64748b; font-size: 14px; text-align: center; padding: 24px 0; }
`;
function Rt({ currentProduct: a, open: t, onClose: i, onOpenSupport: n }) {
  const [o, d] = b(""), [p, r] = b([]), [c, l] = b(!1), m = O(null), u = O(void 0), y = ne[a] ?? ne.hub;
  z(() => {
    t ? setTimeout(() => {
      var h;
      return (h = m.current) == null ? void 0 : h.focus();
    }, 200) : (d(""), r([]));
  }, [t]);
  const g = S((h) => {
    if (d(h), u.current && clearTimeout(u.current), !h.trim()) {
      r([]), l(!1);
      return;
    }
    l(!0), u.current = setTimeout(async () => {
      try {
        (await fetch(`${B}/pagefind/pagefind.js`)).ok && r([{
          title: `Search docs for "${h}"`,
          excerpt: "Open docs.theonestack.com to see full search results.",
          url: `${B}/?q=${encodeURIComponent(h)}`
        }]);
      } catch {
        r([{
          title: `Search docs for "${h}"`,
          excerpt: "Open docs.theonestack.com to see full results.",
          url: `${B}/?q=${encodeURIComponent(h)}`
        }]);
      }
      l(!1);
    }, 300);
  }, []);
  return z(() => {
    if (!t) return;
    const h = (w) => {
      w.key === "Escape" && i();
    };
    return document.addEventListener("keydown", h), () => document.removeEventListener("keydown", h);
  }, [t, i]), t ? ee(
    /* @__PURE__ */ s(U, { children: [
      /* @__PURE__ */ e("div", { className: "hb-help-panel-overlay", onClick: i }),
      /* @__PURE__ */ s("div", { className: "hb-help-panel", role: "dialog", "aria-label": "Help & Documentation", children: [
        /* @__PURE__ */ s("div", { className: "hb-help-panel-header", children: [
          /* @__PURE__ */ e("span", { className: "hb-help-panel-title", children: "Help & Docs" }),
          /* @__PURE__ */ e("button", { className: "hb-help-panel-close", onClick: i, "aria-label": "Close", children: /* @__PURE__ */ e(K, { size: 18 }) })
        ] }),
        /* @__PURE__ */ s("div", { className: "hb-help-panel-body", children: [
          /* @__PURE__ */ e(
            "input",
            {
              ref: m,
              className: "hb-help-search",
              type: "text",
              placeholder: "Search documentation...",
              value: o,
              onChange: (h) => g(h.target.value)
            }
          ),
          o.trim() ? /* @__PURE__ */ s("div", { className: "hb-help-section", children: [
            /* @__PURE__ */ e("div", { className: "hb-help-section-title", children: "Search Results" }),
            c ? /* @__PURE__ */ e("div", { className: "hb-help-no-results", children: "Searching..." }) : p.length > 0 ? p.map((h, w) => /* @__PURE__ */ s("a", { href: h.url, target: "_blank", rel: "noopener noreferrer", className: "hb-help-article", children: [
              h.title,
              h.excerpt && /* @__PURE__ */ e("div", { className: "hb-help-result-excerpt", children: h.excerpt })
            ] }, w)) : /* @__PURE__ */ e("div", { className: "hb-help-no-results", children: "No results found" })
          ] }) : /* @__PURE__ */ s(U, { children: [
            /* @__PURE__ */ s("div", { className: "hb-help-section", children: [
              /* @__PURE__ */ s("div", { className: "hb-help-section-title", children: [
                a === "hub" ? "Hub" : a.toUpperCase(),
                " Documentation"
              ] }),
              y.articles.map((h) => /* @__PURE__ */ e("a", { href: `${B}${h.path}`, target: "_blank", rel: "noopener noreferrer", className: "hb-help-article", children: h.title }, h.path)),
              /* @__PURE__ */ s("a", { href: `${B}${y.path}`, target: "_blank", rel: "noopener noreferrer", className: "hb-help-article", style: { color: "#f97316", marginTop: 4 }, children: [
                "View all ",
                a === "hub" ? "Hub" : a.toUpperCase(),
                " docs →"
              ] })
            ] }),
            /* @__PURE__ */ s("div", { className: "hb-help-section", children: [
              /* @__PURE__ */ e("div", { className: "hb-help-section-title", children: "Quick Links" }),
              $t.map((h) => /* @__PURE__ */ e("a", { href: `${B}${h.path}`, target: "_blank", rel: "noopener noreferrer", className: "hb-help-article", children: h.title }, h.path))
            ] })
          ] })
        ] }),
        /* @__PURE__ */ s("div", { className: "hb-help-footer", children: [
          /* @__PURE__ */ e("a", { href: B, target: "_blank", rel: "noopener noreferrer", className: "hb-help-footer-btn hb-help-footer-btn-secondary", children: "Full Docs" }),
          n && /* @__PURE__ */ e("button", { className: "hb-help-footer-btn hb-help-footer-btn-primary", onClick: () => {
            i(), n();
          }, children: "Contact Support" })
        ] })
      ] })
    ] }),
    document.body
  ) : null;
}
function Pt({ currentProduct: a, onOpenSupport: t }) {
  const [i, n] = b(!1);
  return /* @__PURE__ */ s(U, { children: [
    /* @__PURE__ */ e(
      "button",
      {
        className: "hb-help-btn",
        title: "Help & Docs",
        "aria-label": "Help & Documentation",
        onClick: () => n((o) => !o),
        style: {
          display: "inline-flex",
          alignItems: "center",
          justifyContent: "center",
          width: 32,
          height: 32,
          borderRadius: "50%",
          color: i ? "#f1f5f9" : "#94a3b8",
          background: i ? "rgba(255,255,255,0.08)" : "transparent",
          border: "none",
          cursor: "pointer",
          transition: "color 0.15s, background 0.15s"
        },
        onMouseEnter: (o) => {
          i || (o.currentTarget.style.color = "#f1f5f9", o.currentTarget.style.background = "rgba(255,255,255,0.08)");
        },
        onMouseLeave: (o) => {
          i || (o.currentTarget.style.color = "#94a3b8", o.currentTarget.style.background = "transparent");
        },
        children: /* @__PURE__ */ e(ze, { size: 18 })
      }
    ),
    /* @__PURE__ */ e(
      Rt,
      {
        currentProduct: a,
        open: i,
        onToggle: () => n((o) => !o),
        onClose: () => n(!1),
        onOpenSupport: t
      }
    )
  ] });
}
const Ht = {
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
function Dt(a) {
  for (const [t, i] of Object.entries(Ht))
    if (a.includes(t)) return i;
  return null;
}
const Ft = [
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
function Ut(a) {
  for (const [t, i] of Ft) {
    const n = a.match(t);
    if (n != null && n[1] && n[1] !== "new" && n[1] !== "list")
      return { entity_type: i, entity_id: n[1] };
  }
  return {};
}
function J() {
  const a = Dt(window.location.hostname), { entity_type: t, entity_id: i } = Ut(window.location.pathname);
  return { product: a, page: window.location.pathname, entity_type: t, entity_id: i };
}
const Q = {
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
function Bt(a) {
  return a.entity_type && Q[a.entity_type] ? Q[a.entity_type] : a.page === "/" || a.page.includes("dashboard") ? Q.dashboard : [
    { label: "What needs attention?", prompt: "What needs my attention today?" },
    { label: "Search tickets", prompt: "Search for recent open tickets." },
    { label: "Company health", prompt: "Show me a summary of company health scores." }
  ];
}
const G = "jarvis_messages", he = 50;
function Kt() {
  try {
    const a = sessionStorage.getItem(G);
    return a ? JSON.parse(a).slice(-he) : [];
  } catch {
    return [];
  }
}
function Wt(a) {
  try {
    sessionStorage.setItem(G, JSON.stringify(a.slice(-he)));
  } catch {
    sessionStorage.removeItem(G);
  }
}
let qt = 0;
function oe() {
  return `jm_${Date.now()}_${++qt}`;
}
function Vt(a, t, i) {
  const [n, o] = b(Kt), [d, p] = b(!1), [r, c] = b(J), [l, m] = b([]), u = O(null), y = O("");
  z(() => {
    const x = () => {
      const A = J();
      c(A), m(Bt(A));
    };
    x(), window.addEventListener("popstate", x);
    const f = new MutationObserver(() => {
      J().page !== r.page && x();
    });
    return f.observe(document.querySelector("title") || document.head, { childList: !0, subtree: !0 }), () => {
      window.removeEventListener("popstate", x), f.disconnect();
    };
  }, [r.page]), z(() => {
    Wt(n);
  }, [n]);
  const g = S(async (x) => {
    if (!x.trim() || d || !t) return;
    const f = {
      id: oe(),
      role: "user",
      content: x.trim(),
      timestamp: (/* @__PURE__ */ new Date()).toISOString()
    }, A = {
      id: oe(),
      role: "assistant",
      content: "",
      tool_calls: [],
      timestamp: (/* @__PURE__ */ new Date()).toISOString()
    };
    o((C) => [...C, f, A]), p(!0), y.current = "";
    const j = new AbortController();
    u.current = j;
    try {
      const v = {
        model: "gpt-4.1-mini",
        messages: [...n.slice(-18), f].map((H) => ({
          role: H.role,
          content: H.content
        })),
        stream: !0,
        context: {
          product: r.product,
          entity_type: r.entity_type,
          entity_id: r.entity_id,
          page_url: window.location.href
        }
      }, M = await fetch(`${a}/api/ai/chat`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "x-tenant-id": t,
          "x-ai-tier": "jarvis_free"
        },
        credentials: "include",
        body: JSON.stringify(v),
        signal: j.signal
      });
      if (!M.ok) {
        const H = await M.json().catch(() => ({ error: M.statusText }));
        throw new Error(H.error || H.message || `Error ${M.status}`);
      }
      if (!M.body) throw new Error("No response body");
      const N = M.body.getReader(), _ = new TextDecoder();
      let T = "";
      const L = [];
      for (; ; ) {
        const { done: H, value: $ } = await N.read();
        if (H) break;
        T += _.decode($, { stream: !0 });
        const D = T.split(`
`);
        T = D.pop() || "";
        for (const te of D) {
          if (!te.startsWith("data: ")) continue;
          const ae = te.slice(6).trim();
          if (ae === "[DONE]") break;
          try {
            const I = JSON.parse(ae);
            if (I.type === "content_delta" && I.text) {
              y.current += I.text;
              const W = y.current;
              o((F) => {
                const E = [...F], P = E[E.length - 1];
                return P && P.id === A.id && (E[E.length - 1] = { ...P, content: W }), E;
              });
            } else if (I.type === "tool_use_start" && I.name) {
              L.push({ name: I.name, status: "running" });
              const W = [...L];
              o((F) => {
                const E = [...F], P = E[E.length - 1];
                return P && P.id === A.id && (E[E.length - 1] = { ...P, tool_calls: W }), E;
              });
            } else if (I.type === "message_stop") {
              L.forEach((F) => {
                F.status === "running" && (F.status = "done");
              });
              const W = [...L];
              o((F) => {
                const E = [...F], P = E[E.length - 1];
                return P && P.id === A.id && (E[E.length - 1] = { ...P, tool_calls: W }), E;
              });
            } else if (I.type === "error")
              throw new Error(I.message || "Stream error");
          } catch (I) {
            if (I instanceof Error && I.message !== "Stream error") continue;
            throw I;
          }
        }
      }
    } catch (C) {
      if (!(C instanceof DOMException && C.name === "AbortError")) {
        const v = C instanceof Error ? C.message : "Something went wrong. Please try again.";
        o((M) => {
          const N = [...M], _ = N[N.length - 1];
          return _ && _.id === A.id && (N[N.length - 1] = {
            ..._,
            content: _.content || v,
            error: !0
          }), N;
        });
      }
    } finally {
      p(!1), u.current = null;
    }
  }, [a, t, n, d, r]), h = S(() => {
    u.current && (u.current.abort(), u.current = null);
  }, []), w = S(() => {
    o([]), sessionStorage.removeItem(G);
  }, []);
  return {
    messages: n,
    streaming: d,
    context: r,
    quickActions: l,
    sendMessage: g,
    stopStreaming: h,
    clearMessages: w
  };
}
function Gt(a) {
  return a ? a.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/```(\w*)\n?([\s\S]*?)```/g, '<pre class="hb-jv-code-block"><code>$2</code></pre>').replace(/`([^`]+)`/g, '<code class="hb-jv-inline-code">$1</code>').replace(/\*\*(.+?)\*\*/g, "<strong>$1</strong>").replace(/\*(.+?)\*/g, "<em>$1</em>").replace(/\[([^\]]+)\]\(([^)]+)\)/g, '<a href="$2" target="_blank" rel="noopener noreferrer" class="hb-jv-link">$1</a>').replace(/^[•\-\*] (.+)$/gm, "<li>$1</li>").replace(/^\d+\. (.+)$/gm, "<li>$1</li>").replace(/(<li>[\s\S]*?<\/li>)/g, '<ul class="hb-jv-list">$1</ul>').replace(/<\/ul>\s*<ul class="hb-jv-list">/g, "").replace(/\n/g, "<br>") : "";
}
const Jt = {
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
function Qt({ tool: a }) {
  const t = Jt[a.name] || a.name.replace(/_/g, " "), i = a.status === "running", n = a.status === "error";
  return /* @__PURE__ */ s("div", { className: `hb-jv-tool-call${i ? " running" : ""}${n ? " error" : ""}`, children: [
    /* @__PURE__ */ e("div", { className: "hb-jv-tool-icon", children: i ? /* @__PURE__ */ e("span", { className: "hb-jv-tool-spinner" }) : n ? /* @__PURE__ */ e("span", { style: { color: "#f87171" }, children: "!" }) : /* @__PURE__ */ e("span", { style: { color: "#34d399" }, children: "✓" }) }),
    /* @__PURE__ */ s("span", { className: "hb-jv-tool-label", children: [
      t,
      i ? "…" : ""
    ] }),
    a.summary && /* @__PURE__ */ e("span", { className: "hb-jv-tool-summary", children: a.summary })
  ] });
}
function Yt({ message: a, isStreaming: t }) {
  if (a.role === "user")
    return /* @__PURE__ */ e("div", { className: "hb-jv-msg hb-jv-msg-user", children: /* @__PURE__ */ e("div", { className: "hb-jv-bubble hb-jv-bubble-user", children: a.content }) });
  const n = a.content.length > 0, o = a.tool_calls && a.tool_calls.length > 0;
  return /* @__PURE__ */ s("div", { className: "hb-jv-msg hb-jv-msg-assistant", children: [
    /* @__PURE__ */ e("div", { className: "hb-jv-avatar", children: /* @__PURE__ */ e(q, { size: 14, color: "#f97316" }) }),
    /* @__PURE__ */ s("div", { className: "hb-jv-bubble-wrap", children: [
      o && /* @__PURE__ */ e("div", { className: "hb-jv-tool-calls", children: a.tool_calls.map((d, p) => /* @__PURE__ */ e(Qt, { tool: d }, p)) }),
      n && /* @__PURE__ */ e(
        "div",
        {
          className: `hb-jv-bubble hb-jv-bubble-assistant${a.error ? " error" : ""}`,
          dangerouslySetInnerHTML: { __html: Gt(a.content) }
        }
      ),
      !n && t && /* @__PURE__ */ e("div", { className: "hb-jv-bubble hb-jv-bubble-assistant", children: /* @__PURE__ */ s("span", { className: "hb-jv-typing", children: [
        /* @__PURE__ */ e("span", {}),
        /* @__PURE__ */ e("span", {}),
        /* @__PURE__ */ e("span", {})
      ] }) })
    ] })
  ] });
}
function Xt({ actions: a, onSelect: t, disabled: i }) {
  return a.length === 0 ? null : /* @__PURE__ */ e("div", { className: "hb-jv-quick-actions", children: a.map((n, o) => /* @__PURE__ */ e(
    "button",
    {
      className: "hb-jv-quick-chip",
      onClick: () => t(n.prompt),
      disabled: i,
      children: n.label
    },
    o
  )) });
}
function Zt({
  apiBase: a,
  tenantId: t,
  userId: i
}) {
  const [n, o] = b(!1), { messages: d, streaming: p, context: r, quickActions: c, sendMessage: l, stopStreaming: m, clearMessages: u } = Vt(a, t), [y, g] = b(""), h = O(null), w = O(null), [x] = b(!1);
  z(() => {
    const v = (M) => {
      (M.metaKey || M.ctrlKey) && M.key === "j" && (M.preventDefault(), o((N) => !N)), M.key === "Escape" && n && o(!1);
    };
    return document.addEventListener("keydown", v), () => document.removeEventListener("keydown", v);
  }, [n]), z(() => {
    h.current && h.current.scrollIntoView({ behavior: "smooth" });
  }, [d]), z(() => {
    n && w.current && setTimeout(() => {
      var v;
      return (v = w.current) == null ? void 0 : v.focus();
    }, 100);
  }, [n]);
  const f = S(() => {
    !y.trim() || p || (l(y.trim()), g(""));
  }, [y, p, l]), A = S((v) => {
    l(v);
  }, [l]), j = S((v) => {
    v.key === "Enter" && !v.shiftKey && (v.preventDefault(), f());
  }, [f]), C = n ? ee(
    /* @__PURE__ */ e("div", { className: "hb-jv-overlay", onClick: () => o(!1), children: /* @__PURE__ */ s(
      "div",
      {
        className: "hb-jv-panel",
        onClick: (v) => v.stopPropagation(),
        role: "dialog",
        "aria-modal": "true",
        "aria-label": "THEO AI Assistant",
        children: [
          /* @__PURE__ */ s("div", { className: "hb-jv-header", children: [
            /* @__PURE__ */ s("div", { className: "hb-jv-header-left", children: [
              /* @__PURE__ */ e(q, { size: 16, color: "#f97316" }),
              /* @__PURE__ */ e("span", { className: "hb-jv-header-title", children: "THEO" }),
              /* @__PURE__ */ e("span", { className: "hb-jv-model-badge", children: "GPT-4.1 mini" })
            ] }),
            /* @__PURE__ */ s("div", { className: "hb-jv-header-right", children: [
              d.length > 0 && /* @__PURE__ */ e(
                "button",
                {
                  className: "hb-jv-clear-btn",
                  onClick: u,
                  title: "Clear conversation",
                  "aria-label": "Clear conversation",
                  children: "Clear"
                }
              ),
              /* @__PURE__ */ e(
                "button",
                {
                  className: "hb-jv-close-btn",
                  onClick: () => o(!1),
                  "aria-label": "Close THEO",
                  children: /* @__PURE__ */ e(K, { size: 16 })
                }
              )
            ] })
          ] }),
          /* @__PURE__ */ s("div", { className: "hb-jv-messages", children: [
            d.length === 0 ? /* @__PURE__ */ s("div", { className: "hb-jv-welcome", children: [
              /* @__PURE__ */ e("div", { className: "hb-jv-welcome-icon", children: /* @__PURE__ */ e(q, { size: 28, color: "#f97316" }) }),
              /* @__PURE__ */ e("div", { className: "hb-jv-welcome-title", children: "Hey, I'm THEO" }),
              /* @__PURE__ */ e("div", { className: "hb-jv-welcome-sub", children: "Your AI operations assistant for The One Stack. I can help you with tickets, clients, devices, and more." }),
              r.product && /* @__PURE__ */ s("div", { className: "hb-jv-welcome-context", children: [
                "Currently viewing: ",
                /* @__PURE__ */ e("strong", { children: r.product.toUpperCase() }),
                r.entity_type && ` — ${r.entity_type}`,
                r.entity_id && ` ${r.entity_id}`
              ] })
            ] }) : d.map((v, M) => /* @__PURE__ */ e(
              Yt,
              {
                message: v,
                isStreaming: p && M === d.length - 1 && v.role === "assistant"
              },
              v.id
            )),
            /* @__PURE__ */ e("div", { ref: h })
          ] }),
          d.length === 0 && /* @__PURE__ */ e(
            Xt,
            {
              actions: c,
              onSelect: A,
              disabled: p
            }
          ),
          /* @__PURE__ */ s("div", { className: "hb-jv-input-area", children: [
            /* @__PURE__ */ s("div", { className: "hb-jv-input-row", children: [
              /* @__PURE__ */ e(
                "textarea",
                {
                  ref: w,
                  className: "hb-jv-input",
                  placeholder: "Ask THEO anything...",
                  value: y,
                  onChange: (v) => g(v.target.value),
                  onKeyDown: j,
                  rows: 1,
                  disabled: p
                }
              ),
              p ? /* @__PURE__ */ e(
                "button",
                {
                  className: "hb-jv-stop-btn",
                  onClick: m,
                  title: "Stop generating",
                  "aria-label": "Stop generating",
                  children: /* @__PURE__ */ e("span", { className: "hb-jv-stop-icon" })
                }
              ) : /* @__PURE__ */ e(
                "button",
                {
                  className: "hb-jv-send-btn",
                  onClick: f,
                  disabled: !y.trim(),
                  title: "Send message",
                  "aria-label": "Send message",
                  children: /* @__PURE__ */ s("svg", { width: "16", height: "16", viewBox: "0 0 24 24", fill: "none", stroke: "currentColor", strokeWidth: "2", strokeLinecap: "round", strokeLinejoin: "round", children: [
                    /* @__PURE__ */ e("path", { d: "M22 2L11 13" }),
                    /* @__PURE__ */ e("path", { d: "M22 2L15 22L11 13L2 9L22 2Z" })
                  ] })
                }
              )
            ] }),
            /* @__PURE__ */ s("div", { className: "hb-jv-input-hint", children: [
              /* @__PURE__ */ s("span", { className: "hb-jv-kbd-hint", children: [
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
  return /* @__PURE__ */ s(U, { children: [
    /* @__PURE__ */ e(
      "button",
      {
        className: `hb-jv-btn${n ? " active" : ""}${x ? " pulse" : ""}`,
        title: "THEO (⌘J)",
        "aria-label": "Open THEO",
        "aria-expanded": n,
        onClick: () => o((v) => !v),
        children: /* @__PURE__ */ e(q, { size: 18 })
      }
    ),
    C
  ] });
}
const ea = "https://docs.theonestack.com/docs/changelog/", re = "hb_last_changelog_seen", se = "2026-03-08";
function ta({ className: a }) {
  const [t, i] = b(!1);
  z(() => {
    try {
      const o = localStorage.getItem(re);
      (!o || o < se) && i(!0);
    } catch {
    }
  }, []);
  const n = () => {
    try {
      localStorage.setItem(re, se);
    } catch {
    }
    i(!1), window.open(ea, "_blank", "noopener,noreferrer");
  };
  return t ? /* @__PURE__ */ s(
    "button",
    {
      onClick: n,
      title: "What's New — View latest updates",
      "aria-label": "New updates available",
      className: a,
      style: {
        position: "relative",
        display: "inline-flex",
        alignItems: "center",
        gap: 4,
        padding: "3px 8px",
        borderRadius: 12,
        background: "rgba(249,115,22,0.15)",
        color: "#f97316",
        fontSize: 11,
        fontWeight: 600,
        border: "none",
        cursor: "pointer",
        whiteSpace: "nowrap",
        transition: "background 0.15s",
        fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif'
      },
      onMouseEnter: (o) => {
        o.currentTarget.style.background = "rgba(249,115,22,0.25)";
      },
      onMouseLeave: (o) => {
        o.currentTarget.style.background = "rgba(249,115,22,0.15)";
      },
      children: [
        /* @__PURE__ */ e("span", { style: {
          width: 6,
          height: 6,
          borderRadius: "50%",
          background: "#f97316",
          animation: "hb-pulse 2s ease-in-out infinite"
        } }),
        "New"
      ]
    }
  ) : null;
}
const aa = `
@keyframes hb-pulse {
  0%, 100% { opacity: 1; }
  50% { opacity: 0.4; }
}
`;
function ia() {
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
function la({
  currentProduct: a,
  apiBase: t,
  signalrEndpoint: i,
  session: n,
  onLogout: o,
  hubUrl: d = le,
  chatSlot: p,
  supportConfig: r,
  orgBranding: c
}) {
  const l = ye(n);
  return l ? /* @__PURE__ */ e(
    na,
    {
      currentProduct: a,
      apiBase: t,
      signalrEndpoint: i,
      session: l,
      onLogout: o,
      hubUrl: d,
      chatSlot: p,
      supportConfig: r,
      orgBranding: c
    }
  ) : null;
}
function na({
  currentProduct: a,
  apiBase: t,
  signalrEndpoint: i,
  session: n,
  onLogout: o,
  hubUrl: d = le,
  chatSlot: p,
  supportConfig: r,
  orgBranding: c
}) {
  var H;
  const { products: l } = ke(t, n.tenantId ?? null), { notifications: m, unreadCount: u, markAllRead: y, markRead: g, dismiss: h, muted: w, muteUntil: x, unmute: f, toastQueue: A, dismissToast: j } = we(
    t,
    i,
    n.tenantId ?? null,
    n.userId ?? null
  ), [C, v] = b(!1), [M, N] = b(!1), [_, T] = b(!1), L = O(!1);
  return z(() => {
    if (L.current || (L.current = !0, document.getElementById("hb-styles"))) return;
    const D = document.createElement("style");
    D.id = "hb-styles", D.textContent = fe + It + aa, document.head.appendChild(D);
  }, []), z(() => {
    const $ = document.body.style.paddingTop;
    return document.body.style.paddingTop = `${me}px`, () => {
      document.body.style.paddingTop = $;
    };
  }, []), /* @__PURE__ */ s("div", { className: "hb-root", role: "banner", children: [
    /* @__PURE__ */ e(nt, { toasts: A, onDismiss: j }),
    /* @__PURE__ */ s(
      "div",
      {
        className: "hb-bar",
        style: (H = c == null ? void 0 : c.colors) != null && H.header_bg ? {
          background: c.colors.header_bg,
          color: c.colors.header_text || "#f1f5f9"
        } : void 0,
        children: [
          /* @__PURE__ */ e(
            Xe,
            {
              currentProduct: a,
              products: l,
              open: C,
              onToggle: () => {
                N(!1), T(!1), v(($) => !$);
              },
              onClose: () => v(!1),
              hubUrl: d
            }
          ),
          /* @__PURE__ */ s("a", { href: d, className: "hb-logo", "aria-label": c != null && c.company_name ? `${c.company_name} — Home` : "The One Stack — Home", children: [
            c != null && c.logo_icon_url || c != null && c.logo_url ? /* @__PURE__ */ e(
              "img",
              {
                src: c.logo_icon_url || c.logo_url,
                alt: c.company_name || "Logo",
                style: { height: 22, width: "auto", objectFit: "contain" }
              }
            ) : /* @__PURE__ */ e(ia, {}),
            /* @__PURE__ */ e("span", { className: "hb-logo-name", children: (c == null ? void 0 : c.company_name) || "The One" })
          ] }),
          /* @__PURE__ */ e("div", { className: "hb-divider", "aria-hidden": "true" }),
          (() => {
            const $ = l.find((D) => D.id === a);
            return $ ? /* @__PURE__ */ e("span", { style: { fontSize: 14, fontWeight: 500, color: "#f1f5f9", whiteSpace: "nowrap" }, children: $.name }) : null;
          })(),
          /* @__PURE__ */ e("div", { style: { flex: 1 } }),
          /* @__PURE__ */ e(et, { apiBase: t, tenantId: (n == null ? void 0 : n.tenantId) ?? null }),
          /* @__PURE__ */ e("div", { style: { flex: 1 } }),
          r ? /* @__PURE__ */ e(
            Lt,
            {
              config: r,
              user: {
                email: (n == null ? void 0 : n.email) ?? "",
                name: n ? `${n.firstName ?? ""} ${n.lastName ?? ""}`.trim() || n.email : ""
              }
            }
          ) : p ?? null,
          /* @__PURE__ */ e(
            Zt,
            {
              apiBase: t,
              tenantId: n.tenantId ?? null,
              userId: n.userId ?? null,
              currentProduct: a
            }
          ),
          /* @__PURE__ */ e(ta, {}),
          /* @__PURE__ */ e(Pt, { currentProduct: a }),
          /* @__PURE__ */ e(
            it,
            {
              notifications: m,
              unreadCount: u,
              open: M,
              onToggle: () => {
                v(!1), T(!1), N(($) => !$);
              },
              onClose: () => N(!1),
              onMarkAllRead: y,
              onMarkRead: g,
              onDismiss: h,
              muted: w,
              onMute: x,
              onUnmute: f,
              hubUrl: d
            }
          ),
          /* @__PURE__ */ e(
            ot,
            {
              session: n,
              open: _,
              onToggle: () => {
                v(!1), N(!1), T(($) => !$);
              },
              onClose: () => T(!1),
              onLogout: o,
              hubUrl: d
            }
          )
        ]
      }
    )
  ] });
}
export {
  V as ALL_PRODUCTS,
  me as HUB_BAR_HEIGHT,
  le as HUB_URL,
  la as HubBar,
  Zt as JarvisButton,
  it as NotificationBell,
  nt as NotificationToast,
  Xe as ProductSwitcher,
  X as SEVERITY_COLORS,
  Lt as SupportButton,
  et as UnifiedSearch,
  ot as UserMenu,
  ye as useHubSession,
  Vt as useJarvis,
  we as useNotifications,
  ke as useProducts,
  Ze as useSearch
};
