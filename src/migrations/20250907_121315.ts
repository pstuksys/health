import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-vercel-postgres'

export async function up({ db, payload, req }: MigrateUpArgs): Promise<void> {
  await db.execute(sql`
   CREATE TYPE "public"."enum_pages_blocks_full_width_banner_carousel_items_link_type" AS ENUM('internal', 'external');
  CREATE TYPE "public"."enum_content_block_array_content_blocks_image_position" AS ENUM('left', 'right');
  CREATE TYPE "public"."enum_content_block_array_content_blocks_link_type" AS ENUM('internal', 'external');
  CREATE TYPE "public"."enum_content_block_array_content_blocks_internal_relation_to" AS ENUM('pages', 'blogs');
  CREATE TYPE "public"."enum_content_block_array_layout" AS ENUM('default', 'alternating');
  CREATE TYPE "public"."enum__pages_v_blocks_full_width_banner_carousel_items_link_type" AS ENUM('internal', 'external');
  CREATE TYPE "public"."enum__content_block_array_v_content_blocks_image_position" AS ENUM('left', 'right');
  CREATE TYPE "public"."enum__content_block_array_v_content_blocks_link_type" AS ENUM('internal', 'external');
  CREATE TYPE "public"."enum__content_block_array_v_content_blocks_internal_relation_to" AS ENUM('pages', 'blogs');
  CREATE TYPE "public"."enum__content_block_array_v_layout" AS ENUM('default', 'alternating');
  CREATE TABLE "pages_blocks_full_width_banner_carousel_items" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"title" varchar,
  	"subtitle" varchar,
  	"button_text" varchar,
  	"link_type" "enum_pages_blocks_full_width_banner_carousel_items_link_type" DEFAULT 'internal',
  	"external_href" varchar,
  	"open_in_new_tab" boolean DEFAULT false
  );
  
  CREATE TABLE "content_block_array_content_blocks" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"title" varchar,
  	"description" varchar,
  	"image_id" integer,
  	"image_position" "enum_content_block_array_content_blocks_image_position" DEFAULT 'right',
  	"button_text" varchar,
  	"link_type" "enum_content_block_array_content_blocks_link_type" DEFAULT 'external',
  	"internal_relation_to" "enum_content_block_array_content_blocks_internal_relation_to",
  	"internal_value" varchar,
  	"external_href" varchar
  );
  
  CREATE TABLE "content_block_array" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"title" varchar,
  	"layout" "enum_content_block_array_layout" DEFAULT 'default',
  	"block_name" varchar
  );
  
  CREATE TABLE "_pages_v_blocks_full_width_banner_carousel_items" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"title" varchar,
  	"subtitle" varchar,
  	"button_text" varchar,
  	"link_type" "enum__pages_v_blocks_full_width_banner_carousel_items_link_type" DEFAULT 'internal',
  	"external_href" varchar,
  	"open_in_new_tab" boolean DEFAULT false,
  	"_uuid" varchar
  );
  
  CREATE TABLE "_content_block_array_v_content_blocks" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"title" varchar,
  	"description" varchar,
  	"image_id" integer,
  	"image_position" "enum__content_block_array_v_content_blocks_image_position" DEFAULT 'right',
  	"button_text" varchar,
  	"link_type" "enum__content_block_array_v_content_blocks_link_type" DEFAULT 'external',
  	"internal_relation_to" "enum__content_block_array_v_content_blocks_internal_relation_to",
  	"internal_value" varchar,
  	"external_href" varchar,
  	"_uuid" varchar
  );
  
  CREATE TABLE "_content_block_array_v" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"title" varchar,
  	"layout" "enum__content_block_array_v_layout" DEFAULT 'default',
  	"_uuid" varchar,
  	"block_name" varchar
  );
  
  ALTER TABLE "pages_blocks_full_width_banner" ADD COLUMN "enable_carousel" boolean DEFAULT false;
  ALTER TABLE "pages_blocks_full_width_banner" ADD COLUMN "enable_quotes" boolean DEFAULT false;
  ALTER TABLE "_pages_v_blocks_full_width_banner" ADD COLUMN "enable_carousel" boolean DEFAULT false;
  ALTER TABLE "_pages_v_blocks_full_width_banner" ADD COLUMN "enable_quotes" boolean DEFAULT false;
  ALTER TABLE "pages_blocks_full_width_banner_carousel_items" ADD CONSTRAINT "pages_blocks_full_width_banner_carousel_items_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages_blocks_full_width_banner"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "content_block_array_content_blocks" ADD CONSTRAINT "content_block_array_content_blocks_image_id_media_id_fk" FOREIGN KEY ("image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "content_block_array_content_blocks" ADD CONSTRAINT "content_block_array_content_blocks_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."content_block_array"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "content_block_array" ADD CONSTRAINT "content_block_array_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_full_width_banner_carousel_items" ADD CONSTRAINT "_pages_v_blocks_full_width_banner_carousel_items_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v_blocks_full_width_banner"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_content_block_array_v_content_blocks" ADD CONSTRAINT "_content_block_array_v_content_blocks_image_id_media_id_fk" FOREIGN KEY ("image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_content_block_array_v_content_blocks" ADD CONSTRAINT "_content_block_array_v_content_blocks_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_content_block_array_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_content_block_array_v" ADD CONSTRAINT "_content_block_array_v_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v"("id") ON DELETE cascade ON UPDATE no action;
  CREATE INDEX "pages_blocks_full_width_banner_carousel_items_order_idx" ON "pages_blocks_full_width_banner_carousel_items" USING btree ("_order");
  CREATE INDEX "pages_blocks_full_width_banner_carousel_items_parent_id_idx" ON "pages_blocks_full_width_banner_carousel_items" USING btree ("_parent_id");
  CREATE INDEX "content_block_array_content_blocks_order_idx" ON "content_block_array_content_blocks" USING btree ("_order");
  CREATE INDEX "content_block_array_content_blocks_parent_id_idx" ON "content_block_array_content_blocks" USING btree ("_parent_id");
  CREATE INDEX "content_block_array_content_blocks_image_idx" ON "content_block_array_content_blocks" USING btree ("image_id");
  CREATE INDEX "content_block_array_order_idx" ON "content_block_array" USING btree ("_order");
  CREATE INDEX "content_block_array_parent_id_idx" ON "content_block_array" USING btree ("_parent_id");
  CREATE INDEX "content_block_array_path_idx" ON "content_block_array" USING btree ("_path");
  CREATE INDEX "_pages_v_blocks_full_width_banner_carousel_items_order_idx" ON "_pages_v_blocks_full_width_banner_carousel_items" USING btree ("_order");
  CREATE INDEX "_pages_v_blocks_full_width_banner_carousel_items_parent_id_idx" ON "_pages_v_blocks_full_width_banner_carousel_items" USING btree ("_parent_id");
  CREATE INDEX "_content_block_array_v_content_blocks_order_idx" ON "_content_block_array_v_content_blocks" USING btree ("_order");
  CREATE INDEX "_content_block_array_v_content_blocks_parent_id_idx" ON "_content_block_array_v_content_blocks" USING btree ("_parent_id");
  CREATE INDEX "_content_block_array_v_content_blocks_image_idx" ON "_content_block_array_v_content_blocks" USING btree ("image_id");
  CREATE INDEX "_content_block_array_v_order_idx" ON "_content_block_array_v" USING btree ("_order");
  CREATE INDEX "_content_block_array_v_parent_id_idx" ON "_content_block_array_v" USING btree ("_parent_id");
  CREATE INDEX "_content_block_array_v_path_idx" ON "_content_block_array_v" USING btree ("_path");`)
}

