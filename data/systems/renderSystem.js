import {
  GAME_WIDTH,
  GAME_HEIGHT,
  GRID_SIZE,
  SPRITE_HEIGHT,
  SPRITE_WIDTH,
} from "../core/constants.js";

export class RenderSystem {
  constructor(cvs, imageManager) {
    this.cvs = cvs;
    this.ctx = cvs.getContext("2d");
    this.ctx.imageSmoothEnabled = false;

    this.imageManager = imageManager;
  }

  /**
   * Renders elements on the game canvas.
   * @param {object} player - Player object
   */
  render(player) {
    this.ctx.fillStyle = "#0b2d63";
    this.ctx.fillRect(0, 0, GAME_WIDTH, GAME_HEIGHT);

    this.renderGrid();
    this.renderPlayer(player);
  }

  /**
   * Have a wild fucking guess.
   * @param {object} player - Player object
   */
  renderPlayer(player) {
    const playerImage = this.imageManager.get("player");

    if (!playerImage) {
      this.ctx.fillStyle = "#db0000";
      this.ctx.fillRect(player.x, player.y, player.width, player.height);
      this.ctx.strokeStyle = "white";
      this.ctx.strokeRect(player.x, player.y, player.width, player.height);
    } else {
      this.animatePlayer(player, playerImage);
    }
  }

  animatePlayer(player, playerImage) {
    if (!player.moving) {
      let walkCycle = player.walkCycle;
      let frameIndex = (player.frameIndex = 0);
      let frame = (player.frame = walkCycle[frameIndex]);

      if (frameIndex === walkCycle.length) {
        frameIndex = 0;
      }

      this.ctx.drawImage(
        playerImage,
        frame.x,
        frame.y,
        SPRITE_WIDTH,
        SPRITE_HEIGHT,
        player.x,
        player.y,
        SPRITE_WIDTH * player.scale,
        SPRITE_HEIGHT * player.scale,
      );
    } else {
      let idle = player.idle;
      let frameIndex = (player.frameIndex = 0);
      let frame = (player.frame = idle[frameIndex]);

      this.ctx.drawImage(
        playerImage,
        frame.x,
        frame.y,
        SPRITE_WIDTH,
        SPRITE_HEIGHT,
        player.x,
        player.y,
        SPRITE_WIDTH * player.scale,
        SPRITE_HEIGHT * player.scale,
      );
    }
  }

  renderGrid() {
    //note^ I think this is just temporary, hence no docstring. This does help with centering stuff, tho.

    this.ctx.strokeStyle = "yellow";
    this.ctx.lineWidth = 1;

    for (let index = 0; index < GAME_WIDTH; index += GRID_SIZE) {
      this.ctx.beginPath();
      this.ctx.moveTo(index, 0);
      this.ctx.lineTo(index, GAME_HEIGHT);
      this.ctx.stroke();
    }

    for (let index = 0; index < GAME_HEIGHT; index += GRID_SIZE) {
      this.ctx.beginPath();
      this.ctx.moveTo(0, index);
      this.ctx.lineTo(GAME_WIDTH, index);
      this.ctx.stroke();
    }

    this.ctx.stroke();
  }
}
