<?php
/**
 * Registers and renders custom meta box fields for the 'work' post type.
 *
 * All fields are stored as individual post meta keys with the prefix _spc_.
 * No ACF dependency — pure WordPress meta API.
 */
class SPC_Meta_Fields {

    /** All field definitions. */
    private static function fields(): array {
        return [
            // ---- Basic info ----
            [ 'key' => '_spc_year',          'label' => 'Year（例: 2024）',           'type' => 'text' ],
            [ 'key' => '_spc_client',        'label' => 'Client',                     'type' => 'text' ],
            [ 'key' => '_spc_role',          'label' => 'Role（例: Creative Direction）', 'type' => 'text' ],
            [ 'key' => '_spc_scope',         'label' => 'Scope（複数可、改行区切り）', 'type' => 'textarea' ],
            [ 'key' => '_spc_tools',         'label' => 'Tools Used（改行区切り）',   'type' => 'textarea' ],
            [ 'key' => '_spc_related_url',   'label' => 'Related URL',               'type' => 'url' ],

            // ---- Images ----
            [ 'key' => '_spc_hero_image',    'label' => 'Hero Image（URL）',         'type' => 'image' ],
            [ 'key' => '_spc_gallery',       'label' => 'Gallery Images（URL、改行区切り）', 'type' => 'textarea' ],

            // ---- Story ----
            [ 'key' => '_spc_summary',       'label' => 'Project Summary',           'type' => 'textarea' ],
            [ 'key' => '_spc_issue',         'label' => 'Client Issue（課題）',      'type' => 'textarea' ],
            [ 'key' => '_spc_strategy',      'label' => 'Strategy（戦略）',          'type' => 'textarea' ],
            [ 'key' => '_spc_deliverables',  'label' => 'Deliverables（成果物）',    'type' => 'textarea' ],
            [ 'key' => '_spc_result',        'label' => 'Result（成果）',            'type' => 'textarea' ],
            [ 'key' => '_spc_thinking',      'label' => 'Thinking / Design Intent',  'type' => 'textarea' ],
            [ 'key' => '_spc_improvement',   'label' => 'Improvement Point',         'type' => 'textarea' ],

            // ---- Display control ----
            [ 'key' => '_spc_featured',      'label' => 'Featured Work（Homeに表示）', 'type' => 'checkbox' ],
            [ 'key' => '_spc_display_order', 'label' => 'Display Order（数字）',     'type' => 'number' ],
        ];
    }

    public static function register() {
        add_action( 'add_meta_boxes', [ __CLASS__, 'add_meta_box' ] );
        add_action( 'save_post_work',  [ __CLASS__, 'save' ] );
    }

    public static function add_meta_box() {
        add_meta_box(
            'spc_work_details',
            '実績詳細情報',
            [ __CLASS__, 'render' ],
            'work',
            'normal',
            'high'
        );
    }

    public static function render( WP_Post $post ) {
        wp_nonce_field( 'spc_save_work', 'spc_nonce' );
        echo '<table class="form-table" style="width:100%;">';

        foreach ( self::fields() as $field ) {
            $value = get_post_meta( $post->ID, $field['key'], true );
            $id    = esc_attr( $field['key'] );
            $label = esc_html( $field['label'] );

            echo '<tr><th style="width:200px;vertical-align:top;padding-top:12px;">';
            echo '<label for="' . $id . '">' . $label . '</label></th><td>';

            switch ( $field['type'] ) {
                case 'textarea':
                    echo '<textarea id="' . $id . '" name="' . $id . '" rows="4" style="width:100%;">'
                        . esc_textarea( $value ) . '</textarea>';
                    break;

                case 'checkbox':
                    $checked = checked( $value, '1', false );
                    echo '<input type="hidden" name="' . $id . '" value="0">';
                    echo '<input type="checkbox" id="' . $id . '" name="' . $id . '" value="1" ' . $checked . '>';
                    break;

                case 'number':
                    echo '<input type="number" id="' . $id . '" name="' . $id . '" value="'
                        . esc_attr( $value ) . '" style="width:100px;">';
                    break;

                case 'image':
                    echo '<input type="url" id="' . $id . '" name="' . $id . '" value="'
                        . esc_attr( $value ) . '" style="width:100%;">';
                    echo '<p class="description">メディアライブラリからURLをコピーして貼り付けてください。</p>';
                    break;

                default: // text, url
                    $input_type = $field['type'] === 'url' ? 'url' : 'text';
                    echo '<input type="' . $input_type . '" id="' . $id . '" name="' . $id . '" value="'
                        . esc_attr( $value ) . '" style="width:100%;">';
            }

            echo '</td></tr>';
        }

        echo '</table>';
    }

    public static function save( int $post_id ) {
        // Security checks
        if ( ! isset( $_POST['spc_nonce'] ) || ! wp_verify_nonce( $_POST['spc_nonce'], 'spc_save_work' ) ) {
            return;
        }
        if ( defined( 'DOING_AUTOSAVE' ) && DOING_AUTOSAVE ) {
            return;
        }
        if ( ! current_user_can( 'edit_post', $post_id ) ) {
            return;
        }

        foreach ( self::fields() as $field ) {
            $key = $field['key'];
            if ( ! isset( $_POST[ $key ] ) ) {
                continue;
            }

            if ( $field['type'] === 'checkbox' ) {
                $value = $_POST[ $key ] === '1' ? '1' : '0';
            } elseif ( $field['type'] === 'url' ) {
                $value = esc_url_raw( $_POST[ $key ] );
            } else {
                $value = sanitize_textarea_field( $_POST[ $key ] );
            }

            update_post_meta( $post_id, $key, $value );
        }
    }
}
