import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-vercel-postgres'

export async function up({ db, payload, req }: MigrateUpArgs): Promise<void> {
  await db.execute(sql`
   CREATE TYPE "public"."enum_form_block_layout" AS ENUM('default', 'card', 'centered');
  CREATE TYPE "public"."enum_form_block_max_width" AS ENUM('sm', 'md', 'lg', 'xl', 'full');
  CREATE TYPE "public"."enum_form_block_background_color" AS ENUM('transparent', 'white', 'gray', 'primary');
  CREATE TYPE "public"."enum_form_block_padding" AS ENUM('none', 'sm', 'md', 'lg', 'xl');
  CREATE TYPE "public"."enum_form_block_button_width" AS ENUM('full', 'auto');
  CREATE TYPE "public"."enum_content_block_v2_columns_width" AS ENUM('third', 'half', 'full');
  CREATE TYPE "public"."enum_content_block_v2_spacing" AS ENUM('none', 'sm', 'md', 'lg', 'xl');
  CREATE TYPE "public"."enum_content_block_v2_container_padding" AS ENUM('none', 'sm', 'md', 'lg', 'xl');
  CREATE TYPE "public"."enum_content_block_v2_background_color" AS ENUM('transparent', 'white', 'gray', 'primary');
  CREATE TYPE "public"."enum__form_block_v_layout" AS ENUM('default', 'card', 'centered');
  CREATE TYPE "public"."enum__form_block_v_max_width" AS ENUM('sm', 'md', 'lg', 'xl', 'full');
  CREATE TYPE "public"."enum__form_block_v_background_color" AS ENUM('transparent', 'white', 'gray', 'primary');
  CREATE TYPE "public"."enum__form_block_v_padding" AS ENUM('none', 'sm', 'md', 'lg', 'xl');
  CREATE TYPE "public"."enum__form_block_v_button_width" AS ENUM('full', 'auto');
  CREATE TYPE "public"."enum__content_block_v2_v_columns_width" AS ENUM('third', 'half', 'full');
  CREATE TYPE "public"."enum__content_block_v2_v_spacing" AS ENUM('none', 'sm', 'md', 'lg', 'xl');
  CREATE TYPE "public"."enum__content_block_v2_v_container_padding" AS ENUM('none', 'sm', 'md', 'lg', 'xl');
  CREATE TYPE "public"."enum__content_block_v2_v_background_color" AS ENUM('transparent', 'white', 'gray', 'primary');
  CREATE TABLE "form_block" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"form_id" integer,
  	"title" varchar,
  	"description" jsonb,
  	"layout" "enum_form_block_layout" DEFAULT 'default',
  	"max_width" "enum_form_block_max_width" DEFAULT 'md',
  	"background_color" "enum_form_block_background_color" DEFAULT 'transparent',
  	"padding" "enum_form_block_padding" DEFAULT 'md',
  	"button_width" "enum_form_block_button_width" DEFAULT 'full',
  	"block_name" varchar
  );
  
  CREATE TABLE "content_block_v2_columns" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"width" "enum_content_block_v2_columns_width" DEFAULT 'full',
  	"content" jsonb
  );
  
  CREATE TABLE "content_block_v2" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"spacing" "enum_content_block_v2_spacing" DEFAULT 'md',
  	"container_padding" "enum_content_block_v2_container_padding" DEFAULT 'md',
  	"background_color" "enum_content_block_v2_background_color" DEFAULT 'transparent',
  	"block_name" varchar
  );
  
  CREATE TABLE "_form_block_v" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"form_id" integer,
  	"title" varchar,
  	"description" jsonb,
  	"layout" "enum__form_block_v_layout" DEFAULT 'default',
  	"max_width" "enum__form_block_v_max_width" DEFAULT 'md',
  	"background_color" "enum__form_block_v_background_color" DEFAULT 'transparent',
  	"padding" "enum__form_block_v_padding" DEFAULT 'md',
  	"button_width" "enum__form_block_v_button_width" DEFAULT 'full',
  	"_uuid" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "_content_block_v2_v_columns" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"width" "enum__content_block_v2_v_columns_width" DEFAULT 'full',
  	"content" jsonb,
  	"_uuid" varchar
  );
  
  CREATE TABLE "_content_block_v2_v" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"spacing" "enum__content_block_v2_v_spacing" DEFAULT 'md',
  	"container_padding" "enum__content_block_v2_v_container_padding" DEFAULT 'md',
  	"background_color" "enum__content_block_v2_v_background_color" DEFAULT 'transparent',
  	"_uuid" varchar,
  	"block_name" varchar
  );
  
  ALTER TABLE "medical_services_services" ADD COLUMN "background_image_id" integer;
  ALTER TABLE "pages" ADD COLUMN "show_hero_stats_card" boolean DEFAULT false;
  ALTER TABLE "pages" ADD COLUMN "hero_stats_card_title" varchar DEFAULT 'Sleep Disorder Statistics';
  ALTER TABLE "pages" ADD COLUMN "hero_stats_card_statistic_label" varchar DEFAULT 'Sleep Apnoea Cases Worldwide';
  ALTER TABLE "pages" ADD COLUMN "hero_stats_card_statistic_value" varchar DEFAULT '1 Billion';
  ALTER TABLE "pages" ADD COLUMN "hero_stats_card_description" varchar DEFAULT 'Nearly one billion people worldwide live with sleep apnoea, yet many remain undiagnosed.';
  ALTER TABLE "pages" ADD COLUMN "hero_stats_card_progress_percentage" numeric DEFAULT 85;
  ALTER TABLE "_medical_services_v_services" ADD COLUMN "background_image_id" integer;
  ALTER TABLE "_pages_v" ADD COLUMN "version_show_hero_stats_card" boolean DEFAULT false;
  ALTER TABLE "_pages_v" ADD COLUMN "version_hero_stats_card_title" varchar DEFAULT 'Sleep Disorder Statistics';
  ALTER TABLE "_pages_v" ADD COLUMN "version_hero_stats_card_statistic_label" varchar DEFAULT 'Sleep Apnoea Cases Worldwide';
  ALTER TABLE "_pages_v" ADD COLUMN "version_hero_stats_card_statistic_value" varchar DEFAULT '1 Billion';
  ALTER TABLE "_pages_v" ADD COLUMN "version_hero_stats_card_description" varchar DEFAULT 'Nearly one billion people worldwide live with sleep apnoea, yet many remain undiagnosed.';
  ALTER TABLE "_pages_v" ADD COLUMN "version_hero_stats_card_progress_percentage" numeric DEFAULT 85;
  ALTER TABLE "form_block" ADD CONSTRAINT "form_block_form_id_forms_id_fk" FOREIGN KEY ("form_id") REFERENCES "public"."forms"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "form_block" ADD CONSTRAINT "form_block_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "content_block_v2_columns" ADD CONSTRAINT "content_block_v2_columns_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."content_block_v2"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "content_block_v2" ADD CONSTRAINT "content_block_v2_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_form_block_v" ADD CONSTRAINT "_form_block_v_form_id_forms_id_fk" FOREIGN KEY ("form_id") REFERENCES "public"."forms"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_form_block_v" ADD CONSTRAINT "_form_block_v_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_content_block_v2_v_columns" ADD CONSTRAINT "_content_block_v2_v_columns_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_content_block_v2_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_content_block_v2_v" ADD CONSTRAINT "_content_block_v2_v_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v"("id") ON DELETE cascade ON UPDATE no action;
  CREATE INDEX "form_block_order_idx" ON "form_block" USING btree ("_order");
  CREATE INDEX "form_block_parent_id_idx" ON "form_block" USING btree ("_parent_id");
  CREATE INDEX "form_block_path_idx" ON "form_block" USING btree ("_path");
  CREATE INDEX "form_block_form_idx" ON "form_block" USING btree ("form_id");
  CREATE INDEX "content_block_v2_columns_order_idx" ON "content_block_v2_columns" USING btree ("_order");
  CREATE INDEX "content_block_v2_columns_parent_id_idx" ON "content_block_v2_columns" USING btree ("_parent_id");
  CREATE INDEX "content_block_v2_order_idx" ON "content_block_v2" USING btree ("_order");
  CREATE INDEX "content_block_v2_parent_id_idx" ON "content_block_v2" USING btree ("_parent_id");
  CREATE INDEX "content_block_v2_path_idx" ON "content_block_v2" USING btree ("_path");
  CREATE INDEX "_form_block_v_order_idx" ON "_form_block_v" USING btree ("_order");
  CREATE INDEX "_form_block_v_parent_id_idx" ON "_form_block_v" USING btree ("_parent_id");
  CREATE INDEX "_form_block_v_path_idx" ON "_form_block_v" USING btree ("_path");
  CREATE INDEX "_form_block_v_form_idx" ON "_form_block_v" USING btree ("form_id");
  CREATE INDEX "_content_block_v2_v_columns_order_idx" ON "_content_block_v2_v_columns" USING btree ("_order");
  CREATE INDEX "_content_block_v2_v_columns_parent_id_idx" ON "_content_block_v2_v_columns" USING btree ("_parent_id");
  CREATE INDEX "_content_block_v2_v_order_idx" ON "_content_block_v2_v" USING btree ("_order");
  CREATE INDEX "_content_block_v2_v_parent_id_idx" ON "_content_block_v2_v" USING btree ("_parent_id");
  CREATE INDEX "_content_block_v2_v_path_idx" ON "_content_block_v2_v" USING btree ("_path");
  ALTER TABLE "medical_services_services" ADD CONSTRAINT "medical_services_services_background_image_id_media_id_fk" FOREIGN KEY ("background_image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_medical_services_v_services" ADD CONSTRAINT "_medical_services_v_services_background_image_id_media_id_fk" FOREIGN KEY ("background_image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  CREATE INDEX "medical_services_services_background_image_idx" ON "medical_services_services" USING btree ("background_image_id");
  CREATE INDEX "_medical_services_v_services_background_image_idx" ON "_medical_services_v_services" USING btree ("background_image_id");`)
}

