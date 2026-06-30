// ===================================================
// ゲームデータ定義ファイル
// Day1〜Day7のシナリオ、選択肢、メーター変化を管理
// ===================================================

// 未来SNSの投稿データ（メーター状況に応じて変化）
export const futurePosts = {
  // HEATが高いときのSNS投稿
  heatHigh: [
    { user: "@natsuki_2035", avatar: "🥵", text: "今年も40度超え…エアコンなしじゃ生きてけない。地下街に移住したい", time: "14分前", likes: 2847 },
    { user: "@hiro_tokyo35", avatar: "😰", text: "夏休みなのに外出禁止令。政府の『外出自粛AI』がうるさい", time: "31分前", likes: 1293 },
    { user: "@climate_ai_jp", avatar: "🤖", text: "【自動通知】本日の熱中症リスク指数：危険レベルです。外出は21時以降を推奨します", time: "1時間前", likes: 892 },
  ],
  // HEATが低いときのSNS投稿
  heatLow: [
    { user: "@natsuki_2035", avatar: "😊", text: "街路樹が増えてから体感温度が違う。緑化プロジェクト大成功じゃん", time: "14分前", likes: 3124 },
    { user: "@hiro_tokyo35", avatar: "🌿", text: "クーリングシェルターがカフェに進化してる。おしゃれすぎる", time: "31分前", likes: 2018 },
    { user: "@climate_ai_jp", avatar: "🌤️", text: "【自動通知】今日は比較的快適な一日です。アクティブタイムを活用しよう", time: "1時間前", likes: 1567 },
  ],
  // WASTEが高いときのSNS投稿
  wasteHigh: [
    { user: "@umi_recycle35", avatar: "😤", text: "コンビニのプラごみ、また過去最高記録。なんで何も変わらないの", time: "52分前", likes: 4201 },
    { user: "@foodloss_news", avatar: "📰", text: "【速報】食品ロス年間500万トン突破。10年前より増加", time: "2時間前", likes: 3788 },
    { user: "@ryo_shibuya35", avatar: "😮‍💨", text: "街のゴミ箱、もう満杯。回収が追いつかない時代になってる", time: "3時間前", likes: 2109 },
  ],
  // WASTEが低いときのSNS投稿
  wasteLow: [
    { user: "@umi_recycle35", avatar: "✨", text: "マイボトル文化が定着して、ペットボトル消費が半減したって！すごい", time: "52分前", likes: 5102 },
    { user: "@foodloss_news", avatar: "🎉", text: "【速報】食品ロス年間300万トンを下回る。初の快挙", time: "2時間前", likes: 4567 },
    { user: "@ryo_shibuya35", avatar: "😄", text: "冷蔵庫のAIが食材使い切りレシピ提案してくれる時代。便利すぎ", time: "3時間前", likes: 3892 },
  ],
  // VIBEが高いときのSNS投稿
  vibeHigh: [
    { user: "@sakura_eco35", avatar: "💚", text: "学校で友達と始めたごみゼロプロジェクト、全国に広がった！！うれし", time: "8分前", likes: 8823 },
    { user: "@yuki_style35", avatar: "✨", text: "古着コーデをSNSにあげたら1万いいねきた。サステナブルが超おしゃれ", time: "25分前", likes: 10234 },
    { user: "@gen_z_connect", avatar: "🤝", text: "みんなで変えるってこういうことか。一人じゃないって感じる2035", time: "45分前", likes: 6721 },
  ],
  // VIBEが低いときのSNS投稿
  vibeLow: [
    { user: "@sakura_eco35", avatar: "😶", text: "エコな選択しようとするたびに浮いてる気がする。疲れてきた", time: "8分前", likes: 892 },
    { user: "@yuki_style35", avatar: "😕", text: "また友達に「そこまでしなくていいじゃん」って言われた。別にいいけど", time: "25分前", likes: 543 },
    { user: "@gen_z_connect", avatar: "💭", text: "2035年になっても孤独だったりするんかな。つながりってむずかしい", time: "45分前", likes: 1204 },
  ],
};

