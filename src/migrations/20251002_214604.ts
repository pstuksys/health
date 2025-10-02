import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-vercel-postgres'

export async function up({ db, payload, req }: MigrateUpArgs): Promise<void> {
  await db.execute(sql`
   CREATE TYPE "public"."btn2_link_type" AS ENUM('internal', 'external');
  CREATE TYPE "public"."rel_to" AS ENUM('pages', 'blogs');
  CREATE TYPE "public"."enum_grid_cards_cards_link_type" AS ENUM('internal', 'external');
  CREATE TYPE "public"."enum_grid_cards_grid_columns" AS ENUM('2', '3', '4');
  CREATE TYPE "public"."enum_grid_cards_background_color" AS ENUM('white', 'ds-light-neutral', 'blue-50', 'green-50');
  CREATE TYPE "public"."enum__grid_cards_v_cards_link_type" AS ENUM('internal', 'external');
  CREATE TYPE "public"."enum__grid_cards_v_grid_columns" AS ENUM('2', '3', '4');
  CREATE TYPE "public"."enum__grid_cards_v_background_color" AS ENUM('white', 'ds-light-neutral', 'blue-50', 'green-50');
  ALTER TYPE "public"."enum_pages_hero_text_color" ADD VALUE 'green';
  ALTER TYPE "public"."enum_pages_hero_text_color" ADD VALUE 'yellow';
  ALTER TYPE "public"."enum__pages_v_version_hero_text_color" ADD VALUE 'green';
  ALTER TYPE "public"."enum__pages_v_version_hero_text_color" ADD VALUE 'yellow';
  CREATE TABLE "grid_cards_cards" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"title" varchar,
  	"description" varchar,
  	"best_for" varchar,
  	"badge" varchar,
  	"button_text" varchar,
  	"link_type" "enum_grid_cards_cards_link_type" DEFAULT 'internal',
  	"internal_link_id" integer,
  	"external_link" varchar
  );
  
  CREATE TABLE "grid_cards" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"title" varchar DEFAULT 'Our Services',
  	"subtitle" varchar,
  	"grid_columns" "enum_grid_cards_grid_columns" DEFAULT '3',
  	"background_color" "enum_grid_cards_background_color" DEFAULT 'white',
  	"block_name" varchar
  );
  
  CREATE TABLE "_grid_cards_v_cards" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"title" varchar,
  	"description" varchar,
  	"best_for" varchar,
  	"badge" varchar,
  	"button_text" varchar,
  	"link_type" "enum__grid_cards_v_cards_link_type" DEFAULT 'internal',
  	"internal_link_id" integer,
  	"external_link" varchar,
  	"_uuid" varchar
  );
  
  CREATE TABLE "_grid_cards_v" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"title" varchar DEFAULT 'Our Services',
  	"subtitle" varchar,
  	"grid_columns" "enum__grid_cards_v_grid_columns" DEFAULT '3',
  	"background_color" "enum__grid_cards_v_background_color" DEFAULT 'white',
  	"_uuid" varchar,
  	"block_name" varchar
  );
  
  ALTER TABLE "content_block_array_content_blocks" ADD COLUMN "btn2_text" varchar;
  ALTER TABLE "content_block_array_content_blocks" ADD COLUMN "btn2_link_type" "btn2_link_type" DEFAULT 'external';
  ALTER TABLE "content_block_array_content_blocks" ADD COLUMN "btn2_internal_relation_to" "rel_to";
  ALTER TABLE "content_block_array_content_blocks" ADD COLUMN "btn2_internal_value" varchar;
  ALTER TABLE "content_block_array_content_blocks" ADD COLUMN "btn2_external_href" varchar;
  ALTER TABLE "_content_block_array_v_content_blocks" ADD COLUMN "btn2_text" varchar;
  ALTER TABLE "_content_block_array_v_content_blocks" ADD COLUMN "btn2_link_type" "btn2_link_type" DEFAULT 'external';
  ALTER TABLE "_content_block_array_v_content_blocks" ADD COLUMN "btn2_internal_relation_to" "rel_to";
  ALTER TABLE "_content_block_array_v_content_blocks" ADD COLUMN "btn2_internal_value" varchar;
  ALTER TABLE "_content_block_array_v_content_blocks" ADD COLUMN "btn2_external_href" varchar;
  ALTER TABLE "grid_cards_cards" ADD CONSTRAINT "grid_cards_cards_internal_link_id_pages_id_fk" FOREIGN KEY ("internal_link_id") REFERENCES "public"."pages"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "grid_cards_cards" ADD CONSTRAINT "grid_cards_cards_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."grid_cards"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "grid_cards" ADD CONSTRAINT "grid_cards_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_grid_cards_v_cards" ADD CONSTRAINT "_grid_cards_v_cards_internal_link_id_pages_id_fk" FOREIGN KEY ("internal_link_id") REFERENCES "public"."pages"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_grid_cards_v_cards" ADD CONSTRAINT "_grid_cards_v_cards_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_grid_cards_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_grid_cards_v" ADD CONSTRAINT "_grid_cards_v_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v"("id") ON DELETE cascade ON UPDATE no action;
  CREATE INDEX "grid_cards_cards_order_idx" ON "grid_cards_cards" USING btree ("_order");
  CREATE INDEX "grid_cards_cards_parent_id_idx" ON "grid_cards_cards" USING btree ("_parent_id");
  CREATE INDEX "grid_cards_cards_internal_link_idx" ON "grid_cards_cards" USING btree ("internal_link_id");
  CREATE INDEX "grid_cards_order_idx" ON "grid_cards" USING btree ("_order");
  CREATE INDEX "grid_cards_parent_id_idx" ON "grid_cards" USING btree ("_parent_id");
  CREATE INDEX "grid_cards_path_idx" ON "grid_cards" USING btree ("_path");
  CREATE INDEX "_grid_cards_v_cards_order_idx" ON "_grid_cards_v_cards" USING btree ("_order");
  CREATE INDEX "_grid_cards_v_cards_parent_id_idx" ON "_grid_cards_v_cards" USING btree ("_parent_id");
  CREATE INDEX "_grid_cards_v_cards_internal_link_idx" ON "_grid_cards_v_cards" USING btree ("internal_link_id");
  CREATE INDEX "_grid_cards_v_order_idx" ON "_grid_cards_v" USING btree ("_order");
  CREATE INDEX "_grid_cards_v_parent_id_idx" ON "_grid_cards_v" USING btree ("_parent_id");
  CREATE INDEX "_grid_cards_v_path_idx" ON "_grid_cards_v" USING btree ("_path");`)
}

