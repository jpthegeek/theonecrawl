import type { SupportConfig, Ticket, TicketActivity, TicketType, TicketPriority, TicketSeverity, PublicRelease, Feature, KBArticle, KBCategory, ChatSession } from './types';
interface CreateTicketPayload {
    ticket_type: TicketType;
    title: string;
    description: string;
    priority: TicketPriority;
    severity?: TicketSeverity;
    tags?: string[];
    reporter_email: string;
    reporter_name: string;
}
interface AddCommentPayload {
    content: string;
    actor_email: string;
    actor_name: string;
}
interface VotePayload {
    user_email: string;
    user_name: string;
}
interface ListTicketsParams {
    reporter_email?: string;
    status?: string;
    ticket_type?: string;
    page?: number;
    page_size?: number;
}
export declare class OpsCenterClient {
    private baseUrl;
    private apiKey;
    private platformId;
    constructor(config: SupportConfig);
    private request;
    createTicket(data: CreateTicketPayload): Promise<Ticket>;
    listTickets(params?: ListTicketsParams): Promise<Ticket[]>;
    getTicket(id: string): Promise<Ticket>;
    getTicketActivity(id: string): Promise<TicketActivity[]>;
    addComment(ticketId: string, data: AddCommentPayload): Promise<void>;
    voteOnTicket(ticketId: string, data: VotePayload): Promise<void>;
    removeVote(ticketId: string): Promise<void>;
    getPublicReleases(): Promise<PublicRelease[]>;
    getFeatures(): Promise<Feature[]>;
    getKBCategories(): Promise<KBCategory[]>;
    getKBArticles(category?: string): Promise<KBArticle[]>;
    getKBArticle(slug: string): Promise<KBArticle>;
    searchKB(query: string): Promise<KBArticle[]>;
    startChat(message: string, userName: string, userEmail: string): Promise<{
        session: ChatSession;
        message: string;
    }>;
    sendChatMessage(sessionId: string, message: string): Promise<{
        message: string;
        session: ChatSession;
    }>;
    getChatSession(sessionId: string): Promise<ChatSession>;
    listChatSessions(userEmail: string): Promise<ChatSession[]>;
    endChat(sessionId: string, rating?: number, feedback?: string): Promise<void>;
    escalateChat(sessionId: string): Promise<void>;
    sendCobrowseEvents(sessionId: string, events: unknown[], sequence: number): Promise<void>;
}
export {};
