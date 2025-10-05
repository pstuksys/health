import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-vercel-postgres'

export async function up({ db, payload, req }: MigrateUpArgs): Promise<void> {
  await db.execute(sql`
   CREATE TYPE "public"."enum_medical_services_services_link_link_type" AS ENUM('internal', 'external');
  CREATE TYPE "public"."enum_cpap_block_service_cards_badge_variant" AS ENUM('default', 'secondary', 'outline');
  CREATE TYPE "public"."enum_cpap_block_service_cards_border_color" AS ENUM('border-ds-dark-blue/20', 'border-ds-pastille-green/20', 'border-ds-accent-yellow/20');
  CREATE TYPE "public"."enum__medical_services_v_services_link_link_type" AS ENUM('internal', 'external');
  CREATE TYPE "public"."enum__cpap_block_v_service_cards_badge_variant" AS ENUM('default', 'secondary', 'outline');
  CREATE TYPE "public"."enum__cpap_block_v_service_cards_border_color" AS ENUM('border-ds-dark-blue/20', 'border-ds-pastille-green/20', 'border-ds-accent-yellow/20');
  ALTER TYPE "public"."enum_medical_services_services_icon" ADD VALUE 'Check';
  ALTER TYPE "public"."enum_sleep_assessment_steps_steps_icon" ADD VALUE 'Check';
  ALTER TYPE "public"."enum_split_info_grid_block_right_items_icon" ADD VALUE 'Check';
  ALTER TYPE "public"."enum__medical_services_v_services_icon" ADD VALUE 'Check';
  ALTER TYPE "public"."enum__sleep_assessment_steps_v_steps_icon" ADD VALUE 'Check';
  ALTER TYPE "public"."enum__split_info_grid_block_v_right_items_icon" ADD VALUE 'Check';
  CREATE TABLE "cpap_block_service_cards_features" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"text" varchar
  );
  
  CREATE TABLE "cpap_block_service_cards" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"title" varchar,
  	"description" varchar,
  	"badge_text" varchar,
  	"badge_variant" "enum_cpap_block_service_cards_badge_variant" DEFAULT 'secondary',
  	"border_color" "enum_cpap_block_service_cards_border_color" DEFAULT 'border-ds-dark-blue/20'
  );
  
  CREATE TABLE "cpap_block_trust_indicators_items" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"text" varchar
  );
  
  CREATE TABLE "_cpap_block_v_service_cards_features" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"text" varchar,
  	"_uuid" varchar
  );
  
  CREATE TABLE "_cpap_block_v_service_cards" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"title" varchar,
  	"description" varchar,
  	"badge_text" varchar,
  	"badge_variant" "enum__cpap_block_v_service_cards_badge_variant" DEFAULT 'secondary',
  	"border_color" "enum__cpap_block_v_service_cards_border_color" DEFAULT 'border-ds-dark-blue/20',
  	"_uuid" varchar
  );
  
  CREATE TABLE "_cpap_block_v_trust_indicators_items" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"text" varchar,
  	"_uuid" varchar
  );
  
  ALTER TABLE "medical_services_services" ADD COLUMN "link_link_type" "enum_medical_services_services_link_link_type" DEFAULT 'internal';
  ALTER TABLE "medical_services_services" ADD COLUMN "link_external_href" varchar;
  ALTER TABLE "medical_services_services" ADD COLUMN "link_open_in_new_tab" boolean DEFAULT false;
  ALTER TABLE "cpap_block" ADD COLUMN "trust_indicators_title" varchar DEFAULT 'IPD Offering';
  ALTER TABLE "cpap_block" ADD COLUMN "trust_indicators_subtitle" varchar DEFAULT 'Comprehensive CPAP therapy support designed around your needs and lifestyle';
  ALTER TABLE "sleep_apnea_report_includes" ADD COLUMN "disable_review_card" boolean DEFAULT false;
  ALTER TABLE "_medical_services_v_services" ADD COLUMN "link_link_type" "enum__medical_services_v_services_link_link_type" DEFAULT 'internal';
  ALTER TABLE "_medical_services_v_services" ADD COLUMN "link_external_href" varchar;
  ALTER TABLE "_medical_services_v_services" ADD COLUMN "link_open_in_new_tab" boolean DEFAULT false;
  ALTER TABLE "_cpap_block_v" ADD COLUMN "trust_indicators_title" varchar DEFAULT 'IPD Offering';
  ALTER TABLE "_cpap_block_v" ADD COLUMN "trust_indicators_subtitle" varchar DEFAULT 'Comprehensive CPAP therapy support designed around your needs and lifestyle';
  ALTER TABLE "_sleep_apnea_report_includes_v" ADD COLUMN "disable_review_card" boolean DEFAULT false;
  ALTER TABLE "cpap_block_service_cards_features" ADD CONSTRAINT "cpap_block_service_cards_features_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."cpap_block_service_cards"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "cpap_block_service_cards" ADD CONSTRAINT "cpap_block_service_cards_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."cpap_block"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "cpap_block_trust_indicators_items" ADD CONSTRAINT "cpap_block_trust_indicators_items_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."cpap_block"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_cpap_block_v_service_cards_features" ADD CONSTRAINT "_cpap_block_v_service_cards_features_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_cpap_block_v_service_cards"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_cpap_block_v_service_cards" ADD CONSTRAINT "_cpap_block_v_service_cards_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_cpap_block_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_cpap_block_v_trust_indicators_items" ADD CONSTRAINT "_cpap_block_v_trust_indicators_items_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_cpap_block_v"("id") ON DELETE cascade ON UPDATE no action;
  CREATE INDEX "cpap_block_service_cards_features_order_idx" ON "cpap_block_service_cards_features" USING btree ("_order");
  CREATE INDEX "cpap_block_service_cards_features_parent_id_idx" ON "cpap_block_service_cards_features" USING btree ("_parent_id");
  CREATE INDEX "cpap_block_service_cards_order_idx" ON "cpap_block_service_cards" USING btree ("_order");
  CREATE INDEX "cpap_block_service_cards_parent_id_idx" ON "cpap_block_service_cards" USING btree ("_parent_id");
  CREATE INDEX "cpap_block_trust_indicators_items_order_idx" ON "cpap_block_trust_indicators_items" USING btree ("_order");
  CREATE INDEX "cpap_block_trust_indicators_items_parent_id_idx" ON "cpap_block_trust_indicators_items" USING btree ("_parent_id");
  CREATE INDEX "_cpap_block_v_service_cards_features_order_idx" ON "_cpap_block_v_service_cards_features" USING btree ("_order");
  CREATE INDEX "_cpap_block_v_service_cards_features_parent_id_idx" ON "_cpap_block_v_service_cards_features" USING btree ("_parent_id");
  CREATE INDEX "_cpap_block_v_service_cards_order_idx" ON "_cpap_block_v_service_cards" USING btree ("_order");
  CREATE INDEX "_cpap_block_v_service_cards_parent_id_idx" ON "_cpap_block_v_service_cards" USING btree ("_parent_id");
  CREATE INDEX "_cpap_block_v_trust_indicators_items_order_idx" ON "_cpap_block_v_trust_indicators_items" USING btree ("_order");
  CREATE INDEX "_cpap_block_v_trust_indicators_items_parent_id_idx" ON "_cpap_block_v_trust_indicators_items" USING btree ("_parent_id");
  ALTER TABLE "footer" DROP COLUMN "about";`)
}

