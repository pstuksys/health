import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-vercel-postgres'

export async function up({ db, payload, req }: MigrateUpArgs): Promise<void> {
  await db.execute(sql`
   DO $$ BEGIN
    CREATE TYPE "public"."enum_pages_blocks_carousel_autoplay_interval" AS ENUM('3000', '5000', '8000', '10000', '15000');
   EXCEPTION
    WHEN duplicate_object THEN null;
   END $$;
   
   DO $$ BEGIN
    CREATE TYPE "public"."enum__pages_v_blocks_carousel_autoplay_interval" AS ENUM('3000', '5000', '8000', '10000', '15000');
   EXCEPTION
    WHEN duplicate_object THEN null;
   END $$;
   
   DO $$ BEGIN
    CREATE TYPE "public"."enum_header_navigation_mega_menu_categories_link_type" AS ENUM('internal', 'external');
   EXCEPTION
    WHEN duplicate_object THEN null;
   END $$;
   
  DO $$ BEGIN
   ALTER TABLE "header_navigation_mega_menu_categories_items" DISABLE ROW LEVEL SECURITY;
  EXCEPTION
   WHEN undefined_table THEN null;
  END $$;
  
  DROP TABLE IF EXISTS "header_navigation_mega_menu_categories_items" CASCADE;
  
  -- Convert autoplay_interval from numeric to enum with proper data mapping
  ALTER TABLE "pages_blocks_carousel" ALTER COLUMN "autoplay_interval" DROP DEFAULT;
  ALTER TABLE "pages_blocks_carousel" ALTER COLUMN "autoplay_interval" SET DATA TYPE "public"."enum_pages_blocks_carousel_autoplay_interval" 
  USING (
    CASE 
      WHEN "autoplay_interval" = 3 OR "autoplay_interval" = 3000 THEN '3000'
      WHEN "autoplay_interval" = 5 OR "autoplay_interval" = 5000 THEN '5000'
      WHEN "autoplay_interval" = 8 OR "autoplay_interval" = 8000 THEN '8000'
      WHEN "autoplay_interval" = 10 OR "autoplay_interval" = 10000 THEN '10000'
      WHEN "autoplay_interval" = 15 OR "autoplay_interval" = 15000 THEN '15000'
      ELSE '5000'
    END
  )::"public"."enum_pages_blocks_carousel_autoplay_interval";
  ALTER TABLE "pages_blocks_carousel" ALTER COLUMN "autoplay_interval" SET DEFAULT '5000'::"public"."enum_pages_blocks_carousel_autoplay_interval";
  
  ALTER TABLE "_pages_v_blocks_carousel" ALTER COLUMN "autoplay_interval" DROP DEFAULT;
  ALTER TABLE "_pages_v_blocks_carousel" ALTER COLUMN "autoplay_interval" SET DATA TYPE "public"."enum__pages_v_blocks_carousel_autoplay_interval" 
  USING (
    CASE 
      WHEN "autoplay_interval" = 3 OR "autoplay_interval" = 3000 THEN '3000'
      WHEN "autoplay_interval" = 5 OR "autoplay_interval" = 5000 THEN '5000'
      WHEN "autoplay_interval" = 8 OR "autoplay_interval" = 8000 THEN '8000'
      WHEN "autoplay_interval" = 10 OR "autoplay_interval" = 10000 THEN '10000'
      WHEN "autoplay_interval" = 15 OR "autoplay_interval" = 15000 THEN '15000'
      ELSE '5000'
    END
  )::"public"."enum__pages_v_blocks_carousel_autoplay_interval";
  ALTER TABLE "_pages_v_blocks_carousel" ALTER COLUMN "autoplay_interval" SET DEFAULT '5000'::"public"."enum__pages_v_blocks_carousel_autoplay_interval";
  
  DO $$ BEGIN
   ALTER TABLE "pages_blocks_team_cards_members" ADD COLUMN "role" varchar;
  EXCEPTION
   WHEN duplicate_column THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "pages_blocks_single_card" ADD COLUMN "enable_link" boolean DEFAULT false;
  EXCEPTION
   WHEN duplicate_column THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "two_blocks_text" ADD COLUMN "disable_background" boolean DEFAULT false;
  EXCEPTION
   WHEN duplicate_column THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "call_to_action_banner_block" ADD COLUMN "full_width" boolean DEFAULT false;
  EXCEPTION
   WHEN duplicate_column THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "_pages_v_blocks_team_cards_members" ADD COLUMN "role" varchar;
  EXCEPTION
   WHEN duplicate_column THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "_pages_v_blocks_single_card" ADD COLUMN "enable_link" boolean DEFAULT false;
  EXCEPTION
   WHEN duplicate_column THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "_two_blocks_text_v" ADD COLUMN "disable_background" boolean DEFAULT false;
  EXCEPTION
   WHEN duplicate_column THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "_call_to_action_banner_block_v" ADD COLUMN "full_width" boolean DEFAULT false;
  EXCEPTION
   WHEN duplicate_column THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "header_navigation_mega_menu_categories" ADD COLUMN "link_type" "enum_header_navigation_mega_menu_categories_link_type" DEFAULT 'internal';
  EXCEPTION
   WHEN duplicate_column THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "header_navigation_mega_menu_categories" ADD COLUMN "href" varchar;
  EXCEPTION
   WHEN duplicate_column THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "pages_blocks_carousel" DROP COLUMN IF EXISTS "slides_to_show";
  EXCEPTION
   WHEN undefined_column THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "_pages_v_blocks_carousel" DROP COLUMN IF EXISTS "slides_to_show";
  EXCEPTION
   WHEN undefined_column THEN null;
  END $$;
  
  DROP TYPE IF EXISTS "public"."enum_header_navigation_mega_menu_categories_items_link_type";`)
}

