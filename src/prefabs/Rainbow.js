class Rainbow extends Phaser.Physics.Arcade.Sprite {
    constructor(scene, x, y, texture, frame) {
        super(scene, x, y, texture, frame);
        scene.physics.add.existing(this);
        scene.add.existing(this);

        this.setFrame(frame);

        this.speed = 6

    }

    update() {
        // Move the Rainbow object to the left
        this.x -= this.speed
    }
}
