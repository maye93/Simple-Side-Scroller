let mapWidth = 1280;
let mapHeight = 320;

let background;
let ground;
let brick;
let box;
let pipe;
let mario;

let score = 0;
let scoreText;
let jump
let run

class mainScene extends Phaser.Scene {
    constructor() {
        super({key: 'mainScene'})
    }

    preload() {
        this.load.image('bg', './assets/maps/bg.png')
        this.load.image('ground', './assets/maps/ground.png')
        this.load.image('brick', './assets/maps/brick.png')
        this.load.image('box', './assets/maps/box.png')
        this.load.image('pipe', './assets/maps/pipe.png')
        // this.load.image('mario', './assets/character/mai.png')
        this.load.spritesheet('mario', './assets/character/dude.png', {frameWidth: 32, frameHeight: 48});
    }

    create() {
        this.physics.world.setBounds(0, 0, mapWidth, mapHeight);
        background = this.add.tileSprite(0, 0, mapWidth, mapHeight, "bg").setOrigin(0, 0);

        ground = this.physics.add.staticGroup();
        ground.create(320, 296, 'ground');
        ground.create(992, 296, 'ground').setFlip(true, false);

        brick = this.physics.add.staticGroup();
        brick.create(344, 216, 'brick');
        brick.create(872, 216, 'brick');
    
        box = this.physics.add.staticGroup();
        box.create(344, 168, 'box');
        box.create(248, 216, 'box');
        box.create(983, 168, 'box');
        box.create(761, 168, 'box');
        
        pipe = this.physics.add.staticGroup();
        pipe.create(192, 256, 'pipe');
        pipe.create(624, 256, 'pipe');
        pipe.create(688, 256, 'pipe');
        pipe.create(1084, 256, 'pipe');
        
        // mario = this.physics.add.image(151, 256, 'mario').setScale(0.2);
        mario = this.physics.add.sprite(151, 256, 'mario').setScale(0.5);
        mario.setGravityY(300);
        mario.setBounce(0.2);
        mario.setCollideWorldBounds(true);
        this.animation()
        
        scoreText = this.add.text(16, 16, 'score: 0', {fontSize: '20px', fill: '#000000'});

        this.physics.add.collider(ground, mario);
        this.physics.add.collider(brick, mario);
        this.physics.add.collider(box, mario);
        this.physics.add.collider(pipe, mario);

        this.cameras.main.startFollow(mario);
        this.cameras.main.setSize(320, 320);
        this.cameras.main.setBounds(0, 0, mapWidth, mapHeight);
        this.cursors = this.input.keyboard.createCursorKeys();
    }

    update() {
        scoreText.x = mario.body.position.x-125;
        // console.log(mario.body.position.y);
        this.dead();
        this.controls();
    }

    animation() {
        this.anims.create({
            key: 'left',
            frames: this.anims.generateFrameNumbers('mario', { start: 0, end: 3 }),
            frameRate: 10,
            repeat: -1
        });

        this.anims.create({
            key: 'turn',
            frames: [ { key: 'mario', frame: 4 } ],
            frameRate: 20
        });

        this.anims.create({
            key: 'right',
            frames: this.anims.generateFrameNumbers('mario', { start: 5, end: 8 }),
            frameRate: 10,
            repeat: -1
        });

    }

    controls() {
        if (this.cursors.left.isDown) {
            mario.setVelocityX(-160);
            mario.anims.play('left', true);
        } else if (this.cursors.right.isDown) {
            mario.setVelocityX(160);
            mario.anims.play('right', true);
        } else {
            mario.setVelocityX(0);
            mario.anims.play('turn');
        }

        if (this.cursors.up.isDown && mario.body.touching.down) {
            mario.setVelocityY(-200);
            mario.anims.play('turn');
        }
    }

    dead() {
        if (mario.body.position.y == 296) {
            console.log("dead");
        }
    }
}