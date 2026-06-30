// ===================================================
// タイトル画面コンポーネント
// ゲームタイトル、雰囲気の演出、スタートボタンを表示
// ===================================================

import "./TitleScreen.css";

export default function TitleScreen({ onStart }) {
  return (
    <div className="title-screen screen">
      {/* 背景グラデーション装飾 */}
      <div className="title-bg-glow" />

      {/* ヘッダー：年号とSNSのヘッダー風 */}
      <div className="title-header">
        <span className="title-header-label">📡 TIMELINE・2035</span>
        <span className="title-header-status">● LIVE</span>
      </div>

      {/* 未来SNSのフィード風プレビュー（雰囲気演出） */}
      <div className="title-preview-posts fade-in-delay-1">
        <div className="title-preview-post">
          <span className="tpp-avatar">🥵</span>
          <div>
            <span className="tpp-user">@natsuki_2035</span>
            <p className="tpp-text">今日また40度超え…選択を変えてたら違ったのかな</p>
          </div>
        </div>
        <div className="title-preview-post">
          <span className="tpp-avatar">🌿</span>
          <div>
            <span className="tpp-user">@hiro_tokyo35</span>
            <p className="tpp-text">あの頃の小さな選択が、今の街を作ってたんだよな</p>
          </div>
        </div>
      </div>

      {/* メインタイトルエリア */}
      <div className="title-main fade-in-delay-2">
        {/* サブタイトル */}
        <p className="title-year">2026 → 2035</p>

        {/* メインタイトル */}
        <h1 className="title-logo pulse-glow">
          放課後<br />
          <span className="title-logo-sub">リセット</span>
        </h1>

        {/* キャッチコピー */}
        <p className="title-catch">
          今日の選択が、<br />
          未来のタイムラインを変える。
        </p>
      </div>

      {/* ゲーム概要の短い説明 */}
      <div className="title-desc fade-in-delay-3">
        <p>放課後の7日間を生き抜きながら、<br />2035年の自分の街がどう変わるか体験しよう。</p>
      </div>

      {/* スタートボタン */}
      <div className="title-actions fade-in-delay-4">
        <button className="btn-primary" onClick={onStart}>
          ▶ ゲームをはじめる
        </button>
        <p className="title-playtime">🕐 プレイ時間：約5〜8分</p>
      </div>

      {/* 下部：バージョンなど */}
      <div className="title-footer fade-in-delay-5">
        <span className="chip chip-green">2026年版</span>
        <span style={{ marginLeft: 8 }} className="chip chip-cyan">全7日間</span>
        <span style={{ marginLeft: 8 }} className="chip chip-pink">6種の診断</span>
      </div>
    </div>
  );
}
