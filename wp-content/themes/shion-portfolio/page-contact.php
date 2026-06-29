<?php
/**
 * Template Name: Contact
 */
get_header();
$sent = isset( $_GET['sent'] ) && $_GET['sent'] === '1';
?>

<main id="main" class="site-main page-contact">
    <div class="container">
        <?php shion_breadcrumbs(); ?>

        <header class="page-header fade-in">
            <p class="page-label">Contact</p>
            <h1 class="page-title">Start a Project</h1>
            <p class="page-subtitle">
                ブランド整理、Instagram導線、EC改善、提案資料制作の相談を受け付けています。<br>
                まずは現状のご共有とご相談から。
            </p>
        </header>

        <?php if ( $sent ) : ?>
        <div class="contact-success fade-in" role="alert">
            <p>お問い合わせいただきありがとうございます。<br>内容を確認のうえ、3営業日以内にご連絡いたします。</p>
        </div>
        <?php else : ?>

        <div class="contact-grid fade-in">

            <!-- Info -->
            <div class="contact-info">
                <div class="contact-info__block">
                    <p class="contact-info__label">Response</p>
                    <p>3営業日以内にご返信します。</p>
                </div>
                <div class="contact-info__block">
                    <p class="contact-info__label">Available for</p>
                    <ul>
                        <li>業務委託 / フリーランス契約</li>
                        <li>副業 / 並走支援</li>
                        <li>転職・採用のご相談</li>
                        <li>コラボレーション</li>
                    </ul>
                </div>
                <div class="contact-info__block">
                    <p class="contact-info__label">Instagram</p>
                    <a href="https://www.instagram.com/" target="_blank" rel="noopener noreferrer">@shionkado</a>
                </div>
            </div>

            <!-- Form -->
            <form class="contact-form" method="POST" action="">
                <?php wp_nonce_field( 'shion_contact', 'shion_contact_nonce' ); ?>

                <div class="form-row">
                    <label for="contact_name">Name <span class="required" aria-label="必須">*</span></label>
                    <input type="text" id="contact_name" name="contact_name" required
                           autocomplete="name" placeholder="山田 花子">
                </div>

                <div class="form-row">
                    <label for="contact_email">Email <span class="required" aria-label="必須">*</span></label>
                    <input type="email" id="contact_email" name="contact_email" required
                           autocomplete="email" placeholder="hello@example.com">
                </div>

                <div class="form-row">
                    <label for="contact_subject">Subject</label>
                    <select id="contact_subject" name="contact_subject">
                        <option value="">選択してください</option>
                        <option value="Branding">ブランド整理・VI設計</option>
                        <option value="SNS Direction">Instagram導線設計</option>
                        <option value="EC Improvement">EC改善</option>
                        <option value="Creative Direction">クリエイティブディレクション</option>
                        <option value="Proposal Design">提案資料設計</option>
                        <option value="Monthly Support">月額支援</option>
                        <option value="Other">その他</option>
                    </select>
                </div>

                <div class="form-row">
                    <label for="contact_message">Message <span class="required" aria-label="必須">*</span></label>
                    <textarea id="contact_message" name="contact_message" rows="8" required
                              placeholder="現状の課題・ご相談内容をお聞かせください。"></textarea>
                </div>

                <div class="form-row form-submit">
                    <button type="submit" class="btn btn-primary">Send Message</button>
                </div>
            </form>

        </div>

        <?php endif; ?>

    </div>
</main>

<?php get_footer(); ?>
