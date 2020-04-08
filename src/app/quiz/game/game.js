import * as firebase from "firebase/app"
import "firebase/firestore"
import WebFontFile from './webfontfile'

import * as Phaser from 'phaser';
var start;
var score = 0;
var round = 1;
var correct = 0;
var question;
var question2;
var roundText;
var scoreText;
var width = window.innerWidth;
var height = window.innerHeight;
var arr = [1,2,3,4,5,6];
var scoremultiplier = 1;
var multipliertext;

var startedmusic = 0;

const config = {
    // your firebase config
  
      apiKey: "AIzaSyCLuB5fKIO1n0070M9f5W5G199RYvS2rrA",
      authDomain: "no-harm-on-the-farm.firebaseapp.com",
      databaseURL: "https://no-harm-on-the-farm.firebaseio.com",
      projectId: "no-harm-on-the-farm",
      storageBucket: "no-harm-on-the-farm.appspot.com",
      messagingSenderId: "693625494685",
    
  }
  firebase.initializeApp(config)

export default class Scene1 extends Phaser.Scene {
    
    preload() {


        //sounds
        this.load.audio('correct', 'assets/quiz/sounds/correct.wav');
        this.load.audio('wrong', 'assets/quiz/sounds/wrong.wav');
        //images
        
        this.load.image('largepauseBG','assets/gui/largepauseBG.png' );
        this.load.image('true', 'assets/quiz/images/true.png');
        this.load.image('false', 'assets/quiz/images/false.png');
        this.load.image('fall', 'assets/quiz/images/couldfall.png');
        this.load.image('box', 'assets/quiz/images/box.png');
        this.load.image('quizbg', 'assets/quiz/images/quizbg.png');
        this.load.image('bg2', 'assets/space/bg3.png');
        this.load.image('start', 'assets/quiz/images/start.png');
        this.load.image('submits', 'assets/gui/submits.png');
        
        this.load.image('submit', 'assets/gui/submit.png');
        this.load.image('pause','assets/quiz/images/pause.png');

        this.load.image('resumeBut', 'assets/gui/resume.png');
        this.load.image('restartBut', 'assets/gui/restart.png');
        this.load.image('homeBut', 'assets/gui/homeBut.png');

        this.load.image('pauseBG','assets/gui/pauseBG.png' );
        this.load.image('continueBut', 'assets/quiz/images/continue.png');
        
        this.load.image('ans1', 'assets/quiz/images/ans1.png');
        this.load.image('ans2', 'assets/quiz/images/ans2.png');
        this.load.image('ans3', 'assets/quiz/images/ans3.png');
        this.load.image('ans4', 'assets/quiz/images/ans4.png');

        this.load.image('help', 'assets/gui/help.png');
        this.load.image('pto', 'assets/quiz/images/pto.jpg');
        this.load.image('ptoSmall', 'assets/quiz/images/ptoSmall.jpg');

        
        this.load.image('slurry', 'assets/quiz/images/slurry.jpg');
        this.load.image('slurrySmall', 'assets/quiz/images/slurrySmall.jpg');
               
        this.load.image('Q3ans1', 'assets/quiz/images/Q3ans1.png');
        this.load.image('Q3ans2', 'assets/quiz/images/Q3ans2.png');
        this.load.image('Q3ans3', 'assets/quiz/images/Q3ans3.png');
        this.load.image('Q3ans4', 'assets/quiz/images/Q3ans4.png');

        this.load.image('elecfence','assets/quiz/images/elecfence.png' );
        this.load.image('smallele','assets/quiz/images/smallele.png' );

        this.load.image('Q4ans1', 'assets/quiz/images/Q4ans1.png');
        this.load.image('Q4ans2', 'assets/quiz/images/Q4ans2.png');
        this.load.image('Q4ans3', 'assets/quiz/images/Q4ans3.png');
        this.load.image('Q4ans4', 'assets/quiz/images/Q4ans4.png');

        this.load.image('acc','assets/quiz/images/acc.png' );
        this.load.image('acc2','assets/quiz/images/acc2.png' );
        this.load.image('acc2small','assets/quiz/images/acc2small2.png' );

        this.load.image('Q5ans1', 'assets/quiz/images/Q5ans1.png');
        this.load.image('Q5ans2', 'assets/quiz/images/Q5ans2.png');
        this.load.image('Q5ans3', 'assets/quiz/images/Q5ans3.png');
        this.load.image('Q5ans4', 'assets/quiz/images/Q5ans4.png');

        
        this.load.image('accident', 'assets/quiz/images/accident.jpg');
        
        this.load.image('accidentsmall', 'assets/quiz/images/accidentsmall.jpg');


        this.load.audio('alexCh','assets/music/alexCh.wav' );

        //fonts
        
        const fonts = new WebFontFile(this.load, ['Noto Sans', 'Anton'])
        this.load.addFile(fonts)


    }
    questionrandomiser(){
        if(round == 6)
        {
            round = 20;
            this.finish()
        }
        if(arr[round - 1] == 1)
        {
            this.round1()
        }
        if(arr[round - 1]== 2)
        {
            this.round2()
        }
        if(arr[round - 1] == 3)
        {
            this.round3()
        }
        if(arr[round - 1] == 4)
        {
            this.round4()
        }
        if(arr[round - 1] == 5)
        {
            this.round5()
        }
        if(arr[round - 1] == 6)
        {
            this.round6()
        }
    }

