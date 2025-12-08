import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-vercel-postgres'

export async function up({ db, payload, req }: MigrateUpArgs): Promise<void> {
  await db.execute(sql`
   CREATE TYPE "public"."enum_blogs_link_type" AS ENUM('internal', 'external');
  CREATE TYPE "public"."enum__blogs_v_version_link_type" AS ENUM('internal', 'external');
  ALTER TABLE "blogs" ADD COLUMN "link_type" "enum_blogs_link_type" DEFAULT 'internal';
  ALTER TABLE "blogs" ADD COLUMN "external_url" varchar;
  ALTER TABLE "_blogs_v" ADD COLUMN "version_link_type" "enum__blogs_v_version_link_type" DEFAULT 'internal';
  ALTER TABLE "_blogs_v" ADD COLUMN "version_external_url" varchar;
  ALTER TABLE "pages_blocks_partners_block" DROP COLUMN "layout";
  ALTER TABLE "_pages_v_blocks_partners_block" DROP COLUMN "layout";
  DROP TYPE "public"."enum_pages_blocks_partners_block_layout";
  DROP TYPE "public"."enum__pages_v_blocks_partners_block_layout";`)
}

export async function down({ db, payload, req }: MigrateDownArgs): Promise<void> {
  await db.execute(sql`
   CREATE TYPE "public"."enum_pages_blocks_partners_block_layout" AS ENUM('grid', 'carousel');
  CREATE TYPE "public"."enum__pages_v_blocks_partners_block_layout" AS ENUM('grid', 'carousel');
  ALTER TABLE "pages_blocks_partners_block" ADD COLUMN "layout" "enum_pages_blocks_partners_block_layout" DEFAULT 'grid';
  ALTER TABLE "_pages_v_blocks_partners_block" ADD COLUMN "layout" "enum__pages_v_blocks_partners_block_layout" DEFAULT 'grid';
  ALTER TABLE "blogs" DROP COLUMN "link_type";
  ALTER TABLE "blogs" DROP COLUMN "external_url";
  ALTER TABLE "_blogs_v" DROP COLUMN "version_link_type";
  ALTER TABLE "_blogs_v" DROP COLUMN "version_external_url";
  DROP TYPE "public"."enum_blogs_link_type";
  DROP TYPE "public"."enum__blogs_v_version_link_type";`)
}
