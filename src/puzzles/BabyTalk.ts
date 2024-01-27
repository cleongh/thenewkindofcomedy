import Phaser from "phaser";
import BasePuzzle, { BasePuzzleProps } from "./BasePuzzle";
import { availableBabySounds } from "../boot";
import { babyTalkManualCombinations } from "./babyTalkLists";
import { colors } from "../colors";

export const babyActions = [
  "Sácale los Gases",
  "Dale de Comer",
  "Échale a Dormir",
  "Dale Juguetes",
  "Llévale al Baño",
  "Ponle el Chupete",
] as const;
export type BabyAction = (typeof babyActions)[number];
export type BabyTalkSyllable = keyof typeof availableBabySounds;
export type BabyTalkManualCombination = {
  syllables: BabyTalkSyllable[];
  correctAction: BabyAction;
};

// Posiciones en las que se van a colocar los iconos de los botones con las acciones.
// TODO: Poned lo que quede más cuco
const screenPositions: { x: number; y: number }[] = [
  { x: 300, y: -250 },
  { x: 300, y: -150 },
  { x: 300, y: -50 },
  { x: 300, y: 50 },
  { x: 300, y: 150 },
  { x: 300, y: 250 },
];

/**
 * @extends Phaser.Scene
 */
export default class BabyTalk extends BasePuzzle {
  /** combinación que será reproducida en este puzzle */
  private selectedCombination: BabyTalkManualCombination;
  private emitter;

  private soundTracks: (
    | Phaser.Sound.NoAudioSound
    | Phaser.Sound.HTML5AudioSound
    | Phaser.Sound.WebAudioSound
  )[];

  private puzzleResult: "ongoing" | "success" | "failure" = "ongoing";

  /**
   * Constructor de la escena
   */
  constructor() {
    super({ key: "BabyTalk" });
  }

  resetSoundTracks() {
    // destruir los audios cuando se pulsa sobre algo
    this.soundTracks.forEach((track) => track.destroy());
  }

  init(props: BasePuzzleProps): void {
    super.init({ ...props });

    this.puzzleResult = "ongoing";

    // Elige un baby talk combination al azar de las disponibles.
    // Esto es, la información de qué audios poner y qué solución tienen.
    this.selectedCombination =
      babyTalkManualCombinations[
        Phaser.Math.Between(0, babyTalkManualCombinations.length - 1)
      ];

    this.soundTracks = this.selectedCombination.syllables.map((s) =>
      this.sound.add(s)
    );

    this.soundTracks.forEach((track, i) => {
      if (i === this.soundTracks.length - 1) {
        // último track, volvemos al principio
        track.on("complete", () => this.soundTracks[0].play({ delay: 0.5 }));
      } else {
        // vamos al siguiente
        track.on("complete", () =>
          this.soundTracks[i + 1].play({ delay: 0.2 })
        );
      }
    });
  } // init

  /**
   * Método auxiliar para seleccionar un número aleatorio de elementos de un array dado
   * sin repetición. En esta clase sirve fundamentalmente para seleccionar los elementos
   * de la secuencia del manual elegida que deberán pintarse en el nivel. Siempre se escogen
   * tantos elementos como se especifiquen por parámetro.
   * @param array array sobre el que elegir un subarray de elementos aleatorios sin repetición.
   * @param n número de elementos que queremos seleccionar del array
   * @returns array con un número arbitrario de elementos del array original (n).
   */
  pickRandomElements(array: string[], n: number): string[] {
    // realizamos una copia el array original para immediatamente después
    // hacer un shuffle y quedarnos con tantos elementos como los que decidiéramos
    // en el paso anterior. En cada elemento ponemos el índice original para luego saber compararlos.
    const shuffledArray = [...array];
    Phaser.Utils.Array.Shuffle(shuffledArray);
    return shuffledArray.slice(0, n);
  } // pickRandomElements

  create() {
    super.create();

    const emitZone1 = {
      type: "edge",
      source: new Phaser.Geom.Rectangle(
        screenPositions[0].x + this.container.x - 250,
        screenPositions[0].y + this.container.y - 48,
        500,
        96
      ),
      quantity: 42,
    };
    const emitZone2 = {
      type: "edge",
      source: new Phaser.Geom.Rectangle(
        screenPositions[1].x + this.container.x - 250,
        screenPositions[1].y + this.container.y - 48,
        500,
        96
      ),
      quantity: 42,
    };
    const emitZone3 = {
      type: "edge",
      source: new Phaser.Geom.Rectangle(
        screenPositions[2].x + this.container.x - 250,
        screenPositions[2].y + this.container.y - 48,
        500,
        96
      ),
      quantity: 42,
    };
    const emitZone4 = {
      type: "edge",
      source: new Phaser.Geom.Rectangle(
        screenPositions[3].x + this.container.x - 250,
        screenPositions[3].y + this.container.y - 48,
        500,
        96
      ),
      quantity: 42,
    };
    const emitZone5 = {
      type: "edge",
      source: new Phaser.Geom.Rectangle(
        screenPositions[4].x + this.container.x - 250,
        screenPositions[4].y + this.container.y - 48,
        500,
        96
      ),
      quantity: 42,
    };
    const emitZone6 = {
      type: "edge",
      source: new Phaser.Geom.Rectangle(
        screenPositions[5].x + this.container.x - 250,
        screenPositions[5].y + this.container.y - 48,
        500,
        96
      ),
      quantity: 42,
    };

    this.emitter = this.add.particles(0, 0, "flare", {
      speed: 24,
      lifespan: 1500,
      quantity: 5,
      scale: { start: 0.2, end: 0 },
      advance: 2000,
      emitZone: [
        emitZone1,
        emitZone2,
        emitZone3,
        emitZone4,
        emitZone5,
        emitZone6,
      ],
      tint: colors.hover,
    });

    this.soundTracks[0].play();
    console.log(this.selectedCombination);

    let baby = this.add.sprite(-350, 0, "babyCry", 0).setScale(9);
    this.container.add(baby);
    baby.play("cry_baby");

    // Instanciamos un botón con el icono de cada una de las acciones disponibles
    babyActions.forEach((babyAction, i) => {
      const babyActionButton = this.add
        .text(screenPositions[i].x, screenPositions[i].y, babyAction, {
          color: "white",
          fontSize: "40px",
          fontFamily: "minecraftia",
        })
        .setOrigin(0.5, 0.5);
      this.container.add(babyActionButton);
      babyActionButton.setAlign("center");

      babyActionButton.setInteractive();
      babyActionButton.on("pointerdown", () => {
        // sólo permitir interacción con el puzzle si el resultado no está decidido
        // En realidad esto no debería hacer falta, pero por si las moscas...
        if (this.puzzleResult !== "ongoing") return;
        // ¿coincide el índice pulsado con bueno?
        if (babyAction === this.selectedCombination.correctAction) {
          this.emitter.particleTint = colors.right;
          baby.play("laugh_baby");
          this.endPuzzle(true);
          this.puzzleResult = "success";
        } else {
          // nos hemos equivocado, acaba el puzzle en fracaso.
          this.emitter.particleTint = colors.wrong;
          this.endPuzzle(false);
          this.puzzleResult = "failure";
        }

        this.resetSoundTracks();
      });
      babyActionButton.on("pointerover", () => {
        if (this.puzzleResult == "ongoing") {
          this.emitter.setEmitZone(i);
          this.emitter.fastForward(2000);
        }
      });
    });
  } // create

  closePanel() {
    super.closePanel();
    this.emitter.stop();
    this.resetSoundTracks();
  }
} // BasePuzzle
