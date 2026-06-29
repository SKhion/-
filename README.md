# Shion Portfolio — WordPress Theme & Plugin

Brand Strategy & Creative Direction ポートフォリオサイト

---

## 構成

```
wp-content/
├── themes/
│   └── shion-portfolio/          # カスタムテーマ
│       ├── style.css             # テーマ定義
│       ├── functions.php         # テーマ設定・ヘルパー関数
│       ├── header.php
│       ├── footer.php
│       ├── index.php             # フォールバック（Journal単記事など）
│       ├── front-page.php        # Home
│       ├── archive-work.php      # Works Archive
│       ├── single-work.php       # Work Detail
│       ├── page-about.php        # About（固定ページのテンプレート）
│       ├── page-services.php     # Services
│       ├── page-process.php      # Process
│       ├── page-ai-creative.php  # AI × Creative
│       ├── page-journal.php      # Journal
│       ├── page-contact.php      # Contact
│       ├── 404.php
│       ├── template-parts/
│       │   ├── work-row.php      # 実績リスト行（共通）
│       │   └── cta-section.php   # Contact CTAセクション（共通）
│       └── assets/
│           ├── css/main.css
│           └── js/main.js
└── plugins/
    └── shion-portfolio-core/     # カスタムプラグイン
        ├── shion-portfolio-core.php
        └── includes/
            ├── class-post-types.php   # Custom Post Type: work
            ├── class-taxonomies.php   # Taxonomy: work_category / work_industry
            ├── class-meta-fields.php  # 管理画面メタフィールド
            └── class-sample-data.php  # サンプルデータ登録
```

---

## ローカル開発手順

### 1. 環境準備

