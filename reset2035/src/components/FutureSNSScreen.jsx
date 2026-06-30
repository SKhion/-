// ===================================================
// 未来SNSプレビュー画面コンポーネント
// 2035年のSNS投稿を表示して選択の影響を体験させる
// ===================================================

import "./FutureSNSScreen.css";

export default function FutureSNSScreen({ choice, posts, dayData, meters, isLastDay, onNext }) {
  return (
    <div className="sns-screen screen">
      {/* ヘッダー：未来SNSアプリ風 */}
      <div className="sns-app-header">
        <div className="sns-app-logo">
          <span className="sns-app-icon">📡</span>
          <span className="sns-app-name">TIMELINE<span className="sns-app-year">2035</span></span>
        </div>
        <span className="sns-app-notify">通知 3</span>
      </div>

      {/* 選択の影響説明 */}
      <div className="sns-impact-banner fade-in">
        <p className="sns-impact-title">⚡ 未来のタイムラインが変化した</p>
        <p className="sns-impact-sub">「{choice.text}」の選択が、2035年に届いた</p>
      </div>

      {/* タブ風ナビ（演出のみ） */}
      <div className="sns-tabs">
        <span className="sns-tab active">おすすめ</span>
        <span className="sns-tab">フォロー中</span>
        <span className="sns-tab">トレンド</span>
      </div>

      {/* 未来のSNS投稿カード */}
      <div className="fade-in-delay-1">
        {posts.map((post, i) => (
          <div key={i} className={`sns-card fade-in-delay-${i + 1}`}>
            <div className="sns-card-header">
              <div className="sns-avatar">{post.avatar}</div>
              <div>
                <div className="sns-username">{post.user}</div>
                <div className="sns-time">{post.time}</div>
              </div>
            </div>
            <p className="sns-text">{post.text}</p>
            <div className="sns-likes">
              ❤️ {post.likes.toLocaleString()}  🔁 {Math.floor(post.likes * 0.3).toLocaleString()}  💬 {Math.floor(post.likes * 0.1).toLocaleString()}
            </div>
          </div>
        ))}
      </div>

      {/* 選択の未来コメント */}
      <div className="sns-future-comment fade-in-delay-4">
        <span className="sns-future-icon">🔮</span>
        <p>{choice.futureSNS}</p>
      </div>

      {/* メーターサマリー */}
      <div className="sns-meter-summary fade-in-delay-5">
        <p className="sns-meter-title">現在のタイムライン状態</p>
        <div className="sns-meter-chips">
          <span className="sns-meter-chip" style={{ borderColor: "#ff6b35", color: "#ff6b35" }}>
            🌡️ HEAT {meters.HEAT}
          </span>
          <span className="sns-meter-chip" style={{ borderColor: "#00f5ff", color: "#00f5ff" }}>
            ♻️ WASTE {meters.WASTE}
          </span>
          <span className="sns-meter-chip" style={{ borderColor: "#ffff00", color: "#ffff00" }}>
            💰 MONEY {meters.MONEY}
          </span>
          <span className="sns-meter-chip" style={{ borderColor: "#39ff14", color: "#39ff14" }}>
            💚 VIBE {meters.VIBE}
          </span>
        </div>
      </div>

      {/* 次へボタン */}
      <div className="sns-actions">
        {isLastDay ? (
          <button className="btn-primary" onClick={onNext}>
            🔮 2035年の診断を見る
          </button>
        ) : (
          <button className="btn-primary" onClick={onNext}>
            次の日へ → Day {dayData.day + 1}
          </button>
        )}
      </div>
    </div>
  );
}
