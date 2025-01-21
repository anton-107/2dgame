import Phaser from "phaser";

// const GRASS_TOP_LEFT_CORNER = 0;
// const GRASS_TOP_LEFT_CORNER_ALT = 6;
// const GRASS_TOP_BORDER = [1,2,3,4];
// const GRASS_TOP_RIGHT_CORNER = 5;
// const GRASS_TOP_RIGHT_CORNER_ALT = 7;
// const GRASS_LEFT_BORDER = [20, 40, 60, 80];

const GRASS_MIDDLE = [
  21, 22, 23, 24, 41, 42, 43, 44, 61, 62, 63, 64, 81, 82, 83, 84,
];
// const GRASS_RIGHT_BORDER = [25,45,65,85];
//
// const GRASS_BOTTOM_LEFT_CORNER = 100;
//
// const SAND_TOP_LEFT_CORNER = 10;
// const SAND_TOP_LEFT_CORNER_ALT = 16;
// const SAND_TOP_BORDER = [11,12,13,14];
// const SAND_TOP_RIGHT_CORNER = 15;
// const SAND_TOP_RIGHT_CORNER_ALT = 17;

// function to randomly pick element from a given array
function randomPick(array: number[]): number {
  if (!array || array.length === 0) {
    throw new Error("Array is empty or undefined");
  }

  const randomIndex = Math.floor(Math.random() * array.length);
  return array[randomIndex];
}

export default class Ground {
  // private sprite: Phaser.Types.Physics.Arcade.SpriteWithDynamicBody | undefined;
  private frameSize = 32;

  public loadSpritesheet(scene: Phaser.Scene) {
    scene.load.spritesheet(
      "terrain-ground-flat",
      "Terrain/Ground/Tilemap_Flat.png",
      {
        frameWidth: this.frameSize,
        frameHeight: this.frameSize,
      },
    );
  }
  public addToScene(scene: Phaser.Scene) {
    for (let i = 0; i < 13; i++) {
      // horizontal row
      for (let j = 0; j < 10; j++) {
        // vertical column
        scene.physics.add.sprite(
          this.frameSize / 2 + i * this.frameSize,
          this.frameSize / 2 + j * this.frameSize,
          "terrain-ground-flat",
          randomPick(GRASS_MIDDLE),
        );
      }
    }
  }
}
