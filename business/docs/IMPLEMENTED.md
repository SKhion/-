# 実装済一覧

## 戦略・ドキュメント
- [x] 既存プロジェクト解析・重複排除方針（`docs/00_ANALYSIS.md`）
- [x] 20案の採点・TOP5選定（`docs/01_SERVICE_SCORING.md`）
- [x] TOP5サービス設計（`services/01〜05`）

## AIエージェント
- [x] 12エージェント全員の役割/責任範囲/判断基準/システムプロンプト（`agents/`, `prompts/`）

## 自動化コード（Python、Claude API、モックモード対応）
- [x] 企業分析 `company_research.py`
- [x] Instagram/SNS診断 `instagram_analysis.py`
- [x] 競合分析 `competitor_analysis.py`
- [x] SNS投稿カレンダー生成 `sns_post_generator.py`
- [x] 提案書生成 `proposal_generator.py`
- [x] 見積生成（利益率ガードレール付き）`estimate_generator.py`
- [x] 請求書生成 `invoice_generator.py`
- [x] 営業メール生成 `sales_email_generator.py`
- [x] ブランド診断 `brand_diagnosis.py`
- [x] ロゴ/ビジュアル提案プロンプト生成 `logo_prompt_generator.py`
- [x] 月次レポート生成 `report_generator.py`
- [x] 全スクリプトの疎通テスト（`tests/test_scripts.py`、6件、全て通過確認済み）

## CRM / API（動作確認済み）
- [x] Node.js/TypeScript/Express + SQLite（ゼロコンフィグ起動）
- [x] companies/leads/proposals/estimates/contracts/tasks/reports/decisions の全CRUD
- [x] 契約更新45日前検知エンドポイント
- [x] KPIツリー集計エンドポイント（`/api/kpi/summary`）
- [x] Dockerfile / Supabase移行用スキーマ（`crm/schema.sql`）
- [x] APIテスト3件、`npm run build` / `npm test` で通過確認済み

## KPIダッシュボード
- [x] 静的HTML（`dashboard/index.html`）、API接続確認済み

## 営業・マーケティング資産
- [x] 営業プレイブック、ステージ別メールテンプレート5種
- [x] 提案書/見積/契約書/NDAテンプレート
- [x] ブランド診断/ロゴ提案テンプレート
- [x] Instagram診断チェックリスト（対話スキルと評価軸統一）・投稿カレンダーテンプレート
- [x] note記事ドラフト1本
- [x] LP（`lp/index.html`、自己完結・レスポンシブ）

## インフラ・CI
- [x] `.github/workflows/ci.yml`（API build+test、スクリプトのpy_compile+pytest）
- [x] `.env.example`、`config/pricing.config.json`、`config/agents.config.json`

## 動作確認の実施内容（今回の実装で実際に検証済み）
- `python3 -m py_compile` 全スクリプト成功
- 主要スクリプトをモックモードで実行し、出力ファイル生成を確認
- API: `npm run build` 成功、`npm test`（node:test）3件成功
- Python: `pytest`（6件）成功
