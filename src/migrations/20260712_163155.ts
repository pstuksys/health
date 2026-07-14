import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-vercel-postgres'

export async function up({ db, payload, req }: MigrateUpArgs): Promise<void> {
  await db.execute(sql`
   CREATE TYPE "public"."enum_education_hub_explore_topics_topics_topic_id" AS ENUM('understanding-sleep-disorders', 'diagnostics-treatment', 'specialist-insights', 'lifestyle-tips', 'featured');
  CREATE TYPE "public"."enum_education_hub_trust_pillars_icon" AS ENUM('FileText', 'PhoneCall', 'Beaker', 'SquareActivity', 'Activity', 'Heart', 'Scan', 'Stethoscope', 'Brain', 'Moon', 'Baby', 'TrendingUp', 'HeartHandshake', 'ClipboardList', 'UserCheck', 'List', 'UserPlus', 'BriefcaseMedical', 'BarChart3', 'Building', 'Building2', 'Eye', 'Waves', 'Monitor', 'Video', 'Check', 'ShieldCheck', 'Users');
  ALTER TYPE "public"."enum_medical_services_services_icon" ADD VALUE 'ShieldCheck';
  ALTER TYPE "public"."enum_medical_services_services_icon" ADD VALUE 'Users';
  ALTER TYPE "public"."enum_split_info_grid_block_right_items_icon" ADD VALUE 'ShieldCheck';
  ALTER TYPE "public"."enum_split_info_grid_block_right_items_icon" ADD VALUE 'Users';
  ALTER TYPE "public"."enum__medical_services_v_services_icon" ADD VALUE 'ShieldCheck';
  ALTER TYPE "public"."enum__medical_services_v_services_icon" ADD VALUE 'Users';
  ALTER TYPE "public"."enum__split_info_grid_block_v_right_items_icon" ADD VALUE 'ShieldCheck';
  ALTER TYPE "public"."enum__split_info_grid_block_v_right_items_icon" ADD VALUE 'Users';
  CREATE TABLE "education_hub_explore_topics_topics" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"topic_id" "enum_education_hub_explore_topics_topics_topic_id" NOT NULL,
  	"label" varchar NOT NULL,
  	"description" varchar NOT NULL,
  	"enabled" boolean DEFAULT true
  );
  
  CREATE TABLE "education_hub_trust_pillars" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"icon" "enum_education_hub_trust_pillars_icon" DEFAULT 'FileText' NOT NULL,
  	"title" varchar NOT NULL,
  	"description" varchar NOT NULL
  );
  
  CREATE TABLE "education_hub" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"hero_eyebrow" varchar DEFAULT 'Sleep Education Hub',
  	"hero_title" varchar DEFAULT 'Expert education. Better sleep. Better health.',
  	"hero_description" varchar DEFAULT 'Evidence-based information to help you understand sleep disorders, your treatment options and the care available to you.',
  	"hero_cta_label" varchar DEFAULT 'Explore Articles',
  	"hero_cta_href" varchar DEFAULT '#explore-topics',
  	"hero_image_desktop_id" integer,
  	"hero_image_mobile_id" integer,
  	"hero_image_alt" varchar DEFAULT 'Healthcare professional smiling at a clinic reception desk',
  	"explore_topics_heading" varchar DEFAULT 'Explore by topic',
  	"trusted_education_title" varchar DEFAULT 'Why trusted education matters',
  	"trusted_education_description" varchar DEFAULT 'Accurate, easy-to-understand information helps you make confident decisions about your sleep health. Our content is written and reviewed by experienced clinicians and specialists.',
  	"sleep_assessment_title" varchar DEFAULT 'Need a Sleep Assessment?',
  	"sleep_assessment_description" varchar DEFAULT 'If you think you may have a sleep disorder, our team can help connect you with an appropriate specialist and guide you towards the right next steps.',
  	"sleep_assessment_cta_label" varchar DEFAULT 'Book a Sleep Study',
  	"sleep_assessment_cta_href" varchar DEFAULT '/contact-us',
  	"metadata_title" varchar DEFAULT 'Sleep Education Hub | IPDiagnostics',
  	"metadata_description" varchar DEFAULT 'Evidence-based articles and specialist insights on sleep disorders, diagnostics and treatment from IPDiagnostics.',
  	"updated_at" timestamp(3) with time zone,
  	"created_at" timestamp(3) with time zone
  );
  
  ALTER TABLE "education_hub_explore_topics_topics" ADD CONSTRAINT "education_hub_explore_topics_topics_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."education_hub"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "education_hub_trust_pillars" ADD CONSTRAINT "education_hub_trust_pillars_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."education_hub"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "education_hub" ADD CONSTRAINT "education_hub_hero_image_desktop_id_media_id_fk" FOREIGN KEY ("hero_image_desktop_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "education_hub" ADD CONSTRAINT "education_hub_hero_image_mobile_id_media_id_fk" FOREIGN KEY ("hero_image_mobile_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  CREATE INDEX "education_hub_explore_topics_topics_order_idx" ON "education_hub_explore_topics_topics" USING btree ("_order");
  CREATE INDEX "education_hub_explore_topics_topics_parent_id_idx" ON "education_hub_explore_topics_topics" USING btree ("_parent_id");
  CREATE INDEX "education_hub_trust_pillars_order_idx" ON "education_hub_trust_pillars" USING btree ("_order");
  CREATE INDEX "education_hub_trust_pillars_parent_id_idx" ON "education_hub_trust_pillars" USING btree ("_parent_id");
  CREATE INDEX "education_hub_hero_hero_image_desktop_idx" ON "education_hub" USING btree ("hero_image_desktop_id");
  CREATE INDEX "education_hub_hero_hero_image_mobile_idx" ON "education_hub" USING btree ("hero_image_mobile_id");`)
}

