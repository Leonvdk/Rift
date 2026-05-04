import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-postgres'

/**
 * Rename `media.blur_data_url` (from the previous migration) to
 * `media.blur_data_u_r_l`, which is what Payload's snake_case converter
 * produces for the field `blurDataURL` (matches `thumbnail_u_r_l`).
 *
 * Idempotent: handles three states cleanly — wrong-name only, right-name
 * only, neither.
 */
export async function up({ db }: MigrateUpArgs): Promise<void> {
  await db.execute(sql`
    DO $$
    BEGIN
      IF EXISTS (
        SELECT 1 FROM information_schema.columns
        WHERE table_name = 'media' AND column_name = 'blur_data_url'
      ) AND NOT EXISTS (
        SELECT 1 FROM information_schema.columns
        WHERE table_name = 'media' AND column_name = 'blur_data_u_r_l'
      ) THEN
        ALTER TABLE "media" RENAME COLUMN "blur_data_url" TO "blur_data_u_r_l";
      ELSIF NOT EXISTS (
        SELECT 1 FROM information_schema.columns
        WHERE table_name = 'media' AND column_name = 'blur_data_u_r_l'
      ) THEN
        ALTER TABLE "media" ADD COLUMN "blur_data_u_r_l" varchar;
      END IF;
    END $$;
  `)
}

export async function down({ db }: MigrateDownArgs): Promise<void> {
  await db.execute(sql`
    ALTER TABLE "media" RENAME COLUMN "blur_data_u_r_l" TO "blur_data_url";
  `)
}
