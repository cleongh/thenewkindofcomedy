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

        const walls_ts = this.map.addTilesetImage('walls', 'walls');
        const kitchen_ts = this.map.addTilesetImage('kitchen', 'kitchen');
        const upstairs_ts = this.map.addTilesetImage('upstairs', 'upstairs');

        this.map.createLayer('suelo', upstairs_ts)
        this.map.createLayer('mesas', kitchen_ts)
        this.map.createLayer('props', kitchen_ts)
        this.map.createLayer('walls', walls_ts)

        // const walls = 

        // const obstacle = this.map.createLayer('obstacles', wall)

        /**
         * Crear zonas de las mesas para lanzar minijuegos
         * He cogido la layer de objetos, esto hay que hacerlo con las mesas del mapa
         */
        const levelZone = this.physics.add.group();

        // const objetos =
        this.map.createFromObjects('objetos', { gid: 1, type: 'cliente', key: 'barbudo' }).forEach(obj => {
            obj.play('idle_barbudo')
        })
        
        this.map.objects.filter(o => o.name === "objetos")[0].objects.filter(t => t.type === "table").forEach(t => {
            levelZone.add(this.add.zone(t.x, t.y, t.width, t.height))
        })
        // this.map.createFromObjects('objetos', { gid: 1, type: 'cliente' }).forEach(obj => {
        //     obj.play('idle_barbudo')
        // })
        // objetos.forEach(obj => {
        //     const zone = this.add.zone(obj.x, obj.y, 150, 150) // Crear zona de W*H tamaño, por ahora 150*150 centrado en el propio objeto
        //     levelZone.add(zone);
        // });

        /**
         * El personaje se mueve a lo que seria una mesa y abre la escena del minijuego
         * 
         * NOTA!: Problema al pulsar botón de cerrar ya que el jugador seguirá en la zona que lanza el minijuego,
         * como solución compruebo que el personaje no haya recibido input de movimiento y no acabe de cerrar un minijuego.
         */
        this.physics.add.overlap(this.player, levelZone, (player, zone) => {
            if (player.isBored() && player.isStanding()) {
                player.setBored(false)
                const minijuego = 'puzzleTest' // ESto tendrá que ser el minijuego correspondiente, creo que comentamos que sería una propiedad de la propia mesa
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
