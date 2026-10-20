import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-vercel-postgres'

export async function up({ db, payload, req }: MigrateUpArgs): Promise<void> {
  await db.execute(sql`
   CREATE TYPE "public"."enum_header_booking_modal_options_icon" AS ENUM('FileText', 'PhoneCall', 'Beaker', 'SquareActivity', 'Activity', 'Heart', 'Scan', 'Stethoscope', 'Brain', 'Moon', 'Baby', 'TrendingUp', 'HeartHandshake', 'ClipboardList', 'UserCheck', 'List', 'UserPlus', 'BriefcaseMedical', 'BarChart3', 'Building', 'Building2', 'Eye', 'Waves', 'Monitor', 'Video', 'Check', 'ShieldCheck', 'Users', 'Bed', 'Wind', 'Sunrise', 'Frown', 'Ear', 'Smile', 'MessagesSquare', 'User', 'BrainCog', 'Wallet', 'CircleHelp');
  CREATE TYPE "public"."enum_header_booking_modal_options_link_type" AS ENUM('internal', 'external');
  CREATE TYPE "public"."enum_header_booking_modal_help_link_type" AS ENUM('internal', 'external');
  ALTER TYPE "public"."enum_medical_services_services_icon" ADD VALUE 'Wallet';
  ALTER TYPE "public"."enum_medical_services_services_icon" ADD VALUE 'CircleHelp';
  ALTER TYPE "public"."enum_split_info_grid_block_right_items_icon" ADD VALUE 'Wallet';
  ALTER TYPE "public"."enum_split_info_grid_block_right_items_icon" ADD VALUE 'CircleHelp';
  ALTER TYPE "public"."enum_icon_row_block_items_icon" ADD VALUE 'Wallet';
  ALTER TYPE "public"."enum_icon_row_block_items_icon" ADD VALUE 'CircleHelp';
  ALTER TYPE "public"."enum_care_network_block_specialists_icon" ADD VALUE 'Wallet';
  ALTER TYPE "public"."enum_care_network_block_specialists_icon" ADD VALUE 'CircleHelp';
  ALTER TYPE "public"."enum__medical_services_v_services_icon" ADD VALUE 'Wallet';
  ALTER TYPE "public"."enum__medical_services_v_services_icon" ADD VALUE 'CircleHelp';
  ALTER TYPE "public"."enum__split_info_grid_block_v_right_items_icon" ADD VALUE 'Wallet';
  ALTER TYPE "public"."enum__split_info_grid_block_v_right_items_icon" ADD VALUE 'CircleHelp';
  ALTER TYPE "public"."enum__icon_row_block_v_items_icon" ADD VALUE 'Wallet';
  ALTER TYPE "public"."enum__icon_row_block_v_items_icon" ADD VALUE 'CircleHelp';
  ALTER TYPE "public"."enum__care_network_block_v_specialists_icon" ADD VALUE 'Wallet';
  ALTER TYPE "public"."enum__care_network_block_v_specialists_icon" ADD VALUE 'CircleHelp';
  ALTER TYPE "public"."enum_education_hub_trust_pillars_icon" ADD VALUE 'Wallet';
  ALTER TYPE "public"."enum_education_hub_trust_pillars_icon" ADD VALUE 'CircleHelp';
  CREATE TABLE "header_booking_modal_options" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"icon" "enum_header_booking_modal_options_icon" DEFAULT 'Wallet',
  	"title" varchar NOT NULL,
  	"description" varchar,
  	"link_type" "enum_header_booking_modal_options_link_type" DEFAULT 'external',
  	"href" varchar DEFAULT '/contact-us'
  );
  
  ALTER TABLE "header" ADD COLUMN "booking_modal_title" varchar DEFAULT 'Book a Video Consultation';
  ALTER TABLE "header" ADD COLUMN "booking_modal_description" varchar DEFAULT 'Choose the option that best describes you.';
  ALTER TABLE "header" ADD COLUMN "booking_modal_help_label" varchar DEFAULT 'Not sure which option to choose?';
  ALTER TABLE "header" ADD COLUMN "booking_modal_help_text" varchar DEFAULT 'Contact our team for guidance.';
  ALTER TABLE "header" ADD COLUMN "booking_modal_help_link_type" "enum_header_booking_modal_help_link_type" DEFAULT 'external';
  ALTER TABLE "header" ADD COLUMN "booking_modal_help_href" varchar DEFAULT '/contact-us';
  ALTER TABLE "header_booking_modal_options" ADD CONSTRAINT "header_booking_modal_options_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."header"("id") ON DELETE cascade ON UPDATE no action;
  CREATE INDEX "header_booking_modal_options_order_idx" ON "header_booking_modal_options" USING btree ("_order");
  CREATE INDEX "header_booking_modal_options_parent_id_idx" ON "header_booking_modal_options" USING btree ("_parent_id");
  ALTER TABLE "care_network_block" DROP COLUMN "center_label";
  ALTER TABLE "_care_network_block_v" DROP COLUMN "center_label";`)
}

