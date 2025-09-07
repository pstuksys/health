import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-vercel-postgres'

export async function up({ db, payload, req }: MigrateUpArgs): Promise<void> {
  await db.execute(sql`
   CREATE TYPE "public"."enum_pages_blocks_card_section_cards_link_type" AS ENUM('internal', 'external');
  CREATE TYPE "public"."enum_score_app_widget_display_mode" AS ENUM('chat', 'popup', 'slider', 'inline');
  CREATE TYPE "public"."enum_score_app_widget_icon" AS ENUM('', 'chat', 'quiz', 'help');
  CREATE TYPE "public"."enum_score_app_widget_size" AS ENUM('small', 'medium', 'full');
  CREATE TYPE "public"."enum_score_app_widget_position" AS ENUM('bottom-right', 'bottom-left', 'top-right', 'top-left');
  CREATE TYPE "public"."enum__pages_v_blocks_card_section_cards_link_type" AS ENUM('internal', 'external');
  CREATE TYPE "public"."enum__score_app_widget_v_display_mode" AS ENUM('chat', 'popup', 'slider', 'inline');
  CREATE TYPE "public"."enum__score_app_widget_v_icon" AS ENUM('', 'chat', 'quiz', 'help');
  CREATE TYPE "public"."enum__score_app_widget_v_size" AS ENUM('small', 'medium', 'full');
  CREATE TYPE "public"."enum__score_app_widget_v_position" AS ENUM('bottom-right', 'bottom-left', 'top-right', 'top-left');
  CREATE TABLE "two_blocks_text" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"left_block_subtitle" varchar,
  	"left_block_title" varchar,
  	"left_block_content" jsonb,
  	"right_block_title" varchar,
  	"right_block_content" jsonb,
  	"block_name" varchar
  );
  
  CREATE TABLE "score_app_widget" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"scorecard_url" varchar,
  	"display_mode" "enum_score_app_widget_display_mode" DEFAULT 'chat',
  	"button_text" varchar DEFAULT 'Take Quiz',
  	"button_color" varchar DEFAULT '#ffffff',
  	"icon" "enum_score_app_widget_icon" DEFAULT '',
  	"auto_open" boolean DEFAULT false,
  	"size" "enum_score_app_widget_size" DEFAULT 'medium',
  	"position" "enum_score_app_widget_position" DEFAULT 'bottom-right',
  	"preload" boolean DEFAULT false,
  	"auto_height" boolean DEFAULT true,
  	"block_name" varchar
  );
  
  CREATE TABLE "sleep_assessment_steps_steps_bullet_points" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"point" varchar
  );
  
  CREATE TABLE "sleep_assessment_steps_steps" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"number" varchar,
  	"title" varchar,
  	"description" varchar
  );
  
  CREATE TABLE "sleep_assessment_steps" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"title" varchar DEFAULT 'Unlock the secrets of your sleep in just 4 easy steps',
  	"subtitle" varchar DEFAULT 'As well as taking the assessment, it''s important you discuss your symptoms with your doctor. They can help you rule out any underlying medical conditions and recommend treatment options if you do have a sleep disorder, or suggest lifestyle changes.',
  	"block_name" varchar
  );
  
  CREATE TABLE "_two_blocks_text_v" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"left_block_subtitle" varchar,
  	"left_block_title" varchar,
  	"left_block_content" jsonb,
  	"right_block_title" varchar,
  	"right_block_content" jsonb,
  	"_uuid" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "_score_app_widget_v" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"scorecard_url" varchar,
  	"display_mode" "enum__score_app_widget_v_display_mode" DEFAULT 'chat',
  	"button_text" varchar DEFAULT 'Take Quiz',
  	"button_color" varchar DEFAULT '#ffffff',
  	"icon" "enum__score_app_widget_v_icon" DEFAULT '',
  	"auto_open" boolean DEFAULT false,
  	"size" "enum__score_app_widget_v_size" DEFAULT 'medium',
  	"position" "enum__score_app_widget_v_position" DEFAULT 'bottom-right',
  	"preload" boolean DEFAULT false,
  	"auto_height" boolean DEFAULT true,
  	"_uuid" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "_sleep_assessment_steps_v_steps_bullet_points" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"point" varchar,
  	"_uuid" varchar
  );
  
  CREATE TABLE "_sleep_assessment_steps_v_steps" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"number" varchar,
  	"title" varchar,
  	"description" varchar,
  	"_uuid" varchar
  );
  
  CREATE TABLE "_sleep_assessment_steps_v" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"title" varchar DEFAULT 'Unlock the secrets of your sleep in just 4 easy steps',
  	"subtitle" varchar DEFAULT 'As well as taking the assessment, it''s important you discuss your symptoms with your doctor. They can help you rule out any underlying medical conditions and recommend treatment options if you do have a sleep disorder, or suggest lifestyle changes.',
  	"_uuid" varchar,
  	"block_name" varchar
  );
  
  ALTER TABLE "pages_blocks_card_section" ALTER COLUMN "columns" SET DEFAULT 4;
  ALTER TABLE "_pages_v_blocks_card_section" ALTER COLUMN "columns" SET DEFAULT 4;
  ALTER TABLE "pages_blocks_card_section_cards" ADD COLUMN "link_type" "enum_pages_blocks_card_section_cards_link_type" DEFAULT 'internal';
  ALTER TABLE "pages_blocks_card_section_cards" ADD COLUMN "external_href" varchar;
  ALTER TABLE "pages_blocks_card_section_cards" ADD COLUMN "button_text" varchar DEFAULT 'Learn More';
  ALTER TABLE "pages_blocks_card_section" ADD COLUMN "title" varchar;
  ALTER TABLE "pages_blocks_card_section" ADD COLUMN "subtitle" varchar;
  ALTER TABLE "_pages_v_blocks_card_section_cards" ADD COLUMN "link_type" "enum__pages_v_blocks_card_section_cards_link_type" DEFAULT 'internal';
  ALTER TABLE "_pages_v_blocks_card_section_cards" ADD COLUMN "external_href" varchar;
  ALTER TABLE "_pages_v_blocks_card_section_cards" ADD COLUMN "button_text" varchar DEFAULT 'Learn More';
  ALTER TABLE "_pages_v_blocks_card_section" ADD COLUMN "title" varchar;
  ALTER TABLE "_pages_v_blocks_card_section" ADD COLUMN "subtitle" varchar;
  ALTER TABLE "two_blocks_text" ADD CONSTRAINT "two_blocks_text_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "score_app_widget" ADD CONSTRAINT "score_app_widget_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "sleep_assessment_steps_steps_bullet_points" ADD CONSTRAINT "sleep_assessment_steps_steps_bullet_points_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."sleep_assessment_steps_steps"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "sleep_assessment_steps_steps" ADD CONSTRAINT "sleep_assessment_steps_steps_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."sleep_assessment_steps"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "sleep_assessment_steps" ADD CONSTRAINT "sleep_assessment_steps_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_two_blocks_text_v" ADD CONSTRAINT "_two_blocks_text_v_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_score_app_widget_v" ADD CONSTRAINT "_score_app_widget_v_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_sleep_assessment_steps_v_steps_bullet_points" ADD CONSTRAINT "_sleep_assessment_steps_v_steps_bullet_points_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_sleep_assessment_steps_v_steps"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_sleep_assessment_steps_v_steps" ADD CONSTRAINT "_sleep_assessment_steps_v_steps_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_sleep_assessment_steps_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_sleep_assessment_steps_v" ADD CONSTRAINT "_sleep_assessment_steps_v_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v"("id") ON DELETE cascade ON UPDATE no action;
  CREATE INDEX "two_blocks_text_order_idx" ON "two_blocks_text" USING btree ("_order");
  CREATE INDEX "two_blocks_text_parent_id_idx" ON "two_blocks_text" USING btree ("_parent_id");
  CREATE INDEX "two_blocks_text_path_idx" ON "two_blocks_text" USING btree ("_path");
  CREATE INDEX "score_app_widget_order_idx" ON "score_app_widget" USING btree ("_order");
  CREATE INDEX "score_app_widget_parent_id_idx" ON "score_app_widget" USING btree ("_parent_id");
  CREATE INDEX "score_app_widget_path_idx" ON "score_app_widget" USING btree ("_path");
  CREATE INDEX "sleep_assessment_steps_steps_bullet_points_order_idx" ON "sleep_assessment_steps_steps_bullet_points" USING btree ("_order");
  CREATE INDEX "sleep_assessment_steps_steps_bullet_points_parent_id_idx" ON "sleep_assessment_steps_steps_bullet_points" USING btree ("_parent_id");
  CREATE INDEX "sleep_assessment_steps_steps_order_idx" ON "sleep_assessment_steps_steps" USING btree ("_order");
  CREATE INDEX "sleep_assessment_steps_steps_parent_id_idx" ON "sleep_assessment_steps_steps" USING btree ("_parent_id");
  CREATE INDEX "sleep_assessment_steps_order_idx" ON "sleep_assessment_steps" USING btree ("_order");
  CREATE INDEX "sleep_assessment_steps_parent_id_idx" ON "sleep_assessment_steps" USING btree ("_parent_id");
  CREATE INDEX "sleep_assessment_steps_path_idx" ON "sleep_assessment_steps" USING btree ("_path");
  CREATE INDEX "_two_blocks_text_v_order_idx" ON "_two_blocks_text_v" USING btree ("_order");
  CREATE INDEX "_two_blocks_text_v_parent_id_idx" ON "_two_blocks_text_v" USING btree ("_parent_id");
  CREATE INDEX "_two_blocks_text_v_path_idx" ON "_two_blocks_text_v" USING btree ("_path");
  CREATE INDEX "_score_app_widget_v_order_idx" ON "_score_app_widget_v" USING btree ("_order");
  CREATE INDEX "_score_app_widget_v_parent_id_idx" ON "_score_app_widget_v" USING btree ("_parent_id");
  CREATE INDEX "_score_app_widget_v_path_idx" ON "_score_app_widget_v" USING btree ("_path");
  CREATE INDEX "_sleep_assessment_steps_v_steps_bullet_points_order_idx" ON "_sleep_assessment_steps_v_steps_bullet_points" USING btree ("_order");
  CREATE INDEX "_sleep_assessment_steps_v_steps_bullet_points_parent_id_idx" ON "_sleep_assessment_steps_v_steps_bullet_points" USING btree ("_parent_id");
  CREATE INDEX "_sleep_assessment_steps_v_steps_order_idx" ON "_sleep_assessment_steps_v_steps" USING btree ("_order");
  CREATE INDEX "_sleep_assessment_steps_v_steps_parent_id_idx" ON "_sleep_assessment_steps_v_steps" USING btree ("_parent_id");
  CREATE INDEX "_sleep_assessment_steps_v_order_idx" ON "_sleep_assessment_steps_v" USING btree ("_order");
  CREATE INDEX "_sleep_assessment_steps_v_parent_id_idx" ON "_sleep_assessment_steps_v" USING btree ("_parent_id");
  CREATE INDEX "_sleep_assessment_steps_v_path_idx" ON "_sleep_assessment_steps_v" USING btree ("_path");
  ALTER TABLE "pages_blocks_card_section_cards" DROP COLUMN "href";
  ALTER TABLE "_pages_v_blocks_card_section_cards" DROP COLUMN "href";`)
}

