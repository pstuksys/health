import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-vercel-postgres'

export async function up({ db, payload, req }: MigrateUpArgs): Promise<void> {
  await db.execute(sql`
   CREATE TYPE "public"."enum_blogs_article_type" AS ENUM('standard', 'specialist-insight');
  CREATE TYPE "public"."enum_blogs_specialist_cta_link_type" AS ENUM('internal', 'external');
  CREATE TYPE "public"."enum__blogs_v_version_article_type" AS ENUM('standard', 'specialist-insight');
  CREATE TYPE "public"."enum__blogs_v_version_specialist_cta_link_type" AS ENUM('internal', 'external');
  ALTER TYPE "public"."enum_blogs_category" ADD VALUE 'specialists-insights' BEFORE 'lifestyle-tips';
  ALTER TYPE "public"."enum__blogs_v_version_category" ADD VALUE 'specialists-insights' BEFORE 'lifestyle-tips';
  CREATE TABLE "blogs_key_takeaways" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"point" varchar
  );
  
  CREATE TABLE "blogs_specialist_professional_details" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"detail" varchar
  );
  
  CREATE TABLE "blogs_rels" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"order" integer,
  	"parent_id" integer NOT NULL,
  	"path" varchar NOT NULL,
  	"pages_id" integer,
  	"blogs_id" integer
  );
  
  CREATE TABLE "_blogs_v_version_key_takeaways" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"point" varchar,
  	"_uuid" varchar
  );
  
  CREATE TABLE "_blogs_v_version_specialist_professional_details" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"detail" varchar,
  	"_uuid" varchar
  );
  
  CREATE TABLE "_blogs_v_rels" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"order" integer,
  	"parent_id" integer NOT NULL,
  	"path" varchar NOT NULL,
  	"pages_id" integer,
  	"blogs_id" integer
  );
  
  ALTER TABLE "blogs" ADD COLUMN "article_type" "enum_blogs_article_type" DEFAULT 'standard';
  ALTER TABLE "blogs" ADD COLUMN "show_specialist_profile" boolean DEFAULT false;
  ALTER TABLE "blogs" ADD COLUMN "specialist_photo_id" integer;
  ALTER TABLE "blogs" ADD COLUMN "specialist_name" varchar;
  ALTER TABLE "blogs" ADD COLUMN "specialist_title" varchar;
  ALTER TABLE "blogs" ADD COLUMN "specialist_bio" varchar;
  ALTER TABLE "blogs" ADD COLUMN "specialist_contact_location" varchar;
  ALTER TABLE "blogs" ADD COLUMN "specialist_contact_website" varchar;
  ALTER TABLE "blogs" ADD COLUMN "specialist_contact_email" varchar;
  ALTER TABLE "blogs" ADD COLUMN "specialist_contact_phone" varchar;
  ALTER TABLE "blogs" ADD COLUMN "specialist_cta_label" varchar DEFAULT 'Book a Consultation';
  ALTER TABLE "blogs" ADD COLUMN "specialist_cta_link_type" "enum_blogs_specialist_cta_link_type" DEFAULT 'internal';
  ALTER TABLE "blogs" ADD COLUMN "specialist_cta_external_href" varchar;
  ALTER TABLE "blogs" ADD COLUMN "clinical_review_note" varchar DEFAULT 'This article has been clinically reviewed to ensure accuracy and reflect current best practice.';
  ALTER TABLE "_blogs_v" ADD COLUMN "version_article_type" "enum__blogs_v_version_article_type" DEFAULT 'standard';
  ALTER TABLE "_blogs_v" ADD COLUMN "version_show_specialist_profile" boolean DEFAULT false;
  ALTER TABLE "_blogs_v" ADD COLUMN "version_specialist_photo_id" integer;
  ALTER TABLE "_blogs_v" ADD COLUMN "version_specialist_name" varchar;
  ALTER TABLE "_blogs_v" ADD COLUMN "version_specialist_title" varchar;
  ALTER TABLE "_blogs_v" ADD COLUMN "version_specialist_bio" varchar;
  ALTER TABLE "_blogs_v" ADD COLUMN "version_specialist_contact_location" varchar;
  ALTER TABLE "_blogs_v" ADD COLUMN "version_specialist_contact_website" varchar;
  ALTER TABLE "_blogs_v" ADD COLUMN "version_specialist_contact_email" varchar;
  ALTER TABLE "_blogs_v" ADD COLUMN "version_specialist_contact_phone" varchar;
  ALTER TABLE "_blogs_v" ADD COLUMN "version_specialist_cta_label" varchar DEFAULT 'Book a Consultation';
  ALTER TABLE "_blogs_v" ADD COLUMN "version_specialist_cta_link_type" "enum__blogs_v_version_specialist_cta_link_type" DEFAULT 'internal';
  ALTER TABLE "_blogs_v" ADD COLUMN "version_specialist_cta_external_href" varchar;
  ALTER TABLE "_blogs_v" ADD COLUMN "version_clinical_review_note" varchar DEFAULT 'This article has been clinically reviewed to ensure accuracy and reflect current best practice.';
  ALTER TABLE "blogs_key_takeaways" ADD CONSTRAINT "blogs_key_takeaways_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."blogs"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "blogs_specialist_professional_details" ADD CONSTRAINT "blogs_specialist_professional_details_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."blogs"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "blogs_rels" ADD CONSTRAINT "blogs_rels_parent_fk" FOREIGN KEY ("parent_id") REFERENCES "public"."blogs"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "blogs_rels" ADD CONSTRAINT "blogs_rels_pages_fk" FOREIGN KEY ("pages_id") REFERENCES "public"."pages"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "blogs_rels" ADD CONSTRAINT "blogs_rels_blogs_fk" FOREIGN KEY ("blogs_id") REFERENCES "public"."blogs"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_blogs_v_version_key_takeaways" ADD CONSTRAINT "_blogs_v_version_key_takeaways_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_blogs_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_blogs_v_version_specialist_professional_details" ADD CONSTRAINT "_blogs_v_version_specialist_professional_details_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_blogs_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_blogs_v_rels" ADD CONSTRAINT "_blogs_v_rels_parent_fk" FOREIGN KEY ("parent_id") REFERENCES "public"."_blogs_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_blogs_v_rels" ADD CONSTRAINT "_blogs_v_rels_pages_fk" FOREIGN KEY ("pages_id") REFERENCES "public"."pages"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_blogs_v_rels" ADD CONSTRAINT "_blogs_v_rels_blogs_fk" FOREIGN KEY ("blogs_id") REFERENCES "public"."blogs"("id") ON DELETE cascade ON UPDATE no action;
  CREATE INDEX "blogs_key_takeaways_order_idx" ON "blogs_key_takeaways" USING btree ("_order");
  CREATE INDEX "blogs_key_takeaways_parent_id_idx" ON "blogs_key_takeaways" USING btree ("_parent_id");
  CREATE INDEX "blogs_specialist_professional_details_order_idx" ON "blogs_specialist_professional_details" USING btree ("_order");
  CREATE INDEX "blogs_specialist_professional_details_parent_id_idx" ON "blogs_specialist_professional_details" USING btree ("_parent_id");
  CREATE INDEX "blogs_rels_order_idx" ON "blogs_rels" USING btree ("order");
  CREATE INDEX "blogs_rels_parent_idx" ON "blogs_rels" USING btree ("parent_id");
  CREATE INDEX "blogs_rels_path_idx" ON "blogs_rels" USING btree ("path");
  CREATE INDEX "blogs_rels_pages_id_idx" ON "blogs_rels" USING btree ("pages_id");
  CREATE INDEX "blogs_rels_blogs_id_idx" ON "blogs_rels" USING btree ("blogs_id");
  CREATE INDEX "_blogs_v_version_key_takeaways_order_idx" ON "_blogs_v_version_key_takeaways" USING btree ("_order");
  CREATE INDEX "_blogs_v_version_key_takeaways_parent_id_idx" ON "_blogs_v_version_key_takeaways" USING btree ("_parent_id");
  CREATE INDEX "_blogs_v_version_specialist_professional_details_order_idx" ON "_blogs_v_version_specialist_professional_details" USING btree ("_order");
  CREATE INDEX "_blogs_v_version_specialist_professional_details_parent_id_idx" ON "_blogs_v_version_specialist_professional_details" USING btree ("_parent_id");
  CREATE INDEX "_blogs_v_rels_order_idx" ON "_blogs_v_rels" USING btree ("order");
  CREATE INDEX "_blogs_v_rels_parent_idx" ON "_blogs_v_rels" USING btree ("parent_id");
  CREATE INDEX "_blogs_v_rels_path_idx" ON "_blogs_v_rels" USING btree ("path");
  CREATE INDEX "_blogs_v_rels_pages_id_idx" ON "_blogs_v_rels" USING btree ("pages_id");
  CREATE INDEX "_blogs_v_rels_blogs_id_idx" ON "_blogs_v_rels" USING btree ("blogs_id");
  ALTER TABLE "blogs" ADD CONSTRAINT "blogs_specialist_photo_id_media_id_fk" FOREIGN KEY ("specialist_photo_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_blogs_v" ADD CONSTRAINT "_blogs_v_version_specialist_photo_id_media_id_fk" FOREIGN KEY ("version_specialist_photo_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  CREATE INDEX "blogs_specialist_specialist_photo_idx" ON "blogs" USING btree ("specialist_photo_id");
  CREATE INDEX "_blogs_v_version_specialist_version_specialist_photo_idx" ON "_blogs_v" USING btree ("version_specialist_photo_id");`)
}

