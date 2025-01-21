import Phaser from "phaser";

export default class Warrior {
  private sprite: Phaser.Types.Physics.Arcade.SpriteWithDynamicBody | undefined;

  public loadSpritesheet(scene: Phaser.Scene) {
    scene.load.spritesheet(
      "warrior",
      "Factions/Knights/Troops/Warrior_Purple.png",
      {
        frameWidth: 192,
        frameHeight: 192,
      },
    );
  }
  public addToScene(scene: Phaser.Scene, x: number, y: number) {
    // Create the character sprite
    this.sprite = scene.physics.add.sprite(x, y, "warrior", 0);
    this.sprite.setScale(0.65);
    this.sprite.scaleX = -0.65;

    this.createAnimations(scene);
    this.sprite.play("idle");
  }

  private createAnimations(scene: Phaser.Scene) {
    scene.anims.create({
      key: "idle",
      frames: scene.anims.generateFrameNumbers("warrior", {
        frames: [0, 1, 2, 3, 4, 5],
      }),
      frameRate: 8,
      repeat: -1,
    });
  }
}
