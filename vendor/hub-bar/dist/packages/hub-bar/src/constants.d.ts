import type { Product } from './types';
export declare const HUB_URL = "https://my.theonestack.com";
export declare const ALL_PRODUCTS: Omit<Product, 'active'>[];
export declare const SEVERITY_COLORS: {
    readonly info: "#60a5fa";
    readonly success: "#34d399";
    readonly warning: "#fbbf24";
    readonly error: "#f87171";
};
export declare const HUB_BAR_HEIGHT = 48;
