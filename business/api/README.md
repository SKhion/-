# business/api — CRM / 営業自動化 API

Node.js (Express + TypeScript) + SQLite (better-sqlite3) によるゼロコンフィグ起動のCRM API。
`ANTHROPIC_API_KEY` や `Stripe` の鍵が無くても `npm install && npm run dev` だけでローカル起動できる。

## セットアップ
```bash
cd business/api
npm install
cp ../.env.example ../.env   # 任意。無くてもSQLiteはローカルファイルで動作する
npm run dev                  # http://localhost:4000
npm run seed                 # デモ用データを投入（任意）
```

## 本番ビルド
```bash
npm run build && npm start
# または
docker build -t ai-business-crm-api .
docker run -p 4000:4000 ai-business-crm-api
```

## エンドポイント一覧
| メソッド | パス | 用途 |
|---|---|---|
| GET | /health | ヘルスチェック |
| GET/POST | /api/companies | 企業CRUD |
| GET/POST | /api/leads | リード管理、`?stage=` でフィルタ |
| PATCH | /api/leads/:id/stage | リードステージ更新 |
| GET/POST | /api/proposals | 提案書ステータス管理 |
| PATCH | /api/proposals/:id/status | 提案ステータス更新 |
| GET/POST | /api/estimates | 見積作成（利益率50%未満で `margin_warning: true`） |
| GET/POST | /api/contracts | 契約管理 |
| PATCH | /api/contracts/:id/status | 契約ステータス更新（active/churned/upgraded） |
| GET | /api/contracts/renewals/upcoming | 更新45日前の契約一覧（CustomerSuccess自動リマインド対象） |
| GET/POST | /api/tasks | タスク管理 |
| PATCH | /api/tasks/:id/status | タスクステータス更新 |
| GET/POST | /api/reports | 月次レポート（KPI JSON） |
| GET/POST | /api/decisions | CEOエージェントの意思決定ログ |
| GET | /api/kpi/summary | KPIツリー集計（利益/LTV/継続率/アップセル率/紹介率/営業効率/AI自動化率） |

## Supabase/Postgresへの移行
`business/crm/schema.sql` に同等のPostgresスキーマを用意している。移行時は
`db.ts` の better-sqlite3 実装を `pg` または `@supabase/supabase-js` に差し替えるのみで、
ルーティング層（`src/routes/*.ts`）はSQL文をほぼそのまま流用できるよう設計している。
