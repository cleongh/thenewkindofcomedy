import Phaser from 'phaser'

import Player from './levels/player.js'
import Table from './levels/table.js'

export default class Level extends Phaser.Scene {
    constructor(name, xPlayer, yPlayer, tables=5, time=120) {
        super(name)
        this.xp = xPlayer
        this.yp = yPlayer

        this.showTime = time
        this.timer = 0
        this.tables = tables
    }


    create() {
        /* Tiempo de show */        
        this.timerText = this.add.text(this.game.config.width/2, 50, this.showTime).setDepth(10);

        // esto habrá que pillarlo por los tiles
        this.tableGroup = this.add.group();
        for(let i=0; i<this.tables; i++){
            this.tableGroup.add(new Table(this, i*50, i*50));
        }

        this.player = new Player(this, this.xp, this.xp)
        this.player.setDepth(10);
    }

    update(t, dt){
        // Contador
        this.timer += dt/1000 // a pelo, ni timer ni pollas
        this.timerText.setText(`Show time: ${(this.showTime-this.timer).toFixed(0)}`);

        if(this.timer <= 0){
            this.endShow(false);
        }
    }

    removeTable(table){
        this.tableGroup.destroy(table);
        if(this.tableGroup.getChildren.length==0){
            this.endShow(false)
        }
    }

    endShow(win){

    }

}
