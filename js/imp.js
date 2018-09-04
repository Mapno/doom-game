function Imp(game, player, life) {
    //basic element positions and measurements
    this.x = 650;
    this.y = 210;
    this.vx = -1;
    this.w = 38;
    this.h = 51;
    this.life = life;

    this.frameIndex = 0; //frameIndex is a frame counter which is slower than the base frame counter for the game

    this.direction = false; //true -> right; false -> left

    this.player = player; //gets player so it can acces to its position and velocity

    this.impact = false; //properties to display correct frames
    this.dead = false;

    this.game = game; //fetch the game so it can paint on the canvas obj
}

Imp.prototype.getImages = function() {
    //impact images
    this.impactLeft = new Image();
    this.impactLeft.src = "./assets/sprites/imp/hitLeft.png";
    this.impactRight = new Image();
    this.impactRight.src = "./assets/sprites/imp/hitRight.png";

    //move imgs
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

    //attack imgs
    this.attackLeft = [];
    for(let i = 1; i <= 2; i++) {
        img = new Image();
        img.src = "./assets/sprites/imp/attackLeft" + i + ".png";
        this.attackLeft.push(img);
    }

    //die imgs
    this.dieArr = [];
    for(let i = 1; i <= 8; i++){
        img = new Image();
        img.src = "./assets/sprites/imp/die" + i + ".png";
        this.dieArr.push(img);
    }
}

Imp.prototype.draw = function() {
    switch(true) {
        // case this.life <= 0:
            // this.game.ctx.drawImage(this.dieArr[this.frameIndexDie], this.x, this.y, this.w, this.h);
            // break;
        case this.impact:
            this.direction ? this.game.ctx.drawImage(this.impactRight, this.x, this.y, this.w, this.h) : this.game.ctx.drawImage(this.impactLeft, this.x, this.y, this.w, this.h);
            setTimeout(function(){
                this.impact = false;
            }.bind(this), 100);
            break;
        case this.vx < 0 || this.vx > 0:
            this.direction ? this.game.ctx.drawImage(this.imgMoveRight[Math.floor(this.frameIndex / 2)], this.x, this.y, this.w, this.h) : this.game.ctx.drawImage(this.imgMoveLeft[Math.floor(this.frameIndex / 2)], this.x, this.y, this.w, this.h);
            break;

    }
}

Imp.prototype.move = function() {
    switch(true) {
        case this.impact:
            this.vx = 0;
            break;
        case this.x > this.player.x + this.player.w:
            this.player.vx ? this.vx = -1 - this.player.vx : this.vx = -1
            break;
        case this.x + this.w < this.player.x:
            this.player.vx ? this.vx = 1 - this.player.vx : this.vx = 1;
            break;
        case this.x <= this.player.x + this.player.w -1 && this.x + this.w >= this.player.x + 1:
            this.vx = 0;
            // this.attack();
    }
    
    this.x >= this.player.x + this.player.w / 2 ? this.direction = false : this.direction = true;
    this.x += this.vx;
}

Imp.prototype.getsHit = function() {
    this.game.player.bullets.forEach(e => {
        e.x >= this.x && e.x <=  (this.x + this.w) ? (function() {
            this.impact = true;
        }).bind(this)() : 0;
        e.x === this.x ? this.life -= 50 : 0;
    });
}

//counter from 0 to 7, relying on game fps
Imp.prototype.imgfps = function() {
    this.game.frames % 9 === 0 ? this.frameIndex++ : 0;
    this.frameIndex === 8 ? this.frameIndex = 0 : 0;
}

// Imp.prototype.attack = function() {
//     this.x <= this.player.x + this.player.w && this.x >= this.player.x ? this.attacked = true : this.attacked = false;
// }