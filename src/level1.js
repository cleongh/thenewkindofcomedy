import Phaser from 'phaser'
import Level from './level.js'


export default class Level1 extends Level {
    /**
     * Constructor de la escena
     */
    constructor() {
        super('level1', 50, 50);
    }

    /**
     * Creación de los elementos de la escena principal de juego
     */
    create() {
        super.create()
        this.add.text(10, 10, "nivel 1")
        
    }

}
