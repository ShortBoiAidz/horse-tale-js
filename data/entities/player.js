import { GAME_WIDTH, GAME_HEIGHT } from "../core/constants.js";

export class Player {
  constructor() {
    this.width = 20;
    this.height = 42;

    this.scale = 2

    this.x = (GAME_WIDTH - this.width) / 2;
    this.y = (GAME_HEIGHT - this.height) / 2;

    this.speed = 300;

    this.speedMultiplier = 1
  }

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
