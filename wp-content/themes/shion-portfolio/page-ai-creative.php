<?php
/**
 * Template Name: AI × Creative
 */
get_header();
?>

<main id="main" class="site-main page-ai">
    <div class="container">
        <?php shion_breadcrumbs(); ?>

        <header class="page-header fade-in">
            <p class="page-label">AI × Creative</p>
            <h1 class="page-title">AI is not the output.</h1>
            <p class="page-subtitle">It is a workflow for thinking, testing, and improving brand experiences faster.</p>
        </header>

        <section class="ai-section fade-in">
            <p class="ai-lead">
                AIを「効率化ツール」や「アウトプットを作るもの」として使うのではなく、<br>
                思考速度を上げ、仮説検証を早め、提案の精度を高めるワークフローとして組み込んでいます。
            </p>
        </section>

        <section class="ai-flow-section fade-in">
            <h2 class="ai-section-title">AI Workflow Steps</h2>
            <ol class="ai-flow-list">
                <?php
                $steps = [
                    [ 'title' => 'Research',          'desc' => 'ブランド・市場・競合のリサーチを高速化。AIで仮説の質を上げてからヒアリングへ。' ],
                    [ 'title' => 'Structure',          'desc' => '課題・情報・コンテンツの構造を複数パターンで試し、最適な骨格を選ぶ。' ],
                    [ 'title' => 'Concept',            'desc' => 'ブランドコンセプト・キャッチコピーの方向性を複数生成し、磨き込む。' ],
                    [ 'title' => 'Copy',               'desc' => 'LP・SNS・資料のコピーを量産し、A/Bの方向性を事前に検証する。' ],
                    [ 'title' => 'Visual Direction',   'desc' => '参照イメージのリサーチ・ムードボード作成・方向性整理を加速する。' ],
                    [ 'title' => 'Proposal',           'desc' => '提案資料の構成を設計し、クライアントに合わせた言葉へ最適化する。' ],
                    [ 'title' => 'Improvement',        'desc' => '公開後のデータをもとに、改善施策の候補を素早く整理・提案する。' ],
                ];
                foreach ( $steps as $i => $step ) : ?>
                <li class="ai-flow-item">
                    <div class="ai-flow__num"><?php echo sprintf( '%02d', $i + 1 ); ?></div>
                    <div class="ai-flow__content">
                        <h3 class="ai-flow__title"><?php echo esc_html( $step['title'] ); ?></h3>
                        <p class="ai-flow__desc"><?php echo esc_html( $step['desc'] ); ?></p>
                    </div>
                </li>
                <?php endforeach; ?>
            </ol>
        </section>

        <section class="ai-note-section fade-in">
            <h2 class="ai-section-title">What I Don't Do with AI</h2>
            <ul class="ai-dont-list">
                <li>AIで出てきたものをそのままアウトプットにしない</li>
                <li>クライアントへの理解・ヒアリングをAIに代替させない</li>
                <li>クリエイティブの最終判断をAIに委ねない</li>
                <li>AI感だけが先行するビジュアル・表現を採用しない</li>
            </ul>
        </section>

        <section class="ai-tools-section fade-in">
            <h2 class="ai-section-title">Tools</h2>
            <ul class="ai-tools-list">
                <li>Claude / ChatGPT — 思考・構成・コピー</li>
                <li>Perplexity — リサーチ</li>
                <li>Midjourney / Adobe Firefly — ムードボード・参照生成</li>
                <li>Notion AI — ドキュメント整理・資料化</li>
            </ul>
        </section>

    </div>

    <?php get_template_part( 'template-parts/cta-section' ); ?>
</main>

<?php get_footer(); ?>
