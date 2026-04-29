import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-postgres'

/**
 * Revert the rich-text conversion: turn jsonb (Lexical AST) columns back into
 * varchar, extracting plain text. Joins paragraphs with blank lines.
 */
export async function up({ db }: MigrateUpArgs): Promise<void> {
  await db.execute(sql`
    CREATE OR REPLACE FUNCTION pg_temp.lexical_to_text(input jsonb)
    RETURNS text LANGUAGE sql AS $$
      SELECT CASE
        WHEN input IS NULL THEN NULL
        ELSE (
          SELECT string_agg(para_text, E'\n\n')
          FROM (
            SELECT (
              SELECT string_agg(elem->>'text', '')
              FROM jsonb_array_elements(para->'children') AS elem
              WHERE elem->>'type' = 'text'
            ) AS para_text
            FROM jsonb_array_elements(input->'root'->'children') AS para
          ) AS sq
          WHERE para_text IS NOT NULL
        )
      END;
    $$;
  `)

  const cols: Array<[string, string]> = [
    ['pages_blocks_hero_locales', 'caption'],
    ['pages_blocks_text_with_image_paragraphs', 'text'],
    ['pages_blocks_text_with_image_locales', 'heading'],
    ['pages_blocks_two_images_quote_locales', 'leading_text'],
    ['pages_blocks_two_images_quote_locales', 'quote'],
    ['pages_blocks_process_step_locales', 'description'],
    ['pages_blocks_rich_text_paragraphs', 'text'],
    ['pages_blocks_rich_text_locales', 'heading'],
    ['_pages_v_blocks_hero_locales', 'caption'],
    ['_pages_v_blocks_text_with_image_paragraphs', 'text'],
    ['_pages_v_blocks_text_with_image_locales', 'heading'],
    ['_pages_v_blocks_two_images_quote_locales', 'leading_text'],
    ['_pages_v_blocks_two_images_quote_locales', 'quote'],
    ['_pages_v_blocks_process_step_locales', 'description'],
    ['_pages_v_blocks_rich_text_paragraphs', 'text'],
    ['_pages_v_blocks_rich_text_locales', 'heading'],
    ['projects_blocks_text_with_image_paragraphs', 'text'],
    ['projects_blocks_text_with_image_locales', 'heading'],
    ['projects_blocks_floated_image_pair_paragraphs', 'text'],
    ['projects_blocks_rich_text_paragraphs', 'text'],
    ['projects_blocks_rich_text_locales', 'heading'],
    ['projects_locales', 'intro'],
    ['_projects_v_blocks_text_with_image_paragraphs', 'text'],
    ['_projects_v_blocks_text_with_image_locales', 'heading'],
    ['_projects_v_blocks_floated_image_pair_paragraphs', 'text'],
    ['_projects_v_blocks_rich_text_paragraphs', 'text'],
    ['_projects_v_blocks_rich_text_locales', 'heading'],
    ['_projects_v_locales', 'version_intro'],
  ]

  for (const [table, column] of cols) {
    await db.execute(
      sql.raw(
        `ALTER TABLE "${table}" ALTER COLUMN "${column}" TYPE varchar USING pg_temp.lexical_to_text("${column}");`,
      ),
    )
  }
}

export async function down(_args: MigrateDownArgs): Promise<void> {
  throw new Error('Down not supported. Re-apply the rich-text migration to restore jsonb columns.')
}
