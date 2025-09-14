import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-vercel-postgres'

export async function up({ db, payload, req }: MigrateUpArgs): Promise<void> {
  await db.execute(sql`
   CREATE TYPE "public"."enum_occupational_health_hero_section_statistics_icon" AS ENUM('shield', 'clock', 'users', 'trending-up');
  CREATE TYPE "public"."oh_path_link_type" AS ENUM('internal', 'external');
  CREATE TYPE "public"."enum_occupational_health_services_section_services_icon" AS ENUM('stethoscope', 'file-text', 'heart-handshake');
  CREATE TYPE "public"."oh_svc_cta_link_type" AS ENUM('internal', 'external');
  CREATE TYPE "public"."enum_occupational_health_hero_section_osa_link_link_type" AS ENUM('internal', 'external');
  CREATE TYPE "public"."oh_p_cta_link_type" AS ENUM('internal', 'external');
  CREATE TYPE "public"."oh_s_cta_link_type" AS ENUM('internal', 'external');
  CREATE TYPE "public"."oh_cta_p_link_type" AS ENUM('internal', 'external');
  CREATE TYPE "public"."oh_cta_s_link_type" AS ENUM('internal', 'external');
  CREATE TYPE "public"."enum__occupational_health_v_hero_section_statistics_icon" AS ENUM('shield', 'clock', 'users', 'trending-up');
  CREATE TYPE "public"."enum__occupational_health_v_services_section_services_icon" AS ENUM('stethoscope', 'file-text', 'heart-handshake');
  CREATE TYPE "public"."enum__occupational_health_v_hero_section_osa_link_link_type" AS ENUM('internal', 'external');
  CREATE TABLE "occupational_health_hero_section_statistics" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"icon" "enum_occupational_health_hero_section_statistics_icon" DEFAULT 'shield',
  	"value" varchar,
  	"description" varchar
  );
  
  CREATE TABLE "occupational_health_pathway_section_steps" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"step" numeric,
  	"title" varchar,
  	"description" varchar,
  	"button_text" varchar,
  	"link_text" varchar,
  	"link_link_type" "oh_path_link_type" DEFAULT 'internal',
  	"link_internal_relation_id" integer,
  	"link_external_href" varchar
  );
  
  CREATE TABLE "occupational_health_services_section_services" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"icon" "enum_occupational_health_services_section_services_icon" DEFAULT 'stethoscope',
  	"title" varchar,
  	"description" varchar,
  	"cta_text" varchar DEFAULT 'Learn More',
  	"cta_link_type" "oh_svc_cta_link_type" DEFAULT 'internal',
  	"cta_internal_relation_id" integer,
  	"cta_external_href" varchar
  );
  
  CREATE TABLE "occupational_health" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"hero_section_title" varchar DEFAULT 'Supporting Workforce Health',
  	"hero_section_subtitle" varchar DEFAULT 'Through Expert Sleep Diagnostics',
  	"hero_section_description1" varchar DEFAULT 'Occupational health is the medical specialty dedicated to promoting employee wellbeing and managing work-related illnesses. By working closely with occupational health professionals, IPD provides the specialist sleep diagnostics and treatment services that enable organisations to maintain a healthy, safe, and productive workforce.',
  	"hero_section_description2" varchar DEFAULT 'At IPD, our rapid access pathways for assessing and managing sleep disorders such as Obstructive Sleep Apnoea help ensure employees receive swift, accurate diagnoses and timely treatment. This reduces fatigue-related risks in the workplace and supports a faster, safer return to work.',
  	"hero_section_osa_link_text" varchar DEFAULT 'Obstructive Sleep Apnoea',
  	"hero_section_osa_link_link_type" "enum_occupational_health_hero_section_osa_link_link_type" DEFAULT 'internal',
  	"hero_section_osa_link_internal_relation_id" integer,
  	"hero_section_osa_link_external_href" varchar,
  	"hero_section_primary_cta_text" varchar DEFAULT 'Make Referral',
  	"hero_section_primary_cta_link_type" "oh_p_cta_link_type" DEFAULT 'internal',
  	"hero_section_primary_cta_internal_relation_id" integer,
  	"hero_section_primary_cta_external_href" varchar,
  	"hero_section_secondary_cta_text" varchar DEFAULT 'Download OH Guide',
  	"hero_section_secondary_cta_link_type" "oh_s_cta_link_type" DEFAULT 'external',
  	"hero_section_secondary_cta_internal_relation_id" integer,
  	"hero_section_secondary_cta_external_href" varchar,
  	"journey_section_title" varchar DEFAULT 'Patient Journey',
  	"journey_section_description" varchar DEFAULT 'Our comprehensive patient pathway ensures thorough assessment and appropriate treatment options for sleep disorders.',
  	"pathway_section_title" varchar DEFAULT 'Occupational Health Pathway',
  	"pathway_section_description" varchar DEFAULT 'Our streamlined pathway is designed specifically for occupational health professionals, ensuring swift assessment and management of sleep-related workplace risks.',
  	"services_section_title" varchar DEFAULT 'Related Pages',
  	"services_section_description" varchar DEFAULT 'Explore our comprehensive range of sleep diagnostic services',
  	"cta_section_title" varchar DEFAULT 'Ready to Improve Workplace Safety?',
  	"cta_section_description" varchar DEFAULT 'Start referring employees for comprehensive sleep assessments and help reduce fatigue-related workplace incidents while improving overall productivity.',
  	"cta_section_primary_cta_text" varchar DEFAULT 'Make a Referral',
  	"cta_section_primary_cta_link_type" "oh_cta_p_link_type" DEFAULT 'internal',
  	"cta_section_primary_cta_internal_id" integer,
  	"cta_section_primary_cta_external" varchar,
  	"cta_section_secondary_cta_text" varchar DEFAULT 'Download OH Toolkit',
  	"cta_section_secondary_cta_link_type" "oh_cta_s_link_type" DEFAULT 'external',
  	"cta_section_secondary_cta_internal_id" integer,
  	"cta_section_secondary_cta_external" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "_occupational_health_v_hero_section_statistics" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"icon" "enum__occupational_health_v_hero_section_statistics_icon" DEFAULT 'shield',
  	"value" varchar,
  	"description" varchar,
  	"_uuid" varchar
  );
  
  CREATE TABLE "_occupational_health_v_pathway_section_steps" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"step" numeric,
  	"title" varchar,
  	"description" varchar,
  	"button_text" varchar,
  	"link_text" varchar,
  	"link_link_type" "oh_path_link_type" DEFAULT 'internal',
  	"link_internal_relation_id" integer,
  	"link_external_href" varchar,
  	"_uuid" varchar
  );
  
  CREATE TABLE "_occupational_health_v_services_section_services" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"icon" "enum__occupational_health_v_services_section_services_icon" DEFAULT 'stethoscope',
  	"title" varchar,
  	"description" varchar,
  	"cta_text" varchar DEFAULT 'Learn More',
  	"cta_link_type" "oh_svc_cta_link_type" DEFAULT 'internal',
  	"cta_internal_relation_id" integer,
  	"cta_external_href" varchar,
  	"_uuid" varchar
  );
  
  CREATE TABLE "_occupational_health_v" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"hero_section_title" varchar DEFAULT 'Supporting Workforce Health',
  	"hero_section_subtitle" varchar DEFAULT 'Through Expert Sleep Diagnostics',
  	"hero_section_description1" varchar DEFAULT 'Occupational health is the medical specialty dedicated to promoting employee wellbeing and managing work-related illnesses. By working closely with occupational health professionals, IPD provides the specialist sleep diagnostics and treatment services that enable organisations to maintain a healthy, safe, and productive workforce.',
  	"hero_section_description2" varchar DEFAULT 'At IPD, our rapid access pathways for assessing and managing sleep disorders such as Obstructive Sleep Apnoea help ensure employees receive swift, accurate diagnoses and timely treatment. This reduces fatigue-related risks in the workplace and supports a faster, safer return to work.',
  	"hero_section_osa_link_text" varchar DEFAULT 'Obstructive Sleep Apnoea',
  	"hero_section_osa_link_link_type" "enum__occupational_health_v_hero_section_osa_link_link_type" DEFAULT 'internal',
  	"hero_section_osa_link_internal_relation_id" integer,
  	"hero_section_osa_link_external_href" varchar,
  	"hero_section_primary_cta_text" varchar DEFAULT 'Make Referral',
  	"hero_section_primary_cta_link_type" "oh_p_cta_link_type" DEFAULT 'internal',
  	"hero_section_primary_cta_internal_relation_id" integer,
  	"hero_section_primary_cta_external_href" varchar,
  	"hero_section_secondary_cta_text" varchar DEFAULT 'Download OH Guide',
  	"hero_section_secondary_cta_link_type" "oh_s_cta_link_type" DEFAULT 'external',
  	"hero_section_secondary_cta_internal_relation_id" integer,
  	"hero_section_secondary_cta_external_href" varchar,
  	"journey_section_title" varchar DEFAULT 'Patient Journey',
  	"journey_section_description" varchar DEFAULT 'Our comprehensive patient pathway ensures thorough assessment and appropriate treatment options for sleep disorders.',
  	"pathway_section_title" varchar DEFAULT 'Occupational Health Pathway',
  	"pathway_section_description" varchar DEFAULT 'Our streamlined pathway is designed specifically for occupational health professionals, ensuring swift assessment and management of sleep-related workplace risks.',
  	"services_section_title" varchar DEFAULT 'Related Pages',
  	"services_section_description" varchar DEFAULT 'Explore our comprehensive range of sleep diagnostic services',
  	"cta_section_title" varchar DEFAULT 'Ready to Improve Workplace Safety?',
  	"cta_section_description" varchar DEFAULT 'Start referring employees for comprehensive sleep assessments and help reduce fatigue-related workplace incidents while improving overall productivity.',
  	"cta_section_primary_cta_text" varchar DEFAULT 'Make a Referral',
  	"cta_section_primary_cta_link_type" "oh_cta_p_link_type" DEFAULT 'internal',
  	"cta_section_primary_cta_internal_id" integer,
  	"cta_section_primary_cta_external" varchar,
  	"cta_section_secondary_cta_text" varchar DEFAULT 'Download OH Toolkit',
  	"cta_section_secondary_cta_link_type" "oh_cta_s_link_type" DEFAULT 'external',
  	"cta_section_secondary_cta_internal_id" integer,
  	"cta_section_secondary_cta_external" varchar,
  	"_uuid" varchar,
  	"block_name" varchar
  );
  
  ALTER TABLE "occupational_health_hero_section_statistics" ADD CONSTRAINT "occupational_health_hero_section_statistics_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."occupational_health"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "occupational_health_pathway_section_steps" ADD CONSTRAINT "occupational_health_pathway_section_steps_link_internal_relation_id_pages_id_fk" FOREIGN KEY ("link_internal_relation_id") REFERENCES "public"."pages"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "occupational_health_pathway_section_steps" ADD CONSTRAINT "occupational_health_pathway_section_steps_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."occupational_health"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "occupational_health_services_section_services" ADD CONSTRAINT "occupational_health_services_section_services_cta_internal_relation_id_pages_id_fk" FOREIGN KEY ("cta_internal_relation_id") REFERENCES "public"."pages"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "occupational_health_services_section_services" ADD CONSTRAINT "occupational_health_services_section_services_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."occupational_health"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "occupational_health" ADD CONSTRAINT "occupational_health_hero_section_osa_link_internal_relation_id_pages_id_fk" FOREIGN KEY ("hero_section_osa_link_internal_relation_id") REFERENCES "public"."pages"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "occupational_health" ADD CONSTRAINT "occupational_health_hero_section_primary_cta_internal_relation_id_pages_id_fk" FOREIGN KEY ("hero_section_primary_cta_internal_relation_id") REFERENCES "public"."pages"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "occupational_health" ADD CONSTRAINT "occupational_health_hero_section_secondary_cta_internal_relation_id_pages_id_fk" FOREIGN KEY ("hero_section_secondary_cta_internal_relation_id") REFERENCES "public"."pages"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "occupational_health" ADD CONSTRAINT "occupational_health_cta_section_primary_cta_internal_id_pages_id_fk" FOREIGN KEY ("cta_section_primary_cta_internal_id") REFERENCES "public"."pages"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "occupational_health" ADD CONSTRAINT "occupational_health_cta_section_secondary_cta_internal_id_pages_id_fk" FOREIGN KEY ("cta_section_secondary_cta_internal_id") REFERENCES "public"."pages"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "occupational_health" ADD CONSTRAINT "occupational_health_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_occupational_health_v_hero_section_statistics" ADD CONSTRAINT "_occupational_health_v_hero_section_statistics_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_occupational_health_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_occupational_health_v_pathway_section_steps" ADD CONSTRAINT "_occupational_health_v_pathway_section_steps_link_internal_relation_id_pages_id_fk" FOREIGN KEY ("link_internal_relation_id") REFERENCES "public"."pages"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_occupational_health_v_pathway_section_steps" ADD CONSTRAINT "_occupational_health_v_pathway_section_steps_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_occupational_health_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_occupational_health_v_services_section_services" ADD CONSTRAINT "_occupational_health_v_services_section_services_cta_internal_relation_id_pages_id_fk" FOREIGN KEY ("cta_internal_relation_id") REFERENCES "public"."pages"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_occupational_health_v_services_section_services" ADD CONSTRAINT "_occupational_health_v_services_section_services_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_occupational_health_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_occupational_health_v" ADD CONSTRAINT "_occupational_health_v_hero_section_osa_link_internal_relation_id_pages_id_fk" FOREIGN KEY ("hero_section_osa_link_internal_relation_id") REFERENCES "public"."pages"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_occupational_health_v" ADD CONSTRAINT "_occupational_health_v_hero_section_primary_cta_internal_relation_id_pages_id_fk" FOREIGN KEY ("hero_section_primary_cta_internal_relation_id") REFERENCES "public"."pages"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_occupational_health_v" ADD CONSTRAINT "_occupational_health_v_hero_section_secondary_cta_internal_relation_id_pages_id_fk" FOREIGN KEY ("hero_section_secondary_cta_internal_relation_id") REFERENCES "public"."pages"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_occupational_health_v" ADD CONSTRAINT "_occupational_health_v_cta_section_primary_cta_internal_id_pages_id_fk" FOREIGN KEY ("cta_section_primary_cta_internal_id") REFERENCES "public"."pages"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_occupational_health_v" ADD CONSTRAINT "_occupational_health_v_cta_section_secondary_cta_internal_id_pages_id_fk" FOREIGN KEY ("cta_section_secondary_cta_internal_id") REFERENCES "public"."pages"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_occupational_health_v" ADD CONSTRAINT "_occupational_health_v_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v"("id") ON DELETE cascade ON UPDATE no action;
  CREATE INDEX "occupational_health_hero_section_statistics_order_idx" ON "occupational_health_hero_section_statistics" USING btree ("_order");
  CREATE INDEX "occupational_health_hero_section_statistics_parent_id_idx" ON "occupational_health_hero_section_statistics" USING btree ("_parent_id");
  CREATE INDEX "occupational_health_pathway_section_steps_order_idx" ON "occupational_health_pathway_section_steps" USING btree ("_order");
  CREATE INDEX "occupational_health_pathway_section_steps_parent_id_idx" ON "occupational_health_pathway_section_steps" USING btree ("_parent_id");
  CREATE INDEX "occupational_health_pathway_section_steps_link_internal_link_internal_relation_idx" ON "occupational_health_pathway_section_steps" USING btree ("link_internal_relation_id");
  CREATE INDEX "occupational_health_services_section_services_order_idx" ON "occupational_health_services_section_services" USING btree ("_order");
  CREATE INDEX "occupational_health_services_section_services_parent_id_idx" ON "occupational_health_services_section_services" USING btree ("_parent_id");
  CREATE INDEX "occupational_health_services_section_services_cta_internal_cta_internal_relation_idx" ON "occupational_health_services_section_services" USING btree ("cta_internal_relation_id");
  CREATE INDEX "occupational_health_order_idx" ON "occupational_health" USING btree ("_order");
  CREATE INDEX "occupational_health_parent_id_idx" ON "occupational_health" USING btree ("_parent_id");
  CREATE INDEX "occupational_health_path_idx" ON "occupational_health" USING btree ("_path");
  CREATE INDEX "occupational_health_hero_section_osa_link_internal_hero_section_osa_link_internal_relation_idx" ON "occupational_health" USING btree ("hero_section_osa_link_internal_relation_id");
  CREATE INDEX "occupational_health_hero_section_primary_cta_internal_hero_section_primary_cta_internal_relation_idx" ON "occupational_health" USING btree ("hero_section_primary_cta_internal_relation_id");
  CREATE INDEX "occupational_health_hero_section_secondary_cta_internal_hero_section_secondary_cta_internal_relation_idx" ON "occupational_health" USING btree ("hero_section_secondary_cta_internal_relation_id");
  CREATE INDEX "occupational_health_cta_section_primary_cta_cta_section_primary_cta_internal_idx" ON "occupational_health" USING btree ("cta_section_primary_cta_internal_id");
  CREATE INDEX "occupational_health_cta_section_secondary_cta_cta_section_secondary_cta_internal_idx" ON "occupational_health" USING btree ("cta_section_secondary_cta_internal_id");
  CREATE INDEX "_occupational_health_v_hero_section_statistics_order_idx" ON "_occupational_health_v_hero_section_statistics" USING btree ("_order");
  CREATE INDEX "_occupational_health_v_hero_section_statistics_parent_id_idx" ON "_occupational_health_v_hero_section_statistics" USING btree ("_parent_id");
  CREATE INDEX "_occupational_health_v_pathway_section_steps_order_idx" ON "_occupational_health_v_pathway_section_steps" USING btree ("_order");
  CREATE INDEX "_occupational_health_v_pathway_section_steps_parent_id_idx" ON "_occupational_health_v_pathway_section_steps" USING btree ("_parent_id");
  CREATE INDEX "_occupational_health_v_pathway_section_steps_link_internal_link_internal_relation_idx" ON "_occupational_health_v_pathway_section_steps" USING btree ("link_internal_relation_id");
  CREATE INDEX "_occupational_health_v_services_section_services_order_idx" ON "_occupational_health_v_services_section_services" USING btree ("_order");
  CREATE INDEX "_occupational_health_v_services_section_services_parent_id_idx" ON "_occupational_health_v_services_section_services" USING btree ("_parent_id");
  CREATE INDEX "_occupational_health_v_services_section_services_cta_internal_cta_internal_relation_idx" ON "_occupational_health_v_services_section_services" USING btree ("cta_internal_relation_id");
  CREATE INDEX "_occupational_health_v_order_idx" ON "_occupational_health_v" USING btree ("_order");
  CREATE INDEX "_occupational_health_v_parent_id_idx" ON "_occupational_health_v" USING btree ("_parent_id");
  CREATE INDEX "_occupational_health_v_path_idx" ON "_occupational_health_v" USING btree ("_path");
  CREATE INDEX "_occupational_health_v_hero_section_osa_link_internal_hero_section_osa_link_internal_relation_idx" ON "_occupational_health_v" USING btree ("hero_section_osa_link_internal_relation_id");
  CREATE INDEX "_occupational_health_v_hero_section_primary_cta_internal_hero_section_primary_cta_internal_relation_idx" ON "_occupational_health_v" USING btree ("hero_section_primary_cta_internal_relation_id");
  CREATE INDEX "_occupational_health_v_hero_section_secondary_cta_internal_hero_section_secondary_cta_internal_relation_idx" ON "_occupational_health_v" USING btree ("hero_section_secondary_cta_internal_relation_id");
  CREATE INDEX "_occupational_health_v_cta_section_primary_cta_cta_section_primary_cta_internal_idx" ON "_occupational_health_v" USING btree ("cta_section_primary_cta_internal_id");
  CREATE INDEX "_occupational_health_v_cta_section_secondary_cta_cta_section_secondary_cta_internal_idx" ON "_occupational_health_v" USING btree ("cta_section_secondary_cta_internal_id");`)
}

