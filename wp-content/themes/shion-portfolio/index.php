<?php
/**
 * Fallback template — used for single posts (Journal) and any unmatched page.
 */
get_header();
?>

<main id="main" class="site-main page-default">
    <div class="container">
        <?php shion_breadcrumbs(); ?>

        <?php if ( have_posts() ) : ?>

        <?php if ( is_singular( 'post' ) ) :
            the_post(); ?>
            <article class="single-post fade-in">
                <header class="single-post__header">
                    <p class="single-post__meta">
                        <time datetime="<?php the_time( 'Y-m-d' ); ?>"><?php the_time( 'Y.m.d' ); ?></time>
                        <?php the_category( ' / ' ); ?>
                    </p>
                    <h1 class="single-post__title"><?php the_title(); ?></h1>
                </header>
                <div class="single-post__body">
                    <?php the_content(); ?>
                </div>
                <nav class="post-nav">
                    <?php the_post_navigation( [
                        'prev_text' => '← %title',
                        'next_text' => '%title →',
                    ] ); ?>
                </nav>
            </article>

        <?php else : ?>
            <div class="page-content fade-in">
                <h1 class="page-title"><?php the_title(); ?></h1>
                <?php while ( have_posts() ) : the_post(); the_content(); endwhile; ?>
            </div>
        <?php endif; ?>

        <?php else : ?>
            <p class="not-found-text">ページが見つかりませんでした。</p>
        <?php endif; ?>

    </div>
</main>

<?php get_footer(); ?>
