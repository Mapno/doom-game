function Imp(game, life, x) {
    Enemy.call(this, game, life)

    //basic element positions and measurements
    this.x = x;
    this.y = 210;
    this.vx = -1;
    this.w = 38;
    this.h = 51;

    this.frameIndex = 0; //frameIndex is a frame counter which is slower than the base frame counter for the game

    this.getImages();

}

Imp.prototype = Object.create(Enemy.prototype);
Imp.prototype.constructor = Imp;

Imp.prototype.getImages = function () {
    //impact images
    this.impactLeft = new Image();
    this.impactLeft.src = "./assets/sprites/imp/hitLeft.png";
    this.impactRight = new Image();
    this.impactRight.src = "./assets/sprites/imp/hitRight.png";

    //move imgs
    var img;
    this.moveRight = [];
    for (let i = 1; i <= 4; i++) {
        img = new Image();
        img.src = './assets/sprites/imp/right' + i + '.png';
        this.moveRight.push(img);
    }
    this.moveLeft = [];
    for (let i = 1; i <= 4; i++) {
        img = new Image();
        img.src = './assets/sprites/imp/left' + i + '.png';
        this.moveLeft.push(img);
    }

    //attack imgs
    this.attackLeft = [];
    for (let i = 1; i <= 2; i++) {
        img = new Image();
        img.src = "./assets/sprites/imp/attackLeft" + i + ".png";
        this.attackLeft.push(img);
    }
    this.attackRight = [];
    for (let i = 1; i <= 2; i++) {
        img = new Image();
        img.src = "./assets/sprites/imp/attackRight" + i + ".png";
        this.attackRight.push(img);
    }

    //die imgs
    this.dieArr = [];
    for (let i = 1; i <= 8; i++) {
        img = new Image();
        img.src = "./assets/sprites/imp/die" + i + ".png";
        this.dieArr.push(img);
    }
}

Imp.prototype.draw = function () {
    switch (true) {
        case this.dead && this.frameDying <= 7:
            this.game.ctx.drawImage(this.dieArr[this.frameDying], this.x, this.y + this.h - this.dieArr[this.frameDying].height);
            break;
        case this.impact:
            this.direction ? this.game.ctx.drawImage(this.impactRight, this.x, this.y, this.w, this.h) : this.game.ctx.drawImage(this.impactLeft, this.x, this.y, this.w, this.h);
            setTimeout(function () {
                this.impact = false;
            }.bind(this), 100);
            break;
        case this.attacked:
            this.direction ? this.game.ctx.drawImage(this.attackRight[Math.floor(this.frameIndex / 4)], this.x, this.y, this.w, this.h) : this.game.ctx.drawImage(this.attackLeft[Math.floor(this.frameIndex / 4)], this.x, this.y, this.w, this.h)
            break;
        case this.vx < 0 || this.vx > 0:
            this.direction ? this.game.ctx.drawImage(this.moveRight[Math.floor(this.frameIndex / 2)], this.x, this.y) : this.game.ctx.drawImage(this.moveLeft[Math.floor(this.frameIndex / 2)], this.x, this.y);
            break;
    }
}

Imp.prototype.move = function () {
    switch (true) {
        case this.dead:
            this.vx = -this.game.player.vx;
            break;
        case this.impact:
            this.vx = 0;
            this.moving();
            break;
        case this.x > this.game.player.x + this.game.player.w:
            this.game.player.vx ? this.vx = -1 - this.game.player.vx : this.vx = -1;
            this.moving();
            break;
        case this.x + this.w < this.game.player.x:
            this.game.player.vx ? this.vx = 1 - this.game.player.vx : this.vx = 1;
            this.moving();
            break;
        case this.x <= this.game.player.x + this.game.player.w - 20 && this.x + this.w >= this.game.player.x + 20 && this.y <= this.game.player.y + this.game.player.h && this.y + this.h >= this.game.player.y:
            this.vx = -this.game.player.vx;
            this.attack();
    }
    this.x >= this.game.player.x + this.game.player.w / 2 ? this.direction = false : this.direction = true;
    this.x += this.vx;
    console.log(this.y + this.h >= this.game.player.y + this.game.player.h, this.y <= this.game.player.y0)
}

Enemy.prototype.attack = function () {
    this.attacked = true;
    if(this.game.frames % 50 === 0){
        this.game.player.life -= 30;
        this.game.player.impact = true;
    }
}
