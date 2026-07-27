#!/usr/bin/env python3
"""提案書自動生成スクリプト（Salesエージェント、`business/proposal/template.md` を土台にする）。

Usage:
    python proposal_generator.py --company "株式会社サンプル" --service sns-management --pain "投稿が続かない"
"""
from __future__ import annotations

import argparse
import datetime as dt
import json
from pathlib import Path

from lib.claude_client import complete, load_pricing

CREATE_DIR = Path(__file__).resolve().parents[1] / "create"
TEMPLATE_PATH = Path(__file__).resolve().parents[1] / "proposal" / "template.md"


def find_service(service_id: str) -> dict:
    pricing = load_pricing()
    for svc in pricing["services"]:
        if svc["id"] == service_id:
            return svc
    raise SystemExit(f"未知のサービスID: {service_id}. business/config/pricing.config.json を確認してください。")


def build_user_message(company: str, service: dict, pain: str) -> str:
    template = TEMPLATE_PATH.read_text(encoding="utf-8") if TEMPLATE_PATH.exists() else ""
    return (
        f"以下のテンプレート構成に沿って、{company} 向けの提案書本文を作成してください。\n"
        f"提案サービス: {service['name']}（価格情報: {json.dumps(service, ensure_ascii=False)}）\n"
        f"顧客の課題: {pain}\n\n"
        f"--- テンプレート構成 ---\n{template}\n\n"
        f"出力は日本語、平易な表現、誇大表現は禁止。最後に次のアクション（打ち合わせ日程調整の一文）を入れる。"
    )


def main() -> None:
    parser = argparse.ArgumentParser(description="提案書を自動生成する")
    parser.add_argument("--company", required=True)
    parser.add_argument("--service", required=True, help="pricing.config.json のサービスID")
    parser.add_argument("--pain", required=True, help="顧客の課題（ヒアリング結果）")
    parser.add_argument("--out", default=None)
    args = parser.parse_args()

    service = find_service(args.service)
    result = complete("sales", build_user_message(args.company, service, args.pain))

    out_dir = Path(args.out) if args.out else CREATE_DIR / "proposals"
    out_dir.mkdir(parents=True, exist_ok=True)
    stamp = dt.datetime.now().strftime("%Y%m%d_%H%M%S")
    out_path = out_dir / f"{stamp}_{args.company}_{args.service}.md"
    out_path.write_text(f"# ご提案書: {company_title(args.company)}\n\n{result}\n", encoding="utf-8")

    print(f"生成完了: {out_path}")


def company_title(company: str) -> str:
    return f"{company} 様"


if __name__ == "__main__":
    main()
