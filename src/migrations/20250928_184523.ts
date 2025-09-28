import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-vercel-postgres'

export async function up({ db, payload, req }: MigrateUpArgs): Promise<void> {
  await db.execute(sql`
   ALTER TYPE "public"."enum_sleep_assessment_steps_steps_icon" ADD VALUE 'Activity';
  ALTER TYPE "public"."enum_sleep_assessment_steps_steps_icon" ADD VALUE 'Heart';
  ALTER TYPE "public"."enum_sleep_assessment_steps_steps_icon" ADD VALUE 'Scan';
  ALTER TYPE "public"."enum_sleep_assessment_steps_steps_icon" ADD VALUE 'Stethoscope';
  ALTER TYPE "public"."enum_sleep_assessment_steps_steps_icon" ADD VALUE 'Brain';
  ALTER TYPE "public"."enum_sleep_assessment_steps_steps_icon" ADD VALUE 'Moon';
  ALTER TYPE "public"."enum_sleep_assessment_steps_steps_icon" ADD VALUE 'Baby';
  ALTER TYPE "public"."enum_sleep_assessment_steps_steps_icon" ADD VALUE 'TrendingUp';
  ALTER TYPE "public"."enum_sleep_assessment_steps_steps_icon" ADD VALUE 'HeartHandshake';
  ALTER TYPE "public"."enum_sleep_assessment_steps_steps_icon" ADD VALUE 'ClipboardList';
  ALTER TYPE "public"."enum_sleep_assessment_steps_steps_icon" ADD VALUE 'UserCheck';
  ALTER TYPE "public"."enum_sleep_assessment_steps_steps_icon" ADD VALUE 'List';
  ALTER TYPE "public"."enum_sleep_assessment_steps_steps_icon" ADD VALUE 'UserPlus';
  ALTER TYPE "public"."enum_sleep_assessment_steps_steps_icon" ADD VALUE 'BriefcaseMedical';
  ALTER TYPE "public"."enum_sleep_assessment_steps_steps_icon" ADD VALUE 'BarChart3';
  ALTER TYPE "public"."enum_sleep_assessment_steps_steps_icon" ADD VALUE 'Building';
  ALTER TYPE "public"."enum_sleep_assessment_steps_steps_icon" ADD VALUE 'Building2';
  ALTER TYPE "public"."enum__sleep_assessment_steps_v_steps_icon" ADD VALUE 'Activity';
  ALTER TYPE "public"."enum__sleep_assessment_steps_v_steps_icon" ADD VALUE 'Heart';
  ALTER TYPE "public"."enum__sleep_assessment_steps_v_steps_icon" ADD VALUE 'Scan';
  ALTER TYPE "public"."enum__sleep_assessment_steps_v_steps_icon" ADD VALUE 'Stethoscope';
  ALTER TYPE "public"."enum__sleep_assessment_steps_v_steps_icon" ADD VALUE 'Brain';
  ALTER TYPE "public"."enum__sleep_assessment_steps_v_steps_icon" ADD VALUE 'Moon';
  ALTER TYPE "public"."enum__sleep_assessment_steps_v_steps_icon" ADD VALUE 'Baby';
  ALTER TYPE "public"."enum__sleep_assessment_steps_v_steps_icon" ADD VALUE 'TrendingUp';
  ALTER TYPE "public"."enum__sleep_assessment_steps_v_steps_icon" ADD VALUE 'HeartHandshake';
  ALTER TYPE "public"."enum__sleep_assessment_steps_v_steps_icon" ADD VALUE 'ClipboardList';
  ALTER TYPE "public"."enum__sleep_assessment_steps_v_steps_icon" ADD VALUE 'UserCheck';
  ALTER TYPE "public"."enum__sleep_assessment_steps_v_steps_icon" ADD VALUE 'List';
  ALTER TYPE "public"."enum__sleep_assessment_steps_v_steps_icon" ADD VALUE 'UserPlus';
  ALTER TYPE "public"."enum__sleep_assessment_steps_v_steps_icon" ADD VALUE 'BriefcaseMedical';
  ALTER TYPE "public"."enum__sleep_assessment_steps_v_steps_icon" ADD VALUE 'BarChart3';
  ALTER TYPE "public"."enum__sleep_assessment_steps_v_steps_icon" ADD VALUE 'Building';
  ALTER TYPE "public"."enum__sleep_assessment_steps_v_steps_icon" ADD VALUE 'Building2';
  ALTER TABLE "medical_services_services" ALTER COLUMN "icon" SET DATA TYPE text;
  ALTER TABLE "medical_services_services" ALTER COLUMN "icon" SET DEFAULT 'FileText'::text;
  -- Normalize existing icon values to new enum casing/keys prior to casting
  UPDATE "medical_services_services" SET "icon" = CASE lower("icon")
    WHEN 'scan' THEN 'Scan'
    WHEN 'activity' THEN 'Activity'
    WHEN 'zap' THEN 'Activity'
    WHEN 'heart' THEN 'Heart'
    WHEN 'stethoscope' THEN 'Stethoscope'
    WHEN 'check' THEN 'UserCheck'
    WHEN 'calendar' THEN 'Calendar'
    WHEN 'settings' THEN 'Settings'
    WHEN 'shield' THEN 'Shield'
    ELSE 'FileText'
  END;
  DROP TYPE "public"."enum_medical_services_services_icon";
  CREATE TYPE "public"."enum_medical_services_services_icon" AS ENUM('FileText', 'PhoneCall', 'Beaker', 'SquareActivity', 'Activity', 'Heart', 'Scan', 'Stethoscope', 'Brain', 'Moon', 'Baby', 'TrendingUp', 'HeartHandshake', 'ClipboardList', 'UserCheck', 'List', 'UserPlus', 'BriefcaseMedical', 'BarChart3', 'Building', 'Building2');
  ALTER TABLE "medical_services_services" ALTER COLUMN "icon" SET DEFAULT 'FileText'::"public"."enum_medical_services_services_icon";
  ALTER TABLE "medical_services_services" ALTER COLUMN "icon" SET DATA TYPE "public"."enum_medical_services_services_icon" USING "icon"::"public"."enum_medical_services_services_icon";
  ALTER TABLE "_medical_services_v_services" ALTER COLUMN "icon" SET DATA TYPE text;
  ALTER TABLE "_medical_services_v_services" ALTER COLUMN "icon" SET DEFAULT 'FileText'::text;
  -- Normalize view table icon values as well prior to casting
  UPDATE "_medical_services_v_services" SET "icon" = CASE lower("icon")
    WHEN 'scan' THEN 'Scan'
    WHEN 'activity' THEN 'Activity'
    WHEN 'zap' THEN 'Activity'
    WHEN 'heart' THEN 'Heart'
    WHEN 'stethoscope' THEN 'Stethoscope'
    WHEN 'check' THEN 'UserCheck'
    WHEN 'calendar' THEN 'Calendar'
    WHEN 'settings' THEN 'Settings'
    WHEN 'shield' THEN 'Shield'
    ELSE 'FileText'
  END;
  DROP TYPE "public"."enum__medical_services_v_services_icon";
  CREATE TYPE "public"."enum__medical_services_v_services_icon" AS ENUM('FileText', 'PhoneCall', 'Beaker', 'SquareActivity', 'Activity', 'Heart', 'Scan', 'Stethoscope', 'Brain', 'Moon', 'Baby', 'TrendingUp', 'HeartHandshake', 'ClipboardList', 'UserCheck', 'List', 'UserPlus', 'BriefcaseMedical', 'BarChart3', 'Building', 'Building2');
  ALTER TABLE "_medical_services_v_services" ALTER COLUMN "icon" SET DEFAULT 'FileText'::"public"."enum__medical_services_v_services_icon";
  ALTER TABLE "_medical_services_v_services" ALTER COLUMN "icon" SET DATA TYPE "public"."enum__medical_services_v_services_icon" USING "icon"::"public"."enum__medical_services_v_services_icon";
  ALTER TABLE "sleep_assessment_steps_steps" ALTER COLUMN "icon" SET DEFAULT 'FileText';
  ALTER TABLE "sleep_assessment_steps" ALTER COLUMN "main_button_text" DROP DEFAULT;
  ALTER TABLE "_sleep_assessment_steps_v_steps" ALTER COLUMN "icon" SET DEFAULT 'FileText';
  ALTER TABLE "_sleep_assessment_steps_v" ALTER COLUMN "main_button_text" DROP DEFAULT;
  ALTER TABLE "occupational_health" ADD COLUMN "journey_section_disable_view" boolean DEFAULT false;
  ALTER TABLE "_occupational_health_v" ADD COLUMN "journey_section_disable_view" boolean DEFAULT false;
  ALTER TABLE "pages" DROP COLUMN "hide_header";
  ALTER TABLE "pages" DROP COLUMN "hide_footer";
  ALTER TABLE "pages" DROP COLUMN "full_width";
  ALTER TABLE "_pages_v" DROP COLUMN "version_hide_header";
  ALTER TABLE "_pages_v" DROP COLUMN "version_hide_footer";
  ALTER TABLE "_pages_v" DROP COLUMN "version_full_width";`)
}

