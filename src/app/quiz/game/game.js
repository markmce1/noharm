import * as Phaser from 'phaser';
var start;
var score = 0;
var round = 1;
var question;
var roundText;
var scoreText;
export default class Scene1 extends Phaser.Scene {
    
    preload() {

        this.load.image('bg', 'assets/quiz/images/bg.jpg');
        this.load.image('true', 'assets/quiz/images/true.png');
        this.load.image('false', 'assets/quiz/images/false.png');
        this.load.image('fall', 'assets/quiz/images/couldfall.png');
        this.load.image('box', 'assets/quiz/images/box.png');
        this.load.image('bg2', 'assets/quiz/images/bg.png');
        this.load.image('start', 'assets/quiz/images/start.png');
        this.load.image('pause','assets/quiz/images/pause.png');
        this.load.image('resumeBut', 'assets/quiz/images/resume.png');
        this.load.image('homeBut', 'assets/quiz/images/homeBut.png');
        
        this.load.image('ans1', 'assets/quiz/images/ans1.png');
        this.load.image('ans2', 'assets/quiz/images/ans2.png');
        this.load.image('ans3', 'assets/quiz/images/ans3.png');
        this.load.image('ans4', 'assets/quiz/images/ans4.png');


    }

    create()
    {
        //this.add.image(300, 200, 'bg');
        this.cameras.main.backgroundColor = Phaser.Display.Color.HexStringToColor("#3498db");
        this.add.image(200,45,'bg2');

        scoreText = this.add.text(16, 16, 'Score: ' + score, { fontSize: '32px', fill: '#000' });
        roundText = this.add.text(16 ,48 ,'Round: ' + round, { fontSize: '32px', fill: '#000' });

        this.pauseBut = this.add.image(300,25, 'pause');
        this.pauseBut.setInteractive();

        this.pauseBut.once('pointerdown',()=>{
            this.pause1();

            this.resume.on('pointerdown', () => {
                this.resume1();

            });
        
        });
        this.play = this.add.image(200, 350, 'start');
        this.play.setInteractive();
        this.play.on('pointerdown', () => {
<<<<<<< HEAD
=======
            this.round1();
        });
    }

    update() {

    }

    pause1()
    {

        this.resume = this.add.image(200, 300, 'resumeBut');
        this.resume.setInteractive();


        this.home = this.add.image(200,400, 'homeBut' );
        this.home.setInteractive();

        this.home.on('pointerdown', ()=> {
            location.href = "/home"
        });

    }
    resume1()
    {
        this.resume.setVisible(false);
        this.home.setVisible(false);

        this.pauseBut.once('pointerdown',()=>{
            this.pause1();

            this.resume.on('pointerdown', () => {
                this.resume1();
            });
        });
    }


    round1()
        {
>>>>>>> 3ac879fda841b6ac9a6ad335fafe2c92c29b6caa
            this.play.destroy(true);


            question = this.add.text(100, 106, 'What is the danger?', { fontSize: '22px', fill: '#000' });

            this.fall = this.add.image(200, 325, 'fall');
            this.box1 = this.add.image(100, 450, 'ans1');
            this.box2 = this.add.image(300, 450, 'ans2');
            this.box3 = this.add.image(100, 550, 'ans3');
            this.box4 = this.add.image(300, 550, 'ans4');

            this.box1.setInteractive();
            this.box2.setInteractive();
            this.box3.setInteractive();
            this.box4.setInteractive();

            this.box1.once('pointerdown', () => {

                //right answers
                console.log('correct');
                score = score + 100;
                round++;
                this.round2();

    
            });
            
            this.box2.once('pointerdown', () => {
    
                //wrong answers
                console.log('wrong1');
                this.round2();
    
            });
            
            this.box3.once('pointerdown', () => {
    
                //wrong answers
                
                console.log('wrong2');
                this.round2();
    
            });
            
            this.box4.once('pointerdown', () => {
    
                //wrong answers
                
                console.log('wrong3');
                this.round2();
    
            });

        });

        round2(){
            scoreText.setText('Score: ' + score);
            roundText.setText('Round: ' + round);
            question.setText('More to come');//change to a question

            this.fall.destroy(true);
            this.box1.destroy(true);
            this.box2.destroy(true);
            this.box3.destroy(true);
            this.box4.destroy(true);

            //create more boxes
            console.log('yup');
        }


}