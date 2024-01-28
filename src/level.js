import Phaser from 'phaser'

import {
    frameWidth ,
    frameHeight} from './puzzles/BasePuzzle.ts'

import Player from './levels/player.js'
import Client from './client.js'
import { colors } from './colors.ts'

export default class Level extends Phaser.Scene {
    constructor(name) {
        super(name)
        this.showTime = 60

        //Creamos dos particulas. La configuración es muy básica
        this.emitterWinConfig = {
            speed: {min:100,max:300},
            lifespan: 1000,
            frequency: 800,
            duration: -1,
            quantity: 10,
            rotate:{min:0,max:360},
            scale: {
                start: 1,
                end: 0.05,
            ease: 'Linear'
            },
                alpha: {
                start: 0.8,
                end: 0.7,
                ease: 'Linear'
            },
            tint: 0xFFFFFF, 
            blendMode: 'NORMAL'
        };

        this.emitterLooseConfig = {
            speed: {min:100,max:300},
            lifespan: 1000,
            quantity: 10,
            frequency: 800,
            duration: -1,
            rotate:{min:0,max:360},
            scale: {
                start: 0.8,
                end: 0.05,
            ease: 'Linear'
            },
                alpha: {
                start: 1.0,
                end: 0.5,
                ease: 'Linear'
            },
            tint: 0xFFFFFF, 
            blendMode: 'NORMAL'
        };
    }


