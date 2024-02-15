let config = {
    type: Phaser.AUTO,
    width: 1200,
    height: 960,
    physics: {
      default: 'arcade',
      arcade: {
          debug: false,
      }
  },
    scene: [ Menu, Play ]


  }

let game = new Phaser.Game(config)

//set UI sizes
let borderUISize = game.config.height / 15
let borderPadding = borderUISize / 3

// keyboard
let keyUP, keyDOWN
