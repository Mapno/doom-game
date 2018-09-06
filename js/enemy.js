function Enemy(game, life) {
    this.life = life;

    this.direction = false; //true -> right; false -> left

    this.impact = false; //properties to display correct frames
    this.dead = false;

    this.game = game; //fetch the game so it can paint on the canvas obj

    this.frameDying = 0;
}

Enemy.prototype.getsHit = function () {
    this.game.player.bullets.forEach(function (e, i, arr) {
        e.x >= this.x && e.x <= (this.x + this.w) && e.y <= this.y + this.h && e.y >= this.y && this.dead === false ? (function () {
            arr.splice(i, 1);
            this.impact = true;
            this.life -= 50;
        }).bind(this)() : 0;
    }.bind(this));
}

//counter from 0 to 7, relying on game fps
Enemy.prototype.imgfps = function () {
    this.game.frames % 9 === 0 ? this.frameIndex++ : 0;
    this.frameIndex === 8 ? this.frameIndex = 0 : 0;
}

Enemy.prototype.moving = function () {
    this.attacked = false;
}

Enemy.prototype.dying = function () {
    this.dead = true;
    this.game.frames % 10 === 0 ? this.frameDying++ : 0;
}