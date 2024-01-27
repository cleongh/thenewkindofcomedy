import Phaser from 'phaser'
import Level from './level.js'

import map from '../assets/maps/level1.json'

export default class Level1 extends Level {
    constructor() {
        super('level1');

    }

    preload() {
        this.load.tilemapTiledJSON('tilemap', map)
    }

    nextLevel() {
        this.scene.start('level2')
    }
}
