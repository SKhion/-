import { Router } from "express";
import { z } from "zod";
import db from "../db";

const router = Router();

const TaskSchema = z.object({
  company_id: z.number().int().optional().nullable(),
  title: z.string().min(1),
  assignee_agent: z.string().default("project_manager"),
  due_date: z.string().optional().nullable(),
  priority: z.enum(["low", "normal", "high", "urgent"]).default("normal"),
});

router.get("/", (req, res) => {
  const { status } = req.query;
  const rows = status
    ? db.prepare("SELECT * FROM tasks WHERE status = ? ORDER BY due_date ASC").all(status)
    : db.prepare("SELECT * FROM tasks ORDER BY due_date ASC").all();
  res.json(rows);
});

router.post("/", (req, res) => {
  const parsed = TaskSchema.safeParse(req.body);
  if (!parsed.success) return res.status(400).json({ error: parsed.error.flatten() });
  const d = parsed.data;
  const info = db
    .prepare(
      "INSERT INTO tasks (company_id, title, assignee_agent, due_date, priority) VALUES (?, ?, ?, ?, ?)"
    )
    .run(d.company_id ?? null, d.title, d.assignee_agent, d.due_date ?? null, d.priority);
  res.status(201).json(db.prepare("SELECT * FROM tasks WHERE id = ?").get(info.lastInsertRowid));
});

router.patch("/:id/status", (req, res) => {
  const status = z.enum(["todo", "in_progress", "done", "blocked"]).safeParse(req.body.status);
  if (!status.success) return res.status(400).json({ error: "invalid status" });
  db.prepare("UPDATE tasks SET status = ? WHERE id = ?").run(status.data, req.params.id);
  const row = db.prepare("SELECT * FROM tasks WHERE id = ?").get(req.params.id);
  if (!row) return res.status(404).json({ error: "not found" });
  res.json(row);
});

export default router;
