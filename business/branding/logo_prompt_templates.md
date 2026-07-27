# ロゴ/ビジュアル生成プロンプト テンプレート

`business/scripts/logo_prompt_generator.py` が生成する出力の基本構成。

```
Concept: {コンセプト説明（日本語）}
Style keywords: {キーワード1}, {キーワード2}, {キーワード3}
Color palette: {HEX1}, {HEX2}, {HEX3}
Prompt (for image generation AI):
"A minimalist logo design for {業種} business, {キーワード}, {カラーパレット},
clean vector style, no text, professional, high contrast, white background"
```

業種別の推奨スタイル:
- 美容: 上品・ナチュラル・曲線的
- 飲食: 温かみ・手書き感・食欲を刺激する暖色
- 建築/士業: 直線的・信頼感・ネイビー/グレー基調
- EC/スクール: フレンドリー・親しみやすさ・明るい配色
