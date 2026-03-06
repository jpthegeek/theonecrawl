import type { PublicRelease } from '../types';
export declare function useReleaseNotes(): {
    releases: PublicRelease[];
    loading: boolean;
    error: string | null;
    refresh: () => Promise<void>;
};
