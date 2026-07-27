# 00. 既存プロジェクト解析結果

## 対象
リポジトリ `skhion/-` の解析結果（2026-07-27 実施）。

## 解析前の状態
```
.
├── .claude/skills/notebooklm/   … NotebookLM連携スキル（Claude Code用、既存・流用可）
├── game/                        … Phaser製の街づくり/生活シミュレーションゲーム（本事業とは無関係）
└── reset2035/                   … React(Vite)製の「診断ゲーム」。DiagnosisScreen / FutureSNSScreen /
                                    MeterScreen など、SNS診断・未来シミュレーションのUI資産あり
```

## 重複・流用ポイント
- `reset2035/src/components/DiagnosisScreen.jsx` `MeterBar.jsx` は診断結果を
  スコア表示するUIパターンとして、将来的に `business/dashboard` や
  クライアント向け診断レポートのUIに転用可能（**今回は独立実装とし、無理な結合はしない**。
  理由：reset2035はゲーム用の独立Viteアプリであり、事業インフラと混在させると保守性が落ちる）。
- `.claude/skills/instagram-funnel-diagnosis` は本事業の主力商品「Instagram診断」の
  診断ロジック（10項目固定フロー）と完全に一致する。**重複実装を避けるため、
  `business/instagram/diagnosis_checklist.md` はこのスキルの10項目フローを正本として参照し、
  自動化スクリプト（`business/scripts/instagram_analysis.py`）はスキルと同じ評価軸を
  API経由で再現する形にした**（スキルはチャット対話用、スクリプトはバッチ/自動化パイプライン用、
  用途が異なるため両方残すが評価軸は単一ソース化）。
- 既存の事業系フォルダ（CRM/営業/LP等）は存在しなかったため、今回すべて新規構築。

## 改善点（今回の実装で反映）
1. **CRMの二重実装を避ける**: `crm/` はスキーマとポリシーのみを持ち、実行系は `api/` に一本化。
2. **プロンプトの単一ソース化**: 各エージェントの人格・判断基準は `agents/*.md` に記載するが、
   実行時に読み込む生プロンプト本体は `prompts/*.md` に置き、`agents/*.md` からはリンクのみとする。
3. **GitHub Actions は `.github/workflows/` に配置**（GitHubの仕様上ここ以外では動作しないため）。
   `business/github/` は運用ドキュメントのみを置く。
4. **料金・自動化率などの数値はハードコードせず** `business/config/*.config.json` に集約し、
   見積書・提案書生成スクリプトが単一の設定から数値を引用する。

## 現状のギャップ（今回の実装で解消するもの）
- 営業資料・LP・見積・契約書テンプレートが存在しなかった → 本ビルドで新規作成。
- 企業分析・SNS分析・提案書生成の自動化スクリプトが存在しなかった → 新規作成。
- 顧客管理（CRM）・ダッシュボードが存在しなかった → 新規作成（SQLiteベースでゼロコンフィグ動作、
  Supabase/Postgresへの移行パスを用意）。
