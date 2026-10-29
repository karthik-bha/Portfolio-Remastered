import { NextResponse } from "next/server";
import { Resend } from "resend";
import {
  checkRateLimit,
  rateLimitExceededResponse,
  setRateLimitHeaders,
} from "@/utils/rateLimit";

// Rate limit config: 3 requests per 10 minutes per IP
const CONTACT_RATE_LIMIT = {
  keyPrefix: "contact",
  windowMs: 10 * 60 * 1000,
  max: 3,
};

// Define types for the expected request body
interface ContactFormData {
  name: string;
  email: string;
  query: string;
}

export async function POST(req: Request): Promise<NextResponse> {
  // Check rate limit before processing
  const rateLimitResult = checkRateLimit(req, CONTACT_RATE_LIMIT);
  if (!rateLimitResult.success) {
    return rateLimitExceededResponse(rateLimitResult);
  }

  try {
    // Parse the user's input from the request body
    const { name, email, query }: ContactFormData = await req.json();

    // Ensure all required fields are present
    if (!name || !email || !query) {
      return NextResponse.json(
        { success: false, error: "Missing required fields" },
        { status: 400 }
      );
    }

    // Check if the environment variables are set
    const apiKey = process.env.RESEND_API_KEY;
    if (!apiKey) {
      return NextResponse.json(
        { success: false, error: "Resend API key is not configured" },
        { status: 500 }
      );
    }

    const recipientEmail = process.env.RECIPIENT_EMAIL;
    if (!recipientEmail) {
      return NextResponse.json(
        { success: false, error: "Recipient email is not configured" },
        { status: 500 }
      );
    }

    // Initialize Resend lazily with the verified API key
    const resend = new Resend(apiKey);

    // Send the email using Resend's API
    const data = await resend.emails.send({
      from: "onboarding@resend.dev",
      to: recipientEmail,
      subject: `New Query from ${name}`,
      html: `
        <h2>New Contact Form Submission</h2>
        <p><strong>Name:</strong> ${name}</p>
        <p><strong>Email:</strong> ${email}</p>
        <p><strong>Message:</strong></p>
        <p>${query}</p>
      `,
    });

    const response = NextResponse.json({ success: true, data });
    return setRateLimitHeaders(response, rateLimitResult);
  } catch (error: unknown) {
    // Handles the error properly with type assertion
    if (error instanceof Error) {
      console.error("Email sending error:", error.message);
      return NextResponse.json(
        { success: false, error: error.message || "Failed to send email" },
        { status: 500 }
      );
    } else {
      console.error("Unknown error:", error);
      return NextResponse.json(
        { success: false, error: "Failed to send email due to an unknown error" },
        { status: 500 }
      );
    }
  }
}