export async function down({ db, payload, req }: MigrateDownArgs): Promise<void> {
  await db.execute(sql`
   DROP TABLE "cpap_block_service_cards_features" CASCADE;
  DROP TABLE "cpap_block_service_cards" CASCADE;
  DROP TABLE "cpap_block_trust_indicators_items" CASCADE;
  DROP TABLE "_cpap_block_v_service_cards_features" CASCADE;
  DROP TABLE "_cpap_block_v_service_cards" CASCADE;
  DROP TABLE "_cpap_block_v_trust_indicators_items" CASCADE;
  ALTER TABLE "medical_services_services" ALTER COLUMN "icon" SET DATA TYPE text;
  ALTER TABLE "medical_services_services" ALTER COLUMN "icon" SET DEFAULT 'FileText'::text;
  DROP TYPE "public"."enum_medical_services_services_icon";
  CREATE TYPE "public"."enum_medical_services_services_icon" AS ENUM('FileText', 'PhoneCall', 'Beaker', 'SquareActivity', 'Activity', 'Heart', 'Scan', 'Stethoscope', 'Brain', 'Moon', 'Baby', 'TrendingUp', 'HeartHandshake', 'ClipboardList', 'UserCheck', 'List', 'UserPlus', 'BriefcaseMedical', 'BarChart3', 'Building', 'Building2', 'Eye', 'Waves', 'Monitor', 'Video');
  ALTER TABLE "medical_services_services" ALTER COLUMN "icon" SET DEFAULT 'FileText'::"public"."enum_medical_services_services_icon";
  ALTER TABLE "medical_services_services" ALTER COLUMN "icon" SET DATA TYPE "public"."enum_medical_services_services_icon" USING "icon"::"public"."enum_medical_services_services_icon";
  ALTER TABLE "sleep_assessment_steps_steps" ALTER COLUMN "icon" SET DATA TYPE text;
  ALTER TABLE "sleep_assessment_steps_steps" ALTER COLUMN "icon" SET DEFAULT 'FileText'::text;
  DROP TYPE "public"."enum_sleep_assessment_steps_steps_icon";
  CREATE TYPE "public"."enum_sleep_assessment_steps_steps_icon" AS ENUM('FileText', 'PhoneCall', 'Beaker', 'SquareActivity', 'Activity', 'Heart', 'Scan', 'Stethoscope', 'Brain', 'Moon', 'Baby', 'TrendingUp', 'HeartHandshake', 'ClipboardList', 'UserCheck', 'List', 'UserPlus', 'BriefcaseMedical', 'BarChart3', 'Building', 'Building2', 'Eye', 'Waves', 'Monitor', 'Video');
  ALTER TABLE "sleep_assessment_steps_steps" ALTER COLUMN "icon" SET DEFAULT 'FileText'::"public"."enum_sleep_assessment_steps_steps_icon";
  ALTER TABLE "sleep_assessment_steps_steps" ALTER COLUMN "icon" SET DATA TYPE "public"."enum_sleep_assessment_steps_steps_icon" USING "icon"::"public"."enum_sleep_assessment_steps_steps_icon";
  ALTER TABLE "split_info_grid_block_right_items" ALTER COLUMN "icon" SET DATA TYPE text;
  ALTER TABLE "split_info_grid_block_right_items" ALTER COLUMN "icon" SET DEFAULT 'FileText'::text;
  DROP TYPE "public"."enum_split_info_grid_block_right_items_icon";
  CREATE TYPE "public"."enum_split_info_grid_block_right_items_icon" AS ENUM('FileText', 'PhoneCall', 'Beaker', 'SquareActivity', 'Activity', 'Heart', 'Scan', 'Stethoscope', 'Brain', 'Moon', 'Baby', 'TrendingUp', 'HeartHandshake', 'ClipboardList', 'UserCheck', 'List', 'UserPlus', 'BriefcaseMedical', 'BarChart3', 'Building', 'Building2', 'Eye', 'Waves', 'Monitor', 'Video');
  ALTER TABLE "split_info_grid_block_right_items" ALTER COLUMN "icon" SET DEFAULT 'FileText'::"public"."enum_split_info_grid_block_right_items_icon";
  ALTER TABLE "split_info_grid_block_right_items" ALTER COLUMN "icon" SET DATA TYPE "public"."enum_split_info_grid_block_right_items_icon" USING "icon"::"public"."enum_split_info_grid_block_right_items_icon";
  ALTER TABLE "_medical_services_v_services" ALTER COLUMN "icon" SET DATA TYPE text;
  ALTER TABLE "_medical_services_v_services" ALTER COLUMN "icon" SET DEFAULT 'FileText'::text;
  DROP TYPE "public"."enum__medical_services_v_services_icon";
  CREATE TYPE "public"."enum__medical_services_v_services_icon" AS ENUM('FileText', 'PhoneCall', 'Beaker', 'SquareActivity', 'Activity', 'Heart', 'Scan', 'Stethoscope', 'Brain', 'Moon', 'Baby', 'TrendingUp', 'HeartHandshake', 'ClipboardList', 'UserCheck', 'List', 'UserPlus', 'BriefcaseMedical', 'BarChart3', 'Building', 'Building2', 'Eye', 'Waves', 'Monitor', 'Video');
  ALTER TABLE "_medical_services_v_services" ALTER COLUMN "icon" SET DEFAULT 'FileText'::"public"."enum__medical_services_v_services_icon";
  ALTER TABLE "_medical_services_v_services" ALTER COLUMN "icon" SET DATA TYPE "public"."enum__medical_services_v_services_icon" USING "icon"::"public"."enum__medical_services_v_services_icon";
  ALTER TABLE "_sleep_assessment_steps_v_steps" ALTER COLUMN "icon" SET DATA TYPE text;
  ALTER TABLE "_sleep_assessment_steps_v_steps" ALTER COLUMN "icon" SET DEFAULT 'FileText'::text;
  DROP TYPE "public"."enum__sleep_assessment_steps_v_steps_icon";
  CREATE TYPE "public"."enum__sleep_assessment_steps_v_steps_icon" AS ENUM('FileText', 'PhoneCall', 'Beaker', 'SquareActivity', 'Activity', 'Heart', 'Scan', 'Stethoscope', 'Brain', 'Moon', 'Baby', 'TrendingUp', 'HeartHandshake', 'ClipboardList', 'UserCheck', 'List', 'UserPlus', 'BriefcaseMedical', 'BarChart3', 'Building', 'Building2', 'Eye', 'Waves', 'Monitor', 'Video');
  ALTER TABLE "_sleep_assessment_steps_v_steps" ALTER COLUMN "icon" SET DEFAULT 'FileText'::"public"."enum__sleep_assessment_steps_v_steps_icon";
  ALTER TABLE "_sleep_assessment_steps_v_steps" ALTER COLUMN "icon" SET DATA TYPE "public"."enum__sleep_assessment_steps_v_steps_icon" USING "icon"::"public"."enum__sleep_assessment_steps_v_steps_icon";
  ALTER TABLE "_split_info_grid_block_v_right_items" ALTER COLUMN "icon" SET DATA TYPE text;
  ALTER TABLE "_split_info_grid_block_v_right_items" ALTER COLUMN "icon" SET DEFAULT 'FileText'::text;
  DROP TYPE "public"."enum__split_info_grid_block_v_right_items_icon";
  CREATE TYPE "public"."enum__split_info_grid_block_v_right_items_icon" AS ENUM('FileText', 'PhoneCall', 'Beaker', 'SquareActivity', 'Activity', 'Heart', 'Scan', 'Stethoscope', 'Brain', 'Moon', 'Baby', 'TrendingUp', 'HeartHandshake', 'ClipboardList', 'UserCheck', 'List', 'UserPlus', 'BriefcaseMedical', 'BarChart3', 'Building', 'Building2', 'Eye', 'Waves', 'Monitor', 'Video');
  ALTER TABLE "_split_info_grid_block_v_right_items" ALTER COLUMN "icon" SET DEFAULT 'FileText'::"public"."enum__split_info_grid_block_v_right_items_icon";
  ALTER TABLE "_split_info_grid_block_v_right_items" ALTER COLUMN "icon" SET DATA TYPE "public"."enum__split_info_grid_block_v_right_items_icon" USING "icon"::"public"."enum__split_info_grid_block_v_right_items_icon";
  ALTER TABLE "footer" ADD COLUMN "about" varchar;
  ALTER TABLE "medical_services_services" DROP COLUMN "link_link_type";
  ALTER TABLE "medical_services_services" DROP COLUMN "link_external_href";
  ALTER TABLE "medical_services_services" DROP COLUMN "link_open_in_new_tab";
  ALTER TABLE "cpap_block" DROP COLUMN "trust_indicators_title";
  ALTER TABLE "cpap_block" DROP COLUMN "trust_indicators_subtitle";
  ALTER TABLE "sleep_apnea_report_includes" DROP COLUMN "disable_review_card";
  ALTER TABLE "_medical_services_v_services" DROP COLUMN "link_link_type";
  ALTER TABLE "_medical_services_v_services" DROP COLUMN "link_external_href";
  ALTER TABLE "_medical_services_v_services" DROP COLUMN "link_open_in_new_tab";
  ALTER TABLE "_cpap_block_v" DROP COLUMN "trust_indicators_title";
  ALTER TABLE "_cpap_block_v" DROP COLUMN "trust_indicators_subtitle";
  ALTER TABLE "_sleep_apnea_report_includes_v" DROP COLUMN "disable_review_card";
  DROP TYPE "public"."enum_medical_services_services_link_link_type";
  DROP TYPE "public"."enum_cpap_block_service_cards_badge_variant";
  DROP TYPE "public"."enum_cpap_block_service_cards_border_color";
  DROP TYPE "public"."enum__medical_services_v_services_link_link_type";
  DROP TYPE "public"."enum__cpap_block_v_service_cards_badge_variant";
  DROP TYPE "public"."enum__cpap_block_v_service_cards_border_color";`)
}
