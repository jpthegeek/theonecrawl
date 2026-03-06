import { ClassValue } from 'clsx';
import { VariantProps } from 'class-variance-authority';
export { VariantProps, cva, cx } from 'class-variance-authority';
import * as react_jsx_runtime from 'react/jsx-runtime';
import React from 'react';
import { LucideIcon } from 'lucide-react';
import * as class_variance_authority_types from 'class-variance-authority/types';
import * as SelectPrimitive from '@radix-ui/react-select';
import * as CheckboxPrimitive from '@radix-ui/react-checkbox';
import * as SwitchPrimitive from '@radix-ui/react-switch';
import * as RadioGroupPrimitive from '@radix-ui/react-radio-group';
import * as LabelPrimitive from '@radix-ui/react-label';
import * as SeparatorPrimitive from '@radix-ui/react-separator';
import * as ProgressPrimitive from '@radix-ui/react-progress';
export { toast } from 'sonner';
import * as DialogPrimitive from '@radix-ui/react-dialog';
import * as AlertDialogPrimitive from '@radix-ui/react-alert-dialog';
import * as DropdownMenuPrimitive from '@radix-ui/react-dropdown-menu';
import * as PopoverPrimitive from '@radix-ui/react-popover';
import * as TooltipPrimitive from '@radix-ui/react-tooltip';
import * as AvatarPrimitive from '@radix-ui/react-avatar';
import * as TabsPrimitive from '@radix-ui/react-tabs';
import * as ScrollAreaPrimitive from '@radix-ui/react-scroll-area';
import * as CollapsiblePrimitive from '@radix-ui/react-collapsible';

/**
 * setAccent — sets the product accent color as CSS custom properties on :root.
 * Call once in product's main.tsx or App.tsx.
 *
 * Usage:
 *   import { setAccent } from '@theonefamily/ui';
 *   setAccent('#10B981'); // Fleet = emerald
 */
declare function setAccent(hex: string): void;

/**
 * Tailwind v4 preset for @theonefamily/ui.
 * Import tokens.css and fonts.css in your CSS entry,
 * then reference this preset in your Tailwind config.
 *
 * Usage (tailwind.config.ts):
 *   import { uiPreset } from '@theonefamily/ui';
 *   export default { presets: [uiPreset], ... };
 *
 * Or for Tailwind v4 CSS-based config:
 *   @import '@theonefamily/ui/theme/tokens.css';
 *   @import '@theonefamily/ui/theme/fonts.css';
 */
declare const uiPreset: {
    readonly darkMode: string[];
    readonly theme: {
        readonly extend: {
            readonly colors: {
                readonly background: "var(--background)";
                readonly foreground: "var(--foreground)";
                readonly card: {
                    readonly DEFAULT: "var(--card)";
                    readonly foreground: "var(--foreground)";
                };
                readonly popover: {
                    readonly DEFAULT: "var(--popover)";
                    readonly foreground: "var(--foreground)";
                };
                readonly primary: {
                    readonly DEFAULT: "var(--primary)";
                    readonly foreground: "var(--primary-foreground)";
                };
                readonly accent: {
                    readonly DEFAULT: "var(--accent)";
                    readonly foreground: "var(--accent-foreground)";
                    readonly muted: "var(--accent-muted)";
                    readonly border: "var(--accent-border)";
                };
                readonly muted: {
                    readonly DEFAULT: "var(--surface-2)";
                    readonly foreground: "var(--muted-foreground)";
                };
                readonly destructive: {
                    readonly DEFAULT: "var(--destructive)";
                    readonly foreground: "var(--destructive-foreground)";
                };
                readonly success: {
                    readonly DEFAULT: "var(--success)";
                    readonly foreground: "var(--success-foreground)";
                };
                readonly warning: {
                    readonly DEFAULT: "var(--warning)";
                    readonly foreground: "var(--warning-foreground)";
                };
                readonly info: {
                    readonly DEFAULT: "var(--info)";
                    readonly foreground: "var(--info-foreground)";
                };
                readonly border: "var(--border)";
                readonly input: "var(--border)";
                readonly ring: "var(--ring)";
                readonly surface: {
                    readonly 0: "var(--surface-0)";
                    readonly 1: "var(--surface-1)";
                    readonly 2: "var(--surface-2)";
                    readonly 3: "var(--surface-3)";
                    readonly 4: "var(--surface-4)";
                };
                readonly brand: {
                    readonly orange: "var(--brand-orange)";
                };
            };
            readonly fontFamily: {
                readonly sans: readonly ["var(--font-sans)"];
                readonly mono: readonly ["var(--font-mono)"];
            };
            readonly borderRadius: {
                readonly sm: "var(--radius-sm)";
                readonly md: "var(--radius-md)";
                readonly lg: "var(--radius-lg)";
                readonly xl: "var(--radius-xl)";
                readonly DEFAULT: "var(--radius)";
            };
            readonly boxShadow: {
                readonly sm: "var(--shadow-sm)";
                readonly md: "var(--shadow-md)";
                readonly lg: "var(--shadow-lg)";
                readonly 'glow-sm': "var(--glow-sm)";
                readonly 'glow-md': "var(--glow-md)";
                readonly 'glow-lg': "var(--glow-lg)";
            };
            readonly transitionDuration: {
                readonly fast: "var(--duration-fast)";
                readonly normal: "var(--duration-normal)";
                readonly slow: "var(--duration-slow)";
            };
            readonly animation: {
                readonly float: "float 6s ease-in-out infinite";
                readonly 'float-slow': "float-slow 10s ease-in-out infinite";
            };
            readonly keyframes: {
                readonly float: {
                    readonly '0%, 100%': {
                        readonly transform: "translateY(0px)";
                    };
                    readonly '50%': {
                        readonly transform: "translateY(-20px)";
                    };
                };
                readonly 'float-slow': {
                    readonly '0%, 100%': {
                        readonly transform: "translateY(0px) translateX(0px)";
                    };
                    readonly '33%': {
                        readonly transform: "translateY(-15px) translateX(10px)";
                    };
                    readonly '66%': {
                        readonly transform: "translateY(10px) translateX(-8px)";
                    };
                };
            };
        };
    };
    readonly plugins: readonly [];
};

