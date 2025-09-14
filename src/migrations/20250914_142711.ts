import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-vercel-postgres'

export async function up({ db, payload, req }: MigrateUpArgs): Promise<void> {
  await db.execute(sql`
   CREATE TYPE "public"."enum_patients_sleep_sleep_tests_icon" AS ENUM('brain', 'heart', 'lungs', 'moon', 'activity', 'stethoscope', 'baby');
  CREATE TYPE "public"."enum_patients_sleep_sleep_tests_link_type" AS ENUM('internal', 'external');
  CREATE TYPE "public"."enum_patients_sleep_background_color" AS ENUM('white', 'ds-light-neutral', 'blue-50', 'green-50');
  CREATE TYPE "public"."enum_patients_sleep_cta_section_cta_link_type" AS ENUM('internal', 'external');
  CREATE TYPE "public"."enum__patients_sleep_v_sleep_tests_icon" AS ENUM('brain', 'heart', 'lungs', 'moon', 'activity', 'stethoscope', 'baby');
  CREATE TYPE "public"."enum__patients_sleep_v_sleep_tests_link_type" AS ENUM('internal', 'external');
  CREATE TYPE "public"."enum__patients_sleep_v_background_color" AS ENUM('white', 'ds-light-neutral', 'blue-50', 'green-50');
  CREATE TYPE "public"."enum__patients_sleep_v_cta_section_cta_link_type" AS ENUM('internal', 'external');
  CREATE TABLE "patients_sleep_sleep_tests" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"title" varchar,
  	"description" varchar,
  	"best_for" varchar,
  	"icon" "enum_patients_sleep_sleep_tests_icon" DEFAULT 'brain',
  	"badge" varchar,
  	"button_text" varchar DEFAULT 'Learn more',
  	"link_type" "enum_patients_sleep_sleep_tests_link_type" DEFAULT 'internal',
  	"internal_link_id" integer,
  	"external_link" varchar
  );
  
  CREATE TABLE "patients_sleep_faq_section_faqs" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"question" varchar,
  	"answer" varchar
  );
  
  CREATE TABLE "patients_sleep" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"title" varchar,
  	"subtitle" varchar,
  	"background_color" "enum_patients_sleep_background_color" DEFAULT 'white',
  	"about_section_enabled" boolean DEFAULT true,
  	"about_section_title" varchar DEFAULT 'About Our sleep services',
  	"about_section_description" varchar DEFAULT 'A sleep test is a medical assessment conducted overnight to measure brain activity, breathing patterns, oxygen level, heart rhythm and body movements to diagnose potential sleep disorders. At Independent Physiological Diagnostics (IPD) we assess and manage a wide variety of sleep disorders, such as obstructive sleep apnoea (OSA), insomnia, parasomnias, restless leg syndrome, snoring, and other complex sleep-related conditions. Every patient receives personalised care, with results analysed and reported by our national consultant network to ensure clinical accuracy',
  	"pediatric_section_enabled" boolean DEFAULT true,
  	"pediatric_section_title" varchar DEFAULT 'Paediatric Sleep Testing',
  	"pediatric_section_description" varchar DEFAULT 'IPD provides gentle, home-based sleep studies for children of all ages. Our experienced team helps families prepare, ensures a comfortable experience, and delivers reliable results.',
  	"pediatric_section_additional_text" varchar DEFAULT 'Our paediatric team is here to help if you have questions about your child''s sleep test or want advice on which service is best.',
  	"cta_section_enabled" boolean DEFAULT true,
  	"cta_section_title" varchar DEFAULT 'Ready to Book Your Sleep Study?',
  	"cta_section_description" varchar DEFAULT 'Get the answers you need for better sleep and improved health.',
  	"cta_section_button_text" varchar DEFAULT 'Contact us to book your sleep study',
  	"cta_section_phone_text" varchar DEFAULT 'Or call our friendly team for advice',
  	"cta_section_cta_link_type" "enum_patients_sleep_cta_section_cta_link_type" DEFAULT 'internal',
  	"cta_section_cta_internal_link_id" integer,
  	"cta_section_cta_external_link" varchar,
  	"faq_section_enabled" boolean DEFAULT true,
  	"faq_section_title" varchar DEFAULT 'Frequently Asked Questions',
  	"faq_section_subtitle" varchar DEFAULT 'Common questions about our sleep testing services',
  	"block_name" varchar
  );
  
  CREATE TABLE "_patients_sleep_v_sleep_tests" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"title" varchar,
  	"description" varchar,
  	"best_for" varchar,
  	"icon" "enum__patients_sleep_v_sleep_tests_icon" DEFAULT 'brain',
  	"badge" varchar,
  	"button_text" varchar DEFAULT 'Learn more',
  	"link_type" "enum__patients_sleep_v_sleep_tests_link_type" DEFAULT 'internal',
  	"internal_link_id" integer,
  	"external_link" varchar,
  	"_uuid" varchar
  );
  
  CREATE TABLE "_patients_sleep_v_faq_section_faqs" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"question" varchar,
  	"answer" varchar,
  	"_uuid" varchar
  );
  
  CREATE TABLE "_patients_sleep_v" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"title" varchar,
  	"subtitle" varchar,
  	"background_color" "enum__patients_sleep_v_background_color" DEFAULT 'white',
  	"about_section_enabled" boolean DEFAULT true,
  	"about_section_title" varchar DEFAULT 'About Our sleep services',
  	"about_section_description" varchar DEFAULT 'A sleep test is a medical assessment conducted overnight to measure brain activity, breathing patterns, oxygen level, heart rhythm and body movements to diagnose potential sleep disorders. At Independent Physiological Diagnostics (IPD) we assess and manage a wide variety of sleep disorders, such as obstructive sleep apnoea (OSA), insomnia, parasomnias, restless leg syndrome, snoring, and other complex sleep-related conditions. Every patient receives personalised care, with results analysed and reported by our national consultant network to ensure clinical accuracy',
  	"pediatric_section_enabled" boolean DEFAULT true,
  	"pediatric_section_title" varchar DEFAULT 'Paediatric Sleep Testing',
  	"pediatric_section_description" varchar DEFAULT 'IPD provides gentle, home-based sleep studies for children of all ages. Our experienced team helps families prepare, ensures a comfortable experience, and delivers reliable results.',
  	"pediatric_section_additional_text" varchar DEFAULT 'Our paediatric team is here to help if you have questions about your child''s sleep test or want advice on which service is best.',
  	"cta_section_enabled" boolean DEFAULT true,
  	"cta_section_title" varchar DEFAULT 'Ready to Book Your Sleep Study?',
  	"cta_section_description" varchar DEFAULT 'Get the answers you need for better sleep and improved health.',
  	"cta_section_button_text" varchar DEFAULT 'Contact us to book your sleep study',
  	"cta_section_phone_text" varchar DEFAULT 'Or call our friendly team for advice',
  	"cta_section_cta_link_type" "enum__patients_sleep_v_cta_section_cta_link_type" DEFAULT 'internal',
  	"cta_section_cta_internal_link_id" integer,
  	"cta_section_cta_external_link" varchar,
  	"faq_section_enabled" boolean DEFAULT true,
  	"faq_section_title" varchar DEFAULT 'Frequently Asked Questions',
  	"faq_section_subtitle" varchar DEFAULT 'Common questions about our sleep testing services',
  	"_uuid" varchar,
  	"block_name" varchar
  );
  
  ALTER TABLE "header" DROP CONSTRAINT "header_logo_id_media_id_fk";
  
  DROP INDEX "header_logo_idx";
  ALTER TABLE "patients_sleep_sleep_tests" ADD CONSTRAINT "patients_sleep_sleep_tests_internal_link_id_pages_id_fk" FOREIGN KEY ("internal_link_id") REFERENCES "public"."pages"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "patients_sleep_sleep_tests" ADD CONSTRAINT "patients_sleep_sleep_tests_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."patients_sleep"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "patients_sleep_faq_section_faqs" ADD CONSTRAINT "patients_sleep_faq_section_faqs_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."patients_sleep"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "patients_sleep" ADD CONSTRAINT "patients_sleep_cta_section_cta_internal_link_id_pages_id_fk" FOREIGN KEY ("cta_section_cta_internal_link_id") REFERENCES "public"."pages"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "patients_sleep" ADD CONSTRAINT "patients_sleep_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_patients_sleep_v_sleep_tests" ADD CONSTRAINT "_patients_sleep_v_sleep_tests_internal_link_id_pages_id_fk" FOREIGN KEY ("internal_link_id") REFERENCES "public"."pages"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_patients_sleep_v_sleep_tests" ADD CONSTRAINT "_patients_sleep_v_sleep_tests_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_patients_sleep_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_patients_sleep_v_faq_section_faqs" ADD CONSTRAINT "_patients_sleep_v_faq_section_faqs_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_patients_sleep_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_patients_sleep_v" ADD CONSTRAINT "_patients_sleep_v_cta_section_cta_internal_link_id_pages_id_fk" FOREIGN KEY ("cta_section_cta_internal_link_id") REFERENCES "public"."pages"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_patients_sleep_v" ADD CONSTRAINT "_patients_sleep_v_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v"("id") ON DELETE cascade ON UPDATE no action;
  CREATE INDEX "patients_sleep_sleep_tests_order_idx" ON "patients_sleep_sleep_tests" USING btree ("_order");
  CREATE INDEX "patients_sleep_sleep_tests_parent_id_idx" ON "patients_sleep_sleep_tests" USING btree ("_parent_id");
  CREATE INDEX "patients_sleep_sleep_tests_internal_link_idx" ON "patients_sleep_sleep_tests" USING btree ("internal_link_id");
  CREATE INDEX "patients_sleep_faq_section_faqs_order_idx" ON "patients_sleep_faq_section_faqs" USING btree ("_order");
  CREATE INDEX "patients_sleep_faq_section_faqs_parent_id_idx" ON "patients_sleep_faq_section_faqs" USING btree ("_parent_id");
  CREATE INDEX "patients_sleep_order_idx" ON "patients_sleep" USING btree ("_order");
  CREATE INDEX "patients_sleep_parent_id_idx" ON "patients_sleep" USING btree ("_parent_id");
  CREATE INDEX "patients_sleep_path_idx" ON "patients_sleep" USING btree ("_path");
  CREATE INDEX "patients_sleep_cta_section_cta_section_cta_internal_link_idx" ON "patients_sleep" USING btree ("cta_section_cta_internal_link_id");
  CREATE INDEX "_patients_sleep_v_sleep_tests_order_idx" ON "_patients_sleep_v_sleep_tests" USING btree ("_order");
  CREATE INDEX "_patients_sleep_v_sleep_tests_parent_id_idx" ON "_patients_sleep_v_sleep_tests" USING btree ("_parent_id");
  CREATE INDEX "_patients_sleep_v_sleep_tests_internal_link_idx" ON "_patients_sleep_v_sleep_tests" USING btree ("internal_link_id");
  CREATE INDEX "_patients_sleep_v_faq_section_faqs_order_idx" ON "_patients_sleep_v_faq_section_faqs" USING btree ("_order");
  CREATE INDEX "_patients_sleep_v_faq_section_faqs_parent_id_idx" ON "_patients_sleep_v_faq_section_faqs" USING btree ("_parent_id");
  CREATE INDEX "_patients_sleep_v_order_idx" ON "_patients_sleep_v" USING btree ("_order");
  CREATE INDEX "_patients_sleep_v_parent_id_idx" ON "_patients_sleep_v" USING btree ("_parent_id");
  CREATE INDEX "_patients_sleep_v_path_idx" ON "_patients_sleep_v" USING btree ("_path");
  CREATE INDEX "_patients_sleep_v_cta_section_cta_section_cta_internal_link_idx" ON "_patients_sleep_v" USING btree ("cta_section_cta_internal_link_id");
  ALTER TABLE "header" DROP COLUMN "logo_id";
  ALTER TABLE "header" DROP COLUMN "enable_banter";
  ALTER TABLE "header" DROP COLUMN "header_description";`)
}

