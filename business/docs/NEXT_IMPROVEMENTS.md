# 次回改善案

## 優先度: 高
1. Stripe連携（決済リンク発行・入金確認Webhook）→ Financeエージェントの自動請求フローを完成させる
2. 認証（APIキー or Supabase Auth）を `business/api` に追加し、社外公開に耐えられるようにする
3. n8nインスタンスを立て、`automation/n8n/lead_intake_to_proposal.json` を実接続する

## 優先度: 中
4. LPにフォーム送信（Webhook経由でCRM自動登録）を追加し、mailtoリンクから卒業する
5. `report_generator.py` が `business/api` の実績値を直接取得するよう接続（現状はCLI引数手動入力）
6. 月次KPIレポートのSlack自動配信ワークフロー追加

## 優先度: 低（スケール期に検討）
7. 採用ページ最適化・チャットボット導入（採点表で一旦不採用としたが、需要次第で再評価）
8. 画像生成AI（Gemini/Stable Diffusion等）の実API接続でロゴ/ビジュアル案を画像として出力
9. 多言語対応（英語圏の展示会出展企業向け）
