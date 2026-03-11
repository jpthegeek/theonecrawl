export type ActionType = 'ticket' | 'company' | 'contact' | 'deal' | 'incident' | 'invoice';
export interface SuccessState {
    id: string;
    url: string;
    label: string;
}
export interface UseQuickCreateReturn {
    menuOpen: boolean;
    selectedAction: ActionType | null;
    submitting: boolean;
    success: SuccessState | null;
    error: string | null;
    openMenu: () => void;
    closeMenu: () => void;
    toggleMenu: () => void;
    selectAction: (action: ActionType) => void;
    closeForm: () => void;
    clearSuccess: () => void;
    submitTicket: (data: {
        subject: string;
        company_id?: string;
        priority: string;
    }) => Promise<void>;
    submitCompany: (data: {
        name: string;
        website?: string;
        phone?: string;
    }) => Promise<void>;
    submitContact: (data: {
        first_name: string;
        last_name: string;
        email: string;
        company_id?: string;
    }) => Promise<void>;
    submitDeal: (data: {
        name: string;
        company_id?: string;
        value?: number;
        stage: string;
    }) => Promise<void>;
    submitIncident: (data: {
        title: string;
        severity: string;
        description?: string;
    }) => Promise<void>;
    submitInvoice: (data: {
        company_id: string;
        due_date: string;
        line_items: Array<{
            description: string;
            amount: number;
        }>;
    }) => Promise<void>;
}
export declare function useQuickCreate(apiBase: string): UseQuickCreateReturn;
