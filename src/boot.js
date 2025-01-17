import Phaser from "phaser";

// import platform from '../assets/sprites/platform.png'
// import base from '../assets/sprites/base.png'
// import star from '../assets/sprites/star.png'
import player from "../assets/sprites/player.png";
import upstairs from "../assets/sprites/upstairs.png";
import walls from "../assets/sprites/walls.png";
import conference from "../assets/sprites/conference.png";
import music from "../assets/sprites/music.png";
import paredes3d from "../assets/sprites/paredes3d.png";
// import interiors from "../assets/sprites/interiors.png";
import kitchen from "../assets/sprites/kitchen.png";
// import client from '../assets/sprites/client.png'


/* ----- PERSONAJES -----*/
import barbudo from "../assets/sprites/characters/barbudo.png";
import bigotes from "../assets/sprites/characters/bigotes.png";
import elvis from "../assets/sprites/characters/elvis.png";
import gorrito from "../assets/sprites/characters/gorrito.png";
import niga from "../assets/sprites/characters/niga.png";
import nigaplus from "../assets/sprites/characters/nigaplus.png";
import peliazul from "../assets/sprites/characters/peliazul.png";
import pelirroja from "../assets/sprites/characters/pelirroja.png";
import playero from "../assets/sprites/characters/playero.png";
import policeman from "../assets/sprites/characters/policeman.png";
import seniora from "../assets/sprites/characters/seniora.png";
import sherif from "../assets/sprites/characters/sherif.png";
import guitarrista from "../assets/sprites/guitarrista.png";
import bateria from "../assets/sprites/bateria.png";
import piano from "../assets/sprites/piano.png";
/* ----- PERSONAJES FIN -----*/

/* ----- PERSONAJES PUZZLE LAUGH_AT-----*/
import character0 from "../assets/sprites/puzzles/rietede/character0.png";
import character1 from "../assets/sprites/puzzles/rietede/character1.png";
import character2 from "../assets/sprites/puzzles/rietede/character2.png";
import character3 from "../assets/sprites/puzzles/rietede/character3.png";
import character4 from "../assets/sprites/puzzles/rietede/character4.png";
import character5 from "../assets/sprites/puzzles/rietede/character5.png";
import character6 from "../assets/sprites/puzzles/rietede/character6.png";
import character7 from "../assets/sprites/puzzles/rietede/character7.png";
import character8 from "../assets/sprites/puzzles/rietede/character8.png";
import character9 from "../assets/sprites/puzzles/rietede/character9.png";
import character10 from "../assets/sprites/puzzles/rietede/character10.png";
import character11 from "../assets/sprites/puzzles/rietede/character11.png";
import character12 from "../assets/sprites/puzzles/rietede/character12.png";
import character13 from "../assets/sprites/puzzles/rietede/character13.png";
import character14 from "../assets/sprites/puzzles/rietede/character14.png";
import character15 from "../assets/sprites/puzzles/rietede/character15.png";
import character16 from "../assets/sprites/puzzles/rietede/character16.png";
import character17 from "../assets/sprites/puzzles/rietede/character17.png";
import character18 from "../assets/sprites/puzzles/rietede/character18.png";
import character19 from "../assets/sprites/puzzles/rietede/character20.png";
/* ----- PERSONAJES PUZZLE LAUGH_AT FIN -----*/

/* ----- PERSONAJES PUZZLE WHO_GOES_FIRST-----*/
import characterDerecha from "../assets/sprites/puzzles/primeraBase/characterDerecha.png";
import characterIzquierda from "../assets/sprites/puzzles/primeraBase/characterIzquierda.png";
/* ----- PERSONAJES PUZZLE WHO_GOES_FIRST FIN -----*/

/* ----- PERSONAJE BEBÉ PUZZLE SONIDOS*/
import babyCry from "../assets/sprites/babyCry.png";
import babyLaugh from "../assets/sprites/babyLaugh.png";
/* ----- PERSONAJE BEBÉ PUZZLE SONIDOS FIN*/

