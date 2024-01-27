
import Phaser from 'phaser'

export default class Player extends Phaser.GameObjects.Sprite 
{

    constructor(scene, x, y) {
        super(scene, x, y, 'pelirroja', 0);
        this.scene.physics.add.existing(this); //Escena física
        this.scene.add.existing(this) // lo meto en la la lógica
        this.scene.input.on('pointerdown', this.onClick, this);
        this.body.setAllowGravity(false);
        /// Deficinión de parametros
        this.velocity = 400.0;
        this.stopDistance = 5.0;
        this.usingNavmesh = true;
        this.navMesh = null;
        this.currentTarget = null;
        //Variables internas
        this._isMoving = false;
        this._targetX = this.x;
        this._targetY = this.y;
        this.bored = true; // El jugador se aburre si está sin hacer nada/quieto, asñi que puede acceder a interactuar con la mesa si está en la posición correcta

        this.play("idle_pelirroja")

    }


    preUpdate(t, dt) {
        super.preUpdate(t, dt);
        if(this.usingNavmesh && this.navMesh != null)
        {
            this.moveUsingPathfinding(t,dt);
        }
        else
        {
            this.checkStop(t,dt);
        }
        
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
        this.bored = true;
        this._targetX = pointer.downX;
        this._targetY = pointer.downY;
        let destination = new Phaser.Math.Vector2(this._targetX,this._targetY);
        if(this.usingNavmesh && this.navMesh != null)
        {
            this.goTo(destination);
        }
        else
        {
            this.movePosition(destination);
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

    setNavmesh(navmesh)
    {
        this.navMesh = navmesh;
    }

    goTo(targetPoint) 
    {
        if(this.navMesh == null)
            this.currentTarget = null;
        else
        {
            // Find a path to the target
            this.path = this.navMesh.findPath(new Phaser.Math.Vector2(this.x, this.y), targetPoint);
        
            // If there is a valid path, grab the first point from the path and set it as the target
            if (this.path && this.path.length > 0) this.currentTarget = this.path.shift();
            else this.currentTarget = null;
        }
    }

    isBored(){
        return this.bored
    }

    setBored(bored){
        this.bored = bored;
    }

    isStanding(){
        return this.body.velocity.x == 0 && this.body.velocity.y == 0;
    }

    movePosition(destination)
    {
        let pos = new Phaser.Math.Vector2(this.x,this.y);
        let direction = destination.subtract(pos);
        let mod = direction.length();
        direction = direction.normalize();
        
        if(mod > this.stopDistance)
        {
            this.body.setVelocityX(this.velocity*direction.x);
            this.body.setVelocityY(this.velocity*direction.y);
        }
    }

    moveUsingPathfinding(t,dt)
    {
        if (this.currentTarget) 
        {
            const { x, y } = this.currentTarget;
            const distance = Phaser.Math.Distance.Between(this.x, this.y, x, y);
            let changeTarget = false;
            if (distance < this.stopDistance && this.path.length > 0) 
            {
                // obtengo el path siguiente.
                this.currentTarget = this.path.shift();
                changeTarget = true;
            }
            else if((distance < this.stopDistance) && (this.path.length == 0))
            {
                this.body.setVelocityX(0);
                this.body.setVelocityY(0);
                this.currentTarget = null;
            }

            if(changeTarget)
            {
                this.movePosition(new Phaser.Math.Vector2(this.currentTarget.x,this.currentTarget.y));
            }
                

        }
    }
      
    moveTowards(targetPosition, maxSpeed = 200, elapsedSeconds) 
    {
        const { x, y } = targetPosition;
        const angle = Phaser.Math.Angle.Between(this.x, this.y, x, y);
        const distance = Phaser.Math.Distance.Between(this.x, this.y, x, y);
        const targetSpeed = distance / elapsedSeconds;
        const magnitude = Math.min(maxSpeed, targetSpeed);
    
        this.scene.physics.velocityFromRotation(angle, magnitude, this.body.velocity);
        this.rotation = angle;
    }
      
    destroy() 
    {
        if (this.scene) this.scene.events.off("update", this.update, this);
        super.destroy();
    }

}
