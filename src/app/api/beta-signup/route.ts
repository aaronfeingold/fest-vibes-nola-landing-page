import { NextRequest, NextResponse } from "next/server";
import { db } from "@/lib/db";
import { betaSignups } from "@/lib/db/schema";
import { betaSignupSchema } from "@/lib/validation";
import { generateBetaWelcomeEmail } from "@/lib/email-templates";
import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();

    // Validate the request body
    const validatedData = betaSignupSchema.parse(body);
    const { email, wantsDonation, hasSeenDonationModal } = validatedData;

    // Normalize email
    const normalizedEmail = email.toLowerCase().trim();

    // Get client IP and user agent
    const forwarded = request.headers.get("x-forwarded-for");
    const ip = forwarded
      ? forwarded.split(",")[0]
      : request.headers.get("x-real-ip");
    const userAgent = request.headers.get("user-agent");

    // Insert into database
    await db.insert(betaSignups).values({
      email: email,
      normalizedEmail: normalizedEmail,
      wantsDonation: wantsDonation,
      hasSeenDonationModal: hasSeenDonationModal,
      ipAddress: ip,
      userAgent: userAgent,
    });

    // Send welcome email
    if (process.env.RESEND_API_KEY) {
      try {
        const domain = request.headers.get("host")
          ? `${
              request.headers.get("x-forwarded-proto") || "https"
            }://${request.headers.get("host")}`
          : "https://festvibes.com";

        const emailTemplate = generateBetaWelcomeEmail({
          email,
          domain,
        });

        await resend.emails.send(emailTemplate);
      } catch (emailError) {
        console.error("Failed to send welcome email:", emailError);
        // Don't fail the signup if email fails
      }
    }

    return NextResponse.json({ success: true });
  } catch (error: any) {
    console.error("Beta signup error:", error);

    // Handle validation errors
    if (error.name === "ZodError") {
      return NextResponse.json(
        { error: "Invalid request data" },
        { status: 400 }
      );
    }

    // Handle unique constraint violation (duplicate email)
    if (
      error.code === "23505" ||
      error.cause?.code === "23505" ||
      error.message?.includes("duplicate") ||
      error.message?.includes("unique constraint")
    ) {
      return NextResponse.json(
        {
          error:
            "This email has already been registered for the beta. Thanks for your interest!",
        },
        { status: 409 }
      );
    }

    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
