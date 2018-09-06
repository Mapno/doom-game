function Platform(game, x, y) {
    this.game = game;
    this.x = x;
    this.y = y;
    this.w = this.game.c.width * 0.15;
    this.h = this.game.c.height * 0.02;


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