export async function down({ db, payload, req }: MigrateDownArgs): Promise<void> {
  await db.execute(sql`
   ALTER TABLE "two_blocks_text" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "score_app_widget" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "sleep_assessment_steps_steps_bullet_points" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "sleep_assessment_steps_steps" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "sleep_assessment_steps" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_two_blocks_text_v" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_score_app_widget_v" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_sleep_assessment_steps_v_steps_bullet_points" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_sleep_assessment_steps_v_steps" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_sleep_assessment_steps_v" DISABLE ROW LEVEL SECURITY;
  DROP TABLE "two_blocks_text" CASCADE;
  DROP TABLE "score_app_widget" CASCADE;
  DROP TABLE "sleep_assessment_steps_steps_bullet_points" CASCADE;
  DROP TABLE "sleep_assessment_steps_steps" CASCADE;
  DROP TABLE "sleep_assessment_steps" CASCADE;
  DROP TABLE "_two_blocks_text_v" CASCADE;
  DROP TABLE "_score_app_widget_v" CASCADE;
  DROP TABLE "_sleep_assessment_steps_v_steps_bullet_points" CASCADE;
  DROP TABLE "_sleep_assessment_steps_v_steps" CASCADE;
  DROP TABLE "_sleep_assessment_steps_v" CASCADE;
  ALTER TABLE "pages_blocks_card_section" ALTER COLUMN "columns" SET DEFAULT 3;
  ALTER TABLE "_pages_v_blocks_card_section" ALTER COLUMN "columns" SET DEFAULT 3;
  ALTER TABLE "pages_blocks_card_section_cards" ADD COLUMN "href" varchar;
  ALTER TABLE "_pages_v_blocks_card_section_cards" ADD COLUMN "href" varchar;
  ALTER TABLE "pages_blocks_card_section_cards" DROP COLUMN "link_type";
  ALTER TABLE "pages_blocks_card_section_cards" DROP COLUMN "external_href";
  ALTER TABLE "pages_blocks_card_section_cards" DROP COLUMN "button_text";
  ALTER TABLE "pages_blocks_card_section" DROP COLUMN "title";
  ALTER TABLE "pages_blocks_card_section" DROP COLUMN "subtitle";
  ALTER TABLE "_pages_v_blocks_card_section_cards" DROP COLUMN "link_type";
  ALTER TABLE "_pages_v_blocks_card_section_cards" DROP COLUMN "external_href";
  ALTER TABLE "_pages_v_blocks_card_section_cards" DROP COLUMN "button_text";
  ALTER TABLE "_pages_v_blocks_card_section" DROP COLUMN "title";
  ALTER TABLE "_pages_v_blocks_card_section" DROP COLUMN "subtitle";
  DROP TYPE "public"."enum_pages_blocks_card_section_cards_link_type";
  DROP TYPE "public"."enum_score_app_widget_display_mode";
  DROP TYPE "public"."enum_score_app_widget_icon";
  DROP TYPE "public"."enum_score_app_widget_size";
  DROP TYPE "public"."enum_score_app_widget_position";
  DROP TYPE "public"."enum__pages_v_blocks_card_section_cards_link_type";
  DROP TYPE "public"."enum__score_app_widget_v_display_mode";
  DROP TYPE "public"."enum__score_app_widget_v_icon";
  DROP TYPE "public"."enum__score_app_widget_v_size";
  DROP TYPE "public"."enum__score_app_widget_v_position";`)
}
