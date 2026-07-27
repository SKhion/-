# GitHub運用ドキュメント

GitHub Actionsのワークフローファイルは、GitHubの仕様上リポジトリルートの `.github/workflows/`
に置く必要があるため、実行系のYAMLはそちらに配置している（`business/github/` に置いても動作しない）。
本ディレクトリは運用ルールのドキュメントのみを管理する。

## 現在のワークフロー
- `.github/workflows/ci.yml`
  - `business/api/**` 変更時: `npm ci && npm run build && npm test`
  - `business/scripts/**` 変更時: Python構文チェック（`py_compile`）と `pytest`

## ブランチ運用
- `main`: 本番相当
- `claude/*`: AIエージェントによる自律開発ブランチ（本ビルドもこの命名規則）
- 機能追加は必ずブランチを切り、CIが通ってからマージする

## 今後追加すべきワークフロー（未実装）
- 契約更新リマインドの定期実行（`schedule` トリガーで `GET /api/contracts/renewals/upcoming` を叩き、
  該当があればSlack/Gmail通知）
- 月次KPIレポートの自動生成・Slack配信
