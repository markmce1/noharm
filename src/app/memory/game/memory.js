import * as firebase from "firebase/app"
import "firebase/firestore"

var width = window.innerWidth;
var height = window.innerHeight;
var scoreText;
var roundText;
var timeSurvived;
var elaspedTime;
var time = 60;
var score = 0;
var round = 1;//round counter
var counter = 0;//
var checkone;//stores what the first box clicks image number was
var checktwo;//stores what the second box clicks image number was
var clicked;//stores what was just clicked
var allchecked = 0;
var checker = [0,0,0,0,0,0,0,0,0,0,0,0];//0 means covered, 1 means uncovered, 2 means its been finished with
var arr = [1,1,2
    ,2,3,3
    ,4,4,5
    ,5,6,6]
var i;
var startedmusic =0;

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

export default class Scene1 extends Phaser.Scene 
{

    constructor(config) {
        super(config);
    }

    preload() {
        //images loaded
        this.load.image('one', 'assets/memory/images/haz1.png');
        this.load.image('two', 'assets/memory/images/haz2.png');
        this.load.image('three', 'assets/memory/images/haz3.png');
        this.load.image('four', 'assets/memory/images/haz4.png');
        this.load.image('five', 'assets/memory/images/haz5.png');
        this.load.image('six', 'assets/memory/images/haz6.png');
        this.load.image('card', 'assets/memory/images/card.png');
        this.load.image('cardbg', 'assets/memory/images/cardbg.png');
        this.load.image('bg', 'assets/space/bg3.png');

        this.load.image('pause','assets/quiz/images/pause.png');
        this.load.image('resumeBut', 'assets/gui/resume.png');
        this.load.image('homeBut', 'assets/gui/homeBut.png');
        this.load.image('restartBut','assets/gui/restart.png' );
        this.load.image('pauseBG','assets/gui/pauseBG.png' );
        this.load.image('help', 'assets/gui/help.png');
        
        this.load.image('largepauseBG','assets/gui/largepauseBG.png' );
        
        this.load.image('grass', 'assets/memory/images/bg.png');
        
        
        this.load.audio('erict2','assets/music/erict2.mp3' );


        this.load.audio('flip' , 'assets/memory/sounds/cardflip.wav');

        this.load.image('submits', 'assets/gui/submits.png');
        
        this.load.image('submit', 'assets/gui/submit.png');
    }
    create() {


        if(startedmusic == 0)
        {
            this.sound.play('erict2', { loop: true });
            startedmusic = 1;
        }

        this.add.image(width/2, height/2, 'grass');

        this.cameras.main.backgroundColor = Phaser.Display.Color.HexStringToColor("#00FF00" );
        this.add.image(width/2,45,'bg');
        const frames = ['','one', 'two', 'three', 'four', 'five', 'six'];
        //make onecard, two card array
        this.shuffle(arr);
        scoreText = this.add.text(16, 16, 'Score: ' + score, { fontSize: '32px', fill: '#000' });
        roundText = this.add.text(16 ,48 ,'Round: ' + round, { fontSize: '32px', fill: '#000' });
        var w = width /4;
        var h = height/4 - height/8 + 65;
        

        this.pauseBut = this.add.image(width/2+  width / 6,25, 'pause');
        this.pauseBut.setInteractive();

        this.pauseBut.once('pointerdown',()=>{
            this.pause1();
            this.resume.on('pointerdown', () => {
                this.resume1();

            });
        
        });
        this.timeloop();
        timeSurvived = this.add.text(width/2,48, 'Time: ' + time, { fontSize: '32px', fill: '#000' });

    

        this.ima = this.add.image(w,h, 'cardbg');
        this.ima = this.add.image(w*2, h , 'cardbg');
        this.ima = this.add.image(w*3,h, 'cardbg');
        this.ima = this.add.image(w, h*2, 'cardbg');
        this.ima = this.add.image(w*2,h*2, 'cardbg');
        this.ima = this.add.image(w*3, h*2, 'cardbg');    
        this.ima = this.add.image(w,h*3, 'cardbg');
        this.ima = this.add.image(w*2 , h*3, 'cardbg');
        this.nine = this.add.image(w*3,h*3, 'cardbg');
        this.ten = this.add.image(w * 1, h*4 , 'cardbg');
        this.eleven = this.add.image(w*2,h*4, 'cardbg');
        this.twelve = this.add.image(w*3, h*4, 'cardbg');



        for(i=0; i < 7; i++)
        {
            if(arr[0] == i)
            {
                this.onecard = this.add.image(w, h, frames[i]);
            }
        }
        for(i=0; i < 7; i++)
        {
            if(arr[1] == i)
            {
                this.twocard = this.add.image(w*2, h, frames[i]);
            }
        }
        for(i=0; i < 7; i++)
        {
            if(arr[2] == i)
            {
                this.threecard = this.add.image(w*3, h, frames[i]);
            }
        }
        for(i=0; i < 7; i++)
        {
            if(arr[3] == i)
            {
                this.fourcard = this.add.image(w, h*2, frames[i]);
            }
        }
        for(i=0; i < 7; i++)
        {
            if(arr[4] == i)
            {
                this.fivecard = this.add.image(w*2, h*2, frames[i]);
            }
        }
        for(i=0; i < 7; i++)
        {
            if(arr[5] == i)
            {
                this.sixcard = this.add.image(w*3, h*2, frames[i]);
            }
        }

        for(i=0; i < 7; i++)
        {
            if(arr[6] == i)
            {
                this.sevencard = this.add.image(w*1, h*3, frames[i]);
            }
        }
        for(i=0; i < 7; i++)
        {
            if(arr[7] == i)
            {
                this.eightcard = this.add.image(w*2, h*3, frames[i]);
            }
        }
        for(i=0; i < 7; i++)
        {
            if(arr[8] == i)
            {
                this.ninecard = this.add.image(w*3, h*3, frames[i]);
            }
        }
        for(i=0; i < 7; i++)
        {
            if(arr[9] == i)
            {
                this.tencard = this.add.image(w*1, h*4, frames[i]);
            }
        }
        for(i=0; i < 7; i++)
        {
            if(arr[10] == i)
            {
                this.elevencard = this.add.image(w*2, h*4, frames[i]);
            }
        }
        for(i=0; i < 7; i++)
        {
            if(arr[11] == i)
            {
                this.twelvecard = this.add.image(w*3, h*4, frames[i]);
            }
        }

        this.one = this.add.image(w,h, 'card');
        this.two = this.add.image(w*2, h , 'card');
        this.three = this.add.image(w*3,h, 'card');
        this.four = this.add.image(w, h*2, 'card');
        this.five = this.add.image(w*2,h*2, 'card');
        this.six = this.add.image(w*3, h*2, 'card');    
        this.seven = this.add.image(w,h*3, 'card');
        this.eight = this.add.image(w*2 , h*3, 'card');
        this.nine = this.add.image(w*3,h*3, 'card');
        this.ten = this.add.image(w * 1, h*4 , 'card');
        this.eleven = this.add.image(w*2,h*4, 'card');
        this.twelve = this.add.image(w*3, h*4, 'card');


        this.setinter();



        this.one.on('pointerdown',()=>{
            this.one.setVisible(false);
            this.clickedIma();
            checker[0]= 1;
            clicked = 0;
        });
        this.two.on('pointerdown',()=>{
            this.two.setVisible(false);
            checker[1]= 1;
            clicked = 1;
            this.clickedIma();
        });
        this.three.on('pointerdown',()=>{
            this.three.setVisible(false);
            this.clickedIma();
            checker[2]= 1;
            clicked= 2;

        });
        this.four.on('pointerdown',()=>{
            this.four.setVisible(false);
            this.clickedIma();
            checker[3]=1;
            clicked = 3;
        });
        this.five.on('pointerdown',()=>{
            this.five.setVisible(false);
            this.clickedIma();
            checker[4]=1;
            clicked = 4;
        });
        this.six.on('pointerdown',()=>{
            this.six.setVisible(false);
            this.clickedIma();
            checker[5]=1;
            clicked = 5;
        });
        this.seven.on('pointerdown',()=>{
            this.seven.setVisible(false);
            this.clickedIma();
            checker[6]=1;
            clicked = 6;
        });
        this.eight.on('pointerdown',()=>{
            this.eight.setVisible(false);
            this.clickedIma();
            checker[7]=1;
            clicked = 7;
        });
        this.nine.on('pointerdown',()=>{
            this.nine.setVisible(false);
            this.clickedIma();
            checker[8]=1;
            clicked = 8;
        });
        this.ten.on('pointerdown',()=>{
            this.ten.setVisible(false);
            this.clickedIma();
            checker[9]=1;
            clicked = 9;
        });
        this.eleven.on('pointerdown',()=>{
            this.eleven.setVisible(false);
            this.clickedIma();
            checker[10]=1;
            clicked = 10;
        });
        this.twelve.on('pointerdown',()=>{
            this.twelve.setVisible(false);
            this.clickedIma();
            checker[11]=1;
            clicked = 11;
        });

    }

