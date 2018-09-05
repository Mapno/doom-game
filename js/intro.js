function Intro(){
    this.c = document.getElementById("canvas");
    this.ctx = this.c.getContext("2d");

    
    this.bg = new Image();
    this.bg.src = "./assets/backgrounds/victorious-1.jpg";
    
    this.startGame = new Image();
    this.startGame.src = "./assets/other/start.png";
    
    this.credits = new Image();
    this.credits.src = "./assets/other/credits.png";
    
    this.eventListener();
    this.arrow = new Arrow(this);
}

Intro.prototype.draw = function() {
    this.drawBg();
    this.arrow.draw();
}

Intro.prototype.drawBg = function() {
    this.ctx.drawImage(this.bg, 0, 0, this.c.width, this.c.height);
    this.ctx.drawImage(this.startGame, 300, 100);
    this.ctx.drawImage(this.credits, 300, 200);
}

Intro.prototype.start = function() {
    this.interval = setInterval(function(){
        this.clear();
        this.draw();
    }.bind(this), 1000 / 60);
}

Intro.prototype.clear = function() {
    this.ctx.clearRect(0, 0, this.c.width, this.c.height);
};

const K_UP = 38;
const K_DOWN = 40;
const ENTER = 13;
Intro.prototype.eventListener = function() {
    document.onkeydown = function(e) {
        this.arrow.i % 2 === 0 && e.keyCode === ENTER ? this.newGame() : 0;
        switch(e.keyCode) {
            case K_UP:
                this.arrow.i++;
                break;
            case K_DOWN:
                this.arrow.i--;
                this.arrow.i < 0 ? this.arrow.i = 1 : 0;
        }
    }.bind(this)
};

Intro.prototype.newGame = function() {
    this.stop();
    var game = new Game(this);
    game.start();
}

Intro.prototype.stop = function() {
    clearInterval(this.interval);
}
