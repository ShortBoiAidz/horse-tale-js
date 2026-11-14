import { GAME_WIDTH, GAME_HEIGHT, BORDER_WIDTH, SPACING_WIDTH, SPRITE_HEIGHT, SPRITE_WIDTH } from "../core/constants.js";
import { RenderSystem } from "../systems/renderSystem.js";

export class Player {
  constructor(cvs, imageManager) {
    this.renderSystem = new RenderSystem(cvs, imageManager);

    this.width = 20;
    this.height = 42;

    this.scale = 2;

    this.x = (GAME_WIDTH - this.width) / 2;
    this.y = (GAME_HEIGHT - this.height) / 2;

    this.speed = 300;

    this.speedMultiplier = 1;

    this.moving = false;

    this.row = 0;
    this.column = 0;

    this.playerMove1 = this.spritePositionToImagePosition(0, 2);
    this.playerMove2 = this.spritePositionToImagePosition(0, 3);
    this.playerIdle = this.spritePositionToImagePosition(0, 4);

    this.walkCycle = [this.playerMove1, this.playerMove2];
    this.idle = [this.playerIdle];

    this.frameIndex = 0;
    this.frame;
  }

  spritePositionToImagePosition(row, col) {
    return {
      x: col * (SPRITE_WIDTH),
      y: row * (SPRITE_HEIGHT),
    };
  }

  /**
   * Updates player position based on keypress; prevents the player from overshooting the canvas.
   * @param {number} deltaTime - Independent frame rate based on refresh rate.
   * @param {object} keys - Object storing keypress values.
   */
  update(deltaTime, keys) {
    let dx = 0,
      dy = 0;

    const up = keys["w"] || keys["arrowup"];
    const down = keys["s"] || keys["arrowdown"];
    const left = keys["a"] || keys["arrowleft"];
    const right = keys["d"] || keys["arrowright"];

    if (up) dy -= 1;
    if (down) dy += 1;
    if (left) dx -= 1;
    if (right) dx += 1;

    if (up || down || left || right) {
      this.moving = true;
      this.frameIndex++;
    } else {
      this.moving = false;
    }

    //* Normalise diagonal movement
    if (dx || dy) {
      const len = Math.sqrt(dx * dx + dy * dy);
      dx /= len;
      dy /= len;

      this.x += dx * this.speed * this.speedMultiplier * deltaTime;
      this.y += dy * this.speed * this.speedMultiplier * deltaTime;
    }

    this.x = Math.max(0, Math.min(GAME_WIDTH - this.width, this.x));
    this.y = Math.max(0, Math.min(GAME_HEIGHT - this.height, this.y));
  }
}