    update() {
        if(counter == 1)
        {
            checkone = arr[clicked];
            console.log(checkone);
        }
        
        if(counter == 2)
        {
            checktwo = arr[clicked];
            this.counterflip();
            counter = 0;
        }
        //add in loop of gameplay

    }

    counterflip()
    {

        
        this.disableinter();

        if(checktwo != checkone)
        {
            
            setTimeout(() => {
                if(checker[0]== 1)
                {
                    this.one.setVisible(true);
                    checker[0]= 0;
                }
                if(checker[1] == 1)
                {
                    this.two.setVisible(true);
                    checker[1] = 0;
                }
                if(checker[2] == 1)
                {
                    this.three.setVisible(true);
                    checker[2] = 0;    
                }
                if(checker[3] == 1)
                {
                    this.four.setVisible(true);
                    checker[3] = 0;    
                }
                if(checker[4] == 1)
                {
                    this.five.setVisible(true);
                    checker[4] = 0;    
                }
                if(checker[5] == 1)
                {
                    this.six.setVisible(true);
                    checker[5] = 0;    
                }
                if(checker[6] == 1)
                {
                    this.seven.setVisible(true);
                    checker[6] = 0;    
                }
                if(checker[7] == 1)
                {
                    this.eight.setVisible(true);
                    checker[7] = 0;    
                }
                if(checker[8] == 1)
                {
                    this.nine.setVisible(true);
                    checker[8] = 0;    
                }
                if(checker[9] == 1)
                {
                    this.ten.setVisible(true);
                    checker[9] = 0;    
                }
                if(checker[10] == 1)
                {
                    this.eleven.setVisible(true);
                    checker[10] = 0;    
                }
                if(checker[11] == 1)
                {
                    this.twelve.setVisible(true);
                    checker[11] = 0;    
                }
                this.setinter();

            }, 500);
            

        }else if(checktwo == checkone)
        {
            score = score + 100;
            scoreText.setText('Score: ' + score );
            for(i=0; i < 13; i++){
                if(checker[i] == 1)
                {
                    checker[i] = 2;
                    console.log(checker[i]);
                    allchecked ++;
                }
            }
            this.setinter();
            if(allchecked == 12)
            {
                //end game
                round++;
                allchecked = 0;
                checker = [0,0,0,0,0,0,0,0,0,0,0,0];
                var endGame = this.add.text(width/2 - 100, 200, 'Level won!', { fontSize: '32px', fill: '#000' });
                setTimeout(() => {
                    endGame.setText("");
                    roundText.setText("Round: " + round);
                    checktwo =0;
                    checkone = 0;
                    clicked =0;
                    this.shuffle(arr);
                    this.scene.restart();
                }, 3000);
           }
        }
    }
    shuffle(array) 
    {
        array.sort(() => Math.random() - 0.5);
    }

