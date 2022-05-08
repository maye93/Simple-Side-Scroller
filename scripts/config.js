const config = {
    type: Phaser.AUTO,
    mode: Phaser.Scale.FIT,
    width: 1280,
    height: 320,
    backgroundColor: "#fffeaf",
    physics: {
        default: 'arcade',
        arcade: {
            gravity: {x:0, y:0}
        }
    },
    scene: [
        mainScene,
        // gameOver
    ],
    pixelArt: true,
    roundPixels: true
}

const game = new Phaser.Game(config);