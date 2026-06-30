# 2035：放課後リセット

10代向け選択型シミュレーションゲーム。放課後の7日間の選択が、2035年の未来SNSを変える。

## ゲームの概要

- **ジャンル**：選択型シミュレーション / 社会課題ゲーム
- **対象**：中学生・高校生・大学生
- **プレイ時間**：約5〜8分
- **画面**：スマホファースト（390px〜対応）

### 特徴

- 7日間・毎日3択の選択でストーリーが変化
- HEAT / WASTE / MONEY / VIBE の4つのメーターが動く
- 選択の積み重ねで「2035年の未来SNS」が変わる演出
- 6種類の最終診断タイプ
- 説教なし・責めない設計

## 起動方法

```bash
# 依存パッケージのインストール
npm install

# 開発サーバー起動（ブラウザで http://localhost:5173 を開く）
npm run dev

# ビルド（本番用）
npm run build

# ビルドしたファイルをプレビュー
npm run preview
```

## ファイル構成

```
src/
├── App.jsx               # ルート・画面遷移管理
├── App.css               # グローバルCSS（カラー変数など）
├── data/
│   └── gameData.js       # ゲームデータ（シナリオ・選択肢・診断）
└── components/
    ├── TitleScreen.jsx    # タイトル画面
    ├── HowToPlayScreen.jsx # 遊び方画面
    ├── DayScreen.jsx      # Day選択画面
    ├── MeterScreen.jsx    # メーター変化画面
    ├── FutureSNSScreen.jsx # 未来SNSプレビュー画面
    ├── DiagnosisScreen.jsx # 最終診断画面
    └── MeterBar.jsx       # メーターバー（共通部品）
```

## カスタマイズ方法

ゲームデータは `src/data/gameData.js` に集約されています。

- **シナリオ・選択肢を変えたい** → `days` 配列を編集
- **メーター変化を調整したい** → 各 `choice.meters` の値を変更
- **診断タイプを変えたい** → `diagnosisTypes` 配列を編集
- **未来SNSの投稿を変えたい** → `futurePosts` オブジェクトを編集

## 技術スタック

- React 19 + Vite 6
- 純粋CSS（外部UIライブラリなし）
- 外部API不使用・全データローカル管理
