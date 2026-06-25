import { TILE_META, TILE, WATER_TILES } from '../world/TileTypes.js';
import { WORLD_SIZE, TILE_SIZE } from '../world/WorldGenerator.js';

const CHUNK = 16; // tiles per chunk
const VIEW_CHUNKS = 6; // chunks around player to render

export class TileRenderer {
  constructor(scene, world) {
    this.scene = scene;
    this.world = world;
    this.chunks = new Map(); // "cx,cy" -> Graphics
    this.lastCX = -999; this.lastCY = -999;
    this.waveOffset = 0;
    this.container = scene.add.container(0, 0).setDepth(0);
  }

  update(playerX, playerY, delta) {
    this.waveOffset += delta * 0.001;
    const cx = Math.floor(playerX / (CHUNK * TILE_SIZE));
    const cy = Math.floor(playerY / (CHUNK * TILE_SIZE));

    if (cx !== this.lastCX || cy !== this.lastCY) {
      this._rebuildChunks(cx, cy);
      this.lastCX = cx; this.lastCY = cy;
    }
    this._animateWater();
  }

  _rebuildChunks(cx, cy) {
    const needed = new Set();
    for (let dy = -VIEW_CHUNKS; dy <= VIEW_CHUNKS; dy++) {
      for (let dx = -VIEW_CHUNKS; dx <= VIEW_CHUNKS; dx++) {
        const key = `${cx+dx},${cy+dy}`;
        needed.add(key);
        if (!this.chunks.has(key)) {
          this._buildChunk(cx+dx, cy+dy, key);
        }
      }
    }
    for (const [key, g] of this.chunks) {
      if (!needed.has(key)) {
        g.destroy();
        this.chunks.delete(key);
      }
    }
  }

  _buildChunk(cx, cy, key) {
    const g = this.scene.add.graphics();
    const startX = cx * CHUNK;
    const startY = cy * CHUNK;

    for (let ty = startY; ty < startY + CHUNK; ty++) {
      for (let tx = startX; tx < startX + CHUNK; tx++) {
        const tileType = this.world.getTile(tx, ty);
        const meta = TILE_META[tileType];
        const variation = this._tileVariation(tx, ty);
        const color = this._blendColor(meta.color, meta.darkColor, variation * 0.3);
        g.fillStyle(color, 1);
        g.fillRect(tx * TILE_SIZE, ty * TILE_SIZE, TILE_SIZE, TILE_SIZE);

        // Shore foam on shallow water adjacent to beach
        if (tileType === TILE.SHALLOW) {
          this._drawFoam(g, tx, ty, 0.3);
        }

        // Texture details
        if (tileType === TILE.FOREST) {
          this._drawTree(g, tx, ty, variation);
        } else if (tileType === TILE.MOUNTAIN) {
          this._drawMountainLine(g, tx, ty);
        } else if (tileType === TILE.SNOW) {
          this._drawSnowCap(g, tx, ty);
        } else if (tileType === TILE.PLAINS) {
          this._drawGrass(g, tx, ty, variation);
        }
      }
    }

    this.chunks.set(key, g);
  }

  _tileVariation(tx, ty) {
    // deterministic pseudo-random from tile coords
    const h = Math.sin(tx * 127.1 + ty * 311.7) * 43758.5453;
    return h - Math.floor(h);
  }

  _blendColor(c1, c2, t) {
    const r1=(c1>>16)&0xff, g1=(c1>>8)&0xff, b1=c1&0xff;
    const r2=(c2>>16)&0xff, g2=(c2>>8)&0xff, b2=c2&0xff;
    return (Math.round(r1+(r2-r1)*t)<<16)|(Math.round(g1+(g2-g1)*t)<<8)|Math.round(b1+(b2-b1)*t);
  }

  _drawFoam(g, tx, ty, alpha) {
    g.fillStyle(0xffffff, alpha);
    g.fillRect(tx*TILE_SIZE, ty*TILE_SIZE + TILE_SIZE*0.8, TILE_SIZE, TILE_SIZE*0.2);
  }

  _drawTree(g, tx, ty, v) {
    const px = tx*TILE_SIZE + TILE_SIZE*0.5 + (v-0.5)*8;
    const py = ty*TILE_SIZE + TILE_SIZE*0.6;
    const size = 6 + v * 5;
    g.fillStyle(0x1a5010, 0.8);
    g.fillTriangle(px, py-size, px-size*0.7, py+size*0.3, px+size*0.7, py+size*0.3);
    g.fillStyle(0x0d3008, 0.6);
    g.fillRect(px-2, py+size*0.3, 4, size*0.4);
  }

  _drawMountainLine(g, tx, ty) {
    const px = tx*TILE_SIZE, py = ty*TILE_SIZE;
    g.lineStyle(1, 0x5a4a3a, 0.4);
    g.beginPath();
    g.moveTo(px+4, py+TILE_SIZE-4);
    g.lineTo(px+TILE_SIZE/2, py+4);
    g.lineTo(px+TILE_SIZE-4, py+TILE_SIZE-4);
    g.strokePath();
  }

  _drawSnowCap(g, tx, ty) {
    const px = tx*TILE_SIZE, py = ty*TILE_SIZE;
    g.fillStyle(0xffffff, 0.6);
    g.fillTriangle(px+TILE_SIZE*0.5, py+2, px+TILE_SIZE*0.2, py+TILE_SIZE*0.5, px+TILE_SIZE*0.8, py+TILE_SIZE*0.5);
  }

  _drawGrass(g, tx, ty, v) {
    if (v < 0.4) return;
    const px = tx*TILE_SIZE + v*TILE_SIZE*0.8;
    const py = ty*TILE_SIZE + TILE_SIZE*0.6;
    g.lineStyle(1, 0x3a8020, 0.5);
    g.lineBetween(px, py, px-2, py-5);
    g.lineBetween(px+6, py, px+8, py-4);
  }

  _animateWater() {
    // Animate all water chunks with a wave shimmer
    for (const [key, g] of this.chunks) {
      // Water animation is achieved via the overlay alpha pulsing
    }
  }

  destroyAll() {
    for (const [, g] of this.chunks) g.destroy();
    this.chunks.clear();
  }
}
