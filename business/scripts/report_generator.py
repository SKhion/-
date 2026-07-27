#!/usr/bin/env python3
"""月次改善レポート生成スクリプト（CustomerSuccess/DataAnalystエージェント）。
CRM(business/api)から取得したKPI実績値を受け取り、月次レポートを生成する。

Usage:
    python report_generator.py --company "株式会社サンプル" --service sns-management \
        --followers-growth 8.5 --engagement-rate 3.2 --inquiries 12
"""
from __future__ import annotations

import argparse
import datetime as dt
from pathlib import Path

from lib.claude_client import complete

CREATE_DIR = Path(__file__).resolve().parents[1] / "create"


def build_user_message(company: str, service: str, kpis: dict) -> str:
    kpi_lines = "\n".join(f"- {k}: {v}" for k, v in kpis.items())
    return (
        f"{company} 向け {service} の月次改善レポートを作成してください。\n"
        f"今月のKPI実績:\n{kpi_lines}\n\n"
        f"出力: KPIサマリー（先月比）、成果のハイライト、来月のアクションプラン3つ、"
        f"アップセル候補があれば1つ提案（根拠となるKPIを添えて）。"
    )


def main() -> None:
    parser = argparse.ArgumentParser(description="月次改善レポートを生成する")
    parser.add_argument("--company", required=True)
    parser.add_argument("--service", required=True)
    parser.add_argument("--followers-growth", type=float, default=None, help="フォロワー増加率(%)")
    parser.add_argument("--engagement-rate", type=float, default=None, help="エンゲージメント率(%)")
    parser.add_argument("--inquiries", type=int, default=None, help="問い合わせ件数")
    parser.add_argument("--out", default=None)
    args = parser.parse_args()

    kpis = {
        "フォロワー増加率(%)": args.followers_growth,
        "エンゲージメント率(%)": args.engagement_rate,
        "問い合わせ件数": args.inquiries,
    }
    kpis = {k: v for k, v in kpis.items() if v is not None}

    result = complete("customer_success", build_user_message(args.company, args.service, kpis))

    out_dir = Path(args.out) if args.out else CREATE_DIR / "monthly_reports"
    out_dir.mkdir(parents=True, exist_ok=True)
    stamp = dt.datetime.now().strftime("%Y%m")
    out_path = out_dir / f"{stamp}_{args.company}.md"
    out_path.write_text(f"# 月次改善レポート: {args.company}\n\n{result}\n", encoding="utf-8")

    print(f"生成完了: {out_path}")


if __name__ == "__main__":
    main()
