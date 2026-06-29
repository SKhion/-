<?php
/**
 * Reusable Contact CTA section.
 * Usage: get_template_part( 'template-parts/cta-section' );
 */
?>
<section class="cta-section fade-in">
    <div class="container">
        <div class="cta-inner">
            <p class="cta-label">Start a Project</p>
            <h2 class="cta-heading">ブランド整理、Instagram導線、<br>EC改善、提案資料の相談を受け付けています。</h2>
            <p class="cta-sub">まずは現状のヒアリングから。お気軽にご連絡ください。</p>
            <div class="cta-actions">
                <a href="<?php echo esc_url( home_url( '/contact' ) ); ?>" class="btn btn-primary">Contact</a>
                <a href="mailto:<?php echo esc_attr( get_option( 'admin_email' ) ); ?>" class="btn btn-secondary">Mail</a>
            </div>
        </div>
    </div>
</section>
