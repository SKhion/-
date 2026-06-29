<?php
/**
 * Plugin Name: Shion Portfolio Core
 * Plugin URI:  https://shionkado.com
 * Description: Custom Post Types, Taxonomies, and Meta Fields for Shion's portfolio site.
 *              Keeps work data independent of the active theme.
 * Version:     1.0.0
 * Author:      Shion Kado
 * License:     Private
 * Text Domain: shion-portfolio-core
 */

if ( ! defined( 'ABSPATH' ) ) {
    exit;
}

define( 'SPC_VERSION', '1.0.0' );
define( 'SPC_DIR', plugin_dir_path( __FILE__ ) );
define( 'SPC_URL', plugin_dir_url( __FILE__ ) );

require_once SPC_DIR . 'includes/class-post-types.php';
require_once SPC_DIR . 'includes/class-taxonomies.php';
require_once SPC_DIR . 'includes/class-meta-fields.php';
require_once SPC_DIR . 'includes/class-sample-data.php';

/**
 * Bootstrap the plugin.
 */
function spc_init() {
    SPC_Post_Types::register();
    SPC_Taxonomies::register();
    SPC_Meta_Fields::register();
}
add_action( 'init', 'spc_init' );

/**
 * Flush rewrite rules only on activation.
 */
register_activation_hook( __FILE__, function () {
    SPC_Post_Types::register();
    SPC_Taxonomies::register();
    flush_rewrite_rules();
} );

register_deactivation_hook( __FILE__, function () {
    flush_rewrite_rules();
} );