/* ---- ICONOS PUZZLE HUMOR TYPES ---- */
import iconNegro from "../assets/sprites/puzzles/tiposHumor/death.png";
import iconAmarillo from "../assets/sprites/puzzles/tiposHumor/Torii.png"
import iconVerde from "../assets/sprites/puzzles/tiposHumor/eggplant.png"
import iconEscatológico from "../assets/sprites/puzzles/tiposHumor/poop.png"
import iconBlanco from "../assets/sprites/puzzles/tiposHumor/pegi3.png"
/* ---- ICONOS PUZZLE HUMOR TYPES ---- */

/* ---- FRAMES PUZZLE HUMOR TYPES ---- */
import frameNegro from "../assets/sprites/puzzles/tiposHumor/frameNegro.png";
import frameAmarillo from "../assets/sprites/puzzles/tiposHumor/frameAmarillo.png"
import frameVerde from "../assets/sprites/puzzles/tiposHumor/frameVerde.png"
import frameEscatológico from "../assets/sprites/puzzles/tiposHumor/frameMarron.png"
import frameBlanco from "../assets/sprites/puzzles/tiposHumor/frameBlanco.png"
/* ---- FRAMES PUZZLE HUMOR TYPES ---- */


/* ----- UI -----*/
import brownFrame from "../assets/ui/brown.png";
import exitIcon from "../assets/ui/exit2.png";
import flare from "../assets/ui/white-flare.png";
import backgroundTile from "../assets/ui/frame.png";//"../assets/ui/bg.png";
/* ----- UI FIN -----*/


/*------ MENU -------*/
import menu from "../assets/sprites/menu/menu.png";
import fondoMenu from "../assets/sprites/menu/fondoMenu.png";
import elena from "../assets/sprites/menu/elena-px.png";
import marco from "../assets/sprites/menu/marco-px.png";
import pedropablo from "../assets/sprites/menu/pedropablo-px.png";
/*------ MENU FIN -------*/

/* ----- AUDIOS bebé -----*/
import Be from "../assets/audio/baby/Be.wav";
import Bi from "../assets/audio/baby/Bi.wav";
import Ga from "../assets/audio/baby/Ga.wav";
import Gu from "../assets/audio/baby/Gu.wav";
import Gui from "../assets/audio/baby/Gui.wav";
import Ma from "../assets/audio/baby/Ma.wav";
import Me from "../assets/audio/baby/Me.wav";
import Mi from "../assets/audio/baby/Mi.wav";
import Mu from "../assets/audio/baby/Mu.wav";
import Pa from "../assets/audio/baby/Pa.wav";
import Pi from "../assets/audio/baby/Pi.wav";
import Pu from "../assets/audio/baby/Pu.wav";
/* ----- AUDIOS bebé FIN -----*/

import abucheo from "../assets/music/abucheo.wav";
import aplauso1 from "../assets/music/aplauso.wav";
import aplauso2 from "../assets/music/aplauso2.wav";
import alabanza from "../assets/music/uouuuuu.wav";
import risas1 from "../assets/music/risas.wav";
import risas2 from "../assets/music/risas2.wav";
import musica1 from "../assets/music/king.ogg";
import musica2 from "../assets/music/jazzy.ogg";
import bat from "../assets/music/bat1.wav";

import wood_fx from "../assets/sprites/wood_fx.png";
import particle_win from "../assets/sprites/particleWin.png";
import particle_loose from "../assets/sprites/particleLoose.png";

export const characters = [
  "barbudo",
  "bigotes",
  "elvis",
  "gorrito",
  "niga",
  "nigaplus",
  "peliazul",
  "pelirroja",
  "playero",
  "policeman",
  "seniora",
  "sherif",
];

export const availableBabySounds = {
  Be,
  Bi,
  Ga,
  Gu,
  Gui,
  Ma,
  Me,
  Mi,
  Mu,
  Pa,
  Pi,
  Pu,
};

