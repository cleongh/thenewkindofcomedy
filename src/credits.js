import Phaser from 'phaser'
import { colors } from './colors.ts'

export default class Credits extends Phaser.Scene {

  constructor() {
    super('credits');
  }

  create() {

    let textList = [
      "Toni Calvo Morata",
      "Pablo Gutiérrez Sánchez",
      "Carlos León Aznar",
      "Ismael Sagredo Olivenza",
      "Guillermo Jiménez Díaz",
      "Alejandro Romero Hernández",
      "Ana Ruiz Lanau",
      "José Manuel Moreno Valderrama",
      "Alejandro Villar Rubio"];

      this.shuffleArray(textList) // Ahora los créditos son aleatorios, viva el RNG!!

    this.add.image(this.game.config.width / 2, this.game.config.height / 2, 'fondoMenu');

    this.add.text(2 * 48, 2 * 48, "Los responsables de esto:", { fontFamily: 'Minecraftia', fontSize: 48, color: '#222222' });

    let thePeople = this.add.text(2 * 48, 5 * 48, textList.join("\n"), { fontFamily: 'Minecraftia', fontSize: 36, color: '#222222' });
    thePeople.setLineSpacing(24);

    let inMemoriamList = [
      'elena',
      'pedropablo',
      'marco'
    ];

    this.add.text(25 * 48, 2 * 48, "In Memoriam", { fontFamily: 'Minecraftia', fontSize: 48, color: '#222222' })
      .setOrigin(0.5, 0)
      .setAlign("center");

    let i = 0;
    for (let aName of inMemoriamList) {
      this.add.image(25 * 48, (7 + i) * 48, aName)
        .setScale(0.7);
      i += 4;
    }

    // Botón "volver"
    let button = this.add.text(500, 120, "Volver", { fontFamily: 'Minecraftia', fontSize: 62, color: '#222222' });
    button.setOrigin(1, 1);
    button.setAlign("right")
    button.setPosition(this.game.config.width - 2 * 48, this.game.config.height - 2 * 48)
    button.setInteractive();

    // Crear emitter
    let emitter = this.add.particles(0, 0, "flare", {
      speed: 24,
      lifespan: 1500,
      quantity: 5,
      scale: { start: 0.2, end: 0 },
      advance: 0,
      emitZone: [{
        type: "edge",
        source: new Phaser.Geom.Rectangle(
          button.x - 25 - button.width,
          button.y - 15 - button.height,
          button.width + 40,
          button.height + 40
        ),
        quantity: 42,
      }
      ],
      tint: colors.hover,
    });

    // No mostrar emitter hasta que se pasa por encima de un botón
    emitter.stop();

    // Asignar acciones a botón de volver
    button.on("pointerdown", () => {
      emitter.particleTint = colors.right;
      this.input.stopPropagation();
      this.time.delayedCall(500, () => {
        emitter.stop();
      })
      this.time.delayedCall(1000, () => {
        this.scene.start('menu');
      });
    });

    button.on("pointerover", () => {
      emitter.setEmitZone(0);
      emitter.start();
      emitter.fastForward(2000);
    });

    button.on("pointerout", () => {
      emitter.stop();
    });

  }

  // taken from https://dev.to/codebubb/how-to-shuffle-an-array-in-javascript-2ikj
  shuffleArray = array => {
    for (let i = array.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      const temp = array[i];
      array[i] = array[j];
      array[j] = temp;
    }
  }
  

}
