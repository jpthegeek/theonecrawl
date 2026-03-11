interface CompanyTypeaheadProps {
    apiBase: string;
    value: string;
    companyId: string;
    onChange: (name: string, id: string) => void;
    placeholder?: string;
    disabled?: boolean;
}
export declare function CompanyTypeahead({ apiBase, value, companyId, onChange, placeholder, disabled }: CompanyTypeaheadProps): import("react/jsx-runtime").JSX.Element;
export {};
