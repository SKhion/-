<?php
/**
 * Work Detail template.
 */
get_header();
the_post();

$year         = spc_meta( 'year' );
$client       = spc_meta( 'client' );
$role         = spc_meta( 'role' );
$scope        = spc_meta( 'scope' );
$tools        = spc_meta( 'tools' );
$related_url  = spc_meta( 'related_url' );
$hero_image   = spc_meta( 'hero_image' );
$gallery_raw  = spc_meta( 'gallery' );
$summary      = spc_meta( 'summary' );
$issue        = spc_meta( 'issue' );
$strategy     = spc_meta( 'strategy' );
$deliverables = spc_meta( 'deliverables' );
$result       = spc_meta( 'result' );
$thinking     = spc_meta( 'thinking' );
$improvement  = spc_meta( 'improvement' );

$cats = wp_get_object_terms( get_the_ID(), 'work_category', [ 'fields' => 'names' ] );
$cat_label = ( ! is_wp_error( $cats ) && $cats ) ? implode( ', ', $cats ) : '';

$gallery_images = array_filter( array_map( 'trim', explode( "\n", $gallery_raw ) ) );

// Hero image fallback to featured image
if ( ! $hero_image && has_post_thumbnail() ) {
    $hero_image = get_the_post_thumbnail_url( get_the_ID(), 'work-hero' );
}
?>

