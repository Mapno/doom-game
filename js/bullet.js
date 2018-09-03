function Bullet(player, game, x, y) {
    this.player = player;
    this.game = game;
    this.x = x;
    this.y = y;
    this.r = 5;
    this.vx = 10;
    this.vy = 1;
    this.gravity = 0.25;
}

Bullet.prototype.draw = function() {
    this.game.ctx.beginPath();
    this.game.ctx.fillStyle = "red";
    this.game.ctx.arc(this.x, this.y, this.r, 0, Math.PI * 2);
    this.game.ctx.fill();
    this.game.ctx.closePath();
  }

Bullet.prototype.move = function() {
    this.player.vx > 0 ? this.vx += this.player.vx : 0;
    this.x += this.vx;
}