    create() {
        this.timerTime = 0
        this.totalTables = 0;
        this.completedTables = 0;
        this.end = false;
        this.score = 0;
        this.posibleScore = 0;
        this.showTime = 60;

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

        const walls_ts = this.map.addTilesetImage('paredes3d');
        const kitchen_ts = this.map.addTilesetImage('kitchen');
        const upstairs_ts = this.map.addTilesetImage('upstairs');
        const conference_ts = this.map.addTilesetImage('conference');
        const music_ts = this.map.addTilesetImage('music');
        // const interiors_ts = this.map.addTilesetImage('interiors', 'interiors');

        this.map.createLayer('suelo', upstairs_ts)
        
        

        

        let paredes = this.map.createLayer('walls', [walls_ts, conference_ts,kitchen_ts])
        this.map.createLayer('escenario', [conference_ts, kitchen_ts])
        let mesas = this.map.createLayer('mesas', [kitchen_ts, conference_ts, music_ts])
        this.map.createLayer('props', [kitchen_ts, upstairs_ts,music_ts,conference_ts])

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

            this.posibleScore += z.clients
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
        this.physics.add.overlap(this.player, levelZone, (player, zone) => {
            // console.log(            player.isBored())
            //             console.log(            player.isStanding())
            if (player.isBored() && player.isStanding() && !this.end) {
                
                player.setBored(false)

                this.minijuego = zone.puzzle // 'puzzleTest' // ESto tendrá que ser el minijuego correspondiente, creo que comentamos que sería una propiedad de la propia mesa
                this.player.setEnableInput(false) // al lanzar el puzzle el jugador ya no debe moverse hasta que se cierre o termine el puzzle
                this.scene.launch(this.minijuego, {
                    bandMembersAmount: this.number_musicians,
                    onPuzzleClosed: () => {
                        this.scene.stop(this.minijuego) // Se cierra el puzzle
                        this.minijuego = null
                        this.player.setEnableInput(true)
                    },
                    onPuzzleEnd: (success) => {
                        console.log("PLAYER MOVE")
                        this.player.setEnableInput(true);
                        this.completedTables++;
                        if (success) {
                            this.score += zone.clients;
                            this.showTime += 15;
                            this.scoreText.setText(this.score + "/" + this.posibleScore);
                        } else {
                            // LA MESA PETA
                        }
                        this.generateParticles(zone.x, zone.y, success);
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
        this.timerText = this.add.text(this.game.config.width / 2 - 300, this.game.config.height-24, this.showTime, {
            fontSize: "40px",
            fontFamily: "minecraftia",
        }).setDepth(10).setOrigin(0.5, 1);

        /* SCORE */
        this.scoreText = this.add.text(this.game.config.width / 2 + 300, this.game.config.height-24, this.score + "/" + this.posibleScore, {
            fontSize: "40px",
            fontFamily: "minecraftia",
        }).setDepth(10).setOrigin(0.5, 1);
    }

    update(t, dt) {
        // Contador
        if (!this.end) {
            this.timerTime += dt / 1000 // a pelo, ni timer ni pollas
            if (this.timerTime >= this.showTime || this.completedTables == this.totalTables) {
                this.timerText.setText(`The show is over`);
                this.endShow(this.score);
            } else {
                this.timerText.setText(`Show time: ${(this.showTime - this.timerTime).toFixed(0)}`);
            }
        }
    }

    endShow(score) {
        this.end = true;

        // Cerrar minijuego en curso (si no es null o undefined)
        if (this.minijuego != null) {
            this.scene.stop(this.minijuego)
            this.scene.get(this.minijuego).resetSoundTracks()
        }
        this.minijuego = null

        // Parar player
        this.player.stopMoving();
        this.player.setEnableInput(false);

        /**
         * Panel de fin de nivel
         */
        this.container = this.add.container(
            this.game.config.width / 2,
            this.game.config.height / 2
        ).setDepth(20);
        this.container.width = frameWidth;
        this.container.height = frameHeight;
        // Background
        let frame = this.add
            .nineslice(
                0,
                0,
                "backgroundTile",
                0,
                        this.container.width,
        this.container.height,
                1,
                1,
                1,
                0
            )
            .setAlpha(0.8);
        this.container.add(frame);

        // Texto de final de nivel 
        let finishMessageText = "¡Se acabó el show!\n\n"
        // Si la puntuación acaba en 5, rima graciosa
        if (this.score.toString().slice(-1) == "5") {
            finishMessageText += `Has hecho reír a un total de ${this.score}. \n¡Por el culo te la hinco!`
        } else if (this.score == this.posibleScore) {
            finishMessageText += "Enhorabuena, todo el mundo se ha reído."
        } else if (this.score == 0) {
            finishMessageText += "No eres muy gracioso, no."
        } else {
            finishMessageText += `Has hecho reír a ${this.score + " de " + this.posibleScore} asistentes.`
        }

        let finishMessage = this.add.text(0, -100, finishMessageText,
            {
                fontSize: "50px",
                fontFamily: "minecraftia",
                align: "center"
            })
            .setColor("black")
            .setOrigin(0.5, 0.5);
        this.container.add(finishMessage);

        // Botón para volver al menú    
        let menuButton = this.add
            .text(0, 250, "Continuar", {
                fontSize: "40px",
                fontFamily: "minecraftia",
            })
            .setColor("black")
            .setOrigin(0.5, 0.5);
        // Con su emitter bonito
        let emitter = this.add.particles(0, 0, "flare", {
            speed: 24,
            lifespan: 1500,
            quantity: 5,
            scale: { start: 0.2, end: 0 },
            advance: 2000,
            emitZone: [{
                type: "edge",
                source: new Phaser.Geom.Rectangle(
                    this.container.x + menuButton.x - 20 - menuButton.width / 2,
                    this.container.y + menuButton.y - 20 - menuButton.height / 2,
                    menuButton.width + 40,
                    menuButton.height + 40
                ),
                quantity: 42,
            }
            ],
            tint: colors.hover,
        })
            .setDepth(21);
        menuButton.setInteractive();
        menuButton.on("pointerdown", () => {
            emitter.particleTint = colors.right;
            this.input.stopPropagation();
            this.time.delayedCall(500, () => {
                emitter.stop();
            })
            this.time.delayedCall(1000, () => {
                this.scene.start("menu")
            });
        });
        menuButton.on("pointerover", () => {
            emitter.setEmitZone(0);
            emitter.fastForward(2000);
        });
        this.container.add(menuButton);
    }

    generateParticles(x, y, success){
        let emitter;
        if(success){
            emitter = this.add.particles(x, y, 'particle_win', this.emitterWinConfig).setDepth(10);
        } else {
            emitter = this.add.particles(x, y, 'particle_loose', this.emitterLooseConfig).setDepth(10);
        }
        emitter.particleBringToTop = true;
        emitter.start();        
    }
}
