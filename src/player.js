
import Phaser from 'phaser'

export default class Player extends Phaser.GameObjects.Sprite {

    constructor(scene, x, y) {
        super(scene, x, y, 'player');

        this.scene.input.on('pointerdown', this.onClick, this);
    }


    preUpdate(t, dt) {
        super.preUpdate(t, dt);
        // if (this.cursors.up.isDown && this.body.onFloor()) {
        //     this.body.setVelocityY(this.jumpSpeed);
        // }
        // if (this.cursors.left.isDown) {
        //     this.body.setVelocityX(-this.speed);
        // }
        // else if (this.cursors.right.isDown) {
        //     this.body.setVelocityX(this.speed);
        // }
        // else {
        //     this.body.setVelocityX(0);
        // }
    }


    onClick(pointer)
    {
        console.log('down '+pointer);
    }

}
