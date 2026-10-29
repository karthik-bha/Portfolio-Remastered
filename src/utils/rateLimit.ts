import { NextResponse } from "next/server";

interface RateLimitRecord {
  timestamps: number[];
}

interface RateLimitOptions {
  keyPrefix?: string;
  windowMs: number;
  max: number;
}

export interface RateLimitResult {
  success: boolean;
  limit: number;
  remaining: number;
  reset: number; // Unix timestamp in seconds
  retryAfter: number; // Seconds until next slot opens
}

// In-memory cache for sliding window rate limiting
const store = new Map<string, RateLimitRecord>();

// Periodic cleanup every 5 minutes to prevent memory leaks
if (typeof setInterval !== "undefined") {
  const timer = setInterval(() => {
    const now = Date.now();
    for (const [key, record] of store.entries()) {
      // Remove records whose newest timestamp is older than 1 hour
      const newest = record.timestamps[record.timestamps.length - 1];
      if (!newest || now - newest > 60 * 60 * 1000) {
        store.delete(key);
      }
    }
  }, 5 * 60 * 1000);

  // Unref timer in Node.js environment so it doesn't hold the process open
  if (timer.unref) {
    timer.unref();
  }
}

/**
 * Extracts client IP address from standard proxy/header attributes
 */
export function getClientIp(req: Request): string {
  const forwarded = req.headers.get("x-forwarded-for");
  if (forwarded) {
    const firstIp = forwarded.split(",")[0]?.trim();
    if (firstIp) return firstIp;
  }

  const realIp = req.headers.get("x-real-ip");
  if (realIp) return realIp.trim();

  const cfConnectingIp = req.headers.get("cf-connecting-ip");
  if (cfConnectingIp) return cfConnectingIp.trim();

  return "127.0.0.1";
}

/**
 * Evaluates request against sliding-window rate limit
 */
export function checkRateLimit(
  req: Request,
  options: RateLimitOptions,
  customIdentifier?: string
): RateLimitResult {
  const ip = customIdentifier || getClientIp(req);
  const key = options.keyPrefix ? `${options.keyPrefix}:${ip}` : ip;
  const now = Date.now();
  const windowStart = now - options.windowMs;

  let record = store.get(key);
  if (!record) {
    record = { timestamps: [] };
    store.set(key, record);
  }

  // Filter out timestamps outside the active sliding window
  record.timestamps = record.timestamps.filter((ts) => ts > windowStart);

  const count = record.timestamps.length;
  const resetTimestampSec = Math.ceil((now + options.windowMs) / 1000);

  if (count >= options.max) {
    const oldestTimestamp = record.timestamps[0] || now;
    const retryAfter = Math.max(1, Math.ceil((oldestTimestamp + options.windowMs - now) / 1000));

    return {
      success: false,
      limit: options.max,
      remaining: 0,
      reset: resetTimestampSec,
      retryAfter,
    };
  }

  // Record this request
  record.timestamps.push(now);

  return {
    success: true,
    limit: options.max,
    remaining: options.max - record.timestamps.length,
    reset: resetTimestampSec,
    retryAfter: 0,
  };
}

/**
 * Helper to construct standard 429 Too Many Requests response with RFC headers
 */
export function rateLimitExceededResponse(result: RateLimitResult): NextResponse {
  return NextResponse.json(
    {
      success: false,
      error: `Too many requests. Please wait ${result.retryAfter} second(s) before trying again.`,
    },
    {
      status: 429,
      headers: {
        "Retry-After": result.retryAfter.toString(),
        "X-RateLimit-Limit": result.limit.toString(),
        "X-RateLimit-Remaining": result.remaining.toString(),
        "X-RateLimit-Reset": result.reset.toString(),
      },
    }
  );
}

/**
 * Helper to attach rate limit headers to a successful NextResponse
 */
export function setRateLimitHeaders(response: NextResponse, result: RateLimitResult): NextResponse {
  response.headers.set("X-RateLimit-Limit", result.limit.toString());
  response.headers.set("X-RateLimit-Remaining", result.remaining.toString());
  response.headers.set("X-RateLimit-Reset", result.reset.toString());
  return response;
}
