<?php
/**
 * Registers the 'work' Custom Post Type.
 */
class SPC_Post_Types {

    public static function register() {
        register_post_type( 'work', [
            'labels' => [
                'name'               => '実績',
                'singular_name'      => '実績',
                'add_new'            => '新しい実績を追加',
                'add_new_item'       => '実績を追加',
                'edit_item'          => '実績を編集',
                'new_item'           => '新しい実績',
                'view_item'          => '実績を表示',
                'search_items'       => '実績を検索',
                'not_found'          => '実績が見つかりませんでした',
                'not_found_in_trash' => 'ゴミ箱に実績はありません',
                'menu_name'          => '実績管理',
            ],
            'public'              => true,
            'has_archive'         => true,
            'rewrite'             => [ 'slug' => 'works' ],
            'menu_position'       => 5,
            'menu_icon'           => 'dashicons-portfolio',
            'supports'            => [ 'title', 'editor', 'thumbnail', 'excerpt', 'page-attributes' ],
            'show_in_rest'        => true, // Block Editor support
            'taxonomies'          => [ 'work_category', 'work_industry' ],
        ] );
    }
}
