"""Anthropic Claude API の共有ラッパー。

- ANTHROPIC_API_KEY が未設定の場合は「モックモード」で動作し、
  各スクリプトがAPIキーなしでもローカル動作確認できるようにする。
- 全エージェントのシステムプロンプトは business/prompts/*.md を単一ソースとして読み込む。
"""
from __future__ import annotations

import json
import os
from pathlib import Path
from typing import Any

BUSINESS_ROOT = Path(__file__).resolve().parents[2]
PROMPTS_DIR = BUSINESS_ROOT / "prompts"
CONFIG_DIR = BUSINESS_ROOT / "config"


class MockModeNotice(RuntimeWarning):
    """ANTHROPIC_API_KEY 未設定時に一度だけ表示する注意喚起。"""


def load_prompt(agent_id: str) -> str:
    """business/config/agents.config.json の agent_id から system prompt 本文を読み込む。"""
    agents_config = json.loads((CONFIG_DIR / "agents.config.json").read_text(encoding="utf-8"))
    for agent in agents_config["agents"]:
        if agent["id"] == agent_id:
            prompt_path = BUSINESS_ROOT / agent["prompt_file"]
            return prompt_path.read_text(encoding="utf-8")
    raise ValueError(f"Unknown agent_id: {agent_id}")


def load_pricing() -> dict[str, Any]:
    return json.loads((CONFIG_DIR / "pricing.config.json").read_text(encoding="utf-8"))


def is_mock_mode() -> bool:
    return not bool(os.environ.get("ANTHROPIC_API_KEY"))


def complete(agent_id: str, user_message: str, *, max_tokens: int = 2000) -> str:
    """agent_id のシステムプロンプトを使って Claude を呼び出す。

    ANTHROPIC_API_KEY が無い場合は、実際のAPI呼び出しを行わず
    「モック応答」（入力の要約＋テンプレート）を返す。CI・デモ・オンボーディングで
    APIキー無しでもパイプライン全体の動作確認ができるようにするため。
    """
    system_prompt = load_prompt(agent_id)

    if is_mock_mode():
        return (
            f"[MOCK MODE: ANTHROPIC_API_KEY 未設定のためAI生成をスキップしました]\n"
            f"--- 使用予定エージェント: {agent_id} ---\n"
            f"--- 入力内容 ---\n{user_message}\n"
            f"--- 実際の運用では上記システムプロンプト ({len(system_prompt)}文字) を用いて "
            f"Claude ({os.environ.get('CLAUDE_MODEL', 'claude-sonnet-5')}) がレポートを生成します。"
            f"ANTHROPIC_API_KEY を .env に設定すると実際のAI生成に切り替わります。"
        )

    try:
        import anthropic  # type: ignore
    except ImportError as exc:  # pragma: no cover
        raise RuntimeError(
            "anthropic パッケージが未インストールです。`pip install -r business/scripts/requirements.txt` を実行してください。"
        ) from exc

    client = anthropic.Anthropic(api_key=os.environ["ANTHROPIC_API_KEY"])
    model = os.environ.get("CLAUDE_MODEL", "claude-sonnet-5")
    response = client.messages.create(
        model=model,
        max_tokens=max_tokens,
        system=system_prompt,
        messages=[{"role": "user", "content": user_message}],
    )
    return "".join(block.text for block in response.content if getattr(block, "type", "") == "text")
