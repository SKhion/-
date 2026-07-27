import { Router } from "express";
import { z } from "zod";
import db from "../db";

const router = Router();

const DecisionSchema = z.object({
  agent: z.string().min(1),
  subject: z.string().min(1),
  decision: z.enum(["approved", "rejected", "escalated"]),
  reason: z.string().optional().nullable(),
});

router.get("/", (_req, res) => {
  res.json(db.prepare("SELECT * FROM decisions ORDER BY id DESC LIMIT 200").all());
});

router.post("/", (req, res) => {
  const parsed = DecisionSchema.safeParse(req.body);
  if (!parsed.success) return res.status(400).json({ error: parsed.error.flatten() });
  const d = parsed.data;
  const info = db
    .prepare("INSERT INTO decisions (agent, subject, decision, reason) VALUES (?, ?, ?, ?)")
    .run(d.agent, d.subject, d.decision, d.reason ?? null);
  res.status(201).json(db.prepare("SELECT * FROM decisions WHERE id = ?").get(info.lastInsertRowid));
});

export default router;
