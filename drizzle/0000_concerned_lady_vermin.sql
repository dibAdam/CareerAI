CREATE TABLE "analyses" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"user_id" uuid,
	"job_title" text NOT NULL,
	"company" text,
	"job_description" text NOT NULL,
	"cv_text" text NOT NULL,
	"match_score" integer,
	"potential_score" integer,
	"summary" text,
	"missing_keywords" text[],
	"priority_actions" text[],
	"ats_tips" text[],
	"created_at" timestamp with time zone DEFAULT now()
);
--> statement-breakpoint
CREATE TABLE "analysis_sections" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"analysis_id" uuid NOT NULL,
	"section" text NOT NULL,
	"feedback" text NOT NULL,
	"priority" text,
	"created_at" timestamp with time zone DEFAULT now()
);
--> statement-breakpoint
CREATE TABLE "profiles" (
	"id" uuid PRIMARY KEY NOT NULL,
	"full_name" text,
	"avatar_url" text,
	"email" text NOT NULL,
	"provider" text,
	"consent_accepted" boolean DEFAULT false,
	"consent_timestamp" timestamp with time zone,
	"created_at" timestamp with time zone DEFAULT now(),
	"updated_at" timestamp with time zone DEFAULT now(),
	CONSTRAINT "profiles_email_unique" UNIQUE("email")
);
--> statement-breakpoint
CREATE TABLE "anonymous_usage" (
	"id" text PRIMARY KEY NOT NULL,
	"anonymous_id" text NOT NULL,
	"ip_hash" text NOT NULL,
	"user_agent_hash" text NOT NULL,
	"attempt_count" integer DEFAULT 0 NOT NULL,
	"first_used_at" timestamp with time zone DEFAULT now() NOT NULL,
	"last_used_at" timestamp with time zone DEFAULT now() NOT NULL,
	"created_at" timestamp with time zone DEFAULT now() NOT NULL,
	"updated_at" timestamp with time zone DEFAULT now() NOT NULL,
	CONSTRAINT "anonymous_usage_anonymous_id_unique" UNIQUE("anonymous_id")
);
--> statement-breakpoint
ALTER TABLE "analyses" ADD CONSTRAINT "analyses_user_id_profiles_id_fk" FOREIGN KEY ("user_id") REFERENCES "public"."profiles"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "analysis_sections" ADD CONSTRAINT "analysis_sections_analysis_id_analyses_id_fk" FOREIGN KEY ("analysis_id") REFERENCES "public"."analyses"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
CREATE INDEX "anonymous_id_idx" ON "anonymous_usage" USING btree ("anonymous_id");--> statement-breakpoint
CREATE INDEX "ip_hash_idx" ON "anonymous_usage" USING btree ("ip_hash");--> statement-breakpoint
CREATE INDEX "fingerprint_idx" ON "anonymous_usage" USING btree ("ip_hash","user_agent_hash");