import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-vercel-postgres'

export async function up({ db, payload, req }: MigrateUpArgs): Promise<void> {
  await db.execute(sql`
   ALTER TABLE "pages" ADD COLUMN "hero_full_height" boolean DEFAULT false;
  ALTER TABLE "_pages_v" ADD COLUMN "version_hero_full_height" boolean DEFAULT false;`)
}

export async function down({ db, payload, req }: MigrateDownArgs): Promise<void> {
  await db.execute(sql`
   ALTER TABLE "pages" DROP COLUMN "hero_full_height";
  ALTER TABLE "_pages_v" DROP COLUMN "version_hero_full_height";`)
}
