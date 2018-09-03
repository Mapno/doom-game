function Bullet(player, game, x, y) {
    this.player = player;
    this.game = game;
    this.x = x;
    this.y = y;
    this.player.direction ? this.vx = 50 : this.vx = -50;
    this.r = 5;
    this.gravity = 0.25;
    // this.player.vx > 0 ? this.vx += this.player.vx : 0;
}

Bullet.prototype.draw = function() {
    this.game.ctx.beginPath();
    this.game.ctx.fillStyle = "grey";
    this.game.ctx.rect(this.x, this.y, 5, 1);
    this.game.ctx.fill();
    this.game.ctx.closePath();
  }

Bullet.prototype.move = function() {
    this.x += this.vx
}