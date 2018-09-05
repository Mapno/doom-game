function Imp(game, player, life) {
    Enemy.call(this, game, player, life)

    //basic element positions and measurements
    this.x = 700;
    this.y = 210;
    this.vx = -1;
    this.w = 38;
    this.h = 51;

    this.frameIndex = 0; //frameIndex is a frame counter which is slower than the base frame counter for the game

    this.getImages();

}

Imp.prototype = Object.create(Enemy.prototype);
Imp.prototype.constructor = Imp;


Imp.prototype.getImages = function() {
    //impact images
    this.impactLeft = new Image();
    this.impactLeft.src = "./assets/sprites/imp/hitLeft.png";
    this.impactRight = new Image();
    this.impactRight.src = "./assets/sprites/imp/hitRight.png";

    //move imgs
    var img;
    this.moveRight = [];
    for(let i = 1; i <= 4; i++) {
        img = new Image();
        img.src = './assets/sprites/imp/right' + i + '.png';
        this.moveRight.push(img);
    }
    this.moveLeft = [];
    for(let i = 1; i <= 4; i++) {
        img = new Image();
        img.src = './assets/sprites/imp/left' + i + '.png';
        this.moveLeft.push(img);
    }

    //attack imgs
    this.attackLeft = [];
    for(let i = 1; i <= 2; i++) {
        img = new Image();
        img.src = "./assets/sprites/imp/attackLeft" + i + ".png";
        this.attackLeft.push(img);
    }
    this.attackRight = [];
    for(let i = 1; i <= 2; i++) {
        img = new Image();
        img.src = "./assets/sprites/imp/attackRight" + i + ".png";
        this.attackRight.push(img);
    }

    //die imgs
    this.dieArr = [];
    for(let i = 1; i <= 8; i++){
        img = new Image();
        img.src = "./assets/sprites/imp/die" + i + ".png";
        this.dieArr.push(img);
    }
}

Imp.prototype.move = function() {
    switch(true) {
        case this.dead:
            this.vx = -this.player.vx;
            break;
        case this.impact:
            this.vx = 0;
            this.moving();
            break;
        case this.x > this.player.x + this.player.w:
            this.player.vx ? this.vx = -1 - this.player.vx : this.vx = -1;
            this.moving();
            break;
        case this.x + this.w < this.player.x:
            this.player.vx ? this.vx = 1 - this.player.vx : this.vx = 1;
            this.moving();
            break;
        case this.x <= this.player.x + this.player.w -20 && this.x + this.w >= this.player.x + 20 && this.y + this.h >= this.player.y + 50:
            this.vx = -this.player.vx;
            this.attack();
    }
    this.x >= this.player.x + this.player.w / 2 ? this.direction = false : this.direction = true;
    this.x += this.vx;
}