    create()
    {

        this.scale.lockOrientation('portrait');

        if(startedmusic == 0)
        {
            
            this.sound.play('alexCh', { loop: true });

            startedmusic = 1;
        }
        

        this.shuffle(arr);

        this.add.image(width/2, height/2, 'quizbg');
        this.add.image(width/2,45,'bg2');


        scoreText = this.add.text(16, 16, 'Score: ' + score, { fontSize: '32px', fill: '#000', fontFamily:'"Anton"' });
        roundText = this.add.text(16 ,48 ,'Round: ' + round, { fontSize: '32px', fill: '#000', fontFamily:'"Anton"' });

        score = 0;
        round = 0;

        scoreText.setText('Score: ' + score);
        roundText.setText('Round: ' + round);

        this.pauseBut = this.add.image(width/2+ width/6+ 30,25, 'pause');

        multipliertext = this.add.text(width/2 ,48 ,'Score *:' +scoremultiplier, { fontSize: '32px', fill: '#000' , fontFamily:'"Anton"'});
        this.pauseBut.setInteractive();

        this.pauseBut.once('pointerdown',()=>{
            this.pause1();
            this.resume.on('pointerdown', () => {
                this.resume1();

            });
        
        });

        if(width  > 1000 && height > 720)
        {
            this.pauseBG = this.add.image(width/2, height/2, 'largepauseBG');
            var starttext = this.add.text(width/2- 125, height/2 - 100, 'The objective of the game', { fontSize: '22px', fill: '#000', fontFamily:'"Noto sans"' });
            var starttext2 = this.add.text(width/2- 125, height/2 - 75, 'is to pick an answer to', { fontSize: '22px', fill: '#000', fontFamily:'"Noto sans"' });
            var starttext3 = this.add.text(width/2- 125, height/2 - 50, 'the question', { fontSize: '22px', fill: '#000', fontFamily:'"Noto sans"' });
            var starttext4 = this.add.text(width/2- 125, height/2 - 25, 'Get it right to get points', { fontSize: '22px', fill: '#000', fontFamily:'"Noto sans"' });
            var starttext5 = this.add.text(width/2- 125, height/2, 'Getting it wrong means you', { fontSize: '22px', fill: '#000', fontFamily:'"Noto sans"' });
            var starttext6 = this.add.text(width/2- 125, height/2 + 25, 'get zero points', { fontSize: '22px', fill: '#000', fontFamily:'"Noto sans"' });

        }else
        {
            this.pauseBG = this.add.image(width/2, height/2, 'pauseBG');
            var starttext = this.add.text(width/2- 100, height/2 - 100, 'The objective of the game', { fontSize: '12px', fill: '#000', fontFamily:'"Noto sans"' });
            var starttext2 = this.add.text(width/2- 100, height/2 - 75, 'is to pick an answer to', { fontSize: '12px', fill: '#000', fontFamily:'"Noto sans"' });
            var starttext3 = this.add.text(width/2- 100, height/2 - 50, 'the question', { fontSize: '12px', fill: '#000', fontFamily:'"Noto sans"' });
            var starttext4 = this.add.text(width/2- 100, height/2 - 25, 'Get it right to get points', { fontSize: '12px', fill: '#000', fontFamily:'"Noto sans"' });
            var starttext5 = this.add.text(width/2- 100, height/2, 'Getting it wrong means you', { fontSize: '12px', fill: '#000', fontFamily:'"Noto sans"' });
            var starttext6 = this.add.text(width/2- 100, height/2 + 25, 'get zero points', { fontSize: '12px', fill: '#000', fontFamily:'"Noto sans"' });

        }
        
        this.play = this.add.image(width/2, height/2 + 100, 'start');

        setTimeout(() => {
            this.play.setInteractive();
        }, 750);
        this.play.on('pointerdown', () => {
            starttext.setText('');
            starttext2.setText('');
            starttext3.setText('');
            starttext4.setText('');
            starttext5.setText('');
            starttext6.setText('');
            this.pauseBG.setVisible(false);
            this.play.setVisible(false);
            round++;
            this.questionrandomiser();
        });
    }
    disableinter(){
        if(round != 0)
        {
            this.box1.disableInteractive();
            this.box2.disableInteractive();
            this.box3.disableInteractive();
            this.box4.disableInteractive();

        }
    }
    destroy()
    {
        this.box1.destroy(true);
        this.box2.destroy(true);
        this.box3.destroy(true);
        this.box4.destroy(true);
    }

    interactive(){    
        if(round != 0){

            setTimeout(() => {
                this.box1.setInteractive();
                this.box2.setInteractive();
                this.box3.setInteractive();
                this.box4.setInteractive();
            }, 750);
    
        }

    }

