class Rainbow extends Phaser.Physics.Arcade.Sprite {
    constructor(scene, x, y, texture, frame) {
        super(scene, x, y, texture, frame);
        scene.physics.add.existing(this);
        scene.add.existing(this);

        this.setFrame(frame);

    }

    update() {
        // Add update logic
        // Move the Rainbow object to the left
        this.x -= 10
    }

    reset() {
        // Add reset logic if needed
    }
}