declare function cn(...inputs: ClassValue[]): string;

interface BirdSymbolProps {
    size?: number;
    className?: string;
    style?: React.CSSProperties;
}
/**
 * The One bird mark — always #f97316 orange, never recolored.
 * Use size prop: 16 (sidebar), 18 (header), 28 (hero/auth).
 */
declare function BirdSymbol({ size, className, style }: BirdSymbolProps): react_jsx_runtime.JSX.Element;

interface ProductLogoProps {
    name: string;
    size?: number;
    className?: string;
    textClassName?: string;
}
declare function ProductLogo({ name, size, className, textClassName }: ProductLogoProps): react_jsx_runtime.JSX.Element;

interface TheOneBadgeProps {
    className?: string;
}
declare function TheOneBadge({ className }: TheOneBadgeProps): react_jsx_runtime.JSX.Element;

interface FaviconHeadProps {
    productName?: string;
    accentColor?: string;
    basePath?: string;
}
/**
 * FaviconHead — renders favicon and PWA <link>/<meta> tags.
 * Add to your app's <head> or index.html.
 *
 * Usage:
 *   <FaviconHead productName="The One Fleet" accentColor="#10B981" />
 */
declare function FaviconHead({ productName, accentColor: _accentColor, basePath, }: FaviconHeadProps): react_jsx_runtime.JSX.Element;

interface NavItemDef {
    id: string;
    label: string;
    icon: LucideIcon;
    href: string;
    badge?: string | number;
    children?: NavItemDef[];
}
interface NavSection {
    label?: string;
    items: NavItemDef[];
}
interface AppShellUser {
    name: string;
    email: string;
    avatar?: string;
    role?: string;
}
interface AppShellTenant {
    name: string;
    slug: string;
}
interface AppShellProduct {
    name: string;
    accent: string;
    icon?: React.ReactNode;
}
interface AppShellProps {
    product: AppShellProduct;
    navigation: NavSection[];
    user: AppShellUser;
    tenant?: AppShellTenant;
    tenants?: AppShellTenant[];
    hubBarEnabled?: boolean;
    searchSlot?: React.ReactNode;
    notificationSlot?: React.ReactNode;
    onSignOut: () => void;
    onProfileClick?: () => void;
    onTenantSwitch?: (slug: string) => void;
    children: React.ReactNode;
}

declare function AppShell({ product, navigation, user, tenant, tenants, hubBarEnabled, searchSlot, notificationSlot, onSignOut, onProfileClick, onTenantSwitch, children, }: AppShellProps): react_jsx_runtime.JSX.Element;

interface SidebarProps {
    product: AppShellProps['product'];
    navigation: AppShellProps['navigation'];
    user: AppShellProps['user'];
    tenant?: AppShellProps['tenant'];
    tenants?: AppShellProps['tenants'];
    onSignOut: AppShellProps['onSignOut'];
    onProfileClick?: AppShellProps['onProfileClick'];
    onTenantSwitch?: AppShellProps['onTenantSwitch'];
    collapsed: boolean;
    onCollapsedChange: (collapsed: boolean) => void;
}
declare function Sidebar({ product, navigation, user, tenant, tenants, onSignOut, onProfileClick, onTenantSwitch, collapsed, onCollapsedChange, }: SidebarProps): react_jsx_runtime.JSX.Element;

interface TopBarProps {
    onMobileMenuToggle: () => void;
    searchSlot?: React.ReactNode;
    notificationSlot?: React.ReactNode;
    title?: string;
}
declare function TopBar({ onMobileMenuToggle, searchSlot, notificationSlot, title }: TopBarProps): react_jsx_runtime.JSX.Element;

interface MobileNavProps {
    open: boolean;
    onClose: () => void;
    product: AppShellProps['product'];
    navigation: AppShellProps['navigation'];
    user: AppShellProps['user'];
    onSignOut: AppShellProps['onSignOut'];
    onProfileClick?: AppShellProps['onProfileClick'];
}
declare function MobileNav({ open, onClose, product, navigation, user, onSignOut, onProfileClick, }: MobileNavProps): react_jsx_runtime.JSX.Element | null;

interface NavItemProps {
    item: NavItemDef;
    collapsed?: boolean;
    depth?: number;
}
declare function NavItem({ item, collapsed, depth }: NavItemProps): react_jsx_runtime.JSX.Element;

interface NavGroupProps {
    section: NavSection;
    collapsed?: boolean;
}
declare function NavGroup({ section, collapsed }: NavGroupProps): react_jsx_runtime.JSX.Element;

interface UserMenuProps {
    user: AppShellUser;
    collapsed?: boolean;
    onSignOut: () => void;
    onProfileClick?: () => void;
}
declare function UserMenu({ user, collapsed, onSignOut, onProfileClick }: UserMenuProps): react_jsx_runtime.JSX.Element;

interface TenantSwitcherProps {
    tenant: AppShellTenant;
    tenants?: AppShellTenant[];
    onTenantSwitch?: (slug: string) => void;
    collapsed?: boolean;
}
declare function TenantSwitcher({ tenant, tenants, onTenantSwitch, collapsed }: TenantSwitcherProps): react_jsx_runtime.JSX.Element | null;

declare const buttonVariants: (props?: ({
    variant?: "default" | "link" | "secondary" | "outline" | "ghost" | "destructive" | null | undefined;
    size?: "default" | "icon" | "sm" | "lg" | null | undefined;
} & class_variance_authority_types.ClassProp) | undefined) => string;
interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement>, VariantProps<typeof buttonVariants> {
    asChild?: boolean;
    loading?: boolean;
}
declare const Button: React.ForwardRefExoticComponent<ButtonProps & React.RefAttributes<HTMLButtonElement>>;

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
    error?: boolean;
}
declare const Input: React.ForwardRefExoticComponent<InputProps & React.RefAttributes<HTMLInputElement>>;

interface TextareaProps extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
    error?: boolean;
}
declare const Textarea: React.ForwardRefExoticComponent<TextareaProps & React.RefAttributes<HTMLTextAreaElement>>;

