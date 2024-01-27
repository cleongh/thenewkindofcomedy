import Phaser from "phaser";
import BasePuzzle, { BasePuzzleProps } from "./BasePuzzle";
import { wordLayouts, wordSequences } from "./whoGoesFirstLists";
import { colors } from "../colors";

export type WordSequence = string[];
/**
 * mapa que relaciona cada palabra del paso 1 con la lista de palabras que se deben decir
 * en alto hasta encontrar un botón que coincida con la palabra leída.
 */
export type ManualWordSequences = { [entryWord: string]: WordSequence };
/**
 * mapa que relaciona una palabra que aparece en el display superior del puzzle
 * con el índice del botón en el que hay que fijarse para decidir qué entrada de las
 * listas utilizar en el paso 2.
 */
export type ManualWordLayouts = { [displayWord: string]: number };

// Posiciones en las que se van a colocar los iconos de los botones con palabras.
// TODO: Poned lo que quede más cuco
const screenPositions: { x: number; y: number }[] = [
  { x: 50, y: -200 },
  { x: 330, y: -200 },
  { x: 50, y: 0 },
  { x: 330, y: 0 },
  { x: 50, y: 200 },
  { x: 330, y: 200 },
];

/**
 * @extends Phaser.Scene
 */
export default class WhoGoesFirst extends BasePuzzle {
  /** palabra que aparece en el display */
  private displayWord: string;
  /** ¿qué botón es el que hay que usar para mirar? */
  private buttonIndexToLookAt: number;
  /** ¿qué botón tenemos que pulsar? */
  private buttonIndexToPress: number;

  /** palabras (6) que aparecerán en los botones de debajo del display */
  private selectedButtonWords: string[];

  private puzzleResult: "ongoing" | "success" | "failure" = "ongoing";

  private emitter: Phaser.GameObjects.Particles.ParticleEmitter;

  /**
   * Constructor de la escena
   */
  constructor() {
    super({ key: "WhoGoesFirst" });
  }