    clickedIma()
    {
        counter++;
        this.sound.play('flip');
    }

    timeloop(){
        this.elapsedTime = 60;
        this.timeThing = this.time.addEvent({
          delay: 1000,
          loop: true,
          callback: () => {
            this.elapsedTime--
            timeSurvived.setText('Time: ' + this.elapsedTime)
            if(this.elapsedTime == 50)
            {
                this.timeThing.paused = true;
                if(width  > 1000 && height > 720)
                {
                    this.pauseBG = this.add.image(width/2, height/2, 'largepauseBG');

                    var endGame = this.add.text(width/2 - 125, height/2 - 200, 'Game over', { fontSize: '22px', fill: '#000' });
                    var endGame2 = this.add.text(width/2 - 125, height/2 -150, 'Press the button', { fontSize: '22px', fill: '#000' });
                    var endGame3 = this.add.text(width/2 - 125,height/2 -100, 'to retry', { fontSize: '22px', fill: '#000' });
                    var endGame4 = this.add.text(width/2 - 125,height/2 -50, 'Your score was '+ score, { fontSize: '22px', fill: '#000' });
                }else
                {
                    this.pauseBG = this.add.image(width/2, height/2, 'pauseBG');

                    var endGame = this.add.text(width/2 - 105, height/2 - 150, 'Game over', { fontSize: '17px', fill: '#000' });
                    var endGame2 = this.add.text(width/2 - 105, height/2 -125, 'Press the button', { fontSize: '17px', fill: '#000' });
                    var endGame3 = this.add.text(width/2 - 105,height/2 -100, 'to retry', { fontSize: '17px', fill: '#000' });
                    var endGame4 = this.add.text(width/2 - 105,height/2 -75, 'Your score was '+ score, { fontSize: '17px', fill: '#000' });
                }
                


                this.submitscore = this.add.image(width/2, height/2 + 50, 'submits');
                
                this.submitscore.setInteractive();
                this.submitscore.on('pointerdown', () => {
                    //firebase shite here

                    const elem = document.getElementById('text');//text box shite
                    elem.style.display = 'visible';
                    this.add.dom(width/2, height/2, elem);
                    this.resume.setVisible(false);
                    this.submitscore.setVisible(false);

                    const myVar = document.getElementById('name-input');
                    if(width  > 1000 && height > 720)
                    {
                        var starttext = this.add.text(width/2- 100, height/2 - 100, 'Enter your first name', { fontSize: '12px', fill: '#000' });
                        var starttext2 = this.add.text(width/2- 100, height/2 - 75, 'and your score will', { fontSize: '12px', fill: '#000' });
                        var starttext3 = this.add.text(width/2- 100, height/2 - 50, 'be submitted to', { fontSize: '12px', fill: '#000' });
                        var starttext4 = this.add.text(width/2- 100, height/2 - 25, 'the leaderboards', { fontSize: '12px', fill: '#000' });
                    }else
                    {
                        var starttext = this.add.text(width/2- 100, height/2 - 100, 'Enter your first name', { fontSize: '12px', fill: '#000' });
                        var starttext2 = this.add.text(width/2- 100, height/2 - 75, 'and your score will', { fontSize: '12px', fill: '#000' });
                        var starttext3 = this.add.text(width/2- 100, height/2 - 50, 'be submitted to', { fontSize: '12px', fill: '#000' });
                        var starttext4 = this.add.text(width/2- 100, height/2 - 25, 'the leaderboards', { fontSize: '12px', fill: '#000' });
                    }
                    
                    this.submit = this.add.image(width/2, height/2 + 100, 'submit');
                    this.submit.setInteractive();
                    this.submit.once('pointerdown', () => {
                        console.log(myVar);
                        // will do firebase and kick back to main menu
                        const db = firebase.firestore()
                        db.collection('Leaderboards').doc('Memorygame').collection('scores').add({ score: score, name: myVar.value})
                        setTimeout(() => {
                            location.href = "/home"
                        }, 2000);
                    });    
                });

                this.resume = this.add.image(width/2, height/2 + 125, 'restartBut');
                
                this.resume.setInteractive();
                this.resume.on('pointerdown', () => {
                    this.scene.restart();
                });
        

            }
          }
        })
    }