export async function down({ db, payload, req }: MigrateDownArgs): Promise<void> {
  await db.execute(sql`
   DROP TABLE "grid_cards_cards" CASCADE;
  DROP TABLE "grid_cards" CASCADE;
  DROP TABLE "_grid_cards_v_cards" CASCADE;
  DROP TABLE "_grid_cards_v" CASCADE;
  ALTER TABLE "pages" ALTER COLUMN "hero_text_color" SET DATA TYPE text;
  ALTER TABLE "pages" ALTER COLUMN "hero_text_color" SET DEFAULT 'auto'::text;
  DROP TYPE "public"."enum_pages_hero_text_color";
  CREATE TYPE "public"."enum_pages_hero_text_color" AS ENUM('auto', 'light', 'dark');
  ALTER TABLE "pages" ALTER COLUMN "hero_text_color" SET DEFAULT 'auto'::"public"."enum_pages_hero_text_color";
  ALTER TABLE "pages" ALTER COLUMN "hero_text_color" SET DATA TYPE "public"."enum_pages_hero_text_color" USING "hero_text_color"::"public"."enum_pages_hero_text_color";
  ALTER TABLE "_pages_v" ALTER COLUMN "version_hero_text_color" SET DATA TYPE text;
  ALTER TABLE "_pages_v" ALTER COLUMN "version_hero_text_color" SET DEFAULT 'auto'::text;
  DROP TYPE "public"."enum__pages_v_version_hero_text_color";
  CREATE TYPE "public"."enum__pages_v_version_hero_text_color" AS ENUM('auto', 'light', 'dark');
  ALTER TABLE "_pages_v" ALTER COLUMN "version_hero_text_color" SET DEFAULT 'auto'::"public"."enum__pages_v_version_hero_text_color";
  ALTER TABLE "_pages_v" ALTER COLUMN "version_hero_text_color" SET DATA TYPE "public"."enum__pages_v_version_hero_text_color" USING "version_hero_text_color"::"public"."enum__pages_v_version_hero_text_color";
  ALTER TABLE "content_block_array_content_blocks" DROP COLUMN "btn2_text";
  ALTER TABLE "content_block_array_content_blocks" DROP COLUMN "btn2_link_type";
  ALTER TABLE "content_block_array_content_blocks" DROP COLUMN "btn2_internal_relation_to";
  ALTER TABLE "content_block_array_content_blocks" DROP COLUMN "btn2_internal_value";
  ALTER TABLE "content_block_array_content_blocks" DROP COLUMN "btn2_external_href";
  ALTER TABLE "_content_block_array_v_content_blocks" DROP COLUMN "btn2_text";
  ALTER TABLE "_content_block_array_v_content_blocks" DROP COLUMN "btn2_link_type";
  ALTER TABLE "_content_block_array_v_content_blocks" DROP COLUMN "btn2_internal_relation_to";
  ALTER TABLE "_content_block_array_v_content_blocks" DROP COLUMN "btn2_internal_value";
  ALTER TABLE "_content_block_array_v_content_blocks" DROP COLUMN "btn2_external_href";
  DROP TYPE "public"."btn2_link_type";
  DROP TYPE "public"."rel_to";
  DROP TYPE "public"."enum_grid_cards_cards_link_type";
  DROP TYPE "public"."enum_grid_cards_grid_columns";
  DROP TYPE "public"."enum_grid_cards_background_color";
  DROP TYPE "public"."enum__grid_cards_v_cards_link_type";
  DROP TYPE "public"."enum__grid_cards_v_grid_columns";
  DROP TYPE "public"."enum__grid_cards_v_background_color";`)
}
