import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-vercel-postgres'

export async function up({ db, payload, req }: MigrateUpArgs): Promise<void> {
  await db.execute(sql`
   CREATE TYPE "public"."enum_pages_blocks_scroll_post_cards_posts_link_type" AS ENUM('internal', 'external');
  CREATE TYPE "public"."enum_pages_blocks_carousel_items_link_type" AS ENUM('internal', 'external');
  CREATE TYPE "public"."enum_pages_blocks_two_card_block_items_links_variant" AS ENUM('primary', 'secondary');
  CREATE TYPE "public"."enum_pages_blocks_two_card_block_items_links_link_type" AS ENUM('internal', 'external');
  CREATE TYPE "public"."enum__pages_v_blocks_scroll_post_cards_posts_link_type" AS ENUM('internal', 'external');
  CREATE TYPE "public"."enum__pages_v_blocks_carousel_items_link_type" AS ENUM('internal', 'external');
  CREATE TYPE "public"."enum__pages_v_blocks_two_card_block_items_links_variant" AS ENUM('primary', 'secondary');
  CREATE TYPE "public"."enum__pages_v_blocks_two_card_block_items_links_link_type" AS ENUM('internal', 'external');
  CREATE TABLE "pages_blocks_partners_text_block_partners" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"name" varchar
  );
  
  CREATE TABLE "pages_blocks_partners_text_block" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"title" varchar DEFAULT 'Our Partners',
  	"block_name" varchar
  );
  
  CREATE TABLE "pages_blocks_expandable_table_items" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"title" varchar,
  	"content" varchar,
  	"details" varchar
  );
  
  CREATE TABLE "pages_blocks_expandable_table" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"title" varchar DEFAULT 'Expandable Table',
  	"subtitle" varchar,
  	"description" varchar DEFAULT 'Click on items to expand and see more details.',
  	"enable_search" boolean DEFAULT false,
  	"search_placeholder" varchar DEFAULT 'Search items...',
  	"block_name" varchar
  );
  
  CREATE TABLE "pages_blocks_testimonials_testimonials" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"quote" varchar,
  	"author" varchar,
  	"role" varchar
  );
  
  CREATE TABLE "pages_blocks_testimonials" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"title" varchar DEFAULT 'What our clients say',
  	"autoplay_interval" numeric DEFAULT 4000,
  	"block_name" varchar
  );
  
  CREATE TABLE "pages_blocks_team_cards_members" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"image_id" integer,
  	"name" varchar,
  	"description" varchar,
  	"link_text" varchar,
  	"link_href" varchar
  );
  
  CREATE TABLE "pages_blocks_team_cards" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"title" varchar DEFAULT 'Our Team',
  	"subtitle" varchar,
  	"enable_carousel" boolean DEFAULT false,
  	"block_name" varchar
  );
  
  CREATE TABLE "pages_blocks_scroll_post_cards_posts" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"image_id" integer,
  	"category" varchar,
  	"author" varchar,
  	"date" varchar,
  	"read_time" varchar,
  	"title" varchar,
  	"excerpt" varchar,
  	"link_type" "enum_pages_blocks_scroll_post_cards_posts_link_type" DEFAULT 'internal',
  	"href" varchar
  );
  
  CREATE TABLE "pages_blocks_scroll_post_cards" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"title" varchar,
  	"subtitle" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "pages_blocks_two_card_block_items_links" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"text" varchar,
  	"variant" "enum_pages_blocks_two_card_block_items_links_variant" DEFAULT 'primary',
  	"link_type" "enum_pages_blocks_two_card_block_items_links_link_type" DEFAULT 'internal',
  	"external_href" varchar
  );
  
  CREATE TABLE "pages_blocks_two_card_block_items" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"image_id" integer,
  	"title" varchar,
  	"description" varchar
  );
  
  CREATE TABLE "pages_blocks_two_card_block" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"title" varchar,
  	"subtitle" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "pages_blocks_full_width_banner" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"title" varchar,
  	"subtitle" varchar,
  	"button_text" varchar,
  	"button_href" varchar,
  	"background_image_id" integer,
  	"block_name" varchar
  );
  
  CREATE TABLE "pages_blocks_parallax_hero" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"title" varchar,
  	"subtitle" varchar,
  	"button_text" varchar,
  	"button_href" varchar,
  	"background_image_id" integer,
  	"block_name" varchar
  );
  
  CREATE TABLE "_pages_v_blocks_partners_text_block_partners" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"name" varchar,
  	"_uuid" varchar
  );
  
  CREATE TABLE "_pages_v_blocks_partners_text_block" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"title" varchar DEFAULT 'Our Partners',
  	"_uuid" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "_pages_v_blocks_expandable_table_items" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"title" varchar,
  	"content" varchar,
  	"details" varchar,
  	"_uuid" varchar
  );
  
  CREATE TABLE "_pages_v_blocks_expandable_table" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"title" varchar DEFAULT 'Expandable Table',
  	"subtitle" varchar,
  	"description" varchar DEFAULT 'Click on items to expand and see more details.',
  	"enable_search" boolean DEFAULT false,
  	"search_placeholder" varchar DEFAULT 'Search items...',
  	"_uuid" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "_pages_v_blocks_testimonials_testimonials" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"quote" varchar,
  	"author" varchar,
  	"role" varchar,
  	"_uuid" varchar
  );
  
  CREATE TABLE "_pages_v_blocks_testimonials" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"title" varchar DEFAULT 'What our clients say',
  	"autoplay_interval" numeric DEFAULT 4000,
  	"_uuid" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "_pages_v_blocks_team_cards_members" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"image_id" integer,
  	"name" varchar,
  	"description" varchar,
  	"link_text" varchar,
  	"link_href" varchar,
  	"_uuid" varchar
  );
  
  CREATE TABLE "_pages_v_blocks_team_cards" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"title" varchar DEFAULT 'Our Team',
  	"subtitle" varchar,
  	"enable_carousel" boolean DEFAULT false,
  	"_uuid" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "_pages_v_blocks_scroll_post_cards_posts" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"image_id" integer,
  	"category" varchar,
  	"author" varchar,
  	"date" varchar,
  	"read_time" varchar,
  	"title" varchar,
  	"excerpt" varchar,
  	"link_type" "enum__pages_v_blocks_scroll_post_cards_posts_link_type" DEFAULT 'internal',
  	"href" varchar,
  	"_uuid" varchar
  );
  
  CREATE TABLE "_pages_v_blocks_scroll_post_cards" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"title" varchar,
  	"subtitle" varchar,
  	"_uuid" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "_pages_v_blocks_two_card_block_items_links" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"text" varchar,
  	"variant" "enum__pages_v_blocks_two_card_block_items_links_variant" DEFAULT 'primary',
  	"link_type" "enum__pages_v_blocks_two_card_block_items_links_link_type" DEFAULT 'internal',
  	"external_href" varchar,
  	"_uuid" varchar
  );
  
  CREATE TABLE "_pages_v_blocks_two_card_block_items" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"image_id" integer,
  	"title" varchar,
  	"description" varchar,
  	"_uuid" varchar
  );
  
  CREATE TABLE "_pages_v_blocks_two_card_block" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"title" varchar,
  	"subtitle" varchar,
  	"_uuid" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "_pages_v_blocks_full_width_banner" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"title" varchar,
  	"subtitle" varchar,
  	"button_text" varchar,
  	"button_href" varchar,
  	"background_image_id" integer,
  	"_uuid" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "_pages_v_blocks_parallax_hero" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"title" varchar,
  	"subtitle" varchar,
  	"button_text" varchar,
  	"button_href" varchar,
  	"background_image_id" integer,
  	"_uuid" varchar,
  	"block_name" varchar
  );
  
  ALTER TABLE "pages_blocks_carousel" ALTER COLUMN "slides_to_show" SET DEFAULT 1;
  ALTER TABLE "_pages_v_blocks_carousel" ALTER COLUMN "slides_to_show" SET DEFAULT 1;
  ALTER TABLE "pages_blocks_carousel_items" ADD COLUMN "link_type" "enum_pages_blocks_carousel_items_link_type" DEFAULT 'internal';
  ALTER TABLE "pages_blocks_carousel_items" ADD COLUMN "external_href" varchar;
  ALTER TABLE "pages_blocks_carousel" ADD COLUMN "title" varchar;
  ALTER TABLE "pages_blocks_carousel" ADD COLUMN "subtitle" varchar;
  ALTER TABLE "pages_rels" ADD COLUMN "pages_id" integer;
  ALTER TABLE "_pages_v_blocks_carousel_items" ADD COLUMN "link_type" "enum__pages_v_blocks_carousel_items_link_type" DEFAULT 'internal';
  ALTER TABLE "_pages_v_blocks_carousel_items" ADD COLUMN "external_href" varchar;
  ALTER TABLE "_pages_v_blocks_carousel" ADD COLUMN "title" varchar;
  ALTER TABLE "_pages_v_blocks_carousel" ADD COLUMN "subtitle" varchar;
  ALTER TABLE "_pages_v_rels" ADD COLUMN "pages_id" integer;
  ALTER TABLE "pages_blocks_partners_text_block_partners" ADD CONSTRAINT "pages_blocks_partners_text_block_partners_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages_blocks_partners_text_block"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_partners_text_block" ADD CONSTRAINT "pages_blocks_partners_text_block_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_expandable_table_items" ADD CONSTRAINT "pages_blocks_expandable_table_items_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages_blocks_expandable_table"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_expandable_table" ADD CONSTRAINT "pages_blocks_expandable_table_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_testimonials_testimonials" ADD CONSTRAINT "pages_blocks_testimonials_testimonials_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages_blocks_testimonials"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_testimonials" ADD CONSTRAINT "pages_blocks_testimonials_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_team_cards_members" ADD CONSTRAINT "pages_blocks_team_cards_members_image_id_media_id_fk" FOREIGN KEY ("image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "pages_blocks_team_cards_members" ADD CONSTRAINT "pages_blocks_team_cards_members_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages_blocks_team_cards"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_team_cards" ADD CONSTRAINT "pages_blocks_team_cards_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_scroll_post_cards_posts" ADD CONSTRAINT "pages_blocks_scroll_post_cards_posts_image_id_media_id_fk" FOREIGN KEY ("image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "pages_blocks_scroll_post_cards_posts" ADD CONSTRAINT "pages_blocks_scroll_post_cards_posts_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages_blocks_scroll_post_cards"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_scroll_post_cards" ADD CONSTRAINT "pages_blocks_scroll_post_cards_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_two_card_block_items_links" ADD CONSTRAINT "pages_blocks_two_card_block_items_links_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages_blocks_two_card_block_items"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_two_card_block_items" ADD CONSTRAINT "pages_blocks_two_card_block_items_image_id_media_id_fk" FOREIGN KEY ("image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "pages_blocks_two_card_block_items" ADD CONSTRAINT "pages_blocks_two_card_block_items_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages_blocks_two_card_block"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_two_card_block" ADD CONSTRAINT "pages_blocks_two_card_block_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_full_width_banner" ADD CONSTRAINT "pages_blocks_full_width_banner_background_image_id_media_id_fk" FOREIGN KEY ("background_image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "pages_blocks_full_width_banner" ADD CONSTRAINT "pages_blocks_full_width_banner_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_parallax_hero" ADD CONSTRAINT "pages_blocks_parallax_hero_background_image_id_media_id_fk" FOREIGN KEY ("background_image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "pages_blocks_parallax_hero" ADD CONSTRAINT "pages_blocks_parallax_hero_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_partners_text_block_partners" ADD CONSTRAINT "_pages_v_blocks_partners_text_block_partners_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v_blocks_partners_text_block"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_partners_text_block" ADD CONSTRAINT "_pages_v_blocks_partners_text_block_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_expandable_table_items" ADD CONSTRAINT "_pages_v_blocks_expandable_table_items_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v_blocks_expandable_table"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_expandable_table" ADD CONSTRAINT "_pages_v_blocks_expandable_table_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_testimonials_testimonials" ADD CONSTRAINT "_pages_v_blocks_testimonials_testimonials_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v_blocks_testimonials"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_testimonials" ADD CONSTRAINT "_pages_v_blocks_testimonials_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_team_cards_members" ADD CONSTRAINT "_pages_v_blocks_team_cards_members_image_id_media_id_fk" FOREIGN KEY ("image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_team_cards_members" ADD CONSTRAINT "_pages_v_blocks_team_cards_members_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v_blocks_team_cards"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_team_cards" ADD CONSTRAINT "_pages_v_blocks_team_cards_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_scroll_post_cards_posts" ADD CONSTRAINT "_pages_v_blocks_scroll_post_cards_posts_image_id_media_id_fk" FOREIGN KEY ("image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_scroll_post_cards_posts" ADD CONSTRAINT "_pages_v_blocks_scroll_post_cards_posts_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v_blocks_scroll_post_cards"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_scroll_post_cards" ADD CONSTRAINT "_pages_v_blocks_scroll_post_cards_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_two_card_block_items_links" ADD CONSTRAINT "_pages_v_blocks_two_card_block_items_links_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v_blocks_two_card_block_items"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_two_card_block_items" ADD CONSTRAINT "_pages_v_blocks_two_card_block_items_image_id_media_id_fk" FOREIGN KEY ("image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_two_card_block_items" ADD CONSTRAINT "_pages_v_blocks_two_card_block_items_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v_blocks_two_card_block"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_two_card_block" ADD CONSTRAINT "_pages_v_blocks_two_card_block_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_full_width_banner" ADD CONSTRAINT "_pages_v_blocks_full_width_banner_background_image_id_media_id_fk" FOREIGN KEY ("background_image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_full_width_banner" ADD CONSTRAINT "_pages_v_blocks_full_width_banner_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_parallax_hero" ADD CONSTRAINT "_pages_v_blocks_parallax_hero_background_image_id_media_id_fk" FOREIGN KEY ("background_image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_parallax_hero" ADD CONSTRAINT "_pages_v_blocks_parallax_hero_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v"("id") ON DELETE cascade ON UPDATE no action;
  CREATE INDEX "pages_blocks_partners_text_block_partners_order_idx" ON "pages_blocks_partners_text_block_partners" USING btree ("_order");
  CREATE INDEX "pages_blocks_partners_text_block_partners_parent_id_idx" ON "pages_blocks_partners_text_block_partners" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_partners_text_block_order_idx" ON "pages_blocks_partners_text_block" USING btree ("_order");
  CREATE INDEX "pages_blocks_partners_text_block_parent_id_idx" ON "pages_blocks_partners_text_block" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_partners_text_block_path_idx" ON "pages_blocks_partners_text_block" USING btree ("_path");
  CREATE INDEX "pages_blocks_expandable_table_items_order_idx" ON "pages_blocks_expandable_table_items" USING btree ("_order");
  CREATE INDEX "pages_blocks_expandable_table_items_parent_id_idx" ON "pages_blocks_expandable_table_items" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_expandable_table_order_idx" ON "pages_blocks_expandable_table" USING btree ("_order");
  CREATE INDEX "pages_blocks_expandable_table_parent_id_idx" ON "pages_blocks_expandable_table" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_expandable_table_path_idx" ON "pages_blocks_expandable_table" USING btree ("_path");
  CREATE INDEX "pages_blocks_testimonials_testimonials_order_idx" ON "pages_blocks_testimonials_testimonials" USING btree ("_order");
  CREATE INDEX "pages_blocks_testimonials_testimonials_parent_id_idx" ON "pages_blocks_testimonials_testimonials" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_testimonials_order_idx" ON "pages_blocks_testimonials" USING btree ("_order");
  CREATE INDEX "pages_blocks_testimonials_parent_id_idx" ON "pages_blocks_testimonials" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_testimonials_path_idx" ON "pages_blocks_testimonials" USING btree ("_path");
  CREATE INDEX "pages_blocks_team_cards_members_order_idx" ON "pages_blocks_team_cards_members" USING btree ("_order");
  CREATE INDEX "pages_blocks_team_cards_members_parent_id_idx" ON "pages_blocks_team_cards_members" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_team_cards_members_image_idx" ON "pages_blocks_team_cards_members" USING btree ("image_id");
  CREATE INDEX "pages_blocks_team_cards_order_idx" ON "pages_blocks_team_cards" USING btree ("_order");
  CREATE INDEX "pages_blocks_team_cards_parent_id_idx" ON "pages_blocks_team_cards" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_team_cards_path_idx" ON "pages_blocks_team_cards" USING btree ("_path");
  CREATE INDEX "pages_blocks_scroll_post_cards_posts_order_idx" ON "pages_blocks_scroll_post_cards_posts" USING btree ("_order");
  CREATE INDEX "pages_blocks_scroll_post_cards_posts_parent_id_idx" ON "pages_blocks_scroll_post_cards_posts" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_scroll_post_cards_posts_image_idx" ON "pages_blocks_scroll_post_cards_posts" USING btree ("image_id");
  CREATE INDEX "pages_blocks_scroll_post_cards_order_idx" ON "pages_blocks_scroll_post_cards" USING btree ("_order");
  CREATE INDEX "pages_blocks_scroll_post_cards_parent_id_idx" ON "pages_blocks_scroll_post_cards" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_scroll_post_cards_path_idx" ON "pages_blocks_scroll_post_cards" USING btree ("_path");
  CREATE INDEX "pages_blocks_two_card_block_items_links_order_idx" ON "pages_blocks_two_card_block_items_links" USING btree ("_order");
  CREATE INDEX "pages_blocks_two_card_block_items_links_parent_id_idx" ON "pages_blocks_two_card_block_items_links" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_two_card_block_items_order_idx" ON "pages_blocks_two_card_block_items" USING btree ("_order");
  CREATE INDEX "pages_blocks_two_card_block_items_parent_id_idx" ON "pages_blocks_two_card_block_items" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_two_card_block_items_image_idx" ON "pages_blocks_two_card_block_items" USING btree ("image_id");
  CREATE INDEX "pages_blocks_two_card_block_order_idx" ON "pages_blocks_two_card_block" USING btree ("_order");
  CREATE INDEX "pages_blocks_two_card_block_parent_id_idx" ON "pages_blocks_two_card_block" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_two_card_block_path_idx" ON "pages_blocks_two_card_block" USING btree ("_path");
  CREATE INDEX "pages_blocks_full_width_banner_order_idx" ON "pages_blocks_full_width_banner" USING btree ("_order");
  CREATE INDEX "pages_blocks_full_width_banner_parent_id_idx" ON "pages_blocks_full_width_banner" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_full_width_banner_path_idx" ON "pages_blocks_full_width_banner" USING btree ("_path");
  CREATE INDEX "pages_blocks_full_width_banner_background_image_idx" ON "pages_blocks_full_width_banner" USING btree ("background_image_id");
  CREATE INDEX "pages_blocks_parallax_hero_order_idx" ON "pages_blocks_parallax_hero" USING btree ("_order");
  CREATE INDEX "pages_blocks_parallax_hero_parent_id_idx" ON "pages_blocks_parallax_hero" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_parallax_hero_path_idx" ON "pages_blocks_parallax_hero" USING btree ("_path");
  CREATE INDEX "pages_blocks_parallax_hero_background_image_idx" ON "pages_blocks_parallax_hero" USING btree ("background_image_id");
  CREATE INDEX "_pages_v_blocks_partners_text_block_partners_order_idx" ON "_pages_v_blocks_partners_text_block_partners" USING btree ("_order");
  CREATE INDEX "_pages_v_blocks_partners_text_block_partners_parent_id_idx" ON "_pages_v_blocks_partners_text_block_partners" USING btree ("_parent_id");
  CREATE INDEX "_pages_v_blocks_partners_text_block_order_idx" ON "_pages_v_blocks_partners_text_block" USING btree ("_order");
  CREATE INDEX "_pages_v_blocks_partners_text_block_parent_id_idx" ON "_pages_v_blocks_partners_text_block" USING btree ("_parent_id");
  CREATE INDEX "_pages_v_blocks_partners_text_block_path_idx" ON "_pages_v_blocks_partners_text_block" USING btree ("_path");
  CREATE INDEX "_pages_v_blocks_expandable_table_items_order_idx" ON "_pages_v_blocks_expandable_table_items" USING btree ("_order");
  CREATE INDEX "_pages_v_blocks_expandable_table_items_parent_id_idx" ON "_pages_v_blocks_expandable_table_items" USING btree ("_parent_id");
  CREATE INDEX "_pages_v_blocks_expandable_table_order_idx" ON "_pages_v_blocks_expandable_table" USING btree ("_order");
  CREATE INDEX "_pages_v_blocks_expandable_table_parent_id_idx" ON "_pages_v_blocks_expandable_table" USING btree ("_parent_id");
  CREATE INDEX "_pages_v_blocks_expandable_table_path_idx" ON "_pages_v_blocks_expandable_table" USING btree ("_path");
  CREATE INDEX "_pages_v_blocks_testimonials_testimonials_order_idx" ON "_pages_v_blocks_testimonials_testimonials" USING btree ("_order");
  CREATE INDEX "_pages_v_blocks_testimonials_testimonials_parent_id_idx" ON "_pages_v_blocks_testimonials_testimonials" USING btree ("_parent_id");
  CREATE INDEX "_pages_v_blocks_testimonials_order_idx" ON "_pages_v_blocks_testimonials" USING btree ("_order");
  CREATE INDEX "_pages_v_blocks_testimonials_parent_id_idx" ON "_pages_v_blocks_testimonials" USING btree ("_parent_id");
  CREATE INDEX "_pages_v_blocks_testimonials_path_idx" ON "_pages_v_blocks_testimonials" USING btree ("_path");
  CREATE INDEX "_pages_v_blocks_team_cards_members_order_idx" ON "_pages_v_blocks_team_cards_members" USING btree ("_order");
  CREATE INDEX "_pages_v_blocks_team_cards_members_parent_id_idx" ON "_pages_v_blocks_team_cards_members" USING btree ("_parent_id");
  CREATE INDEX "_pages_v_blocks_team_cards_members_image_idx" ON "_pages_v_blocks_team_cards_members" USING btree ("image_id");
  CREATE INDEX "_pages_v_blocks_team_cards_order_idx" ON "_pages_v_blocks_team_cards" USING btree ("_order");
  CREATE INDEX "_pages_v_blocks_team_cards_parent_id_idx" ON "_pages_v_blocks_team_cards" USING btree ("_parent_id");
  CREATE INDEX "_pages_v_blocks_team_cards_path_idx" ON "_pages_v_blocks_team_cards" USING btree ("_path");
  CREATE INDEX "_pages_v_blocks_scroll_post_cards_posts_order_idx" ON "_pages_v_blocks_scroll_post_cards_posts" USING btree ("_order");
  CREATE INDEX "_pages_v_blocks_scroll_post_cards_posts_parent_id_idx" ON "_pages_v_blocks_scroll_post_cards_posts" USING btree ("_parent_id");
  CREATE INDEX "_pages_v_blocks_scroll_post_cards_posts_image_idx" ON "_pages_v_blocks_scroll_post_cards_posts" USING btree ("image_id");
  CREATE INDEX "_pages_v_blocks_scroll_post_cards_order_idx" ON "_pages_v_blocks_scroll_post_cards" USING btree ("_order");
  CREATE INDEX "_pages_v_blocks_scroll_post_cards_parent_id_idx" ON "_pages_v_blocks_scroll_post_cards" USING btree ("_parent_id");
  CREATE INDEX "_pages_v_blocks_scroll_post_cards_path_idx" ON "_pages_v_blocks_scroll_post_cards" USING btree ("_path");
  CREATE INDEX "_pages_v_blocks_two_card_block_items_links_order_idx" ON "_pages_v_blocks_two_card_block_items_links" USING btree ("_order");
  CREATE INDEX "_pages_v_blocks_two_card_block_items_links_parent_id_idx" ON "_pages_v_blocks_two_card_block_items_links" USING btree ("_parent_id");
  CREATE INDEX "_pages_v_blocks_two_card_block_items_order_idx" ON "_pages_v_blocks_two_card_block_items" USING btree ("_order");
  CREATE INDEX "_pages_v_blocks_two_card_block_items_parent_id_idx" ON "_pages_v_blocks_two_card_block_items" USING btree ("_parent_id");
  CREATE INDEX "_pages_v_blocks_two_card_block_items_image_idx" ON "_pages_v_blocks_two_card_block_items" USING btree ("image_id");
  CREATE INDEX "_pages_v_blocks_two_card_block_order_idx" ON "_pages_v_blocks_two_card_block" USING btree ("_order");
  CREATE INDEX "_pages_v_blocks_two_card_block_parent_id_idx" ON "_pages_v_blocks_two_card_block" USING btree ("_parent_id");
  CREATE INDEX "_pages_v_blocks_two_card_block_path_idx" ON "_pages_v_blocks_two_card_block" USING btree ("_path");
  CREATE INDEX "_pages_v_blocks_full_width_banner_order_idx" ON "_pages_v_blocks_full_width_banner" USING btree ("_order");
  CREATE INDEX "_pages_v_blocks_full_width_banner_parent_id_idx" ON "_pages_v_blocks_full_width_banner" USING btree ("_parent_id");
  CREATE INDEX "_pages_v_blocks_full_width_banner_path_idx" ON "_pages_v_blocks_full_width_banner" USING btree ("_path");
  CREATE INDEX "_pages_v_blocks_full_width_banner_background_image_idx" ON "_pages_v_blocks_full_width_banner" USING btree ("background_image_id");
  CREATE INDEX "_pages_v_blocks_parallax_hero_order_idx" ON "_pages_v_blocks_parallax_hero" USING btree ("_order");
  CREATE INDEX "_pages_v_blocks_parallax_hero_parent_id_idx" ON "_pages_v_blocks_parallax_hero" USING btree ("_parent_id");
  CREATE INDEX "_pages_v_blocks_parallax_hero_path_idx" ON "_pages_v_blocks_parallax_hero" USING btree ("_path");
  CREATE INDEX "_pages_v_blocks_parallax_hero_background_image_idx" ON "_pages_v_blocks_parallax_hero" USING btree ("background_image_id");
  ALTER TABLE "pages_rels" ADD CONSTRAINT "pages_rels_pages_fk" FOREIGN KEY ("pages_id") REFERENCES "public"."pages"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_rels" ADD CONSTRAINT "_pages_v_rels_pages_fk" FOREIGN KEY ("pages_id") REFERENCES "public"."pages"("id") ON DELETE cascade ON UPDATE no action;
  CREATE INDEX "pages_rels_pages_id_idx" ON "pages_rels" USING btree ("pages_id");
  CREATE INDEX "_pages_v_rels_pages_id_idx" ON "_pages_v_rels" USING btree ("pages_id");
  ALTER TABLE "pages_blocks_carousel_items" DROP COLUMN "href";
  ALTER TABLE "_pages_v_blocks_carousel_items" DROP COLUMN "href";`)
}

