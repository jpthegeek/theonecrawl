import type { ActionType, UseQuickCreateReturn } from './hooks/useQuickCreate';
interface QuickCreateFormProps {
    action: ActionType;
    apiBase: string;
    submitting: boolean;
    error: string | null;
    onClose: () => void;
    submitTicket: UseQuickCreateReturn['submitTicket'];
    submitCompany: UseQuickCreateReturn['submitCompany'];
    submitContact: UseQuickCreateReturn['submitContact'];
    submitDeal: UseQuickCreateReturn['submitDeal'];
    submitIncident: UseQuickCreateReturn['submitIncident'];
    submitInvoice: UseQuickCreateReturn['submitInvoice'];
}
export declare function QuickCreateForm({ action, apiBase, submitting, error, onClose, submitTicket, submitCompany, submitContact, submitDeal, submitIncident, submitInvoice, }: QuickCreateFormProps): import("react").ReactPortal;
export {};
