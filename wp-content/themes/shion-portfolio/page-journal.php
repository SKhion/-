<?php
/**
 * Template Name: Journal
 */
get_header();
?>

<main id="main" class="site-main page-journal">
    <div class="container">
        <?php shion_breadcrumbs(); ?>

        <header class="page-header fade-in">
            <p class="page-label">Journal</p>
            <h1 class="page-title">Thinking & Notes</h1>
            <p class="page-subtitle">ブランド・クリエイティブ・AIに関する思考と記録。</p>
        </header>

        <div class="journal-list">
            <?php
            $journal_query = new WP_Query( [
                'post_type'      => 'post',
                'posts_per_page' => 12,
            ] );
            if ( $journal_query->have_posts() ) :
                while ( $journal_query->have_posts() ) :
                    $journal_query->the_post();
                    ?>
                    <article class="journal-item fade-in">
                        <a href="<?php the_permalink(); ?>" class="journal-item__link">
                            <div class="journal-item__meta">
                                <time datetime="<?php the_time( 'Y-m-d' ); ?>"><?php the_time( 'Y.m.d' ); ?></time>
                                <?php the_category( ' / ' ); ?>
                            </div>
                            <h2 class="journal-item__title"><?php the_title(); ?></h2>
                            <p class="journal-item__excerpt"><?php the_excerpt(); ?></p>
                        </a>
                    </article>
                <?php
                endwhile;
                wp_reset_postdata();
            else :
                echo '<p class="no-posts">投稿はまだありません。</p>';
            endif;
            ?>
        </div>

    </div>
</main>

<?php get_footer(); ?>
