// ===================================================
// メーター変化画面コンポーネント
// 選択結果のコメント・メーター変化・Tipsを表示
// ===================================================

import MeterBar from "./MeterBar";
import { meterConfig } from "../data/gameData";
import "./MeterScreen.css";

export default function MeterScreen({ choice, deltas, meters, dayData, onNext }) {
  return (
    <div className="meter-screen screen">
      {/* ヘッダー */}
      <div className="meter-header">
        <span className="meter-header-day">{dayData.icon} Day {dayData.day}</span>
        <span className="chip chip-green">選択完了</span>
      </div>

      {/* 選択した行動の表示 */}
      <div className="meter-choice-display fade-in">
        <span className="meter-choice-emoji">{choice.emoji}</span>
        <p className="meter-choice-text">「{choice.text}」を選択した</p>
      </div>

      {/* 結果コメント */}
      <div className="meter-result-card fade-in-delay-1">
        <p className="meter-result-label">💬 結果</p>
        <p className="meter-result-text">{choice.result}</p>
      </div>

      {/* メーター変化 */}
      <div className="card fade-in-delay-2">
        <p className="meter-change-label">📊 メーターの変化</p>
        {Object.keys(meterConfig).map((key) => (
          <MeterBar
            key={key}
            meterKey={key}
            value={meters[key]}
            delta={deltas[key]}
          />
        ))}
      </div>

      {/* 変化の解説 */}
      <div className="meter-delta-explain fade-in-delay-3">
        {Object.entries(deltas).map(([key, val]) => {
          if (val === 0) return null;
          const config = meterConfig[key];
          const isGood = config.goodIsLow ? val < 0 : val > 0;
          return (
            <div key={key} className={`meter-delta-item ${isGood ? "good" : "bad"}`}>
              <span>{config.emoji} {config.label}</span>
              <span className="meter-delta-val">{val > 0 ? `+${val}` : val}</span>
              <span className="meter-delta-arrow">{isGood ? "✓ Good" : "△ Check"}</span>
            </div>
          );
        })}
      </div>

      {/* Tips */}
      <div className="meter-tip fade-in-delay-4">
        <p>{choice.tip}</p>
      </div>

      {/* 次へボタン */}
      <div className="meter-actions fade-in-delay-5">
        <button className="btn-primary" onClick={onNext}>
          2035年のタイムラインを確認 →
        </button>
      </div>
    </div>
  );
}