export async function down({ db, payload, req }: MigrateDownArgs): Promise<void> {
  await db.execute(sql`
   DROP TABLE "pages_blocks_full_width_banner_carousel_items" CASCADE;
  DROP TABLE "content_block_array_content_blocks" CASCADE;
  DROP TABLE "content_block_array" CASCADE;
  DROP TABLE "_pages_v_blocks_full_width_banner_carousel_items" CASCADE;
  DROP TABLE "_content_block_array_v_content_blocks" CASCADE;
  DROP TABLE "_content_block_array_v" CASCADE;
  ALTER TABLE "pages_blocks_full_width_banner" DROP COLUMN "enable_carousel";
  ALTER TABLE "pages_blocks_full_width_banner" DROP COLUMN "enable_quotes";
  ALTER TABLE "_pages_v_blocks_full_width_banner" DROP COLUMN "enable_carousel";
  ALTER TABLE "_pages_v_blocks_full_width_banner" DROP COLUMN "enable_quotes";
  DROP TYPE "public"."enum_pages_blocks_full_width_banner_carousel_items_link_type";
  DROP TYPE "public"."enum_content_block_array_content_blocks_image_position";
  DROP TYPE "public"."enum_content_block_array_content_blocks_link_type";
  DROP TYPE "public"."enum_content_block_array_content_blocks_internal_relation_to";
  DROP TYPE "public"."enum_content_block_array_layout";
  DROP TYPE "public"."enum__pages_v_blocks_full_width_banner_carousel_items_link_type";
  DROP TYPE "public"."enum__content_block_array_v_content_blocks_image_position";
  DROP TYPE "public"."enum__content_block_array_v_content_blocks_link_type";
  DROP TYPE "public"."enum__content_block_array_v_content_blocks_internal_relation_to";
  DROP TYPE "public"."enum__content_block_array_v_layout";`)
}
