import Phaser from 'phaser'

/**
 * Escena de fin de juego. Cuando se han recogido todas las estrellas, se presenta un
 * texto que indica que el juego se ha acabado.
 * Si se pulsa cualquier tecla, se vuelve a iniciar el juego.
 */
export default class Menu extends Phaser.Scene {
  /**
   * Constructor de la escena
   */
  constructor() {
    super('menu');
  }

  /**
   * Creación de la escena. Tan solo contiene el texto que indica que el juego se ha acabado
   */
    create() {
      this.add.image(this.game.config.width / 2, this.game.config.height / 2, 'menu');

      // Ponemos la música una sola vez
      if (! this.music){
        this.music = this.sound.add('musica1');
        this.music.play();
      } else {
        this.music.setVolume(1);
      }

      // TODO: Poner las partículas que ha puesto Toni en los botones del juego
      this.add.text(48 * 4, 48 * 10, "Iniciar Juego", { fontFamily: 'Minecraftia', fontSize: 62, color: '#222222' }).setInteractive().
            on('pointerdown', () =>  {
              this.music.setVolume(0.1);
                this.scene.start('level1')
            })

      this.add.text(48 * 4, 48 * 14, "Créditos", { fontFamily: 'Minecraftia', fontSize: 62, color: '#222222' }).setInteractive().
            on('pointerdown', () =>  {
                this.scene.start('credits')
            })
    // this.add.text(500, 250, 'Se acabó!\nPulsa cualquier tecla para volver a jugar')
    //     .setOrigin(0.5, 0.5)  // Colocamos el pivote en el centro de cuadro de texto 
    //     .setAlign('center');  // Centramos el texto dentro del cuadro de texto

    // Añadimos el listener para cuando se haya pulsado una tecla. Es probable que no
    // lleguemos a ver el mensaje porque veníamos con una tecla pulsada del juego (al 
    // ir moviendo al jugador). Se puede mejorar añadiendo un temporizador que 
    // añada este listener pasado un segundo
    // this.input.keyboard.on('keydown', function (event) { 
    //   this.scene.start('level');
    // }, this);
  }

}
