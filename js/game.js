function Game() {
    //get canvas obj
    this.c = document.getElementById("canvas");
    this.ctx = this.c.getContext("2d");

    this.reset();
}

Game.prototype.start = function() {

    this.fetch();
    
    this.interval = setInterval(function(){
        this.kill();
        this.status();
        this.checkDead();
        this.clear();
        this.move();
        this.draw();
        this.fpsFunction();
        this.imp.getsHit();
        this.frames++;
        this.frames === 1000 ? this.frames = 0 : 0;
    }.bind(this), 1000 / this.fps);
}

//fetch gets the images for the constructors
Game.prototype.fetch = function() {
    this.background.getImages();
    this.player.getImages();
    this.imp.getImages();
}

//executes movements of all game elements (player & bullets, bg & enemies)
Game.prototype.move = function() {
    this.player.move();
    this.player.jump();
    this.background.move();
    this.imp.move();
}

//clears the entire canvas before painting next frame
Game.prototype.clear = function() {
    this.ctx.clearRect(0, 0, this.c.width, this.c.height);
};


//draws all elements of the game (bg, player & enemies)
Game.prototype.draw = function() {
    this.background.draw();
    this.player.draw();
    this.imp.draw();
}

//executes the frame counter for every element of game
Game.prototype.fpsFunction = function() {
    this.background.imgfps();
    this.player.imgfps();
    this.imp.imgfps();
}

Game.prototype.checkDead = function() {
    this.player.life <= 0 ? this.player.dying() : 0;
    this.imp.life <= 0 ? this.imp.dying() : 0;
}

Game.prototype.kill = function() {
    this.imp.frameDying === 8 ? delete this.imp : 0;
    this.player.frameDying === 8 ? delete this.player : 0;
}

Game.prototype.win = function() {
    this.imp ? 0 : (function() {this.ctx.drawImage(this.victory, this.c.width / 2 - this.victory.width / 2, this.c.height / 2 - this.victory.height / 2); this.stop()}).bind(this)();
}

// Game.prototype.lose = function() {
//     this.player ? 0 : (function() {this.ctx.drawImage(this.defeat, this.c.width / 2 - this.defeat.width / 2, this.c.height / 2 - this.defeat.height / 2); this.stop()}).bind(this)()
//     // confirm("GAME OVER. Play again?") ? (function() {this.reset();this.start()})() : 0;
// }

Game.prototype.stop = function() {
    clearInterval(this.interval);
}

Game.prototype.status = function() {
    this.win();
    this.lose();
}

Game.prototype.reset = function() {
    //create instances for the elements of the game (bg, player & enemies)
    this.player = new Player(this, 100);
    this.background = new Background(this, this.player);
    this.imp = new Imp(this, this.player, 100);

    //frames counts every time the game executesj its main actions
    this.frames = 0;

    this.fps = 60;

    this.victory = new Image();
    this.victory.src = "./assets/victory.png";

    this.defeat = new Image();
    this.defeat.src = "./assets/defeat.png";
}

Game.prototype.lose = function() {
    this.player ? 0 : (function() {this.ctx.drawImage(this.defeat, this.c.width / 2 - this.defeat.width / 2, this.c.height / 2 - this.defeat.height / 2); this.stop(); setTimeout(function(){if(confirm("Play Again?")){this.reset(); this.start()} }.bind(this), 100);
}).bind(this)()
  };
