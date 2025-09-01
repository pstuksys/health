import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-vercel-postgres'

export async function up({ db, payload, req }: MigrateUpArgs): Promise<void> {
  await db.execute(sql`
   CREATE TYPE "public"."enum_pages_blocks_testimonials_testimonial_type" AS ENUM('custom', 'doctify');
  CREATE TYPE "public"."enum_pages_blocks_full_width_banner_link_type" AS ENUM('internal', 'external');
  CREATE TYPE "public"."enum__pages_v_blocks_testimonials_testimonial_type" AS ENUM('custom', 'doctify');
  CREATE TYPE "public"."enum__pages_v_blocks_full_width_banner_link_type" AS ENUM('internal', 'external');
  ALTER TABLE "pages_blocks_testimonials" ADD COLUMN "testimonial_type" "enum_pages_blocks_testimonials_testimonial_type" DEFAULT 'custom';
  ALTER TABLE "pages_blocks_testimonials" ADD COLUMN "doctify_config_widget_id" varchar DEFAULT '0yewt1ji';
  ALTER TABLE "pages_blocks_testimonials" ADD COLUMN "doctify_config_tenant" varchar DEFAULT 'athena-uk';
  ALTER TABLE "pages_blocks_testimonials" ADD COLUMN "doctify_config_language" varchar DEFAULT 'en';
  ALTER TABLE "pages_blocks_testimonials" ADD COLUMN "doctify_config_profile_type" varchar DEFAULT 'practice';
  ALTER TABLE "pages_blocks_testimonials" ADD COLUMN "doctify_config_layout_type" varchar DEFAULT 'layoutA';
  ALTER TABLE "pages_blocks_testimonials" ADD COLUMN "doctify_config_slugs" varchar DEFAULT 'independent-physiological-diagnostics';
  ALTER TABLE "pages_blocks_testimonials" ADD COLUMN "doctify_config_background" varchar DEFAULT 'white';
  ALTER TABLE "pages_blocks_testimonials" ADD COLUMN "doctify_config_item_background" varchar DEFAULT 'ffffff';
  ALTER TABLE "pages_blocks_testimonials" ADD COLUMN "doctify_config_item_frame" boolean DEFAULT true;
  ALTER TABLE "pages_blocks_carousel_items" ADD COLUMN "button_text" varchar DEFAULT 'Learn More';
  ALTER TABLE "pages_blocks_full_width_banner" ADD COLUMN "link_type" "enum_pages_blocks_full_width_banner_link_type" DEFAULT 'internal';
  ALTER TABLE "pages_blocks_full_width_banner" ADD COLUMN "external_href" varchar;
  ALTER TABLE "pages_blocks_full_width_banner" ADD COLUMN "open_in_new_tab" boolean DEFAULT false;
  ALTER TABLE "_pages_v_blocks_testimonials" ADD COLUMN "testimonial_type" "enum__pages_v_blocks_testimonials_testimonial_type" DEFAULT 'custom';
  ALTER TABLE "_pages_v_blocks_testimonials" ADD COLUMN "doctify_config_widget_id" varchar DEFAULT '0yewt1ji';
  ALTER TABLE "_pages_v_blocks_testimonials" ADD COLUMN "doctify_config_tenant" varchar DEFAULT 'athena-uk';
  ALTER TABLE "_pages_v_blocks_testimonials" ADD COLUMN "doctify_config_language" varchar DEFAULT 'en';
  ALTER TABLE "_pages_v_blocks_testimonials" ADD COLUMN "doctify_config_profile_type" varchar DEFAULT 'practice';
  ALTER TABLE "_pages_v_blocks_testimonials" ADD COLUMN "doctify_config_layout_type" varchar DEFAULT 'layoutA';
  ALTER TABLE "_pages_v_blocks_testimonials" ADD COLUMN "doctify_config_slugs" varchar DEFAULT 'independent-physiological-diagnostics';
  ALTER TABLE "_pages_v_blocks_testimonials" ADD COLUMN "doctify_config_background" varchar DEFAULT 'white';
  ALTER TABLE "_pages_v_blocks_testimonials" ADD COLUMN "doctify_config_item_background" varchar DEFAULT 'ffffff';
  ALTER TABLE "_pages_v_blocks_testimonials" ADD COLUMN "doctify_config_item_frame" boolean DEFAULT true;
  ALTER TABLE "_pages_v_blocks_carousel_items" ADD COLUMN "button_text" varchar DEFAULT 'Learn More';
  ALTER TABLE "_pages_v_blocks_full_width_banner" ADD COLUMN "link_type" "enum__pages_v_blocks_full_width_banner_link_type" DEFAULT 'internal';
  ALTER TABLE "_pages_v_blocks_full_width_banner" ADD COLUMN "external_href" varchar;
  ALTER TABLE "_pages_v_blocks_full_width_banner" ADD COLUMN "open_in_new_tab" boolean DEFAULT false;
  ALTER TABLE "pages_blocks_full_width_banner" DROP COLUMN "button_href";
  ALTER TABLE "_pages_v_blocks_full_width_banner" DROP COLUMN "button_href";`)
}

