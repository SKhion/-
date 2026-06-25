export const TILE = {
  DEEP_OCEAN:    0,
  OCEAN:         1,
  SHALLOW:       2,
  BEACH:         3,
  PLAINS:        4,
  FOREST:        5,
  MOUNTAIN:      6,
  SNOW:          7,
  RIVER:         8,
};

export const TILE_META = {
  [TILE.DEEP_OCEAN]:  { name: '深海',     walkable: false, sailable: true,  color: 0x0a2a6e, darkColor: 0x061840 },
  [TILE.OCEAN]:       { name: '大洋',     walkable: false, sailable: true,  color: 0x1a4fa8, darkColor: 0x0d2d6e },
  [TILE.SHALLOW]:     { name: '浅瀬',     walkable: false, sailable: true,  color: 0x3a7fd5, darkColor: 0x1e4a8a },
  [TILE.BEACH]:       { name: '砂浜',     walkable: true,  sailable: false, color: 0xe8d5a0, darkColor: 0xb8a870 },
  [TILE.PLAINS]:      { name: '草原',     walkable: true,  sailable: false, color: 0x5a9e3a, darkColor: 0x3a6e28 },
  [TILE.FOREST]:      { name: '森林',     walkable: true,  sailable: false, color: 0x2d6e20, darkColor: 0x1a4014 },
  [TILE.MOUNTAIN]:    { name: '山岳',     walkable: true,  sailable: false, color: 0x7a6a5a, darkColor: 0x4a3e30 },
  [TILE.SNOW]:        { name: '雪山',     walkable: true,  sailable: false, color: 0xe8eef5, darkColor: 0xb0bcc8 },
  [TILE.RIVER]:       { name: '川',       walkable: false, sailable: false, color: 0x5aaad5, darkColor: 0x2a6a9a },
};

export const WATER_TILES = new Set([TILE.DEEP_OCEAN, TILE.OCEAN, TILE.SHALLOW]);
export const LAND_TILES  = new Set([TILE.BEACH, TILE.PLAINS, TILE.FOREST, TILE.MOUNTAIN, TILE.SNOW]);
