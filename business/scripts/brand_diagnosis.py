#!/usr/bin/env python3
"""ブランド診断スクリプト（Brandエージェント、`business/branding/brand_diagnosis_template.md` 準拠）。

Usage:
    python brand_diagnosis.py --company "株式会社サンプル" --industry 士業 --notes "ロゴが古い/SNSトーンが不統一"
"""
from __future__ import annotations

import argparse
import datetime as dt
from pathlib import Path

from lib.claude_client import complete

CREATE_DIR = Path(__file__).resolve().parents[1] / "create"
TEMPLATE_PATH = Path(__file__).resolve().parents[1] / "branding" / "brand_diagnosis_template.md"


def build_user_message(company: str, industry: str, notes: str) -> str:
    template = TEMPLATE_PATH.read_text(encoding="utf-8") if TEMPLATE_PATH.exists() else ""
    return (
        f"{company}（業界: {industry}）のブランド診断を行ってください。\n"
        f"入手済み情報: {notes}\n\n--- テンプレート ---\n{template}\n\n"
        f"ブランド一貫性スコア(0-100)を必ず算出し、80点未満の場合は改善提案を優先順位付きで3つ以上提示すること。"
        f"業界特有の規制（士業=業法表示、美容=薬機法、建築=建設業法の許認可表示等）があれば注意喚起すること。"
    )


def main() -> None:
    parser = argparse.ArgumentParser(description="ブランド診断レポートを生成する")
    parser.add_argument("--company", required=True)
    parser.add_argument("--industry", required=True)
    parser.add_argument("--notes", default="特になし")
    parser.add_argument("--out", default=None)
    args = parser.parse_args()

    result = complete("brand", build_user_message(args.company, args.industry, args.notes))

    out_dir = Path(args.out) if args.out else CREATE_DIR / "brand_diagnosis"
    out_dir.mkdir(parents=True, exist_ok=True)
    stamp = dt.datetime.now().strftime("%Y%m%d_%H%M%S")
    out_path = out_dir / f"{stamp}_{args.company}.md"
    out_path.write_text(f"# ブランド診断レポート: {args.company}\n\n{result}\n", encoding="utf-8")

    print(f"生成完了: {out_path}")


if __name__ == "__main__":
    main()
