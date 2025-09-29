import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-vercel-postgres'

export async function up({ db, payload, req }: MigrateUpArgs): Promise<void> {
  await db.execute(sql`
   CREATE TYPE "public"."enum_split_info_grid_block_right_items_icon" AS ENUM('FileText', 'PhoneCall', 'Beaker', 'SquareActivity', 'Activity', 'Heart', 'Scan', 'Stethoscope', 'Brain', 'Moon', 'Baby', 'TrendingUp', 'HeartHandshake', 'ClipboardList', 'UserCheck', 'List', 'UserPlus', 'BriefcaseMedical', 'BarChart3', 'Building', 'Building2', 'Eye', 'Waves', 'Monitor', 'Video');
  CREATE TYPE "public"."enum__split_info_grid_block_v_right_items_icon" AS ENUM('FileText', 'PhoneCall', 'Beaker', 'SquareActivity', 'Activity', 'Heart', 'Scan', 'Stethoscope', 'Brain', 'Moon', 'Baby', 'TrendingUp', 'HeartHandshake', 'ClipboardList', 'UserCheck', 'List', 'UserPlus', 'BriefcaseMedical', 'BarChart3', 'Building', 'Building2', 'Eye', 'Waves', 'Monitor', 'Video');
  ALTER TYPE "public"."enum_medical_services_services_icon" ADD VALUE 'Eye';
  ALTER TYPE "public"."enum_medical_services_services_icon" ADD VALUE 'Waves';
  ALTER TYPE "public"."enum_medical_services_services_icon" ADD VALUE 'Monitor';
  ALTER TYPE "public"."enum_medical_services_services_icon" ADD VALUE 'Video';
  ALTER TYPE "public"."enum_sleep_assessment_steps_steps_icon" ADD VALUE 'Eye';
  ALTER TYPE "public"."enum_sleep_assessment_steps_steps_icon" ADD VALUE 'Waves';
  ALTER TYPE "public"."enum_sleep_assessment_steps_steps_icon" ADD VALUE 'Monitor';
  ALTER TYPE "public"."enum_sleep_assessment_steps_steps_icon" ADD VALUE 'Video';
  ALTER TYPE "public"."enum__medical_services_v_services_icon" ADD VALUE 'Eye';
  ALTER TYPE "public"."enum__medical_services_v_services_icon" ADD VALUE 'Waves';
  ALTER TYPE "public"."enum__medical_services_v_services_icon" ADD VALUE 'Monitor';
  ALTER TYPE "public"."enum__medical_services_v_services_icon" ADD VALUE 'Video';
  ALTER TYPE "public"."enum__sleep_assessment_steps_v_steps_icon" ADD VALUE 'Eye';
  ALTER TYPE "public"."enum__sleep_assessment_steps_v_steps_icon" ADD VALUE 'Waves';
  ALTER TYPE "public"."enum__sleep_assessment_steps_v_steps_icon" ADD VALUE 'Monitor';
  ALTER TYPE "public"."enum__sleep_assessment_steps_v_steps_icon" ADD VALUE 'Video';
  CREATE TABLE "split_info_grid_block_right_items" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"label" varchar,
  	"icon" "enum_split_info_grid_block_right_items_icon" DEFAULT 'FileText'
  );
  
  CREATE TABLE "split_info_grid_block" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"left_title" varchar DEFAULT 'What Is This Section?',
  	"left_rich_text" jsonb,
  	"block_name" varchar
  );
  
  CREATE TABLE "split_info_list_block_list_items" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"text" varchar
  );
  
  CREATE TABLE "split_info_list_block" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"left_title" varchar DEFAULT 'When Is This Recommended?',
  	"left_rich_text" jsonb,
  	"block_name" varchar
  );
  
  CREATE TABLE "card_list_banner_block_items" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"text" varchar
  );
  
  CREATE TABLE "card_list_banner_block" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"title" varchar DEFAULT 'Who Should Be Referred?',
  	"intro_rich_text" jsonb,
  	"conclusion_rich_text" jsonb,
  	"block_name" varchar
  );
  
  CREATE TABLE "card_banner_block" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"title" varchar DEFAULT 'IPD Advantage',
  	"rich_text" jsonb,
  	"block_name" varchar
  );
  
  CREATE TABLE "_split_info_grid_block_v_right_items" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"label" varchar,
  	"icon" "enum__split_info_grid_block_v_right_items_icon" DEFAULT 'FileText',
  	"_uuid" varchar
  );
  
  CREATE TABLE "_split_info_grid_block_v" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"left_title" varchar DEFAULT 'What Is This Section?',
  	"left_rich_text" jsonb,
  	"_uuid" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "_split_info_list_block_v_list_items" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"text" varchar,
  	"_uuid" varchar
  );
  
  CREATE TABLE "_split_info_list_block_v" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"left_title" varchar DEFAULT 'When Is This Recommended?',
  	"left_rich_text" jsonb,
  	"_uuid" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "_card_list_banner_block_v_items" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"text" varchar,
  	"_uuid" varchar
  );
  
  CREATE TABLE "_card_list_banner_block_v" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"title" varchar DEFAULT 'Who Should Be Referred?',
  	"intro_rich_text" jsonb,
  	"conclusion_rich_text" jsonb,
  	"_uuid" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "_card_banner_block_v" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"title" varchar DEFAULT 'IPD Advantage',
  	"rich_text" jsonb,
  	"_uuid" varchar,
  	"block_name" varchar
  );
  
  ALTER TABLE "split_info_grid_block_right_items" ADD CONSTRAINT "split_info_grid_block_right_items_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."split_info_grid_block"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "split_info_grid_block" ADD CONSTRAINT "split_info_grid_block_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "split_info_list_block_list_items" ADD CONSTRAINT "split_info_list_block_list_items_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."split_info_list_block"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "split_info_list_block" ADD CONSTRAINT "split_info_list_block_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "card_list_banner_block_items" ADD CONSTRAINT "card_list_banner_block_items_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."card_list_banner_block"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "card_list_banner_block" ADD CONSTRAINT "card_list_banner_block_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "card_banner_block" ADD CONSTRAINT "card_banner_block_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_split_info_grid_block_v_right_items" ADD CONSTRAINT "_split_info_grid_block_v_right_items_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_split_info_grid_block_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_split_info_grid_block_v" ADD CONSTRAINT "_split_info_grid_block_v_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_split_info_list_block_v_list_items" ADD CONSTRAINT "_split_info_list_block_v_list_items_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_split_info_list_block_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_split_info_list_block_v" ADD CONSTRAINT "_split_info_list_block_v_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_card_list_banner_block_v_items" ADD CONSTRAINT "_card_list_banner_block_v_items_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_card_list_banner_block_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_card_list_banner_block_v" ADD CONSTRAINT "_card_list_banner_block_v_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_card_banner_block_v" ADD CONSTRAINT "_card_banner_block_v_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v"("id") ON DELETE cascade ON UPDATE no action;
  CREATE INDEX "split_info_grid_block_right_items_order_idx" ON "split_info_grid_block_right_items" USING btree ("_order");
  CREATE INDEX "split_info_grid_block_right_items_parent_id_idx" ON "split_info_grid_block_right_items" USING btree ("_parent_id");
  CREATE INDEX "split_info_grid_block_order_idx" ON "split_info_grid_block" USING btree ("_order");
  CREATE INDEX "split_info_grid_block_parent_id_idx" ON "split_info_grid_block" USING btree ("_parent_id");
  CREATE INDEX "split_info_grid_block_path_idx" ON "split_info_grid_block" USING btree ("_path");
  CREATE INDEX "split_info_list_block_list_items_order_idx" ON "split_info_list_block_list_items" USING btree ("_order");
  CREATE INDEX "split_info_list_block_list_items_parent_id_idx" ON "split_info_list_block_list_items" USING btree ("_parent_id");
  CREATE INDEX "split_info_list_block_order_idx" ON "split_info_list_block" USING btree ("_order");
  CREATE INDEX "split_info_list_block_parent_id_idx" ON "split_info_list_block" USING btree ("_parent_id");
  CREATE INDEX "split_info_list_block_path_idx" ON "split_info_list_block" USING btree ("_path");
  CREATE INDEX "card_list_banner_block_items_order_idx" ON "card_list_banner_block_items" USING btree ("_order");
  CREATE INDEX "card_list_banner_block_items_parent_id_idx" ON "card_list_banner_block_items" USING btree ("_parent_id");
  CREATE INDEX "card_list_banner_block_order_idx" ON "card_list_banner_block" USING btree ("_order");
  CREATE INDEX "card_list_banner_block_parent_id_idx" ON "card_list_banner_block" USING btree ("_parent_id");
  CREATE INDEX "card_list_banner_block_path_idx" ON "card_list_banner_block" USING btree ("_path");
  CREATE INDEX "card_banner_block_order_idx" ON "card_banner_block" USING btree ("_order");
  CREATE INDEX "card_banner_block_parent_id_idx" ON "card_banner_block" USING btree ("_parent_id");
  CREATE INDEX "card_banner_block_path_idx" ON "card_banner_block" USING btree ("_path");
  CREATE INDEX "_split_info_grid_block_v_right_items_order_idx" ON "_split_info_grid_block_v_right_items" USING btree ("_order");
  CREATE INDEX "_split_info_grid_block_v_right_items_parent_id_idx" ON "_split_info_grid_block_v_right_items" USING btree ("_parent_id");
  CREATE INDEX "_split_info_grid_block_v_order_idx" ON "_split_info_grid_block_v" USING btree ("_order");
  CREATE INDEX "_split_info_grid_block_v_parent_id_idx" ON "_split_info_grid_block_v" USING btree ("_parent_id");
  CREATE INDEX "_split_info_grid_block_v_path_idx" ON "_split_info_grid_block_v" USING btree ("_path");
  CREATE INDEX "_split_info_list_block_v_list_items_order_idx" ON "_split_info_list_block_v_list_items" USING btree ("_order");
  CREATE INDEX "_split_info_list_block_v_list_items_parent_id_idx" ON "_split_info_list_block_v_list_items" USING btree ("_parent_id");
  CREATE INDEX "_split_info_list_block_v_order_idx" ON "_split_info_list_block_v" USING btree ("_order");
  CREATE INDEX "_split_info_list_block_v_parent_id_idx" ON "_split_info_list_block_v" USING btree ("_parent_id");
  CREATE INDEX "_split_info_list_block_v_path_idx" ON "_split_info_list_block_v" USING btree ("_path");
  CREATE INDEX "_card_list_banner_block_v_items_order_idx" ON "_card_list_banner_block_v_items" USING btree ("_order");
  CREATE INDEX "_card_list_banner_block_v_items_parent_id_idx" ON "_card_list_banner_block_v_items" USING btree ("_parent_id");
  CREATE INDEX "_card_list_banner_block_v_order_idx" ON "_card_list_banner_block_v" USING btree ("_order");
  CREATE INDEX "_card_list_banner_block_v_parent_id_idx" ON "_card_list_banner_block_v" USING btree ("_parent_id");
  CREATE INDEX "_card_list_banner_block_v_path_idx" ON "_card_list_banner_block_v" USING btree ("_path");
  CREATE INDEX "_card_banner_block_v_order_idx" ON "_card_banner_block_v" USING btree ("_order");
  CREATE INDEX "_card_banner_block_v_parent_id_idx" ON "_card_banner_block_v" USING btree ("_parent_id");
  CREATE INDEX "_card_banner_block_v_path_idx" ON "_card_banner_block_v" USING btree ("_path");`)
}

