import {
  pgTable,
  serial,
  varchar,
  timestamp,
  inet,
  text,
  boolean,
  integer,
  json,
  index,
} from "drizzle-orm/pg-core";

export const betaSignups = pgTable(
  "beta_signups",
  {
    id: serial("id").primaryKey(),
    email: varchar("email", { length: 255 }).notNull(),
    normalizedEmail: varchar("normalized_email", { length: 255 })
      .notNull()
      .unique(),
    wantsDonation: boolean("wants_donation").default(false).notNull(),
    hasSeenDonationModal: boolean("has_seen_donation_modal")
      .default(false)
      .notNull(),
    createdAt: timestamp("created_at", { withTimezone: true })
      .defaultNow()
      .notNull(),
    ipAddress: inet("ip_address"),
    userAgent: text("user_agent"),
  },
  (table) => [
    index("idx_beta_signups_normalized_email").on(table.normalizedEmail),
    index("idx_beta_signups_created_at").on(table.createdAt.desc()),
    index("idx_beta_signups_wants_donation").on(table.wantsDonation),
  ]
);

export type BetaSignup = typeof betaSignups.$inferSelect;
export type NewBetaSignup = typeof betaSignups.$inferInsert;

// Analytics events table
export const analyticsEvents = pgTable(
  "analytics_events",
  {
    id: serial("id").primaryKey(),
    eventName: varchar("event_name", { length: 100 }).notNull(),
    eventCategory: varchar("event_category", { length: 50 }).notNull(),
    eventLabel: varchar("event_label", { length: 255 }),
    eventValue: integer("event_value"),
    userId: varchar("user_id", { length: 255 }), // Can be email or session ID
    sessionId: varchar("session_id", { length: 255 }),
    ipAddress: inet("ip_address"),
    userAgent: text("user_agent"),
    referrer: text("referrer"),
    pageUrl: text("page_url"),
    metadata: json("metadata"), // Store additional event data
    createdAt: timestamp("created_at", { withTimezone: true })
      .defaultNow()
      .notNull(),
  },
  (table) => [
    index("idx_analytics_events_name").on(table.eventName),
    index("idx_analytics_events_category").on(table.eventCategory),
    index("idx_analytics_events_user_id").on(table.userId),
    index("idx_analytics_events_created_at").on(table.createdAt.desc()),
  ]
);

// Email analytics table
export const emailAnalytics = pgTable(
  "email_analytics",
  {
    id: serial("id").primaryKey(),
    emailId: varchar("email_id", { length: 255 }).notNull(), // Resend email ID
    recipientEmail: varchar("recipient_email", { length: 255 }).notNull(),
    campaignName: varchar("campaign_name", { length: 100 }).notNull(),
    eventType: varchar("event_type", { length: 50 }).notNull(), // sent, delivered, opened, clicked, bounced
    eventData: json("event_data"), // Additional email event data
    ipAddress: inet("ip_address"),
    userAgent: text("user_agent"),
    createdAt: timestamp("created_at", { withTimezone: true })
      .defaultNow()
      .notNull(),
  },
  (table) => [
    index("idx_email_analytics_email_id").on(table.emailId),
    index("idx_email_analytics_recipient").on(table.recipientEmail),
    index("idx_email_analytics_campaign").on(table.campaignName),
    index("idx_email_analytics_event_type").on(table.eventType),
    index("idx_email_analytics_created_at").on(table.createdAt.desc()),
  ]
);

export type AnalyticsEvent = typeof analyticsEvents.$inferSelect;
export type NewAnalyticsEvent = typeof analyticsEvents.$inferInsert;
export type EmailAnalytics = typeof emailAnalytics.$inferSelect;
export type NewEmailAnalytics = typeof emailAnalytics.$inferInsert;
