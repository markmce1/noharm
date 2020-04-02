
import * as firebase from "firebase/app"
import "firebase/firestore"

import WebFontFile from './webfontfile'

var score= 0;
var scoreText;
var roundText; //just stuff for set Texts
var endGame;
var livesText;
var dir=1;
var width = window.innerWidth;
var timedevent;
var height =window.innerHeight;
var scorecount = 0;
var round = 1;
var speed = 1;
var lives = 3;
var start = 0;
var paused = 0;
var hitvar = 0;
var startedmusic = 0;
var hit = 0;
var roundover = 0;

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


///////////////////////////////////////////////////////

class tractor extends Phaser.GameObjects.Sprite  {

    constructor(scene, x , y) {
        super(scene, x, y);
        this.setTexture('tractor');
        this.setPosition(x, y);
        
        scene.physics.world.enable(this);

        this.scene = scene;
        this.deltaX = 5;
        this.deltaY = 5;
        this.lasers = new Array();
        this.lastShot = new Date().getTime();
        this.shotFrequency = 250;
    }

    moveLeft() {
        if (this.x > 25) {
            this.x -= this.deltaX;
        }
    }

    moveRight() {
        if (this.x < width - 25) {
            this.x += this.deltaX;
        }
    }


    fireLasers() {
        var currentTime = new Date().getTime();
        if (currentTime - this.lastShot > this.shotFrequency) {
            var shipLaser = new ShipLaser(this.scene, this.x, this.y);
            this.scene.add.existing(shipLaser);
            this.scene.sound.play('shoot');
            this.lasers.push(shipLaser);
            this.lastShot = currentTime;
        } 
    }

    preUpdate(time, delta) {
        super.preUpdate(time, delta);

        var i = 0;
        var j = 0;
        var lasersToRemove = new Array(); 

        for (i = 0; i < this.lasers.length; i++) {
            this.lasers[i].update();

            if (this.lasers[i].y <= 0) {
                lasersToRemove.push(this.lasers[i]);
            }
        }

        for (j = 0; j < lasersToRemove.length; j++) {
            var laserIndex = this.lasers.indexOf(lasersToRemove[j]);
            this.lasers.splice(laserIndex, 1);
            lasersToRemove[j].destroy();
        }
    }
}

///////////////////////////////////////////////////

class ShipLaser extends Phaser.GameObjects.Sprite {

    constructor(scene, x, y) {
        super(scene, x, y);
        this.setTexture('key');
        this.setPosition(x, y);
        this.speed = 10;
        this.scene = scene;
        scene.physics.world.enable(this);
        scene.physics.add.collider(this, scene.enemies, this.handleHit, null, this);//Adds Collision
    }



    handleHit(laserSprite, enemySprite) {//What happens when a Key and Enemy sprite hit each other
        enemySprite.destroy(true);//Enemy disappears
        this.scene.sound.play('lock');
        this.scene.enemies.remove;
        this.scene.topLeft = this.scene.enemies.getChildren()[0];
        this.scene.bottomRight = this.scene.enemies.getChildren()[this.scene.enemies.getChildren().length - 1];
        laserSprite.destroy(true);//Key disappears
        score = score+(1 * round);//Add 1 to score
        scorecount = scorecount +1;
        scoreText.setText('Score: ' + score);// Set the text to score
    }

    preUpdate(time, delta) {//handles movement of the keys
        if(this.active == false){return;}
        super.preUpdate(time, delta);
        this.y -= this.speed;
    }
}

///////////////////////////////////////////////

class EnemyLaser extends Phaser.GameObjects.Sprite {

