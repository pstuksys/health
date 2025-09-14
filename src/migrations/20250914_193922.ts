import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-vercel-postgres'

export async function up({ db, payload, req }: MigrateUpArgs): Promise<void> {
  await db.execute(sql`
   CREATE TYPE "public"."enum_corporate_health_why_focus_section_statistics_color" AS ENUM('red', 'orange', 'green', 'blue');
  CREATE TYPE "public"."enum_corporate_health_services_section_left_services_icon" AS ENUM('users', 'trending-up', 'shield', 'check-circle', 'clock');
  CREATE TYPE "public"."enum_corporate_health_services_section_right_services_icon" AS ENUM('users', 'trending-up', 'shield', 'check-circle', 'clock');
  CREATE TYPE "public"."enum_corporate_health_hero_section_cta_button_link_type" AS ENUM('internal', 'external');
  CREATE TYPE "public"."enum_corporate_health_services_section_cta_button_link_type" AS ENUM('internal', 'external');
  CREATE TYPE "public"."enum__corporate_health_v_why_focus_section_statistics_color" AS ENUM('red', 'orange', 'green', 'blue');
  CREATE TYPE "public"."enum__corporate_health_v_services_section_left_services_icon" AS ENUM('users', 'trending-up', 'shield', 'check-circle', 'clock');
  CREATE TYPE "public"."enum__corporate_health_v_services_section_right_services_icon" AS ENUM('users', 'trending-up', 'shield', 'check-circle', 'clock');
  CREATE TYPE "public"."enum__corporate_health_v_hero_section_cta_button_link_type" AS ENUM('internal', 'external');
  CREATE TYPE "public"."enum__corporate_health_v_services_section_cta_button_link_type" AS ENUM('internal', 'external');
  CREATE TABLE "corporate_health_why_focus_section_statistics" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"value" varchar,
  	"description" varchar,
  	"color" "enum_corporate_health_why_focus_section_statistics_color" DEFAULT 'blue'
  );
  
  CREATE TABLE "corporate_health_services_section_left_services" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"icon" "enum_corporate_health_services_section_left_services_icon" DEFAULT 'users',
  	"title" varchar,
  	"description" varchar
  );
  
  CREATE TABLE "corporate_health_services_section_right_services" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"icon" "enum_corporate_health_services_section_right_services_icon" DEFAULT 'users',
  	"title" varchar,
  	"description" varchar
  );
  
  CREATE TABLE "corporate_health" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"hero_section_title" varchar DEFAULT 'Corporate Sleep Health Solutions',
  	"hero_section_quote" varchar DEFAULT '"Help Your Team Sleep Better, Live Better, and Work Smarter"',
  	"hero_section_description" varchar DEFAULT 'Independent Physiological Diagnostics (IPD) works with companies of all sizes to address the root causes of fatigue, boost performance, and support mental and physical health across your workforce. As a leading provider of workplace sleep diagnostics, IPD partners with corporate entities to transform employee wellbeing through expert-led sleep health solutions.',
  	"hero_section_image_id" integer,
  	"hero_section_image_alt" varchar DEFAULT 'Professional workplace wellness and sleep health',
  	"hero_section_cta_button_text" varchar DEFAULT 'Enquire with us',
  	"hero_section_cta_button_link_type" "enum_corporate_health_hero_section_cta_button_link_type" DEFAULT 'internal',
  	"hero_section_cta_button_internal_id" integer,
  	"hero_section_cta_button_external" varchar,
  	"hero_section_cta_button_open_in_new_tab" boolean DEFAULT false,
  	"why_focus_section_title" varchar DEFAULT 'Why Focus on Corporate Sleep Health?',
  	"why_focus_section_description" varchar DEFAULT 'Quality sleep is the foundation of a healthy, high-performing workforce. Yet, sleep disorders such as insomnia and obstructive sleep apnoea, go undetected in corporate settings, impacting productivity, safety, and overall employee wellbeing.',
  	"why_focus_section_highlight_text" varchar DEFAULT 'Poor sleep is linked to depression, anxiety, burnout, and cardiovascular disease.',
  	"why_focus_section_additional_text" varchar DEFAULT 'Sleep-improvement programmes can lead to a 17% boost in productivity and up to 30% fewer days lost to absence. By proactively addressing sleep health, you improve wellbeing, reduce errors, and build a healthier, more focused workforce.',
  	"services_section_title" varchar DEFAULT 'Why Partner with IPD for Corporate Sleep Health?',
  	"services_section_description" varchar DEFAULT 'IPD designs flexible, scalable, and fully confidential sleep health solutions for organisations of all sizes. Our corporate sleep health services include:',
  	"services_section_cta_text" varchar DEFAULT 'To learn more about our corporate sleep health packages, enquire with us',
  	"services_section_cta_button_text" varchar DEFAULT 'Get Started Today',
  	"services_section_cta_button_link_type" "enum_corporate_health_services_section_cta_button_link_type" DEFAULT 'internal',
  	"services_section_cta_button_internal_id" integer,
  	"services_section_cta_button_external" varchar,
  	"services_section_cta_button_open_in_new_tab" boolean DEFAULT false,
  	"block_name" varchar
  );
  
  CREATE TABLE "_corporate_health_v_why_focus_section_statistics" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"value" varchar,
  	"description" varchar,
  	"color" "enum__corporate_health_v_why_focus_section_statistics_color" DEFAULT 'blue',
  	"_uuid" varchar
  );
  
  CREATE TABLE "_corporate_health_v_services_section_left_services" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"icon" "enum__corporate_health_v_services_section_left_services_icon" DEFAULT 'users',
  	"title" varchar,
  	"description" varchar,
  	"_uuid" varchar
  );
  
  CREATE TABLE "_corporate_health_v_services_section_right_services" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"icon" "enum__corporate_health_v_services_section_right_services_icon" DEFAULT 'users',
  	"title" varchar,
  	"description" varchar,
  	"_uuid" varchar
  );
  
  CREATE TABLE "_corporate_health_v" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"hero_section_title" varchar DEFAULT 'Corporate Sleep Health Solutions',
  	"hero_section_quote" varchar DEFAULT '"Help Your Team Sleep Better, Live Better, and Work Smarter"',
  	"hero_section_description" varchar DEFAULT 'Independent Physiological Diagnostics (IPD) works with companies of all sizes to address the root causes of fatigue, boost performance, and support mental and physical health across your workforce. As a leading provider of workplace sleep diagnostics, IPD partners with corporate entities to transform employee wellbeing through expert-led sleep health solutions.',
  	"hero_section_image_id" integer,
  	"hero_section_image_alt" varchar DEFAULT 'Professional workplace wellness and sleep health',
  	"hero_section_cta_button_text" varchar DEFAULT 'Enquire with us',
  	"hero_section_cta_button_link_type" "enum__corporate_health_v_hero_section_cta_button_link_type" DEFAULT 'internal',
  	"hero_section_cta_button_internal_id" integer,
  	"hero_section_cta_button_external" varchar,
  	"hero_section_cta_button_open_in_new_tab" boolean DEFAULT false,
  	"why_focus_section_title" varchar DEFAULT 'Why Focus on Corporate Sleep Health?',
  	"why_focus_section_description" varchar DEFAULT 'Quality sleep is the foundation of a healthy, high-performing workforce. Yet, sleep disorders such as insomnia and obstructive sleep apnoea, go undetected in corporate settings, impacting productivity, safety, and overall employee wellbeing.',
  	"why_focus_section_highlight_text" varchar DEFAULT 'Poor sleep is linked to depression, anxiety, burnout, and cardiovascular disease.',
  	"why_focus_section_additional_text" varchar DEFAULT 'Sleep-improvement programmes can lead to a 17% boost in productivity and up to 30% fewer days lost to absence. By proactively addressing sleep health, you improve wellbeing, reduce errors, and build a healthier, more focused workforce.',
  	"services_section_title" varchar DEFAULT 'Why Partner with IPD for Corporate Sleep Health?',
  	"services_section_description" varchar DEFAULT 'IPD designs flexible, scalable, and fully confidential sleep health solutions for organisations of all sizes. Our corporate sleep health services include:',
  	"services_section_cta_text" varchar DEFAULT 'To learn more about our corporate sleep health packages, enquire with us',
  	"services_section_cta_button_text" varchar DEFAULT 'Get Started Today',
  	"services_section_cta_button_link_type" "enum__corporate_health_v_services_section_cta_button_link_type" DEFAULT 'internal',
  	"services_section_cta_button_internal_id" integer,
  	"services_section_cta_button_external" varchar,
  	"services_section_cta_button_open_in_new_tab" boolean DEFAULT false,
  	"_uuid" varchar,
  	"block_name" varchar
  );
  
  ALTER TABLE "corporate_health_why_focus_section_statistics" ADD CONSTRAINT "corporate_health_why_focus_section_statistics_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."corporate_health"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "corporate_health_services_section_left_services" ADD CONSTRAINT "corporate_health_services_section_left_services_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."corporate_health"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "corporate_health_services_section_right_services" ADD CONSTRAINT "corporate_health_services_section_right_services_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."corporate_health"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "corporate_health" ADD CONSTRAINT "corporate_health_hero_section_image_id_media_id_fk" FOREIGN KEY ("hero_section_image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "corporate_health" ADD CONSTRAINT "corporate_health_hero_section_cta_button_internal_id_pages_id_fk" FOREIGN KEY ("hero_section_cta_button_internal_id") REFERENCES "public"."pages"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "corporate_health" ADD CONSTRAINT "corporate_health_services_section_cta_button_internal_id_pages_id_fk" FOREIGN KEY ("services_section_cta_button_internal_id") REFERENCES "public"."pages"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "corporate_health" ADD CONSTRAINT "corporate_health_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_corporate_health_v_why_focus_section_statistics" ADD CONSTRAINT "_corporate_health_v_why_focus_section_statistics_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_corporate_health_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_corporate_health_v_services_section_left_services" ADD CONSTRAINT "_corporate_health_v_services_section_left_services_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_corporate_health_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_corporate_health_v_services_section_right_services" ADD CONSTRAINT "_corporate_health_v_services_section_right_services_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_corporate_health_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_corporate_health_v" ADD CONSTRAINT "_corporate_health_v_hero_section_image_id_media_id_fk" FOREIGN KEY ("hero_section_image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_corporate_health_v" ADD CONSTRAINT "_corporate_health_v_hero_section_cta_button_internal_id_pages_id_fk" FOREIGN KEY ("hero_section_cta_button_internal_id") REFERENCES "public"."pages"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_corporate_health_v" ADD CONSTRAINT "_corporate_health_v_services_section_cta_button_internal_id_pages_id_fk" FOREIGN KEY ("services_section_cta_button_internal_id") REFERENCES "public"."pages"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_corporate_health_v" ADD CONSTRAINT "_corporate_health_v_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v"("id") ON DELETE cascade ON UPDATE no action;
  CREATE INDEX "corporate_health_why_focus_section_statistics_order_idx" ON "corporate_health_why_focus_section_statistics" USING btree ("_order");
  CREATE INDEX "corporate_health_why_focus_section_statistics_parent_id_idx" ON "corporate_health_why_focus_section_statistics" USING btree ("_parent_id");
  CREATE INDEX "corporate_health_services_section_left_services_order_idx" ON "corporate_health_services_section_left_services" USING btree ("_order");
  CREATE INDEX "corporate_health_services_section_left_services_parent_id_idx" ON "corporate_health_services_section_left_services" USING btree ("_parent_id");
  CREATE INDEX "corporate_health_services_section_right_services_order_idx" ON "corporate_health_services_section_right_services" USING btree ("_order");
  CREATE INDEX "corporate_health_services_section_right_services_parent_id_idx" ON "corporate_health_services_section_right_services" USING btree ("_parent_id");
  CREATE INDEX "corporate_health_order_idx" ON "corporate_health" USING btree ("_order");
  CREATE INDEX "corporate_health_parent_id_idx" ON "corporate_health" USING btree ("_parent_id");
  CREATE INDEX "corporate_health_path_idx" ON "corporate_health" USING btree ("_path");
  CREATE INDEX "corporate_health_hero_section_hero_section_image_idx" ON "corporate_health" USING btree ("hero_section_image_id");
  CREATE INDEX "corporate_health_hero_section_cta_button_hero_section_cta_button_internal_idx" ON "corporate_health" USING btree ("hero_section_cta_button_internal_id");
  CREATE INDEX "corporate_health_services_section_cta_button_services_section_cta_button_internal_idx" ON "corporate_health" USING btree ("services_section_cta_button_internal_id");
  CREATE INDEX "_corporate_health_v_why_focus_section_statistics_order_idx" ON "_corporate_health_v_why_focus_section_statistics" USING btree ("_order");
  CREATE INDEX "_corporate_health_v_why_focus_section_statistics_parent_id_idx" ON "_corporate_health_v_why_focus_section_statistics" USING btree ("_parent_id");
  CREATE INDEX "_corporate_health_v_services_section_left_services_order_idx" ON "_corporate_health_v_services_section_left_services" USING btree ("_order");
  CREATE INDEX "_corporate_health_v_services_section_left_services_parent_id_idx" ON "_corporate_health_v_services_section_left_services" USING btree ("_parent_id");
  CREATE INDEX "_corporate_health_v_services_section_right_services_order_idx" ON "_corporate_health_v_services_section_right_services" USING btree ("_order");
  CREATE INDEX "_corporate_health_v_services_section_right_services_parent_id_idx" ON "_corporate_health_v_services_section_right_services" USING btree ("_parent_id");
  CREATE INDEX "_corporate_health_v_order_idx" ON "_corporate_health_v" USING btree ("_order");
  CREATE INDEX "_corporate_health_v_parent_id_idx" ON "_corporate_health_v" USING btree ("_parent_id");
  CREATE INDEX "_corporate_health_v_path_idx" ON "_corporate_health_v" USING btree ("_path");
  CREATE INDEX "_corporate_health_v_hero_section_hero_section_image_idx" ON "_corporate_health_v" USING btree ("hero_section_image_id");
  CREATE INDEX "_corporate_health_v_hero_section_cta_button_hero_section_cta_button_internal_idx" ON "_corporate_health_v" USING btree ("hero_section_cta_button_internal_id");
  CREATE INDEX "_corporate_health_v_services_section_cta_button_services_section_cta_button_internal_idx" ON "_corporate_health_v" USING btree ("services_section_cta_button_internal_id");`)
}

