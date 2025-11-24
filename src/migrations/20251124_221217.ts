import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-vercel-postgres'

export async function up({ db, payload, req }: MigrateUpArgs): Promise<void> {
  await db.execute(sql`
   CREATE TYPE "public"."enum_pages_hero_overlay_darkness" AS ENUM('none', 'light', 'medium', 'dark', 'very-dark');
  CREATE TYPE "public"."enum__pages_v_version_hero_overlay_darkness" AS ENUM('none', 'light', 'medium', 'dark', 'very-dark');
  ALTER TABLE "pages" ADD COLUMN "hero_overlay_darkness" "enum_pages_hero_overlay_darkness" DEFAULT 'medium';
  ALTER TABLE "_pages_v" ADD COLUMN "version_hero_overlay_darkness" "enum__pages_v_version_hero_overlay_darkness" DEFAULT 'medium';`)
}

export async function down({ db, payload, req }: MigrateDownArgs): Promise<void> {
  await db.execute(sql`
   ALTER TABLE "pages" DROP COLUMN "hero_overlay_darkness";
  ALTER TABLE "_pages_v" DROP COLUMN "version_hero_overlay_darkness";
  DROP TYPE "public"."enum_pages_hero_overlay_darkness";
  DROP TYPE "public"."enum__pages_v_version_hero_overlay_darkness";`)
}