[LocalWP](https://localwp.com/) または MAMP / XAMPP でWordPress環境を用意してください。

推奨PHPバージョン：8.0以上  
推奨WordPressバージョン：6.4以上

### 2. ファイルの配置

```bash
# wp-content/themes/ に shion-portfolio/ をコピー
# wp-content/plugins/ に shion-portfolio-core/ をコピー
```

### 3. WordPress管理画面での設定

1. **プラグインを有効化**  
   `管理画面 → プラグイン → Shion Portfolio Core → 有効化`

2. **テーマを有効化**  
   `外観 → テーマ → Shion Portfolio → 有効化`

3. **パーマリンクを更新**  
   `設定 → パーマリンク → 変更を保存`（これを忘れると /works/ が404になります）

4. **固定ページを作成**  
   以下の固定ページを作成し、テンプレートを選択してください。

   | ページ名        | スラッグ       | テンプレート         |
   |----------------|--------------|-------------------|
   | Home           | （フロントページ設定） | — |
   | About          | about        | About             |
   | Services       | services     | Services          |
   | Process        | process      | Process           |
   | AI × Creative  | ai-creative  | AI × Creative     |
   | Journal        | journal      | Journal           |
   | Contact        | contact      | Contact           |

5. **フロントページ設定**  
   `設定 → 表示設定 → ホームページの表示：固定ページ → ホームページ：Home`

6. **メールアドレス設定**  
   `設定 → 一般 → 管理者メールアドレス`  
   Contactフォームの送信先はこのアドレスになります。

---

## 実績の追加方法

### 管理画面から追加する

1. `実績管理 → 新しい実績を追加`
2. **タイトル**に案件名を入力
3. **アイキャッチ画像**でサムネイルを設定
4. **実績詳細情報**メタボックスで以下を入力：

| フィールド          | 内容                                  |
|--------------------|-------------------------------------|
| Year               | 2024（年）                           |
| Client             | クライアント名（非公開の場合は省略）      |
| Role               | Creative Direction / SNS Design など  |
| Scope              | 担当範囲（改行区切りで複数入力可）        |
| Tools Used         | 使用ツール（改行区切り）                 |
| Related URL        | 関連URL（任意）                        |
| Hero Image（URL）  | ヒーロー画像のURL（メディアライブラリから）|
| Gallery Images     | ギャラリー画像URL（改行区切り）          |
| Project Summary    | 一言サマリー                           |
| Client Issue       | クライアントが抱えていた課題             |
| Strategy           | 解決のための方向性・理由                 |
| Deliverables       | 納品物・施策の内容                      |
| Result             | 成果（定量 or 定性）                   |
| Thinking / Design Intent | なぜその設計にしたか             |
| Improvement Point  | 今後の改善案                          |
| Featured Work      | チェックするとHomeのSelected Worksに表示 |
| Display Order      | 表示順（数値が小さいほど先頭）           |

5. **カテゴリー**と**業種**を選択
6. 公開

### カテゴリーと業種の追加

`実績管理 → カテゴリー` または `実績管理 → 業種` から追加できます。

---

## サンプルデータの登録

### WP-CLIを使う場合

```bash
wp eval 'require_once WP_CONTENT_DIR . "/plugins/shion-portfolio-core/includes/class-sample-data.php"; SPC_Sample_Data::seed();'
```

### PHPコードで一時的に実行する場合

`functions.php`の末尾に以下を一時追加し、管理画面にアクセス後に削除：

```php
add_action('init', function() {
    if (current_user_can('manage_options') && isset($_GET['seed_works'])) {
        require_once WP_CONTENT_DIR . '/plugins/shion-portfolio-core/includes/class-sample-data.php';
        SPC_Sample_Data::seed();
    }
});
```

追加後、ブラウザで `/?seed_works=1` にアクセス → コードを削除。

---

## 推奨プラグイン一覧

| プラグイン            | 用途                         | 必須 |
|---------------------|------------------------------|------|
| Yoast SEO           | SEO・OGP管理の強化            | 任意 |
| WP Super Cache      | キャッシュによるパフォーマンス改善 | 推奨 |
| Smush               | 画像最適化（WebP変換）         | 推奨 |
| Contact Form 7      | より高機能なフォームが必要な場合 | 任意 |
| UpdraftPlus         | バックアップ                  | 推奨 |

> **基本はプラグイン依存を最小化しています。**  
> テーマ内のContact FormはPHPネイティブで実装済みです。SEOメタタグも基本実装済みです。

---

## デザインのカスタマイズ

`assets/css/main.css` の冒頭にあるCSS変数で色・フォント・サイズを変更できます：

```css
:root {
    --color-bg:    #0B0B0B;   /* 背景色 */
    --color-text:  #F5F5F0;   /* 文字色 */
    --color-accent: #C8C8C0;  /* アクセント */
    /* ... */
}
```

ライトモード（ベージュ背景）に切り替える場合は、同ファイルの `.light-mode` セレクタのコメントアウトを外し、`<body>`に `class="light-mode"` を付与してください。

---

## 今後の改善TODO

### 機能
- [ ] Works Archiveにカテゴリーフィルター（Ajax切り替え）を追加
- [ ] Contact FormにReCAPTCHAまたはhoneypotスパム対策を追加
- [ ] 管理画面のHero Image・Gallery ImagesをWordPressメディアライブラリ選択に改善（現在はURL入力）
- [ ] OGP画像をカスタマイズ可能にする（現在はデフォルト画像固定）
- [ ] Journalの記事一覧にカテゴリーフィルターを追加
- [ ] `page-journal.php` をカスタムページではなく `home.php` に置き換えて投稿アーカイブと統合する

### デザイン
- [ ] ダークモード / ライトモード切り替えボタン
- [ ] Work DetailページのHero Imageにparallax効果（軽量実装）
- [ ] アーカイブページのグリッド表示モード追加（現在はリスト表示のみ）
- [ ] スマホ用のWork Detailギャラリーにスワイプ対応

### パフォーマンス
- [ ] フォント読み込みにfont-display: swapを確認
- [ ] 画像をWebP形式で提供できる環境整備
- [ ] Critical CSSのインライン化

### SEO
- [ ] 各固定ページのmeta descriptionを管理画面で編集できるようにする
- [ ] JSON-LDによる構造化データ（Person, CreativeWork）の追加
- [ ] サイトマップの自動生成（Yoast SEOプラグイン推奨）

---

## 連絡先

Shion Kado  
Instagram: [@shionkado](https://www.instagram.com/)
