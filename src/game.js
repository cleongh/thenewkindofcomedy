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
import { PhaserNavMeshPlugin } from "phaser-navmesh";
import PuzzleTest from './puzzles/PuzzleTest'
import HumorTypes from './puzzles/HumorTypes.ts';

/**
 * Inicio del juego en Phaser. Creamos el archivo de configuración del juego y creamos
 * la clase Game de Phaser, encargada de crear e iniciar el juego.
 */
let config = {
    type: Phaser.AUTO,
    width: 2048,
    height: 1024,
    scale: {
        mode: Phaser.Scale.FIT,  
        autoCenter: Phaser.Scale.CENTER_HORIZONTALLY
    },
    pixelArt: true,
    scene: [Boot , Menu, Level1, Credits, Win, Lose, LaughAt, PuzzleTest, HumorTypes //, Level2, Level3
           ],
    plugins: {
        scene: [
            {
            key: "NavMeshPlugin", // Key to store the plugin class under in cache
            plugin: PhaserNavMeshPlugin, // Class that constructs plugins
            mapping: "navMeshPlugin", // Property mapping to use for the scene, e.g. this.navMeshPlugin
            start: true,
            },
        ],
    },
    physics: {
        default: 'arcade',
        arcade: {
            gravity: { y: 0 },
            debug: true
        }
    }
};

new Phaser.Game(config);