declare const Select: React.FC<SelectPrimitive.SelectProps>;
declare const SelectGroup: React.ForwardRefExoticComponent<SelectPrimitive.SelectGroupProps & React.RefAttributes<HTMLDivElement>>;
declare const SelectValue: React.ForwardRefExoticComponent<SelectPrimitive.SelectValueProps & React.RefAttributes<HTMLSpanElement>>;
declare const SelectTrigger: React.ForwardRefExoticComponent<Omit<SelectPrimitive.SelectTriggerProps & React.RefAttributes<HTMLButtonElement>, "ref"> & {
    error?: boolean;
} & React.RefAttributes<HTMLButtonElement>>;
declare const SelectScrollUpButton: React.ForwardRefExoticComponent<Omit<SelectPrimitive.SelectScrollUpButtonProps & React.RefAttributes<HTMLDivElement>, "ref"> & React.RefAttributes<HTMLDivElement>>;
declare const SelectScrollDownButton: React.ForwardRefExoticComponent<Omit<SelectPrimitive.SelectScrollDownButtonProps & React.RefAttributes<HTMLDivElement>, "ref"> & React.RefAttributes<HTMLDivElement>>;
declare const SelectContent: React.ForwardRefExoticComponent<Omit<SelectPrimitive.SelectContentProps & React.RefAttributes<HTMLDivElement>, "ref"> & React.RefAttributes<HTMLDivElement>>;
declare const SelectLabel: React.ForwardRefExoticComponent<Omit<SelectPrimitive.SelectLabelProps & React.RefAttributes<HTMLDivElement>, "ref"> & React.RefAttributes<HTMLDivElement>>;
declare const SelectItem: React.ForwardRefExoticComponent<Omit<SelectPrimitive.SelectItemProps & React.RefAttributes<HTMLDivElement>, "ref"> & React.RefAttributes<HTMLDivElement>>;
declare const SelectSeparator: React.ForwardRefExoticComponent<Omit<SelectPrimitive.SelectSeparatorProps & React.RefAttributes<HTMLDivElement>, "ref"> & React.RefAttributes<HTMLDivElement>>;

declare const Checkbox: React.ForwardRefExoticComponent<Omit<CheckboxPrimitive.CheckboxProps & React.RefAttributes<HTMLButtonElement>, "ref"> & React.RefAttributes<HTMLButtonElement>>;

declare const Switch: React.ForwardRefExoticComponent<Omit<SwitchPrimitive.SwitchProps & React.RefAttributes<HTMLButtonElement>, "ref"> & React.RefAttributes<HTMLButtonElement>>;

declare const RadioGroup: React.ForwardRefExoticComponent<Omit<RadioGroupPrimitive.RadioGroupProps & React.RefAttributes<HTMLDivElement>, "ref"> & React.RefAttributes<HTMLDivElement>>;
declare const RadioGroupItem: React.ForwardRefExoticComponent<Omit<RadioGroupPrimitive.RadioGroupItemProps & React.RefAttributes<HTMLButtonElement>, "ref"> & React.RefAttributes<HTMLButtonElement>>;

interface LabelProps extends React.ComponentPropsWithoutRef<typeof LabelPrimitive.Root> {
    required?: boolean;
}
declare const Label: React.ForwardRefExoticComponent<LabelProps & React.RefAttributes<HTMLLabelElement>>;

interface SeparatorProps extends React.ComponentPropsWithoutRef<typeof SeparatorPrimitive.Root> {
}
declare const Separator: React.ForwardRefExoticComponent<SeparatorProps & React.RefAttributes<HTMLDivElement>>;

declare const badgeVariants: (props?: ({
    variant?: "default" | "secondary" | "outline" | "destructive" | "success" | "warning" | null | undefined;
} & class_variance_authority_types.ClassProp) | undefined) => string;
interface BadgeProps extends React.HTMLAttributes<HTMLSpanElement>, VariantProps<typeof badgeVariants> {
}
declare function Badge({ className, variant, ...props }: BadgeProps): react_jsx_runtime.JSX.Element;

interface ProgressProps extends React.ComponentPropsWithoutRef<typeof ProgressPrimitive.Root> {
    indicatorClassName?: string;
}
declare const Progress: React.ForwardRefExoticComponent<ProgressProps & React.RefAttributes<HTMLDivElement>>;

interface SkeletonProps extends React.HTMLAttributes<HTMLDivElement> {
}
declare function Skeleton({ className, ...props }: SkeletonProps): react_jsx_runtime.JSX.Element;

interface SpinnerProps {
    size?: number;
    className?: string;
}
declare function Spinner({ size, className }: SpinnerProps): react_jsx_runtime.JSX.Element;

interface ToasterProps {
    position?: 'top-left' | 'top-center' | 'top-right' | 'bottom-left' | 'bottom-center' | 'bottom-right';
    richColors?: boolean;
    closeButton?: boolean;
    duration?: number;
}
declare function Toaster({ position, richColors, closeButton, duration, }: ToasterProps): react_jsx_runtime.JSX.Element;

declare const Dialog: React.FC<DialogPrimitive.DialogProps>;
declare const DialogTrigger: React.ForwardRefExoticComponent<DialogPrimitive.DialogTriggerProps & React.RefAttributes<HTMLButtonElement>>;
declare const DialogPortal: React.FC<DialogPrimitive.DialogPortalProps>;
declare const DialogClose: React.ForwardRefExoticComponent<DialogPrimitive.DialogCloseProps & React.RefAttributes<HTMLButtonElement>>;
declare const DialogOverlay: React.ForwardRefExoticComponent<Omit<DialogPrimitive.DialogOverlayProps & React.RefAttributes<HTMLDivElement>, "ref"> & React.RefAttributes<HTMLDivElement>>;
declare const DialogContent: React.ForwardRefExoticComponent<Omit<DialogPrimitive.DialogContentProps & React.RefAttributes<HTMLDivElement>, "ref"> & React.RefAttributes<HTMLDivElement>>;
declare function DialogHeader({ className, ...props }: React.HTMLAttributes<HTMLDivElement>): react_jsx_runtime.JSX.Element;
declare function DialogFooter({ className, ...props }: React.HTMLAttributes<HTMLDivElement>): react_jsx_runtime.JSX.Element;
declare const DialogTitle: React.ForwardRefExoticComponent<Omit<DialogPrimitive.DialogTitleProps & React.RefAttributes<HTMLHeadingElement>, "ref"> & React.RefAttributes<HTMLHeadingElement>>;
declare const DialogDescription: React.ForwardRefExoticComponent<Omit<DialogPrimitive.DialogDescriptionProps & React.RefAttributes<HTMLParagraphElement>, "ref"> & React.RefAttributes<HTMLParagraphElement>>;

