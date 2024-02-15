class Rocket extends Phaser.Physics.Arcade.Sprite {
    constructor(scene, x, y, texture, frame) {
        super(scene, x, y, texture, frame)
        scene.physics.add.existing(this)
        scene.add.existing(this)

        this.lane = true

        //this.sfxShot = scene.sound.add('sfx-shot')
    }

    update() {

        const tolerance = .1; // Make sure it actually stops

        if (this.lane == false) {
            if (Math.abs(this.y - 120) <= tolerance) {
                this.setVelocityY(0);
                this.setY(120); 
                this.lane = true;
            }
        
            if (Math.abs(this.y - 360) <= tolerance) {
                this.setVelocityY(0);
                this.setY(360); 
                this.lane = true;
            }
        
            if (Math.abs(this.y - 600) <= tolerance) {
                this.setVelocityY(0);
                this.setY(600); 
                this.lane = true;
            }
        
            if (Math.abs(this.y - 840) <= tolerance) {
                this.setVelocityY(0);
                this.setY(840);
                this.lane = true;
            }
        }
                    
        if (keyUP.isDown && this.y > 350 && this.lane) {
            this.setVelocityY(-480);
            this.lane = false;
        } else if (keyDOWN.isDown && this.y < 610 && this.lane) {
            this.setVelocityY(480);
            this.lane = false;
        }
    }

    reset() {
        this.lane = true
        this.y = 360
    }

}