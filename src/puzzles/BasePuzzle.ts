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
    const closePuzzleButton = this.add.text(900, 50, "X", {
      color: "white",
      fontSize: "14px",
      fontFamily: "serif",
    });
    closePuzzleButton.setInteractive();
    closePuzzleButton.on("pointerdown", () => {
      if (this.onPuzzleClosed) this.onPuzzleClosed();
    });
  } // create
} // BasePuzzle
