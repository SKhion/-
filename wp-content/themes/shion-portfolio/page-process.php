<?php
/**
 * Template Name: Process
 */
get_header();
?>

<main id="main" class="site-main page-process">
    <div class="container">
        <?php shion_breadcrumbs(); ?>

        <header class="page-header fade-in">
            <p class="page-label">Process</p>
            <h1 class="page-title">How I Work</h1>
            <p class="page-subtitle">課題の整理から成果の改善まで、一貫したプロセスで進めます。</p>
        </header>

        <ol class="process-detail-list">
            <?php
            $steps = [
                [
                    'num'   => '01',
                    'title' => 'Understand',
                    'sub'   => '理解・整理',
                    'body'  => 'ブランドの目的・現状の課題・ターゲット・競合・成果指標を整理します。制作の前に「何を達成するための制作か」を明確にします。ヒアリングシートとリサーチを通じて、プロジェクトの地図を作ります。',
                    'items' => [ 'ヒアリング', '現状分析', '競合調査', '課題の言語化', '成果指標の設定' ],
                ],
                [
                    'num'   => '02',
                    'title' => 'Structure',
                    'sub'   => '設計',
                    'body'  => '情報・導線・コンテンツの骨格を設計します。何を、どの順番で、どの接点で伝えるかを決めます。見た目のデザインより先に、構造と言葉を固めます。',
                    'items' => [ 'コンテンツ構成設計', 'サイトマップ / 導線設計', 'コピーライン整理', 'ワイヤーフレーム' ],
                ],
                [
                    'num'   => '03',
                    'title' => 'Design',
                    'sub'   => 'デザイン',
                    'body'  => '構造を視覚化します。ブランドのトーン・フォント・カラー・レイアウトを設計し、「見た目」ではなく「伝わる・動く表現」を目指します。',
                    'items' => [ 'ビジュアルディレクション', 'UI / グラフィックデザイン', 'モックアップ・プロトタイプ' ],
                ],
                [
                    'num'   => '04',
                    'title' => 'Produce',
                    'sub'   => '制作・実装',
                    'body'  => '設計・デザインをもとに実制作・実装を進めます。必要に応じてパートナーと連携し、納期・品質を管理します。',
                    'items' => [ '制作・実装', 'パートナー連携', '品質確認', '納品' ],
                ],
                [
                    'num'   => '05',
                    'title' => 'Improve',
                    'sub'   => '改善',
                    'body'  => '公開後の反応・数値を確認し、改善提案を行います。一度作って終わりではなく、成果につながる状態を維持・向上させます。',
                    'items' => [ '効果検証', '改善ポイントの抽出', '次のアクション提案' ],
                ],
            ];
            foreach ( $steps as $i => $step ) : ?>
            <li class="process-detail-item fade-in">
                <div class="process-detail__num"><?php echo esc_html( $step['num'] ); ?></div>
                <div class="process-detail__content">
                    <div class="process-detail__header">
                        <h2 class="process-detail__title"><?php echo esc_html( $step['title'] ); ?></h2>
                        <span class="process-detail__sub"><?php echo esc_html( $step['sub'] ); ?></span>
                    </div>
                    <p class="process-detail__body"><?php echo esc_html( $step['body'] ); ?></p>
                    <ul class="process-detail__items">
                        <?php foreach ( $step['items'] as $item ) : ?>
                            <li><?php echo esc_html( $item ); ?></li>
                        <?php endforeach; ?>
                    </ul>
                </div>
            </li>
            <?php endforeach; ?>
        </ol>

    </div>

    <?php get_template_part( 'template-parts/cta-section' ); ?>
</main>

<?php get_footer(); ?>
