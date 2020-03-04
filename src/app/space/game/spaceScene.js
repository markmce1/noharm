//need screen width and height in here too
var score= 0;
var scoreText;
var roundText; //just stuff for set Texts
var endGame;
var dir=1;
var width = 375;
var timedevent;
var height =650;
var scorecount = 0;
var round = 1;
var speed = 1;
var lives =3 ;


///////////////////////////////////////////////////////

class tractor extends Phaser.GameObjects.Sprite  {

    constructor(scene, x , y) {
        super(scene, x, y);
        this.setTexture('tractor');
        this.setPosition(x, y);

        this.scene = scene;
        this.deltaX = 5;
        this.deltaY = 5;
        this.lasers = new Array();
        this.lastShot = new Date().getTime();
        this.shotFrequency = 250;
    }

    moveLeft() {
        if (this.x > 0) {
            this.x -= this.deltaX;
        }
    }

    moveRight() {
        if (this.x < width) {
            this.x += this.deltaX;
        }
    }

    moveUp() {
        if (this.y > 0) {
            this.y -= this.deltaY;
        }
    }

    moveDown() {

        if (this.y < height) {
            this.y += this.deltaY;
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

    preUpdate(time, delta) {
        if(this.active == false){return;}
        super.preUpdate(time, delta);
        this.y -= this.speed;
    }
}

///////////////////////////////////////////////

class Enemy1 extends Phaser.GameObjects.Sprite {
    constructor(scene, x, y) {//accessed by function in scene1 to create enemies
        super(scene, x, y);
        this.setTexture('enemy1');//sets texture. Change name later
        this.setPosition(x,y);//sets enemy position
        scene.physics.world.enable(this);//Makes them apply to the set physics
        this.gameObject = this;
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
        this.load.image('resumeBut', 'assets/space/resume.png');
        this.load.image('homeBut', 'assets/space/homeBut.png');
        this.load.image('key', 'assets/space/key.png');
        this.load.image('enemy1', 'assets/space/gate2sh.png');
        this.load.image('grass', 'assets/space/grass2.png');
        this.load.image('rightBut', 'assets/space/rightBut.png');
        this.load.image('leftBut', 'assets/space/leftBut.png');
        this.load.image('shoot', 'assets/space/shoot.png'); 
        this.load.image('pause','assets/space/pause.png');
        this.load.image('bg', 'assets/space/bg.png');
    }

    create() {
        
        this.add.image(200, 300, 'grass');
        this.add.image(200,45,'bg');
        this.myTractor = new tractor(this, 200, 475);
        this.add.existing(this.myTractor);
        this.enemies = this.physics.add.group();
        this.enemies2 = new Array();


        let k = 0;
        let arrCount =0;
        let yloop = 0;
        let x =   100;
        let y =   120;
        
        for(yloop =0; yloop < 6; yloop++)//To put them lower on the screen
        {
            for (k = 0; k < 4; k++) {//for loop to make enemies. This loop also sets amount of en
                
                
                this.enemy = new Enemy1(this, x, y);//Calls enemy1 function
                this.add.existing(this.enemy);
                this.enemies.add(this.enemy);
                this.enemies2.push(this.enemy);
                this.enemies2[arrCount].body.setVelocityX(-15 * speed);
                arrCount++;
                y = y + 50;
            }
        x = x + 50;
        y = 120;
    }
    this.topLeft = this.enemies2[0];
    this.bottomRight = this.enemies2[23];
    //////////////////////////////pausing here//////////////////////////////////////////////////////////////////////////
    this.pauseBut = this.add.image(300,25, 'pause');
    this.pauseBut.setInteractive();

    this.pauseBut.on('pointerdown',()=>{
        //this.scene.sound.play('click');
        this.enemies.setVelocityX(0);
        this.resume = this.add.image(200, 300, 'resumeBut');
        this.resume.setInteractive();
        this.moveLeftButton.disableInteractive();
        this.moveRightButton.disableInteractive();
        this.shootButton.disableInteractive();

        this.home = this.add.image(200,400, 'homeBut' );
        this.home.setInteractive();

        this.home.on('pointerdown', ()=> {
            location.href = "/home"
        });

        this.resume.on('pointerdown', () => {
            this.resume.destroy();
            this.moveLeftButton.setInteractive();
            this.moveRightButton.setInteractive();
            this.shootButton.setInteractive();
            
            this.home.destroy();
            if(dir == 2){
                this.enemies.setVelocityX(+15 * speed);

            }else
            {
                this.enemies.setVelocityX(-15 * speed);
            };


        });
        
    });
    ////////buttons galore here. Left Right and fire. //////////////////////////////////////////////////////////////////////
    this.moveLeftButton = this.add.image(100, 575, 'leftBut');
    this.moveLeftButton.setInteractive();

    this.moveLeftButton.on('pointerdown', () => {
    this.isMovingLeft = true;
    });

    this.moveLeftButton.on('pointerup', () => {
     this.isMovingLeft = false;
     this.isMovingRight = false;
    });

    this.moveRightButton = this.add.image(200, 575, 'rightBut');
    this.moveRightButton.setInteractive();

    this.moveRightButton.on('pointerdown', () => {
    this.isMovingRight = true;
    });

    this.moveRightButton.on('pointerup', () => {
     this.isMovingLeft = false;
     this.isMovingRight = false;
    });

    this.shootButton = this.add.image(300, 575, 'shoot');
    this.shootButton.setInteractive();

    this.shootButton.on('pointerdown', () => {
    this.isShooting= true;
    });

    this.shootButton.on('pointerup', () => {
     this.isShooting = false;
    });

    
    scoreText = this.add.text(16, 16, 'Score: ' + score, { fontSize: '32px', fill: '#000' });
    roundText = this.add.text(16 ,48 ,'Round: ' + round + ' Lives: ' + lives, { fontSize: '32px', fill: '#000' });

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
        }


        this.myTractor.update();

        const list = this.enemies.getChildren();
        //movement logic
        if(this.bottomRight !=  null && this.topLeft != null ){  
            if (this.bottomRight.body.velocity.x > 0 && this.bottomRight.body.x >= 360 ) {
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
            if(this.bottomRight.body.y  >= 375){
                var endGame = this.add.text(100, 200, 'Lost a life', { fontSize: '32px', fill: '#000' });
                this.scene.stop();
                lives --;
                scorecount = 0;
                this.scene.restart();
                timedevent = this.time.delayedCall(3000, function() {this.scene.restart()}, [], this);
            }
            if(lives == 0){
                var endGame = this.add.text(125, 200, 'Game over', { fontSize: '32px', fill: '#000' });
                var endGame2 = this.add.text(50, 250, 'Press the button', { fontSize: '32px', fill: '#000' });
                var endGame3 = this.add.text(125,300, 'to retry', { fontSize: '32px', fill: '#000' });
                this.resume = this.add.image(200, 350, 'resumeBut');
                this.resume.setInteractive();
                this.resume.on('pointerdown', () => {
                    this.scene.restart();
                    
                });
                score = 0;
                round = 1;
                lives = 3;
                scorecount =0;
                endGame.destroy();
                //var endGame = this.add.text(1500, 2000, 'Game over', { fontSize: '32px', fill: '#000' });
                //setText you fool

            }
            if(this.topLeft.body.y >= 350)
            {
                console.log('This also works');
            }
        }

        if(scorecount == 24){
            var endGame = this.add.text(150, 200, 'Level won!', { fontSize: '32px', fill: '#000' });
            scorecount =0;
            //pausing game
            round++;
            speed++;
            timedevent= this.time.delayedCall(3000,function(){this.scene.restart()}, [],this);
        }
    }


}
