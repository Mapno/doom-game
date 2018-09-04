function Game() {
    //get canvas obj
    this.c = document.getElementById("canvas");
    this.ctx = this.c.getContext("2d");

    //create instances for the elements of the game (bg, player & enemies)
    this.player = new Player(this, 100);
    this.background = new Background(this, this.player);
    this.imp = new Imp(this, this.player, 100);

    //frames counts every time the game executesj its main actions
    this.frames = 0;

    this.fps = 60;
}

Game.prototype.start = function() {

    this.fetch();

    this.interval = setInterval(function(){
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

