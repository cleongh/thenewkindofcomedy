import Phaser from 'phaser'
import Level from './level.js'
import Client from './client.js'

import map from '../assets/maps/level1.json'

export default class Level1 extends Level {
    constructor() {
        super('level1');

    }

    preload() {
        this.load.tilemapTiledJSON('tilemap', map)
    }

    // create() {
    //     super.create()
    //     // this.add.text(10, 10, "nivel 1")
        

    // }

}
