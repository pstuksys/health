import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-vercel-postgres'

export async function up({ db, payload, req }: MigrateUpArgs): Promise<void> {
  await db.execute(sql`
   CREATE TABLE "payload_kv" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"key" varchar NOT NULL,
  	"data" jsonb NOT NULL
  );
  
  DROP INDEX "corporate_health_hero_section_cta_button_hero_section_cta_button_internal_idx";
  DROP INDEX "corporate_health_services_section_cta_button_services_section_cta_button_internal_idx";
  DROP INDEX "occupational_health_pathway_section_steps_link_internal_link_internal_relation_idx";
  DROP INDEX "occupational_health_services_section_services_cta_internal_cta_internal_relation_idx";
  DROP INDEX "occupational_health_hero_section_osa_link_internal_hero_section_osa_link_internal_relation_idx";
  DROP INDEX "occupational_health_hero_section_primary_cta_internal_hero_section_primary_cta_internal_relation_idx";
  DROP INDEX "occupational_health_hero_section_secondary_cta_internal_hero_section_secondary_cta_internal_relation_idx";
  DROP INDEX "occupational_health_cta_section_primary_cta_cta_section_primary_cta_internal_idx";
  DROP INDEX "occupational_health_cta_section_secondary_cta_cta_section_secondary_cta_internal_idx";
  DROP INDEX "_patients_sleep_v_cta_section_cta_section_cta_internal_link_idx";
  DROP INDEX "_corporate_health_v_hero_section_cta_button_hero_section_cta_button_internal_idx";
  DROP INDEX "_corporate_health_v_services_section_cta_button_services_section_cta_button_internal_idx";
  DROP INDEX "_occupational_health_v_pathway_section_steps_link_internal_link_internal_relation_idx";
  DROP INDEX "_occupational_health_v_services_section_services_cta_internal_cta_internal_relation_idx";
  DROP INDEX "_occupational_health_v_hero_section_osa_link_internal_hero_section_osa_link_internal_relation_idx";
  DROP INDEX "_occupational_health_v_hero_section_primary_cta_internal_hero_section_primary_cta_internal_relation_idx";
  DROP INDEX "_occupational_health_v_hero_section_secondary_cta_internal_hero_section_secondary_cta_internal_relation_idx";
  DROP INDEX "_occupational_health_v_cta_section_primary_cta_cta_section_primary_cta_internal_idx";
  DROP INDEX "_occupational_health_v_cta_section_secondary_cta_cta_section_secondary_cta_internal_idx";
  ALTER TABLE "users" ADD COLUMN "reset_password_requested_at" timestamp(3) with time zone;
  ALTER TABLE "media" ADD COLUMN "_objectkey" varchar;
  CREATE UNIQUE INDEX "payload_kv_key_idx" ON "payload_kv" USING btree ("key");
  CREATE INDEX "corporate_health_hero_section_cta_button_hero_section_ct_idx" ON "corporate_health" USING btree ("hero_section_cta_button_internal_id");
  CREATE INDEX "corporate_health_services_section_cta_button_services_se_idx" ON "corporate_health" USING btree ("services_section_cta_button_internal_id");
  CREATE INDEX "occupational_health_pathway_section_steps_link_internal__idx" ON "occupational_health_pathway_section_steps" USING btree ("link_internal_relation_id");
  CREATE INDEX "occupational_health_services_section_services_cta_intern_idx" ON "occupational_health_services_section_services" USING btree ("cta_internal_relation_id");
  CREATE INDEX "occupational_health_hero_section_osa_link_internal_hero__idx" ON "occupational_health" USING btree ("hero_section_osa_link_internal_relation_id");
  CREATE INDEX "occupational_health_hero_section_primary_cta_internal_he_idx" ON "occupational_health" USING btree ("hero_section_primary_cta_internal_relation_id");
  CREATE INDEX "occupational_health_hero_section_secondary_cta_internal__idx" ON "occupational_health" USING btree ("hero_section_secondary_cta_internal_relation_id");
  CREATE INDEX "occupational_health_cta_section_primary_cta_cta_section__idx" ON "occupational_health" USING btree ("cta_section_primary_cta_internal_id");
  CREATE INDEX "occupational_health_cta_section_secondary_cta_cta_sectio_idx" ON "occupational_health" USING btree ("cta_section_secondary_cta_internal_id");
  CREATE INDEX "_patients_sleep_v_cta_section_cta_section_cta_internal_l_idx" ON "_patients_sleep_v" USING btree ("cta_section_cta_internal_link_id");
  CREATE INDEX "_corporate_health_v_hero_section_cta_button_hero_section_idx" ON "_corporate_health_v" USING btree ("hero_section_cta_button_internal_id");
  CREATE INDEX "_corporate_health_v_services_section_cta_button_services_idx" ON "_corporate_health_v" USING btree ("services_section_cta_button_internal_id");
  CREATE INDEX "_occupational_health_v_pathway_section_steps_link_intern_idx" ON "_occupational_health_v_pathway_section_steps" USING btree ("link_internal_relation_id");
  CREATE INDEX "_occupational_health_v_services_section_services_cta_int_idx" ON "_occupational_health_v_services_section_services" USING btree ("cta_internal_relation_id");
  CREATE INDEX "_occupational_health_v_hero_section_osa_link_internal_he_idx" ON "_occupational_health_v" USING btree ("hero_section_osa_link_internal_relation_id");
  CREATE INDEX "_occupational_health_v_hero_section_primary_cta_internal_idx" ON "_occupational_health_v" USING btree ("hero_section_primary_cta_internal_relation_id");
  CREATE INDEX "_occupational_health_v_hero_section_secondary_cta_intern_idx" ON "_occupational_health_v" USING btree ("hero_section_secondary_cta_internal_relation_id");
  CREATE INDEX "_occupational_health_v_cta_section_primary_cta_cta_secti_idx" ON "_occupational_health_v" USING btree ("cta_section_primary_cta_internal_id");
  CREATE INDEX "_occupational_health_v_cta_section_secondary_cta_cta_sec_idx" ON "_occupational_health_v" USING btree ("cta_section_secondary_cta_internal_id");`)
}

