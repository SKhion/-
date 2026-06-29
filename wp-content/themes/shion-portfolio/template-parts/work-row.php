<?php
/**
 * Single work row for archive / home lists.
 * Expects the main WP Loop to be active.
 */
$year      = spc_meta( 'year' );
$role      = spc_meta( 'role' );
$thumb_url = has_post_thumbnail() ? get_the_post_thumbnail_url( get_the_ID(), 'work-thumbnail' ) : '';
$cats      = wp_get_object_terms( get_the_ID(), 'work_category', [ 'fields' => 'names' ] );
$cat_label = ! is_wp_error( $cats ) && $cats ? implode( ', ', $cats ) : '';
?>
<article class="work-row fade-in" <?php if ( $thumb_url ) : ?>data-hover-img="<?php echo esc_url( $thumb_url ); ?>"<?php endif; ?>>
    <a href="<?php the_permalink(); ?>" class="work-row__link" aria-label="<?php the_title_attribute(); ?>">
        <div class="work-row__index">
            <span class="work-row__num"><?php echo sprintf( '%02d', $GLOBALS['shion_work_index'] ?? 1 ); ?></span>
        </div>
        <div class="work-row__title">
            <h2 class="work-row__name"><?php the_title(); ?></h2>
        </div>
        <div class="work-row__meta">
            <?php if ( $cat_label ) : ?>
                <span class="work-row__cat"><?php echo esc_html( $cat_label ); ?></span>
            <?php endif; ?>
            <?php if ( $role ) : ?>
                <span class="work-row__role"><?php echo esc_html( $role ); ?></span>
            <?php endif; ?>
            <?php if ( $year ) : ?>
                <span class="work-row__year"><?php echo esc_html( $year ); ?></span>
            <?php endif; ?>
        </div>
        <div class="work-row__arrow" aria-hidden="true">→</div>
    </a>
</article>
