import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-vercel-postgres'

export async function up({ db, payload, req }: MigrateUpArgs): Promise<void> {
  await db.execute(sql`
   CREATE TYPE "public"."enum_sleep_apnea_intro_steps_items_link_type" AS ENUM('internal', 'external');
  CREATE TYPE "public"."enum_sleep_apnea_test_options_items_badges_tone" AS ENUM('filled', 'subtle', 'neutral');
  CREATE TYPE "public"."enum_sleep_apnea_test_options_items_icon" AS ENUM('home', 'activity', 'monitor');
  CREATE TYPE "public"."enum_sleep_apnea_test_options_items_link_type_primary" AS ENUM('internal', 'external');
  CREATE TYPE "public"."enum_sleep_apnea_test_options_items_link_type_secondary" AS ENUM('internal', 'external');
  CREATE TYPE "public"."enum_cbti_block_cta_primary_link_type" AS ENUM('internal', 'external');
  CREATE TYPE "public"."enum_cbti_block_cta_secondary_link_type" AS ENUM('internal', 'external');
  CREATE TYPE "public"."enum_mslt_block_cta_primary_link_type" AS ENUM('internal', 'external');
  CREATE TYPE "public"."enum_mslt_block_cta_secondary_link_type" AS ENUM('internal', 'external');
  CREATE TYPE "public"."enum_mwt_block_cta_primary_link_type" AS ENUM('internal', 'external');
  CREATE TYPE "public"."enum_mwt_block_cta_secondary_link_type" AS ENUM('internal', 'external');
  CREATE TYPE "public"."enum_actigraphy_block_cta_primary_link_type" AS ENUM('internal', 'external');
  CREATE TYPE "public"."enum_actigraphy_block_cta_secondary_link_type" AS ENUM('internal', 'external');
  CREATE TYPE "public"."enum_vpsg_block_hero_primary_link_type" AS ENUM('internal', 'external');
  CREATE TYPE "public"."enum_vpsg_block_hero_secondary_link_type" AS ENUM('internal', 'external');
  CREATE TYPE "public"."enum_vpsg_block_cta_primary_link_type" AS ENUM('internal', 'external');
  CREATE TYPE "public"."enum_vpsg_block_cta_secondary_link_type" AS ENUM('internal', 'external');
  CREATE TYPE "public"."enum_vpsg_eeg_block_hero_primary_link_type" AS ENUM('internal', 'external');
  CREATE TYPE "public"."enum_vpsg_eeg_block_hero_secondary_link_type" AS ENUM('internal', 'external');
  CREATE TYPE "public"."enum_vpsg_eeg_block_cta_primary_link_type" AS ENUM('internal', 'external');
  CREATE TYPE "public"."enum_vpsg_eeg_block_cta_secondary_link_type" AS ENUM('internal', 'external');
  CREATE TYPE "public"."enum_respiratory_polygrophy_block_hero_primary_link_type" AS ENUM('internal', 'external');
  CREATE TYPE "public"."enum_respiratory_polygrophy_block_hero_secondary_link_type" AS ENUM('internal', 'external');
  CREATE TYPE "public"."enum_respiratory_polygrophy_block_cta_primary_link_type" AS ENUM('internal', 'external');
  CREATE TYPE "public"."enum_respiratory_polygrophy_block_cta_secondary_link_type" AS ENUM('internal', 'external');
  CREATE TYPE "public"."enum__sleep_apnea_intro_steps_v_items_link_type" AS ENUM('internal', 'external');
  CREATE TYPE "public"."enum__sleep_apnea_test_options_v_items_badges_tone" AS ENUM('filled', 'subtle', 'neutral');
  CREATE TYPE "public"."enum__sleep_apnea_test_options_v_items_icon" AS ENUM('home', 'activity', 'monitor');
  CREATE TYPE "public"."enum__sleep_apnea_test_options_v_items_link_type_primary" AS ENUM('internal', 'external');
  CREATE TYPE "public"."enum__sleep_apnea_test_options_v_items_link_type_secondary" AS ENUM('internal', 'external');
  CREATE TYPE "public"."enum__cbti_block_v_cta_primary_link_type" AS ENUM('internal', 'external');
  CREATE TYPE "public"."enum__cbti_block_v_cta_secondary_link_type" AS ENUM('internal', 'external');
  CREATE TYPE "public"."enum__mslt_block_v_cta_primary_link_type" AS ENUM('internal', 'external');
  CREATE TYPE "public"."enum__mslt_block_v_cta_secondary_link_type" AS ENUM('internal', 'external');
  CREATE TYPE "public"."enum__mwt_block_v_cta_primary_link_type" AS ENUM('internal', 'external');
  CREATE TYPE "public"."enum__mwt_block_v_cta_secondary_link_type" AS ENUM('internal', 'external');
  CREATE TYPE "public"."enum__actigraphy_block_v_cta_primary_link_type" AS ENUM('internal', 'external');
  CREATE TYPE "public"."enum__actigraphy_block_v_cta_secondary_link_type" AS ENUM('internal', 'external');
  CREATE TYPE "public"."enum__vpsg_block_v_hero_primary_link_type" AS ENUM('internal', 'external');
  CREATE TYPE "public"."enum__vpsg_block_v_hero_secondary_link_type" AS ENUM('internal', 'external');
  CREATE TYPE "public"."enum__vpsg_block_v_cta_primary_link_type" AS ENUM('internal', 'external');
  CREATE TYPE "public"."enum__vpsg_block_v_cta_secondary_link_type" AS ENUM('internal', 'external');
  CREATE TYPE "public"."enum__vpsg_eeg_block_v_hero_primary_link_type" AS ENUM('internal', 'external');
  CREATE TYPE "public"."enum__vpsg_eeg_block_v_hero_secondary_link_type" AS ENUM('internal', 'external');
  CREATE TYPE "public"."enum__vpsg_eeg_block_v_cta_primary_link_type" AS ENUM('internal', 'external');
  CREATE TYPE "public"."enum__vpsg_eeg_block_v_cta_secondary_link_type" AS ENUM('internal', 'external');
  CREATE TYPE "public"."enum__respiratory_polygrophy_block_v_hero_primary_link_type" AS ENUM('internal', 'external');
  CREATE TYPE "public"."enum__respiratory_polygrophy_block_v_hero_secondary_link_type" AS ENUM('internal', 'external');
  CREATE TYPE "public"."enum__respiratory_polygrophy_block_v_cta_primary_link_type" AS ENUM('internal', 'external');
  CREATE TYPE "public"."enum__respiratory_polygrophy_block_v_cta_secondary_link_type" AS ENUM('internal', 'external');
  CREATE TABLE "cpap_block" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"title" varchar DEFAULT 'Choose Your CPAP Therapy Option',
  	"subtitle" varchar DEFAULT 'Professional sleep therapy solutions with comprehensive support from certified Clinical Sleep Physiologists',
  	"block_name" varchar
  );
  
  CREATE TABLE "sleep_apnea_intro_steps_items" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"number" varchar,
  	"title" varchar,
  	"description" varchar,
  	"link_type" "enum_sleep_apnea_intro_steps_items_link_type" DEFAULT 'internal',
  	"external_href" varchar,
  	"button_text" varchar
  );
  
  CREATE TABLE "sleep_apnea_intro_steps" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"title" varchar DEFAULT 'Step 1: Getting Started – How to Get Tested for Sleep Apnoea',
  	"subtitle" varchar DEFAULT 'Do you snore, struggle with unrefreshing sleep, or suspect sleep apnoea? Take these two simple steps to begin your journey to better sleep:',
  	"block_name" varchar
  );
  
  CREATE TABLE "sleep_apnea_test_options_items_badges" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"text" varchar,
  	"tone" "enum_sleep_apnea_test_options_items_badges_tone" DEFAULT 'neutral'
  );
  
  CREATE TABLE "sleep_apnea_test_options_items" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"key" varchar,
  	"icon" "enum_sleep_apnea_test_options_items_icon" DEFAULT 'home',
  	"title" varchar,
  	"description" varchar,
  	"link_type_primary" "enum_sleep_apnea_test_options_items_link_type_primary" DEFAULT 'internal',
  	"primary_external_href" varchar,
  	"primary_text" varchar,
  	"link_type_secondary" "enum_sleep_apnea_test_options_items_link_type_secondary" DEFAULT 'external',
  	"secondary_external_href" varchar,
  	"secondary_text" varchar
  );
  
  CREATE TABLE "sleep_apnea_test_options" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"title" varchar DEFAULT 'Step 2: Understand Your Sleep Test Options',
  	"block_name" varchar
  );
  
  CREATE TABLE "sleep_apnea_report_includes_features" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"text" varchar,
  	"wide" boolean DEFAULT false
  );
  
  CREATE TABLE "sleep_apnea_report_includes" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"title" varchar DEFAULT 'What Your Report Includes',
  	"review_card_title" varchar,
  	"review_card_text" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "sleep_apnea_about_hst_steps" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"number" varchar,
  	"text" varchar
  );
  
  CREATE TABLE "sleep_apnea_about_hst_booking_options" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"value" varchar
  );
  
  CREATE TABLE "sleep_apnea_about_hst" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"title" varchar DEFAULT 'About the IPD Home Sleep Apnoea Test',
  	"subtitle" varchar DEFAULT 'A simple, comfortable home test designed for high diagnostic quality. Every result is clinically reviewed and signed off by a UK-based Consultant Sleep Physician.',
  	"booking_title" varchar DEFAULT 'Book your appointment',
  	"booking_submit_text" varchar DEFAULT 'Book Appointment',
  	"booking_note" varchar DEFAULT 'We''ll confirm availability and next steps by email or phone.',
  	"block_name" varchar
  );
  
  CREATE TABLE "sleep_apnea_why_ipd_items" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"title" varchar,
  	"text" varchar,
  	"wide" boolean DEFAULT false
  );
  
  CREATE TABLE "sleep_apnea_why_ipd" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"title" varchar DEFAULT 'Why Choose IPD?',
  	"subtitle" varchar DEFAULT 'Experience the difference that expertise and personalized care can make in your sleep health journey',
  	"block_name" varchar
  );
  
  CREATE TABLE "sleep_apnea_after_test_sections" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"title" varchar,
  	"rich_text" jsonb
  );
  
  CREATE TABLE "sleep_apnea_after_test" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"title" varchar DEFAULT 'What Happens After the Test?',
  	"subtitle" varchar DEFAULT 'If your home sleep test confirms sleep apnoea, the good news is that it''s highly manageable. Getting the right diagnosis is the first step toward better sleep and long-term health.',
  	"block_name" varchar
  );
  
  CREATE TABLE "cbti_block_program_features" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"text" varchar
  );
  
  CREATE TABLE "cbti_block_techniques" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"title" varchar,
  	"description" varchar
  );
  
  CREATE TABLE "cbti_block" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"hero_title" varchar DEFAULT 'Cognitive Behavioural Therapy for Insomnia',
  	"hero_subtitle" varchar,
  	"what_is_title" varchar DEFAULT 'What is CBTi?',
  	"what_is_rich_text" jsonb,
  	"program_title" varchar DEFAULT 'Our CBTi Programme',
  	"program_intro_rich_text" jsonb,
  	"why_title" varchar DEFAULT 'Why Should I Do Cognitive Behavioural Therapy for Insomnia (CBTi)?',
  	"why_rich_text" jsonb,
  	"cta_title" varchar DEFAULT 'Start CBTi and Restore Restful Sleep',
  	"cta_description" jsonb,
  	"cta_primary_label" varchar,
  	"cta_primary_link_type" "enum_cbti_block_cta_primary_link_type" DEFAULT 'internal',
  	"cta_primary_external_href" varchar,
  	"cta_secondary_label" varchar,
  	"cta_secondary_link_type" "enum_cbti_block_cta_secondary_link_type" DEFAULT 'external',
  	"cta_secondary_external_href" varchar,
  	"cta_image_id" integer,
  	"block_name" varchar
  );
  
  CREATE TABLE "mslt_block_test_steps" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"title" varchar,
  	"description" varchar
  );
  
  CREATE TABLE "mslt_block_conditions" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"text" varchar
  );
  
  CREATE TABLE "mslt_block_symptoms" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"text" varchar
  );
  
  CREATE TABLE "mslt_block" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"hero_title" varchar DEFAULT 'Multiple Sleep Latency Test',
  	"hero_subtitle" varchar,
  	"what_is_title" varchar DEFAULT 'What is the MSLT?',
  	"what_is_rich_text" jsonb,
  	"involve_title" varchar DEFAULT 'What Does the MSLT Involve?',
  	"involve_intro_rich_text" jsonb,
  	"involve_detail_rich_text" jsonb,
  	"why_title" varchar DEFAULT 'Why Is the MSLT Important?',
  	"why_intro_rich_text" jsonb,
  	"who_title" varchar DEFAULT 'Who Should Be Referred for a MSLT?',
  	"who_conclusion_rich_text" jsonb,
  	"ipd_title" varchar DEFAULT 'Where and How IPD Performs the MSLT',
  	"ipd_rich_text" jsonb,
  	"cta_title" varchar DEFAULT 'Expert Sleep Diagnostics from IPD',
  	"cta_description" jsonb,
  	"cta_primary_label" varchar,
  	"cta_primary_link_type" "enum_mslt_block_cta_primary_link_type" DEFAULT 'internal',
  	"cta_primary_external_href" varchar,
  	"cta_secondary_label" varchar,
  	"cta_secondary_link_type" "enum_mslt_block_cta_secondary_link_type" DEFAULT 'external',
  	"cta_secondary_external_href" varchar,
  	"cta_image_id" integer,
  	"block_name" varchar
  );
  
  CREATE TABLE "mwt_block_test_benefits" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"text" varchar
  );
  
  CREATE TABLE "mwt_block_test_steps" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"title" varchar,
  	"description" varchar
  );
  
  CREATE TABLE "mwt_block" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"hero_title" varchar DEFAULT 'Maintenance of Wakefulness Test',
  	"hero_subtitle" varchar,
  	"what_is_title" varchar DEFAULT 'What is a Maintenance of Wakefulness Test (MWT)?',
  	"what_is_rich_text" jsonb,
  	"importance_title" varchar DEFAULT 'The Importance of Maintenance of Wakefulness Test',
  	"importance_intro_rich_text" jsonb,
  	"why_card_title" varchar DEFAULT 'Why is MWT Important?',
  	"why_card_description" varchar DEFAULT 'Results can inform critical decisions about your daily life and safety',
  	"who_title" varchar DEFAULT 'Do I need a Maintenance of Wakefulness Test?',
  	"who_rich_text" jsonb,
  	"happens_title" varchar DEFAULT 'What Happens During a Maintenance of Wakefulness Test?',
  	"happens_intro_rich_text" jsonb,
  	"happens_detail_rich_text" jsonb,
  	"ipd_title" varchar DEFAULT 'How and where IPD performs the Maintenance of Wakefulness Test?',
  	"ipd_rich_text" jsonb,
  	"cta_title" varchar DEFAULT 'Expert sleep testing with IPD',
  	"cta_description" jsonb,
  	"cta_primary_label" varchar,
  	"cta_primary_link_type" "enum_mwt_block_cta_primary_link_type" DEFAULT 'internal',
  	"cta_primary_external_href" varchar,
  	"cta_secondary_label" varchar,
  	"cta_secondary_link_type" "enum_mwt_block_cta_secondary_link_type" DEFAULT 'external',
  	"cta_secondary_external_href" varchar,
  	"cta_image_id" integer,
  	"block_name" varchar
  );
  
  CREATE TABLE "actigraphy_block_reasons" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"title" varchar,
  	"description" varchar
  );
  
  CREATE TABLE "actigraphy_block_features" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"text" varchar
  );
  
  CREATE TABLE "actigraphy_block" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"hero_title" varchar DEFAULT 'Actigraphy Sleep Testing',
  	"hero_subtitle" varchar,
  	"what_is_title" varchar DEFAULT 'What is Actigraphy?',
  	"what_is_rich_text" jsonb,
  	"why_title" varchar DEFAULT 'Why Choose Actigraphy?',
  	"why_intro_rich_text" jsonb,
  	"ipd_title" varchar DEFAULT 'Clinically Led, Conveniently Delivered',
  	"ipd_rich_text" jsonb,
  	"cta_title" varchar DEFAULT 'Start Your Actigraphy Assessment Today',
  	"cta_description" jsonb,
  	"cta_primary_label" varchar,
  	"cta_primary_link_type" "enum_actigraphy_block_cta_primary_link_type" DEFAULT 'internal',
  	"cta_primary_external_href" varchar,
  	"cta_secondary_label" varchar,
  	"cta_secondary_link_type" "enum_actigraphy_block_cta_secondary_link_type" DEFAULT 'external',
  	"cta_secondary_external_href" varchar,
  	"cta_image_id" integer,
  	"block_name" varchar
  );
  
  CREATE TABLE "vpsg_block_monitoring_aspects" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"label" varchar
  );
  
  CREATE TABLE "vpsg_block_why_cards" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"title" varchar,
  	"text" varchar
  );
  
  CREATE TABLE "vpsg_block_conditions" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"text" varchar
  );
  
  CREATE TABLE "vpsg_block" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"hero_title" varchar DEFAULT 'Video Polysomnography',
  	"hero_subtitle" varchar,
  	"hero_primary_label" varchar,
  	"hero_primary_link_type" "enum_vpsg_block_hero_primary_link_type" DEFAULT 'internal',
  	"hero_primary_external_href" varchar,
  	"hero_secondary_label" varchar,
  	"hero_secondary_link_type" "enum_vpsg_block_hero_secondary_link_type" DEFAULT 'external',
  	"hero_secondary_external_href" varchar,
  	"what_is_title" varchar DEFAULT 'What Is Video Polysomnography?',
  	"what_is_rich_text" jsonb,
  	"why_title" varchar DEFAULT 'Why Is It the Gold Standard?',
  	"why_intro_rich_text" jsonb,
  	"conditions_title" varchar DEFAULT 'When Is vPSG Recommended?',
  	"cta_bg_image_id" integer,
  	"cta_title" varchar DEFAULT 'Expert Care in Clinical Settings or Your Home',
  	"cta_left_rich_text" jsonb,
  	"cta_primary_label" varchar,
  	"cta_primary_link_type" "enum_vpsg_block_cta_primary_link_type" DEFAULT 'internal',
  	"cta_primary_external_href" varchar,
  	"cta_secondary_label" varchar,
  	"cta_secondary_link_type" "enum_vpsg_block_cta_secondary_link_type" DEFAULT 'external',
  	"cta_secondary_external_href" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "vpsg_eeg_block_when_reasons" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"text" varchar
  );
  
  CREATE TABLE "vpsg_eeg_block_measures" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"category" varchar,
  	"description" varchar
  );
  
  CREATE TABLE "vpsg_eeg_block_how_steps" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"title" varchar,
  	"description" varchar
  );
  
  CREATE TABLE "vpsg_eeg_block_why_choose" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"text" varchar
  );
  
  CREATE TABLE "vpsg_eeg_block" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"hero_title" varchar DEFAULT 'Combined Video Polysomnography',
  	"hero_subtitle" varchar,
  	"hero_primary_label" varchar,
  	"hero_primary_link_type" "enum_vpsg_eeg_block_hero_primary_link_type" DEFAULT 'internal',
  	"hero_primary_external_href" varchar,
  	"hero_secondary_label" varchar,
  	"hero_secondary_link_type" "enum_vpsg_eeg_block_hero_secondary_link_type" DEFAULT 'external',
  	"hero_secondary_external_href" varchar,
  	"importance_title" varchar DEFAULT 'Importance of Combined vPSG with Full EEG',
  	"importance_rich_text" jsonb,
  	"when_title" varchar DEFAULT 'When Should I Take This Test?',
  	"when_intro_rich_text" jsonb,
  	"measures_title" varchar DEFAULT 'What the Test Measures',
  	"measures_intro_rich_text" jsonb,
  	"measures_footnote_rich_text" jsonb,
  	"how_title" varchar DEFAULT 'How the Test Is Performed',
  	"reporting_title" varchar DEFAULT 'Comprehensive Reporting',
  	"reporting_text" varchar,
  	"why_choose_title" varchar DEFAULT 'Why Choose IPD for Combined vPSG with Full EEG?',
  	"cta_bg_image_id" integer,
  	"cta_title" varchar DEFAULT 'Why Choose IPD for Combined vPSG with Full EEG?',
  	"cta_right_top_rich_text" jsonb,
  	"cta_right_bottom_rich_text" jsonb,
  	"cta_primary_label" varchar,
  	"cta_primary_link_type" "enum_vpsg_eeg_block_cta_primary_link_type" DEFAULT 'internal',
  	"cta_primary_external_href" varchar,
  	"cta_secondary_label" varchar,
  	"cta_secondary_link_type" "enum_vpsg_eeg_block_cta_secondary_link_type" DEFAULT 'external',
  	"cta_secondary_external_href" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "respiratory_polygrophy_block_test_measures" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"icon" varchar,
  	"title" varchar,
  	"description" varchar
  );
  
  CREATE TABLE "respiratory_polygrophy_block_symptoms" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"text" varchar
  );
  
  CREATE TABLE "respiratory_polygrophy_block_benefits" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"text" varchar
  );
  
  CREATE TABLE "respiratory_polygrophy_block" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"hero_title" varchar DEFAULT 'Respiratory Polygraphy',
  	"hero_subtitle" varchar,
  	"hero_primary_label" varchar,
  	"hero_primary_link_type" "enum_respiratory_polygrophy_block_hero_primary_link_type" DEFAULT 'internal',
  	"hero_primary_external_href" varchar,
  	"hero_secondary_label" varchar,
  	"hero_secondary_link_type" "enum_respiratory_polygrophy_block_hero_secondary_link_type" DEFAULT 'external',
  	"hero_secondary_external_href" varchar,
  	"what_is_title" varchar DEFAULT 'What Does Respiratory Polygraphy Involve?',
  	"what_is_paragraph1" varchar,
  	"what_is_paragraph2" varchar,
  	"measures_title" varchar DEFAULT 'What We Monitor During Your Sleep',
  	"why_title" varchar DEFAULT 'Why Is Respiratory Polygraphy Used?',
  	"why_paragraph1" varchar,
  	"why_paragraph2" varchar,
  	"who_title" varchar DEFAULT 'Who Should Have a Respiratory Polygraphy Test?',
  	"who_intro" varchar,
  	"how_title" varchar DEFAULT 'How Is the Test Performed?',
  	"how_paragraph1" varchar,
  	"how_paragraph2" varchar,
  	"cta_title" varchar DEFAULT 'Expert Sleep Assessment, Delivered to You',
  	"cta_paragraph1" varchar,
  	"cta_paragraph2" varchar,
  	"cta_primary_label" varchar,
  	"cta_primary_link_type" "enum_respiratory_polygrophy_block_cta_primary_link_type" DEFAULT 'internal',
  	"cta_primary_external_href" varchar,
  	"cta_secondary_label" varchar,
  	"cta_secondary_link_type" "enum_respiratory_polygrophy_block_cta_secondary_link_type" DEFAULT 'external',
  	"cta_secondary_external_href" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "_cpap_block_v" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"title" varchar DEFAULT 'Choose Your CPAP Therapy Option',
  	"subtitle" varchar DEFAULT 'Professional sleep therapy solutions with comprehensive support from certified Clinical Sleep Physiologists',
  	"_uuid" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "_sleep_apnea_intro_steps_v_items" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"number" varchar,
  	"title" varchar,
  	"description" varchar,
  	"link_type" "enum__sleep_apnea_intro_steps_v_items_link_type" DEFAULT 'internal',
  	"external_href" varchar,
  	"button_text" varchar,
  	"_uuid" varchar
  );
  
  CREATE TABLE "_sleep_apnea_intro_steps_v" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"title" varchar DEFAULT 'Step 1: Getting Started – How to Get Tested for Sleep Apnoea',
  	"subtitle" varchar DEFAULT 'Do you snore, struggle with unrefreshing sleep, or suspect sleep apnoea? Take these two simple steps to begin your journey to better sleep:',
  	"_uuid" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "_sleep_apnea_test_options_v_items_badges" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"text" varchar,
  	"tone" "enum__sleep_apnea_test_options_v_items_badges_tone" DEFAULT 'neutral',
  	"_uuid" varchar
  );
  
  CREATE TABLE "_sleep_apnea_test_options_v_items" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"key" varchar,
  	"icon" "enum__sleep_apnea_test_options_v_items_icon" DEFAULT 'home',
  	"title" varchar,
  	"description" varchar,
  	"link_type_primary" "enum__sleep_apnea_test_options_v_items_link_type_primary" DEFAULT 'internal',
  	"primary_external_href" varchar,
  	"primary_text" varchar,
  	"link_type_secondary" "enum__sleep_apnea_test_options_v_items_link_type_secondary" DEFAULT 'external',
  	"secondary_external_href" varchar,
  	"secondary_text" varchar,
  	"_uuid" varchar
  );
  
  CREATE TABLE "_sleep_apnea_test_options_v" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"title" varchar DEFAULT 'Step 2: Understand Your Sleep Test Options',
  	"_uuid" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "_sleep_apnea_report_includes_v_features" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"text" varchar,
  	"wide" boolean DEFAULT false,
  	"_uuid" varchar
  );
  
  CREATE TABLE "_sleep_apnea_report_includes_v" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"title" varchar DEFAULT 'What Your Report Includes',
  	"review_card_title" varchar,
  	"review_card_text" varchar,
  	"_uuid" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "_sleep_apnea_about_hst_v_steps" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"number" varchar,
  	"text" varchar,
  	"_uuid" varchar
  );
  
  CREATE TABLE "_sleep_apnea_about_hst_v_booking_options" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"value" varchar,
  	"_uuid" varchar
  );
  
  CREATE TABLE "_sleep_apnea_about_hst_v" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"title" varchar DEFAULT 'About the IPD Home Sleep Apnoea Test',
  	"subtitle" varchar DEFAULT 'A simple, comfortable home test designed for high diagnostic quality. Every result is clinically reviewed and signed off by a UK-based Consultant Sleep Physician.',
  	"booking_title" varchar DEFAULT 'Book your appointment',
  	"booking_submit_text" varchar DEFAULT 'Book Appointment',
  	"booking_note" varchar DEFAULT 'We''ll confirm availability and next steps by email or phone.',
  	"_uuid" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "_sleep_apnea_why_ipd_v_items" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"title" varchar,
  	"text" varchar,
  	"wide" boolean DEFAULT false,
  	"_uuid" varchar
  );
  
  CREATE TABLE "_sleep_apnea_why_ipd_v" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"title" varchar DEFAULT 'Why Choose IPD?',
  	"subtitle" varchar DEFAULT 'Experience the difference that expertise and personalized care can make in your sleep health journey',
  	"_uuid" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "_sleep_apnea_after_test_v_sections" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"title" varchar,
  	"rich_text" jsonb,
  	"_uuid" varchar
  );
  
  CREATE TABLE "_sleep_apnea_after_test_v" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"title" varchar DEFAULT 'What Happens After the Test?',
  	"subtitle" varchar DEFAULT 'If your home sleep test confirms sleep apnoea, the good news is that it''s highly manageable. Getting the right diagnosis is the first step toward better sleep and long-term health.',
  	"_uuid" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "_cbti_block_v_program_features" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"text" varchar,
  	"_uuid" varchar
  );
  
  CREATE TABLE "_cbti_block_v_techniques" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"title" varchar,
  	"description" varchar,
  	"_uuid" varchar
  );
  
  CREATE TABLE "_cbti_block_v" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"hero_title" varchar DEFAULT 'Cognitive Behavioural Therapy for Insomnia',
  	"hero_subtitle" varchar,
  	"what_is_title" varchar DEFAULT 'What is CBTi?',
  	"what_is_rich_text" jsonb,
  	"program_title" varchar DEFAULT 'Our CBTi Programme',
  	"program_intro_rich_text" jsonb,
  	"why_title" varchar DEFAULT 'Why Should I Do Cognitive Behavioural Therapy for Insomnia (CBTi)?',
  	"why_rich_text" jsonb,
  	"cta_title" varchar DEFAULT 'Start CBTi and Restore Restful Sleep',
  	"cta_description" jsonb,
  	"cta_primary_label" varchar,
  	"cta_primary_link_type" "enum__cbti_block_v_cta_primary_link_type" DEFAULT 'internal',
  	"cta_primary_external_href" varchar,
  	"cta_secondary_label" varchar,
  	"cta_secondary_link_type" "enum__cbti_block_v_cta_secondary_link_type" DEFAULT 'external',
  	"cta_secondary_external_href" varchar,
  	"cta_image_id" integer,
  	"_uuid" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "_mslt_block_v_test_steps" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"title" varchar,
  	"description" varchar,
  	"_uuid" varchar
  );
  
  CREATE TABLE "_mslt_block_v_conditions" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"text" varchar,
  	"_uuid" varchar
  );
  
  CREATE TABLE "_mslt_block_v_symptoms" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"text" varchar,
  	"_uuid" varchar
  );
  
  CREATE TABLE "_mslt_block_v" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"hero_title" varchar DEFAULT 'Multiple Sleep Latency Test',
  	"hero_subtitle" varchar,
  	"what_is_title" varchar DEFAULT 'What is the MSLT?',
  	"what_is_rich_text" jsonb,
  	"involve_title" varchar DEFAULT 'What Does the MSLT Involve?',
  	"involve_intro_rich_text" jsonb,
  	"involve_detail_rich_text" jsonb,
  	"why_title" varchar DEFAULT 'Why Is the MSLT Important?',
  	"why_intro_rich_text" jsonb,
  	"who_title" varchar DEFAULT 'Who Should Be Referred for a MSLT?',
  	"who_conclusion_rich_text" jsonb,
  	"ipd_title" varchar DEFAULT 'Where and How IPD Performs the MSLT',
  	"ipd_rich_text" jsonb,
  	"cta_title" varchar DEFAULT 'Expert Sleep Diagnostics from IPD',
  	"cta_description" jsonb,
  	"cta_primary_label" varchar,
  	"cta_primary_link_type" "enum__mslt_block_v_cta_primary_link_type" DEFAULT 'internal',
  	"cta_primary_external_href" varchar,
  	"cta_secondary_label" varchar,
  	"cta_secondary_link_type" "enum__mslt_block_v_cta_secondary_link_type" DEFAULT 'external',
  	"cta_secondary_external_href" varchar,
  	"cta_image_id" integer,
  	"_uuid" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "_mwt_block_v_test_benefits" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"text" varchar,
  	"_uuid" varchar
  );
  
  CREATE TABLE "_mwt_block_v_test_steps" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"title" varchar,
  	"description" varchar,
  	"_uuid" varchar
  );
  
  CREATE TABLE "_mwt_block_v" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"hero_title" varchar DEFAULT 'Maintenance of Wakefulness Test',
  	"hero_subtitle" varchar,
  	"what_is_title" varchar DEFAULT 'What is a Maintenance of Wakefulness Test (MWT)?',
  	"what_is_rich_text" jsonb,
  	"importance_title" varchar DEFAULT 'The Importance of Maintenance of Wakefulness Test',
  	"importance_intro_rich_text" jsonb,
  	"why_card_title" varchar DEFAULT 'Why is MWT Important?',
  	"why_card_description" varchar DEFAULT 'Results can inform critical decisions about your daily life and safety',
  	"who_title" varchar DEFAULT 'Do I need a Maintenance of Wakefulness Test?',
  	"who_rich_text" jsonb,
  	"happens_title" varchar DEFAULT 'What Happens During a Maintenance of Wakefulness Test?',
  	"happens_intro_rich_text" jsonb,
  	"happens_detail_rich_text" jsonb,
  	"ipd_title" varchar DEFAULT 'How and where IPD performs the Maintenance of Wakefulness Test?',
  	"ipd_rich_text" jsonb,
  	"cta_title" varchar DEFAULT 'Expert sleep testing with IPD',
  	"cta_description" jsonb,
  	"cta_primary_label" varchar,
  	"cta_primary_link_type" "enum__mwt_block_v_cta_primary_link_type" DEFAULT 'internal',
  	"cta_primary_external_href" varchar,
  	"cta_secondary_label" varchar,
  	"cta_secondary_link_type" "enum__mwt_block_v_cta_secondary_link_type" DEFAULT 'external',
  	"cta_secondary_external_href" varchar,
  	"cta_image_id" integer,
  	"_uuid" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "_actigraphy_block_v_reasons" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"title" varchar,
  	"description" varchar,
  	"_uuid" varchar
  );
  
  CREATE TABLE "_actigraphy_block_v_features" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"text" varchar,
  	"_uuid" varchar
  );
  
  CREATE TABLE "_actigraphy_block_v" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"hero_title" varchar DEFAULT 'Actigraphy Sleep Testing',
  	"hero_subtitle" varchar,
  	"what_is_title" varchar DEFAULT 'What is Actigraphy?',
  	"what_is_rich_text" jsonb,
  	"why_title" varchar DEFAULT 'Why Choose Actigraphy?',
  	"why_intro_rich_text" jsonb,
  	"ipd_title" varchar DEFAULT 'Clinically Led, Conveniently Delivered',
  	"ipd_rich_text" jsonb,
  	"cta_title" varchar DEFAULT 'Start Your Actigraphy Assessment Today',
  	"cta_description" jsonb,
  	"cta_primary_label" varchar,
  	"cta_primary_link_type" "enum__actigraphy_block_v_cta_primary_link_type" DEFAULT 'internal',
  	"cta_primary_external_href" varchar,
  	"cta_secondary_label" varchar,
  	"cta_secondary_link_type" "enum__actigraphy_block_v_cta_secondary_link_type" DEFAULT 'external',
  	"cta_secondary_external_href" varchar,
  	"cta_image_id" integer,
  	"_uuid" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "_vpsg_block_v_monitoring_aspects" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"label" varchar,
  	"_uuid" varchar
  );
  
  CREATE TABLE "_vpsg_block_v_why_cards" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"title" varchar,
  	"text" varchar,
  	"_uuid" varchar
  );
  
  CREATE TABLE "_vpsg_block_v_conditions" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"text" varchar,
  	"_uuid" varchar
  );
  
  CREATE TABLE "_vpsg_block_v" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"hero_title" varchar DEFAULT 'Video Polysomnography',
  	"hero_subtitle" varchar,
  	"hero_primary_label" varchar,
  	"hero_primary_link_type" "enum__vpsg_block_v_hero_primary_link_type" DEFAULT 'internal',
  	"hero_primary_external_href" varchar,
  	"hero_secondary_label" varchar,
  	"hero_secondary_link_type" "enum__vpsg_block_v_hero_secondary_link_type" DEFAULT 'external',
  	"hero_secondary_external_href" varchar,
  	"what_is_title" varchar DEFAULT 'What Is Video Polysomnography?',
  	"what_is_rich_text" jsonb,
  	"why_title" varchar DEFAULT 'Why Is It the Gold Standard?',
  	"why_intro_rich_text" jsonb,
  	"conditions_title" varchar DEFAULT 'When Is vPSG Recommended?',
  	"cta_bg_image_id" integer,
  	"cta_title" varchar DEFAULT 'Expert Care in Clinical Settings or Your Home',
  	"cta_left_rich_text" jsonb,
  	"cta_primary_label" varchar,
  	"cta_primary_link_type" "enum__vpsg_block_v_cta_primary_link_type" DEFAULT 'internal',
  	"cta_primary_external_href" varchar,
  	"cta_secondary_label" varchar,
  	"cta_secondary_link_type" "enum__vpsg_block_v_cta_secondary_link_type" DEFAULT 'external',
  	"cta_secondary_external_href" varchar,
  	"_uuid" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "_vpsg_eeg_block_v_when_reasons" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"text" varchar,
  	"_uuid" varchar
  );
  
  CREATE TABLE "_vpsg_eeg_block_v_measures" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"category" varchar,
  	"description" varchar,
  	"_uuid" varchar
  );
  
  CREATE TABLE "_vpsg_eeg_block_v_how_steps" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"title" varchar,
  	"description" varchar,
  	"_uuid" varchar
  );
  
  CREATE TABLE "_vpsg_eeg_block_v_why_choose" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"text" varchar,
  	"_uuid" varchar
  );
  
  CREATE TABLE "_vpsg_eeg_block_v" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"hero_title" varchar DEFAULT 'Combined Video Polysomnography',
  	"hero_subtitle" varchar,
  	"hero_primary_label" varchar,
  	"hero_primary_link_type" "enum__vpsg_eeg_block_v_hero_primary_link_type" DEFAULT 'internal',
  	"hero_primary_external_href" varchar,
  	"hero_secondary_label" varchar,
  	"hero_secondary_link_type" "enum__vpsg_eeg_block_v_hero_secondary_link_type" DEFAULT 'external',
  	"hero_secondary_external_href" varchar,
  	"importance_title" varchar DEFAULT 'Importance of Combined vPSG with Full EEG',
  	"importance_rich_text" jsonb,
  	"when_title" varchar DEFAULT 'When Should I Take This Test?',
  	"when_intro_rich_text" jsonb,
  	"measures_title" varchar DEFAULT 'What the Test Measures',
  	"measures_intro_rich_text" jsonb,
  	"measures_footnote_rich_text" jsonb,
  	"how_title" varchar DEFAULT 'How the Test Is Performed',
  	"reporting_title" varchar DEFAULT 'Comprehensive Reporting',
  	"reporting_text" varchar,
  	"why_choose_title" varchar DEFAULT 'Why Choose IPD for Combined vPSG with Full EEG?',
  	"cta_bg_image_id" integer,
  	"cta_title" varchar DEFAULT 'Why Choose IPD for Combined vPSG with Full EEG?',
  	"cta_right_top_rich_text" jsonb,
  	"cta_right_bottom_rich_text" jsonb,
  	"cta_primary_label" varchar,
  	"cta_primary_link_type" "enum__vpsg_eeg_block_v_cta_primary_link_type" DEFAULT 'internal',
  	"cta_primary_external_href" varchar,
  	"cta_secondary_label" varchar,
  	"cta_secondary_link_type" "enum__vpsg_eeg_block_v_cta_secondary_link_type" DEFAULT 'external',
  	"cta_secondary_external_href" varchar,
  	"_uuid" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "_respiratory_polygrophy_block_v_test_measures" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"icon" varchar,
  	"title" varchar,
  	"description" varchar,
  	"_uuid" varchar
  );
  
  CREATE TABLE "_respiratory_polygrophy_block_v_symptoms" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"text" varchar,
  	"_uuid" varchar
  );
  
  CREATE TABLE "_respiratory_polygrophy_block_v_benefits" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"text" varchar,
  	"_uuid" varchar
  );
  
  CREATE TABLE "_respiratory_polygrophy_block_v" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"hero_title" varchar DEFAULT 'Respiratory Polygraphy',
  	"hero_subtitle" varchar,
  	"hero_primary_label" varchar,
  	"hero_primary_link_type" "enum__respiratory_polygrophy_block_v_hero_primary_link_type" DEFAULT 'internal',
  	"hero_primary_external_href" varchar,
  	"hero_secondary_label" varchar,
  	"hero_secondary_link_type" "enum__respiratory_polygrophy_block_v_hero_secondary_link_type" DEFAULT 'external',
  	"hero_secondary_external_href" varchar,
  	"what_is_title" varchar DEFAULT 'What Does Respiratory Polygraphy Involve?',
  	"what_is_paragraph1" varchar,
  	"what_is_paragraph2" varchar,
  	"measures_title" varchar DEFAULT 'What We Monitor During Your Sleep',
  	"why_title" varchar DEFAULT 'Why Is Respiratory Polygraphy Used?',
  	"why_paragraph1" varchar,
  	"why_paragraph2" varchar,
  	"who_title" varchar DEFAULT 'Who Should Have a Respiratory Polygraphy Test?',
  	"who_intro" varchar,
  	"how_title" varchar DEFAULT 'How Is the Test Performed?',
  	"how_paragraph1" varchar,
  	"how_paragraph2" varchar,
  	"cta_title" varchar DEFAULT 'Expert Sleep Assessment, Delivered to You',
  	"cta_paragraph1" varchar,
  	"cta_paragraph2" varchar,
  	"cta_primary_label" varchar,
  	"cta_primary_link_type" "enum__respiratory_polygrophy_block_v_cta_primary_link_type" DEFAULT 'internal',
  	"cta_primary_external_href" varchar,
  	"cta_secondary_label" varchar,
  	"cta_secondary_link_type" "enum__respiratory_polygrophy_block_v_cta_secondary_link_type" DEFAULT 'external',
  	"cta_secondary_external_href" varchar,
  	"_uuid" varchar,
  	"block_name" varchar
  );
  
  ALTER TABLE "cpap_block" ADD CONSTRAINT "cpap_block_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "sleep_apnea_intro_steps_items" ADD CONSTRAINT "sleep_apnea_intro_steps_items_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."sleep_apnea_intro_steps"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "sleep_apnea_intro_steps" ADD CONSTRAINT "sleep_apnea_intro_steps_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "sleep_apnea_test_options_items_badges" ADD CONSTRAINT "sleep_apnea_test_options_items_badges_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."sleep_apnea_test_options_items"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "sleep_apnea_test_options_items" ADD CONSTRAINT "sleep_apnea_test_options_items_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."sleep_apnea_test_options"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "sleep_apnea_test_options" ADD CONSTRAINT "sleep_apnea_test_options_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "sleep_apnea_report_includes_features" ADD CONSTRAINT "sleep_apnea_report_includes_features_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."sleep_apnea_report_includes"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "sleep_apnea_report_includes" ADD CONSTRAINT "sleep_apnea_report_includes_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "sleep_apnea_about_hst_steps" ADD CONSTRAINT "sleep_apnea_about_hst_steps_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."sleep_apnea_about_hst"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "sleep_apnea_about_hst_booking_options" ADD CONSTRAINT "sleep_apnea_about_hst_booking_options_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."sleep_apnea_about_hst"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "sleep_apnea_about_hst" ADD CONSTRAINT "sleep_apnea_about_hst_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "sleep_apnea_why_ipd_items" ADD CONSTRAINT "sleep_apnea_why_ipd_items_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."sleep_apnea_why_ipd"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "sleep_apnea_why_ipd" ADD CONSTRAINT "sleep_apnea_why_ipd_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "sleep_apnea_after_test_sections" ADD CONSTRAINT "sleep_apnea_after_test_sections_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."sleep_apnea_after_test"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "sleep_apnea_after_test" ADD CONSTRAINT "sleep_apnea_after_test_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "cbti_block_program_features" ADD CONSTRAINT "cbti_block_program_features_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."cbti_block"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "cbti_block_techniques" ADD CONSTRAINT "cbti_block_techniques_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."cbti_block"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "cbti_block" ADD CONSTRAINT "cbti_block_cta_image_id_media_id_fk" FOREIGN KEY ("cta_image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "cbti_block" ADD CONSTRAINT "cbti_block_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "mslt_block_test_steps" ADD CONSTRAINT "mslt_block_test_steps_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."mslt_block"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "mslt_block_conditions" ADD CONSTRAINT "mslt_block_conditions_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."mslt_block"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "mslt_block_symptoms" ADD CONSTRAINT "mslt_block_symptoms_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."mslt_block"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "mslt_block" ADD CONSTRAINT "mslt_block_cta_image_id_media_id_fk" FOREIGN KEY ("cta_image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "mslt_block" ADD CONSTRAINT "mslt_block_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "mwt_block_test_benefits" ADD CONSTRAINT "mwt_block_test_benefits_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."mwt_block"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "mwt_block_test_steps" ADD CONSTRAINT "mwt_block_test_steps_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."mwt_block"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "mwt_block" ADD CONSTRAINT "mwt_block_cta_image_id_media_id_fk" FOREIGN KEY ("cta_image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "mwt_block" ADD CONSTRAINT "mwt_block_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "actigraphy_block_reasons" ADD CONSTRAINT "actigraphy_block_reasons_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."actigraphy_block"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "actigraphy_block_features" ADD CONSTRAINT "actigraphy_block_features_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."actigraphy_block"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "actigraphy_block" ADD CONSTRAINT "actigraphy_block_cta_image_id_media_id_fk" FOREIGN KEY ("cta_image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "actigraphy_block" ADD CONSTRAINT "actigraphy_block_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "vpsg_block_monitoring_aspects" ADD CONSTRAINT "vpsg_block_monitoring_aspects_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."vpsg_block"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "vpsg_block_why_cards" ADD CONSTRAINT "vpsg_block_why_cards_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."vpsg_block"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "vpsg_block_conditions" ADD CONSTRAINT "vpsg_block_conditions_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."vpsg_block"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "vpsg_block" ADD CONSTRAINT "vpsg_block_cta_bg_image_id_media_id_fk" FOREIGN KEY ("cta_bg_image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "vpsg_block" ADD CONSTRAINT "vpsg_block_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "vpsg_eeg_block_when_reasons" ADD CONSTRAINT "vpsg_eeg_block_when_reasons_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."vpsg_eeg_block"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "vpsg_eeg_block_measures" ADD CONSTRAINT "vpsg_eeg_block_measures_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."vpsg_eeg_block"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "vpsg_eeg_block_how_steps" ADD CONSTRAINT "vpsg_eeg_block_how_steps_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."vpsg_eeg_block"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "vpsg_eeg_block_why_choose" ADD CONSTRAINT "vpsg_eeg_block_why_choose_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."vpsg_eeg_block"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "vpsg_eeg_block" ADD CONSTRAINT "vpsg_eeg_block_cta_bg_image_id_media_id_fk" FOREIGN KEY ("cta_bg_image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "vpsg_eeg_block" ADD CONSTRAINT "vpsg_eeg_block_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "respiratory_polygrophy_block_test_measures" ADD CONSTRAINT "respiratory_polygrophy_block_test_measures_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."respiratory_polygrophy_block"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "respiratory_polygrophy_block_symptoms" ADD CONSTRAINT "respiratory_polygrophy_block_symptoms_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."respiratory_polygrophy_block"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "respiratory_polygrophy_block_benefits" ADD CONSTRAINT "respiratory_polygrophy_block_benefits_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."respiratory_polygrophy_block"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "respiratory_polygrophy_block" ADD CONSTRAINT "respiratory_polygrophy_block_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_cpap_block_v" ADD CONSTRAINT "_cpap_block_v_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_sleep_apnea_intro_steps_v_items" ADD CONSTRAINT "_sleep_apnea_intro_steps_v_items_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_sleep_apnea_intro_steps_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_sleep_apnea_intro_steps_v" ADD CONSTRAINT "_sleep_apnea_intro_steps_v_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_sleep_apnea_test_options_v_items_badges" ADD CONSTRAINT "_sleep_apnea_test_options_v_items_badges_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_sleep_apnea_test_options_v_items"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_sleep_apnea_test_options_v_items" ADD CONSTRAINT "_sleep_apnea_test_options_v_items_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_sleep_apnea_test_options_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_sleep_apnea_test_options_v" ADD CONSTRAINT "_sleep_apnea_test_options_v_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_sleep_apnea_report_includes_v_features" ADD CONSTRAINT "_sleep_apnea_report_includes_v_features_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_sleep_apnea_report_includes_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_sleep_apnea_report_includes_v" ADD CONSTRAINT "_sleep_apnea_report_includes_v_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_sleep_apnea_about_hst_v_steps" ADD CONSTRAINT "_sleep_apnea_about_hst_v_steps_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_sleep_apnea_about_hst_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_sleep_apnea_about_hst_v_booking_options" ADD CONSTRAINT "_sleep_apnea_about_hst_v_booking_options_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_sleep_apnea_about_hst_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_sleep_apnea_about_hst_v" ADD CONSTRAINT "_sleep_apnea_about_hst_v_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_sleep_apnea_why_ipd_v_items" ADD CONSTRAINT "_sleep_apnea_why_ipd_v_items_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_sleep_apnea_why_ipd_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_sleep_apnea_why_ipd_v" ADD CONSTRAINT "_sleep_apnea_why_ipd_v_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_sleep_apnea_after_test_v_sections" ADD CONSTRAINT "_sleep_apnea_after_test_v_sections_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_sleep_apnea_after_test_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_sleep_apnea_after_test_v" ADD CONSTRAINT "_sleep_apnea_after_test_v_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_cbti_block_v_program_features" ADD CONSTRAINT "_cbti_block_v_program_features_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_cbti_block_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_cbti_block_v_techniques" ADD CONSTRAINT "_cbti_block_v_techniques_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_cbti_block_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_cbti_block_v" ADD CONSTRAINT "_cbti_block_v_cta_image_id_media_id_fk" FOREIGN KEY ("cta_image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_cbti_block_v" ADD CONSTRAINT "_cbti_block_v_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_mslt_block_v_test_steps" ADD CONSTRAINT "_mslt_block_v_test_steps_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_mslt_block_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_mslt_block_v_conditions" ADD CONSTRAINT "_mslt_block_v_conditions_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_mslt_block_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_mslt_block_v_symptoms" ADD CONSTRAINT "_mslt_block_v_symptoms_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_mslt_block_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_mslt_block_v" ADD CONSTRAINT "_mslt_block_v_cta_image_id_media_id_fk" FOREIGN KEY ("cta_image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_mslt_block_v" ADD CONSTRAINT "_mslt_block_v_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_mwt_block_v_test_benefits" ADD CONSTRAINT "_mwt_block_v_test_benefits_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_mwt_block_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_mwt_block_v_test_steps" ADD CONSTRAINT "_mwt_block_v_test_steps_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_mwt_block_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_mwt_block_v" ADD CONSTRAINT "_mwt_block_v_cta_image_id_media_id_fk" FOREIGN KEY ("cta_image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_mwt_block_v" ADD CONSTRAINT "_mwt_block_v_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_actigraphy_block_v_reasons" ADD CONSTRAINT "_actigraphy_block_v_reasons_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_actigraphy_block_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_actigraphy_block_v_features" ADD CONSTRAINT "_actigraphy_block_v_features_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_actigraphy_block_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_actigraphy_block_v" ADD CONSTRAINT "_actigraphy_block_v_cta_image_id_media_id_fk" FOREIGN KEY ("cta_image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_actigraphy_block_v" ADD CONSTRAINT "_actigraphy_block_v_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_vpsg_block_v_monitoring_aspects" ADD CONSTRAINT "_vpsg_block_v_monitoring_aspects_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_vpsg_block_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_vpsg_block_v_why_cards" ADD CONSTRAINT "_vpsg_block_v_why_cards_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_vpsg_block_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_vpsg_block_v_conditions" ADD CONSTRAINT "_vpsg_block_v_conditions_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_vpsg_block_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_vpsg_block_v" ADD CONSTRAINT "_vpsg_block_v_cta_bg_image_id_media_id_fk" FOREIGN KEY ("cta_bg_image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_vpsg_block_v" ADD CONSTRAINT "_vpsg_block_v_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_vpsg_eeg_block_v_when_reasons" ADD CONSTRAINT "_vpsg_eeg_block_v_when_reasons_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_vpsg_eeg_block_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_vpsg_eeg_block_v_measures" ADD CONSTRAINT "_vpsg_eeg_block_v_measures_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_vpsg_eeg_block_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_vpsg_eeg_block_v_how_steps" ADD CONSTRAINT "_vpsg_eeg_block_v_how_steps_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_vpsg_eeg_block_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_vpsg_eeg_block_v_why_choose" ADD CONSTRAINT "_vpsg_eeg_block_v_why_choose_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_vpsg_eeg_block_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_vpsg_eeg_block_v" ADD CONSTRAINT "_vpsg_eeg_block_v_cta_bg_image_id_media_id_fk" FOREIGN KEY ("cta_bg_image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_vpsg_eeg_block_v" ADD CONSTRAINT "_vpsg_eeg_block_v_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_respiratory_polygrophy_block_v_test_measures" ADD CONSTRAINT "_respiratory_polygrophy_block_v_test_measures_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_respiratory_polygrophy_block_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_respiratory_polygrophy_block_v_symptoms" ADD CONSTRAINT "_respiratory_polygrophy_block_v_symptoms_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_respiratory_polygrophy_block_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_respiratory_polygrophy_block_v_benefits" ADD CONSTRAINT "_respiratory_polygrophy_block_v_benefits_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_respiratory_polygrophy_block_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_respiratory_polygrophy_block_v" ADD CONSTRAINT "_respiratory_polygrophy_block_v_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v"("id") ON DELETE cascade ON UPDATE no action;
  CREATE INDEX "cpap_block_order_idx" ON "cpap_block" USING btree ("_order");
  CREATE INDEX "cpap_block_parent_id_idx" ON "cpap_block" USING btree ("_parent_id");
  CREATE INDEX "cpap_block_path_idx" ON "cpap_block" USING btree ("_path");
  CREATE INDEX "sleep_apnea_intro_steps_items_order_idx" ON "sleep_apnea_intro_steps_items" USING btree ("_order");
  CREATE INDEX "sleep_apnea_intro_steps_items_parent_id_idx" ON "sleep_apnea_intro_steps_items" USING btree ("_parent_id");
  CREATE INDEX "sleep_apnea_intro_steps_order_idx" ON "sleep_apnea_intro_steps" USING btree ("_order");
  CREATE INDEX "sleep_apnea_intro_steps_parent_id_idx" ON "sleep_apnea_intro_steps" USING btree ("_parent_id");
  CREATE INDEX "sleep_apnea_intro_steps_path_idx" ON "sleep_apnea_intro_steps" USING btree ("_path");
  CREATE INDEX "sleep_apnea_test_options_items_badges_order_idx" ON "sleep_apnea_test_options_items_badges" USING btree ("_order");
  CREATE INDEX "sleep_apnea_test_options_items_badges_parent_id_idx" ON "sleep_apnea_test_options_items_badges" USING btree ("_parent_id");
  CREATE INDEX "sleep_apnea_test_options_items_order_idx" ON "sleep_apnea_test_options_items" USING btree ("_order");
  CREATE INDEX "sleep_apnea_test_options_items_parent_id_idx" ON "sleep_apnea_test_options_items" USING btree ("_parent_id");
  CREATE INDEX "sleep_apnea_test_options_order_idx" ON "sleep_apnea_test_options" USING btree ("_order");
  CREATE INDEX "sleep_apnea_test_options_parent_id_idx" ON "sleep_apnea_test_options" USING btree ("_parent_id");
  CREATE INDEX "sleep_apnea_test_options_path_idx" ON "sleep_apnea_test_options" USING btree ("_path");
  CREATE INDEX "sleep_apnea_report_includes_features_order_idx" ON "sleep_apnea_report_includes_features" USING btree ("_order");
  CREATE INDEX "sleep_apnea_report_includes_features_parent_id_idx" ON "sleep_apnea_report_includes_features" USING btree ("_parent_id");
  CREATE INDEX "sleep_apnea_report_includes_order_idx" ON "sleep_apnea_report_includes" USING btree ("_order");
  CREATE INDEX "sleep_apnea_report_includes_parent_id_idx" ON "sleep_apnea_report_includes" USING btree ("_parent_id");
  CREATE INDEX "sleep_apnea_report_includes_path_idx" ON "sleep_apnea_report_includes" USING btree ("_path");
  CREATE INDEX "sleep_apnea_about_hst_steps_order_idx" ON "sleep_apnea_about_hst_steps" USING btree ("_order");
  CREATE INDEX "sleep_apnea_about_hst_steps_parent_id_idx" ON "sleep_apnea_about_hst_steps" USING btree ("_parent_id");
  CREATE INDEX "sleep_apnea_about_hst_booking_options_order_idx" ON "sleep_apnea_about_hst_booking_options" USING btree ("_order");
  CREATE INDEX "sleep_apnea_about_hst_booking_options_parent_id_idx" ON "sleep_apnea_about_hst_booking_options" USING btree ("_parent_id");
  CREATE INDEX "sleep_apnea_about_hst_order_idx" ON "sleep_apnea_about_hst" USING btree ("_order");
  CREATE INDEX "sleep_apnea_about_hst_parent_id_idx" ON "sleep_apnea_about_hst" USING btree ("_parent_id");
  CREATE INDEX "sleep_apnea_about_hst_path_idx" ON "sleep_apnea_about_hst" USING btree ("_path");
  CREATE INDEX "sleep_apnea_why_ipd_items_order_idx" ON "sleep_apnea_why_ipd_items" USING btree ("_order");
  CREATE INDEX "sleep_apnea_why_ipd_items_parent_id_idx" ON "sleep_apnea_why_ipd_items" USING btree ("_parent_id");
  CREATE INDEX "sleep_apnea_why_ipd_order_idx" ON "sleep_apnea_why_ipd" USING btree ("_order");
  CREATE INDEX "sleep_apnea_why_ipd_parent_id_idx" ON "sleep_apnea_why_ipd" USING btree ("_parent_id");
  CREATE INDEX "sleep_apnea_why_ipd_path_idx" ON "sleep_apnea_why_ipd" USING btree ("_path");
  CREATE INDEX "sleep_apnea_after_test_sections_order_idx" ON "sleep_apnea_after_test_sections" USING btree ("_order");
  CREATE INDEX "sleep_apnea_after_test_sections_parent_id_idx" ON "sleep_apnea_after_test_sections" USING btree ("_parent_id");
  CREATE INDEX "sleep_apnea_after_test_order_idx" ON "sleep_apnea_after_test" USING btree ("_order");
  CREATE INDEX "sleep_apnea_after_test_parent_id_idx" ON "sleep_apnea_after_test" USING btree ("_parent_id");
  CREATE INDEX "sleep_apnea_after_test_path_idx" ON "sleep_apnea_after_test" USING btree ("_path");
  CREATE INDEX "cbti_block_program_features_order_idx" ON "cbti_block_program_features" USING btree ("_order");
  CREATE INDEX "cbti_block_program_features_parent_id_idx" ON "cbti_block_program_features" USING btree ("_parent_id");
  CREATE INDEX "cbti_block_techniques_order_idx" ON "cbti_block_techniques" USING btree ("_order");
  CREATE INDEX "cbti_block_techniques_parent_id_idx" ON "cbti_block_techniques" USING btree ("_parent_id");
  CREATE INDEX "cbti_block_order_idx" ON "cbti_block" USING btree ("_order");
  CREATE INDEX "cbti_block_parent_id_idx" ON "cbti_block" USING btree ("_parent_id");
  CREATE INDEX "cbti_block_path_idx" ON "cbti_block" USING btree ("_path");
  CREATE INDEX "cbti_block_cta_image_idx" ON "cbti_block" USING btree ("cta_image_id");
  CREATE INDEX "mslt_block_test_steps_order_idx" ON "mslt_block_test_steps" USING btree ("_order");
  CREATE INDEX "mslt_block_test_steps_parent_id_idx" ON "mslt_block_test_steps" USING btree ("_parent_id");
  CREATE INDEX "mslt_block_conditions_order_idx" ON "mslt_block_conditions" USING btree ("_order");
  CREATE INDEX "mslt_block_conditions_parent_id_idx" ON "mslt_block_conditions" USING btree ("_parent_id");
  CREATE INDEX "mslt_block_symptoms_order_idx" ON "mslt_block_symptoms" USING btree ("_order");
  CREATE INDEX "mslt_block_symptoms_parent_id_idx" ON "mslt_block_symptoms" USING btree ("_parent_id");
  CREATE INDEX "mslt_block_order_idx" ON "mslt_block" USING btree ("_order");
  CREATE INDEX "mslt_block_parent_id_idx" ON "mslt_block" USING btree ("_parent_id");
  CREATE INDEX "mslt_block_path_idx" ON "mslt_block" USING btree ("_path");
  CREATE INDEX "mslt_block_cta_image_idx" ON "mslt_block" USING btree ("cta_image_id");
  CREATE INDEX "mwt_block_test_benefits_order_idx" ON "mwt_block_test_benefits" USING btree ("_order");
  CREATE INDEX "mwt_block_test_benefits_parent_id_idx" ON "mwt_block_test_benefits" USING btree ("_parent_id");
  CREATE INDEX "mwt_block_test_steps_order_idx" ON "mwt_block_test_steps" USING btree ("_order");
  CREATE INDEX "mwt_block_test_steps_parent_id_idx" ON "mwt_block_test_steps" USING btree ("_parent_id");
  CREATE INDEX "mwt_block_order_idx" ON "mwt_block" USING btree ("_order");
  CREATE INDEX "mwt_block_parent_id_idx" ON "mwt_block" USING btree ("_parent_id");
  CREATE INDEX "mwt_block_path_idx" ON "mwt_block" USING btree ("_path");
  CREATE INDEX "mwt_block_cta_image_idx" ON "mwt_block" USING btree ("cta_image_id");
  CREATE INDEX "actigraphy_block_reasons_order_idx" ON "actigraphy_block_reasons" USING btree ("_order");
  CREATE INDEX "actigraphy_block_reasons_parent_id_idx" ON "actigraphy_block_reasons" USING btree ("_parent_id");
  CREATE INDEX "actigraphy_block_features_order_idx" ON "actigraphy_block_features" USING btree ("_order");
  CREATE INDEX "actigraphy_block_features_parent_id_idx" ON "actigraphy_block_features" USING btree ("_parent_id");
  CREATE INDEX "actigraphy_block_order_idx" ON "actigraphy_block" USING btree ("_order");
  CREATE INDEX "actigraphy_block_parent_id_idx" ON "actigraphy_block" USING btree ("_parent_id");
  CREATE INDEX "actigraphy_block_path_idx" ON "actigraphy_block" USING btree ("_path");
  CREATE INDEX "actigraphy_block_cta_image_idx" ON "actigraphy_block" USING btree ("cta_image_id");
  CREATE INDEX "vpsg_block_monitoring_aspects_order_idx" ON "vpsg_block_monitoring_aspects" USING btree ("_order");
  CREATE INDEX "vpsg_block_monitoring_aspects_parent_id_idx" ON "vpsg_block_monitoring_aspects" USING btree ("_parent_id");
  CREATE INDEX "vpsg_block_why_cards_order_idx" ON "vpsg_block_why_cards" USING btree ("_order");
  CREATE INDEX "vpsg_block_why_cards_parent_id_idx" ON "vpsg_block_why_cards" USING btree ("_parent_id");
  CREATE INDEX "vpsg_block_conditions_order_idx" ON "vpsg_block_conditions" USING btree ("_order");
  CREATE INDEX "vpsg_block_conditions_parent_id_idx" ON "vpsg_block_conditions" USING btree ("_parent_id");
  CREATE INDEX "vpsg_block_order_idx" ON "vpsg_block" USING btree ("_order");
  CREATE INDEX "vpsg_block_parent_id_idx" ON "vpsg_block" USING btree ("_parent_id");
  CREATE INDEX "vpsg_block_path_idx" ON "vpsg_block" USING btree ("_path");
  CREATE INDEX "vpsg_block_cta_bg_image_idx" ON "vpsg_block" USING btree ("cta_bg_image_id");
  CREATE INDEX "vpsg_eeg_block_when_reasons_order_idx" ON "vpsg_eeg_block_when_reasons" USING btree ("_order");
  CREATE INDEX "vpsg_eeg_block_when_reasons_parent_id_idx" ON "vpsg_eeg_block_when_reasons" USING btree ("_parent_id");
  CREATE INDEX "vpsg_eeg_block_measures_order_idx" ON "vpsg_eeg_block_measures" USING btree ("_order");
  CREATE INDEX "vpsg_eeg_block_measures_parent_id_idx" ON "vpsg_eeg_block_measures" USING btree ("_parent_id");
  CREATE INDEX "vpsg_eeg_block_how_steps_order_idx" ON "vpsg_eeg_block_how_steps" USING btree ("_order");
  CREATE INDEX "vpsg_eeg_block_how_steps_parent_id_idx" ON "vpsg_eeg_block_how_steps" USING btree ("_parent_id");
  CREATE INDEX "vpsg_eeg_block_why_choose_order_idx" ON "vpsg_eeg_block_why_choose" USING btree ("_order");
  CREATE INDEX "vpsg_eeg_block_why_choose_parent_id_idx" ON "vpsg_eeg_block_why_choose" USING btree ("_parent_id");
  CREATE INDEX "vpsg_eeg_block_order_idx" ON "vpsg_eeg_block" USING btree ("_order");
  CREATE INDEX "vpsg_eeg_block_parent_id_idx" ON "vpsg_eeg_block" USING btree ("_parent_id");
  CREATE INDEX "vpsg_eeg_block_path_idx" ON "vpsg_eeg_block" USING btree ("_path");
  CREATE INDEX "vpsg_eeg_block_cta_bg_image_idx" ON "vpsg_eeg_block" USING btree ("cta_bg_image_id");
  CREATE INDEX "respiratory_polygrophy_block_test_measures_order_idx" ON "respiratory_polygrophy_block_test_measures" USING btree ("_order");
  CREATE INDEX "respiratory_polygrophy_block_test_measures_parent_id_idx" ON "respiratory_polygrophy_block_test_measures" USING btree ("_parent_id");
  CREATE INDEX "respiratory_polygrophy_block_symptoms_order_idx" ON "respiratory_polygrophy_block_symptoms" USING btree ("_order");
  CREATE INDEX "respiratory_polygrophy_block_symptoms_parent_id_idx" ON "respiratory_polygrophy_block_symptoms" USING btree ("_parent_id");
  CREATE INDEX "respiratory_polygrophy_block_benefits_order_idx" ON "respiratory_polygrophy_block_benefits" USING btree ("_order");
  CREATE INDEX "respiratory_polygrophy_block_benefits_parent_id_idx" ON "respiratory_polygrophy_block_benefits" USING btree ("_parent_id");
  CREATE INDEX "respiratory_polygrophy_block_order_idx" ON "respiratory_polygrophy_block" USING btree ("_order");
  CREATE INDEX "respiratory_polygrophy_block_parent_id_idx" ON "respiratory_polygrophy_block" USING btree ("_parent_id");
  CREATE INDEX "respiratory_polygrophy_block_path_idx" ON "respiratory_polygrophy_block" USING btree ("_path");
  CREATE INDEX "_cpap_block_v_order_idx" ON "_cpap_block_v" USING btree ("_order");
  CREATE INDEX "_cpap_block_v_parent_id_idx" ON "_cpap_block_v" USING btree ("_parent_id");
  CREATE INDEX "_cpap_block_v_path_idx" ON "_cpap_block_v" USING btree ("_path");
  CREATE INDEX "_sleep_apnea_intro_steps_v_items_order_idx" ON "_sleep_apnea_intro_steps_v_items" USING btree ("_order");
  CREATE INDEX "_sleep_apnea_intro_steps_v_items_parent_id_idx" ON "_sleep_apnea_intro_steps_v_items" USING btree ("_parent_id");
  CREATE INDEX "_sleep_apnea_intro_steps_v_order_idx" ON "_sleep_apnea_intro_steps_v" USING btree ("_order");
  CREATE INDEX "_sleep_apnea_intro_steps_v_parent_id_idx" ON "_sleep_apnea_intro_steps_v" USING btree ("_parent_id");
  CREATE INDEX "_sleep_apnea_intro_steps_v_path_idx" ON "_sleep_apnea_intro_steps_v" USING btree ("_path");
  CREATE INDEX "_sleep_apnea_test_options_v_items_badges_order_idx" ON "_sleep_apnea_test_options_v_items_badges" USING btree ("_order");
  CREATE INDEX "_sleep_apnea_test_options_v_items_badges_parent_id_idx" ON "_sleep_apnea_test_options_v_items_badges" USING btree ("_parent_id");
  CREATE INDEX "_sleep_apnea_test_options_v_items_order_idx" ON "_sleep_apnea_test_options_v_items" USING btree ("_order");
  CREATE INDEX "_sleep_apnea_test_options_v_items_parent_id_idx" ON "_sleep_apnea_test_options_v_items" USING btree ("_parent_id");
  CREATE INDEX "_sleep_apnea_test_options_v_order_idx" ON "_sleep_apnea_test_options_v" USING btree ("_order");
  CREATE INDEX "_sleep_apnea_test_options_v_parent_id_idx" ON "_sleep_apnea_test_options_v" USING btree ("_parent_id");
  CREATE INDEX "_sleep_apnea_test_options_v_path_idx" ON "_sleep_apnea_test_options_v" USING btree ("_path");
  CREATE INDEX "_sleep_apnea_report_includes_v_features_order_idx" ON "_sleep_apnea_report_includes_v_features" USING btree ("_order");
  CREATE INDEX "_sleep_apnea_report_includes_v_features_parent_id_idx" ON "_sleep_apnea_report_includes_v_features" USING btree ("_parent_id");
  CREATE INDEX "_sleep_apnea_report_includes_v_order_idx" ON "_sleep_apnea_report_includes_v" USING btree ("_order");
  CREATE INDEX "_sleep_apnea_report_includes_v_parent_id_idx" ON "_sleep_apnea_report_includes_v" USING btree ("_parent_id");
  CREATE INDEX "_sleep_apnea_report_includes_v_path_idx" ON "_sleep_apnea_report_includes_v" USING btree ("_path");
  CREATE INDEX "_sleep_apnea_about_hst_v_steps_order_idx" ON "_sleep_apnea_about_hst_v_steps" USING btree ("_order");
  CREATE INDEX "_sleep_apnea_about_hst_v_steps_parent_id_idx" ON "_sleep_apnea_about_hst_v_steps" USING btree ("_parent_id");
  CREATE INDEX "_sleep_apnea_about_hst_v_booking_options_order_idx" ON "_sleep_apnea_about_hst_v_booking_options" USING btree ("_order");
  CREATE INDEX "_sleep_apnea_about_hst_v_booking_options_parent_id_idx" ON "_sleep_apnea_about_hst_v_booking_options" USING btree ("_parent_id");
  CREATE INDEX "_sleep_apnea_about_hst_v_order_idx" ON "_sleep_apnea_about_hst_v" USING btree ("_order");
  CREATE INDEX "_sleep_apnea_about_hst_v_parent_id_idx" ON "_sleep_apnea_about_hst_v" USING btree ("_parent_id");
  CREATE INDEX "_sleep_apnea_about_hst_v_path_idx" ON "_sleep_apnea_about_hst_v" USING btree ("_path");
  CREATE INDEX "_sleep_apnea_why_ipd_v_items_order_idx" ON "_sleep_apnea_why_ipd_v_items" USING btree ("_order");
  CREATE INDEX "_sleep_apnea_why_ipd_v_items_parent_id_idx" ON "_sleep_apnea_why_ipd_v_items" USING btree ("_parent_id");
  CREATE INDEX "_sleep_apnea_why_ipd_v_order_idx" ON "_sleep_apnea_why_ipd_v" USING btree ("_order");
  CREATE INDEX "_sleep_apnea_why_ipd_v_parent_id_idx" ON "_sleep_apnea_why_ipd_v" USING btree ("_parent_id");
  CREATE INDEX "_sleep_apnea_why_ipd_v_path_idx" ON "_sleep_apnea_why_ipd_v" USING btree ("_path");
  CREATE INDEX "_sleep_apnea_after_test_v_sections_order_idx" ON "_sleep_apnea_after_test_v_sections" USING btree ("_order");
  CREATE INDEX "_sleep_apnea_after_test_v_sections_parent_id_idx" ON "_sleep_apnea_after_test_v_sections" USING btree ("_parent_id");
  CREATE INDEX "_sleep_apnea_after_test_v_order_idx" ON "_sleep_apnea_after_test_v" USING btree ("_order");
  CREATE INDEX "_sleep_apnea_after_test_v_parent_id_idx" ON "_sleep_apnea_after_test_v" USING btree ("_parent_id");
  CREATE INDEX "_sleep_apnea_after_test_v_path_idx" ON "_sleep_apnea_after_test_v" USING btree ("_path");
  CREATE INDEX "_cbti_block_v_program_features_order_idx" ON "_cbti_block_v_program_features" USING btree ("_order");
  CREATE INDEX "_cbti_block_v_program_features_parent_id_idx" ON "_cbti_block_v_program_features" USING btree ("_parent_id");
  CREATE INDEX "_cbti_block_v_techniques_order_idx" ON "_cbti_block_v_techniques" USING btree ("_order");
  CREATE INDEX "_cbti_block_v_techniques_parent_id_idx" ON "_cbti_block_v_techniques" USING btree ("_parent_id");
  CREATE INDEX "_cbti_block_v_order_idx" ON "_cbti_block_v" USING btree ("_order");
  CREATE INDEX "_cbti_block_v_parent_id_idx" ON "_cbti_block_v" USING btree ("_parent_id");
  CREATE INDEX "_cbti_block_v_path_idx" ON "_cbti_block_v" USING btree ("_path");
  CREATE INDEX "_cbti_block_v_cta_image_idx" ON "_cbti_block_v" USING btree ("cta_image_id");
  CREATE INDEX "_mslt_block_v_test_steps_order_idx" ON "_mslt_block_v_test_steps" USING btree ("_order");
  CREATE INDEX "_mslt_block_v_test_steps_parent_id_idx" ON "_mslt_block_v_test_steps" USING btree ("_parent_id");
  CREATE INDEX "_mslt_block_v_conditions_order_idx" ON "_mslt_block_v_conditions" USING btree ("_order");
  CREATE INDEX "_mslt_block_v_conditions_parent_id_idx" ON "_mslt_block_v_conditions" USING btree ("_parent_id");
  CREATE INDEX "_mslt_block_v_symptoms_order_idx" ON "_mslt_block_v_symptoms" USING btree ("_order");
  CREATE INDEX "_mslt_block_v_symptoms_parent_id_idx" ON "_mslt_block_v_symptoms" USING btree ("_parent_id");
  CREATE INDEX "_mslt_block_v_order_idx" ON "_mslt_block_v" USING btree ("_order");
  CREATE INDEX "_mslt_block_v_parent_id_idx" ON "_mslt_block_v" USING btree ("_parent_id");
  CREATE INDEX "_mslt_block_v_path_idx" ON "_mslt_block_v" USING btree ("_path");
  CREATE INDEX "_mslt_block_v_cta_image_idx" ON "_mslt_block_v" USING btree ("cta_image_id");
  CREATE INDEX "_mwt_block_v_test_benefits_order_idx" ON "_mwt_block_v_test_benefits" USING btree ("_order");
  CREATE INDEX "_mwt_block_v_test_benefits_parent_id_idx" ON "_mwt_block_v_test_benefits" USING btree ("_parent_id");
  CREATE INDEX "_mwt_block_v_test_steps_order_idx" ON "_mwt_block_v_test_steps" USING btree ("_order");
  CREATE INDEX "_mwt_block_v_test_steps_parent_id_idx" ON "_mwt_block_v_test_steps" USING btree ("_parent_id");
  CREATE INDEX "_mwt_block_v_order_idx" ON "_mwt_block_v" USING btree ("_order");
  CREATE INDEX "_mwt_block_v_parent_id_idx" ON "_mwt_block_v" USING btree ("_parent_id");
  CREATE INDEX "_mwt_block_v_path_idx" ON "_mwt_block_v" USING btree ("_path");
  CREATE INDEX "_mwt_block_v_cta_image_idx" ON "_mwt_block_v" USING btree ("cta_image_id");
  CREATE INDEX "_actigraphy_block_v_reasons_order_idx" ON "_actigraphy_block_v_reasons" USING btree ("_order");
  CREATE INDEX "_actigraphy_block_v_reasons_parent_id_idx" ON "_actigraphy_block_v_reasons" USING btree ("_parent_id");
  CREATE INDEX "_actigraphy_block_v_features_order_idx" ON "_actigraphy_block_v_features" USING btree ("_order");
  CREATE INDEX "_actigraphy_block_v_features_parent_id_idx" ON "_actigraphy_block_v_features" USING btree ("_parent_id");
  CREATE INDEX "_actigraphy_block_v_order_idx" ON "_actigraphy_block_v" USING btree ("_order");
  CREATE INDEX "_actigraphy_block_v_parent_id_idx" ON "_actigraphy_block_v" USING btree ("_parent_id");
  CREATE INDEX "_actigraphy_block_v_path_idx" ON "_actigraphy_block_v" USING btree ("_path");
  CREATE INDEX "_actigraphy_block_v_cta_image_idx" ON "_actigraphy_block_v" USING btree ("cta_image_id");
  CREATE INDEX "_vpsg_block_v_monitoring_aspects_order_idx" ON "_vpsg_block_v_monitoring_aspects" USING btree ("_order");
  CREATE INDEX "_vpsg_block_v_monitoring_aspects_parent_id_idx" ON "_vpsg_block_v_monitoring_aspects" USING btree ("_parent_id");
  CREATE INDEX "_vpsg_block_v_why_cards_order_idx" ON "_vpsg_block_v_why_cards" USING btree ("_order");
  CREATE INDEX "_vpsg_block_v_why_cards_parent_id_idx" ON "_vpsg_block_v_why_cards" USING btree ("_parent_id");
  CREATE INDEX "_vpsg_block_v_conditions_order_idx" ON "_vpsg_block_v_conditions" USING btree ("_order");
  CREATE INDEX "_vpsg_block_v_conditions_parent_id_idx" ON "_vpsg_block_v_conditions" USING btree ("_parent_id");
  CREATE INDEX "_vpsg_block_v_order_idx" ON "_vpsg_block_v" USING btree ("_order");
  CREATE INDEX "_vpsg_block_v_parent_id_idx" ON "_vpsg_block_v" USING btree ("_parent_id");
  CREATE INDEX "_vpsg_block_v_path_idx" ON "_vpsg_block_v" USING btree ("_path");
  CREATE INDEX "_vpsg_block_v_cta_bg_image_idx" ON "_vpsg_block_v" USING btree ("cta_bg_image_id");
  CREATE INDEX "_vpsg_eeg_block_v_when_reasons_order_idx" ON "_vpsg_eeg_block_v_when_reasons" USING btree ("_order");
  CREATE INDEX "_vpsg_eeg_block_v_when_reasons_parent_id_idx" ON "_vpsg_eeg_block_v_when_reasons" USING btree ("_parent_id");
  CREATE INDEX "_vpsg_eeg_block_v_measures_order_idx" ON "_vpsg_eeg_block_v_measures" USING btree ("_order");
  CREATE INDEX "_vpsg_eeg_block_v_measures_parent_id_idx" ON "_vpsg_eeg_block_v_measures" USING btree ("_parent_id");
  CREATE INDEX "_vpsg_eeg_block_v_how_steps_order_idx" ON "_vpsg_eeg_block_v_how_steps" USING btree ("_order");
  CREATE INDEX "_vpsg_eeg_block_v_how_steps_parent_id_idx" ON "_vpsg_eeg_block_v_how_steps" USING btree ("_parent_id");
  CREATE INDEX "_vpsg_eeg_block_v_why_choose_order_idx" ON "_vpsg_eeg_block_v_why_choose" USING btree ("_order");
  CREATE INDEX "_vpsg_eeg_block_v_why_choose_parent_id_idx" ON "_vpsg_eeg_block_v_why_choose" USING btree ("_parent_id");
  CREATE INDEX "_vpsg_eeg_block_v_order_idx" ON "_vpsg_eeg_block_v" USING btree ("_order");
  CREATE INDEX "_vpsg_eeg_block_v_parent_id_idx" ON "_vpsg_eeg_block_v" USING btree ("_parent_id");
  CREATE INDEX "_vpsg_eeg_block_v_path_idx" ON "_vpsg_eeg_block_v" USING btree ("_path");
  CREATE INDEX "_vpsg_eeg_block_v_cta_bg_image_idx" ON "_vpsg_eeg_block_v" USING btree ("cta_bg_image_id");
  CREATE INDEX "_respiratory_polygrophy_block_v_test_measures_order_idx" ON "_respiratory_polygrophy_block_v_test_measures" USING btree ("_order");
  CREATE INDEX "_respiratory_polygrophy_block_v_test_measures_parent_id_idx" ON "_respiratory_polygrophy_block_v_test_measures" USING btree ("_parent_id");
  CREATE INDEX "_respiratory_polygrophy_block_v_symptoms_order_idx" ON "_respiratory_polygrophy_block_v_symptoms" USING btree ("_order");
  CREATE INDEX "_respiratory_polygrophy_block_v_symptoms_parent_id_idx" ON "_respiratory_polygrophy_block_v_symptoms" USING btree ("_parent_id");
  CREATE INDEX "_respiratory_polygrophy_block_v_benefits_order_idx" ON "_respiratory_polygrophy_block_v_benefits" USING btree ("_order");
  CREATE INDEX "_respiratory_polygrophy_block_v_benefits_parent_id_idx" ON "_respiratory_polygrophy_block_v_benefits" USING btree ("_parent_id");
  CREATE INDEX "_respiratory_polygrophy_block_v_order_idx" ON "_respiratory_polygrophy_block_v" USING btree ("_order");
  CREATE INDEX "_respiratory_polygrophy_block_v_parent_id_idx" ON "_respiratory_polygrophy_block_v" USING btree ("_parent_id");
  CREATE INDEX "_respiratory_polygrophy_block_v_path_idx" ON "_respiratory_polygrophy_block_v" USING btree ("_path");`)
}

