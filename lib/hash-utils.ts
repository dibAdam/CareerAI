import crypto from 'crypto';

/**
 * Hash a string using SHA-256
 * Used for privacy-preserving fingerprinting (IP, User Agent)
 */
export function hashString(input: string): string {
    return crypto.createHash('sha256').update(input).digest('hex');
}

/**
 * Extract and hash client fingerprint from request headers
 * Returns hashed IP and User Agent for privacy-preserving tracking
 */
export function getClientFingerprint(headers: Headers): {
    ipHash: string;
    userAgentHash: string;
} {
    // Extract IP from headers (prioritize x-forwarded-for for proxies/load balancers)
    const forwardedFor = headers.get('x-forwarded-for');
    const realIp = headers.get('x-real-ip');
    const ip = forwardedFor?.split(',')[0].trim() || realIp || 'unknown';

    // Extract User Agent
    const userAgent = headers.get('user-agent') || 'unknown';

    return {
        ipHash: hashString(ip),
        userAgentHash: hashString(userAgent),
    };
}

/**
 * Generate a unique anonymous ID (UUID v4)
 */
export function generateAnonymousId(): string {
    return crypto.randomUUID();
}
