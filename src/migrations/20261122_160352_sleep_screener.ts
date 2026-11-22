import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-vercel-postgres'
import { questionnairePresets } from '../lib/questionnaires/presets'

export async function up({ db, payload, req }: MigrateUpArgs): Promise<void> {
  await db.execute(sql`
   CREATE TYPE "public"."enum_questionnaire_block_cta_link_type" AS ENUM('internal', 'external');
  CREATE TYPE "public"."enum__questionnaire_block_v_cta_link_type" AS ENUM('internal', 'external');
  CREATE TYPE "public"."enum_questionnaires_sections_results_level" AS ENUM('low', 'medium', 'high');
  CREATE TABLE "questionnaire_block" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"questionnaire_id" integer,
  	"title" varchar DEFAULT 'Free sleep screener',
  	"description" varchar DEFAULT 'Answer a few quick questions to find out whether your symptoms may be linked to a sleep disorder. It takes less than a minute.',
  	"cta_label" varchar DEFAULT 'Book a call with our doctor',
  	"cta_link_type" "enum_questionnaire_block_cta_link_type" DEFAULT 'external',
  	"cta_external_href" varchar DEFAULT '#book-video-consultation',
  	"disclaimer" varchar DEFAULT 'This screener is not a diagnosis. Your answers stay in your browser and are not stored or sent anywhere.',
  	"block_name" varchar
  );
  
  CREATE TABLE "_questionnaire_block_v" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"questionnaire_id" integer,
  	"title" varchar DEFAULT 'Free sleep screener',
  	"description" varchar DEFAULT 'Answer a few quick questions to find out whether your symptoms may be linked to a sleep disorder. It takes less than a minute.',
  	"cta_label" varchar DEFAULT 'Book a call with our doctor',
  	"cta_link_type" "enum__questionnaire_block_v_cta_link_type" DEFAULT 'external',
  	"cta_external_href" varchar DEFAULT '#book-video-consultation',
  	"disclaimer" varchar DEFAULT 'This screener is not a diagnosis. Your answers stay in your browser and are not stored or sent anywhere.',
  	"_uuid" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "questionnaires_sections_questions_answers" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"label" varchar NOT NULL,
  	"points" numeric DEFAULT 0 NOT NULL
  );
  
  CREATE TABLE "questionnaires_sections_questions" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"text" varchar NOT NULL
  );
  
  CREATE TABLE "questionnaires_sections_results" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"label" varchar NOT NULL,
  	"level" "enum_questionnaires_sections_results_level" DEFAULT 'low' NOT NULL,
  	"min_score" numeric NOT NULL,
  	"max_score" numeric NOT NULL,
  	"headline" varchar NOT NULL,
  	"content" jsonb
  );
  
  CREATE TABLE "questionnaires_sections" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"title" varchar NOT NULL
  );
  
  CREATE TABLE "questionnaires" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"name" varchar NOT NULL,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL
  );
  
  ALTER TABLE "payload_locked_documents_rels" ADD COLUMN "questionnaires_id" integer;
  ALTER TABLE "questionnaire_block" ADD CONSTRAINT "questionnaire_block_questionnaire_id_questionnaires_id_fk" FOREIGN KEY ("questionnaire_id") REFERENCES "public"."questionnaires"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "questionnaire_block" ADD CONSTRAINT "questionnaire_block_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_questionnaire_block_v" ADD CONSTRAINT "_questionnaire_block_v_questionnaire_id_questionnaires_id_fk" FOREIGN KEY ("questionnaire_id") REFERENCES "public"."questionnaires"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_questionnaire_block_v" ADD CONSTRAINT "_questionnaire_block_v_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "questionnaires_sections_questions_answers" ADD CONSTRAINT "questionnaires_sections_questions_answers_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."questionnaires_sections_questions"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "questionnaires_sections_questions" ADD CONSTRAINT "questionnaires_sections_questions_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."questionnaires_sections"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "questionnaires_sections_results" ADD CONSTRAINT "questionnaires_sections_results_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."questionnaires_sections"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "questionnaires_sections" ADD CONSTRAINT "questionnaires_sections_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."questionnaires"("id") ON DELETE cascade ON UPDATE no action;
  CREATE INDEX "questionnaire_block_order_idx" ON "questionnaire_block" USING btree ("_order");
  CREATE INDEX "questionnaire_block_parent_id_idx" ON "questionnaire_block" USING btree ("_parent_id");
  CREATE INDEX "questionnaire_block_path_idx" ON "questionnaire_block" USING btree ("_path");
  CREATE INDEX "questionnaire_block_questionnaire_idx" ON "questionnaire_block" USING btree ("questionnaire_id");
  CREATE INDEX "_questionnaire_block_v_order_idx" ON "_questionnaire_block_v" USING btree ("_order");
  CREATE INDEX "_questionnaire_block_v_parent_id_idx" ON "_questionnaire_block_v" USING btree ("_parent_id");
  CREATE INDEX "_questionnaire_block_v_path_idx" ON "_questionnaire_block_v" USING btree ("_path");
  CREATE INDEX "_questionnaire_block_v_questionnaire_idx" ON "_questionnaire_block_v" USING btree ("questionnaire_id");
  CREATE INDEX "questionnaires_sections_questions_answers_order_idx" ON "questionnaires_sections_questions_answers" USING btree ("_order");
  CREATE INDEX "questionnaires_sections_questions_answers_parent_id_idx" ON "questionnaires_sections_questions_answers" USING btree ("_parent_id");
  CREATE INDEX "questionnaires_sections_questions_order_idx" ON "questionnaires_sections_questions" USING btree ("_order");
  CREATE INDEX "questionnaires_sections_questions_parent_id_idx" ON "questionnaires_sections_questions" USING btree ("_parent_id");
  CREATE INDEX "questionnaires_sections_results_order_idx" ON "questionnaires_sections_results" USING btree ("_order");
  CREATE INDEX "questionnaires_sections_results_parent_id_idx" ON "questionnaires_sections_results" USING btree ("_parent_id");
  CREATE INDEX "questionnaires_sections_order_idx" ON "questionnaires_sections" USING btree ("_order");
  CREATE INDEX "questionnaires_sections_parent_id_idx" ON "questionnaires_sections" USING btree ("_parent_id");
  CREATE INDEX "questionnaires_updated_at_idx" ON "questionnaires" USING btree ("updated_at");
  CREATE INDEX "questionnaires_created_at_idx" ON "questionnaires" USING btree ("created_at");
  ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_questionnaires_fk" FOREIGN KEY ("questionnaires_id") REFERENCES "public"."questionnaires"("id") ON DELETE cascade ON UPDATE no action;
  CREATE INDEX "payload_locked_documents_rels_questionnaires_id_idx" ON "payload_locked_documents_rels" USING btree ("questionnaires_id");`)

  // Built-in questionnaire (IPD-9): STOP-Bang and Insomnia as one Sleep screener
  for (const data of questionnairePresets) {
    await payload.create({ collection: 'questionnaires', data, req })
  }
}

