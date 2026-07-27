import { Router } from "express";
import { z } from "zod";
import db from "../db";

const router = Router();

const ProposalSchema = z.object({
  company_id: z.number().int(),
  service_id: z.string().min(1),
  price: z.number().int().nonnegative(),
  status: z.enum(["draft", "sent", "accepted", "rejected"]).default("draft"),
});

router.get("/", (_req, res) => {
  res.json(db.prepare("SELECT * FROM proposals ORDER BY id DESC").all());
});

router.post("/", (req, res) => {
  const parsed = ProposalSchema.safeParse(req.body);
  if (!parsed.success) return res.status(400).json({ error: parsed.error.flatten() });
  const d = parsed.data;
  const info = db
    .prepare("INSERT INTO proposals (company_id, service_id, price, status) VALUES (?, ?, ?, ?)")
    .run(d.company_id, d.service_id, d.price, d.status);
  res.status(201).json(db.prepare("SELECT * FROM proposals WHERE id = ?").get(info.lastInsertRowid));
});

router.patch("/:id/status", (req, res) => {
  const status = z.enum(["draft", "sent", "accepted", "rejected"]).safeParse(req.body.status);
  if (!status.success) return res.status(400).json({ error: "invalid status" });
  db.prepare("UPDATE proposals SET status = ? WHERE id = ?").run(status.data, req.params.id);
  const row = db.prepare("SELECT * FROM proposals WHERE id = ?").get(req.params.id);
  if (!row) return res.status(404).json({ error: "not found" });
  res.json(row);
});

export default router;
