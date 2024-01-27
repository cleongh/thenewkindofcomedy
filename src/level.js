import Phaser from 'phaser'

import Player from './levels/player.js'
import Client from './client.js'
import Table from './levels/table.js'

export default class Level extends Phaser.Scene {
    constructor(name, tables = 5, time = 120) {
        super(name)

        this.showTime = time
        this.timer = 0
        this.tables = tables
    }


    create() {
        /* Tiempo de show */
        this.timerText = this.add.text(this.game.config.width / 2, 40, this.showTime, {
            fontSize: "40px",
            fontFamily: "minecraftia",
        }).setDepth(10);

        // esto habrá que pillarlo por los tiles
        // this.tableGroup = this.add.group();
        // for(let i=0; i<this.tables; i++){
        //     this.tableGroup.add(new Table(this, i*50, i*50));
        // }

        // this.player = new Player(this, this.xp, this.xp)




        this.map = this.make.tilemap({
            key: 'tilemap',
            tileWidth: 48, tileHeight: 48
        })

        const players = this.map.createFromObjects('objetos', { type: 'playerstart', classType: Player })
        players.forEach(obj => {
            // obj.play('idle_barbudo')
            obj.setDepth(10);
        });

        let tableArray = [];
        this.map.objects.filter(o => o.name === "objetos")[0].objects.filter(t => t.type === "collide").forEach(t => {
            let z = this.add.zone(t.x + t.width / 2, t.y + t.height / 2, t.width, t.height);
            z.setInteractive();
            z.setName(t.name);
            tableArray.push(z);
        })





        this.player = players[0]

        const walls_ts = this.map.addTilesetImage('paredes3d', 'paredes3d');
        const kitchen_ts = this.map.addTilesetImage('kitchen', 'kitchen');
        const upstairs_ts = this.map.addTilesetImage('upstairs', 'upstairs');
        // const interiors_ts = this.map.addTilesetImage('interiors', 'interiors');

        this.map.createLayer('suelo', upstairs_ts)
        let mesas = this.map.createLayer('mesas', kitchen_ts)
        
        let paredes = this.map.createLayer('walls', walls_ts)
        this.map.createLayer('props', [kitchen_ts, upstairs_ts])
                
        //pongo las colisiones
        mesas.setCollisionByExclusion(-1, true);
        paredes.setCollisionByExclusion(-1, true);

        // const walls = 

        // const obstacle = this.map.createLayer('obstacles', wall)

        /**
         * Crear zonas de las mesas para lanzar minijuegos
         * He cogido la layer de objetos, esto hay que hacerlo con las mesas del mapa
         */
        const levelZone = this.physics.add.group();

        // const objetos =
        const clients =
            this.map.createFromObjects('objetos', { type: 'cliente', classType: Client })



        // clients.forEach(obj => {
        //     obj.play('idle_barbudo')
        // })


        const musicians = this.map.objects.filter(o => o.name === "objetos")[0].objects.filter(t => t.type === "musician")

        for (let m of musicians) {
            for (let p of m.properties)
                if (p.name === 'instrument')
                    switch (p.value) {
                        case 'guitar':
                            this.add.sprite(m.x, m.y, 'guitarrista')
                            break
                        case 'drums':
                            this.add.sprite(m.x, m.y, 'bateria')
                            break
                        case 'piano':
                            this.add.sprite(m.x, m.y, 'piano')
                            break
                    }
        }

        // const musicians =
        //       this.map.createFromObjects('objetos', { type: 'musician', classType: Musician })

        this.number_musicians = musicians.length



        this.map.objects.filter(o => o.name === "objetos")[0].objects.filter(t => t.type === "table").forEach(t => {
            let z = this.add.zone(t.x + t.width / 2, t.y + t.height / 2, t.width, t.height)
            // console.log(t.properties)
            const posibles = t.properties.filter(p => p.name = "puzzle").map(t => t.value).join(',').split(',')
            // console.log(posibles)
            const random = Math.floor(Math.random() * posibles.length);

            z.puzzle = posibles[random];
            levelZone.add(z)

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

                console.log(this.number_musicians)
                const minijuego = zone.puzzle // 'puzzleTest' // ESto tendrá que ser el minijuego correspondiente, creo que comentamos que sería una propiedad de la propia mesa
                this.player.setEnableInput(false) // al lanzar el puzzle el jugador ya no debe moverse hasta que se cierre o termine el puzzle
                console.log("PLAYER NOOOO MOVE")
                this.scene.launch(minijuego, {
                    bandMembersAmount: this.number_musicians,
                    onPuzzleClosed: () => {
                        //console.log("PLAYER NOOOO MOVE")
                        this.scene.stop(minijuego) // Se cierra el puzzle
                        this.player.setEnableInput(true)
                        console.log("FIN JUEGO")
                        //this.scene.resume('level1')
                    },
                    onPuzzleEnd: () => {
                        console.log("PLAYER MOVE")
                        this.player.setEnableInput(true)
                    }
                });
                //this.scene.pause(this)
            }
        })


        //this.map.createFromObjects('objetos', {gid: 1, key: 'player'})
        // const conId1 = 
        // console.log(conId1)
        const navMesh = this.navMeshPlugin.buildMeshFromTilemap("mesh1", this.map, [mesas, paredes]);
        if (navMesh != null) {
            this.player.setNavmesh(navMesh);
            // ESto hay que meterlo como objeto por el mapa
            const graphics = this.add.graphics(0, 0).setAlpha(0.5);
            navMesh.enableDebug(graphics);
        }


    }

    update(t, dt) {
        // Contador
        this.timer += dt / 1000 // a pelo, ni timer ni pollas
        this.timerText.setText(`Show time: ${(this.showTime - this.timer).toFixed(0)}`);

        if (this.timer <= 0) {
            this.endShow(false);
        }
    }

    removeTable(table) {
        this.tableGroup.destroy(table);
        if (this.tableGroup.getChildren.length == 0) {
            this.endShow(false)
        }
    }

    endShow(win) {

    }

}
