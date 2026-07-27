import { Router } from "express";
import { z } from "zod";
import db from "../db";

const router = Router();

const ContractSchema = z.object({
  company_id: z.number().int(),
  service_id: z.string().min(1),
  monthly_price: z.number().int().nonnegative(),
  start_date: z.string().min(1),
  renewal_date: z.string().min(1),
  is_upsell: z.boolean().default(false),
});

router.get("/", (req, res) => {
  const { status } = req.query;
  const rows = status
    ? db.prepare("SELECT * FROM contracts WHERE status = ? ORDER BY id DESC").all(status)
    : db.prepare("SELECT * FROM contracts ORDER BY id DESC").all();
  res.json(rows);
});

router.post("/", (req, res) => {
  const parsed = ContractSchema.safeParse(req.body);
  if (!parsed.success) return res.status(400).json({ error: parsed.error.flatten() });
  const d = parsed.data;
  const info = db
    .prepare(
      "INSERT INTO contracts (company_id, service_id, monthly_price, start_date, renewal_date, is_upsell) VALUES (?, ?, ?, ?, ?, ?)"
    )
    .run(d.company_id, d.service_id, d.monthly_price, d.start_date, d.renewal_date, d.is_upsell ? 1 : 0);
  res.status(201).json(db.prepare("SELECT * FROM contracts WHERE id = ?").get(info.lastInsertRowid));
});

router.patch("/:id/status", (req, res) => {
  const status = z.enum(["active", "churned", "upgraded"]).safeParse(req.body.status);
  if (!status.success) return res.status(400).json({ error: "invalid status" });
  db.prepare("UPDATE contracts SET status = ? WHERE id = ?").run(status.data, req.params.id);
  const row = db.prepare("SELECT * FROM contracts WHERE id = ?").get(req.params.id);
  if (!row) return res.status(404).json({ error: "not found" });
  res.json(row);
});

// 更新45日以内に迫っている契約一覧（CustomerSuccessエージェントの自動リマインド対象）
router.get("/renewals/upcoming", (_req, res) => {
  const rows = db
    .prepare(
      `SELECT * FROM contracts
       WHERE status = 'active'
         AND julianday(renewal_date) - julianday('now') <= 45
       ORDER BY renewal_date ASC`
    )
    .all();
  res.json(rows);
});

export default router;
