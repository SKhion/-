<?php
/**
 * Provides a WP-CLI / admin-triggered command to seed sample work posts.
 *
 * Usage (WP-CLI):
 *   wp eval-file wp-content/plugins/shion-portfolio-core/includes/class-sample-data.php
 *
 * Or call SPC_Sample_Data::seed() from functions.php temporarily.
 */
class SPC_Sample_Data {

    public static function seed() {
        $samples = [
            [
                'title'    => 'mtmt...G — Brand Identity & SNS Direction',
                'excerpt'  => 'ファッションブランドのブランドアイデンティティ構築とInstagram導線設計を担当。',
                'category' => 'Branding',
                'industry' => 'Fashion',
                'meta'     => [
                    '_spc_year'         => '2024',
                    '_spc_client'       => 'mtmt...G',
                    '_spc_role'         => 'Brand Direction / SNS Design',
                    '_spc_scope'        => "ブランドコンセプト策定\nVI設計\nInstagramプロフィール設計\n投稿テンプレート制作",
                    '_spc_tools'        => "Figma\nAdobe Illustrator\nNotion",
                    '_spc_issue'        => 'ブランドの世界観がSNS上で統一されておらず、フォロワーへの伝わり方が曖昧だった。',
                    '_spc_strategy'     => 'ブランドの核となるコンセプトを言語化し、Instagramのビジュアルトーン・投稿構成・ハイライトを一貫したシステムとして設計。',
                    '_spc_deliverables' => "ブランドコンセプトシート\nInstagramプロフィール改善案\n投稿テンプレート（フィード/ストーリーズ）\nハイライトカバー",
                    '_spc_result'       => 'プロフィールの統一により、フォロワーからの問い合わせDM数が増加。世界観の言語化によって採用・コラボ交渉にも活用できるブランドドキュメントが完成。',
                    '_spc_thinking'     => '見た目のデザインより先に「何を伝えたいブランドか」を整理。その結果、投稿の迷いがなくなり運用がスムーズになった。',
                    '_spc_improvement'  => 'UGCの活用設計とストーリーズのCVR測定を今後の課題として提案。',
                    '_spc_featured'     => '1',
                    '_spc_display_order'=> '1',
                ],
            ],
            [
                'title'    => 'Kaleidoscope Felicity — Instagram Direction',
                'excerpt'  => 'ビューティーブランドのInstagramアカウント全体の導線設計・投稿設計を担当。',
                'category' => 'SNS Direction',
                'industry' => 'Beauty',
                'meta'     => [
                    '_spc_year'         => '2023',
                    '_spc_client'       => 'Kaleidoscope Felicity',
                    '_spc_role'         => 'SNS Direction / Content Design',
                    '_spc_scope'        => "Instagramアカウント設計\n投稿フォーマット設計\nコンテンツカレンダー設計",
                    '_spc_tools'        => "Figma\nAdobe Photoshop\nNotion\nCanva",
                    '_spc_issue'        => '投稿の見た目はきれいだが、フォロワーが購買や問い合わせに至らない状態。',
                    '_spc_strategy'     => '認知→興味→購買の導線をInstagram上で設計。ハイライトをECへの橋渡しとして機能させ、ストーリーズにCTAを組み込んだ。',
                    '_spc_deliverables' => "SNS導線設計資料\nフィード投稿テンプレート\nストーリーズCTAフォーマット\nコンテンツカレンダー（3ヶ月分）",
                    '_spc_result'       => 'プロフィールからECへの遷移率が改善。ストーリーズからの購買が発生し始めた。',
                    '_spc_thinking'     => 'SNSは「展示」ではなく「導線」という視点で全体を再設計。各投稿に役割を持たせることで、運用者の迷いを減らした。',
                    '_spc_improvement'  => 'リール活用とSEO的なキャプション設計を追加で提案予定。',
                    '_spc_featured'     => '1',
                    '_spc_display_order'=> '2',
                ],
            ],
            [
                'title'    => '展示会 / イベント プロモーション',
                'excerpt'  => 'カルチャー系イベントの告知ビジュアル・会場サイン・SNS素材をトータルで制作。',
                'category' => 'Event / Exhibition',
                'industry' => 'Culture',
                'meta'     => [
                    '_spc_year'         => '2023',
                    '_spc_client'       => '非公開（カルチャーイベント）',
                    '_spc_role'         => 'Creative Direction / Graphic Design',
                    '_spc_scope'        => "イベントビジュアル設計\nフライヤー制作\nSNS告知素材\n会場サイン",
                    '_spc_tools'        => "Adobe Illustrator\nAdobe Photoshop\nFigma",
                    '_spc_issue'        => 'イベントのコンセプトはあるが、視覚的な表現がバラバラで「世界観が伝わらない」状態だった。',
                    '_spc_strategy'     => 'コンセプトのキーワードからビジュアルシステムを設計し、すべての制作物に一貫したトーンを持たせた。',
                    '_spc_deliverables' => "キービジュアル\nSNS告知素材（各種サイズ）\nフライヤーA5\n会場内サイン",
                    '_spc_result'       => '世界観の統一により、SNSでのシェアが増加。来場者からの反応も「雰囲気がよかった」という声が多数。',
                    '_spc_featured'     => '1',
                    '_spc_display_order'=> '3',
                ],
            ],
            [
                'title'    => '法人向け提案資料 / 営業ドキュメント設計',
                'excerpt'  => 'スタートアップの営業資料・会社紹介資料のデザインと構成を担当。',
                'category' => 'Proposal Design',
                'industry' => 'Startup',
                'meta'     => [
                    '_spc_year'         => '2024',
                    '_spc_client'       => '非公開（スタートアップ）',
                    '_spc_role'         => 'Document Design / Structure Planning',
                    '_spc_scope'        => "資料構成設計\nPowerPoint / Keynoteデザイン\nプレゼン用フォーマット整備",
                    '_spc_tools'        => "PowerPoint\nKeynote\nFigma\nNotion",
                    '_spc_issue'        => '内容は優れているが、資料の構成が伝わりにくく、商談での説明が長くなりがちだった。',
                    '_spc_strategy'     => '「1スライド1メッセージ」の原則で全体を再構成。図解と余白を活用し、口頭説明なしでも伝わる資料設計にした。',
                    '_spc_deliverables' => "会社紹介資料（30P）\n営業提案テンプレート（10P）\nデザインシステム（スライドマスター）",
                    '_spc_result'       => '商談時間が短縮され、提案通過率が向上。社内での資料作成スピードも改善。',
                    '_spc_featured'     => '0',
                    '_spc_display_order'=> '4',
                ],
            ],
        ];

        foreach ( $samples as $data ) {
            // Skip if a post with the same title exists
            $existing = get_page_by_title( $data['title'], OBJECT, 'work' );
            if ( $existing ) {
                echo "SKIP: {$data['title']}\n";
                continue;
            }

            $post_id = wp_insert_post( [
                'post_type'    => 'work',
                'post_title'   => $data['title'],
                'post_excerpt' => $data['excerpt'],
                'post_status'  => 'publish',
                'post_author'  => 1,
            ] );

            if ( is_wp_error( $post_id ) ) {
                echo "ERROR: {$data['title']}\n";
                continue;
            }

            // Taxonomy terms
            $cat_term = get_term_by( 'name', $data['category'], 'work_category' );
            if ( $cat_term ) {
                wp_set_object_terms( $post_id, $cat_term->term_id, 'work_category' );
            }

            $ind_term = get_term_by( 'name', $data['industry'], 'work_industry' );
            if ( $ind_term ) {
                wp_set_object_terms( $post_id, $ind_term->term_id, 'work_industry' );
            }

            // Meta fields
            foreach ( $data['meta'] as $meta_key => $meta_value ) {
                update_post_meta( $post_id, $meta_key, $meta_value );
            }

            echo "CREATED: {$data['title']} (ID: {$post_id})\n";
        }

        echo "Done.\n";
    }
}

// If called directly via eval-file, run the seeder
if ( defined( 'WP_CLI' ) && WP_CLI ) {
    SPC_Sample_Data::seed();
}
