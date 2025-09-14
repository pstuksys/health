import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-vercel-postgres'

export async function up({ db, payload, req }: MigrateUpArgs): Promise<void> {
  // Simply clear existing text data and convert to jsonb
  await db.execute(sql`
    UPDATE "pages_blocks_expandable_table_items" SET "details" = NULL WHERE "details" IS NOT NULL;
    UPDATE "_pages_v_blocks_expandable_table_items" SET "details" = NULL WHERE "details" IS NOT NULL;`)

  // Now safely convert column types
  await db.execute(sql`
    ALTER TABLE "pages_blocks_expandable_table_items" ALTER COLUMN "details" SET DATA TYPE jsonb USING NULL;
    ALTER TABLE "_pages_v_blocks_expandable_table_items" ALTER COLUMN "details" SET DATA TYPE jsonb USING NULL;`)

  // Drop defaults
  await db.execute(sql`
    ALTER TABLE "pages_blocks_expandable_table" ALTER COLUMN "description" DROP DEFAULT;
    ALTER TABLE "_pages_v_blocks_expandable_table" ALTER COLUMN "description" DROP DEFAULT;`)
}

export async function down({ db, payload, req }: MigrateDownArgs): Promise<void> {
  // Convert column types back to varchar
  await db.execute(sql`
    ALTER TABLE "pages_blocks_expandable_table_items" ALTER COLUMN "details" SET DATA TYPE varchar USING NULL;
    ALTER TABLE "_pages_v_blocks_expandable_table_items" ALTER COLUMN "details" SET DATA TYPE varchar USING NULL;`)

  // Restore defaults
  await db.execute(sql`
    ALTER TABLE "pages_blocks_expandable_table" ALTER COLUMN "description" SET DEFAULT 'Click on items to expand and see more details.';
    ALTER TABLE "_pages_v_blocks_expandable_table" ALTER COLUMN "description" SET DEFAULT 'Click on items to expand and see more details.';`)
}