export async function down({ db, payload, req }: MigrateDownArgs): Promise<void> {
  await db.execute(sql`
   ALTER TABLE "pages_blocks_partners_text_block_partners" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "pages_blocks_partners_text_block" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "pages_blocks_expandable_table_items" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "pages_blocks_expandable_table" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "pages_blocks_testimonials_testimonials" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "pages_blocks_testimonials" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "pages_blocks_team_cards_members" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "pages_blocks_team_cards" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "pages_blocks_scroll_post_cards_posts" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "pages_blocks_scroll_post_cards" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "pages_blocks_two_card_block_items_links" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "pages_blocks_two_card_block_items" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "pages_blocks_two_card_block" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "pages_blocks_full_width_banner" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "pages_blocks_parallax_hero" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_pages_v_blocks_partners_text_block_partners" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_pages_v_blocks_partners_text_block" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_pages_v_blocks_expandable_table_items" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_pages_v_blocks_expandable_table" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_pages_v_blocks_testimonials_testimonials" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_pages_v_blocks_testimonials" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_pages_v_blocks_team_cards_members" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_pages_v_blocks_team_cards" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_pages_v_blocks_scroll_post_cards_posts" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_pages_v_blocks_scroll_post_cards" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_pages_v_blocks_two_card_block_items_links" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_pages_v_blocks_two_card_block_items" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_pages_v_blocks_two_card_block" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_pages_v_blocks_full_width_banner" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_pages_v_blocks_parallax_hero" DISABLE ROW LEVEL SECURITY;
  DROP TABLE "pages_blocks_partners_text_block_partners" CASCADE;
  DROP TABLE "pages_blocks_partners_text_block" CASCADE;
  DROP TABLE "pages_blocks_expandable_table_items" CASCADE;
  DROP TABLE "pages_blocks_expandable_table" CASCADE;
  DROP TABLE "pages_blocks_testimonials_testimonials" CASCADE;
  DROP TABLE "pages_blocks_testimonials" CASCADE;
  DROP TABLE "pages_blocks_team_cards_members" CASCADE;
  DROP TABLE "pages_blocks_team_cards" CASCADE;
  DROP TABLE "pages_blocks_scroll_post_cards_posts" CASCADE;
  DROP TABLE "pages_blocks_scroll_post_cards" CASCADE;
  DROP TABLE "pages_blocks_two_card_block_items_links" CASCADE;
  DROP TABLE "pages_blocks_two_card_block_items" CASCADE;
  DROP TABLE "pages_blocks_two_card_block" CASCADE;
  DROP TABLE "pages_blocks_full_width_banner" CASCADE;
  DROP TABLE "pages_blocks_parallax_hero" CASCADE;
  DROP TABLE "_pages_v_blocks_partners_text_block_partners" CASCADE;
  DROP TABLE "_pages_v_blocks_partners_text_block" CASCADE;
  DROP TABLE "_pages_v_blocks_expandable_table_items" CASCADE;
  DROP TABLE "_pages_v_blocks_expandable_table" CASCADE;
  DROP TABLE "_pages_v_blocks_testimonials_testimonials" CASCADE;
  DROP TABLE "_pages_v_blocks_testimonials" CASCADE;
  DROP TABLE "_pages_v_blocks_team_cards_members" CASCADE;
  DROP TABLE "_pages_v_blocks_team_cards" CASCADE;
  DROP TABLE "_pages_v_blocks_scroll_post_cards_posts" CASCADE;
  DROP TABLE "_pages_v_blocks_scroll_post_cards" CASCADE;
  DROP TABLE "_pages_v_blocks_two_card_block_items_links" CASCADE;
  DROP TABLE "_pages_v_blocks_two_card_block_items" CASCADE;
  DROP TABLE "_pages_v_blocks_two_card_block" CASCADE;
  DROP TABLE "_pages_v_blocks_full_width_banner" CASCADE;
  DROP TABLE "_pages_v_blocks_parallax_hero" CASCADE;
  ALTER TABLE "pages_rels" DROP CONSTRAINT "pages_rels_pages_fk";
  
  ALTER TABLE "_pages_v_rels" DROP CONSTRAINT "_pages_v_rels_pages_fk";
  
  DROP INDEX "pages_rels_pages_id_idx";
  DROP INDEX "_pages_v_rels_pages_id_idx";
  ALTER TABLE "pages_blocks_carousel" ALTER COLUMN "slides_to_show" SET DEFAULT 3;
  ALTER TABLE "_pages_v_blocks_carousel" ALTER COLUMN "slides_to_show" SET DEFAULT 3;
  ALTER TABLE "pages_blocks_carousel_items" ADD COLUMN "href" varchar;
  ALTER TABLE "_pages_v_blocks_carousel_items" ADD COLUMN "href" varchar;
  ALTER TABLE "pages_blocks_carousel_items" DROP COLUMN "link_type";
  ALTER TABLE "pages_blocks_carousel_items" DROP COLUMN "external_href";
  ALTER TABLE "pages_blocks_carousel" DROP COLUMN "title";
  ALTER TABLE "pages_blocks_carousel" DROP COLUMN "subtitle";
  ALTER TABLE "pages_rels" DROP COLUMN "pages_id";
  ALTER TABLE "_pages_v_blocks_carousel_items" DROP COLUMN "link_type";
  ALTER TABLE "_pages_v_blocks_carousel_items" DROP COLUMN "external_href";
  ALTER TABLE "_pages_v_blocks_carousel" DROP COLUMN "title";
  ALTER TABLE "_pages_v_blocks_carousel" DROP COLUMN "subtitle";
  ALTER TABLE "_pages_v_rels" DROP COLUMN "pages_id";
  DROP TYPE "public"."enum_pages_blocks_scroll_post_cards_posts_link_type";
  DROP TYPE "public"."enum_pages_blocks_carousel_items_link_type";
  DROP TYPE "public"."enum_pages_blocks_two_card_block_items_links_variant";
  DROP TYPE "public"."enum_pages_blocks_two_card_block_items_links_link_type";
  DROP TYPE "public"."enum__pages_v_blocks_scroll_post_cards_posts_link_type";
  DROP TYPE "public"."enum__pages_v_blocks_carousel_items_link_type";
  DROP TYPE "public"."enum__pages_v_blocks_two_card_block_items_links_variant";
  DROP TYPE "public"."enum__pages_v_blocks_two_card_block_items_links_link_type";`)
}
