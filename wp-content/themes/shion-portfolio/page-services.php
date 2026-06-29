<?php
/**
 * Template Name: Services
 */
get_header();

$services = [
    [
        'num'         => '01',
        'name'        => 'Brand Concept & Visual Direction',
        'for'         => 'ブランドの世界観が曖昧、競合と差別化できていないと感じている方',
        'issue'       => '「どんなブランドか」が伝わらない / ビジュアルがバラバラ / コンセプトが言語化されていない',
        'what'        => 'ブランドのコアを言語化し、VI方向性・世界観設計までを一気通貫で整理します',
        'deliverables'=> [ 'ブランドコンセプトシート', 'ロゴ/VI方向性整理', 'カラー・フォント・トーン設計', '世界観参照ムードボード' ],
        'price'       => '80,000円〜300,000円',
    ],
    [
        'num'         => '02',
        'name'        => 'Instagram Profile & Flow Design',
        'for'         => 'Instagramを運用しているが、フォロワーが購買・問い合わせに至らない方',
        'issue'       => 'フォロワーは増えても売れない / プロフィールの訴求力が弱い / 導線が機能していない',
        'what'        => 'プロフィール・投稿・ハイライト・ストーリーズを一つの導線システムとして設計します',
        'deliverables'=> [ 'プロフィール改善案', '投稿テンプレートフォーマット', 'ハイライトカバー設計', 'ストーリーズCTA設計', 'コンテンツカレンダー' ],
        'price'       => '30,000円〜150,000円',
    ],
    [
        'num'         => '03',
        'name'        => 'EC Flow Improvement',
        'for'         => 'BASE / STORES / Shopifyを運用しているが、転換率が低いと感じている方',
        'issue'       => 'SNSから来ても購買されない / 商品ページが弱い / FVの訴求が曖昧',
        'what'        => 'EC導線をユーザー目線で設計し直し、購買につながるページ構成・表現に改善します',
        'deliverables'=> [ 'EC導線診断レポート', 'トップページ改善案', '商品ページ改善案', 'ファーストビュー改善案' ],
        'price'       => '50,000円〜250,000円',
    ],
    [
        'num'         => '04',
        'name'        => 'Creative Direction Monthly Support',
        'for'         => '月次でクリエイティブの一貫性を保ちながら制作・運用したい方',
        'issue'       => '社内にデザインの判断軸がない / 制作物がバラバラになる / 毎回方向性で迷う',
        'what'        => 'SNS・LP・バナー・販促物のクリエイティブ方向性を月次で判断・改善します',
        'deliverables'=> [ '月次クリエイティブ方針整理', 'SNS/バナー/LP方向性確認', '制作物チェック・改善提案', '月1回の振り返りレポート' ],
        'price'       => '100,000円〜300,000円/月',
    ],
    [
        'num'         => '05',
        'name'        => 'Proposal / Sales Material Design',
        'for'         => '提案資料や営業資料の伝わり方を改善したい方',
        'issue'       => '内容はよいが資料が伝わらない / 商談で説明が長くなる / 資料の統一感がない',
        'what'        => '構成設計からデザインまで一貫して担当し、見るだけで伝わる資料を制作します',
        'deliverables'=> [ '資料構成設計', 'PowerPoint/Keynoteデザイン', 'スライドマスター整備', 'デザインシステム' ],
        'price'       => '50,000円〜200,000円',
    ],
];
?>

<main id="main" class="site-main page-services">
    <div class="container">
        <?php shion_breadcrumbs(); ?>

        <header class="page-header fade-in">
            <p class="page-label">Services</p>
            <h1 class="page-title">What I Can Do</h1>
            <p class="page-subtitle">課題と目的を整理し、成果につながる制作と設計を提供します。</p>
        </header>

        <div class="services-detail-list">
            <?php foreach ( $services as $s ) : ?>
            <article class="service-detail fade-in">
                <div class="service-detail__header">
                    <span class="service-detail__num"><?php echo esc_html( $s['num'] ); ?></span>
                    <h2 class="service-detail__name"><?php echo esc_html( $s['name'] ); ?></h2>
                </div>
                <div class="service-detail__body">
                    <div class="service-detail__left">
                        <div class="service-detail__block">
                            <p class="service-detail__block-label">For</p>
                            <p><?php echo esc_html( $s['for'] ); ?></p>
                        </div>
                        <div class="service-detail__block">
                            <p class="service-detail__block-label">Client Issue</p>
                            <p><?php echo esc_html( $s['issue'] ); ?></p>
                        </div>
                        <div class="service-detail__block">
                            <p class="service-detail__block-label">What Shion Provides</p>
                            <p><?php echo esc_html( $s['what'] ); ?></p>
                        </div>
                    </div>
                    <div class="service-detail__right">
                        <div class="service-detail__block">
                            <p class="service-detail__block-label">Deliverables</p>
                            <ul>
                                <?php foreach ( $s['deliverables'] as $d ) : ?>
                                    <li><?php echo esc_html( $d ); ?></li>
                                <?php endforeach; ?>
                            </ul>
                        </div>
                        <div class="service-detail__price">
                            <p class="service-detail__block-label">Price Range</p>
                            <p class="price-value"><?php echo esc_html( $s['price'] ); ?></p>
                        </div>
                        <a href="<?php echo esc_url( home_url( '/contact' ) ); ?>" class="btn btn-outline">相談する →</a>
                    </div>
                </div>
            </article>
            <?php endforeach; ?>
        </div>

        <div class="services-note fade-in">
            <p>※ 価格はプロジェクト規模・内容により変動します。まずはお気軽にご相談ください。</p>
        </div>
    </div>

    <?php get_template_part( 'template-parts/cta-section' ); ?>
</main>

<?php get_footer(); ?>
