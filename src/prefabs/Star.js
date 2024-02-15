class Star extends Phaser.Physics.Arcade.Sprite {
    constructor(scene, x, y, texture, frame) {
        super(scene, x, y, texture, frame)
        scene.physics.add.existing(this)
        scene.add.existing(this)

        this.setFrame(frame)
        this.setDepth(2)

        this.setOrigin(0.5)

        this.lanes = [120, 360, 600, 840]

        this.setY(this.lanes[Phaser.Math.Between(0,3)])

        this.speed = -180
    }

    update(time) {
        // Move left

        if(Math.floor(time) % 10 == 0 && time != 0) {
            if(Phaser.Math.Between(1,3) == 1) {
                Play.pup = true
            }
        }

        if (Play.pup == true && time >= 10){
            this.setVelocityX(this.speed)
            Play.pup = false
        }

        if(this.x < -10) {
            this.reset()
        }
    }

    reset() {
        Play.pup = false
        this.setVelocityX(0)
        this.setX(game.config.width + 50)
        this.setY(this.lanes[Phaser.Math.Between(0,3)])
    }

}
