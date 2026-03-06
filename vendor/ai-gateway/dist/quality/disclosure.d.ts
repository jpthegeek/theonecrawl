/**
 * AI Disclosure — generates AI disclosure metadata for compliance.
 */
export interface AIDisclosureMetadata {
    aiGenerated: true;
    modelFamily: string;
    model: string;
    provider: string;
    timestamp: string;
    version: string;
}
export declare function createDisclosure(model: string, provider: string): AIDisclosureMetadata;
//# sourceMappingURL=disclosure.d.ts.map