    pause1()
    {

        this.disableinter();

        if(width  > 1000 && height > 720)
        {
            this.pauseBG = this.add.image(width/2, height/2, 'largepauseBG');
        }else
        {
            this.pauseBG = this.add.image(width/2, height/2, 'pauseBG');
        }

        this.resume = this.add.image(width/2, height/2 - 150, 'resumeBut');
        this.resume.setInteractive();

        this.restart = this.add.image(width/2, height/2 - 50, 'restartBut');
        this.restart.setInteractive();

        this.restart.on('pointerdown', ()=> {
            this.scene.restart();
        });

        this.help = this.add.image(width/2, height/2 + 150, 'help');
        this.help.setInteractive();
    
        this.help.on('pointerdown', ()=> {
            this.help1();
        });

        this.home = this.add.image(width/2, height/2 + 50, 'homeBut' );
        this.home.setInteractive();

        this.home.on('pointerdown', ()=> {
            location.href = "/home"
        });

    }




help1(){

    this.resume.setVisible(false);
    this.restart.setVisible(false);
    this.help.setVisible(false);
    this.home.setVisible(false);

    if(width  > 1000 && height > 720)
    {
        var starttext = this.add.text(width/2- 100, height/2 - 100, 'The objective of the game', { fontSize: '12px', fill: '#000', fontFamily:'"Noto sans"'});
        var starttext2 = this.add.text(width/2- 100, height/2 - 75, 'is to pick an answer to', { fontSize: '12px', fill: '#000', fontFamily:'"Noto sans"' });
        var starttext3 = this.add.text(width/2- 100, height/2 - 50, 'the question', { fontSize: '12px', fill: '#000', fontFamily:'"Noto sans"' });
        var starttext4 = this.add.text(width/2- 100, height/2 - 25, 'Get it right to get points', { fontSize: '12px', fill: '#000', fontFamily:'"Noto sans"' });
        var starttext5 = this.add.text(width/2- 100, height/2, 'Getting it wrong means you', { fontSize: '12px', fill: '#000', fontFamily:'"Noto sans"' });
        var starttext6 = this.add.text(width/2- 100, height/2 + 25, 'get no points', { fontSize: '12px', fill: '#000', fontFamily:'"Noto sans"' });
    }else
    {
        var starttext = this.add.text(width/2- 100, height/2 - 100, 'The objective of the game', { fontSize: '12px', fill: '#000' , fontFamily:'"Noto sans"'});
        var starttext2 = this.add.text(width/2- 100, height/2 - 75, 'is to pick an answer to', { fontSize: '12px', fill: '#000', fontFamily:'"Noto sans"' });
        var starttext3 = this.add.text(width/2- 100, height/2 - 50, 'the question', { fontSize: '12px', fill: '#000' , fontFamily:'"Noto sans"'});
        var starttext4 = this.add.text(width/2- 100, height/2 - 25, 'Get it right to get points', { fontSize: '12px', fill: '#000', fontFamily:'"Noto sans"' });
        var starttext5 = this.add.text(width/2- 100, height/2, 'Getting it wrong means you', { fontSize: '12px', fill: '#000' , fontFamily:'"Noto sans"'});
        var starttext6 = this.add.text(width/2- 100, height/2 + 25, 'get no points', { fontSize: '12px', fill: '#000', fontFamily:'"Noto sans"' });
    }

    this.resume = this.add.image(width/2, height/2 + 100,'resumeBut');
    this.resume.setInteractive();
    this.resume.on('pointerdown', () => {
        this.resume1();
        starttext.setText('');
        starttext2.setText('');
        starttext3.setText('');
        starttext4.setText('');
        starttext5.setText('');
        starttext6.setText('');
    });

}
    resume1()
    {
        this.resume.setVisible(false);
        this.home.setVisible(false);
        this.restart.setVisible(false);
        this.pauseBG.setVisible(false);
        
        this.help.setVisible(false);
        
        this.pauseBG.setVisible(false);

        this.pauseBut.once('pointerdown',()=>{
            this.pause1();

            this.resume.on('pointerdown', () => {
                this.resume1();
            });
        });
    }


    round1()
    {

        scoreText.setText('Score: ' + score);
        roundText.setText('Round: ' + round);
        multipliertext.setText('Score *:'+scoremultiplier);
        this.play.destroy(true);

        
        if(width  > 400)
        {
            question = this.add.text(width/2 - 100, height/7+30, 'What is the danger?', { fontSize: '32px', fill: '#000', fontFamily:'"Noto sans"' });
        }else
        {
            question = this.add.text(width/8, height/7+30, 'What is the danger?', { fontSize: '22px', fill: '#000', fontFamily:'"Noto sans"' });
        }

        this.fall = this.add.image(width/2,height/2, 'fall');
        this.box1 = this.add.image(width/4, height/2 + 150, 'ans1');
        this.box2 = this.add.image(width/8 * 6, height/2 + 150, 'ans2');
        this.box3 = this.add.image(width/4, height/2 + 250, 'ans3');
        this.box4 = this.add.image(width/8*6, height/2 + 250, 'ans4');

        setTimeout(() => {
            this.box1.setInteractive();
            this.box2.setInteractive();
            this.box3.setInteractive();
            this.box4.setInteractive();
        }, 750);


        this.box1.once('pointerdown', () => {

            //right answers
            console.log('correct');
            score = score + 100 * scoremultiplier;
            scoremultiplier ++;
            correct = 1;
            this.round1inter();
            this.sound.play('correct');
        });
            
        this.box2.once('pointerdown', () => {
                //wrong answers
                console.log('wrong1');
                this.round1inter();
                scoremultiplier = 1;
            });
            
            this.box3.once('pointerdown', () => {
                //wrong answers
                console.log('wrong2');
                this.round1inter();
                scoremultiplier = 1;
            });
            
            this.box4.once('pointerdown', () => {
                //wrong answers
                console.log('wrong3');
                this.round1inter();
                scoremultiplier = 1;
            });

    }

    round1inter(){
        round++;

        this.destroy();
        
        this.fall.destroy(true);

        if(width  > 1000 && height > 720)
        {
            this.pauseBG = this.add.image(width/2, height/2, 'largepauseBG');
        }else
        {
            this.pauseBG = this.add.image(width/2, height/2, 'pauseBG');
            
        }
        
        this.fall = this.add.image(width/2,height/2, 'fall');  

        question.setText('');
        var ansText = this.add.text(width/2 - 75, height/8 *3-25, 'This is man', { fontSize: '12px', fill: '#000', fontFamily:'"Noto sans"' });
        var ansText2 = this.add.text(width/2 - 75, height/8 *3, 'could fall.', { fontSize: '12px', fill: '#000' , fontFamily:'"Noto sans"'});
        this.continue = this.add.image(width/2, height/2+ height/4 - 25, 'continueBut');
        
        if(correct == 1){
            var rightORwrong = this.add.text(width/2 - 100, height/8 *2, 'Correct!', { fontSize: '32px', fill: '#000' , fontFamily:'"Noto sans"'});
            correct = 0;
        }else{
            var rightORwrong = this.add.text(width/2 - 100, height/8 *2, 'Wrong!', { fontSize: '32px', fill: '#000' , fontFamily:'"Noto sans"'});
            this.sound.play('wrong');
        }

        setTimeout(() => {
            this.continue.setInteractive();
        }, 750);

        this.continue.once('pointerdown', () => {
            
            this.fall.destroy(true);
            this.questionrandomiser();
            this.pauseBG.destroy(true);
            ansText.setText('');
            ansText2.setText('');
            rightORwrong.setText('');
            this.continue.destroy(true);
        });

        
    }

