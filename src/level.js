import Phaser from 'phaser'

import Player from './levels/player.js'
import Client from './client.js'
import Table from './levels/table.js'

export default class Level extends Phaser.Scene {
    constructor(name) {
        super(name)

        this.showTime = 120
    }


    create() {
        this.timerTime = 0
        this.totalTables = 0;
        this.completedTables = 0;
        this.end = false;
        this.score = 0;
        this.posibleScore = 0;

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
            const posibles = t.properties.filter(p => p.name == "puzzle").map(t => t.value).join(',').split(',')
            // console.log(posibles)
            const random = Math.floor(Math.random() * posibles.length);

            z.puzzle = posibles[random];
            z.clients = t.properties.filter(p => p.name == "clients")[0].value
            z.table = t;
            levelZone.add(z)

            this.posibleScore+=z.clients
            this.totalTables++;
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
        let self = this;
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
                    onPuzzleEnd: (success) => {
                        console.log("PLAYER MOVE")
                        this.player.setEnableInput(true);
                        this.completedTables++;
                        if(success){
                            this.score += zone.clients;
                            this.scoreText.setText(this.score+"/"+this.posibleScore);
                        } else {
                            // LA MESA PETA
                        }
                        zone.destroy();
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



        /* Tiempo de show */        
        this.timerText = this.add.text(this.game.config.width/2-300, 40, this.showTime, {
            fontSize: "40px",
            fontFamily: "minecraftia",
            }).setDepth(10);

        /* SCORE */
        this.scoreText = this.add.text(this.game.config.width/2+300, 40, this.score+"/"+this.posibleScore, {
            fontSize: "40px",
            fontFamily: "minecraftia",
            }).setDepth(10);
    }

    update(t, dt) {
        // Contador
        if(!this.end){
            this.timerTime += dt/1000 // a pelo, ni timer ni pollas
            this.timerText.setText(`Show time: ${(this.showTime-this.timerTime).toFixed(0)}`);
        }
        

        if(this.timerTime <= 0 || this.completedTables == this.totalTables){
            this.endShow(this.score);
        } 
    }

    endShow(score){
        this.end=true;
        this.player.setEnableInput(false);

        let finishMessageText = "¡Se acabó el show!\n\n"
        // Si la puntuación acaba en 5, rima graciosa
        if (this.score.toString().slice(-1) == "5") {
            finishMessageText += `Has hecho reír a un total de ${this.score}. \n¡Por el culo te la hinco!`
        } else if (this.score == this.posibleScore) {
            finishMessageText += "Enhorabuena, todo el mundo se ha reído."
        } else if (this.score == 0) {
            finishMessageText += "No eres muy gracioso, no."
        } else {
            `Has hecho reír a ${this.score + " de " + this.posibleScore} asistentes.`
        }

        /**
         * Panel de fin de nivel
         */
        this.container = this.add.container(
            this.game.config.width / 2,
            this.game.config.height / 2
        ).setDepth(20);
        this.container.width = 1600;
        this.container.height = 800;
    
        let frame = this.add
            .nineslice(
            0,
            0,
            "backgroundTile",
            0,
            1600,
            800,
            1,
            1,
            1,
            0
            )
            .setAlpha(0.8);
        this.container.add(frame);
        let menuButton = this.add
        .text(0, 250, "Continuar", {
            fontSize: "40px",
            fontFamily: "minecraftia",
            })
            .setColor("black")
            .setOrigin(0.5, 0.5);
    
            menuButton.setInteractive();
            menuButton.on("pointerdown", () => {
            this.input.stopPropagation();
            //TODO go to menu
        });
        this.container.add(menuButton);


        let finishMessage = this.add.text(0, -100, finishMessageText, 
        {
            fontSize: "50px",
            fontFamily: "minecraftia",
            align: "center"
            })
            .setColor("black")
        .setOrigin(0.5, 0.5);
        this.container.add(finishMessage);
        }

}
