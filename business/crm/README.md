# CRM

実行系（API/ロジック）は重複実装を避けるため `business/api` に一本化している。
このディレクトリはデータベース設計の正本のみを管理する。

- `schema.sql` — Supabase/PostgreSQL移行用スキーマ（RLSポリシー付き）
- ローカル開発では `business/api` が起動時にSQLiteへ同等のテーブルを自動作成するため、
  開発開始にあたって本ディレクトリの手動セットアップは不要。
- 本番でSupabaseに移行する場合: `supabase db push` 等で `schema.sql` を適用し、
  `business/api/src/db.ts` の接続先を `pg`/`@supabase/supabase-js` に切り替える。
