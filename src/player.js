
import Phaser from 'phaser'

export default class Player extends Phaser.GameObjects.Sprite {

    constructor(scene, x, y) {
        super(scene, x, y, 'player');
        this.scene.physics.add.existing(this); //Escena física
        this.scene.input.on('pointerdown', this.onClick, this);
        this.body.setAllowGravity(false);
        /// Deficinión de parametros
        this.velocity = 400.0;
        this.stopDistance = 20.0;

        //Variables internas
        this._isMoving = false;
        this._targetX = this.x;
        this._targetY = this.y;
    }


    preUpdate(t, dt) {
        super.preUpdate(t, dt);
        this.checkStop(t,dt);
        //this.move(dt);
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
        console.log('down X '+pointer.downX + " Y "+pointer.downY);
        this._targetX = pointer.downX;
        this._targetY = pointer.downY;
        let xdist = new Phaser.Math.Vector2(this._targetX,this._targetY);
        let pos = new Phaser.Math.Vector2(this.x,this.y);
        let direction = xdist.subtract(pos);
        let mod = direction.length();
        direction = direction.normalize();

        //console.log('velocity X '+(this.velocity*direction.x) + " Y "+(this.velocity*direction.y));
        if(mod > this.stopDistance)
        {
            this.body.setVelocityX(this.velocity*direction.x);
            this.body.setVelocityY(this.velocity*direction.y);
        }

    }

    checkStop(t,dt)
    {
        let xTarget = new Phaser.Math.Vector2(this._targetX,this._targetY);
        let pos = new Phaser.Math.Vector2(this.x,this.y);
        let direction = xTarget.subtract(pos);
        let mod = direction.length();
        //console.log(" mod "+mod + " velocityX "+this.body.velocity.x + " y " +this.body.velocity.y);
        if(mod < this.stopDistance)
        {
            this.body.setVelocityX(0);
            this.body.setVelocityY(0);
        }
    }

}
