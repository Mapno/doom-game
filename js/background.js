function Background(game) {
    this.bgFrames = [];
    this.x = 0;
    this.y = 0;
    this.game = game;
    this.frame = 0;
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
    this.game.ctx.drawImage(this.bgFrames[this.frame % 8], 0, 0);
    // this.game.ctx.drawImage(this.bgFrames[this.frame % 8], this.x + this.game.canvas.width, this.y, this.game.canvas.width, this.game.canvas.height);

    this.frame++;

}