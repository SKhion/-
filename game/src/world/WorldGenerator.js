import { SimplexNoise, octaveNoise } from '../utils/NoiseUtils.js';
import { TILE } from './TileTypes.js';

export const WORLD_SIZE = 512;
export const TILE_SIZE = 32;

export class WorldGenerator {
  constructor(seed = 42) {
    this.seed = seed;
    this.heightNoise = new SimplexNoise(seed);
    this.detailNoise = new SimplexNoise(seed * 1.618);
    this.moistureNoise = new SimplexNoise(seed * 3.14);
    this.heightMap = new Float32Array(WORLD_SIZE * WORLD_SIZE);
    this.tileMap = new Uint8Array(WORLD_SIZE * WORLD_SIZE);
    this.docks = [];
  }

  generate() {
    const cx = WORLD_SIZE / 2, cy = WORLD_SIZE / 2;
    const maxDist = WORLD_SIZE * 0.48;

    for (let y = 0; y < WORLD_SIZE; y++) {
      for (let x = 0; x < WORLD_SIZE; x++) {
        const nx = x / WORLD_SIZE * 4;
        const ny = y / WORLD_SIZE * 4;

        const h = octaveNoise(this.heightNoise, nx, ny, 7, 0.5, 2.0) * 0.5 + 0.5;
        const d = octaveNoise(this.detailNoise, nx * 2, ny * 2, 4, 0.4, 2.5) * 0.5 + 0.5;
        const combined = h * 0.7 + d * 0.3;

        // Radial falloff — creates ocean edges
        const dx = (x - cx) / maxDist;
        const dy = (y - cy) / maxDist;
        const radial = Math.sqrt(dx * dx + dy * dy);
        const falloff = 1 - Math.pow(Math.max(0, radial - 0.3) / 0.7, 1.5);

        this.heightMap[y * WORLD_SIZE + x] = combined * falloff;
      }
    }

    this._classifyTiles();
    this._findDocks();
    return this;
  }

  _classifyTiles() {
    for (let i = 0; i < WORLD_SIZE * WORLD_SIZE; i++) {
      const h = this.heightMap[i];
      if      (h < 0.30) this.tileMap[i] = TILE.DEEP_OCEAN;
      else if (h < 0.40) this.tileMap[i] = TILE.OCEAN;
      else if (h < 0.46) this.tileMap[i] = TILE.SHALLOW;
      else if (h < 0.50) this.tileMap[i] = TILE.BEACH;
      else if (h < 0.66) this.tileMap[i] = TILE.PLAINS;
      else if (h < 0.78) this.tileMap[i] = TILE.FOREST;
      else if (h < 0.88) this.tileMap[i] = TILE.MOUNTAIN;
      else               this.tileMap[i] = TILE.SNOW;
    }
  }

  _findDocks() {
    const checked = new Set();
    for (let y = 1; y < WORLD_SIZE - 1; y += 8) {
      for (let x = 1; x < WORLD_SIZE - 1; x += 8) {
        const idx = y * WORLD_SIZE + x;
        if (this.tileMap[idx] === TILE.BEACH && !checked.has(idx)) {
          const neighbors = [
            this.tileMap[(y-1)*WORLD_SIZE + x],
            this.tileMap[(y+1)*WORLD_SIZE + x],
            this.tileMap[y*WORLD_SIZE + (x-1)],
            this.tileMap[y*WORLD_SIZE + (x+1)],
          ];
          if (neighbors.some(t => t === TILE.SHALLOW || t === TILE.OCEAN)) {
            this.docks.push({ x, y });
            checked.add(idx);
          }
        }
      }
    }
  }

  getTile(tx, ty) {
    if (tx < 0 || ty < 0 || tx >= WORLD_SIZE || ty >= WORLD_SIZE) return TILE.DEEP_OCEAN;
    return this.tileMap[ty * WORLD_SIZE + tx];
  }

  getHeight(tx, ty) {
    if (tx < 0 || ty < 0 || tx >= WORLD_SIZE || ty >= WORLD_SIZE) return 0;
    return this.heightMap[ty * WORLD_SIZE + tx];
  }

  getSpawnPoint() {
    for (let y = WORLD_SIZE/2 - 30; y < WORLD_SIZE/2 + 30; y++) {
      for (let x = WORLD_SIZE/2 - 30; x < WORLD_SIZE/2 + 30; x++) {
        if (this.getTile(x, y) === TILE.PLAINS) {
          return { x: x * TILE_SIZE + TILE_SIZE/2, y: y * TILE_SIZE + TILE_SIZE/2 };
        }
      }
    }
    return { x: WORLD_SIZE/2 * TILE_SIZE, y: WORLD_SIZE/2 * TILE_SIZE };
  }
}
