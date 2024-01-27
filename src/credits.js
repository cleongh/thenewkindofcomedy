import Phaser from 'phaser'

export default class Credits extends Phaser.Scene {

  constructor() {
    super('credits');
  }

  create() {
      this.add.text(10, 10, "Guille, Isma, Toni, Pablo y Carlos")

      
        this.add.text(500, 120, "volver").setInteractive().
            on('pointerdown', () =>  {
                this.scene.start('menu')
            })
  }

}