export async function down({ db, payload, req }: MigrateDownArgs): Promise<void> {
  await db.execute(sql`
   ALTER TABLE "blogs_key_takeaways" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "blogs_specialist_professional_details" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "blogs_rels" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_blogs_v_version_key_takeaways" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_blogs_v_version_specialist_professional_details" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_blogs_v_rels" DISABLE ROW LEVEL SECURITY;
  DROP TABLE "blogs_key_takeaways" CASCADE;
  DROP TABLE "blogs_specialist_professional_details" CASCADE;
  DROP TABLE "blogs_rels" CASCADE;
  DROP TABLE "_blogs_v_version_key_takeaways" CASCADE;
  DROP TABLE "_blogs_v_version_specialist_professional_details" CASCADE;
  DROP TABLE "_blogs_v_rels" CASCADE;
  ALTER TABLE "blogs" DROP CONSTRAINT "blogs_specialist_photo_id_media_id_fk";
  
  ALTER TABLE "_blogs_v" DROP CONSTRAINT "_blogs_v_version_specialist_photo_id_media_id_fk";
  
  ALTER TABLE "blogs" ALTER COLUMN "category" SET DATA TYPE text;
  DROP TYPE "public"."enum_blogs_category";
  CREATE TYPE "public"."enum_blogs_category" AS ENUM('sleep-disorders', 'diagnostics-testing', 'therapies-treatments', 'lifestyle-tips', 'featured in');
  ALTER TABLE "blogs" ALTER COLUMN "category" SET DATA TYPE "public"."enum_blogs_category" USING "category"::"public"."enum_blogs_category";
  ALTER TABLE "_blogs_v" ALTER COLUMN "version_category" SET DATA TYPE text;
  DROP TYPE "public"."enum__blogs_v_version_category";
  CREATE TYPE "public"."enum__blogs_v_version_category" AS ENUM('sleep-disorders', 'diagnostics-testing', 'therapies-treatments', 'lifestyle-tips', 'featured in');
  ALTER TABLE "_blogs_v" ALTER COLUMN "version_category" SET DATA TYPE "public"."enum__blogs_v_version_category" USING "version_category"::"public"."enum__blogs_v_version_category";
  DROP INDEX "blogs_specialist_specialist_photo_idx";
  DROP INDEX "_blogs_v_version_specialist_version_specialist_photo_idx";
  ALTER TABLE "blogs" DROP COLUMN "article_type";
  ALTER TABLE "blogs" DROP COLUMN "show_specialist_profile";
  ALTER TABLE "blogs" DROP COLUMN "specialist_photo_id";
  ALTER TABLE "blogs" DROP COLUMN "specialist_name";
  ALTER TABLE "blogs" DROP COLUMN "specialist_title";
  ALTER TABLE "blogs" DROP COLUMN "specialist_bio";
  ALTER TABLE "blogs" DROP COLUMN "specialist_contact_location";
  ALTER TABLE "blogs" DROP COLUMN "specialist_contact_website";
  ALTER TABLE "blogs" DROP COLUMN "specialist_contact_email";
  ALTER TABLE "blogs" DROP COLUMN "specialist_contact_phone";
  ALTER TABLE "blogs" DROP COLUMN "specialist_cta_label";
  ALTER TABLE "blogs" DROP COLUMN "specialist_cta_link_type";
  ALTER TABLE "blogs" DROP COLUMN "specialist_cta_external_href";
  ALTER TABLE "blogs" DROP COLUMN "clinical_review_note";
  ALTER TABLE "_blogs_v" DROP COLUMN "version_article_type";
  ALTER TABLE "_blogs_v" DROP COLUMN "version_show_specialist_profile";
  ALTER TABLE "_blogs_v" DROP COLUMN "version_specialist_photo_id";
  ALTER TABLE "_blogs_v" DROP COLUMN "version_specialist_name";
  ALTER TABLE "_blogs_v" DROP COLUMN "version_specialist_title";
  ALTER TABLE "_blogs_v" DROP COLUMN "version_specialist_bio";
  ALTER TABLE "_blogs_v" DROP COLUMN "version_specialist_contact_location";
  ALTER TABLE "_blogs_v" DROP COLUMN "version_specialist_contact_website";
  ALTER TABLE "_blogs_v" DROP COLUMN "version_specialist_contact_email";
  ALTER TABLE "_blogs_v" DROP COLUMN "version_specialist_contact_phone";
  ALTER TABLE "_blogs_v" DROP COLUMN "version_specialist_cta_label";
  ALTER TABLE "_blogs_v" DROP COLUMN "version_specialist_cta_link_type";
  ALTER TABLE "_blogs_v" DROP COLUMN "version_specialist_cta_external_href";
  ALTER TABLE "_blogs_v" DROP COLUMN "version_clinical_review_note";
  DROP TYPE "public"."enum_blogs_article_type";
  DROP TYPE "public"."enum_blogs_specialist_cta_link_type";
  DROP TYPE "public"."enum__blogs_v_version_article_type";
  DROP TYPE "public"."enum__blogs_v_version_specialist_cta_link_type";`)
}
