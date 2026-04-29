import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-postgres'

/**
 * Convert text/textarea fields to richText (Lexical jsonb).
 *
 * Existing varchar values get wrapped in a minimal Lexical AST so:
 *  - the column can change type without data loss
 *  - the admin opens the editor with the existing copy already in it
 *  - the renderer's RichText component renders the same string as before
 *
 * Strings are split on blank lines so multi-paragraph text (heredoc-style)
 * lands as multiple Lexical paragraphs rather than one giant block.
 */
export async function up({ db }: MigrateUpArgs): Promise<void> {
  // First create a Postgres function that wraps a varchar in Lexical JSON.
  // Splitting on \n\n gives one paragraph per blank-line-separated chunk.
  await db.execute(sql`
    CREATE OR REPLACE FUNCTION pg_temp.text_to_lexical(input text)
    RETURNS jsonb LANGUAGE sql AS $$
      SELECT CASE
        WHEN input IS NULL OR input = '' THEN NULL
        ELSE jsonb_build_object(
          'root', jsonb_build_object(
            'type', 'root',
            'format', '',
            'indent', 0,
            'version', 1,
            'direction', 'ltr',
            'children', (
              SELECT COALESCE(jsonb_agg(
                jsonb_build_object(
                  'type', 'paragraph',
                  'format', '',
                  'indent', 0,
                  'version', 1,
                  'direction', 'ltr',
                  'textFormat', 0,
                  'textStyle', '',
                  'children', jsonb_build_array(
                    jsonb_build_object(
                      'type', 'text',
                      'format', 0,
                      'style', '',
                      'mode', 'normal',
                      'detail', 0,
                      'text', para,
                      'version', 1
                    )
                  )
                )
              ), '[]'::jsonb)
              FROM unnest(string_to_array(input, E'\n\n')) AS para
              WHERE para IS NOT NULL AND para <> ''
            )
          )
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
        `ALTER TABLE "${table}" ALTER COLUMN "${column}" TYPE jsonb USING pg_temp.text_to_lexical("${column}");`,
      ),
    )
  }
}

export async function down({ db }: MigrateDownArgs): Promise<void> {
  // Down: convert jsonb back to plain text by extracting all .text leaves.
  // Lossy on formatting (bold/italic discarded) but data isn't lost.
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
        `ALTER TABLE "${table}" ALTER COLUMN "${column}" TYPE varchar USING (
          SELECT string_agg(t.text, E'\\n\\n')
          FROM jsonb_path_query_array("${column}", '$.**.text ? (@.type() == "string")') AS arr,
               jsonb_to_recordset(arr) AS t(text text)
        );`,
      ),
    )
  }
}
