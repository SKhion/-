#!/usr/bin/env python3
"""競合分析の自動化スクリプト（Researchエージェント）。

Usage:
    python competitor_analysis.py --company "自社/クライアント名" --competitors "A社,B社,C社" --industry 飲食
"""
from __future__ import annotations

import argparse
import datetime as dt
from pathlib import Path

from lib.claude_client import complete

CREATE_DIR = Path(__file__).resolve().parents[1] / "create"


def build_user_message(company: str, competitors: list[str], industry: str) -> str:
    comp_list = "\n".join(f"- {c}" for c in competitors)
    return (
        f"{company}（業界: {industry}）について、以下の競合と比較分析してください。\n{comp_list}\n\n"
        f"比較観点: 価格帯 / SNS運用状況（頻度・フォロワー規模の推測） / 訴求軸 / 強み・弱み。\n"
        f"最後に {company} が取るべき差別化ポイントを3つ提示してください。"
    )


def main() -> None:
    parser = argparse.ArgumentParser(description="競合分析レポートを生成する")
    parser.add_argument("--company", required=True)
    parser.add_argument("--competitors", required=True, help="カンマ区切りの競合企業名")
    parser.add_argument("--industry", required=True)
    parser.add_argument("--out", default=None)
    args = parser.parse_args()

    competitors = [c.strip() for c in args.competitors.split(",") if c.strip()]
    result = complete("research", build_user_message(args.company, competitors, args.industry))

    out_dir = Path(args.out) if args.out else CREATE_DIR / "competitor_analysis"
    out_dir.mkdir(parents=True, exist_ok=True)
    stamp = dt.datetime.now().strftime("%Y%m%d_%H%M%S")
    out_path = out_dir / f"{stamp}_{args.company}.md"
    out_path.write_text(f"# 競合分析レポート: {args.company}\n\n{result}\n", encoding="utf-8")

    print(f"生成完了: {out_path}")


if __name__ == "__main__":
    main()
