import { Router } from "express";
import { z } from "zod";
import db from "../db";

const router = Router();

const CompanySchema = z.object({
  name: z.string().min(1),
  industry: z.string().min(1),
  url: z.string().url().optional().nullable(),
  contact_name: z.string().optional().nullable(),
  contact_email: z.string().email().optional().nullable(),
});

router.get("/", (_req, res) => {
  const rows = db.prepare("SELECT * FROM companies ORDER BY id DESC").all();
  res.json(rows);
});

router.get("/:id", (req, res) => {
  const row = db.prepare("SELECT * FROM companies WHERE id = ?").get(req.params.id);
  if (!row) return res.status(404).json({ error: "not found" });
  res.json(row);
});

router.post("/", (req, res) => {
  const parsed = CompanySchema.safeParse(req.body);
  if (!parsed.success) return res.status(400).json({ error: parsed.error.flatten() });
  const d = parsed.data;
  const info = db
    .prepare(
      "INSERT INTO companies (name, industry, url, contact_name, contact_email) VALUES (?, ?, ?, ?, ?)"
    )
    .run(d.name, d.industry, d.url ?? null, d.contact_name ?? null, d.contact_email ?? null);
  const row = db.prepare("SELECT * FROM companies WHERE id = ?").get(info.lastInsertRowid);
  res.status(201).json(row);
});

export default router;
