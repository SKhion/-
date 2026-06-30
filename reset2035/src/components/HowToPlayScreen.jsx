// ===================================================
// 遊び方画面コンポーネント
// ゲームルールを簡潔に説明する
// ===================================================

import "./HowToPlayScreen.css";

const rules = [
  { icon: "📅", title: "7日間を過ごす", desc: "放課後の1週間、毎日1つの場面で選択をしよう。" },
  { icon: "🎯", title: "3択から選ぶ", desc: "正解はない。続けやすい選択を探してみて。" },
  { icon: "📊", title: "4つのメーターが変わる", desc: "HEAT / WASTE / MONEY / VIBEが選択で動く。" },
  { icon: "📱", title: "2035年のSNSが変化する", desc: "選択の積み重ねで、未来のタイムラインが変わる。" },
  { icon: "🔮", title: "最終診断を受け取る", desc: "7日間の選択から、あなたのタイプが決まる。" },
];

const meters = [
  { key: "HEAT",  emoji: "🌡️", label: "HEAT",  desc: "暑さ・気候負荷。低いほど未来が快適。", color: "#ff6b35" },
  { key: "WASTE", emoji: "♻️", label: "WASTE", desc: "ごみ・食品ロス。低いほど街がきれい。", color: "#00f5ff" },
  { key: "MONEY", emoji: "💰", label: "MONEY", desc: "お金・続けやすさ。高いほど余裕がある。", color: "#ffff00" },
  { key: "VIBE",  emoji: "💚", label: "VIBE",  desc: "友達関係・気分。高いほど共感が広がる。", color: "#39ff14" },
];

export default function HowToPlayScreen({ onStart }) {
  return (
    <div className="howto-screen screen">
      {/* ヘッダー */}
      <div className="howto-header">
        <h2 className="howto-title glow-text-cyan">遊び方</h2>
        <p className="howto-sub">完璧じゃなくていい。次の一手を選ぼう。</p>
      </div>

      {/* ルール説明 */}
      <div className="howto-rules">
        {rules.map((r, i) => (
          <div key={i} className={`howto-rule fade-in-delay-${i + 1}`}>
            <span className="howto-rule-icon">{r.icon}</span>
            <div>
              <p className="howto-rule-title">{r.title}</p>
              <p className="howto-rule-desc">{r.desc}</p>
            </div>
          </div>
        ))}
      </div>

      <div className="divider" />

      {/* メーター説明 */}
      <div className="howto-meters-section">
        <p className="howto-section-label">📊 4つのメーター</p>
        {meters.map((m) => (
          <div key={m.key} className="howto-meter-row">
            <span className="howto-meter-emoji">{m.emoji}</span>
            <div className="howto-meter-info">
              <span className="howto-meter-label" style={{ color: m.color }}>{m.label}</span>
              <span className="howto-meter-desc">{m.desc}</span>
            </div>
          </div>
        ))}
      </div>

      {/* 注意書き */}
      <div className="howto-note fade-in-delay-5">
        <p>⚠️ 環境に良い選択でも、MONEYやVIBEが<br />下がることがあるよ。バランスが大事。</p>
      </div>

      {/* スタートボタン */}
      <div className="howto-actions">
        <button className="btn-primary" onClick={onStart}>
          Day 1 をはじめる →
        </button>
      </div>
    </div>
  );
}
