import { TILE_META } from '../world/TileTypes.js';
import { WORLD_SIZE, TILE_SIZE } from '../world/WorldGenerator.js';

export class Minimap {
  constructor(scene, world) {
    this.scene = scene;
    this.world = world;
    this.size = 160;
    this.scale = this.size / WORLD_SIZE;
    this.canvas = document.createElement('canvas');
    this.canvas.width = this.size;
    this.canvas.height = this.size;
    this._drawWorldMap();

    this.texture = scene.textures.addCanvas('minimap_bg', this.canvas);
    this.W = scene.scale.width;
    this.H = scene.scale.height;

    // Border
    this.border = scene.add.graphics()
      .setScrollFactor(0).setDepth(90);
    this.border.lineStyle(2, 0xaaaaaa, 0.9);
    this.border.strokeRect(this.W - this.size - 14, this.H - this.size - 14, this.size + 4, this.size + 4);
    this.border.fillStyle(0x000000, 0.5);
    this.border.fillRect(this.W - this.size - 14, this.H - this.size - 14, this.size + 4, this.size + 4);

    this.mapImg = scene.add.image(this.W - this.size/2 - 12, this.H - this.size/2 - 12, 'minimap_bg')
      .setScrollFactor(0).setDepth(91);

    this.dot = scene.add.graphics().setScrollFactor(0).setDepth(92);
  }

  _drawWorldMap() {
    const ctx = this.canvas.getContext('2d');
    const img = ctx.createImageData(this.size, this.size);
    for (let y = 0; y < this.size; y++) {
      for (let x = 0; x < this.size; x++) {
        const tx = Math.floor(x / this.scale);
        const ty = Math.floor(y / this.scale);
        const tile = this.world.getTile(tx, ty);
        const col = TILE_META[tile].color;
        const idx = (y * this.size + x) * 4;
        img.data[idx]   = (col >> 16) & 0xff;
        img.data[idx+1] = (col >> 8)  & 0xff;
        img.data[idx+2] = col & 0xff;
        img.data[idx+3] = 255;
      }
    }
    ctx.putImageData(img, 0, 0);
  }

  update(playerX, playerY) {
    const px = playerX / TILE_SIZE * this.scale;
    const py = playerY / TILE_SIZE * this.scale;
    const ox = this.W - this.size - 12;
    const oy = this.H - this.size - 12;

    this.dot.clear();
    this.dot.fillStyle(0xff3333, 1);
    this.dot.fillCircle(ox + px, oy + py, 3);
    // Field of view indicator
    this.dot.lineStyle(1, 0xffffff, 0.4);
    this.dot.strokeRect(ox + px - 10, oy + py - 7, 20, 14);
  }
}
