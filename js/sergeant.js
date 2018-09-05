function Sergeant(game, player, life) {
    Enemy.call(this, game, player, life);

    this.frameIndex = 0; //frameIndex is a frame counter which is slower than the base frame counter for the game

    this.getImages();

        //basic element positions and measurements
    this.x = x;
    this.y = 210;
    this.vx = -1;

}

Sergeant.prototype = Object.create(Enemy.prototype);
Sergeant.prototype.constructor = Sergeant;

Sergeant.prototype.getImages = function() {
    //impact images
    this.impactLeft = new Image();
    this.impactLeft.src = "./assets/sprites/sergeamt/hitLeft.png";
    this.impactRight = new Image();
    this.impactRight.src = "./assets/sprites/sergeant/hitRight.png";

    //move imgs
    var img;
    this.moveRight = [];
    for(let i = 1; i <= 4; i++) {
        img = new Image();
        img.src = './assets/sprites/sergeant/moveRight' + i + '.png';
        this.moveRight.push(img);
    }
    this.moveLeft = [];
    for(let i = 1; i <= 4; i++) {
        img = new Image();
        img.src = './assets/sprites/sergeant/moveLeft' + i + '.png';
        this.moveLeft.push(img);
    }

    //attack imgs
    this.attackLeft = [];
    for(let i = 1; i <= 2; i++) {
        img = new Image();
        img.src = "./assets/sprites/sergeant/attackLeft" + i + ".png";
        this.attackLeft.push(img);
    }
    this.attackRight = [];
    for(let i = 1; i <= 2; i++) {
        img = new Image();
        img.src = "./assets/sprites/sergeant/attackRight" + i + ".png";
        this.attackRight.push(img);
    }
    //die imgs
    this.dieArr = [];
    for(let i = 1; i <= 8; i++){
        img = new Image();
        img.src = "./assets/sprites/sergeant/die" + i + ".png";
        this.dieArr.push(img);
    }
}

Sergeant.prototype.shoot = function() {
    this.attacked = true;
    this.game.frames % 50 === 0 ? this.player.life -= 65 : 0;
}

Sergeant.prototype.move = function() {
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
        case this.x:
            this.vx = -this.player.vx;
            this.attack();
    }
    this.x += this.vx;
}