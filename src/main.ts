import Phaser from "phaser";

import CityScene from "./scenes/city-scene";

const config: Phaser.Types.Core.GameConfig = {
  type: Phaser.AUTO,
  width: 400,
  height: 300,
  physics: {
    default: "arcade",
  },
  scene: [CityScene],
};

export default new Phaser.Game(config);
