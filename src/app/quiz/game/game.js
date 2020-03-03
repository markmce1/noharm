import * as Phaser from 'phaser';
var start;
var score = 0;
var round = 1;

export default class Scene1 extends Phaser.Scene {
    
    preload() {

        this.load.image('bg', 'assets/quiz/images/bg.jpg');
        this.load.image('true', 'assets/quiz/images/true.png');
        this.load.image('false', 'assets/quiz/images/false.png');
        this.load.image('fall', 'assets/quiz/images/couldfall.png');
        this.load.image('box', 'assets/quiz/images/box.png');
        this.load.image('bg2', 'assets/space/bg.png');
        this.load.image('start', 'assets/quiz/images/start.png');
        
        this.load.image('ans1', 'assets/quiz/images/ans1.png');
        this.load.image('ans4', 'assets/quiz/images/ans4.png');


    }

    create() {
        //this.add.image(300, 200, 'bg');
        this.cameras.main.backgroundColor = Phaser.Display.Color.HexStringToColor("#3498db");
        this.add.image(200,45,'bg2');

        var scoreText = this.add.text(16, 16, 'Score: ' + score, { fontSize: '32px', fill: '#000' });
        var roundText = this.add.text(16 ,48 ,'Round: ' + round, { fontSize: '32px', fill: '#000' });

        this.play = this.add.image(200, 350, 'start');
        this.play.setInteractive();
        this.play.on('pointerdown', () => {

            round1();
        });

        round1()
        {

            
            this.play.destroy(true);
            var start = this.add.text(100, 106, 'What is the danger?', { fontSize: '22px', fill: '#000' });

            this.fall = this.add.image(200, 325, 'fall');


            this.box1 = this.add.image(100, 450, 'ans1');
            this.box2 = this.add.image(300, 450, 'box');
            this.box3 = this.add.image(100, 550, 'box');
            this.box4 = this.add.image(300, 550, 'ans4');


            var ans2 = this.add.text(225, 445, 'The silo is open', { fontSize: '16px', fill: '#000' });
            var ans3 = this.add.text(20, 530, 'There is nothing', { fontSize: '16px', fill: '#000' });
            var ans32 = this.add.text(20, 550, 'wrong', { fontSize: '16px', fill: '#000' });

            this.box1.setInteractive();
            this.box2.setInteractive();
            this.box3.setInteractive();
            this.box4.setInteractive();

            this.box1.on('pointerdown', () => {

                //right answers
                console.log('correct');

    
            });
            
            this.box2.on('pointerdown', () => {
    
                //wrong answers
                console.log('wrong1');
    
            });
            
            this.box3.on('pointerdown', () => {
    
                //wrong answers
                
                console.log('wrong2');
    
            });
            
            this.box4.on('pointerdown', () => {
    
                //wrong answers
                
                console.log('wrong3');
    
            });

        }



    }

    update() {

    }


}