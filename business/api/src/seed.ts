/**
 * デモ用シードデータ投入スクリプト。
 * Usage: npm run seed
 */
import db from "./db";

const insertCompany = db.prepare(
  "INSERT INTO companies (name, industry, url, contact_name, contact_email) VALUES (?, ?, ?, ?, ?)"
);
const insertLead = db.prepare(
  "INSERT INTO leads (company_id, source, stage, pain) VALUES (?, ?, ?, ?)"
);
const insertContract = db.prepare(
  `INSERT INTO contracts (company_id, service_id, monthly_price, start_date, renewal_date, status, is_upsell)
   VALUES (?, ?, ?, ?, ?, ?, ?)`
);

const seedData = [
  { name: "サンプル美容室", industry: "美容", pain: "SNS投稿が続かない", service: "sns-management", price: 100000 },
  { name: "サンプル建築設計", industry: "建築", pain: "事例を発信できていない", service: "sns-management", price: 100000 },
  { name: "サンプルEC(アパレル)", industry: "EC", pain: "カゴ落ちが多い", service: "ec-diagnosis", price: 120000 },
  { name: "サンプル士業事務所", industry: "士業", pain: "ブランディングが古い", service: "ai-brand-advisor", price: 300000 },
];

const run = db.transaction(() => {
  for (const s of seedData) {
    const companyInfo = insertCompany.run(s.name, s.industry, null, "ご担当者", null);
    const companyId = companyInfo.lastInsertRowid;
    insertLead.run(companyId, "inbound", "won", s.pain);
    insertContract.run(
      companyId,
      s.service,
      s.price,
      "2026-05-01",
      "2026-11-01",
      "active",
      s.service === "ai-brand-advisor" ? 1 : 0
    );
  }
});

run();
console.log(`シード投入完了: ${seedData.length}社`);