declare const AlertDialog: React.FC<AlertDialogPrimitive.AlertDialogProps>;
declare const AlertDialogTrigger: React.ForwardRefExoticComponent<AlertDialogPrimitive.AlertDialogTriggerProps & React.RefAttributes<HTMLButtonElement>>;
declare const AlertDialogPortal: React.FC<AlertDialogPrimitive.AlertDialogPortalProps>;
declare const AlertDialogOverlay: React.ForwardRefExoticComponent<Omit<AlertDialogPrimitive.AlertDialogOverlayProps & React.RefAttributes<HTMLDivElement>, "ref"> & React.RefAttributes<HTMLDivElement>>;
declare const AlertDialogContent: React.ForwardRefExoticComponent<Omit<AlertDialogPrimitive.AlertDialogContentProps & React.RefAttributes<HTMLDivElement>, "ref"> & React.RefAttributes<HTMLDivElement>>;
declare function AlertDialogHeader({ className, ...props }: React.HTMLAttributes<HTMLDivElement>): react_jsx_runtime.JSX.Element;
declare function AlertDialogFooter({ className, ...props }: React.HTMLAttributes<HTMLDivElement>): react_jsx_runtime.JSX.Element;
declare const AlertDialogTitle: React.ForwardRefExoticComponent<Omit<AlertDialogPrimitive.AlertDialogTitleProps & React.RefAttributes<HTMLHeadingElement>, "ref"> & React.RefAttributes<HTMLHeadingElement>>;
declare const AlertDialogDescription: React.ForwardRefExoticComponent<Omit<AlertDialogPrimitive.AlertDialogDescriptionProps & React.RefAttributes<HTMLParagraphElement>, "ref"> & React.RefAttributes<HTMLParagraphElement>>;
declare const AlertDialogAction: React.ForwardRefExoticComponent<Omit<AlertDialogPrimitive.AlertDialogActionProps & React.RefAttributes<HTMLButtonElement>, "ref"> & React.RefAttributes<HTMLButtonElement>>;
declare const AlertDialogCancel: React.ForwardRefExoticComponent<Omit<AlertDialogPrimitive.AlertDialogCancelProps & React.RefAttributes<HTMLButtonElement>, "ref"> & React.RefAttributes<HTMLButtonElement>>;

declare const Sheet: React.FC<DialogPrimitive.DialogProps>;
declare const SheetTrigger: React.ForwardRefExoticComponent<DialogPrimitive.DialogTriggerProps & React.RefAttributes<HTMLButtonElement>>;
declare const SheetClose: React.ForwardRefExoticComponent<DialogPrimitive.DialogCloseProps & React.RefAttributes<HTMLButtonElement>>;
declare const SheetPortal: React.FC<DialogPrimitive.DialogPortalProps>;
declare const SheetOverlay: React.ForwardRefExoticComponent<Omit<DialogPrimitive.DialogOverlayProps & React.RefAttributes<HTMLDivElement>, "ref"> & React.RefAttributes<HTMLDivElement>>;
declare const sheetVariants: (props?: ({
    side?: "left" | "right" | "bottom" | "top" | null | undefined;
} & class_variance_authority_types.ClassProp) | undefined) => string;
interface SheetContentProps extends React.ComponentPropsWithoutRef<typeof DialogPrimitive.Content>, VariantProps<typeof sheetVariants> {
}
declare const SheetContent: React.ForwardRefExoticComponent<SheetContentProps & React.RefAttributes<HTMLDivElement>>;
declare function SheetHeader({ className, ...props }: React.HTMLAttributes<HTMLDivElement>): react_jsx_runtime.JSX.Element;
declare function SheetFooter({ className, ...props }: React.HTMLAttributes<HTMLDivElement>): react_jsx_runtime.JSX.Element;
declare const SheetTitle: React.ForwardRefExoticComponent<Omit<DialogPrimitive.DialogTitleProps & React.RefAttributes<HTMLHeadingElement>, "ref"> & React.RefAttributes<HTMLHeadingElement>>;
declare const SheetDescription: React.ForwardRefExoticComponent<Omit<DialogPrimitive.DialogDescriptionProps & React.RefAttributes<HTMLParagraphElement>, "ref"> & React.RefAttributes<HTMLParagraphElement>>;

