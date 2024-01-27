import Phaser from "phaser";
import BasePuzzle, { BasePuzzleProps } from "./BasePuzzle";

export const humorTypes = [
  "Negro",
  "Amarillo",
  "Verde", // azul
  "Escatológico", // rojo
  "De Cuñao", // blanco
] as const;
export type HumorType = (typeof humorTypes)[number];

type HumorColors = {
  [k in HumorType]: string;
};
export const humorColors: HumorColors = {
  Negro: "black",
  Amarillo: "yellow",
  Verde: "green",
  Escatológico: "brown",
  "De Cuñao": "red",
};

// Posiciones en las que se van a colocar los tipos de humor
// TODO: Poned lo que quede más cuco
const screenPositions: { x: number; y: number }[] = [
  { x: 500, y: 200 },
  { x: 500, y: 300 },
  { x: 500, y: 400 },
  { x: 500, y: 500 },
  { x: 500, y: 600 },
  { x: 500, y: 700 },
];

export interface HumorTypesProps {
  /** ¿Cuántos miembros hay en la banda? */
  bandMembersAmount: number;
}

/**
 * @extends Phaser.Scene
 */
export default class HumorTypes extends BasePuzzle {
  /** ¿qué cable tenemos que cortar? */
  private humorTypeToPress: number;

  /** ¿cuántos miembros hay en la banda? */
  private bandMembersAmount: number;

  /** "cables" (3 a 6) que aparecerán en los tipos de humor */
  private selectedHumorTypes: HumorType[];

  private puzzleResult: "ongoing" | "success" | "failure" = "ongoing";

  /**
   * Constructor de la escena
   */
  constructor() {
    super({ key: "humorTypes" });
  }

  init(props: BasePuzzleProps & HumorTypesProps): void {
    const { bandMembersAmount } = props;
    super.init({ ...props });

    this.bandMembersAmount = bandMembersAmount;

    // ¿cuántos tipos de humor vamos a pintar?
    const numberOfTypes = Phaser.Math.Between(3, 6);

    console.log(numberOfTypes);

    // Inicializamos de forma aleatoria los tipos de humor
    this.selectedHumorTypes = [...Array(numberOfTypes).keys()].map(
      (_) => humorTypes[Phaser.Math.Between(0, humorTypes.length - 1)]
    );

    console.log(this.selectedHumorTypes);

    // y ahora tenemos que calcular qué cable habría que cortar en base a las reglas.
    switch (numberOfTypes) {
      case 3:
        this.humorTypeToPress = this.selectHumorTypeToChoose3();
        break;
      case 4:
        this.humorTypeToPress = this.selectHumorTypeToChoose4();
        break;
      case 5:
        this.humorTypeToPress = this.selectHumorTypeToChoose5();
        break;
      case 6:
        this.humorTypeToPress = this.selectHumorTypeToChoose6();
        break;
    }
  } // init

  selectHumorTypeToChoose3(): number {
    // Si no hay cables rojos, corta el segundo cable.
    if (!this.selectedHumorTypes.includes("Escatológico")) return 1;
    // De lo contrario, si el último cable es blanco, corta el último cable.
    if (
      this.selectedHumorTypes[this.selectedHumorTypes.length - 1] === "De Cuñao"
    )
      return 2;
    // De lo contrario, si hay más de un cable azul, corta el último cable azul.
    if (this.selectedHumorTypes.filter((h) => h === "Verde").length > 1)
      return this.selectedHumorTypes.lastIndexOf("Verde");
    // De lo contrario, corta el último cable.
    return 2;
  } // selectHumorTypeToChoose3

  selectHumorTypeToChoose4(): number {
    // Si hay más de un cable rojo y el último dígito del número serial es impar,
    // corta el último cable rojo.
    if (
      this.selectedHumorTypes.filter((h) => h === "Escatológico").length > 1 &&
      this.bandMembersAmount % 2 === 1
    )
      return this.selectedHumorTypes.lastIndexOf("Escatológico");

    // De lo contrario, si el último cable es amarillo y no hay cables rojos, corta el
    // primer cable.
    if (
      this.selectedHumorTypes[this.selectedHumorTypes.length - 1] ===
        "Amarillo" &&
      !this.selectedHumorTypes.some((h) => h === "Escatológico")
    )
      return 0;
    // De lo contrario, si hay exactamente un cable azul, corta el primer cable.
    if (this.selectedHumorTypes.filter((h) => h === "Verde").length === 1)
      return 0;

    // De lo contrario, si hay más de un cable amarillo, corta el último cable.
    if (this.selectedHumorTypes.filter((h) => h === "Amarillo").length > 1)
      return 3;

    // De lo contrario, corta el segundo cable
    return 1;
  } // selectHumorTypeToChoose4

  selectHumorTypeToChoose5(): number {
    // Si el último cable es negro y el último dígito del número serial es impar,
    // corta el cuarto cable.
    if (
      this.selectedHumorTypes[this.selectedHumorTypes.length - 1] === "Negro" &&
      this.bandMembersAmount % 2 === 1
    )
      return 3;

    // De lo contrario, si hay exactamente un cable rojo y hay más de un cable
    // amarillo, corta el primer cable.
    if (
      this.selectedHumorTypes.filter((h) => h === "Escatológico").length ===
        1 &&
      this.selectedHumorTypes.filter((h) => h === "Amarillo").length > 1
    )
      return 0;

    // De lo contrario, si no hay cables negros, corta el segundo cable.
    if (this.selectedHumorTypes.every((h) => h !== "Negro")) return 1;

    // De lo contrario, corta el primer cable
    return 0;
  } // selectHumorTypeToChoose5

  selectHumorTypeToChoose6(): number {
    // Si no hay cables amarillos y el último dígito del número serial es impar,
    // corta el tercer cable.
    if (
      this.selectedHumorTypes.every((h) => h !== "Amarillo") &&
      this.bandMembersAmount % 2 === 1
    )
      return 2;

    // De lo contrario, si hay exactamente un cable amarillo y hay más de un cable
    // blanco, corta el cuarto cable.
    if (
      this.selectedHumorTypes.filter((h) => h === "Amarillo").length === 1 &&
      this.selectedHumorTypes.filter((h) => h === "De Cuñao").length > 1
    )
      return 3;

    // De lo contrario, si no hay cables rojos, corta el último cable.
    if (this.selectedHumorTypes.every((h) => h !== "Escatológico")) return 5;

    // De lo contrario, corta el cuarto cable
    return 3;
  } // selectHumorTypeToChoose6

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

    // Instanciamos un botón con el icono de cada uno de los tipos de humor seleccionados.
    this.selectedHumorTypes.forEach((humorType, i) => {
      const characterButton = this.add.text(
        screenPositions[i].x,
        screenPositions[i].y,
        humorType,
        {
          color: humorColors[humorType],
          fontSize: "20px",
          fontFamily: "serif",
        }
      );
      characterButton.setInteractive();
      characterButton.on("pointerdown", () => {
        // sólo permitir interacción con el puzzle si el resultado no está decidido
        // En realidad esto no debería hacer falta, pero por si las moscas...
        if (this.puzzleResult !== "ongoing") return;
        // ¿coincide el índice pulsado con bueno?
        if (i === this.humorTypeToPress) {
          this.onPuzzleEnd(true);
          this.puzzleResult = "success";
        } else {
          // nos hemos equivocado, acaba el puzzle en fracaso.
          this.onPuzzleEnd(false);
          this.puzzleResult = "failure";
        }
      });
    });
  } // create
} // BasePuzzle
