import { GAME_WIDTH, GAME_HEIGHT } from "../core/constants.js";

export class Player {
  constructor() {
    this.x = 0;
    this.y = 0;

    this.width = 64;
    this.height = 64;
    this.speed = 5;
  }

  update(keys) {
    let dx = 0,
      dy = 0;

    if (keys["w"] || keys["arrowup"]) dy -= 1;
    if (keys["s"] || keys["arrowdown"]) dy += 1;
    if (keys["a"] || keys["arrowleft"]) dx -= 1;
    if (keys["d"] || keys["arrowright"]) dx += 1;

    //* Normalise diagonal movement
    if (dx || dy) {
      const len = Math.sqrt(dx * dx + dy * dy);
      dx /= len;
      dy /= len;

      this.x += dx * this.speed;
      this.y += dy * this.speed;
    }

    this.x = Math.max(0, Math.min(GAME_WIDTH - this.width, this.x));
    this.y = Math.max(0, Math.min(GAME_HEIGHT - this.height, this.y));
  }
}