    round2()
    {
    
        scoreText.setText('Score: ' + score);
        roundText.setText('Round: ' + round);
        multipliertext.setText('Score *:'+scoremultiplier);
        this.slurry = this.add.image(width/2, height/2, 'slurry');


        if(width  > 400)
        {
            question = this.add.text(width/2 - 200, height/7, 'Is spreading slurry in the', { fontSize: '32px', fill: '#000' , fontFamily:'"Noto sans"'});
            question2 = this.add.text(width/2 - 200, height/7 + 50, 'rain allowed near lakes?', { fontSize: '32px', fill: '#000' , fontFamily:'"Noto sans"'});
        }else
        {
            question = this.add.text(width/8-40, height/7+25, 'Is spreading slurry in the', { fontSize: '22px', fill: '#000', fontFamily:'"Noto sans"' });
            question2 = this.add.text(width/8-40, height/7 + 50, 'rain allowed near lakes?', { fontSize: '22px', fill: '#000' , fontFamily:'"Noto sans"'});
        }


        //create more boxes
        this.box1 = this.add.image(width/4, height/2 + 150, 'true');
        this.box2 = this.add.image(width/8 * 6, height/2 + 150, 'false');
        this.box3 = this.add.image(width/4, height/2 + 250, 'ans3');
        this.box4 = this.add.image(width/8*6, height/2 + 250, 'ans4');
        this.box3.setVisible(false);
        this.box4.setVisible(false);

        setTimeout(() => {
            this.box1.setInteractive();
            this.box2.setInteractive();
        
        }, 250);
        this.box1.once('pointerdown', () => {
            //wrong answers
            console.log('wrong1');
            round++;
            scoremultiplier = 1;
            this.round2inter();
        });  
        this.box2.once('pointerdown', () => {  
            correct = 1;
            score = score + 100 * scoremultiplier;
            scoremultiplier ++;
            round++;
            this.round2inter();
            this.sound.play('correct');
        });
    }

    round2inter(){
        this.destroy();        
        
        this.slurry.destroy(true);
        if(width  > 1000 && height > 720)
        {
            this.pauseBG = this.add.image(width/2, height/2, 'largepauseBG');
        }else
        {
            this.pauseBG = this.add.image(width/2, height/2, 'pauseBG');
            

        }

                
        if(width  < 400)
        {
            this.slurrySmall = this.add.image(width/2, height/2, 'slurrySmall');
            var ansText = this.add.text(120, 350, '', { fontSize: '12px', fill: '#000' , fontFamily:'"Noto sans"'});
            var ansText2 = this.add.text(width/2 - 75, height/8 *3-50, 'You should never spread', { fontSize: '22px', fill: '#000', fontFamily:'"Noto sans"' });
            var ansText3 = this.add.text(width/2 - 75, height/8 *3-25, 'slurry in the rain', { fontSize: '22px', fill: '#000', fontFamily:'"Noto sans"' });
            var ansText4 = this.add.text(width/2 - 75, height/8 *3, 'especially near lakes.  ', { fontSize: '22px', fill: '#000', fontFamily:'"Noto sans"' });
            var ansText5 = this.add.text(120, 450, '', { fontSize: '12px', fill: '#000', fontFamily:'"Noto sans"' });
        }
        else{
            
            this.slurry = this.add.image(width/2, height/2, 'slurry');
            var ansText = this.add.text(120, 350, '', { fontSize: '12px', fill: '#000' });
            var ansText2 = this.add.text(width/2 - 75, height/8 *3-125, 'You should never spread', { fontSize: '12px', fill: '#000' , fontFamily:'"Noto sans"'});
            var ansText3 = this.add.text(width/2 - 75, height/8 *3-100, 'slurry in the rain', { fontSize: '12px', fill: '#000', fontFamily:'"Noto sans"'});
            var ansText4 = this.add.text(width/2 - 75, height/8 *3-75, 'especially near lakes.  ', { fontSize: '12px', fill: '#000', fontFamily:'"Noto sans"' });
            var ansText5 = this.add.text(120, 450, '', { fontSize: '12px', fill: '#000', fontFamily:'"Noto sans"' });
        }
        this.destroy();
        question.setText('');//change to a question
        question2.setText('');
        this.continue = this.add.image(width/2, height/2+ height/4 - 25, 'continueBut');
        

        if(width  < 400)
        {
            if(correct == 1){
                var rightORwrong = this.add.text(width/2 - 100, height/8 *2, 'Correct!', { fontSize: '32px', fill: '#000' , fontFamily:'"Noto sans"'});
                correct = 0;
            }else{
                var rightORwrong = this.add.text(width/2 - 100, height/8 *2, 'Wrong!', { fontSize: '32px', fill: '#000' , fontFamily:'"Noto sans"'});
                this.sound.play('wrong');
            }
    
        }
        else{
            if(correct == 1){
                var rightORwrong = this.add.text(width/2 - 100, height/8*3 - 175, 'Correct!', { fontSize: '32px', fill: '#000' , fontFamily:'"Noto sans"'});
                correct = 0;
            }else{
                var rightORwrong = this.add.text(width/2 - 100, height/8*3 - 175, 'Wrong!', { fontSize: '32px', fill: '#000' , fontFamily:'"Noto sans"'});
                this.sound.play('wrong');
            }
    

        }


        setTimeout(() => {
            this.continue.setInteractive();
        }, 750);

        this.continue.once('pointerdown', () => {
            this.questionrandomiser();
            this.pauseBG.destroy(true);
            ansText.setText('');
            ansText2.setText('');
            ansText3.setText('');
            ansText4.setText('');
            ansText5.setText('');
            rightORwrong.setText('');
            if(width  > 400)
            {
                this.slurry.destroy(true);
            }else
            {
    
                this.slurrySmall.destroy(true);
            }
            this.continue.destroy(true);
        });

        

    }
    round3()
    {
        scoreText.setText('Score: ' + score);
        roundText.setText('Round: ' + round);
        
        multipliertext.setText('Score *:'+scoremultiplier);

        if(width  > 400)
        {
            question = this.add.text(width/2 - 200,height/7 + 50, 'What is this?', { fontSize: '32px', fill: '#000', fontFamily:'"Noto sans"' });
        }else
        {

            question = this.add.text(width/8, height/7 + 50,  'What is this?', { fontSize: '22px', fill: '#000' , fontFamily:'"Noto sans"'});
        }



        this.pto = this.add.image(width/2, height/2, 'pto');

        this.box1 = this.add.image(width/4, height/2 + 150, 'Q3ans1');
        this.box2 = this.add.image(width/8 * 6, height/2 + 150, 'Q3ans2');
        this.box3 = this.add.image(width/4, height/2 + 250, 'Q3ans3');
        this.box4 = this.add.image(width/8*6, height/2 + 250, 'Q3ans4');

        this.interactive();
        this.box1.once('pointerdown', () => {
            this.round3inter();
            scoremultiplier = 1;
        });  
        this.box2.once('pointerdown', () => {
            this.round3inter();
            scoremultiplier = 1;
        });
        this.box3.once('pointerdown', () => {
            console.log('correct');
            score = score + 100 * scoremultiplier;
            scoremultiplier ++;
            correct = 1;
            this.sound.play('correct');
            this.round3inter();
        });
        this.box4.once('pointerdown', () => {
            this.round3inter();
            scoremultiplier = 1;
        });


    }

