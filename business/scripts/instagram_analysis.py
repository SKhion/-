#!/usr/bin/env python3
"""Instagram/SNS診断の自動化スクリプト（サービス①のコアロジック）。

評価軸は `.claude/skills/instagram-funnel-diagnosis` の10項目固定フローと単一ソース
（`business/instagram/diagnosis_checklist.md`）に揃えている。

Usage:
    python instagram_analysis.py --account @example_shop --industry EC --notes "投稿頻度は週1"
"""
from __future__ import annotations

import argparse
import datetime as dt
from pathlib import Path

from lib.claude_client import complete

CREATE_DIR = Path(__file__).resolve().parents[1] / "create"
CHECKLIST_PATH = Path(__file__).resolve().parents[1] / "instagram" / "diagnosis_checklist.md"


def build_user_message(account: str, industry: str, notes: str | None) -> str:
    checklist = CHECKLIST_PATH.read_text(encoding="utf-8") if CHECKLIST_PATH.exists() else ""
    return (
        f"以下のInstagramアカウントを、下記の10項目診断チェックリストに従って診断してください。\n\n"
        f"アカウント: {account}\n業種: {industry}\n共有情報: {notes or 'スクリーンショット等は別途共有予定'}\n\n"
        f"--- 診断チェックリスト ---\n{checklist}\n\n"
        f"出力: 10項目それぞれの評価（A/B/C）、改善優先度TOP3、初月の改善案、"
        f"SNS運用代行（サービス②・月額¥100,000〜）へのアップセル提案文（DM送付用、120字以内）。"
    )


def main() -> None:
    parser = argparse.ArgumentParser(description="Instagram診断レポートを生成する（サービス①）")
    parser.add_argument("--account", required=True, help="Instagramアカウント名（@付き）")
    parser.add_argument("--industry", required=True, help="業種")
    parser.add_argument("--notes", default=None, help="事前ヒアリング情報")
    parser.add_argument("--out", default=None)
    args = parser.parse_args()

    result = complete("sns", build_user_message(args.account, args.industry, args.notes))

    out_dir = Path(args.out) if args.out else CREATE_DIR / "instagram_diagnosis"
    out_dir.mkdir(parents=True, exist_ok=True)
    stamp = dt.datetime.now().strftime("%Y%m%d_%H%M%S")
    safe_account = args.account.lstrip("@").replace("/", "_")
    out_path = out_dir / f"{stamp}_{safe_account}.md"
    out_path.write_text(f"# Instagram診断レポート: {args.account}\n\n{result}\n", encoding="utf-8")

    print(f"生成完了: {out_path}")


if __name__ == "__main__":
    main()
