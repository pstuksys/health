import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-vercel-postgres'

export async function up({ db, payload, req }: MigrateUpArgs): Promise<void> {
  await db.execute(sql`
   CREATE TYPE "public"."enum_icon_row_block_items_icon" AS ENUM('FileText', 'PhoneCall', 'Beaker', 'SquareActivity', 'Activity', 'Heart', 'Scan', 'Stethoscope', 'Brain', 'Moon', 'Baby', 'TrendingUp', 'HeartHandshake', 'ClipboardList', 'UserCheck', 'List', 'UserPlus', 'BriefcaseMedical', 'BarChart3', 'Building', 'Building2', 'Eye', 'Waves', 'Monitor', 'Video', 'Check', 'ShieldCheck', 'Users', 'Bed', 'Wind', 'Sunrise', 'Frown', 'Ear', 'Smile', 'MessagesSquare', 'User', 'BrainCog');
  CREATE TYPE "public"."enum_care_network_block_specialists_icon" AS ENUM('FileText', 'PhoneCall', 'Beaker', 'SquareActivity', 'Activity', 'Heart', 'Scan', 'Stethoscope', 'Brain', 'Moon', 'Baby', 'TrendingUp', 'HeartHandshake', 'ClipboardList', 'UserCheck', 'List', 'UserPlus', 'BriefcaseMedical', 'BarChart3', 'Building', 'Building2', 'Eye', 'Waves', 'Monitor', 'Video', 'Check', 'ShieldCheck', 'Users', 'Bed', 'Wind', 'Sunrise', 'Frown', 'Ear', 'Smile', 'MessagesSquare', 'User', 'BrainCog');
  CREATE TYPE "public"."enum_edu_hub_articles_topic" AS ENUM('understanding-sleep-disorders', 'diagnostics-treatment', 'specialist-insights', 'lifestyle-tips', 'featured');
  CREATE TYPE "public"."enum__icon_row_block_v_items_icon" AS ENUM('FileText', 'PhoneCall', 'Beaker', 'SquareActivity', 'Activity', 'Heart', 'Scan', 'Stethoscope', 'Brain', 'Moon', 'Baby', 'TrendingUp', 'HeartHandshake', 'ClipboardList', 'UserCheck', 'List', 'UserPlus', 'BriefcaseMedical', 'BarChart3', 'Building', 'Building2', 'Eye', 'Waves', 'Monitor', 'Video', 'Check', 'ShieldCheck', 'Users', 'Bed', 'Wind', 'Sunrise', 'Frown', 'Ear', 'Smile', 'MessagesSquare', 'User', 'BrainCog');
  CREATE TYPE "public"."enum__care_network_block_v_specialists_icon" AS ENUM('FileText', 'PhoneCall', 'Beaker', 'SquareActivity', 'Activity', 'Heart', 'Scan', 'Stethoscope', 'Brain', 'Moon', 'Baby', 'TrendingUp', 'HeartHandshake', 'ClipboardList', 'UserCheck', 'List', 'UserPlus', 'BriefcaseMedical', 'BarChart3', 'Building', 'Building2', 'Eye', 'Waves', 'Monitor', 'Video', 'Check', 'ShieldCheck', 'Users', 'Bed', 'Wind', 'Sunrise', 'Frown', 'Ear', 'Smile', 'MessagesSquare', 'User', 'BrainCog');
  CREATE TYPE "public"."enum__edu_hub_articles_v_topic" AS ENUM('understanding-sleep-disorders', 'diagnostics-treatment', 'specialist-insights', 'lifestyle-tips', 'featured');
  ALTER TYPE "public"."enum_medical_services_services_icon" ADD VALUE 'Bed';
  ALTER TYPE "public"."enum_medical_services_services_icon" ADD VALUE 'Wind';
  ALTER TYPE "public"."enum_medical_services_services_icon" ADD VALUE 'Sunrise';
  ALTER TYPE "public"."enum_medical_services_services_icon" ADD VALUE 'Frown';
  ALTER TYPE "public"."enum_medical_services_services_icon" ADD VALUE 'Ear';
  ALTER TYPE "public"."enum_medical_services_services_icon" ADD VALUE 'Smile';
  ALTER TYPE "public"."enum_medical_services_services_icon" ADD VALUE 'MessagesSquare';
  ALTER TYPE "public"."enum_medical_services_services_icon" ADD VALUE 'User';
  ALTER TYPE "public"."enum_medical_services_services_icon" ADD VALUE 'BrainCog';
  ALTER TYPE "public"."enum_split_info_grid_block_right_items_icon" ADD VALUE 'Bed';
  ALTER TYPE "public"."enum_split_info_grid_block_right_items_icon" ADD VALUE 'Wind';
  ALTER TYPE "public"."enum_split_info_grid_block_right_items_icon" ADD VALUE 'Sunrise';
  ALTER TYPE "public"."enum_split_info_grid_block_right_items_icon" ADD VALUE 'Frown';
  ALTER TYPE "public"."enum_split_info_grid_block_right_items_icon" ADD VALUE 'Ear';
  ALTER TYPE "public"."enum_split_info_grid_block_right_items_icon" ADD VALUE 'Smile';
  ALTER TYPE "public"."enum_split_info_grid_block_right_items_icon" ADD VALUE 'MessagesSquare';
  ALTER TYPE "public"."enum_split_info_grid_block_right_items_icon" ADD VALUE 'User';
  ALTER TYPE "public"."enum_split_info_grid_block_right_items_icon" ADD VALUE 'BrainCog';
  ALTER TYPE "public"."enum__medical_services_v_services_icon" ADD VALUE 'Bed';
  ALTER TYPE "public"."enum__medical_services_v_services_icon" ADD VALUE 'Wind';
  ALTER TYPE "public"."enum__medical_services_v_services_icon" ADD VALUE 'Sunrise';
  ALTER TYPE "public"."enum__medical_services_v_services_icon" ADD VALUE 'Frown';
  ALTER TYPE "public"."enum__medical_services_v_services_icon" ADD VALUE 'Ear';
  ALTER TYPE "public"."enum__medical_services_v_services_icon" ADD VALUE 'Smile';
  ALTER TYPE "public"."enum__medical_services_v_services_icon" ADD VALUE 'MessagesSquare';
  ALTER TYPE "public"."enum__medical_services_v_services_icon" ADD VALUE 'User';
  ALTER TYPE "public"."enum__medical_services_v_services_icon" ADD VALUE 'BrainCog';
  ALTER TYPE "public"."enum__split_info_grid_block_v_right_items_icon" ADD VALUE 'Bed';
  ALTER TYPE "public"."enum__split_info_grid_block_v_right_items_icon" ADD VALUE 'Wind';
  ALTER TYPE "public"."enum__split_info_grid_block_v_right_items_icon" ADD VALUE 'Sunrise';
  ALTER TYPE "public"."enum__split_info_grid_block_v_right_items_icon" ADD VALUE 'Frown';
  ALTER TYPE "public"."enum__split_info_grid_block_v_right_items_icon" ADD VALUE 'Ear';
  ALTER TYPE "public"."enum__split_info_grid_block_v_right_items_icon" ADD VALUE 'Smile';
  ALTER TYPE "public"."enum__split_info_grid_block_v_right_items_icon" ADD VALUE 'MessagesSquare';
  ALTER TYPE "public"."enum__split_info_grid_block_v_right_items_icon" ADD VALUE 'User';
  ALTER TYPE "public"."enum__split_info_grid_block_v_right_items_icon" ADD VALUE 'BrainCog';
  ALTER TYPE "public"."enum_education_hub_trust_pillars_icon" ADD VALUE 'Bed';
  ALTER TYPE "public"."enum_education_hub_trust_pillars_icon" ADD VALUE 'Wind';
  ALTER TYPE "public"."enum_education_hub_trust_pillars_icon" ADD VALUE 'Sunrise';
  ALTER TYPE "public"."enum_education_hub_trust_pillars_icon" ADD VALUE 'Frown';
  ALTER TYPE "public"."enum_education_hub_trust_pillars_icon" ADD VALUE 'Ear';
  ALTER TYPE "public"."enum_education_hub_trust_pillars_icon" ADD VALUE 'Smile';
  ALTER TYPE "public"."enum_education_hub_trust_pillars_icon" ADD VALUE 'MessagesSquare';
  ALTER TYPE "public"."enum_education_hub_trust_pillars_icon" ADD VALUE 'User';
  ALTER TYPE "public"."enum_education_hub_trust_pillars_icon" ADD VALUE 'BrainCog';
  CREATE TABLE "icon_row_block_items" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"title" varchar,
  	"description" varchar,
  	"icon" "enum_icon_row_block_items_icon" DEFAULT 'FileText'
  );
  
  CREATE TABLE "icon_row_block" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"title" varchar DEFAULT 'Common symptoms',
  	"description" varchar,
  	"show_steps" boolean DEFAULT false,
  	"block_name" varchar
  );
  
  CREATE TABLE "care_network_block_specialists" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"label" varchar,
  	"icon" "enum_care_network_block_specialists_icon" DEFAULT 'FileText'
  );
  
  CREATE TABLE "care_network_block" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"title" varchar DEFAULT 'A multidisciplinary approach to your care',
  	"description" varchar DEFAULT 'We work with a trusted network of specialists, including:',
  	"center_label" varchar DEFAULT 'You',
  	"block_name" varchar
  );
  
  CREATE TABLE "edu_hub_articles" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"title" varchar DEFAULT 'Sleep Education Hub',
  	"subtitle" varchar DEFAULT 'Expert insights, practical advice and the latest in sleep health from our specialist team.',
  	"topic" "enum_edu_hub_articles_topic" DEFAULT 'specialist-insights',
  	"limit" numeric DEFAULT 6,
  	"link_label" varchar DEFAULT 'Explore the Sleep Education Hub',
  	"block_name" varchar
  );
  
  CREATE TABLE "_icon_row_block_v_items" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"title" varchar,
  	"description" varchar,
  	"icon" "enum__icon_row_block_v_items_icon" DEFAULT 'FileText',
  	"_uuid" varchar
  );
  
  CREATE TABLE "_icon_row_block_v" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"title" varchar DEFAULT 'Common symptoms',
  	"description" varchar,
  	"show_steps" boolean DEFAULT false,
  	"_uuid" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "_care_network_block_v_specialists" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"label" varchar,
  	"icon" "enum__care_network_block_v_specialists_icon" DEFAULT 'FileText',
  	"_uuid" varchar
  );
  
  CREATE TABLE "_care_network_block_v" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"title" varchar DEFAULT 'A multidisciplinary approach to your care',
  	"description" varchar DEFAULT 'We work with a trusted network of specialists, including:',
  	"center_label" varchar DEFAULT 'You',
  	"_uuid" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "_edu_hub_articles_v" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"title" varchar DEFAULT 'Sleep Education Hub',
  	"subtitle" varchar DEFAULT 'Expert insights, practical advice and the latest in sleep health from our specialist team.',
  	"topic" "enum__edu_hub_articles_v_topic" DEFAULT 'specialist-insights',
  	"limit" numeric DEFAULT 6,
  	"link_label" varchar DEFAULT 'Explore the Sleep Education Hub',
  	"_uuid" varchar,
  	"block_name" varchar
  );
  
  ALTER TABLE "icon_row_block_items" ADD CONSTRAINT "icon_row_block_items_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."icon_row_block"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "icon_row_block" ADD CONSTRAINT "icon_row_block_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "care_network_block_specialists" ADD CONSTRAINT "care_network_block_specialists_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."care_network_block"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "care_network_block" ADD CONSTRAINT "care_network_block_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "edu_hub_articles" ADD CONSTRAINT "edu_hub_articles_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_icon_row_block_v_items" ADD CONSTRAINT "_icon_row_block_v_items_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_icon_row_block_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_icon_row_block_v" ADD CONSTRAINT "_icon_row_block_v_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_care_network_block_v_specialists" ADD CONSTRAINT "_care_network_block_v_specialists_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_care_network_block_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_care_network_block_v" ADD CONSTRAINT "_care_network_block_v_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_edu_hub_articles_v" ADD CONSTRAINT "_edu_hub_articles_v_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v"("id") ON DELETE cascade ON UPDATE no action;
  CREATE INDEX "icon_row_block_items_order_idx" ON "icon_row_block_items" USING btree ("_order");
  CREATE INDEX "icon_row_block_items_parent_id_idx" ON "icon_row_block_items" USING btree ("_parent_id");
  CREATE INDEX "icon_row_block_order_idx" ON "icon_row_block" USING btree ("_order");
  CREATE INDEX "icon_row_block_parent_id_idx" ON "icon_row_block" USING btree ("_parent_id");
  CREATE INDEX "icon_row_block_path_idx" ON "icon_row_block" USING btree ("_path");
  CREATE INDEX "care_network_block_specialists_order_idx" ON "care_network_block_specialists" USING btree ("_order");
  CREATE INDEX "care_network_block_specialists_parent_id_idx" ON "care_network_block_specialists" USING btree ("_parent_id");
  CREATE INDEX "care_network_block_order_idx" ON "care_network_block" USING btree ("_order");
  CREATE INDEX "care_network_block_parent_id_idx" ON "care_network_block" USING btree ("_parent_id");
  CREATE INDEX "care_network_block_path_idx" ON "care_network_block" USING btree ("_path");
  CREATE INDEX "edu_hub_articles_order_idx" ON "edu_hub_articles" USING btree ("_order");
  CREATE INDEX "edu_hub_articles_parent_id_idx" ON "edu_hub_articles" USING btree ("_parent_id");
  CREATE INDEX "edu_hub_articles_path_idx" ON "edu_hub_articles" USING btree ("_path");
  CREATE INDEX "_icon_row_block_v_items_order_idx" ON "_icon_row_block_v_items" USING btree ("_order");
  CREATE INDEX "_icon_row_block_v_items_parent_id_idx" ON "_icon_row_block_v_items" USING btree ("_parent_id");
  CREATE INDEX "_icon_row_block_v_order_idx" ON "_icon_row_block_v" USING btree ("_order");
  CREATE INDEX "_icon_row_block_v_parent_id_idx" ON "_icon_row_block_v" USING btree ("_parent_id");
  CREATE INDEX "_icon_row_block_v_path_idx" ON "_icon_row_block_v" USING btree ("_path");
  CREATE INDEX "_care_network_block_v_specialists_order_idx" ON "_care_network_block_v_specialists" USING btree ("_order");
  CREATE INDEX "_care_network_block_v_specialists_parent_id_idx" ON "_care_network_block_v_specialists" USING btree ("_parent_id");
  CREATE INDEX "_care_network_block_v_order_idx" ON "_care_network_block_v" USING btree ("_order");
  CREATE INDEX "_care_network_block_v_parent_id_idx" ON "_care_network_block_v" USING btree ("_parent_id");
  CREATE INDEX "_care_network_block_v_path_idx" ON "_care_network_block_v" USING btree ("_path");
  CREATE INDEX "_edu_hub_articles_v_order_idx" ON "_edu_hub_articles_v" USING btree ("_order");
  CREATE INDEX "_edu_hub_articles_v_parent_id_idx" ON "_edu_hub_articles_v" USING btree ("_parent_id");
  CREATE INDEX "_edu_hub_articles_v_path_idx" ON "_edu_hub_articles_v" USING btree ("_path");`)
}

