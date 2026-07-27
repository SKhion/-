# セットアップ手順

## 前提
- Node.js 20+ / Python 3.11+
- ANTHROPIC_API_KEY（無くてもモックモードで全体動作確認は可能）

## 1. 環境変数
```bash
cp business/.env.example business/.env
# ANTHROPIC_API_KEY 等を設定（省略可）
```

## 2. CRM API 起動
```bash
cd business/api
npm install
npm run dev        # http://localhost:4000
npm run seed        # 任意: デモデータ投入
```

## 3. ダッシュボード起動
```bash
cd business/dashboard
python3 -m http.server 8080   # http://localhost:8080
```

## 4. 自動化スクリプト実行（例: Instagram診断）
```bash
cd business/scripts
pip install -r requirements.txt
export ANTHROPIC_API_KEY=sk-ant-xxxx   # 未設定ならモックモードで動作確認可能
python3 instagram_analysis.py --account @example_shop --industry EC
```

## 5. LPの確認
`business/lp/index.html` をブラウザで直接開くか、Vercel等に静的サイトとしてデプロイする。

## 6. テスト実行
```bash
# API
cd business/api && npm test

# 自動化スクリプト
cd business && pip install -r tests/requirements.txt && python3 -m pytest tests/ -v
```

## 7. Docker（API本番相当起動）
```bash
cd business/api
docker build -t ai-business-crm-api .
docker run -p 4000:4000 ai-business-crm-api
```
