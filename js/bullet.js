function Bullet(player, game, x, y) {
    this.player = player;
    this.game = game;
    this.x = x;
    this.y = y;
    this.player.direction ? this.vx = 5 : this.vx = -5;
    this.r = 5;
    this.gravity = 0.25;
    this.w = 5;
    this.h = 1;
}

Bullet.prototype.draw = function () {
    this.game.ctx.beginPath();
    this.game.ctx.fillStyle = "white";
    this.game.ctx.rect(this.x, this.y, this.w, this.h);
    this.game.ctx.fill();
    this.game.ctx.closePath();
}

Bullet.prototype.move = function () {
    this.x += this.vx
}