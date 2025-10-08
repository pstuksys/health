import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-vercel-postgres'

export async function up({ db, payload, req }: MigrateUpArgs): Promise<void> {
  await db.execute(sql`
   ALTER TABLE "sleep_assessment_steps_steps" DROP COLUMN "icon";
  ALTER TABLE "_sleep_assessment_steps_v_steps" DROP COLUMN "icon";
  DROP TYPE "public"."enum_sleep_assessment_steps_steps_icon";
  DROP TYPE "public"."enum__sleep_assessment_steps_v_steps_icon";`)
}

export async function down({ db, payload, req }: MigrateDownArgs): Promise<void> {
  await db.execute(sql`
   CREATE TYPE "public"."enum_sleep_assessment_steps_steps_icon" AS ENUM('FileText', 'PhoneCall', 'Beaker', 'SquareActivity', 'Activity', 'Heart', 'Scan', 'Stethoscope', 'Brain', 'Moon', 'Baby', 'TrendingUp', 'HeartHandshake', 'ClipboardList', 'UserCheck', 'List', 'UserPlus', 'BriefcaseMedical', 'BarChart3', 'Building', 'Building2', 'Eye', 'Waves', 'Monitor', 'Video', 'Check');
  CREATE TYPE "public"."enum__sleep_assessment_steps_v_steps_icon" AS ENUM('FileText', 'PhoneCall', 'Beaker', 'SquareActivity', 'Activity', 'Heart', 'Scan', 'Stethoscope', 'Brain', 'Moon', 'Baby', 'TrendingUp', 'HeartHandshake', 'ClipboardList', 'UserCheck', 'List', 'UserPlus', 'BriefcaseMedical', 'BarChart3', 'Building', 'Building2', 'Eye', 'Waves', 'Monitor', 'Video', 'Check');
  ALTER TABLE "sleep_assessment_steps_steps" ADD COLUMN "icon" "enum_sleep_assessment_steps_steps_icon" DEFAULT 'FileText';
  ALTER TABLE "_sleep_assessment_steps_v_steps" ADD COLUMN "icon" "enum__sleep_assessment_steps_v_steps_icon" DEFAULT 'FileText';`)
}
