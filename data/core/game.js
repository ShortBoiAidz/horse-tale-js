import { GAME_HEIGHT, GAME_WIDTH } from "./constants.js";
import { RenderSystem } from "../systems/renderSystem.js";
import { Player } from "../entities/player.js";

export class Game {
  constructor() {
    this.cvs = document.getElementById("canvas");
    this.ctx = this.cvs.getContext("2d");

    this.player = new Player();
    this.renderSystem = new RenderSystem(this.cvs);

    this.keys = {}

    this.init();
  }


  init() {
    this.resizeCanvas();
    window.addEventListener('resize', () => this.resizeCanvas());

    this.handleInput()

    //* Start game loop
    requestAnimationFrame((timestamp) => this.gameLoop());
  }


  update() {
    this.player.update(this.keys)
  }


  handleInput() {
    window.addEventListener('keydown', (event) => {
      this.keys[event.key.toLowerCase()] = true;
    });

    window.addEventListener('keyup', (event) => {
      this.keys[event.key.toLowerCase()] = false;
    });
  }


  resizeCanvas() {
    const ratio = 16/9;
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


  gameLoop(timestamp) {
    this.update();
    this.renderSystem.render(this.player);
    requestAnimationFrame((timestamp) => this.gameLoop(timestamp));
  }

}