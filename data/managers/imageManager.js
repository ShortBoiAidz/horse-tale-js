export class ImageManager {
  constructor() {
    this.images = {};
  }


  /**
* Loads images from `loadAll()`.
* @param {string} name - Name of the image. This is a variable.
* @param {string} path - I shouldn't even need to explain this, dipshit.
*/
  load(name, path) {
    const img = new Image();
    img.src = path;

    this.images[name] = { img, loaded:false };

    img.onload = () => {
      this.images[name].loaded = true;
      console.log(`Image loaded: ${name}`)
    }

    img.onerror = () => {
      console.log(`Failed to load image: ${name} (will use fallback)`);
    }
  }


/**
* ...gets the images??? What do I even say here?
* @param {string} name - Name of the image. This is a variable.
* @return {object} Checks the condition `images[name].loaded`. If true, returns the `img` value of `this.images`. If false, returns null.
*/
  get(name) {
    return this.images[name]?.loaded ? this.images[name].img : null;
  }

/**
 * Loads all of the images
 */
  loadAll() {
    this.load("player", "/assets/images/player/spritesheet.png");
  }
}