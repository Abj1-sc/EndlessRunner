class Play extends Phaser.Scene {
    constructor() {
        super("playScene")
    }

    //CUSTOM RANDOMIZATION TOOK A WHILE
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
  
        // place tile sprite
        this.starfield = this.add.tileSprite(0, 0, 1200, 960, 'starfield').setOrigin(0, 0)


        //rainbow        
        this.rainbows = this.createRainbows(this)

        //rocket
        this.Rocket = new Rocket(this, game.config.width/2 - 200, 360, 'rocket').setScale(2)
        this.Rocket.setDepth(2);
        
        keyUP = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.UP)
        keyDOWN = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.DOWN)

        //score

        this.scoreConfig = {
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

        this.time = 0
        this.timerLeft = this.add.text(borderUISize + borderPadding, borderUISize + borderPadding * 2, Math.floor(this.time) + 's', this.scoreConfig).setDepth(2)

        // GAME OVER flag
        this.gameOver = false

    }

    update() {
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

            //Custom deletion
            for (let i = 0; i < this.rainbows.length; i++) {
                const rainbow = this.rainbows[i]
                // Check if Rainbow is off-screen all the way
                if (rainbow.x < -rainbow.width) {
                    // Destroy the Rainbow object
                    rainbow.destroy()
    
                    this.rainbows.splice(i, 1)

                    // Decrement index 
                    i--

                }
            }

            this.add.text(game.config.width/2, game.config.height/2 - 2 * (borderUISize + borderPadding), 'GAME OVER', menuConfig).setDepth(2).setOrigin(0.5)
            this.add.text(game.config.width/2, game.config.height/2, 'Up arrow to restart, Down to menu page', menuConfig).setDepth(2).setOrigin(0.5)
        }
        if(this.gameOver && Phaser.Input.Keyboard.JustDown(keyUP)) {
            this.scene.restart()
        }

        if (this.gameOver && Phaser.Input.Keyboard.JustDown(keyDOWN)) {
            this.scene.start("menuScene")
        }
        
        this.starfield.tilePositionX += 4


        if(!this.gameOver) {
            this.time += 1/60

            this.timerLeft.setText(Math.floor(this.time) + 's')
            this.Rocket.update()

            this.physics.world.overlap(this.Rocket, this.rainbows, this.handleCollision, null, this); //uses overlap so no bouncing occurs

            //TOOK A WHILE TOO
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
                let color = Phaser.Math.Between(0, 3)
                this.Rocket.setFrame(color)
            }
            }
        }

    }

    handleCollision(rocket, rainbow) {
        if (rocket.frame.name !== rainbow.frame.name) {
            this.gameOver = true;
            this.Rocket.setVelocity(0)
        }
    }
}


