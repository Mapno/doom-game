function Imp(game) {
    this.x = 650;
    this.y = 210;
    this.direction = false; //true -> right; false -> left
    this.vx = -5;
    this.w = 38;
    this.h = 51;

    this.game = game;
}

Imp.prototype.getImages = function() {
    var img;
    this.imgMoveRight = [];
    for(let i = 1; i <= 4; i++) {
        img = new Image();
        img.src = './assets/sprites/imp/right' + i + '.png';
        this.imgMoveRight.push(img);
    }
    this.imgMoveLeft = [];
    for(let i = 1; i <= 4; i++) {
        img = new Image();
        img.src = './assets/sprites/imp/left' + i + '.png';
        this.imgMoveLeft.push(img);
    }
}

Imp.prototype.draw = function() {
    this.direction ? this.game.ctx.drawImage(this.imgMoveRight[this.game.frames % 4], this.x, this.y, this.w, this.h) : this.game.ctx.drawImage(this.imgMoveLeft[this.game.frames % 4], this.x, this.y, this.w, this.h);
}

Imp.prototype.move = function() {
    this.x += this.vx;
}