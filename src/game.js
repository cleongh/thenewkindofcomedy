import Boot from './boot.js';
import Menu from './menu.js';
import Win from './win.js';
import Credits from './credits.js';
import Lose from './lose.js';
import Level1 from './level1.js';
// import Level2 from './level2.js';
// import Level3 from './level3.js';
// import End from './end.js';
// import Level from './level.js';
import Phaser from 'phaser'
import LaughAt from './puzzles/LaughAt.ts';

/**
 * Inicio del juego en Phaser. Creamos el archivo de configuración del juego y creamos
 * la clase Game de Phaser, encargada de crear e iniciar el juego.
 */
let config = {
    type: Phaser.AUTO,
    width: 1000,
    height: 500,
    scale: {
        // mode: Phaser.Scale.FIT,  
        autoCenter: Phaser.Scale.CENTER_HORIZONTALLY
    },
    pixelArt: true,
    scene: [Boot , Menu, Level1, Credits, Win, Lose, LaughAt //, Level2, Level3
           ],
    physics: {
        default: 'arcade',
        arcade: {
            gravity: { y: 400 },
            debug: false
        }
    }
};

new Phaser.Game(config);
