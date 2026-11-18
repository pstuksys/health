import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-vercel-postgres'

export async function up({ db, payload, req }: MigrateUpArgs): Promise<void> {
  await db.execute(sql`
   ALTER TYPE "public"."enum_medical_services_services_icon" ADD VALUE 'Scale';
  ALTER TYPE "public"."enum_medical_services_services_icon" ADD VALUE 'Lungs';
  ALTER TYPE "public"."enum_medical_services_services_icon" ADD VALUE 'EntHead';
  ALTER TYPE "public"."enum_medical_services_services_icon" ADD VALUE 'Jaw';
  ALTER TYPE "public"."enum_medical_services_services_icon" ADD VALUE 'DentalAppliance';
  ALTER TYPE "public"."enum_split_info_grid_block_right_items_icon" ADD VALUE 'Scale';
  ALTER TYPE "public"."enum_split_info_grid_block_right_items_icon" ADD VALUE 'Lungs';
  ALTER TYPE "public"."enum_split_info_grid_block_right_items_icon" ADD VALUE 'EntHead';
  ALTER TYPE "public"."enum_split_info_grid_block_right_items_icon" ADD VALUE 'Jaw';
  ALTER TYPE "public"."enum_split_info_grid_block_right_items_icon" ADD VALUE 'DentalAppliance';
  ALTER TYPE "public"."enum_icon_row_block_items_icon" ADD VALUE 'Scale';
  ALTER TYPE "public"."enum_icon_row_block_items_icon" ADD VALUE 'Lungs';
  ALTER TYPE "public"."enum_icon_row_block_items_icon" ADD VALUE 'EntHead';
  ALTER TYPE "public"."enum_icon_row_block_items_icon" ADD VALUE 'Jaw';
  ALTER TYPE "public"."enum_icon_row_block_items_icon" ADD VALUE 'DentalAppliance';
  ALTER TYPE "public"."enum_care_network_block_specialists_icon" ADD VALUE 'Scale';
  ALTER TYPE "public"."enum_care_network_block_specialists_icon" ADD VALUE 'Lungs';
  ALTER TYPE "public"."enum_care_network_block_specialists_icon" ADD VALUE 'EntHead';
  ALTER TYPE "public"."enum_care_network_block_specialists_icon" ADD VALUE 'Jaw';
  ALTER TYPE "public"."enum_care_network_block_specialists_icon" ADD VALUE 'DentalAppliance';
  ALTER TYPE "public"."enum__medical_services_v_services_icon" ADD VALUE 'Scale';
  ALTER TYPE "public"."enum__medical_services_v_services_icon" ADD VALUE 'Lungs';
  ALTER TYPE "public"."enum__medical_services_v_services_icon" ADD VALUE 'EntHead';
  ALTER TYPE "public"."enum__medical_services_v_services_icon" ADD VALUE 'Jaw';
  ALTER TYPE "public"."enum__medical_services_v_services_icon" ADD VALUE 'DentalAppliance';
  ALTER TYPE "public"."enum__split_info_grid_block_v_right_items_icon" ADD VALUE 'Scale';
  ALTER TYPE "public"."enum__split_info_grid_block_v_right_items_icon" ADD VALUE 'Lungs';
  ALTER TYPE "public"."enum__split_info_grid_block_v_right_items_icon" ADD VALUE 'EntHead';
  ALTER TYPE "public"."enum__split_info_grid_block_v_right_items_icon" ADD VALUE 'Jaw';
  ALTER TYPE "public"."enum__split_info_grid_block_v_right_items_icon" ADD VALUE 'DentalAppliance';
  ALTER TYPE "public"."enum__icon_row_block_v_items_icon" ADD VALUE 'Scale';
  ALTER TYPE "public"."enum__icon_row_block_v_items_icon" ADD VALUE 'Lungs';
  ALTER TYPE "public"."enum__icon_row_block_v_items_icon" ADD VALUE 'EntHead';
  ALTER TYPE "public"."enum__icon_row_block_v_items_icon" ADD VALUE 'Jaw';
  ALTER TYPE "public"."enum__icon_row_block_v_items_icon" ADD VALUE 'DentalAppliance';
  ALTER TYPE "public"."enum__care_network_block_v_specialists_icon" ADD VALUE 'Scale';
  ALTER TYPE "public"."enum__care_network_block_v_specialists_icon" ADD VALUE 'Lungs';
  ALTER TYPE "public"."enum__care_network_block_v_specialists_icon" ADD VALUE 'EntHead';
  ALTER TYPE "public"."enum__care_network_block_v_specialists_icon" ADD VALUE 'Jaw';
  ALTER TYPE "public"."enum__care_network_block_v_specialists_icon" ADD VALUE 'DentalAppliance';
  ALTER TYPE "public"."enum_header_booking_modal_options_icon" ADD VALUE 'Scale';
  ALTER TYPE "public"."enum_header_booking_modal_options_icon" ADD VALUE 'Lungs';
  ALTER TYPE "public"."enum_header_booking_modal_options_icon" ADD VALUE 'EntHead';
  ALTER TYPE "public"."enum_header_booking_modal_options_icon" ADD VALUE 'Jaw';
  ALTER TYPE "public"."enum_header_booking_modal_options_icon" ADD VALUE 'DentalAppliance';
  ALTER TYPE "public"."enum_education_hub_trust_pillars_icon" ADD VALUE 'Scale';
  ALTER TYPE "public"."enum_education_hub_trust_pillars_icon" ADD VALUE 'Lungs';
  ALTER TYPE "public"."enum_education_hub_trust_pillars_icon" ADD VALUE 'EntHead';
  ALTER TYPE "public"."enum_education_hub_trust_pillars_icon" ADD VALUE 'Jaw';
  ALTER TYPE "public"."enum_education_hub_trust_pillars_icon" ADD VALUE 'DentalAppliance';`)
}

