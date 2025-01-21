import * as Phaser from "phaser";

type MainCharacterMovement =
  | "stopped"
  | "walking-up"
  | "walking-down"
  | "walking-left"
  | "walking-right";

export default class MainCharacter {
  private sprite: Phaser.Types.Physics.Arcade.SpriteWithDynamicBody | undefined;
  private width =16;
  private height = 24;
  private speed = 200;
  private currentMovement: MainCharacterMovement = "stopped";

  public loadSpritesheet(scene: Phaser.Scene) {
    scene.load.spritesheet("guy", "guy.png", {
      frameWidth: this.width,
      frameHeight: this.height,
    });
  }

  public addToScene(scene: Phaser.Scene, x: number, y: number) {
    // Create the character sprite
    this.sprite = scene.physics.add.sprite(x, y, "guy", 1);
    this.sprite.setScale(1.5); // Make the sprite twice as big

    // Adjust the physics body size to better match the visible sprite
    this.sprite.body.setSize(this.width, this.height); // Adjust these values based on your needs
    this.sprite.body.offset.set(0, 0); // Adjust these values to center the hitbox

    // Prevent character from moving outside the scene boundaries
    this.sprite.setCollideWorldBounds(true);

    this.createAnimations(scene);
  }

  public getSprite() {
    return this.sprite;
  }

  public setMovement(movement: MainCharacterMovement) {
    this.currentMovement = movement;
  }

  private createAnimations(scene: Phaser.Scene) {
    scene.anims.create({
      key: "up",
      frames: scene.anims.generateFrameNumbers("guy", {
        frames: [12, 13, 14, 15],
      }),
      frameRate: 8,
      repeat: -1,
    });

    scene.anims.create({
      key: "down",
      frames: scene.anims.generateFrameNumbers("guy", { frames: [0, 1, 2, 3] }),
      frameRate: 8,
      repeat: -1,
    });

    scene.anims.create({
      key: "left",
      frames: scene.anims.generateFrameNumbers("guy", {
        frames: [8, 9, 10, 11],
      }),
      frameRate: 8,
      repeat: -1,
    });

    scene.anims.create({
      key: "right",
      frames: scene.anims.generateFrameNumbers("guy", { frames: [4, 5, 6, 7] }),
      frameRate: 8,
      repeat: -1,
    });
  }

  public update() {
    if (!this.sprite) {
      return;
    }
    // Reset character's velocity
    this.sprite.setVelocity(0);

    // Move character based on arrow key inputs
    if (this.currentMovement === "walking-up") {
      this.sprite.setVelocityY(-this.speed);
      this.sprite.play("up", true);
    } else if (this.currentMovement === "walking-down") {
      this.sprite.setVelocityY(this.speed);
      this.sprite.play("down", true);
    } else if (this.currentMovement === "walking-left") {
      this.sprite.setVelocityX(-this.speed);
      this.sprite.play("left", true);
    } else if (this.currentMovement === "walking-right") {
      this.sprite.setVelocityX(this.speed);
      this.sprite.play("right", true);
    } else {
      this.sprite.anims.stop();
      this.sprite.setFrame(0); // Reset to frame 0 when stopped
    }
  }
}
