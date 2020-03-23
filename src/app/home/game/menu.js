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
        this.load.image('play','assets/gui/play.png' );
        this.load.image('memory','assets/gui/memory.png' );
        this.load.image('dodge','assets/gui/dodge.png' );
        this.load.image('back','assets/gui/back.png' );
        this.load.image('credits','assets/gui/credits.png' );
        this.load.image('settings','assets/gui/settings.png' );


    }
    create() {

        
        this.cameras.main.backgroundColor = Phaser.Display.Color.HexStringToColor("#3498db");

        this.pauseBG = this.add.image(width/2, height/2, 'menu');

        this.home();

    }
    
    home(){

        this.guides = this.add.image(width/2, height/2 - 100, 'guides');

        this.play = this.add.image(width/2 , height/2 - 200, 'play' );

        
        this.settings = this.add.image(width/2 , height/2 , 'settings' );
        
        
        this.credits= this.add.image(width/2 , height/2 + 100, 'credits' );

        //add in RPG if made

        this.guides.once('pointerdown', ()=> {
            this.guidesfunc();
        });

        this.play.once('pointerdown', ()=> {
            this.games();
        });

        this.credits.once('pointerdown', ()=> {

        });

        this.settings.once('pointerdown', ()=> {

        });

                
        setTimeout(() => {
            this.play.setInteractive();
            this.guides.setInteractive();
            this.credits.setInteractive();
            this.settings.setInteractive();
        }, 200);
        


    }

    //clear homescreen function

    guidesfunc(){
        this.guides.destroy();
        this.play.destroy();
        this.settings.destroy();
        this.credits.destroy();

        
        this.back = this.add.image(width/2, height/2 + 200, 'back');


        
        setTimeout(() => {
            this.back.setInteractive();
        }, 200);

        this.back.once('pointerdown', ()=> {
            this.home();

            this.back.destroy();
        });
    }

    games(){
        
        this.guides.destroy();
        this.play.destroy();
        this.settings.destroy();
        this.credits.destroy();

        this.gate= this.add.image(width/2, height/2 - 200,'gate');

        this.quiz = this.add.image(width/2 , height/2, 'quiz' );

        this.memory = this.add.image(width/2, height/2 - 100, 'memory');

        this.back = this.add.image(width/2, height/2 + 200, 'back');

        this.dodge = this.add.image(width/2, height/2 + 100, 'dodge');


        setTimeout(() => {
            this.gate.setInteractive();
            this.quiz.setInteractive();
            this.memory.setInteractive();
            this.back.setInteractive();
            this.dodge.setInteractive();
        }, 200);


        this.quiz.once('pointerdown', ()=> {
            location.href = "/quiz"
        });

        this.gate.once('pointerdown', ()=> {
            location.href = "/space"
        });

        this.memory.once('pointerdown', ()=> {
            location.href = "/memory"
        });

        this.dodge.once('pointerdown', ()=> {
            location.href = "/dodge"
        });

        this.back.once('pointerdown', ()=> {
            this.home();

            this.gate.destroy();
            this.quiz.destroy();
            this.memory.destroy();
            this.back.destroy();
            this.dodge.destroy();
        });

    }




}