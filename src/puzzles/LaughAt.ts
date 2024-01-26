import Phaser from "phaser";
import BasePuzzle, { BasePuzzleProps } from "./BasePuzzle";

interface SelectedSymbol {
  characterSrc: string;
  index: number;
}

type ManualSequence = string[];

// Posiciones en las que se van a colocar los iconos de los personajes.
// TODO: Poned lo que quede más cuco
const screenPositions: { x: number; y: number }[] = [
  { x: 200, y: 200 },
  { x: 300, y: 200 },
  { x: 200, y: 300 },
  { x: 300, y: 300 },
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
  private puzzleResult: "ongoing" | "success" | "failure" = "ongoing";

  /**
   * Constructor de la escena
   */
  constructor() {
    super({ key: "laughAt" });
  }

  init(props: BasePuzzleProps & LaughtAtProps): void {
    const { manualSequences } = props;
    super.init({ ...props });
    // Elige una secuencia al azar de las disponibles y de esa, cuatro elementos arbitrarios.
    // Estos serán los elementos que vayamos a colocar en los botones para pintarlos.
    const selectedManualSequence =
      manualSequences[Phaser.Math.Between(0, manualSequences.length - 1)];

    this.selectedSymbols = this.pickRandomElements(selectedManualSequence, 4);
    console.log(this.selectedSymbols);
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
  pickRandomElements(array: string[], n: number): SelectedSymbol[] {
    // realizamos una copia el array original para immediatamente después
    // hacer un shuffle y quedarnos con tantos elementos como los que decidiéramos
    // en el paso anterior. En cada elemento ponemos el índice original para luego saber compararlos.
    const shuffledArray: SelectedSymbol[] = [...array].map((elem, i) => ({
      characterSrc: elem,
      index: i,
    }));
    Phaser.Utils.Array.Shuffle(shuffledArray);
    return shuffledArray.slice(0, n);
  } // pickRandomElements

  create() {
    super.create();

    // Instanciamos un botón con el icono de cada uno de los personajes seleccionados.
    // TODO: Ahora mismo sólo se pone el src como un botón de texto como placeholder,
    // hay que meter los sprites correspondientes y meter el de las secuencias.
    this.selectedSymbols.forEach(({ characterSrc, index }, i) => {
      const characterButton = this.add.text(
        screenPositions[i].x,
        screenPositions[i].y,
        characterSrc,
        {
          color: "white",
          fontSize: "14px",
          fontFamily: "serif",
        }
      );
      characterButton.setInteractive();
      characterButton.on("pointerdown", () => {
        // sólo permitir interacción con el puzzle si el resultado no está decidido
        // En realidad esto no debería hacer falta, pero por si las moscas...
        if (this.puzzleResult !== "ongoing") return;
        // ¿coincide el índice pulsado con el siguiente que nos tocaría?
        if (index === this.selectedSymbols[this.symbolsClicked].index) {
          // aumentamos la cuenta de cuántos símbolos llevamos clickados con éxito.
          this.symbolsClicked++;

          console.log(`Symbols Clicked correctly: ${this.symbolsClicked}`);

          // si es el último que nos faltaba, completamos el puzzle con éxito
          if (this.symbolsClicked === 4) {
            this.onPuzzleEnd(true);
            this.puzzleResult = "success";
          }
        } else {
          // nos hemos equivocado, acaba el puzzle en fracaso.
          this.onPuzzleEnd(false);
          this.puzzleResult = "failure";
        }
      });
    });
  } // create
} // BasePuzzle
