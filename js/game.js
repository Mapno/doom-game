function Game() {
    this.c = document.getElementById("canvas");
    this.ctx = this.c.getContext("2d");
    this.background = new Background(this);
}

Game.prototype.start = function() {
    this.background.getBg();
    this.interval = setInterval(function(){
        this.background.draw()
    }.bind(this), 100);
}