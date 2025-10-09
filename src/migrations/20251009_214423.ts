import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-vercel-postgres'

export async function up({ db, payload, req }: MigrateUpArgs): Promise<void> {
  await db.execute(sql`
   DROP TABLE "sleep_apnea_about_hst_booking_options" CASCADE;
  DROP TABLE "_sleep_apnea_about_hst_v_booking_options" CASCADE;
  ALTER TABLE "sleep_apnea_about_hst" DROP COLUMN "booking_title";
  ALTER TABLE "sleep_apnea_about_hst" DROP COLUMN "booking_submit_text";
  ALTER TABLE "sleep_apnea_about_hst" DROP COLUMN "booking_note";
  ALTER TABLE "_sleep_apnea_about_hst_v" DROP COLUMN "booking_title";
  ALTER TABLE "_sleep_apnea_about_hst_v" DROP COLUMN "booking_submit_text";
  ALTER TABLE "_sleep_apnea_about_hst_v" DROP COLUMN "booking_note";`)
}

export async function down({ db, payload, req }: MigrateDownArgs): Promise<void> {
  await db.execute(sql`
   CREATE TABLE "sleep_apnea_about_hst_booking_options" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"value" varchar
  );
  
  CREATE TABLE "_sleep_apnea_about_hst_v_booking_options" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"value" varchar,
  	"_uuid" varchar
  );
  
  ALTER TABLE "sleep_apnea_about_hst" ADD COLUMN "booking_title" varchar DEFAULT 'Book your appointment';
  ALTER TABLE "sleep_apnea_about_hst" ADD COLUMN "booking_submit_text" varchar DEFAULT 'Book Appointment';
  ALTER TABLE "sleep_apnea_about_hst" ADD COLUMN "booking_note" varchar DEFAULT 'We''ll confirm availability and next steps by email or phone.';
  ALTER TABLE "_sleep_apnea_about_hst_v" ADD COLUMN "booking_title" varchar DEFAULT 'Book your appointment';
  ALTER TABLE "_sleep_apnea_about_hst_v" ADD COLUMN "booking_submit_text" varchar DEFAULT 'Book Appointment';
  ALTER TABLE "_sleep_apnea_about_hst_v" ADD COLUMN "booking_note" varchar DEFAULT 'We''ll confirm availability and next steps by email or phone.';
  ALTER TABLE "sleep_apnea_about_hst_booking_options" ADD CONSTRAINT "sleep_apnea_about_hst_booking_options_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."sleep_apnea_about_hst"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_sleep_apnea_about_hst_v_booking_options" ADD CONSTRAINT "_sleep_apnea_about_hst_v_booking_options_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_sleep_apnea_about_hst_v"("id") ON DELETE cascade ON UPDATE no action;
  CREATE INDEX "sleep_apnea_about_hst_booking_options_order_idx" ON "sleep_apnea_about_hst_booking_options" USING btree ("_order");
  CREATE INDEX "sleep_apnea_about_hst_booking_options_parent_id_idx" ON "sleep_apnea_about_hst_booking_options" USING btree ("_parent_id");
  CREATE INDEX "_sleep_apnea_about_hst_v_booking_options_order_idx" ON "_sleep_apnea_about_hst_v_booking_options" USING btree ("_order");
  CREATE INDEX "_sleep_apnea_about_hst_v_booking_options_parent_id_idx" ON "_sleep_apnea_about_hst_v_booking_options" USING btree ("_parent_id");`)
}