<main id="main" class="site-main single-work">

    <!-- =========================================
         1. Hero
    ========================================= -->
    <section class="work-hero">
        <?php if ( $hero_image ) : ?>
        <div class="work-hero__image">
            <img src="<?php echo esc_url( $hero_image ); ?>"
                 alt="<?php the_title_attribute(); ?> — Hero Image"
                 loading="eager"
                 width="1600" height="900">
        </div>
        <?php endif; ?>
        <div class="work-hero__overlay container">
            <div class="work-hero__meta">
                <?php if ( $cat_label ) : ?>
                    <p class="work-hero__cat"><?php echo esc_html( $cat_label ); ?></p>
                <?php endif; ?>
                <?php if ( $year ) : ?>
                    <p class="work-hero__year"><?php echo esc_html( $year ); ?></p>
                <?php endif; ?>
            </div>
            <h1 class="work-hero__title"><?php the_title(); ?></h1>
            <?php if ( $role ) : ?>
                <p class="work-hero__role"><?php echo esc_html( $role ); ?></p>
            <?php endif; ?>
        </div>
        <?php shion_breadcrumbs(); ?>
    </section>

    <div class="work-body container">

        <!-- =========================================
             2. Overview
        ========================================= -->
        <section class="work-section work-overview fade-in">
            <h2 class="work-section__title">Overview</h2>
            <dl class="overview-grid">
                <?php if ( $client ) : ?>
                    <div class="overview-row">
                        <dt>Client</dt><dd><?php echo esc_html( $client ); ?></dd>
                    </div>
                <?php endif; ?>
                <?php
                $industries = wp_get_object_terms( get_the_ID(), 'work_industry', [ 'fields' => 'names' ] );
                if ( ! is_wp_error( $industries ) && $industries ) :
                ?>
                    <div class="overview-row">
                        <dt>Industry</dt><dd><?php echo esc_html( implode( ', ', $industries ) ); ?></dd>
                    </div>
                <?php endif; ?>
                <?php if ( $scope ) : ?>
                    <div class="overview-row">
                        <dt>Scope</dt>
                        <dd><?php spc_meta_list( 'scope' ); ?></dd>
                    </div>
                <?php endif; ?>
                <?php if ( $tools ) : ?>
                    <div class="overview-row">
                        <dt>Tools</dt>
                        <dd><?php spc_meta_list( 'tools' ); ?></dd>
                    </div>
                <?php endif; ?>
                <?php if ( $related_url ) : ?>
                    <div class="overview-row">
                        <dt>URL</dt>
                        <dd><a href="<?php echo esc_url( $related_url ); ?>" target="_blank" rel="noopener noreferrer"><?php echo esc_html( $related_url ); ?></a></dd>
                    </div>
                <?php endif; ?>
            </dl>
        </section>

        <?php if ( $summary ) : ?>
        <section class="work-section work-summary fade-in">
            <p class="work-summary__text"><?php echo esc_html( $summary ); ?></p>
        </section>
        <?php endif; ?>

        <!-- =========================================
             3. Challenge
        ========================================= -->
        <?php if ( $issue ) : ?>
        <section class="work-section fade-in">
            <h2 class="work-section__title">Challenge</h2>
            <div class="work-section__body">
                <?php echo wpautop( esc_html( $issue ) ); ?>
            </div>
        </section>
        <?php endif; ?>

        <!-- =========================================
             4. Strategy
        ========================================= -->
        <?php if ( $strategy ) : ?>
        <section class="work-section fade-in">
            <h2 class="work-section__title">Strategy</h2>
            <div class="work-section__body">
                <?php echo wpautop( esc_html( $strategy ) ); ?>
            </div>
        </section>
        <?php endif; ?>

        <!-- =========================================
             5. Output / Gallery
        ========================================= -->
        <?php if ( $deliverables || $gallery_images ) : ?>
        <section class="work-section fade-in">
            <h2 class="work-section__title">Output</h2>
            <?php if ( $deliverables ) : ?>
            <div class="work-section__body">
                <?php echo wpautop( esc_html( $deliverables ) ); ?>
            </div>
            <?php endif; ?>
            <?php if ( $gallery_images ) : ?>
            <div class="work-gallery">
                <?php foreach ( $gallery_images as $img_url ) : ?>
                <figure class="work-gallery__item">
                    <img src="<?php echo esc_url( $img_url ); ?>"
                         alt="<?php the_title_attribute(); ?> — output image"
                         loading="lazy">
                </figure>
                <?php endforeach; ?>
            </div>
            <?php endif; ?>
        </section>
        <?php endif; ?>

        <!-- =========================================
             6. Result
        ========================================= -->
        <?php if ( $result ) : ?>
        <section class="work-section work-result fade-in">
            <h2 class="work-section__title">Result</h2>
            <div class="work-section__body">
                <?php echo wpautop( esc_html( $result ) ); ?>
            </div>
        </section>
        <?php endif; ?>

        <!-- =========================================
             7. Design Intent
        ========================================= -->
        <?php if ( $thinking ) : ?>
        <section class="work-section fade-in">
            <h2 class="work-section__title">Design Intent</h2>
            <div class="work-section__body">
                <?php echo wpautop( esc_html( $thinking ) ); ?>
            </div>
        </section>
        <?php endif; ?>

        <!-- =========================================
             8. Next Improvement
        ========================================= -->
        <?php if ( $improvement ) : ?>
        <section class="work-section fade-in">
            <h2 class="work-section__title">Next Improvement</h2>
            <div class="work-section__body">
                <?php echo wpautop( esc_html( $improvement ) ); ?>
            </div>
        </section>
        <?php endif; ?>

        <!-- =========================================
             9. Related Works
        ========================================= -->
        <?php
        $current_id = get_the_ID();
        $related = new WP_Query( [
            'post_type'      => 'work',
            'posts_per_page' => 3,
            'post__not_in'   => [ $current_id ],
            'tax_query'      => [
                [
                    'taxonomy' => 'work_category',
                    'terms'    => wp_get_object_terms( $current_id, 'work_category', [ 'fields' => 'ids' ] ),
                ],
            ],
            'orderby' => 'rand',
        ] );

        if ( $related->have_posts() ) :
        ?>
        <section class="work-section work-related fade-in">
            <h2 class="work-section__title">Related Works</h2>
            <div class="related-list">
                <?php
                $GLOBALS['shion_work_index'] = 1;
                while ( $related->have_posts() ) :
                    $related->the_post();
                    get_template_part( 'template-parts/work-row' );
                    $GLOBALS['shion_work_index']++;
                endwhile;
                wp_reset_postdata();
                ?>
            </div>
        </section>
        <?php endif; ?>

    </div><!-- /.work-body -->

    <!-- =========================================
         10. CTA
    ========================================= -->
    <div class="work-cta-wrap">
        <div class="container">
            <div class="work-cta fade-in">
                <p class="work-cta__label">Same Challenge?</p>
                <p class="work-cta__text">同様の課題や相談があれば、お気軽にご連絡ください。</p>
                <a href="<?php echo esc_url( home_url( '/contact' ) ); ?>" class="btn btn-primary">Start a Project</a>
            </div>
        </div>
    </div>

</main>

<?php get_footer(); ?>