export async function down({ db, payload, req }: MigrateDownArgs): Promise<void> {
  await db.execute(sql`
   ALTER TABLE "pages_blocks_full_width_banner" ADD COLUMN "button_href" varchar;
  ALTER TABLE "_pages_v_blocks_full_width_banner" ADD COLUMN "button_href" varchar;
  ALTER TABLE "pages_blocks_testimonials" DROP COLUMN "testimonial_type";
  ALTER TABLE "pages_blocks_testimonials" DROP COLUMN "doctify_config_widget_id";
  ALTER TABLE "pages_blocks_testimonials" DROP COLUMN "doctify_config_tenant";
  ALTER TABLE "pages_blocks_testimonials" DROP COLUMN "doctify_config_language";
  ALTER TABLE "pages_blocks_testimonials" DROP COLUMN "doctify_config_profile_type";
  ALTER TABLE "pages_blocks_testimonials" DROP COLUMN "doctify_config_layout_type";
  ALTER TABLE "pages_blocks_testimonials" DROP COLUMN "doctify_config_slugs";
  ALTER TABLE "pages_blocks_testimonials" DROP COLUMN "doctify_config_background";
  ALTER TABLE "pages_blocks_testimonials" DROP COLUMN "doctify_config_item_background";
  ALTER TABLE "pages_blocks_testimonials" DROP COLUMN "doctify_config_item_frame";
  ALTER TABLE "pages_blocks_carousel_items" DROP COLUMN "button_text";
  ALTER TABLE "pages_blocks_full_width_banner" DROP COLUMN "link_type";
  ALTER TABLE "pages_blocks_full_width_banner" DROP COLUMN "external_href";
  ALTER TABLE "pages_blocks_full_width_banner" DROP COLUMN "open_in_new_tab";
  ALTER TABLE "_pages_v_blocks_testimonials" DROP COLUMN "testimonial_type";
  ALTER TABLE "_pages_v_blocks_testimonials" DROP COLUMN "doctify_config_widget_id";
  ALTER TABLE "_pages_v_blocks_testimonials" DROP COLUMN "doctify_config_tenant";
  ALTER TABLE "_pages_v_blocks_testimonials" DROP COLUMN "doctify_config_language";
  ALTER TABLE "_pages_v_blocks_testimonials" DROP COLUMN "doctify_config_profile_type";
  ALTER TABLE "_pages_v_blocks_testimonials" DROP COLUMN "doctify_config_layout_type";
  ALTER TABLE "_pages_v_blocks_testimonials" DROP COLUMN "doctify_config_slugs";
  ALTER TABLE "_pages_v_blocks_testimonials" DROP COLUMN "doctify_config_background";
  ALTER TABLE "_pages_v_blocks_testimonials" DROP COLUMN "doctify_config_item_background";
  ALTER TABLE "_pages_v_blocks_testimonials" DROP COLUMN "doctify_config_item_frame";
  ALTER TABLE "_pages_v_blocks_carousel_items" DROP COLUMN "button_text";
  ALTER TABLE "_pages_v_blocks_full_width_banner" DROP COLUMN "link_type";
  ALTER TABLE "_pages_v_blocks_full_width_banner" DROP COLUMN "external_href";
  ALTER TABLE "_pages_v_blocks_full_width_banner" DROP COLUMN "open_in_new_tab";
  DROP TYPE "public"."enum_pages_blocks_testimonials_testimonial_type";
  DROP TYPE "public"."enum_pages_blocks_full_width_banner_link_type";
  DROP TYPE "public"."enum__pages_v_blocks_testimonials_testimonial_type";
  DROP TYPE "public"."enum__pages_v_blocks_full_width_banner_link_type";`)
}
