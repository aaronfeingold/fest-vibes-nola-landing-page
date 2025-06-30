import { NextRequest, NextResponse } from "next/server";
import { db } from "../../../../lib/db";
import { emailAnalytics } from "../../../../lib/db/schema";

// Resend webhook handler for email events
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();

    // Verify webhook signature (add this for security)
    // const signature = request.headers.get('resend-signature');

    const { type, data } = body;

    // Map Resend events to our analytics
    const eventMapping: Record<string, string> = {
      "email.sent": "sent",
      "email.delivered": "delivered",
      "email.delivery_delayed": "delayed",
      "email.bounced": "bounced",
      "email.complained": "complained",
      "email.opened": "opened",
      "email.clicked": "clicked",
    };

    const eventType = eventMapping[type];
    if (!eventType) {
      return NextResponse.json(
        { message: "Event type not tracked" },
        { status: 200 }
      );
    }

    // Extract campaign name from tags or subject
    const campaignName =
      data.tags?.find((tag: any) => tag.name === "campaign")?.value ||
      "unknown";

    // Store email analytics
    await db.insert(emailAnalytics).values({
      emailId: data.email_id,
      recipientEmail: data.to[0], // Assuming single recipient
      campaignName,
      eventType,
      eventData: {
        subject: data.subject,
        from: data.from,
        tags: data.tags,
        click_url: data.click?.url, // For click events
        user_agent: data.click?.user_agent,
        ip: data.click?.ip,
      },
      ipAddress: data.click?.ip || data.ip,
      userAgent: data.click?.user_agent || data.user_agent,
    });

    return NextResponse.json({ message: "Webhook processed" }, { status: 200 });
  } catch (error) {
    console.error("Resend webhook error:", error);
    return NextResponse.json(
      { error: "Webhook processing failed" },
      { status: 500 }
    );
  }
}
