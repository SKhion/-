#!/usr/bin/env python3
"""SNS投稿カレンダー生成スクリプト（サービス②のコアロジック）。

Usage:
    python sns_post_generator.py --company "美容室サンプル" --industry 美容 --posts 12
"""
from __future__ import annotations

import argparse
import datetime as dt
from pathlib import Path

from lib.claude_client import complete

CREATE_DIR = Path(__file__).resolve().parents[1] / "create"

INDUSTRY_TEMPLATES = {
    "美容": "Before/After訴求、スタイリスト紹介、季節トレンド提案",
    "飲食": "メニュー訴求、仕込み風景、来店特典告知",
    "建築": "施工事例、Before/After、お客様の声",
    "士業": "よくある相談Q&A、制度改正情報、事務所紹介",
    "EC": "商品訴求、レビュー紹介、限定セール告知",
    "スクール": "受講生の声、講座プレビュー、開講カウントダウン",
}


def build_user_message(company: str, industry: str, posts: int) -> str:
    template_hint = INDUSTRY_TEMPLATES.get(industry, "業種に合わせた訴求軸を提案してください")
    return (
        f"{company}（業種: {industry}）の月間SNS投稿カレンダーを{posts}本分作成してください。\n"
        f"業種別の推奨訴求軸: {template_hint}\n\n"
        f"各投稿について「投稿日（第n週）/フォーマット(Feed・Reels・Story)/キャプション案/ハッシュタグ5個/狙うKPI」を"
        f"Markdownの表形式で出力してください。"
    )


def main() -> None:
    parser = argparse.ArgumentParser(description="月間SNS投稿カレンダーを生成する")
    parser.add_argument("--company", required=True)
    parser.add_argument("--industry", required=True, choices=list(INDUSTRY_TEMPLATES.keys()) + ["その他"])
    parser.add_argument("--posts", type=int, default=12)
    parser.add_argument("--out", default=None)
    args = parser.parse_args()

    result = complete("sns", build_user_message(args.company, args.industry, args.posts))

    out_dir = Path(args.out) if args.out else CREATE_DIR / "sns_calendar"
    out_dir.mkdir(parents=True, exist_ok=True)
    stamp = dt.datetime.now().strftime("%Y%m%d_%H%M%S")
    out_path = out_dir / f"{stamp}_{args.company}.md"
    out_path.write_text(f"# 月間SNS投稿カレンダー: {args.company}\n\n{result}\n", encoding="utf-8")

    print(f"生成完了: {out_path}")


if __name__ == "__main__":
    main()
