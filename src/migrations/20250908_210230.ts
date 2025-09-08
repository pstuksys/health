import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-vercel-postgres'

export async function up({ db, payload, req }: MigrateUpArgs): Promise<void> {
  await db.execute(sql`
   CREATE TYPE "public"."enum_sleep_assessment_steps_steps_link_type" AS ENUM('internal', 'external');
  CREATE TYPE "public"."enum_sleep_assessment_steps_steps_icon" AS ENUM('FileText', 'PhoneCall', 'Beaker', 'SquareActivity');
  CREATE TYPE "public"."enum_sleep_assessment_steps_main_button_link_type" AS ENUM('internal', 'external');
  CREATE TYPE "public"."enum_sleep_assessment_features_features_icon" AS ENUM('Clock', 'Shield', 'CheckCircle', 'Users', 'FileText', 'PhoneCall', 'Beaker', 'SquareActivity');
  CREATE TYPE "public"."enum_sleep_assessment_features_cta_button_link_type" AS ENUM('internal', 'external');
  CREATE TYPE "public"."enum__sleep_assessment_steps_v_steps_link_type" AS ENUM('internal', 'external');
  CREATE TYPE "public"."enum__sleep_assessment_steps_v_steps_icon" AS ENUM('FileText', 'PhoneCall', 'Beaker', 'SquareActivity');
  CREATE TYPE "public"."enum__sleep_assessment_steps_v_main_button_link_type" AS ENUM('internal', 'external');
  CREATE TYPE "public"."enum__sleep_assessment_features_v_features_icon" AS ENUM('Clock', 'Shield', 'CheckCircle', 'Users', 'FileText', 'PhoneCall', 'Beaker', 'SquareActivity');
  CREATE TYPE "public"."enum__sleep_assessment_features_v_cta_button_link_type" AS ENUM('internal', 'external');
  CREATE TABLE "sleep_assessment_features_features" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"title" varchar,
  	"description" varchar,
  	"icon" "enum_sleep_assessment_features_features_icon"
  );
  
  CREATE TABLE "sleep_assessment_features" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"title" varchar DEFAULT 'Free Online Sleep Assessment',
  	"subtitle" varchar DEFAULT 'IPDiagnostics offers a free online sleep assessment that helps you discover whether a sleep disorder is disturbing your rest. The assessment asks targeted questions about your bedtime habits, daytime energy, and medical history.',
  	"cta_button_text" varchar DEFAULT 'Start Your Free Sleep Assessment',
  	"cta_button_link_type" "enum_sleep_assessment_features_cta_button_link_type" DEFAULT 'internal',
  	"cta_button_internal_id" integer,
  	"cta_button_external" varchar,
  	"cta_button_open_in_new_tab" boolean DEFAULT false,
  	"bottom_text" varchar DEFAULT 'We analyse your answers and calculate your risk for obstructive sleep apnoea or insomnia.',
  	"block_name" varchar
  );
  
  CREATE TABLE "notification_block" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"content" varchar DEFAULT 'Please note: This sleep assessment is not suitable for individuals under 18 years of age. This is intended as a self-assessment tool that may help you to identify if you have any of the common symptoms for sleep disorders like sleep apnoea or Insomnia. This is not a diagnostic tool and does not constitute medical advice. Your reliance on information obtained through the use of this is solely at your own risk. We recommend that you consult with a health care professional about the results of your Sleep Assessment or if you are concerned about your sleep.',
  	"block_name" varchar
  );
  
  CREATE TABLE "_sleep_assessment_features_v_features" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"title" varchar,
  	"description" varchar,
  	"icon" "enum__sleep_assessment_features_v_features_icon",
  	"_uuid" varchar
  );
  
  CREATE TABLE "_sleep_assessment_features_v" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"title" varchar DEFAULT 'Free Online Sleep Assessment',
  	"subtitle" varchar DEFAULT 'IPDiagnostics offers a free online sleep assessment that helps you discover whether a sleep disorder is disturbing your rest. The assessment asks targeted questions about your bedtime habits, daytime energy, and medical history.',
  	"cta_button_text" varchar DEFAULT 'Start Your Free Sleep Assessment',
  	"cta_button_link_type" "enum__sleep_assessment_features_v_cta_button_link_type" DEFAULT 'internal',
  	"cta_button_internal_id" integer,
  	"cta_button_external" varchar,
  	"cta_button_open_in_new_tab" boolean DEFAULT false,
  	"bottom_text" varchar DEFAULT 'We analyse your answers and calculate your risk for obstructive sleep apnoea or insomnia.',
  	"_uuid" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "_notification_block_v" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"content" varchar DEFAULT 'Please note: This sleep assessment is not suitable for individuals under 18 years of age. This is intended as a self-assessment tool that may help you to identify if you have any of the common symptoms for sleep disorders like sleep apnoea or Insomnia. This is not a diagnostic tool and does not constitute medical advice. Your reliance on information obtained through the use of this is solely at your own risk. We recommend that you consult with a health care professional about the results of your Sleep Assessment or if you are concerned about your sleep.',
  	"_uuid" varchar,
  	"block_name" varchar
  );
  
  ALTER TABLE "sleep_assessment_steps_steps_bullet_points" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_sleep_assessment_steps_v_steps_bullet_points" DISABLE ROW LEVEL SECURITY;
  DROP TABLE "sleep_assessment_steps_steps_bullet_points" CASCADE;
  DROP TABLE "_sleep_assessment_steps_v_steps_bullet_points" CASCADE;
  ALTER TABLE "sleep_assessment_steps_steps" ADD COLUMN "button_text" varchar;
  ALTER TABLE "sleep_assessment_steps_steps" ADD COLUMN "link_type" "enum_sleep_assessment_steps_steps_link_type" DEFAULT 'internal';
  ALTER TABLE "sleep_assessment_steps_steps" ADD COLUMN "internal_id" integer;
  ALTER TABLE "sleep_assessment_steps_steps" ADD COLUMN "external" varchar;
  ALTER TABLE "sleep_assessment_steps_steps" ADD COLUMN "open_in_new_tab" boolean DEFAULT false;
  ALTER TABLE "sleep_assessment_steps_steps" ADD COLUMN "icon" "enum_sleep_assessment_steps_steps_icon";
  ALTER TABLE "sleep_assessment_steps" ADD COLUMN "main_button_text" varchar DEFAULT 'Take a few minutes to complete sleep assessment';
  ALTER TABLE "sleep_assessment_steps" ADD COLUMN "main_button_link_type" "enum_sleep_assessment_steps_main_button_link_type" DEFAULT 'internal';
  ALTER TABLE "sleep_assessment_steps" ADD COLUMN "main_button_internal_id" integer;
  ALTER TABLE "sleep_assessment_steps" ADD COLUMN "main_button_external" varchar;
  ALTER TABLE "sleep_assessment_steps" ADD COLUMN "main_button_open_in_new_tab" boolean DEFAULT false;
  ALTER TABLE "_sleep_assessment_steps_v_steps" ADD COLUMN "button_text" varchar;
  ALTER TABLE "_sleep_assessment_steps_v_steps" ADD COLUMN "link_type" "enum__sleep_assessment_steps_v_steps_link_type" DEFAULT 'internal';
  ALTER TABLE "_sleep_assessment_steps_v_steps" ADD COLUMN "internal_id" integer;
  ALTER TABLE "_sleep_assessment_steps_v_steps" ADD COLUMN "external" varchar;
  ALTER TABLE "_sleep_assessment_steps_v_steps" ADD COLUMN "open_in_new_tab" boolean DEFAULT false;
  ALTER TABLE "_sleep_assessment_steps_v_steps" ADD COLUMN "icon" "enum__sleep_assessment_steps_v_steps_icon";
  ALTER TABLE "_sleep_assessment_steps_v" ADD COLUMN "main_button_text" varchar DEFAULT 'Take a few minutes to complete sleep assessment';
  ALTER TABLE "_sleep_assessment_steps_v" ADD COLUMN "main_button_link_type" "enum__sleep_assessment_steps_v_main_button_link_type" DEFAULT 'internal';
  ALTER TABLE "_sleep_assessment_steps_v" ADD COLUMN "main_button_internal_id" integer;
  ALTER TABLE "_sleep_assessment_steps_v" ADD COLUMN "main_button_external" varchar;
  ALTER TABLE "_sleep_assessment_steps_v" ADD COLUMN "main_button_open_in_new_tab" boolean DEFAULT false;
  ALTER TABLE "sleep_assessment_features_features" ADD CONSTRAINT "sleep_assessment_features_features_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."sleep_assessment_features"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "sleep_assessment_features" ADD CONSTRAINT "sleep_assessment_features_cta_button_internal_id_pages_id_fk" FOREIGN KEY ("cta_button_internal_id") REFERENCES "public"."pages"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "sleep_assessment_features" ADD CONSTRAINT "sleep_assessment_features_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "notification_block" ADD CONSTRAINT "notification_block_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_sleep_assessment_features_v_features" ADD CONSTRAINT "_sleep_assessment_features_v_features_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_sleep_assessment_features_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_sleep_assessment_features_v" ADD CONSTRAINT "_sleep_assessment_features_v_cta_button_internal_id_pages_id_fk" FOREIGN KEY ("cta_button_internal_id") REFERENCES "public"."pages"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_sleep_assessment_features_v" ADD CONSTRAINT "_sleep_assessment_features_v_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_notification_block_v" ADD CONSTRAINT "_notification_block_v_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v"("id") ON DELETE cascade ON UPDATE no action;
  CREATE INDEX "sleep_assessment_features_features_order_idx" ON "sleep_assessment_features_features" USING btree ("_order");
  CREATE INDEX "sleep_assessment_features_features_parent_id_idx" ON "sleep_assessment_features_features" USING btree ("_parent_id");
  CREATE INDEX "sleep_assessment_features_order_idx" ON "sleep_assessment_features" USING btree ("_order");
  CREATE INDEX "sleep_assessment_features_parent_id_idx" ON "sleep_assessment_features" USING btree ("_parent_id");
  CREATE INDEX "sleep_assessment_features_path_idx" ON "sleep_assessment_features" USING btree ("_path");
  CREATE INDEX "sleep_assessment_features_cta_button_internal_idx" ON "sleep_assessment_features" USING btree ("cta_button_internal_id");
  CREATE INDEX "notification_block_order_idx" ON "notification_block" USING btree ("_order");
  CREATE INDEX "notification_block_parent_id_idx" ON "notification_block" USING btree ("_parent_id");
  CREATE INDEX "notification_block_path_idx" ON "notification_block" USING btree ("_path");
  CREATE INDEX "_sleep_assessment_features_v_features_order_idx" ON "_sleep_assessment_features_v_features" USING btree ("_order");
  CREATE INDEX "_sleep_assessment_features_v_features_parent_id_idx" ON "_sleep_assessment_features_v_features" USING btree ("_parent_id");
  CREATE INDEX "_sleep_assessment_features_v_order_idx" ON "_sleep_assessment_features_v" USING btree ("_order");
  CREATE INDEX "_sleep_assessment_features_v_parent_id_idx" ON "_sleep_assessment_features_v" USING btree ("_parent_id");
  CREATE INDEX "_sleep_assessment_features_v_path_idx" ON "_sleep_assessment_features_v" USING btree ("_path");
  CREATE INDEX "_sleep_assessment_features_v_cta_button_internal_idx" ON "_sleep_assessment_features_v" USING btree ("cta_button_internal_id");
  CREATE INDEX "_notification_block_v_order_idx" ON "_notification_block_v" USING btree ("_order");
  CREATE INDEX "_notification_block_v_parent_id_idx" ON "_notification_block_v" USING btree ("_parent_id");
  CREATE INDEX "_notification_block_v_path_idx" ON "_notification_block_v" USING btree ("_path");
  ALTER TABLE "sleep_assessment_steps_steps" ADD CONSTRAINT "sleep_assessment_steps_steps_internal_id_pages_id_fk" FOREIGN KEY ("internal_id") REFERENCES "public"."pages"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "sleep_assessment_steps" ADD CONSTRAINT "sleep_assessment_steps_main_button_internal_id_pages_id_fk" FOREIGN KEY ("main_button_internal_id") REFERENCES "public"."pages"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_sleep_assessment_steps_v_steps" ADD CONSTRAINT "_sleep_assessment_steps_v_steps_internal_id_pages_id_fk" FOREIGN KEY ("internal_id") REFERENCES "public"."pages"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_sleep_assessment_steps_v" ADD CONSTRAINT "_sleep_assessment_steps_v_main_button_internal_id_pages_id_fk" FOREIGN KEY ("main_button_internal_id") REFERENCES "public"."pages"("id") ON DELETE set null ON UPDATE no action;
  CREATE INDEX "sleep_assessment_steps_steps_internal_idx" ON "sleep_assessment_steps_steps" USING btree ("internal_id");
  CREATE INDEX "sleep_assessment_steps_main_button_internal_idx" ON "sleep_assessment_steps" USING btree ("main_button_internal_id");
  CREATE INDEX "_sleep_assessment_steps_v_steps_internal_idx" ON "_sleep_assessment_steps_v_steps" USING btree ("internal_id");
  CREATE INDEX "_sleep_assessment_steps_v_main_button_internal_idx" ON "_sleep_assessment_steps_v" USING btree ("main_button_internal_id");`)
}

