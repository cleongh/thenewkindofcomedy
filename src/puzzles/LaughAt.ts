import Phaser from "phaser";
import BasePuzzle, { BasePuzzleProps } from "./BasePuzzle";
import {manualSequences} from './LaughAtList';

interface SelectedSymbol {
  characterIndex: number;
  index: number;
}

type ManualSequence = string[];

// Posiciones en las que se van a colocar los iconos de los personajes.
// TODO: Poned lo que quede más cuco
const screenPositions: { x: number; y: number }[] = [
  { x: -300, y: -200 },
  { x: 300, y: -200 },
  { x: -300, y: 200 },
  { x: 300, y: 200 },
];

export interface LaughtAtProps {
  manualSequences: ManualSequence[];
}

/**
 * @extends Phaser.Scene
 */
export default class LaughAt extends BasePuzzle {
  private symbolsClicked: number = 0;
  private selectedSymbols: SelectedSymbol[];
  private sortedSymbols: SelectedSymbol[];
  private puzzleResult: "ongoing" | "success" | "failure" = "ongoing";
  private emitter;

  /**
   * Constructor de la escena
   */
  constructor() {
    super({ key: "LaughAt" });
  }

  init(props: BasePuzzleProps): void {
    super.init({ ...props });

    this.symbolsClicked = 0
    this.puzzleResult = "ongoing";

    // Elige una secuencia al azar de las disponibles y de esa, cuatro elementos arbitrarios.
    // Estos serán los elementos que vayamos a colocar en los botones para pintarlos.
    const selectedManualSequence =
      manualSequences[Phaser.Math.Between(0, manualSequences.length - 1)];

    this.selectedSymbols = this.pickRandomElements(selectedManualSequence, 4);
    this.sortedSymbols = [...this.selectedSymbols].sort(
      (a, b) => a.index - b.index
    );

    console.log(this.selectedSymbols)
  } // init

  /**
   * Método auxiliar para seleccionar un número aleatorio de elementos de un array dado
   * sin repetición. En esta clase sirve fundamentalmente para seleccionar los elementos
   * de la secuencia del manual elegida que deberán pintarse en el nivel. Siempre se escogen
   * tantos elementos como se especifiquen por parámetro.
   * @param array array sobre el que elegir un subarray de elementos aleatorios sin repetición.
   * @param n número de elementos que queremos seleccionar del array
   * @returns array con un número arbitrario de elementos del array original (n), con la posición original en su secuencia.
   */
  pickRandomElements(array: number[], n: number): SelectedSymbol[] {
    // realizamos una copia el array original para immediatamente después
    // hacer un shuffle y quedarnos con tantos elementos como los que decidiéramos
    // en el paso anterior. En cada elemento ponemos el índice original para luego saber compararlos.
    const shuffledArray: SelectedSymbol[] = [...array].map((elem, i) => ({
      characterIndex: elem,
      index: i,
    }));
    Phaser.Utils.Array.Shuffle(shuffledArray);
    return shuffledArray.slice(0, n);
  } // pickRandomElements

  create() {
    super.create();

    const emitZone1 = { type: 'edge', source: new Phaser.Geom.Rectangle( screenPositions[0].x+this.container.x-96, screenPositions[0].y+this.container.y-88, 192, 192), quantity: 42 };
    const emitZone2 = { type: 'edge', source: new Phaser.Geom.Rectangle( screenPositions[1].x+this.container.x-96, screenPositions[1].y+this.container.y-88, 192, 192), quantity: 42 };
    const emitZone3 = { type: 'edge', source: new Phaser.Geom.Rectangle( screenPositions[2].x+this.container.x-96, screenPositions[2].y+this.container.y-88, 192, 192), quantity: 42 };
    const emitZone4 = { type: 'edge', source: new Phaser.Geom.Rectangle( screenPositions[3].x+this.container.x-96, screenPositions[3].y+this.container.y-88, 192, 192), quantity: 42 };

    this.emitter = this.add.particles(0, 0, 'flare', {
      speed: 24,
      lifespan: 1500,
      quantity: 5,
      scale: { start: 0.2, end: 0 },
      advance: 2000,
      emitZone: [ emitZone1, emitZone2, emitZone3, emitZone4 ]
  });


    // Instanciamos un botón con el icono de cada uno de los personajes seleccionados.
    // TODO: Ahora mismo sólo se pone el src como un botón de texto como placeholder,
    // hay que meter los sprites correspondientes y meter el de las secuencias.
    this.selectedSymbols.forEach(({ characterIndex, index }, i) => {
      const characterButton = this.add
        .sprite(
          screenPositions[i].x,
          screenPositions[i].y,
          `character${characterIndex}`,
          0
        )
        .setScale(2);
        characterButton.play(`rotate_${characterIndex}`)

        characterButton.on('pointerover', () => {
          if(this.puzzleResult == "ongoing"){
            this.emitter.setEmitZone(i);
            this.emitter.fastForward(2000);
          }
  
        });

      // characterButton.play("rotate_pelirroja");

      this.container.add(characterButton);

      characterButton.setInteractive();
      characterButton.on("pointerdown", (character) => {
        // sólo permitir interacción con el puzzle si el resultado no está decidido
        // En realidad esto no debería hacer falta, pero por si las moscas...
        if (this.puzzleResult !== "ongoing") return;
        // ¿coincide el índice pulsado con el siguiente que nos tocaría?
        if (index === this.sortedSymbols[this.symbolsClicked].index) {
          // aumentamos la cuenta de cuántos símbolos llevamos clickados con éxito.
          characterButton.setTint(0x00ff00)

          this.symbolsClicked++;

          console.log(`Symbols Clicked correctly: ${this.symbolsClicked}`);

          // si es el último que nos faltaba, completamos el puzzle con éxito
          if (this.symbolsClicked === 4) {
            this.endPuzzle(true);
            this.puzzleResult = "success";
          }
        } else {
          characterButton.setTint(0xff0000)
          this.emitter.stop();
          // nos hemos equivocado, acaba el puzzle en fracaso.
          this.endPuzzle(false);
          this.puzzleResult = "failure";
        }
      });
    });
  } // create

  closePanel(){
    super.closePanel();
    this.emitter.stop();
  }

  endPuzzle(success){
    let endTween = this.add.timeline([
      {
        at:100,
        tween: {
          targets: this.container,
          run: () => {this.closePanel()}
        }
      },
      {
        at:2000,
        tween: {
          targets: this.container,
          run: () => {this.onPuzzleEnd(success)}
        }
      }
    ]);
    endTween.play();
  }
} // BasePuzzle