    round3inter(){

        this.destroy();
        round++;
        this.pto.destroy(true);        
        if(width  > 1000 && height > 720)
        {
            this.pauseBG = this.add.image(width/2, height/2, 'largepauseBG');
        }else
        {
            this.pauseBG = this.add.image(width/2, height/2, 'pauseBG');
        }
        if(width  > 400)
        {
            var ansText = this.add.text(width/2 - 150, height/8 *3-75, '', { fontSize: '12px', fill: '#000', fontFamily:'"Noto sans"' });
            var ansText2 = this.add.text(width/2 - 150, height/8 *3-75, 'This is a Power Take off shaft.', { fontSize: '22px', fill: '#000', fontFamily:'"Noto sans"' });
            var ansText3 = this.add.text(width/2 - 150, height/8 *3-75, '', { fontSize: '12px', fill: '#000', fontFamily:'"Noto sans"' });
            var ansText4 = this.add.text(width/2 - 150, height/8 *3-50, 'It is usually on the back of a tractor.', { fontSize: '22px', fill: '#000', fontFamily:'"Noto sans"' });
            var ansText5 = this.add.text(width/2 - 150, height/8 *3-25,'It should be covered', { fontSize: '22px', fill: '#000', fontFamily:'"Noto sans"' });
            this.pto = this.add.image(width/2, height/2, 'pto');
        }else
        {
            var ansText = this.add.text(width/2 - 75, height/8 *3-50, 'This is a', { fontSize: '12px', fill: '#000', fontFamily:'"Noto sans"' });
            var ansText2 = this.add.text(width/2 - 75, height/8 *3-25, 'Power Take off shaft.', { fontSize: '12px', fill: '#000', fontFamily:'"Noto sans"' });
            var ansText3 = this.add.text(width/2 - 75, height/8 *3, 'It is usually on the ', { fontSize: '12px', fill: '#000', fontFamily:'"Noto sans"' });
            var ansText4 = this.add.text(width/2 - 75, height/8 *3+25, 'back of a tractor.', { fontSize: '12px', fill: '#000', fontFamily:'"Noto sans"' });
            var ansText5 = this.add.text(width/2 - 75, height/8 *3+50,'It should be covered', { fontSize: '12px', fill: '#000' , fontFamily:'"Noto sans"'});
            this.ptoSmall = this.add.image(width/2, height/2 + 55,'ptoSmall');
        }

        question.setText('');
        

        this.destroy();
        question.setText('');//change to a question
        this.continue = this.add.image(width/2, height/2+ height/4 - 25, 'continueBut');
        if(correct == 1){
            var rightORwrong = this.add.text(width/2 - 100, height/8 *2, 'Correct!', { fontSize: '32px', fill: '#000', fontFamily:'"Noto sans"' });
            correct = 0;
        }else{
            var rightORwrong = this.add.text(width/2 - 100, height/8 *2, 'Wrong!', { fontSize: '32px', fill: '#000', fontFamily:'"Noto sans"' });
            this.sound.play('wrong');
        }


        setTimeout(() => {
            this.continue.setInteractive();
        }, 750);

        this.continue.once('pointerdown', () => {
        
            this.questionrandomiser();
            if(width < 400)
            {
                
                this.ptoSmall.destroy(true);
            }else{
                this.pto.destroy(true);
            }
            this.pauseBG.destroy(true);
            ansText.setText('');
            ansText2.setText('');
            ansText3.setText('');
            ansText4.setText('');
            ansText5.setText('');
            rightORwrong.setText('');
            this.continue.destroy(true);
        });

        
    }
    round4()
    {
        scoreText.setText('Score: ' + score);
        roundText.setText('Round: ' + round);
        
        multipliertext.setText('Score *:'+scoremultiplier);

        if(width  > 400)
        {
            question = this.add.text(width/2 - 200,height/7 + 50,'What does this sign mean?', { fontSize: '32px', fill: '#000', fontFamily:'"Noto sans"' });
        }else
        {
            question = this.add.text(width/8- 40, height/7 + 25,  'What does this sign mean?', { fontSize: '22px', fill: '#000', fontFamily:'"Noto sans"' });
        }



        this.elecfence = this.add.image(width/2, height/2,'elecfence');
        this.box1 = this.add.image(width/4, height/2 + 150, 'Q4ans1');
        this.box2 = this.add.image(width/8 * 6, height/2 + 150, 'Q4ans2');
        this.box3 = this.add.image(width/4, height/2 + 250, 'Q4ans3');
        this.box4 = this.add.image(width/8*6, height/2 + 250, 'Q4ans4');

        this.interactive();
        this.box1.once('pointerdown', () => {
            this.round4inter();
            scoremultiplier = 1;
            this.sound.play('wrong');
        });  
        this.box2.once('pointerdown', () => {
            this.round4inter();
            scoremultiplier = 1;
            this.sound.play('wrong');
            
        });
        this.box3.once('pointerdown', () => {
            score = score + 100 * scoremultiplier;
            scoremultiplier ++;
            this.sound.play('correct');
            correct = 1;
            this.round4inter();
        });
        this.box4.once('pointerdown', () => {
            this.round4inter();
            scoremultiplier = 1;
            this.sound.play('wrong');
        });
        

    }
    round4inter(){
        question.setText('');
        round++;
        this.elecfence.destroy(true);
        
        this.destroy();        
        if(width  > 1000 && height > 720)
        {
            this.pauseBG = this.add.image(width/2, height/2, 'largepauseBG');
        }else
        {
            this.pauseBG = this.add.image(width/2, height/2, 'pauseBG');

        }

        if(width  < 400)
        {
            this.smallele = this.add.image(width/2, height/2, 'smallele');

        }
        else{
            
            this.elecfence = this.add.image(width/2, height/2,'elecfence');
        }
        this.destroy();
        question.setText('');
        var ansText = this.add.text(width/2 - 75, height/8 *3-50,'This sign means that', { fontSize: '12px', fill: '#000', fontFamily:'"Noto sans"' });
        var ansText2 = this.add.text(width/2 - 75, height/8 *3-25, 'the fence is electrified', { fontSize: '12px', fill: '#000', fontFamily:'"Noto sans"' });

        this.continue = this.add.image(width/2, height/2+ height/4 - 25, 'continueBut');
        if(correct == 1){
            var rightORwrong = this.add.text(width/2 - 100, height/8 *2, 'Correct!', { fontSize: '32px', fill: '#000' , fontFamily:'"Noto sans"'});
            correct = 0;
        }else{
            var rightORwrong = this.add.text(width/2 - 100, height/8 *2, 'Wrong!', { fontSize: '32px', fill: '#000', fontFamily:'"Noto sans"' });
            this.sound.play('wrong');
        }

        setTimeout(() => {
            this.continue.setInteractive();
        }, 750);

        this.continue.once('pointerdown', () => {
            this.questionrandomiser();
            if(width  < 400)
            {
                this.smallele.destroy(true);
            }
            else{
                this.elecfence.destroy(true);
            }
            this.pauseBG.destroy(true);
            ansText.setText('');
            ansText2.setText('');
            rightORwrong.setText('');
            this.continue.destroy(true);
        });

        
    }
    round5()
    {
        scoreText.setText('Score: ' + score);
        roundText.setText('Round: ' + round);    
        
        multipliertext.setText('Score *:'+scoremultiplier);
        
        this.acc = this.add.image(width/2,height/2, 'acc');
        if(width  > 400)
        {
            question = this.add.text(width/2-200, height/7 + 50, 'What is the most common', { fontSize: '32px', fill: '#000' , fontFamily:'"Noto sans"'});
            question2 = this.add.text(width/2-200, height/7 + 75, 'accident on a farm', { fontSize: '32px', fill: '#000', fontFamily:'"Noto sans"' });
        }else
        {
            question = this.add.text(width/8, height/7+25, 'What is the most common', { fontSize: '22px', fill: '#000', fontFamily:'"Noto sans"' });
            question2 = this.add.text(width/8, height/7 + 50, 'accident on a farm', { fontSize: '22px', fill: '#000' , fontFamily:'"Noto sans"'});
        }
 
        this.box1 = this.add.image(width/4, height/2 + 150, 'Q5ans1');
        this.box2 = this.add.image(width/8 * 6, height/2 + 150, 'Q5ans2');
        this.box3 = this.add.image(width/4, height/2 + 250, 'Q5ans3');
        this.box4 = this.add.image(width/8*6, height/2 + 250, 'Q5ans4');

        this.interactive();
        this.box1.once('pointerdown', () => {
            this.round5inter();
            scoremultiplier = 1;
            this.sound.play('wrong');
            
        });  
        this.box2.once('pointerdown', () => {
            console.log('correct');
            score = score + 100 * scoremultiplier;
            scoremultiplier ++;
            this.sound.play('correct');
            correct=1;
            this.round5inter();
        });
        this.box3.once('pointerdown', () => {
            this.round5inter();
            scoremultiplier = 1;
            this.sound.play('wrong');
        });
        this.box4.once('pointerdown', () => {
            this.round5inter();
            scoremultiplier = 1;
            this.sound.play('wrong');
        });

    }

