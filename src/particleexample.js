
import circle_fx from "../assets/sprites/circle_fx.png";
import wood_fx from "../assets/sprites/wood_fx.png";

import Phaser from "phaser";

var config = {
  type: Phaser.AUTO,
  width: 800,
  height: 600,
  scene: {
      preload: preload,
      create: create,
      update: update
  }
};

var game = new Phaser.Game(config);

function preload() {
  //Cargamos texturas para la particula
  this.load.image('wood_fx', wood_fx);
}

var emitter1,emitter2;

function create() { 
  //Creamos dos particulas. La configuración es muy básica
  var emitterConfig1 = {
    speed: {min:300,max:500},
    lifespan: 200,
    frequency: 3,
    duration: 100,
    rotate:{min:0,max:360},
    scale: {
      start: 0.05,
      end: 0.02,
      ease: 'Linear'
    },
    alpha: {
      start: 1.0,
      end: 0.7,
      ease: 'Linear'
    },
    tint: 0xFFFFFF, 
    blendMode: 'NORMAL',
    accelerationY: 500
  };

  var emitterConfig2 = {
    speed: {min:300,max:500},
    lifespan: 200,
    frequency: 10,
    duration: 100,
    rotate:{min:0,max:360},
    scale: {
      start: 0.2,
      end: 0.05,
      ease: 'Linear'
    },
    alpha: {
      start: 1.0,
      end: 0.2,
      ease: 'Linear'
    },
    tint: 0xFFFFFF, 
    blendMode: 'NORMAL',
    accelerationY: 500
  };

  emitter1 = createParticleEmitter(this, 200, 200, "wood_fx", emitterConfig1);
  emitter2 = createParticleEmitter(this, 200, 200, "wood_fx", emitterConfig2);

};

function update()
{

}

//Helper para añadir particulas a la escena
function createParticleEmitter(scene, x, y, texture, config) {
  return scene.add.particles(x, y, texture, config);
}