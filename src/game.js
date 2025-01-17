import Boot from "./boot.js";
import Menu from "./menu.js";
import Win from "./win.js";
import Credits from "./credits.js";
import Lose from "./lose.js";
import Level1 from "./level1.js";
import Level2 from "./level2.js";
import Level3 from "./level3.js";
// import Level2 from './level2.js';
// import Level3 from './level3.js';
// import End from './end.js';
// import Level from './level.js';
import Phaser from "phaser";
import LaughAt from "./puzzles/LaughAt.ts";
import { PhaserNavMeshPlugin } from "phaser-navmesh";
import HumorTypes from "./puzzles/HumorTypes.ts";
import WhoGoesFirst from "./puzzles/WhoGoesFirst.ts";
import BabyTalk from "./puzzles/BabyTalk.ts";

/**
 * Inicio del juego en Phaser. Creamos el archivo de configuración del juego y creamos
 * la clase Game de Phaser, encargada de crear e iniciar el juego.
 */
const tiles_w = 30;
const tiles_h = 21;
const tile_size = 48
let config = {
    type: Phaser.AUTO,
    width: tiles_w * tile_size,
    height: tiles_h * tile_size,
    parent: "the-game",
    scale: {
        mode: Phaser.Scale.FIT,
        autoCenter: Phaser.Scale.CENTER_HORIZONTALLY,
    },
    pixelArt: true,
    scene: [
        Boot,
        Menu,
        Level1,
        Level2,
        Level3,
        Credits,
        Win,
        Lose,
        LaughAt,
        HumorTypes,
        WhoGoesFirst,
        BabyTalk, //, Level2, Level3
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
    // loader: {  
    //     async: false
    // },
    physics: {
        default: "arcade",
        arcade: {
            gravity: { y: 0 },
            debug: false,
        },
    },
};

new Phaser.Game(config);

let bookLink = document.getElementById("the-book");
if (bookLink){
    bookLink.setAttribute("href", "./thebook/index.html");
}

