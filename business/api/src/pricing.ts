import fs from "fs";
import path from "path";

// business/api/src(or dist) から見て business/config は2階層上。
// ts-node (src実行) でも tsc ビルド後 (dist実行) でも同じ相対階層になるよう設計している。
const CONFIG_PATH = path.resolve(__dirname, "..", "..", "config", "pricing.config.json");

export interface ServicePricing {
  id: string;
  name: string;
  type: string;
  price?: number;
  price_one_time?: number;
  price_monthly?: number;
  target_margin: number;
  ai_automation_rate: number;
}

export interface PricingConfig {
  services: ServicePricing[];
  guardrails: Record<string, number>;
}

let cache: PricingConfig | null = null;

export function loadPricing(): PricingConfig {
  if (!cache) {
    cache = JSON.parse(fs.readFileSync(CONFIG_PATH, "utf-8"));
  }
  return cache as PricingConfig;
}

export function getServiceAutomationRate(serviceId: string): number {
  const service = loadPricing().services.find((s) => s.id === serviceId);
  return service?.ai_automation_rate ?? 0.9;
}