export async function down({ db, payload, req }: MigrateDownArgs): Promise<void> {
  await db.execute(sql`
   DROP TABLE "occupational_health_hero_section_statistics" CASCADE;
  DROP TABLE "occupational_health_pathway_section_steps" CASCADE;
  DROP TABLE "occupational_health_services_section_services" CASCADE;
  DROP TABLE "occupational_health" CASCADE;
  DROP TABLE "_occupational_health_v_hero_section_statistics" CASCADE;
  DROP TABLE "_occupational_health_v_pathway_section_steps" CASCADE;
  DROP TABLE "_occupational_health_v_services_section_services" CASCADE;
  DROP TABLE "_occupational_health_v" CASCADE;
  DROP TYPE "public"."enum_occupational_health_hero_section_statistics_icon";
  DROP TYPE "public"."oh_path_link_type";
  DROP TYPE "public"."enum_occupational_health_services_section_services_icon";
  DROP TYPE "public"."oh_svc_cta_link_type";
  DROP TYPE "public"."enum_occupational_health_hero_section_osa_link_link_type";
  DROP TYPE "public"."oh_p_cta_link_type";
  DROP TYPE "public"."oh_s_cta_link_type";
  DROP TYPE "public"."oh_cta_p_link_type";
  DROP TYPE "public"."oh_cta_s_link_type";
  DROP TYPE "public"."enum__occupational_health_v_hero_section_statistics_icon";
  DROP TYPE "public"."enum__occupational_health_v_services_section_services_icon";
  DROP TYPE "public"."enum__occupational_health_v_hero_section_osa_link_link_type";`)
}
