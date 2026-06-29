<?php
/**
 * Template Name: About
 */
get_header();
?>

<main id="main" class="site-main page-about">
    <div class="container">
        <?php shion_breadcrumbs(); ?>

        <!-- About Hero -->
        <header class="page-header fade-in">
            <p class="page-label">About</p>
            <h1 class="page-title">Shion Kado</h1>
            <p class="page-subtitle">Brand Strategy &amp; Creative Direction</p>
        </header>

        <!-- Profile -->
        <section class="about-section about-profile fade-in">
            <div class="about-profile__grid">
                <div class="about-profile__text">
                    <p class="about-lead">
                        Shion Kado is a creative producer / planner who connects brand strategy, visual direction, and customer flow design.
                    </p>
                    <p>
                        広告・販促・展示会・SNS・EC・Web・資料制作など、複数の顧客接点を横断しながら、ブランドの目的を整理し、成果につながる表現と導線へ落とし込みます。
                    </p>
                    <p>
                        制作物を作るだけではなく、「なぜそう見せるのか」「その先に何があるのか」を常に問いながら、事業成果に接続するクリエイティブを設計します。
                    </p>
                </div>
            </div>
        </section>

        <!-- Strength -->
        <section class="about-section fade-in">
            <h2 class="about-section__title">Strength</h2>
            <ul class="about-strength-list">
                <li>
                    <span class="strength-icon">—</span>
                    <div>
                        <h3>事業理解と表現の接続</h3>
                        <p>ブランドの目的・ターゲット・成果指標を整理した上で、表現の方向性を決定します。見た目だけでなく、売上・問い合わせ・受注につながる導線として設計します。</p>
                    </div>
                </li>
                <li>
                    <span class="strength-icon">—</span>
                    <div>
                        <h3>複数接点の横断設計</h3>
                        <p>SNS・EC・LP・広告・展示会・資料など、点ではなく線で設計します。各接点がブランドメッセージを一貫して伝えられる状態を目指します。</p>
                    </div>
                </li>
                <li>
                    <span class="strength-icon">—</span>
                    <div>
                        <h3>AIを活用した高速PDCAの実行</h3>
                        <p>リサーチ・企画・コピーライティング・資料化などにAIを組み込み、思考の速度と提案の精度を同時に上げます。</p>
                    </div>
                </li>
            </ul>
        </section>

        <!-- Background -->
        <section class="about-section fade-in">
            <h2 class="about-section__title">Background</h2>
            <div class="about-text">
                <p>
                    ファッション・ビューティー・D2C・カルチャー領域を中心に、ブランドのビジュアルディレクション、SNS設計、EC導線改善、展示会・イベントの制作物、営業・提案資料の設計などに携わってきました。
                </p>
                <p>
                    クライアントの課題を起点に、制作物の「型」を問わず、成果につながる最適な表現と導線を選びます。
                </p>
            </div>
        </section>

        <!-- What I Value -->
        <section class="about-section fade-in">
            <h2 class="about-section__title">What I Value</h2>
            <ul class="about-values">
                <li>目的から逆算するデザイン</li>
                <li>言語化してから視覚化する</li>
                <li>「きれい」より「伝わる・動く」</li>
                <li>仮説を立て、検証し、改善する</li>
                <li>AIは思考の拡張ツールとして使う</li>
            </ul>
        </section>

        <!-- Available Scope -->
        <section class="about-section fade-in">
            <h2 class="about-section__title">Available Scope</h2>
            <div class="available-grid">
                <div class="available-item">
                    <h3>業務委託 / フリーランス</h3>
                    <p>プロジェクト単位または月額契約での対応が可能です。</p>
                </div>
                <div class="available-item">
                    <h3>副業 / 並走支援</h3>
                    <p>既存チームへのクリエイティブ支援・ディレクション協力が可能です。</p>
                </div>
                <div class="available-item">
                    <h3>相談・壁打ち</h3>
                    <p>ブランド整理・SNS設計・EC改善のご相談は随時受け付けています。</p>
                </div>
            </div>
        </section>

        <!-- AI Workflow -->
        <section class="about-section about-ai fade-in">
            <h2 class="about-section__title">AI Workflow</h2>
            <p class="about-ai__lead">
                AIは、私の思考速度と提案精度を上げるワークフローの一部です。アウトプットそのものではなく、<br>
                リサーチ・構造化・企画量の増加・資料化の高速化に活用しています。
            </p>
            <a href="<?php echo esc_url( home_url( '/ai-creative' ) ); ?>" class="btn btn-outline">AI × Creative →</a>
        </section>

    </div>

    <?php get_template_part( 'template-parts/cta-section' ); ?>
</main>

<?php get_footer(); ?>