export async function down({ db, payload, req }: MigrateDownArgs): Promise<void> {
  await db.execute(sql`
   CREATE TYPE "public"."enum_header_navigation_mega_menu_categories_items_link_type" AS ENUM('internal', 'external');
  CREATE TABLE "header_navigation_mega_menu_categories_items" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"label" varchar,
  	"link_type" "enum_header_navigation_mega_menu_categories_items_link_type" DEFAULT 'internal',
  	"href" varchar
  );
  
  ALTER TABLE "pages_blocks_carousel" ALTER COLUMN "autoplay_interval" SET DATA TYPE numeric;
  ALTER TABLE "pages_blocks_carousel" ALTER COLUMN "autoplay_interval" SET DEFAULT 5000;
  ALTER TABLE "_pages_v_blocks_carousel" ALTER COLUMN "autoplay_interval" SET DATA TYPE numeric;
  ALTER TABLE "_pages_v_blocks_carousel" ALTER COLUMN "autoplay_interval" SET DEFAULT 5000;
  ALTER TABLE "pages_blocks_carousel" ADD COLUMN "slides_to_show" numeric DEFAULT 1;
  ALTER TABLE "_pages_v_blocks_carousel" ADD COLUMN "slides_to_show" numeric DEFAULT 1;
  ALTER TABLE "header_navigation_mega_menu_categories_items" ADD CONSTRAINT "header_navigation_mega_menu_categories_items_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."header_navigation_mega_menu_categories"("id") ON DELETE cascade ON UPDATE no action;
  CREATE INDEX "header_navigation_mega_menu_categories_items_order_idx" ON "header_navigation_mega_menu_categories_items" USING btree ("_order");
  CREATE INDEX "header_navigation_mega_menu_categories_items_parent_id_idx" ON "header_navigation_mega_menu_categories_items" USING btree ("_parent_id");
  ALTER TABLE "pages_blocks_team_cards_members" DROP COLUMN "role";
  ALTER TABLE "pages_blocks_single_card" DROP COLUMN "enable_link";
  ALTER TABLE "two_blocks_text" DROP COLUMN "disable_background";
  ALTER TABLE "call_to_action_banner_block" DROP COLUMN "full_width";
  ALTER TABLE "_pages_v_blocks_team_cards_members" DROP COLUMN "role";
  ALTER TABLE "_pages_v_blocks_single_card" DROP COLUMN "enable_link";
  ALTER TABLE "_two_blocks_text_v" DROP COLUMN "disable_background";
  ALTER TABLE "_call_to_action_banner_block_v" DROP COLUMN "full_width";
  ALTER TABLE "header_navigation_mega_menu_categories" DROP COLUMN "link_type";
  ALTER TABLE "header_navigation_mega_menu_categories" DROP COLUMN "href";
  DROP TYPE "public"."enum_pages_blocks_carousel_autoplay_interval";
  DROP TYPE "public"."enum__pages_v_blocks_carousel_autoplay_interval";
  DROP TYPE "public"."enum_header_navigation_mega_menu_categories_link_type";`)
}