export async function down({ db, payload, req }: MigrateDownArgs): Promise<void> {
  await db.execute(sql`
   DROP TABLE "cpap_block" CASCADE;
  DROP TABLE "sleep_apnea_intro_steps_items" CASCADE;
  DROP TABLE "sleep_apnea_intro_steps" CASCADE;
  DROP TABLE "sleep_apnea_test_options_items_badges" CASCADE;
  DROP TABLE "sleep_apnea_test_options_items" CASCADE;
  DROP TABLE "sleep_apnea_test_options" CASCADE;
  DROP TABLE "sleep_apnea_report_includes_features" CASCADE;
  DROP TABLE "sleep_apnea_report_includes" CASCADE;
  DROP TABLE "sleep_apnea_about_hst_steps" CASCADE;
  DROP TABLE "sleep_apnea_about_hst_booking_options" CASCADE;
  DROP TABLE "sleep_apnea_about_hst" CASCADE;
  DROP TABLE "sleep_apnea_why_ipd_items" CASCADE;
  DROP TABLE "sleep_apnea_why_ipd" CASCADE;
  DROP TABLE "sleep_apnea_after_test_sections" CASCADE;
  DROP TABLE "sleep_apnea_after_test" CASCADE;
  DROP TABLE "cbti_block_program_features" CASCADE;
  DROP TABLE "cbti_block_techniques" CASCADE;
  DROP TABLE "cbti_block" CASCADE;
  DROP TABLE "mslt_block_test_steps" CASCADE;
  DROP TABLE "mslt_block_conditions" CASCADE;
  DROP TABLE "mslt_block_symptoms" CASCADE;
  DROP TABLE "mslt_block" CASCADE;
  DROP TABLE "mwt_block_test_benefits" CASCADE;
  DROP TABLE "mwt_block_test_steps" CASCADE;
  DROP TABLE "mwt_block" CASCADE;
  DROP TABLE "actigraphy_block_reasons" CASCADE;
  DROP TABLE "actigraphy_block_features" CASCADE;
  DROP TABLE "actigraphy_block" CASCADE;
  DROP TABLE "vpsg_block_monitoring_aspects" CASCADE;
  DROP TABLE "vpsg_block_why_cards" CASCADE;
  DROP TABLE "vpsg_block_conditions" CASCADE;
  DROP TABLE "vpsg_block" CASCADE;
  DROP TABLE "vpsg_eeg_block_when_reasons" CASCADE;
  DROP TABLE "vpsg_eeg_block_measures" CASCADE;
  DROP TABLE "vpsg_eeg_block_how_steps" CASCADE;
  DROP TABLE "vpsg_eeg_block_why_choose" CASCADE;
  DROP TABLE "vpsg_eeg_block" CASCADE;
  DROP TABLE "respiratory_polygrophy_block_test_measures" CASCADE;
  DROP TABLE "respiratory_polygrophy_block_symptoms" CASCADE;
  DROP TABLE "respiratory_polygrophy_block_benefits" CASCADE;
  DROP TABLE "respiratory_polygrophy_block" CASCADE;
  DROP TABLE "_cpap_block_v" CASCADE;
  DROP TABLE "_sleep_apnea_intro_steps_v_items" CASCADE;
  DROP TABLE "_sleep_apnea_intro_steps_v" CASCADE;
  DROP TABLE "_sleep_apnea_test_options_v_items_badges" CASCADE;
  DROP TABLE "_sleep_apnea_test_options_v_items" CASCADE;
  DROP TABLE "_sleep_apnea_test_options_v" CASCADE;
  DROP TABLE "_sleep_apnea_report_includes_v_features" CASCADE;
  DROP TABLE "_sleep_apnea_report_includes_v" CASCADE;
  DROP TABLE "_sleep_apnea_about_hst_v_steps" CASCADE;
  DROP TABLE "_sleep_apnea_about_hst_v_booking_options" CASCADE;
  DROP TABLE "_sleep_apnea_about_hst_v" CASCADE;
  DROP TABLE "_sleep_apnea_why_ipd_v_items" CASCADE;
  DROP TABLE "_sleep_apnea_why_ipd_v" CASCADE;
  DROP TABLE "_sleep_apnea_after_test_v_sections" CASCADE;
  DROP TABLE "_sleep_apnea_after_test_v" CASCADE;
  DROP TABLE "_cbti_block_v_program_features" CASCADE;
  DROP TABLE "_cbti_block_v_techniques" CASCADE;
  DROP TABLE "_cbti_block_v" CASCADE;
  DROP TABLE "_mslt_block_v_test_steps" CASCADE;
  DROP TABLE "_mslt_block_v_conditions" CASCADE;
  DROP TABLE "_mslt_block_v_symptoms" CASCADE;
  DROP TABLE "_mslt_block_v" CASCADE;
  DROP TABLE "_mwt_block_v_test_benefits" CASCADE;
  DROP TABLE "_mwt_block_v_test_steps" CASCADE;
  DROP TABLE "_mwt_block_v" CASCADE;
  DROP TABLE "_actigraphy_block_v_reasons" CASCADE;
  DROP TABLE "_actigraphy_block_v_features" CASCADE;
  DROP TABLE "_actigraphy_block_v" CASCADE;
  DROP TABLE "_vpsg_block_v_monitoring_aspects" CASCADE;
  DROP TABLE "_vpsg_block_v_why_cards" CASCADE;
  DROP TABLE "_vpsg_block_v_conditions" CASCADE;
  DROP TABLE "_vpsg_block_v" CASCADE;
  DROP TABLE "_vpsg_eeg_block_v_when_reasons" CASCADE;
  DROP TABLE "_vpsg_eeg_block_v_measures" CASCADE;
  DROP TABLE "_vpsg_eeg_block_v_how_steps" CASCADE;
  DROP TABLE "_vpsg_eeg_block_v_why_choose" CASCADE;
  DROP TABLE "_vpsg_eeg_block_v" CASCADE;
  DROP TABLE "_respiratory_polygrophy_block_v_test_measures" CASCADE;
  DROP TABLE "_respiratory_polygrophy_block_v_symptoms" CASCADE;
  DROP TABLE "_respiratory_polygrophy_block_v_benefits" CASCADE;
  DROP TABLE "_respiratory_polygrophy_block_v" CASCADE;
  DROP TYPE "public"."enum_sleep_apnea_intro_steps_items_link_type";
  DROP TYPE "public"."enum_sleep_apnea_test_options_items_badges_tone";
  DROP TYPE "public"."enum_sleep_apnea_test_options_items_icon";
  DROP TYPE "public"."enum_sleep_apnea_test_options_items_link_type_primary";
  DROP TYPE "public"."enum_sleep_apnea_test_options_items_link_type_secondary";
  DROP TYPE "public"."enum_cbti_block_cta_primary_link_type";
  DROP TYPE "public"."enum_cbti_block_cta_secondary_link_type";
  DROP TYPE "public"."enum_mslt_block_cta_primary_link_type";
  DROP TYPE "public"."enum_mslt_block_cta_secondary_link_type";
  DROP TYPE "public"."enum_mwt_block_cta_primary_link_type";
  DROP TYPE "public"."enum_mwt_block_cta_secondary_link_type";
  DROP TYPE "public"."enum_actigraphy_block_cta_primary_link_type";
  DROP TYPE "public"."enum_actigraphy_block_cta_secondary_link_type";
  DROP TYPE "public"."enum_vpsg_block_hero_primary_link_type";
  DROP TYPE "public"."enum_vpsg_block_hero_secondary_link_type";
  DROP TYPE "public"."enum_vpsg_block_cta_primary_link_type";
  DROP TYPE "public"."enum_vpsg_block_cta_secondary_link_type";
  DROP TYPE "public"."enum_vpsg_eeg_block_hero_primary_link_type";
  DROP TYPE "public"."enum_vpsg_eeg_block_hero_secondary_link_type";
  DROP TYPE "public"."enum_vpsg_eeg_block_cta_primary_link_type";
  DROP TYPE "public"."enum_vpsg_eeg_block_cta_secondary_link_type";
  DROP TYPE "public"."enum_respiratory_polygrophy_block_hero_primary_link_type";
  DROP TYPE "public"."enum_respiratory_polygrophy_block_hero_secondary_link_type";
  DROP TYPE "public"."enum_respiratory_polygrophy_block_cta_primary_link_type";
  DROP TYPE "public"."enum_respiratory_polygrophy_block_cta_secondary_link_type";
  DROP TYPE "public"."enum__sleep_apnea_intro_steps_v_items_link_type";
  DROP TYPE "public"."enum__sleep_apnea_test_options_v_items_badges_tone";
  DROP TYPE "public"."enum__sleep_apnea_test_options_v_items_icon";
  DROP TYPE "public"."enum__sleep_apnea_test_options_v_items_link_type_primary";
  DROP TYPE "public"."enum__sleep_apnea_test_options_v_items_link_type_secondary";
  DROP TYPE "public"."enum__cbti_block_v_cta_primary_link_type";
  DROP TYPE "public"."enum__cbti_block_v_cta_secondary_link_type";
  DROP TYPE "public"."enum__mslt_block_v_cta_primary_link_type";
  DROP TYPE "public"."enum__mslt_block_v_cta_secondary_link_type";
  DROP TYPE "public"."enum__mwt_block_v_cta_primary_link_type";
  DROP TYPE "public"."enum__mwt_block_v_cta_secondary_link_type";
  DROP TYPE "public"."enum__actigraphy_block_v_cta_primary_link_type";
  DROP TYPE "public"."enum__actigraphy_block_v_cta_secondary_link_type";
  DROP TYPE "public"."enum__vpsg_block_v_hero_primary_link_type";
  DROP TYPE "public"."enum__vpsg_block_v_hero_secondary_link_type";
  DROP TYPE "public"."enum__vpsg_block_v_cta_primary_link_type";
  DROP TYPE "public"."enum__vpsg_block_v_cta_secondary_link_type";
  DROP TYPE "public"."enum__vpsg_eeg_block_v_hero_primary_link_type";
  DROP TYPE "public"."enum__vpsg_eeg_block_v_hero_secondary_link_type";
  DROP TYPE "public"."enum__vpsg_eeg_block_v_cta_primary_link_type";
  DROP TYPE "public"."enum__vpsg_eeg_block_v_cta_secondary_link_type";
  DROP TYPE "public"."enum__respiratory_polygrophy_block_v_hero_primary_link_type";
  DROP TYPE "public"."enum__respiratory_polygrophy_block_v_hero_secondary_link_type";
  DROP TYPE "public"."enum__respiratory_polygrophy_block_v_cta_primary_link_type";
  DROP TYPE "public"."enum__respiratory_polygrophy_block_v_cta_secondary_link_type";`)
}
