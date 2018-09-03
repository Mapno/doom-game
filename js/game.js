function Game() {
    this.c = document.getElementById("canvas");
    this.ctx = this.c.getContext("2d");
    this.background = new Background(this);
    this.player = new Player(this);
}

Game.prototype.start = function() {
    this.background.getImages();
    this.player.getImages();
    this.interval = setInterval(function(){
        this.player.move();
        this.background.draw();
        this.player.draw();
    }.bind(this), 100);
}

Game.prototype.move = function() {
    this.player.move();
}