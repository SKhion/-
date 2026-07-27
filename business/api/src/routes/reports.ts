import { Router } from "express";
import { z } from "zod";
import db from "../db";

const router = Router();

const ReportSchema = z.object({
  company_id: z.number().int(),
  month: z.string().min(1),
  kpis: z.record(z.union([z.number(), z.string()])),
});

router.get("/", (req, res) => {
  const { company_id } = req.query;
  const rows = company_id
    ? db.prepare("SELECT * FROM reports WHERE company_id = ? ORDER BY month DESC").all(company_id)
    : db.prepare("SELECT * FROM reports ORDER BY month DESC").all();
  res.json(rows.map(deserializeKpis));
});

router.post("/", (req, res) => {
  const parsed = ReportSchema.safeParse(req.body);
  if (!parsed.success) return res.status(400).json({ error: parsed.error.flatten() });
  const d = parsed.data;
  const info = db
    .prepare("INSERT INTO reports (company_id, month, kpis_json) VALUES (?, ?, ?)")
    .run(d.company_id, d.month, JSON.stringify(d.kpis));
  const row = db.prepare("SELECT * FROM reports WHERE id = ?").get(info.lastInsertRowid);
  res.status(201).json(deserializeKpis(row));
});

function deserializeKpis(row: any) {
  return { ...row, kpis: JSON.parse(row.kpis_json) };
}

export default router;
