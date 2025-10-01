import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-vercel-postgres'

export async function up({ db, payload, req }: MigrateUpArgs): Promise<void> {
  await db.execute(sql`
   ALTER TABLE "patients_sleep_sleep_tests" ALTER COLUMN "button_text" DROP DEFAULT;
  ALTER TABLE "_patients_sleep_v_sleep_tests" ALTER COLUMN "button_text" DROP DEFAULT;`)
}

export async function down({ db, payload, req }: MigrateDownArgs): Promise<void> {
  await db.execute(sql`
   ALTER TABLE "patients_sleep_sleep_tests" ALTER COLUMN "button_text" SET DEFAULT 'Learn more';
  ALTER TABLE "_patients_sleep_v_sleep_tests" ALTER COLUMN "button_text" SET DEFAULT 'Learn more';`)
}
