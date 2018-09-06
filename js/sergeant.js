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

    this.shooting = false;

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

Enemy.prototype.draw = function () {
    // switch (true) {
    //     case this.dead && this.frameDying <= 7:
    //         this.game.ctx.drawImage(this.dieArr[this.frameDying], this.x, this.y + this.h - this.dieArr[this.frameDying].height);
    //         break;
    //     case this.impact:
    //         this.direction ? this.game.ctx.drawImage(this.impactRight, this.x, this.y, this.w, this.h) : this.game.ctx.drawImage(this.impactLeft, this.x, this.y, this.w, this.h);
    //         setTimeout(function () {
    //             this.impact = false;
    //         }.bind(this), 100);
    //         break;
    //     case this.attacked:
    //         this.direction ? this.game.ctx.drawImage(this.attackRight[this.frameIndex % 4], this.x, this.y) : this.game.ctx.drawImage(this.attackLeft[this.frameIndex % 4], this.x, this.y);
    //         break;
    //     case this.vx < 0 || this.vx > 0:
    //         this.direction ? this.game.ctx.drawImage(this.moveRight[Math.floor(this.frameIndex / 2)], this.x, this.y) : this.game.ctx.drawImage(this.moveLeft[Math.floor(this.frameIndex / 2)], this.x, this.y);
    //         break;
    // }

    // this.drawBullets();
}

Sergeant.prototype.moveX = function () {
    switch (true) {
        case this.dead:
            this.vx = -this.game.player.vx;
            break;
        case this.impact:
            this.vx = 0;
            this.moving();
            break;
        case this.x - this.game.player.x <= 300 && this.game.player.x - this.x <= 300 && this.attacked:
            this.vx = 0;
            this.attack();
            break;
        case this.x - this.game.player.x <= 300 && this.game.player.x - this.x <= 300:
            this.vx = 0;
            break;
        // case this.x - this.:
            

    }
    this.x += this.vx;

    // console.log(this.direction);
    // console.log(this.game.frames)
    // console.log(this.vx)
}



//calls bullet draw method
Sergeant.prototype.drawBullets = function () {
    this.bullets.forEach(function (e) {
        e.draw();
    });
}

Sergeant.prototype.shoot = function() {
    this.attacked = true;
    this.attack();
}

Sergeant.prototype.attack = function () {
    var bullet;
    this.direction ? bullet = new Bullet(this, this.game, this.x + this.w, this.y + this.h / 2.6) : bullet = new Bullet(this, this.game, this.x, this.y + this.h / 2.6);
    this.bullets.push(bullet);
};

Sergeant.prototype.move = function() {
    this.moveX();
    this.bullets.forEach(e => {
        e.move();
    })
}

