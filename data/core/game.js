import { GAME_HEIGHT, GAME_WIDTH, DEBUG } from "./constants.js";
import { RenderSystem } from "../systems/renderSystem.js";
import { Player } from "../entities/player.js";
import { ImageManager } from "../managers/imageManager.js";

export class Game {
  constructor() {
    this.cvs = document.getElementById("canvas");
    this.ctx = this.cvs.getContext("2d");

    this.imageManager = new ImageManager();
    this.player = new Player(this.cvs, this.imageManager);
    this.renderSystem = new RenderSystem(this.cvs, this.imageManager);

    this.imageManager.loadAll();

    this.keys = {};
    this.prevTime = 0;

    this.init();
  }

  init() {
    this.resizeCanvas();
    window.addEventListener("resize", () => this.resizeCanvas());

    this.handleInput();

    //* Start game loop
    this.prevFrame = performance.now();
    requestAnimationFrame((timestamp) => this.gameLoop(timestamp));
  }

  gameLoop(timestamp) {
    const deltaTime = Math.min((timestamp - this.prevFrame) / 1000, 0.1);

    this.prevFrame = timestamp;

    this.update(deltaTime);

    this.renderSystem.render(this.player, this.imageManager);

    requestAnimationFrame((timestamp) => this.gameLoop(timestamp));

    if (DEBUG) {
      this.debug()
    }
  }

  update(deltaTime) {
    this.player.update(deltaTime, this.keys);
  }

  handleInput() {
    window.addEventListener("keydown", (event) => {
      this.keys[event.key.toLowerCase()] = true;
    });

    window.addEventListener("keyup", (event) => {
      this.keys[event.key.toLowerCase()] = false;
    });

    window.addEventListener("blur" || "contextmenu", () => {
      this.keys = {};
    });
  }

  resizeCanvas() {
    // I really don't think this is very efficient when CSS exists, but here we are
    const ratio = 16 / 9;
    let width, height;
    const margin = 5;

    const availableWidth = window.innerWidth - margin * 2;
    const availableHeight = window.innerHeight - margin * 2;

    if (availableWidth / availableHeight > ratio) {
      height = availableHeight;
      width = height * ratio;
    } else {
      width = availableWidth;
      height = width * ratio;
    }

    this.cvs.height = GAME_HEIGHT;
    this.cvs.width = GAME_WIDTH;
  }


  debug() {
    console.log(`Player moving: ${this.player.moving}`)
  }
}
