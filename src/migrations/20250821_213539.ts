import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-vercel-postgres'

export async function up({ db, payload, req }: MigrateUpArgs): Promise<void> {
  await db.execute(sql`
   CREATE TYPE "public"."enum_pages_blocks_single_card_image_position" AS ENUM('left', 'right');
  CREATE TYPE "public"."enum_pages_blocks_single_card_link_type" AS ENUM('internal', 'external');
  CREATE TYPE "public"."enum_pages_blocks_single_card_cta_variant" AS ENUM('primary', 'secondary', 'outline', 'ghost');
  CREATE TYPE "public"."enum_pages_hero_text_color" AS ENUM('auto', 'light', 'dark');
  CREATE TYPE "public"."enum_pages_hero_c_t_a_button_link_type" AS ENUM('internal', 'external');
  CREATE TYPE "public"."enum_pages_hero_c_t_a_button_variant" AS ENUM('primary', 'secondary');
  CREATE TYPE "public"."enum_pages_hero_secondary_c_t_a_link_type" AS ENUM('internal', 'external');
  CREATE TYPE "public"."enum__pages_v_blocks_single_card_image_position" AS ENUM('left', 'right');
  CREATE TYPE "public"."enum__pages_v_blocks_single_card_link_type" AS ENUM('internal', 'external');
  CREATE TYPE "public"."enum__pages_v_blocks_single_card_cta_variant" AS ENUM('primary', 'secondary', 'outline', 'ghost');
  CREATE TYPE "public"."enum__pages_v_version_hero_text_color" AS ENUM('auto', 'light', 'dark');
  CREATE TYPE "public"."enum__pages_v_version_hero_c_t_a_button_link_type" AS ENUM('internal', 'external');
  CREATE TYPE "public"."enum__pages_v_version_hero_c_t_a_button_variant" AS ENUM('primary', 'secondary');
  CREATE TYPE "public"."enum__pages_v_version_hero_secondary_c_t_a_link_type" AS ENUM('internal', 'external');
  CREATE TYPE "public"."enum_header_cta_button_link_type" AS ENUM('internal', 'external');
  CREATE TABLE "pages_blocks_single_card" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"title" varchar,
  	"subtitle" varchar,
  	"image_id" integer,
  	"enable_background" boolean DEFAULT false,
  	"image_position" "enum_pages_blocks_single_card_image_position" DEFAULT 'left',
  	"link_type" "enum_pages_blocks_single_card_link_type" DEFAULT 'internal',
  	"external_href" varchar,
  	"cta_text" varchar,
  	"cta_variant" "enum_pages_blocks_single_card_cta_variant",
  	"block_name" varchar
  );
  
  CREATE TABLE "_pages_v_blocks_single_card" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"title" varchar,
  	"subtitle" varchar,
  	"image_id" integer,
  	"enable_background" boolean DEFAULT false,
  	"image_position" "enum__pages_v_blocks_single_card_image_position" DEFAULT 'left',
  	"link_type" "enum__pages_v_blocks_single_card_link_type" DEFAULT 'internal',
  	"external_href" varchar,
  	"cta_text" varchar,
  	"cta_variant" "enum__pages_v_blocks_single_card_cta_variant",
  	"_uuid" varchar,
  	"block_name" varchar
  );
  
  ALTER TABLE "pages_blocks_partners_block" ADD COLUMN "title" varchar;
  ALTER TABLE "pages" ADD COLUMN "hero_text_color" "enum_pages_hero_text_color" DEFAULT 'auto';
  ALTER TABLE "pages" ADD COLUMN "hero_gradient_overlay" boolean DEFAULT false;
  ALTER TABLE "pages" ADD COLUMN "hero_c_t_a_button_label" varchar;
  ALTER TABLE "pages" ADD COLUMN "hero_c_t_a_button_link_type" "enum_pages_hero_c_t_a_button_link_type" DEFAULT 'internal';
  ALTER TABLE "pages" ADD COLUMN "hero_c_t_a_button_external_href" varchar;
  ALTER TABLE "pages" ADD COLUMN "hero_c_t_a_button_variant" "enum_pages_hero_c_t_a_button_variant" DEFAULT 'primary';
  ALTER TABLE "pages" ADD COLUMN "hero_secondary_c_t_a_label" varchar;
  ALTER TABLE "pages" ADD COLUMN "hero_secondary_c_t_a_link_type" "enum_pages_hero_secondary_c_t_a_link_type" DEFAULT 'internal';
  ALTER TABLE "pages" ADD COLUMN "hero_secondary_c_t_a_external_href" varchar;
  ALTER TABLE "_pages_v_blocks_partners_block" ADD COLUMN "title" varchar;
  ALTER TABLE "_pages_v" ADD COLUMN "version_hero_text_color" "enum__pages_v_version_hero_text_color" DEFAULT 'auto';
  ALTER TABLE "_pages_v" ADD COLUMN "version_hero_gradient_overlay" boolean DEFAULT false;
  ALTER TABLE "_pages_v" ADD COLUMN "version_hero_c_t_a_button_label" varchar;
  ALTER TABLE "_pages_v" ADD COLUMN "version_hero_c_t_a_button_link_type" "enum__pages_v_version_hero_c_t_a_button_link_type" DEFAULT 'internal';
  ALTER TABLE "_pages_v" ADD COLUMN "version_hero_c_t_a_button_external_href" varchar;
  ALTER TABLE "_pages_v" ADD COLUMN "version_hero_c_t_a_button_variant" "enum__pages_v_version_hero_c_t_a_button_variant" DEFAULT 'primary';
  ALTER TABLE "_pages_v" ADD COLUMN "version_hero_secondary_c_t_a_label" varchar;
  ALTER TABLE "_pages_v" ADD COLUMN "version_hero_secondary_c_t_a_link_type" "enum__pages_v_version_hero_secondary_c_t_a_link_type" DEFAULT 'internal';
  ALTER TABLE "_pages_v" ADD COLUMN "version_hero_secondary_c_t_a_external_href" varchar;
  ALTER TABLE "header" ADD COLUMN "cta_button_link_type" "enum_header_cta_button_link_type" DEFAULT 'internal';
  ALTER TABLE "pages_blocks_single_card" ADD CONSTRAINT "pages_blocks_single_card_image_id_media_id_fk" FOREIGN KEY ("image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "pages_blocks_single_card" ADD CONSTRAINT "pages_blocks_single_card_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_single_card" ADD CONSTRAINT "_pages_v_blocks_single_card_image_id_media_id_fk" FOREIGN KEY ("image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_single_card" ADD CONSTRAINT "_pages_v_blocks_single_card_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v"("id") ON DELETE cascade ON UPDATE no action;
  CREATE INDEX "pages_blocks_single_card_order_idx" ON "pages_blocks_single_card" USING btree ("_order");
  CREATE INDEX "pages_blocks_single_card_parent_id_idx" ON "pages_blocks_single_card" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_single_card_path_idx" ON "pages_blocks_single_card" USING btree ("_path");
  CREATE INDEX "pages_blocks_single_card_image_idx" ON "pages_blocks_single_card" USING btree ("image_id");
  CREATE INDEX "_pages_v_blocks_single_card_order_idx" ON "_pages_v_blocks_single_card" USING btree ("_order");
  CREATE INDEX "_pages_v_blocks_single_card_parent_id_idx" ON "_pages_v_blocks_single_card" USING btree ("_parent_id");
  CREATE INDEX "_pages_v_blocks_single_card_path_idx" ON "_pages_v_blocks_single_card" USING btree ("_path");
  CREATE INDEX "_pages_v_blocks_single_card_image_idx" ON "_pages_v_blocks_single_card" USING btree ("image_id");
  ALTER TABLE "pages_blocks_partners_block_partners" DROP COLUMN "name";
  ALTER TABLE "pages_blocks_partners_block_partners" DROP COLUMN "href";
  ALTER TABLE "_pages_v_blocks_partners_block_partners" DROP COLUMN "name";
  ALTER TABLE "_pages_v_blocks_partners_block_partners" DROP COLUMN "href";`)
}

