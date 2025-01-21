import Phaser from "phaser";

export class WorldDebug {
  drawDebugLines(scene: Phaser.Scene) {
    // Enable debug rendering for physics bodies
    scene.physics.world.createDebugGraphic();
    scene.physics.world.debugGraphic.setVisible(true);

    // You can customize debug colors if needed
    scene.add.graphics();
    scene.physics.world.drawDebug = true;
    scene.physics.world.debugGraphic.clear();
    scene.physics.world.debugGraphic.lineStyle(1, 0x00ff00); // Green color for debug lines
  }
}
