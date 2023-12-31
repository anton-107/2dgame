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
    this.character = this.physics.add.sprite(400, 300, "guy");

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