    round5inter(){
        round ++;
        this.destroy();
        this.acc.destroy(true);
        question.setText('');
        
        question2.setText('');        
        
        if(width  > 1000 && height > 720)
        {
            this.pauseBG = this.add.image(width/2, height/2, 'largepauseBG');
        }else
        {
            this.pauseBG = this.add.image(width/2, height/2, 'pauseBG');
        }
        if(width < 400)
        {
            
            this.acc2 = this.add.image(width/2,height/2, 'acc2small');  
        }else
        {
            
        this.acc2 = this.add.image(width/2,height/2, 'acc2');  
        }

        this.destroy();
        question.setText('');


        var ansText = this.add.text(width/2 - 75, height/8 *3-50,  'Vechicular accidents are', { fontSize: '12px', fill: '#000', fontFamily:'"Noto sans"' });
        var ansText2 = this.add.text(width/2 - 75, height/8 *3-25,'the most common accident ', { fontSize: '12px', fill: '#000', fontFamily:'"Noto sans"' });
        var ansText3 = this.add.text(width/2 - 75, height/8 *3,'on a farm', { fontSize: '12px', fill: '#000', fontFamily:'"Noto sans"' });
        this.continue = this.add.image(width/2, height/2+ height/4 - 25, 'continueBut');
        
        if(correct == 1){
            var rightORwrong = this.add.text(width/2 - 100, height/8 *2, 'Correct!', { fontSize: '32px', fill: '#000', fontFamily:'"Noto sans"' });
            correct = 0;
        }else{
            var rightORwrong = this.add.text(width/2 - 100, height/8 *2, 'Wrong!', { fontSize: '32px', fill: '#000', fontFamily:'"Noto sans"' });
            this.sound.play('wrong');
        }


        setTimeout(() => {
            this.continue.setInteractive();
        }, 750);

        this.continue.once('pointerdown', () => {
            this.questionrandomiser();
            this.pauseBG.destroy(true);
            ansText.setText('');
            ansText2.setText('');
            ansText3.setText('')
            rightORwrong.setText('');
            this.continue.destroy(true);
            
            this.acc2.destroy(true);
        });

        
    }

