import Phaser from 'phaser'
import Level from './level.js'
import Client from './client.js'

import map from '../assets/maps/level1.json'

export default class Level1 extends Level {
    constructor() {
        super('level1', 50, 50);
    }

    preload() {
        this.load.tilemapTiledJSON('tilemap', map)
    }

    create() {
        super.create()
        this.add.text(10, 10, "nivel 1")
        this.map = this.make.tilemap({ key: 'tilemap',
                                     tileWidth: 48, tileHeight: 48})

        const wall  = this.map.addTilesetImage('walls', 'walls');
        const upstairs  = this.map.addTilesetImage('upstairs', 'upstairs');
        
        this.map.createLayer('suelo', upstairs)
        this.map.createLayer('paredes', wall)
        
        this.map.createFromObjects('objetos', {gid: 1, key: 'player'})
    }

}
