-- CRM スキーマ（Supabase / PostgreSQL 用）
-- ローカル開発では business/api が SQLite (better-sqlite3) で同等のテーブルを自動作成するため、
-- このファイルは「本番でSupabaseへ移行する際の正本スキーマ」として管理する。
-- 実行系ロジックは business/api に一本化し、ここではスキーマとRLSポリシーのみを定義する。

create table if not exists companies (
  id bigint generated always as identity primary key,
  name text not null,
  industry text not null,
  url text,
  contact_name text,
  contact_email text,
  created_at timestamptz not null default now()
);

create table if not exists leads (
  id bigint generated always as identity primary key,
  company_id bigint not null references companies(id) on delete cascade,
  source text not null default 'other' check (source in ('inbound','outbound','referral','exhibition','other')),
  stage text not null default 'cold' check (stage in ('cold','contacted','proposed','won','lost','dormant')),
  pain text,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists proposals (
  id bigint generated always as identity primary key,
  company_id bigint not null references companies(id) on delete cascade,
  service_id text not null,
  price integer not null,
  status text not null default 'draft' check (status in ('draft','sent','accepted','rejected')),
  created_at timestamptz not null default now()
);

create table if not exists estimates (
  id bigint generated always as identity primary key,
  company_id bigint not null references companies(id) on delete cascade,
  service_id text not null,
  unit_price integer not null,
  quantity integer not null default 1,
  total_price integer not null,
  margin numeric not null,
  created_at timestamptz not null default now()
);

create table if not exists contracts (
  id bigint generated always as identity primary key,
  company_id bigint not null references companies(id) on delete cascade,
  service_id text not null,
  monthly_price integer not null,
  start_date date not null,
  renewal_date date not null,
  status text not null default 'active' check (status in ('active','churned','upgraded')),
  is_upsell boolean not null default false,
  created_at timestamptz not null default now()
);

create table if not exists tasks (
  id bigint generated always as identity primary key,
  company_id bigint references companies(id) on delete cascade,
  title text not null,
  assignee_agent text not null default 'project_manager',
  due_date date,
  status text not null default 'todo' check (status in ('todo','in_progress','done','blocked')),
  priority text not null default 'normal' check (priority in ('low','normal','high','urgent')),
  created_at timestamptz not null default now()
);

create table if not exists reports (
  id bigint generated always as identity primary key,
  company_id bigint not null references companies(id) on delete cascade,
  month text not null,
  kpis_json jsonb not null,
  created_at timestamptz not null default now()
);

create table if not exists decisions (
  id bigint generated always as identity primary key,
  agent text not null,
  subject text not null,
  decision text not null check (decision in ('approved','rejected','escalated')),
  reason text,
  created_at timestamptz not null default now()
);

-- Row Level Security: 社内スタッフ（authenticated）のみ読み書き可能にする最小ポリシー例。
-- 実際の運用ではロール（sales/finance/pm等）ごとにポリシーを分割すること。
alter table companies enable row level security;
alter table leads enable row level security;
alter table proposals enable row level security;
alter table estimates enable row level security;
alter table contracts enable row level security;
alter table tasks enable row level security;
alter table reports enable row level security;
alter table decisions enable row level security;

create policy "staff_full_access_companies" on companies for all using (auth.role() = 'authenticated');
create policy "staff_full_access_leads" on leads for all using (auth.role() = 'authenticated');
create policy "staff_full_access_proposals" on proposals for all using (auth.role() = 'authenticated');
create policy "staff_full_access_estimates" on estimates for all using (auth.role() = 'authenticated');
create policy "staff_full_access_contracts" on contracts for all using (auth.role() = 'authenticated');
create policy "staff_full_access_tasks" on tasks for all using (auth.role() = 'authenticated');
create policy "staff_full_access_reports" on reports for all using (auth.role() = 'authenticated');
create policy "staff_full_access_decisions" on decisions for all using (auth.role() = 'authenticated');
