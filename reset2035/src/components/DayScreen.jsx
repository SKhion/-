// ===================================================
// Day選択画面コンポーネント
// シーン表示・メッセージ・3択ボタンを担当
// ===================================================

import { useState } from "react";
import MeterBar from "./MeterBar";
import { meterConfig } from "../data/gameData";
import "./DayScreen.css";

export default function DayScreen({ dayData, dayIndex, totalDays, meters, onChoice }) {
  // 選択肢ホバーの状態管理
  const [hoveredChoice, setHoveredChoice] = useState(null);

  // プログレスバーの幅（進行度）
  const progress = ((dayIndex) / totalDays) * 100;

  return (
    <div className="day-screen screen">
      {/* 上部プログレスバー */}
      <div className="day-progress-bar">
        <div className="day-progress-fill" style={{ width: `${progress}%` }} />
      </div>

      {/* ヘッダー：Dayと日付テーマ */}
      <div className="day-header">
        <div className="day-header-left">
          <span className="day-number">DAY {dayData.day}</span>
          <span className="day-total">/ {totalDays}</span>
        </div>
        <div className="day-header-right">
          <span className="day-theme-icon">{dayData.icon}</span>
          <span className="day-theme">{dayData.theme}</span>
        </div>
      </div>

      {/* 現在のメーター表示（コンパクト） */}
      <div className="card fade-in">
        <p className="day-meters-label">現在のステータス</p>
        {Object.keys(meterConfig).map((key) => (
          <MeterBar key={key} meterKey={key} value={meters[key]} />
        ))}
      </div>

      {/* シーン説明 */}
      <div className="day-scene fade-in-delay-1">
        <p className="day-scene-text">{dayData.scene}</p>
      </div>

      {/* メッセージカード（友達・SNS通知など） */}
      <div className="fade-in-delay-2">
        {dayData.messages.map((msg, i) => (
          <div key={i} className="day-message-card">
            <p className="day-message-from">{msg.from}</p>
            <p className="day-message-text">{msg.text}</p>
          </div>
        ))}
      </div>

      {/* 選択セクション */}
      <div className="day-choice-section fade-in-delay-3">
        <p className="day-choice-label">⚡ どうする？</p>
        {dayData.choices.map((choice) => (
          <button
            key={choice.id}
            className={`day-choice-btn ${hoveredChoice === choice.id ? "hovered" : ""}`}
            onClick={() => onChoice(choice)}
            onMouseEnter={() => setHoveredChoice(choice.id)}
            onMouseLeave={() => setHoveredChoice(null)}
          >
            {/* 選択肢の内容 */}
            <div className="day-choice-top">
              <span className="day-choice-emoji">{choice.emoji}</span>
              <div className="day-choice-texts">
                <p className="day-choice-main">{choice.text}</p>
                <p className="day-choice-sub">{choice.sub}</p>
              </div>
            </div>
            {/* ホバー時にメーター変化をプレビュー */}
            {hoveredChoice === choice.id && (
              <div className="day-choice-preview">
                {Object.entries(choice.meters).map(([key, val]) => (
                  <span
                    key={key}
                    className="day-choice-delta"
                    style={{ color: val > 0 ? "#ff8888" : "#39ff14" }}
                  >
                    {meterConfig[key].emoji}{key} {val > 0 ? `+${val}` : val}
                  </span>
                ))}
              </div>
            )}
          </button>
        ))}
      </div>

      {/* ヒント */}
      <div className="day-hint fade-in-delay-4">
        <p>💡 完璧な正解はない。続けやすい選択を探そう。</p>
      </div>
    </div>
  );
}
