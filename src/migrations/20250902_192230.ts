import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-vercel-postgres'

export async function up({ db, payload, req }: MigrateUpArgs): Promise<void> {
  await db.execute(sql`
   ALTER TABLE "blogs" ADD COLUMN "image_id" integer;
  ALTER TABLE "blogs" ADD COLUMN "author" varchar;
  ALTER TABLE "blogs" ADD COLUMN "category" varchar;
  ALTER TABLE "blogs" ADD COLUMN "read_time" varchar;
  ALTER TABLE "_blogs_v" ADD COLUMN "version_image_id" integer;
  ALTER TABLE "_blogs_v" ADD COLUMN "version_author" varchar;
  ALTER TABLE "_blogs_v" ADD COLUMN "version_category" varchar;
  ALTER TABLE "_blogs_v" ADD COLUMN "version_read_time" varchar;
  ALTER TABLE "blogs" ADD CONSTRAINT "blogs_image_id_media_id_fk" FOREIGN KEY ("image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_blogs_v" ADD CONSTRAINT "_blogs_v_version_image_id_media_id_fk" FOREIGN KEY ("version_image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  CREATE INDEX "blogs_image_idx" ON "blogs" USING btree ("image_id");
  CREATE INDEX "_blogs_v_version_version_image_idx" ON "_blogs_v" USING btree ("version_image_id");`)
}

export async function down({ db, payload, req }: MigrateDownArgs): Promise<void> {
  await db.execute(sql`
   ALTER TABLE "blogs" DROP CONSTRAINT "blogs_image_id_media_id_fk";
  
  ALTER TABLE "_blogs_v" DROP CONSTRAINT "_blogs_v_version_image_id_media_id_fk";
  
  DROP INDEX "blogs_image_idx";
  DROP INDEX "_blogs_v_version_version_image_idx";
  ALTER TABLE "blogs" DROP COLUMN "image_id";
  ALTER TABLE "blogs" DROP COLUMN "author";
  ALTER TABLE "blogs" DROP COLUMN "category";
  ALTER TABLE "blogs" DROP COLUMN "read_time";
  ALTER TABLE "_blogs_v" DROP COLUMN "version_image_id";
  ALTER TABLE "_blogs_v" DROP COLUMN "version_author";
  ALTER TABLE "_blogs_v" DROP COLUMN "version_category";
  ALTER TABLE "_blogs_v" DROP COLUMN "version_read_time";`)
}