    constructor(scene, x, y) {
        super(scene, x, y);
        this.setTexture('cow');
        this.setPosition(x, y);
        this.speed = -2.5;
        this.scene = scene;
        scene.physics.world.enable(this);
        scene.physics.add.collider(this, scene.myTractor, this.handleHit, null, this);//Adds Collision
    }
    handleHit(laserSprite) {//What happens when a cow and the player sprite hit each other
        laserSprite.destroy(true);//Key disappears
        //add in some "lost a life" dialogue here
        if(roundover == 0)
        {
        console.log('hit');
        lives --; 
        scorecount = 0;
        hitvar = 1; // allows function to run to do all stuff to scene
        paused = 1;
        if(lives > 0)
        {
            setTimeout(() => {
                paused = 0;
            }, 3000);
        }
    }
    }
    preUpdate(time, delta) {
        if (paused == 1)
        {
            return
        }
        //handles movement of the keys
        if(this.active == false){return;}
        super.preUpdate(time, delta);
        this.y -= this.speed;
    }
}




///////////////////////////////////////

class Enemy1 extends Phaser.GameObjects.Sprite {
    constructor(scene, x, y) {//accessed by function in scene1 to create enemies
        super(scene, x, y);
        this.setTexture('gate');//sets texture. 
        this.setPosition(x,y);//sets enemy position
        scene.physics.world.enable(this);//Makes them apply to the set physics
        this.gameObject = this;
    }

    fireLasers() {
        var enemyLaser = new EnemyLaser(this.scene, this.x, this.y);
        this.scene.add.existing(enemyLaser);
        this.scene.sound.play('shoot');
    }
}

/////////////////////////////////////////////

export default class Scene1 extends Phaser.Scene {

    constructor(config) {
        super(config);
    }

    preload() {
        //sounds loaded 
        this.load.audio('lock', 'assets/space/sounds/lock.wav');
        this.load.audio('shoot', 'assets/space/sounds/shoot.wav');
        this.load.audio('click1', 'assets/space/sounds/click.wav');
        //images loaded
        this.load.image('tractor', 'assets/space/tractor1.png');
        this.load.image('key', 'assets/space/key.png');
        this.load.image('gate', 'assets/space/gate2sh.png');
        this.load.image('grass','assets/dodge/images/bg.png');
        this.load.image('rightBut', 'assets/space/rightBut.png');
        this.load.image('leftBut', 'assets/space/leftBut.png');
        this.load.image('shoot', 'assets/space/shoot.png'); 
        this.load.image('pause','assets/space/pause.png');
        this.load.image('bg', 'assets/space/bg3.png');
        this.load.image('cow', 'assets/space/cow.png');
        this.load.image('box', 'assets/space/box.png');
        this.load.image('resumeBut', 'assets/gui/resume.png');
        this.load.image('restartBut', 'assets/gui/restart.png');
        this.load.image('homeBut', 'assets/gui/homeBut.png');
        this.load.image('help', 'assets/gui/help.png');
        this.load.image('start', 'assets/gui/start.png');
        this.load.image('submitBut', 'assets/gui/submits.png');
        this.load.image('submit', 'assets/gui/submit.png');
        this.load.image('pauseBG','assets/gui/pauseBG.png' );
        this.load.image('largepauseBG','assets/gui/largepauseBG.png' );
        //music     
        this.load.audio('erict','assets/music/erict.mp3' );
        
        //fonts
        
        const fonts = new WebFontFile(this.load, ['Noto Sans', 'Anton'])
        this.load.addFile(fonts)



        
    }

