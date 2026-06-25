import { TILE_META, WATER_TILES, LAND_TILES } from '../world/TileTypes.js';
import { WORLD_SIZE, TILE_SIZE } from '../world/WorldGenerator.js';
import { clamp } from '../utils/MathUtils.js';

const SPEED = 120;
const DIAG  = SPEED * 0.707;

export class Player {
  constructor(scene, x, y, world) {
    this.scene = scene;
    this.world = world;
    this.x = x;
    this.y = y;
    this.vx = 0;
    this.vy = 0;
    this.onShip = false;
    this.facing = 'down';
    this.animFrame = 0;
    this.animTimer = 0;
    this.isMoving = false;

    this._buildGraphics();
    this._setupInput();
  }

  _buildGraphics() {
    this.container = this.scene.add.container(this.x, this.y).setDepth(10);

    // Shadow
    this.shadow = this.scene.add.ellipse(0, 10, 20, 8, 0x000000, 0.25);
    // Body
    this.body = this.scene.add.graphics();
    // Name
    this.nameText = this.scene.add.text(0, -28, '旅人', {
      fontSize: '10px', color: '#fff',
      stroke: '#000', strokeThickness: 2
    }).setOrigin(0.5);

    this.container.add([this.shadow, this.body, this.nameText]);
    this._drawPlayerSprite('down', false);
  }

  _drawPlayerSprite(dir, moving) {
    const g = this.body;
    g.clear();

    // Cape / cloak (back)
    g.fillStyle(0x3a2060, 1);
    g.fillEllipse(0, 4, 22, 28);

    // Body
    g.fillStyle(0x5a3a90, 1);
    g.fillRoundedRect(-8, -8, 16, 20, 3);

    // Head
    g.fillStyle(0xf0c880, 1);
    g.fillCircle(0, -14, 9);

    // Hair
    g.fillStyle(0x2a1a00, 1);
    g.fillArc(-9, -18, 9, -30, 180, false);

    // Eyes based on direction
    if (dir !== 'up') {
      g.fillStyle(0x1a0a40, 1);
      g.fillCircle(-3, -13, 2);
      g.fillCircle(3, -13, 2);
      // Mouth
      g.lineStyle(1, 0xc08060, 0.8);
      g.beginPath();
      g.arc(0, -10, 3, 0, Math.PI);
      g.strokePath();
    }

    // Belt
    g.lineStyle(2, 0x2a1800, 0.8);
    g.lineBetween(-8, 3, 8, 3);

    // Legs with walk animation
    const legPhase = moving ? Math.sin(this.animFrame * 0.5) : 0;
    g.fillStyle(0x2a1a60, 1);
    g.fillRect(-7, 12, 6, 10 + legPhase * 3);
    g.fillRect(1, 12, 6, 10 - legPhase * 3);

    // Shoes
    g.fillStyle(0x1a0a00, 1);
    g.fillRect(-8, 22 + legPhase * 3, 8, 4);
    g.fillRect(0, 22 - legPhase * 3, 8, 4);

    // Sword
    g.lineStyle(2, 0xaaaacc, 1);
    g.lineBetween(10, -5, 16, 16);
    g.fillStyle(0x888800, 1);
    g.fillRect(8, 3, 6, 3);
  }

  _drawShipSprite() {
    const g = this.body;
    g.clear();

    // Hull
    g.fillStyle(0x6a3810, 1);
    g.fillEllipse(0, 8, 48, 22);
    g.fillStyle(0x8a5020, 1);
    g.fillRect(-20, -2, 40, 12);

    // Mast
    g.lineStyle(3, 0x5a3010, 1);
    g.lineBetween(0, -30, 0, 14);

    // Main sail
    g.fillStyle(0xf5e8c0, 0.9);
    g.fillTriangle(0, -28, -22, 2, 0, 2);
    g.fillStyle(0xe8d8a0, 0.9);
    g.fillTriangle(0, -28, 22, 2, 0, 2);

    // Sail line detail
    g.lineStyle(1, 0xc0a870, 0.5);
    g.lineBetween(0, -28, -18, 0);
    g.lineBetween(0, -28, 18, 0);

    // Flag
    g.fillStyle(0xcc2020, 1);
    g.fillTriangle(0, -30, 10, -24, 0, -18);

    // Bow ornament
    g.fillStyle(0xc08030, 1);
    g.fillCircle(0, -5, 4);
  }

