// ===================================================
// メーターバーコンポーネント（再利用可能）
// メーターの名前・値・バーを表示する
// ===================================================

import { meterConfig } from "../data/gameData";

export default function MeterBar({ meterKey, value, delta }) {
  const config = meterConfig[meterKey];

  // 変化量の表示（+5 や -10 のように表示）
  const deltaText = delta != null && delta !== 0
    ? (delta > 0 ? `+${delta}` : `${delta}`)
    : null;

  const deltaColor = delta > 0 ? "#ff6b6b" : "#39ff14";

  return (
    <div className="meter-bar-wrap">
      <div className="meter-label-row">
        <span className="label">
          {config.emoji} {config.label}
          <span style={{ marginLeft: 4, fontSize: "0.7rem", color: "var(--text-muted)", fontWeight: 400 }}>
            {config.description}
          </span>
        </span>
        <span style={{ display: "flex", alignItems: "center", gap: 6 }}>
          {deltaText && (
            <span style={{ color: deltaColor, fontWeight: 700, fontSize: "0.78rem" }}>
              {deltaText}
            </span>
          )}
          <span style={{ fontWeight: 700, fontSize: "0.88rem", color: "var(--text-primary)" }}>
            {value}
          </span>
        </span>
      </div>
      <div className="meter-track">
        <div
          className="meter-fill"
          style={{
            width: `${value}%`,
            background: config.color,
            boxShadow: `0 0 8px ${config.color}66`,
          }}
        />
      </div>
    </div>
  );
}
