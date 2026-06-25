// Animated water surface overlay using canvas graphics
export class WaterOverlay {
  constructor(scene) {
    this.scene = scene;
    this.time = 0;
    this.waveGraphics = [];
    this._buildWaveLayer();
  }

  _buildWaveLayer() {
    // A fullscreen scrolling overlay that creates wave shimmer
    this.shimmer = this.scene.add.graphics()
      .setScrollFactor(0.02, 0.02) // very slight parallax
      .setDepth(2)
      .setBlendMode(Phaser.BlendModes.ADD);
  }

  update(delta, camX, camY) {
    this.time += delta * 0.001;
    this._drawShimmer(camX, camY);
  }

  _drawShimmer(camX, camY) {
    const g = this.shimmer;
    g.clear();
    const W = this.scene.scale.width, H = this.scene.scale.height;
    const cols = 8, rows = 5;
    const cw = W / cols, ch = H / rows;

    for (let row = 0; row < rows; row++) {
      for (let col = 0; col < cols; col++) {
        const phase = Math.sin(this.time + col * 0.8 + row * 1.2) * 0.5 + 0.5;
        const x = col * cw + Math.sin(this.time * 0.7 + row) * 10;
        const y = row * ch + Math.cos(this.time * 0.5 + col) * 6;
        g.fillStyle(0x5aaae8, phase * 0.06);
        g.fillEllipse(x + cw/2, y + ch/2, cw * 0.8, ch * 0.3);
      }
    }
  }
}
