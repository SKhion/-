import { WorldGenerator, TILE_SIZE, WORLD_SIZE } from '../world/WorldGenerator.js';
import { TileRenderer } from '../rendering/TileRenderer.js';
import { WaterOverlay }  from '../rendering/WaterOverlay.js';
import { AtmosphereOverlay } from '../rendering/AtmosphereOverlay.js';
import { Minimap }       from '../rendering/Minimap.js';
import { Player }        from '../entities/Player.js';
import { DayNightCycle } from '../systems/DayNightCycle.js';
import { WeatherSystem } from '../systems/WeatherSystem.js';

export class WorldScene extends Phaser.Scene {
  constructor() { super({ key: 'WorldScene' }); }

  preload() {
    // No external assets needed — everything is drawn procedurally
  }

  create() {
    this.cameras.main.setBackgroundColor('#061840');

    // Generate world
    this.world = new WorldGenerator(12345).generate();
    const spawn = this.world.getSpawnPoint();

    // Systems
    this.dayNight = new DayNightCycle();
    this.weather  = new WeatherSystem();

    // Renderers
    this.tileRenderer = new TileRenderer(this, this.world);
    this.waterOverlay = new WaterOverlay(this);
    this.atmosphere   = new AtmosphereOverlay(this);

    // Player
    this.player = new Player(this, spawn.x, spawn.y, this.world);

    // Day/night overlay
    this.dayNight.create(this);

    // Weather system
    this.weather.create(this);

    // Minimap (created last so texture exists)
    this.minimap = new Minimap(this, this.world);

    // Camera
    this.cameras.main.startFollow(this.player.container, true, 0.08, 0.08);
    this.cameras.main.setZoom(1.5);
    this.cameras.main.setBounds(0, 0, WORLD_SIZE * TILE_SIZE, WORLD_SIZE * TILE_SIZE);

    // Zoom with mouse wheel
    this.input.on('wheel', (_, __, ___, deltaY) => {
      const z = this.cameras.main.zoom;
      this.cameras.main.setZoom(Phaser.Math.Clamp(z - deltaY * 0.001, 0.4, 3));
    });

    // Board key
    this.input.keyboard.on('keydown-E', () => {
      const msg = this.player.tryBoard();
      if (msg) {
        const ui = this.scene.get('UIScene');
        if (ui?.showNotification) ui.showNotification(msg);
        // Zoom effect on board/depart
        this.tweens.add({
          targets: this.cameras.main,
          zoom: this.player.onShip ? 1.1 : 1.5,
          duration: 800,
          ease: 'Cubic.easeInOut',
        });
      }
    });

    // Mobile/touch virtual joystick hint
    this._addTouchInput();

    // Particle effects for docks
    this._setupDockMarkers();
  }

  _addTouchInput() {
    // Simple tap-to-move fallback (optional)
    this.touchTarget = null;
    this.input.on('pointerdown', (ptr) => {
      if (ptr.x < this.scale.width - 180 && ptr.y > 40) {
        // Could add touch movement here
      }
    });
  }

  _setupDockMarkers() {
    const g = this.add.graphics().setDepth(3);
    for (const dock of this.world.docks.slice(0, 40)) {
      g.fillStyle(0xffdd44, 0.5);
      g.fillTriangle(
        dock.x * TILE_SIZE + TILE_SIZE/2, dock.y * TILE_SIZE,
        dock.x * TILE_SIZE + 2, dock.y * TILE_SIZE + TILE_SIZE,
        dock.x * TILE_SIZE + TILE_SIZE - 2, dock.y * TILE_SIZE + TILE_SIZE
      );
    }
  }

  update(time, delta) {
    this.player.update(delta);
    this.tileRenderer.update(this.player.x, this.player.y, delta);
    this.waterOverlay.update(delta, this.cameras.main.scrollX, this.cameras.main.scrollY);
    this.dayNight.update(delta);
    this.weather.update(delta);
    this.atmosphere.update(time, this.dayNight);
    this.minimap.update(this.player.x, this.player.y);
  }
}