export async function down({ db, payload, req }: MigrateDownArgs): Promise<void> {
  await db.execute(sql`
   DROP TABLE "icon_row_block_items" CASCADE;
  DROP TABLE "icon_row_block" CASCADE;
  DROP TABLE "care_network_block_specialists" CASCADE;
  DROP TABLE "care_network_block" CASCADE;
  DROP TABLE "edu_hub_articles" CASCADE;
  DROP TABLE "_icon_row_block_v_items" CASCADE;
  DROP TABLE "_icon_row_block_v" CASCADE;
  DROP TABLE "_care_network_block_v_specialists" CASCADE;
  DROP TABLE "_care_network_block_v" CASCADE;
  DROP TABLE "_edu_hub_articles_v" CASCADE;
  ALTER TABLE "medical_services_services" ALTER COLUMN "icon" SET DATA TYPE text;
  ALTER TABLE "medical_services_services" ALTER COLUMN "icon" SET DEFAULT 'FileText'::text;
  DROP TYPE "public"."enum_medical_services_services_icon";
  CREATE TYPE "public"."enum_medical_services_services_icon" AS ENUM('FileText', 'PhoneCall', 'Beaker', 'SquareActivity', 'Activity', 'Heart', 'Scan', 'Stethoscope', 'Brain', 'Moon', 'Baby', 'TrendingUp', 'HeartHandshake', 'ClipboardList', 'UserCheck', 'List', 'UserPlus', 'BriefcaseMedical', 'BarChart3', 'Building', 'Building2', 'Eye', 'Waves', 'Monitor', 'Video', 'Check', 'ShieldCheck', 'Users');
  ALTER TABLE "medical_services_services" ALTER COLUMN "icon" SET DEFAULT 'FileText'::"public"."enum_medical_services_services_icon";
  ALTER TABLE "medical_services_services" ALTER COLUMN "icon" SET DATA TYPE "public"."enum_medical_services_services_icon" USING "icon"::"public"."enum_medical_services_services_icon";
  ALTER TABLE "split_info_grid_block_right_items" ALTER COLUMN "icon" SET DATA TYPE text;
  ALTER TABLE "split_info_grid_block_right_items" ALTER COLUMN "icon" SET DEFAULT 'FileText'::text;
  DROP TYPE "public"."enum_split_info_grid_block_right_items_icon";
  CREATE TYPE "public"."enum_split_info_grid_block_right_items_icon" AS ENUM('FileText', 'PhoneCall', 'Beaker', 'SquareActivity', 'Activity', 'Heart', 'Scan', 'Stethoscope', 'Brain', 'Moon', 'Baby', 'TrendingUp', 'HeartHandshake', 'ClipboardList', 'UserCheck', 'List', 'UserPlus', 'BriefcaseMedical', 'BarChart3', 'Building', 'Building2', 'Eye', 'Waves', 'Monitor', 'Video', 'Check', 'ShieldCheck', 'Users');
  ALTER TABLE "split_info_grid_block_right_items" ALTER COLUMN "icon" SET DEFAULT 'FileText'::"public"."enum_split_info_grid_block_right_items_icon";
  ALTER TABLE "split_info_grid_block_right_items" ALTER COLUMN "icon" SET DATA TYPE "public"."enum_split_info_grid_block_right_items_icon" USING "icon"::"public"."enum_split_info_grid_block_right_items_icon";
  ALTER TABLE "_medical_services_v_services" ALTER COLUMN "icon" SET DATA TYPE text;
  ALTER TABLE "_medical_services_v_services" ALTER COLUMN "icon" SET DEFAULT 'FileText'::text;
  DROP TYPE "public"."enum__medical_services_v_services_icon";
  CREATE TYPE "public"."enum__medical_services_v_services_icon" AS ENUM('FileText', 'PhoneCall', 'Beaker', 'SquareActivity', 'Activity', 'Heart', 'Scan', 'Stethoscope', 'Brain', 'Moon', 'Baby', 'TrendingUp', 'HeartHandshake', 'ClipboardList', 'UserCheck', 'List', 'UserPlus', 'BriefcaseMedical', 'BarChart3', 'Building', 'Building2', 'Eye', 'Waves', 'Monitor', 'Video', 'Check', 'ShieldCheck', 'Users');
  ALTER TABLE "_medical_services_v_services" ALTER COLUMN "icon" SET DEFAULT 'FileText'::"public"."enum__medical_services_v_services_icon";
  ALTER TABLE "_medical_services_v_services" ALTER COLUMN "icon" SET DATA TYPE "public"."enum__medical_services_v_services_icon" USING "icon"::"public"."enum__medical_services_v_services_icon";
  ALTER TABLE "_split_info_grid_block_v_right_items" ALTER COLUMN "icon" SET DATA TYPE text;
  ALTER TABLE "_split_info_grid_block_v_right_items" ALTER COLUMN "icon" SET DEFAULT 'FileText'::text;
  DROP TYPE "public"."enum__split_info_grid_block_v_right_items_icon";
  CREATE TYPE "public"."enum__split_info_grid_block_v_right_items_icon" AS ENUM('FileText', 'PhoneCall', 'Beaker', 'SquareActivity', 'Activity', 'Heart', 'Scan', 'Stethoscope', 'Brain', 'Moon', 'Baby', 'TrendingUp', 'HeartHandshake', 'ClipboardList', 'UserCheck', 'List', 'UserPlus', 'BriefcaseMedical', 'BarChart3', 'Building', 'Building2', 'Eye', 'Waves', 'Monitor', 'Video', 'Check', 'ShieldCheck', 'Users');
  ALTER TABLE "_split_info_grid_block_v_right_items" ALTER COLUMN "icon" SET DEFAULT 'FileText'::"public"."enum__split_info_grid_block_v_right_items_icon";
  ALTER TABLE "_split_info_grid_block_v_right_items" ALTER COLUMN "icon" SET DATA TYPE "public"."enum__split_info_grid_block_v_right_items_icon" USING "icon"::"public"."enum__split_info_grid_block_v_right_items_icon";
  ALTER TABLE "education_hub_trust_pillars" ALTER COLUMN "icon" SET DATA TYPE text;
  ALTER TABLE "education_hub_trust_pillars" ALTER COLUMN "icon" SET DEFAULT 'FileText'::text;
  DROP TYPE "public"."enum_education_hub_trust_pillars_icon";
  CREATE TYPE "public"."enum_education_hub_trust_pillars_icon" AS ENUM('FileText', 'PhoneCall', 'Beaker', 'SquareActivity', 'Activity', 'Heart', 'Scan', 'Stethoscope', 'Brain', 'Moon', 'Baby', 'TrendingUp', 'HeartHandshake', 'ClipboardList', 'UserCheck', 'List', 'UserPlus', 'BriefcaseMedical', 'BarChart3', 'Building', 'Building2', 'Eye', 'Waves', 'Monitor', 'Video', 'Check', 'ShieldCheck', 'Users');
  ALTER TABLE "education_hub_trust_pillars" ALTER COLUMN "icon" SET DEFAULT 'FileText'::"public"."enum_education_hub_trust_pillars_icon";
  ALTER TABLE "education_hub_trust_pillars" ALTER COLUMN "icon" SET DATA TYPE "public"."enum_education_hub_trust_pillars_icon" USING "icon"::"public"."enum_education_hub_trust_pillars_icon";
  DROP TYPE "public"."enum_icon_row_block_items_icon";
  DROP TYPE "public"."enum_care_network_block_specialists_icon";
  DROP TYPE "public"."enum_edu_hub_articles_topic";
  DROP TYPE "public"."enum__icon_row_block_v_items_icon";
  DROP TYPE "public"."enum__care_network_block_v_specialists_icon";
  DROP TYPE "public"."enum__edu_hub_articles_v_topic";`)
}
