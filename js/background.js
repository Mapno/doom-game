function Background(game, player) {
    this.bgFrames = [];
    this.x = 0;
    this.y = 0;
    this.game = game;
    this.player = player;
    this.vx = this.player.vx;
    this.frameIndex = 0;
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
    this.game.ctx.drawImage(this.bgFrames[this.frameIndex], this.x, this.y);
    this.game.ctx.drawImage(this.bgFrames[this.frameIndex], this.x + this.game.c.width, this.y);
    this.imgfps();
}

Background.prototype.move = function() {
    this.player.x >= this.player.x0 ? this.x -= this.player.vx : 0;

    this.x < -this.game.c.width || this.x > 0 ? this.x = 0 : 0;
    
}

Background.prototype.imgfps = function() {
    this.game.frames % 8 === 0 ? this.frameIndex++ : 0;
    this.frameIndex === 8 ? this.frameIndex = 0 : 0;
    
}
