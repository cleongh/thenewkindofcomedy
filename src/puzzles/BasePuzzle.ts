import Phaser from "phaser";

export const frameWidth = 1200;
export const frameHeight = 800;


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
    protected frameWidth = frameWidth;
    protected frameHeight = frameHeight;
    protected container;
    private closeTween;
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

    playSuccessSound() {
        const risasSound = this.sound.add("risas1", { volume: 1 });
        const risasTween = this.tweens.add({
            targets: risasSound,
            duration: 2200,
            volume: 0,
        });

        risasSound.on("complete", () => {
            risasTween.stop();
            risasSound.destroy();
        });

        risasSound.play();
    }

    playFailureSound() { }

    playTrySound() {
        this.sound.play("bat");
    }

    resetSoundTracks() { }

    /**
     * Creación del background genérico del puzzle y del botón de cerrado
     */
    create() {
        /**
         * Panel que tendrá el juego y tiene botón de cerrar.
         */
        this.container = this.add.container(
            this.game.config.width / 2,
            this.game.config.height - this.frameHeight / 2 - 48 * 2);
        this.container.width = this.frameWidth;
        this.container.height = this.frameHeight;

        let frame = this.add
            .nineslice(
                0,
                0,
                "backgroundTile",
                0,
                this.frameWidth,
                this.frameHeight,
                4,
                4,
                4,
                4
            )
            .setAlpha(0.8);
        this.container.add(frame);
        let closePuzzleButton = this.add
            .image(this.frameWidth / 2 - 40, -this.frameHeight / 2 + 20, "exitIcon")
            .setOrigin(1, 0)
            .setScale(4, 4);

        closePuzzleButton.setInteractive();
        closePuzzleButton.on("pointerdown", () => {
            if (this.onPuzzleClosed) {
                this.closePanel();
                this.input.stopPropagation();
            }
        });
        this.container.add(closePuzzleButton);

        const when_down = 800;
        const when_down2 = 300;

        this.closeTween = this.add.timeline([
            {
                at: 100,
                tween: {
                    targets: this.container,
                    scale: 0.8,
                    duration: 400,
                    ease: "Power2",
                },
            },
            {
                at: when_down,
                tween: {
                    targets: this.container,
                    y: this.game.config.height + this.frameHeight,
                    duration: when_down2,
                    ease: "Quint.easeIn",
                },
            },
            {
                at: when_down + when_down2,
                tween: {
                    targets: this.container,
                    run: () => {
                        this.onPuzzleClosed();
                    },
                },
            },
        ]);
    } // create

    closePanel() {
        this.closeTween.play();
    }

    endPuzzle(success) {
        let endTween = this.add.timeline([
            {
                at: 1000,
                tween: {
                    targets: this.container,
                    run: () => {
                        this.closePanel();
                    },
                },
            },
            {
                at: 2000,
                tween: {
                    targets: this.container,
                    run: () => {
                        this.onPuzzleEnd(success);
                    },
                },
            },
        ]);
        endTween.play();
    }
} // BasePuzzle
