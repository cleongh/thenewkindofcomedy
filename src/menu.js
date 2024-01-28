import Phaser from 'phaser'
import { colors } from './colors.ts'

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
    if (!this.music) {
      this.music = this.sound.add('musica1');
      this.music.play();
    } else {
      this.music.setVolume(1);
    }

    // Crear botones
    let startButton = this.add.text(48 * 4, 48 * 10, "Iniciar Juego", { fontFamily: 'Minecraftia', fontSize: 62, color: '#222222' }).setInteractive();
    let creditsButton = this.add.text(48 * 4, 48 * 14, "Créditos", { fontFamily: 'Minecraftia', fontSize: 62, color: '#222222' }).setInteractive();

    // Crear emitters
    let emitter = this.add.particles(0, 0, "flare", {
      speed: 24,
      lifespan: 1500,
      quantity: 5,
      scale: { start: 0.2, end: 0 },
      advance: 0,
      emitZone: [{
        type: "edge",
        source: new Phaser.Geom.Rectangle(
          startButton.x - 20,
          startButton.y - 20,
          startButton.width + 40,
          startButton.height + 40
        ),
        quantity: 42,
      },
      {
        type: "edge",
        source: new Phaser.Geom.Rectangle(
          creditsButton.x - 20,
          creditsButton.y - 20,
          creditsButton.width + 40,
          creditsButton.height + 40
        ),
        quantity: 42,
      },
      ],
      tint: colors.hover,
    })
      .setDepth(10);
    // No mostrar emitter hasta que se pasa por encima de un botón
    emitter.stop();

    // Asignar acciones a botón de start
    startButton.on("pointerdown", () => {
      emitter.particleTint = colors.right;
      this.input.stopPropagation();
      this.time.delayedCall(500, () => {
        emitter.stop();
      })
      this.time.delayedCall(1000, () => {
        this.music.setVolume(0.1);
        this.scene.start('level1') //TODO randomizar level?
      });
    });

    startButton.on("pointerover", () => {
      emitter.setEmitZone(0);
      emitter.start();
      emitter.fastForward(2000);
    });

    startButton.on("pointerout", () => {
      emitter.stop();
    });

    // Asignar acciones a botón de créditos
    creditsButton.on("pointerdown", () => {
      emitter.particleTint = colors.right;
      this.input.stopPropagation();
      this.time.delayedCall(500, () => {
        emitter.stop();
      })
      this.time.delayedCall(1000, () => {
        this.scene.start('credits');
      });
    });

    creditsButton.on("pointerover", () => {
      emitter.start();
      emitter.setEmitZone(1);
      emitter.fastForward(2000);
    });

    creditsButton.on("pointerout", () => {
      emitter.stop();
    });


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
