import { GAME_WIDTH, GAME_HEIGHT, GRID_SIZE } from "../core/constants.js";

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

    if (playerImage) {
      this.ctx.drawImage(
        playerImage,
        player.frameSource,
        0,
        player.width,
        player.height,
        player.x,
        player.y,
        player.width * player.scale,
        player.height * player.scale,
      );
    } else {
      this.ctx.fillStyle = "#db0000";
      this.ctx.fillRect(player.x, player.y, player.width, player.height);
      this.ctx.strokeStyle = "white";
      this.ctx.strokeRect(player.x, player.y, player.width, player.height);
    }

    if (player.moving) {
      console.log(player.moving)
      this.animatePlayer(player, playerImage);
    }
  }

  animatePlayer(player, playerImage) {
    this.ctx.drawImage(
      playerImage,
      player.frameSource * 2,
      0,
      player.width,
      player.height,
      player.x,
      player.y,
      player.width * player.scale,
      player.height * player.scale,
    );

    /**
     * FIXME - Should double `player.frameSource` and repeat walking frames
     * LINK - Perhaps seperate spritesheets for seperate animations
    */
    if (player.gameFrame % player.staggerFrames === 0) {
      player.currentFrame = (player.currentFrame + 1) % player.totalFrames;
      player.frameSource * 2;
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
  }
}