    setinter()
    {
        
        this.one.setInteractive();
        this.two.setInteractive();
        this.three.setInteractive();
        this.four.setInteractive();
        this.five.setInteractive();
        this.six.setInteractive();
        this.seven.setInteractive();
        this.eight.setInteractive();
        this.nine.setInteractive();
        this.ten.setInteractive();
        this.eleven.setInteractive();
        this.twelve.setInteractive();

    }

    disableinter()
    {
        this.one.disableInteractive();
        this.two.disableInteractive();
        this.three.disableInteractive();
        this.four.disableInteractive();
        this.five.disableInteractive();
        this.six.disableInteractive();
        this.seven.disableInteractive();
        this.eight.disableInteractive();
        this.nine.disableInteractive();
        this.ten.disableInteractive();
        this.eleven.disableInteractive();
        this.twelve.disableInteractive();

    }

    pause1()
    {
        
        this.timeThing.paused = true;
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
        var starttext = this.add.text(width/2- 100, height/2 - 100, 'The objective of the game', { fontSize: '12px', fill: '#000' });
        var starttext2 = this.add.text(width/2- 100, height/2 - 75, 'is to match the correct', { fontSize: '12px', fill: '#000' });
        var starttext3 = this.add.text(width/2- 100, height/2 - 50, 'cards. Match them all', { fontSize: '12px', fill: '#000' });
        var starttext4 = this.add.text(width/2- 100, height/2 - 25, 'Within the time limit', { fontSize: '12px', fill: '#000' });
        var starttext5 = this.add.text(width/2- 100, height/2, 'to win!', { fontSize: '12px', fill: '#000' });
    }else
    {
        var starttext = this.add.text(width/2- 100, height/2 - 100, 'The objective of the game', { fontSize: '12px', fill: '#000' });
        var starttext2 = this.add.text(width/2- 100, height/2 - 75, 'is to match the correct', { fontSize: '12px', fill: '#000' });
        var starttext3 = this.add.text(width/2- 100, height/2 - 50, 'cards. Match them all', { fontSize: '12px', fill: '#000' });
        var starttext4 = this.add.text(width/2- 100, height/2 - 25, 'Within the time limit', { fontSize: '12px', fill: '#000' });
        var starttext5 = this.add.text(width/2- 100, height/2, 'to win!', { fontSize: '12px', fill: '#000' });
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
    });

}
    resume1()
    {
        this.timeThing.paused = false
        setTimeout(() => {
            
        this.setinter();
        }, 200);
        this.resume.setVisible(false);
        this.home.setVisible(false);
        
        this.help.setVisible(false);
        this.restart.setVisible(false);
        this.pauseBG.setVisible(false);
        
        this.pauseBG.setVisible(false);

        this.pauseBut.once('pointerdown',()=>{
            this.pause1();

            this.resume.on('pointerdown', () => {
                this.resume1();
            });
        });
    }

}