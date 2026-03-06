/**
 * AI Disclosure — generates AI disclosure metadata for compliance.
 */
import { getModelFamily } from '../utils/cost-calculator.js';
export function createDisclosure(model, provider) {
    return {
        aiGenerated: true,
        modelFamily: getModelFamily(model),
        model,
        provider,
        timestamp: new Date().toISOString(),
        version: '1.0',
    };
}
//# sourceMappingURL=disclosure.js.map