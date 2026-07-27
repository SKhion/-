import { test, before, after } from "node:test";
import assert from "node:assert/strict";
import path from "node:path";
import os from "node:os";
import fs from "node:fs";
import type { Server } from "node:http";

// db.ts はモジュール読み込み時にSQLiteファイルを作成するため、
// import前に一時ディレクトリのDBパスを指定してテスト実行を本番データから分離する。
const tmpDb = path.join(fs.mkdtempSync(path.join(os.tmpdir(), "crm-test-")), "test.sqlite3");
process.env.DATABASE_PATH = tmpDb;

// eslint-disable-next-line @typescript-eslint/no-var-requires
const { createApp } = require("../index");

let server: Server;
let baseUrl: string;

before(() => {
  const app = createApp();
  server = app.listen(0);
  const address = server.address();
  const port = typeof address === "object" && address ? address.port : 0;
  baseUrl = `http://127.0.0.1:${port}`;
});

after(() => {
  server.close();
  fs.rmSync(path.dirname(tmpDb), { recursive: true, force: true });
});

test("GET /health returns ok", async () => {
  const res = await fetch(`${baseUrl}/health`);
  assert.equal(res.status, 200);
  const body = await res.json();
  assert.equal(body.status, "ok");
});

test("company -> lead -> contract -> kpi summary flow", async () => {
  const companyRes = await fetch(`${baseUrl}/api/companies`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ name: "テスト株式会社", industry: "美容" }),
  });
  assert.equal(companyRes.status, 201);
  const company = await companyRes.json();
  assert.ok(company.id);

  const leadRes = await fetch(`${baseUrl}/api/leads`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ company_id: company.id, source: "referral", stage: "won" }),
  });
  assert.equal(leadRes.status, 201);

  const contractRes = await fetch(`${baseUrl}/api/contracts`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      company_id: company.id,
      service_id: "sns-management",
      monthly_price: 100000,
      start_date: "2026-05-01",
      renewal_date: "2026-11-01",
    }),
  });
  assert.equal(contractRes.status, 201);

  const kpiRes = await fetch(`${baseUrl}/api/kpi/summary`);
  assert.equal(kpiRes.status, 200);
  const kpi = await kpiRes.json();
  assert.equal(kpi.active_contracts, 1);
  assert.equal(kpi.monthly_recurring_revenue_jpy, 100000);
  assert.equal(kpi.referral_rate, 1);
  assert.equal(kpi.ai_automation_rate, 0.9);
});

test("estimate below margin guardrail is flagged", async () => {
  const companyRes = await fetch(`${baseUrl}/api/companies`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ name: "マージンテスト株式会社", industry: "EC" }),
  });
  const company = await companyRes.json();

  const estimateRes = await fetch(`${baseUrl}/api/estimates`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      company_id: company.id,
      service_id: "instagram-diagnosis",
      unit_price: 1000,
      quantity: 1,
    }),
  });
  assert.equal(estimateRes.status, 201);
  const estimate = await estimateRes.json();
  assert.equal(estimate.margin_warning, true);
});
