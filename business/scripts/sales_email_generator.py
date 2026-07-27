#!/usr/bin/env python3
"""営業メール自動生成スクリプト（Salesエージェント）。

Usage:
    python sales_email_generator.py --company "株式会社サンプル" --contact "田中様" --stage cold --pain "SNS運用が手つかず"
"""
from __future__ import annotations

import argparse
import datetime as dt
from pathlib import Path

from lib.claude_client import complete

CREATE_DIR = Path(__file__).resolve().parents[1] / "create"

STAGE_GUIDE = {
    "cold": "初回接触。売り込み色を抑え、無料〜低価格の診断（サービス①）を軽く提案する。",
    "follow_up": "診断送付後のフォローアップ。改善提案の要点を1つだけ具体的に伝え、次の打ち合わせを促す。",
    "closing": "見積送付後のクロージング。契約条件を再確認し、意思決定を後押しする。",
    "upsell": "既存顧客へのアップセル。実績（KPI改善）を根拠に次の商材を提案する。",
    "renewal": "契約更新45日前のリマインド。継続のメリットと年間契約割引を提示する。",
}


def build_user_message(company: str, contact: str, stage: str, pain: str) -> str:
    guide = STAGE_GUIDE.get(stage, "状況に応じた適切なトーンで営業メールを作成する。")
    return (
        f"{company} {contact} 宛の営業メールを作成してください。\n"
        f"ステージ: {stage}（{guide}）\n"
        f"把握している課題/文脈: {pain}\n\n"
        f"件名と本文をMarkdownで出力。本文は300字以内、CTAを1つだけ明確にする。"
    )


def main() -> None:
    parser = argparse.ArgumentParser(description="営業メールを自動生成する")
    parser.add_argument("--company", required=True)
    parser.add_argument("--contact", required=True)
    parser.add_argument("--stage", required=True, choices=list(STAGE_GUIDE.keys()))
    parser.add_argument("--pain", required=True)
    parser.add_argument("--out", default=None)
    args = parser.parse_args()

    result = complete("sales", build_user_message(args.company, args.contact, args.stage, args.pain))

    out_dir = Path(args.out) if args.out else CREATE_DIR / "sales_emails"
    out_dir.mkdir(parents=True, exist_ok=True)
    stamp = dt.datetime.now().strftime("%Y%m%d_%H%M%S")
    out_path = out_dir / f"{stamp}_{args.company}_{args.stage}.md"
    out_path.write_text(result + "\n", encoding="utf-8")

    print(f"生成完了: {out_path}")


if __name__ == "__main__":
    main()
