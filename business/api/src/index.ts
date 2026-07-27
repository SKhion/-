import "dotenv/config";
import express from "express";
import cors from "cors";

import companiesRouter from "./routes/companies";
import leadsRouter from "./routes/leads";
import proposalsRouter from "./routes/proposals";
import estimatesRouter from "./routes/estimates";
import contractsRouter from "./routes/contracts";
import tasksRouter from "./routes/tasks";
import reportsRouter from "./routes/reports";
import decisionsRouter from "./routes/decisions";
import kpiRouter from "./routes/kpi";

export function createApp() {
  const app = express();
  app.use(cors());
  app.use(express.json());

  app.get("/health", (_req, res) => res.json({ status: "ok" }));

  app.use("/api/companies", companiesRouter);
  app.use("/api/leads", leadsRouter);
  app.use("/api/proposals", proposalsRouter);
  app.use("/api/estimates", estimatesRouter);
  app.use("/api/contracts", contractsRouter);
  app.use("/api/tasks", tasksRouter);
  app.use("/api/reports", reportsRouter);
  app.use("/api/decisions", decisionsRouter);
  app.use("/api/kpi", kpiRouter);

  app.use((_req, res) => res.status(404).json({ error: "not found" }));

  return app;
}

if (require.main === module) {
  const port = Number(process.env.PORT) || 4000;
  const app = createApp();
  app.listen(port, () => {
    console.log(`AI事業会社 CRM API がポート ${port} で起動しました`);
  });
}