  _setupInput() {
    this.keys = this.scene.input.keyboard.addKeys({
      up: Phaser.Input.Keyboard.KeyCodes.W,
      down: Phaser.Input.Keyboard.KeyCodes.S,
      left: Phaser.Input.Keyboard.KeyCodes.A,
      right: Phaser.Input.Keyboard.KeyCodes.D,
      upArr: Phaser.Input.Keyboard.KeyCodes.UP,
      downArr: Phaser.Input.Keyboard.KeyCodes.DOWN,
      leftArr: Phaser.Input.Keyboard.KeyCodes.LEFT,
      rightArr: Phaser.Input.Keyboard.KeyCodes.RIGHT,
      board: Phaser.Input.Keyboard.KeyCodes.E,
    });
  }

  update(delta) {
    const dt = delta / 1000;
    let dx = 0, dy = 0;

    if (this.keys.left.isDown  || this.keys.leftArr.isDown)  { dx = -1; this.facing = 'left'; }
    if (this.keys.right.isDown || this.keys.rightArr.isDown) { dx =  1; this.facing = 'right'; }
    if (this.keys.up.isDown    || this.keys.upArr.isDown)    { dy = -1; this.facing = 'up'; }
    if (this.keys.down.isDown  || this.keys.downArr.isDown)  { dy =  1; this.facing = 'down'; }

    const moving = dx !== 0 || dy !== 0;
    const speed = this.onShip ? SPEED * 1.8 : SPEED;

    if (dx !== 0 && dy !== 0) { dx *= 0.707; dy *= 0.707; }

    const nx = this.x + dx * speed * dt;
    const ny = this.y + dy * speed * dt;

    if (this._canMoveTo(nx, this.y)) this.x = nx;
    if (this._canMoveTo(this.x, ny)) this.y = ny;

    this.x = clamp(this.x, 0, WORLD_SIZE * TILE_SIZE);
    this.y = clamp(this.y, 0, WORLD_SIZE * TILE_SIZE);

    this.container.setPosition(this.x, this.y);

    this.isMoving = moving;
    if (moving) {
      this.animTimer += delta;
      if (this.animTimer > 80) { this.animFrame++; this.animTimer = 0; }
    } else {
      this.animFrame = 0;
    }

    if (this.onShip) {
      this._drawShipSprite();
    } else {
      this._drawPlayerSprite(this.facing, moving);
    }
  }

  _canMoveTo(wx, wy) {
    const tx = Math.floor(wx / TILE_SIZE);
    const ty = Math.floor(wy / TILE_SIZE);
    const tile = this.world.getTile(tx, ty);
    const meta = TILE_META[tile];
    if (this.onShip) return meta.sailable;
    return meta.walkable;
  }

  tryBoard() {
    // Check if near water when on land, or near beach when on ship
    const tx = Math.floor(this.x / TILE_SIZE);
    const ty = Math.floor(this.y / TILE_SIZE);
    const neighbors = [
      this.world.getTile(tx-1, ty), this.world.getTile(tx+1, ty),
      this.world.getTile(tx, ty-1), this.world.getTile(tx, ty+1),
    ];

    if (!this.onShip) {
      const hasWater = neighbors.some(t => WATER_TILES.has(t));
      if (hasWater) { this.onShip = true; return '乗船しました'; }
    } else {
      const hasLand = neighbors.some(t => LAND_TILES.has(t));
      if (hasLand) { this.onShip = false; return '上陸しました'; }
    }
    return null;
  }

  getTileInfo() {
    const tx = Math.floor(this.x / TILE_SIZE);
    const ty = Math.floor(this.y / TILE_SIZE);
    const tile = this.world.getTile(tx, ty);
    return TILE_META[tile]?.name || '不明';
  }
}
