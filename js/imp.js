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
        case this.attacked:
            this.direction ? this.game.ctx.drawImage(this.attackRight[Math.floor(this.frameIndex / 4)], this.x, this.y, this.w, this.h) : this.game.ctx.drawImage(this.attackLeft[Math.floor(this.frameIndex / 4)], this.x, this.y, this.w, this.h)
            break;
        case this.vx < 0 || this.vx > 0:
            this.direction ? this.game.ctx.drawImage(this.imgMoveRight[Math.floor(this.frameIndex / 2)], this.x, this.y, this.w, this.h) : this.game.ctx.drawImage(this.imgMoveLeft[Math.floor(this.frameIndex / 2)], this.x, this.y, this.w, this.h);
            break;
            
    }
    console.log(this.life);
    console.log(this.player.life)
}

Imp.prototype.move = function() {
    switch(true) {
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
        case this.x <= this.player.x + this.player.w -1 && this.x + this.w >= this.player.x + 1 && this.y + this.h >= this.player.y:
            this.vx = -this.player.vx;
            this.attack();
    }
    this.x >= this.player.x + this.player.w / 2 ? this.direction = false : this.direction = true;
    this.x += this.vx;
}

Imp.prototype.getsHit = function() {
    this.game.player.bullets.forEach(function(e, i, arr) {
        e.x >= this.x && e.x <=  (this.x + this.w) ? (function() {
            arr.splice(i, 1);
            this.impact = true;
            this.life -= 50;
        }).bind(this)() : 0;
    }.bind(this));
}

//counter from 0 to 7, relying on game fps
Imp.prototype.imgfps = function() {
    this.game.frames % 9 === 0 ? this.frameIndex++ : 0;
    this.frameIndex === 8 ? this.frameIndex = 0 : 0;
}

Imp.prototype.attack = function() {
    this.attacked = true;
    this.game.frames % 50 === 0 ? this.player.life -= 10 : 0;
}

Imp.prototype.moving = function() {
    this.attacked = false;
}