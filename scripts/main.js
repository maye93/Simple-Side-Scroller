let mapWidth = 1280;
let mapHeight = 320;
let score = 0;
let scoreText;

let background;
let ground;
let brick;
let box;
let pipe;

let mario;
let enemy;
let coin;
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
        this.load.image('coin', './assets/images/coin.png')
        this.load.image('enemy', './assets/images/enemy.png')
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
        
        coin = this.physics.add.group();
        coin.create(248, 200, 'coin');
        coin.create(328, 200, 'coin');
        coin.create(360, 200, 'coin');
        coin.create(855, 200, 'coin');
        coin.create(889, 200, 'coin');
        coin.create(344, 152, 'coin');
        coin.create(761, 152, 'coin');
        coin.create(983, 152, 'coin');

        enemy = this.physics.add.group({bounceX: 1,collideWorldBounds: true});
        enemy.create(600, 264, 'enemy').setScale(0.04);
        enemy.create(900, 264, 'enemy').setScale(0.04);
        enemy.setVelocityX(100)
        
        this.physics.add.collider(enemy, ground);
        this.physics.add.collider(enemy, pipe);

        mario = this.physics.add.sprite(151, 256, 'mario').setScale(0.5);
        mario.setGravityY(300);
        mario.setBounce(0.2);
        mario.setCollideWorldBounds(true);
        this.animation()

        this.physics.add.collider(mario, ground);
        this.physics.add.collider(mario, brick);
        this.physics.add.collider(mario, box);
        this.physics.add.collider(mario, pipe);
        this.physics.add.collider(mario, coin, this.coinScore);
        this.physics.add.collider(mario, enemy, this.gameOver);

        scoreText = this.add.text(16, 16, 'Score: 0', {fontSize: '20px', fill: '#000000'});

        this.cameras.main.startFollow(mario);
        // this.cameras.main.setSize(320, 320);
        this.cameras.main.setBounds(0, 0, mapWidth, mapHeight);

        this.cursors = this.input.keyboard.createCursorKeys();
    }

    update() {
        scoreText.x = mario.body.position.x-125;
        if (mario.body.position.y == 296) {
            this.gameOver();
        }
        this.controls();
    }

    animation() {
        this.anims.create({
            key: 'left',
            frames: this.anims.generateFrameNumbers('mario', {start: 0, end: 3}),
            frameRate: 10,
            repeat: -1
        });

        this.anims.create({
            key: 'turn',
            frames: [ { key:'mario', frame: 4}],
            frameRate: 20
        });

        this.anims.create({
            key: 'right',
            frames: this.anims.generateFrameNumbers('mario', {start: 5, end: 8}),
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

    coinScore() {
        coin.destroy(true);
        score += 10;
        scoreText.setText('Score: ' + score);

    //     if (Math.abs(coin.velocityx) < 1 && Math.abs(coin.velocityy) < 1) {
    //         score += 10;
    //         scoreText.setText('Score: ' + score);
    //    }
    }

    gameOver() {
        console.log('gameOver');
    }
}