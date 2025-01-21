import * as Phaser from "phaser";

import MainCharacter from "../characters/main-character";

export default class CityScene extends Phaser.Scene {
  private character: MainCharacter | undefined;
  private cursorsKeys: Phaser.Types.Input.Keyboard.CursorKeys | undefined;

  constructor() {
    super("city");
  }

  preload() {
    this.load.spritesheet("guy", "guy.png", {
      frameWidth: 16,
      frameHeight: 24,
    });
  }

  public create() {
    this.character = new MainCharacter();
    this.character.addToScene(this);

    this.initializeCursorKeys();
  }

  public update() {
    if (!this.character) {
      return;
    }
    if (this.cursorsKeys) {
      if (this.cursorsKeys.up?.isDown) {
        this.character.setMovement("walking-up");
      } else if (this.cursorsKeys.down?.isDown) {
        this.character.setMovement("walking-down");
      } else if (this.cursorsKeys.left?.isDown) {
        this.character.setMovement("walking-left");
      } else if (this.cursorsKeys.right?.isDown) {
        this.character.setMovement("walking-right");
      } else {
        this.character.setMovement("stopped");
      }
    }
    this.character.update();
  }

  private initializeCursorKeys() {
    if (!this.input) {
      throw Error("Input is not defined");
    }
    if (!this.input.keyboard) {
      throw Error("Keyboard is not defined");
    }
    this.cursorsKeys = this.input.keyboard.createCursorKeys();
  }
}
