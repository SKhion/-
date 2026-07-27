import { Router } from "express";
import { z } from "zod";
import db from "../db";

const router = Router();

const STAGES = ["cold", "contacted", "proposed", "won", "lost", "dormant"] as const;
const SOURCES = ["inbound", "outbound", "referral", "exhibition", "other"] as const;

const LeadSchema = z.object({
  company_id: z.number().int(),
  source: z.enum(SOURCES).default("other"),
  stage: z.enum(STAGES).default("cold"),
  pain: z.string().optional().nullable(),
});

router.get("/", (req, res) => {
  const { stage } = req.query;
  const rows = stage
    ? db.prepare("SELECT * FROM leads WHERE stage = ? ORDER BY id DESC").all(stage)
    : db.prepare("SELECT * FROM leads ORDER BY id DESC").all();
  res.json(rows);
});

router.post("/", (req, res) => {
  const parsed = LeadSchema.safeParse(req.body);
  if (!parsed.success) return res.status(400).json({ error: parsed.error.flatten() });
  const d = parsed.data;
  const info = db
    .prepare("INSERT INTO leads (company_id, source, stage, pain) VALUES (?, ?, ?, ?)")
    .run(d.company_id, d.source, d.stage, d.pain ?? null);
  const row = db.prepare("SELECT * FROM leads WHERE id = ?").get(info.lastInsertRowid);
  res.status(201).json(row);
});

router.patch("/:id/stage", (req, res) => {
  const stage = z.enum(STAGES).safeParse(req.body.stage);
  if (!stage.success) return res.status(400).json({ error: "invalid stage" });
  db.prepare("UPDATE leads SET stage = ?, updated_at = datetime('now') WHERE id = ?").run(
    stage.data,
    req.params.id
  );
  const row = db.prepare("SELECT * FROM leads WHERE id = ?").get(req.params.id);
  if (!row) return res.status(404).json({ error: "not found" });
  res.json(row);
});

export default router;