export async function down({ db, payload, req }: MigrateDownArgs): Promise<void> {
  await db.execute(sql`
   DROP TABLE "split_info_grid_block_right_items" CASCADE;
  DROP TABLE "split_info_grid_block" CASCADE;
  DROP TABLE "split_info_list_block_list_items" CASCADE;
  DROP TABLE "split_info_list_block" CASCADE;
  DROP TABLE "card_list_banner_block_items" CASCADE;
  DROP TABLE "card_list_banner_block" CASCADE;
  DROP TABLE "card_banner_block" CASCADE;
  DROP TABLE "_split_info_grid_block_v_right_items" CASCADE;
  DROP TABLE "_split_info_grid_block_v" CASCADE;
  DROP TABLE "_split_info_list_block_v_list_items" CASCADE;
  DROP TABLE "_split_info_list_block_v" CASCADE;
  DROP TABLE "_card_list_banner_block_v_items" CASCADE;
  DROP TABLE "_card_list_banner_block_v" CASCADE;
  DROP TABLE "_card_banner_block_v" CASCADE;
  ALTER TABLE "medical_services_services" ALTER COLUMN "icon" SET DATA TYPE text;
  ALTER TABLE "medical_services_services" ALTER COLUMN "icon" SET DEFAULT 'FileText'::text;
  DROP TYPE "public"."enum_medical_services_services_icon";
  CREATE TYPE "public"."enum_medical_services_services_icon" AS ENUM('FileText', 'PhoneCall', 'Beaker', 'SquareActivity', 'Activity', 'Heart', 'Scan', 'Stethoscope', 'Brain', 'Moon', 'Baby', 'TrendingUp', 'HeartHandshake', 'ClipboardList', 'UserCheck', 'List', 'UserPlus', 'BriefcaseMedical', 'BarChart3', 'Building', 'Building2');
  ALTER TABLE "medical_services_services" ALTER COLUMN "icon" SET DEFAULT 'FileText'::"public"."enum_medical_services_services_icon";
  ALTER TABLE "medical_services_services" ALTER COLUMN "icon" SET DATA TYPE "public"."enum_medical_services_services_icon" USING "icon"::"public"."enum_medical_services_services_icon";
  ALTER TABLE "sleep_assessment_steps_steps" ALTER COLUMN "icon" SET DATA TYPE text;
  ALTER TABLE "sleep_assessment_steps_steps" ALTER COLUMN "icon" SET DEFAULT 'FileText'::text;
  DROP TYPE "public"."enum_sleep_assessment_steps_steps_icon";
  CREATE TYPE "public"."enum_sleep_assessment_steps_steps_icon" AS ENUM('FileText', 'PhoneCall', 'Beaker', 'SquareActivity', 'Activity', 'Heart', 'Scan', 'Stethoscope', 'Brain', 'Moon', 'Baby', 'TrendingUp', 'HeartHandshake', 'ClipboardList', 'UserCheck', 'List', 'UserPlus', 'BriefcaseMedical', 'BarChart3', 'Building', 'Building2');
  ALTER TABLE "sleep_assessment_steps_steps" ALTER COLUMN "icon" SET DEFAULT 'FileText'::"public"."enum_sleep_assessment_steps_steps_icon";
  ALTER TABLE "sleep_assessment_steps_steps" ALTER COLUMN "icon" SET DATA TYPE "public"."enum_sleep_assessment_steps_steps_icon" USING "icon"::"public"."enum_sleep_assessment_steps_steps_icon";
  ALTER TABLE "_medical_services_v_services" ALTER COLUMN "icon" SET DATA TYPE text;
  ALTER TABLE "_medical_services_v_services" ALTER COLUMN "icon" SET DEFAULT 'FileText'::text;
  DROP TYPE "public"."enum__medical_services_v_services_icon";
  CREATE TYPE "public"."enum__medical_services_v_services_icon" AS ENUM('FileText', 'PhoneCall', 'Beaker', 'SquareActivity', 'Activity', 'Heart', 'Scan', 'Stethoscope', 'Brain', 'Moon', 'Baby', 'TrendingUp', 'HeartHandshake', 'ClipboardList', 'UserCheck', 'List', 'UserPlus', 'BriefcaseMedical', 'BarChart3', 'Building', 'Building2');
  ALTER TABLE "_medical_services_v_services" ALTER COLUMN "icon" SET DEFAULT 'FileText'::"public"."enum__medical_services_v_services_icon";
  ALTER TABLE "_medical_services_v_services" ALTER COLUMN "icon" SET DATA TYPE "public"."enum__medical_services_v_services_icon" USING "icon"::"public"."enum__medical_services_v_services_icon";
  ALTER TABLE "_sleep_assessment_steps_v_steps" ALTER COLUMN "icon" SET DATA TYPE text;
  ALTER TABLE "_sleep_assessment_steps_v_steps" ALTER COLUMN "icon" SET DEFAULT 'FileText'::text;
  DROP TYPE "public"."enum__sleep_assessment_steps_v_steps_icon";
  CREATE TYPE "public"."enum__sleep_assessment_steps_v_steps_icon" AS ENUM('FileText', 'PhoneCall', 'Beaker', 'SquareActivity', 'Activity', 'Heart', 'Scan', 'Stethoscope', 'Brain', 'Moon', 'Baby', 'TrendingUp', 'HeartHandshake', 'ClipboardList', 'UserCheck', 'List', 'UserPlus', 'BriefcaseMedical', 'BarChart3', 'Building', 'Building2');
  ALTER TABLE "_sleep_assessment_steps_v_steps" ALTER COLUMN "icon" SET DEFAULT 'FileText'::"public"."enum__sleep_assessment_steps_v_steps_icon";
  ALTER TABLE "_sleep_assessment_steps_v_steps" ALTER COLUMN "icon" SET DATA TYPE "public"."enum__sleep_assessment_steps_v_steps_icon" USING "icon"::"public"."enum__sleep_assessment_steps_v_steps_icon";
  DROP TYPE "public"."enum_split_info_grid_block_right_items_icon";
  DROP TYPE "public"."enum__split_info_grid_block_v_right_items_icon";`)
}
