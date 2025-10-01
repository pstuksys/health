import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-vercel-postgres'

export async function up({ db, payload, req }: MigrateUpArgs): Promise<void> {
  await db.execute(sql`
   ALTER TABLE "sleep_assessment_features" ALTER COLUMN "bottom_text" DROP DEFAULT;
  ALTER TABLE "_sleep_assessment_features_v" ALTER COLUMN "bottom_text" DROP DEFAULT;
  ALTER TABLE "pages_blocks_testimonials" DROP COLUMN "doctify_config_widget_id";
  ALTER TABLE "pages_blocks_testimonials" DROP COLUMN "doctify_config_tenant";
  ALTER TABLE "pages_blocks_testimonials" DROP COLUMN "doctify_config_language";
  ALTER TABLE "pages_blocks_testimonials" DROP COLUMN "doctify_config_profile_type";
  ALTER TABLE "pages_blocks_testimonials" DROP COLUMN "doctify_config_layout_type";
  ALTER TABLE "pages_blocks_testimonials" DROP COLUMN "doctify_config_slugs";
  ALTER TABLE "pages_blocks_testimonials" DROP COLUMN "doctify_config_background";
  ALTER TABLE "pages_blocks_testimonials" DROP COLUMN "doctify_config_item_background";
  ALTER TABLE "pages_blocks_testimonials" DROP COLUMN "doctify_config_item_frame";
  ALTER TABLE "_pages_v_blocks_testimonials" DROP COLUMN "doctify_config_widget_id";
  ALTER TABLE "_pages_v_blocks_testimonials" DROP COLUMN "doctify_config_tenant";
  ALTER TABLE "_pages_v_blocks_testimonials" DROP COLUMN "doctify_config_language";
  ALTER TABLE "_pages_v_blocks_testimonials" DROP COLUMN "doctify_config_profile_type";
  ALTER TABLE "_pages_v_blocks_testimonials" DROP COLUMN "doctify_config_layout_type";
  ALTER TABLE "_pages_v_blocks_testimonials" DROP COLUMN "doctify_config_slugs";
  ALTER TABLE "_pages_v_blocks_testimonials" DROP COLUMN "doctify_config_background";
  ALTER TABLE "_pages_v_blocks_testimonials" DROP COLUMN "doctify_config_item_background";
  ALTER TABLE "_pages_v_blocks_testimonials" DROP COLUMN "doctify_config_item_frame";`)
}

export async function down({ db, payload, req }: MigrateDownArgs): Promise<void> {
  await db.execute(sql`
   ALTER TABLE "sleep_assessment_features" ALTER COLUMN "bottom_text" SET DEFAULT 'We analyse your answers and calculate your risk for obstructive sleep apnoea or insomnia.';
  ALTER TABLE "_sleep_assessment_features_v" ALTER COLUMN "bottom_text" SET DEFAULT 'We analyse your answers and calculate your risk for obstructive sleep apnoea or insomnia.';
  ALTER TABLE "pages_blocks_testimonials" ADD COLUMN "doctify_config_widget_id" varchar DEFAULT '0yewt1ji';
  ALTER TABLE "pages_blocks_testimonials" ADD COLUMN "doctify_config_tenant" varchar DEFAULT 'athena-uk';
  ALTER TABLE "pages_blocks_testimonials" ADD COLUMN "doctify_config_language" varchar DEFAULT 'en';
  ALTER TABLE "pages_blocks_testimonials" ADD COLUMN "doctify_config_profile_type" varchar DEFAULT 'practice';
  ALTER TABLE "pages_blocks_testimonials" ADD COLUMN "doctify_config_layout_type" varchar DEFAULT 'layoutA';
  ALTER TABLE "pages_blocks_testimonials" ADD COLUMN "doctify_config_slugs" varchar DEFAULT 'independent-physiological-diagnostics';
  ALTER TABLE "pages_blocks_testimonials" ADD COLUMN "doctify_config_background" varchar DEFAULT 'white';
  ALTER TABLE "pages_blocks_testimonials" ADD COLUMN "doctify_config_item_background" varchar DEFAULT 'ffffff';
  ALTER TABLE "pages_blocks_testimonials" ADD COLUMN "doctify_config_item_frame" boolean DEFAULT true;
  ALTER TABLE "_pages_v_blocks_testimonials" ADD COLUMN "doctify_config_widget_id" varchar DEFAULT '0yewt1ji';
  ALTER TABLE "_pages_v_blocks_testimonials" ADD COLUMN "doctify_config_tenant" varchar DEFAULT 'athena-uk';
  ALTER TABLE "_pages_v_blocks_testimonials" ADD COLUMN "doctify_config_language" varchar DEFAULT 'en';
  ALTER TABLE "_pages_v_blocks_testimonials" ADD COLUMN "doctify_config_profile_type" varchar DEFAULT 'practice';
  ALTER TABLE "_pages_v_blocks_testimonials" ADD COLUMN "doctify_config_layout_type" varchar DEFAULT 'layoutA';
  ALTER TABLE "_pages_v_blocks_testimonials" ADD COLUMN "doctify_config_slugs" varchar DEFAULT 'independent-physiological-diagnostics';
  ALTER TABLE "_pages_v_blocks_testimonials" ADD COLUMN "doctify_config_background" varchar DEFAULT 'white';
  ALTER TABLE "_pages_v_blocks_testimonials" ADD COLUMN "doctify_config_item_background" varchar DEFAULT 'ffffff';
  ALTER TABLE "_pages_v_blocks_testimonials" ADD COLUMN "doctify_config_item_frame" boolean DEFAULT true;`)
}
