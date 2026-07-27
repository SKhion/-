#!/usr/bin/env python3
"""企業分析の自動化スクリプト（Researchエージェント）。

Usage:
    python company_research.py --company "株式会社サンプル" --industry 美容 --url https://example.com
"""
from __future__ import annotations

import argparse
import datetime as dt
from pathlib import Path

from lib.claude_client import complete

CREATE_DIR = Path(__file__).resolve().parents[1] / "create"


def build_user_message(company: str, industry: str, url: str | None, notes: str | None) -> str:
    return (
        f"以下の企業について、Researchエージェントの出力フォーマットに従って企業分析を行ってください。\n"
        f"企業名: {company}\n"
        f"業界: {industry}\n"
        f"公式サイト: {url or '不明'}\n"
        f"追加メモ: {notes or 'なし'}\n"
        f"分析観点: 事業内容/SNS運用状況（更新頻度・フォロワー規模の推測）/想定される集客課題/"
        f"提案すべきAIサービス（①Instagram診断 ②SNS運用代行 ③EC診断 ④LP制作 ⑤AIブランド顧問 のいずれか）。"
    )


def main() -> None:
    parser = argparse.ArgumentParser(description="企業分析レポートを生成する")
    parser.add_argument("--company", required=True, help="企業名")
    parser.add_argument("--industry", required=True, help="業界（美容/飲食/建築/士業/EC/スクール/コンサル等）")
    parser.add_argument("--url", default=None, help="公式サイトURL")
    parser.add_argument("--notes", default=None, help="ヒアリング済みの補足情報")
    parser.add_argument("--out", default=None, help="出力先ディレクトリ（省略時は business/create/配下に自動生成）")
    args = parser.parse_args()

    result = complete("research", build_user_message(args.company, args.industry, args.url, args.notes))

    out_dir = Path(args.out) if args.out else CREATE_DIR / "company_research"
    out_dir.mkdir(parents=True, exist_ok=True)
    stamp = dt.datetime.now().strftime("%Y%m%d_%H%M%S")
    out_path = out_dir / f"{stamp}_{args.company}.md"
    out_path.write_text(f"# 企業分析レポート: {args.company}\n\n{result}\n", encoding="utf-8")

    print(f"生成完了: {out_path}")


if __name__ == "__main__":
    main()
