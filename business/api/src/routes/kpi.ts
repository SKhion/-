import { Router } from "express";
import db from "../db";
import { getServiceAutomationRate } from "../pricing";

const router = Router();

// KPIツリー: 利益 → LTV → 継続率 → アップセル率 → 紹介率 → 営業効率 → AI自動化率 → 売上
router.get("/summary", (_req, res) => {
  const activeContracts = db
    .prepare("SELECT * FROM contracts WHERE status = 'active'")
    .all() as any[];
  const churnedContracts = db
    .prepare("SELECT * FROM contracts WHERE status = 'churned'")
    .all() as any[];
  const allContracts = [...activeContracts, ...churnedContracts];

  const monthlyRecurringRevenue = activeContracts.reduce((sum, c) => sum + c.monthly_price, 0);

  const totalContracts = allContracts.length;
  const retentionRate = totalContracts > 0 ? activeContracts.length / totalContracts : null;

  const upsellCount = allContracts.filter((c) => c.is_upsell).length;
  const upsellRate = totalContracts > 0 ? upsellCount / totalContracts : null;

  const avgMonthlyPrice =
    activeContracts.length > 0 ? monthlyRecurringRevenue / activeContracts.length : 0;
  // 平均契約継続月数の実績が無い場合は保守的に12ヶ月と仮定してLTVを概算する
  const assumedRetentionMonths = 12;
  const ltvEstimate = avgMonthlyPrice * assumedRetentionMonths;

  const leads = db.prepare("SELECT * FROM leads").all() as any[];
  const referralLeads = leads.filter((l) => l.source === "referral").length;
  const referralRate = leads.length > 0 ? referralLeads / leads.length : null;

  const wonLeads = leads.filter((l) => l.stage === "won").length;
  const salesEfficiency = leads.length > 0 ? wonLeads / leads.length : null;

  const aiAutomationRate =
    activeContracts.length > 0
      ? activeContracts.reduce((sum, c) => sum + getServiceAutomationRate(c.service_id), 0) /
        activeContracts.length
      : null;

  const oneTimeRevenue = db
    .prepare("SELECT COALESCE(SUM(total_price), 0) as total FROM estimates")
    .get() as { total: number };

  const estimatedMonthlyProfit = monthlyRecurringRevenue * 0.7; // 目標利益率70%を仮置き

  res.json({
    profit_estimate_jpy: Math.round(estimatedMonthlyProfit),
    ltv_estimate_jpy: Math.round(ltvEstimate),
    retention_rate: retentionRate,
    upsell_rate: upsellRate,
    referral_rate: referralRate,
    sales_efficiency: salesEfficiency,
    ai_automation_rate: aiAutomationRate,
    monthly_recurring_revenue_jpy: monthlyRecurringRevenue,
    one_time_revenue_jpy: oneTimeRevenue.total,
    active_contracts: activeContracts.length,
    total_leads: leads.length,
    generated_at: new Date().toISOString(),
  });
});

export default router;
