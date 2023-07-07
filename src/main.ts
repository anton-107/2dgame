import Phaser from 'phaser'

import CityScene from './scenes/city-scene';

const config: Phaser.Types.Core.GameConfig = {
	type: Phaser.AUTO,
	width: 800,
	height: 600,
	physics: {
		default: 'arcade',
		arcade: {
			gravity: { y: 200 }
		}
	},
	scene: [CityScene],
}

export default new Phaser.Game(config);