export async function down({ db, payload, req }: MigrateDownArgs): Promise<void> {
  await db.execute(sql`
   ALTER TABLE "payload_kv" DISABLE ROW LEVEL SECURITY;
  DROP TABLE "payload_kv" CASCADE;
  DROP INDEX "corporate_health_hero_section_cta_button_hero_section_ct_idx";
  DROP INDEX "corporate_health_services_section_cta_button_services_se_idx";
  DROP INDEX "occupational_health_pathway_section_steps_link_internal__idx";
  DROP INDEX "occupational_health_services_section_services_cta_intern_idx";
  DROP INDEX "occupational_health_hero_section_osa_link_internal_hero__idx";
  DROP INDEX "occupational_health_hero_section_primary_cta_internal_he_idx";
  DROP INDEX "occupational_health_hero_section_secondary_cta_internal__idx";
  DROP INDEX "occupational_health_cta_section_primary_cta_cta_section__idx";
  DROP INDEX "occupational_health_cta_section_secondary_cta_cta_sectio_idx";
  DROP INDEX "_patients_sleep_v_cta_section_cta_section_cta_internal_l_idx";
  DROP INDEX "_corporate_health_v_hero_section_cta_button_hero_section_idx";
  DROP INDEX "_corporate_health_v_services_section_cta_button_services_idx";
  DROP INDEX "_occupational_health_v_pathway_section_steps_link_intern_idx";
  DROP INDEX "_occupational_health_v_services_section_services_cta_int_idx";
  DROP INDEX "_occupational_health_v_hero_section_osa_link_internal_he_idx";
  DROP INDEX "_occupational_health_v_hero_section_primary_cta_internal_idx";
  DROP INDEX "_occupational_health_v_hero_section_secondary_cta_intern_idx";
  DROP INDEX "_occupational_health_v_cta_section_primary_cta_cta_secti_idx";
  DROP INDEX "_occupational_health_v_cta_section_secondary_cta_cta_sec_idx";
  CREATE INDEX "corporate_health_hero_section_cta_button_hero_section_cta_button_internal_idx" ON "corporate_health" USING btree ("hero_section_cta_button_internal_id");
  CREATE INDEX "corporate_health_services_section_cta_button_services_section_cta_button_internal_idx" ON "corporate_health" USING btree ("services_section_cta_button_internal_id");
  CREATE INDEX "occupational_health_pathway_section_steps_link_internal_link_internal_relation_idx" ON "occupational_health_pathway_section_steps" USING btree ("link_internal_relation_id");
  CREATE INDEX "occupational_health_services_section_services_cta_internal_cta_internal_relation_idx" ON "occupational_health_services_section_services" USING btree ("cta_internal_relation_id");
  CREATE INDEX "occupational_health_hero_section_osa_link_internal_hero_section_osa_link_internal_relation_idx" ON "occupational_health" USING btree ("hero_section_osa_link_internal_relation_id");
  CREATE INDEX "occupational_health_hero_section_primary_cta_internal_hero_section_primary_cta_internal_relation_idx" ON "occupational_health" USING btree ("hero_section_primary_cta_internal_relation_id");
  CREATE INDEX "occupational_health_hero_section_secondary_cta_internal_hero_section_secondary_cta_internal_relation_idx" ON "occupational_health" USING btree ("hero_section_secondary_cta_internal_relation_id");
  CREATE INDEX "occupational_health_cta_section_primary_cta_cta_section_primary_cta_internal_idx" ON "occupational_health" USING btree ("cta_section_primary_cta_internal_id");
  CREATE INDEX "occupational_health_cta_section_secondary_cta_cta_section_secondary_cta_internal_idx" ON "occupational_health" USING btree ("cta_section_secondary_cta_internal_id");
  CREATE INDEX "_patients_sleep_v_cta_section_cta_section_cta_internal_link_idx" ON "_patients_sleep_v" USING btree ("cta_section_cta_internal_link_id");
  CREATE INDEX "_corporate_health_v_hero_section_cta_button_hero_section_cta_button_internal_idx" ON "_corporate_health_v" USING btree ("hero_section_cta_button_internal_id");
  CREATE INDEX "_corporate_health_v_services_section_cta_button_services_section_cta_button_internal_idx" ON "_corporate_health_v" USING btree ("services_section_cta_button_internal_id");
  CREATE INDEX "_occupational_health_v_pathway_section_steps_link_internal_link_internal_relation_idx" ON "_occupational_health_v_pathway_section_steps" USING btree ("link_internal_relation_id");
  CREATE INDEX "_occupational_health_v_services_section_services_cta_internal_cta_internal_relation_idx" ON "_occupational_health_v_services_section_services" USING btree ("cta_internal_relation_id");
  CREATE INDEX "_occupational_health_v_hero_section_osa_link_internal_hero_section_osa_link_internal_relation_idx" ON "_occupational_health_v" USING btree ("hero_section_osa_link_internal_relation_id");
  CREATE INDEX "_occupational_health_v_hero_section_primary_cta_internal_hero_section_primary_cta_internal_relation_idx" ON "_occupational_health_v" USING btree ("hero_section_primary_cta_internal_relation_id");
  CREATE INDEX "_occupational_health_v_hero_section_secondary_cta_internal_hero_section_secondary_cta_internal_relation_idx" ON "_occupational_health_v" USING btree ("hero_section_secondary_cta_internal_relation_id");
  CREATE INDEX "_occupational_health_v_cta_section_primary_cta_cta_section_primary_cta_internal_idx" ON "_occupational_health_v" USING btree ("cta_section_primary_cta_internal_id");
  CREATE INDEX "_occupational_health_v_cta_section_secondary_cta_cta_section_secondary_cta_internal_idx" ON "_occupational_health_v" USING btree ("cta_section_secondary_cta_internal_id");
  ALTER TABLE "users" DROP COLUMN "reset_password_requested_at";
  ALTER TABLE "media" DROP COLUMN "_objectkey";`)
}
