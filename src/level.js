import Phaser from 'phaser'

import Player from './player.js'

export default class Level extends Phaser.Scene {
    constructor(name, xPlayer, yPlayer) {
        super(name)
        this.xp = xPlayer
        this.yp = xPlayer
    }


    create() {
        this.player = new Player(this, this.xp, this.xp)
        this.add.existing(this.player)
    }

}
