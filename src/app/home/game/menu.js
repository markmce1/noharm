
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

    }
    create() {

        this.pauseBG = this.add.image(width/2, height/2, 'menu');
        this.gate= this.add.image(width/2, height/2 - 100,'gate');
        this.gate.setInteractive();

        this.quiz = this.add.image(width/2 , height/2 + 100, 'quiz' );
        this.quiz.setInteractive();


        
        this.guides = this.add.image(width/2, height/2, 'guides');
        this.guides.setInteractive();

        this.guides.once('pointerdown', ()=> {
            location.href = "/guides"
        });
        
        this.quiz.once('pointerdown', ()=> {
            location.href = "/quiz"
        });
        


        this.gate.once('pointerdown', ()=> {
            location.href = "/space"
        });



    }

    update() {

    }




}