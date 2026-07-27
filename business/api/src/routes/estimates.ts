import { Router } from "express";
import { z } from "zod";
import db from "../db";

const router = Router();

const EstimateSchema = z.object({
  company_id: z.number().int(),
  service_id: z.string().min(1),
  unit_price: z.number().int().nonnegative(),
  quantity: z.number().int().positive().default(1),
});

router.get("/", (_req, res) => {
  res.json(db.prepare("SELECT * FROM estimates ORDER BY id DESC").all());
});

router.post("/", (req, res) => {
  const parsed = EstimateSchema.safeParse(req.body);
  if (!parsed.success) return res.status(400).json({ error: parsed.error.flatten() });
  const d = parsed.data;
  const totalPrice = d.unit_price * d.quantity;
  // 原価は簡易的に固定値（AI API費用+人手レビュー0.5h）で概算。詳細は business/config/pricing.config.json 準拠。
  const estimatedCost = 150 + 0.5 * 4000;
  const margin = totalPrice > 0 ? (totalPrice - estimatedCost * d.quantity) / totalPrice : 0;

  const info = db
    .prepare(
      "INSERT INTO estimates (company_id, service_id, unit_price, quantity, total_price, margin) VALUES (?, ?, ?, ?, ?, ?)"
    )
    .run(d.company_id, d.service_id, d.unit_price, d.quantity, totalPrice, margin);

  const row = db.prepare("SELECT * FROM estimates WHERE id = ?").get(info.lastInsertRowid) as object;
  res.status(201).json({ ...row, margin_warning: margin < 0.5 });
});

export default router;
