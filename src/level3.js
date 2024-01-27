import Phaser from 'phaser'
import Level from './level.js'

import map from '../assets/maps/level3.json'

export default class Level1 extends Level {
    constructor() {
        super('level3');

    }

    preload() {
        this.load.tilemapTiledJSON('tilemap', map)
    }

    nextLevel() {
        this.scene.start('win')
    }
}
