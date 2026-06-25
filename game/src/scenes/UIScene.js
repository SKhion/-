export class UIScene extends Phaser.Scene {
  constructor() { super({ key: 'UIScene', active: true }); }

  create() {
    this.worldScene = null;
    this.topBar = this.add.graphics().setDepth(100);
    this.topBar.fillStyle(0x000000, 0.45);
    this.topBar.fillRect(0, 0, this.scale.width, 40);

    const style = { fontSize: '14px', color: '#eeeecc', fontFamily: 'serif', stroke: '#000', strokeThickness: 2 };
    this.timeText    = this.add.text(16, 12, '⏰ 06:00', style).setDepth(101);
    this.weatherText = this.add.text(140, 12, '☀ 快晴', style).setDepth(101);
    this.biomeText   = this.add.text(260, 12, '📍 草原', style).setDepth(101);
    this.coordText   = this.add.text(this.scale.width - 160, 12, 'X:0 Y:0', style).setDepth(101);
    this.shipText    = this.add.text(this.scale.width / 2, 12, '', { ...style, color: '#88ccff' })
      .setOrigin(0.5, 0).setDepth(101);

    // Bottom hint bar
    const hint = this.add.graphics().setDepth(100);
    hint.fillStyle(0x000000, 0.35);
    hint.fillRect(0, this.scale.height - 28, this.scale.width, 28);
    this.add.text(this.scale.width / 2, this.scale.height - 14,
      'WASD / 矢印キー: 移動 │ E: 乗船/上陸 │ ズーム: マウスホイール',
      { fontSize: '11px', color: '#aaaaaa', fontFamily: 'sans-serif' }
    ).setOrigin(0.5).setDepth(101);

    this.notifText = this.add.text(this.scale.width / 2, 80, '', {
      fontSize: '18px', color: '#ffee88', fontFamily: 'serif',
      stroke: '#000', strokeThickness: 3
    }).setOrigin(0.5).setDepth(101).setAlpha(0);
    this.notifTimer = 0;
  }

  update(time, delta) {
    const ws = this.scene.get('WorldScene');
    if (!ws || !ws.player) return;

    const p = ws.player;
    const dnc = ws.dayNight;
    const wx = ws.weather;

    this.timeText.setText(`⏰ ${dnc.getTimeString()}`);
    this.weatherText.setText(`${wx.getIcon()} ${this._weatherName(wx.current)}`);
    this.biomeText.setText(`📍 ${p.getTileInfo()}`);
    this.coordText.setText(`X:${Math.floor(p.x/32)} Y:${Math.floor(p.y/32)}`);
    this.shipText.setText(p.onShip ? '⛵ 航海中' : '');

    if (this.notifTimer > 0) {
      this.notifTimer -= delta;
      this.notifText.setAlpha(Math.min(1, this.notifTimer / 500));
    }
  }

  showNotification(msg) {
    this.notifText.setText(msg).setAlpha(1);
    this.notifTimer = 3000;
  }

  _weatherName(w) {
    return { clear: '快晴', cloudy: '曇り', rain: '雨', storm: '嵐' }[w] || '快晴';
  }
}
