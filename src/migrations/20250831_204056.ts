import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-vercel-postgres'

export async function up({ db, payload, req }: MigrateUpArgs): Promise<void> {
  await db.execute(sql`
   CREATE TYPE "public"."enum_pages_blocks_team_cards_members_image_position" AS ENUM('left', 'right');
  CREATE TYPE "public"."enum_pages_blocks_scrollable_cards_cards_icon" AS ENUM('Heart', 'Activity', 'Users', 'Shield', 'Star', 'CheckCircle', 'Lightbulb', 'Target', 'TrendingUp', 'Award', 'Zap', 'Leaf', 'Globe', 'Clock', 'MapPin', 'Phone', 'Mail', 'MessageCircle', 'Calendar', 'FileText');
  CREATE TYPE "public"."enum_pages_hero_c_t_a_alignment" AS ENUM('left', 'center', 'right');
  CREATE TYPE "public"."enum__pages_v_blocks_team_cards_members_image_position" AS ENUM('left', 'right');
  CREATE TYPE "public"."enum__pages_v_blocks_scrollable_cards_cards_icon" AS ENUM('Heart', 'Activity', 'Users', 'Shield', 'Star', 'CheckCircle', 'Lightbulb', 'Target', 'TrendingUp', 'Award', 'Zap', 'Leaf', 'Globe', 'Clock', 'MapPin', 'Phone', 'Mail', 'MessageCircle', 'Calendar', 'FileText');
  CREATE TYPE "public"."enum__pages_v_version_hero_c_t_a_alignment" AS ENUM('left', 'center', 'right');
  CREATE TABLE "pages_blocks_scrollable_cards_cards" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"title" varchar,
  	"icon" "enum_pages_blocks_scrollable_cards_cards_icon",
  	"content" jsonb
  );
  
  CREATE TABLE "pages_blocks_scrollable_cards" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"title" varchar,
  	"subtitle" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "_pages_v_blocks_scrollable_cards_cards" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"title" varchar,
  	"icon" "enum__pages_v_blocks_scrollable_cards_cards_icon",
  	"content" jsonb,
  	"_uuid" varchar
  );
  
  CREATE TABLE "_pages_v_blocks_scrollable_cards" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"title" varchar,
  	"subtitle" varchar,
  	"_uuid" varchar,
  	"block_name" varchar
  );
  
  ALTER TABLE "pages_blocks_team_cards" ALTER COLUMN "title" SET DEFAULT 'Meet Our Team';
  ALTER TABLE "pages_blocks_team_cards" ALTER COLUMN "subtitle" SET DEFAULT 'The talented people behind our success';
  ALTER TABLE "_pages_v_blocks_team_cards" ALTER COLUMN "title" SET DEFAULT 'Meet Our Team';
  ALTER TABLE "_pages_v_blocks_team_cards" ALTER COLUMN "subtitle" SET DEFAULT 'The talented people behind our success';
  ALTER TABLE "pages_blocks_team_cards_members" ADD COLUMN "linkedin" varchar;
  ALTER TABLE "pages_blocks_team_cards_members" ADD COLUMN "image_position" "enum_pages_blocks_team_cards_members_image_position" DEFAULT 'left';
  ALTER TABLE "pages" ADD COLUMN "hero_c_t_a_alignment" "enum_pages_hero_c_t_a_alignment" DEFAULT 'left';
  ALTER TABLE "_pages_v_blocks_team_cards_members" ADD COLUMN "linkedin" varchar;
  ALTER TABLE "_pages_v_blocks_team_cards_members" ADD COLUMN "image_position" "enum__pages_v_blocks_team_cards_members_image_position" DEFAULT 'left';
  ALTER TABLE "_pages_v" ADD COLUMN "version_hero_c_t_a_alignment" "enum__pages_v_version_hero_c_t_a_alignment" DEFAULT 'left';
  ALTER TABLE "pages_blocks_scrollable_cards_cards" ADD CONSTRAINT "pages_blocks_scrollable_cards_cards_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages_blocks_scrollable_cards"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_scrollable_cards" ADD CONSTRAINT "pages_blocks_scrollable_cards_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_scrollable_cards_cards" ADD CONSTRAINT "_pages_v_blocks_scrollable_cards_cards_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v_blocks_scrollable_cards"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_scrollable_cards" ADD CONSTRAINT "_pages_v_blocks_scrollable_cards_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v"("id") ON DELETE cascade ON UPDATE no action;
  CREATE INDEX "pages_blocks_scrollable_cards_cards_order_idx" ON "pages_blocks_scrollable_cards_cards" USING btree ("_order");
  CREATE INDEX "pages_blocks_scrollable_cards_cards_parent_id_idx" ON "pages_blocks_scrollable_cards_cards" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_scrollable_cards_order_idx" ON "pages_blocks_scrollable_cards" USING btree ("_order");
  CREATE INDEX "pages_blocks_scrollable_cards_parent_id_idx" ON "pages_blocks_scrollable_cards" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_scrollable_cards_path_idx" ON "pages_blocks_scrollable_cards" USING btree ("_path");
  CREATE INDEX "_pages_v_blocks_scrollable_cards_cards_order_idx" ON "_pages_v_blocks_scrollable_cards_cards" USING btree ("_order");
  CREATE INDEX "_pages_v_blocks_scrollable_cards_cards_parent_id_idx" ON "_pages_v_blocks_scrollable_cards_cards" USING btree ("_parent_id");
  CREATE INDEX "_pages_v_blocks_scrollable_cards_order_idx" ON "_pages_v_blocks_scrollable_cards" USING btree ("_order");
  CREATE INDEX "_pages_v_blocks_scrollable_cards_parent_id_idx" ON "_pages_v_blocks_scrollable_cards" USING btree ("_parent_id");
  CREATE INDEX "_pages_v_blocks_scrollable_cards_path_idx" ON "_pages_v_blocks_scrollable_cards" USING btree ("_path");
  ALTER TABLE "pages_blocks_team_cards_members" DROP COLUMN "link_text";
  ALTER TABLE "pages_blocks_team_cards_members" DROP COLUMN "link_href";
  ALTER TABLE "pages_blocks_team_cards" DROP COLUMN "enable_carousel";
  ALTER TABLE "_pages_v_blocks_team_cards_members" DROP COLUMN "link_text";
  ALTER TABLE "_pages_v_blocks_team_cards_members" DROP COLUMN "link_href";
  ALTER TABLE "_pages_v_blocks_team_cards" DROP COLUMN "enable_carousel";`)
}

