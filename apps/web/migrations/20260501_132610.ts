import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-postgres'

export async function up({ db, payload, req }: MigrateUpArgs): Promise<void> {
  await db.execute(sql`
   ALTER TABLE "projects_locales" DROP COLUMN "intro";
  ALTER TABLE "_projects_v_locales" DROP COLUMN "version_intro";`)
}

export async function down({ db, payload, req }: MigrateDownArgs): Promise<void> {
  await db.execute(sql`
   ALTER TABLE "projects_locales" ADD COLUMN "intro" varchar;
  ALTER TABLE "_projects_v_locales" ADD COLUMN "version_intro" varchar;`)
}