export async function down({ db, payload, req }: MigrateDownArgs): Promise<void> {
  await db.execute(sql`
   ALTER TABLE "form_block" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "content_block_v2_columns" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "content_block_v2" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_form_block_v" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_content_block_v2_v_columns" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_content_block_v2_v" DISABLE ROW LEVEL SECURITY;
  DROP TABLE "form_block" CASCADE;
  DROP TABLE "content_block_v2_columns" CASCADE;
  DROP TABLE "content_block_v2" CASCADE;
  DROP TABLE "_form_block_v" CASCADE;
  DROP TABLE "_content_block_v2_v_columns" CASCADE;
  DROP TABLE "_content_block_v2_v" CASCADE;
  ALTER TABLE "medical_services_services" DROP CONSTRAINT "medical_services_services_background_image_id_media_id_fk";
  
  ALTER TABLE "_medical_services_v_services" DROP CONSTRAINT "_medical_services_v_services_background_image_id_media_id_fk";
  
  DROP INDEX "medical_services_services_background_image_idx";
  DROP INDEX "_medical_services_v_services_background_image_idx";
  ALTER TABLE "medical_services_services" DROP COLUMN "background_image_id";
  ALTER TABLE "pages" DROP COLUMN "show_hero_stats_card";
  ALTER TABLE "pages" DROP COLUMN "hero_stats_card_title";
  ALTER TABLE "pages" DROP COLUMN "hero_stats_card_statistic_label";
  ALTER TABLE "pages" DROP COLUMN "hero_stats_card_statistic_value";
  ALTER TABLE "pages" DROP COLUMN "hero_stats_card_description";
  ALTER TABLE "pages" DROP COLUMN "hero_stats_card_progress_percentage";
  ALTER TABLE "_medical_services_v_services" DROP COLUMN "background_image_id";
  ALTER TABLE "_pages_v" DROP COLUMN "version_show_hero_stats_card";
  ALTER TABLE "_pages_v" DROP COLUMN "version_hero_stats_card_title";
  ALTER TABLE "_pages_v" DROP COLUMN "version_hero_stats_card_statistic_label";
  ALTER TABLE "_pages_v" DROP COLUMN "version_hero_stats_card_statistic_value";
  ALTER TABLE "_pages_v" DROP COLUMN "version_hero_stats_card_description";
  ALTER TABLE "_pages_v" DROP COLUMN "version_hero_stats_card_progress_percentage";
  DROP TYPE "public"."enum_form_block_layout";
  DROP TYPE "public"."enum_form_block_max_width";
  DROP TYPE "public"."enum_form_block_background_color";
  DROP TYPE "public"."enum_form_block_padding";
  DROP TYPE "public"."enum_form_block_button_width";
  DROP TYPE "public"."enum_content_block_v2_columns_width";
  DROP TYPE "public"."enum_content_block_v2_spacing";
  DROP TYPE "public"."enum_content_block_v2_container_padding";
  DROP TYPE "public"."enum_content_block_v2_background_color";
  DROP TYPE "public"."enum__form_block_v_layout";
  DROP TYPE "public"."enum__form_block_v_max_width";
  DROP TYPE "public"."enum__form_block_v_background_color";
  DROP TYPE "public"."enum__form_block_v_padding";
  DROP TYPE "public"."enum__form_block_v_button_width";
  DROP TYPE "public"."enum__content_block_v2_v_columns_width";
  DROP TYPE "public"."enum__content_block_v2_v_spacing";
  DROP TYPE "public"."enum__content_block_v2_v_container_padding";
  DROP TYPE "public"."enum__content_block_v2_v_background_color";`)
}