  init(props: BasePuzzleProps): void {
    super.init({ ...props });

    this.puzzleResult = "ongoing";

    // claves del objeto de layouts (posibles palabras para el display)
    const layoutKeys = Object.keys(wordLayouts);

    // Elige un layout al azar de los disponibles.
    // Esto es, el índice del botón cuya palabra indexa a la lista de palabras a decir.
    this.displayWord =
      layoutKeys[Phaser.Math.Between(0, layoutKeys.length - 1)];
    this.buttonIndexToLookAt = wordLayouts[this.displayWord];

    // totalWords se rellena con la unión de todas las palabras que pueden
    // estar en las listas, Ó en las claves de las listas. En particular, esto se traduce en coger cualquier
    // palabra que esté en una entrada del paso 2.
    const totalWords: string[] = [];
    for (const [_, v] of Object.entries(wordSequences)) {
      v.forEach((w) => {
        if (!totalWords.includes(w)) totalWords.push(w);
      });
    }
    for (const k of Object.keys(wordSequences)) {
      if (!totalWords.includes(k)) totalWords.push(k);
    }

    // ¿cuáles son los botones que van a mostrarse en el puzzle?
    // paso 1: meter 6 palabras aleatorias que no tienen por qué estar en la lista buena.
    this.selectedButtonWords = this.pickRandomElements(totalWords, 6);

    // paso 2: TODAS LAS LISTAS CONTIENEN A LA PALABRA QUE LAS INDEXA POR DISEÑO
    // así que nos  podemos quedar tranquilos y asumir que esto no va a explotar...
    // listado de palabras asociado a la palabra en la posición buena del botón
    const selectedListWords =
      wordSequences[this.selectedButtonWords[this.buttonIndexToLookAt]];

    // el botón a pulsar es el primer elemento de la lista de selected list words que tenga botón
    this.buttonIndexToPress = 0;
    for (let i = 0; i < selectedListWords.length; i++) {
      const buttonIndex = this.selectedButtonWords.indexOf(
        selectedListWords[i]
      );
      if (buttonIndex >= 0) {
        this.buttonIndexToPress = buttonIndex;
        break;
      }
    }
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

    this.createSpeechBubble(-150, -300, 630, 600, "right");
    this.createSpeechBubble(-450, -250, 325, 100, "left");

    const characterIzquierda = this.add
      .sprite(-590, -250, "characterIzquierda", 0)
      .setScale(5);
    this.container.add(characterIzquierda);
    characterIzquierda.play("characterIzquierda");

    const characterDerecha = this.add
      .sprite(600, 150, "characterDerecha", 0)
      .setScale(5);
    this.container.add(characterDerecha);
    characterDerecha.play("characterDerecha");

    const rectangleWidth = 230;
    const emitZones = screenPositions.map(({ x, y }) => ({
      type: "edge",
      source: new Phaser.Geom.Rectangle(
        x + this.container.x - rectangleWidth / 2,
        y + this.container.y - 48,
        rectangleWidth,
        96
      ),
      quantity: 42,
    }));

    this.emitter = this.add.particles(0, 0, "flare", {
      speed: 24,
      lifespan: 1500,
      quantity: 5,
      scale: { start: 0.2, end: 0 },
      advance: 2000,
      emitZone: emitZones,
      tint: colors.hover,
    });

    const display = this.add
      .text(-275, -200, this.displayWord, {
        color: "black",
        fontSize: "40px",
        fontFamily: "minecraftia",
      })
      .setOrigin(0.5, 0.5)
      .setDepth(-1);

    this.container.add(display);
    display.setAlign("center");

    // Instanciamos un botón con el icono de cada uno de los personajes seleccionados.
    // TODO: Ahora mismo sólo se pone el src como un botón de texto como placeholder,
    // hay que meter los sprites correspondientes y meter el de las secuencias.
    this.selectedButtonWords.forEach((buttonWord, i) => {
      const characterButton = this.add
        .text(screenPositions[i].x, screenPositions[i].y, buttonWord, {
          color: "black",
          fontSize: "40px",
          fontFamily: "minecraftia",
        })
        .setOrigin(0.5, 0.5);
      this.container.add(characterButton);
      characterButton.setAlign("center");

      characterButton.setInteractive();
      characterButton.on("pointerdown", () => {
        // sólo permitir interacción con el puzzle si el resultado no está decidido
        // En realidad esto no debería hacer falta, pero por si las moscas...
        if (this.puzzleResult !== "ongoing") return;
        // ¿coincide el índice pulsado con bueno?
        if (i === this.buttonIndexToPress) {
          this.emitter.particleTint = colors.right;
          this.endPuzzle(true);
          this.puzzleResult = "success";
        } else {
          // nos hemos equivocado, acaba el puzzle en fracaso.
          this.emitter.particleTint = colors.wrong;
          this.endPuzzle(false);
          this.puzzleResult = "failure";
        }
      });

      characterButton.on("pointerover", () => {
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
  }

  createSpeechBubble(
    x: number,
    y: number,
    width: number,
    height: number,
    orientation: "left" | "right"
  ) {
    const bubbleWidth = width;
    const bubbleHeight = height;
    const arrowHeight = bubbleHeight / 6;

    const bubble = this.add.graphics({ x: x, y: y });
    this.container.add(bubble);

    //  Bubble shadow
    bubble.fillStyle(0x222222, 0.5);
    bubble.fillRoundedRect(6, 6, bubbleWidth, bubbleHeight, 16);

    //  Bubble color
    bubble.fillStyle(0xffffff, 1);

    //  Bubble outline line style
    bubble.lineStyle(4, 0x565656, 1);

    //  Bubble shape and outline
    bubble.strokeRoundedRect(0, 0, bubbleWidth, bubbleHeight, 16);
    bubble.fillRoundedRect(0, 0, bubbleWidth, bubbleHeight, 16);

    //  Calculate arrow coordinates
    const point1X = Math.floor(orientation === "left" ? 0 : bubbleWidth - 15);
    const point1Y = bubbleHeight - 10;
    const point2X = Math.floor(
      orientation === "left" ? -(bubbleWidth / 7) : 8 * (bubbleWidth / 7)
    );
    const point2Y = bubbleHeight - 10;
    const point3X = Math.floor(orientation === "left" ? 0 : bubbleWidth - 15);
    const point3Y = Math.floor(bubbleHeight - arrowHeight);

    //  Bubble arrow fill
    bubble.fillTriangle(point1X, point1Y, point2X, point2Y, point3X, point3Y);
    bubble.lineStyle(2, 0xffffff, 1);
    bubble.lineBetween(point2X, point2Y, point3X, point3Y);
    bubble.lineBetween(point1X, point1Y, point3X, point3Y);
  }
} // BasePuzzle