export async function down({ db, payload, req }: MigrateDownArgs): Promise<void> {
  await db.execute(sql`
   DROP TABLE "header_booking_modal_options" CASCADE;
  ALTER TABLE "medical_services_services" ALTER COLUMN "icon" SET DATA TYPE text;
  ALTER TABLE "medical_services_services" ALTER COLUMN "icon" SET DEFAULT 'FileText'::text;
  DROP TYPE "public"."enum_medical_services_services_icon";
  CREATE TYPE "public"."enum_medical_services_services_icon" AS ENUM('FileText', 'PhoneCall', 'Beaker', 'SquareActivity', 'Activity', 'Heart', 'Scan', 'Stethoscope', 'Brain', 'Moon', 'Baby', 'TrendingUp', 'HeartHandshake', 'ClipboardList', 'UserCheck', 'List', 'UserPlus', 'BriefcaseMedical', 'BarChart3', 'Building', 'Building2', 'Eye', 'Waves', 'Monitor', 'Video', 'Check', 'ShieldCheck', 'Users', 'Bed', 'Wind', 'Sunrise', 'Frown', 'Ear', 'Smile', 'MessagesSquare', 'User', 'BrainCog');
  ALTER TABLE "medical_services_services" ALTER COLUMN "icon" SET DEFAULT 'FileText'::"public"."enum_medical_services_services_icon";
  ALTER TABLE "medical_services_services" ALTER COLUMN "icon" SET DATA TYPE "public"."enum_medical_services_services_icon" USING "icon"::"public"."enum_medical_services_services_icon";
  ALTER TABLE "split_info_grid_block_right_items" ALTER COLUMN "icon" SET DATA TYPE text;
  ALTER TABLE "split_info_grid_block_right_items" ALTER COLUMN "icon" SET DEFAULT 'FileText'::text;
  DROP TYPE "public"."enum_split_info_grid_block_right_items_icon";
  CREATE TYPE "public"."enum_split_info_grid_block_right_items_icon" AS ENUM('FileText', 'PhoneCall', 'Beaker', 'SquareActivity', 'Activity', 'Heart', 'Scan', 'Stethoscope', 'Brain', 'Moon', 'Baby', 'TrendingUp', 'HeartHandshake', 'ClipboardList', 'UserCheck', 'List', 'UserPlus', 'BriefcaseMedical', 'BarChart3', 'Building', 'Building2', 'Eye', 'Waves', 'Monitor', 'Video', 'Check', 'ShieldCheck', 'Users', 'Bed', 'Wind', 'Sunrise', 'Frown', 'Ear', 'Smile', 'MessagesSquare', 'User', 'BrainCog');
  ALTER TABLE "split_info_grid_block_right_items" ALTER COLUMN "icon" SET DEFAULT 'FileText'::"public"."enum_split_info_grid_block_right_items_icon";
  ALTER TABLE "split_info_grid_block_right_items" ALTER COLUMN "icon" SET DATA TYPE "public"."enum_split_info_grid_block_right_items_icon" USING "icon"::"public"."enum_split_info_grid_block_right_items_icon";
  ALTER TABLE "icon_row_block_items" ALTER COLUMN "icon" SET DATA TYPE text;
  ALTER TABLE "icon_row_block_items" ALTER COLUMN "icon" SET DEFAULT 'FileText'::text;
  DROP TYPE "public"."enum_icon_row_block_items_icon";
  CREATE TYPE "public"."enum_icon_row_block_items_icon" AS ENUM('FileText', 'PhoneCall', 'Beaker', 'SquareActivity', 'Activity', 'Heart', 'Scan', 'Stethoscope', 'Brain', 'Moon', 'Baby', 'TrendingUp', 'HeartHandshake', 'ClipboardList', 'UserCheck', 'List', 'UserPlus', 'BriefcaseMedical', 'BarChart3', 'Building', 'Building2', 'Eye', 'Waves', 'Monitor', 'Video', 'Check', 'ShieldCheck', 'Users', 'Bed', 'Wind', 'Sunrise', 'Frown', 'Ear', 'Smile', 'MessagesSquare', 'User', 'BrainCog');
  ALTER TABLE "icon_row_block_items" ALTER COLUMN "icon" SET DEFAULT 'FileText'::"public"."enum_icon_row_block_items_icon";
  ALTER TABLE "icon_row_block_items" ALTER COLUMN "icon" SET DATA TYPE "public"."enum_icon_row_block_items_icon" USING "icon"::"public"."enum_icon_row_block_items_icon";
  ALTER TABLE "care_network_block_specialists" ALTER COLUMN "icon" SET DATA TYPE text;
  ALTER TABLE "care_network_block_specialists" ALTER COLUMN "icon" SET DEFAULT 'FileText'::text;
  DROP TYPE "public"."enum_care_network_block_specialists_icon";
  CREATE TYPE "public"."enum_care_network_block_specialists_icon" AS ENUM('FileText', 'PhoneCall', 'Beaker', 'SquareActivity', 'Activity', 'Heart', 'Scan', 'Stethoscope', 'Brain', 'Moon', 'Baby', 'TrendingUp', 'HeartHandshake', 'ClipboardList', 'UserCheck', 'List', 'UserPlus', 'BriefcaseMedical', 'BarChart3', 'Building', 'Building2', 'Eye', 'Waves', 'Monitor', 'Video', 'Check', 'ShieldCheck', 'Users', 'Bed', 'Wind', 'Sunrise', 'Frown', 'Ear', 'Smile', 'MessagesSquare', 'User', 'BrainCog');
  ALTER TABLE "care_network_block_specialists" ALTER COLUMN "icon" SET DEFAULT 'FileText'::"public"."enum_care_network_block_specialists_icon";
  ALTER TABLE "care_network_block_specialists" ALTER COLUMN "icon" SET DATA TYPE "public"."enum_care_network_block_specialists_icon" USING "icon"::"public"."enum_care_network_block_specialists_icon";
  ALTER TABLE "_medical_services_v_services" ALTER COLUMN "icon" SET DATA TYPE text;
  ALTER TABLE "_medical_services_v_services" ALTER COLUMN "icon" SET DEFAULT 'FileText'::text;
  DROP TYPE "public"."enum__medical_services_v_services_icon";
  CREATE TYPE "public"."enum__medical_services_v_services_icon" AS ENUM('FileText', 'PhoneCall', 'Beaker', 'SquareActivity', 'Activity', 'Heart', 'Scan', 'Stethoscope', 'Brain', 'Moon', 'Baby', 'TrendingUp', 'HeartHandshake', 'ClipboardList', 'UserCheck', 'List', 'UserPlus', 'BriefcaseMedical', 'BarChart3', 'Building', 'Building2', 'Eye', 'Waves', 'Monitor', 'Video', 'Check', 'ShieldCheck', 'Users', 'Bed', 'Wind', 'Sunrise', 'Frown', 'Ear', 'Smile', 'MessagesSquare', 'User', 'BrainCog');
  ALTER TABLE "_medical_services_v_services" ALTER COLUMN "icon" SET DEFAULT 'FileText'::"public"."enum__medical_services_v_services_icon";
  ALTER TABLE "_medical_services_v_services" ALTER COLUMN "icon" SET DATA TYPE "public"."enum__medical_services_v_services_icon" USING "icon"::"public"."enum__medical_services_v_services_icon";
  ALTER TABLE "_split_info_grid_block_v_right_items" ALTER COLUMN "icon" SET DATA TYPE text;
  ALTER TABLE "_split_info_grid_block_v_right_items" ALTER COLUMN "icon" SET DEFAULT 'FileText'::text;
  DROP TYPE "public"."enum__split_info_grid_block_v_right_items_icon";
  CREATE TYPE "public"."enum__split_info_grid_block_v_right_items_icon" AS ENUM('FileText', 'PhoneCall', 'Beaker', 'SquareActivity', 'Activity', 'Heart', 'Scan', 'Stethoscope', 'Brain', 'Moon', 'Baby', 'TrendingUp', 'HeartHandshake', 'ClipboardList', 'UserCheck', 'List', 'UserPlus', 'BriefcaseMedical', 'BarChart3', 'Building', 'Building2', 'Eye', 'Waves', 'Monitor', 'Video', 'Check', 'ShieldCheck', 'Users', 'Bed', 'Wind', 'Sunrise', 'Frown', 'Ear', 'Smile', 'MessagesSquare', 'User', 'BrainCog');
  ALTER TABLE "_split_info_grid_block_v_right_items" ALTER COLUMN "icon" SET DEFAULT 'FileText'::"public"."enum__split_info_grid_block_v_right_items_icon";
  ALTER TABLE "_split_info_grid_block_v_right_items" ALTER COLUMN "icon" SET DATA TYPE "public"."enum__split_info_grid_block_v_right_items_icon" USING "icon"::"public"."enum__split_info_grid_block_v_right_items_icon";
  ALTER TABLE "_icon_row_block_v_items" ALTER COLUMN "icon" SET DATA TYPE text;
  ALTER TABLE "_icon_row_block_v_items" ALTER COLUMN "icon" SET DEFAULT 'FileText'::text;
  DROP TYPE "public"."enum__icon_row_block_v_items_icon";
  CREATE TYPE "public"."enum__icon_row_block_v_items_icon" AS ENUM('FileText', 'PhoneCall', 'Beaker', 'SquareActivity', 'Activity', 'Heart', 'Scan', 'Stethoscope', 'Brain', 'Moon', 'Baby', 'TrendingUp', 'HeartHandshake', 'ClipboardList', 'UserCheck', 'List', 'UserPlus', 'BriefcaseMedical', 'BarChart3', 'Building', 'Building2', 'Eye', 'Waves', 'Monitor', 'Video', 'Check', 'ShieldCheck', 'Users', 'Bed', 'Wind', 'Sunrise', 'Frown', 'Ear', 'Smile', 'MessagesSquare', 'User', 'BrainCog');
  ALTER TABLE "_icon_row_block_v_items" ALTER COLUMN "icon" SET DEFAULT 'FileText'::"public"."enum__icon_row_block_v_items_icon";
  ALTER TABLE "_icon_row_block_v_items" ALTER COLUMN "icon" SET DATA TYPE "public"."enum__icon_row_block_v_items_icon" USING "icon"::"public"."enum__icon_row_block_v_items_icon";
  ALTER TABLE "_care_network_block_v_specialists" ALTER COLUMN "icon" SET DATA TYPE text;
  ALTER TABLE "_care_network_block_v_specialists" ALTER COLUMN "icon" SET DEFAULT 'FileText'::text;
  DROP TYPE "public"."enum__care_network_block_v_specialists_icon";
  CREATE TYPE "public"."enum__care_network_block_v_specialists_icon" AS ENUM('FileText', 'PhoneCall', 'Beaker', 'SquareActivity', 'Activity', 'Heart', 'Scan', 'Stethoscope', 'Brain', 'Moon', 'Baby', 'TrendingUp', 'HeartHandshake', 'ClipboardList', 'UserCheck', 'List', 'UserPlus', 'BriefcaseMedical', 'BarChart3', 'Building', 'Building2', 'Eye', 'Waves', 'Monitor', 'Video', 'Check', 'ShieldCheck', 'Users', 'Bed', 'Wind', 'Sunrise', 'Frown', 'Ear', 'Smile', 'MessagesSquare', 'User', 'BrainCog');
  ALTER TABLE "_care_network_block_v_specialists" ALTER COLUMN "icon" SET DEFAULT 'FileText'::"public"."enum__care_network_block_v_specialists_icon";
  ALTER TABLE "_care_network_block_v_specialists" ALTER COLUMN "icon" SET DATA TYPE "public"."enum__care_network_block_v_specialists_icon" USING "icon"::"public"."enum__care_network_block_v_specialists_icon";
  ALTER TABLE "education_hub_trust_pillars" ALTER COLUMN "icon" SET DATA TYPE text;
  ALTER TABLE "education_hub_trust_pillars" ALTER COLUMN "icon" SET DEFAULT 'FileText'::text;
  DROP TYPE "public"."enum_education_hub_trust_pillars_icon";
  CREATE TYPE "public"."enum_education_hub_trust_pillars_icon" AS ENUM('FileText', 'PhoneCall', 'Beaker', 'SquareActivity', 'Activity', 'Heart', 'Scan', 'Stethoscope', 'Brain', 'Moon', 'Baby', 'TrendingUp', 'HeartHandshake', 'ClipboardList', 'UserCheck', 'List', 'UserPlus', 'BriefcaseMedical', 'BarChart3', 'Building', 'Building2', 'Eye', 'Waves', 'Monitor', 'Video', 'Check', 'ShieldCheck', 'Users', 'Bed', 'Wind', 'Sunrise', 'Frown', 'Ear', 'Smile', 'MessagesSquare', 'User', 'BrainCog');
  ALTER TABLE "education_hub_trust_pillars" ALTER COLUMN "icon" SET DEFAULT 'FileText'::"public"."enum_education_hub_trust_pillars_icon";
  ALTER TABLE "education_hub_trust_pillars" ALTER COLUMN "icon" SET DATA TYPE "public"."enum_education_hub_trust_pillars_icon" USING "icon"::"public"."enum_education_hub_trust_pillars_icon";
  ALTER TABLE "care_network_block" ADD COLUMN "center_label" varchar DEFAULT 'You';
  ALTER TABLE "_care_network_block_v" ADD COLUMN "center_label" varchar DEFAULT 'You';
  ALTER TABLE "header" DROP COLUMN "booking_modal_title";
  ALTER TABLE "header" DROP COLUMN "booking_modal_description";
  ALTER TABLE "header" DROP COLUMN "booking_modal_help_label";
  ALTER TABLE "header" DROP COLUMN "booking_modal_help_text";
  ALTER TABLE "header" DROP COLUMN "booking_modal_help_link_type";
  ALTER TABLE "header" DROP COLUMN "booking_modal_help_href";
  DROP TYPE "public"."enum_header_booking_modal_options_icon";
  DROP TYPE "public"."enum_header_booking_modal_options_link_type";
  DROP TYPE "public"."enum_header_booking_modal_help_link_type";`)
}
