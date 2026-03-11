export interface QuickCreateResult {
    success: boolean;
    id?: string;
    url?: string;
    error?: string;
}
export declare function quickCreateTicket(data: {
    subject: string;
    company_id?: string;
    priority: string;
}, apiBase: string): Promise<QuickCreateResult>;
export declare function quickCreateCompany(data: {
    name: string;
    website?: string;
    phone?: string;
}, apiBase: string): Promise<QuickCreateResult>;
export declare function quickCreateContact(data: {
    first_name: string;
    last_name: string;
    email: string;
    company_id?: string;
}, apiBase: string): Promise<QuickCreateResult>;
export declare function quickCreateDeal(data: {
    name: string;
    company_id?: string;
    value?: number;
    stage: string;
}, apiBase: string): Promise<QuickCreateResult>;
export declare function quickCreateIncident(data: {
    title: string;
    severity: string;
    description?: string;
}, apiBase: string): Promise<QuickCreateResult>;
export declare function quickCreateInvoice(data: {
    company_id: string;
    due_date: string;
    line_items: Array<{
        description: string;
        amount: number;
    }>;
}, apiBase: string): Promise<QuickCreateResult>;
export declare function searchCompanies(query: string, apiBase: string): Promise<Array<{
    id: string;
    name: string;
    industry?: string;
}>>;
