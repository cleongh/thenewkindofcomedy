import Phaser from 'phaser'
import {characters} from './boot.js'

export default class Client extends Phaser.GameObjects.Sprite {
    constructor(scene) {

        // let characters = ['barbudo', 'pelirroja', 'nigaplus']
        const random = Math.floor(Math.random() * characters.length);
        const name = characters[random];
        // console.log(name)
        // const name = 'barbudo'
        super(scene, 0, 0, name)
        this.play('idle_' + name)
    }
}
