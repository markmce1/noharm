import * as Phaser from 'phaser';

var BootScene = new Phaser.Class({
 
    Extends: Phaser.Scene,
 
    initialize:
 
    function BootScene ()
    {
        Phaser.Scene.call(this, { key: 'BootScene' });
    },
 
    preload()
    {
      // map tiles
      this.load.image('tiles', 'assets/map/spritesheet.png');
      this.load.image('tiles2', 'assets/map/rpgmaker.png');
      this.load.image('tractor1', 'assets/map/tractor.png');
        
      // map in json format
      this.load.tilemapTiledJSON('map', 'assets/map/farm.json');
      
      // our two characters
      this.load.spritesheet('player', 'assets/RPG_assets.png', { frameWidth: 16, frameHeight: 16 });
      this.load.spritesheet('farmer', 'assets/RPG_assets.png', { frameWidth: 16, frameHeight: 16 });   

      this.load.image('rightBut', 'assets/space/rightBut.png');
      this.load.image('leftBut', 'assets/space/leftBut.png');
      this.load.image('upBut', 'assets/space/upBut.png');
      this.load.image('downBut', 'assets/space/downBut.png');
    },
 
    create ()
    {
        this.scene.start('WorldScene');
    }
});
 
var WorldScene = new Phaser.Class({
 
    Extends: Phaser.Scene,
 
    initialize:
 
    function WorldScene ()
    {
        Phaser.Scene.call(this, { key: 'WorldScene' });
    },
    preload ()
    {
        
    },
    create ()
    {
     
        // create your world here
        var map = this.make.tilemap({ key: 'map' });

        var tiles = map.addTilesetImage('spritesheet', 'tiles');
        var tiles2 = map.addTilesetImage('rpgmaker', 'tiles2');
        var tractor1 = map.addTilesetImage('tractor', 'tractor1');
        
        var grass = map.createStaticLayer('grass', tiles, 0, 0);
        var obstacles = map.createStaticLayer('objects', tiles, 0, 0);
        obstacles.setCollisionByExclusion([-1]);
        var house = map.createStaticLayer('house', tiles2, 0, 0);
        house.setCollisionByExclusion([-1]);
        var housefloor = map.createStaticLayer('housefloor', tiles2, 0, 0);
        var tractorOb = map.createStaticLayer('tractor', tractor1, 0, 0);
        tractorOb.setCollisionByExclusion([-1]);

        //for collision and shit

        this.farmer1 =  this.physics.add.image(500,100, 'farmer');






        this.player = this.physics.add.sprite(200, 200, 'player', 6);

        this.physics.world.bounds.width = map.widthInPixels;
        this.physics.world.bounds.height = map.heightInPixels;
        this.player.setCollideWorldBounds(true);

        this.cursors = this.input.keyboard.createCursorKeys();

        this.cameras.main.setBounds(0, 0, map.widthInPixels, map.heightInPixels);
        this.cameras.main.startFollow(this.player);
        this.cameras.main.roundPixels = true;

        this.physics.add.collider(this.player, obstacles);
        this.physics.add.collider(this.player, house);
        this.physics.add.overlap(this.player, this.farmer1, this.dialogue, false, this);


        //animations

                //  animation with key 'left', we don't need left and right as we will use one and flip the sprite
                this.anims.create({
                    key: 'left',
                    frames: this.anims.generateFrameNumbers('player', { frames: [1, 7, 1, 13]}),
                    frameRate: 10,
                    repeat: -1
                });
                
                // animation with key 'right'
                this.anims.create({
                    key: 'right',
                    frames: this.anims.generateFrameNumbers('player', { frames: [1, 7, 1, 13] }),
                    frameRate: 10,
                    repeat: -1
                });
                this.anims.create({
                    key: 'up',
                    frames: this.anims.generateFrameNumbers('player', { frames: [2, 8, 2, 14]}),
                    frameRate: 10,
                    repeat: -1
                });
                this.anims.create({
                    key: 'down',
                    frames: this.anims.generateFrameNumbers('player', { frames: [ 0, 6, 0, 12 ] }),
                    frameRate: 10,
                    repeat: -1
                });


        

        ///my movement keys
        //left
        this.moveLeftButton = this.add.image(50, 95, 'leftBut').setScrollFactor(0);
        this.moveLeftButton.setInteractive();

        this.moveLeftButton.on('pointerdown', () => {
        this.isMovingLeft = true;
        });
    
        this.moveLeftButton.on('pointerup', () => {
            this.isMovingLeft = false;
            this.isMovingUp = false;
            this.isMovingDown = false;
            this.isMovingRight = false;
        });

        //right
        this.moveRightButton = this.add.image(100, 95, 'rightBut').setScrollFactor(0);
        this.moveRightButton.setInteractive();
    
        this.moveRightButton.on('pointerdown', () => {
        this.isMovingRight = true;
        });
    
        this.moveRightButton.on('pointerup', () => {
            this.isMovingLeft = false;
            this.isMovingUp = false;
            this.isMovingDown = false;
            this.isMovingRight = false;
        });

        //up
        this.moveUpButton = this.add.image(75, 65, 'upBut').setScrollFactor(0);
        this.moveUpButton.setInteractive();
    
        this.moveUpButton.on('pointerdown', () => {
        this.isMovingUp = true;
        });
    
        this.moveUpButton.on('pointerup', () => {
            this.isMovingLeft = false;
            this.isMovingUp = false;
            this.isMovingDown = false;
            this.isMovingRight = false;
        });
        //down
        this.moveDownButton = this.add.image(75, 120, 'downBut').setScrollFactor(0);
        this.moveDownButton.setInteractive();
    
        this.moveDownButton.on('pointerdown', () => {
        this.isMovingDown = true;
        });
    
        this.moveDownButton.on('pointerup', () => {
            this.isMovingLeft = false;
            this.isMovingUp = false;
            this.isMovingDown = false;
            this.isMovingRight = false;
        });


    },

    update (time, delta){
	this.player.body.setVelocity(0);

        // Horizontal movement
        if (this.cursors.left.isDown)
        {
            this.player.body.setVelocityX(-80);
        }
        else if (this.cursors.right.isDown)
        {
            this.player.body.setVelocityX(80);
        }

        // Vertical movement
        if (this.cursors.up.isDown)
        {
            this.player.body.setVelocityY(-80);
        }
        else if (this.cursors.down.isDown)
        {
            this.player.body.setVelocityY(80);
        }    
        //button movement
        if(this.isMovingLeft)
        {
            this.player.body.setVelocityX(-80);
        }
        if(this.isMovingRight)
        {
            this.player.body.setVelocityX(+80);
        }
        if(this.isMovingDown)
        {
            this.player.body.setVelocityY(+80);
        }
        if(this.isMovingUp)
        {
            this.player.body.setVelocityY(-80);
        }

        if (this.isMovingLeft)
        {
            this.player.anims.play('left', true);
        }
        else if (this.isMovingRight)
        {
            this.player.anims.play('right', true);
        }
        else if (this.isMovingUp)
        {
            this.player.anims.play('up', true);
        }
        else if (this.isMovingDown)
        {
            this.player.anims.play('down', true);
        }
        else
        {
            this.player.anims.stop();
        }

},

dialogue (){
    console.log("pee pee");


}
});
  

export { BootScene, WorldScene};
