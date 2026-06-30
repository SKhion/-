// ===================================================
// 最終診断画面コンポーネント
// 7日間の選択結果から診断タイプを表示
// ===================================================

import MeterBar from "./MeterBar";
import { meterConfig } from "../data/gameData";
import "./DiagnosisScreen.css";

// メーターの「良さ」を星で表示するヘルパー
function getStars(value, goodIsLow) {
  const score = goodIsLow ? (100 - value) : value;
  if (score >= 70) return "★★★";
  if (score >= 45) return "★★☆";
  return "★☆☆";
}

// SNSシェア用テキストを生成
function makeShareText(diagnosis, meters) {
  return `【2035：放課後リセット】\n私の診断：${diagnosis.emoji} ${diagnosis.name}\n${diagnosis.subtitle}\nHEAT:${meters.HEAT} WASTE:${meters.WASTE} MONEY:${meters.MONEY} VIBE:${meters.VIBE}\n#放課後リセット #2035`;
}

export default function DiagnosisScreen({ meters, diagnosis, choiceHistory, onRestart }) {
  const shareText = makeShareText(diagnosis, meters);

  // Web Share API でシェア（対応していない場合はクリップボードコピー）
  const handleShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({ text: shareText, title: "2035：放課後リセット 診断結果" });
      } catch {
        // キャンセルされた場合は何もしない
      }
    } else {
      await navigator.clipboard.writeText(shareText);
      alert("テキストをコピーしました！SNSに貼り付けてシェアしよう。");
    }
  };

  return (
    <div className="diagnosis-screen screen">
      {/* ヘッダー */}
      <div className="diagnosis-header">
        <p className="diagnosis-header-sub">7日間の放課後、終了</p>
        <h2 className="diagnosis-header-title glow-text-pink">2035年診断</h2>
      </div>

      {/* 診断結果カード */}
      <div
        className="diagnosis-result-card fade-in"
        style={{ borderColor: diagnosis.color, boxShadow: `0 0 30px ${diagnosis.color}33` }}
      >
        <div className="diagnosis-result-emoji">{diagnosis.emoji}</div>
        <p className="diagnosis-result-name" style={{ color: diagnosis.color }}>
          {diagnosis.name}
        </p>
        <p className="diagnosis-result-subtitle">{diagnosis.subtitle}</p>
        <p className="diagnosis-result-desc">{diagnosis.description}</p>
      </div>

      {/* 最終メーター */}
      <div className="card fade-in-delay-1">
        <p className="diagnosis-section-label">📊 最終ステータス</p>
        {Object.keys(meterConfig).map((key) => (
          <div key={key} className="diagnosis-meter-row">
            <MeterBar meterKey={key} value={meters[key]} />
            <span className="diagnosis-stars">
              {getStars(meters[key], meterConfig[key].goodIsLow)}
            </span>
          </div>
        ))}
      </div>

      {/* 選択の振り返り */}
      <div className="card fade-in-delay-2">
        <p className="diagnosis-section-label">📅 7日間の選択</p>
        {choiceHistory.map((h, i) => (
          <div key={i} className="diagnosis-history-item">
            <span className="diagnosis-history-day">Day {h.day + 1}</span>
            <span className="diagnosis-history-emoji">{h.choice.emoji}</span>
            <span className="diagnosis-history-text">{h.choice.text}</span>
          </div>
        ))}
      </div>

      {/* メッセージ */}
      <div className="diagnosis-message fade-in-delay-3">
        <p>完璧じゃなくていい。<br />次の一手を選び続けることが、<br />2035年を変えていく。</p>
      </div>

      {/* アクションボタン */}
      <div className="diagnosis-actions fade-in-delay-4">
        <button className="btn-primary" onClick={handleShare}>
          📱 結果をシェアする
        </button>
        <div style={{ height: 10 }} />
        <button className="btn-secondary" onClick={onRestart}>
          🔄 もう一度プレイする
        </button>
      </div>

      {/* フッターヒント */}
      <div className="diagnosis-footer fade-in-delay-5">
        <p>💡 選択を変えると、別の診断が出るかも。</p>
        <p style={{ marginTop: 4 }}>
          日本の食品ロスは年間約464万トン。デコ活で一緒に変えよう。
        </p>
      </div>
    </div>
  );
}
