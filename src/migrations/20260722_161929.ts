import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-vercel-postgres'

export async function up({ db, payload, req }: MigrateUpArgs): Promise<void> {
  await db.execute(sql`
   CREATE TABLE "trust_badges_block_badges" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"logo_id" integer
  );
  
  CREATE TABLE "trust_badges_block" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"block_name" varchar
  );
  
  CREATE TABLE "_trust_badges_block_v_badges" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"logo_id" integer,
  	"_uuid" varchar
  );
  
  CREATE TABLE "_trust_badges_block_v" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_uuid" varchar,
  	"block_name" varchar
  );
  
  ALTER TABLE "trust_badges_block_badges" ADD CONSTRAINT "trust_badges_block_badges_logo_id_media_id_fk" FOREIGN KEY ("logo_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "trust_badges_block_badges" ADD CONSTRAINT "trust_badges_block_badges_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."trust_badges_block"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "trust_badges_block" ADD CONSTRAINT "trust_badges_block_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_trust_badges_block_v_badges" ADD CONSTRAINT "_trust_badges_block_v_badges_logo_id_media_id_fk" FOREIGN KEY ("logo_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_trust_badges_block_v_badges" ADD CONSTRAINT "_trust_badges_block_v_badges_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_trust_badges_block_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_trust_badges_block_v" ADD CONSTRAINT "_trust_badges_block_v_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v"("id") ON DELETE cascade ON UPDATE no action;
  CREATE INDEX "trust_badges_block_badges_order_idx" ON "trust_badges_block_badges" USING btree ("_order");
  CREATE INDEX "trust_badges_block_badges_parent_id_idx" ON "trust_badges_block_badges" USING btree ("_parent_id");
  CREATE INDEX "trust_badges_block_badges_logo_idx" ON "trust_badges_block_badges" USING btree ("logo_id");
  CREATE INDEX "trust_badges_block_order_idx" ON "trust_badges_block" USING btree ("_order");
  CREATE INDEX "trust_badges_block_parent_id_idx" ON "trust_badges_block" USING btree ("_parent_id");
  CREATE INDEX "trust_badges_block_path_idx" ON "trust_badges_block" USING btree ("_path");
  CREATE INDEX "_trust_badges_block_v_badges_order_idx" ON "_trust_badges_block_v_badges" USING btree ("_order");
  CREATE INDEX "_trust_badges_block_v_badges_parent_id_idx" ON "_trust_badges_block_v_badges" USING btree ("_parent_id");
  CREATE INDEX "_trust_badges_block_v_badges_logo_idx" ON "_trust_badges_block_v_badges" USING btree ("logo_id");
  CREATE INDEX "_trust_badges_block_v_order_idx" ON "_trust_badges_block_v" USING btree ("_order");
  CREATE INDEX "_trust_badges_block_v_parent_id_idx" ON "_trust_badges_block_v" USING btree ("_parent_id");
  CREATE INDEX "_trust_badges_block_v_path_idx" ON "_trust_badges_block_v" USING btree ("_path");`)
}

export async function down({ db, payload, req }: MigrateDownArgs): Promise<void> {
  await db.execute(sql`
   DROP TABLE "trust_badges_block_badges" CASCADE;
  DROP TABLE "trust_badges_block" CASCADE;
  DROP TABLE "_trust_badges_block_v_badges" CASCADE;
  DROP TABLE "_trust_badges_block_v" CASCADE;`)
}
