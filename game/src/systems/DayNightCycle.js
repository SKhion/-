export class DayNightCycle {
  constructor() {
    this.time = 0.35; // start at morning
    this.speed = 1 / (60 * 60 * 3); // 3 min real = 1 game day
    this.overlay = null;
  }

  create(scene) {
    this.overlay = scene.add.rectangle(0, 0,
      scene.scale.width * 4, scene.scale.height * 4,
      0x000000, 0
    ).setScrollFactor(0).setDepth(80).setOrigin(0, 0);
  }

  update(delta) {
    this.time = (this.time + this.speed * delta) % 1;
    this._applyOverlay();
  }

  _applyOverlay() {
    const t = this.time;
    let r, g, b, a;

    if (t < 0.25) {           // night → dawn  0..0.25
      const p = t / 0.25;
      r = lerp(0x05, 0xff, p * p); g = lerp(0x08, 0x88, p * p); b = lerp(0x20, 0x44, p);
      a = lerp(0.65, 0.1, p);
    } else if (t < 0.35) {    // dawn → day    0.25..0.35
      const p = (t - 0.25) / 0.1;
      r = lerp(0xff, 0xff, p); g = lerp(0x88, 0xff, p); b = lerp(0x44, 0xff, p);
      a = lerp(0.1, 0.0, p);
    } else if (t < 0.65) {    // full day
      a = 0.0;
      r = g = b = 0xff;
    } else if (t < 0.75) {    // day → dusk    0.65..0.75
      const p = (t - 0.65) / 0.1;
      r = lerp(0xff, 0xff, p); g = lerp(0xff, 0x66, p); b = lerp(0xff, 0x22, p);
      a = lerp(0.0, 0.25, p);
    } else if (t < 0.85) {    // dusk → night  0.75..0.85
      const p = (t - 0.75) / 0.1;
      r = lerp(0xff, 0x05, p); g = lerp(0x66, 0x08, p); b = lerp(0x22, 0x20, p);
      a = lerp(0.25, 0.65, p);
    } else {                   // full night
      r = 0x05; g = 0x08; b = 0x20;
      a = 0.65;
    }

    this.overlay.setFillStyle((r << 16) | (g << 8) | b, a);
  }

  getTimeString() {
    const totalMin = Math.floor(this.time * 24 * 60);
    const h = String(Math.floor(totalMin / 60)).padStart(2, '0');
    const m = String(totalMin % 60).padStart(2, '0');
    return `${h}:${m}`;
  }

  isNight() { return this.time < 0.25 || this.time > 0.80; }
  isDay()   { return this.time > 0.35 && this.time < 0.65; }
}

function lerp(a, b, t) { return Math.round(a + (b - a) * Math.min(1, Math.max(0, t))); }
