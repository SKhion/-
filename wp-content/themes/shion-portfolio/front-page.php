<?php
/**
 * Home page template.
 */
get_header();
?>

<main id="main" class="site-main">

    <!-- =========================================
         1. First View
    ========================================= -->
    <section class="fv" aria-label="First View">
        <div class="fv__inner container">
            <div class="fv__text">
                <p class="fv__label fade-in">Brand Strategy / Creative Direction / Flow Design</p>
                <h1 class="fv__name fade-in delay-1">SHION KADO</h1>
                <p class="fv__tagline fade-in delay-2">
                    ブランドと体験を整理し、<br>
                    SNS・EC・LP・広告・展示会まで、<br>
                    成果につながる導線を設計します。
                </p>
                <div class="fv__actions fade-in delay-3">
                    <a href="<?php echo esc_url( get_post_type_archive_link( 'work' ) ); ?>" class="btn btn-primary">View Works</a>
                    <a href="<?php echo esc_url( home_url( '/contact' ) ); ?>" class="btn btn-outline">Start a Project</a>
                </div>
            </div>
        </div>
        <div class="fv__scroll-indicator" aria-hidden="true">
            <span>Scroll</span>
            <div class="fv__scroll-line"></div>
        </div>
    </section>

    <!-- =========================================
         2. Selected Works
    ========================================= -->
    <section class="section-works" aria-label="Selected Works">
        <div class="container">
            <div class="section-header">
                <p class="section-label">Selected Works</p>
                <a href="<?php echo esc_url( get_post_type_archive_link( 'work' ) ); ?>" class="section-link">All Works →</a>
            </div>

            <div class="works-list" id="home-works-list">
                <?php
                $featured_query = new WP_Query( [
                    'post_type'      => 'work',
                    'posts_per_page' => 8,
                    'meta_query'     => [
                        [
                            'key'   => '_spc_featured',
                            'value' => '1',
                        ],
                    ],
                    'meta_key'       => '_spc_display_order',
                    'orderby'        => 'meta_value_num',
                    'order'          => 'ASC',
                ] );

                $GLOBALS['shion_work_index'] = 1;
                if ( $featured_query->have_posts() ) :
                    while ( $featured_query->have_posts() ) :
                        $featured_query->the_post();
                        get_template_part( 'template-parts/work-row' );
                        $GLOBALS['shion_work_index']++;
                    endwhile;
                    wp_reset_postdata();
                else :
                    echo '<p class="no-works">実績は近日公開予定です。</p>';
                endif;
                ?>
            </div>

            <!-- Hover preview image -->
            <div class="work-hover-preview" aria-hidden="true">
                <img src="" alt="" id="hover-preview-img" loading="lazy">
            </div>
        </div>
    </section>

    <!-- =========================================
         3. What I Do
    ========================================= -->
    <section class="section-services fade-in" aria-label="What I Do">
        <div class="container">
            <div class="section-header">
                <p class="section-label">What I Do</p>
            </div>
            <ul class="services-grid">
                <li class="service-item">
                    <span class="service-num">01</span>
                    <span class="service-name">Branding</span>
                    <p class="service-desc">ブランドコンセプト・VI方向性・世界観設計</p>
                </li>
                <li class="service-item">
                    <span class="service-num">02</span>
                    <span class="service-name">SNS / Instagram Flow Design</span>
                    <p class="service-desc">プロフィール設計・投稿フォーマット・導線改善</p>
                </li>
                <li class="service-item">
                    <span class="service-num">03</span>
                    <span class="service-name">EC / BASE / STORES / Shopify</span>
                    <p class="service-desc">商品ページ・ファーストビュー・購買導線の改善</p>
                </li>
                <li class="service-item">
                    <span class="service-num">04</span>
                    <span class="service-name">Creative Direction</span>
                    <p class="service-desc">広告・販促・展示会・LP・バナーの方向性統一</p>
                </li>
                <li class="service-item">
                    <span class="service-num">05</span>
                    <span class="service-name">Proposal / Sales Material</span>
                    <p class="service-desc">提案資料・営業資料・企画書のデザインと構成</p>
                </li>
                <li class="service-item">
                    <span class="service-num">06</span>
                    <span class="service-name">AI Workflow Design</span>
                    <p class="service-desc">AIを活用した思考・企画・制作フローの設計</p>
                </li>
            </ul>
            <div class="services-cta">
                <a href="<?php echo esc_url( home_url( '/services' ) ); ?>" class="btn btn-outline">View Services</a>
            </div>
        </div>
    </section>

    <!-- =========================================
         4. Process
    ========================================= -->
    <section class="section-process fade-in" aria-label="Process">
        <div class="container">
            <div class="section-header">
                <p class="section-label">Process</p>
            </div>
            <ol class="process-list">
                <li class="process-item">
                    <span class="process-num">01</span>
                    <div class="process-content">
                        <h3 class="process-title">Understand</h3>
                        <p class="process-desc">ブランドの目的・現状の課題・ターゲットを整理する</p>
                    </div>
                </li>
                <li class="process-item">
                    <span class="process-num">02</span>
                    <div class="process-content">
                        <h3 class="process-title">Structure</h3>
                        <p class="process-desc">情報・導線・コンテンツを設計する</p>
                    </div>
                </li>
                <li class="process-item">
                    <span class="process-num">03</span>
                    <div class="process-content">
                        <h3 class="process-title">Design</h3>
                        <p class="process-desc">ビジュアルと表現を落とし込む</p>
                    </div>
                </li>
                <li class="process-item">
                    <span class="process-num">04</span>
                    <div class="process-content">
                        <h3 class="process-title">Produce</h3>
                        <p class="process-desc">実制作・実装・納品</p>
                    </div>
                </li>
                <li class="process-item">
                    <span class="process-num">05</span>
                    <div class="process-content">
                        <h3 class="process-title">Improve</h3>
                        <p class="process-desc">効果検証・改善提案</p>
                    </div>
                </li>
            </ol>
        </div>
    </section>

    <!-- =========================================
         5. Contact CTA
    ========================================= -->
    <?php get_template_part( 'template-parts/cta-section' ); ?>

</main>

<?php get_footer(); ?>
