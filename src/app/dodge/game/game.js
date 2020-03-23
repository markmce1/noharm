var width = window.innerWidth;
var height =window.innerHeight;
var timeSurvived;
var elaspedTime;
var time = 0;
var start = 1;
var paused = 0;
var hitvar =0;
var i;


class tractor extends Phaser.GameObjects.Sprite  {

    constructor(scene, x , y) {
        super(scene, x, y);
        this.setTexture('left');
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

///////////////////////////////////////////////

class EnemyLaser extends Phaser.GameObjects.Sprite {

    constructor(scene, x, y) {
        super(scene, x, y);
        i = Math.floor((Math.random() * 4) + 1);
        console.log(i);

        if(i == 1)
        {
            this.setTexture('bull');
        }
        if(i == 2)
        {
            this.setTexture('electric');
        }
        if(i == 3)
        {
            this.setTexture('death');
        }
        if(i==4)
        {
            this.setTexture('danger');
        }
        
        this.setPosition(x, y);
        this.speed = -2.5;
        this.scene = scene;
        scene.physics.world.enable(this);
        scene.physics.add.collider(this, scene.myTractor, this.handleHit, null, this);//Adds Collision
    }
    handleHit(laserSprite) {//What happens when a cow and the player sprite hit each other
        laserSprite.destroy(true);//Key disappears
        //add in some "lost a life" dialogue here
        paused = 1;
        hitvar = 1;   

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
        this.setTexture('enemy1');//sets texture. Change name later
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



/////////////////////////////////////////////////////////////////////

export default class Scene1 extends Phaser.Scene {
    
    preload() {


        
        this.load.audio('shoot', 'assets/space/sounds/shoot.wav');


        this.load.image('resumeBut', 'assets/gui/resume.png');
        this.load.image('restartBut', 'assets/gui/restart.png');
        this.load.image('homeBut', 'assets/gui/homeBut.png');
        this.load.image('pauseBG','assets/gui/pauseBG.png' );
        this.load.image('largepauseBG','assets/gui/largepauseBG.png' );
        this.load.image('bg','assets/dodge/images/bg.png');
        this.load.image('bull','assets/dodge/images/bull.png');

        
        this.load.image('electric','assets/dodge/images/electric.png');
        
        this.load.image('danger','assets/dodge/images/danger.png');
        
        this.load.image('death','assets/dodge/images/death.png');


        this.load.image('rightBut', 'assets/space/rightBut.png');
        this.load.image('leftBut', 'assets/space/leftBut.png');
        
        this.load.image('pause','assets/space/pause.png');
        
        this.load.image('bg1', 'assets/space/bg3.png');
        this.load.image('left','assets/dodge/images/tractorleft.png');
        this.load.image('right','assets/dodge/images/tractorright.png');

    }


    create(){

        this.enemies2 = new Array();
        
        this.enemies = this.physics.add.group();
        let k = 0;
        let arrCount =0;
        let yloop = 0;
        let y =   50;
        let w = width / 6;
        let x = w / 2;//was 100
        //creating enemies
        for(yloop =0; yloop < 6; yloop++)//To put them across on the screen
        {

            this.enemy = new Enemy1(this, x, y);//Calls enemy1 function
            this.add.existing(this.enemy);
            this.enemies.add(this.enemy);
            this.enemies2.push(this.enemy);
            arrCount++;
            y = y + 50;
            x = x + w;
            y = 50;
        }

        this.bg = this.add.image(width/2, height/2, 'bg');
        this.add.image(width/2,45,'bg1');

        this.myTractor = new tractor(this, width/2,height - 100);
  
        timeSurvived = this.add.text(16, 16, 'Time: ' + time, { fontSize: '32px', fill: '#000' });

        this.add.existing(this.myTractor);

        this.pauseBut = this.add.image(width/2+  width / 6,25, 'pause');
 
        this.pauseBut.setInteractive();
    
        this.pauseBut.once('pointerdown',()=>{
                this.pause1();
                //add help option
                this.resume.on('pointerdown', () => {
                    this.resume1();
                });
        });

        ////////buttons galore here. Left Right //////////////////////////////////////////////////////////////////////
        this.moveLeftButton = this.add.image( width/8, height - 50, 'leftBut');

        this.moveLeftButton.on('pointerdown', () => {
        this.isMovingLeft = true;
        });

        this.moveLeftButton.on('pointerup', () => {
         this.isMovingLeft = false;
         this.isMovingRight = false;
        });

        this.moveRightButton = this.add.image(width/8 * 7, height - 50, 'rightBut');

        this.moveRightButton.on('pointerdown', () => {
        this.isMovingRight = true;
        });

        this.moveRightButton.on('pointerup', () => {
         this.isMovingLeft = false;
         this.isMovingRight = false;
        });
        this.moveLeftButton.setDepth(1);
        this.moveRightButton.setDepth(1);

        this.moveLeftButton.setInteractive();
        this.moveRightButton.setInteractive();

        if(start == 1){
            this.shootloop();
            this.timeloop();
        }



    }

    timeloop(){
        this.elapsedTime = 0;
        this.timeThing = this.time.addEvent({
          delay: 1000,
          loop: true,
          callback: () => {
            this.elapsedTime++
            timeSurvived.setText('Time: ' + this.elapsedTime)
          }
        })

    }

    shootloop(){

        this.time.delayedCall(2000, () => {
            this.shootloop();
            if(paused == 0)
            {
                const list = this.enemies.getChildren()
                var r = Math.floor((Math.random() * list.length - 1) + 1);
                console.log(r);
                list[r].fireLasers()

            }
        });

    }  

    pause1(){
        paused = 1;
        this.timeThing.paused = true;
        if(width  > 1000 && height > 720)
        {
            this.pauseBG = this.add.image(width/2, height/2, 'largepauseBG');
        }else
        {
            this.pauseBG = this.add.image(width/2, height/2, 'pauseBG');
        }
        
        this.resume = this.add.image(width/2, height/2 - 100,'resumeBut');
        this.resume.setInteractive();
        this.moveLeftButton.disableInteractive();
        this.moveRightButton.disableInteractive();

        this.home = this.add.image(width/2 , height/2 + 100, 'homeBut' );
        this.home.setInteractive();
      
        this.restart = this.add.image(width/2, height/2, 'restartBut');
        this.restart.setInteractive();

        this.restart.on('pointerdown', ()=> {
            this.scene.restart();
            time =0;
            paused = 0;
        });
        
        this.home.on('pointerdown', ()=> {
            location.href = "/home"
        });

    }


    resume1(){//resume function for the pause menu
        paused = 0;
        this.resume.setVisible(false);
        this.pauseBG.setVisible(false);
        this.restart.setVisible(false);
        this.moveLeftButton.setInteractive();
        this.moveRightButton.setInteractive();
        
        this.timeThing.paused = false
        
        this.home.destroy();
        this.pauseBut.once('pointerdown',()=>{
            this.pause1();

            this.resume.on('pointerdown', () => {
                this.resume1();
            });
        });
    }

    update(){

        if (this.isMovingLeft) {//left
            this.myTractor.moveLeft();
            this.myTractor.setTexture('left');
        }

        if (this.isMovingRight) {//right
            this.myTractor.moveRight();
            
            this.myTractor.setTexture('right');
        }

        if(hitvar == 1)
        {
            hitvar =0;

            
            this.timeThing.paused = true;
            if(width  > 1000 && height > 720)
            {
                this.pauseBG = this.add.image(width/2, height/2, 'largepauseBG');
            }else
            {
                this.pauseBG = this.add.image(width/2, height/2, 'pauseBG');
            }

            if(i == 1)
            {
                //bull
                if(width  > 1000 && height > 720)
                {
                    this.pauseBG = this.add.image(width/2, height/2, 'largepauseBG');
                    var starttext = this.add.text(width/2- 175, height/2 - 150, 'You got hit by a bull sign', { fontSize: '22px', fill: '#000' });
                    var starttext2 = this.add.text(width/2- 175, height/2 - 125, 'This sign means theres a bull', { fontSize: '22px', fill: '#000' });
                    var starttext3 = this.add.text(width/2- 175, height/2 - 100, 'nearby if you see this sign', { fontSize: '22px', fill: '#000' });
                }else
                {
                    this.pauseBG = this.add.image(width/2, height/2, 'pauseBG');
                    var starttext = this.add.text(width/2- 100, height/2 - 100, 'You got hit by a bull sign', { fontSize: '12px', fill: '#000' });
                    var starttext2 = this.add.text(width/2- 100, height/2 - 75, 'This sign means theres a bull', { fontSize: '12px', fill: '#000' });
                    var starttext3 = this.add.text(width/2- 100, height/2 - 50, 'nearby if you see this sign', { fontSize: '12px', fill: '#000' });
                }
            }
            if(i == 2)
            {
                //electric
                if(width  > 1000 && height > 720)
                {
                    this.pauseBG = this.add.image(width/2, height/2, 'largepauseBG');
                    var starttext = this.add.text(width/2- 175, height/2 - 150, 'You got hit by the electrical', { fontSize: '22px', fill: '#000' });
                    var starttext2 = this.add.text(width/2- 175, height/2 - 125, 'Danger sign. This sign means', { fontSize: '22px', fill: '#000' });
                    var starttext3 = this.add.text(width/2- 175, height/2 - 100, 'there is an electric fence up.', { fontSize: '22px', fill: '#000' });
                    var starttext4 = this.add.text(width/2- 175, height/2 - 75, 'Do not touch the fence.', { fontSize: '12px', fill: '#000' });
                }else
                {
                    this.pauseBG = this.add.image(width/2, height/2, 'pauseBG');
                    var starttext = this.add.text(width/2- 100, height/2 - 100, 'You got hit by the electrical', { fontSize: '12px', fill: '#000' });
                    var starttext2 = this.add.text(width/2- 100, height/2 - 75, 'Danger sign. This sign means', { fontSize: '12px', fill: '#000' });
                    var starttext3 = this.add.text(width/2- 100, height/2 - 50, 'there is an electric fence up.', { fontSize: '12px', fill: '#000' });
                    var starttext4 = this.add.text(width/2- 100, height/2 - 25, 'Do not touch the fence.', { fontSize: '12px', fill: '#000' });
                }
            
            }
            if(i == 3)
            {
                //death 
                if(width  > 1000 && height > 720)
                {
                    this.pauseBG = this.add.image(width/2, height/2, 'largepauseBG');
                    var starttext = this.add.text(width/2- 175, height/2 - 150, 'This is a poisonous sign', { fontSize: '22px', fill: '#000' });
                    var starttext2 = this.add.text(width/2- 175, height/2 - 125, 'This is usually near chemical', { fontSize: '22px', fill: '#000' });
                    var starttext3 = this.add.text(width/2- 175, height/2 - 100, 'stores. Do not touch anything', { fontSize: '22px', fill: '#000' });
                    var starttext4 = this.add.text(width/2- 175, height/2 - 25, 'in that store.', { fontSize: '12px', fill: '#000' });
                }else
                {
                    this.pauseBG = this.add.image(width/2, height/2, 'pauseBG');
                    var starttext = this.add.text(width/2- 100, height/2 - 100, 'This is a poisonous sign', { fontSize: '12px', fill: '#000' });
                    var starttext2 = this.add.text(width/2- 100, height/2 - 75, 'This is usually near chemical', { fontSize: '12px', fill: '#000' });
                    var starttext3 = this.add.text(width/2- 100, height/2 - 50, 'stores. Do not touch anything', { fontSize: '12px', fill: '#000' });
                    var starttext4 = this.add.text(width/2- 100, height/2 - 25, 'in that store.', { fontSize: '12px', fill: '#000' });
                }
            }
            if(i == 4)
            {
                //danger
                if(width  > 1000 && height > 720)
                {
                    this.pauseBG = this.add.image(width/2, height/2, 'largepauseBG');
                    var starttext = this.add.text(width/2- 175, height/2 - 150, 'This is a general danger', { fontSize: '22px', fill: '#000' });
                    var starttext2 = this.add.text(width/2- 175, height/2 - 125, 'sign. Watch out for any', { fontSize: '22px', fill: '#000' });
                    var starttext3 = this.add.text(width/2- 175, height/2 - 100, 'dangers!', { fontSize: '22px', fill: '#000' });
                }else
                {
                    this.pauseBG = this.add.image(width/2, height/2, 'pauseBG');
                    var starttext = this.add.text(width/2- 100, height/2 - 100, 'This is a general danger', { fontSize: '12px', fill: '#000' });
                    var starttext2 = this.add.text(width/2- 100, height/2 - 75, 'sign. Watch out for any', { fontSize: '12px', fill: '#000' });
                    var starttext3 = this.add.text(width/2- 100, height/2 - 50, 'dangers!', { fontSize: '12px', fill: '#000' });
                }
            }


    
            this.restart = this.add.image(width/2, height/2 + 100, 'restartBut');
            this.restart.setInteractive();

            this.isMovingLeft = false;
            this.isMovingRight = false;
        
            this.moveLeftButton.disableInteractive();
            this.moveRightButton.disableInteractive();
    
            this.restart.on('pointerdown', ()=> {
                this.scene.restart();
                time =0;
                paused = 0;
                
                this.moveLeftButton.setInteractive();
                this.moveRightButton.setInteractive();

            });
        }

    }
}