export async function down({ db, payload, req }: MigrateDownArgs): Promise<void> {
  await db.execute(sql`
   CREATE TABLE "sleep_assessment_steps_steps_bullet_points" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"point" varchar
  );
  
  CREATE TABLE "_sleep_assessment_steps_v_steps_bullet_points" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"point" varchar,
  	"_uuid" varchar
  );
  
  ALTER TABLE "sleep_assessment_features_features" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "sleep_assessment_features" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "notification_block" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_sleep_assessment_features_v_features" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_sleep_assessment_features_v" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_notification_block_v" DISABLE ROW LEVEL SECURITY;
  DROP TABLE "sleep_assessment_features_features" CASCADE;
  DROP TABLE "sleep_assessment_features" CASCADE;
  DROP TABLE "notification_block" CASCADE;
  DROP TABLE "_sleep_assessment_features_v_features" CASCADE;
  DROP TABLE "_sleep_assessment_features_v" CASCADE;
  DROP TABLE "_notification_block_v" CASCADE;
  ALTER TABLE "sleep_assessment_steps_steps" DROP CONSTRAINT "sleep_assessment_steps_steps_internal_id_pages_id_fk";
  
  ALTER TABLE "sleep_assessment_steps" DROP CONSTRAINT "sleep_assessment_steps_main_button_internal_id_pages_id_fk";
  
  ALTER TABLE "_sleep_assessment_steps_v_steps" DROP CONSTRAINT "_sleep_assessment_steps_v_steps_internal_id_pages_id_fk";
  
  ALTER TABLE "_sleep_assessment_steps_v" DROP CONSTRAINT "_sleep_assessment_steps_v_main_button_internal_id_pages_id_fk";
  
  DROP INDEX "sleep_assessment_steps_steps_internal_idx";
  DROP INDEX "sleep_assessment_steps_main_button_internal_idx";
  DROP INDEX "_sleep_assessment_steps_v_steps_internal_idx";
  DROP INDEX "_sleep_assessment_steps_v_main_button_internal_idx";
  ALTER TABLE "sleep_assessment_steps_steps_bullet_points" ADD CONSTRAINT "sleep_assessment_steps_steps_bullet_points_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."sleep_assessment_steps_steps"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_sleep_assessment_steps_v_steps_bullet_points" ADD CONSTRAINT "_sleep_assessment_steps_v_steps_bullet_points_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_sleep_assessment_steps_v_steps"("id") ON DELETE cascade ON UPDATE no action;
  CREATE INDEX "sleep_assessment_steps_steps_bullet_points_order_idx" ON "sleep_assessment_steps_steps_bullet_points" USING btree ("_order");
  CREATE INDEX "sleep_assessment_steps_steps_bullet_points_parent_id_idx" ON "sleep_assessment_steps_steps_bullet_points" USING btree ("_parent_id");
  CREATE INDEX "_sleep_assessment_steps_v_steps_bullet_points_order_idx" ON "_sleep_assessment_steps_v_steps_bullet_points" USING btree ("_order");
  CREATE INDEX "_sleep_assessment_steps_v_steps_bullet_points_parent_id_idx" ON "_sleep_assessment_steps_v_steps_bullet_points" USING btree ("_parent_id");
  ALTER TABLE "sleep_assessment_steps_steps" DROP COLUMN "button_text";
  ALTER TABLE "sleep_assessment_steps_steps" DROP COLUMN "link_type";
  ALTER TABLE "sleep_assessment_steps_steps" DROP COLUMN "internal_id";
  ALTER TABLE "sleep_assessment_steps_steps" DROP COLUMN "external";
  ALTER TABLE "sleep_assessment_steps_steps" DROP COLUMN "open_in_new_tab";
  ALTER TABLE "sleep_assessment_steps_steps" DROP COLUMN "icon";
  ALTER TABLE "sleep_assessment_steps" DROP COLUMN "main_button_text";
  ALTER TABLE "sleep_assessment_steps" DROP COLUMN "main_button_link_type";
  ALTER TABLE "sleep_assessment_steps" DROP COLUMN "main_button_internal_id";
  ALTER TABLE "sleep_assessment_steps" DROP COLUMN "main_button_external";
  ALTER TABLE "sleep_assessment_steps" DROP COLUMN "main_button_open_in_new_tab";
  ALTER TABLE "_sleep_assessment_steps_v_steps" DROP COLUMN "button_text";
  ALTER TABLE "_sleep_assessment_steps_v_steps" DROP COLUMN "link_type";
  ALTER TABLE "_sleep_assessment_steps_v_steps" DROP COLUMN "internal_id";
  ALTER TABLE "_sleep_assessment_steps_v_steps" DROP COLUMN "external";
  ALTER TABLE "_sleep_assessment_steps_v_steps" DROP COLUMN "open_in_new_tab";
  ALTER TABLE "_sleep_assessment_steps_v_steps" DROP COLUMN "icon";
  ALTER TABLE "_sleep_assessment_steps_v" DROP COLUMN "main_button_text";
  ALTER TABLE "_sleep_assessment_steps_v" DROP COLUMN "main_button_link_type";
  ALTER TABLE "_sleep_assessment_steps_v" DROP COLUMN "main_button_internal_id";
  ALTER TABLE "_sleep_assessment_steps_v" DROP COLUMN "main_button_external";
  ALTER TABLE "_sleep_assessment_steps_v" DROP COLUMN "main_button_open_in_new_tab";
  DROP TYPE "public"."enum_sleep_assessment_steps_steps_link_type";
  DROP TYPE "public"."enum_sleep_assessment_steps_steps_icon";
  DROP TYPE "public"."enum_sleep_assessment_steps_main_button_link_type";
  DROP TYPE "public"."enum_sleep_assessment_features_features_icon";
  DROP TYPE "public"."enum_sleep_assessment_features_cta_button_link_type";
  DROP TYPE "public"."enum__sleep_assessment_steps_v_steps_link_type";
  DROP TYPE "public"."enum__sleep_assessment_steps_v_steps_icon";
  DROP TYPE "public"."enum__sleep_assessment_steps_v_main_button_link_type";
  DROP TYPE "public"."enum__sleep_assessment_features_v_features_icon";
  DROP TYPE "public"."enum__sleep_assessment_features_v_cta_button_link_type";`)
}
