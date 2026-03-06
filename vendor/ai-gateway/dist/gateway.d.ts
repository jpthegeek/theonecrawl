import type { AIGateway, AIGatewayConfig } from './types.js';
export declare function createAIGateway(config: AIGatewayConfig): AIGateway;
export declare class GatewayError extends Error {
    readonly code: 'ACCESS_DENIED' | 'QUOTA_EXCEEDED' | 'NO_PROVIDER' | 'NO_EMBED';
    constructor(message: string, code: 'ACCESS_DENIED' | 'QUOTA_EXCEEDED' | 'NO_PROVIDER' | 'NO_EMBED');
}
//# sourceMappingURL=gateway.d.ts.map