export async function down({ db, payload, req }: MigrateDownArgs): Promise<void> {
  await db.execute(sql`
   DROP TABLE "education_hub_explore_topics_topics" CASCADE;
  DROP TABLE "education_hub_trust_pillars" CASCADE;
  DROP TABLE "education_hub" CASCADE;
  ALTER TABLE "medical_services_services" ALTER COLUMN "icon" SET DATA TYPE text;
  ALTER TABLE "medical_services_services" ALTER COLUMN "icon" SET DEFAULT 'FileText'::text;
  DROP TYPE "public"."enum_medical_services_services_icon";
  CREATE TYPE "public"."enum_medical_services_services_icon" AS ENUM('FileText', 'PhoneCall', 'Beaker', 'SquareActivity', 'Activity', 'Heart', 'Scan', 'Stethoscope', 'Brain', 'Moon', 'Baby', 'TrendingUp', 'HeartHandshake', 'ClipboardList', 'UserCheck', 'List', 'UserPlus', 'BriefcaseMedical', 'BarChart3', 'Building', 'Building2', 'Eye', 'Waves', 'Monitor', 'Video', 'Check');
  ALTER TABLE "medical_services_services" ALTER COLUMN "icon" SET DEFAULT 'FileText'::"public"."enum_medical_services_services_icon";
  ALTER TABLE "medical_services_services" ALTER COLUMN "icon" SET DATA TYPE "public"."enum_medical_services_services_icon" USING "icon"::"public"."enum_medical_services_services_icon";
  ALTER TABLE "split_info_grid_block_right_items" ALTER COLUMN "icon" SET DATA TYPE text;
  ALTER TABLE "split_info_grid_block_right_items" ALTER COLUMN "icon" SET DEFAULT 'FileText'::text;
  DROP TYPE "public"."enum_split_info_grid_block_right_items_icon";
  CREATE TYPE "public"."enum_split_info_grid_block_right_items_icon" AS ENUM('FileText', 'PhoneCall', 'Beaker', 'SquareActivity', 'Activity', 'Heart', 'Scan', 'Stethoscope', 'Brain', 'Moon', 'Baby', 'TrendingUp', 'HeartHandshake', 'ClipboardList', 'UserCheck', 'List', 'UserPlus', 'BriefcaseMedical', 'BarChart3', 'Building', 'Building2', 'Eye', 'Waves', 'Monitor', 'Video', 'Check');
  ALTER TABLE "split_info_grid_block_right_items" ALTER COLUMN "icon" SET DEFAULT 'FileText'::"public"."enum_split_info_grid_block_right_items_icon";
  ALTER TABLE "split_info_grid_block_right_items" ALTER COLUMN "icon" SET DATA TYPE "public"."enum_split_info_grid_block_right_items_icon" USING "icon"::"public"."enum_split_info_grid_block_right_items_icon";
  ALTER TABLE "_medical_services_v_services" ALTER COLUMN "icon" SET DATA TYPE text;
  ALTER TABLE "_medical_services_v_services" ALTER COLUMN "icon" SET DEFAULT 'FileText'::text;
  DROP TYPE "public"."enum__medical_services_v_services_icon";
  CREATE TYPE "public"."enum__medical_services_v_services_icon" AS ENUM('FileText', 'PhoneCall', 'Beaker', 'SquareActivity', 'Activity', 'Heart', 'Scan', 'Stethoscope', 'Brain', 'Moon', 'Baby', 'TrendingUp', 'HeartHandshake', 'ClipboardList', 'UserCheck', 'List', 'UserPlus', 'BriefcaseMedical', 'BarChart3', 'Building', 'Building2', 'Eye', 'Waves', 'Monitor', 'Video', 'Check');
  ALTER TABLE "_medical_services_v_services" ALTER COLUMN "icon" SET DEFAULT 'FileText'::"public"."enum__medical_services_v_services_icon";
  ALTER TABLE "_medical_services_v_services" ALTER COLUMN "icon" SET DATA TYPE "public"."enum__medical_services_v_services_icon" USING "icon"::"public"."enum__medical_services_v_services_icon";
  ALTER TABLE "_split_info_grid_block_v_right_items" ALTER COLUMN "icon" SET DATA TYPE text;
  ALTER TABLE "_split_info_grid_block_v_right_items" ALTER COLUMN "icon" SET DEFAULT 'FileText'::text;
  DROP TYPE "public"."enum__split_info_grid_block_v_right_items_icon";
  CREATE TYPE "public"."enum__split_info_grid_block_v_right_items_icon" AS ENUM('FileText', 'PhoneCall', 'Beaker', 'SquareActivity', 'Activity', 'Heart', 'Scan', 'Stethoscope', 'Brain', 'Moon', 'Baby', 'TrendingUp', 'HeartHandshake', 'ClipboardList', 'UserCheck', 'List', 'UserPlus', 'BriefcaseMedical', 'BarChart3', 'Building', 'Building2', 'Eye', 'Waves', 'Monitor', 'Video', 'Check');
  ALTER TABLE "_split_info_grid_block_v_right_items" ALTER COLUMN "icon" SET DEFAULT 'FileText'::"public"."enum__split_info_grid_block_v_right_items_icon";
  ALTER TABLE "_split_info_grid_block_v_right_items" ALTER COLUMN "icon" SET DATA TYPE "public"."enum__split_info_grid_block_v_right_items_icon" USING "icon"::"public"."enum__split_info_grid_block_v_right_items_icon";
  DROP TYPE "public"."enum_education_hub_explore_topics_topics_topic_id";
  DROP TYPE "public"."enum_education_hub_trust_pillars_icon";`)
}
