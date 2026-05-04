import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-postgres'

/**
 * Rename `show_starburst` → `animate_logo` on the hero block.
 *
 * The semantics changed: instead of hiding the logo entirely when off, the
 * field now only controls whether the staggered reveal animation plays.
 * The column type and existing values stay the same — only the name changes.
 */
export async function up({ db }: MigrateUpArgs): Promise<void> {
  await db.execute(sql`
    ALTER TABLE "pages_blocks_hero" RENAME COLUMN "show_starburst" TO "animate_logo";
    ALTER TABLE "_pages_v_blocks_hero" RENAME COLUMN "show_starburst" TO "animate_logo";
  `)
}

export async function down({ db }: MigrateDownArgs): Promise<void> {
  await db.execute(sql`
    ALTER TABLE "pages_blocks_hero" RENAME COLUMN "animate_logo" TO "show_starburst";
    ALTER TABLE "_pages_v_blocks_hero" RENAME COLUMN "animate_logo" TO "show_starburst";
  `)
}