export async function down({ db, payload, req }: MigrateDownArgs): Promise<void> {
  await db.execute(sql`
   ALTER TABLE "patients_sleep_sleep_tests" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "patients_sleep_faq_section_faqs" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "patients_sleep" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_patients_sleep_v_sleep_tests" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_patients_sleep_v_faq_section_faqs" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_patients_sleep_v" DISABLE ROW LEVEL SECURITY;
  DROP TABLE "patients_sleep_sleep_tests" CASCADE;
  DROP TABLE "patients_sleep_faq_section_faqs" CASCADE;
  DROP TABLE "patients_sleep" CASCADE;
  DROP TABLE "_patients_sleep_v_sleep_tests" CASCADE;
  DROP TABLE "_patients_sleep_v_faq_section_faqs" CASCADE;
  DROP TABLE "_patients_sleep_v" CASCADE;
  ALTER TABLE "header" ADD COLUMN "logo_id" integer;
  ALTER TABLE "header" ADD COLUMN "enable_banter" boolean DEFAULT false;
  ALTER TABLE "header" ADD COLUMN "header_description" varchar;
  ALTER TABLE "header" ADD CONSTRAINT "header_logo_id_media_id_fk" FOREIGN KEY ("logo_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  CREATE INDEX "header_logo_idx" ON "header" USING btree ("logo_id");
  DROP TYPE "public"."enum_patients_sleep_sleep_tests_icon";
  DROP TYPE "public"."enum_patients_sleep_sleep_tests_link_type";
  DROP TYPE "public"."enum_patients_sleep_background_color";
  DROP TYPE "public"."enum_patients_sleep_cta_section_cta_link_type";
  DROP TYPE "public"."enum__patients_sleep_v_sleep_tests_icon";
  DROP TYPE "public"."enum__patients_sleep_v_sleep_tests_link_type";
  DROP TYPE "public"."enum__patients_sleep_v_background_color";
  DROP TYPE "public"."enum__patients_sleep_v_cta_section_cta_link_type";`)
}
