function Background(game, player) {
    this.bgFrames = [];
    this.x = 0;
    this.y = 0;
    this.game = game;
    this.dx = 10;
    this.player = player;
}

Background.prototype.getImages = function () {
    var img;
    for (var i = 0; i < 8; i++) {
        img = new Image();
        img.src = './assets/backgrounds/hell-cave-frames/frame_' + i + '.gif';
        this.bgFrames.push(img);
    }
}

Background.prototype.draw = function () {
    this.game.ctx.drawImage(this.bgFrames[this.game.frames % 8], this.x, this.y);
    this.game.ctx.drawImage(this.bgFrames[this.game.frames % 8], this.x + this.game.c.width, this.y);


}

Background.prototype.move = function() {
    this.player.x >= this.player.x0 ? this.x -= this.player.vx : 0;

    this.x < -this.game.c.width || this.x > 0 ? this.x = 0 : 0;
    
}