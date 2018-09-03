function Background(game) {
    this.bgFrames = [];
    this.x = 0;
    this.y = 0;
    this.game = game;
}

Background.prototype.getBg = function() {
    var img;
    for(var i = 0; i <8; i++) {
        img = new Image();
        img.src = './assets/backgrounds/hell-cave-frames/frame_' + i + '.gif';
        this.bgFrames.push(img);
    }
}

Background.prototype.draw = function() {        
    this.game.ctx.drawImage(this.bgFrames[this.x % 8],0,0);
    this.x++;

}