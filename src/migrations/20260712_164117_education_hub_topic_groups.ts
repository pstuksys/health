import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-vercel-postgres'

export async function up({ db, payload, req }: MigrateUpArgs): Promise<void> {
  await db.execute(sql`
   DROP TABLE "education_hub_explore_topics_topics" CASCADE;
  ALTER TABLE "education_hub" ADD COLUMN "explore_topics_understanding_sleep_disorders_enabled" boolean DEFAULT true;
  ALTER TABLE "education_hub" ADD COLUMN "explore_topics_understanding_sleep_disorders_label" varchar DEFAULT 'Understanding Sleep Disorders' NOT NULL;
  ALTER TABLE "education_hub" ADD COLUMN "explore_topics_understanding_sleep_disorders_description" varchar DEFAULT 'Learn about the causes, symptoms and health risks of common sleep disorders.' NOT NULL;
  ALTER TABLE "education_hub" ADD COLUMN "explore_topics_diagnostics_treatment_enabled" boolean DEFAULT true;
  ALTER TABLE "education_hub" ADD COLUMN "explore_topics_diagnostics_treatment_label" varchar DEFAULT 'Diagnostics & Treatment' NOT NULL;
  ALTER TABLE "education_hub" ADD COLUMN "explore_topics_diagnostics_treatment_description" varchar DEFAULT 'Understand sleep studies, CPAP therapy and how treatment can improve your sleep.' NOT NULL;
  ALTER TABLE "education_hub" ADD COLUMN "explore_topics_specialist_insights_enabled" boolean DEFAULT true;
  ALTER TABLE "education_hub" ADD COLUMN "explore_topics_specialist_insights_label" varchar DEFAULT 'Specialist Insights' NOT NULL;
  ALTER TABLE "education_hub" ADD COLUMN "explore_topics_specialist_insights_description" varchar DEFAULT 'Expert perspectives from our clinical partners across a range of specialties.' NOT NULL;
  ALTER TABLE "education_hub" ADD COLUMN "explore_topics_lifestyle_tips_enabled" boolean DEFAULT true;
  ALTER TABLE "education_hub" ADD COLUMN "explore_topics_lifestyle_tips_label" varchar DEFAULT 'Lifestyle & Tips' NOT NULL;
  ALTER TABLE "education_hub" ADD COLUMN "explore_topics_lifestyle_tips_description" varchar DEFAULT 'Practical advice to help you sleep and live better.' NOT NULL;
  ALTER TABLE "education_hub" ADD COLUMN "explore_topics_featured_enabled" boolean DEFAULT true;
  ALTER TABLE "education_hub" ADD COLUMN "explore_topics_featured_label" varchar DEFAULT 'Featured In' NOT NULL;
  ALTER TABLE "education_hub" ADD COLUMN "explore_topics_featured_description" varchar DEFAULT 'Where our specialists and services have been featured.' NOT NULL;
  DROP TYPE "public"."enum_education_hub_explore_topics_topics_topic_id";`)
}

export async function down({ db, payload, req }: MigrateDownArgs): Promise<void> {
  await db.execute(sql`
   CREATE TYPE "public"."enum_education_hub_explore_topics_topics_topic_id" AS ENUM('understanding-sleep-disorders', 'diagnostics-treatment', 'specialist-insights', 'lifestyle-tips', 'featured');
  CREATE TABLE "education_hub_explore_topics_topics" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"topic_id" "enum_education_hub_explore_topics_topics_topic_id" NOT NULL,
  	"label" varchar NOT NULL,
  	"description" varchar NOT NULL,
  	"enabled" boolean DEFAULT true
  );
  
  ALTER TABLE "education_hub_explore_topics_topics" ADD CONSTRAINT "education_hub_explore_topics_topics_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."education_hub"("id") ON DELETE cascade ON UPDATE no action;
  CREATE INDEX "education_hub_explore_topics_topics_order_idx" ON "education_hub_explore_topics_topics" USING btree ("_order");
  CREATE INDEX "education_hub_explore_topics_topics_parent_id_idx" ON "education_hub_explore_topics_topics" USING btree ("_parent_id");
  ALTER TABLE "education_hub" DROP COLUMN "explore_topics_understanding_sleep_disorders_enabled";
  ALTER TABLE "education_hub" DROP COLUMN "explore_topics_understanding_sleep_disorders_label";
  ALTER TABLE "education_hub" DROP COLUMN "explore_topics_understanding_sleep_disorders_description";
  ALTER TABLE "education_hub" DROP COLUMN "explore_topics_diagnostics_treatment_enabled";
  ALTER TABLE "education_hub" DROP COLUMN "explore_topics_diagnostics_treatment_label";
  ALTER TABLE "education_hub" DROP COLUMN "explore_topics_diagnostics_treatment_description";
  ALTER TABLE "education_hub" DROP COLUMN "explore_topics_specialist_insights_enabled";
  ALTER TABLE "education_hub" DROP COLUMN "explore_topics_specialist_insights_label";
  ALTER TABLE "education_hub" DROP COLUMN "explore_topics_specialist_insights_description";
  ALTER TABLE "education_hub" DROP COLUMN "explore_topics_lifestyle_tips_enabled";
  ALTER TABLE "education_hub" DROP COLUMN "explore_topics_lifestyle_tips_label";
  ALTER TABLE "education_hub" DROP COLUMN "explore_topics_lifestyle_tips_description";
  ALTER TABLE "education_hub" DROP COLUMN "explore_topics_featured_enabled";
  ALTER TABLE "education_hub" DROP COLUMN "explore_topics_featured_label";
  ALTER TABLE "education_hub" DROP COLUMN "explore_topics_featured_description";`)
}
