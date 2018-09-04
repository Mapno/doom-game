function Imp(game, player, life) {
    this.x = 650;
    this.y = 210;
    this.direction = false; //true -> right; false -> left
    this.player = player;
    this.vx = -1;
    this.w = 38;
    this.h = 51;
    this.impact = false;
    this.frameIndex = 0;
    this.life = life;
    this.dead = false;
    this.frameIndexDie = 0;
    // this.attacked = false;

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

    this.attackLeft = [];
    for(let i = 1; i <= 2; i++) {
        img = new Image();
        img.src = "./assets/sprites/imp/attackLeft" + i + ".png";
        this.attackLeft.push(img);
    }

    this.dieArr = [];
    for(let i = 1; i <= 8; i++){
        img = new Image();
        img.src = "./assets/sprites/imp/die" + i + ".png";
        this.dieArr.push(img);
    }


}

Imp.prototype.draw = function() {
    switch(true) {
        case this.life <= 0:
            this.game.ctx.drawImage(this.dieArr[this.frameIndexDie], this.x, this.y, this.w, this.h);
            break;
        case this.impact:
            this.direction ? this.game.ctx.drawImage(this.impactRight, this.x, this.y, this.w, this.h) : this.game.ctx.drawImage(this.impactLeft, this.x, this.y, this.w, this.h);
            setTimeout(function(){
                this.impact = false;
            }.bind(this), 100);
            break;
        case true:
            this.direction ? this.game.ctx.drawImage(this.imgMoveRight[Math.floor(this.frameIndex / 2)], this.x, this.y, this.w, this.h) : this.game.ctx.drawImage(this.imgMoveLeft[Math.floor(this.frameIndex / 2)], this.x, this.y, this.w, this.h);
            break;

    }
}

Imp.prototype.move = function() {
    switch(true){
        case this.impact:
            this.vx = 0;
            break;
        case this.x < this.player.x + this.player.w / 2 && this.x > this.player.x + this.player.w / 9:
            this.vx = 0;
            break;
        case this.x > this.player.x + this.player.w:
            this.player.vx ? this.vx = -1 - this.player.vx : this.vx = -1
            break;
        case this.x < this.player.x:
            this.player.vx ? this.vx = 1 - this.player.vx : this.vx = 1
    }
    this.player.x < this.x ? this.direction = false : this.direction = true;
    this.x += this.vx;
}

Imp.prototype.getsHit = function() {
    this.game.player.bullets.forEach(e => {
        e.x >= this.x && e.x <=  (this.x + this.w) ? (function() {
            this.impact = true;
            this.diefps();
        }).bind(this)() : 0;
        e.x === this.x ? this.life -= 50 : 0;
    });
}

Imp.prototype.imgfps = function() {
    this.game.frames % 9 === 0 ? this.frameIndex++ : 0;
    this.frameIndex === 8 ? this.frameIndex = 0 : 0;
}

// Imp.prototype.attack = function() {
//     this.x <= this.player.x + this.player.w && this.x >= this.player.x ? this.attacked = true : this.attacked = false;
// }