// ゲームの7日間のシナリオデータ
export const days = [
  // ===== Day 1 =====
  {
    day: 1,
    theme: "コンビニでの買い物",
    icon: "🏪",
    scene: "放課後、のどが渇いた。コンビニの前に立ってる。",
    bgColor: "#0d1b2a",
    accentColor: "#39ff14",
    messages: [
      { from: "友達・ユイ 📱", text: "今日めっちゃ暑くない？のど渇いたー。コンビニで何か買うの？" },
      { from: "コンビニ店員 🏪", text: "いらっしゃいませ〜。ポイントカードお持ちですか？" },
      { from: "未来の自分 🔮", text: "2035年から通知：今の選択、ちょっとだけタイムラインが変わるかも" },
    ],
    choices: [
      {
        id: "A",
        text: "ペットボトル飲料を買う",
        emoji: "🥤",
        sub: "冷たくて即解決。手軽でいつもどおり",
        meters: { HEAT: +5, WASTE: +15, MONEY: -10, VIBE: +5 },
        result: "ひんやり一口。でも飲み終わったらペットボトルがひとつ増えた。",
        tip: "💡 日本のペットボトル使用量は年間約200億本。",
        futureSNS: "平均的な2035年のタイムライン。特に変化なし。",
      },
      {
        id: "B",
        text: "マイボトルで水を補充する",
        emoji: "♻️",
        sub: "給水スポットを使う。ちょっと地味だけど",
        meters: { HEAT: -10, WASTE: -20, MONEY: +20, VIBE: -5 },
        result: "友達に「意識高〜」って言われた。でも確かにお金は浮いた。",
        tip: "💡 マイボトル1本で年間約365本のペットボトルが削減できる。",
        futureSNS: "2035年の街に給水スポットが増えてた。",
      },
      {
        id: "C",
        text: "コンビニおやつと飲み物、まとめ買い",
        emoji: "🛍️",
        sub: "テンション上がる。友達と分け合うかも",
        meters: { HEAT: +10, WASTE: +25, MONEY: -25, VIBE: +15 },
        result: "友達とシェアして盛り上がった。袋とゴミはちょっと多めになったけど。",
        tip: "💡 過剰包装を断るだけで、1人年間数kgのごみが減らせる。",
        futureSNS: "2035年の街にまだコンビニ袋が漂ってる。",
      },
    ],
  },

  // ===== Day 2 =====
  {
    day: 2,
    theme: "昼ごはん",
    icon: "🍱",
    scene: "お昼。学食か購買か、外食か迷ってる。",
    bgColor: "#1a0d2e",
    accentColor: "#00f5ff",
    messages: [
      { from: "友達・ソウタ 📱", text: "学食、今日のメニューなんか微妙じゃない？外に行こうよ" },
      { from: "学食のおばちゃん 🍜", text: "今日のランチ、量は多めにできるよ！食べ切れる分だけ言ってね" },
      { from: "未来の自分 🔮", text: "2035年から通知：食べ残しは、未来の食料問題につながってるんだって" },
    ],
    choices: [
      {
        id: "A",
        text: "学食でちょうどいい量を注文する",
        emoji: "🍜",
        sub: "食べ切れる分だけ。少し地味かも",
        meters: { HEAT: -5, WASTE: -20, MONEY: +10, VIBE: 0 },
        result: "全部食べきった。なんかちょっと気持ちいい達成感。",
        tip: "💡 日本の食品ロスは年間約464万トン。1人あたり年間37kg。",
        futureSNS: "2035年、食品ロスが減少傾向に。街のごみが少し軽くなった。",
      },
      {
        id: "B",
        text: "友達と一緒に外食。奮発する",
        emoji: "🍔",
        sub: "楽しい！でもお腹いっぱいで少し残すかも",
        meters: { HEAT: +5, WASTE: +15, MONEY: -30, VIBE: +20 },
        result: "めちゃくちゃ楽しかった。でも最後のポテト、少し残してしまった。",
        tip: "💡 「食べ切れる量を頼む」だけで、食品ロスを大幅に減らせる。",
        futureSNS: "2035年の自分からDM：「あの頃の友達と食べたご飯、おいしかったな」",
      },
      {
        id: "C",
        text: "購買でパンを買って一人で食べる",
        emoji: "🥐",
        sub: "コスパよし。一人時間も悪くない",
        meters: { HEAT: 0, WASTE: +5, MONEY: +5, VIBE: -15 },
        result: "静かに一人飯。落ち着くけど、友達の笑い声が少し聞こえてきた。",
        tip: "💡 個包装のパンは便利だけど、プラごみが増えやすい。",
        futureSNS: "2035年、孤食が社会問題に。つながりの大切さを再確認してる。",
      },
    ],
  },

  // ===== Day 3 =====
  {
    day: 3,
    theme: "暑すぎる帰り道",
    icon: "☀️",
    scene: "下校時間。外は37度。熱中症アラートが出てる。",
    bgColor: "#2a0d0d",
    accentColor: "#ff6b35",
    messages: [
      { from: "気象アプリ ⚠️", text: "【熱中症警戒アラート】本日は厳しい暑さです。不要不急の外出は避けてください" },
      { from: "友達・アオイ 📱", text: "やばい暑さじゃん。どうやって帰る？バスにしない？" },
      { from: "未来の自分 🔮", text: "2035年から通知：この暑さ、もっと続くよ。今の移動の選択が積み重なってる" },
    ],
    choices: [
      {
        id: "A",
        text: "バスと電車で帰る",
        emoji: "🚌",
        sub: "涼しい！でもちょっとお金かかる",
        meters: { HEAT: -15, WASTE: 0, MONEY: -15, VIBE: +10 },
        result: "クーラーが天国みたいだった。友達と話しながら帰れた。",
        tip: "💡 公共交通機関は車の約1/8のCO₂排出量。",
        futureSNS: "2035年、公共交通が進化してた。みんな使ってる。",
      },
      {
        id: "B",
        text: "クーリングシェルターに立ち寄って涼む",
        emoji: "🏢",
        sub: "時間はかかるけど、体には優しい",
        meters: { HEAT: -20, WASTE: -5, MONEY: +5, VIBE: +5 },
        result: "図書館のシェルターで30分休憩。涼しいし、本も読めた。",
        tip: "💡 環境省が推進するクーリングシェルターは全国に拡大中。",
        futureSNS: "2035年、クーリングシェルターがコミュニティスペースに進化してた。",
      },
      {
        id: "C",
        text: "歩いて帰る。節約したいし",
        emoji: "🚶",
        sub: "お金は節約。でも暑さが…",
        meters: { HEAT: +25, WASTE: 0, MONEY: +15, VIBE: -10 },
        result: "ヘロヘロになって帰宅。熱中症一歩手前だったかも。体がダメージ受けた感じ。",
        tip: "💡 熱中症による救急搬送は近年増加傾向。無理な外出は危険。",
        futureSNS: "2035年の自分から警告：「この暑さ、なめたら後悔するよ」",
      },
    ],
  },

  // ===== Day 4 =====
  {
    day: 4,
    theme: "服を買う",
    icon: "👕",
    scene: "ショッピングモールに来た。新しい服が欲しいな。",
    bgColor: "#0d2a1a",
    accentColor: "#ff00ff",
    messages: [
      { from: "友達・リン 📱", text: "このブランドの新作、かわいくない？1000円で買えるじゃん！" },
      { from: "SNS通知 📲", text: "フォロー中の古着アカウントが投稿：「今週のおすすめ古着来た！」" },
      { from: "未来の自分 🔮", text: "2035年から通知：あなたのクローゼット、今どうなってるか知ってる？" },
    ],
    choices: [
      {
        id: "A",
        text: "ファストファッションでトレンドを買う",
        emoji: "🛍️",
        sub: "安い！おしゃれ！すぐ手に入る",
        meters: { HEAT: +10, WASTE: +25, MONEY: -20, VIBE: +15 },
        result: "テンション上がった！でも来月また新しいの出るんだろうな、とふと思った。",
        tip: "💡 ファストファッションは年間9200万トンの繊維廃棄物を生む。",
        futureSNS: "2035年、古着・リペア文化が主流に。新品は「ちょっと古い感じ」に。",
      },
      {
        id: "B",
        text: "古着屋で掘り出し物を探す",
        emoji: "♻️",
        sub: "一点もの。かぶらない。でも時間はかかる",
        meters: { HEAT: -15, WASTE: -25, MONEY: +5, VIBE: +10 },
        result: "2時間かけていい感じのやつ見つけた。「それどこで買ったの？」って聞かれた。",
        tip: "💡 古着を1着買うことで、新品製造に必要な水2700リットルを節約できる。",
        futureSNS: "2035年、ヴィンテージが超トレンドに。あの時の選択がかっこいい。",
      },
      {
        id: "C",
        text: "持ってる服をリペア・アレンジする",
        emoji: "🧵",
        sub: "お金かからない。自分だけのデザインに",
        meters: { HEAT: -20, WASTE: -30, MONEY: +25, VIBE: 0 },
        result: "ちょっと不格好だけど、自分だけの服になった。愛着が湧いてきた。",
        tip: "💡 服を長く使うほど、環境負荷は劇的に下がる。",
        futureSNS: "2035年の自分からメッセージ：「あの服、まだ着てるよ」",
      },
    ],
  },

  // ===== Day 5 =====
  {
    day: 5,
    theme: "家での電気",
    icon: "💡",
    scene: "夜。家に帰って、部屋でくつろぐ時間。",
    bgColor: "#0d0d2a",
    accentColor: "#ffff00",
    messages: [
      { from: "お母さん 🏠", text: "電気代また上がってた。エアコン設定温度、少し上げてみてくれない？" },
      { from: "スマホアプリ 📱", text: "今月の電力使用量：先月比+15%。節電チャレンジ参加しますか？" },
      { from: "未来の自分 🔮", text: "2035年から通知：電気の使い方が、街の暑さに直結してたって、後で気づいた" },
    ],
    choices: [
      {
        id: "A",
        text: "エアコン28℃設定、照明も適度に絞る",
        emoji: "❄️",
        sub: "少し我慢。でも電気代は抑えられる",
        meters: { HEAT: -15, WASTE: -10, MONEY: +20, VIBE: -5 },
        result: "最初は暑かったけど、慣れてきた。なんか自分えらいな、って思った。",
        tip: "💡 エアコンを1℃上げると電力消費が約10%削減される。",
        futureSNS: "2035年、電力需要が落ち着いて停電リスクが減ってた。",
      },
      {
        id: "B",
        text: "全開でエアコン。快適優先",
        emoji: "🥶",
        sub: "最高に気持ちいい。今日頑張ったし",
        meters: { HEAT: +20, WASTE: +10, MONEY: -20, VIBE: +10 },
        result: "めちゃくちゃ快適。ゲームもはかどった。電気代は来月の請求で知る。",
        tip: "💡 家庭の電力使用量の約50%は冷暖房と照明。",
        futureSNS: "2035年、夏の電力不足が慢性化。計画停電のお知らせが増えてた。",
      },
      {
        id: "C",
        text: "再エネプランに変更して、普通に使う",
        emoji: "⚡",
        sub: "少し料金が上がるけど、使い方は変えない",
        meters: { HEAT: -20, WASTE: -5, MONEY: -15, VIBE: +15 },
        result: "手続きがちょっと面倒だったけど、「再エネ使ってる」って友達に話したら反応よかった。",
        tip: "💡 再生可能エネルギーの電力プランは今や多くの会社が提供している。",
        futureSNS: "2035年、再エネが主電力に。電気代が下がり始めてた。",
      },
    ],
  },

  // ===== Day 6 =====
  {
    day: 6,
    theme: "学校イベント",
    icon: "🎉",
    scene: "学校の文化祭。クラスで模擬店をやる。",
    bgColor: "#2a1a0d",
    accentColor: "#00ff88",
    messages: [
      { from: "クラスメート・ケン 📱", text: "模擬店の食器、プラスチック使い捨てにしない？一番楽じゃん" },
      { from: "学校の先生 🏫", text: "今年は環境配慮も評価ポイントに入ってます。工夫してみて！" },
      { from: "未来の自分 🔮", text: "2035年から通知：学校で何かを変えた記憶、ちゃんと残ってるよ" },
    ],
    choices: [
      {
        id: "A",
        text: "紙製・植物由来の食器にする",
        emoji: "🌿",
        sub: "少しコストがかかるけど、ゴミが減る",
        meters: { HEAT: -10, WASTE: -25, MONEY: -15, VIBE: +20 },
        result: "「おしゃれじゃん」って思ったより好評だった。先生にも褒められた。",
        tip: "💡 紙製食器はプラスチックより分解しやすく、ごみ削減に効果的。",
        futureSNS: "2035年、あのイベントが学校の伝統になってた。すごい。",
      },
      {
        id: "B",
        text: "プラ使い捨てで楽に済ませる",
        emoji: "🥤",
        sub: "準備が楽。コストも安い",
        meters: { HEAT: +5, WASTE: +30, MONEY: +10, VIBE: 0 },
        result: "スムーズに進んだ。イベント後のゴミ袋が10袋以上になったけど、仕方ないか。",
        tip: "💡 学校行事1回で数百枚のプラ食器が捨てられることもある。",
        futureSNS: "2035年、プラごみが社会問題として語り継がれてた。",
      },
      {
        id: "C",
        text: "「ゴミ分別ルール」を企画してクラスに提案",
        emoji: "📋",
        sub: "準備は大変。でも周りを巻き込める",
        meters: { HEAT: -15, WASTE: -30, MONEY: 0, VIBE: +25 },
        result: "最初は面倒くさそうだったクラスメートも、最後は分別を楽しんでた。",
        tip: "💡 分別ルールを設けるだけで、ごみの資源化率が大幅に上がる。",
        futureSNS: "2035年の自分：「あのイベントが、俺が変わったきっかけだった」",
      },
    ],
  },

  // ===== Day 7 =====
  {
    day: 7,
    theme: "未来SNSの分岐",
    icon: "🌐",
    scene: "1週間が終わった。2035年の自分からメッセージが届いた。",
    bgColor: "#0a0a1a",
    accentColor: "#ff00aa",
    messages: [
      { from: "2035年の自分 🔮", text: "やあ、2026年の自分。あの1週間の選択、ちゃんと積み重なったよ" },
      { from: "未来のAI 🤖", text: "あなたのタイムラインを分析しました。2035年の街の様子をお見せします" },
      { from: "未来の友達 👥", text: "あの頃から、ちょっとずつ変わってたんだよな。気づいてなかったけど" },
    ],
    choices: [
      {
        id: "A",
        text: "2035年の自分に「続けます」と返信",
        emoji: "💌",
        sub: "完璧じゃなくていい。続けることが大事",
        meters: { HEAT: -10, WASTE: -10, MONEY: 0, VIBE: +25 },
        result: "「完璧じゃなくていい。次の一手を選ぼう」。それが2035年からの返事だった。",
        tip: "💡 環境行動は一人の完璧より、多くの人の「ちょっとした行動」が大きな力になる。",
        futureSNS: "2035年の街が、少しだけ明るくなってた。",
      },
      {
        id: "B",
        text: "「全部は無理」と正直に返信",
        emoji: "😅",
        sub: "無理に頑張らない。それも正直な選択",
        meters: { HEAT: +5, WASTE: +5, MONEY: +5, VIBE: +10 },
        result: "「そうだよ。でもその正直さが、次の変化のはじまりだったりする」",
        tip: "💡 できることから始める。それが持続可能な変化のコツ。",
        futureSNS: "2035年の自分：「完璧を目指してた頃より、今の方が楽しいよ」",
      },
      {
        id: "C",
        text: "未来に向けて自分なりのルールを決める",
        emoji: "📝",
        sub: "一つだけ、続けられるルールを決める",
        meters: { HEAT: -15, WASTE: -15, MONEY: 0, VIBE: +20 },
        result: "一つだけルールを決めた。小さくていい。続けやすいやつ。",
        tip: "💡 習慣は小さな一歩から。「マイボトル持ち歩く」だけでも十分な変化。",
        futureSNS: "2035年の街に、あなたの選択の痕跡が見えた。",
      },
    ],
  },
];

