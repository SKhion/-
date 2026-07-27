#!/usr/bin/env python3
"""見積書自動生成スクリプト（Financeエージェント）。利益率ガードレールを自動チェックする。

Usage:
    python estimate_generator.py --company "株式会社サンプル" --service lp-production
"""
from __future__ import annotations

import argparse
import datetime as dt
from pathlib import Path

from lib.claude_client import load_pricing

CREATE_DIR = Path(__file__).resolve().parents[1] / "create"


def find_service(service_id: str) -> dict:
    pricing = load_pricing()
    for svc in pricing["services"]:
        if svc["id"] == service_id:
            return svc
    raise SystemExit(f"未知のサービスID: {service_id}")


def estimate_cost(pricing: dict) -> int:
    assumptions = pricing["cost_assumptions"]
    api_cost = assumptions["claude_api_cost_per_report_jpy"]
    human_cost = assumptions["avg_human_review_hours_per_report"] * assumptions["human_hourly_cost_jpy"]
    return int(api_cost + human_cost)


def main() -> None:
    parser = argparse.ArgumentParser(description="見積書を自動生成し、利益率ガードレールを検証する")
    parser.add_argument("--company", required=True)
    parser.add_argument("--service", required=True)
    parser.add_argument("--quantity", type=int, default=1, help="複数月/複数件の場合の数量")
    parser.add_argument("--out", default=None)
    args = parser.parse_args()

    pricing = load_pricing()
    service = find_service(args.service)
    guardrails = pricing["guardrails"]

    unit_price = service.get("price") or service.get("price_one_time") or service.get("price_monthly")
    total_price = unit_price * args.quantity
    cost = estimate_cost(pricing) * args.quantity
    margin = (total_price - cost) / total_price if total_price else 0

    warnings = []
    if unit_price < guardrails["min_one_time_price"] and service["type"] == "one_time":
        warnings.append("初回受注価格が下限(¥50,000)未満です")
    if service["type"] == "monthly" and unit_price < guardrails["min_monthly_price"]:
        warnings.append("月額価格が下限(¥100,000)未満です")
    if margin < guardrails["min_margin"]:
        warnings.append(f"利益率が下限({guardrails['min_margin']*100:.0f}%)を下回っています: {margin*100:.1f}%")

    lines = [
        f"# 御見積書: {args.company} 様",
        "",
        f"発行日: {dt.date.today().isoformat()}",
        "",
        "| 項目 | 内容 |",
        "|---|---|",
        f"| サービス | {service['name']} |",
        f"| 数量 | {args.quantity} |",
        f"| 単価（税抜） | ¥{unit_price:,} |",
        f"| 合計金額（税抜） | ¥{total_price:,} |",
        f"| 想定原価 | ¥{cost:,} |",
        f"| 想定利益率 | {margin*100:.1f}% |",
        "",
        "※本見積の有効期限は発行日より30日間です。",
    ]

    if warnings:
        lines += ["", "## ⚠️ Finance承認警告（CEOエージェントへ自動エスカレーション対象）"]
        lines += [f"- {w}" for w in warnings]

    out_dir = Path(args.out) if args.out else CREATE_DIR / "estimates"
    out_dir.mkdir(parents=True, exist_ok=True)
    stamp = dt.datetime.now().strftime("%Y%m%d_%H%M%S")
    out_path = out_dir / f"{stamp}_{args.company}_{args.service}.md"
    out_path.write_text("\n".join(lines) + "\n", encoding="utf-8")

    print(f"生成完了: {out_path}")
    if warnings:
        print("警告あり:", "; ".join(warnings))


if __name__ == "__main__":
    main()
