import type { Ticket, TicketActivity, TicketType, TicketPriority, TicketSeverity } from '../types';
export declare function useMyTickets(filters?: {
    status?: string;
    ticket_type?: string;
}): {
    tickets: Ticket[];
    loading: boolean;
    error: string | null;
    refresh: () => Promise<void>;
};
export declare function useTicketDetail(ticketId: string | undefined): {
    ticket: Ticket | null;
    activity: TicketActivity[];
    loading: boolean;
    error: string | null;
    refresh: () => Promise<void>;
};
export declare function useCreateTicket(): {
    createTicket: (data: {
        ticket_type: TicketType;
        title: string;
        description: string;
        priority: TicketPriority;
        severity?: TicketSeverity;
        tags?: string[];
    }) => Promise<Ticket | null>;
    submitting: boolean;
    error: string | null;
};
export declare function useAddComment(): {
    addComment: (ticketId: string, content: string) => Promise<boolean>;
    submitting: boolean;
    error: string | null;
};
