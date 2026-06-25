export const lerp = (a, b, t) => a + (b - a) * t;
export const clamp = (v, min, max) => Math.max(min, Math.min(max, v));
export const smoothstep = (t) => t * t * (3 - 2 * t);
export const dist = (x1, y1, x2, y2) => Math.sqrt((x2-x1)**2 + (y2-y1)**2);
export const worldToTile = (wx, wy, tileSize) => ({
  tx: Math.floor(wx / tileSize),
  ty: Math.floor(wy / tileSize)
});
