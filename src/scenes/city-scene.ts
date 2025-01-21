import * as Phaser from "phaser";

import MainCharacter from "../characters/main-character";
import Warrior from "../characters/warrior";
import Ground from "../terrain/ground";

export default class CityScene extends Phaser.Scene {
  private character: MainCharacter;
  private warrior: Warrior;
  private ground: Ground;
  private cursorsKeys: Phaser.Types.Input.Keyboard.CursorKeys | undefined;

  constructor() {
    super("city");
    this.ground = new Ground();
    this.character = new MainCharacter();
    this.warrior = new Warrior();
  }

  preload() {
    this.character.loadSpritesheet(this);
    this.ground.loadSpritesheet(this);
    this.warrior.loadSpritesheet(this);
  }

  public create() {
    this.ground.addToScene(this);
    this.warrior.addToScene(this, 300, 150);
    this.character.addToScene(this, 200, 150);

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
