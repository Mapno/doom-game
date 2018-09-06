function Platform(game, x, y) {
    this.x = x;
    this.y = y;
    this.w = 120;
    this.h = 9;

    this.game = game;

    this.img = new Image();
    this.img.src = "./assets/backgrounds/platform.jpg";
}

Platform.prototype.draw = function() {
    this.move();
    this.game.ctx.drawImage(this.img, this.x, this.y, this.w, this.h);   
}

Platform.prototype.move = function() {
    this.x -= this.game.player.vx;
}