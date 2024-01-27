import Phaser from 'phaser'

// import platform from '../assets/sprites/platform.png'
// import base from '../assets/sprites/base.png'
// import star from '../assets/sprites/star.png'
import player from '../assets/sprites/player.png'
import upstairs from '../assets/sprites/upstairs.png'
import walls from '../assets/sprites/walls.png'
import kitchen from '../assets/sprites/kitchen.png'
// import client from '../assets/sprites/client.png'

/* ----- PERSONAJES -----*/
import barbudo from '../assets/sprites/characters/barbudo.png'
import bigotes from '../assets/sprites/characters/bigotes.png'
import elvis from '../assets/sprites/characters/elvis.png'
import gorrito from '../assets/sprites/characters/gorrito.png'
import niga from '../assets/sprites/characters/niga.png'
import nigaplus from '../assets/sprites/characters/nigaplus.png'
import peliazul from '../assets/sprites/characters/peliazul.png'
import pelirroja from '../assets/sprites/characters/pelirroja.png'
import playero from '../assets/sprites/characters/playero.png'
import policeman from '../assets/sprites/characters/policeman.png'
import seniora from '../assets/sprites/characters/seniora.png'
import sherif from '../assets/sprites/characters/sherif.png'
/* ----- PERSONAJES FIN -----*/

/* ----- UI -----*/
import brownFrame from '../assets/ui/brown.png'
import exitIcon from '../assets/ui/exit.png'
/* ----- UI FIN -----*/

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
        super('boot');
    }

    /**
     * Carga de los assets del juego
     */
    preload(){ 
        // Con setPath podemos establecer el prefijo que se añadirá a todos los load que aparecen a continuación
        // this.load.setPath('assets/sprites/');
        // this.load.image('platform', platform);
        // this.load.image('base', base);
        this.load.image('upstairs', upstairs);
        this.load.image('walls', walls);
        this.load.image('kitchen', kitchen);
        this.load.image('player', player);
        // this.load.image('alex_idle', alex_idle);
        // this.load.image('wallfloor', wallfloor)

        this.load.image('brownFrame', brownFrame);
        this.load.image('exitIcon', exitIcon);

        this.load.spritesheet('pelirroja', pelirroja, { frameWidth: 48, frameHeight: 100, startFrame: 0, endFrame: 3 });
        this.load.spritesheet('sherif', sherif, { frameWidth: 48, frameHeight: 100, startFrame: 0, endFrame: 3 });
        this.load.spritesheet('barbudo', barbudo, { frameWidth: 48, frameHeight: 100, startFrame: 0, endFrame: 3 });
        this.load.spritesheet('bigotes', bigotes, { frameWidth: 48, frameHeight: 100, startFrame: 0, endFrame: 3 });
        this.load.spritesheet('elvis', elvis, { frameWidth: 48, frameHeight: 100, startFrame: 0, endFrame: 3 });

    }

    create() {
        const characters = ['barbudo', 'bigotes', 'elvis', 'gorrito', 'niga', 'nigaplus', 'peliazul', 'pelirroja', 'playero', 'policeman', 'seniora', 'sherif']

        characters.forEach(char => {
            this.anims.create({
                key: 'idle_' + char,
                frames: this.anims.generateFrameNumbers(char, { start: 3, end: 3 }),
                frameRate: 1,
                repeat: -1
            });

            this.anims.create({
                key: 'rotate_' + char,
                frames: this.anims.generateFrameNumbers(char, { start: 0, end: 3 }),
                frameRate: 1,
                repeat: -1
            });
        })


        this.scene.start('level1');
    }
}
