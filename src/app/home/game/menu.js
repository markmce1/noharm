var width = window.innerWidth;
var height = window.innerHeight;

export default class Scene1 extends Phaser.Scene {



    constructor(config) {
        super(config);
    }

    preload() {
        //images loaded
        this.load.image('gate', 'assets/gui/gate.png');
        this.load.image('guides', 'assets/gui/guides.png');
        this.load.image('quiz', 'assets/gui/quiz.png');
        this.load.image('menu','assets/gui/menu.png' );
        this.load.image('rpg','assets/gui/rpg.png' );
        this.load.image('memory','assets/gui/memory.png' );

    }
    create() {

        
        this.cameras.main.backgroundColor = Phaser.Display.Color.HexStringToColor("#3498db");

        this.pauseBG = this.add.image(width/2, height/2, 'menu');

        this.gate= this.add.image(width/2, height/2 - 200,'gate');
        this.gate.setInteractive();

        this.quiz = this.add.image(width/2 , height/2, 'quiz' );
        this.quiz.setInteractive();

        this.guides = this.add.image(width/2, height/2 + 100, 'guides');
        this.guides.setInteractive();

        this.memory = this.add.image(width/2, height/2 - 100, 'memory');
        this.memory.setInteractive();

        //add in RPG if made

        this.guides.once('pointerdown', ()=> {
            location.href = "/guides" //doesnt have to go here
        });
        
        this.quiz.once('pointerdown', ()=> {
            location.href = "/quiz"
        });

        this.gate.once('pointerdown', ()=> {
            location.href = "/space"
        });

        this.memory.once('pointerdown', ()=> {
            location.href = "/memory"
        });



    }

    update() {

    }




}