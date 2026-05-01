import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-postgres'

export async function up({ db, payload, req }: MigrateUpArgs): Promise<void> {
  await db.execute(sql`
   CREATE TYPE "public"."enum_pages_blocks_two_images_quote_ratio" AS ENUM('third', 'quarter');
  CREATE TYPE "public"."enum_pages_blocks_process_step_ratio" AS ENUM('third', 'quarter');
  CREATE TYPE "public"."enum__pages_v_blocks_two_images_quote_ratio" AS ENUM('third', 'quarter');
  CREATE TYPE "public"."enum__pages_v_blocks_process_step_ratio" AS ENUM('third', 'quarter');
  CREATE TYPE "public"."enum_projects_blocks_floated_image_pair_ratio" AS ENUM('third', 'quarter');
  CREATE TYPE "public"."enum__projects_v_blocks_floated_image_pair_ratio" AS ENUM('third', 'quarter');
  ALTER TABLE "pages_blocks_two_images_quote" ADD COLUMN "ratio" "enum_pages_blocks_two_images_quote_ratio" DEFAULT 'third';
  ALTER TABLE "pages_blocks_process_step" ADD COLUMN "ratio" "enum_pages_blocks_process_step_ratio" DEFAULT 'third';
  ALTER TABLE "_pages_v_blocks_two_images_quote" ADD COLUMN "ratio" "enum__pages_v_blocks_two_images_quote_ratio" DEFAULT 'third';
  ALTER TABLE "_pages_v_blocks_process_step" ADD COLUMN "ratio" "enum__pages_v_blocks_process_step_ratio" DEFAULT 'third';
  ALTER TABLE "projects_blocks_floated_image_pair" ADD COLUMN "ratio" "enum_projects_blocks_floated_image_pair_ratio" DEFAULT 'third';
  ALTER TABLE "_projects_v_blocks_floated_image_pair" ADD COLUMN "ratio" "enum__projects_v_blocks_floated_image_pair_ratio" DEFAULT 'third';`)
}

export async function down({ db, payload, req }: MigrateDownArgs): Promise<void> {
  await db.execute(sql`
   ALTER TABLE "pages_blocks_two_images_quote" DROP COLUMN "ratio";
  ALTER TABLE "pages_blocks_process_step" DROP COLUMN "ratio";
  ALTER TABLE "_pages_v_blocks_two_images_quote" DROP COLUMN "ratio";
  ALTER TABLE "_pages_v_blocks_process_step" DROP COLUMN "ratio";
  ALTER TABLE "projects_blocks_floated_image_pair" DROP COLUMN "ratio";
  ALTER TABLE "_projects_v_blocks_floated_image_pair" DROP COLUMN "ratio";
  DROP TYPE "public"."enum_pages_blocks_two_images_quote_ratio";
  DROP TYPE "public"."enum_pages_blocks_process_step_ratio";
  DROP TYPE "public"."enum__pages_v_blocks_two_images_quote_ratio";
  DROP TYPE "public"."enum__pages_v_blocks_process_step_ratio";
  DROP TYPE "public"."enum_projects_blocks_floated_image_pair_ratio";
  DROP TYPE "public"."enum__projects_v_blocks_floated_image_pair_ratio";`)
}
