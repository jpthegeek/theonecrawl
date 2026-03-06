import type { Feature } from '../types';
export declare function useFeatureRequests(): {
    features: Feature[];
    loading: boolean;
    error: string | null;
    refresh: () => Promise<void>;
};
export declare function useVoteOnFeature(): {
    vote: (ticketId: string) => Promise<boolean>;
    removeVote: (ticketId: string) => Promise<boolean>;
    voting: string | null;
    error: string | null;
};
