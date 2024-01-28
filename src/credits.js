import Phaser from 'phaser'

export default class Credits extends Phaser.Scene {

  constructor() {
    super('credits');
  }

  create() {

    let textList = [
      "Toni Calvo Morata",
      "Pablo Gutiérrez Sánchez",
      "Carlos León Aznar",
      "Ismael Sagredo Olivenza",
      "Guillermo Jiménez Díaz",
      "Alejandro Romero Hernández",
      "Ana Ruiz Lanau",
      "José Manuel Moreno Valderrama",
      "Alejandro Villar Rubio"];

    this.add.image(this.game.config.width / 2, this.game.config.height / 2, 'fondoMenu');

    this.add.text(2 * 48, 2 * 48, "Los responsables de esto:", { fontFamily: 'Minecraftia', fontSize: 48, color: '#222222' });

    let thePeople = this.add.text(2*48, 5*48, textList.join("\n"), { fontFamily: 'Minecraftia', fontSize: 36, color: '#222222' });
    thePeople.setLineSpacing(24);

    let inMemoriamList = [
      'elena',
      'pedropablo',
      'marco'
    ];

    this.add.text(30 * 48, 2 * 48, "In Memoriam", { fontFamily: 'Minecraftia', fontSize: 48, color: '#222222' })
      .setOrigin(0.5,0)
      .setAlign("center");

    let i = 0;
    for (let aName of inMemoriamList){
      this.add.image(30 * 48, (7+i) * 48, aName)
        .setScale(0.7);
      i+=4;
    }

      
    let button = this.add.text(500, 120, "volver", { fontFamily: 'Minecraftia', fontSize: 62, color: '#222222' });
    button.setOrigin(1,1);
    button.setAlign("right")
    button.setPosition(this.game.config.width-2*48, this.game.config.height-2*48)
    
    button.setInteractive().
            on('pointerdown', () =>  {
                this.scene.start('menu')
            })
  }

}