export async function down({ db, payload, req }: MigrateDownArgs): Promise<void> {
  await db.execute(sql`
   ALTER TABLE "medical_services_services" ALTER COLUMN "icon" SET DATA TYPE text;
  ALTER TABLE "medical_services_services" ALTER COLUMN "icon" SET DEFAULT 'FileText'::text;
  DROP TYPE "public"."enum_medical_services_services_icon";
  CREATE TYPE "public"."enum_medical_services_services_icon" AS ENUM('FileText', 'PhoneCall', 'Beaker', 'SquareActivity', 'Activity', 'Heart', 'Scan', 'Stethoscope', 'Brain', 'Moon', 'Baby', 'TrendingUp', 'HeartHandshake', 'ClipboardList', 'UserCheck', 'List', 'UserPlus', 'BriefcaseMedical', 'BarChart3', 'Building', 'Building2', 'Eye', 'Waves', 'Monitor', 'Video', 'Check', 'ShieldCheck', 'Users', 'Bed', 'Wind', 'Sunrise', 'Frown', 'Ear', 'Smile', 'MessagesSquare', 'User', 'BrainCog', 'Wallet', 'CircleHelp');
  ALTER TABLE "medical_services_services" ALTER COLUMN "icon" SET DEFAULT 'FileText'::"public"."enum_medical_services_services_icon";
  ALTER TABLE "medical_services_services" ALTER COLUMN "icon" SET DATA TYPE "public"."enum_medical_services_services_icon" USING "icon"::"public"."enum_medical_services_services_icon";
  ALTER TABLE "split_info_grid_block_right_items" ALTER COLUMN "icon" SET DATA TYPE text;
  ALTER TABLE "split_info_grid_block_right_items" ALTER COLUMN "icon" SET DEFAULT 'FileText'::text;
  DROP TYPE "public"."enum_split_info_grid_block_right_items_icon";
  CREATE TYPE "public"."enum_split_info_grid_block_right_items_icon" AS ENUM('FileText', 'PhoneCall', 'Beaker', 'SquareActivity', 'Activity', 'Heart', 'Scan', 'Stethoscope', 'Brain', 'Moon', 'Baby', 'TrendingUp', 'HeartHandshake', 'ClipboardList', 'UserCheck', 'List', 'UserPlus', 'BriefcaseMedical', 'BarChart3', 'Building', 'Building2', 'Eye', 'Waves', 'Monitor', 'Video', 'Check', 'ShieldCheck', 'Users', 'Bed', 'Wind', 'Sunrise', 'Frown', 'Ear', 'Smile', 'MessagesSquare', 'User', 'BrainCog', 'Wallet', 'CircleHelp');
  ALTER TABLE "split_info_grid_block_right_items" ALTER COLUMN "icon" SET DEFAULT 'FileText'::"public"."enum_split_info_grid_block_right_items_icon";
  ALTER TABLE "split_info_grid_block_right_items" ALTER COLUMN "icon" SET DATA TYPE "public"."enum_split_info_grid_block_right_items_icon" USING "icon"::"public"."enum_split_info_grid_block_right_items_icon";
  ALTER TABLE "icon_row_block_items" ALTER COLUMN "icon" SET DATA TYPE text;
  ALTER TABLE "icon_row_block_items" ALTER COLUMN "icon" SET DEFAULT 'FileText'::text;
  DROP TYPE "public"."enum_icon_row_block_items_icon";
  CREATE TYPE "public"."enum_icon_row_block_items_icon" AS ENUM('FileText', 'PhoneCall', 'Beaker', 'SquareActivity', 'Activity', 'Heart', 'Scan', 'Stethoscope', 'Brain', 'Moon', 'Baby', 'TrendingUp', 'HeartHandshake', 'ClipboardList', 'UserCheck', 'List', 'UserPlus', 'BriefcaseMedical', 'BarChart3', 'Building', 'Building2', 'Eye', 'Waves', 'Monitor', 'Video', 'Check', 'ShieldCheck', 'Users', 'Bed', 'Wind', 'Sunrise', 'Frown', 'Ear', 'Smile', 'MessagesSquare', 'User', 'BrainCog', 'Wallet', 'CircleHelp');
  ALTER TABLE "icon_row_block_items" ALTER COLUMN "icon" SET DEFAULT 'FileText'::"public"."enum_icon_row_block_items_icon";
  ALTER TABLE "icon_row_block_items" ALTER COLUMN "icon" SET DATA TYPE "public"."enum_icon_row_block_items_icon" USING "icon"::"public"."enum_icon_row_block_items_icon";
  ALTER TABLE "care_network_block_specialists" ALTER COLUMN "icon" SET DATA TYPE text;
  ALTER TABLE "care_network_block_specialists" ALTER COLUMN "icon" SET DEFAULT 'FileText'::text;
  DROP TYPE "public"."enum_care_network_block_specialists_icon";
  CREATE TYPE "public"."enum_care_network_block_specialists_icon" AS ENUM('FileText', 'PhoneCall', 'Beaker', 'SquareActivity', 'Activity', 'Heart', 'Scan', 'Stethoscope', 'Brain', 'Moon', 'Baby', 'TrendingUp', 'HeartHandshake', 'ClipboardList', 'UserCheck', 'List', 'UserPlus', 'BriefcaseMedical', 'BarChart3', 'Building', 'Building2', 'Eye', 'Waves', 'Monitor', 'Video', 'Check', 'ShieldCheck', 'Users', 'Bed', 'Wind', 'Sunrise', 'Frown', 'Ear', 'Smile', 'MessagesSquare', 'User', 'BrainCog', 'Wallet', 'CircleHelp');
  ALTER TABLE "care_network_block_specialists" ALTER COLUMN "icon" SET DEFAULT 'FileText'::"public"."enum_care_network_block_specialists_icon";
  ALTER TABLE "care_network_block_specialists" ALTER COLUMN "icon" SET DATA TYPE "public"."enum_care_network_block_specialists_icon" USING "icon"::"public"."enum_care_network_block_specialists_icon";
  ALTER TABLE "_medical_services_v_services" ALTER COLUMN "icon" SET DATA TYPE text;
  ALTER TABLE "_medical_services_v_services" ALTER COLUMN "icon" SET DEFAULT 'FileText'::text;
  DROP TYPE "public"."enum__medical_services_v_services_icon";
  CREATE TYPE "public"."enum__medical_services_v_services_icon" AS ENUM('FileText', 'PhoneCall', 'Beaker', 'SquareActivity', 'Activity', 'Heart', 'Scan', 'Stethoscope', 'Brain', 'Moon', 'Baby', 'TrendingUp', 'HeartHandshake', 'ClipboardList', 'UserCheck', 'List', 'UserPlus', 'BriefcaseMedical', 'BarChart3', 'Building', 'Building2', 'Eye', 'Waves', 'Monitor', 'Video', 'Check', 'ShieldCheck', 'Users', 'Bed', 'Wind', 'Sunrise', 'Frown', 'Ear', 'Smile', 'MessagesSquare', 'User', 'BrainCog', 'Wallet', 'CircleHelp');
  ALTER TABLE "_medical_services_v_services" ALTER COLUMN "icon" SET DEFAULT 'FileText'::"public"."enum__medical_services_v_services_icon";
  ALTER TABLE "_medical_services_v_services" ALTER COLUMN "icon" SET DATA TYPE "public"."enum__medical_services_v_services_icon" USING "icon"::"public"."enum__medical_services_v_services_icon";
  ALTER TABLE "_split_info_grid_block_v_right_items" ALTER COLUMN "icon" SET DATA TYPE text;
  ALTER TABLE "_split_info_grid_block_v_right_items" ALTER COLUMN "icon" SET DEFAULT 'FileText'::text;
  DROP TYPE "public"."enum__split_info_grid_block_v_right_items_icon";
  CREATE TYPE "public"."enum__split_info_grid_block_v_right_items_icon" AS ENUM('FileText', 'PhoneCall', 'Beaker', 'SquareActivity', 'Activity', 'Heart', 'Scan', 'Stethoscope', 'Brain', 'Moon', 'Baby', 'TrendingUp', 'HeartHandshake', 'ClipboardList', 'UserCheck', 'List', 'UserPlus', 'BriefcaseMedical', 'BarChart3', 'Building', 'Building2', 'Eye', 'Waves', 'Monitor', 'Video', 'Check', 'ShieldCheck', 'Users', 'Bed', 'Wind', 'Sunrise', 'Frown', 'Ear', 'Smile', 'MessagesSquare', 'User', 'BrainCog', 'Wallet', 'CircleHelp');
  ALTER TABLE "_split_info_grid_block_v_right_items" ALTER COLUMN "icon" SET DEFAULT 'FileText'::"public"."enum__split_info_grid_block_v_right_items_icon";
  ALTER TABLE "_split_info_grid_block_v_right_items" ALTER COLUMN "icon" SET DATA TYPE "public"."enum__split_info_grid_block_v_right_items_icon" USING "icon"::"public"."enum__split_info_grid_block_v_right_items_icon";
  ALTER TABLE "_icon_row_block_v_items" ALTER COLUMN "icon" SET DATA TYPE text;
  ALTER TABLE "_icon_row_block_v_items" ALTER COLUMN "icon" SET DEFAULT 'FileText'::text;
  DROP TYPE "public"."enum__icon_row_block_v_items_icon";
  CREATE TYPE "public"."enum__icon_row_block_v_items_icon" AS ENUM('FileText', 'PhoneCall', 'Beaker', 'SquareActivity', 'Activity', 'Heart', 'Scan', 'Stethoscope', 'Brain', 'Moon', 'Baby', 'TrendingUp', 'HeartHandshake', 'ClipboardList', 'UserCheck', 'List', 'UserPlus', 'BriefcaseMedical', 'BarChart3', 'Building', 'Building2', 'Eye', 'Waves', 'Monitor', 'Video', 'Check', 'ShieldCheck', 'Users', 'Bed', 'Wind', 'Sunrise', 'Frown', 'Ear', 'Smile', 'MessagesSquare', 'User', 'BrainCog', 'Wallet', 'CircleHelp');
  ALTER TABLE "_icon_row_block_v_items" ALTER COLUMN "icon" SET DEFAULT 'FileText'::"public"."enum__icon_row_block_v_items_icon";
  ALTER TABLE "_icon_row_block_v_items" ALTER COLUMN "icon" SET DATA TYPE "public"."enum__icon_row_block_v_items_icon" USING "icon"::"public"."enum__icon_row_block_v_items_icon";
  ALTER TABLE "_care_network_block_v_specialists" ALTER COLUMN "icon" SET DATA TYPE text;
  ALTER TABLE "_care_network_block_v_specialists" ALTER COLUMN "icon" SET DEFAULT 'FileText'::text;
  DROP TYPE "public"."enum__care_network_block_v_specialists_icon";
  CREATE TYPE "public"."enum__care_network_block_v_specialists_icon" AS ENUM('FileText', 'PhoneCall', 'Beaker', 'SquareActivity', 'Activity', 'Heart', 'Scan', 'Stethoscope', 'Brain', 'Moon', 'Baby', 'TrendingUp', 'HeartHandshake', 'ClipboardList', 'UserCheck', 'List', 'UserPlus', 'BriefcaseMedical', 'BarChart3', 'Building', 'Building2', 'Eye', 'Waves', 'Monitor', 'Video', 'Check', 'ShieldCheck', 'Users', 'Bed', 'Wind', 'Sunrise', 'Frown', 'Ear', 'Smile', 'MessagesSquare', 'User', 'BrainCog', 'Wallet', 'CircleHelp');
  ALTER TABLE "_care_network_block_v_specialists" ALTER COLUMN "icon" SET DEFAULT 'FileText'::"public"."enum__care_network_block_v_specialists_icon";
  ALTER TABLE "_care_network_block_v_specialists" ALTER COLUMN "icon" SET DATA TYPE "public"."enum__care_network_block_v_specialists_icon" USING "icon"::"public"."enum__care_network_block_v_specialists_icon";
  ALTER TABLE "header_booking_modal_options" ALTER COLUMN "icon" SET DATA TYPE text;
  ALTER TABLE "header_booking_modal_options" ALTER COLUMN "icon" SET DEFAULT 'Wallet'::text;
  DROP TYPE "public"."enum_header_booking_modal_options_icon";
  CREATE TYPE "public"."enum_header_booking_modal_options_icon" AS ENUM('FileText', 'PhoneCall', 'Beaker', 'SquareActivity', 'Activity', 'Heart', 'Scan', 'Stethoscope', 'Brain', 'Moon', 'Baby', 'TrendingUp', 'HeartHandshake', 'ClipboardList', 'UserCheck', 'List', 'UserPlus', 'BriefcaseMedical', 'BarChart3', 'Building', 'Building2', 'Eye', 'Waves', 'Monitor', 'Video', 'Check', 'ShieldCheck', 'Users', 'Bed', 'Wind', 'Sunrise', 'Frown', 'Ear', 'Smile', 'MessagesSquare', 'User', 'BrainCog', 'Wallet', 'CircleHelp');
  ALTER TABLE "header_booking_modal_options" ALTER COLUMN "icon" SET DEFAULT 'Wallet'::"public"."enum_header_booking_modal_options_icon";
  ALTER TABLE "header_booking_modal_options" ALTER COLUMN "icon" SET DATA TYPE "public"."enum_header_booking_modal_options_icon" USING "icon"::"public"."enum_header_booking_modal_options_icon";
  ALTER TABLE "education_hub_trust_pillars" ALTER COLUMN "icon" SET DATA TYPE text;
  ALTER TABLE "education_hub_trust_pillars" ALTER COLUMN "icon" SET DEFAULT 'FileText'::text;
  DROP TYPE "public"."enum_education_hub_trust_pillars_icon";
  CREATE TYPE "public"."enum_education_hub_trust_pillars_icon" AS ENUM('FileText', 'PhoneCall', 'Beaker', 'SquareActivity', 'Activity', 'Heart', 'Scan', 'Stethoscope', 'Brain', 'Moon', 'Baby', 'TrendingUp', 'HeartHandshake', 'ClipboardList', 'UserCheck', 'List', 'UserPlus', 'BriefcaseMedical', 'BarChart3', 'Building', 'Building2', 'Eye', 'Waves', 'Monitor', 'Video', 'Check', 'ShieldCheck', 'Users', 'Bed', 'Wind', 'Sunrise', 'Frown', 'Ear', 'Smile', 'MessagesSquare', 'User', 'BrainCog', 'Wallet', 'CircleHelp');
  ALTER TABLE "education_hub_trust_pillars" ALTER COLUMN "icon" SET DEFAULT 'FileText'::"public"."enum_education_hub_trust_pillars_icon";
  ALTER TABLE "education_hub_trust_pillars" ALTER COLUMN "icon" SET DATA TYPE "public"."enum_education_hub_trust_pillars_icon" USING "icon"::"public"."enum_education_hub_trust_pillars_icon";`)
}
