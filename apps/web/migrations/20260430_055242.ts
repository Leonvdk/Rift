import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-postgres'

export async function up({ db, payload, req }: MigrateUpArgs): Promise<void> {
  await db.execute(sql`
   CREATE TABLE "emails" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"addresses_from_name" varchar DEFAULT 'Rift Furniture' NOT NULL,
  	"addresses_from_address" varchar NOT NULL,
  	"addresses_owner_recipient" varchar NOT NULL,
  	"updated_at" timestamp(3) with time zone,
  	"created_at" timestamp(3) with time zone
  );
  
  CREATE TABLE "emails_locales" (
  	"client_confirmation_subject" varchar NOT NULL,
  	"client_confirmation_heading" varchar NOT NULL,
  	"client_confirmation_intro" varchar NOT NULL,
  	"client_confirmation_body" varchar,
  	"client_confirmation_sign_off" varchar DEFAULT '— Rift' NOT NULL,
  	"owner_notification_subject" varchar DEFAULT 'New contact form submission' NOT NULL,
  	"owner_notification_heading" varchar DEFAULT 'New contact form submission' NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" integer NOT NULL
  );
  
  ALTER TABLE "emails_locales" ADD CONSTRAINT "emails_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."emails"("id") ON DELETE cascade ON UPDATE no action;
  CREATE UNIQUE INDEX "emails_locales_locale_parent_id_unique" ON "emails_locales" USING btree ("_locale","_parent_id");`)
}

export async function down({ db, payload, req }: MigrateDownArgs): Promise<void> {
  await db.execute(sql`
   DROP TABLE "emails" CASCADE;
  DROP TABLE "emails_locales" CASCADE;`)
}
