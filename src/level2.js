import Phaser from 'phaser'
import Level from './level.js'

import map from '../assets/maps/level2.json'

export default class Level2 extends Level {
    constructor() {
        super('level2');
    }

    preload() {
        this.load.tilemapTiledJSON('tilemap', map)
    }

    nextLevel() {
        this.scene.start('level3')
    }
}
