import Phaser from 'phaser'

export default class Level1 extends Phaser.Scene {
    /**
     * Constructor de la escena
     */
    constructor() {
        super('level1');
    }

    /**
     * Creación de los elementos de la escena principal de juego
     */
    create() {
        this.add.text(10, 10, "nivel 1")
    }

}
