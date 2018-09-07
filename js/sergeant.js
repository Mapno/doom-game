function Sergeant(game, life, platform) {
    Enemy.call(this, game, life);

    this.frameIndex = 0; //frameIndex is a frame counter which is slower than the base frame counter for the game

    this.getImages();

    this.platform = platform;

    //basic element positions and measurements
    this.w = this.game.c.width * 0.06;
    this.h = this.game.c.height * 0.10;
    this.x = this.game.platformArray[this.platform].x + 30;
    this.y = this.game.platformArray[this.platform].y - this.h - 4;
    this.vx = -1;

    this.bullets = [];

    this.shooting = false;

    this.canShoot = true
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
    switch (true) {
        case this.dead && this.frameDying <= 7:
            this.game.ctx.drawImage(this.dieArr[this.frameDying], this.x, this.y + this.h - this.dieArr[this.frameDying].height + 4, this.w, this.dieArr[this.frameDying].height);
            break;
        case this.impact:
            this.direction ? this.game.ctx.drawImage(this.impactRight, this.x, this.y, this.w, this.h) : this.game.ctx.drawImage(this.impactLeft, this.x, this.y, this.w, this.h);
            setTimeout(function () {
                this.impact = false;
            }.bind(this), 100);
            break;
        case this.attacked:
            if(this.direction) {
                this.game.ctx.drawImage(this.attackRight[Math.floor(this.frameIndex / 4)], this.x, this.y, this.w, this.h)
            } else {
                this.game.ctx.drawImage(this.attackLeft[Math.floor(this.frameIndex / 4)], this.x, this.y, this.w, this.h)
            }
            break;
        case this.vx < 0 || this.vx > 0:
            this.direction ? this.game.ctx.drawImage(this.moveRight[Math.floor(this.frameIndex / 2)], this.x, this.y, this.w * 0.85, this.h) : this.game.ctx.drawImage(this.moveLeft[Math.floor(this.frameIndex / 2)], this.x, this.y, this.w * 0.85, this.h);
            break;
    }

    this.drawBullets();
}

Sergeant.prototype.moveX = function () {
    switch (true) {
        case this.dead:
            this.vx = 0;
            break;
        case this.impact:
            this.moving();
            break;
        case this.x - this.game.player.x <= 300 && this.game.player.x - this.x <= 300 && this.game.player.y + 20 >= this.y && this.game.player.y + this.game.player.h -20 <= this.y + this.h:
            this.x >= this.game.player.x + this.game.player.w / 2 ? this.direction = false : this.direction = true;
            this.vx = 0;
            this.attack();
            this.canMove = true
            break;
        case this.x < this.game.platformArray[this.platform].x && this.direction == false || this.canMove:
            this.direction = true;
            this.vx = 1;
            this.moving();
            this.canMove = false;
            break;
        case this.x + this.w > this.game.platformArray[this.platform].x + this.game.platformArray[this.platform].w && this.direction || this.canMove:
            this.direction = false;
            this.vx = -1;
            this.moving();
            this.canMove = false;
            break;

    }
    this.x += this.vx;
    this.x -= this.game.player.vx;
}



//calls bullet draw method
Sergeant.prototype.drawBullets = function () {
    this.bullets.forEach(function (e) {
        e.draw();
    });
}


Sergeant.prototype.attack = function () {
    var bullet;
    if(this.canShoot){
        gun.play();
        this.direction ? bullet = new Bullet(this, this.game, this.x + this.w, this.y + this.h / 2.6) : bullet = new Bullet(this, this.game, this.x, this.y + this.h / 2.6);
        this.bullets.push(bullet);
        this.attacked = true;
        this.canShoot = false;
        setTimeout(function(){
            this.canShoot = true
        }.bind(this), 1000)
    }
 
};

Sergeant.prototype.move = function() {
    this.moveX();
    this.bullets.forEach(e => {
        e.move();
    })
}

