# KPIダッシュボード

`business/api` の `/api/kpi/summary` 等を参照して表示するだけの、依存ライブラリ無しの静的HTML。

## 使い方
```bash
# 1) APIを起動
cd business/api && npm run dev

# 2) ダッシュボードを開く（別ターミナル）
cd business/dashboard
python3 -m http.server 8080
# ブラウザで http://localhost:8080 を開き、APIのURLを http://localhost:4000 のまま「更新」を押す
```

Vercel等にデプロイする場合はこの `index.html` を静的サイトとしてそのままデプロイし、
画面上部の入力欄で本番APIのURLを指定する。