declare const DropdownMenu: React.FC<DropdownMenuPrimitive.DropdownMenuProps>;
declare const DropdownMenuTrigger: React.ForwardRefExoticComponent<DropdownMenuPrimitive.DropdownMenuTriggerProps & React.RefAttributes<HTMLButtonElement>>;
declare const DropdownMenuGroup: React.ForwardRefExoticComponent<DropdownMenuPrimitive.DropdownMenuGroupProps & React.RefAttributes<HTMLDivElement>>;
declare const DropdownMenuPortal: React.FC<DropdownMenuPrimitive.DropdownMenuPortalProps>;
declare const DropdownMenuSub: React.FC<DropdownMenuPrimitive.DropdownMenuSubProps>;
declare const DropdownMenuRadioGroup: React.ForwardRefExoticComponent<DropdownMenuPrimitive.DropdownMenuRadioGroupProps & React.RefAttributes<HTMLDivElement>>;
declare const DropdownMenuSubTrigger: React.ForwardRefExoticComponent<Omit<DropdownMenuPrimitive.DropdownMenuSubTriggerProps & React.RefAttributes<HTMLDivElement>, "ref"> & {
    inset?: boolean;
} & React.RefAttributes<HTMLDivElement>>;
declare const DropdownMenuSubContent: React.ForwardRefExoticComponent<Omit<DropdownMenuPrimitive.DropdownMenuSubContentProps & React.RefAttributes<HTMLDivElement>, "ref"> & React.RefAttributes<HTMLDivElement>>;
declare const DropdownMenuContent: React.ForwardRefExoticComponent<Omit<DropdownMenuPrimitive.DropdownMenuContentProps & React.RefAttributes<HTMLDivElement>, "ref"> & React.RefAttributes<HTMLDivElement>>;
declare const DropdownMenuItem: React.ForwardRefExoticComponent<Omit<DropdownMenuPrimitive.DropdownMenuItemProps & React.RefAttributes<HTMLDivElement>, "ref"> & {
    inset?: boolean;
    destructive?: boolean;
} & React.RefAttributes<HTMLDivElement>>;
declare const DropdownMenuCheckboxItem: React.ForwardRefExoticComponent<Omit<DropdownMenuPrimitive.DropdownMenuCheckboxItemProps & React.RefAttributes<HTMLDivElement>, "ref"> & React.RefAttributes<HTMLDivElement>>;
declare const DropdownMenuRadioItem: React.ForwardRefExoticComponent<Omit<DropdownMenuPrimitive.DropdownMenuRadioItemProps & React.RefAttributes<HTMLDivElement>, "ref"> & React.RefAttributes<HTMLDivElement>>;
declare const DropdownMenuLabel: React.ForwardRefExoticComponent<Omit<DropdownMenuPrimitive.DropdownMenuLabelProps & React.RefAttributes<HTMLDivElement>, "ref"> & {
    inset?: boolean;
} & React.RefAttributes<HTMLDivElement>>;
declare const DropdownMenuSeparator: React.ForwardRefExoticComponent<Omit<DropdownMenuPrimitive.DropdownMenuSeparatorProps & React.RefAttributes<HTMLDivElement>, "ref"> & React.RefAttributes<HTMLDivElement>>;
declare function DropdownMenuShortcut({ className, ...props }: React.HTMLAttributes<HTMLSpanElement>): react_jsx_runtime.JSX.Element;

declare const Popover: React.FC<PopoverPrimitive.PopoverProps>;
declare const PopoverTrigger: React.ForwardRefExoticComponent<PopoverPrimitive.PopoverTriggerProps & React.RefAttributes<HTMLButtonElement>>;
declare const PopoverAnchor: React.ForwardRefExoticComponent<PopoverPrimitive.PopoverAnchorProps & React.RefAttributes<HTMLDivElement>>;
declare const PopoverContent: React.ForwardRefExoticComponent<Omit<PopoverPrimitive.PopoverContentProps & React.RefAttributes<HTMLDivElement>, "ref"> & React.RefAttributes<HTMLDivElement>>;

declare const TooltipProvider: React.FC<TooltipPrimitive.TooltipProviderProps>;
declare const Tooltip: React.FC<TooltipPrimitive.TooltipProps>;
declare const TooltipTrigger: React.ForwardRefExoticComponent<TooltipPrimitive.TooltipTriggerProps & React.RefAttributes<HTMLButtonElement>>;
declare const TooltipContent: React.ForwardRefExoticComponent<Omit<TooltipPrimitive.TooltipContentProps & React.RefAttributes<HTMLDivElement>, "ref"> & React.RefAttributes<HTMLDivElement>>;

