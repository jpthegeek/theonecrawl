import { clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';
import { cva } from 'class-variance-authority';
export { cva, cx } from 'class-variance-authority';
import { jsx, jsxs, Fragment } from 'react/jsx-runtime';
import React16, { createContext, useState, useRef, useEffect, useContext, useCallback, useMemo } from 'react';
import { ChevronDown, ChevronUp, Check, Circle, X, ChevronRight, Search, ChevronsUpDown, User, Settings, LogOut, ChevronLeft, Menu, HelpCircle, Loader2, TrendingUp, TrendingDown, Minus, MoreHorizontal, CalendarIcon, EyeOff, Eye, Shield, ArrowLeft } from 'lucide-react';
import * as DropdownMenuPrimitive3 from '@radix-ui/react-dropdown-menu';
import { useLocation, Link } from 'react-router-dom';
import { Slot } from '@radix-ui/react-slot';
import * as SelectPrimitive from '@radix-ui/react-select';
import * as CheckboxPrimitive from '@radix-ui/react-checkbox';
import * as SwitchPrimitive from '@radix-ui/react-switch';
import * as RadioGroupPrimitive from '@radix-ui/react-radio-group';
import * as LabelPrimitive from '@radix-ui/react-label';
import * as SeparatorPrimitive from '@radix-ui/react-separator';
import * as ProgressPrimitive from '@radix-ui/react-progress';
import { Toaster as Toaster$1 } from 'sonner';
export { toast } from 'sonner';
import * as DialogPrimitive from '@radix-ui/react-dialog';
import * as AlertDialogPrimitive from '@radix-ui/react-alert-dialog';
import * as PopoverPrimitive from '@radix-ui/react-popover';
import * as TooltipPrimitive from '@radix-ui/react-tooltip';
import { Command as Command$1 } from 'cmdk';
import * as AvatarPrimitive from '@radix-ui/react-avatar';
import * as TabsPrimitive from '@radix-ui/react-tabs';
import * as ScrollAreaPrimitive from '@radix-ui/react-scroll-area';
import * as CollapsiblePrimitive from '@radix-ui/react-collapsible';
import { motion, AnimatePresence } from 'framer-motion';

// src/theme/accent.ts
function setAccent(hex) {
  if (typeof document === "undefined") return;
  const rgb = hexToRgb(hex);
  if (!rgb) {
    console.warn(`[@theonefamily/ui] setAccent: invalid hex color "${hex}"`);
    return;
  }
  const { r, g, b } = rgb;
  const foreground = getLuminance(r, g, b) > 0.4 ? "#0a0a0b" : "#ffffff";
  const root = document.documentElement;
  root.style.setProperty("--accent", hex);
  root.style.setProperty("--accent-rgb", `${r}, ${g}, ${b}`);
  root.style.setProperty("--accent-foreground", foreground);
  root.style.setProperty("--accent-muted", `rgba(${r}, ${g}, ${b}, 0.1)`);
  root.style.setProperty("--accent-border", `rgba(${r}, ${g}, ${b}, 0.2)`);
  root.style.setProperty("--primary", hex);
  root.style.setProperty("--primary-foreground", foreground);
  root.style.setProperty("--ring", hex);
  root.style.setProperty("--glow-sm", `0 0 10px rgba(${r}, ${g}, ${b}, 0.15)`);
  root.style.setProperty("--glow-md", `0 0 20px rgba(${r}, ${g}, ${b}, 0.2)`);
  root.style.setProperty("--glow-lg", `0 0 40px rgba(${r}, ${g}, ${b}, 0.25)`);
}
function hexToRgb(hex) {
  const clean = hex.replace("#", "");
  if (clean.length !== 6) return null;
  const r = parseInt(clean.slice(0, 2), 16);
  const g = parseInt(clean.slice(2, 4), 16);
  const b = parseInt(clean.slice(4, 6), 16);
  if (isNaN(r) || isNaN(g) || isNaN(b)) return null;
  return { r, g, b };
}
function getLuminance(r, g, b) {
  const [rs, gs, bs] = [r, g, b].map((c) => {
    const s = c / 255;
    return s <= 0.03928 ? s / 12.92 : Math.pow((s + 0.055) / 1.055, 2.4);
  });
  return 0.2126 * (rs ?? 0) + 0.7152 * (gs ?? 0) + 0.0722 * (bs ?? 0);
}

// src/theme/tailwind-preset.ts
var uiPreset = {
  darkMode: [],
  // dark is the default — no class needed
  theme: {
    extend: {
      colors: {
        background: "var(--background)",
        foreground: "var(--foreground)",
        card: {
          DEFAULT: "var(--card)",
          foreground: "var(--foreground)"
        },
        popover: {
          DEFAULT: "var(--popover)",
          foreground: "var(--foreground)"
        },
        primary: {
          DEFAULT: "var(--primary)",
          foreground: "var(--primary-foreground)"
        },
        accent: {
          DEFAULT: "var(--accent)",
          foreground: "var(--accent-foreground)",
          muted: "var(--accent-muted)",
          border: "var(--accent-border)"
        },
        muted: {
          DEFAULT: "var(--surface-2)",
          foreground: "var(--muted-foreground)"
        },
        destructive: {
          DEFAULT: "var(--destructive)",
          foreground: "var(--destructive-foreground)"
        },
        success: {
          DEFAULT: "var(--success)",
          foreground: "var(--success-foreground)"
        },
        warning: {
          DEFAULT: "var(--warning)",
          foreground: "var(--warning-foreground)"
        },
        info: {
          DEFAULT: "var(--info)",
          foreground: "var(--info-foreground)"
        },
        border: "var(--border)",
        input: "var(--border)",
        ring: "var(--ring)",
        surface: {
          0: "var(--surface-0)",
          1: "var(--surface-1)",
          2: "var(--surface-2)",
          3: "var(--surface-3)",
          4: "var(--surface-4)"
        },
        brand: {
          orange: "var(--brand-orange)"
        }
      },
      fontFamily: {
        sans: ["var(--font-sans)"],
        mono: ["var(--font-mono)"]
      },
      borderRadius: {
        sm: "var(--radius-sm)",
        md: "var(--radius-md)",
        lg: "var(--radius-lg)",
        xl: "var(--radius-xl)",
        DEFAULT: "var(--radius)"
      },
      boxShadow: {
        sm: "var(--shadow-sm)",
        md: "var(--shadow-md)",
        lg: "var(--shadow-lg)",
        "glow-sm": "var(--glow-sm)",
        "glow-md": "var(--glow-md)",
        "glow-lg": "var(--glow-lg)"
      },
      transitionDuration: {
        fast: "var(--duration-fast)",
        normal: "var(--duration-normal)",
        slow: "var(--duration-slow)"
      },
      animation: {
        float: "float 6s ease-in-out infinite",
        "float-slow": "float-slow 10s ease-in-out infinite"
      },
      keyframes: {
        float: {
          "0%, 100%": { transform: "translateY(0px)" },
          "50%": { transform: "translateY(-20px)" }
        },
        "float-slow": {
          "0%, 100%": { transform: "translateY(0px) translateX(0px)" },
          "33%": { transform: "translateY(-15px) translateX(10px)" },
          "66%": { transform: "translateY(10px) translateX(-8px)" }
        }
      }
    }
  },
  plugins: []
};
function cn(...inputs) {
  return twMerge(clsx(inputs));
}
function BirdSymbol({ size = 18, className, style }) {
  return /* @__PURE__ */ jsx(
    "svg",
    {
      width: size,
      height: size,
      viewBox: "0 0 1200 1200",
      xmlns: "http://www.w3.org/2000/svg",
      className,
      style: { color: "#f97316", flexShrink: 0, ...style },
      fill: "currentColor",
      "aria-hidden": "true",
      children: /* @__PURE__ */ jsx("g", { transform: "scale(13.5) translate(-5.5555488798353405, -5.55552503797743)", children: /* @__PURE__ */ jsx("g", { transform: "translate(0,-952.36218)", children: /* @__PURE__ */ jsx("path", { d: "m 60.7828,964.36215 27.1809,0.8834 -27.1809,25.9958 z m -1.9745,1.4513 0,26.7845 -25.2681,0 c 8.6166,-8.7334 16.8796,-17.8103 25.2681,-26.7845 z m 27.7053,3.628 3.4864,1.1989 -12.5877,7.4768 z m -68.1835,2.9656 5.5226,0 12.8654,14.0705 -5.9854,6.1204 -12.4026,0 c 9e-4,-6.7347 0,-13.4597 0,-20.1909 z m -1.9746,1.2304 0,5.8364 -6.3555,0 z m 3.363,20.9796 38.627,0 -10.7675,29.43465 z m 39.0898,4.54286 0,41.20229 -12.5878,-6.8775 c 4.1972,-11.443 8.3886,-22.879 12.5878,-34.32479 z" }) }) })
    }
  );
}
function ProductLogo({ name, size = 18, className, textClassName }) {
  return /* @__PURE__ */ jsxs("div", { className: `flex items-center gap-2 ${className ?? ""}`, children: [
    /* @__PURE__ */ jsx(BirdSymbol, { size }),
    /* @__PURE__ */ jsx(
      "span",
      {
        className: `font-semibold text-sm text-foreground tracking-tight ${textClassName ?? ""}`,
        style: { color: "var(--foreground)" },
        children: name
      }
    )
  ] });
}
function TheOneBadge({ className }) {
  return /* @__PURE__ */ jsxs(
    "div",
    {
      className: `inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-medium ${className ?? ""}`,
      style: {
        background: "var(--glass-bg)",
        border: "1px solid var(--glass-border)",
        color: "var(--muted-foreground)"
      },
      children: [
        /* @__PURE__ */ jsx(BirdSymbol, { size: 12 }),
        /* @__PURE__ */ jsx("span", { children: "Powered by The One" })
      ]
    }
  );
}
function FaviconHead({
  productName,
  accentColor: _accentColor,
  basePath = ""
}) {
  return /* @__PURE__ */ jsxs(Fragment, { children: [
    /* @__PURE__ */ jsx("link", { rel: "icon", type: "image/svg+xml", href: `${basePath}/favicon.svg` }),
    /* @__PURE__ */ jsx("link", { rel: "icon", type: "image/x-icon", href: `${basePath}/favicon.ico` }),
    /* @__PURE__ */ jsx(
      "link",
      {
        rel: "icon",
        type: "image/png",
        sizes: "32x32",
        href: `${basePath}/favicon-32x32.png`
      }
    ),
    /* @__PURE__ */ jsx(
      "link",
      {
        rel: "icon",
        type: "image/png",
        sizes: "16x16",
        href: `${basePath}/favicon-16x16.png`
      }
    ),
    /* @__PURE__ */ jsx(
      "link",
      {
        rel: "apple-touch-icon",
        sizes: "180x180",
        href: `${basePath}/apple-touch-icon.png`
      }
    ),
    /* @__PURE__ */ jsx("link", { rel: "manifest", href: `${basePath}/site.webmanifest` }),
    /* @__PURE__ */ jsx("meta", { name: "theme-color", content: "#09090b" }),
    productName && /* @__PURE__ */ jsx("title", { children: productName })
  ] });
}
function TenantSwitcher({ tenant, tenants = [], onTenantSwitch, collapsed = false }) {
  if (!tenants.length || !onTenantSwitch) {
    if (collapsed) return null;
    return /* @__PURE__ */ jsx("div", { className: "px-3 py-2", children: /* @__PURE__ */ jsx("p", { className: "truncate text-xs font-medium", style: { color: "var(--muted-foreground)" }, children: tenant.name }) });
  }
  return /* @__PURE__ */ jsxs(DropdownMenuPrimitive3.Root, { children: [
    /* @__PURE__ */ jsx(DropdownMenuPrimitive3.Trigger, { asChild: true, children: /* @__PURE__ */ jsxs(
      "button",
      {
        type: "button",
        className: "flex w-full items-center justify-between gap-2 rounded-md px-3 py-2 text-sm outline-none transition-all",
        style: { border: "1px solid var(--glass-border)", background: "var(--glass-bg)" },
        children: [
          !collapsed && /* @__PURE__ */ jsx("span", { className: "truncate font-medium", style: { color: "var(--foreground)" }, children: tenant.name }),
          /* @__PURE__ */ jsx(ChevronsUpDown, { size: 14, style: { color: "var(--muted-foreground)", flexShrink: 0 } })
        ]
      }
    ) }),
    /* @__PURE__ */ jsx(DropdownMenuPrimitive3.Portal, { children: /* @__PURE__ */ jsxs(
      DropdownMenuPrimitive3.Content,
      {
        align: "start",
        sideOffset: 8,
        className: "z-50 min-w-48 rounded-lg p-1 shadow-lg outline-none",
        style: { background: "var(--popover)", border: "1px solid var(--glass-border)", backdropFilter: "blur(16px)" },
        children: [
          /* @__PURE__ */ jsx("div", { className: "px-2 py-1.5 mb-1", children: /* @__PURE__ */ jsx("p", { className: "text-xs font-semibold uppercase tracking-wider", style: { color: "var(--muted-foreground)" }, children: "Switch tenant" }) }),
          tenants.map((t) => /* @__PURE__ */ jsxs(
            DropdownMenuPrimitive3.Item,
            {
              onSelect: () => onTenantSwitch(t.slug),
              className: "flex cursor-pointer items-center gap-2 rounded-md px-3 py-2 text-sm outline-none",
              style: { color: "var(--foreground)" },
              children: [
                /* @__PURE__ */ jsx(
                  Check,
                  {
                    size: 14,
                    className: t.slug === tenant.slug ? "opacity-100" : "opacity-0",
                    style: { color: "var(--accent)" }
                  }
                ),
                t.name
              ]
            },
            t.slug
          ))
        ]
      }
    ) })
  ] });
}
function NavItem({ item, collapsed = false, depth = 0 }) {
  const location = useLocation();
  const isActive = location.pathname === item.href || item.href !== "/" && location.pathname.startsWith(item.href);
  const Icon2 = item.icon;
  return /* @__PURE__ */ jsxs(
    Link,
    {
      to: item.href,
      title: collapsed ? item.label : void 0,
      className: cn(
        "group relative flex items-center gap-3 rounded-md px-3 py-2 text-sm font-medium",
        "transition-all duration-150",
        depth > 0 && "ml-4 text-xs",
        isActive ? "text-[color:var(--accent)]" : "text-[color:var(--muted-foreground)] hover:text-[color:var(--foreground)]",
        collapsed && "justify-center px-2"
      ),
      style: isActive ? {
        background: "var(--accent-muted)",
        border: "1px solid var(--accent-border)"
      } : {
        border: "1px solid transparent"
      },
      children: [
        /* @__PURE__ */ jsx(
          Icon2,
          {
            size: collapsed ? 18 : 16,
            className: cn(
              "shrink-0 transition-colors",
              isActive ? "text-[color:var(--accent)]" : "text-[color:var(--muted-foreground)] group-hover:text-[color:var(--foreground)]"
            )
          }
        ),
        !collapsed && /* @__PURE__ */ jsxs(Fragment, { children: [
          /* @__PURE__ */ jsx("span", { className: "flex-1 truncate", children: item.label }),
          item.badge !== void 0 && /* @__PURE__ */ jsx(
            "span",
            {
              className: "ml-auto flex h-5 min-w-5 items-center justify-center rounded-full px-1 text-xs font-medium",
              style: {
                background: "var(--accent-muted)",
                color: "var(--accent)",
                border: "1px solid var(--accent-border)"
              },
              children: item.badge
            }
          )
        ] }),
        collapsed && item.badge !== void 0 && /* @__PURE__ */ jsx(
          "span",
          {
            className: "absolute right-1 top-1 flex h-4 min-w-4 items-center justify-center rounded-full px-0.5 text-[10px] font-medium",
            style: { background: "var(--accent)", color: "var(--accent-foreground)" },
            children: item.badge
          }
        )
      ]
    }
  );
}
function NavGroup({ section, collapsed = false }) {
  const [open, setOpen] = useState(true);
  return /* @__PURE__ */ jsxs("div", { className: "space-y-0.5", children: [
    section.label && !collapsed && /* @__PURE__ */ jsxs(
      "button",
      {
        type: "button",
        onClick: () => setOpen((v) => !v),
        className: cn(
          "flex w-full items-center justify-between px-3 py-1.5",
          "text-xs font-semibold uppercase tracking-wider",
          "text-[color:var(--muted-foreground)] hover:text-[color:var(--foreground)]",
          "transition-colors duration-150"
        ),
        children: [
          /* @__PURE__ */ jsx("span", { children: section.label }),
          /* @__PURE__ */ jsx(
            ChevronDown,
            {
              size: 12,
              className: cn("transition-transform duration-150", open ? "rotate-0" : "-rotate-90")
            }
          )
        ]
      }
    ),
    (open || collapsed) && /* @__PURE__ */ jsx("div", { className: "space-y-0.5", children: section.items.map((item) => /* @__PURE__ */ jsx(NavItem, { item, collapsed }, item.id)) })
  ] });
}
function UserMenu({ user, collapsed = false, onSignOut, onProfileClick }) {
  const initials = user.name.split(" ").map((n) => n[0]).join("").toUpperCase().slice(0, 2);
  return /* @__PURE__ */ jsxs(DropdownMenuPrimitive3.Root, { children: [
    /* @__PURE__ */ jsx(DropdownMenuPrimitive3.Trigger, { asChild: true, children: /* @__PURE__ */ jsxs(
      "button",
      {
        type: "button",
        className: "group flex w-full items-center gap-3 rounded-md px-3 py-2 text-sm transition-all duration-150 outline-none",
        style: {
          border: "1px solid transparent"
        },
        onMouseEnter: (e) => {
          e.currentTarget.style.background = "var(--glass-bg)";
          e.currentTarget.style.borderColor = "var(--glass-border)";
        },
        onMouseLeave: (e) => {
          e.currentTarget.style.background = "";
          e.currentTarget.style.borderColor = "transparent";
        },
        children: [
          /* @__PURE__ */ jsx(
            "div",
            {
              className: "flex h-8 w-8 shrink-0 items-center justify-center rounded-full text-xs font-semibold",
              style: { background: "var(--accent-muted)", color: "var(--accent)", border: "1px solid var(--accent-border)" },
              children: user.avatar ? /* @__PURE__ */ jsx("img", { src: user.avatar, alt: user.name, className: "h-8 w-8 rounded-full object-cover" }) : initials
            }
          ),
          !collapsed && /* @__PURE__ */ jsxs("div", { className: "flex flex-1 flex-col items-start overflow-hidden", children: [
            /* @__PURE__ */ jsx("span", { className: "truncate text-sm font-medium", style: { color: "var(--foreground)" }, children: user.name }),
            user.role && /* @__PURE__ */ jsx("span", { className: "truncate text-xs", style: { color: "var(--muted-foreground)" }, children: user.role })
          ] })
        ]
      }
    ) }),
    /* @__PURE__ */ jsx(DropdownMenuPrimitive3.Portal, { children: /* @__PURE__ */ jsxs(
      DropdownMenuPrimitive3.Content,
      {
        align: "end",
        sideOffset: 8,
        className: "z-50 min-w-48 rounded-lg p-1 shadow-lg outline-none",
        style: {
          background: "var(--popover)",
          border: "1px solid var(--glass-border)",
          backdropFilter: "blur(16px)"
        },
        children: [
          /* @__PURE__ */ jsxs("div", { className: "px-3 py-2 mb-1", style: { borderBottom: "1px solid var(--glass-border)" }, children: [
            /* @__PURE__ */ jsx("p", { className: "text-sm font-medium", style: { color: "var(--foreground)" }, children: user.name }),
            /* @__PURE__ */ jsx("p", { className: "text-xs", style: { color: "var(--muted-foreground)" }, children: user.email })
          ] }),
          onProfileClick && /* @__PURE__ */ jsxs(
            DropdownMenuPrimitive3.Item,
            {
              onSelect: onProfileClick,
              className: "flex cursor-pointer items-center gap-2 rounded-md px-3 py-2 text-sm outline-none",
              style: { color: "var(--foreground)" },
              onFocus: (e) => {
                e.currentTarget.style.background = "var(--glass-bg)";
              },
              onBlur: (e) => {
                e.currentTarget.style.background = "";
              },
              children: [
                /* @__PURE__ */ jsx(User, { size: 14 }),
                "Profile"
              ]
            }
          ),
          /* @__PURE__ */ jsxs(
            DropdownMenuPrimitive3.Item,
            {
              className: "flex cursor-pointer items-center gap-2 rounded-md px-3 py-2 text-sm outline-none",
              style: { color: "var(--foreground)" },
              children: [
                /* @__PURE__ */ jsx(Settings, { size: 14 }),
                "Settings"
              ]
            }
          ),
          /* @__PURE__ */ jsx(
            DropdownMenuPrimitive3.Separator,
            {
              className: "my-1 h-px",
              style: { background: "var(--glass-border)" }
            }
          ),
          /* @__PURE__ */ jsxs(
            DropdownMenuPrimitive3.Item,
            {
              onSelect: onSignOut,
              className: "flex cursor-pointer items-center gap-2 rounded-md px-3 py-2 text-sm outline-none",
              style: { color: "var(--destructive)" },
              children: [
                /* @__PURE__ */ jsx(LogOut, { size: 14 }),
                "Sign out"
              ]
            }
          )
        ]
      }
    ) })
  ] });
}
var STORAGE_KEY = "theonefamily:sidebar:collapsed";
function Sidebar({
  product,
  navigation,
  user,
  tenant,
  tenants,
  onSignOut,
  onProfileClick,
  onTenantSwitch,
  collapsed,
  onCollapsedChange
}) {
  const toggle = () => {
    const next = !collapsed;
    onCollapsedChange(next);
    try {
      localStorage.setItem(STORAGE_KEY, String(next));
    } catch {
    }
  };
  return /* @__PURE__ */ jsxs(
    "aside",
    {
      className: cn(
        "relative flex h-full flex-col transition-all duration-200",
        collapsed ? "w-[60px]" : "w-[240px]"
      ),
      style: {
        background: "var(--surface-1)",
        borderRight: "1px solid var(--border-subtle)",
        backdropFilter: "blur(var(--glass-blur))"
      },
      children: [
        /* @__PURE__ */ jsx(
          "div",
          {
            className: "flex h-12 items-center px-3 shrink-0",
            style: { borderBottom: "1px solid var(--border-subtle)" },
            children: collapsed ? /* @__PURE__ */ jsx("div", { className: "flex w-full justify-center", children: /* @__PURE__ */ jsx(BirdSymbol, { size: 18 }) }) : /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-2 overflow-hidden", children: [
              /* @__PURE__ */ jsx(BirdSymbol, { size: 18 }),
              /* @__PURE__ */ jsx(
                "span",
                {
                  className: "truncate text-sm font-semibold tracking-tight",
                  style: { color: "var(--foreground)" },
                  children: product.name
                }
              )
            ] })
          }
        ),
        tenant && /* @__PURE__ */ jsx("div", { className: "px-2 py-2 shrink-0", style: { borderBottom: "1px solid var(--border-subtle)" }, children: /* @__PURE__ */ jsx(
          TenantSwitcher,
          {
            tenant,
            tenants,
            onTenantSwitch,
            collapsed
          }
        ) }),
        /* @__PURE__ */ jsx("nav", { className: "flex-1 overflow-y-auto px-2 py-3 space-y-4", children: navigation.map((section, i) => /* @__PURE__ */ jsx(NavGroup, { section, collapsed }, i)) }),
        /* @__PURE__ */ jsxs("div", { className: "shrink-0", style: { borderTop: "1px solid var(--border-subtle)" }, children: [
          /* @__PURE__ */ jsx("div", { className: "flex justify-end px-2 py-1", children: /* @__PURE__ */ jsx(
            "button",
            {
              type: "button",
              onClick: toggle,
              className: "flex h-7 w-7 items-center justify-center rounded-md transition-colors",
              style: { color: "var(--muted-foreground)" },
              "aria-label": collapsed ? "Expand sidebar" : "Collapse sidebar",
              children: collapsed ? /* @__PURE__ */ jsx(ChevronRight, { size: 14 }) : /* @__PURE__ */ jsx(ChevronLeft, { size: 14 })
            }
          ) }),
          /* @__PURE__ */ jsx("div", { className: "px-2 pb-3", children: /* @__PURE__ */ jsx(
            UserMenu,
            {
              user,
              collapsed,
              onSignOut,
              onProfileClick
            }
          ) })
        ] })
      ]
    }
  );
}
function TopBar({ onMobileMenuToggle, searchSlot, notificationSlot, title }) {
  return /* @__PURE__ */ jsxs(
    "header",
    {
      className: "sticky top-0 z-40 flex h-12 items-center gap-4 px-4",
      style: {
        borderBottom: "1px solid var(--border-subtle)",
        background: "rgba(9, 9, 11, 0.8)",
        backdropFilter: "blur(20px)"
      },
      children: [
        /* @__PURE__ */ jsx(
          "button",
          {
            type: "button",
            onClick: onMobileMenuToggle,
            className: "flex h-8 w-8 items-center justify-center rounded-md transition-colors md:hidden",
            style: { color: "var(--muted-foreground)" },
            "aria-label": "Open menu",
            children: /* @__PURE__ */ jsx(Menu, { size: 18 })
          }
        ),
        title && /* @__PURE__ */ jsx("span", { className: "text-sm font-semibold md:hidden", style: { color: "var(--foreground)" }, children: title }),
        searchSlot && /* @__PURE__ */ jsx("div", { className: "flex-1 max-w-md", children: searchSlot }),
        !searchSlot && /* @__PURE__ */ jsx("div", { className: "flex-1" }),
        /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-2", children: [
          notificationSlot,
          /* @__PURE__ */ jsx(
            "button",
            {
              type: "button",
              className: "flex h-8 w-8 items-center justify-center rounded-md transition-colors",
              style: { color: "var(--muted-foreground)" },
              "aria-label": "Help",
              children: /* @__PURE__ */ jsx(HelpCircle, { size: 16 })
            }
          )
        ] })
      ]
    }
  );
}
function MobileNav({
  open,
  onClose,
  product,
  navigation,
  user,
  onSignOut,
  onProfileClick
}) {
  if (!open) return null;
  return /* @__PURE__ */ jsxs(Fragment, { children: [
    /* @__PURE__ */ jsx(
      "div",
      {
        className: "fixed inset-0 z-50",
        style: { background: "rgba(0, 0, 0, 0.6)", backdropFilter: "blur(4px)" },
        onClick: onClose,
        "aria-hidden": "true"
      }
    ),
    /* @__PURE__ */ jsxs(
      "div",
      {
        className: "fixed inset-y-0 left-0 z-50 flex w-[240px] flex-col",
        style: {
          background: "var(--surface-1)",
          borderRight: "1px solid var(--border-subtle)",
          backdropFilter: "blur(var(--glass-blur))"
        },
        children: [
          /* @__PURE__ */ jsxs(
            "div",
            {
              className: "flex h-12 items-center justify-between px-3 shrink-0",
              style: { borderBottom: "1px solid var(--border-subtle)" },
              children: [
                /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-2", children: [
                  /* @__PURE__ */ jsx(BirdSymbol, { size: 18 }),
                  /* @__PURE__ */ jsx("span", { className: "text-sm font-semibold tracking-tight", style: { color: "var(--foreground)" }, children: product.name })
                ] }),
                /* @__PURE__ */ jsx(
                  "button",
                  {
                    type: "button",
                    onClick: onClose,
                    className: "flex h-8 w-8 items-center justify-center rounded-md",
                    style: { color: "var(--muted-foreground)" },
                    "aria-label": "Close menu",
                    children: /* @__PURE__ */ jsx(X, { size: 16 })
                  }
                )
              ]
            }
          ),
          /* @__PURE__ */ jsx("nav", { className: "flex-1 overflow-y-auto px-2 py-3 space-y-4", children: navigation.map((section, i) => /* @__PURE__ */ jsx(NavGroup, { section, collapsed: false }, i)) }),
          /* @__PURE__ */ jsx("div", { className: "shrink-0 px-2 pb-3", style: { borderTop: "1px solid var(--border-subtle)", paddingTop: "0.75rem" }, children: /* @__PURE__ */ jsx(
            UserMenu,
            {
              user,
              collapsed: false,
              onSignOut,
              onProfileClick
            }
          ) })
        ]
      }
    )
  ] });
}
function getInitialCollapsed() {
  try {
    return localStorage.getItem(STORAGE_KEY) === "true";
  } catch {
    return false;
  }
}
function AppShell({
  product,
  navigation,
  user,
  tenant,
  tenants,
  hubBarEnabled = true,
  searchSlot,
  notificationSlot,
  onSignOut,
  onProfileClick,
  onTenantSwitch,
  children
}) {
  const [sidebarCollapsed, setSidebarCollapsed] = useState(getInitialCollapsed);
  const [mobileNavOpen, setMobileNavOpen] = useState(false);
  useEffect(() => {
    setAccent(product.accent);
  }, [product.accent]);
  useEffect(() => {
    const mq = window.matchMedia("(min-width: 768px)");
    const handler = (e) => {
      if (e.matches) setMobileNavOpen(false);
    };
    mq.addEventListener("change", handler);
    return () => mq.removeEventListener("change", handler);
  }, []);
  return /* @__PURE__ */ jsxs(
    "div",
    {
      className: "flex w-full overflow-hidden",
      style: {
        background: "var(--background)",
        color: "var(--foreground)",
        ...hubBarEnabled ? { marginTop: "48px", height: "calc(100vh - 48px)" } : { height: "100vh" }
      },
      children: [
        /* @__PURE__ */ jsx("div", { className: "hidden md:flex h-full shrink-0", children: /* @__PURE__ */ jsx(
          Sidebar,
          {
            product,
            navigation,
            user,
            tenant,
            tenants,
            onSignOut,
            onProfileClick,
            onTenantSwitch,
            collapsed: sidebarCollapsed,
            onCollapsedChange: setSidebarCollapsed
          }
        ) }),
        /* @__PURE__ */ jsx(
          MobileNav,
          {
            open: mobileNavOpen,
            onClose: () => setMobileNavOpen(false),
            product,
            navigation,
            user,
            onSignOut,
            onProfileClick
          }
        ),
        /* @__PURE__ */ jsxs("div", { className: "flex flex-1 flex-col overflow-hidden", children: [
          /* @__PURE__ */ jsx(
            TopBar,
            {
              onMobileMenuToggle: () => setMobileNavOpen(true),
              searchSlot,
              notificationSlot
            }
          ),
          /* @__PURE__ */ jsx("main", { className: "flex-1 overflow-y-auto", children: /* @__PURE__ */ jsx("div", { className: "mx-auto max-w-7xl p-6", children }) })
        ] })
      ]
    }
  );
}
var buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 rounded-md text-sm font-medium transition-all duration-150 focus-visible:outline-none focus-visible:ring-2 disabled:pointer-events-none disabled:opacity-50 select-none",
  {
    variants: {
      variant: {
        default: "bg-[color:var(--accent)] text-[color:var(--accent-foreground)] hover:opacity-90 active:opacity-80",
        secondary: "bg-[color:var(--surface-3)] text-[color:var(--foreground)] border border-[color:var(--border)] hover:bg-[color:var(--surface-4)]",
        outline: "border border-[color:var(--border)] bg-transparent text-[color:var(--foreground)] hover:bg-[color:var(--glass-bg)] hover:border-[color:var(--border-hover)]",
        ghost: "bg-transparent text-[color:var(--foreground)] hover:bg-[color:var(--glass-bg)]",
        destructive: "bg-[color:var(--destructive)] text-[color:var(--destructive-foreground)] hover:opacity-90",
        link: "bg-transparent text-[color:var(--accent)] underline-offset-4 hover:underline p-0 h-auto"
      },
      size: {
        sm: "h-8 px-3 text-xs rounded-md",
        default: "h-9 px-4",
        lg: "h-10 px-6 text-base",
        icon: "h-9 w-9 p-0"
      }
    },
    defaultVariants: {
      variant: "default",
      size: "default"
    }
  }
);
var Button = React16.forwardRef(
  ({ className, variant, size, asChild = false, loading = false, disabled, children, ...props }, ref) => {
    const Comp = asChild ? Slot : "button";
    return /* @__PURE__ */ jsx(
      Comp,
      {
        ref,
        className: cn(buttonVariants({ variant, size }), className),
        disabled: disabled ?? loading,
        style: { "--tw-ring-color": "var(--ring)" },
        ...props,
        children: loading ? /* @__PURE__ */ jsxs(Fragment, { children: [
          /* @__PURE__ */ jsxs(
            "svg",
            {
              className: "animate-spin h-4 w-4",
              xmlns: "http://www.w3.org/2000/svg",
              fill: "none",
              viewBox: "0 0 24 24",
              "aria-hidden": "true",
              children: [
                /* @__PURE__ */ jsx("circle", { className: "opacity-25", cx: "12", cy: "12", r: "10", stroke: "currentColor", strokeWidth: "4" }),
                /* @__PURE__ */ jsx("path", { className: "opacity-75", fill: "currentColor", d: "M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" })
              ]
            }
          ),
          children
        ] }) : children
      }
    );
  }
);
Button.displayName = "Button";
var Input = React16.forwardRef(
  ({ className, type, error, ...props }, ref) => {
    return /* @__PURE__ */ jsx(
      "input",
      {
        type,
        ref,
        className: cn(
          "flex h-9 w-full rounded-md px-3 py-2 text-sm",
          "bg-[color:var(--surface-2)] text-[color:var(--foreground)]",
          "border transition-colors duration-150",
          "placeholder:text-[color:var(--muted-foreground)]",
          "focus-visible:outline-none focus-visible:ring-2",
          "disabled:cursor-not-allowed disabled:opacity-50",
          error ? "border-[color:var(--destructive)] focus-visible:ring-[color:var(--destructive)]" : "border-[color:var(--border)] focus-visible:ring-[color:var(--ring)] focus-visible:border-[color:var(--accent)]",
          className
        ),
        ...props
      }
    );
  }
);
Input.displayName = "Input";
var Textarea = React16.forwardRef(
  ({ className, error, ...props }, ref) => {
    return /* @__PURE__ */ jsx(
      "textarea",
      {
        ref,
        className: cn(
          "flex min-h-[80px] w-full rounded-md px-3 py-2 text-sm",
          "bg-[color:var(--surface-2)] text-[color:var(--foreground)]",
          "border transition-colors duration-150 resize-y",
          "placeholder:text-[color:var(--muted-foreground)]",
          "focus-visible:outline-none focus-visible:ring-2",
          "disabled:cursor-not-allowed disabled:opacity-50",
          error ? "border-[color:var(--destructive)] focus-visible:ring-[color:var(--destructive)]" : "border-[color:var(--border)] focus-visible:ring-[color:var(--ring)] focus-visible:border-[color:var(--accent)]",
          className
        ),
        ...props
      }
    );
  }
);
Textarea.displayName = "Textarea";
var Select = SelectPrimitive.Root;
var SelectGroup = SelectPrimitive.Group;
var SelectValue = SelectPrimitive.Value;
var SelectTrigger = React16.forwardRef(({ className, children, error, ...props }, ref) => /* @__PURE__ */ jsxs(
  SelectPrimitive.Trigger,
  {
    ref,
    className: cn(
      "flex h-9 w-full items-center justify-between rounded-md px-3 py-2 text-sm",
      "bg-[color:var(--surface-2)] text-[color:var(--foreground)]",
      "border transition-colors duration-150",
      "placeholder:text-[color:var(--muted-foreground)]",
      "focus:outline-none focus:ring-2",
      "disabled:cursor-not-allowed disabled:opacity-50",
      "[&>span]:line-clamp-1",
      error ? "border-[color:var(--destructive)] focus:ring-[color:var(--destructive)]" : "border-[color:var(--border)] focus:ring-[color:var(--ring)] focus:border-[color:var(--accent)]",
      className
    ),
    ...props,
    children: [
      children,
      /* @__PURE__ */ jsx(SelectPrimitive.Icon, { asChild: true, children: /* @__PURE__ */ jsx(ChevronDown, { size: 14, style: { color: "var(--muted-foreground)", flexShrink: 0 } }) })
    ]
  }
));
SelectTrigger.displayName = SelectPrimitive.Trigger.displayName;
var SelectScrollUpButton = React16.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ jsx(
  SelectPrimitive.ScrollUpButton,
  {
    ref,
    className: cn("flex cursor-default items-center justify-center py-1", className),
    ...props,
    children: /* @__PURE__ */ jsx(ChevronUp, { size: 14 })
  }
));
SelectScrollUpButton.displayName = SelectPrimitive.ScrollUpButton.displayName;
var SelectScrollDownButton = React16.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ jsx(
  SelectPrimitive.ScrollDownButton,
  {
    ref,
    className: cn("flex cursor-default items-center justify-center py-1", className),
    ...props,
    children: /* @__PURE__ */ jsx(ChevronDown, { size: 14 })
  }
));
SelectScrollDownButton.displayName = SelectPrimitive.ScrollDownButton.displayName;
var SelectContent = React16.forwardRef(({ className, children, position = "popper", ...props }, ref) => /* @__PURE__ */ jsx(SelectPrimitive.Portal, { children: /* @__PURE__ */ jsxs(
  SelectPrimitive.Content,
  {
    ref,
    className: cn(
      "relative z-50 min-w-32 overflow-hidden rounded-lg shadow-md",
      position === "popper" && "translate-y-1",
      className
    ),
    position,
    style: {
      background: "var(--popover)",
      border: "1px solid var(--glass-border)",
      backdropFilter: "blur(16px)",
      color: "var(--foreground)"
    },
    ...props,
    children: [
      /* @__PURE__ */ jsx(SelectScrollUpButton, {}),
      /* @__PURE__ */ jsx(
        SelectPrimitive.Viewport,
        {
          className: cn(
            "p-1",
            position === "popper" && "h-[var(--radix-select-trigger-height)] w-full min-w-[var(--radix-select-trigger-width)]"
          ),
          children
        }
      ),
      /* @__PURE__ */ jsx(SelectScrollDownButton, {})
    ]
  }
) }));
SelectContent.displayName = SelectPrimitive.Content.displayName;
var SelectLabel = React16.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ jsx(
  SelectPrimitive.Label,
  {
    ref,
    className: cn("px-2 py-1.5 text-xs font-semibold uppercase tracking-wider", className),
    style: { color: "var(--muted-foreground)" },
    ...props
  }
));
SelectLabel.displayName = SelectPrimitive.Label.displayName;
var SelectItem = React16.forwardRef(({ className, children, ...props }, ref) => /* @__PURE__ */ jsxs(
  SelectPrimitive.Item,
  {
    ref,
    className: cn(
      "relative flex w-full cursor-default select-none items-center rounded-md py-1.5 pl-8 pr-2 text-sm outline-none",
      "focus:bg-[color:var(--glass-bg)] focus:text-[color:var(--foreground)]",
      "data-[disabled]:pointer-events-none data-[disabled]:opacity-50",
      className
    ),
    ...props,
    children: [
      /* @__PURE__ */ jsx("span", { className: "absolute left-2 flex h-3.5 w-3.5 items-center justify-center", children: /* @__PURE__ */ jsx(SelectPrimitive.ItemIndicator, { children: /* @__PURE__ */ jsx(Check, { size: 12, style: { color: "var(--accent)" } }) }) }),
      /* @__PURE__ */ jsx(SelectPrimitive.ItemText, { children })
    ]
  }
));
SelectItem.displayName = SelectPrimitive.Item.displayName;
var SelectSeparator = React16.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ jsx(
  SelectPrimitive.Separator,
  {
    ref,
    className: cn("-mx-1 my-1 h-px", className),
    style: { background: "var(--glass-border)" },
    ...props
  }
));
SelectSeparator.displayName = SelectPrimitive.Separator.displayName;
var Checkbox = React16.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ jsx(
  CheckboxPrimitive.Root,
  {
    ref,
    className: cn(
      "peer h-4 w-4 shrink-0 rounded",
      "border transition-all duration-150",
      "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[color:var(--ring)]",
      "disabled:cursor-not-allowed disabled:opacity-50",
      "data-[state=checked]:bg-[color:var(--accent)] data-[state=checked]:border-[color:var(--accent)] data-[state=checked]:text-[color:var(--accent-foreground)]",
      "border-[color:var(--border)] bg-[color:var(--surface-2)]",
      className
    ),
    ...props,
    children: /* @__PURE__ */ jsx(CheckboxPrimitive.Indicator, { className: "flex items-center justify-center text-current", children: /* @__PURE__ */ jsx(Check, { size: 10, strokeWidth: 3 }) })
  }
));
Checkbox.displayName = CheckboxPrimitive.Root.displayName;
var Switch = React16.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ jsx(
  SwitchPrimitive.Root,
  {
    ref,
    className: cn(
      "peer inline-flex h-5 w-9 shrink-0 cursor-pointer items-center rounded-full",
      "border-2 border-transparent",
      "transition-colors duration-150",
      "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[color:var(--ring)] focus-visible:ring-offset-2",
      "disabled:cursor-not-allowed disabled:opacity-50",
      "data-[state=checked]:bg-[color:var(--accent)]",
      "data-[state=unchecked]:bg-[color:var(--surface-4)]",
      className
    ),
    ...props,
    children: /* @__PURE__ */ jsx(
      SwitchPrimitive.Thumb,
      {
        className: cn(
          "pointer-events-none block h-4 w-4 rounded-full shadow-lg",
          "bg-white transition-transform duration-150",
          "data-[state=checked]:translate-x-4 data-[state=unchecked]:translate-x-0"
        )
      }
    )
  }
));
Switch.displayName = SwitchPrimitive.Root.displayName;
var RadioGroup = React16.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ jsx(RadioGroupPrimitive.Root, { ref, className: cn("grid gap-2", className), ...props }));
RadioGroup.displayName = RadioGroupPrimitive.Root.displayName;
var RadioGroupItem = React16.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ jsx(
  RadioGroupPrimitive.Item,
  {
    ref,
    className: cn(
      "aspect-square h-4 w-4 rounded-full border",
      "border-[color:var(--border)]",
      "text-[color:var(--accent)]",
      "focus:outline-none focus-visible:ring-2 focus-visible:ring-[color:var(--ring)]",
      "disabled:cursor-not-allowed disabled:opacity-50",
      "data-[state=checked]:border-[color:var(--accent)]",
      className
    ),
    ...props,
    children: /* @__PURE__ */ jsx(RadioGroupPrimitive.Indicator, { className: "flex items-center justify-center", children: /* @__PURE__ */ jsx(Circle, { size: 8, fill: "currentColor", strokeWidth: 0, style: { color: "var(--accent)" } }) })
  }
));
RadioGroupItem.displayName = RadioGroupPrimitive.Item.displayName;
var Label2 = React16.forwardRef(({ className, required, children, ...props }, ref) => /* @__PURE__ */ jsxs(
  LabelPrimitive.Root,
  {
    ref,
    className: cn(
      "text-sm font-medium leading-none",
      "text-[color:var(--foreground)]",
      "peer-disabled:cursor-not-allowed peer-disabled:opacity-70",
      className
    ),
    ...props,
    children: [
      children,
      required && /* @__PURE__ */ jsx("span", { className: "ml-1", style: { color: "var(--destructive)" }, "aria-hidden": "true", children: "*" })
    ]
  }
));
Label2.displayName = LabelPrimitive.Root.displayName;
var Separator3 = React16.forwardRef(({ className, orientation = "horizontal", decorative = true, ...props }, ref) => /* @__PURE__ */ jsx(
  SeparatorPrimitive.Root,
  {
    ref,
    decorative,
    orientation,
    className: cn(
      "shrink-0",
      orientation === "horizontal" ? "h-px w-full" : "h-full w-px",
      className
    ),
    style: { background: "var(--border-subtle)" },
    ...props
  }
));
Separator3.displayName = SeparatorPrimitive.Root.displayName;
var badgeVariants = cva(
  "inline-flex items-center gap-1 rounded-full px-2.5 py-0.5 text-xs font-medium transition-colors",
  {
    variants: {
      variant: {
        default: "bg-[color:var(--accent-muted)] text-[color:var(--accent)] border border-[color:var(--accent-border)]",
        secondary: "bg-[color:var(--surface-3)] text-[color:var(--muted-foreground)] border border-[color:var(--border)]",
        destructive: "bg-red-500/10 text-red-400 border border-red-500/20",
        success: "bg-emerald-500/10 text-emerald-400 border border-emerald-500/20",
        warning: "bg-amber-500/10 text-amber-400 border border-amber-500/20",
        outline: "border border-[color:var(--border)] text-[color:var(--foreground)]"
      }
    },
    defaultVariants: {
      variant: "default"
    }
  }
);
function Badge({ className, variant, ...props }) {
  return /* @__PURE__ */ jsx("span", { className: cn(badgeVariants({ variant }), className), ...props });
}
var Progress = React16.forwardRef(({ className, value, indicatorClassName, ...props }, ref) => /* @__PURE__ */ jsx(
  ProgressPrimitive.Root,
  {
    ref,
    className: cn("relative h-2 w-full overflow-hidden rounded-full", className),
    style: { background: "var(--surface-3)" },
    ...props,
    children: /* @__PURE__ */ jsx(
      ProgressPrimitive.Indicator,
      {
        className: cn("h-full w-full flex-1 transition-all duration-300", indicatorClassName),
        style: {
          transform: `translateX(-${100 - (value ?? 0)}%)`,
          background: "var(--accent)"
        }
      }
    )
  }
));
Progress.displayName = ProgressPrimitive.Root.displayName;
function Skeleton({ className, ...props }) {
  return /* @__PURE__ */ jsx(
    "div",
    {
      className: cn("animate-pulse rounded-md", className),
      style: { background: "var(--surface-3)" },
      ...props
    }
  );
}
function Spinner({ size = 16, className }) {
  return /* @__PURE__ */ jsx(
    Loader2,
    {
      size,
      className: cn("animate-spin", className),
      style: { color: "var(--accent)" },
      "aria-label": "Loading"
    }
  );
}
function Toaster({
  position = "bottom-right",
  richColors = true,
  closeButton = false,
  duration = 4e3
}) {
  return /* @__PURE__ */ jsx(
    Toaster$1,
    {
      position,
      richColors,
      closeButton,
      duration,
      toastOptions: {
        style: {
          background: "var(--surface-2)",
          border: "1px solid var(--glass-border)",
          color: "var(--foreground)",
          backdropFilter: "blur(16px)"
        }
      }
    }
  );
}
var Dialog = DialogPrimitive.Root;
var DialogTrigger = DialogPrimitive.Trigger;
var DialogPortal = DialogPrimitive.Portal;
var DialogClose = DialogPrimitive.Close;
var DialogOverlay = React16.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ jsx(
  DialogPrimitive.Overlay,
  {
    ref,
    className: cn(
      "fixed inset-0 z-50",
      "data-[state=open]:animate-in data-[state=closed]:animate-out",
      "data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0",
      className
    ),
    style: { background: "rgba(0, 0, 0, 0.7)", backdropFilter: "blur(4px)" },
    ...props
  }
));
DialogOverlay.displayName = DialogPrimitive.Overlay.displayName;
var DialogContent = React16.forwardRef(({ className, children, ...props }, ref) => /* @__PURE__ */ jsxs(DialogPortal, { children: [
  /* @__PURE__ */ jsx(DialogOverlay, {}),
  /* @__PURE__ */ jsxs(
    DialogPrimitive.Content,
    {
      ref,
      className: cn(
        "fixed left-[50%] top-[50%] z-50 w-full max-w-lg translate-x-[-50%] translate-y-[-50%]",
        "rounded-xl p-6 shadow-lg",
        "data-[state=open]:animate-in data-[state=closed]:animate-out",
        "data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0",
        "data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95",
        "data-[state=closed]:slide-out-to-left-1/2 data-[state=closed]:slide-out-to-top-[48%]",
        "data-[state=open]:slide-in-from-left-1/2 data-[state=open]:slide-in-from-top-[48%]",
        className
      ),
      style: {
        background: "var(--surface-2)",
        border: "1px solid var(--glass-border)",
        color: "var(--foreground)"
      },
      ...props,
      children: [
        children,
        /* @__PURE__ */ jsxs(
          DialogPrimitive.Close,
          {
            className: "absolute right-4 top-4 rounded-sm opacity-70 ring-offset-background transition-opacity hover:opacity-100 focus:outline-none focus:ring-2 disabled:pointer-events-none data-[state=open]:bg-accent data-[state=open]:text-muted-foreground",
            style: { color: "var(--muted-foreground)" },
            children: [
              /* @__PURE__ */ jsx(X, { size: 16 }),
              /* @__PURE__ */ jsx("span", { className: "sr-only", children: "Close" })
            ]
          }
        )
      ]
    }
  )
] }));
DialogContent.displayName = DialogPrimitive.Content.displayName;
function DialogHeader({ className, ...props }) {
  return /* @__PURE__ */ jsx("div", { className: cn("flex flex-col space-y-1.5 mb-4", className), ...props });
}
function DialogFooter({ className, ...props }) {
  return /* @__PURE__ */ jsx(
    "div",
    {
      className: cn("flex flex-col-reverse gap-2 sm:flex-row sm:justify-end", className),
      ...props
    }
  );
}
var DialogTitle = React16.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ jsx(
  DialogPrimitive.Title,
  {
    ref,
    className: cn("text-lg font-semibold leading-none tracking-tight", className),
    style: { color: "var(--foreground)" },
    ...props
  }
));
DialogTitle.displayName = DialogPrimitive.Title.displayName;
var DialogDescription = React16.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ jsx(
  DialogPrimitive.Description,
  {
    ref,
    className: cn("text-sm", className),
    style: { color: "var(--muted-foreground)" },
    ...props
  }
));
DialogDescription.displayName = DialogPrimitive.Description.displayName;
var AlertDialog = AlertDialogPrimitive.Root;
var AlertDialogTrigger = AlertDialogPrimitive.Trigger;
var AlertDialogPortal = AlertDialogPrimitive.Portal;
var AlertDialogOverlay = React16.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ jsx(
  AlertDialogPrimitive.Overlay,
  {
    ref,
    className: cn("fixed inset-0 z-50", className),
    style: { background: "rgba(0, 0, 0, 0.7)", backdropFilter: "blur(4px)" },
    ...props
  }
));
AlertDialogOverlay.displayName = AlertDialogPrimitive.Overlay.displayName;
var AlertDialogContent = React16.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ jsxs(AlertDialogPortal, { children: [
  /* @__PURE__ */ jsx(AlertDialogOverlay, {}),
  /* @__PURE__ */ jsx(
    AlertDialogPrimitive.Content,
    {
      ref,
      className: cn(
        "fixed left-[50%] top-[50%] z-50 w-full max-w-md translate-x-[-50%] translate-y-[-50%]",
        "rounded-xl p-6 shadow-lg",
        className
      ),
      style: {
        background: "var(--surface-2)",
        border: "1px solid var(--glass-border)",
        color: "var(--foreground)"
      },
      ...props
    }
  )
] }));
AlertDialogContent.displayName = AlertDialogPrimitive.Content.displayName;
function AlertDialogHeader({ className, ...props }) {
  return /* @__PURE__ */ jsx("div", { className: cn("flex flex-col space-y-2 mb-4", className), ...props });
}
function AlertDialogFooter({ className, ...props }) {
  return /* @__PURE__ */ jsx(
    "div",
    {
      className: cn("flex flex-col-reverse gap-2 sm:flex-row sm:justify-end", className),
      ...props
    }
  );
}
var AlertDialogTitle = React16.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ jsx(
  AlertDialogPrimitive.Title,
  {
    ref,
    className: cn("text-lg font-semibold", className),
    style: { color: "var(--foreground)" },
    ...props
  }
));
AlertDialogTitle.displayName = AlertDialogPrimitive.Title.displayName;
var AlertDialogDescription = React16.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ jsx(
  AlertDialogPrimitive.Description,
  {
    ref,
    className: cn("text-sm", className),
    style: { color: "var(--muted-foreground)" },
    ...props
  }
));
AlertDialogDescription.displayName = AlertDialogPrimitive.Description.displayName;
var AlertDialogAction = React16.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ jsx(
  AlertDialogPrimitive.Action,
  {
    ref,
    className: cn(
      "inline-flex h-9 items-center justify-center rounded-md px-4 text-sm font-medium transition-colors",
      "bg-[color:var(--destructive)] text-[color:var(--destructive-foreground)] hover:opacity-90",
      className
    ),
    ...props
  }
));
AlertDialogAction.displayName = AlertDialogPrimitive.Action.displayName;
var AlertDialogCancel = React16.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ jsx(
  AlertDialogPrimitive.Cancel,
  {
    ref,
    className: cn(
      "inline-flex h-9 items-center justify-center rounded-md px-4 text-sm font-medium transition-colors",
      "border border-[color:var(--border)] bg-transparent hover:bg-[color:var(--glass-bg)]",
      className
    ),
    style: { color: "var(--foreground)" },
    ...props
  }
));
AlertDialogCancel.displayName = AlertDialogPrimitive.Cancel.displayName;
var Sheet = DialogPrimitive.Root;
var SheetTrigger = DialogPrimitive.Trigger;
var SheetClose = DialogPrimitive.Close;
var SheetPortal = DialogPrimitive.Portal;
var SheetOverlay = React16.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ jsx(
  DialogPrimitive.Overlay,
  {
    ref,
    className: cn("fixed inset-0 z-50", className),
    style: { background: "rgba(0, 0, 0, 0.6)", backdropFilter: "blur(4px)" },
    ...props
  }
));
SheetOverlay.displayName = "SheetOverlay";
var sheetVariants = cva(
  "fixed z-50 flex flex-col transition-transform duration-300 ease-in-out",
  {
    variants: {
      side: {
        top: "inset-x-0 top-0 border-b",
        bottom: "inset-x-0 bottom-0 border-t",
        left: "inset-y-0 left-0 h-full w-3/4 max-w-sm border-r",
        right: "inset-y-0 right-0 h-full w-3/4 max-w-sm border-l"
      }
    },
    defaultVariants: {
      side: "right"
    }
  }
);
var SheetContent = React16.forwardRef(({ side = "right", className, children, ...props }, ref) => /* @__PURE__ */ jsxs(SheetPortal, { children: [
  /* @__PURE__ */ jsx(SheetOverlay, {}),
  /* @__PURE__ */ jsxs(
    DialogPrimitive.Content,
    {
      ref,
      className: cn(sheetVariants({ side }), className),
      style: {
        background: "var(--surface-1)",
        borderColor: "var(--border-subtle)",
        color: "var(--foreground)"
      },
      ...props,
      children: [
        /* @__PURE__ */ jsxs(
          DialogPrimitive.Close,
          {
            className: "absolute right-4 top-4 rounded-sm opacity-70 transition-opacity hover:opacity-100 focus:outline-none",
            style: { color: "var(--muted-foreground)" },
            children: [
              /* @__PURE__ */ jsx(X, { size: 16 }),
              /* @__PURE__ */ jsx("span", { className: "sr-only", children: "Close" })
            ]
          }
        ),
        children
      ]
    }
  )
] }));
SheetContent.displayName = "SheetContent";
function SheetHeader({ className, ...props }) {
  return /* @__PURE__ */ jsx("div", { className: cn("flex flex-col space-y-1.5 p-6", className), ...props });
}
function SheetFooter({ className, ...props }) {
  return /* @__PURE__ */ jsx(
    "div",
    {
      className: cn("flex flex-col-reverse gap-2 p-6 sm:flex-row sm:justify-end", className),
      ...props
    }
  );
}
var SheetTitle = React16.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ jsx(
  DialogPrimitive.Title,
  {
    ref,
    className: cn("text-lg font-semibold leading-none tracking-tight", className),
    style: { color: "var(--foreground)" },
    ...props
  }
));
SheetTitle.displayName = DialogPrimitive.Title.displayName;
var SheetDescription = React16.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ jsx(
  DialogPrimitive.Description,
  {
    ref,
    className: cn("text-sm", className),
    style: { color: "var(--muted-foreground)" },
    ...props
  }
));
SheetDescription.displayName = DialogPrimitive.Description.displayName;
var DropdownMenu = DropdownMenuPrimitive3.Root;
var DropdownMenuTrigger = DropdownMenuPrimitive3.Trigger;
var DropdownMenuGroup = DropdownMenuPrimitive3.Group;
var DropdownMenuPortal = DropdownMenuPrimitive3.Portal;
var DropdownMenuSub = DropdownMenuPrimitive3.Sub;
var DropdownMenuRadioGroup = DropdownMenuPrimitive3.RadioGroup;
var DropdownMenuSubTrigger = React16.forwardRef(({ className, inset, children, ...props }, ref) => /* @__PURE__ */ jsxs(
  DropdownMenuPrimitive3.SubTrigger,
  {
    ref,
    className: cn(
      "flex cursor-default select-none items-center gap-2 rounded-md px-2 py-1.5 text-sm outline-none",
      "focus:bg-[color:var(--glass-bg)] data-[state=open]:bg-[color:var(--glass-bg)]",
      inset && "pl-8",
      className
    ),
    style: { color: "var(--foreground)" },
    ...props,
    children: [
      children,
      /* @__PURE__ */ jsx(ChevronRight, { size: 14, className: "ml-auto" })
    ]
  }
));
DropdownMenuSubTrigger.displayName = DropdownMenuPrimitive3.SubTrigger.displayName;
var DropdownMenuSubContent = React16.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ jsx(
  DropdownMenuPrimitive3.SubContent,
  {
    ref,
    className: cn("z-50 min-w-32 overflow-hidden rounded-lg p-1 shadow-lg", className),
    style: { background: "var(--popover)", border: "1px solid var(--glass-border)", color: "var(--foreground)" },
    ...props
  }
));
DropdownMenuSubContent.displayName = DropdownMenuPrimitive3.SubContent.displayName;
var DropdownMenuContent = React16.forwardRef(({ className, sideOffset = 4, ...props }, ref) => /* @__PURE__ */ jsx(DropdownMenuPrimitive3.Portal, { children: /* @__PURE__ */ jsx(
  DropdownMenuPrimitive3.Content,
  {
    ref,
    sideOffset,
    className: cn("z-50 min-w-48 overflow-hidden rounded-lg p-1 shadow-lg", className),
    style: {
      background: "var(--popover)",
      border: "1px solid var(--glass-border)",
      backdropFilter: "blur(16px)",
      color: "var(--foreground)"
    },
    ...props
  }
) }));
DropdownMenuContent.displayName = DropdownMenuPrimitive3.Content.displayName;
var DropdownMenuItem = React16.forwardRef(({ className, inset, destructive, ...props }, ref) => /* @__PURE__ */ jsx(
  DropdownMenuPrimitive3.Item,
  {
    ref,
    className: cn(
      "relative flex cursor-default select-none items-center gap-2 rounded-md px-2 py-1.5 text-sm outline-none transition-colors",
      "focus:bg-[color:var(--glass-bg)]",
      "data-[disabled]:pointer-events-none data-[disabled]:opacity-50",
      inset && "pl-8",
      className
    ),
    style: { color: destructive ? "var(--destructive)" : "var(--foreground)" },
    ...props
  }
));
DropdownMenuItem.displayName = DropdownMenuPrimitive3.Item.displayName;
var DropdownMenuCheckboxItem = React16.forwardRef(({ className, children, checked, ...props }, ref) => /* @__PURE__ */ jsxs(
  DropdownMenuPrimitive3.CheckboxItem,
  {
    ref,
    className: cn(
      "relative flex cursor-default select-none items-center rounded-md py-1.5 pl-8 pr-2 text-sm outline-none transition-colors",
      "focus:bg-[color:var(--glass-bg)]",
      "data-[disabled]:pointer-events-none data-[disabled]:opacity-50",
      className
    ),
    style: { color: "var(--foreground)" },
    checked,
    ...props,
    children: [
      /* @__PURE__ */ jsx("span", { className: "absolute left-2 flex h-3.5 w-3.5 items-center justify-center", children: /* @__PURE__ */ jsx(DropdownMenuPrimitive3.ItemIndicator, { children: /* @__PURE__ */ jsx(Check, { size: 12, style: { color: "var(--accent)" } }) }) }),
      children
    ]
  }
));
DropdownMenuCheckboxItem.displayName = DropdownMenuPrimitive3.CheckboxItem.displayName;
var DropdownMenuRadioItem = React16.forwardRef(({ className, children, ...props }, ref) => /* @__PURE__ */ jsxs(
  DropdownMenuPrimitive3.RadioItem,
  {
    ref,
    className: cn(
      "relative flex cursor-default select-none items-center rounded-md py-1.5 pl-8 pr-2 text-sm outline-none transition-colors",
      "focus:bg-[color:var(--glass-bg)]",
      "data-[disabled]:pointer-events-none data-[disabled]:opacity-50",
      className
    ),
    style: { color: "var(--foreground)" },
    ...props,
    children: [
      /* @__PURE__ */ jsx("span", { className: "absolute left-2 flex h-3.5 w-3.5 items-center justify-center", children: /* @__PURE__ */ jsx(DropdownMenuPrimitive3.ItemIndicator, { children: /* @__PURE__ */ jsx(Circle, { size: 6, fill: "currentColor", style: { color: "var(--accent)" } }) }) }),
      children
    ]
  }
));
DropdownMenuRadioItem.displayName = DropdownMenuPrimitive3.RadioItem.displayName;
var DropdownMenuLabel = React16.forwardRef(({ className, inset, ...props }, ref) => /* @__PURE__ */ jsx(
  DropdownMenuPrimitive3.Label,
  {
    ref,
    className: cn("px-2 py-1.5 text-xs font-semibold uppercase tracking-wider", inset && "pl-8", className),
    style: { color: "var(--muted-foreground)" },
    ...props
  }
));
DropdownMenuLabel.displayName = DropdownMenuPrimitive3.Label.displayName;
var DropdownMenuSeparator = React16.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ jsx(
  DropdownMenuPrimitive3.Separator,
  {
    ref,
    className: cn("-mx-1 my-1 h-px", className),
    style: { background: "var(--glass-border)" },
    ...props
  }
));
DropdownMenuSeparator.displayName = DropdownMenuPrimitive3.Separator.displayName;
function DropdownMenuShortcut({ className, ...props }) {
  return /* @__PURE__ */ jsx(
    "span",
    {
      className: cn("ml-auto text-xs tracking-widest opacity-60", className),
      ...props
    }
  );
}
var Popover = PopoverPrimitive.Root;
var PopoverTrigger = PopoverPrimitive.Trigger;
var PopoverAnchor = PopoverPrimitive.Anchor;
var PopoverContent = React16.forwardRef(({ className, align = "center", sideOffset = 4, ...props }, ref) => /* @__PURE__ */ jsx(PopoverPrimitive.Portal, { children: /* @__PURE__ */ jsx(
  PopoverPrimitive.Content,
  {
    ref,
    align,
    sideOffset,
    className: cn(
      "z-50 w-72 rounded-lg p-4 shadow-md outline-none",
      "data-[state=open]:animate-in data-[state=closed]:animate-out",
      "data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0",
      "data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95",
      className
    ),
    style: {
      background: "var(--popover)",
      border: "1px solid var(--glass-border)",
      backdropFilter: "blur(16px)",
      color: "var(--foreground)"
    },
    ...props
  }
) }));
PopoverContent.displayName = PopoverPrimitive.Content.displayName;
var TooltipProvider = TooltipPrimitive.Provider;
var Tooltip = TooltipPrimitive.Root;
var TooltipTrigger = TooltipPrimitive.Trigger;
var TooltipContent = React16.forwardRef(({ className, sideOffset = 4, ...props }, ref) => /* @__PURE__ */ jsx(TooltipPrimitive.Portal, { children: /* @__PURE__ */ jsx(
  TooltipPrimitive.Content,
  {
    ref,
    sideOffset,
    className: cn(
      "z-50 overflow-hidden rounded-md px-3 py-1.5 text-xs shadow-md",
      "animate-in fade-in-0 zoom-in-95",
      "data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=closed]:zoom-out-95",
      className
    ),
    style: {
      background: "var(--surface-3)",
      border: "1px solid var(--glass-border)",
      color: "var(--foreground)"
    },
    ...props
  }
) }));
TooltipContent.displayName = TooltipPrimitive.Content.displayName;
var Command = React16.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ jsx(
  Command$1,
  {
    ref,
    className: cn("flex h-full w-full flex-col overflow-hidden rounded-lg", className),
    style: { background: "var(--surface-1)", color: "var(--foreground)" },
    ...props
  }
));
Command.displayName = Command$1.displayName;
var CommandInput = React16.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ jsxs(
  "div",
  {
    className: "flex items-center border-b px-3",
    style: { borderColor: "var(--glass-border)" },
    children: [
      /* @__PURE__ */ jsx(Search, { size: 14, className: "mr-2 shrink-0", style: { color: "var(--muted-foreground)" } }),
      /* @__PURE__ */ jsx(
        Command$1.Input,
        {
          ref,
          className: cn(
            "flex h-10 w-full rounded-md bg-transparent py-3 text-sm outline-none",
            "placeholder:text-[color:var(--muted-foreground)]",
            "disabled:cursor-not-allowed disabled:opacity-50",
            className
          ),
          style: { color: "var(--foreground)" },
          ...props
        }
      )
    ]
  }
));
CommandInput.displayName = Command$1.Input.displayName;
var CommandList = React16.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ jsx(
  Command$1.List,
  {
    ref,
    className: cn("max-h-[300px] overflow-y-auto overflow-x-hidden", className),
    ...props
  }
));
CommandList.displayName = Command$1.List.displayName;
var CommandEmpty = React16.forwardRef((props, ref) => /* @__PURE__ */ jsx(
  Command$1.Empty,
  {
    ref,
    className: "py-6 text-center text-sm",
    style: { color: "var(--muted-foreground)" },
    ...props
  }
));
CommandEmpty.displayName = Command$1.Empty.displayName;
var CommandGroup = React16.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ jsx(
  Command$1.Group,
  {
    ref,
    className: cn(
      "overflow-hidden p-1 [&_[cmdk-group-heading]]:px-2 [&_[cmdk-group-heading]]:py-1.5 [&_[cmdk-group-heading]]:text-xs [&_[cmdk-group-heading]]:font-medium",
      className
    ),
    style: {
      color: "var(--foreground)"
    },
    ...props
  }
));
CommandGroup.displayName = Command$1.Group.displayName;
var CommandSeparator = React16.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ jsx(
  Command$1.Separator,
  {
    ref,
    className: cn("-mx-1 h-px", className),
    style: { background: "var(--glass-border)" },
    ...props
  }
));
CommandSeparator.displayName = Command$1.Separator.displayName;
var CommandItem = React16.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ jsx(
  Command$1.Item,
  {
    ref,
    className: cn(
      "relative flex cursor-default gap-2 select-none items-center rounded-md px-2 py-1.5 text-sm outline-none",
      "data-[selected=true]:bg-[color:var(--accent-muted)] data-[selected=true]:text-[color:var(--accent)]",
      "data-[disabled=true]:pointer-events-none data-[disabled=true]:opacity-50",
      className
    ),
    style: { color: "var(--foreground)" },
    ...props
  }
));
CommandItem.displayName = Command$1.Item.displayName;
function CommandShortcut({ className, ...props }) {
  return /* @__PURE__ */ jsx(
    "span",
    {
      className: cn("ml-auto text-xs tracking-widest opacity-60", className),
      ...props
    }
  );
}
var Card = React16.forwardRef(
  ({ className, ...props }, ref) => /* @__PURE__ */ jsx(
    "div",
    {
      ref,
      className: cn("rounded-lg", className),
      style: {
        background: "var(--surface-1)",
        border: "1px solid var(--border-subtle)",
        backdropFilter: "blur(var(--glass-blur))",
        color: "var(--foreground)",
        boxShadow: "var(--shadow-sm)"
      },
      ...props
    }
  )
);
Card.displayName = "Card";
var CardHeader = React16.forwardRef(
  ({ className, ...props }, ref) => /* @__PURE__ */ jsx("div", { ref, className: cn("flex flex-col space-y-1.5 p-6", className), ...props })
);
CardHeader.displayName = "CardHeader";
var CardTitle = React16.forwardRef(
  ({ className, ...props }, ref) => /* @__PURE__ */ jsx(
    "h3",
    {
      ref,
      className: cn("text-base font-semibold leading-none tracking-tight", className),
      style: { color: "var(--foreground)" },
      ...props
    }
  )
);
CardTitle.displayName = "CardTitle";
var CardDescription = React16.forwardRef(
  ({ className, ...props }, ref) => /* @__PURE__ */ jsx(
    "p",
    {
      ref,
      className: cn("text-sm", className),
      style: { color: "var(--muted-foreground)" },
      ...props
    }
  )
);
CardDescription.displayName = "CardDescription";
var CardContent = React16.forwardRef(
  ({ className, ...props }, ref) => /* @__PURE__ */ jsx("div", { ref, className: cn("p-6 pt-0", className), ...props })
);
CardContent.displayName = "CardContent";
var CardFooter = React16.forwardRef(
  ({ className, ...props }, ref) => /* @__PURE__ */ jsx(
    "div",
    {
      ref,
      className: cn("flex items-center p-6 pt-0", className),
      ...props
    }
  )
);
CardFooter.displayName = "CardFooter";
var Table = React16.forwardRef(
  ({ className, ...props }, ref) => /* @__PURE__ */ jsx("div", { className: "relative w-full overflow-auto", children: /* @__PURE__ */ jsx(
    "table",
    {
      ref,
      className: cn("w-full caption-bottom text-sm", className),
      ...props
    }
  ) })
);
Table.displayName = "Table";
var TableHeader = React16.forwardRef(
  ({ className, ...props }, ref) => /* @__PURE__ */ jsx(
    "thead",
    {
      ref,
      className: cn("[&_tr]:border-b", className),
      ...props
    }
  )
);
TableHeader.displayName = "TableHeader";
var TableBody = React16.forwardRef(
  ({ className, ...props }, ref) => /* @__PURE__ */ jsx(
    "tbody",
    {
      ref,
      className: cn("[&_tr:last-child]:border-0", className),
      ...props
    }
  )
);
TableBody.displayName = "TableBody";
var TableFooter = React16.forwardRef(
  ({ className, ...props }, ref) => /* @__PURE__ */ jsx(
    "tfoot",
    {
      ref,
      className: cn("border-t font-medium [&>tr]:last:border-b-0", className),
      style: { borderColor: "var(--border-subtle)", background: "var(--surface-2)" },
      ...props
    }
  )
);
TableFooter.displayName = "TableFooter";
var TableRow = React16.forwardRef(
  ({ className, ...props }, ref) => /* @__PURE__ */ jsx(
    "tr",
    {
      ref,
      className: cn(
        "border-b transition-colors",
        "hover:bg-[color:var(--glass-bg)]",
        "data-[state=selected]:bg-[color:var(--accent-muted)]",
        className
      ),
      style: { borderColor: "var(--border-subtle)" },
      ...props
    }
  )
);
TableRow.displayName = "TableRow";
var TableHead = React16.forwardRef(
  ({ className, ...props }, ref) => /* @__PURE__ */ jsx(
    "th",
    {
      ref,
      className: cn(
        "h-10 px-4 text-left align-middle text-xs font-medium uppercase tracking-wider",
        "[&:has([role=checkbox])]:pr-0",
        className
      ),
      style: { color: "var(--muted-foreground)" },
      ...props
    }
  )
);
TableHead.displayName = "TableHead";
var TableCell = React16.forwardRef(
  ({ className, ...props }, ref) => /* @__PURE__ */ jsx(
    "td",
    {
      ref,
      className: cn("px-4 py-3 align-middle [&:has([role=checkbox])]:pr-0", className),
      style: { color: "var(--foreground)" },
      ...props
    }
  )
);
TableCell.displayName = "TableCell";
var TableCaption = React16.forwardRef(
  ({ className, ...props }, ref) => /* @__PURE__ */ jsx(
    "caption",
    {
      ref,
      className: cn("mt-4 text-sm", className),
      style: { color: "var(--muted-foreground)" },
      ...props
    }
  )
);
TableCaption.displayName = "TableCaption";
var Avatar = React16.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ jsx(
  AvatarPrimitive.Root,
  {
    ref,
    className: cn("relative flex h-9 w-9 shrink-0 overflow-hidden rounded-full", className),
    ...props
  }
));
Avatar.displayName = AvatarPrimitive.Root.displayName;
var AvatarImage = React16.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ jsx(
  AvatarPrimitive.Image,
  {
    ref,
    className: cn("aspect-square h-full w-full object-cover", className),
    ...props
  }
));
AvatarImage.displayName = AvatarPrimitive.Image.displayName;
var AvatarFallback = React16.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ jsx(
  AvatarPrimitive.Fallback,
  {
    ref,
    className: cn(
      "flex h-full w-full items-center justify-center rounded-full text-xs font-semibold",
      className
    ),
    style: { background: "var(--accent-muted)", color: "var(--accent)" },
    ...props
  }
));
AvatarFallback.displayName = AvatarPrimitive.Fallback.displayName;
function StatCard({ icon: Icon2, label, value, trend, accent = "default", className }) {
  const accentColor = {
    default: "var(--accent)",
    success: "var(--success)",
    warning: "var(--warning)",
    destructive: "var(--destructive)"
  }[accent];
  const TrendIcon = trend ? trend.direction === "up" ? TrendingUp : trend.direction === "down" ? TrendingDown : Minus : null;
  const trendColor = trend ? trend.direction === "up" ? "var(--success)" : trend.direction === "down" ? "var(--destructive)" : "var(--muted-foreground)" : void 0;
  return /* @__PURE__ */ jsx(
    "div",
    {
      className: cn("rounded-lg p-5", className),
      style: {
        background: "var(--surface-1)",
        border: "1px solid var(--border-subtle)",
        backdropFilter: "blur(var(--glass-blur))"
      },
      children: /* @__PURE__ */ jsxs("div", { className: "flex items-start justify-between", children: [
        /* @__PURE__ */ jsxs("div", { children: [
          /* @__PURE__ */ jsx("p", { className: "text-xs font-medium uppercase tracking-wider mb-1", style: { color: "var(--muted-foreground)" }, children: label }),
          /* @__PURE__ */ jsx("p", { className: "text-2xl font-bold tracking-tight", style: { color: "var(--foreground)" }, children: value }),
          trend && TrendIcon && /* @__PURE__ */ jsxs("div", { className: "mt-1.5 flex items-center gap-1 text-xs", children: [
            /* @__PURE__ */ jsx(TrendIcon, { size: 12, style: { color: trendColor } }),
            /* @__PURE__ */ jsxs("span", { style: { color: trendColor }, children: [
              trend.value > 0 ? "+" : "",
              trend.value,
              "%"
            ] }),
            trend.label && /* @__PURE__ */ jsx("span", { style: { color: "var(--muted-foreground)" }, children: trend.label })
          ] })
        ] }),
        /* @__PURE__ */ jsx(
          "div",
          {
            className: "flex h-10 w-10 items-center justify-center rounded-lg shrink-0",
            style: {
              background: `color-mix(in srgb, ${accentColor} 15%, transparent)`,
              border: `1px solid color-mix(in srgb, ${accentColor} 25%, transparent)`
            },
            children: /* @__PURE__ */ jsx(Icon2, { size: 18, style: { color: accentColor } })
          }
        )
      ] })
    }
  );
}
function EmptyState({ icon: Icon2, title, description, action, className }) {
  return /* @__PURE__ */ jsxs(
    "div",
    {
      className: cn("flex flex-col items-center justify-center py-16 px-8 text-center", className),
      children: [
        /* @__PURE__ */ jsx(
          "div",
          {
            className: "flex h-16 w-16 items-center justify-center rounded-2xl mb-5",
            style: {
              background: "var(--accent-muted)",
              border: "1px solid var(--accent-border)"
            },
            children: /* @__PURE__ */ jsx(Icon2, { size: 28, style: { color: "var(--accent)" } })
          }
        ),
        /* @__PURE__ */ jsx("h3", { className: "text-base font-semibold mb-2", style: { color: "var(--foreground)" }, children: title }),
        description && /* @__PURE__ */ jsx("p", { className: "text-sm max-w-xs mb-6", style: { color: "var(--muted-foreground)" }, children: description }),
        action && /* @__PURE__ */ jsx(Button, { onClick: action.onClick, size: "sm", children: action.label })
      ]
    }
  );
}
function PageHeader({ title, description, actions, breadcrumbs, className }) {
  return /* @__PURE__ */ jsxs("div", { className: cn("mb-6", className), children: [
    breadcrumbs && breadcrumbs.length > 0 && /* @__PURE__ */ jsx("nav", { className: "flex items-center gap-1.5 mb-3 text-sm", children: breadcrumbs.map((crumb, i) => /* @__PURE__ */ jsxs(React16.Fragment, { children: [
      i > 0 && /* @__PURE__ */ jsx("span", { style: { color: "var(--muted-foreground)" }, children: "/" }),
      crumb.href ? /* @__PURE__ */ jsx(
        "a",
        {
          href: crumb.href,
          className: "hover:underline transition-colors",
          style: {
            color: i === breadcrumbs.length - 1 ? "var(--foreground)" : "var(--muted-foreground)"
          },
          children: crumb.label
        }
      ) : /* @__PURE__ */ jsx(
        "span",
        {
          style: {
            color: i === breadcrumbs.length - 1 ? "var(--foreground)" : "var(--muted-foreground)"
          },
          children: crumb.label
        }
      )
    ] }, i)) }),
    /* @__PURE__ */ jsxs("div", { className: "flex items-start justify-between gap-4", children: [
      /* @__PURE__ */ jsxs("div", { children: [
        /* @__PURE__ */ jsx("h1", { className: "text-2xl font-bold tracking-tight", style: { color: "var(--foreground)" }, children: title }),
        description && /* @__PURE__ */ jsx("p", { className: "mt-1 text-sm", style: { color: "var(--muted-foreground)" }, children: description })
      ] }),
      actions && /* @__PURE__ */ jsx("div", { className: "flex items-center gap-2 shrink-0", children: actions })
    ] })
  ] });
}
var Tabs = TabsPrimitive.Root;
var TabsList = React16.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ jsx(
  TabsPrimitive.List,
  {
    ref,
    className: cn(
      "inline-flex h-9 items-center justify-start rounded-lg p-1 gap-1",
      className
    ),
    style: { background: "var(--surface-2)" },
    ...props
  }
));
TabsList.displayName = TabsPrimitive.List.displayName;
var TabsTrigger = React16.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ jsx(
  TabsPrimitive.Trigger,
  {
    ref,
    className: cn(
      "inline-flex items-center justify-center whitespace-nowrap rounded-md px-3 py-1.5 text-sm font-medium",
      "transition-all duration-150",
      "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[color:var(--ring)]",
      "disabled:pointer-events-none disabled:opacity-50",
      "data-[state=active]:bg-[color:var(--surface-4)]",
      "data-[state=active]:text-[color:var(--accent)]",
      "data-[state=inactive]:text-[color:var(--muted-foreground)]",
      "data-[state=inactive]:hover:text-[color:var(--foreground)]",
      className
    ),
    ...props
  }
));
TabsTrigger.displayName = TabsPrimitive.Trigger.displayName;
var TabsContent = React16.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ jsx(
  TabsPrimitive.Content,
  {
    ref,
    className: cn(
      "mt-4 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[color:var(--ring)]",
      className
    ),
    ...props
  }
));
TabsContent.displayName = TabsPrimitive.Content.displayName;
var Breadcrumb = React16.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ jsx("nav", { ref, "aria-label": "breadcrumb", className: cn(className), ...props }));
Breadcrumb.displayName = "Breadcrumb";
var BreadcrumbList = React16.forwardRef(
  ({ className, ...props }, ref) => /* @__PURE__ */ jsx(
    "ol",
    {
      ref,
      className: cn("flex flex-wrap items-center gap-1.5 text-sm", className),
      style: { color: "var(--muted-foreground)" },
      ...props
    }
  )
);
BreadcrumbList.displayName = "BreadcrumbList";
var BreadcrumbItem = React16.forwardRef(
  ({ className, ...props }, ref) => /* @__PURE__ */ jsx("li", { ref, className: cn("inline-flex items-center gap-1.5", className), ...props })
);
BreadcrumbItem.displayName = "BreadcrumbItem";
var BreadcrumbLink = React16.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ jsx(
  "a",
  {
    ref,
    className: cn("transition-colors hover:text-[color:var(--foreground)]", className),
    ...props
  }
));
BreadcrumbLink.displayName = "BreadcrumbLink";
var BreadcrumbPage = React16.forwardRef(
  ({ className, ...props }, ref) => /* @__PURE__ */ jsx(
    "span",
    {
      ref,
      role: "link",
      "aria-disabled": "true",
      "aria-current": "page",
      className: cn("font-normal", className),
      style: { color: "var(--foreground)" },
      ...props
    }
  )
);
BreadcrumbPage.displayName = "BreadcrumbPage";
function BreadcrumbSeparator({ children, className, ...props }) {
  return /* @__PURE__ */ jsx(
    "li",
    {
      role: "presentation",
      "aria-hidden": "true",
      className: cn("[&>svg]:h-3.5 [&>svg]:w-3.5", className),
      ...props,
      children: children ?? /* @__PURE__ */ jsx(ChevronRight, { size: 14 })
    }
  );
}
function BreadcrumbEllipsis({ className, ...props }) {
  return /* @__PURE__ */ jsxs(
    "span",
    {
      role: "presentation",
      "aria-hidden": "true",
      className: cn("flex h-9 w-9 items-center justify-center", className),
      ...props,
      children: [
        /* @__PURE__ */ jsx(MoreHorizontal, { size: 16 }),
        /* @__PURE__ */ jsx("span", { className: "sr-only", children: "More" })
      ]
    }
  );
}
var Pagination = ({ className, ...props }) => /* @__PURE__ */ jsx(
  "nav",
  {
    role: "navigation",
    "aria-label": "pagination",
    className: cn("mx-auto flex w-full justify-center", className),
    ...props
  }
);
Pagination.displayName = "Pagination";
var PaginationContent = React16.forwardRef(
  ({ className, ...props }, ref) => /* @__PURE__ */ jsx("ul", { ref, className: cn("flex flex-row items-center gap-1", className), ...props })
);
PaginationContent.displayName = "PaginationContent";
var PaginationItem = React16.forwardRef(
  ({ className, ...props }, ref) => /* @__PURE__ */ jsx("li", { ref, className: cn("", className), ...props })
);
PaginationItem.displayName = "PaginationItem";
function PaginationLink({ className, isActive, children, ...props }) {
  return /* @__PURE__ */ jsx(
    "button",
    {
      type: "button",
      "aria-current": isActive ? "page" : void 0,
      className: cn(
        "flex h-8 min-w-8 items-center justify-center rounded-md px-2 text-sm transition-colors",
        isActive ? "bg-[color:var(--accent-muted)] text-[color:var(--accent)] border border-[color:var(--accent-border)] font-medium" : "text-[color:var(--muted-foreground)] hover:bg-[color:var(--glass-bg)] hover:text-[color:var(--foreground)] border border-transparent",
        className
      ),
      ...props,
      children
    }
  );
}
function PaginationPrevious({ className, ...props }) {
  return /* @__PURE__ */ jsxs(
    "button",
    {
      type: "button",
      "aria-label": "Go to previous page",
      className: cn(
        "flex h-8 items-center gap-1 rounded-md px-2 text-sm transition-colors",
        "text-[color:var(--muted-foreground)] hover:bg-[color:var(--glass-bg)] hover:text-[color:var(--foreground)]",
        "disabled:pointer-events-none disabled:opacity-50",
        className
      ),
      ...props,
      children: [
        /* @__PURE__ */ jsx(ChevronLeft, { size: 14 }),
        "Previous"
      ]
    }
  );
}
function PaginationNext({ className, ...props }) {
  return /* @__PURE__ */ jsxs(
    "button",
    {
      type: "button",
      "aria-label": "Go to next page",
      className: cn(
        "flex h-8 items-center gap-1 rounded-md px-2 text-sm transition-colors",
        "text-[color:var(--muted-foreground)] hover:bg-[color:var(--glass-bg)] hover:text-[color:var(--foreground)]",
        "disabled:pointer-events-none disabled:opacity-50",
        className
      ),
      ...props,
      children: [
        "Next",
        /* @__PURE__ */ jsx(ChevronRight, { size: 14 })
      ]
    }
  );
}
function PaginationEllipsis({ className, ...props }) {
  return /* @__PURE__ */ jsxs(
    "span",
    {
      "aria-hidden": true,
      className: cn("flex h-8 w-8 items-center justify-center", className),
      style: { color: "var(--muted-foreground)" },
      ...props,
      children: [
        /* @__PURE__ */ jsx(MoreHorizontal, { size: 14 }),
        /* @__PURE__ */ jsx("span", { className: "sr-only", children: "More pages" })
      ]
    }
  );
}
var Form = React16.forwardRef(
  ({ className, ...props }, ref) => /* @__PURE__ */ jsx("form", { ref, className: cn("space-y-4", className), ...props })
);
Form.displayName = "Form";
var FormFieldContext = createContext({ id: "" });
function useFormField() {
  return useContext(FormFieldContext);
}
function FormField({ id, label, description, error, required, children, className }) {
  const generatedId = React16.useId();
  const fieldId = id ?? generatedId;
  return /* @__PURE__ */ jsx(FormFieldContext.Provider, { value: { id: fieldId, error }, children: /* @__PURE__ */ jsxs("div", { className: cn("space-y-1.5", className), children: [
    label && /* @__PURE__ */ jsx(Label2, { htmlFor: fieldId, required, children: label }),
    children,
    description && !error && /* @__PURE__ */ jsx("p", { className: "text-xs", style: { color: "var(--muted-foreground)" }, children: description }),
    error && /* @__PURE__ */ jsx("p", { className: "text-xs", style: { color: "var(--destructive)" }, role: "alert", children: error })
  ] }) });
}
var MONTHS = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December"
];
var WEEKDAYS = ["Su", "Mo", "Tu", "We", "Th", "Fr", "Sa"];
function DatePicker({
  value,
  onChange,
  placeholder = "Pick a date",
  disabled = false,
  className,
  minDate,
  maxDate
}) {
  const [open, setOpen] = useState(false);
  const [viewDate, setViewDate] = useState(() => value ?? /* @__PURE__ */ new Date());
  const year = viewDate.getFullYear();
  const month = viewDate.getMonth();
  const firstDay = new Date(year, month, 1).getDay();
  const daysInMonth = new Date(year, month + 1, 0).getDate();
  function formatDate(d) {
    return d.toLocaleDateString("en-US", { year: "numeric", month: "long", day: "numeric" });
  }
  function prevMonth() {
    setViewDate(new Date(year, month - 1, 1));
  }
  function nextMonth() {
    setViewDate(new Date(year, month + 1, 1));
  }
  function isSelected(day) {
    if (!value) return false;
    return value.getFullYear() === year && value.getMonth() === month && value.getDate() === day;
  }
  function isDisabled(day) {
    const d = new Date(year, month, day);
    if (minDate && d < minDate) return true;
    if (maxDate && d > maxDate) return true;
    return false;
  }
  function isToday(day) {
    const today = /* @__PURE__ */ new Date();
    return today.getFullYear() === year && today.getMonth() === month && today.getDate() === day;
  }
  function selectDay(day) {
    if (isDisabled(day)) return;
    const selected = new Date(year, month, day);
    onChange?.(selected);
    setOpen(false);
  }
  const cells = [
    ...Array(firstDay).fill(null),
    ...Array.from({ length: daysInMonth }, (_, i) => i + 1)
  ];
  while (cells.length % 7 !== 0) cells.push(null);
  return /* @__PURE__ */ jsxs(Popover, { open, onOpenChange: setOpen, children: [
    /* @__PURE__ */ jsx(PopoverTrigger, { asChild: true, children: /* @__PURE__ */ jsxs(
      "button",
      {
        type: "button",
        disabled,
        className: cn(
          "flex h-9 w-full items-center justify-start gap-2 rounded-md px-3 py-2 text-sm",
          "bg-[color:var(--surface-2)] border border-[color:var(--border)]",
          "transition-colors duration-150",
          "focus:outline-none focus:ring-2 focus:ring-[color:var(--ring)] focus:border-[color:var(--accent)]",
          "disabled:cursor-not-allowed disabled:opacity-50",
          !value && "text-[color:var(--muted-foreground)]",
          className
        ),
        style: { color: value ? "var(--foreground)" : void 0 },
        children: [
          /* @__PURE__ */ jsx(CalendarIcon, { size: 14, style: { color: "var(--muted-foreground)", flexShrink: 0 } }),
          value ? formatDate(value) : placeholder
        ]
      }
    ) }),
    /* @__PURE__ */ jsx(PopoverContent, { className: "w-auto p-0", align: "start", children: /* @__PURE__ */ jsxs("div", { className: "p-3", children: [
      /* @__PURE__ */ jsxs("div", { className: "flex items-center justify-between mb-3", children: [
        /* @__PURE__ */ jsx(
          "button",
          {
            type: "button",
            onClick: prevMonth,
            className: "flex h-7 w-7 items-center justify-center rounded-md transition-colors hover:bg-[color:var(--glass-bg)]",
            style: { color: "var(--muted-foreground)" },
            children: /* @__PURE__ */ jsx(ChevronLeft, { size: 14 })
          }
        ),
        /* @__PURE__ */ jsxs("span", { className: "text-sm font-medium", style: { color: "var(--foreground)" }, children: [
          MONTHS[month],
          " ",
          year
        ] }),
        /* @__PURE__ */ jsx(
          "button",
          {
            type: "button",
            onClick: nextMonth,
            className: "flex h-7 w-7 items-center justify-center rounded-md transition-colors hover:bg-[color:var(--glass-bg)]",
            style: { color: "var(--muted-foreground)" },
            children: /* @__PURE__ */ jsx(ChevronRight, { size: 14 })
          }
        )
      ] }),
      /* @__PURE__ */ jsx("div", { className: "grid grid-cols-7 mb-1", children: WEEKDAYS.map((d) => /* @__PURE__ */ jsx(
        "div",
        {
          className: "flex h-8 w-8 items-center justify-center text-xs font-medium",
          style: { color: "var(--muted-foreground)" },
          children: d
        },
        d
      )) }),
      /* @__PURE__ */ jsx("div", { className: "grid grid-cols-7", children: cells.map((day, i) => /* @__PURE__ */ jsx("div", { className: "flex h-8 w-8 items-center justify-center", children: day !== null && /* @__PURE__ */ jsx(
        "button",
        {
          type: "button",
          onClick: () => selectDay(day),
          disabled: isDisabled(day),
          className: cn(
            "flex h-8 w-8 items-center justify-center rounded-md text-sm transition-colors",
            "disabled:pointer-events-none disabled:opacity-40",
            isSelected(day) && "font-semibold",
            !isSelected(day) && isToday(day) && "font-semibold",
            !isSelected(day) && "hover:bg-[color:var(--glass-bg)]"
          ),
          style: {
            background: isSelected(day) ? "var(--accent)" : void 0,
            color: isSelected(day) ? "var(--accent-foreground)" : isToday(day) ? "var(--accent)" : "var(--foreground)"
          },
          children: day
        }
      ) }, i)) }),
      value && /* @__PURE__ */ jsx("div", { className: "mt-2 pt-2", style: { borderTop: "1px solid var(--glass-border)" }, children: /* @__PURE__ */ jsx(
        Button,
        {
          variant: "ghost",
          size: "sm",
          className: "w-full",
          onClick: () => {
            onChange?.(void 0);
            setOpen(false);
          },
          children: "Clear"
        }
      ) })
    ] }) })
  ] });
}
var ScrollArea = React16.forwardRef(({ className, children, ...props }, ref) => /* @__PURE__ */ jsxs(
  ScrollAreaPrimitive.Root,
  {
    ref,
    className: cn("relative overflow-hidden", className),
    ...props,
    children: [
      /* @__PURE__ */ jsx(ScrollAreaPrimitive.Viewport, { className: "h-full w-full rounded-[inherit]", children }),
      /* @__PURE__ */ jsx(ScrollBar, {}),
      /* @__PURE__ */ jsx(ScrollAreaPrimitive.Corner, {})
    ]
  }
));
ScrollArea.displayName = ScrollAreaPrimitive.Root.displayName;
var ScrollBar = React16.forwardRef(({ className, orientation = "vertical", ...props }, ref) => /* @__PURE__ */ jsx(
  ScrollAreaPrimitive.ScrollAreaScrollbar,
  {
    ref,
    orientation,
    className: cn(
      "flex touch-none select-none transition-colors",
      orientation === "vertical" && "h-full w-1.5 border-l border-l-transparent p-[1px]",
      orientation === "horizontal" && "h-1.5 flex-col border-t border-t-transparent p-[1px]",
      className
    ),
    ...props,
    children: /* @__PURE__ */ jsx(
      ScrollAreaPrimitive.ScrollAreaThumb,
      {
        className: "relative flex-1 rounded-full",
        style: { background: "var(--scrollbar-thumb)" }
      }
    )
  }
));
ScrollBar.displayName = ScrollAreaPrimitive.ScrollAreaScrollbar.displayName;
var Collapsible = CollapsiblePrimitive.Root;
var CollapsibleTrigger2 = CollapsiblePrimitive.CollapsibleTrigger;
var CollapsibleContent2 = CollapsiblePrimitive.CollapsibleContent;
function MicrosoftLogo() {
  return /* @__PURE__ */ jsxs("svg", { width: "16", height: "16", viewBox: "0 0 21 21", xmlns: "http://www.w3.org/2000/svg", children: [
    /* @__PURE__ */ jsx("rect", { x: "1", y: "1", width: "9", height: "9", fill: "#f25022" }),
    /* @__PURE__ */ jsx("rect", { x: "11", y: "1", width: "9", height: "9", fill: "#7fba00" }),
    /* @__PURE__ */ jsx("rect", { x: "1", y: "11", width: "9", height: "9", fill: "#00a4ef" }),
    /* @__PURE__ */ jsx("rect", { x: "11", y: "11", width: "9", height: "9", fill: "#ffb900" })
  ] });
}
function LoginPage({
  product,
  onEmailLogin,
  onMfaSubmit,
  onMicrosoftLogin,
  onHubSsoLogin,
  showHubSso = true,
  forgotPasswordHref,
  error: externalError,
  loading: externalLoading = false
}) {
  const [step, setStep] = useState("login");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [mfaCode, setMfaCode] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const isLoading = loading || externalLoading;
  const displayError = error || externalError;
  async function handleEmailSubmit(e) {
    e.preventDefault();
    if (!email || !password) return;
    setError("");
    setLoading(true);
    try {
      await onEmailLogin(email, password);
      if (onMfaSubmit) setStep("mfa");
    } catch (err) {
      setError(err instanceof Error ? err.message : "Login failed. Please try again.");
    } finally {
      setLoading(false);
    }
  }
  async function handleMfaSubmit(e) {
    e.preventDefault();
    if (!mfaCode || !onMfaSubmit) return;
    setError("");
    setLoading(true);
    try {
      await onMfaSubmit(mfaCode);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Invalid code. Please try again.");
    } finally {
      setLoading(false);
    }
  }
  return /* @__PURE__ */ jsxs(
    "div",
    {
      className: "relative flex min-h-screen items-center justify-center overflow-hidden p-4",
      style: { background: "var(--background)" },
      children: [
        /* @__PURE__ */ jsx(
          "div",
          {
            className: "pointer-events-none absolute -top-32 -left-32 h-96 w-96 rounded-full opacity-20 animate-float-slow",
            style: {
              background: `radial-gradient(circle, var(--accent) 0%, transparent 70%)`,
              filter: "blur(80px)"
            }
          }
        ),
        /* @__PURE__ */ jsx(
          "div",
          {
            className: "pointer-events-none absolute -bottom-32 -right-32 h-96 w-96 rounded-full opacity-15 animate-float",
            style: {
              background: `radial-gradient(circle, var(--accent) 0%, transparent 70%)`,
              filter: "blur(100px)",
              animationDelay: "-3s"
            }
          }
        ),
        /* @__PURE__ */ jsx(
          "div",
          {
            className: "pointer-events-none absolute top-0 right-0 h-64 w-64 opacity-8",
            style: {
              background: "radial-gradient(circle at top right, var(--accent), transparent 60%)"
            }
          }
        ),
        /* @__PURE__ */ jsx(
          "div",
          {
            className: "pointer-events-none absolute bottom-0 left-0 h-64 w-64 opacity-8",
            style: {
              background: "radial-gradient(circle at bottom left, var(--accent), transparent 60%)"
            }
          }
        ),
        /* @__PURE__ */ jsxs(
          "div",
          {
            className: "relative z-10 w-full max-w-sm rounded-2xl overflow-hidden",
            style: {
              background: "rgba(255, 255, 255, 0.03)",
              border: "1px solid rgba(255, 255, 255, 0.08)",
              backdropFilter: "blur(24px)",
              boxShadow: "0 25px 50px rgba(0, 0, 0, 0.5)"
            },
            children: [
              /* @__PURE__ */ jsx(
                "div",
                {
                  className: "h-px w-full",
                  style: {
                    background: `linear-gradient(to right, transparent, color-mix(in srgb, var(--accent) 50%, transparent), transparent)`
                  }
                }
              ),
              /* @__PURE__ */ jsxs("div", { className: "p-8", children: [
                /* @__PURE__ */ jsxs("div", { className: "flex flex-col items-center mb-8", children: [
                  /* @__PURE__ */ jsx(
                    "div",
                    {
                      className: "flex h-14 w-14 items-center justify-center rounded-2xl mb-4",
                      style: {
                        background: "var(--glass-bg)",
                        border: "1px solid var(--glass-border)"
                      },
                      children: /* @__PURE__ */ jsx(BirdSymbol, { size: 28 })
                    }
                  ),
                  /* @__PURE__ */ jsx("h1", { className: "text-xl font-bold tracking-tight", style: { color: "var(--foreground)" }, children: product.name }),
                  /* @__PURE__ */ jsx("p", { className: "text-sm mt-1", style: { color: "var(--muted-foreground)" }, children: step === "login" ? "Sign in to your account" : "Two-factor authentication" })
                ] }),
                displayError && /* @__PURE__ */ jsx(
                  "div",
                  {
                    className: "mb-4 rounded-lg px-4 py-3 text-sm",
                    style: {
                      background: "rgba(239, 68, 68, 0.1)",
                      border: "1px solid rgba(239, 68, 68, 0.2)",
                      color: "var(--destructive)"
                    },
                    children: displayError
                  }
                ),
                step === "login" ? /* @__PURE__ */ jsxs(Fragment, { children: [
                  /* @__PURE__ */ jsxs("form", { onSubmit: handleEmailSubmit, className: "space-y-4", children: [
                    /* @__PURE__ */ jsxs("div", { className: "space-y-1.5", children: [
                      /* @__PURE__ */ jsx("label", { className: "text-sm font-medium", style: { color: "var(--foreground)" }, children: "Email" }),
                      /* @__PURE__ */ jsx(
                        Input,
                        {
                          type: "email",
                          placeholder: "you@company.com",
                          value: email,
                          onChange: (e) => setEmail(e.target.value),
                          autoComplete: "email",
                          required: true
                        }
                      )
                    ] }),
                    /* @__PURE__ */ jsxs("div", { className: "space-y-1.5", children: [
                      /* @__PURE__ */ jsxs("div", { className: "flex items-center justify-between", children: [
                        /* @__PURE__ */ jsx("label", { className: "text-sm font-medium", style: { color: "var(--foreground)" }, children: "Password" }),
                        forgotPasswordHref && /* @__PURE__ */ jsx(
                          "a",
                          {
                            href: forgotPasswordHref,
                            className: "text-xs hover:underline",
                            style: { color: "var(--accent)" },
                            children: "Forgot password?"
                          }
                        )
                      ] }),
                      /* @__PURE__ */ jsxs("div", { className: "relative", children: [
                        /* @__PURE__ */ jsx(
                          Input,
                          {
                            type: showPassword ? "text" : "password",
                            placeholder: "\u2022\u2022\u2022\u2022\u2022\u2022\u2022\u2022",
                            value: password,
                            onChange: (e) => setPassword(e.target.value),
                            autoComplete: "current-password",
                            required: true,
                            className: "pr-10"
                          }
                        ),
                        /* @__PURE__ */ jsx(
                          "button",
                          {
                            type: "button",
                            onClick: () => setShowPassword((v) => !v),
                            className: "absolute right-3 top-1/2 -translate-y-1/2",
                            style: { color: "var(--muted-foreground)" },
                            children: showPassword ? /* @__PURE__ */ jsx(EyeOff, { size: 14 }) : /* @__PURE__ */ jsx(Eye, { size: 14 })
                          }
                        )
                      ] })
                    ] }),
                    /* @__PURE__ */ jsx(
                      Button,
                      {
                        type: "submit",
                        className: "w-full",
                        loading: isLoading,
                        disabled: !email || !password,
                        children: "Sign in"
                      }
                    )
                  ] }),
                  (onMicrosoftLogin || showHubSso && onHubSsoLogin) && /* @__PURE__ */ jsxs(Fragment, { children: [
                    /* @__PURE__ */ jsxs("div", { className: "relative my-5", children: [
                      /* @__PURE__ */ jsx("div", { className: "absolute inset-0 flex items-center", children: /* @__PURE__ */ jsx("div", { className: "w-full h-px", style: { background: "var(--glass-border)" } }) }),
                      /* @__PURE__ */ jsx("div", { className: "relative flex justify-center", children: /* @__PURE__ */ jsx(
                        "span",
                        {
                          className: "px-3 text-xs",
                          style: { background: "rgba(9,9,11,0.8)", color: "var(--muted-foreground)" },
                          children: "or continue with"
                        }
                      ) })
                    ] }),
                    /* @__PURE__ */ jsxs("div", { className: "space-y-3", children: [
                      onMicrosoftLogin && /* @__PURE__ */ jsxs(
                        Button,
                        {
                          type: "button",
                          variant: "outline",
                          className: "w-full",
                          onClick: onMicrosoftLogin,
                          disabled: isLoading,
                          children: [
                            /* @__PURE__ */ jsx(MicrosoftLogo, {}),
                            "Sign in with Microsoft"
                          ]
                        }
                      ),
                      showHubSso && onHubSsoLogin && /* @__PURE__ */ jsxs(
                        Button,
                        {
                          type: "button",
                          variant: "outline",
                          className: "w-full",
                          onClick: onHubSsoLogin,
                          disabled: isLoading,
                          children: [
                            /* @__PURE__ */ jsx(BirdSymbol, { size: 14 }),
                            "Sign in with The One Hub"
                          ]
                        }
                      )
                    ] })
                  ] })
                ] }) : /* @__PURE__ */ jsxs("form", { onSubmit: handleMfaSubmit, className: "space-y-4", children: [
                  /* @__PURE__ */ jsx(
                    "div",
                    {
                      className: "flex items-center justify-center mb-2 h-14 w-14 mx-auto rounded-2xl",
                      style: {
                        background: "var(--accent-muted)",
                        border: "1px solid var(--accent-border)"
                      },
                      children: /* @__PURE__ */ jsx(Shield, { size: 24, style: { color: "var(--accent)" } })
                    }
                  ),
                  /* @__PURE__ */ jsxs("div", { className: "space-y-1.5", children: [
                    /* @__PURE__ */ jsx("label", { className: "text-sm font-medium", style: { color: "var(--foreground)" }, children: "Authentication code" }),
                    /* @__PURE__ */ jsx(
                      Input,
                      {
                        type: "text",
                        inputMode: "numeric",
                        pattern: "[0-9]*",
                        maxLength: 6,
                        placeholder: "000000",
                        value: mfaCode,
                        onChange: (e) => setMfaCode(e.target.value.replace(/\D/g, "")),
                        className: "text-center text-lg tracking-widest",
                        autoComplete: "one-time-code",
                        required: true
                      }
                    ),
                    /* @__PURE__ */ jsx("p", { className: "text-xs text-center", style: { color: "var(--muted-foreground)" }, children: "Enter the 6-digit code from your authenticator app" })
                  ] }),
                  /* @__PURE__ */ jsx(
                    Button,
                    {
                      type: "submit",
                      className: "w-full",
                      loading: isLoading,
                      disabled: mfaCode.length !== 6,
                      children: "Verify"
                    }
                  ),
                  /* @__PURE__ */ jsxs(
                    "button",
                    {
                      type: "button",
                      onClick: () => {
                        setStep("login");
                        setMfaCode("");
                        setError("");
                      },
                      className: "flex items-center gap-1.5 w-full justify-center text-sm hover:underline",
                      style: { color: "var(--muted-foreground)" },
                      children: [
                        /* @__PURE__ */ jsx(ArrowLeft, { size: 12 }),
                        "Back to sign in"
                      ]
                    }
                  )
                ] })
              ] })
            ]
          }
        )
      ]
    }
  );
}
function ListPage({
  title,
  description,
  columns,
  data,
  filters,
  actions,
  onRowClick,
  pagination,
  loading = false,
  emptyState,
  className
}) {
  return /* @__PURE__ */ jsxs("div", { className: cn("space-y-4", className), children: [
    /* @__PURE__ */ jsx(PageHeader, { title, description, actions }),
    filters && /* @__PURE__ */ jsx("div", { className: "flex flex-wrap gap-2", children: filters }),
    /* @__PURE__ */ jsx(
      "div",
      {
        className: "rounded-lg overflow-hidden",
        style: {
          background: "var(--surface-1)",
          border: "1px solid var(--border-subtle)"
        },
        children: loading ? /* @__PURE__ */ jsx("div", { className: "p-6 space-y-3", children: Array.from({ length: 5 }).map((_, i) => /* @__PURE__ */ jsx(Skeleton, { className: "h-10 w-full" }, i)) }) : data.length === 0 && emptyState ? /* @__PURE__ */ jsx(
          EmptyState,
          {
            icon: emptyState.icon,
            title: emptyState.title,
            description: emptyState.description,
            action: emptyState.action
          }
        ) : /* @__PURE__ */ jsxs(Table, { children: [
          /* @__PURE__ */ jsx(TableHeader, { children: /* @__PURE__ */ jsx(TableRow, { children: columns.map((col) => /* @__PURE__ */ jsx(TableHead, { className: col.className, children: col.header }, col.key)) }) }),
          /* @__PURE__ */ jsx(TableBody, { children: data.map((row, i) => /* @__PURE__ */ jsx(
            TableRow,
            {
              onClick: onRowClick ? () => onRowClick(row) : void 0,
              className: cn(onRowClick && "cursor-pointer"),
              children: columns.map((col) => /* @__PURE__ */ jsx(TableCell, { className: col.className, children: col.render ? col.render(row) : String(row[col.key] ?? "") }, col.key))
            },
            i
          )) })
        ] })
      }
    ),
    pagination && pagination.totalPages > 1 && /* @__PURE__ */ jsxs("div", { className: "flex items-center justify-between text-sm", style: { color: "var(--muted-foreground)" }, children: [
      /* @__PURE__ */ jsxs("span", { children: [
        "Page ",
        pagination.page,
        " of ",
        pagination.totalPages,
        pagination.total !== void 0 && ` \xB7 ${pagination.total} total`
      ] }),
      /* @__PURE__ */ jsx(Pagination, { children: /* @__PURE__ */ jsxs(PaginationContent, { children: [
        /* @__PURE__ */ jsx(PaginationItem, { children: /* @__PURE__ */ jsx(
          PaginationPrevious,
          {
            onClick: () => pagination.onPageChange(pagination.page - 1),
            disabled: pagination.page <= 1
          }
        ) }),
        Array.from({ length: Math.min(pagination.totalPages, 7) }, (_, i) => {
          const p = i + 1;
          return /* @__PURE__ */ jsx(PaginationItem, { children: /* @__PURE__ */ jsx(
            PaginationLink,
            {
              isActive: p === pagination.page,
              onClick: () => pagination.onPageChange(p),
              children: p
            }
          ) }, p);
        }),
        pagination.totalPages > 7 && /* @__PURE__ */ jsx(PaginationItem, { children: /* @__PURE__ */ jsx(PaginationEllipsis, {}) }),
        /* @__PURE__ */ jsx(PaginationItem, { children: /* @__PURE__ */ jsx(
          PaginationNext,
          {
            onClick: () => pagination.onPageChange(pagination.page + 1),
            disabled: pagination.page >= pagination.totalPages
          }
        ) })
      ] }) })
    ] })
  ] });
}
function DetailPage({
  breadcrumbs,
  title,
  subtitle,
  actions,
  badge,
  sections,
  children,
  loading = false,
  className
}) {
  if (loading) {
    return /* @__PURE__ */ jsxs("div", { className: cn("space-y-6", className), children: [
      /* @__PURE__ */ jsx(Skeleton, { className: "h-4 w-48" }),
      /* @__PURE__ */ jsxs("div", { className: "space-y-2", children: [
        /* @__PURE__ */ jsx(Skeleton, { className: "h-8 w-64" }),
        /* @__PURE__ */ jsx(Skeleton, { className: "h-4 w-96" })
      ] }),
      /* @__PURE__ */ jsx("div", { className: "grid grid-cols-1 gap-4 md:grid-cols-2", children: [1, 2, 3, 4].map((i) => /* @__PURE__ */ jsx(Skeleton, { className: "h-32 w-full rounded-lg" }, i)) })
    ] });
  }
  return /* @__PURE__ */ jsxs("div", { className: cn("space-y-6", className), children: [
    breadcrumbs && breadcrumbs.length > 0 && /* @__PURE__ */ jsx(Breadcrumb, { children: /* @__PURE__ */ jsx(BreadcrumbList, { children: breadcrumbs.map((crumb, i) => /* @__PURE__ */ jsxs(React16.Fragment, { children: [
      i > 0 && /* @__PURE__ */ jsx(BreadcrumbSeparator, {}),
      /* @__PURE__ */ jsx(BreadcrumbItem, { children: i === breadcrumbs.length - 1 ? /* @__PURE__ */ jsx(BreadcrumbPage, { children: crumb.label }) : crumb.href ? /* @__PURE__ */ jsx(BreadcrumbLink, { href: crumb.href, children: crumb.label }) : /* @__PURE__ */ jsx("span", { style: { color: "var(--muted-foreground)" }, children: crumb.label }) })
    ] }, i)) }) }),
    /* @__PURE__ */ jsxs("div", { className: "flex items-start justify-between gap-4", children: [
      /* @__PURE__ */ jsxs("div", { className: "space-y-1", children: [
        /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-3", children: [
          /* @__PURE__ */ jsx("h1", { className: "text-2xl font-bold tracking-tight", style: { color: "var(--foreground)" }, children: title }),
          badge
        ] }),
        subtitle && /* @__PURE__ */ jsx("p", { className: "text-sm", style: { color: "var(--muted-foreground)" }, children: subtitle })
      ] }),
      actions && /* @__PURE__ */ jsx("div", { className: "flex items-center gap-2 shrink-0", children: actions })
    ] }),
    sections?.map((section, i) => /* @__PURE__ */ jsxs("div", { children: [
      section.title && /* @__PURE__ */ jsx(
        "h2",
        {
          className: "text-base font-semibold mb-3",
          style: { color: "var(--foreground)", borderBottom: "1px solid var(--border-subtle)", paddingBottom: "0.5rem" },
          children: section.title
        }
      ),
      section.content
    ] }, i)),
    children
  ] });
}
function SettingsPage({
  title = "Settings",
  navigation,
  defaultSection,
  renderSection,
  className
}) {
  const allItems = navigation.flatMap((s) => s.items);
  const [activeId, setActiveId] = useState(defaultSection ?? allItems[0]?.id ?? "");
  return /* @__PURE__ */ jsxs("div", { className: cn("flex gap-8 h-full", className), children: [
    /* @__PURE__ */ jsxs("aside", { className: "w-56 shrink-0", children: [
      title && /* @__PURE__ */ jsx(
        "h2",
        {
          className: "text-base font-semibold mb-4",
          style: { color: "var(--foreground)" },
          children: title
        }
      ),
      /* @__PURE__ */ jsx("nav", { className: "space-y-4", children: navigation.map((section, si) => /* @__PURE__ */ jsxs("div", { children: [
        section.group && /* @__PURE__ */ jsx(
          "p",
          {
            className: "text-xs font-semibold uppercase tracking-wider mb-1.5 px-3",
            style: { color: "var(--muted-foreground)" },
            children: section.group
          }
        ),
        /* @__PURE__ */ jsx("div", { className: "space-y-0.5", children: section.items.map((item) => /* @__PURE__ */ jsxs(
          "button",
          {
            type: "button",
            onClick: () => setActiveId(item.id),
            className: cn(
              "w-full flex items-center gap-2 rounded-md px-3 py-2 text-sm font-medium text-left",
              "transition-all duration-150"
            ),
            style: activeId === item.id ? {
              background: "var(--accent-muted)",
              border: "1px solid var(--accent-border)",
              color: "var(--accent)"
            } : {
              border: "1px solid transparent",
              color: "var(--muted-foreground)"
            },
            children: [
              item.icon && /* @__PURE__ */ jsx("span", { className: "shrink-0", children: item.icon }),
              item.label
            ]
          },
          item.id
        )) })
      ] }, si)) })
    ] }),
    /* @__PURE__ */ jsx("main", { className: "flex-1 min-w-0", children: renderSection(activeId) })
  ] });
}

