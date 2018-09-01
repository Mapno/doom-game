window.onload = function() {
    // var game = new Game("canvas");
    // game.draw();
    var bg = new Background();
    bg.getBg();
    // bg.start();
}

function Background() {
    this.c = document.getElementById("canvas");
    this.ctx = this.c.getContext("2d");
    this.bgFrames = [];
    this.x = 0;
    this.y = 0;
}

Background.prototype.getBg = function() {
    var img = new Image();
    for(var i = 0; i <8; i++) {
        img.src = './assets/backgrounds/hell-cave-frames/frame_' + i + '.gif';
        this.bgFrames.push(img);
    }
}

Background.prototype.start = function() {
    this.interval = setInterval(function() {
        // this.ctx.clearRect(0, 0, this.c.width, this.c.height);
        this.ctx.drawImage(this.bgFrames[this.x % 2],0,0);
        this.x++;
        console.log(this.x % 8);
    }.bind(this), 100)

}
