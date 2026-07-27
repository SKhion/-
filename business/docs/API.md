# API一覧

実装・詳細は [`business/api/README.md`](../api/README.md) を正本とする（重複を避けるためこちらは要約のみ）。

| メソッド | パス | 用途 |
|---|---|---|
| GET | /health | ヘルスチェック |
| GET/POST | /api/companies | 企業CRUD |
| GET/POST/PATCH | /api/leads | リード管理・ステージ更新 |
| GET/POST/PATCH | /api/proposals | 提案書ステータス管理 |
| GET/POST | /api/estimates | 見積作成（利益率ガードレール自動判定） |
| GET/POST/PATCH | /api/contracts | 契約管理 |
| GET | /api/contracts/renewals/upcoming | 更新45日前の契約一覧 |
| GET/POST/PATCH | /api/tasks | タスク管理 |
| GET/POST | /api/reports | 月次レポート(KPI) |
| GET/POST | /api/decisions | CEOエージェント意思決定ログ |
| GET | /api/kpi/summary | KPIツリー集計 |

外部連携（未実装・接続待ち）: Stripe（決済/請求）、Gmail/LINE（通知）、n8n（`business/automation/n8n/`）。
