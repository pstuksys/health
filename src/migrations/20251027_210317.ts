import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-vercel-postgres'

export async function up({ db, payload, req }: MigrateUpArgs): Promise<void> {
  await db.execute(sql`
   CREATE TYPE "public"."enum_cpap_block_service_cards_cta_button_link_type" AS ENUM('internal', 'external');
  CREATE TYPE "public"."enum__cpap_block_v_service_cards_cta_button_link_type" AS ENUM('internal', 'external');
  ALTER TABLE "cpap_block_service_cards" ADD COLUMN "cta_button_text" varchar;
  ALTER TABLE "cpap_block_service_cards" ADD COLUMN "cta_button_link_type" "enum_cpap_block_service_cards_cta_button_link_type" DEFAULT 'internal';
  ALTER TABLE "cpap_block_service_cards" ADD COLUMN "cta_button_internal_id" integer;
  ALTER TABLE "cpap_block_service_cards" ADD COLUMN "cta_button_external" varchar;
  ALTER TABLE "cpap_block_service_cards" ADD COLUMN "cta_button_open_in_new_tab" boolean DEFAULT false;
  ALTER TABLE "_cpap_block_v_service_cards" ADD COLUMN "cta_button_text" varchar;
  ALTER TABLE "_cpap_block_v_service_cards" ADD COLUMN "cta_button_link_type" "enum__cpap_block_v_service_cards_cta_button_link_type" DEFAULT 'internal';
  ALTER TABLE "_cpap_block_v_service_cards" ADD COLUMN "cta_button_internal_id" integer;
  ALTER TABLE "_cpap_block_v_service_cards" ADD COLUMN "cta_button_external" varchar;
  ALTER TABLE "_cpap_block_v_service_cards" ADD COLUMN "cta_button_open_in_new_tab" boolean DEFAULT false;
  ALTER TABLE "cpap_block_service_cards" ADD CONSTRAINT "cpap_block_service_cards_cta_button_internal_id_pages_id_fk" FOREIGN KEY ("cta_button_internal_id") REFERENCES "public"."pages"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_cpap_block_v_service_cards" ADD CONSTRAINT "_cpap_block_v_service_cards_cta_button_internal_id_pages_id_fk" FOREIGN KEY ("cta_button_internal_id") REFERENCES "public"."pages"("id") ON DELETE set null ON UPDATE no action;
  CREATE INDEX "cpap_block_service_cards_cta_button_internal_idx" ON "cpap_block_service_cards" USING btree ("cta_button_internal_id");
  CREATE INDEX "_cpap_block_v_service_cards_cta_button_internal_idx" ON "_cpap_block_v_service_cards" USING btree ("cta_button_internal_id");`)
}

export async function down({ db, payload, req }: MigrateDownArgs): Promise<void> {
  await db.execute(sql`
   ALTER TABLE "cpap_block_service_cards" DROP CONSTRAINT "cpap_block_service_cards_cta_button_internal_id_pages_id_fk";
  
  ALTER TABLE "_cpap_block_v_service_cards" DROP CONSTRAINT "_cpap_block_v_service_cards_cta_button_internal_id_pages_id_fk";
  
  DROP INDEX "cpap_block_service_cards_cta_button_internal_idx";
  DROP INDEX "_cpap_block_v_service_cards_cta_button_internal_idx";
  ALTER TABLE "cpap_block_service_cards" DROP COLUMN "cta_button_text";
  ALTER TABLE "cpap_block_service_cards" DROP COLUMN "cta_button_link_type";
  ALTER TABLE "cpap_block_service_cards" DROP COLUMN "cta_button_internal_id";
  ALTER TABLE "cpap_block_service_cards" DROP COLUMN "cta_button_external";
  ALTER TABLE "cpap_block_service_cards" DROP COLUMN "cta_button_open_in_new_tab";
  ALTER TABLE "_cpap_block_v_service_cards" DROP COLUMN "cta_button_text";
  ALTER TABLE "_cpap_block_v_service_cards" DROP COLUMN "cta_button_link_type";
  ALTER TABLE "_cpap_block_v_service_cards" DROP COLUMN "cta_button_internal_id";
  ALTER TABLE "_cpap_block_v_service_cards" DROP COLUMN "cta_button_external";
  ALTER TABLE "_cpap_block_v_service_cards" DROP COLUMN "cta_button_open_in_new_tab";
  DROP TYPE "public"."enum_cpap_block_service_cards_cta_button_link_type";
  DROP TYPE "public"."enum__cpap_block_v_service_cards_cta_button_link_type";`)
}
