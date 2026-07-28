# 実務運用ガイド（これをどう動かせば実際に機能するか）

`business/docs/SETUP.md` は「起動方法」、`business/docs/TOMORROW_MORNING.md` は「明日やること」。
このドキュメントは**日々の実務として何をどの順番で実行すれば案件が回るか**を、コマンドレベルでまとめた運用マニュアル。

---

## 0. まず理解すべきこと：自動化されているのは「作業」であって「意思決定」ではない

このシステムがやってくれること:
- 企業分析・SNS診断・競合分析・提案書・見積・請求書・営業メールの**文章生成**（`business/scripts/*.py`）
- 案件データの**記録・集計**（`business/api` のCRM）
- KPIの**可視化**（`business/dashboard`）

このシステムが**やってくれないこと**（人間＝Shionが毎回やる必要があること）:
- 見込み客を見つけて連絡先を入手する（リスト作成、DM送信、展示会での名刺交換など）
- 生成された提案書・メール文面を**読んで、事実確認し、送信ボタンを押す**
- 契約書へのサインを得る、入金を確認する
- クライアントとの電話・打ち合わせ

→ 「AIが自動で営業してくる」わけではない。**Shionが営業のトリガーを引き、その後の作業をAIが肩代わりする**という構造。これを理解しないまま放置すると「システムは完成しているのに誰も使わず案件がゼロ」という状態になる。

---

## 1. 事前準備（初回のみ、所要30分〜1時間）

以下が無いと「モックモード」（ダミー文章）でしか動かない。実際にAI生成を使うには最低限①が必要。

| # | 準備すること | 入手先 | 必須度 |
|---|---|---|---|
| ① | Anthropic APIキー発行 | https://console.anthropic.com/ → API Keys | 必須（無いと診断・提案が全部ダミー文になる） |
| ② | 会社としての連絡先（メール・電話・特商法表記） | 自分で用意 | 必須（LPに載せる） |
| ③ | LPのデプロイ先（Vercel等） | https://vercel.com/ 無料枠でOK | 推奨（ローカルのみだと外部から見られない） |
| ④ | Stripeアカウント | https://dashboard.stripe.com/register | 任意（無くても銀行振込で運用可） |
| ⑤ | CRM APIの常時稼働先（Render/Railway/VPS等） | 任意のPaaS | 推奨（ローカルPCだけだと外出先から使えない） |

```bash
# ①を設定
cp business/.env.example business/.env
# business/.env を開いて ANTHROPIC_API_KEY=sk-ant-xxxx を記入
```

---

## 2. 毎日の起動（開発機/運用機で1回）

```bash
# ターミナル1: CRM API
cd business/api
npm install        # 初回のみ
npm run dev         # http://localhost:4000 で起動したままにする

# ターミナル2: KPIダッシュボード（見るときだけでよい）
cd business/dashboard
python3 -m http.server 8080   # http://localhost:8080

# ターミナル3: 自動化スクリプト用（案件対応のたびにここで実行）
cd business/scripts
pip install -r requirements.txt   # 初回のみ
```

常時稼働環境（Render等）にデプロイした場合は、ターミナル1・2は不要で、
スクリプトから叩くAPIのURLだけ `business/.env` の `CRM_API_BASE` を本番URLに変更する。

---

## 3. 「1案件」を実際にどう回すか（コピペで進められる手順）

以下は**架空の見込み客「サンプル美容室」**を例にした、問い合わせ〜納品までの実コマンド。
実際は会社名・業種・課題をその都度差し替える。

### Step 1: 見込み客を見つける（人間の仕事）
SNSで美容室を検索する、地域の展示会に行く、知人紹介を受ける等。
最低限「会社名・業種・連絡先（メールor DM）」が分かればStep 2に進める。

### Step 2: 企業分析（AI・24時間以内に不要、数分で完了）
```bash
cd business/scripts
python3 company_research.py --company "サンプル美容室" --industry 美容 \
  --url "https://example-salon.com" --notes "Instagramは週1投稿程度"
```
→ `business/create/company_research/` にレポートが生成される。中身を読み、事実誤認が無いか確認する。

### Step 3: CRMに登録する（案件を「見える化」する）
```bash
curl -X POST http://localhost:4000/api/companies \
  -H "Content-Type: application/json" \
  -d '{"name":"サンプル美容室","industry":"美容","contact_email":"owner@example-salon.com"}'
# レスポンスの "id" をメモ（以降 company_id として使う。例: 1）

curl -X POST http://localhost:4000/api/leads \
  -H "Content-Type: application/json" \
  -d '{"company_id":1,"source":"outbound","stage":"contacted","pain":"投稿が続かない"}'
```

### Step 4: 初回接触メールを作る（AI生成→人間が読んで送信）
```bash
python3 sales_email_generator.py --company "サンプル美容室" --contact "田中様" \
  --stage cold --pain "投稿が続かない"
```
→ `business/create/sales_emails/` の文面を**必ず自分で読んで**、事実確認・トーン調整してから送信する。
テンプレートの構造そのものは `business/sales/email_templates/cold.md` を参照。

### Step 5: Instagram診断を実施（サービス①、¥50,000〜、24時間以内納品が売り）
```bash
python3 instagram_analysis.py --account @sample_salon --industry 美容 \
  --notes "フォロワー800人、投稿頻度週1"
```
→ 10項目診断レポートが `business/create/instagram_diagnosis/` に生成される。
**ここが一番重要**：AIの出力をそのまま送らず、実際のアカウントを見て事実と食い違いが無いか必ず目視確認する
（`business/instagram/diagnosis_checklist.md` の「見えている事実→解釈」の原則）。

