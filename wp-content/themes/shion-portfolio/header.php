<!DOCTYPE html>
<html <?php language_attributes(); ?>>
<head>
<meta charset="<?php bloginfo( 'charset' ); ?>">
<meta name="viewport" content="width=device-width, initial-scale=1">
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<?php wp_head(); ?>
</head>
<body <?php body_class(); ?>>
<?php wp_body_open(); ?>

<header class="site-header" role="banner">
    <div class="header-inner">
        <a href="<?php echo esc_url( home_url() ); ?>" class="site-logo" aria-label="Home">
            <?php bloginfo( 'name' ); ?>
        </a>

        <button class="nav-toggle" aria-label="Toggle navigation" aria-expanded="false" aria-controls="primary-nav">
            <span></span>
            <span></span>
        </button>

        <nav id="primary-nav" class="primary-nav" role="navigation" aria-label="Primary">
            <ul class="nav-list">
                <li><a href="<?php echo esc_url( get_post_type_archive_link( 'work' ) ); ?>">Works</a></li>
                <li><a href="<?php echo esc_url( home_url( '/about' ) ); ?>">About</a></li>
                <li><a href="<?php echo esc_url( home_url( '/services' ) ); ?>">Services</a></li>
                <li><a href="<?php echo esc_url( home_url( '/journal' ) ); ?>">Journal</a></li>
                <li><a href="<?php echo esc_url( home_url( '/contact' ) ); ?>" class="nav-cta">Contact</a></li>
            </ul>
        </nav>
    </div>
</header>
