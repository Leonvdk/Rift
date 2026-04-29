import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-postgres'

/**
 * Adds Payload localization (NL/EN) to an existing populated DB.
 *
 * Strategy:
 *  1. Create the new *_locales child tables for every parent that gained `localized: true` text fields.
 *  2. Copy existing values from the parent's old text columns into the new locale tables, tagged as 'nl'.
 *  3. Add _locale columns to the array tables (paragraphs) that became `localized: true`, defaulting existing rows to 'nl'.
 *  4. Drop the now-redundant old text columns from parent tables.
 *  5. Add the FK + index constraints Payload expects on the new locale tables.
 *
 * The default locale is `nl`, matching payload.config.ts.
 */
export async function up({ db }: MigrateUpArgs): Promise<void> {
  await db.execute(sql`
    -- Phase 1: create _locales tables (skip if exist)
    CREATE TABLE IF NOT EXISTS "media_locales" (
      "alt" varchar NOT NULL,
      "caption" varchar,
      "id" serial PRIMARY KEY NOT NULL,
      "_locale" "_locales" NOT NULL,
      "_parent_id" integer NOT NULL
    );

    CREATE TABLE IF NOT EXISTS "pages_locales" (
      "title" varchar,
      "meta_title" varchar,
      "meta_description" varchar,
      "id" serial PRIMARY KEY NOT NULL,
      "_locale" "_locales" NOT NULL,
      "_parent_id" integer NOT NULL
    );

    CREATE TABLE IF NOT EXISTS "_pages_v_locales" (
      "version_title" varchar,
      "version_meta_title" varchar,
      "version_meta_description" varchar,
      "id" serial PRIMARY KEY NOT NULL,
      "_locale" "_locales" NOT NULL,
      "_parent_id" integer NOT NULL
    );

    CREATE TABLE IF NOT EXISTS "projects_locales" (
      "title" varchar,
      "intro" varchar,
      "meta_title" varchar,
      "meta_description" varchar,
      "id" serial PRIMARY KEY NOT NULL,
      "_locale" "_locales" NOT NULL,
      "_parent_id" integer NOT NULL
    );

    CREATE TABLE IF NOT EXISTS "_projects_v_locales" (
      "version_title" varchar,
      "version_intro" varchar,
      "version_meta_title" varchar,
      "version_meta_description" varchar,
      "id" serial PRIMARY KEY NOT NULL,
      "_locale" "_locales" NOT NULL,
      "_parent_id" integer NOT NULL
    );

    CREATE TABLE IF NOT EXISTS "pages_blocks_hero_locales" (
      "caption" varchar,
      "id" serial PRIMARY KEY NOT NULL,
      "_locale" "_locales" NOT NULL,
      "_parent_id" varchar NOT NULL
    );

    CREATE TABLE IF NOT EXISTS "_pages_v_blocks_hero_locales" (
      "caption" varchar,
      "id" serial PRIMARY KEY NOT NULL,
      "_locale" "_locales" NOT NULL,
      "_parent_id" integer NOT NULL
    );

    CREATE TABLE IF NOT EXISTS "pages_blocks_text_with_image_locales" (
      "heading" varchar,
      "id" serial PRIMARY KEY NOT NULL,
      "_locale" "_locales" NOT NULL,
      "_parent_id" varchar NOT NULL
    );

    CREATE TABLE IF NOT EXISTS "_pages_v_blocks_text_with_image_locales" (
      "heading" varchar,
      "id" serial PRIMARY KEY NOT NULL,
      "_locale" "_locales" NOT NULL,
      "_parent_id" integer NOT NULL
    );

    CREATE TABLE IF NOT EXISTS "pages_blocks_two_images_quote_locales" (
      "leading_text" varchar,
      "quote" varchar,
      "attribution_label" varchar DEFAULT 'RIFT',
      "id" serial PRIMARY KEY NOT NULL,
      "_locale" "_locales" NOT NULL,
      "_parent_id" varchar NOT NULL
    );

    CREATE TABLE IF NOT EXISTS "_pages_v_blocks_two_images_quote_locales" (
      "leading_text" varchar,
      "quote" varchar,
      "attribution_label" varchar DEFAULT 'RIFT',
      "id" serial PRIMARY KEY NOT NULL,
      "_locale" "_locales" NOT NULL,
      "_parent_id" integer NOT NULL
    );

    CREATE TABLE IF NOT EXISTS "pages_blocks_process_step_locales" (
      "title" varchar,
      "description" varchar,
      "id" serial PRIMARY KEY NOT NULL,
      "_locale" "_locales" NOT NULL,
      "_parent_id" varchar NOT NULL
    );

    CREATE TABLE IF NOT EXISTS "_pages_v_blocks_process_step_locales" (
      "title" varchar,
      "description" varchar,
      "id" serial PRIMARY KEY NOT NULL,
      "_locale" "_locales" NOT NULL,
      "_parent_id" integer NOT NULL
    );

    CREATE TABLE IF NOT EXISTS "pages_blocks_rich_text_locales" (
      "heading" varchar,
      "id" serial PRIMARY KEY NOT NULL,
      "_locale" "_locales" NOT NULL,
      "_parent_id" varchar NOT NULL
    );

    CREATE TABLE IF NOT EXISTS "_pages_v_blocks_rich_text_locales" (
      "heading" varchar,
      "id" serial PRIMARY KEY NOT NULL,
      "_locale" "_locales" NOT NULL,
      "_parent_id" integer NOT NULL
    );

    CREATE TABLE IF NOT EXISTS "projects_blocks_text_with_image_locales" (
      "heading" varchar,
      "id" serial PRIMARY KEY NOT NULL,
      "_locale" "_locales" NOT NULL,
      "_parent_id" varchar NOT NULL
    );

    CREATE TABLE IF NOT EXISTS "_projects_v_blocks_text_with_image_locales" (
      "heading" varchar,
      "id" serial PRIMARY KEY NOT NULL,
      "_locale" "_locales" NOT NULL,
      "_parent_id" integer NOT NULL
    );

    CREATE TABLE IF NOT EXISTS "projects_blocks_rich_text_locales" (
      "heading" varchar,
      "id" serial PRIMARY KEY NOT NULL,
      "_locale" "_locales" NOT NULL,
      "_parent_id" varchar NOT NULL
    );

    CREATE TABLE IF NOT EXISTS "_projects_v_blocks_rich_text_locales" (
      "heading" varchar,
      "id" serial PRIMARY KEY NOT NULL,
      "_locale" "_locales" NOT NULL,
      "_parent_id" integer NOT NULL
    );

    CREATE TABLE IF NOT EXISTS "header_nav_items_locales" (
      "label" varchar NOT NULL,
      "id" serial PRIMARY KEY NOT NULL,
      "_locale" "_locales" NOT NULL,
      "_parent_id" varchar NOT NULL
    );

    CREATE TABLE IF NOT EXISTS "footer_links_locales" (
      "label" varchar NOT NULL,
      "id" serial PRIMARY KEY NOT NULL,
      "_locale" "_locales" NOT NULL,
      "_parent_id" varchar NOT NULL
    );

    CREATE TABLE IF NOT EXISTS "footer_locales" (
      "tagline" varchar NOT NULL,
      "id" serial PRIMARY KEY NOT NULL,
      "_locale" "_locales" NOT NULL,
      "_parent_id" integer NOT NULL
    );
  `)

  // Phase 2: copy existing column data into _locales tables as 'nl'.
  // For NOT NULL target columns we COALESCE with a sentinel; legitimately-empty
  // strings are preserved as ''.
  await db.execute(sql`
    INSERT INTO "media_locales" ("alt", "caption", "_locale", "_parent_id")
      SELECT COALESCE("alt", ''), "caption", 'nl'::"_locales", "id" FROM "media";

    INSERT INTO "pages_locales" ("title", "meta_title", "meta_description", "_locale", "_parent_id")
      SELECT "title", "meta_title", "meta_description", 'nl'::"_locales", "id" FROM "pages";

    INSERT INTO "_pages_v_locales" ("version_title", "version_meta_title", "version_meta_description", "_locale", "_parent_id")
      SELECT "version_title", "version_meta_title", "version_meta_description", 'nl'::"_locales", "id" FROM "_pages_v";

    INSERT INTO "projects_locales" ("title", "intro", "meta_title", "meta_description", "_locale", "_parent_id")
      SELECT "title", "intro", "meta_title", "meta_description", 'nl'::"_locales", "id" FROM "projects";

    INSERT INTO "_projects_v_locales" ("version_title", "version_intro", "version_meta_title", "version_meta_description", "_locale", "_parent_id")
      SELECT "version_title", "version_intro", "version_meta_title", "version_meta_description", 'nl'::"_locales", "id" FROM "_projects_v";

    INSERT INTO "pages_blocks_hero_locales" ("caption", "_locale", "_parent_id")
      SELECT "caption", 'nl'::"_locales", "id" FROM "pages_blocks_hero";

    INSERT INTO "_pages_v_blocks_hero_locales" ("caption", "_locale", "_parent_id")
      SELECT "caption", 'nl'::"_locales", "id" FROM "_pages_v_blocks_hero";

    INSERT INTO "pages_blocks_text_with_image_locales" ("heading", "_locale", "_parent_id")
      SELECT "heading", 'nl'::"_locales", "id" FROM "pages_blocks_text_with_image";

    INSERT INTO "_pages_v_blocks_text_with_image_locales" ("heading", "_locale", "_parent_id")
      SELECT "heading", 'nl'::"_locales", "id" FROM "_pages_v_blocks_text_with_image";

    INSERT INTO "pages_blocks_two_images_quote_locales" ("leading_text", "quote", "attribution_label", "_locale", "_parent_id")
      SELECT "leading_text", "quote", COALESCE("attribution_label", 'RIFT'), 'nl'::"_locales", "id" FROM "pages_blocks_two_images_quote";

    INSERT INTO "_pages_v_blocks_two_images_quote_locales" ("leading_text", "quote", "attribution_label", "_locale", "_parent_id")
      SELECT "leading_text", "quote", COALESCE("attribution_label", 'RIFT'), 'nl'::"_locales", "id" FROM "_pages_v_blocks_two_images_quote";

    INSERT INTO "pages_blocks_process_step_locales" ("title", "description", "_locale", "_parent_id")
      SELECT "title", "description", 'nl'::"_locales", "id" FROM "pages_blocks_process_step";

    INSERT INTO "_pages_v_blocks_process_step_locales" ("title", "description", "_locale", "_parent_id")
      SELECT "title", "description", 'nl'::"_locales", "id" FROM "_pages_v_blocks_process_step";

    INSERT INTO "pages_blocks_rich_text_locales" ("heading", "_locale", "_parent_id")
      SELECT "heading", 'nl'::"_locales", "id" FROM "pages_blocks_rich_text";

    INSERT INTO "_pages_v_blocks_rich_text_locales" ("heading", "_locale", "_parent_id")
      SELECT "heading", 'nl'::"_locales", "id" FROM "_pages_v_blocks_rich_text";

    INSERT INTO "projects_blocks_text_with_image_locales" ("heading", "_locale", "_parent_id")
      SELECT "heading", 'nl'::"_locales", "id" FROM "projects_blocks_text_with_image";

    INSERT INTO "_projects_v_blocks_text_with_image_locales" ("heading", "_locale", "_parent_id")
      SELECT "heading", 'nl'::"_locales", "id" FROM "_projects_v_blocks_text_with_image";

    INSERT INTO "projects_blocks_rich_text_locales" ("heading", "_locale", "_parent_id")
      SELECT "heading", 'nl'::"_locales", "id" FROM "projects_blocks_rich_text";

    INSERT INTO "_projects_v_blocks_rich_text_locales" ("heading", "_locale", "_parent_id")
      SELECT "heading", 'nl'::"_locales", "id" FROM "_projects_v_blocks_rich_text";

    INSERT INTO "header_nav_items_locales" ("label", "_locale", "_parent_id")
      SELECT COALESCE("label", ''), 'nl'::"_locales", "id" FROM "header_nav_items";

    INSERT INTO "footer_links_locales" ("label", "_locale", "_parent_id")
      SELECT COALESCE("label", ''), 'nl'::"_locales", "id" FROM "footer_links";

    INSERT INTO "footer_locales" ("tagline", "_locale", "_parent_id")
      SELECT COALESCE("tagline", ''), 'nl'::"_locales", "id" FROM "footer";
  `)

  // Phase 3: paragraph arrays became localized — add _locale column to existing tables.
  await db.execute(sql`
    ALTER TABLE "pages_blocks_text_with_image_paragraphs" ADD COLUMN IF NOT EXISTS "_locale" "_locales" NOT NULL DEFAULT 'nl';
    ALTER TABLE "pages_blocks_text_with_image_paragraphs" ALTER COLUMN "_locale" DROP DEFAULT;

    ALTER TABLE "_pages_v_blocks_text_with_image_paragraphs" ADD COLUMN IF NOT EXISTS "_locale" "_locales" NOT NULL DEFAULT 'nl';
    ALTER TABLE "_pages_v_blocks_text_with_image_paragraphs" ALTER COLUMN "_locale" DROP DEFAULT;

    ALTER TABLE "pages_blocks_rich_text_paragraphs" ADD COLUMN IF NOT EXISTS "_locale" "_locales" NOT NULL DEFAULT 'nl';
    ALTER TABLE "pages_blocks_rich_text_paragraphs" ALTER COLUMN "_locale" DROP DEFAULT;

    ALTER TABLE "_pages_v_blocks_rich_text_paragraphs" ADD COLUMN IF NOT EXISTS "_locale" "_locales" NOT NULL DEFAULT 'nl';
    ALTER TABLE "_pages_v_blocks_rich_text_paragraphs" ALTER COLUMN "_locale" DROP DEFAULT;

    ALTER TABLE "projects_blocks_text_with_image_paragraphs" ADD COLUMN IF NOT EXISTS "_locale" "_locales" NOT NULL DEFAULT 'nl';
    ALTER TABLE "projects_blocks_text_with_image_paragraphs" ALTER COLUMN "_locale" DROP DEFAULT;

    ALTER TABLE "_projects_v_blocks_text_with_image_paragraphs" ADD COLUMN IF NOT EXISTS "_locale" "_locales" NOT NULL DEFAULT 'nl';
    ALTER TABLE "_projects_v_blocks_text_with_image_paragraphs" ALTER COLUMN "_locale" DROP DEFAULT;

    ALTER TABLE "projects_blocks_rich_text_paragraphs" ADD COLUMN IF NOT EXISTS "_locale" "_locales" NOT NULL DEFAULT 'nl';
    ALTER TABLE "projects_blocks_rich_text_paragraphs" ALTER COLUMN "_locale" DROP DEFAULT;

    ALTER TABLE "_projects_v_blocks_rich_text_paragraphs" ADD COLUMN IF NOT EXISTS "_locale" "_locales" NOT NULL DEFAULT 'nl';
    ALTER TABLE "_projects_v_blocks_rich_text_paragraphs" ALTER COLUMN "_locale" DROP DEFAULT;

    ALTER TABLE "projects_blocks_floated_image_pair_paragraphs" ADD COLUMN IF NOT EXISTS "_locale" "_locales" NOT NULL DEFAULT 'nl';
    ALTER TABLE "projects_blocks_floated_image_pair_paragraphs" ALTER COLUMN "_locale" DROP DEFAULT;

    ALTER TABLE "_projects_v_blocks_floated_image_pair_paragraphs" ADD COLUMN IF NOT EXISTS "_locale" "_locales" NOT NULL DEFAULT 'nl';
    ALTER TABLE "_projects_v_blocks_floated_image_pair_paragraphs" ALTER COLUMN "_locale" DROP DEFAULT;
  `)

  // Phase 4: drop old columns now that data is preserved in _locales tables.
  await db.execute(sql`
    ALTER TABLE "media" DROP COLUMN IF EXISTS "alt";
    ALTER TABLE "media" DROP COLUMN IF EXISTS "caption";

    ALTER TABLE "pages" DROP COLUMN IF EXISTS "title";
    ALTER TABLE "pages" DROP COLUMN IF EXISTS "meta_title";
    ALTER TABLE "pages" DROP COLUMN IF EXISTS "meta_description";

    ALTER TABLE "_pages_v" DROP COLUMN IF EXISTS "version_title";
    ALTER TABLE "_pages_v" DROP COLUMN IF EXISTS "version_meta_title";
    ALTER TABLE "_pages_v" DROP COLUMN IF EXISTS "version_meta_description";

    ALTER TABLE "projects" DROP COLUMN IF EXISTS "title";
    ALTER TABLE "projects" DROP COLUMN IF EXISTS "intro";
    ALTER TABLE "projects" DROP COLUMN IF EXISTS "meta_title";
    ALTER TABLE "projects" DROP COLUMN IF EXISTS "meta_description";

    ALTER TABLE "_projects_v" DROP COLUMN IF EXISTS "version_title";
    ALTER TABLE "_projects_v" DROP COLUMN IF EXISTS "version_intro";
    ALTER TABLE "_projects_v" DROP COLUMN IF EXISTS "version_meta_title";
    ALTER TABLE "_projects_v" DROP COLUMN IF EXISTS "version_meta_description";

    ALTER TABLE "pages_blocks_hero" DROP COLUMN IF EXISTS "caption";
    ALTER TABLE "_pages_v_blocks_hero" DROP COLUMN IF EXISTS "caption";

    ALTER TABLE "pages_blocks_text_with_image" DROP COLUMN IF EXISTS "heading";
    ALTER TABLE "_pages_v_blocks_text_with_image" DROP COLUMN IF EXISTS "heading";

    ALTER TABLE "pages_blocks_two_images_quote" DROP COLUMN IF EXISTS "leading_text";
    ALTER TABLE "pages_blocks_two_images_quote" DROP COLUMN IF EXISTS "quote";
    ALTER TABLE "pages_blocks_two_images_quote" DROP COLUMN IF EXISTS "attribution_label";
    ALTER TABLE "_pages_v_blocks_two_images_quote" DROP COLUMN IF EXISTS "leading_text";
    ALTER TABLE "_pages_v_blocks_two_images_quote" DROP COLUMN IF EXISTS "quote";
    ALTER TABLE "_pages_v_blocks_two_images_quote" DROP COLUMN IF EXISTS "attribution_label";

    ALTER TABLE "pages_blocks_process_step" DROP COLUMN IF EXISTS "title";
    ALTER TABLE "pages_blocks_process_step" DROP COLUMN IF EXISTS "description";
    ALTER TABLE "_pages_v_blocks_process_step" DROP COLUMN IF EXISTS "title";
    ALTER TABLE "_pages_v_blocks_process_step" DROP COLUMN IF EXISTS "description";

    ALTER TABLE "pages_blocks_rich_text" DROP COLUMN IF EXISTS "heading";
    ALTER TABLE "_pages_v_blocks_rich_text" DROP COLUMN IF EXISTS "heading";

    ALTER TABLE "projects_blocks_text_with_image" DROP COLUMN IF EXISTS "heading";
    ALTER TABLE "_projects_v_blocks_text_with_image" DROP COLUMN IF EXISTS "heading";

    ALTER TABLE "projects_blocks_rich_text" DROP COLUMN IF EXISTS "heading";
    ALTER TABLE "_projects_v_blocks_rich_text" DROP COLUMN IF EXISTS "heading";

    ALTER TABLE "header_nav_items" DROP COLUMN IF EXISTS "label";
    ALTER TABLE "footer_links" DROP COLUMN IF EXISTS "label";
    ALTER TABLE "footer" DROP COLUMN IF EXISTS "tagline";
  `)

  // Phase 5: foreign keys + indexes for _locales tables (matches what Payload's auto-gen would create).
  await db.execute(sql`
    DO $$ BEGIN
      ALTER TABLE "media_locales" ADD CONSTRAINT "media_locales__parent_id_media_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."media"("id") ON DELETE cascade ON UPDATE no action;
    EXCEPTION WHEN duplicate_object THEN NULL; END $$;

    DO $$ BEGIN
      ALTER TABLE "pages_locales" ADD CONSTRAINT "pages_locales__parent_id_pages_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages"("id") ON DELETE cascade ON UPDATE no action;
    EXCEPTION WHEN duplicate_object THEN NULL; END $$;

    DO $$ BEGIN
      ALTER TABLE "_pages_v_locales" ADD CONSTRAINT "_pages_v_locales__parent_id__pages_v_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v"("id") ON DELETE cascade ON UPDATE no action;
    EXCEPTION WHEN duplicate_object THEN NULL; END $$;

    DO $$ BEGIN
      ALTER TABLE "projects_locales" ADD CONSTRAINT "projects_locales__parent_id_projects_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."projects"("id") ON DELETE cascade ON UPDATE no action;
    EXCEPTION WHEN duplicate_object THEN NULL; END $$;

    DO $$ BEGIN
      ALTER TABLE "_projects_v_locales" ADD CONSTRAINT "_projects_v_locales__parent_id__projects_v_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_projects_v"("id") ON DELETE cascade ON UPDATE no action;
    EXCEPTION WHEN duplicate_object THEN NULL; END $$;

    DO $$ BEGIN
      ALTER TABLE "pages_blocks_hero_locales" ADD CONSTRAINT "pages_blocks_hero_locales__parent_id_pages_blocks_hero_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages_blocks_hero"("id") ON DELETE cascade ON UPDATE no action;
    EXCEPTION WHEN duplicate_object THEN NULL; END $$;

    DO $$ BEGIN
      ALTER TABLE "_pages_v_blocks_hero_locales" ADD CONSTRAINT "_pages_v_blocks_hero_locales__parent_id__pages_v_blocks_hero_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v_blocks_hero"("id") ON DELETE cascade ON UPDATE no action;
    EXCEPTION WHEN duplicate_object THEN NULL; END $$;

    DO $$ BEGIN
      ALTER TABLE "pages_blocks_text_with_image_locales" ADD CONSTRAINT "pages_blocks_text_with_image_locales__parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages_blocks_text_with_image"("id") ON DELETE cascade ON UPDATE no action;
    EXCEPTION WHEN duplicate_object THEN NULL; END $$;

    DO $$ BEGIN
      ALTER TABLE "_pages_v_blocks_text_with_image_locales" ADD CONSTRAINT "_pages_v_blocks_text_with_image_locales__parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v_blocks_text_with_image"("id") ON DELETE cascade ON UPDATE no action;
    EXCEPTION WHEN duplicate_object THEN NULL; END $$;

    DO $$ BEGIN
      ALTER TABLE "pages_blocks_two_images_quote_locales" ADD CONSTRAINT "pages_blocks_two_images_quote_locales__parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages_blocks_two_images_quote"("id") ON DELETE cascade ON UPDATE no action;
    EXCEPTION WHEN duplicate_object THEN NULL; END $$;

    DO $$ BEGIN
      ALTER TABLE "_pages_v_blocks_two_images_quote_locales" ADD CONSTRAINT "_pages_v_blocks_two_images_quote_locales__parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v_blocks_two_images_quote"("id") ON DELETE cascade ON UPDATE no action;
    EXCEPTION WHEN duplicate_object THEN NULL; END $$;

    DO $$ BEGIN
      ALTER TABLE "pages_blocks_process_step_locales" ADD CONSTRAINT "pages_blocks_process_step_locales__parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages_blocks_process_step"("id") ON DELETE cascade ON UPDATE no action;
    EXCEPTION WHEN duplicate_object THEN NULL; END $$;

    DO $$ BEGIN
      ALTER TABLE "_pages_v_blocks_process_step_locales" ADD CONSTRAINT "_pages_v_blocks_process_step_locales__parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v_blocks_process_step"("id") ON DELETE cascade ON UPDATE no action;
    EXCEPTION WHEN duplicate_object THEN NULL; END $$;

    DO $$ BEGIN
      ALTER TABLE "pages_blocks_rich_text_locales" ADD CONSTRAINT "pages_blocks_rich_text_locales__parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages_blocks_rich_text"("id") ON DELETE cascade ON UPDATE no action;
    EXCEPTION WHEN duplicate_object THEN NULL; END $$;

    DO $$ BEGIN
      ALTER TABLE "_pages_v_blocks_rich_text_locales" ADD CONSTRAINT "_pages_v_blocks_rich_text_locales__parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v_blocks_rich_text"("id") ON DELETE cascade ON UPDATE no action;
    EXCEPTION WHEN duplicate_object THEN NULL; END $$;

    DO $$ BEGIN
      ALTER TABLE "projects_blocks_text_with_image_locales" ADD CONSTRAINT "projects_blocks_text_with_image_locales__parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."projects_blocks_text_with_image"("id") ON DELETE cascade ON UPDATE no action;
    EXCEPTION WHEN duplicate_object THEN NULL; END $$;

    DO $$ BEGIN
      ALTER TABLE "_projects_v_blocks_text_with_image_locales" ADD CONSTRAINT "_projects_v_blocks_text_with_image_locales__parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_projects_v_blocks_text_with_image"("id") ON DELETE cascade ON UPDATE no action;
    EXCEPTION WHEN duplicate_object THEN NULL; END $$;

    DO $$ BEGIN
      ALTER TABLE "projects_blocks_rich_text_locales" ADD CONSTRAINT "projects_blocks_rich_text_locales__parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."projects_blocks_rich_text"("id") ON DELETE cascade ON UPDATE no action;
    EXCEPTION WHEN duplicate_object THEN NULL; END $$;

    DO $$ BEGIN
      ALTER TABLE "_projects_v_blocks_rich_text_locales" ADD CONSTRAINT "_projects_v_blocks_rich_text_locales__parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_projects_v_blocks_rich_text"("id") ON DELETE cascade ON UPDATE no action;
    EXCEPTION WHEN duplicate_object THEN NULL; END $$;

    DO $$ BEGIN
      ALTER TABLE "header_nav_items_locales" ADD CONSTRAINT "header_nav_items_locales__parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."header_nav_items"("id") ON DELETE cascade ON UPDATE no action;
    EXCEPTION WHEN duplicate_object THEN NULL; END $$;

    DO $$ BEGIN
      ALTER TABLE "footer_links_locales" ADD CONSTRAINT "footer_links_locales__parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."footer_links"("id") ON DELETE cascade ON UPDATE no action;
    EXCEPTION WHEN duplicate_object THEN NULL; END $$;

    DO $$ BEGIN
      ALTER TABLE "footer_locales" ADD CONSTRAINT "footer_locales__parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."footer"("id") ON DELETE cascade ON UPDATE no action;
    EXCEPTION WHEN duplicate_object THEN NULL; END $$;

    -- Unique (parent, locale) indexes — matches Payload's auto-gen pattern
    CREATE UNIQUE INDEX IF NOT EXISTS "media_locales_locale_parent_id_unique" ON "media_locales" ("_locale","_parent_id");
    CREATE UNIQUE INDEX IF NOT EXISTS "pages_locales_locale_parent_id_unique" ON "pages_locales" ("_locale","_parent_id");
    CREATE UNIQUE INDEX IF NOT EXISTS "_pages_v_locales_locale_parent_id_unique" ON "_pages_v_locales" ("_locale","_parent_id");
    CREATE UNIQUE INDEX IF NOT EXISTS "projects_locales_locale_parent_id_unique" ON "projects_locales" ("_locale","_parent_id");
    CREATE UNIQUE INDEX IF NOT EXISTS "_projects_v_locales_locale_parent_id_unique" ON "_projects_v_locales" ("_locale","_parent_id");
    CREATE UNIQUE INDEX IF NOT EXISTS "pages_blocks_hero_locales_locale_parent_id_unique" ON "pages_blocks_hero_locales" ("_locale","_parent_id");
    CREATE UNIQUE INDEX IF NOT EXISTS "_pages_v_blocks_hero_locales_locale_parent_id_unique" ON "_pages_v_blocks_hero_locales" ("_locale","_parent_id");
    CREATE UNIQUE INDEX IF NOT EXISTS "pages_blocks_text_with_image_locales_locale_parent_id_unique" ON "pages_blocks_text_with_image_locales" ("_locale","_parent_id");
    CREATE UNIQUE INDEX IF NOT EXISTS "_pages_v_blocks_text_with_image_locales_locale_parent_id_unique" ON "_pages_v_blocks_text_with_image_locales" ("_locale","_parent_id");
    CREATE UNIQUE INDEX IF NOT EXISTS "pages_blocks_two_images_quote_locales_locale_parent_id_unique" ON "pages_blocks_two_images_quote_locales" ("_locale","_parent_id");
    CREATE UNIQUE INDEX IF NOT EXISTS "_pages_v_blocks_two_images_quote_locales_locale_parent_id_uniq" ON "_pages_v_blocks_two_images_quote_locales" ("_locale","_parent_id");
    CREATE UNIQUE INDEX IF NOT EXISTS "pages_blocks_process_step_locales_locale_parent_id_unique" ON "pages_blocks_process_step_locales" ("_locale","_parent_id");
    CREATE UNIQUE INDEX IF NOT EXISTS "_pages_v_blocks_process_step_locales_locale_parent_id_unique" ON "_pages_v_blocks_process_step_locales" ("_locale","_parent_id");
    CREATE UNIQUE INDEX IF NOT EXISTS "pages_blocks_rich_text_locales_locale_parent_id_unique" ON "pages_blocks_rich_text_locales" ("_locale","_parent_id");
    CREATE UNIQUE INDEX IF NOT EXISTS "_pages_v_blocks_rich_text_locales_locale_parent_id_unique" ON "_pages_v_blocks_rich_text_locales" ("_locale","_parent_id");
    CREATE UNIQUE INDEX IF NOT EXISTS "projects_blocks_text_with_image_locales_locale_parent_id_unique" ON "projects_blocks_text_with_image_locales" ("_locale","_parent_id");
    CREATE UNIQUE INDEX IF NOT EXISTS "_projects_v_blocks_text_with_image_locales_locale_parent_id_unique" ON "_projects_v_blocks_text_with_image_locales" ("_locale","_parent_id");
    CREATE UNIQUE INDEX IF NOT EXISTS "projects_blocks_rich_text_locales_locale_parent_id_unique" ON "projects_blocks_rich_text_locales" ("_locale","_parent_id");
    CREATE UNIQUE INDEX IF NOT EXISTS "_projects_v_blocks_rich_text_locales_locale_parent_id_unique" ON "_projects_v_blocks_rich_text_locales" ("_locale","_parent_id");
    CREATE UNIQUE INDEX IF NOT EXISTS "header_nav_items_locales_locale_parent_id_unique" ON "header_nav_items_locales" ("_locale","_parent_id");
    CREATE UNIQUE INDEX IF NOT EXISTS "footer_links_locales_locale_parent_id_unique" ON "footer_links_locales" ("_locale","_parent_id");
    CREATE UNIQUE INDEX IF NOT EXISTS "footer_locales_locale_parent_id_unique" ON "footer_locales" ("_locale","_parent_id");
  `)
}

export async function down(_args: MigrateDownArgs): Promise<void> {
  // No down migration — reverting localization on a populated DB is non-trivial
  // and out of scope. If you need to roll back, restore from a database snapshot.
  throw new Error('Down migration not supported for add-localization. Restore from a snapshot if needed.')
}
