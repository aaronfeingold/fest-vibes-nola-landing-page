CREATE TABLE "analytics_events" (
	"id" serial PRIMARY KEY NOT NULL,
	"event_name" varchar(100) NOT NULL,
	"event_category" varchar(50) NOT NULL,
	"event_label" varchar(255),
	"event_value" integer,
	"user_id" varchar(255),
	"session_id" varchar(255),
	"ip_address" "inet",
	"user_agent" text,
	"referrer" text,
	"page_url" text,
	"metadata" json,
	"created_at" timestamp with time zone DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "email_analytics" (
	"id" serial PRIMARY KEY NOT NULL,
	"email_id" varchar(255) NOT NULL,
	"recipient_email" varchar(255) NOT NULL,
	"campaign_name" varchar(100) NOT NULL,
	"event_type" varchar(50) NOT NULL,
	"event_data" json,
	"ip_address" "inet",
	"user_agent" text,
	"created_at" timestamp with time zone DEFAULT now() NOT NULL
);
--> statement-breakpoint
ALTER TABLE "beta_signups" ADD COLUMN "wants_donation" boolean DEFAULT false NOT NULL;--> statement-breakpoint
ALTER TABLE "beta_signups" ADD COLUMN "has_seen_donation_modal" boolean DEFAULT false NOT NULL;--> statement-breakpoint
CREATE INDEX "idx_analytics_events_name" ON "analytics_events" USING btree ("event_name");--> statement-breakpoint
CREATE INDEX "idx_analytics_events_category" ON "analytics_events" USING btree ("event_category");--> statement-breakpoint
CREATE INDEX "idx_analytics_events_user_id" ON "analytics_events" USING btree ("user_id");--> statement-breakpoint
CREATE INDEX "idx_analytics_events_created_at" ON "analytics_events" USING btree ("created_at" DESC NULLS LAST);--> statement-breakpoint
CREATE INDEX "idx_email_analytics_email_id" ON "email_analytics" USING btree ("email_id");--> statement-breakpoint
CREATE INDEX "idx_email_analytics_recipient" ON "email_analytics" USING btree ("recipient_email");--> statement-breakpoint
CREATE INDEX "idx_email_analytics_campaign" ON "email_analytics" USING btree ("campaign_name");--> statement-breakpoint
CREATE INDEX "idx_email_analytics_event_type" ON "email_analytics" USING btree ("event_type");--> statement-breakpoint
CREATE INDEX "idx_email_analytics_created_at" ON "email_analytics" USING btree ("created_at" DESC NULLS LAST);--> statement-breakpoint
CREATE INDEX "idx_beta_signups_wants_donation" ON "beta_signups" USING btree ("wants_donation");