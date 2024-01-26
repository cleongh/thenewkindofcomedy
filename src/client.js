import Phaser from 'phaser'

export default class Client extends Phaser.GameObjects.Sprite {
    constructor(scene, x, y) {
        super(scene, x, y, 'alex')
        this.play('idle')
    }

    

}
