function Sergeant(game, life, x) {
    Enemy.call(this, game, life);

    this.frameIndex = 0; //frameIndex is a frame counter which is slower than the base frame counter for the game

    this.getImages();

    //basic element positions and measurements
    this.x = x;
    this.y = 210;
    this.vx = 0;
    this.h = 50;
    this.w = 40;

    this.bullets = [];

}

Sergeant.prototype = Object.create(Enemy.prototype);
Sergeant.prototype.constructor = Sergeant;

Sergeant.prototype.getImages = function () {
    //impact images
    this.impactLeft = new Image();
    this.impactLeft.src = "./assets/sprites/sergeant/hitLeft.png";
    this.impactRight = new Image();
    this.impactRight.src = "./assets/sprites/sergeant/hitRight.png";

    //move imgs
    var img;
    this.moveRight = [];
    for (let i = 1; i <= 4; i++) {
        img = new Image();
        img.src = './assets/sprites/sergeant/moveRight' + i + '.png';
        this.moveRight.push(img);
    }
    this.moveLeft = [];
    for (let i = 1; i <= 4; i++) {
        img = new Image();
        img.src = './assets/sprites/sergeant/moveLeft' + i + '.png';
        this.moveLeft.push(img);
    }

    //attack imgs
    this.attackLeft = [];
    for (let i = 1; i <= 2; i++) {
        img = new Image();
        img.src = "./assets/sprites/sergeant/shootLeft" + i + ".png";
        this.attackLeft.push(img);
    }
    this.attackRight = [];
    for (let i = 1; i <= 2; i++) {
        img = new Image();
        img.src = "./assets/sprites/sergeant/shootRight" + i + ".png";
        this.attackRight.push(img);
    }
    //die imgs
    this.dieArr = [];
    for (let i = 1; i <= 8; i++) {
        img = new Image();
        img.src = "./assets/sprites/sergeant/die" + i + ".png";
        this.dieArr.push(img);
    }
}


Sergeant.prototype.move = function () {
    switch (true) {
        case this.dead:
            this.vx = -this.game.player.vx;
            break;
        case this.impact:
            this.vx = 0;
            this.moving();
            break;
        case this.game.player.x + this.game.player.w + 300 <= this.x:
            this.vx = -this.game.player.vx;
            this.attack();
            break;
        case this.x > this.game.player.x + this.game.player.w:
            this.game.player.vx ? this.vx = -1 - this.game.player.vx : this.vx = -1;
            this.moving();
            break;
        case this.x + this.w < this.game.player.x:
            this.game.player.vx ? this.vx = 1 - this.game.player.vx : this.vx = 1;
            this.moving();
            break;
    }
    this.x += this.vx;
    this.drawBullets();
}

Sergeant.prototype.attack = function () {
    this.attacked = true;
    var bullet;
    this.direction ? bullet = new Bullet(this, this.game, this.x + this.w, this.y + this.h / 2.6) : bullet = new Bullet(this, this.game, this.x, this.y + this.h / 2.6);
    this.shooted = true;
    this.bullets.push(bullet);
};

//calls bullet draw method
Sergeant.prototype.drawBullets = function () {
    this.bullets.forEach(function (e) {
        e.draw();
    });
}

Sergeant.prototype.shoot = function () {
    this.attacked = true;
    this.game.frames % 50 === 0 ? this.player.life -= 65 : 0;
}