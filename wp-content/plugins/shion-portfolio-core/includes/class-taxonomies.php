<?php
/**
 * Registers custom taxonomies for the 'work' post type.
 */
class SPC_Taxonomies {

    public static function register() {
        // --- Category taxonomy ---
        register_taxonomy( 'work_category', 'work', [
            'labels' => [
                'name'          => 'カテゴリー',
                'singular_name' => 'カテゴリー',
                'add_new_item'  => 'カテゴリーを追加',
                'edit_item'     => 'カテゴリーを編集',
                'search_items'  => 'カテゴリーを検索',
            ],
            'hierarchical'      => true,
            'public'            => true,
            'rewrite'           => [ 'slug' => 'work-category' ],
            'show_admin_column' => true,
            'show_in_rest'      => true,
        ] );

        // --- Industry taxonomy ---
        register_taxonomy( 'work_industry', 'work', [
            'labels' => [
                'name'          => '業種',
                'singular_name' => '業種',
                'add_new_item'  => '業種を追加',
                'edit_item'     => '業種を編集',
                'search_items'  => '業種を検索',
            ],
            'hierarchical'      => true,
            'public'            => true,
            'rewrite'           => [ 'slug' => 'work-industry' ],
            'show_admin_column' => true,
            'show_in_rest'      => true,
        ] );

        self::seed_default_terms();
    }

    /**
     * Insert default terms if they don't exist yet.
     * Safe to call repeatedly — wp_insert_term() skips duplicates.
     */
    private static function seed_default_terms() {
        $categories = [
            'Branding',
            'SNS Direction',
            'EC Design',
            'Graphic Design',
            'Proposal Design',
            'Event / Exhibition',
            'AI Workflow',
        ];

        $industries = [
            'Fashion',
            'Beauty',
            'D2C',
            'Culture',
            'Corporate',
            'Public / Government',
            'Entertainment',
            'Startup',
        ];

        foreach ( $categories as $term ) {
            if ( ! term_exists( $term, 'work_category' ) ) {
                wp_insert_term( $term, 'work_category' );
            }
        }

        foreach ( $industries as $term ) {
            if ( ! term_exists( $term, 'work_industry' ) ) {
                wp_insert_term( $term, 'work_industry' );
            }
        }
    }
}
