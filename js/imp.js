function Imp(game, player) {
    this.x = 650;
    this.y = 210;
    this.direction = false; //true -> right; false -> left
    this.player = player;
    this.vx = -1;
    this.w = 38;
    this.h = 51;
    this.impact = false;
    this.frameIndex = 0;

    this.game = game;
}

Imp.prototype.getImages = function() {
    this.impactLeft = new Image();
    this.impactLeft.src = "./assets/sprites/imp/hitLeft.png";
    this.impactRight = new Image();
    this.impactRight.src = "./assets/sprites/imp/hitRight.png";

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
    this.imgfps();
    switch(true) {
        case this.impact:
            this.game.ctx.drawImage(this.impactLeft, this.x, this.y, this.w, this.h);
            setTimeout(function(){
                this.impact = false;
            }.bind(this), 100);
            break;
        case true:
            this.direction ? this.game.ctx.drawImage(this.imgMoveRight[this.frameIndex], this.x, this.y, this.w, this.h) : this.game.ctx.drawImage(this.imgMoveLeft[this.frameIndex], this.x, this.y, this.w, this.h);
            break;

    }
}

Imp.prototype.move = function() {
    this.impact ? this.vx = 0 : this.player.vx ? this.vx = -1 - this.player.vx : this.vx = -1;
    this.x += this.vx;
    console.log(this.vx);
}

Imp.prototype.getsHit = function() {
    this.game.player.bullets.forEach(e => {
        e.x >= this.x && e.x <=  (this.x + this.w) ? (function() {
            this.impact = true;
        }).bind(this)() : 0;
    });
}

Imp.prototype.imgfps = function() {
    this.game.frames % 8 === 0 ? this.frameIndex++ : 0;
    this.frameIndex === 4 ? this.frameIndex = 0 : 0;
}

Imp.prototype.attack = function() {
    // this.x <= this.player.x + 
}