import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-postgres'

/**
 * Add `blur_data_url` to the media table. Populated by the Media collection's
 * beforeChange hook on new uploads (sharp resizes to 16px wide → webp → base64
 * data URL). Used by <Image placeholder="blur" blurDataURL={...}> on the
 * frontend to show an instant preview while the full image streams in.
 */
export async function up({ db }: MigrateUpArgs): Promise<void> {
  // Payload's snake_case converter expands consecutive caps so `blurDataURL`
  // becomes `blur_data_u_r_l` (matches `thumbnail_u_r_l`). Use the same name
  // here so Payload's generated queries find the column.
  await db.execute(sql`
    ALTER TABLE "media" DROP COLUMN IF EXISTS "blur_data_url";
    ALTER TABLE "media" ADD COLUMN IF NOT EXISTS "blur_data_u_r_l" varchar;
  `)
}

export async function down({ db }: MigrateDownArgs): Promise<void> {
  await db.execute(sql`
    ALTER TABLE "media" DROP COLUMN IF EXISTS "blur_data_u_r_l";
  `)
}