// src/motion/presets.ts
var MOTION = {
  page: {
    initial: { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0 },
    exit: { opacity: 0 },
    transition: { duration: 0.2, ease: "easeOut" }
  },
  stagger: {
    staggerChildren: 0.03
  },
  card: {
    whileHover: { y: -2, transition: { duration: 0.2 } }
  },
  press: {
    whileTap: { scale: 0.97 }
  },
  fadeIn: {
    initial: { opacity: 0 },
    animate: { opacity: 1 },
    transition: { duration: 0.3 }
  },
  slideUp: {
    initial: { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0 }
  },
  popIn: {
    initial: { scale: 0, opacity: 0 },
    animate: { scale: 1, opacity: 1 },
    transition: { type: "spring", stiffness: 300, damping: 20 }
  }
};
var staggerContainer = {
  hidden: {},
  show: {
    transition: { staggerChildren: 0.03 }
  }
};
var staggerItem = {
  hidden: { opacity: 0, y: 12 },
  show: { opacity: 1, y: 0, transition: { duration: 0.2, ease: "easeOut" } }
};
function useReducedMotion() {
  const [reduced, setReduced] = useState(() => {
    if (typeof window === "undefined") return false;
    return window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  });
  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    const handler = (e) => setReduced(e.matches);
    mq.addEventListener("change", handler);
    return () => mq.removeEventListener("change", handler);
  }, []);
  return reduced;
}
var offsets = {
  up: { x: 0, y: 20 },
  down: { x: 0, y: -20 },
  left: { x: 20, y: 0 },
  right: { x: -20, y: 0 }
};
function AnimatedPage({
  children,
  direction = "up",
  duration = 0.2,
  className
}) {
  const reduced = useReducedMotion();
  const offset = offsets[direction];
  if (reduced) {
    return /* @__PURE__ */ jsx("div", { className, children });
  }
  return /* @__PURE__ */ jsx(
    motion.div,
    {
      initial: { opacity: 0, x: offset.x, y: offset.y },
      animate: { opacity: 1, x: 0, y: 0 },
      exit: { opacity: 0 },
      transition: { duration, ease: "easeOut" },
      className,
      children
    }
  );
}
function easeOutCubic(t) {
  return 1 - Math.pow(1 - t, 3);
}
function AnimatedNumber({
  value,
  duration = 1,
  decimals = 0,
  prefix = "",
  suffix = "",
  className
}) {
  const reduced = useReducedMotion();
  const [display, setDisplay] = useState(reduced ? value : 0);
  const [hasAnimated, setHasAnimated] = useState(false);
  const ref = useRef(null);
  const rafRef = useRef(0);
  const formatNumber = useCallback(
    (n) => {
      return n.toLocaleString(void 0, {
        minimumFractionDigits: decimals,
        maximumFractionDigits: decimals
      });
    },
    [decimals]
  );
  useEffect(() => {
    if (reduced || hasAnimated) {
      setDisplay(value);
      return;
    }
    const el = ref.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          observer.disconnect();
          setHasAnimated(true);
          const start = performance.now();
          const durationMs = duration * 1e3;
          const tick = (now) => {
            const elapsed = now - start;
            const progress = Math.min(elapsed / durationMs, 1);
            const eased = easeOutCubic(progress);
            setDisplay(eased * value);
            if (progress < 1) {
              rafRef.current = requestAnimationFrame(tick);
            } else {
              setDisplay(value);
            }
          };
          rafRef.current = requestAnimationFrame(tick);
        }
      },
      { threshold: 0.1 }
    );
    observer.observe(el);
    return () => {
      observer.disconnect();
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
    };
  }, [value, duration, reduced, hasAnimated]);
  useEffect(() => {
    if (hasAnimated) setDisplay(value);
  }, [value, hasAnimated]);
  return /* @__PURE__ */ jsxs("span", { ref, className, children: [
    prefix,
    formatNumber(display),
    suffix
  ] });
}
function SkeletonText({ lines = 3, className }) {
  return /* @__PURE__ */ jsx("div", { className: cn("space-y-2", className), children: Array.from({ length: lines }, (_, i) => /* @__PURE__ */ jsx(
    "div",
    {
      className: "skeleton-shimmer rounded",
      style: {
        height: "0.875rem",
        width: i === lines - 1 ? "66%" : "100%"
      }
    },
    i
  )) });
}
function SkeletonCard({ className }) {
  return /* @__PURE__ */ jsxs(
    "div",
    {
      className: cn("rounded-lg p-6 space-y-4", className),
      style: {
        background: "var(--glass-bg)",
        border: "1px solid var(--glass-border)"
      },
      children: [
        /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-3", children: [
          /* @__PURE__ */ jsx("div", { className: "skeleton-shimmer rounded-full", style: { width: 40, height: 40 } }),
          /* @__PURE__ */ jsxs("div", { className: "flex-1 space-y-2", children: [
            /* @__PURE__ */ jsx("div", { className: "skeleton-shimmer rounded", style: { height: "0.875rem", width: "50%" } }),
            /* @__PURE__ */ jsx("div", { className: "skeleton-shimmer rounded", style: { height: "0.75rem", width: "30%" } })
          ] })
        ] }),
        /* @__PURE__ */ jsxs("div", { className: "space-y-2", children: [
          /* @__PURE__ */ jsx("div", { className: "skeleton-shimmer rounded", style: { height: "0.875rem", width: "100%" } }),
          /* @__PURE__ */ jsx("div", { className: "skeleton-shimmer rounded", style: { height: "0.875rem", width: "90%" } }),
          /* @__PURE__ */ jsx("div", { className: "skeleton-shimmer rounded", style: { height: "0.875rem", width: "66%" } })
        ] }),
        /* @__PURE__ */ jsxs("div", { className: "flex gap-2 pt-2", children: [
          /* @__PURE__ */ jsx("div", { className: "skeleton-shimmer rounded", style: { height: "2rem", width: "5rem" } }),
          /* @__PURE__ */ jsx("div", { className: "skeleton-shimmer rounded", style: { height: "2rem", width: "5rem" } })
        ] })
      ]
    }
  );
}
function SkeletonTable({ rows = 5, columns = 4, className }) {
  return /* @__PURE__ */ jsxs("div", { className: cn("w-full", className), children: [
    /* @__PURE__ */ jsx(
      "div",
      {
        className: "flex gap-4 px-4 py-3 mb-1",
        style: { borderBottom: "1px solid var(--glass-border)" },
        children: Array.from({ length: columns }, (_, i) => /* @__PURE__ */ jsx(
          "div",
          {
            className: "skeleton-shimmer rounded flex-1",
            style: { height: "0.75rem" }
          },
          `h-${i}`
        ))
      }
    ),
    Array.from({ length: rows }, (_, r) => /* @__PURE__ */ jsx(
      "div",
      {
        className: "flex gap-4 px-4 py-3",
        style: { borderBottom: "1px solid var(--glass-border)" },
        children: Array.from({ length: columns }, (_2, c) => /* @__PURE__ */ jsx(
          "div",
          {
            className: "skeleton-shimmer rounded flex-1",
            style: { height: "0.875rem" }
          },
          `${r}-${c}`
        ))
      },
      r
    ))
  ] });
}
function SkeletonAvatar({ size = 40, className }) {
  return /* @__PURE__ */ jsx(
    "div",
    {
      className: cn("skeleton-shimmer rounded-full", className),
      style: { width: size, height: size }
    }
  );
}
function AnimatedEmptyState({
  icon: Icon2,
  title,
  description,
  action,
  className
}) {
  const reduced = useReducedMotion();
  const iconAnimation = reduced ? {} : {
    animate: {
      y: [0, -6, 0],
      transition: { duration: 3, repeat: Infinity, ease: "easeInOut" }
    }
  };
  return /* @__PURE__ */ jsxs(
    "div",
    {
      className: cn(
        "flex flex-col items-center justify-center py-16 px-8 text-center",
        className
      ),
      children: [
        /* @__PURE__ */ jsx(
          motion.div,
          {
            className: "flex h-16 w-16 items-center justify-center rounded-2xl mb-5",
            style: {
              background: "rgba(113, 113, 122, 0.1)",
              border: "1px solid rgba(113, 113, 122, 0.2)"
            },
            ...iconAnimation,
            children: /* @__PURE__ */ jsx(Icon2, { size: 28, style: { color: "rgb(113, 113, 122)" } })
          }
        ),
        /* @__PURE__ */ jsx(
          "h3",
          {
            className: "text-base font-semibold mb-2",
            style: { color: "var(--foreground)" },
            children: title
          }
        ),
        description && /* @__PURE__ */ jsx(
          "p",
          {
            className: "text-sm max-w-xs mb-6",
            style: { color: "var(--muted-foreground)" },
            children: description
          }
        ),
        action
      ]
    }
  );
}
var AnimatedButton = React16.forwardRef(
  ({
    className,
    variant,
    size,
    loading = false,
    success = false,
    successDuration = 1500,
    disabled,
    children,
    ...props
  }, ref) => {
    const reduced = useReducedMotion();
    const [state, setState] = useState("idle");
    const widthRef = useRef(null);
    const [minWidth, setMinWidth] = useState();
    useEffect(() => {
      const el = widthRef.current ?? ref?.current;
      if (el && state === "idle") {
        setMinWidth(el.offsetWidth);
      }
    }, [children, ref, state]);
    useEffect(() => {
      if (success) {
        setState("success");
        const t = setTimeout(() => setState("idle"), successDuration);
        return () => clearTimeout(t);
      } else if (loading) {
        setState("loading");
      } else {
        setState("idle");
      }
    }, [loading, success, successDuration]);
    const tapProps = reduced ? {} : {
      whileTap: disabled || state !== "idle" ? void 0 : { scale: 0.97 }
    };
    return /* @__PURE__ */ jsx(
      motion.button,
      {
        ref: ref ?? widthRef,
        className: cn(buttonVariants({ variant, size }), className),
        disabled: disabled || state === "loading",
        style: {
          "--tw-ring-color": "var(--ring)",
          minWidth: minWidth ? `${minWidth}px` : void 0
        },
        transition: { type: "spring", stiffness: 400, damping: 25 },
        ...tapProps,
        ...props,
        children: /* @__PURE__ */ jsxs(AnimatePresence, { mode: "wait", initial: false, children: [
          state === "loading" && /* @__PURE__ */ jsx(
            motion.span,
            {
              initial: reduced ? {} : { opacity: 0 },
              animate: { opacity: 1 },
              exit: reduced ? {} : { opacity: 0 },
              transition: { duration: 0.15 },
              className: "flex items-center gap-2",
              children: /* @__PURE__ */ jsxs(
                "svg",
                {
                  className: "animate-spin h-4 w-4",
                  xmlns: "http://www.w3.org/2000/svg",
                  fill: "none",
                  viewBox: "0 0 24 24",
                  "aria-hidden": "true",
                  children: [
                    /* @__PURE__ */ jsx("circle", { className: "opacity-25", cx: "12", cy: "12", r: "10", stroke: "currentColor", strokeWidth: "4" }),
                    /* @__PURE__ */ jsx("path", { className: "opacity-75", fill: "currentColor", d: "M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" })
                  ]
                }
              )
            },
            "loading"
          ),
          state === "success" && /* @__PURE__ */ jsx(
            motion.span,
            {
              initial: reduced ? {} : { opacity: 0, scale: 0.5 },
              animate: { opacity: 1, scale: 1 },
              exit: reduced ? {} : { opacity: 0, scale: 0.5 },
              transition: { duration: 0.2 },
              children: /* @__PURE__ */ jsx("svg", { width: "16", height: "16", viewBox: "0 0 16 16", fill: "none", "aria-hidden": "true", children: /* @__PURE__ */ jsx(
                motion.path,
                {
                  d: "M3 8.5L6.5 12L13 4",
                  stroke: "currentColor",
                  strokeWidth: "2",
                  strokeLinecap: "round",
                  strokeLinejoin: "round",
                  initial: reduced ? {} : { pathLength: 0 },
                  animate: { pathLength: 1 },
                  transition: { duration: 0.3 }
                }
              ) })
            },
            "success"
          ),
          state === "idle" && /* @__PURE__ */ jsx(
            motion.span,
            {
              initial: reduced ? {} : { opacity: 0 },
              animate: { opacity: 1 },
              exit: reduced ? {} : { opacity: 0 },
              transition: { duration: 0.15 },
              children
            },
            "idle"
          )
        ] })
      }
    );
  }
);
AnimatedButton.displayName = "AnimatedButton";
var GlassCard = React16.forwardRef(
  ({ className, hover = false, accent, children, style, onClick }, ref) => {
    const reduced = useReducedMotion();
    const baseStyle = {
      background: "var(--glass-bg)",
      border: "1px solid var(--glass-border)",
      backdropFilter: "blur(16px)",
      color: "var(--foreground)",
      transition: "all 0.2s ease",
      ...style
    };
    if (!hover || reduced) {
      return /* @__PURE__ */ jsxs(
        "div",
        {
          ref,
          className: cn("rounded-lg", className),
          style: baseStyle,
          onClick,
          children: [
            accent && /* @__PURE__ */ jsx(
              "div",
              {
                className: "h-[2px] rounded-t-lg",
                style: { background: accent, opacity: 0.4 }
              }
            ),
            children
          ]
        }
      );
    }
    return /* @__PURE__ */ jsxs(
      motion.div,
      {
        ref,
        className: cn("rounded-lg", className),
        style: baseStyle,
        whileHover: {
          y: -2,
          boxShadow: accent ? `0 8px 30px ${accent}20, 0 4px 12px rgba(0,0,0,0.3)` : "0 8px 30px rgba(0,0,0,0.3)",
          borderColor: "rgba(255,255,255,0.1)"
        },
        transition: { duration: 0.2 },
        onClick,
        children: [
          accent && /* @__PURE__ */ jsx(
            motion.div,
            {
              className: "h-[2px] rounded-t-lg",
              style: { background: accent, opacity: 0.4 },
              whileHover: { opacity: 0.8 }
            }
          ),
          children
        ]
      }
    );
  }
);
GlassCard.displayName = "GlassCard";
function AnimatedList({
  children,
  className,
  staggerDelay = 0.03
}) {
  const reduced = useReducedMotion();
  if (reduced) {
    return /* @__PURE__ */ jsx("div", { className, children });
  }
  return /* @__PURE__ */ jsx(
    motion.div,
    {
      className,
      initial: "hidden",
      animate: "show",
      variants: {
        hidden: {},
        show: { transition: { staggerChildren: staggerDelay } }
      },
      children: /* @__PURE__ */ jsx(AnimatePresence, { initial: false, children })
    }
  );
}
function AnimatedListItem({
  children,
  className,
  layoutId
}) {
  const reduced = useReducedMotion();
  if (reduced) {
    return /* @__PURE__ */ jsx("div", { className, children });
  }
  return /* @__PURE__ */ jsx(
    motion.div,
    {
      className,
      layout: true,
      layoutId,
      variants: {
        hidden: { opacity: 0, y: 12 },
        show: { opacity: 1, y: 0, transition: { duration: 0.2, ease: "easeOut" } }
      },
      initial: "hidden",
      animate: "show",
      exit: { opacity: 0, y: -12, transition: { duration: 0.15 } },
      children
    }
  );
}
function AnimatedModal({
  open,
  onClose,
  children,
  className
}) {
  const reduced = useReducedMotion();
  const contentRef = useRef(null);
  const previousFocusRef = useRef(null);
  const handleKeyDown = useCallback(
    (e) => {
      if (e.key === "Escape") {
        onClose();
        return;
      }
      if (e.key === "Tab" && contentRef.current) {
        const focusable = contentRef.current.querySelectorAll(
          'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
        );
        if (focusable.length === 0) return;
        const first = focusable[0];
        const last = focusable[focusable.length - 1];
        if (e.shiftKey) {
          if (document.activeElement === first) {
            e.preventDefault();
            last.focus();
          }
        } else {
          if (document.activeElement === last) {
            e.preventDefault();
            first.focus();
          }
        }
      }
    },
    [onClose]
  );
  useEffect(() => {
    if (open) {
      previousFocusRef.current = document.activeElement;
      document.addEventListener("keydown", handleKeyDown);
      requestAnimationFrame(() => {
        const first = contentRef.current?.querySelector(
          'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
        );
        if (first) first.focus();
        else contentRef.current?.focus();
      });
    }
    return () => {
      document.removeEventListener("keydown", handleKeyDown);
      if (!open) previousFocusRef.current?.focus();
    };
  }, [open, handleKeyDown]);
  useEffect(() => {
    if (open) {
      const prev = document.body.style.overflow;
      document.body.style.overflow = "hidden";
      return () => {
        document.body.style.overflow = prev;
      };
    }
  }, [open]);
  return /* @__PURE__ */ jsx(AnimatePresence, { children: open && /* @__PURE__ */ jsxs("div", { className: "fixed inset-0 z-50 flex items-center justify-center", children: [
    /* @__PURE__ */ jsx(
      motion.div,
      {
        className: "absolute inset-0",
        style: { background: "rgba(0, 0, 0, 0.6)", backdropFilter: "blur(4px)" },
        initial: reduced ? {} : { opacity: 0 },
        animate: { opacity: 1 },
        exit: reduced ? {} : { opacity: 0 },
        transition: { duration: 0.15 },
        onClick: onClose,
        "aria-hidden": "true"
      }
    ),
    /* @__PURE__ */ jsx(
      motion.div,
      {
        ref: contentRef,
        role: "dialog",
        "aria-modal": "true",
        tabIndex: -1,
        className: cn(
          "relative z-10 rounded-lg p-6 max-w-lg w-full mx-4 outline-none",
          className
        ),
        style: {
          background: "var(--surface-2)",
          border: "1px solid var(--glass-border)",
          color: "var(--foreground)"
        },
        initial: reduced ? {} : { opacity: 0, scale: 0.95 },
        animate: { opacity: 1, scale: 1 },
        exit: reduced ? {} : { opacity: 0, scale: 0.95 },
        transition: { duration: 0.15 },
        children
      }
    )
  ] }) });
}
var ToastContext = createContext(null);
function useToast() {
  const ctx = useContext(ToastContext);
  if (!ctx) throw new Error("useToast must be used within <ToastProvider>");
  return ctx;
}
var typeStyles = {
  success: { bg: "rgba(16, 185, 129, 0.1)", border: "rgba(16, 185, 129, 0.2)", icon: "#10b981" },
  error: { bg: "rgba(239, 68, 68, 0.1)", border: "rgba(239, 68, 68, 0.2)", icon: "#ef4444" },
  info: { bg: "rgba(59, 130, 246, 0.1)", border: "rgba(59, 130, 246, 0.2)", icon: "#3b82f6" },
  warning: { bg: "rgba(245, 158, 11, 0.1)", border: "rgba(245, 158, 11, 0.2)", icon: "#f59e0b" }
};
function ToastIcon({ type, reduced }) {
  const color = typeStyles[type].icon;
  if (type === "success") {
    return /* @__PURE__ */ jsxs("svg", { width: "18", height: "18", viewBox: "0 0 18 18", fill: "none", children: [
      /* @__PURE__ */ jsx("circle", { cx: "9", cy: "9", r: "8", stroke: color, strokeWidth: "1.5", opacity: "0.3" }),
      /* @__PURE__ */ jsx(
        motion.path,
        {
          d: "M5.5 9.5L7.5 11.5L12.5 6.5",
          stroke: color,
          strokeWidth: "2",
          strokeLinecap: "round",
          strokeLinejoin: "round",
          initial: reduced ? {} : { pathLength: 0 },
          animate: { pathLength: 1 },
          transition: { duration: 0.4, delay: 0.1 }
        }
      )
    ] });
  }
  if (type === "error") {
    return /* @__PURE__ */ jsxs(
      motion.svg,
      {
        width: "18",
        height: "18",
        viewBox: "0 0 18 18",
        fill: "none",
        animate: reduced ? {} : { x: [0, -2, 2, -1, 1, 0] },
        transition: { duration: 0.4 },
        children: [
          /* @__PURE__ */ jsx("circle", { cx: "9", cy: "9", r: "8", stroke: color, strokeWidth: "1.5", opacity: "0.3" }),
          /* @__PURE__ */ jsx("path", { d: "M6.5 6.5L11.5 11.5M11.5 6.5L6.5 11.5", stroke: color, strokeWidth: "2", strokeLinecap: "round" })
        ]
      }
    );
  }
  if (type === "warning") {
    return /* @__PURE__ */ jsxs("svg", { width: "18", height: "18", viewBox: "0 0 18 18", fill: "none", children: [
      /* @__PURE__ */ jsx("path", { d: "M9 2L16.5 15.5H1.5L9 2Z", stroke: color, strokeWidth: "1.5", opacity: "0.3" }),
      /* @__PURE__ */ jsx("path", { d: "M9 7V10", stroke: color, strokeWidth: "2", strokeLinecap: "round" }),
      /* @__PURE__ */ jsx("circle", { cx: "9", cy: "12.5", r: "1", fill: color })
    ] });
  }
  return /* @__PURE__ */ jsxs("svg", { width: "18", height: "18", viewBox: "0 0 18 18", fill: "none", children: [
    /* @__PURE__ */ jsx("circle", { cx: "9", cy: "9", r: "8", stroke: color, strokeWidth: "1.5", opacity: "0.3" }),
    /* @__PURE__ */ jsx("path", { d: "M9 8V12.5", stroke: color, strokeWidth: "2", strokeLinecap: "round" }),
    /* @__PURE__ */ jsx("circle", { cx: "9", cy: "5.5", r: "1", fill: color })
  ] });
}
function ToastProgressBar({ duration, color }) {
  return /* @__PURE__ */ jsx("div", { className: "absolute bottom-0 left-0 right-0 h-[2px] overflow-hidden rounded-b-lg", children: /* @__PURE__ */ jsx(
    motion.div,
    {
      className: "h-full",
      style: { background: color },
      initial: { width: "100%" },
      animate: { width: "0%" },
      transition: { duration: duration / 1e3, ease: "linear" }
    }
  ) });
}
function ToastProvider({ children }) {
  const reduced = useReducedMotion();
  const [toasts, setToasts] = useState([]);
  const idRef = useRef(0);
  const timersRef = useRef(/* @__PURE__ */ new Map());
  const removeToast = useCallback((id) => {
    setToasts((prev) => prev.filter((t) => t.id !== id));
    const timer = timersRef.current.get(id);
    if (timer) {
      clearTimeout(timer);
      timersRef.current.delete(id);
    }
  }, []);
  const addToast = useCallback(
    (opts) => {
      const id = `toast-${++idRef.current}`;
      const duration = opts.duration ?? 4e3;
      const item = { ...opts, id, duration };
      setToasts((prev) => {
        const next = [...prev, item];
        return next.slice(-3);
      });
      const timer = setTimeout(() => removeToast(id), duration);
      timersRef.current.set(id, timer);
    },
    [removeToast]
  );
  useEffect(() => {
    return () => {
      timersRef.current.forEach((t) => clearTimeout(t));
    };
  }, []);
  const ctx = {
    toast: addToast,
    success: (title, description) => addToast({ type: "success", title, description }),
    error: (title, description) => addToast({ type: "error", title, description }),
    info: (title, description) => addToast({ type: "info", title, description }),
    warning: (title, description) => addToast({ type: "warning", title, description })
  };
  return /* @__PURE__ */ jsxs(ToastContext.Provider, { value: ctx, children: [
    children,
    /* @__PURE__ */ jsx("div", { className: "fixed top-4 right-4 z-[100] flex flex-col gap-2 pointer-events-none", style: { maxWidth: 380 }, children: /* @__PURE__ */ jsx(AnimatePresence, { initial: false, children: toasts.map((t) => {
      const styles = typeStyles[t.type];
      return /* @__PURE__ */ jsxs(
        motion.div,
        {
          layout: true,
          initial: reduced ? {} : { opacity: 0, x: 80, scale: 0.95 },
          animate: { opacity: 1, x: 0, scale: 1 },
          exit: reduced ? {} : { opacity: 0, x: 80, scale: 0.95 },
          transition: { duration: 0.2, ease: "easeOut" },
          className: "relative rounded-lg px-4 py-3 pointer-events-auto cursor-pointer overflow-hidden",
          style: {
            background: styles.bg,
            border: `1px solid ${styles.border}`,
            backdropFilter: "blur(16px)",
            color: "var(--foreground)"
          },
          onClick: () => removeToast(t.id),
          children: [
            /* @__PURE__ */ jsxs("div", { className: "flex items-start gap-3", children: [
              /* @__PURE__ */ jsx("div", { className: "flex-shrink-0 mt-0.5", children: /* @__PURE__ */ jsx(ToastIcon, { type: t.type, reduced }) }),
              /* @__PURE__ */ jsxs("div", { className: "flex-1 min-w-0", children: [
                /* @__PURE__ */ jsx("p", { className: "text-sm font-medium", children: t.title }),
                t.description && /* @__PURE__ */ jsx("p", { className: "text-xs mt-0.5", style: { color: "var(--muted-foreground)" }, children: t.description })
              ] })
            ] }),
            /* @__PURE__ */ jsx(ToastProgressBar, { duration: t.duration ?? 4e3, color: styles.icon })
          ]
        },
        t.id
      );
    }) }) })
  ] });
}
function useHoverGlow(accentColor) {
  const reduced = useReducedMotion();
  const [hovered, setHovered] = useState(false);
  const style = useMemo(() => {
    if (reduced || !hovered) return {};
    return {
      boxShadow: `0 0 20px ${accentColor}30, 0 0 40px ${accentColor}15`,
      borderColor: `${accentColor}40`,
      transition: "box-shadow 0.2s ease, border-color 0.2s ease"
    };
  }, [reduced, hovered, accentColor]);
  return {
    style,
    onMouseEnter: () => setHovered(true),
    onMouseLeave: () => setHovered(false)
  };
}
function usePressScale(scale = 0.97) {
  const reduced = useReducedMotion();
  if (reduced) return {};
  return { whileTap: { scale } };
}
function useRevealOnScroll(options = {}) {
  const ref = useRef(null);
  const reduced = useReducedMotion();
  const [revealed, setRevealed] = useState(reduced);
  useEffect(() => {
    if (reduced) {
      setRevealed(true);
      return;
    }
    const el = ref.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setRevealed(true);
          observer.disconnect();
        }
      },
      { threshold: options.threshold ?? 0.1, rootMargin: options.rootMargin }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, [reduced, options.threshold, options.rootMargin]);
  const style = useMemo(() => {
    if (reduced) return {};
    return {
      opacity: revealed ? 1 : 0,
      transform: revealed ? "translateY(0)" : "translateY(20px)",
      transition: "opacity 0.4s ease-out, transform 0.4s ease-out"
    };
  }, [reduced, revealed]);
  return { ref, style, revealed };
}

export { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogOverlay, AlertDialogPortal, AlertDialogTitle, AlertDialogTrigger, AnimatedButton, AnimatedEmptyState, AnimatedList, AnimatedListItem, AnimatedModal, AnimatedNumber, AnimatedPage, AppShell, Avatar, AvatarFallback, AvatarImage, Badge, BirdSymbol, Breadcrumb, BreadcrumbEllipsis, BreadcrumbItem, BreadcrumbLink, BreadcrumbList, BreadcrumbPage, BreadcrumbSeparator, Button, Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle, Checkbox, Collapsible, CollapsibleContent2 as CollapsibleContent, CollapsibleTrigger2 as CollapsibleTrigger, Command, CommandEmpty, CommandGroup, CommandInput, CommandItem, CommandList, CommandSeparator, CommandShortcut, DatePicker, DetailPage, Dialog, DialogClose, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogOverlay, DialogPortal, DialogTitle, DialogTrigger, DropdownMenu, DropdownMenuCheckboxItem, DropdownMenuContent, DropdownMenuGroup, DropdownMenuItem, DropdownMenuLabel, DropdownMenuPortal, DropdownMenuRadioGroup, DropdownMenuRadioItem, DropdownMenuSeparator, DropdownMenuShortcut, DropdownMenuSub, DropdownMenuSubContent, DropdownMenuSubTrigger, DropdownMenuTrigger, EmptyState, FaviconHead, Form, FormField, GlassCard, Input, Label2 as Label, ListPage, LoginPage, MOTION, MobileNav, NavGroup, NavItem, PageHeader, Pagination, PaginationContent, PaginationEllipsis, PaginationItem, PaginationLink, PaginationNext, PaginationPrevious, Popover, PopoverAnchor, PopoverContent, PopoverTrigger, ProductLogo, Progress, RadioGroup, RadioGroupItem, ScrollArea, ScrollBar, Select, SelectContent, SelectGroup, SelectItem, SelectLabel, SelectScrollDownButton, SelectScrollUpButton, SelectSeparator, SelectTrigger, SelectValue, Separator3 as Separator, SettingsPage, Sheet, SheetClose, SheetContent, SheetDescription, SheetFooter, SheetHeader, SheetOverlay, SheetPortal, SheetTitle, SheetTrigger, Sidebar, Skeleton, SkeletonAvatar, SkeletonCard, SkeletonTable, SkeletonText, Spinner, StatCard, Switch, Table, TableBody, TableCaption, TableCell, TableFooter, TableHead, TableHeader, TableRow, Tabs, TabsContent, TabsList, TabsTrigger, TenantSwitcher, Textarea, TheOneBadge, ToastProvider, Toaster, Tooltip, TooltipContent, TooltipProvider, TooltipTrigger, TopBar, UserMenu, badgeVariants, buttonVariants, cn, setAccent, staggerContainer, staggerItem, uiPreset, useFormField, useHoverGlow, usePressScale, useReducedMotion, useRevealOnScroll, useToast };
