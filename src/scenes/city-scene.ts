import * as Phaser from "phaser";

import MainCharacter from "../characters/main-character";
import Warrior from "../characters/warrior";
import { WorldDebug } from "../debug/world-debug";
import Ground from "../terrain/ground";

export default class CityScene extends Phaser.Scene {
  private character: MainCharacter;
  private warrior: Warrior;
  private ground: Ground;
  private worldDebug = new WorldDebug();
  private cursorsKeys: Phaser.Types.Input.Keyboard.CursorKeys | undefined;
  private proximityRadius = 50; // Detection radius in pixels

  constructor() {
    super("city");
    this.ground = new Ground();
    this.character = new MainCharacter();
    this.warrior = new Warrior();
  }

  preload() {
    this.ground.loadSpritesheet(this);
    this.warrior.loadSpritesheet(this);
    this.character.loadSpritesheet(this);
  }

  public create() {
    this.ground.addToScene(this);
    this.character.addToScene(this, 200, 150);
    this.warrior.addToScene(this, 300, 150);

    // Add collision between main character and warrior
    const characterSprite = this.character.getSprite();
    const warriorSprite = this.warrior.getSprite();

    if (characterSprite && warriorSprite) {
      this.physics.add.collider(characterSprite, warriorSprite);
    }

    // this.worldDebug.drawDebugLines(this);

    this.initializeCursorKeys();
  }

  public update() {
    if (!this.character) {
      return;
    }

    // Handle character movement
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

    // Check proximity between character and warrior
    this.checkWarriorProximity();
  }

  private checkWarriorProximity() {
    const characterSprite = this.character.getSprite();
    const warriorSprite = this.warrior.getSprite();

    if (characterSprite && warriorSprite) {
      const distance = Phaser.Math.Distance.Between(
        characterSprite.x,
        characterSprite.y,
        warriorSprite.x,
        warriorSprite.y,
      );

      if (distance <= this.proximityRadius) {
        // Character is within the proximity radius of the warrior
        this.handleWarriorProximity();
      }
    }
  }

  private handleWarriorProximity() {
    // This function will be called when the main character is near the warrior
    // eslint-disable-next-line no-console
    console.log("Character is near warrior!");
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
