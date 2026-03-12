import { jsx as e, jsxs as c, Fragment as U } from "react/jsx-runtime";
import { useMemo as Y, useState as h, useEffect as z, useRef as $, useCallback as S, createContext as be, useContext as ue } from "react";
import { createPortal as se } from "react-dom";
const le = "https://my.theonestack.com", q = [
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
], Q = {
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
`;
function ge(n) {
  if (typeof document > "u") return null;
  const t = document.cookie.match(new RegExp("(?:^|;\\s*)" + n + "=([^;]*)"));
  if (!t) return null;
  try {
    return decodeURIComponent(t[1]);
  } catch {
    return null;
  }
}
function xe(n) {
  try {
    const t = n.split(".");
    if (t.length !== 3) return null;
    const i = t[1].replace(/-/g, "+").replace(/_/g, "/"), a = i + "=".repeat((4 - i.length % 4) % 4);
    return JSON.parse(atob(a));
  } catch {
    return null;
  }
}
function ve(n, t, i) {
  if (t && i)
    return (t[0] + i[0]).toUpperCase();
  if (t)
    return t.slice(0, 2).toUpperCase();
  const a = n.split("@")[0].split(/[._-]/);
  return a.length >= 2 ? (a[0][0] + a[1][0]).toUpperCase() : n.slice(0, 2).toUpperCase();
}
function ye(n) {
  return Y(() => {
    if (n) return n;
    const t = ge("hub_session");
    if (!t) return null;
    const i = xe(t);
    if (!i) return null;
    const a = i.userId || i.sub || "", o = i.tenantId || i.tenant_id || "", d = i.tenantSlug || "", p = i.tenantName || d, s = i.email || "", l = i.role || "member", r = i.orgRole, m = i.entitlements, u = i.firstName, y = i.lastName;
    return !a || !s ? null : {
      userId: a,
      tenantId: o,
      tenantSlug: d,
      tenantName: p,
      email: s,
      role: l,
      orgRole: r,
      entitlements: m,
      firstName: u,
      lastName: y,
      initials: ve(s, u, y)
    };
  }, [n]);
}
function ke(n, t) {
  const [i, a] = h([]), [o, d] = h(!1), [p, s] = h(null);
  return z(() => {
    if (!t) {
      a(q.map((r) => ({ ...r, active: !1 })));
      return;
    }
    d(!0), s(null);
    const l = new AbortController();
    return fetch(`${n}/api/bus/products?tenant_id=${encodeURIComponent(t)}`, {
      credentials: "include",
      signal: l.signal
    }).then((r) => {
      if (!r.ok) throw new Error(`Products API returned ${r.status}`);
      return r.json();
    }).then((r) => {
      const m = new Set(r.activeProductIds);
      a(
        q.map((u) => ({ ...u, active: m.has(u.id) }))
      ), d(!1);
    }).catch((r) => {
      r.name !== "AbortError" && (a(q.map((m) => ({ ...m, active: !1 }))), s(r.message), d(!1));
    }), () => l.abort();
  }, [n, t]), { products: i, loading: o, error: p };
}
function we(n, t, i, a) {
  const [o, d] = h([]), [p, s] = h([]), [l, r] = h(!1), m = $(null), u = $(null);
  z(() => {
    if (!i || !a) return;
    const C = new AbortController();
    return fetch(`${n}/api/bus/notifications?user_id=${encodeURIComponent(a)}&limit=20`, {
      credentials: "include",
      signal: C.signal
    }).then((N) => N.ok ? N.json() : Promise.resolve({ notifications: [] })).then((N) => {
      d(N.notifications ?? []);
    }).catch(() => {
    }), () => C.abort();
  }, [n, i, a]), z(() => {
    if (!t || !i) return;
    let C = !1;
    return (async () => {
      try {
        const { HubConnectionBuilder: N, LogLevel: v } = await import("./index-CrDahL0u.js"), j = new N().withUrl(`${t}?tenantId=${encodeURIComponent(i)}`).withAutomaticReconnect().configureLogging(v.Warning).build();
        j.on("notification", (k) => {
          d((M) => [k, ...M.slice(0, 49)]), m.current || (s((M) => [...M, k]), setTimeout(() => {
            s((M) => M.filter((T) => T.id !== k.id));
          }, 5e3));
        }), j.on("notificationsRead", (k) => {
          const M = new Set(k);
          d(
            (T) => T.map((O) => M.has(O.id) ? { ...O, read: !0 } : O)
          );
        }), j.on("busEvent", (k) => {
          const M = {
            id: k.event_id,
            productId: k.source,
            productName: k.source.toUpperCase(),
            title: k.title,
            body: k.detail,
            severity: k.severity === "critical" ? "error" : k.severity,
            read: !1,
            deepLink: k.entity_url || "",
            createdAt: k.timestamp
          };
          d((T) => [M, ...T.slice(0, 49)]), m.current || (s((T) => [...T, M]), setTimeout(() => {
            s((T) => T.filter((O) => O.id !== M.id));
          }, 5e3));
        }), C || (await j.start(), u.current = j);
      } catch {
      }
    })(), () => {
      var N;
      C = !0, (N = u.current) == null || N.stop(), u.current = null;
    };
  }, [t, i]);
  const y = S((C) => {
    d(
      (N) => N.map((v) => v.id === C ? { ...v, read: !0 } : v)
    ), fetch(`${n}/api/bus/notifications/${encodeURIComponent(C)}/read`, {
      method: "POST",
      credentials: "include"
    }).catch(() => {
    });
  }, [n]), f = S(() => {
    d((C) => C.map((N) => ({ ...N, read: !0 }))), fetch(`${n}/api/bus/notifications/mark-all-read`, {
      method: "POST",
      credentials: "include"
    }).catch(() => {
    });
  }, [n]), g = S((C) => {
    d((N) => N.filter((v) => v.id !== C)), fetch(`${n}/api/bus/notifications/${encodeURIComponent(C)}/dismiss`, {
      method: "POST",
      credentials: "include"
    }).catch(() => {
    });
  }, [n]), A = S((C) => {
    r(!0), m.current && clearTimeout(m.current), m.current = setTimeout(() => {
      r(!1), m.current = null;
    }, C);
  }, []), x = S(() => {
    r(!1), m.current && (clearTimeout(m.current), m.current = null);
  }, []), b = S((C) => {
    s((N) => N.filter((v) => v.id !== C));
  }, []), _ = o.filter((C) => !C.read).length;
  return { notifications: o, unreadCount: _, markAllRead: f, markRead: y, dismiss: g, muted: l, muteUntil: A, unmute: x, toastQueue: p, dismissToast: b };
}
const w = (n) => function({ size: i = 16, className: a, color: o = "currentColor" }) {
  const d = Array.isArray(n) ? n : [n];
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
      className: a,
      children: d.map((p, s) => /* @__PURE__ */ e("path", { d: p }, s))
    }
  );
}, X = w("M21 21l-4.35-4.35M17 11A6 6 0 1 1 5 11a6 6 0 0 1 12 0z"), Ne = w([
  "M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9",
  "M13.73 21a2 2 0 0 1-3.46 0"
]), K = w("M18 6 6 18M6 6l12 12"), Se = w(["M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2", "M12 3a4 4 0 1 0 0 8 4 4 0 0 0 0-8z"]), ce = w([
  "M12 20a8 8 0 1 0 0-16 8 8 0 0 0 0 16z",
  "M12 14a2 2 0 1 0 0-4 2 2 0 0 0 0 4z"
]), Ce = w([
  "M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4",
  "M16 17l5-5-5-5",
  "M21 12H9"
]), je = w([
  "M7 16V4m0 0L3 8m4-4 4 4",
  "M17 8v12m0 0 4-4m-4 4-4-4"
]), ze = w([
  "M12 22a10 10 0 1 0 0-20 10 10 0 0 0 0 20z",
  "M12 16a4 4 0 1 0 0-8 4 4 0 0 0 0 8z",
  "M4.93 4.93l4.24 4.24",
  "M14.83 14.83l4.24 4.24",
  "M14.83 9.17l4.24-4.24",
  "M14.83 9.17l3.53-3.53",
  "M4.93 19.07l4.24-4.24"
]), Me = w(["M16 20V4a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16", "M2 10a2 2 0 0 1 2-2h16a2 2 0 0 1 2 2v10H2z"]), _e = w(["M22 12h-4", "M6 12H2", "M12 6V2", "M12 22v-4", "M12 8a4 4 0 1 0 0 8 4 4 0 0 0 0-8z"]), Te = w(["M2 3h20v14H2z", "M8 21h8", "M12 17v4"]), Ee = w(["M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z", "M9 12l2 2 4-4"]), Ae = w(["M22 12H2", "M5.45 5.11 2 12v6a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2v-6l-3.45-6.89A2 2 0 0 0 16.76 4H7.24a2 2 0 0 0-1.79 1.11z", "M6 16h.01", "M10 16h.01"]), Le = w(["M20 20a2 2 0 0 0 2-2V8a2 2 0 0 0-2-2h-7.9a2 2 0 0 1-1.69-.9L9.6 3.9A2 2 0 0 0 7.93 3H4a2 2 0 0 0-2 2v13a2 2 0 0 0 2 2z", "M8 10v4", "M12 10v2", "M16 10v6"]), $e = w(["M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z", "M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z"]), Oe = w("M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"), F = w(["M9.937 15.5A2 2 0 0 0 8.5 14.063l-6.135-1.582a.5.5 0 0 1 0-.962L8.5 9.936A2 2 0 0 0 9.937 8.5l1.582-6.135a.5.5 0 0 1 .963 0L14.063 8.5A2 2 0 0 0 15.5 9.937l6.135 1.581a.5.5 0 0 1 0 .964L15.5 14.063a2 2 0 0 0-1.437 1.437l-1.582 6.135a.5.5 0 0 1-.963 0z", "M20 3v4", "M22 5h-4"]), Ie = w(["M23 7l-7 5 7 5V7z", "M14 5H3a2 2 0 0 0-2 2v10a2 2 0 0 0 2 2h11a2 2 0 0 0 2-2V7a2 2 0 0 0-2-2z"]), Re = w(["M18 22V8l-6-6-6 6v14", "M2 22h20", "M10 22v-4a2 2 0 0 1 4 0v4", "M12 7v5", "M10 9h4"]), Pe = w(["M6 22V4a2 2 0 0 1 2-2h8a2 2 0 0 1 2 2v18", "M6 12H4a2 2 0 0 1-2-2V7a2 2 0 0 1 2-2h2", "M18 12h2a2 2 0 0 1 2 2v3a2 2 0 0 1-2 2h-2", "M10 6h4", "M10 10h4", "M10 14h4", "M10 18h4"]), De = w(["M14 18V6a2 2 0 0 0-2-2H4a2 2 0 0 0-2 2v11a1 1 0 0 0 1 1h1", "M15 18h6a1 1 0 0 0 1-1v-3.65a1 1 0 0 0-.22-.624l-3.48-4.35A1 1 0 0 0 17.52 8H14", "M7 18a2 2 0 1 0 0 4 2 2 0 0 0 0-4z", "M17 18a2 2 0 1 0 0 4 2 2 0 0 0 0-4z"]), He = w(["M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2", "M9 3a4 4 0 1 0 0 8 4 4 0 0 0 0-8z", "M22 21v-2a4 4 0 0 0-3-3.87", "M16 3.13a4 4 0 0 1 0 7.75"]), Fe = w(["M12 2a9 3 0 1 0 0 6 9 3 0 0 0 0-6z", "M21 12c0 1.66-4 3-9 3s-9-1.34-9-3", "M3 5v14c0 1.66 4 3 9 3s9-1.34 9-3V5"]), Ue = w(["M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9", "M13.73 21a2 2 0 0 1-3.46 0", "M2 8c0-2.2.7-4.3 2-6", "M22 8a10 10 0 0 0-2-6"]), Ke = w(["M13 4h3a2 2 0 0 1 2 2v14", "M2 20h3", "M13 20h9", "M10 12v.01", "M13 4.562v16.157a1 1 0 0 1-1.242.97L5 20V5.562a2 2 0 0 1 1.515-1.94l4.243-1.06A2 2 0 0 1 13 4.561z"]), Be = w(["M16 2l5 5-14 14L2 16z", "M12 8l-2-2", "M8 12l-2-2"]), qe = w(["M12 2a10 10 0 1 0 0 20 10 10 0 0 0 0-20z", "M2 12h20", "M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"]), We = w(["M3 3h7v7H3z", "M14 3h7v7h-7z", "M14 14h7v7h-7z", "M3 14h7v7H3z"]), Ve = w("M22 12h-4l-3 9L9 3l-3 9H2"), Ge = w(["M9 20H4a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h3.9a2 2 0 0 1 1.69.9l.81 1.2a2 2 0 0 0 1.67.9H20a2 2 0 0 1 2 2v1", "M12 10v4h4", "M12 14c1.5-2 3.5-3 6-3", "M20 18v-4h-4", "M20 14c-1.5 2-3.5 3-6 3"]), Je = {
  briefcase: Me,
  target: _e,
  monitor: Te,
  "shield-check": Ee,
  "hard-drive": Ae,
  "folder-kanban": Le,
  "book-open": $e,
  phone: Oe,
  sparkles: F,
  video: Ie,
  church: Re,
  "building-2": Pe,
  truck: De,
  users: He,
  database: Fe,
  "bell-ring": Ue,
  "door-open": Ke,
  scale: Be,
  globe: qe,
  search: X,
  "layout-grid": We,
  activity: Ve,
  "folder-sync": Ge
};
function Ye() {
  const n = [];
  for (let t = 0; t < 3; t++)
    for (let i = 0; i < 3; i++)
      n.push([6 + i * 7, 6 + t * 7]);
  return /* @__PURE__ */ e("svg", { width: "20", height: "20", viewBox: "0 0 24 24", fill: "none", xmlns: "http://www.w3.org/2000/svg", children: n.map(([t, i], a) => /* @__PURE__ */ e("circle", { cx: t, cy: i, r: "2", fill: "#94a3b8" }, a)) });
}
function ne({ icon: n, size: t = 20 }) {
  const i = Je[n];
  return i ? /* @__PURE__ */ e(i, { size: t, color: "#fff" }) : /* @__PURE__ */ e("span", { style: { color: "#fff", fontSize: 14, fontWeight: 700 }, children: n.charAt(0).toUpperCase() });
}
function Qe({
  currentProduct: n,
  products: t,
  open: i,
  onToggle: a,
  onClose: o,
  hubUrl: d
}) {
  const p = $(null), s = t.filter((r) => r.active), l = t.filter((r) => !r.active);
  return z(() => {
    if (!i) return;
    function r(u) {
      p.current && !p.current.contains(u.target) && o();
    }
    function m(u) {
      u.key === "Escape" && o();
    }
    return document.addEventListener("mousedown", r), document.addEventListener("keydown", m), () => {
      document.removeEventListener("mousedown", r), document.removeEventListener("keydown", m);
    };
  }, [i, o]), /* @__PURE__ */ c("div", { className: "hb-switcher", ref: p, style: { position: "relative" }, "data-tour": "product-switcher", children: [
    /* @__PURE__ */ e(
      "button",
      {
        className: `hb-waffle-btn${i ? " open" : ""}`,
        onClick: a,
        "aria-expanded": i,
        "aria-label": "App launcher",
        children: /* @__PURE__ */ e(Ye, {})
      }
    ),
    i && /* @__PURE__ */ c("div", { className: "hb-waffle-panel", role: "menu", children: [
      /* @__PURE__ */ e("div", { className: "hb-waffle-header", children: "Apps" }),
      /* @__PURE__ */ e("div", { className: "hb-waffle-grid", children: s.map((r) => /* @__PURE__ */ c(
        "a",
        {
          href: r.url,
          className: "hb-waffle-tile",
          onClick: o,
          role: "menuitem",
          children: [
            /* @__PURE__ */ e(
              "div",
              {
                className: `hb-waffle-tile-icon${r.id === n ? " current" : ""}`,
                style: {
                  background: r.color,
                  color: r.color
                },
                children: /* @__PURE__ */ e(ne, { icon: r.icon, color: r.color })
              }
            ),
            /* @__PURE__ */ e("span", { className: "hb-waffle-tile-name", children: r.name })
          ]
        },
        r.id
      )) }),
      l.length > 0 && /* @__PURE__ */ c(U, { children: [
        /* @__PURE__ */ e("div", { className: "hb-waffle-sep" }),
        /* @__PURE__ */ e("div", { className: "hb-waffle-section-label", children: "Available" }),
        /* @__PURE__ */ e("div", { className: "hb-waffle-grid", children: l.map((r) => /* @__PURE__ */ c(
          "a",
          {
            href: `${d}/products/${r.id}`,
            className: "hb-waffle-tile inactive",
            onClick: o,
            role: "menuitem",
            children: [
              /* @__PURE__ */ e(
                "div",
                {
                  className: "hb-waffle-tile-icon",
                  style: { background: r.color },
                  children: /* @__PURE__ */ e(ne, { icon: r.icon, color: r.color })
                }
              ),
              /* @__PURE__ */ e("span", { className: "hb-waffle-tile-name", children: r.name })
            ]
          },
          r.id
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
function Xe(n, t, i, a = 200) {
  const [o, d] = h([]), [p, s] = h(!1), l = $(null);
  return z(() => {
    l.current && clearTimeout(l.current);
    const r = i.trim();
    if (!r || !t) {
      d([]), s(!1);
      return;
    }
    s(!0);
    const m = new AbortController();
    return l.current = setTimeout(() => {
      fetch(
        `${n}/api/bus/search?q=${encodeURIComponent(r)}&tenant_id=${encodeURIComponent(t)}`,
        { credentials: "include", signal: m.signal }
      ).then((u) => u.ok ? u.json() : Promise.resolve({ groups: [] })).then((u) => {
        d(u.groups ?? []), s(!1);
      }).catch((u) => {
        u.name !== "AbortError" && (d([]), s(!1));
      });
    }, a), () => {
      m.abort(), l.current && clearTimeout(l.current);
    };
  }, [n, t, i, a]), { results: o, loading: p };
}
function Ze({ apiBase: n, tenantId: t }) {
  const [i, a] = h(!1), [o, d] = h(""), [p, s] = h(-1), l = $(null), { results: r, loading: m } = Xe(n, t, o), u = r.flatMap((x) => x.results), y = S(() => {
    a(!0), d(""), s(-1), setTimeout(() => {
      var x;
      return (x = l.current) == null ? void 0 : x.focus();
    }, 0);
  }, []), f = S(() => {
    a(!1), d(""), s(-1);
  }, []);
  z(() => {
    function x(b) {
      (b.metaKey || b.ctrlKey) && b.key === "k" && (b.preventDefault(), i ? f() : y()), b.key === "Escape" && i && f();
    }
    return document.addEventListener("keydown", x), () => document.removeEventListener("keydown", x);
  }, [i, y, f]);
  function g(x) {
    if (x.key === "ArrowDown")
      x.preventDefault(), s((b) => Math.min(b + 1, u.length - 1));
    else if (x.key === "ArrowUp")
      x.preventDefault(), s((b) => Math.max(b - 1, -1));
    else if (x.key === "Enter" && p >= 0) {
      const b = u[p];
      b && (window.location.href = b.deepLink, f());
    }
  }
  const A = typeof navigator < "u" && /Mac/i.test(navigator.platform);
  return /* @__PURE__ */ c(U, { children: [
    /* @__PURE__ */ e("div", { className: "hb-search-wrap", "data-tour": "unified-search", children: /* @__PURE__ */ c("button", { className: "hb-search-trigger", onClick: y, "aria-label": "Search (Cmd+K)", children: [
      /* @__PURE__ */ e(X, { size: 14 }),
      /* @__PURE__ */ e("span", { className: "hb-search-trigger-text", children: "Search everything..." }),
      /* @__PURE__ */ c("span", { className: "hb-kbd", children: [
        /* @__PURE__ */ e("kbd", { children: A ? "⌘" : "Ctrl" }),
        /* @__PURE__ */ e("kbd", { children: "K" })
      ] })
    ] }) }),
    i && /* @__PURE__ */ e(
      "div",
      {
        className: "hb-search-overlay",
        onMouseDown: (x) => {
          x.target === x.currentTarget && f();
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
                ref: l,
                className: "hb-search-input",
                placeholder: "Search everything...",
                value: o,
                onChange: (x) => {
                  d(x.target.value), s(-1);
                },
                onKeyDown: g,
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
            et,
            {
              query: o,
              loading: m,
              results: r,
              focusedIndex: p,
              onNavigate: f
            }
          )
        ] })
      }
    )
  ] });
}
function et({ query: n, loading: t, results: i, focusedIndex: a, onNavigate: o }) {
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
  if (!i.length)
    return /* @__PURE__ */ c("div", { className: "hb-search-empty", children: [
      "No results for “",
      n,
      "”"
    ] });
  let d = 0;
  return /* @__PURE__ */ e("div", { className: "hb-search-results", children: i.map((p) => /* @__PURE__ */ c("div", { children: [
    /* @__PURE__ */ c("div", { className: "hb-search-group-label", children: [
      p.productName,
      " — ",
      p.results.length,
      " result",
      p.results.length !== 1 ? "s" : ""
    ] }),
    p.results.map((s) => {
      const l = d++;
      return /* @__PURE__ */ c(
        "a",
        {
          href: s.deepLink,
          className: `hb-search-item${a === l ? " focused" : ""}`,
          onClick: o,
          children: [
            /* @__PURE__ */ e("div", { className: "hb-search-item-icon", children: s.icon ?? s.title.slice(0, 1).toUpperCase() }),
            /* @__PURE__ */ c("div", { className: "hb-search-item-body", children: [
              /* @__PURE__ */ e("div", { className: "hb-search-item-title", children: s.title }),
              s.subtitle && /* @__PURE__ */ e("div", { className: "hb-search-item-sub", children: s.subtitle })
            ] }),
            /* @__PURE__ */ e("span", { className: "hb-source-badge", children: p.productName })
          ]
        },
        s.id
      );
    })
  ] }, p.productId)) });
}
function tt(n) {
  const t = Math.floor((Date.now() - new Date(n).getTime()) / 1e3);
  return t < 60 ? "just now" : t < 3600 ? `${Math.floor(t / 60)}m ago` : t < 86400 ? `${Math.floor(t / 3600)}h ago` : `${Math.floor(t / 86400)}d ago`;
}
function nt({
  notifications: n,
  unreadCount: t,
  open: i,
  onToggle: a,
  onClose: o,
  onMarkAllRead: d,
  onMarkRead: p,
  onDismiss: s,
  muted: l,
  onMute: r,
  onUnmute: m,
  hubUrl: u
}) {
  const y = $(null);
  return z(() => {
    if (!i) return;
    function f(g) {
      y.current && !y.current.contains(g.target) && o();
    }
    return document.addEventListener("mousedown", f), () => document.removeEventListener("mousedown", f);
  }, [i, o]), /* @__PURE__ */ c("div", { className: "hb-notif", ref: y, "data-tour": "notifications", children: [
    /* @__PURE__ */ c(
      "button",
      {
        className: "hb-notif-btn",
        onClick: a,
        "aria-label": `Notifications${t > 0 ? ` (${t} unread)` : ""}`,
        "aria-expanded": i,
        children: [
          /* @__PURE__ */ e(Ne, { size: 18 }),
          t > 0 && /* @__PURE__ */ e("span", { className: "hb-badge", "aria-hidden": "true", children: t > 99 ? "99+" : t })
        ]
      }
    ),
    i && /* @__PURE__ */ c("div", { className: "hb-notif-dropdown", role: "dialog", "aria-label": "Notifications", children: [
      /* @__PURE__ */ c("div", { className: "hb-notif-header", children: [
        /* @__PURE__ */ e("span", { className: "hb-notif-title", children: "Notifications" }),
        t > 0 && /* @__PURE__ */ e("button", { className: "hb-notif-mark-read", onClick: d, children: "Mark all read" })
      ] }),
      /* @__PURE__ */ e("div", { className: "hb-notif-list", role: "list", children: n.length === 0 ? /* @__PURE__ */ e("div", { className: "hb-notif-empty", children: "No notifications" }) : n.slice(0, 20).map((f) => /* @__PURE__ */ c(
        "div",
        {
          className: `hb-notif-item${f.read ? "" : " unread"}`,
          role: "listitem",
          children: [
            /* @__PURE__ */ c(
              "a",
              {
                href: f.deepLink,
                className: "hb-notif-item-link",
                onClick: () => {
                  p(f.id), o();
                },
                children: [
                  /* @__PURE__ */ e(
                    "span",
                    {
                      className: "hb-notif-icon",
                      style: { background: Q[f.severity] },
                      "aria-hidden": "true"
                    }
                  ),
                  /* @__PURE__ */ c("div", { className: "hb-notif-body", children: [
                    /* @__PURE__ */ c("div", { className: "hb-notif-body-title", children: [
                      f.title,
                      f.groupCount && f.groupCount > 1 && /* @__PURE__ */ e("span", { className: "hb-notif-group-badge", children: f.groupCount })
                    ] }),
                    f.body && /* @__PURE__ */ e("div", { className: "hb-notif-body-text", children: f.body }),
                    /* @__PURE__ */ c("div", { className: "hb-notif-meta", children: [
                      /* @__PURE__ */ e("span", { className: "hb-source-badge", children: f.productName }),
                      /* @__PURE__ */ e("span", { className: "hb-notif-time", children: tt(f.createdAt) })
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
                  g.stopPropagation(), s(f.id);
                },
                "aria-label": "Dismiss notification",
                children: /* @__PURE__ */ e(K, { size: 14 })
              }
            )
          ]
        },
        f.id
      )) }),
      /* @__PURE__ */ e("div", { className: "hb-notif-footer", children: /* @__PURE__ */ c("div", { className: "hb-notif-footer-row", children: [
        l ? /* @__PURE__ */ e("button", { className: "hb-notif-mute-btn", onClick: m, children: "Unmute notifications" }) : /* @__PURE__ */ c("div", { className: "hb-notif-mute-group", children: [
          /* @__PURE__ */ e("button", { className: "hb-notif-mute-btn", onClick: () => r(3600 * 1e3), children: "Mute 1h" }),
          /* @__PURE__ */ e("button", { className: "hb-notif-mute-btn", onClick: () => {
            const f = /* @__PURE__ */ new Date(), g = new Date(f.getFullYear(), f.getMonth(), f.getDate() + 1);
            r(g.getTime() - f.getTime());
          }, children: "Mute today" })
        ] }),
        /* @__PURE__ */ c("a", { href: `${u}/notifications/settings`, onClick: o, className: "hb-notif-settings-link", children: [
          /* @__PURE__ */ e(ce, { size: 14 }),
          "Settings"
        ] })
      ] }) })
    ] })
  ] });
}
function it({ toasts: n, onDismiss: t }) {
  return n.length === 0 ? null : /* @__PURE__ */ e("div", { className: "hb-toast-container", role: "status", "aria-live": "polite", children: n.slice(0, 3).map((i) => {
    const a = q.find((o) => o.id === i.productId);
    return /* @__PURE__ */ c(
      "div",
      {
        className: "hb-toast",
        style: { borderLeftColor: Q[i.severity] },
        children: [
          /* @__PURE__ */ e(
            "span",
            {
              className: "hb-toast-dot",
              style: { background: (a == null ? void 0 : a.color) || Q[i.severity] }
            }
          ),
          /* @__PURE__ */ c("div", { className: "hb-toast-body", children: [
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
function at({
  session: n,
  open: t,
  onToggle: i,
  onClose: a,
  onLogout: o,
  hubUrl: d
}) {
  const p = $(null);
  z(() => {
    if (!t) return;
    function l(r) {
      p.current && !p.current.contains(r.target) && a();
    }
    return document.addEventListener("mousedown", l), () => document.removeEventListener("mousedown", l);
  }, [t, a]);
  function s() {
    a(), o ? o() : window.location.href = `${d}/logout`;
  }
  return /* @__PURE__ */ c("div", { className: "hb-user", ref: p, "data-tour": "user-menu", children: [
    /* @__PURE__ */ c("button", { className: "hb-user-btn", onClick: i, "aria-expanded": t, "aria-label": "User menu", children: [
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
          onClick: a,
          role: "menuitem",
          children: [
            /* @__PURE__ */ e(Se, { size: 14 }),
            "Profile"
          ]
        }
      ),
      /* @__PURE__ */ c(
        "a",
        {
          href: `${d}/settings`,
          className: "hb-menu-item",
          onClick: a,
          role: "menuitem",
          children: [
            /* @__PURE__ */ e(ce, { size: 14 }),
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
          onClick: a,
          role: "menuitem",
          children: [
            /* @__PURE__ */ e(je, { size: 14 }),
            "Switch Tenant"
          ]
        }
      ),
      /* @__PURE__ */ e("div", { className: "hb-menu-sep" }),
      /* @__PURE__ */ c(
        "button",
        {
          className: "hb-menu-item danger",
          onClick: s,
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
    const a = `${this.baseUrl}${t}`, o = await fetch(a, {
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
    const i = t ? `?category=${encodeURIComponent(t)}` : "", a = await fetch(`${this.baseUrl}/api/kb-public/${this.platformId}/articles${i}`);
    if (!a.ok) throw new Error(`Failed to fetch KB articles: ${a.status}`);
    return a.json();
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
  async startChat(t, i, a) {
    return this.request("/api/chat/sessions", {
      method: "POST",
      body: JSON.stringify({ message: t, user_name: i, user_email: a, platform: this.platformId })
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
  async endChat(t, i, a) {
    return this.request(`/api/chat/sessions/${t}/end`, {
      method: "POST",
      body: JSON.stringify({ rating: i, feedback: a })
    });
  }
  async escalateChat(t) {
    return this.request(`/api/chat/sessions/${t}/escalate`, {
      method: "POST",
      body: JSON.stringify({})
    });
  }
  async sendCobrowseEvents(t, i, a) {
    return this.request(`/api/chat/sessions/${t}/cobrowse`, {
      method: "POST",
      body: JSON.stringify({ events: i, sequence: a })
    });
  }
}
const de = be(null);
function R() {
  const n = ue(de);
  if (!n) throw new Error("useSupportContext must be used within <SupportProvider>");
  return n;
}
function ot({ config: n, user: t, children: i }) {
  const a = Y(() => new rt(n), [n]), o = Y(() => ({ client: a, config: n, user: t }), [a, n, t]);
  return /* @__PURE__ */ e(de.Provider, { value: o, children: i });
}
function st(n) {
  const { client: t, user: i } = R(), [a, o] = h([]), [d, p] = h(!0), [s, l] = h(null), r = S(async () => {
    p(!0), l(null);
    try {
      const m = await t.listTickets({
        reporter_email: i.email,
        status: n == null ? void 0 : n.status,
        ticket_type: n == null ? void 0 : n.ticket_type
      });
      o(m);
    } catch (m) {
      l(m instanceof Error ? m.message : "Failed to load tickets");
    } finally {
      p(!1);
    }
  }, [t, i.email, n == null ? void 0 : n.status, n == null ? void 0 : n.ticket_type]);
  return z(() => {
    r();
  }, [r]), { tickets: a, loading: d, error: s, refresh: r };
}
function lt(n) {
  const { client: t } = R(), [i, a] = h(null), [o, d] = h([]), [p, s] = h(!0), [l, r] = h(null), m = S(async () => {
    if (n) {
      s(!0), r(null);
      try {
        const [u, y] = await Promise.all([
          t.getTicket(n),
          t.getTicketActivity(n)
        ]);
        a(u), d(y);
      } catch (u) {
        r(u instanceof Error ? u.message : "Failed to load ticket");
      } finally {
        s(!1);
      }
    }
  }, [t, n]);
  return z(() => {
    m();
  }, [m]), { ticket: i, activity: o, loading: p, error: l, refresh: m };
}
function ct() {
  const { client: n, user: t } = R(), [i, a] = h(!1), [o, d] = h(null);
  return { createTicket: S(async (s) => {
    a(!0), d(null);
    try {
      return await n.createTicket({
        ...s,
        reporter_email: t.email,
        reporter_name: t.name
      });
    } catch (l) {
      return d(l instanceof Error ? l.message : "Failed to create ticket"), null;
    } finally {
      a(!1);
    }
  }, [n, t]), submitting: i, error: o };
}
function dt() {
  const { client: n, user: t } = R(), [i, a] = h(!1), [o, d] = h(null);
  return { addComment: S(async (s, l) => {
    a(!0), d(null);
    try {
      return await n.addComment(s, {
        content: l,
        actor_email: t.email,
        actor_name: t.name
      }), !0;
    } catch (r) {
      return d(r instanceof Error ? r.message : "Failed to add comment"), !1;
    } finally {
      a(!1);
    }
  }, [n, t]), submitting: i, error: o };
}
function pt() {
  const { client: n } = R(), [t, i] = h([]), [a, o] = h(!0), [d, p] = h(null), s = S(async () => {
    o(!0), p(null);
    try {
      const l = await n.getPublicReleases();
      i(l);
    } catch (l) {
      p(l instanceof Error ? l.message : "Failed to load release notes");
    } finally {
      o(!1);
    }
  }, [n]);
  return z(() => {
    s();
  }, [s]), { releases: t, loading: a, error: d, refresh: s };
}
function ht() {
  const { client: n } = R(), [t, i] = h([]), [a, o] = h(!0), [d, p] = h(null), s = S(async () => {
    o(!0), p(null);
    try {
      const l = await n.getFeatures();
      i(l);
    } catch (l) {
      p(l instanceof Error ? l.message : "Failed to load features");
    } finally {
      o(!1);
    }
  }, [n]);
  return z(() => {
    s();
  }, [s]), { features: t, loading: a, error: d, refresh: s };
}
function bt() {
  const { client: n, user: t } = R(), [i, a] = h(null), [o, d] = h(null), p = S(async (l) => {
    a(l), d(null);
    try {
      return await n.voteOnTicket(l, {
        user_email: t.email,
        user_name: t.name
      }), !0;
    } catch (r) {
      return d(r instanceof Error ? r.message : "Failed to vote"), !1;
    } finally {
      a(null);
    }
  }, [n, t]), s = S(async (l) => {
    a(l), d(null);
    try {
      return await n.removeVote(l), !0;
    } catch (r) {
      return d(r instanceof Error ? r.message : "Failed to remove vote"), !1;
    } finally {
      a(null);
    }
  }, [n]);
  return { vote: p, removeVote: s, voting: i, error: o };
}
function ut() {
  const { client: n } = R(), [t, i] = h([]), [a, o] = h(!0), [d, p] = h(null), s = S(async () => {
    o(!0), p(null);
    try {
      const l = await n.getKBCategories();
      i(l);
    } catch (l) {
      p(l instanceof Error ? l.message : "Failed to load categories");
    } finally {
      o(!1);
    }
  }, [n]);
  return z(() => {
    s();
  }, [s]), { categories: t, loading: a, error: d, refresh: s };
}
function mt(n) {
  const { client: t } = R(), [i, a] = h([]), [o, d] = h(!0), [p, s] = h(null), l = S(async () => {
    d(!0), s(null);
    try {
      const r = await t.getKBArticles(n);
      a(r);
    } catch (r) {
      s(r instanceof Error ? r.message : "Failed to load articles");
    } finally {
      d(!1);
    }
  }, [t, n]);
  return z(() => {
    l();
  }, [l]), { articles: i, loading: o, error: p, refresh: l };
}
function ft(n) {
  const { client: t } = R(), [i, a] = h(null), [o, d] = h(!0), [p, s] = h(null), l = S(async () => {
    if (n) {
      d(!0), s(null);
      try {
        const r = await t.getKBArticle(n);
        a(r);
      } catch (r) {
        s(r instanceof Error ? r.message : "Failed to load article");
      } finally {
        d(!1);
      }
    }
  }, [t, n]);
  return z(() => {
    l();
  }, [l]), { article: i, loading: o, error: p, refresh: l };
}
function gt() {
  const { client: n } = R(), [t, i] = h([]), [a, o] = h(!1), [d, p] = h(null), s = S(async (l) => {
    if (!l.trim()) {
      i([]);
      return;
    }
    o(!0), p(null);
    try {
      const r = await n.searchKB(l);
      i(r);
    } catch (r) {
      p(r instanceof Error ? r.message : "Failed to search");
    } finally {
      o(!1);
    }
  }, [n]);
  return { results: t, loading: a, error: d, search: s };
}
const B = "https://docs.theonestack.com", ie = {
  psa: { path: "/docs/psa/", articles: [{ title: "PSA Overview", path: "/docs/psa/" }, { title: "Working with Tickets", path: "/docs/psa/tickets/" }, { title: "Time Tracking", path: "/docs/psa/time-tracking/" }, { title: "SLA Management", path: "/docs/psa/sla-management/" }] },
  crm: { path: "/docs/crm/", articles: [{ title: "CRM Overview", path: "/docs/crm/" }, { title: "Companies & Contacts", path: "/docs/crm/companies-contacts/" }, { title: "Deals & Pipeline", path: "/docs/crm/deals-pipeline/" }] },
  books: { path: "/docs/books/", articles: [{ title: "Books Overview", path: "/docs/books/" }, { title: "Invoices & Payments", path: "/docs/books/invoices-payments/" }, { title: "Chart of Accounts", path: "/docs/books/chart-of-accounts/" }] },
  rmm: { path: "/docs/rmm/", articles: [{ title: "RMM Overview", path: "/docs/rmm/" }, { title: "Device Management", path: "/docs/rmm/device-management/" }, { title: "Monitoring & Alerts", path: "/docs/rmm/monitoring-alerts/" }] },
  security: { path: "/docs/security/", articles: [{ title: "Security Overview", path: "/docs/security/" }, { title: "Threat Detection", path: "/docs/security/threat-detection/" }] },
  defend: { path: "/docs/defend/", articles: [{ title: "Defend Overview", path: "/docs/defend/" }, { title: "Endpoint Detection", path: "/docs/defend/detection-rules/" }, { title: "Incident Response", path: "/docs/defend/response-actions/" }] },
  hub: { path: "/docs/getting-started/", articles: [{ title: "Hub Overview", path: "/docs/hub/" }, { title: "Team Setup", path: "/docs/getting-started/team-setup/" }, { title: "Permissions & Roles", path: "/docs/admin/permissions/" }, { title: "Billing & Subscriptions", path: "/docs/admin/billing/" }] },
  collective: { path: "/docs/collective/", articles: [{ title: "Collective Overview", path: "/docs/collective/" }, { title: "Community", path: "/docs/collective/community/" }] },
  voice: { path: "/docs/voice/", articles: [{ title: "Voice Overview", path: "/docs/voice/" }, { title: "Call Management", path: "/docs/voice/call-routing/" }] },
  oncall: { path: "/docs/oncall/", articles: [{ title: "On-Call Overview", path: "/docs/oncall/" }, { title: "Schedules", path: "/docs/oncall/on-call-schedules/" }, { title: "Escalation Policies", path: "/docs/oncall/escalation-policies/" }] },
  cmdb: { path: "/docs/cmdb/", articles: [{ title: "CMDB Overview", path: "/docs/cmdb/" }, { title: "Asset Discovery", path: "/docs/cmdb/asset-inventory/" }, { title: "Password Vault", path: "/docs/cmdb/password-vault/" }] },
  projects: { path: "/docs/projects/", articles: [{ title: "Projects Overview", path: "/docs/projects/" }, { title: "Task Management", path: "/docs/projects/task-management/" }, { title: "Gantt View", path: "/docs/projects/gantt-view/" }] },
  agents: { path: "/docs/agents/", articles: [{ title: "Agents Overview", path: "/docs/agents/" }, { title: "Agent Builder", path: "/docs/agents/building-agents/" }] },
  compliance: { path: "/docs/compliance/", articles: [{ title: "Compliance Overview", path: "/docs/compliance/" }, { title: "Frameworks", path: "/docs/compliance/frameworks/" }] },
  protect: { path: "/docs/protect/", articles: [{ title: "Protect Overview", path: "/docs/protect/" }, { title: "Dark Web Monitoring", path: "/docs/protect/dark-web-monitoring/" }] },
  backups: { path: "/docs/backups/", articles: [{ title: "Backups Overview", path: "/docs/backups/" }, { title: "Restore Procedures", path: "/docs/backups/restore-procedures/" }] }
}, xt = [
  { title: "Quick Start Guide", path: "/docs/getting-started/quick-start/" },
  { title: "API Reference", path: "/docs/api-reference/" },
  { title: "Troubleshooting", path: "/docs/troubleshooting/common-issues/" }
], vt = {
  hub: "Support",
  submit: "Submit a Ticket",
  tickets: "My Tickets",
  ticket: "Ticket",
  changelog: "What's New",
  features: "Feature Requests",
  kb: "Knowledge Base",
  "kb-article": "Article",
  docs: "Documentation",
  chat: "Chat"
}, yt = [
  { id: "bug", label: "Report a Bug", desc: "Something not working? We'll fix it.", type: "bug_report" },
  { id: "feature", label: "Request a Feature", desc: "Have an idea? We want to hear it.", type: "feature_request" },
  { id: "help", label: "Get Help", desc: "Need assistance with something?", type: "service_request" }
];
function kt({ onNav: n }) {
  const { config: t } = R();
  return /* @__PURE__ */ c("div", { className: "hb-sp-hub", children: [
    /* @__PURE__ */ c("div", { className: "hb-sp-hub-header", children: [
      /* @__PURE__ */ e("div", { className: "hb-sp-hub-title", children: "How can we help?" }),
      /* @__PURE__ */ c("div", { className: "hb-sp-hub-sub", children: [
        "Get support for ",
        t.platformName,
        "."
      ] })
    ] }),
    /* @__PURE__ */ e("div", { className: "hb-sp-hub-grid", children: yt.map((i) => /* @__PURE__ */ c("button", { className: "hb-sp-card", onClick: () => n({ id: "submit", ticketType: i.type }), children: [
      /* @__PURE__ */ e("div", { className: "hb-sp-card-label", children: i.label }),
      /* @__PURE__ */ e("div", { className: "hb-sp-card-desc", children: i.desc })
    ] }, i.id)) }),
    /* @__PURE__ */ c("div", { className: "hb-sp-hub-links", children: [
      /* @__PURE__ */ c("button", { className: "hb-sp-link-item", onClick: () => n({ id: "tickets" }), children: [
        /* @__PURE__ */ e("span", { children: "My Tickets" }),
        /* @__PURE__ */ e("span", { className: "hb-sp-chevron", children: "›" })
      ] }),
      /* @__PURE__ */ c("button", { className: "hb-sp-link-item", onClick: () => n({ id: "kb" }), children: [
        /* @__PURE__ */ e("span", { children: "Knowledge Base" }),
        /* @__PURE__ */ e("span", { className: "hb-sp-chevron", children: "›" })
      ] }),
      /* @__PURE__ */ c("button", { className: "hb-sp-link-item", onClick: () => n({ id: "docs" }), children: [
        /* @__PURE__ */ e("span", { children: "Documentation" }),
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
function wt({ currentProduct: n }) {
  const t = ie[n] ?? ie.hub, i = n === "hub" ? "Hub" : n.charAt(0).toUpperCase() + n.slice(1);
  return /* @__PURE__ */ c("div", { className: "hb-sp-list-page", children: [
    /* @__PURE__ */ e("div", { className: "hb-sp-filter-row", style: { marginBottom: 12 }, children: /* @__PURE__ */ e("a", { href: B, target: "_blank", rel: "noopener noreferrer", className: "hb-sp-filter-btn", style: { textDecoration: "none" }, children: "docs.theonestack.com ↗" }) }),
    /* @__PURE__ */ c("div", { className: "hb-sp-section-label", children: [
      i,
      " Docs"
    ] }),
    t.articles.map((a) => /* @__PURE__ */ e("a", { href: `${B}${a.path}`, target: "_blank", rel: "noopener noreferrer", className: "hb-sp-list-item", style: { textDecoration: "none" }, children: /* @__PURE__ */ e("div", { className: "hb-sp-ticket-title", children: a.title }) }, a.path)),
    /* @__PURE__ */ e("a", { href: `${B}${t.path}`, target: "_blank", rel: "noopener noreferrer", className: "hb-sp-list-item", style: { textDecoration: "none", color: "#f97316" }, children: /* @__PURE__ */ c("div", { className: "hb-sp-ticket-title", children: [
      "View all ",
      i,
      " docs →"
    ] }) }),
    /* @__PURE__ */ e("div", { className: "hb-sp-section-label", style: { marginTop: 16 }, children: "Quick Links" }),
    xt.map((a) => /* @__PURE__ */ e("a", { href: `${B}${a.path}`, target: "_blank", rel: "noopener noreferrer", className: "hb-sp-list-item", style: { textDecoration: "none" }, children: /* @__PURE__ */ e("div", { className: "hb-sp-ticket-title", children: a.title }) }, a.path))
  ] });
}
const Nt = [
  { value: "bug_report", label: "Bug Report" },
  { value: "feature_request", label: "Feature Request" },
  { value: "service_request", label: "Service Request" }
], St = [
  { value: "low", label: "Low" },
  { value: "medium", label: "Medium" },
  { value: "high", label: "High" },
  { value: "critical", label: "Critical" }
], Ct = [
  { value: "cosmetic", label: "Cosmetic" },
  { value: "minor", label: "Minor" },
  { value: "major", label: "Major" },
  { value: "blocker", label: "Blocker" }
];
function jt({ initialType: n, onNav: t }) {
  const [i, a] = h(n || "bug_report"), [o, d] = h(""), [p, s] = h(""), [l, r] = h("medium"), [m, u] = h("minor"), { createTicket: y, submitting: f, error: g } = ct(), [A, x] = h(null);
  return A ? /* @__PURE__ */ c("div", { className: "hb-sp-success", children: [
    /* @__PURE__ */ e("div", { className: "hb-sp-success-icon", children: "✓" }),
    /* @__PURE__ */ e("div", { className: "hb-sp-success-title", children: "Ticket Submitted" }),
    /* @__PURE__ */ e("div", { className: "hb-sp-success-num", children: A }),
    /* @__PURE__ */ c("div", { className: "hb-sp-success-actions", children: [
      /* @__PURE__ */ e("button", { className: "hb-sp-btn hb-sp-btn-secondary", onClick: () => t({ id: "tickets" }), children: "View My Tickets" }),
      /* @__PURE__ */ e("button", { className: "hb-sp-btn hb-sp-btn-ghost", onClick: () => t({ id: "hub" }), children: "Back to Support" })
    ] })
  ] }) : /* @__PURE__ */ c("div", { className: "hb-sp-form-page", children: [
    /* @__PURE__ */ c("div", { className: "hb-sp-field", children: [
      /* @__PURE__ */ e("label", { className: "hb-sp-label", children: "Type" }),
      /* @__PURE__ */ e("div", { className: "hb-sp-type-row", children: Nt.map((b) => /* @__PURE__ */ e(
        "button",
        {
          type: "button",
          className: `hb-sp-type-btn${i === b.value ? " active" : ""}`,
          onClick: () => a(b.value),
          children: b.label
        },
        b.value
      )) })
    ] }),
    /* @__PURE__ */ c("div", { className: "hb-sp-field", children: [
      /* @__PURE__ */ e("label", { className: "hb-sp-label", htmlFor: "sp-title", children: "Title" }),
      /* @__PURE__ */ e(
        "input",
        {
          id: "sp-title",
          className: "hb-sp-input",
          value: o,
          onChange: (b) => d(b.target.value),
          placeholder: "Brief description...",
          maxLength: 200
        }
      ),
      /* @__PURE__ */ c("div", { className: "hb-sp-char-count", children: [
        o.length,
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
          onChange: (b) => s(b.target.value),
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
      /* @__PURE__ */ e("div", { className: "hb-sp-chip-row", children: St.map((b) => /* @__PURE__ */ e(
        "button",
        {
          type: "button",
          className: `hb-sp-chip${l === b.value ? " active" : ""}`,
          onClick: () => r(b.value),
          children: b.label
        },
        b.value
      )) })
    ] }),
    i === "bug_report" && /* @__PURE__ */ c("div", { className: "hb-sp-field", children: [
      /* @__PURE__ */ e("label", { className: "hb-sp-label", children: "Severity" }),
      /* @__PURE__ */ e("div", { className: "hb-sp-chip-row", children: Ct.map((b) => /* @__PURE__ */ e(
        "button",
        {
          type: "button",
          className: `hb-sp-chip${m === b.value ? " active" : ""}`,
          onClick: () => u(b.value),
          children: b.label
        },
        b.value
      )) })
    ] }),
    g && /* @__PURE__ */ e("div", { className: "hb-sp-error", children: g }),
    /* @__PURE__ */ e(
      "button",
      {
        className: "hb-sp-btn hb-sp-btn-primary",
        disabled: f || !o.trim() || !p.trim(),
        onClick: async () => {
          const b = await y({
            ticket_type: i,
            title: o.trim(),
            description: p.trim(),
            priority: l,
            severity: i === "bug_report" ? m : void 0
          });
          b && x(b.ticket_number);
        },
        children: f ? "Submitting…" : "Submit Ticket"
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
function zt({ onNav: n }) {
  const [t, i] = h(""), { tickets: a, loading: o, error: d } = st({ status: t || void 0 });
  return /* @__PURE__ */ c("div", { className: "hb-sp-list-page", children: [
    /* @__PURE__ */ c("div", { className: "hb-sp-filter-row", children: [
      [["", "All"], ["new,triaged,in_progress,waiting_reporter,waiting_external,on_hold", "Open"], ["resolved,closed", "Closed"]].map(([p, s]) => /* @__PURE__ */ e(
        "button",
        {
          className: `hb-sp-filter-btn${t === p ? " active" : ""}`,
          onClick: () => i(p),
          children: s
        },
        p
      )),
      /* @__PURE__ */ e("button", { className: "hb-sp-filter-btn hb-sp-filter-btn-new", onClick: () => n({ id: "submit" }), children: "+ New" })
    ] }),
    o ? /* @__PURE__ */ e("div", { className: "hb-sp-list", children: [0, 1, 2].map((p) => /* @__PURE__ */ e("div", { className: "hb-sp-skeleton" }, p)) }) : d ? /* @__PURE__ */ e("div", { className: "hb-sp-error", children: d }) : a.length === 0 ? /* @__PURE__ */ c("div", { className: "hb-sp-empty", children: [
      /* @__PURE__ */ e("div", { className: "hb-sp-empty-text", children: "No tickets found" }),
      /* @__PURE__ */ e("button", { className: "hb-sp-btn hb-sp-btn-secondary", onClick: () => n({ id: "submit" }), children: "Submit a Ticket" })
    ] }) : /* @__PURE__ */ e("div", { className: "hb-sp-list", children: a.map((p) => /* @__PURE__ */ c("button", { className: "hb-sp-list-item", onClick: () => n({ id: "ticket", ticketId: p.id }), children: [
      /* @__PURE__ */ c("div", { className: "hb-sp-ticket-top", children: [
        /* @__PURE__ */ e("span", { className: "hb-sp-ticket-num", children: p.ticket_number }),
        /* @__PURE__ */ e("span", { className: "hb-sp-badge", children: pe[p.status] ?? p.status })
      ] }),
      /* @__PURE__ */ e("div", { className: "hb-sp-ticket-title", children: p.title }),
      /* @__PURE__ */ e("div", { className: "hb-sp-ticket-meta", children: new Date(p.created_at).toLocaleDateString(void 0, { month: "short", day: "numeric", year: "numeric" }) })
    ] }, p.id)) })
  ] });
}
function Mt({ ticketId: n }) {
  const { ticket: t, activity: i, loading: a, error: o } = lt(n), { addComment: d, submitting: p } = dt(), [s, l] = h("");
  return a ? /* @__PURE__ */ e("div", { className: "hb-sp-loading", children: "Loading ticket…" }) : o || !t ? /* @__PURE__ */ e("div", { className: "hb-sp-error", children: o ?? "Ticket not found" }) : /* @__PURE__ */ c("div", { className: "hb-sp-detail-page", children: [
    /* @__PURE__ */ c("div", { className: "hb-sp-detail-header", children: [
      /* @__PURE__ */ e("span", { className: "hb-sp-ticket-num", children: t.ticket_number }),
      /* @__PURE__ */ e("span", { className: "hb-sp-badge", children: pe[t.status] ?? t.status })
    ] }),
    /* @__PURE__ */ e("div", { className: "hb-sp-detail-title", children: t.title }),
    /* @__PURE__ */ e("div", { className: "hb-sp-detail-desc", children: t.description }),
    i.length > 0 && /* @__PURE__ */ c("div", { className: "hb-sp-activity", children: [
      /* @__PURE__ */ e("div", { className: "hb-sp-activity-title", children: "Activity" }),
      i.filter((r) => !r.is_internal).map((r) => /* @__PURE__ */ c("div", { className: "hb-sp-activity-item", children: [
        /* @__PURE__ */ e("div", { className: "hb-sp-activity-actor", children: r.actor_name }),
        r.content && /* @__PURE__ */ e("div", { className: "hb-sp-activity-content", children: r.content }),
        /* @__PURE__ */ e("div", { className: "hb-sp-activity-time", children: new Date(r.created_at).toLocaleString() })
      ] }, r.id))
    ] }),
    /* @__PURE__ */ c("div", { className: "hb-sp-reply", children: [
      /* @__PURE__ */ e(
        "textarea",
        {
          className: "hb-sp-textarea",
          rows: 3,
          placeholder: "Add a comment…",
          value: s,
          onChange: (r) => l(r.target.value)
        }
      ),
      /* @__PURE__ */ e(
        "button",
        {
          className: "hb-sp-btn hb-sp-btn-primary",
          disabled: p || !s.trim(),
          onClick: async () => {
            await d(t.id, s.trim()) && l("");
          },
          children: p ? "Sending…" : "Send"
        }
      )
    ] })
  ] });
}
function _t() {
  const { releases: n, loading: t, error: i } = pt();
  return t ? /* @__PURE__ */ e("div", { className: "hb-sp-loading", children: "Loading releases…" }) : i ? /* @__PURE__ */ e("div", { className: "hb-sp-error", children: i }) : n.length === 0 ? /* @__PURE__ */ e("div", { className: "hb-sp-empty", children: /* @__PURE__ */ e("div", { className: "hb-sp-empty-text", children: "No releases yet." }) }) : /* @__PURE__ */ e("div", { className: "hb-sp-list-page", children: n.map((a, o) => /* @__PURE__ */ c("div", { className: "hb-sp-release", children: [
    /* @__PURE__ */ c("div", { className: "hb-sp-release-header", children: [
      /* @__PURE__ */ c("span", { className: "hb-sp-release-ver", children: [
        "v",
        a.version
      ] }),
      /* @__PURE__ */ e("span", { className: "hb-sp-release-date", children: new Date(a.released_date).toLocaleDateString(void 0, { month: "short", day: "numeric", year: "numeric" }) })
    ] }),
    /* @__PURE__ */ e("div", { className: "hb-sp-release-title", children: a.title }),
    /* @__PURE__ */ e("div", { className: "hb-sp-release-notes", children: a.release_notes })
  ] }, o)) });
}
const Tt = {
  proposed: "Proposed",
  planned: "Planned",
  in_progress: "In Progress",
  shipped: "Shipped",
  cancelled: "Cancelled"
};
function Et() {
  const { features: n, loading: t, error: i } = ht(), { vote: a, voting: o } = bt(), [d, p] = h(/* @__PURE__ */ new Set());
  return t ? /* @__PURE__ */ e("div", { className: "hb-sp-loading", children: "Loading features…" }) : i ? /* @__PURE__ */ e("div", { className: "hb-sp-error", children: i }) : n.length === 0 ? /* @__PURE__ */ e("div", { className: "hb-sp-empty", children: /* @__PURE__ */ e("div", { className: "hb-sp-empty-text", children: "No feature requests yet." }) }) : /* @__PURE__ */ e("div", { className: "hb-sp-list-page", children: n.map((s) => {
    var l;
    return /* @__PURE__ */ c("div", { className: "hb-sp-feature-item", children: [
      /* @__PURE__ */ c("div", { className: "hb-sp-feature-body", children: [
        /* @__PURE__ */ e("div", { className: "hb-sp-feature-title", children: s.title }),
        /* @__PURE__ */ e("div", { className: "hb-sp-feature-desc", children: s.description }),
        /* @__PURE__ */ e("span", { className: "hb-sp-badge", children: Tt[s.status] ?? s.status })
      ] }),
      /* @__PURE__ */ c(
        "button",
        {
          className: `hb-sp-vote-btn${d.has(s.id) ? " voted" : ""}`,
          disabled: o === s.id,
          onClick: async () => {
            await a(s.id) && p((m) => /* @__PURE__ */ new Set([...m, s.id]));
          },
          children: [
            "▲ ",
            ((l = s.tags) == null ? void 0 : l.length) ?? 0
          ]
        }
      )
    ] }, s.id);
  }) });
}
function At({ onNav: n, category: t }) {
  const { categories: i, loading: a } = ut(), { articles: o, loading: d } = mt(t), { search: p, results: s, loading: l } = gt(), [r, m] = h(""), u = $(null), y = (g) => {
    m(g), u.current && clearTimeout(u.current), u.current = setTimeout(() => p(g), 300);
  }, f = r.trim().length > 0;
  return /* @__PURE__ */ c("div", { className: "hb-sp-list-page", children: [
    /* @__PURE__ */ e("div", { className: "hb-sp-search-row", children: /* @__PURE__ */ e(
      "input",
      {
        className: "hb-sp-input",
        placeholder: "Search knowledge base…",
        value: r,
        onChange: (g) => y(g.target.value)
      }
    ) }),
    f ? l ? /* @__PURE__ */ e("div", { className: "hb-sp-loading", children: "Searching…" }) : s.length === 0 ? /* @__PURE__ */ e("div", { className: "hb-sp-empty", children: /* @__PURE__ */ c("div", { className: "hb-sp-empty-text", children: [
      'No results for "',
      r,
      '"'
    ] }) }) : /* @__PURE__ */ e("div", { className: "hb-sp-list", children: s.map((g) => /* @__PURE__ */ c("button", { className: "hb-sp-list-item", onClick: () => n({ id: "kb-article", slug: g.slug }), children: [
      /* @__PURE__ */ e("div", { className: "hb-sp-ticket-title", children: g.title }),
      g.excerpt && /* @__PURE__ */ e("div", { className: "hb-sp-ticket-meta", children: g.excerpt })
    ] }, g.id)) }) : /* @__PURE__ */ c(U, { children: [
      !t && !a && i.length > 0 && /* @__PURE__ */ e("div", { className: "hb-sp-kb-cats", children: i.map((g) => /* @__PURE__ */ c("button", { className: "hb-sp-kb-cat", onClick: () => n({ id: "kb", category: g.slug }), children: [
        /* @__PURE__ */ e("span", { children: g.name }),
        /* @__PURE__ */ e("span", { className: "hb-sp-kb-cat-count", children: g.article_count })
      ] }, g.id)) }),
      d ? /* @__PURE__ */ e("div", { className: "hb-sp-loading", children: "Loading…" }) : o.length === 0 ? /* @__PURE__ */ e("div", { className: "hb-sp-empty", children: /* @__PURE__ */ e("div", { className: "hb-sp-empty-text", children: "No articles in this category." }) }) : /* @__PURE__ */ e("div", { className: "hb-sp-list", children: o.map((g) => /* @__PURE__ */ c("button", { className: "hb-sp-list-item", onClick: () => n({ id: "kb-article", slug: g.slug }), children: [
        /* @__PURE__ */ e("div", { className: "hb-sp-ticket-title", children: g.title }),
        g.excerpt && /* @__PURE__ */ e("div", { className: "hb-sp-ticket-meta", children: g.excerpt })
      ] }, g.id)) })
    ] })
  ] });
}
function Lt({ slug: n }) {
  const { article: t, loading: i, error: a } = ft(n);
  return i ? /* @__PURE__ */ e("div", { className: "hb-sp-loading", children: "Loading article…" }) : a || !t ? /* @__PURE__ */ e("div", { className: "hb-sp-error", children: a ?? "Article not found" }) : /* @__PURE__ */ c("div", { className: "hb-sp-detail-page", children: [
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
function $t({ page: n, onNav: t, currentProduct: i }) {
  return n.id === "hub" ? /* @__PURE__ */ e(kt, { onNav: t }) : n.id === "submit" ? /* @__PURE__ */ e(jt, { initialType: n.ticketType, onNav: t }) : n.id === "tickets" ? /* @__PURE__ */ e(zt, { onNav: t }) : n.id === "ticket" ? /* @__PURE__ */ e(Mt, { ticketId: n.ticketId }) : n.id === "changelog" ? /* @__PURE__ */ e(_t, {}) : n.id === "features" ? /* @__PURE__ */ e(Et, {}) : n.id === "kb" ? /* @__PURE__ */ e(At, { onNav: t, category: n.category }) : n.id === "kb-article" ? /* @__PURE__ */ e(Lt, { slug: n.slug }) : n.id === "docs" ? /* @__PURE__ */ e(wt, { currentProduct: i }) : n.id === "chat" ? /* @__PURE__ */ e("div", { className: "hb-sp-empty", children: /* @__PURE__ */ e("div", { className: "hb-sp-empty-text", children: "Live chat coming soon." }) }) : null;
}
function Ot({ config: n, user: t, currentProduct: i = "hub" }) {
  const [a, o] = h(!1), [d, p] = h({ id: "hub" }), [s, l] = h([]), r = $(null), m = S((x) => {
    l((b) => [...b, d]), p(x), r.current && (r.current.scrollTop = 0);
  }, [d]), u = S(() => {
    l((x) => {
      const b = [...x], _ = b.pop();
      return _ && p(_), b;
    }), r.current && (r.current.scrollTop = 0);
  }, []), y = S(() => {
    o(!1), setTimeout(() => {
      p({ id: "hub" }), l([]);
    }, 200);
  }, []);
  z(() => {
    if (!a) return;
    const x = (b) => {
      b.key === "Escape" && y();
    };
    return document.addEventListener("keydown", x), () => document.removeEventListener("keydown", x);
  }, [a, y]);
  const f = s.length > 0, g = vt[d.id] ?? "Support", A = a ? se(
    /* @__PURE__ */ e("div", { className: "hb-sp-overlay", onClick: y, "aria-hidden": "true", children: /* @__PURE__ */ c(
      "div",
      {
        className: `hb-sp-panel${a ? " open" : ""}`,
        onClick: (x) => x.stopPropagation(),
        role: "dialog",
        "aria-modal": "true",
        "aria-label": "Support",
        children: [
          /* @__PURE__ */ c("div", { className: "hb-sp-header", children: [
            f ? /* @__PURE__ */ e("button", { className: "hb-sp-back-btn", onClick: u, "aria-label": "Go back", children: "‹ Back" }) : /* @__PURE__ */ e("div", { className: "hb-sp-header-title", children: g }),
            f && /* @__PURE__ */ e("div", { className: "hb-sp-header-title", children: g }),
            /* @__PURE__ */ e("button", { className: "hb-sp-close-btn", onClick: y, "aria-label": "Close support panel", children: /* @__PURE__ */ e(K, { size: 16 }) })
          ] }),
          /* @__PURE__ */ e("div", { className: "hb-sp-content", ref: r, children: /* @__PURE__ */ e(ot, { config: n, user: t, children: /* @__PURE__ */ e($t, { page: d, onNav: m, currentProduct: i }) }) })
        ]
      }
    ) }),
    document.body
  ) : null;
  return /* @__PURE__ */ c(U, { children: [
    /* @__PURE__ */ e(
      "button",
      {
        className: `hb-chat-btn${a ? " open" : ""}`,
        title: "Support",
        "aria-label": "Open support panel",
        "aria-expanded": a,
        onClick: () => o((x) => !x),
        children: /* @__PURE__ */ e(ze, { size: 18 })
      }
    ),
    A
  ] });
}
const It = {
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
function Rt(n) {
  for (const [t, i] of Object.entries(It))
    if (n.includes(t)) return i;
  return null;
}
const Pt = [
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
function Dt(n) {
  for (const [t, i] of Pt) {
    const a = n.match(t);
    if (a != null && a[1] && a[1] !== "new" && a[1] !== "list")
      return { entity_type: i, entity_id: a[1] };
  }
  return {};
}
function G() {
  const n = Rt(window.location.hostname), { entity_type: t, entity_id: i } = Dt(window.location.pathname);
  return { product: n, page: window.location.pathname, entity_type: t, entity_id: i };
}
const J = {
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
function Ht(n) {
  return n.entity_type && J[n.entity_type] ? J[n.entity_type] : n.page === "/" || n.page.includes("dashboard") ? J.dashboard : [
    { label: "What needs attention?", prompt: "What needs my attention today?" },
    { label: "Search tickets", prompt: "Search for recent open tickets." },
    { label: "Company health", prompt: "Show me a summary of company health scores." }
  ];
}
const W = "jarvis_messages", he = 50;
function Ft() {
  try {
    const n = sessionStorage.getItem(W);
    return n ? JSON.parse(n).slice(-he) : [];
  } catch {
    return [];
  }
}
function Ut(n) {
  try {
    sessionStorage.setItem(W, JSON.stringify(n.slice(-he)));
  } catch {
    sessionStorage.removeItem(W);
  }
}
let Kt = 0;
function ae() {
  return `jm_${Date.now()}_${++Kt}`;
}
function Bt(n, t, i) {
  const [a, o] = h(Ft), [d, p] = h(!1), [s, l] = h(G), [r, m] = h([]), u = $(null), y = $("");
  z(() => {
    const x = () => {
      const _ = G();
      l(_), m(Ht(_));
    };
    x(), window.addEventListener("popstate", x);
    const b = new MutationObserver(() => {
      G().page !== s.page && x();
    });
    return b.observe(document.querySelector("title") || document.head, { childList: !0, subtree: !0 }), () => {
      window.removeEventListener("popstate", x), b.disconnect();
    };
  }, [s.page]), z(() => {
    Ut(a);
  }, [a]);
  const f = S(async (x) => {
    if (!x.trim() || d || !t) return;
    const b = {
      id: ae(),
      role: "user",
      content: x.trim(),
      timestamp: (/* @__PURE__ */ new Date()).toISOString()
    }, _ = {
      id: ae(),
      role: "assistant",
      content: "",
      tool_calls: [],
      timestamp: (/* @__PURE__ */ new Date()).toISOString()
    };
    o((N) => [...N, b, _]), p(!0), y.current = "";
    const C = new AbortController();
    u.current = C;
    try {
      const v = {
        model: "gpt-4.1-mini",
        messages: [...a.slice(-18), b].map((L) => ({
          role: L.role,
          content: L.content
        })),
        stream: !0,
        context: {
          product: s.product,
          entity_type: s.entity_type,
          entity_id: s.entity_id,
          page_url: window.location.href
        }
      }, j = await fetch(`${n}/api/ai/chat`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "x-tenant-id": t,
          "x-ai-tier": "jarvis_free"
        },
        credentials: "include",
        body: JSON.stringify(v),
        signal: C.signal
      });
      if (!j.ok) {
        const L = await j.json().catch(() => ({ error: j.statusText }));
        throw new Error(L.error || L.message || `Error ${j.status}`);
      }
      if (!j.body) throw new Error("No response body");
      const k = j.body.getReader(), M = new TextDecoder();
      let T = "";
      const O = [];
      for (; ; ) {
        const { done: L, value: V } = await k.read();
        if (L) break;
        T += M.decode(V, { stream: !0 });
        const Z = T.split(`
`);
        T = Z.pop() || "";
        for (const ee of Z) {
          if (!ee.startsWith("data: ")) continue;
          const te = ee.slice(6).trim();
          if (te === "[DONE]") break;
          try {
            const I = JSON.parse(te);
            if (I.type === "content_delta" && I.text) {
              y.current += I.text;
              const H = y.current;
              o((D) => {
                const E = [...D], P = E[E.length - 1];
                return P && P.id === _.id && (E[E.length - 1] = { ...P, content: H }), E;
              });
            } else if (I.type === "tool_use_start" && I.name) {
              O.push({ name: I.name, status: "running" });
              const H = [...O];
              o((D) => {
                const E = [...D], P = E[E.length - 1];
                return P && P.id === _.id && (E[E.length - 1] = { ...P, tool_calls: H }), E;
              });
            } else if (I.type === "message_stop") {
              O.forEach((D) => {
                D.status === "running" && (D.status = "done");
              });
              const H = [...O];
              o((D) => {
                const E = [...D], P = E[E.length - 1];
                return P && P.id === _.id && (E[E.length - 1] = { ...P, tool_calls: H }), E;
              });
            } else if (I.type === "error")
              throw new Error(I.message || "Stream error");
          } catch (I) {
            if (I instanceof Error && I.message !== "Stream error") continue;
            throw I;
          }
        }
      }
    } catch (N) {
      if (!(N instanceof DOMException && N.name === "AbortError")) {
        const v = N instanceof Error ? N.message : "Something went wrong. Please try again.";
        o((j) => {
          const k = [...j], M = k[k.length - 1];
          return M && M.id === _.id && (k[k.length - 1] = {
            ...M,
            content: M.content || v,
            error: !0
          }), k;
        });
      }
    } finally {
      p(!1), u.current = null;
    }
  }, [n, t, a, d, s]), g = S(() => {
    u.current && (u.current.abort(), u.current = null);
  }, []), A = S(() => {
    o([]), sessionStorage.removeItem(W);
  }, []);
  return {
    messages: a,
    streaming: d,
    context: s,
    quickActions: r,
    sendMessage: f,
    stopStreaming: g,
    clearMessages: A
  };
}
function qt(n) {
  return n ? n.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/```(\w*)\n?([\s\S]*?)```/g, '<pre class="hb-jv-code-block"><code>$2</code></pre>').replace(/`([^`]+)`/g, '<code class="hb-jv-inline-code">$1</code>').replace(/\*\*(.+?)\*\*/g, "<strong>$1</strong>").replace(/\*(.+?)\*/g, "<em>$1</em>").replace(/\[([^\]]+)\]\(([^)]+)\)/g, '<a href="$2" target="_blank" rel="noopener noreferrer" class="hb-jv-link">$1</a>').replace(/^[•\-\*] (.+)$/gm, "<li>$1</li>").replace(/^\d+\. (.+)$/gm, "<li>$1</li>").replace(/(<li>[\s\S]*?<\/li>)/g, '<ul class="hb-jv-list">$1</ul>').replace(/<\/ul>\s*<ul class="hb-jv-list">/g, "").replace(/\n/g, "<br>") : "";
}
const Wt = {
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
function Vt({ tool: n }) {
  const t = Wt[n.name] || n.name.replace(/_/g, " "), i = n.status === "running", a = n.status === "error";
  return /* @__PURE__ */ c("div", { className: `hb-jv-tool-call${i ? " running" : ""}${a ? " error" : ""}`, children: [
    /* @__PURE__ */ e("div", { className: "hb-jv-tool-icon", children: i ? /* @__PURE__ */ e("span", { className: "hb-jv-tool-spinner" }) : a ? /* @__PURE__ */ e("span", { style: { color: "#f87171" }, children: "!" }) : /* @__PURE__ */ e("span", { style: { color: "#34d399" }, children: "✓" }) }),
    /* @__PURE__ */ c("span", { className: "hb-jv-tool-label", children: [
      t,
      i ? "…" : ""
    ] }),
    n.summary && /* @__PURE__ */ e("span", { className: "hb-jv-tool-summary", children: n.summary })
  ] });
}
function Gt({ message: n, isStreaming: t }) {
  if (n.role === "user")
    return /* @__PURE__ */ e("div", { className: "hb-jv-msg hb-jv-msg-user", children: /* @__PURE__ */ e("div", { className: "hb-jv-bubble hb-jv-bubble-user", children: n.content }) });
  const a = n.content.length > 0, o = n.tool_calls && n.tool_calls.length > 0;
  return /* @__PURE__ */ c("div", { className: "hb-jv-msg hb-jv-msg-assistant", children: [
    /* @__PURE__ */ e("div", { className: "hb-jv-avatar", children: /* @__PURE__ */ e(F, { size: 14, color: "#f97316" }) }),
    /* @__PURE__ */ c("div", { className: "hb-jv-bubble-wrap", children: [
      o && /* @__PURE__ */ e("div", { className: "hb-jv-tool-calls", children: n.tool_calls.map((d, p) => /* @__PURE__ */ e(Vt, { tool: d }, p)) }),
      a && /* @__PURE__ */ e(
        "div",
        {
          className: `hb-jv-bubble hb-jv-bubble-assistant${n.error ? " error" : ""}`,
          dangerouslySetInnerHTML: { __html: qt(n.content) }
        }
      ),
      !a && t && /* @__PURE__ */ e("div", { className: "hb-jv-bubble hb-jv-bubble-assistant", children: /* @__PURE__ */ c("span", { className: "hb-jv-typing", children: [
        /* @__PURE__ */ e("span", {}),
        /* @__PURE__ */ e("span", {}),
        /* @__PURE__ */ e("span", {})
      ] }) })
    ] })
  ] });
}
function Jt({ actions: n, onSelect: t, disabled: i }) {
  return n.length === 0 ? null : /* @__PURE__ */ e("div", { className: "hb-jv-quick-actions", children: n.map((a, o) => /* @__PURE__ */ e(
    "button",
    {
      className: "hb-jv-quick-chip",
      onClick: () => t(a.prompt),
      disabled: i,
      children: a.label
    },
    o
  )) });
}
function Yt({
  apiBase: n,
  tenantId: t,
  userId: i
}) {
  const [a, o] = h(!1), { messages: d, streaming: p, context: s, quickActions: l, sendMessage: r, stopStreaming: m, clearMessages: u } = Bt(n, t), [y, f] = h(""), g = $(null), A = $(null), [x] = h(!1);
  z(() => {
    const v = (j) => {
      (j.metaKey || j.ctrlKey) && j.key === "j" && (j.preventDefault(), o((k) => !k)), j.key === "Escape" && a && o(!1);
    };
    return document.addEventListener("keydown", v), () => document.removeEventListener("keydown", v);
  }, [a]), z(() => {
    g.current && g.current.scrollIntoView({ behavior: "smooth" });
  }, [d]), z(() => {
    a && A.current && setTimeout(() => {
      var v;
      return (v = A.current) == null ? void 0 : v.focus();
    }, 100);
  }, [a]);
  const b = S(() => {
    !y.trim() || p || (r(y.trim()), f(""));
  }, [y, p, r]), _ = S((v) => {
    r(v);
  }, [r]), C = S((v) => {
    v.key === "Enter" && !v.shiftKey && (v.preventDefault(), b());
  }, [b]), N = a ? se(
    /* @__PURE__ */ e("div", { className: "hb-jv-overlay", onClick: () => o(!1), children: /* @__PURE__ */ c(
      "div",
      {
        className: "hb-jv-panel",
        onClick: (v) => v.stopPropagation(),
        role: "dialog",
        "aria-modal": "true",
        "aria-label": "THEO AI Assistant",
        children: [
          /* @__PURE__ */ c("div", { className: "hb-jv-header", children: [
            /* @__PURE__ */ c("div", { className: "hb-jv-header-left", children: [
              /* @__PURE__ */ e(F, { size: 16, color: "#f97316" }),
              /* @__PURE__ */ e("span", { className: "hb-jv-header-title", children: "THEO" }),
              /* @__PURE__ */ e("span", { className: "hb-jv-model-badge", children: "GPT-4.1 mini" })
            ] }),
            /* @__PURE__ */ c("div", { className: "hb-jv-header-right", children: [
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
          /* @__PURE__ */ c("div", { className: "hb-jv-messages", children: [
            d.length === 0 ? /* @__PURE__ */ c("div", { className: "hb-jv-welcome", children: [
              /* @__PURE__ */ e("div", { className: "hb-jv-welcome-icon", children: /* @__PURE__ */ e(F, { size: 28, color: "#f97316" }) }),
              /* @__PURE__ */ e("div", { className: "hb-jv-welcome-title", children: "Hey, I'm THEO" }),
              /* @__PURE__ */ e("div", { className: "hb-jv-welcome-sub", children: "Your AI operations assistant for The One Stack. I can help you with tickets, clients, devices, and more." }),
              s.product && /* @__PURE__ */ c("div", { className: "hb-jv-welcome-context", children: [
                "Currently viewing: ",
                /* @__PURE__ */ e("strong", { children: s.product.toUpperCase() }),
                s.entity_type && ` — ${s.entity_type}`,
                s.entity_id && ` ${s.entity_id}`
              ] })
            ] }) : d.map((v, j) => /* @__PURE__ */ e(
              Gt,
              {
                message: v,
                isStreaming: p && j === d.length - 1 && v.role === "assistant"
              },
              v.id
            )),
            /* @__PURE__ */ e("div", { ref: g })
          ] }),
          d.length === 0 && /* @__PURE__ */ e(
            Jt,
            {
              actions: l,
              onSelect: _,
              disabled: p
            }
          ),
          /* @__PURE__ */ c("div", { className: "hb-jv-input-area", children: [
            /* @__PURE__ */ c("div", { className: "hb-jv-input-row", children: [
              /* @__PURE__ */ e(
                "textarea",
                {
                  ref: A,
                  className: "hb-jv-input",
                  placeholder: "Ask THEO anything...",
                  value: y,
                  onChange: (v) => f(v.target.value),
                  onKeyDown: C,
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
                  onClick: b,
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
  return /* @__PURE__ */ c(U, { children: [
    /* @__PURE__ */ e(
      "button",
      {
        className: `hb-jv-btn${a ? " active" : ""}${x ? " pulse" : ""}`,
        title: "THEO (⌘J)",
        "aria-label": "Open THEO",
        "aria-expanded": a,
        onClick: () => o((v) => !v),
        children: /* @__PURE__ */ e(F, { size: 18 })
      }
    ),
    N
  ] });
}
const Qt = "https://docs.theonestack.com/docs/changelog/", re = "hb_last_changelog_seen", oe = "2026-03-08";
function Xt({ className: n }) {
  const [t, i] = h(!1);
  z(() => {
    try {
      const o = localStorage.getItem(re);
      (!o || o < oe) && i(!0);
    } catch {
    }
  }, []);
  const a = () => {
    try {
      localStorage.setItem(re, oe);
    } catch {
    }
    i(!1), window.open(Qt, "_blank", "noopener,noreferrer");
  };
  return t ? /* @__PURE__ */ c(
    "button",
    {
      onClick: a,
      title: "What's New — View latest updates",
      "aria-label": "New updates available",
      className: n,
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
const Zt = `
@keyframes hb-pulse {
  0%, 100% { opacity: 1; }
  50% { opacity: 0.4; }
}
`;
function en() {
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
function on({
  currentProduct: n,
  apiBase: t,
  signalrEndpoint: i,
  session: a,
  onLogout: o,
  hubUrl: d = le,
  chatSlot: p,
  supportConfig: s,
  orgBranding: l
}) {
  const r = ye(a), m = $(!1);
  return z(() => {
    if (m.current || (m.current = !0, document.getElementById("hb-styles"))) return;
    const u = document.createElement("style");
    u.id = "hb-styles", u.textContent = fe + Zt, document.head.appendChild(u);
  }, []), z(() => {
    const u = document.body.style.paddingTop;
    return document.body.style.paddingTop = `${me}px`, () => {
      document.body.style.paddingTop = u;
    };
  }, []), r ? /* @__PURE__ */ e(
    tn,
    {
      currentProduct: n,
      apiBase: t,
      signalrEndpoint: i,
      session: r,
      onLogout: o,
      hubUrl: d,
      chatSlot: p,
      supportConfig: s,
      orgBranding: l
    }
  ) : /* @__PURE__ */ e("div", { className: "hb-root", role: "banner", children: /* @__PURE__ */ e("div", { className: "hb-bar hb-bar--guest", "aria-hidden": "true" }) });
}
function tn({
  currentProduct: n,
  apiBase: t,
  signalrEndpoint: i,
  session: a,
  onLogout: o,
  hubUrl: d = le,
  chatSlot: p,
  supportConfig: s,
  orgBranding: l
}) {
  var O;
  const { products: r } = ke(t, a.tenantId ?? null), { notifications: m, unreadCount: u, markAllRead: y, markRead: f, dismiss: g, muted: A, muteUntil: x, unmute: b, toastQueue: _, dismissToast: C } = we(
    t,
    i,
    a.tenantId ?? null,
    a.userId ?? null
  ), [N, v] = h(!1), [j, k] = h(!1), [M, T] = h(!1);
  return /* @__PURE__ */ c("div", { className: "hb-root", role: "banner", children: [
    /* @__PURE__ */ e(it, { toasts: _, onDismiss: C }),
    /* @__PURE__ */ c(
      "div",
      {
        className: "hb-bar",
        style: (O = l == null ? void 0 : l.colors) != null && O.header_bg ? {
          background: l.colors.header_bg,
          color: l.colors.header_text || "#f1f5f9"
        } : void 0,
        children: [
          /* @__PURE__ */ e(
            Qe,
            {
              currentProduct: n,
              products: r,
              open: N,
              onToggle: () => {
                k(!1), T(!1), v((L) => !L);
              },
              onClose: () => v(!1),
              hubUrl: d
            }
          ),
          /* @__PURE__ */ c("a", { href: d, className: "hb-logo", "aria-label": l != null && l.company_name ? `${l.company_name} — Home` : "The One Stack — Home", children: [
            l != null && l.logo_icon_url || l != null && l.logo_url ? /* @__PURE__ */ e(
              "img",
              {
                src: l.logo_icon_url || l.logo_url,
                alt: l.company_name || "Logo",
                style: { height: 22, width: "auto", objectFit: "contain" }
              }
            ) : /* @__PURE__ */ e(en, {}),
            /* @__PURE__ */ e("span", { className: "hb-logo-name", children: (l == null ? void 0 : l.company_name) || "The One" })
          ] }),
          /* @__PURE__ */ e("div", { className: "hb-divider", "aria-hidden": "true" }),
          (() => {
            const L = r.find((V) => V.id === n);
            return L ? /* @__PURE__ */ e("span", { style: { fontSize: 14, fontWeight: 500, color: "#f1f5f9", whiteSpace: "nowrap" }, children: L.name }) : null;
          })(),
          /* @__PURE__ */ e("div", { style: { flex: 1 } }),
          /* @__PURE__ */ e(Ze, { apiBase: t, tenantId: (a == null ? void 0 : a.tenantId) ?? null }),
          /* @__PURE__ */ e("div", { style: { flex: 1 } }),
          s ? /* @__PURE__ */ e(
            Ot,
            {
              config: s,
              currentProduct: n,
              user: {
                email: (a == null ? void 0 : a.email) ?? "",
                name: a ? `${a.firstName ?? ""} ${a.lastName ?? ""}`.trim() || a.email : ""
              }
            }
          ) : p ?? null,
          /* @__PURE__ */ e(
            Yt,
            {
              apiBase: t,
              tenantId: a.tenantId ?? null,
              userId: a.userId ?? null,
              currentProduct: n
            }
          ),
          /* @__PURE__ */ e(Xt, {}),
          /* @__PURE__ */ e(
            nt,
            {
              notifications: m,
              unreadCount: u,
              open: j,
              onToggle: () => {
                v(!1), T(!1), k((L) => !L);
              },
              onClose: () => k(!1),
              onMarkAllRead: y,
              onMarkRead: f,
              onDismiss: g,
              muted: A,
              onMute: x,
              onUnmute: b,
              hubUrl: d
            }
          ),
          /* @__PURE__ */ e(
            at,
            {
              session: a,
              open: M,
              onToggle: () => {
                v(!1), k(!1), T((L) => !L);
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
  q as ALL_PRODUCTS,
  me as HUB_BAR_HEIGHT,
  le as HUB_URL,
  on as HubBar,
  Yt as JarvisButton,
  nt as NotificationBell,
  it as NotificationToast,
  Qe as ProductSwitcher,
  Q as SEVERITY_COLORS,
  Ot as SupportButton,
  Ze as UnifiedSearch,
  at as UserMenu,
  ye as useHubSession,
  Bt as useJarvis,
  we as useNotifications,
  ke as useProducts,
  Xe as useSearch
};
