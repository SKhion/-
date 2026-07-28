# skhion/-

このリポジトリには3つの独立したプロジェクトがある。

| プロジェクト | 内容 | 詳細 |
|---|---|---|
| [`business/`](business/) | **AI事業会社**。営業・診断・提案・見積・契約・納品・アップセルまでをAIエージェント群と自動化スクリプトで運営するための事業インフラ一式 | [`business/README.md`](business/README.md) |
| [`reset2035/`](reset2035/) | 10代向け選択型シミュレーションゲーム「2035：放課後リセット」（React/Vite） | [`reset2035/README.md`](reset2035/README.md) |
| [`game/`](game/) | Phaser製の街づくり/生活シミュレーションゲーム | — |

---

## business/ — AI事業会社（メイン）

「SNS運用が弱い中小企業・個人事業主」向けに、Instagram/SNS診断を入口に、SNS運用代行・EC改善・
LP制作・AIブランド顧問へとアップセルする事業を、AI自動化率90%以上で運営するための一式。

**今すぐやることは [`business/docs/TOMORROW_MORNING.md`](business/docs/TOMORROW_MORNING.md) を参照。**
**実際に案件を回す実務手順は [`business/docs/OPERATIONS_GUIDE.md`](business/docs/OPERATIONS_GUIDE.md) を参照。**

### クイックスタート
```bash
# 1. 環境変数
cp business/.env.example business/.env   # ANTHROPIC_API_KEY等（未設定でもモックモードで動作確認可）

# 2. CRM API起動
cd business/api
npm install
npm run dev          # http://localhost:4000
npm run seed          # 任意: デモデータ投入
npm test              # APIテスト（node:test, 3件）

# 3. KPIダッシュボード
cd ../dashboard
python3 -m http.server 8080   # http://localhost:8080

# 4. 自動化スクリプト（例: Instagram診断、24時間納品フローの中核）
cd ../scripts
pip install -r requirements.txt
python3 instagram_analysis.py --account @example_shop --industry EC

# 5. LP
open business/lp/index.html   # または任意の静的ホスティングにデプロイ
```

### ディレクトリ構成・構成図・API一覧
詳細は以下を参照:
- [`business/docs/ARCHITECTURE.md`](business/docs/ARCHITECTURE.md) — ディレクトリ構成・システム構成図（Mermaid）
- [`business/docs/API.md`](business/docs/API.md) — API一覧
- [`business/docs/SETUP.md`](business/docs/SETUP.md) — セットアップ詳細

### サービス・料金
| サービス | 価格 | 納期 | AI自動化率 |
|---|---|---|---|
| ① Instagram/SNS診断 | ¥50,000〜 | 24時間以内 | 95% |
| ② SNS運用丸ごと代行 | ¥100,000〜/月 | 初回投稿24時間以内 | 90% |
| ③ EC診断＋CVR改善 | ¥80,000〜 / 月額¥120,000〜 | 24時間以内 | 90% |
| ④ LP制作 | ¥150,000〜 | 初稿24時間以内 | 90% |
| ⑤ AIブランド顧問サブスク | ¥300,000〜/月 | 月次 | 85% |

選定理由（20案採点・TOP5選定）は [`business/docs/01_SERVICE_SCORING.md`](business/docs/01_SERVICE_SCORING.md)。

### AIエージェント組織
CEO / Sales / Marketing / Research / Creative / Coding / Brand / Finance / SNS /
CustomerSuccess / ProjectManager / DataAnalyst の12エージェントを定義済み。
役割・判断基準は [`business/agents/`](business/agents/)、実行時プロンプトは [`business/prompts/`](business/prompts/)。

### CI
`.github/workflows/ci.yml` が `business/api`（build+test）と `business/scripts`（構文チェック+pytest）を検証する。

### 進捗・今後
- [実装済一覧](business/docs/IMPLEMENTED.md) / [未実装一覧](business/docs/NOT_IMPLEMENTED.md)
- [Roadmap](business/docs/ROADMAP.md) / [TODO](business/docs/TODO.md) / [次回改善案](business/docs/NEXT_IMPROVEMENTS.md)
- [セルフレビュー採点](business/docs/SELF_REVIEW.md)

---

## reset2035/ — 放課後リセット（ゲーム）
10代向け選択型シミュレーションゲーム。詳細は [`reset2035/README.md`](reset2035/README.md)。
```bash
cd reset2035 && npm install && npm run dev
```

## game/ — 街づくりシミュレーション
Phaser製。`game/index.html` を静的サーバーで開くことで動作確認できる。
