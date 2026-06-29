<?php
/**
 * Works Archive template.
 */
get_header();
?>

<main id="main" class="site-main page-works-archive">
    <div class="container">

        <?php shion_breadcrumbs(); ?>

        <!-- Archive Header -->
        <header class="archive-header fade-in">
            <h1 class="archive-title">Works</h1>
            <p class="archive-desc">ブランド整理から導線設計まで、成果につなげた実績。</p>
        </header>

        <!-- Filter -->
        <?php
        $categories = get_terms( [ 'taxonomy' => 'work_category', 'hide_empty' => true ] );
        if ( ! is_wp_error( $categories ) && $categories ) :
            $current_cat = get_query_var( 'work_category' );
        ?>
        <nav class="filter-nav fade-in" aria-label="Filter by category">
            <ul class="filter-list">
                <li>
                    <a href="<?php echo esc_url( get_post_type_archive_link( 'work' ) ); ?>"
                       class="filter-btn <?php echo ! $current_cat ? 'is-active' : ''; ?>">
                        All
                    </a>
                </li>
                <?php foreach ( $categories as $cat ) : ?>
                <li>
                    <a href="<?php echo esc_url( get_term_link( $cat ) ); ?>"
                       class="filter-btn <?php echo ( $current_cat === $cat->slug ) ? 'is-active' : ''; ?>">
                        <?php echo esc_html( $cat->name ); ?>
                    </a>
                </li>
                <?php endforeach; ?>
            </ul>
        </nav>
        <?php endif; ?>

        <!-- Works List -->
        <div class="works-list" id="works-archive-list">
            <?php
            $GLOBALS['shion_work_index'] = 1;
            if ( have_posts() ) :
                while ( have_posts() ) :
                    the_post();
                    get_template_part( 'template-parts/work-row' );
                    $GLOBALS['shion_work_index']++;
                endwhile;
            else :
                echo '<p class="no-works">該当する実績が見つかりませんでした。</p>';
            endif;
            ?>
        </div>

        <!-- Hover preview -->
        <div class="work-hover-preview" aria-hidden="true">
            <img src="" alt="" id="hover-preview-img" loading="lazy">
        </div>

        <!-- Pagination -->
        <div class="pagination fade-in">
            <?php the_posts_pagination( [
                'prev_text' => '← Prev',
                'next_text' => 'Next →',
            ] ); ?>
        </div>

    </div>
</main>

<?php get_footer(); ?>