export async function down({ db, payload, req }: MigrateDownArgs): Promise<void> {
  await db.execute(sql`
   DROP TABLE "corporate_health_why_focus_section_statistics" CASCADE;
  DROP TABLE "corporate_health_services_section_left_services" CASCADE;
  DROP TABLE "corporate_health_services_section_right_services" CASCADE;
  DROP TABLE "corporate_health" CASCADE;
  DROP TABLE "_corporate_health_v_why_focus_section_statistics" CASCADE;
  DROP TABLE "_corporate_health_v_services_section_left_services" CASCADE;
  DROP TABLE "_corporate_health_v_services_section_right_services" CASCADE;
  DROP TABLE "_corporate_health_v" CASCADE;
  DROP TYPE "public"."enum_corporate_health_why_focus_section_statistics_color";
  DROP TYPE "public"."enum_corporate_health_services_section_left_services_icon";
  DROP TYPE "public"."enum_corporate_health_services_section_right_services_icon";
  DROP TYPE "public"."enum_corporate_health_hero_section_cta_button_link_type";
  DROP TYPE "public"."enum_corporate_health_services_section_cta_button_link_type";
  DROP TYPE "public"."enum__corporate_health_v_why_focus_section_statistics_color";
  DROP TYPE "public"."enum__corporate_health_v_services_section_left_services_icon";
  DROP TYPE "public"."enum__corporate_health_v_services_section_right_services_icon";
  DROP TYPE "public"."enum__corporate_health_v_hero_section_cta_button_link_type";
  DROP TYPE "public"."enum__corporate_health_v_services_section_cta_button_link_type";`)
}
