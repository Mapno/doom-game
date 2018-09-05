function Enemy(game, player, life) {
    this.life = life;

    
    this.direction = false; //true -> right; false -> left
    
    this.player = player; //gets player so it can acces to its position and velocity
    
    this.impact = false; //properties to display correct frames
    this.dead = false;
    
    this.game = game; //fetch the game so it can paint on the canvas obj
    
    this.frameDying = 0;
}


Enemy.prototype.draw = function() {
    switch(true) {
        case this.dead && this.frameDying <= 7:
            this.game.ctx.drawImage(this.dieArr[this.frameDying], this.x, this.y + this.h - this.dieArr[this.frameDying].height);
            break;
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
            this.direction ? this.game.ctx.drawImage(this.moveRight[Math.floor(this.frameIndex / 2)], this.x, this.y, this.w, this.h) : this.game.ctx.drawImage(this.moveLeft[Math.floor(this.frameIndex / 2)], this.x, this.y, this.w, this.h);
            break;
            
    }
}

Enemy.prototype.getsHit = function() {
    this.game.player.bullets.forEach(function(e, i, arr) {
        e.x >= this.x && e.x <=  (this.x + this.w) && e.y <= this.y + this.h && e.y >= this.y ? (function() {
            arr.splice(i, 1);
            this.impact = true;
            this.life -= 50;
        }).bind(this)() : 0;
    }.bind(this));
}

//counter from 0 to 7, relying on game fps
Enemy.prototype.imgfps = function() {
    this.game.frames % 9 === 0 ? this.frameIndex++ : 0;
    this.frameIndex === 8 ? this.frameIndex = 0 : 0;
}

Enemy.prototype.attack = function() {
    this.attacked = true;
    this.game.frames % 50 === 0 ? this.player.life -= 50 : 0;
}

Enemy.prototype.moving = function() {
    this.attacked = false;
}

Enemy.prototype.dying = function() {
    this.dead = true;
    this.game.frames % 10 === 0 ? this.frameDying++ : 0;
}