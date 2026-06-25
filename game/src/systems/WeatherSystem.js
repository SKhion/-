export const WEATHER = { CLEAR: 'clear', CLOUDY: 'cloudy', RAIN: 'rain', STORM: 'storm' };

export class WeatherSystem {
  constructor() {
    this.current = WEATHER.CLEAR;
    this.timer = 0;
    this.interval = 180000; // 3 min
    this.rainEmitter = null;
    this.intensity = 0;
    this.targetIntensity = 0;
  }

  create(scene) {
    this.scene = scene;
    this.rainGraphics = scene.add.graphics().setScrollFactor(0).setDepth(75).setAlpha(0);
    this._transition(WEATHER.CLEAR);
  }

  update(delta) {
    this.timer += delta;
    if (this.timer >= this.interval) {
      this.timer = 0;
      this._rollWeather();
    }
    this.intensity += (this.targetIntensity - this.intensity) * 0.02;
    this._renderRain();
  }

  _rollWeather() {
    const weights = { clear: 0.4, cloudy: 0.3, rain: 0.2, storm: 0.1 };
    const rand = Math.random();
    let acc = 0;
    for (const [w, prob] of Object.entries(weights)) {
      acc += prob;
      if (rand < acc) { this._transition(w); return; }
    }
  }

  _transition(weather) {
    this.current = weather;
    this.targetIntensity = { clear: 0, cloudy: 0, rain: 0.5, storm: 1.0 }[weather];
    if (weather === WEATHER.STORM && this.scene?.cameras?.main) {
      this.scene.cameras.main.shake(500, 0.005);
    }
  }

  _renderRain() {
    if (!this.rainGraphics) return;
    const g = this.rainGraphics;
    g.clear();
    if (this.intensity < 0.05) { g.setAlpha(0); return; }
    g.setAlpha(this.intensity * 0.4);
    const W = this.scene.scale.width, H = this.scene.scale.height;
    const drops = Math.floor(this.intensity * 200);
    g.lineStyle(1, 0xaaccff, 0.7);
    for (let i = 0; i < drops; i++) {
      const x = Math.random() * W;
      const y = Math.random() * H;
      g.lineBetween(x, y, x - 3, y + 12);
    }
  }

  getIcon() {
    return { clear: '☀', cloudy: '☁', rain: '🌧', storm: '⛈' }[this.current] || '☀';
  }
}
