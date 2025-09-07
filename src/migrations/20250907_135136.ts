import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-vercel-postgres'

export async function up({ db, payload, req }: MigrateUpArgs): Promise<void> {
  await db.execute(sql`
   CREATE TYPE "public"."enum_blogs_category" AS ENUM('sleep-disorders', 'diagnostics-testing', 'therapies-treatments', 'lifestyle-tips');
  CREATE TYPE "public"."enum__blogs_v_version_category" AS ENUM('sleep-disorders', 'diagnostics-testing', 'therapies-treatments', 'lifestyle-tips');
  ALTER TABLE "blogs" ALTER COLUMN "category" SET DATA TYPE "public"."enum_blogs_category" USING "category"::"public"."enum_blogs_category";
  ALTER TABLE "_blogs_v" ALTER COLUMN "version_category" SET DATA TYPE "public"."enum__blogs_v_version_category" USING "version_category"::"public"."enum__blogs_v_version_category";`)
}

export async function down({ db, payload, req }: MigrateDownArgs): Promise<void> {
  await db.execute(sql`
   ALTER TABLE "blogs" ALTER COLUMN "category" SET DATA TYPE varchar;
  ALTER TABLE "_blogs_v" ALTER COLUMN "version_category" SET DATA TYPE varchar;
  DROP TYPE "public"."enum_blogs_category";
  DROP TYPE "public"."enum__blogs_v_version_category";`)
}
