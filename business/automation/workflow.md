# 全体自動化ワークフロー

```
問い合わせ
  ↓ (n8n: Webhook / Gmail trigger)
企業取得（company_research.py）
  ↓
企業分析（Researchエージェント）
  ↓
ブランド分析（brand_diagnosis.py）
  ↓
SNS分析（instagram_analysis.py）
  ↓
競合分析（competitor_analysis.py）
  ↓
課題抽出（上記出力をSalesエージェントが統合）
  ↓
改善提案（proposal_generator.py）
  ↓
営業資料（business/sales/ テンプレート適用）
  ↓
見積（estimate_generator.py、利益率ガードレール自動チェック）
  ↓
契約（business/contracts/ テンプレート→ 電子署名は外部サービス想定）
  ↓
CRM登録（business/api の /api/companies /api/contracts）
  ↓
タスク生成（/api/tasks、Project Managerエージェントが管理）
  ↓
納品（サービス別、24時間以内）
  ↓
レポート（report_generator.py、月次）
  ↓
契約更新（/api/contracts/renewals/upcoming を45日前検知→renewal.mdテンプレート送付）
  ↓
アップセル（upsell.mdテンプレート、KPI改善実績をもとに提案）
```

## 自動化の実装状況
| ステップ | 自動化状況 | 実装 |
|---|---|---|
| 企業分析/競合分析/ブランド分析/SNS分析 | ✅ 自動化済み | `business/scripts/*.py` |
| 提案書/見積/請求書/営業メール生成 | ✅ 自動化済み | `business/scripts/*.py` |
| CRM登録・タスク管理・KPI集計 | ✅ 自動化済み | `business/api` |
| 契約更新リマインド検知 | ✅ 自動化済み | `GET /api/contracts/renewals/upcoming` |
| 問い合わせ受付〜各スクリプト起動の連携（Webhook/n8n/Gmail等） | 🚧 未実装（`n8n/` にワークフロー雛形あり、実運用にはn8nインスタンスと各API鍵の接続が必要） |
| 電子契約・入金（Stripe） | 🚧 未実装（Stripe Webhookの接続が必要） |
