import Phaser from "phaser";

export default class Warrior {
  private sprite: Phaser.Types.Physics.Arcade.SpriteWithDynamicBody | undefined;
  private width = 192;
  private height = 192;

  public loadSpritesheet(scene: Phaser.Scene) {
    scene.load.spritesheet(
      "warrior",
      "Factions/Knights/Troops/Warrior_Purple.png",
      {
        frameWidth: this.width,
        frameHeight: this.height,
      },
    );
  }

  public addToScene(scene: Phaser.Scene, x: number, y: number) {
    // Create the character sprite
    this.sprite = scene.physics.add.sprite(x, y, "warrior", 0);
    this.sprite.setScale(0.65);
    this.sprite.scaleX = -0.65;

    // Enable physics body and make it immovable
    this.sprite.setImmovable(true);

    // Adjust the physics body size to better match the visible sprite
    this.sprite.body.setSize(this.width / 2, 50); // Adjust these values based on your needs
    this.sprite.body.offset.set((this.width / 4) * 3, this.height / 4 + 30); // Adjust these values to center the hitbox

    this.createAnimations(scene);
    this.sprite.play("idle");
  }

  public getSprite() {
    return this.sprite;
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
