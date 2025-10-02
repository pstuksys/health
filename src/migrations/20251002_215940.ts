import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-vercel-postgres'

export async function up({ db, payload, req }: MigrateUpArgs): Promise<void> {
  await db.execute(sql`
   ALTER TABLE "occupational_health" ADD COLUMN "services_section_disable_view" boolean DEFAULT false;
  ALTER TABLE "occupational_health" ADD COLUMN "cta_section_disable_view" boolean DEFAULT false;
  ALTER TABLE "_occupational_health_v" ADD COLUMN "services_section_disable_view" boolean DEFAULT false;
  ALTER TABLE "_occupational_health_v" ADD COLUMN "cta_section_disable_view" boolean DEFAULT false;`)
}

export async function down({ db, payload, req }: MigrateDownArgs): Promise<void> {
  await db.execute(sql`
   ALTER TABLE "occupational_health" DROP COLUMN "services_section_disable_view";
  ALTER TABLE "occupational_health" DROP COLUMN "cta_section_disable_view";
  ALTER TABLE "_occupational_health_v" DROP COLUMN "services_section_disable_view";
  ALTER TABLE "_occupational_health_v" DROP COLUMN "cta_section_disable_view";`)
}
