import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-postgres'

export async function up({ db, payload, req }: MigrateUpArgs): Promise<void> {
  await db.execute(sql`
   ALTER TABLE "pages_blocks_text_with_image" ADD COLUMN "video_id" integer;
  ALTER TABLE "_pages_v_blocks_text_with_image" ADD COLUMN "video_id" integer;
  ALTER TABLE "projects_blocks_text_with_image" ADD COLUMN "video_id" integer;
  ALTER TABLE "_projects_v_blocks_text_with_image" ADD COLUMN "video_id" integer;
  ALTER TABLE "pages_blocks_text_with_image" ADD CONSTRAINT "pages_blocks_text_with_image_video_id_media_id_fk" FOREIGN KEY ("video_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_text_with_image" ADD CONSTRAINT "_pages_v_blocks_text_with_image_video_id_media_id_fk" FOREIGN KEY ("video_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "projects_blocks_text_with_image" ADD CONSTRAINT "projects_blocks_text_with_image_video_id_media_id_fk" FOREIGN KEY ("video_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_projects_v_blocks_text_with_image" ADD CONSTRAINT "_projects_v_blocks_text_with_image_video_id_media_id_fk" FOREIGN KEY ("video_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  CREATE INDEX "pages_blocks_text_with_image_video_idx" ON "pages_blocks_text_with_image" USING btree ("video_id");
  CREATE INDEX "_pages_v_blocks_text_with_image_video_idx" ON "_pages_v_blocks_text_with_image" USING btree ("video_id");
  CREATE INDEX "projects_blocks_text_with_image_video_idx" ON "projects_blocks_text_with_image" USING btree ("video_id");
  CREATE INDEX "_projects_v_blocks_text_with_image_video_idx" ON "_projects_v_blocks_text_with_image" USING btree ("video_id");`)
}

export async function down({ db, payload, req }: MigrateDownArgs): Promise<void> {
  await db.execute(sql`
   ALTER TABLE "pages_blocks_text_with_image" DROP CONSTRAINT "pages_blocks_text_with_image_video_id_media_id_fk";
  
  ALTER TABLE "_pages_v_blocks_text_with_image" DROP CONSTRAINT "_pages_v_blocks_text_with_image_video_id_media_id_fk";
  
  ALTER TABLE "projects_blocks_text_with_image" DROP CONSTRAINT "projects_blocks_text_with_image_video_id_media_id_fk";
  
  ALTER TABLE "_projects_v_blocks_text_with_image" DROP CONSTRAINT "_projects_v_blocks_text_with_image_video_id_media_id_fk";
  
  DROP INDEX "pages_blocks_text_with_image_video_idx";
  DROP INDEX "_pages_v_blocks_text_with_image_video_idx";
  DROP INDEX "projects_blocks_text_with_image_video_idx";
  DROP INDEX "_projects_v_blocks_text_with_image_video_idx";
  ALTER TABLE "pages_blocks_text_with_image" DROP COLUMN "video_id";
  ALTER TABLE "_pages_v_blocks_text_with_image" DROP COLUMN "video_id";
  ALTER TABLE "projects_blocks_text_with_image" DROP COLUMN "video_id";
  ALTER TABLE "_projects_v_blocks_text_with_image" DROP COLUMN "video_id";`)
}
