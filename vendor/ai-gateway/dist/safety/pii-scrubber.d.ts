/**
 * PII Scrubber — detects and redacts personally identifiable information
 * from prompts before sending to AI providers.
 */
import type { PIIConfig } from '../types.js';
export interface ScrubResult {
    text: string;
    piiDetected: boolean;
    piiScrubbed: boolean;
    detectedTypes: string[];
}
/**
 * Scan text for PII based on config. Returns which types were found.
 */
export declare function detectPII(text: string, config: PIIConfig): string[];
/**
 * Scrub PII from text based on feature-level config.
 */
export declare function scrubPII(text: string, feature: string, config: PIIConfig): ScrubResult;
/**
 * Scrub PII from an array of messages. Returns scrubbed messages + aggregate flags.
 */
export declare function scrubMessages(messages: Array<{
    role: string;
    content: string;
}>, feature: string, config: PIIConfig): {
    messages: Array<{
        role: string;
        content: string;
    }>;
    piiDetected: boolean;
    piiScrubbed: boolean;
    detectedTypes: string[];
};
//# sourceMappingURL=pii-scrubber.d.ts.map