### Step 6: 見積を出す（利益率ガードレール付き）
```bash
python3 estimate_generator.py --company "サンプル美容室" --service instagram-diagnosis
```
→ 利益率50%未満だと自動で警告が出る。警告が出た場合は値引きをやめるか、CEOエージェント役
（＝自分自身の最終判断）として本当にその条件で受けるか判断する。

### Step 7: 提案書を作る
```bash
python3 proposal_generator.py --company "サンプル美容室" --service sns-management \
  --pain "投稿が続かない、フォロワーが増えない"
```
→ `business/create/proposals/` に生成。診断結果と整合しているか確認してから送付。

### Step 8: 成約したら契約登録
```bash
curl -X POST http://localhost:4000/api/contracts \
  -H "Content-Type: application/json" \
  -d '{"company_id":1,"service_id":"sns-management","monthly_price":100000,
       "start_date":"2026-08-01","renewal_date":"2027-02-01"}'

curl -X PATCH http://localhost:4000/api/leads/1/stage \
  -H "Content-Type: application/json" -d '{"stage":"won"}'
```

### Step 9: キックオフタスクを作る
```bash
curl -X POST http://localhost:4000/api/tasks \
  -H "Content-Type: application/json" \
  -d '{"company_id":1,"title":"初月投稿カレンダー作成","assignee_agent":"sns","due_date":"2026-08-02","priority":"high"}'
```

### Step 10: 実際の納品物を作る（月次運用の場合）
```bash
python3 sns_post_generator.py --company "サンプル美容室" --industry 美容 --posts 12
```
→ 生成されたカレンダーを人間がレビューし、実際の投稿担当（クライアント側 or 自分）に渡す。

### Step 11: 請求
```bash
python3 invoice_generator.py --company "サンプル美容室" --service sns-management --month 2026-08
```
→ `business/create/invoices/` の請求書を送付。入金確認は銀行/Stripeで手動確認（自動連携は未実装）。

### Step 12: 月次レポート（継続の証拠を作る＝解約防止・アップセルの根拠）
```bash
python3 report_generator.py --company "サンプル美容室" --service sns-management \
  --followers-growth 8.5 --engagement-rate 3.2 --inquiries 5
```

### Step 13: タスク完了・ステータス更新
```bash
curl -X PATCH http://localhost:4000/api/tasks/1/status \
  -H "Content-Type: application/json" -d '{"status":"done"}'
```

---

## 4. 週次ルーティン

```bash
# 1) 更新が近い契約を確認（45日前検知）
curl http://localhost:4000/api/contracts/renewals/upcoming

# 2) 該当があれば renewal.md テンプレートでメールを作成・送付
cat business/sales/email_templates/renewal.md

# 3) KPIダッシュボードを見る
open http://localhost:8080   # または docker/常時稼働先のURL
```
KPIが目標（利益率70%・継続率90%・AI自動化率90%等）から±10%以上乖離していたら、
`business/config/pricing.config.json` の前提を見直すか、営業のやり方を変える判断をする。

---

## 5. アップセル判断のタイミング

`business/agents/Sales.md` の判断基準どおり、**3ヶ月継続かつKPIが改善している顧客**にのみ
`business/sales/email_templates/upsell.md` を使ってアップセルを打診する。判断材料は
`report_generator.py` で蓄積した月次レポートの数値。

---

## 6. LP・note記事の公開（集客の入口）

```bash
# LPの会社名・連絡先・特商法表記を実情報に書き換えてから
cd business/lp
npx vercel --prod   # または Netlify Drop に index.html をドラッグ&ドロップでも可
```
note記事は `business/note/article_01_draft.md` を仕上げてnote.comにそのまま貼り付けて公開し、
本文末尾にLPのURLを設置する。

---

## 7. よくある詰まりどころ

| 症状 | 原因 | 対処 |
|---|---|---|
| スクリプトの出力が `[MOCK MODE...]` になる | `ANTHROPIC_API_KEY` 未設定 | `business/.env` に設定し、`export $(cat business/.env \| xargs)` 等で環境変数として読み込む |
| CRM APIに `curl` してもつながらない | `npm run dev` していない/ポート違い | `business/api` で `npm run dev` を実行し直す |
| ダッシュボードが「データがありません」表示のまま | CRMにまだ何も登録していない | Step 3以降でCRM登録を行う。デモを見たいだけなら `npm run seed` |
| 見積が毎回margin_warning: trueになる | サービス価格が `pricing.config.json` の下限を割っている | 値引きをやめるか、`pricing.config.json` の前提原価を見直す |
| LPを開いても誰にも見られない | ローカルのみでデプロイしていない | Vercel/Netlify等に公開する（本ガイド6章） |

---

## 8. 誰が何をするか（体制の整理）

| 役割 | 実体 | やること |
|---|---|---|
| CEO/Finance/PM判断 | Shion本人 | 見積の最終承認、値引き判断、契約サイン |
| 文章生成（診断・提案・メール・レポート） | `business/scripts/*.py`（Claude API） | 下書き作成のみ、送信前レビューは人間 |
| 記録・進捗管理 | `business/api`（CRM） | 案件・契約・タスクの一元管理 |
| 営業の一次接触・関係構築 | Shion本人 | AIは代行しない領域 |

このガイド通りに手を動かせば、「診断1件あたり実作業10〜15分（AI生成の確認・送信のみ）」で
サービス①を回せる設計になっている。ボトルネックは常に「見込み客を見つけること」（Step 1）であり、
そこだけは仕組み化されていないため、note・紹介・展示会等の集客導線を並行して育てる必要がある。