export async function down({ db, payload, req }: MigrateDownArgs): Promise<void> {
  await db.execute(sql`
   ALTER TABLE "questionnaire_block" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_questionnaire_block_v" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "questionnaires_sections_questions_answers" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "questionnaires_sections_questions" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "questionnaires_sections_results" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "questionnaires_sections" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "questionnaires" DISABLE ROW LEVEL SECURITY;
  DROP TABLE "questionnaire_block" CASCADE;
  DROP TABLE "_questionnaire_block_v" CASCADE;
  DROP TABLE "questionnaires_sections_questions_answers" CASCADE;
  DROP TABLE "questionnaires_sections_questions" CASCADE;
  DROP TABLE "questionnaires_sections_results" CASCADE;
  DROP TABLE "questionnaires_sections" CASCADE;
  DROP TABLE "questionnaires" CASCADE;
  ALTER TABLE "payload_locked_documents_rels" DROP CONSTRAINT "payload_locked_documents_rels_questionnaires_fk";
  
  DROP INDEX "payload_locked_documents_rels_questionnaires_id_idx";
  ALTER TABLE "payload_locked_documents_rels" DROP COLUMN "questionnaires_id";
  DROP TYPE "public"."enum_questionnaire_block_cta_link_type";
  DROP TYPE "public"."enum__questionnaire_block_v_cta_link_type";
  DROP TYPE "public"."enum_questionnaires_sections_results_level";`)
}
