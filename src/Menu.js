class Menu extends Phaser.Scene {
    constructor() {
        super("menuScene")
    }
    
    preload() {
        // assets

        this.load.image('star', './assets/star.png')
        this.load.image('RGBY', './assets/RGBY.png')
        this.load.image('starfield', './assets/starfield.png')
        
        // load spritesheet
        this.load.spritesheet('rocket', './assets/Rocket-Normal.png', {
            frameWidth: 40,
            frameHeight: 32,
            startFrame: 0,
            endFrame: 3
        })

        this.load.spritesheet('rocketP', './assets/Rocket-Fire.png', {
            frameWidth: 40,
            frameHeight: 32,
            startFrame: 0,
            endFrame: 3
        })

        this.load.spritesheet('rainbow', './assets/Rainbow.png', {
            frameWidth: 1200,
            frameHeight: 240,
            startFrame: 0,
            endFrame: 3
        })
        
        //audio
        // this.load.audio('sfx-select', './assets/sfx-select.wav')
        // this.load.audio('sfx-explosion', './assets/sfx-explosion.wav')
        // this.load.audio('sfx-shot', './assets/sfx-shot.wav')
    }

    create() {
        this.starfield = this.add.tileSprite(0, 0, 1200, 960, 'starfield').setOrigin(0, 0)

        this.anims.create({
            key: 'PowerUp',
            frames: this.anims.generateFrameNumbers('rocketP', {start: 0, end: 3, first: 0}),
            frameRate: 15,
            repeat: true
        })

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

       

        this.add.image(game.config.width/2, game.config.height/2 - 4 * (borderUISize - borderPadding), 'RGBY').setScale(0.6)
        this.add.text(game.config.width/2, game.config.height/2 + 2 * (borderUISize - borderPadding), "Use Up & Down arrows to change lanes", menuConfig).setOrigin(0.5)
        this.add.text(game.config.width/2, game.config.height/2 + 4 * (borderUISize - borderPadding), "Up or Down arrow to START", menuConfig).setOrigin(0.5)

        // define keys
        keyUP = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.UP)
        keyDOWN = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.DOWN)
    }

    update() {
        this.starfield.tilePositionX += 4

        if(Phaser.Input.Keyboard.JustDown(keyUP) || Phaser.Input.Keyboard.JustDown(keyDOWN)) {

            //this.sound.play('sfx-select')
            this.scene.start('playScene')
        }

    }
}