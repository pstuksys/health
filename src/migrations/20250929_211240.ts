import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-vercel-postgres'

export async function up({ db, payload, req }: MigrateUpArgs): Promise<void> {
  await db.execute(sql`
   CREATE TYPE "public"."enum_call_to_action_banner_block_cta_primary_link_type" AS ENUM('internal', 'external');
  CREATE TYPE "public"."enum_call_to_action_banner_block_cta_secondary_link_type" AS ENUM('internal', 'external');
  CREATE TYPE "public"."enum__call_to_action_banner_block_v_cta_primary_link_type" AS ENUM('internal', 'external');
  CREATE TYPE "public"."enum__call_to_action_banner_block_v_cta_secondary_link_type" AS ENUM('internal', 'external');
  CREATE TABLE "call_to_action_banner_block" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"cta_image_id" integer,
  	"cta_title" varchar DEFAULT 'Expert Sleep Diagnostics from IPD',
  	"cta_description" jsonb,
  	"cta_primary_label" varchar,
  	"cta_primary_link_type" "enum_call_to_action_banner_block_cta_primary_link_type" DEFAULT 'internal',
  	"cta_primary_external_href" varchar,
  	"cta_secondary_label" varchar,
  	"cta_secondary_link_type" "enum_call_to_action_banner_block_cta_secondary_link_type" DEFAULT 'external',
  	"cta_secondary_external_href" varchar,
  	"footer_rich_text" jsonb,
  	"block_name" varchar
  );
  
  CREATE TABLE "_call_to_action_banner_block_v" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"cta_image_id" integer,
  	"cta_title" varchar DEFAULT 'Expert Sleep Diagnostics from IPD',
  	"cta_description" jsonb,
  	"cta_primary_label" varchar,
  	"cta_primary_link_type" "enum__call_to_action_banner_block_v_cta_primary_link_type" DEFAULT 'internal',
  	"cta_primary_external_href" varchar,
  	"cta_secondary_label" varchar,
  	"cta_secondary_link_type" "enum__call_to_action_banner_block_v_cta_secondary_link_type" DEFAULT 'external',
  	"cta_secondary_external_href" varchar,
  	"footer_rich_text" jsonb,
  	"_uuid" varchar,
  	"block_name" varchar
  );
  
  ALTER TABLE "call_to_action_banner_block" ADD CONSTRAINT "call_to_action_banner_block_cta_image_id_media_id_fk" FOREIGN KEY ("cta_image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "call_to_action_banner_block" ADD CONSTRAINT "call_to_action_banner_block_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_call_to_action_banner_block_v" ADD CONSTRAINT "_call_to_action_banner_block_v_cta_image_id_media_id_fk" FOREIGN KEY ("cta_image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_call_to_action_banner_block_v" ADD CONSTRAINT "_call_to_action_banner_block_v_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v"("id") ON DELETE cascade ON UPDATE no action;
  CREATE INDEX "call_to_action_banner_block_order_idx" ON "call_to_action_banner_block" USING btree ("_order");
  CREATE INDEX "call_to_action_banner_block_parent_id_idx" ON "call_to_action_banner_block" USING btree ("_parent_id");
  CREATE INDEX "call_to_action_banner_block_path_idx" ON "call_to_action_banner_block" USING btree ("_path");
  CREATE INDEX "call_to_action_banner_block_cta_image_idx" ON "call_to_action_banner_block" USING btree ("cta_image_id");
  CREATE INDEX "_call_to_action_banner_block_v_order_idx" ON "_call_to_action_banner_block_v" USING btree ("_order");
  CREATE INDEX "_call_to_action_banner_block_v_parent_id_idx" ON "_call_to_action_banner_block_v" USING btree ("_parent_id");
  CREATE INDEX "_call_to_action_banner_block_v_path_idx" ON "_call_to_action_banner_block_v" USING btree ("_path");
  CREATE INDEX "_call_to_action_banner_block_v_cta_image_idx" ON "_call_to_action_banner_block_v" USING btree ("cta_image_id");`)
}

export async function down({ db, payload, req }: MigrateDownArgs): Promise<void> {
  await db.execute(sql`
   DROP TABLE "call_to_action_banner_block" CASCADE;
  DROP TABLE "_call_to_action_banner_block_v" CASCADE;
  DROP TYPE "public"."enum_call_to_action_banner_block_cta_primary_link_type";
  DROP TYPE "public"."enum_call_to_action_banner_block_cta_secondary_link_type";
  DROP TYPE "public"."enum__call_to_action_banner_block_v_cta_primary_link_type";
  DROP TYPE "public"."enum__call_to_action_banner_block_v_cta_secondary_link_type";`)
}
