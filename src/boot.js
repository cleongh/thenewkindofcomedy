import Phaser from 'phaser'

// import platform from '../assets/sprites/platform.png'
// import base from '../assets/sprites/base.png'
// import star from '../assets/sprites/star.png'
import player from '../assets/sprites/player.png'
import upstairs from '../assets/sprites/upstairs.png'
import walls from '../assets/sprites/walls.png'
// import client from '../assets/sprites/client.png'
import alex_idle from '../assets/sprites/alex_idle.png'
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
  preload() {
    // Con setPath podemos establecer el prefijo que se añadirá a todos los load que aparecen a continuación
    // this.load.setPath('assets/sprites/');
    // this.load.image('platform', platform);
    // this.load.image('base', base);
      this.load.image('upstairs', upstairs);
      this.load.image('walls', walls);
      this.load.image('player', player);
      // this.load.image('client', client);
      this.load.image('alex_idle', alex_idle);
      // this.load.image('wallfloor', wallfloor)

      this.load.spritesheet('alex_idle', alex_idle, { frameWidth: 48, frameHeight: 48,startFrame:0, endFrame: 3 });

      // const config = {
      //       key: 'idle',
      //       frames: this.anims.generateFrameNumbers('explosion', { start: 0, end: 23, first: 23 }),
      //       frameRate: 20,
      //       repeat: -1
      //   };

      //   this.anims.create(config);

  }

  /**
   * Creación de la escena. En este caso, solo cambiamos a la escena que representa el
   * nivel del juego
   */
    create() {
        
    this.scene.start('level1');
  }
}
