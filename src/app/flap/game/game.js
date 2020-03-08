import * as Phaser from 'phaser';

const SCENE_KEY = 'flappy-bird-game'
const xGap = 450
var score = 0

var hitflag = false

var isPaused = false
var gameOver = false

var countpipe = 0

export default class GameScene extends Phaser.Scene
{


	constructor()
	{
		super(SCENE_KEY)
	}

	preload()
	{
		this.load.image('sky', './assets/flappy/sky.png')
		this.load.image('fencea', './assets/flappy/fencea.png')
		this.load.image('fenceb', './assets/flappy/fenceb.png')
		this.load.spritesheet('birdy','assets/flappy/birdy.png',{ frameWidth: 34, frameHeight: 24 })
		this.load.image('shoot', 'assets/space/shoot.png'); 


		this.load.audio('flap', './assets/flappy/sounds/sfx_wing.ogg')
		this.load.audio('hit', './assets/flappy/sounds/sfx_hit.ogg')
		this.load.audio('die', './assets/flappy/sounds/sfx_die.ogg')
		this.load.audio('score', './assets/flappy/sounds/sfx_point.ogg')
	}

	create()
	{
		var gameWidth = 400;
		var gameHeight = 650;

		const colors = ['0x1fbde0']

		const randColor = colors[Math.floor(Math.random() * colors.length)]
		this.cameras.main.setBackgroundColor(randColor)

		const birdyX = (gameWidth / 2) - 50
		const birdyY = (gameHeight / 2) - 50

		// Add score text
		this.scoreText = this.add.text(birdyX, (gameHeight / 4), score.toString(), { fontFamily: '"04b19"', fontSize: 60, color: '#fff' })

		this.platforms = this.physics.add.staticGroup()

		const pipePos = gameWidth + 2 * xGap
		const pos = this.getRandom()

		// bottom placable at 260+gap to height
		this.platforms.create(pipePos, pos[0], 'fencea').setScale(1).refreshBody();
		this.platforms.create(pipePos, pos[1], 'fenceb').setScale(1).refreshBody();

		this.player = this.physics.add.sprite(birdyX, birdyY, 'birdy');

		this.player.setBounce(0.2);
		this.player.setCollideWorldBounds(true);

		this.player.body.setGravityY(300)

		this.physics.add.collider(this.player, this.platforms, this.playerHit, null, this)

		// this.spacebar = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.SPACE)

		this.input.keyboard.on('keydown-' + 'SPACE', this.flapNow, this);

		this.input.on('pointerdown', this.flapNow, null);

		
		this.flybutton = this.add.image(200, 550, 'shoot');
		this.flybutton.setInteractive();
	
		this.flybutton.once('pointerdown', () => {
			this.flapNow();
		
		});
	}

	update()
	{
		var gameWidth = 400;
		var gameHeight = 650;

		this.flybutton = this.add.image(200, 550, 'shoot');

		const children = this.platforms.getChildren()
		children.forEach((child) => {
			if (child instanceof Phaser.Physics.Arcade.Sprite)
			{
				child.refreshBody();
				child.x += -3;
				// when one set of pipe is just shown
				// @ts-ignore
				if (child.x <= gameWidth && !child.drawn)
				{
					countpipe += 1

					// @ts-ignore
					child.drawn = true

					if (countpipe >= 2)
					{
						const pos = this.getRandom()
						console.log('created one')

						this.platforms.create(gameWidth + xGap, pos[0], 'fencea').setScale(1).refreshBody()

						this.platforms.create(gameWidth + xGap, pos[1], 'fenceb').setScale(1).refreshBody()
						countpipe = 0
					}

					// child.x = game.canvas.width+pipeWidth;
					// child.y = getRandom()[0];
				}
				if (child.x <= -50)
				{
					console.log('Destroyed one ' + countpipe)
					child.destroy()
				}

				const birdyX = (gameWidth / 2) - 50

				// check if pipe passed bird (birdyX)
				// @ts-ignore
				if (child.x < birdyX && !gameOver && child.texture.key === 'fencea' && !child.scored)
				{
					// only check one pipe
					// @ts-ignore
					child.scored = true
					score += 1

					this.scoreText.setText(score.toString())
					this.game.sound.play('score')

					console.log('score:', score)
				}
			}
		})

		// set lower Bounds
		// console.log("y= ",player.y)
		if (this.player.y > gameHeight + 200)
		{
			console.log('y= ', this.player.y)
			this.endGame()
		}

		// set upper Bounds
		if (this.player.y < -200)
		{
			console.log('y= ', this.player.y)
			this.endGame()
		}
	}
	flapNow()
	{
		if (gameOver)
		{
			return
		}

		if (isPaused)
		{
			this.resume()
		}

		console.log("flap")
		this.player.setVelocityY(-330)

		this.game.sound.play('flap')

		this.flybutton = this.add.image(200, 550, 'shoot');
		this.flybutton.setInteractive();
	
		this.flybutton.once('pointerdown', () => {
			this.flapNow();
		
		});
	}

	playerHit()
	{
		if (hitflag)
		{
			return
		}

		console.log('Player hit!!!!!!!!!')

		this.game.sound.play('hit')
		hitflag = true

		setTimeout(() => {
			this.playerDead()
		}, 200)
	}

	playerDead()
	{
		console.log('Player dead!!!!!!!!!')
		this.game.sound.play('die')
		this.player.setCollideWorldBounds(false)
		gameOver = true
	}

	getRandom()
	{
		const safePadding = 25
		const gap = 150

		const min = Math.ceil(safePadding + gap / 2)
		const max = Math.floor(this.game.canvas.height - safePadding - gap / 2)
		const ran =  Math.floor(Math.random() * (max - min + 1)) + min
		const rantop = ran - ((gap / 2) + 260)
		const ranbot = ran + ((gap / 2) + 260)
		console.log(ranbot, rantop)
		return [ranbot, rantop]
	}

	endGame()
	{
		gameOver = true;
		this.pause()
		console.log('game paused')

		this.player.y = 450
	}

	pause()
	{
		console.log('pause')
		isPaused = true

		this.game.scene.pause(SCENE_KEY)
	}

	resume()
	{
		console.log('resume')
		isPaused = false

		this.game.scene.resume(SCENE_KEY)
	}
}

export {
	SCENE_KEY
}