    round6()
    {
        scoreText.setText('Score: ' + score);
        roundText.setText('Round: ' + round);
        
        multipliertext.setText('Score *:'+scoremultiplier);
        //this..destroy(true);

        if(width  > 400)
        {
            question = this.add.text(width/2-100, height/7, 'Are farm injuries', { fontSize: '22px', fill: '#000', fontFamily:'"Noto sans"' });
            question2 = this.add.text(width/2-100, height/7+30, 'on the rise?', { fontSize: '22px', fill: '#000' , fontFamily:'"Noto sans"'});
        }else
        {
            question = this.add.text(width/8, height/7+ 25, 'Are farm injuries', { fontSize: '22px', fill: '#000', fontFamily:'"Noto sans"' });
            question2 = this.add.text(width/8, height/7+50, 'on the rise?', { fontSize: '22px', fill: '#000', fontFamily:'"Noto sans"' });
        }



        this.accident = this.add.image(width/2, height/2,'accident');

        this.box1 = this.add.image(width/4, height/2 + 150, 'true');
        this.box2 = this.add.image(width/8 * 6, height/2 + 150, 'false');
        this.box3 = this.add.image(width/4, height/2 + 250, 'ans3');
        this.box4 = this.add.image(width/8*6, height/2 + 250, 'ans4');
            this.box3.setVisible(false);
            this.box4.setVisible(false);
        setTimeout(() => {
            this.box1.setInteractive();
            this.box2.setInteractive();
        }, 750);


        this.box1.once('pointerdown', () => {
            score = score + 100 * scoremultiplier;
            scoremultiplier ++;
            this.sound.play('correct');
            this.accident.destroy(true);
            correct = 1;
            this.box3.destroy(true);
            this.box4.destroy(true);
            this.round6inter();
        });
        this.box2.once('pointerdown', () => {
            this.round6inter();
            scoremultiplier = 1;
        });
    }

    round6inter(){

        this.accident.destroy(true);
        round++;
        
        question.setText('');
        question2.setText('');        
        if(width  > 1000 && height > 720)
        {
            this.pauseBG = this.add.image(width/2, height/2, 'largepauseBG');
        }else
        {
            this.pauseBG = this.add.image(width/2, height/2, 'pauseBG');
        }
        if(width > 400)
        {
            this.accident = this.add.image(width/2, height/2,'accident');
        }
        else{
            
            this.accident = this.add.image(width/2, height/2,'accidentsmall');
        }

        //show an aul pie chart here
        this.box1.destroy(true);
        this.box2.destroy(true);
        question.setText('');

        var ansText = this.add.text(width/2 - 75, height/8 *3-50,  'Farm injuries have', { fontSize: '12px', fill: '#000', fontFamily:'"Noto sans"' });
        var ansText2 = this.add.text(width/2 - 75, height/8 *3-25,  'risen by 13%', { fontSize: '12px', fill: '#000', fontFamily:'"Noto sans"' });
        var ansText3 = this.add.text(width/2 - 75, height/8 *3, '-Teagasc 2018', { fontSize: '9px', fill: '#000', fontFamily:'"Noto sans"' });
        this.continue = this.add.image(width/2, height/2+ height/4 - 25, 'continueBut');
        
        if(correct == 1){
            var rightORwrong = this.add.text(width/2 - 100, height/8 *2, 'Correct!', { fontSize: '32px', fill: '#000', fontFamily:'"Noto sans"' });
            correct = 0;
        }else{
            var rightORwrong = this.add.text(width/2 - 100, height/8 *2, 'Wrong!', { fontSize: '32px', fill: '#000', fontFamily:'"Noto sans"' });
            this.sound.play('wrong');
        }

        setTimeout(() => {
            this.continue.setInteractive();
        }, 750);

        this.continue.once('pointerdown', () => {
            this.questionrandomiser();
            this.accident.destroy(true);
            this.pauseBG.destroy(true);
            ansText.setText('');
            ansText2.setText('');
            ansText3.setText('');
            rightORwrong.setText('');
            this.continue.destroy(true);
        });

        
    }
    shuffle(array) 
    {
        array.sort(() => Math.random() - 0.5);
    }


