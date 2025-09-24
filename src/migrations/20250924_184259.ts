import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-vercel-postgres'

export async function up({ db, payload, req }: MigrateUpArgs): Promise<void> {
  await db.execute(sql`
   CREATE TYPE "public"."enum_highlight_section_block_cta_link_type" AS ENUM('internal', 'external');
  CREATE TYPE "public"."enum__highlight_section_block_v_cta_link_type" AS ENUM('internal', 'external');
  CREATE TABLE "hero_banner_block_paragraphs" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"text" varchar
  );
  
  CREATE TABLE "hero_banner_block" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"title" varchar DEFAULT 'Headline goes here',
  	"image_id" integer,
  	"block_name" varchar
  );
  
  CREATE TABLE "partnership_benefits_block_benefits" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"title" varchar,
  	"description" varchar
  );
  
  CREATE TABLE "partnership_benefits_block" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"title" varchar DEFAULT 'Why partner with us',
  	"image_id" integer,
  	"block_name" varchar
  );
  
  CREATE TABLE "highlight_section_block" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"title" varchar DEFAULT 'Section Title',
  	"description" varchar DEFAULT 'Short, supportive description text.',
  	"cta_label" varchar,
  	"cta_link_type" "enum_highlight_section_block_cta_link_type" DEFAULT 'internal',
  	"cta_external_href" varchar,
  	"image_id" integer,
  	"overlay_text_main" varchar,
  	"overlay_text_subtitle" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "_hero_banner_block_v_paragraphs" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"text" varchar,
  	"_uuid" varchar
  );
  
  CREATE TABLE "_hero_banner_block_v" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"title" varchar DEFAULT 'Headline goes here',
  	"image_id" integer,
  	"_uuid" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "_partnership_benefits_block_v_benefits" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"title" varchar,
  	"description" varchar,
  	"_uuid" varchar
  );
  
  CREATE TABLE "_partnership_benefits_block_v" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"title" varchar DEFAULT 'Why partner with us',
  	"image_id" integer,
  	"_uuid" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "_highlight_section_block_v" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"title" varchar DEFAULT 'Section Title',
  	"description" varchar DEFAULT 'Short, supportive description text.',
  	"cta_label" varchar,
  	"cta_link_type" "enum__highlight_section_block_v_cta_link_type" DEFAULT 'internal',
  	"cta_external_href" varchar,
  	"image_id" integer,
  	"overlay_text_main" varchar,
  	"overlay_text_subtitle" varchar,
  	"_uuid" varchar,
  	"block_name" varchar
  );
  
  ALTER TABLE "hero_banner_block_paragraphs" ADD CONSTRAINT "hero_banner_block_paragraphs_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."hero_banner_block"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "hero_banner_block" ADD CONSTRAINT "hero_banner_block_image_id_media_id_fk" FOREIGN KEY ("image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "hero_banner_block" ADD CONSTRAINT "hero_banner_block_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "partnership_benefits_block_benefits" ADD CONSTRAINT "partnership_benefits_block_benefits_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."partnership_benefits_block"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "partnership_benefits_block" ADD CONSTRAINT "partnership_benefits_block_image_id_media_id_fk" FOREIGN KEY ("image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "partnership_benefits_block" ADD CONSTRAINT "partnership_benefits_block_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "highlight_section_block" ADD CONSTRAINT "highlight_section_block_image_id_media_id_fk" FOREIGN KEY ("image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "highlight_section_block" ADD CONSTRAINT "highlight_section_block_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_hero_banner_block_v_paragraphs" ADD CONSTRAINT "_hero_banner_block_v_paragraphs_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_hero_banner_block_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_hero_banner_block_v" ADD CONSTRAINT "_hero_banner_block_v_image_id_media_id_fk" FOREIGN KEY ("image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_hero_banner_block_v" ADD CONSTRAINT "_hero_banner_block_v_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_partnership_benefits_block_v_benefits" ADD CONSTRAINT "_partnership_benefits_block_v_benefits_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_partnership_benefits_block_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_partnership_benefits_block_v" ADD CONSTRAINT "_partnership_benefits_block_v_image_id_media_id_fk" FOREIGN KEY ("image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_partnership_benefits_block_v" ADD CONSTRAINT "_partnership_benefits_block_v_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_highlight_section_block_v" ADD CONSTRAINT "_highlight_section_block_v_image_id_media_id_fk" FOREIGN KEY ("image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_highlight_section_block_v" ADD CONSTRAINT "_highlight_section_block_v_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v"("id") ON DELETE cascade ON UPDATE no action;
  CREATE INDEX "hero_banner_block_paragraphs_order_idx" ON "hero_banner_block_paragraphs" USING btree ("_order");
  CREATE INDEX "hero_banner_block_paragraphs_parent_id_idx" ON "hero_banner_block_paragraphs" USING btree ("_parent_id");
  CREATE INDEX "hero_banner_block_order_idx" ON "hero_banner_block" USING btree ("_order");
  CREATE INDEX "hero_banner_block_parent_id_idx" ON "hero_banner_block" USING btree ("_parent_id");
  CREATE INDEX "hero_banner_block_path_idx" ON "hero_banner_block" USING btree ("_path");
  CREATE INDEX "hero_banner_block_image_idx" ON "hero_banner_block" USING btree ("image_id");
  CREATE INDEX "partnership_benefits_block_benefits_order_idx" ON "partnership_benefits_block_benefits" USING btree ("_order");
  CREATE INDEX "partnership_benefits_block_benefits_parent_id_idx" ON "partnership_benefits_block_benefits" USING btree ("_parent_id");
  CREATE INDEX "partnership_benefits_block_order_idx" ON "partnership_benefits_block" USING btree ("_order");
  CREATE INDEX "partnership_benefits_block_parent_id_idx" ON "partnership_benefits_block" USING btree ("_parent_id");
  CREATE INDEX "partnership_benefits_block_path_idx" ON "partnership_benefits_block" USING btree ("_path");
  CREATE INDEX "partnership_benefits_block_image_idx" ON "partnership_benefits_block" USING btree ("image_id");
  CREATE INDEX "highlight_section_block_order_idx" ON "highlight_section_block" USING btree ("_order");
  CREATE INDEX "highlight_section_block_parent_id_idx" ON "highlight_section_block" USING btree ("_parent_id");
  CREATE INDEX "highlight_section_block_path_idx" ON "highlight_section_block" USING btree ("_path");
  CREATE INDEX "highlight_section_block_image_idx" ON "highlight_section_block" USING btree ("image_id");
  CREATE INDEX "_hero_banner_block_v_paragraphs_order_idx" ON "_hero_banner_block_v_paragraphs" USING btree ("_order");
  CREATE INDEX "_hero_banner_block_v_paragraphs_parent_id_idx" ON "_hero_banner_block_v_paragraphs" USING btree ("_parent_id");
  CREATE INDEX "_hero_banner_block_v_order_idx" ON "_hero_banner_block_v" USING btree ("_order");
  CREATE INDEX "_hero_banner_block_v_parent_id_idx" ON "_hero_banner_block_v" USING btree ("_parent_id");
  CREATE INDEX "_hero_banner_block_v_path_idx" ON "_hero_banner_block_v" USING btree ("_path");
  CREATE INDEX "_hero_banner_block_v_image_idx" ON "_hero_banner_block_v" USING btree ("image_id");
  CREATE INDEX "_partnership_benefits_block_v_benefits_order_idx" ON "_partnership_benefits_block_v_benefits" USING btree ("_order");
  CREATE INDEX "_partnership_benefits_block_v_benefits_parent_id_idx" ON "_partnership_benefits_block_v_benefits" USING btree ("_parent_id");
  CREATE INDEX "_partnership_benefits_block_v_order_idx" ON "_partnership_benefits_block_v" USING btree ("_order");
  CREATE INDEX "_partnership_benefits_block_v_parent_id_idx" ON "_partnership_benefits_block_v" USING btree ("_parent_id");
  CREATE INDEX "_partnership_benefits_block_v_path_idx" ON "_partnership_benefits_block_v" USING btree ("_path");
  CREATE INDEX "_partnership_benefits_block_v_image_idx" ON "_partnership_benefits_block_v" USING btree ("image_id");
  CREATE INDEX "_highlight_section_block_v_order_idx" ON "_highlight_section_block_v" USING btree ("_order");
  CREATE INDEX "_highlight_section_block_v_parent_id_idx" ON "_highlight_section_block_v" USING btree ("_parent_id");
  CREATE INDEX "_highlight_section_block_v_path_idx" ON "_highlight_section_block_v" USING btree ("_path");
  CREATE INDEX "_highlight_section_block_v_image_idx" ON "_highlight_section_block_v" USING btree ("image_id");`)
}

export async function down({ db, payload, req }: MigrateDownArgs): Promise<void> {
  await db.execute(sql`
   DROP TABLE "hero_banner_block_paragraphs" CASCADE;
  DROP TABLE "hero_banner_block" CASCADE;
  DROP TABLE "partnership_benefits_block_benefits" CASCADE;
  DROP TABLE "partnership_benefits_block" CASCADE;
  DROP TABLE "highlight_section_block" CASCADE;
  DROP TABLE "_hero_banner_block_v_paragraphs" CASCADE;
  DROP TABLE "_hero_banner_block_v" CASCADE;
  DROP TABLE "_partnership_benefits_block_v_benefits" CASCADE;
  DROP TABLE "_partnership_benefits_block_v" CASCADE;
  DROP TABLE "_highlight_section_block_v" CASCADE;
  DROP TYPE "public"."enum_highlight_section_block_cta_link_type";
  DROP TYPE "public"."enum__highlight_section_block_v_cta_link_type";`)
}