export async function down({ db, payload, req }: MigrateDownArgs): Promise<void> {
  await db.execute(sql`
   DROP TABLE "pages_blocks_single_card" CASCADE;
  DROP TABLE "_pages_v_blocks_single_card" CASCADE;
  ALTER TABLE "pages_blocks_partners_block_partners" ADD COLUMN "name" varchar;
  ALTER TABLE "pages_blocks_partners_block_partners" ADD COLUMN "href" varchar;
  ALTER TABLE "_pages_v_blocks_partners_block_partners" ADD COLUMN "name" varchar;
  ALTER TABLE "_pages_v_blocks_partners_block_partners" ADD COLUMN "href" varchar;
  ALTER TABLE "pages_blocks_partners_block" DROP COLUMN "title";
  ALTER TABLE "pages" DROP COLUMN "hero_text_color";
  ALTER TABLE "pages" DROP COLUMN "hero_gradient_overlay";
  ALTER TABLE "pages" DROP COLUMN "hero_c_t_a_button_label";
  ALTER TABLE "pages" DROP COLUMN "hero_c_t_a_button_link_type";
  ALTER TABLE "pages" DROP COLUMN "hero_c_t_a_button_external_href";
  ALTER TABLE "pages" DROP COLUMN "hero_c_t_a_button_variant";
  ALTER TABLE "pages" DROP COLUMN "hero_secondary_c_t_a_label";
  ALTER TABLE "pages" DROP COLUMN "hero_secondary_c_t_a_link_type";
  ALTER TABLE "pages" DROP COLUMN "hero_secondary_c_t_a_external_href";
  ALTER TABLE "_pages_v_blocks_partners_block" DROP COLUMN "title";
  ALTER TABLE "_pages_v" DROP COLUMN "version_hero_text_color";
  ALTER TABLE "_pages_v" DROP COLUMN "version_hero_gradient_overlay";
  ALTER TABLE "_pages_v" DROP COLUMN "version_hero_c_t_a_button_label";
  ALTER TABLE "_pages_v" DROP COLUMN "version_hero_c_t_a_button_link_type";
  ALTER TABLE "_pages_v" DROP COLUMN "version_hero_c_t_a_button_external_href";
  ALTER TABLE "_pages_v" DROP COLUMN "version_hero_c_t_a_button_variant";
  ALTER TABLE "_pages_v" DROP COLUMN "version_hero_secondary_c_t_a_label";
  ALTER TABLE "_pages_v" DROP COLUMN "version_hero_secondary_c_t_a_link_type";
  ALTER TABLE "_pages_v" DROP COLUMN "version_hero_secondary_c_t_a_external_href";
  ALTER TABLE "header" DROP COLUMN "cta_button_link_type";
  DROP TYPE "public"."enum_pages_blocks_single_card_image_position";
  DROP TYPE "public"."enum_pages_blocks_single_card_link_type";
  DROP TYPE "public"."enum_pages_blocks_single_card_cta_variant";
  DROP TYPE "public"."enum_pages_hero_text_color";
  DROP TYPE "public"."enum_pages_hero_c_t_a_button_link_type";
  DROP TYPE "public"."enum_pages_hero_c_t_a_button_variant";
  DROP TYPE "public"."enum_pages_hero_secondary_c_t_a_link_type";
  DROP TYPE "public"."enum__pages_v_blocks_single_card_image_position";
  DROP TYPE "public"."enum__pages_v_blocks_single_card_link_type";
  DROP TYPE "public"."enum__pages_v_blocks_single_card_cta_variant";
  DROP TYPE "public"."enum__pages_v_version_hero_text_color";
  DROP TYPE "public"."enum__pages_v_version_hero_c_t_a_button_link_type";
  DROP TYPE "public"."enum__pages_v_version_hero_c_t_a_button_variant";
  DROP TYPE "public"."enum__pages_v_version_hero_secondary_c_t_a_link_type";
  DROP TYPE "public"."enum_header_cta_button_link_type";`)
}