    create() {
        if(startedmusic == 0)
        {

            this.sound.play('erict', { loop: true })
            startedmusic = 1;
        }

         
        this.add.image(width/2, height/2, 'grass');
        this.bg = this.add.image(width/2,45,'bg');
        this.bg.setDepth(1);
        this.myTractor = new tractor(this, width/2,height - 175);
        this.add.existing(this.myTractor);
        this.enemies = this.physics.add.group();
        this.enemies2 = new Array();


        let k = 0;
        let arrCount =0;
        let yloop = 0;
        let y =   120;
        let w = width / 6;
        let x = w / 2;//was 100
        //creating enemies
        for(yloop =0; yloop < 6; yloop++)//To put them lower on the screen
        {
            for (k = 0; k < 4; k++) {//for loop to make enemies. This loop also sets amount of en
                
                
                this.enemy = new Enemy1(this, x, y);//Calls enemy1 function
                this.add.existing(this.enemy);
                this.enemies.add(this.enemy);
                this.enemies2.push(this.enemy);
                arrCount++;
                y = y + 50;
            }
        x = x + w;
        y = 120;
    }
    this.topLeft = this.enemies2[0];
    this.bottomRight = this.enemies2[23];
    //////////////////////////////pausing here//////////////////////////////////////////////////////////////////////////

    this.pauseBut = this.add.image(width/2+ w,25, 'pause');
 
    this.pauseBut.setInteractive();
    this.pauseBut.setDepth(2);

    this.pauseBut.once('pointerdown',()=>{
            this.pause1();
            //add help option
            this.resume.on('pointerdown', () => {
                this.resume1();
            });

        
    });
    ////////buttons galore here. Left Right and fire. //////////////////////////////////////////////////////////////////////
    this.moveLeftButton = this.add.image( width/8, height - 100, 'leftBut');

    this.moveLeftButton.on('pointerdown', () => {
    this.isMovingLeft = true;
    });

    this.moveLeftButton.on('pointerup', () => {
     this.isMovingLeft = false;
     this.isMovingRight = false;
    });

    this.moveRightButton = this.add.image(width/8 * 7, height - 100, 'rightBut');

    this.moveRightButton.on('pointerdown', () => {
    this.isMovingRight = true;
    });

    this.moveRightButton.on('pointerup', () => {
     this.isMovingLeft = false;
     this.isMovingRight = false;
    });

    this.shootButton = this.add.image(width/2 , height - 100, 'shoot');

    this.shootButton.on('pointerdown', () => {
     this.isShooting= true;
    });

    this.shootButton.on('pointerup', () => {
     this.isShooting = false;
    });
    this.moveLeftButton.setInteractive();
    this.moveRightButton.setInteractive();
    this.shootButton.setInteractive();

    
    scoreText = this.add.text(16, 16, 'Score: ' + score, { fontSize: '32px', fill: '#000' , fontFamily: '"Anton"'});
    scoreText.setDepth(2);
    roundText = this.add.text(16 ,48 ,'Round: ' + round, { fontSize: '32px', fill: '#000', fontFamily: '"Anton"' });
    livesText = this.add.text(width/2+ (w - 50), 48, 'Lives: ' + lives, { fontSize: '32px', fill: '#000' , fontFamily: '"Anton"'});
    roundText.setDepth(2);
    livesText.setDepth(2);

    if(start == 1){
        this.shootloop();
    }



    
    if(start ==0){

        if(width  > 1000 && height > 720)
        {
            this.pauseBG = this.add.image(width/2, height/2, 'largepauseBG');
            var starttext = this.add.text(width/2- 175, height/2 - 150, 'The farmer needs your help!', { fontSize: '22px', fill: '#000' , fontFamily: '"Noto Sans"'});
            var starttext2 = this.add.text(width/2- 175, height/2 - 125, 'Shoot the gates to lock them.', { fontSize: '22px', fill: '#000' , fontFamily: '"Noto Sans"'});
            var starttext3 = this.add.text(width/2- 175, height/2 - 100, 'Avoid the cows they let out!', { fontSize: '22px', fill: '#000' , fontFamily: '"Noto Sans"'});
            var starttext4 = this.add.text(width/2- 175, height/2 - 75, 'Press the left and right', { fontSize: '22px', fill: '#000' , fontFamily: '"Noto Sans"'});
            var starttext5 = this.add.text(width/2- 175, height/2 - 50, 'buttons to move in', { fontSize: '22px', fill: '#000' , fontFamily: '"Noto Sans"'});
            var starttext6 = this.add.text(width/2- 175, height/2 - 25, 'that direction', { fontSize: '22px', fill: '#000' , fontFamily: '"Noto Sans"'});
        }else
        {
            this.pauseBG = this.add.image(width/2, height/2, 'pauseBG');
            
        var starttext = this.add.text(width/2- 100, height/2 - 100, 'The farmer needs your help!', { fontSize: '12px', fill: '#000', fontFamily: '"Noto Sans"' });
        var starttext2 = this.add.text(width/2- 100, height/2 - 75, 'Shoot the gates to lock them.', { fontSize: '12px', fill: '#000' , fontFamily: '"Noto Sans"'});
        var starttext3 = this.add.text(width/2- 100, height/2 - 50, 'Avoid the cows they let out!', { fontSize: '12px', fill: '#000', fontFamily: '"Noto Sans"' });
        var starttext4 = this.add.text(width/2- 100, height/2 - 25, 'Press the left & right buttons', { fontSize: '12px', fill: '#000' , fontFamily: '"Noto Sans"'});
        var starttext5 = this.add.text(width/2- 100, height/2 , 'to move in that direction', { fontSize: '12px', fill: '#000', fontFamily: '"Noto Sans"' });
        var starttext6 = this.add.text(width/2- 175, height/2 - 25, '', { fontSize: '22px', fill: '#000', fontFamily: '"Noto Sans"' });
        }
 
        this.start = this.add.image(width/2, height/2 + 50, 'start');
        this.start.setInteractive();
        this.moveLeftButton.disableInteractive();
        this.moveRightButton.disableInteractive();
        this.shootButton.disableInteractive();
        this.pauseBut.disableInteractive();

    }
    else
    {
        this.enemies.setVelocityX(+15 * speed);
    }



    this.start.once('pointerdown', () => {
        this.moveLeftButton.setInteractive();
        this.moveRightButton.setInteractive();
        this.shootButton.setInteractive();
        this.pauseBut.setInteractive();
        start = 1;
        this.enemies.setVelocityX(+15 * speed);
        this.pauseBG.setVisible(false);
        this.start.setVisible(false);
        starttext.setText('');
        starttext2.setText('');
        starttext3.setText('');
        starttext4.setText('');
        starttext5.setText('');
        starttext6.setText('');
        start = 1;
        
    });


    }