    finish()
    {
        question.setText('');
        question2.setText('');
        scoreText.setText('Score: ' + score);
        //this..destroy(true);

        question.setText('Congrats you got : ' + score);
        if(score < 300)
        {
            if(width  > 1000 && height > 720)
            {
                var starttext = this.add.text(width/2- 100, height/2 - 150, 'If you would like to', { fontSize: '12px', fill: '#000', fontFamily:'"Noto sans"' });
                var starttext2 = this.add.text(width/2- 100, height/2 - 125, 'improve your score by', { fontSize: '12px', fill: '#000', fontFamily:'"Noto sans"' });
                var starttext3 = this.add.text(width/2- 100, height/2 - 100, 'reading up more, use the', { fontSize: '12px', fill: '#000' , fontFamily:'"Noto sans"'});
                var starttext4 = this.add.text(width/2- 100, height/2 - 75, 'guides in the main menu', { fontSize: '12px', fill: '#000', fontFamily:'"Noto sans"' });

            }else
            {
                var starttext = this.add.text(width/2- 100, height/2 - 150, 'If you would like to', { fontSize: '12px', fill: '#000', fontFamily:'"Noto sans"' });
                var starttext2 = this.add.text(width/2- 100, height/2 - 125, 'improve your score by', { fontSize: '12px', fill: '#000', fontFamily:'"Noto sans"' });
                var starttext3 = this.add.text(width/2- 100, height/2 - 100, 'reading up more, use the', { fontSize: '12px', fill: '#000', fontFamily:'"Noto sans"' });
                var starttext4 = this.add.text(width/2- 100, height/2 - 75, 'guides in the main menu', { fontSize: '12px', fill: '#000', fontFamily:'"Noto sans"' });

            }



        }

        
        this.submitscore = this.add.image(width/2, height/2 + 100, 'submits');
                
        this.submitscore.setInteractive();
        this.submitscore.on('pointerdown', () => {
            //firebase shite here

            if(width  > 1000 && height > 720)
            {
                this.pauseBG = this.add.image(width/2, height/2, 'largepauseBG');
            }else
            {
                this.pauseBG = this.add.image(width/2, height/2, 'pauseBG');
            }
            question.setText('');

            const elem = document.getElementById('text');//text box shite
            elem.style.display = 'visible';
            this.add.dom(width/2, height/2, elem);
            this.restart.setVisible(false);
            this.home.setVisible(false);
            this.submitscore.setVisible(false);
            const myVar = document.getElementById('name-input');

            if(width  > 1000 && height > 720)
            {
                var starttext = this.add.text(width/2- 100, height/2 - 100, 'Enter your first name', { fontSize: '12px', fill: '#000', fontFamily:'"Noto sans"' });
                var starttext2 = this.add.text(width/2- 100, height/2 - 75, 'and your score will', { fontSize: '12px', fill: '#000', fontFamily:'"Noto sans"' });
                var starttext3 = this.add.text(width/2- 100, height/2 - 50, 'be submitted to', { fontSize: '12px', fill: '#000', fontFamily:'"Noto sans"' });
                var starttext4 = this.add.text(width/2- 100, height/2 - 25, 'the leaderboards', { fontSize: '12px', fill: '#000' , fontFamily:'"Noto sans"'});
            }else
            {
                var starttext = this.add.text(width/2- 100, height/2 - 100, 'Enter your first name', { fontSize: '12px', fill: '#000', fontFamily:'"Noto sans"' });
                var starttext2 = this.add.text(width/2- 100, height/2 - 75, 'and your score will', { fontSize: '12px', fill: '#000', fontFamily:'"Noto sans"' });
                var starttext3 = this.add.text(width/2- 100, height/2 - 50, 'be submitted to', { fontSize: '12px', fill: '#000', fontFamily:'"Noto sans"' });
                var starttext4 = this.add.text(width/2- 100, height/2 - 25, 'the leaderboards', { fontSize: '12px', fill: '#000' , fontFamily:'"Noto sans"'});
            }

            this.submit = this.add.image(width/2, height/2 + 100, 'submit');
            this.submit.setInteractive();
            this.submit.once('pointerdown', () => {
                console.log(myVar);
                // will do firebase and kick back to main menu
                const db = firebase.firestore()
                db.collection('Leaderboards').doc('quiz').collection('scores').add({ score: score, name: myVar.value})
                setTimeout(() => {
                    location.href = "/home"
                }, 2000);
            }); 
        });
                


        this.home = this.add.image(width/2,height/2 + 200, 'homeBut' );
        this.home.setInteractive();

        this.home.on('pointerdown', ()=> {
            location.href = "/home"
        });

        this.restart = this.add.image(width/2,height/2, 'restartBut');
        this.restart.setInteractive();

        this.restart.on('pointerdown', ()=> {
            this.scene.restart();
        });
    }
}