declare const Command: React.ForwardRefExoticComponent<Omit<{
    children?: React.ReactNode;
} & Pick<Pick<React.DetailedHTMLProps<React.HTMLAttributes<HTMLDivElement>, HTMLDivElement>, "key" | keyof React.HTMLAttributes<HTMLDivElement>> & {
    ref?: React.Ref<HTMLDivElement>;
} & {
    asChild?: boolean;
}, "key" | "asChild" | keyof React.HTMLAttributes<HTMLDivElement>> & {
    label?: string;
    shouldFilter?: boolean;
    filter?: (value: string, search: string, keywords?: string[]) => number;
    defaultValue?: string;
    value?: string;
    onValueChange?: (value: string) => void;
    loop?: boolean;
    disablePointerSelection?: boolean;
    vimBindings?: boolean;
} & React.RefAttributes<HTMLDivElement>, "ref"> & React.RefAttributes<HTMLDivElement>>;
declare const CommandInput: React.ForwardRefExoticComponent<Omit<Omit<Pick<Pick<React.DetailedHTMLProps<React.InputHTMLAttributes<HTMLInputElement>, HTMLInputElement>, "key" | keyof React.InputHTMLAttributes<HTMLInputElement>> & {
    ref?: React.Ref<HTMLInputElement>;
} & {
    asChild?: boolean;
}, "key" | "asChild" | keyof React.InputHTMLAttributes<HTMLInputElement>>, "type" | "value" | "onChange"> & {
    value?: string;
    onValueChange?: (search: string) => void;
} & React.RefAttributes<HTMLInputElement>, "ref"> & React.RefAttributes<HTMLInputElement>>;
declare const CommandList: React.ForwardRefExoticComponent<Omit<{
    children?: React.ReactNode;
} & Pick<Pick<React.DetailedHTMLProps<React.HTMLAttributes<HTMLDivElement>, HTMLDivElement>, "key" | keyof React.HTMLAttributes<HTMLDivElement>> & {
    ref?: React.Ref<HTMLDivElement>;
} & {
    asChild?: boolean;
}, "key" | "asChild" | keyof React.HTMLAttributes<HTMLDivElement>> & {
    label?: string;
} & React.RefAttributes<HTMLDivElement>, "ref"> & React.RefAttributes<HTMLDivElement>>;
declare const CommandEmpty: React.ForwardRefExoticComponent<Omit<{
    children?: React.ReactNode;
} & Pick<Pick<React.DetailedHTMLProps<React.HTMLAttributes<HTMLDivElement>, HTMLDivElement>, "key" | keyof React.HTMLAttributes<HTMLDivElement>> & {
    ref?: React.Ref<HTMLDivElement>;
} & {
    asChild?: boolean;
}, "key" | "asChild" | keyof React.HTMLAttributes<HTMLDivElement>> & React.RefAttributes<HTMLDivElement>, "ref"> & React.RefAttributes<HTMLDivElement>>;
declare const CommandGroup: React.ForwardRefExoticComponent<Omit<{
    children?: React.ReactNode;
} & Omit<Pick<Pick<React.DetailedHTMLProps<React.HTMLAttributes<HTMLDivElement>, HTMLDivElement>, "key" | keyof React.HTMLAttributes<HTMLDivElement>> & {
    ref?: React.Ref<HTMLDivElement>;
} & {
    asChild?: boolean;
}, "key" | "asChild" | keyof React.HTMLAttributes<HTMLDivElement>>, "value" | "heading"> & {
    heading?: React.ReactNode;
    value?: string;
    forceMount?: boolean;
} & React.RefAttributes<HTMLDivElement>, "ref"> & React.RefAttributes<HTMLDivElement>>;
declare const CommandSeparator: React.ForwardRefExoticComponent<Omit<Pick<Pick<React.DetailedHTMLProps<React.HTMLAttributes<HTMLDivElement>, HTMLDivElement>, "key" | keyof React.HTMLAttributes<HTMLDivElement>> & {
    ref?: React.Ref<HTMLDivElement>;
} & {
    asChild?: boolean;
}, "key" | "asChild" | keyof React.HTMLAttributes<HTMLDivElement>> & {
    alwaysRender?: boolean;
} & React.RefAttributes<HTMLDivElement>, "ref"> & React.RefAttributes<HTMLDivElement>>;
declare const CommandItem: React.ForwardRefExoticComponent<Omit<{
    children?: React.ReactNode;
} & Omit<Pick<Pick<React.DetailedHTMLProps<React.HTMLAttributes<HTMLDivElement>, HTMLDivElement>, "key" | keyof React.HTMLAttributes<HTMLDivElement>> & {
    ref?: React.Ref<HTMLDivElement>;
} & {
    asChild?: boolean;
}, "key" | "asChild" | keyof React.HTMLAttributes<HTMLDivElement>>, "disabled" | "value" | "onSelect"> & {
    disabled?: boolean;
    onSelect?: (value: string) => void;
    value?: string;
    keywords?: string[];
    forceMount?: boolean;
} & React.RefAttributes<HTMLDivElement>, "ref"> & React.RefAttributes<HTMLDivElement>>;
declare function CommandShortcut({ className, ...props }: React.HTMLAttributes<HTMLSpanElement>): react_jsx_runtime.JSX.Element;

declare const Card: React.ForwardRefExoticComponent<React.HTMLAttributes<HTMLDivElement> & React.RefAttributes<HTMLDivElement>>;
declare const CardHeader: React.ForwardRefExoticComponent<React.HTMLAttributes<HTMLDivElement> & React.RefAttributes<HTMLDivElement>>;
declare const CardTitle: React.ForwardRefExoticComponent<React.HTMLAttributes<HTMLHeadingElement> & React.RefAttributes<HTMLHeadingElement>>;
declare const CardDescription: React.ForwardRefExoticComponent<React.HTMLAttributes<HTMLParagraphElement> & React.RefAttributes<HTMLParagraphElement>>;
declare const CardContent: React.ForwardRefExoticComponent<React.HTMLAttributes<HTMLDivElement> & React.RefAttributes<HTMLDivElement>>;
declare const CardFooter: React.ForwardRefExoticComponent<React.HTMLAttributes<HTMLDivElement> & React.RefAttributes<HTMLDivElement>>;

declare const Table: React.ForwardRefExoticComponent<React.HTMLAttributes<HTMLTableElement> & React.RefAttributes<HTMLTableElement>>;
declare const TableHeader: React.ForwardRefExoticComponent<React.HTMLAttributes<HTMLTableSectionElement> & React.RefAttributes<HTMLTableSectionElement>>;
declare const TableBody: React.ForwardRefExoticComponent<React.HTMLAttributes<HTMLTableSectionElement> & React.RefAttributes<HTMLTableSectionElement>>;
declare const TableFooter: React.ForwardRefExoticComponent<React.HTMLAttributes<HTMLTableSectionElement> & React.RefAttributes<HTMLTableSectionElement>>;
declare const TableRow: React.ForwardRefExoticComponent<React.HTMLAttributes<HTMLTableRowElement> & React.RefAttributes<HTMLTableRowElement>>;
declare const TableHead: React.ForwardRefExoticComponent<React.ThHTMLAttributes<HTMLTableCellElement> & React.RefAttributes<HTMLTableCellElement>>;
declare const TableCell: React.ForwardRefExoticComponent<React.TdHTMLAttributes<HTMLTableCellElement> & React.RefAttributes<HTMLTableCellElement>>;
declare const TableCaption: React.ForwardRefExoticComponent<React.HTMLAttributes<HTMLTableCaptionElement> & React.RefAttributes<HTMLTableCaptionElement>>;

declare const Avatar: React.ForwardRefExoticComponent<Omit<AvatarPrimitive.AvatarProps & React.RefAttributes<HTMLSpanElement>, "ref"> & React.RefAttributes<HTMLSpanElement>>;
declare const AvatarImage: React.ForwardRefExoticComponent<Omit<AvatarPrimitive.AvatarImageProps & React.RefAttributes<HTMLImageElement>, "ref"> & React.RefAttributes<HTMLImageElement>>;
declare const AvatarFallback: React.ForwardRefExoticComponent<Omit<AvatarPrimitive.AvatarFallbackProps & React.RefAttributes<HTMLSpanElement>, "ref"> & React.RefAttributes<HTMLSpanElement>>;

interface StatCardTrend {
    value: number;
    direction: 'up' | 'down' | 'flat';
    label?: string;
}
interface StatCardProps {
    icon: LucideIcon;
    label: string;
    value: string | number;
    trend?: StatCardTrend;
    accent?: 'default' | 'success' | 'warning' | 'destructive';
    className?: string;
}
declare function StatCard({ icon: Icon, label, value, trend, accent, className }: StatCardProps): react_jsx_runtime.JSX.Element;

