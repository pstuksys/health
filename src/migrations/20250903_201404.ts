import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-vercel-postgres'

export async function up({ db, payload, req }: MigrateUpArgs): Promise<void> {
  await db.execute(sql`
   CREATE TYPE "public"."enum_services_banner_options_icon" AS ENUM('calendar', 'settings', 'shield');
  CREATE TYPE "public"."enum_services_banner_options_link_link_type" AS ENUM('internal', 'external');
  CREATE TYPE "public"."enum_services_banner_background_color" AS ENUM('slate-800', 'ds-dark-blue', 'ds-pastille-green', 'gray-900', 'blue-900');
  CREATE TYPE "public"."enum_services_banner_text_color" AS ENUM('white', 'gray-100', 'ds-dark-blue');
  CREATE TYPE "public"."enum_medical_services_services_icon" AS ENUM('scan', 'activity', 'zap', 'heart', 'stethoscope', 'check', 'calendar', 'settings', 'shield');
  CREATE TYPE "public"."enum_medical_services_background_color" AS ENUM('gray-50', 'white', 'blue-50', 'green-50');
  CREATE TYPE "public"."enum__services_banner_v_options_icon" AS ENUM('calendar', 'settings', 'shield');
  CREATE TYPE "public"."enum__services_banner_v_options_link_link_type" AS ENUM('internal', 'external');
  CREATE TYPE "public"."enum__services_banner_v_background_color" AS ENUM('slate-800', 'ds-dark-blue', 'ds-pastille-green', 'gray-900', 'blue-900');
  CREATE TYPE "public"."enum__services_banner_v_text_color" AS ENUM('white', 'gray-100', 'ds-dark-blue');
  CREATE TYPE "public"."enum__medical_services_v_services_icon" AS ENUM('scan', 'activity', 'zap', 'heart', 'stethoscope', 'check', 'calendar', 'settings', 'shield');
  CREATE TYPE "public"."enum__medical_services_v_background_color" AS ENUM('gray-50', 'white', 'blue-50', 'green-50');
  CREATE TABLE "services_banner_options" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"icon" "enum_services_banner_options_icon" DEFAULT 'calendar',
  	"title" varchar,
  	"description" varchar,
  	"button_text" varchar DEFAULT 'LEARN MORE',
  	"link_link_type" "enum_services_banner_options_link_link_type" DEFAULT 'internal',
  	"link_external_href" varchar
  );
  
  CREATE TABLE "services_banner" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"title" varchar,
  	"subtitle" varchar,
  	"background_image_id" integer,
  	"background_color" "enum_services_banner_background_color" DEFAULT 'slate-800',
  	"text_color" "enum_services_banner_text_color" DEFAULT 'white',
  	"block_name" varchar
  );
  
  CREATE TABLE "medical_services_services" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"icon" "enum_medical_services_services_icon" DEFAULT 'scan',
  	"name" varchar,
  	"available" boolean DEFAULT true
  );
  
  CREATE TABLE "medical_services" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"title" varchar,
  	"subtitle" varchar,
  	"background_color" "enum_medical_services_background_color" DEFAULT 'gray-50',
  	"block_name" varchar
  );
  
  CREATE TABLE "_services_banner_v_options" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"icon" "enum__services_banner_v_options_icon" DEFAULT 'calendar',
  	"title" varchar,
  	"description" varchar,
  	"button_text" varchar DEFAULT 'LEARN MORE',
  	"link_link_type" "enum__services_banner_v_options_link_link_type" DEFAULT 'internal',
  	"link_external_href" varchar,
  	"_uuid" varchar
  );
  
  CREATE TABLE "_services_banner_v" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"title" varchar,
  	"subtitle" varchar,
  	"background_image_id" integer,
  	"background_color" "enum__services_banner_v_background_color" DEFAULT 'slate-800',
  	"text_color" "enum__services_banner_v_text_color" DEFAULT 'white',
  	"_uuid" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "_medical_services_v_services" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"icon" "enum__medical_services_v_services_icon" DEFAULT 'scan',
  	"name" varchar,
  	"available" boolean DEFAULT true,
  	"_uuid" varchar
  );
  
  CREATE TABLE "_medical_services_v" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"title" varchar,
  	"subtitle" varchar,
  	"background_color" "enum__medical_services_v_background_color" DEFAULT 'gray-50',
  	"_uuid" varchar,
  	"block_name" varchar
  );
  
  ALTER TABLE "pages_blocks_scroll_post_cards" ADD COLUMN "disable_observer" boolean DEFAULT false;
  ALTER TABLE "pages_blocks_scroll_post_cards" ADD COLUMN "clickable_card" boolean DEFAULT false;
  ALTER TABLE "_pages_v_blocks_scroll_post_cards" ADD COLUMN "disable_observer" boolean DEFAULT false;
  ALTER TABLE "_pages_v_blocks_scroll_post_cards" ADD COLUMN "clickable_card" boolean DEFAULT false;
  ALTER TABLE "services_banner_options" ADD CONSTRAINT "services_banner_options_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."services_banner"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "services_banner" ADD CONSTRAINT "services_banner_background_image_id_media_id_fk" FOREIGN KEY ("background_image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "services_banner" ADD CONSTRAINT "services_banner_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "medical_services_services" ADD CONSTRAINT "medical_services_services_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."medical_services"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "medical_services" ADD CONSTRAINT "medical_services_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_services_banner_v_options" ADD CONSTRAINT "_services_banner_v_options_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_services_banner_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_services_banner_v" ADD CONSTRAINT "_services_banner_v_background_image_id_media_id_fk" FOREIGN KEY ("background_image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_services_banner_v" ADD CONSTRAINT "_services_banner_v_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_medical_services_v_services" ADD CONSTRAINT "_medical_services_v_services_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_medical_services_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_medical_services_v" ADD CONSTRAINT "_medical_services_v_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v"("id") ON DELETE cascade ON UPDATE no action;
  CREATE INDEX "services_banner_options_order_idx" ON "services_banner_options" USING btree ("_order");
  CREATE INDEX "services_banner_options_parent_id_idx" ON "services_banner_options" USING btree ("_parent_id");
  CREATE INDEX "services_banner_order_idx" ON "services_banner" USING btree ("_order");
  CREATE INDEX "services_banner_parent_id_idx" ON "services_banner" USING btree ("_parent_id");
  CREATE INDEX "services_banner_path_idx" ON "services_banner" USING btree ("_path");
  CREATE INDEX "services_banner_background_image_idx" ON "services_banner" USING btree ("background_image_id");
  CREATE INDEX "medical_services_services_order_idx" ON "medical_services_services" USING btree ("_order");
  CREATE INDEX "medical_services_services_parent_id_idx" ON "medical_services_services" USING btree ("_parent_id");
  CREATE INDEX "medical_services_order_idx" ON "medical_services" USING btree ("_order");
  CREATE INDEX "medical_services_parent_id_idx" ON "medical_services" USING btree ("_parent_id");
  CREATE INDEX "medical_services_path_idx" ON "medical_services" USING btree ("_path");
  CREATE INDEX "_services_banner_v_options_order_idx" ON "_services_banner_v_options" USING btree ("_order");
  CREATE INDEX "_services_banner_v_options_parent_id_idx" ON "_services_banner_v_options" USING btree ("_parent_id");
  CREATE INDEX "_services_banner_v_order_idx" ON "_services_banner_v" USING btree ("_order");
  CREATE INDEX "_services_banner_v_parent_id_idx" ON "_services_banner_v" USING btree ("_parent_id");
  CREATE INDEX "_services_banner_v_path_idx" ON "_services_banner_v" USING btree ("_path");
  CREATE INDEX "_services_banner_v_background_image_idx" ON "_services_banner_v" USING btree ("background_image_id");
  CREATE INDEX "_medical_services_v_services_order_idx" ON "_medical_services_v_services" USING btree ("_order");
  CREATE INDEX "_medical_services_v_services_parent_id_idx" ON "_medical_services_v_services" USING btree ("_parent_id");
  CREATE INDEX "_medical_services_v_order_idx" ON "_medical_services_v" USING btree ("_order");
  CREATE INDEX "_medical_services_v_parent_id_idx" ON "_medical_services_v" USING btree ("_parent_id");
  CREATE INDEX "_medical_services_v_path_idx" ON "_medical_services_v" USING btree ("_path");`)
}

