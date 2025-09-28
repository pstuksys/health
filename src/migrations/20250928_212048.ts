import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-vercel-postgres'

export async function up({ db, payload, req }: MigrateUpArgs): Promise<void> {
  await db.execute(sql`
   CREATE TYPE "public"."enum_services_banner_overlay_darkness" AS ENUM('none', 'light', 'medium', 'dark', 'very-dark');
  CREATE TYPE "public"."enum__services_banner_v_overlay_darkness" AS ENUM('none', 'light', 'medium', 'dark', 'very-dark');
  ALTER TABLE "services_banner" ADD COLUMN "overlay_darkness" "enum_services_banner_overlay_darkness" DEFAULT 'medium';
  ALTER TABLE "_services_banner_v" ADD COLUMN "overlay_darkness" "enum__services_banner_v_overlay_darkness" DEFAULT 'medium';`)
}

export async function down({ db, payload, req }: MigrateDownArgs): Promise<void> {
  await db.execute(sql`
   ALTER TABLE "services_banner" DROP COLUMN "overlay_darkness";
  ALTER TABLE "_services_banner_v" DROP COLUMN "overlay_darkness";
  DROP TYPE "public"."enum_services_banner_overlay_darkness";
  DROP TYPE "public"."enum__services_banner_v_overlay_darkness";`)
}
