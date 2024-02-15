class Play extends Phaser.Scene {
    constructor() {
        super("playScene")
    }

    //CUSTOM RANDOMIZATION TOOK A WHILE SO RAINBOWS ARE IN DIFFERENT LANES WITH UNIQUE COLORS(CREATIVE TILT)
    createRainbows(scene) {
        const lanePositions = [0, 240, 480, 720]
        const colors = Phaser.Utils.Array.NumberArray(0, 3) // colors
    
        // unique rainbows
        const rainbows = []
        for (let i = 0; i < 4; i++) {
            // Randomly select a color 
            const randomIndex = Phaser.Math.Between(0, colors.length - 1)
            const colorIndex = colors.splice(randomIndex, 1)[0]
    
            const rainbow = new Rainbow(scene, game.config.width, lanePositions[i], 'rainbow', colorIndex).setOrigin(0)
            rainbow.setDepth(1)
            rainbows.push(rainbow)
        }
    
        return rainbows
    }


    create() {

        this.frame
        this.invincible = false
        this.pup = false
        this.temp = 0

        //background music
        this.bgMusic = this.sound.add('background')
        this.bgMusic.loop = true
        this.bgMusic.play()

  
        // place tile sprite
        this.starfield = this.add.tileSprite(0, 0, 1200, 960, 'starfield').setOrigin(0, 0)

        //rainbow        
        this.rainbows = this.createRainbows(this)

        //rocket
        this.Rocket = new Rocket(this, game.config.width/2 - 200, 360, 'rocket').setScale(2)
        this.Rocket.setDepth(2)

        //star power up
        this.Star = new Star(this, game.config.width + 50, 600, 'star').setScale(4)

        //controls
        keyUP = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.UP)
        keyDOWN = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.DOWN)

        //config for timer
        let timeConfig = {
            fontFamily: 'Courier',
            fontSize: '28px',
            backgroundColor: '#FFF',
            color: '#843605',
            align: 'center',
            padding: {
                top: 5,
                bottom: 5,
            },
            fixedWidth: 100
        }

        this.timer = 0
        this.timerLeft = this.add.text(borderUISize + borderPadding, borderUISize + borderPadding * 2, Math.floor(this.time) + 's', timeConfig).setDepth(2)

        // GAME OVER flag
        this.gameOver = false

    }

    update() {
        //Game Over sequence
        if (this.gameOver) {
            let menuConfig = {
                fontFamily: 'Courier',
                fontSize: '28px',
                color: '#FFF',
                align: 'center',
                padding: {
                    top: 5,
                    bottom: 5,
                },
                fixedWidth: 0
            }

            this.Rocket.destroy()
            this.Star.destroy()

            //Custom deletion
            for (let i = 0; i < this.rainbows.length; i++) {
                const rainbow = this.rainbows[i]
                // Destroy the Rainbow object
                rainbow.destroy()
                this.rainbows.splice(i, 1)
                // Decrement index 
                i--
            }

            this.add.text(game.config.width/2, game.config.height/2 - 2 * (borderUISize + borderPadding), 'GAME OVER', menuConfig).setDepth(2).setOrigin(0.5)
            this.add.text(game.config.width/2, game.config.height/2, 'Up arrow to restart, Down to menu page', menuConfig).setDepth(2).setOrigin(0.5)
            this.add.text(game.config.width/2, game.config.height/2 + 2 * (borderUISize + borderPadding), 'Created by Ayush Bandopadhyay, Music: Artlist.com', menuConfig).setDepth(2).setOrigin(0.5)
        }

        if(this.gameOver && Phaser.Input.Keyboard.JustDown(keyUP)) {
            this.bgMusic.stop()
            this.scene.restart()
        }

        if (this.gameOver && Phaser.Input.Keyboard.JustDown(keyDOWN)) {
            this.bgMusic.stop()
            this.scene.start("menuScene")
        }
        
        //background
        this.starfield.tilePositionX += 4

        
        if(!this.gameOver) {
            //timer
            this.timer += 1/60
            this.timerLeft.setText(Math.floor(this.timer) + 's')

            this.Star.update(this.timer)
            this.Rocket.update()

            //collisions
            this.physics.world.overlap(this.Rocket, this.Star, this.powerUp, null, this)

            if(!this.invincible) {
                this.physics.world.overlap(this.Rocket, this.rainbows, this.handleCollision, null, this) //uses overlap so no bouncing occurs
            }

            //TOOK A WHILE TOO (CREATIVE Tilt)
            for (let i = 0; i < this.rainbows.length; i++) {
                const rainbow = this.rainbows[i]
                rainbow.update()
    
                // Check if Rainbow is off-screen all the way
                if (rainbow.x < -rainbow.width) {
                    // Destroy the Rainbow object
                    rainbow.destroy()
    
                    this.rainbows.splice(i, 1)

                    // Decrement index 
                    i-- 
            }

            if (this.rainbows.length == 0) {
                this.rainbows = this.createRainbows(this)

                //rocket color change
                
                if(!this.invincible){
                    this.Rocket.setFrame(Phaser.Math.Between(0, 3))
                }

            }
            }

            if(this.timer % 30 == 0) {
                let speedUp = Phaser.Math.Between(1,3)
                for (let i = 0; i < this.rainbows.length; i++) {
                    const rainbow = this.rainbows[i]
                    rainbow.speed += speedUp
                    console.log(rainbow.Speed)
                }
                this.Star.speed += speedUp
                 
            }
        }
    }

    handleCollision(rocket, rainbow) {
        if (rocket.frame.name !== rainbow.frame.name) {
            this.sound.play('sparkle')
            this.gameOver = true;
            this.Rocket.setVelocity(0)
        }
    }

    powerUp(rocket, star) {
        this.sound.play('power')


        let random = Phaser.Math.Between(0,3)

        //rocket.anims.play('PowerUp')

        rocket.setTexture('rocketP',random)
        
        this.invincible = true
        this.pup = false
        star.reset()

        this.time.delayedCall(5000, () => {
            this.invincible = false
            rocket.setTexture('rocket', random)
        });

    }
}


