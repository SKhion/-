export class AtmosphereOverlay {
  constructor(scene) {
    this.scene = scene;
    this.stars = [];
    this.starGraphics = scene.add.graphics().setScrollFactor(0).setDepth(78);
    this.horizonGraphics = scene.add.graphics().setScrollFactor(0).setDepth(1);
    this._generateStars();
  }

  _generateStars() {
    const W = 1920, H = 1080;
    for (let i = 0; i < 220; i++) {
      this.stars.push({
        x: Math.random() * W,
        y: Math.random() * H * 0.7,
        size: Math.random() * 1.5 + 0.3,
        twinkle: Math.random() * Math.PI * 2,
      });
    }
  }

  update(time, dayNight) {
    const t = dayNight.time;
    const starAlpha = t < 0.25 ? 1 : t > 0.80 ? 1 :
      t < 0.35 ? 1 - (t - 0.25) / 0.1 :
      t > 0.72 ? (t - 0.72) / 0.08 : 0;

    const g = this.starGraphics;
    g.clear();

    if (starAlpha > 0.01) {
      for (const s of this.stars) {
        const twinkle = Math.sin(time * 0.002 + s.twinkle) * 0.3 + 0.7;
        g.fillStyle(0xffffff, starAlpha * twinkle * 0.9);
        g.fillCircle(s.x, s.y, s.size);
      }
      // Moon
      if (starAlpha > 0.5) {
        const W = this.scene.scale.width;
        const moonT = dayNight.time < 0.5 ? dayNight.time : dayNight.time - 1;
        const moonX = W * 0.8 + moonT * 200;
        g.fillStyle(0xffffcc, starAlpha * 0.95);
        g.fillCircle(moonX, 60, 18);
        g.fillStyle(0x0a0820, starAlpha * 0.95);
        g.fillCircle(moonX + 6, 55, 14);
      }
    }

    // Horizon gradient (subtle atmospheric haze)
    this._drawHorizon(dayNight.time);
  }

  _drawHorizon(t) {
    const g = this.horizonGraphics;
    g.clear();
    // This is rendered before tiles, adds subtle color to ocean edge
  }
}
