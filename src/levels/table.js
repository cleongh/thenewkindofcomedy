
import Phaser from 'phaser'

export default class Table extends Phaser.GameObjects.Sprite {

    constructor(scene, x, y, clients=4) {
        super(scene, x, y, 'table');

        this.clients = clients
    }

    preUpdate(t, dt) {
        super.preUpdate(t, dt);

    }

}