export async function down({ db, payload, req }: MigrateDownArgs): Promise<void> {
  await db.execute(sql`
   DROP TABLE "services_banner_options" CASCADE;
  DROP TABLE "services_banner" CASCADE;
  DROP TABLE "medical_services_services" CASCADE;
  DROP TABLE "medical_services" CASCADE;
  DROP TABLE "_services_banner_v_options" CASCADE;
  DROP TABLE "_services_banner_v" CASCADE;
  DROP TABLE "_medical_services_v_services" CASCADE;
  DROP TABLE "_medical_services_v" CASCADE;
  ALTER TABLE "pages_blocks_scroll_post_cards" DROP COLUMN "disable_observer";
  ALTER TABLE "pages_blocks_scroll_post_cards" DROP COLUMN "clickable_card";
  ALTER TABLE "_pages_v_blocks_scroll_post_cards" DROP COLUMN "disable_observer";
  ALTER TABLE "_pages_v_blocks_scroll_post_cards" DROP COLUMN "clickable_card";
  DROP TYPE "public"."enum_services_banner_options_icon";
  DROP TYPE "public"."enum_services_banner_options_link_link_type";
  DROP TYPE "public"."enum_services_banner_background_color";
  DROP TYPE "public"."enum_services_banner_text_color";
  DROP TYPE "public"."enum_medical_services_services_icon";
  DROP TYPE "public"."enum_medical_services_background_color";
  DROP TYPE "public"."enum__services_banner_v_options_icon";
  DROP TYPE "public"."enum__services_banner_v_options_link_link_type";
  DROP TYPE "public"."enum__services_banner_v_background_color";
  DROP TYPE "public"."enum__services_banner_v_text_color";
  DROP TYPE "public"."enum__medical_services_v_services_icon";
  DROP TYPE "public"."enum__medical_services_v_background_color";`)
}
