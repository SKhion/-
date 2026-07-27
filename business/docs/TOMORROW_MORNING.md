# 明日の朝すぐやること（優先順位付き）

1. **ANTHROPIC_API_KEYを取得し `business/.env` に設定する**（全自動化スクリプトの本番稼働に必須）
2. **`cd business/api && npm install && npm run dev` でCRM APIを起動する**（動作確認済み）
3. **`business/lp/index.html` の連絡先・会社名を実情報に差し替えて公開する**（Vercel等、静的サイトとして即日デプロイ可能）
4. **見込み客リストを最低10社作成し、`sales/email_templates/cold.md` を使って初回接触メールを送る**
5. **note記事ドラフト（`note/article_01_draft.md`）を仕上げて公開し、LPへ導線を張る**
6. **最初の問い合わせが来たら `scripts/company_research.py` → `scripts/instagram_analysis.py` →
   `scripts/proposal_generator.py` → `scripts/estimate_generator.py` の順で実行し、24時間以内に提案を返す**
7. **成約したら `business/api` の `/api/companies` `/api/contracts` にCRM登録し、`/api/tasks` にキックオフタスクを作成する**
8. **週次で `business/dashboard` を開き、KPI（利益/LTV/継続率/アップセル率/紹介率/営業効率/AI自動化率）を確認する**
