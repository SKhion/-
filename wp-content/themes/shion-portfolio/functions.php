<?php
/**
 * Shion Portfolio Theme — functions.php
 * Enqueues assets, sets up theme support, registers nav menus.
 */

if ( ! defined( 'ABSPATH' ) ) {
    exit;
}

// -------------------------------------------------------
// Theme Setup
// -------------------------------------------------------
function shion_theme_setup() {
    add_theme_support( 'title-tag' );
    add_theme_support( 'post-thumbnails' );
    add_theme_support( 'html5', [ 'search-form', 'comment-form', 'gallery', 'caption' ] );
    add_theme_support( 'custom-logo' );

    // Custom image sizes for work thumbnails
    add_image_size( 'work-thumbnail', 800, 600, true );
    add_image_size( 'work-hero',      1600, 900, true );
    add_image_size( 'work-gallery',   1200, 900, false );

    register_nav_menus( [
        'primary' => 'Primary Navigation',
        'footer'  => 'Footer Navigation',
    ] );

    load_theme_textdomain( 'shion-portfolio', get_template_directory() . '/languages' );
}
add_action( 'after_setup_theme', 'shion_theme_setup' );

// -------------------------------------------------------
// Enqueue Styles & Scripts
// -------------------------------------------------------
function shion_enqueue_assets() {
    $ver = wp_get_theme()->get( 'Version' );

    // Main stylesheet
    wp_enqueue_style(
        'shion-main',
        get_template_directory_uri() . '/assets/css/main.css',
        [],
        $ver
    );

    // Google Fonts — Inter + Noto Sans JP
    wp_enqueue_style(
        'shion-fonts',
        'https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600&family=Noto+Sans+JP:wght@300;400;500&display=swap',
        [],
        null
    );

    // Main JS (defer)
    wp_enqueue_script(
        'shion-main',
        get_template_directory_uri() . '/assets/js/main.js',
        [],
        $ver,
        true
    );
}
add_action( 'wp_enqueue_scripts', 'shion_enqueue_assets' );

// -------------------------------------------------------
// OGP / SEO — basic meta tags
// -------------------------------------------------------
function shion_ogp_meta() {
    global $post;
    $site_name  = get_bloginfo( 'name' );
    $site_url   = home_url();
    $title      = wp_title( '|', false, 'right' ) . $site_name;
    $description = get_bloginfo( 'description' );
    $image      = get_template_directory_uri() . '/assets/images/ogp-default.jpg';
    $url        = get_permalink();
    $type       = 'website';

    if ( is_singular( 'work' ) && has_post_thumbnail() ) {
        $image = get_the_post_thumbnail_url( $post->ID, 'work-hero' );
        $description = get_the_excerpt();
        $type = 'article';
    }

    if ( is_singular( 'post' ) && has_post_thumbnail() ) {
        $image = get_the_post_thumbnail_url( $post->ID, 'large' );
        $description = get_the_excerpt();
        $type = 'article';
    }

    $description = strip_tags( $description );
    ?>
    <meta property="og:site_name" content="<?php echo esc_attr( $site_name ); ?>">
    <meta property="og:title"     content="<?php echo esc_attr( $title ); ?>">
    <meta property="og:description" content="<?php echo esc_attr( $description ); ?>">
    <meta property="og:image"    content="<?php echo esc_url( $image ); ?>">
    <meta property="og:url"      content="<?php echo esc_url( $url ); ?>">
    <meta property="og:type"     content="<?php echo esc_attr( $type ); ?>">
    <meta name="twitter:card"    content="summary_large_image">
    <meta name="description"     content="<?php echo esc_attr( $description ); ?>">
    <?php
}
add_action( 'wp_head', 'shion_ogp_meta' );

// -------------------------------------------------------
// Breadcrumbs
// -------------------------------------------------------
function shion_breadcrumbs() {
    if ( is_front_page() ) {
        return;
    }

    echo '<nav class="breadcrumb" aria-label="Breadcrumb"><ol>';
    echo '<li><a href="' . esc_url( home_url() ) . '">Home</a></li>';

    if ( is_singular( 'work' ) ) {
        echo '<li><a href="' . esc_url( get_post_type_archive_link( 'work' ) ) . '">Works</a></li>';
        echo '<li aria-current="page">' . esc_html( get_the_title() ) . '</li>';
    } elseif ( is_post_type_archive( 'work' ) ) {
        echo '<li aria-current="page">Works</li>';
    } elseif ( is_singular( 'post' ) ) {
        echo '<li><a href="' . esc_url( get_permalink( get_option( 'page_for_posts' ) ) ) . '">Journal</a></li>';
        echo '<li aria-current="page">' . esc_html( get_the_title() ) . '</li>';
    } elseif ( is_page() ) {
        echo '<li aria-current="page">' . esc_html( get_the_title() ) . '</li>';
    }

    echo '</ol></nav>';
}

// -------------------------------------------------------
// Helper: get work meta with fallback
// -------------------------------------------------------
function spc_meta( string $key, int $post_id = 0 ): string {
    if ( ! $post_id ) {
        $post_id = get_the_ID();
    }
    return (string) get_post_meta( $post_id, '_spc_' . $key, true );
}

// -------------------------------------------------------
// Helper: render multiline meta as <ul>
// -------------------------------------------------------
function spc_meta_list( string $key, int $post_id = 0 ) {
    $value = spc_meta( $key, $post_id );
    if ( ! $value ) {
        return;
    }
    $items = array_filter( array_map( 'trim', explode( "\n", $value ) ) );
    echo '<ul>';
    foreach ( $items as $item ) {
        echo '<li>' . esc_html( $item ) . '</li>';
    }
    echo '</ul>';
}

// -------------------------------------------------------
// Contact form — simple native PHP mailer
// -------------------------------------------------------
function shion_handle_contact_form() {
    if ( ! isset( $_POST['shion_contact_nonce'] )
        || ! wp_verify_nonce( $_POST['shion_contact_nonce'], 'shion_contact' ) ) {
        return;
    }

    $name    = sanitize_text_field( $_POST['contact_name']    ?? '' );
    $email   = sanitize_email(       $_POST['contact_email']   ?? '' );
    $subject = sanitize_text_field( $_POST['contact_subject'] ?? '' );
    $message = sanitize_textarea_field( $_POST['contact_message'] ?? '' );

    if ( ! $name || ! $email || ! $message ) {
        return;
    }

    $to      = get_option( 'admin_email' );
    $headers = [ 'Content-Type: text/plain; charset=UTF-8', 'Reply-To: ' . $email ];
    $body    = "Name: $name\nEmail: $email\n\n$message";

    wp_mail( $to, '[Portfolio Contact] ' . $subject, $body, $headers );

    // Redirect to prevent resubmit
    wp_safe_redirect( add_query_arg( 'sent', '1', get_permalink() ) );
    exit;
}
add_action( 'template_redirect', 'shion_handle_contact_form' );

// -------------------------------------------------------
// Excerpt length
// -------------------------------------------------------
add_filter( 'excerpt_length', fn() => 30 );
add_filter( 'excerpt_more',   fn() => '…' );
