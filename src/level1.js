import Phaser from 'phaser'
import Level from './level.js'
import Client from './client.js'

import map from '../assets/maps/level1.json'

export default class Level1 extends Level {
    constructor() {
        super('level1', 50, 50);

    }

    preload() {
        this.load.tilemapTiledJSON('tilemap', map)
    }

    create() {
        super.create()
        this.add.text(10, 10, "nivel 1")
        this.map = this.make.tilemap({
            key: 'tilemap',
            tileWidth: 48, tileHeight: 48
        })

        const wall = this.map.addTilesetImage('walls', 'walls');
        const upstairs = this.map.addTilesetImage('upstairs', 'upstairs');

        this.map.createLayer('suelo', upstairs)
        let walls = this.map.createLayer('paredes', wall)
        let obstacle = this.map.createLayer('obstacle', wall)

        /**
         * Crear zonas de las mesas para lanzar minijuegos
         * He cogido la layer de objetos, esto hay que hacerlo con las mesas del mapa
         */
        let levelZone = this.physics.add.group();
        let objetos = this.map.createFromObjects('objetos', { gid: 1, key: 'player' })
        objetos.forEach(obj => {
            let zone = this.add.zone(obj.x, obj.y, 150, 150) // Crear zona de W*H tamaño, por ahora 150*150 centrado en el propio objeto
            levelZone.add(zone);
        });

        /**
         * El personaje se mueve a lo que seria una mesa y abre la escena del minijuego
         * 
         * NOTA!: Problema al pulsar botón de cerrar ya que el jugador seguirá en la zona que lanza el minijuego,
         * como solución compruebo que el personaje no haya recibido input de movimiento y no acabe de cerrar un minijuego.
         */
        this.physics.add.overlap(this.player, levelZone, (player, zone) => {
            if (player.isBored() && player.isStanding()) {
                player.setBored(false)
                let minijuego = 'puzzleTest' // ESto tendrá que ser el minijuego correspondiente, creo que comentamos que sería una propiedad de la propia mesa
                this.scene.launch(minijuego, {
                    onPuzzleClosed: () => {
                        this.scene.stop(minijuego) //Esto
                        this.scene.resume('level1')
                    },
                    onPuzzleEnd: () => {}
                });
                this.scene.pause(this)
            }
        })


        //this.map.createFromObjects('objetos', {gid: 1, key: 'player'})
        // const conId1 = 
        // console.log(conId1)
        //const navMesh = this.navMeshPlugin.buildMeshFromTilemap("mesh1", this.map, [walls,obstacle]);

    }

}
