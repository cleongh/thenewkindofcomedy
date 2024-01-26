import Phaser from 'phaser'
import Level from './level.js'

import map from '../assets/maps/level1.json'

export default class Level1 extends Level {
    /**
     * Constructor de la escena
     */
    constructor() {
        super('level1', 50, 50);
    }

    preload() {
        this.load.tilemapTiledJSON('tilemap', map)
    }

    /**
     * Creación de los elementos de la escena principal de juego
     */
    create() {
        super.create()
        this.add.text(10, 10, "nivel 1")
        this.map = this.make.tilemap({ key: 'tilemap' })
        
        const conId1 = this.map.createFromObjects('objetos', {class: "persona"})
        console.log(conId1)
        
    }

}