export async function down({ db, payload, req }: MigrateDownArgs): Promise<void> {
  await db.execute(sql`
   ALTER TABLE "medical_services_services" ALTER COLUMN "icon" SET DATA TYPE text;
  ALTER TABLE "medical_services_services" ALTER COLUMN "icon" SET DEFAULT 'scan'::text;
  DROP TYPE "public"."enum_medical_services_services_icon";
  CREATE TYPE "public"."enum_medical_services_services_icon" AS ENUM('scan', 'activity', 'zap', 'heart', 'stethoscope', 'check', 'calendar', 'settings', 'shield');
  ALTER TABLE "medical_services_services" ALTER COLUMN "icon" SET DEFAULT 'scan'::"public"."enum_medical_services_services_icon";
  ALTER TABLE "medical_services_services" ALTER COLUMN "icon" SET DATA TYPE "public"."enum_medical_services_services_icon" USING "icon"::"public"."enum_medical_services_services_icon";
  ALTER TABLE "sleep_assessment_steps_steps" ALTER COLUMN "icon" SET DATA TYPE text;
  DROP TYPE "public"."enum_sleep_assessment_steps_steps_icon";
  CREATE TYPE "public"."enum_sleep_assessment_steps_steps_icon" AS ENUM('FileText', 'PhoneCall', 'Beaker', 'SquareActivity');
  ALTER TABLE "sleep_assessment_steps_steps" ALTER COLUMN "icon" SET DATA TYPE "public"."enum_sleep_assessment_steps_steps_icon" USING "icon"::"public"."enum_sleep_assessment_steps_steps_icon";
  ALTER TABLE "_medical_services_v_services" ALTER COLUMN "icon" SET DATA TYPE text;
  ALTER TABLE "_medical_services_v_services" ALTER COLUMN "icon" SET DEFAULT 'scan'::text;
  DROP TYPE "public"."enum__medical_services_v_services_icon";
  CREATE TYPE "public"."enum__medical_services_v_services_icon" AS ENUM('scan', 'activity', 'zap', 'heart', 'stethoscope', 'check', 'calendar', 'settings', 'shield');
  ALTER TABLE "_medical_services_v_services" ALTER COLUMN "icon" SET DEFAULT 'scan'::"public"."enum__medical_services_v_services_icon";
  ALTER TABLE "_medical_services_v_services" ALTER COLUMN "icon" SET DATA TYPE "public"."enum__medical_services_v_services_icon" USING "icon"::"public"."enum__medical_services_v_services_icon";
  ALTER TABLE "_sleep_assessment_steps_v_steps" ALTER COLUMN "icon" SET DATA TYPE text;
  DROP TYPE "public"."enum__sleep_assessment_steps_v_steps_icon";
  CREATE TYPE "public"."enum__sleep_assessment_steps_v_steps_icon" AS ENUM('FileText', 'PhoneCall', 'Beaker', 'SquareActivity');
  ALTER TABLE "_sleep_assessment_steps_v_steps" ALTER COLUMN "icon" SET DATA TYPE "public"."enum__sleep_assessment_steps_v_steps_icon" USING "icon"::"public"."enum__sleep_assessment_steps_v_steps_icon";
  ALTER TABLE "sleep_assessment_steps_steps" ALTER COLUMN "icon" DROP DEFAULT;
  ALTER TABLE "sleep_assessment_steps" ALTER COLUMN "main_button_text" SET DEFAULT 'Take a few minutes to complete sleep assessment';
  ALTER TABLE "_sleep_assessment_steps_v_steps" ALTER COLUMN "icon" DROP DEFAULT;
  ALTER TABLE "_sleep_assessment_steps_v" ALTER COLUMN "main_button_text" SET DEFAULT 'Take a few minutes to complete sleep assessment';
  ALTER TABLE "pages" ADD COLUMN "hide_header" boolean DEFAULT false;
  ALTER TABLE "pages" ADD COLUMN "hide_footer" boolean DEFAULT false;
  ALTER TABLE "pages" ADD COLUMN "full_width" boolean DEFAULT false;
  ALTER TABLE "_pages_v" ADD COLUMN "version_hide_header" boolean DEFAULT false;
  ALTER TABLE "_pages_v" ADD COLUMN "version_hide_footer" boolean DEFAULT false;
  ALTER TABLE "_pages_v" ADD COLUMN "version_full_width" boolean DEFAULT false;
  ALTER TABLE "occupational_health" DROP COLUMN "journey_section_disable_view";
  ALTER TABLE "_occupational_health_v" DROP COLUMN "journey_section_disable_view";`)
}