   shootloop(){

        this.time.delayedCall(2000, () => {
            this.shootloop();
            if(paused == 0)
            {
                const list = this.enemies.getChildren()
                var r = Math.floor((Math.random() * list.length - 1) + 1);
                console.log(r);
                if(this.bottomRight !=  null && this.topLeft != null ){  
                    list[r].fireLasers()
                }
            }
        })

    }


    pause1(){
        if(width  > 1000 && height > 720)
        {
            this.pauseBG = this.add.image(width/2, height/2, 'largepauseBG');
        }else
        {
            this.pauseBG = this.add.image(width/2, height/2, 'pauseBG');
        }
        
        
        this.enemies.setVelocityX(0);
        this.resume = this.add.image(width/2, height/2 - 150,'resumeBut');
        this.resume.setInteractive();
        this.moveLeftButton.disableInteractive();
        this.moveRightButton.disableInteractive();
        this.shootButton.disableInteractive();

        this.home = this.add.image(width/2 , height/2 + 50, 'homeBut' );
        this.home.setInteractive();
        paused = 1;

        
        this.restart = this.add.image(width/2, height/2 - 50, 'restartBut');
        this.restart.setInteractive();

        this.help = this.add.image(width/2, height/2 + 150, 'help');
        this.help.setInteractive();

        this.help.on('pointerdown', ()=> {
            this.help1();
        });

        
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
            var starttext = this.add.text(width/2- 100, height/2 - 100, 'The objective of the game', { fontSize: '12px', fill: '#000', fontFamily: '"Noto Sans"' });
            var starttext2 = this.add.text(width/2- 100, height/2 - 75, 'is to shoot all the gates', { fontSize: '12px', fill: '#000' , fontFamily: '"Noto Sans"'});
            var starttext3 = this.add.text(width/2- 100, height/2 - 50, 'to close them. Use the left', { fontSize: '12px', fill: '#000', fontFamily: '"Noto Sans"' });
            var starttext4 = this.add.text(width/2- 100, height/2 - 25, 'and right arrows to move', { fontSize: '12px', fill: '#000', fontFamily: '"Noto Sans"' });
            var starttext5 = this.add.text(width/2- 100, height/2, 'and the middle shoot button', { fontSize: '12px', fill: '#000', fontFamily: '"Noto Sans"' });
            var starttext6 = this.add.text(width/2- 100, height/2 + 25, 'to shoot', { fontSize: '12px', fill: '#000' , fontFamily: '"Noto Sans"'});
        }else
        {
            var starttext = this.add.text(width/2- 100, height/2 - 100, 'The objective of the game', { fontSize: '12px', fill: '#000', fontFamily: '"Noto Sans"' });
            var starttext2 = this.add.text(width/2- 100, height/2 - 75, 'is to shoot all the gates', { fontSize: '12px', fill: '#000' , fontFamily: '"Noto Sans"'});
            var starttext3 = this.add.text(width/2- 100, height/2 - 50, 'to close them. Use the left', { fontSize: '12px', fill: '#000', fontFamily: '"Noto Sans"' });
            var starttext4 = this.add.text(width/2- 100, height/2 - 25, 'and right arrows to move', { fontSize: '12px', fill: '#000', fontFamily: '"Noto Sans"' });
            var starttext5 = this.add.text(width/2- 100, height/2, 'and the middle shoot button', { fontSize: '12px', fill: '#000', fontFamily: '"Noto Sans"' });
            var starttext6 = this.add.text(width/2- 100, height/2 + 25, 'to shoot', { fontSize: '12px', fill: '#000', fontFamily: '"Noto Sans"' });
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


    resume1(){//resume function for the pause menu
        this.resume.setVisible(false);
        this.pauseBG.setVisible(false);
        this.restart.setVisible(false);
        this.help.setVisible(false);
        this.moveLeftButton.setInteractive();
        this.moveRightButton.setInteractive();
        this.shootButton.setInteractive();
        paused = 0;
        
        this.home.destroy();
        if(dir == 2){
            this.enemies.setVelocityX(+15 * speed);

        }else
        {
            this.enemies.setVelocityX(-15 * speed);
        };

        this.pauseBut.once('pointerdown',()=>{
            this.pause1();

            this.resume.on('pointerdown', () => {
                this.resume1();
            });
        });
    }

    update() {//movement 
        if (this.isMovingLeft) {//left
            this.myTractor.moveLeft();
        }

        if (this.isMovingRight) {//right
            this.myTractor.moveRight();
        }

        if (this.isShooting) {//space to fire lazers
            this.myTractor.fireLasers();
            this.isShooting = false;

        }
        if(hitvar == 1){
            this.isShooting = false;
            this.isMovingLeft = false;
            this.isMovingRight = false;
            this.enemies.setVelocityX(0);
            this.enemies.setVelocityY(0);
            this.myTractor
            this.moveLeftButton.disableInteractive();
            this.moveRightButton.disableInteractive();
            this.shootButton.disableInteractive();       
            
            this.box = this.add.image(width/2, height/2 - 100,'box');
            var endGame = this.add.text(width/2 - 115, 200, 'Hit by a cow!', { fontSize: '32px', fill: '#000', fontFamily: '"Noto Sans"' });
            var endGame2 = this.add.text(width/2 - 115, 225, 'Lost a live', { fontSize: '32px', fill: '#000', fontFamily: '"Noto Sans"' });         
            if(lives >0)
            {
                setTimeout(() => {
                    this.scene.restart()
                    
                    endGame.setText('');
                    endGame2.setText('');
                    this.box.setVisible(false);
                }, 3000);
            }
            hitvar = 0;
            scorecount =0;
        }

        this.myTractor.update();

        const list = this.enemies.getChildren();
        //movement logic
        if(this.bottomRight !=  null && this.topLeft != null ){  
            if (this.bottomRight.body.velocity.x > 0 && this.bottomRight.body.x >= width - 25 ) {
                var arrCount=0;
                for(arrCount=0; arrCount < list.length; arrCount++){
                if(list[arrCount] != null){
                this.enemies.setVelocityX(-15 * speed);
                dir = 1; //direction being left
                this.enemies.setVelocityY(+30);
                timedevent = this.time.delayedCall(500, function() {this.enemies.setVelocityY(0)}, [], this);
                }
                }
            }
            else if(this.topLeft.body.velocity.x < 0 && this.topLeft.body.x <= -5){
                var arrCount=0;
                for(arrCount=0; arrCount < list.length; arrCount++){
                    if(list[arrCount] != null){
                    this.enemies.setVelocityX(+15 * speed);
                    dir = 2; //direction being right
                    this.enemies.setVelocityY(+30);
                    timedevent = this.time.delayedCall(500, function() {this.enemies.setVelocityY(0)}, [], this);
                    }
                }
            }
            if(this.bottomRight.body.y  >= height -275 && hit == 0){
                hit = 1;
                var endGame = this.add.text(100, 200, 'Lost a life', { fontSize: '32px', fill: '#000', fontFamily: '"Noto Sans"' });
                lives --;
                scorecount = 0;
                livesText.setText("Lives: " + lives);
                this.enemies.setVelocityX(0);
                paused = 1;
                if(lives > 0)
                {
                    setTimeout(() => {
                        hit =0;
                        paused =0;
                        this.scene.restart();
                        //stop movement
    
                    }, 300);
                }
                console.log(score + '1');
            }
            if(lives == 0){
                
                console.log(score + '2');
                var score1 = score;
                livesText.setText("Lives: " + lives);
                lives = -1;        
                if(width  > 1000 && height > 720)
                {
                    this.pauseBG = this.add.image(width/2, height/2, 'largepauseBG');

                    var endGame = this.add.text(width/2 - 125, height/2 - 200, 'Game over', { fontSize: '22px', fill: '#000', fontFamily: '"Noto Sans"' });
                    var endGame2 = this.add.text(width/2 - 125, height/2 -150, 'Press the button', { fontSize: '22px', fill: '#000', fontFamily: '"Noto Sans"' });
                    var endGame3 = this.add.text(width/2 - 125,height/2 -100, 'to retry', { fontSize: '22px', fill: '#000', fontFamily: '"Noto Sans"' });
                    var endGame4 = this.add.text(width/2 - 125,height/2 -50, 'Your score was '+ score, { fontSize: '22px', fill: '#000', fontFamily: '"Noto Sans"' });
                }else
                {
                    this.pauseBG = this.add.image(width/2, height/2, 'pauseBG');

                    var endGame = this.add.text(width/2 - 105, height/2 - 150, 'Game over', { fontSize: '17px', fill: '#000', fontFamily: '"Noto Sans"' });
                    var endGame2 = this.add.text(width/2 - 105, height/2 -125, 'Press the button', { fontSize: '17px', fill: '#000' , fontFamily: '"Noto Sans"'});
                    var endGame3 = this.add.text(width/2 - 105,height/2 -100, 'to retry', { fontSize: '17px', fill: '#000' , fontFamily: '"Noto Sans"'});
                    var endGame4 = this.add.text(width/2 - 105,height/2 -75, 'Your score was '+ score, { fontSize: '17px', fill: '#000', fontFamily: '"Noto Sans"' });
                }
                


                this.submitscore = this.add.image(width/2, height/2 + 50, 'submitBut');
                
                this.submitscore.setInteractive();
                this.submitscore.on('pointerdown', () => {
                    
                console.log(score1 + '3');
                    endGame.setText('');
                    endGame2.setText('');
                    endGame3.setText('');
                    endGame4.setText('');

                    //firebase shite here

                    const elem = document.getElementById('text');//text box shite
                    elem.style.display = 'visible';
                    this.add.dom(width/2, height/2, elem);
                    this.resume.setVisible(false);
                    this.submitscore.setVisible(false);

                    const myVar = document.getElementById('name-input');
                    if(width  > 1000 && height > 720)
                    {
                        var starttext = this.add.text(width/2- 100, height/2 - 100, 'Enter your first name', { fontSize: '12px', fill: '#000', fontFamily: '"Noto Sans"' });
                        var starttext2 = this.add.text(width/2- 100, height/2 - 75, 'and your score will', { fontSize: '12px', fill: '#000', fontFamily: '"Noto Sans"' });
                        var starttext3 = this.add.text(width/2- 100, height/2 - 50, 'be submitted to', { fontSize: '12px', fill: '#000' , fontFamily: '"Noto Sans"'});
                        var starttext4 = this.add.text(width/2- 100, height/2 - 25, 'the leaderboards', { fontSize: '12px', fill: '#000' , fontFamily: '"Noto Sans"'});
                    }else
                    {
                        var starttext = this.add.text(width/2- 100, height/2 - 100, 'Enter your first name', { fontSize: '12px', fill: '#000', fontFamily: '"Noto Sans"' });
                        var starttext2 = this.add.text(width/2- 100, height/2 - 75, 'and your score will', { fontSize: '12px', fill: '#000', fontFamily: '"Noto Sans"' });
                        var starttext3 = this.add.text(width/2- 100, height/2 - 50, 'be submitted to', { fontSize: '12px', fill: '#000', fontFamily: '"Noto Sans"' });
                        var starttext4 = this.add.text(width/2- 100, height/2 - 25, 'the leaderboards', { fontSize: '12px', fill: '#000', fontFamily: '"Noto Sans"' });
                    }
                    this.submit = this.add.image(width/2, height/2 + 100, 'submitBut');
                    this.submit.setInteractive();
                    this.submit.once('pointerdown', () => {
                        console.log(myVar);
                        // will do firebase and kick back to main menu
                        const db = firebase.firestore()
                        db.collection('Leaderboards').doc('LockThatGate').collection('scores').add({ score: score1, name: myVar.value})
                        setTimeout(() => {
                            location.href = "/home"
                        }, 2000);
                    });    
                });

                this.resume = this.add.image(width/2, height/2 + 125, 'restartBut');
                
                this.resume.setInteractive();
                this.resume.on('pointerdown', () => {
                    this.scene.restart();
                    hit = 0;
                    
                });


                score = 0;
                round = 1;
                speed = 1;
                lives = 3;//PUT A MESSAGE ABOUT THIS HERE FINAL ROUND AND SCORE SHOULD BE PRINTED HERE
                scorecount =0;
                //var endGame = this.add.text(1500, 2000, 'Game over', { fontSize: '32px', fill: '#000' });
                //setText you fool

            }
        }

        if(scorecount == 24){
            this.box = this.add.image(width/2, height/2 - 100,'box');
            var endGame = this.add.text(width/2 - 100, 200, 'Level won!', { fontSize: '32px', fill: '#000' });
            scorecount =0;
            //pausing game
            round++;

            if(width  > 1000 && height > 720)
            {
                speed++;//CHANGE THIS TO GET SLOWER AS ROUNDS GO UP FOR BALANCE
            }else
            {
                speed = speed +.2;
            }
        
            
            roundover = 1;
            //OR MAYBE FASTER WHO KNOWS
            this.moveLeftButton.disableInteractive();
            this.moveRightButton.disableInteractive();
            this.shootButton.disableInteractive();
            this.isShooting = false;
            this.isMovingLeft = false;
            this.isMovingRight = false;
            setTimeout(() => {
                this.box.setVisible(false);
                this.scene.restart();
                roundover =0;
            }, 3000);
            
        }
    }


}
