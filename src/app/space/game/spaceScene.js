//need screen width and height in here too
var score= 0;
var scoreText;
var width = 350;
var height = 600;


//================================================================================

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

//================================================================================

class ShipLaser extends Phaser.GameObjects.Sprite {

    constructor(scene, x, y) {
        super(scene, x, y);
        this.setTexture('laser');
        this.setPosition(x, y);
        this.speed = 10;
        this.scene = scene;
        scene.physics.world.enable(this);
        scene.physics.add.collider(this, scene.enemies, this.handleHit, null, this);//Adds Collision
    }

    handleHit(laserSprite, enemySprite) {//What happens when a Key and Enemy sprite hit each other
        enemySprite.destroy(true);//Enemy disappears
        laserSprite.destroy(true);//Key disappears
        score = score+1;//Add 1 to score
        scoreText.setText('Score: ' + score);// Set the text to score
    }

    preUpdate(time, delta) {
        if(this.active == false){return;}
        super.preUpdate(time, delta);
        this.y -= this.speed;
    }
}

//================================================================================

class Enemy1 extends Phaser.GameObjects.Sprite {
    constructor(scene, x, y) {//accessed by function in scene1 to create enemies
        super(scene, x, y);
        this.setTexture('enemy1');//sets texture. Change name later
        this.setPosition(x,y);//sets enemy position
        scene.physics.world.enable(this);//Makes them apply to the set physics

        this.gameObject = this;
        this.deltaX = 3;//used in movement calculation
        this.deltaY = 3;
    }

    update() {//Updates every frame ( I assume ). generates random numer, then checks where the move left or right
        let k = Math.random() * 4;
        k = Math.round(k);

        if (k == 0) {
            //this.moveDown();//down
        }
        else if (k == 2) {
            this.moveLeft();//left
        }
        else if (k == 3) {
            this.moveRight();//right
        }
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
    moveDown() {
        if (this.y < height) {
            this.y += this.deltay;
        }
    }
}

//================================================================================

export default class Scene1 extends Phaser.Scene {

    constructor(config) {
        super(config);
    }

    preload() {
        
        this.load.image('tractor', 'assets/space/tractor.png');
        this.load.image('laser', 'assets/space/key.png');
        this.load.image('enemy1', 'assets/space/gate.png');
        this.load.image('grass', 'assets/space/grass.png');
        this.load.image('rightBut', 'assets/space/rightBut.png');
        this.load.image('leftBut', 'assets/space/leftBut.png');
        this.load.image('upBut', 'assets/space/upBut.png'); //CHANGE SPRITE
    }

    create() {
        
        this.add.image(300, 300, 'grass');
        this.cursors = this.input.keyboard.createCursorKeys();
        this.myTractor = new tractor(this, 200, 475);
        this.add.existing(this.myTractor);
        this.enemies = this.physics.add.group();
        this.enemies2 = new Array();


        let k = 0;
        let yloop = 0;
        let x =   25;
        let y =   70;
        for(yloop =0; yloop < 4; yloop++)//To put them lower on the screen
        {
            for (k = 0; k < 6; k++) {//for loop to make enemies. This loop also sets amount of en

                this.enemy = new Enemy1(this, x, y);//Calls enemy1 function
                this.add.existing(this.enemy);
                this.enemies.add(this.enemy);
                this.enemies2.push(this.enemy);
                x = x + 75;
            }
        y = y + 50;
        x = 25;
    }

    ////////buttons galore here. Left Right and fire. Change fire sprite!!!!!!!!!!!!!!
    this.moveLeftButton = this.add.image(100, 575, 'leftBut');
    this.moveLeftButton.setInteractive();

    this.moveLeftButton.on('pointerdown', () => {
    this.isMovingLeft = true;
    });

    this.moveLeftButton.on('pointerup', () => {
     this.isMovingLeft = false;
     this.isMovingRight = false;
    });

    this.moveRightButton = this.add.image(300, 575, 'rightBut');
    this.moveRightButton.setInteractive();

    this.moveRightButton.on('pointerdown', () => {
    this.isMovingRight = true;
    });

    this.moveRightButton.on('pointerup', () => {
     this.isMovingLeft = false;
     this.isMovingRight = false;
    });

    this.shootButton = this.add.image(200, 575, 'upBut');// CHANGE SPRITE
    this.shootButton.setInteractive();

    this.shootButton.on('pointerdown', () => {
    this.isShooting= true;
    });

    this.shootButton.on('pointerup', () => {
     this.isShooting = false;
    });
        scoreText = this.add.text(16, 16, 'score: 0', { fontSize: '32px', fill: '#000' });

    }

    update() {//movement, should be changed to buttons 
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

        let j = 0;
        for (j = 0; j < this.enemies2.length; j++) {
            let enemy = this.enemies2[j];
            enemy.update();
        }
    }
}

