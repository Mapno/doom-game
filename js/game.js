function Game() {
    this.c = document.getElementById("canvas");
    this.ctx = this.c.getContext("2d");
    this.player = new Player(this);
    this.background = new Background(this, this.player);
    this.imp = new Imp(this, this.player);
    this.frames = 0;
    this.frameIndex = 0;
}

Game.prototype.start = function() {
    this.fetch();
    this.interval = setInterval(function(){
        this.clear();
        this.move();
        this.draw();
        this.imp.getsHit();
        this.frames++;
        this.frames === 1000 ? this.frames = 0 : 0;
    }.bind(this), 1000 / 60);
}

Game.prototype.fetch = function() {
    this.background.getImages();
    this.player.getImages();
    this.imp.getImages();
}

Game.prototype.move = function() {
    this.player.move();
    this.player.jump();
    this.background.move();
    this.imp.move();
}

Game.prototype.clear = function() {
    this.ctx.clearRect(0, 0, this.c.width, this.c.height);
};

Game.prototype.draw = function() {
    this.background.draw();
    this.player.draw();
    this.imp.draw();
}

