/**
 * PII Scrubber — detects and redacts personally identifiable information
 * from prompts before sending to AI providers.
 */
// ── PII Patterns ───────────────────────────────────────────────────
const PII_PATTERNS = {
    ssn: /\b\d{3}-\d{2}-\d{4}\b/g,
    credit_card: /\b(?:4[0-9]{12}(?:[0-9]{3})?|5[1-5][0-9]{14}|3[47][0-9]{13}|6(?:011|5[0-9]{2})[0-9]{12})\b/g,
    email: /\b[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}\b/g,
    phone: /\b(?:\+?1[-.\s]?)?\(?[2-9]\d{2}\)?[-.\s]?\d{3}[-.\s]?\d{4}\b/g,
    dob: /\b(?:0[1-9]|1[0-2])\/(?:0[1-9]|[12]\d|3[01])\/(?:19|20)\d{2}\b/g,
    ip_address: /\b(?:(?:25[0-5]|2[0-4]\d|[01]?\d\d?)\.){3}(?:25[0-5]|2[0-4]\d|[01]?\d\d?)\b/g,
    medical_terms: /\b(?:diagnosis|patient|prescription|medication|HIPAA|medical record|health insurance|ICD-10|CPT code)\b/gi,
};
const REDACTION_MAP = {
    ssn: '[SSN_REDACTED]',
    credit_card: '[CC_REDACTED]',
    email: '[EMAIL_REDACTED]',
    phone: '[PHONE_REDACTED]',
    dob: '[DOB_REDACTED]',
    ip_address: '[IP_REDACTED]',
    medical_terms: '[MEDICAL_REDACTED]',
};
/**
 * Scan text for PII based on config. Returns which types were found.
 */
export function detectPII(text, config) {
    const detected = [];
    for (const [patternName, regex] of Object.entries(PII_PATTERNS)) {
        if (config.patterns[patternName] === false)
            continue;
        regex.lastIndex = 0;
        if (regex.test(text)) {
            detected.push(patternName);
        }
    }
    return detected;
}
/**
 * Scrub PII from text based on feature-level config.
 */
export function scrubPII(text, feature, config) {
    const mode = config.features[feature] ?? config.default;
    const detectedTypes = detectPII(text, config);
    const piiDetected = detectedTypes.length > 0;
    if (!piiDetected || mode === 'allow') {
        return { text, piiDetected, piiScrubbed: false, detectedTypes };
    }
    if (mode === 'warn') {
        // Detection only, no modification
        return { text, piiDetected, piiScrubbed: false, detectedTypes };
    }
    // mode === 'scrub' — replace PII with redaction markers
    let scrubbed = text;
    for (const patternName of detectedTypes) {
        const regex = PII_PATTERNS[patternName];
        if (regex) {
            regex.lastIndex = 0;
            scrubbed = scrubbed.replace(regex, REDACTION_MAP[patternName] ?? '[REDACTED]');
        }
    }
    return { text: scrubbed, piiDetected, piiScrubbed: true, detectedTypes };
}
/**
 * Scrub PII from an array of messages. Returns scrubbed messages + aggregate flags.
 */
export function scrubMessages(messages, feature, config) {
    let anyDetected = false;
    let anyScrubbed = false;
    const allTypes = new Set();
    const scrubbed = messages.map(msg => {
        const result = scrubPII(msg.content, feature, config);
        if (result.piiDetected)
            anyDetected = true;
        if (result.piiScrubbed)
            anyScrubbed = true;
        result.detectedTypes.forEach(t => allTypes.add(t));
        return { ...msg, content: result.text };
    });
    return {
        messages: scrubbed,
        piiDetected: anyDetected,
        piiScrubbed: anyScrubbed,
        detectedTypes: [...allTypes],
    };
}
//# sourceMappingURL=pii-scrubber.js.map