// ===================================================
// 最終診断タイプ定義
// スコアの組み合わせで診断結果が変わる
// ===================================================
export const diagnosisTypes = [
  {
    id: "future_fixer",
    name: "Future Fixer",
    emoji: "🔧",
    subtitle: "バランスよく未来を修復するタイプ",
    description: "どのメーターもバランスよく管理できてる。完璧を求めず、続けやすい選択を重ねてきた。2035年の街が一番安定してるのはこのタイプ。",
    color: "#39ff14",
    condition: (meters) => {
      const values = Object.values(meters);
      const avg = values.reduce((a, b) => a + b, 0) / values.length;
      return avg >= 55 && Math.max(...values) - Math.min(...values) < 30;
    },
  },
  {
    id: "food_loss_breaker",
    name: "Food Loss Breaker",
    emoji: "🍱",
    subtitle: "食べ物のムダに敏感なタイプ",
    description: "食品ロスやごみに関する選択が光ってた。WASTEメーターの管理が上手い。2035年の食料問題を変えるのは、あなたみたいな人かも。",
    color: "#00f5ff",
    condition: (meters) => meters.WASTE >= 65 && meters.WASTE >= meters.HEAT,
  },
  {
    id: "cool_city_runner",
    name: "Cool City Runner",
    emoji: "🌬️",
    subtitle: "暑さ対策と移動選択がうまいタイプ",
    description: "気候変動への対応と移動手段の選択が冴えてた。HEATメーターを低く保てる行動力がある。2035年の街の体感温度、ちょっと下げてる。",
    color: "#ff6b35",
    condition: (meters) => meters.HEAT >= 65 && meters.HEAT >= meters.WASTE,
  },
  {
    id: "reuse_stylist",
    name: "Reuse Stylist",
    emoji: "✨",
    subtitle: "買い物とファッションの選び方が上手いタイプ",
    description: "消費の選択がおしゃれで持続可能。古着やリペアを選べるセンスは2035年でも一番クールなスタイル。",
    color: "#ff00ff",
    condition: (meters) => meters.MONEY >= 60 && meters.WASTE >= 55,
  },
  {
    id: "social_eco_leader",
    name: "Social Eco Leader",
    emoji: "🤝",
    subtitle: "周りを巻き込むのが得意なタイプ",
    description: "VIBEが高い。友達や周りを自然に巻き込みながら、環境に良い選択ができてる。一人じゃなくてみんなで変えるスタイル。",
    color: "#00ff88",
    condition: (meters) => meters.VIBE >= 65,
  },
  {
    id: "chaos_survivor",
    name: "Chaos Survivor",
    emoji: "💫",
    subtitle: "楽しく生きてるが未来SNSが少し荒れてるタイプ",
    description: "自分のペースで楽しく生きてる。未来のタイムラインは少し騒がしいけど、それはそれで本物の2035年かも。次の選択で変えられるよ。",
    color: "#ffff00",
    condition: () => true, // デフォルト
  },
];

// メーターの初期値と表示設定
export const meterConfig = {
  HEAT: {
    label: "HEAT",
    emoji: "🌡️",
    description: "暑さ・気候負荷",
    color: "#ff6b35",
    startValue: 50,
    // 値が低いほど良い（気候負荷が低い）
    goodIsLow: true,
  },
  WASTE: {
    label: "WASTE",
    emoji: "♻️",
    description: "ごみ・食品ロス負荷",
    color: "#00f5ff",
    startValue: 50,
    goodIsLow: true,
  },
  MONEY: {
    label: "MONEY",
    emoji: "💰",
    description: "お金・続けやすさ",
    color: "#ffff00",
    startValue: 50,
    goodIsLow: false,
  },
  VIBE: {
    label: "VIBE",
    emoji: "💚",
    description: "友達関係・気分",
    color: "#39ff14",
    startValue: 50,
    goodIsLow: false,
  },
};
