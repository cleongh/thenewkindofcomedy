import Phaser from "phaser";

export interface BasePuzzleProps {
  /**
   * Callback a llamar cuando finalice el puzzle con el resultado de su ejecución.
   */
  onPuzzleEnd: (success: boolean) => void;

  /**
   * Callback a llamar cuando el usuario pulse sobre el botón de cerrar el puzzle.
   */
  onPuzzleClosed: () => void;
} // BasePuzzleProps

/**
 * @extends Phaser.Scene
 */
export default abstract class BasePuzzle extends Phaser.Scene {
  protected  frameWidth = 1600
  protected frameHeight = 800
  protected container;
  /**
   * Callback a llamar cuando finalice el puzzle con el resultado de su ejecución.
   */
  protected onPuzzleEnd: (success: boolean) => void;

  /**
   * Callback a llamar cuando el usuario pulse sobre el botón de cerrar el puzzle.
   */
  protected onPuzzleClosed: () => void;

  init({ onPuzzleClosed, onPuzzleEnd }: BasePuzzleProps) {
    this.onPuzzleEnd = onPuzzleEnd;
    this.onPuzzleClosed = onPuzzleClosed;
  }

  /**
   * Creación del background genérico del puzzle y del botón de cerrado
   */
  create() {
    /**
     * Panel que tendrá el juego y tiene botón de cerrar.
     */
    this.container = this.add.container(this.game.config.width/2, this.game.config.height/2);
    this.container.width = this.frameWidth;
    this.container.height = this.frameHeight;

    let frame = this.add.nineslice(0, 0, 'brownFrame', 0, this.frameWidth, this.frameHeight, 1, 1, 1, 0).setAlpha(0.8);
    this.container.add(frame);
    let closePuzzleButton = this.add.image(this.frameWidth/2-40, -this.frameHeight/2+20, "exitIcon").setOrigin(1,0);

    closePuzzleButton.setInteractive();
    closePuzzleButton.on("pointerdown", () => {
      if (this.onPuzzleClosed) {
        this.onPuzzleClosed();
        this.input.stopPropagation()
      }
    });
    this.container.add(closePuzzleButton)

  } // create

} // BasePuzzle
