import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-vercel-postgres'

export async function up({ db, payload, req }: MigrateUpArgs): Promise<void> {
  await db.execute(sql`
   ALTER TABLE "patients_sleep_sleep_tests" DROP COLUMN "icon";
  ALTER TABLE "_patients_sleep_v_sleep_tests" DROP COLUMN "icon";
  DROP TYPE "public"."enum_patients_sleep_sleep_tests_icon";
  DROP TYPE "public"."enum__patients_sleep_v_sleep_tests_icon";`)
}

export async function down({ db, payload, req }: MigrateDownArgs): Promise<void> {
  await db.execute(sql`
   CREATE TYPE "public"."enum_patients_sleep_sleep_tests_icon" AS ENUM('brain', 'heart', 'lungs', 'moon', 'activity', 'stethoscope', 'baby');
  CREATE TYPE "public"."enum__patients_sleep_v_sleep_tests_icon" AS ENUM('brain', 'heart', 'lungs', 'moon', 'activity', 'stethoscope', 'baby');
  ALTER TABLE "patients_sleep_sleep_tests" ADD COLUMN "icon" "enum_patients_sleep_sleep_tests_icon" DEFAULT 'brain';
  ALTER TABLE "_patients_sleep_v_sleep_tests" ADD COLUMN "icon" "enum__patients_sleep_v_sleep_tests_icon" DEFAULT 'brain';`)
}