// import alex from '../assets/sprites/alex.png'
// import wallfloor from '../assets/sprites/wall-floor.png'
/**
 * Escena para la precarga de los assets que se usarán en el juego.
 * Esta escena se puede mejorar añadiendo una imagen del juego y una
 * barra de progreso de carga de los assets
 * @see {@link https://gamedevacademy.org/creating-a-preloading-screen-in-phaser-3/} como ejemplo
 * sobre cómo hacer una barra de progreso.
 */
export default class Boot extends Phaser.Scene {
  /**
   * Constructor de la escena
   */
  constructor() {
    super("boot");
  }

  /**
   * Carga de los assets del juego
   */
    preload() {


    this.load.audio("musica1", musica1);
    this.load.audio("musica2", musica2);
    this.load.audio("bat", bat);
    this.load.audio("abucheo", abucheo);
    this.load.audio("aplauso1", aplauso1);
    this.load.audio("aplauso2", aplauso2);
    this.load.audio("risas1", risas1);
    this.load.audio("risas2", risas2);
    this.load.audio("alabanza", alabanza);

    // Con setPath podemos establecer el prefijo que se añadirá a todos los load que aparecen a continuación
    // this.load.setPath('assets/sprites/');
    // this.load.image('platform', platform);
    // this.load.image('base', base);
    this.load.image("upstairs", upstairs);
        this.load.image("walls", walls);
        this.load.image("music", music);
        this.load.image("conference", conference);
      this.load.image("paredes3d", paredes3d);
      // this.load.image("interiors", interiors);      
    this.load.image("kitchen", kitchen);
    this.load.image("player", player);
    // this.load.image('alex_idle', alex_idle);
    // this.load.image('wallfloor', wallfloor)

    this.load.image("brownFrame", brownFrame);
    this.load.image("backgroundTile", backgroundTile);
      this.load.image("exitIcon", exitIcon);
      this.load.image("guitarrista", guitarrista);
      this.load.image("bateria", bateria);
                  this.load.image("piano", piano);
    this.load.image("flare", flare);

    // MENUS
    this.load.image("menu", menu);
    this.load.image("fondoMenu", fondoMenu);
    this.load.image("elena", elena);
    this.load.image("marco", marco);
    this.load.image("pedropablo", pedropablo);

    // HUMOR TYPES
    this.load.image("iconNegro", iconNegro);
    this.load.image("iconAmarillo", iconAmarillo);
    this.load.image("iconVerde", iconVerde);
    this.load.image("iconEscatológico", iconEscatológico);
    this.load.image("iconBlanco", iconBlanco);

    this.load.image("frameNegro", frameNegro);
    this.load.image("frameAmarillo", frameAmarillo);
    this.load.image("frameVerde", frameVerde);
    this.load.image("frameEscatológico", frameEscatológico);
    this.load.image("frameBlanco", frameBlanco);

    this.load.image('wood_fx', wood_fx);
    this.load.image('particle_win', particle_win);
    this.load.image('particle_loose', particle_loose);

    this.load.spritesheet("characterDerecha", characterDerecha, {
      frameWidth: 48,
      frameHeight: 96,
      startFrame: 0,
      endFrame: 4,
    });
    this.load.spritesheet("characterIzquierda", characterIzquierda, {
      frameWidth: 48,
      frameHeight: 96,
      startFrame: 0,
      endFrame: 4,
    });

    this.load.spritesheet("babyLaugh", babyLaugh, {
      frameWidth: 48,
      frameHeight: 96,
      startFrame: 0,
      endFrame: 0,
    });
    this.load.spritesheet("babyCry", babyCry, {
      frameWidth: 48,
      frameHeight: 96,
      startFrame: 0,
      endFrame: 4,
    });


    this.load.spritesheet("sherif", sherif, {
      frameWidth: 48,
      frameHeight: 100,
      startFrame: 0,
      endFrame: 135,
    });
    this.load.spritesheet("barbudo", barbudo, {
      frameWidth: 48,
      frameHeight: 100,
      startFrame: 0,
      endFrame: 135,
    });
    this.load.spritesheet("bigotes", bigotes, {
      frameWidth: 48,
      frameHeight: 100,
      startFrame: 0,
      endFrame: 135,
    });
    this.load.spritesheet("elvis", elvis, {
      frameWidth: 48,
      frameHeight: 100,
      startFrame: 0,
      endFrame: 135,
    });

    this.load.spritesheet("gorrito", gorrito, {
      frameWidth: 48,
      frameHeight: 100,
      startFrame: 0,
      endFrame: 135,
    });
    this.load.spritesheet("niga", niga, {
      frameWidth: 48,
      frameHeight: 100,
      startFrame: 0,
      endFrame: 135,
    });
    this.load.spritesheet("nigaplus", nigaplus, {
      frameWidth: 48,
      frameHeight: 100,
      startFrame: 0,
      endFrame: 135,
    });
    this.load.spritesheet("peliazul", peliazul, {
      frameWidth: 48,
      frameHeight: 100,
      startFrame: 0,
      endFrame: 135,
    });
    this.load.spritesheet("pelirroja", pelirroja, {
      frameWidth: 48,
      frameHeight: 100,
      startFrame: 0,
      endFrame: 135,
    });
    this.load.spritesheet("playero", playero, {
      frameWidth: 48,
      frameHeight: 100,
      startFrame: 0,
      endFrame: 135,
    });
    this.load.spritesheet("policeman", policeman, {
      frameWidth: 48,
      frameHeight: 100,
      startFrame: 0,
      endFrame: 135,
    });
    this.load.spritesheet("seniora", seniora, {
      frameWidth: 48,
      frameHeight: 100,
      startFrame: 0,
      endFrame: 135,
    });
    this.load.spritesheet("sherif", seniora, {
      frameWidth: 48,
      frameHeight: 100,
      startFrame: 0,
      endFrame: 135,
    });

    this.load.spritesheet("character0", character0, {
      frameWidth: 48,
      frameHeight: 96,
      startFrame: 0,
      endFrame: 3,
    });
    this.load.spritesheet("character1", character1, {
      frameWidth: 48,
      frameHeight: 96,
      startFrame: 0,
      endFrame: 3,
    });
    this.load.spritesheet("character2", character2, {
      frameWidth: 48,
      frameHeight: 96,
      startFrame: 0,
      endFrame: 3,
    });
    this.load.spritesheet("character3", character3, {
      frameWidth: 48,
      frameHeight: 96,
      startFrame: 0,
      endFrame: 3,
    });
    this.load.spritesheet("character4", character4, {
      frameWidth: 48,
      frameHeight: 96,
      startFrame: 0,
      endFrame: 3,
    });
    this.load.spritesheet("character5", character5, {
      frameWidth: 48,
      frameHeight: 96,
      startFrame: 0,
      endFrame: 3,
    });
    this.load.spritesheet("character6", character6, {
      frameWidth: 48,
      frameHeight: 96,
      startFrame: 0,
      endFrame: 3,
    });
    this.load.spritesheet("character7", character7, {
      frameWidth: 48,
      frameHeight: 96,
      startFrame: 0,
      endFrame: 3,
    });
    this.load.spritesheet("character8", character8, {
      frameWidth: 48,
      frameHeight: 96,
      startFrame: 0,
      endFrame: 3,
    });
    this.load.spritesheet("character9", character9, {
      frameWidth: 48,
      frameHeight: 96,
      startFrame: 0,
      endFrame: 3,
    });
    this.load.spritesheet("character10", character10, {
      frameWidth: 48,
      frameHeight: 96,
      startFrame: 0,
      endFrame: 3,
    });
    this.load.spritesheet("character11", character11, {
      frameWidth: 48,
      frameHeight: 96,
      startFrame: 0,
      endFrame: 3,
    });
    this.load.spritesheet("character12", character12, {
      frameWidth: 48,
      frameHeight: 96,
      startFrame: 0,
      endFrame: 3,
    });
    this.load.spritesheet("character13", character13, {
      frameWidth: 48,
      frameHeight: 96,
      startFrame: 0,
      endFrame: 3,
    });
    this.load.spritesheet("character14", character14, {
      frameWidth: 48,
      frameHeight: 96,
      startFrame: 0,
      endFrame: 3,
    });
    this.load.spritesheet("character15", character15, {
      frameWidth: 48,
      frameHeight: 96,
      startFrame: 0,
      endFrame: 3,
    });
    this.load.spritesheet("character16", character16, {
      frameWidth: 48,
      frameHeight: 96,
      startFrame: 0,
      endFrame: 3,
    });
    this.load.spritesheet("character17", character17, {
      frameWidth: 48,
      frameHeight: 96,
      startFrame: 0,
      endFrame: 3,
    });
    this.load.spritesheet("character18", character18, {
      frameWidth: 48,
      frameHeight: 96,
      startFrame: 0,
      endFrame: 3,
    });
    this.load.spritesheet("character19", character19, {
      frameWidth: 48,
      frameHeight: 96,
      startFrame: 0,
      endFrame: 3,
    });

    // ----------------------------------------------
    //                  Carga de Audios
    //-----------------------------------------------

    Object.entries(availableBabySounds).forEach(([soundName, soundSrc]) =>
      this.load.audio(soundName, [soundSrc])
    );
  }

