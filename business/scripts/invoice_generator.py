#!/usr/bin/env python3
"""請求書自動生成スクリプト（Financeエージェント）。Stripe連携は business/api 側で行い、
本スクリプトは請求書ドキュメント（Markdown/CSV相当）の生成のみを担当する。

Usage:
    python invoice_generator.py --company "株式会社サンプル" --service sns-management --month 2026-08
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


def main() -> None:
    parser = argparse.ArgumentParser(description="請求書を自動生成する")
    parser.add_argument("--company", required=True)
    parser.add_argument("--service", required=True)
    parser.add_argument("--month", required=True, help="請求対象月 (YYYY-MM)")
    parser.add_argument("--invoice-no", default=None)
    parser.add_argument("--out", default=None)
    args = parser.parse_args()

    service = find_service(args.service)
    unit_price = service.get("price") or service.get("price_one_time") or service.get("price_monthly")
    tax = round(unit_price * 0.10)
    total = unit_price + tax
    invoice_no = args.invoice_no or dt.datetime.now().strftime("INV-%Y%m%d%H%M%S")

    lines = [
        f"# ご請求書 {invoice_no}",
        "",
        f"宛先: {args.company} 様",
        f"請求対象月: {args.month}",
        f"発行日: {dt.date.today().isoformat()}",
        "",
        "| 品目 | 金額（税抜） | 消費税(10%) | 合計 |",
        "|---|---|---|---|",
        f"| {service['name']} | ¥{unit_price:,} | ¥{tax:,} | ¥{total:,} |",
        "",
        "お振込期限: 発行日より30日以内。Stripe決済リンクは別途CRM(business/api)から発行されます。",
    ]

    out_dir = Path(args.out) if args.out else CREATE_DIR / "invoices"
    out_dir.mkdir(parents=True, exist_ok=True)
    out_path = out_dir / f"{invoice_no}_{args.company}.md"
    out_path.write_text("\n".join(lines) + "\n", encoding="utf-8")

    print(f"生成完了: {out_path}")


if __name__ == "__main__":
    main()
