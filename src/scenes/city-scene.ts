import * as Phaser from "phaser";

export default class CityScene extends Phaser.Scene {
  private cursorsKeys: Phaser.Types.Input.Keyboard.CursorKeys;
  private character: Phaser.Types.Physics.Arcade.SpriteWithDynamicBody;
  constructor() {
    super("city");
  }
  preload() {
    this.load.spritesheet("guy", "guy.png", {
      frameWidth: 16,
      frameHeight: 24,
    });
  }
  create() {
    // Create the character sprite
    this.character = this.physics.add.sprite(400, 300, "guy", 1);

    // Create animations for all directions
    this.anims.create({
      key: "up",
      frames: this.anims.generateFrameNumbers("guy", { frames: [12, 13, 14, 15] }),
      frameRate: 8,
      repeat: -1
    });

    this.anims.create({
      key: "down",
      frames: this.anims.generateFrameNumbers("guy", { frames: [0, 1, 2, 3] }),
      frameRate: 8,
      repeat: -1
    });

    this.anims.create({
      key: "left",
      frames: this.anims.generateFrameNumbers("guy", { frames: [8, 9, 10, 11] }),
      frameRate: 8,
      repeat: -1
    });

    this.anims.create({
      key: "right",
      frames: this.anims.generateFrameNumbers("guy", { frames: [4, 5, 6, 7] }),
      frameRate: 8,
      repeat: -1
    });

    // Enable keyboard input
    if (!this.input) {
      throw "Input should be defined";
    }
    if (!this.input.keyboard) {
      throw "Keyboard input should be defined";
    }
    this.cursorsKeys = this.input.keyboard.createCursorKeys();
  }
  update() {
    const speed = 200; // Adjust as needed

    // Reset character's velocity
    this.character.setVelocity(0);

    // Move character based on arrow key inputs
    if (this.cursorsKeys.up?.isDown) {
      this.character.setVelocityY(-speed);
      this.character.play("up", true);
    } else if (this.cursorsKeys.down?.isDown) {
      this.character.setVelocityY(speed);
      this.character.play("down", true);
    }

    if (this.cursorsKeys.left?.isDown) {
      this.character.setVelocityX(-speed);
      this.character.play("left", true);
    } else if (this.cursorsKeys.right?.isDown) {
      this.character.setVelocityX(speed);
      this.character.play("right", true);
    } else {
      this.character.anims.stop();
    }
  }
}