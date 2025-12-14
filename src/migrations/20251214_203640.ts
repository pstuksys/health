import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-vercel-postgres'

export async function up({ db, payload, req }: MigrateUpArgs): Promise<void> {
  await db.execute(sql`
   CREATE TABLE "pages_blocks_table_columns" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"header" varchar
  );
  
  CREATE TABLE "pages_blocks_table_data_cells" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"content" jsonb
  );
  
  CREATE TABLE "pages_blocks_table_data" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL
  );
  
  CREATE TABLE "pages_blocks_table" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"title" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "_pages_v_blocks_table_columns" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"header" varchar,
  	"_uuid" varchar
  );
  
  CREATE TABLE "_pages_v_blocks_table_data_cells" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"content" jsonb,
  	"_uuid" varchar
  );
  
  CREATE TABLE "_pages_v_blocks_table_data" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_uuid" varchar
  );
  
  CREATE TABLE "_pages_v_blocks_table" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"title" varchar,
  	"_uuid" varchar,
  	"block_name" varchar
  );
  
  ALTER TABLE "pages_blocks_table_columns" ADD CONSTRAINT "pages_blocks_table_columns_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages_blocks_table"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_table_data_cells" ADD CONSTRAINT "pages_blocks_table_data_cells_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages_blocks_table_data"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_table_data" ADD CONSTRAINT "pages_blocks_table_data_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages_blocks_table"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_table" ADD CONSTRAINT "pages_blocks_table_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_table_columns" ADD CONSTRAINT "_pages_v_blocks_table_columns_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v_blocks_table"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_table_data_cells" ADD CONSTRAINT "_pages_v_blocks_table_data_cells_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v_blocks_table_data"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_table_data" ADD CONSTRAINT "_pages_v_blocks_table_data_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v_blocks_table"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_table" ADD CONSTRAINT "_pages_v_blocks_table_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v"("id") ON DELETE cascade ON UPDATE no action;
  CREATE INDEX "pages_blocks_table_columns_order_idx" ON "pages_blocks_table_columns" USING btree ("_order");
  CREATE INDEX "pages_blocks_table_columns_parent_id_idx" ON "pages_blocks_table_columns" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_table_data_cells_order_idx" ON "pages_blocks_table_data_cells" USING btree ("_order");
  CREATE INDEX "pages_blocks_table_data_cells_parent_id_idx" ON "pages_blocks_table_data_cells" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_table_data_order_idx" ON "pages_blocks_table_data" USING btree ("_order");
  CREATE INDEX "pages_blocks_table_data_parent_id_idx" ON "pages_blocks_table_data" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_table_order_idx" ON "pages_blocks_table" USING btree ("_order");
  CREATE INDEX "pages_blocks_table_parent_id_idx" ON "pages_blocks_table" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_table_path_idx" ON "pages_blocks_table" USING btree ("_path");
  CREATE INDEX "_pages_v_blocks_table_columns_order_idx" ON "_pages_v_blocks_table_columns" USING btree ("_order");
  CREATE INDEX "_pages_v_blocks_table_columns_parent_id_idx" ON "_pages_v_blocks_table_columns" USING btree ("_parent_id");
  CREATE INDEX "_pages_v_blocks_table_data_cells_order_idx" ON "_pages_v_blocks_table_data_cells" USING btree ("_order");
  CREATE INDEX "_pages_v_blocks_table_data_cells_parent_id_idx" ON "_pages_v_blocks_table_data_cells" USING btree ("_parent_id");
  CREATE INDEX "_pages_v_blocks_table_data_order_idx" ON "_pages_v_blocks_table_data" USING btree ("_order");
  CREATE INDEX "_pages_v_blocks_table_data_parent_id_idx" ON "_pages_v_blocks_table_data" USING btree ("_parent_id");
  CREATE INDEX "_pages_v_blocks_table_order_idx" ON "_pages_v_blocks_table" USING btree ("_order");
  CREATE INDEX "_pages_v_blocks_table_parent_id_idx" ON "_pages_v_blocks_table" USING btree ("_parent_id");
  CREATE INDEX "_pages_v_blocks_table_path_idx" ON "_pages_v_blocks_table" USING btree ("_path");`)
}

export async function down({ db, payload, req }: MigrateDownArgs): Promise<void> {
  await db.execute(sql`
   DROP TABLE "pages_blocks_table_columns" CASCADE;
  DROP TABLE "pages_blocks_table_data_cells" CASCADE;
  DROP TABLE "pages_blocks_table_data" CASCADE;
  DROP TABLE "pages_blocks_table" CASCADE;
  DROP TABLE "_pages_v_blocks_table_columns" CASCADE;
  DROP TABLE "_pages_v_blocks_table_data_cells" CASCADE;
  DROP TABLE "_pages_v_blocks_table_data" CASCADE;
  DROP TABLE "_pages_v_blocks_table" CASCADE;`)
}
