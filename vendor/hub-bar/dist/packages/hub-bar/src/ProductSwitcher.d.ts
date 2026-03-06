import type { Product, ProductId } from './types';
interface ProductSwitcherProps {
    currentProduct: ProductId;
    products: Product[];
    open: boolean;
    onToggle: () => void;
    onClose: () => void;
    hubUrl: string;
}
export declare function ProductSwitcher({ currentProduct, products, open, onToggle, onClose, hubUrl, }: ProductSwitcherProps): import("react/jsx-runtime").JSX.Element;
export {};
