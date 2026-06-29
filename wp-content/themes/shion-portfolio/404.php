<?php
/**
 * 404 Error page template.
 */
get_header();
?>

<main id="main" class="site-main page-404">
    <div class="container">
        <div class="error-404 fade-in">
            <p class="error-404__code">404</p>
            <h1 class="error-404__title">Page Not Found</h1>
            <p class="error-404__desc">お探しのページは見つかりませんでした。</p>
            <div class="error-404__actions">
                <a href="<?php echo esc_url( home_url() ); ?>" class="btn btn-primary">← Back to Home</a>
                <a href="<?php echo esc_url( get_post_type_archive_link( 'work' ) ); ?>" class="btn btn-outline">View Works</a>
            </div>
        </div>
    </div>
</main>

<?php get_footer(); ?>
