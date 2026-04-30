import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-postgres'

export async function up({ db, payload, req }: MigrateUpArgs): Promise<void> {
  await db.execute(sql`
   CREATE TYPE "public"."enum_projects_blocks_floated_image_pair_images_position" AS ENUM('right', 'left');
  CREATE TYPE "public"."enum__projects_v_blocks_floated_image_pair_images_position" AS ENUM('right', 'left');
  ALTER TABLE "projects_blocks_floated_image_pair" ADD COLUMN "images_position" "enum_projects_blocks_floated_image_pair_images_position" DEFAULT 'right';
  ALTER TABLE "_projects_v_blocks_floated_image_pair" ADD COLUMN "images_position" "enum__projects_v_blocks_floated_image_pair_images_position" DEFAULT 'right';`)
}

export async function down({ db, payload, req }: MigrateDownArgs): Promise<void> {
  await db.execute(sql`
   ALTER TABLE "projects_blocks_floated_image_pair" DROP COLUMN "images_position";
  ALTER TABLE "_projects_v_blocks_floated_image_pair" DROP COLUMN "images_position";
  DROP TYPE "public"."enum_projects_blocks_floated_image_pair_images_position";
  DROP TYPE "public"."enum__projects_v_blocks_floated_image_pair_images_position";`)
}