    create() {

        // this.load.on('complete', ()  =>{
        //     // console.log(p)
            
        //                         this.scene.start("level1");

        // });

    characters.forEach((char) => {
      this.anims.create({
        key: "idle_" + char,
        frames: this.anims.generateFrameNumbers(char, { start: 3, end: 3 }),
        frameRate: 1,
        repeat: -1,
      });

      this.anims.create({
        key: "rotate_" + char,
        frames: this.anims.generateFrameNumbers(char, { start: 0, end: 3 }),
        frameRate: 1,
        repeat: -1,
      });

      this.anims.create({
        key: "move_right_" + char,
        frames: this.anims.generateFrameNumbers(char, { start: 112, end: 117 }),
        frameRate: 5,
        repeat: -1,
      });

      this.anims.create({
        key: "move_up_" + char,
        frames: this.anims.generateFrameNumbers(char, { start: 118, end: 123 }),
        frameRate: 5,
        repeat: -1,
      });

      this.anims.create({
        key: "move_left_" + char,
        frames: this.anims.generateFrameNumbers(char, { start: 124, end: 129 }),
        frameRate: 5,
        repeat: -1,
      });

      this.anims.create({
        key: "move_down_" + char,
        frames: this.anims.generateFrameNumbers(char, { start: 130, end: 135 }),
        frameRate: 5,
        repeat: -1,
      });
    });

    /**
     * Personajes del puzzle LaughAt
     */
    const laughPuzzleCharacters = 19;
    for (let i = 0; i < laughPuzzleCharacters; i++) {
      let char = "character" + i;
      this.anims.create({
        key: "rotate_" + i,
        frames: this.anims.generateFrameNumbers(char, { start: 0, end: 3 }),
        frameRate: 4,
        repeat: -1,
      });
    }

    this.anims.create({
      key: "characterDerecha",
      frames: this.anims.generateFrameNumbers("characterDerecha", {
        start: 0,
        end: 3,
      }),
      frameRate: 4,
      repeat: -1,
    });

    this.anims.create({
      key: "characterIzquierda",
      frames: this.anims.generateFrameNumbers("characterIzquierda", {
        start: 0,
        end: 3,
      }),
      frameRate: 4,
      repeat: -1,
    });

    /**
     * Personajes del puzzle BabyTalk
     */
    this.anims.create({
      key: "cry_baby",
      frames: this.anims.generateFrameNumbers("babyCry", { start: 0, end: 3 }),
      frameRate: 4,
      repeat: -1,
    });

    this.anims.create({
      key: "laugh_baby",
      frames: this.anims.generateFrameNumbers("babyLaugh", {
        start: 0,
        end: 0,
      }),
      frameRate: 4,
      repeat: -1,
    });


    this.scene.start("menu");
  }
}
