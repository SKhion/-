"""business/scripts/*.py の疎通テスト（モックモード = ANTHROPIC_API_KEY 未設定で実行）。

Usage:
    cd business && python3 -m pytest tests/ -v
"""
from __future__ import annotations

import os
import subprocess
import sys
from pathlib import Path

SCRIPTS_DIR = Path(__file__).resolve().parents[1] / "scripts"


def run_script(args: list[str], tmp_path: Path) -> subprocess.CompletedProcess:
    env = dict(os.environ)
    env.pop("ANTHROPIC_API_KEY", None)  # モックモードを強制
    return subprocess.run(
        [sys.executable, *args, "--out", str(tmp_path)],
        cwd=SCRIPTS_DIR,
        env=env,
        capture_output=True,
        text=True,
        timeout=30,
    )


def test_company_research(tmp_path):
    result = run_script(
        ["company_research.py", "--company", "テスト株式会社", "--industry", "美容"], tmp_path
    )
    assert result.returncode == 0, result.stderr
    assert list(tmp_path.glob("*.md")), "レポートファイルが生成されていない"


def test_instagram_analysis(tmp_path):
    result = run_script(
        ["instagram_analysis.py", "--account", "@test_shop", "--industry", "EC"], tmp_path
    )
    assert result.returncode == 0, result.stderr
    assert list(tmp_path.glob("*.md"))


def test_sns_post_generator(tmp_path):
    result = run_script(
        ["sns_post_generator.py", "--company", "テスト美容室", "--industry", "美容"], tmp_path
    )
    assert result.returncode == 0, result.stderr
    assert list(tmp_path.glob("*.md"))


def test_estimate_generator_flags_low_margin(tmp_path):
    result = run_script(
        ["estimate_generator.py", "--company", "テスト株式会社", "--service", "instagram-diagnosis"],
        tmp_path,
    )
    assert result.returncode == 0, result.stderr
    files = list(tmp_path.glob("*.md"))
    assert files
    content = files[0].read_text(encoding="utf-8")
    assert "利益率" in content


def test_sales_email_generator(tmp_path):
    result = run_script(
        [
            "sales_email_generator.py",
            "--company", "テスト株式会社",
            "--contact", "山田様",
            "--stage", "cold",
            "--pain", "SNS運用が手つかず",
        ],
        tmp_path,
    )
    assert result.returncode == 0, result.stderr
    assert list(tmp_path.glob("*.md"))


def test_brand_diagnosis(tmp_path):
    result = run_script(
        ["brand_diagnosis.py", "--company", "テスト士業事務所", "--industry", "士業"], tmp_path
    )
    assert result.returncode == 0, result.stderr
    assert list(tmp_path.glob("*.md"))
