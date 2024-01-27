import Phaser from "phaser";
import BasePuzzle, { BasePuzzleProps } from "./BasePuzzle";

/**
 * ESTO ES UNA ESCENA DE PRUEBA PARA COMO SE VERIAN LOS PUZZLES
 * DE MOMENTO PENSANDO EN EL DE "LaughAt"
 * @extends Phaser.Scene
 */
export default class PuzzleTest extends BasePuzzle {

  /**
   * Constructor de la escena
   */
  constructor() {
    super({ key: "puzzleTest" });
  }

  init(props: BasePuzzleProps): void {
    super.init({ ...props });

  } // init

  create() {
    super.create();

    let p1 = this.add.sprite(-300, -200, 'pelirroja').setScale(2);
    p1.play("rotate_pelirroja");
    let p2 = this.add.sprite(300, -200, 'barbudo').setScale(2);
    p2.play("rotate_barbudo");
    let p3 = this.add.sprite(-300, 200, 'bigotes').setScale(2);
    p3.play("rotate_bigotes");
    let p4 = this.add.sprite(300, 200, 'elvis').setScale(2);
    p4.play("rotate_elvis");

    this.container.add(p1);
    this.container.add(p2);
    this.container.add(p3);
    this.container.add(p4);
  } // create
} // BasePuzzle