export async function down({ db, payload, req }: MigrateDownArgs): Promise<void> {
  await db.execute(sql`
   ALTER TABLE "pages_blocks_scrollable_cards_cards" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "pages_blocks_scrollable_cards" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_pages_v_blocks_scrollable_cards_cards" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_pages_v_blocks_scrollable_cards" DISABLE ROW LEVEL SECURITY;
  DROP TABLE "pages_blocks_scrollable_cards_cards" CASCADE;
  DROP TABLE "pages_blocks_scrollable_cards" CASCADE;
  DROP TABLE "_pages_v_blocks_scrollable_cards_cards" CASCADE;
  DROP TABLE "_pages_v_blocks_scrollable_cards" CASCADE;
  ALTER TABLE "pages_blocks_team_cards" ALTER COLUMN "title" SET DEFAULT 'Our Team';
  ALTER TABLE "pages_blocks_team_cards" ALTER COLUMN "subtitle" DROP DEFAULT;
  ALTER TABLE "_pages_v_blocks_team_cards" ALTER COLUMN "title" SET DEFAULT 'Our Team';
  ALTER TABLE "_pages_v_blocks_team_cards" ALTER COLUMN "subtitle" DROP DEFAULT;
  ALTER TABLE "pages_blocks_team_cards_members" ADD COLUMN "link_text" varchar;
  ALTER TABLE "pages_blocks_team_cards_members" ADD COLUMN "link_href" varchar;
  ALTER TABLE "pages_blocks_team_cards" ADD COLUMN "enable_carousel" boolean DEFAULT false;
  ALTER TABLE "_pages_v_blocks_team_cards_members" ADD COLUMN "link_text" varchar;
  ALTER TABLE "_pages_v_blocks_team_cards_members" ADD COLUMN "link_href" varchar;
  ALTER TABLE "_pages_v_blocks_team_cards" ADD COLUMN "enable_carousel" boolean DEFAULT false;
  ALTER TABLE "pages_blocks_team_cards_members" DROP COLUMN "linkedin";
  ALTER TABLE "pages_blocks_team_cards_members" DROP COLUMN "image_position";
  ALTER TABLE "pages" DROP COLUMN "hero_c_t_a_alignment";
  ALTER TABLE "_pages_v_blocks_team_cards_members" DROP COLUMN "linkedin";
  ALTER TABLE "_pages_v_blocks_team_cards_members" DROP COLUMN "image_position";
  ALTER TABLE "_pages_v" DROP COLUMN "version_hero_c_t_a_alignment";
  DROP TYPE "public"."enum_pages_blocks_team_cards_members_image_position";
  DROP TYPE "public"."enum_pages_blocks_scrollable_cards_cards_icon";
  DROP TYPE "public"."enum_pages_hero_c_t_a_alignment";
  DROP TYPE "public"."enum__pages_v_blocks_team_cards_members_image_position";
  DROP TYPE "public"."enum__pages_v_blocks_scrollable_cards_cards_icon";
  DROP TYPE "public"."enum__pages_v_version_hero_c_t_a_alignment";`)
}
