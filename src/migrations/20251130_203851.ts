import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-vercel-postgres'

export async function up({ db, payload, req }: MigrateUpArgs): Promise<void> {
  await db.execute(sql`
   CREATE TYPE "public"."enum_pages_blocks_button_variant" AS ENUM('primary', 'secondary', 'outline', 'ghost', 'default');
  CREATE TYPE "public"."enum_pages_blocks_button_size" AS ENUM('sm', 'md', 'lg', 'xl');
  CREATE TYPE "public"."enum_pages_blocks_button_position" AS ENUM('left', 'center', 'right');
  CREATE TYPE "public"."enum_pages_blocks_button_spacing" AS ENUM('sm', 'md', 'lg', 'xl');
  CREATE TYPE "public"."enum_pages_blocks_button_link_type" AS ENUM('internal', 'external');
  CREATE TYPE "public"."enum__pages_v_blocks_button_variant" AS ENUM('primary', 'secondary', 'outline', 'ghost', 'default');
  CREATE TYPE "public"."enum__pages_v_blocks_button_size" AS ENUM('sm', 'md', 'lg', 'xl');
  CREATE TYPE "public"."enum__pages_v_blocks_button_position" AS ENUM('left', 'center', 'right');
  CREATE TYPE "public"."enum__pages_v_blocks_button_spacing" AS ENUM('sm', 'md', 'lg', 'xl');
  CREATE TYPE "public"."enum__pages_v_blocks_button_link_type" AS ENUM('internal', 'external');
  CREATE TABLE "pages_blocks_button" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"label" varchar,
  	"variant" "enum_pages_blocks_button_variant" DEFAULT 'primary',
  	"size" "enum_pages_blocks_button_size" DEFAULT 'md',
  	"position" "enum_pages_blocks_button_position" DEFAULT 'center',
  	"spacing" "enum_pages_blocks_button_spacing" DEFAULT 'md',
  	"link_type" "enum_pages_blocks_button_link_type" DEFAULT 'external',
  	"external_href" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "_pages_v_blocks_button" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"label" varchar,
  	"variant" "enum__pages_v_blocks_button_variant" DEFAULT 'primary',
  	"size" "enum__pages_v_blocks_button_size" DEFAULT 'md',
  	"position" "enum__pages_v_blocks_button_position" DEFAULT 'center',
  	"spacing" "enum__pages_v_blocks_button_spacing" DEFAULT 'md',
  	"link_type" "enum__pages_v_blocks_button_link_type" DEFAULT 'external',
  	"external_href" varchar,
  	"_uuid" varchar,
  	"block_name" varchar
  );
  
  ALTER TABLE "pages_blocks_button" ADD CONSTRAINT "pages_blocks_button_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_button" ADD CONSTRAINT "_pages_v_blocks_button_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v"("id") ON DELETE cascade ON UPDATE no action;
  CREATE INDEX "pages_blocks_button_order_idx" ON "pages_blocks_button" USING btree ("_order");
  CREATE INDEX "pages_blocks_button_parent_id_idx" ON "pages_blocks_button" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_button_path_idx" ON "pages_blocks_button" USING btree ("_path");
  CREATE INDEX "_pages_v_blocks_button_order_idx" ON "_pages_v_blocks_button" USING btree ("_order");
  CREATE INDEX "_pages_v_blocks_button_parent_id_idx" ON "_pages_v_blocks_button" USING btree ("_parent_id");
  CREATE INDEX "_pages_v_blocks_button_path_idx" ON "_pages_v_blocks_button" USING btree ("_path");`)
}

export async function down({ db, payload, req }: MigrateDownArgs): Promise<void> {
  await db.execute(sql`
   DROP TABLE "pages_blocks_button" CASCADE;
  DROP TABLE "_pages_v_blocks_button" CASCADE;
  DROP TYPE "public"."enum_pages_blocks_button_variant";
  DROP TYPE "public"."enum_pages_blocks_button_size";
  DROP TYPE "public"."enum_pages_blocks_button_position";
  DROP TYPE "public"."enum_pages_blocks_button_spacing";
  DROP TYPE "public"."enum_pages_blocks_button_link_type";
  DROP TYPE "public"."enum__pages_v_blocks_button_variant";
  DROP TYPE "public"."enum__pages_v_blocks_button_size";
  DROP TYPE "public"."enum__pages_v_blocks_button_position";
  DROP TYPE "public"."enum__pages_v_blocks_button_spacing";
  DROP TYPE "public"."enum__pages_v_blocks_button_link_type";`)
}