interface EmptyStateProps {
    icon: LucideIcon;
    title: string;
    description?: string;
    action?: {
        label: string;
        onClick: () => void;
    };
    className?: string;
}
declare function EmptyState({ icon: Icon, title, description, action, className }: EmptyStateProps): react_jsx_runtime.JSX.Element;

interface BreadcrumbItem$1 {
    label: string;
    href?: string;
}
interface PageHeaderProps {
    title: string;
    description?: string;
    actions?: React.ReactNode;
    breadcrumbs?: BreadcrumbItem$1[];
    className?: string;
}
declare function PageHeader({ title, description, actions, breadcrumbs, className }: PageHeaderProps): react_jsx_runtime.JSX.Element;

declare const Tabs: React.ForwardRefExoticComponent<TabsPrimitive.TabsProps & React.RefAttributes<HTMLDivElement>>;
declare const TabsList: React.ForwardRefExoticComponent<Omit<TabsPrimitive.TabsListProps & React.RefAttributes<HTMLDivElement>, "ref"> & React.RefAttributes<HTMLDivElement>>;
declare const TabsTrigger: React.ForwardRefExoticComponent<Omit<TabsPrimitive.TabsTriggerProps & React.RefAttributes<HTMLButtonElement>, "ref"> & React.RefAttributes<HTMLButtonElement>>;
declare const TabsContent: React.ForwardRefExoticComponent<Omit<TabsPrimitive.TabsContentProps & React.RefAttributes<HTMLDivElement>, "ref"> & React.RefAttributes<HTMLDivElement>>;

declare const Breadcrumb: React.ForwardRefExoticComponent<Omit<React.DetailedHTMLProps<React.HTMLAttributes<HTMLElement>, HTMLElement>, "ref"> & {
    separator?: React.ReactNode;
} & React.RefAttributes<HTMLElement>>;
declare const BreadcrumbList: React.ForwardRefExoticComponent<Omit<React.DetailedHTMLProps<React.OlHTMLAttributes<HTMLOListElement>, HTMLOListElement>, "ref"> & React.RefAttributes<HTMLOListElement>>;
declare const BreadcrumbItem: React.ForwardRefExoticComponent<Omit<React.DetailedHTMLProps<React.LiHTMLAttributes<HTMLLIElement>, HTMLLIElement>, "ref"> & React.RefAttributes<HTMLLIElement>>;
declare const BreadcrumbLink: React.ForwardRefExoticComponent<Omit<React.DetailedHTMLProps<React.AnchorHTMLAttributes<HTMLAnchorElement>, HTMLAnchorElement>, "ref"> & React.RefAttributes<HTMLAnchorElement>>;
declare const BreadcrumbPage: React.ForwardRefExoticComponent<Omit<React.DetailedHTMLProps<React.HTMLAttributes<HTMLSpanElement>, HTMLSpanElement>, "ref"> & React.RefAttributes<HTMLSpanElement>>;
declare function BreadcrumbSeparator({ children, className, ...props }: React.ComponentProps<'li'>): react_jsx_runtime.JSX.Element;
declare function BreadcrumbEllipsis({ className, ...props }: React.ComponentProps<'span'>): react_jsx_runtime.JSX.Element;

declare const Pagination: {
    ({ className, ...props }: React.ComponentProps<"nav">): react_jsx_runtime.JSX.Element;
    displayName: string;
};
declare const PaginationContent: React.ForwardRefExoticComponent<Omit<React.DetailedHTMLProps<React.HTMLAttributes<HTMLUListElement>, HTMLUListElement>, "ref"> & React.RefAttributes<HTMLUListElement>>;
declare const PaginationItem: React.ForwardRefExoticComponent<Omit<React.DetailedHTMLProps<React.LiHTMLAttributes<HTMLLIElement>, HTMLLIElement>, "ref"> & React.RefAttributes<HTMLLIElement>>;
interface PaginationLinkProps extends React.ComponentProps<'button'> {
    isActive?: boolean;
}
declare function PaginationLink({ className, isActive, children, ...props }: PaginationLinkProps): react_jsx_runtime.JSX.Element;
declare function PaginationPrevious({ className, ...props }: React.ComponentProps<'button'>): react_jsx_runtime.JSX.Element;
declare function PaginationNext({ className, ...props }: React.ComponentProps<'button'>): react_jsx_runtime.JSX.Element;
declare function PaginationEllipsis({ className, ...props }: React.ComponentProps<'span'>): react_jsx_runtime.JSX.Element;

interface FormProps extends React.FormHTMLAttributes<HTMLFormElement> {
}
declare const Form: React.ForwardRefExoticComponent<FormProps & React.RefAttributes<HTMLFormElement>>;
interface FormFieldContextValue {
    id: string;
    error?: string;
}
declare function useFormField(): FormFieldContextValue;
interface FormFieldProps {
    id?: string;
    label?: string;
    description?: string;
    error?: string;
    required?: boolean;
    children: React.ReactNode;
    className?: string;
}
declare function FormField({ id, label, description, error, required, children, className }: FormFieldProps): react_jsx_runtime.JSX.Element;

interface DatePickerProps {
    value?: Date;
    onChange?: (date: Date | undefined) => void;
    placeholder?: string;
    disabled?: boolean;
    className?: string;
    minDate?: Date;
    maxDate?: Date;
}
declare function DatePicker({ value, onChange, placeholder, disabled, className, minDate, maxDate, }: DatePickerProps): react_jsx_runtime.JSX.Element;

declare const ScrollArea: React.ForwardRefExoticComponent<Omit<ScrollAreaPrimitive.ScrollAreaProps & React.RefAttributes<HTMLDivElement>, "ref"> & React.RefAttributes<HTMLDivElement>>;
declare const ScrollBar: React.ForwardRefExoticComponent<Omit<ScrollAreaPrimitive.ScrollAreaScrollbarProps & React.RefAttributes<HTMLDivElement>, "ref"> & React.RefAttributes<HTMLDivElement>>;

