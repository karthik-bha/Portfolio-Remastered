import connectDB from "@/utils/db";
import { NextResponse } from "next/server";
import Comment from "@/models/Comment";
import { auth } from "../../../../auth";
import {
  checkRateLimit,
  rateLimitExceededResponse,
  setRateLimitHeaders,
} from "@/utils/rateLimit";

// Rate limit configurations
const COMMENTS_READ_LIMIT = {
  keyPrefix: "comments:get",
  windowMs: 60 * 1000, // 1 minute
  max: 60, // 60 reads per minute per IP
};

const COMMENTS_POST_LIMIT = {
  keyPrefix: "comments:post",
  windowMs: 60 * 1000, // 1 minute
  max: 5, // max 5 comments per minute per user/IP
};

export async function GET(req: Request) {
  // Rate limit GET requests to avoid DB overload
  const rateLimitResult = checkRateLimit(req, COMMENTS_READ_LIMIT);
  if (!rateLimitResult.success) {
    return rateLimitExceededResponse(rateLimitResult);
  }

  await connectDB();
  const comments = await Comment.find();
  const response = NextResponse.json(comments);
  return setRateLimitHeaders(response, rateLimitResult);
}

export async function POST(req: Request) {
  // Ensure the user is authenticated
  const session = await auth();
  if (!session) {
    return NextResponse.json(
      { error: "Unauthorized, Please login to comment" },
      { status: 401 }
    );
  }

  // Rate limit POST by user email / sub when available, or client IP
  const userIdentifier = session.user?.email || session.user?.name || undefined;
  const rateLimitResult = checkRateLimit(req, COMMENTS_POST_LIMIT, userIdentifier);
  if (!rateLimitResult.success) {
    return rateLimitExceededResponse(rateLimitResult);
  }

  const { name, message } = await req.json();
  if (!message || !message.trim()) {
    return NextResponse.json({ error: "Message required" }, { status: 400 });
  }

  await connectDB();
  const newComment = await Comment.create({ name, message });
  const response = NextResponse.json(newComment, { status: 201 });
  return setRateLimitHeaders(response, rateLimitResult);
}
