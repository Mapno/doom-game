function Game() {
    this.c = document.getElementById("canvas");
    this.ctx = this.c.getContext("2d");
    this.background = new Background(this);
    this.player = new Player(this);
    this.frames = 0;
}

Game.prototype.start = function() {
    this.background.getImages();
    this.player.getImages();
    this.interval = setInterval(function(){
        this.clear();
        this.move();
        this.draw();
        this.frames++;
    }.bind(this), 100);
}

Game.prototype.move = function() {
    this.player.move();
}

Game.prototype.clear = function() {
    this.ctx.clearRect(0, 0, this.c.width, this.c.height);
};

Game.prototype.draw = function() {
    this.background.draw();
    this.player.draw();
}