declare const Collapsible: React.ForwardRefExoticComponent<CollapsiblePrimitive.CollapsibleProps & React.RefAttributes<HTMLDivElement>>;
declare const CollapsibleTrigger: React.ForwardRefExoticComponent<CollapsiblePrimitive.CollapsibleTriggerProps & React.RefAttributes<HTMLButtonElement>>;
declare const CollapsibleContent: React.ForwardRefExoticComponent<CollapsiblePrimitive.CollapsibleContentProps & React.RefAttributes<HTMLDivElement>>;

interface LoginPageProps {
    product: {
        name: string;
        accent: string;
    };
    onEmailLogin: (email: string, password: string) => Promise<void>;
    onMfaSubmit?: (code: string) => Promise<void>;
    onMicrosoftLogin?: () => void;
    onHubSsoLogin?: () => void;
    showHubSso?: boolean;
    forgotPasswordHref?: string;
    error?: string;
    loading?: boolean;
}
declare function LoginPage({ product, onEmailLogin, onMfaSubmit, onMicrosoftLogin, onHubSsoLogin, showHubSso, forgotPasswordHref, error: externalError, loading: externalLoading, }: LoginPageProps): react_jsx_runtime.JSX.Element;

interface ColumnDef<T> {
    key: string;
    header: string;
    render?: (row: T) => React.ReactNode;
    className?: string;
}
interface PaginationConfig {
    page: number;
    totalPages: number;
    total: number;
    onPageChange: (page: number) => void;
}
interface ListPageProps<T extends Record<string, unknown>> {
    title: string;
    description?: string;
    columns: ColumnDef<T>[];
    data: T[];
    filters?: React.ReactNode;
    actions?: React.ReactNode;
    onRowClick?: (row: T) => void;
    pagination?: PaginationConfig;
    loading?: boolean;
    emptyState?: {
        icon: LucideIcon;
        title: string;
        description?: string;
        action?: {
            label: string;
            onClick: () => void;
        };
    };
    className?: string;
}
declare function ListPage<T extends Record<string, unknown>>({ title, description, columns, data, filters, actions, onRowClick, pagination, loading, emptyState, className, }: ListPageProps<T>): react_jsx_runtime.JSX.Element;

interface BreadcrumbEntry {
    label: string;
    href?: string;
}
interface DetailSection {
    title?: string;
    content: React.ReactNode;
}
interface DetailPageProps {
    breadcrumbs?: BreadcrumbEntry[];
    title: string;
    subtitle?: string;
    actions?: React.ReactNode;
    badge?: React.ReactNode;
    sections?: DetailSection[];
    children?: React.ReactNode;
    loading?: boolean;
    className?: string;
}
declare function DetailPage({ breadcrumbs, title, subtitle, actions, badge, sections, children, loading, className, }: DetailPageProps): react_jsx_runtime.JSX.Element;

interface SettingsNavItem {
    id: string;
    label: string;
    icon?: React.ReactNode;
    description?: string;
}
interface SettingsSection {
    group?: string;
    items: SettingsNavItem[];
}
interface SettingsPageProps {
    title?: string;
    navigation: SettingsSection[];
    defaultSection?: string;
    renderSection: (sectionId: string) => React.ReactNode;
    className?: string;
}
declare function SettingsPage({ title, navigation, defaultSection, renderSection, className, }: SettingsPageProps): react_jsx_runtime.JSX.Element;

export { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogOverlay, AlertDialogPortal, AlertDialogTitle, AlertDialogTrigger, AppShell, type AppShellProduct, type AppShellProps, type AppShellTenant, type AppShellUser, Avatar, AvatarFallback, AvatarImage, Badge, type BadgeProps, BirdSymbol, Breadcrumb, BreadcrumbEllipsis, BreadcrumbItem, BreadcrumbLink, BreadcrumbList, BreadcrumbPage, BreadcrumbSeparator, Button, type ButtonProps, Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle, Checkbox, Collapsible, CollapsibleContent, CollapsibleTrigger, type ColumnDef, Command, CommandEmpty, CommandGroup, CommandInput, CommandItem, CommandList, CommandSeparator, CommandShortcut, DatePicker, DetailPage, Dialog, DialogClose, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogOverlay, DialogPortal, DialogTitle, DialogTrigger, DropdownMenu, DropdownMenuCheckboxItem, DropdownMenuContent, DropdownMenuGroup, DropdownMenuItem, DropdownMenuLabel, DropdownMenuPortal, DropdownMenuRadioGroup, DropdownMenuRadioItem, DropdownMenuSeparator, DropdownMenuShortcut, DropdownMenuSub, DropdownMenuSubContent, DropdownMenuSubTrigger, DropdownMenuTrigger, EmptyState, FaviconHead, Form, FormField, Input, type InputProps, Label, type LabelProps, ListPage, LoginPage, MobileNav, NavGroup, NavItem, type NavItemDef, type NavSection, PageHeader, Pagination, PaginationContent, PaginationEllipsis, PaginationItem, PaginationLink, PaginationNext, PaginationPrevious, Popover, PopoverAnchor, PopoverContent, PopoverTrigger, ProductLogo, Progress, RadioGroup, RadioGroupItem, ScrollArea, ScrollBar, Select, SelectContent, SelectGroup, SelectItem, SelectLabel, SelectScrollDownButton, SelectScrollUpButton, SelectSeparator, SelectTrigger, SelectValue, Separator, SettingsPage, Sheet, SheetClose, SheetContent, SheetDescription, SheetFooter, SheetHeader, SheetOverlay, SheetPortal, SheetTitle, SheetTrigger, Sidebar, Skeleton, Spinner, StatCard, Switch, Table, TableBody, TableCaption, TableCell, TableFooter, TableHead, TableHeader, TableRow, Tabs, TabsContent, TabsList, TabsTrigger, TenantSwitcher, Textarea, type TextareaProps, TheOneBadge, Toaster, Tooltip, TooltipContent, TooltipProvider, TooltipTrigger, TopBar, UserMenu, badgeVariants, buttonVariants, cn, setAccent, uiPreset, useFormField };
