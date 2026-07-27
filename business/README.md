# AI事業会社 — business/

Shionの会社をAIだけで成長させるための事業インフラ一式。営業・診断・提案・見積・契約・納品・
月次レポート・契約更新・アップセルまでを、Claude(Anthropic API)を中核にしたエージェント群と
自動化スクリプトで一気通貫に回すことを目的とする。

**まず読むべきドキュメント**: [`docs/TOMORROW_MORNING.md`](docs/TOMORROW_MORNING.md)（今すぐやることの優先順位）

## 全体像
- 戦略: [`docs/00_ANALYSIS.md`](docs/00_ANALYSIS.md)（既存プロジェクト解析）/
  [`docs/01_SERVICE_SCORING.md`](docs/01_SERVICE_SCORING.md)（20案採点・TOP5選定）
- 商品: [`services/`](services/)（TOP5サービスの詳細設計）
- 組織: [`agents/`](agents/) 12エージェントの役割定義、[`prompts/`](prompts/) システムプロンプト本文
- 実行系: [`scripts/`](scripts/)（自動化）、[`api/`](api/)（CRM/API）、[`crm/`](crm/)（DBスキーマ）、
  [`dashboard/`](dashboard/)（KPI可視化）
- 営業・マーケ: [`sales/`](sales/) [`proposal/`](proposal/) [`estimate/`](estimate/) [`contracts/`](contracts/)
  [`branding/`](branding/) [`research/`](research/) [`instagram/`](instagram/) [`note/`](note/) [`lp/`](lp/)
- 運用: [`automation/`](automation/)（全体ワークフロー・n8n雛形）、[`config/`](config/)（設定の単一ソース）、
  [`github/`](github/)（GitHub運用ドキュメント、実行系は `/.github/workflows`）
- 品質: [`tests/`](tests/)、[`docs/SELF_REVIEW.md`](docs/SELF_REVIEW.md)

## セットアップ
[`docs/SETUP.md`](docs/SETUP.md) を参照。要約:
```bash
cp business/.env.example business/.env
cd business/api && npm install && npm run dev   # CRM API: http://localhost:4000
cd business/dashboard && python3 -m http.server 8080  # KPIダッシュボード
```

## 構成図・API一覧
- [`docs/ARCHITECTURE.md`](docs/ARCHITECTURE.md)
- [`docs/API.md`](docs/API.md)

## 進捗管理
- [`docs/ROADMAP.md`](docs/ROADMAP.md) / [`docs/TODO.md`](docs/TODO.md)
- [`docs/IMPLEMENTED.md`](docs/IMPLEMENTED.md) / [`docs/NOT_IMPLEMENTED.md`](docs/NOT_IMPLEMENTED.md)
- [`docs/NEXT_IMPROVEMENTS.md`](docs/NEXT_IMPROVEMENTS.md)
