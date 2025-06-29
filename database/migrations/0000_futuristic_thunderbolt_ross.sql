CREATE TABLE "beta_signups" (
	"id" serial PRIMARY KEY NOT NULL,
	"email" varchar(255) NOT NULL,
	"normalized_email" varchar(255) NOT NULL,
	"created_at" timestamp with time zone DEFAULT now() NOT NULL,
	"ip_address" "inet",
	"user_agent" text,
	CONSTRAINT "beta_signups_normalized_email_unique" UNIQUE("normalized_email")
);
--> statement-breakpoint
CREATE INDEX "idx_beta_signups_normalized_email" ON "beta_signups" USING btree ("normalized_email");--> statement-breakpoint
CREATE INDEX "idx_beta_signups_created_at" ON "beta_signups" USING btree ("created_at" DESC NULLS LAST);