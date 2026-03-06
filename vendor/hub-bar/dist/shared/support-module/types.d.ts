export type TicketType = 'bug_report' | 'feature_request' | 'service_request' | 'task' | 'change_request';
export type TicketPriority = 'critical' | 'high' | 'medium' | 'low';
export type TicketSeverity = 'blocker' | 'major' | 'minor' | 'cosmetic';
export type TicketStatus = 'new' | 'triaged' | 'in_progress' | 'waiting_reporter' | 'waiting_external' | 'on_hold' | 'resolved' | 'closed' | 'cancelled';
export type FeatureStatus = 'proposed' | 'planned' | 'in_progress' | 'shipped' | 'cancelled';
export interface Ticket {
    id: string;
    ticket_number: string;
    platform: string;
    ticket_type: TicketType;
    title: string;
    description: string;
    status: TicketStatus;
    priority: TicketPriority;
    severity?: TicketSeverity;
    assigned_to?: string;
    assigned_team?: string;
    reporter_email: string;
    reporter_name: string;
    tags: string[];
    vote_count: number;
    submitted_via: 'web' | 'api';
    created_at: string;
    updated_at: string;
    resolved_at?: string;
    closed_at?: string;
}
export interface TicketActivity {
    id: string;
    ticket_id: string;
    ticket_number: string;
    platform: string;
    activity_type: 'comment' | 'status_change' | 'assignment_change' | 'priority_change' | 'link_added' | 'link_removed' | 'sla_warning' | 'sla_breach' | 'vote' | 'field_change';
    actor_email: string;
    actor_name: string;
    content?: string;
    changes?: {
        field: string;
        old_value: string;
        new_value: string;
    }[];
    is_internal: boolean;
    created_at: string;
}
export interface PublicRelease {
    version: string;
    title: string;
    release_notes: string;
    released_date: string;
    platform: string;
}
export interface Feature {
    id: string;
    platform: string;
    title: string;
    description: string;
    status: FeatureStatus;
    priority: TicketPriority;
    effort_estimate?: 'xs' | 'sm' | 'md' | 'lg' | 'xl';
    quarter?: string;
    tags: string[];
    created_at: string;
    updated_at: string;
}
export interface KBArticle {
    id: string;
    platform: string;
    category: string;
    title: string;
    slug: string;
    content: string;
    excerpt: string;
    tags: string[];
    published: boolean;
    order: number;
    created_at: string;
    updated_at: string;
}
export interface KBCategory {
    id: string;
    platform: string;
    name: string;
    slug: string;
    description: string;
    icon?: string;
    order: number;
    article_count: number;
}
export type ChatStatus = 'ai_active' | 'waiting_agent' | 'agent_active' | 'ended';
export type ChatMessageRole = 'user' | 'assistant' | 'agent' | 'system';
export interface ChatSession {
    id: string;
    platform: string;
    user_email: string;
    user_name: string;
    status: ChatStatus;
    agent_name?: string;
    messages: ChatMessage[];
    rating?: number;
    feedback?: string;
    cobrowse_active?: boolean;
    created_at: string;
    updated_at: string;
    ended_at?: string;
}
export interface ChatMessage {
    role: ChatMessageRole;
    content: string;
    timestamp: string;
}
export interface SupportConfig {
    apiBaseUrl: string;
    apiKey: string;
    platformId: string;
    platformName: string;
}
export interface SupportUser {
    email: string;
    name: string;
}
