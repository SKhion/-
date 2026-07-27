#!/usr/bin/env python3
"""ロゴ/ビジュアル提案プロンプト生成スクリプト（Creativeエージェント）。
画像生成AI（例: Gemini/任意の画像生成API）にそのまま渡せるプロンプトを出力する。

Usage:
    python logo_prompt_generator.py --company "株式会社サンプル" --industry 美容 --keywords "上品,ナチュラル,信頼感"
"""
from __future__ import annotations

import argparse
import datetime as dt
from pathlib import Path

from lib.claude_client import complete

CREATE_DIR = Path(__file__).resolve().parents[1] / "create"


def build_user_message(company: str, industry: str, keywords: list[str]) -> str:
    return (
        f"{company}（業界: {industry}）のロゴ/ビジュアルアイデンティティ提案を行ってください。\n"
        f"希望キーワード: {', '.join(keywords)}\n\n"
        f"出力: コンセプト説明、カラーパレット案（HEXコード3色）、画像生成AI用の英語プロンプトを3パターン。"
    )


def main() -> None:
    parser = argparse.ArgumentParser(description="ロゴ/ビジュアル提案プロンプトを生成する")
    parser.add_argument("--company", required=True)
    parser.add_argument("--industry", required=True)
    parser.add_argument("--keywords", required=True, help="カンマ区切りのキーワード")
    parser.add_argument("--out", default=None)
    args = parser.parse_args()

    keywords = [k.strip() for k in args.keywords.split(",") if k.strip()]
    result = complete("creative", build_user_message(args.company, args.industry, keywords))

    out_dir = Path(args.out) if args.out else CREATE_DIR / "logo_prompts"
    out_dir.mkdir(parents=True, exist_ok=True)
    stamp = dt.datetime.now().strftime("%Y%m%d_%H%M%S")
    out_path = out_dir / f"{stamp}_{args.company}.md"
    out_path.write_text(f"# ロゴ/ビジュアル提案: {args.company}\n\n{result}\n", encoding="utf-8")

    print(f"生成完了: {out_path}")


if __name__ == "__main__":
    main()
