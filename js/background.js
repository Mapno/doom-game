function Background(game, player) {
    //this array stores the frames that compose the bg gif
    this.bgFrames = [];

    //postions where bg is to be painted
    this.x = 0;
    this.y = 0;

    //fetch the game so it can paint on the canvas obj
    this.game = game;

    //fetch the player instance so bg moves based on the player movement & velocity
    this.player = player;
    this.vx = this.player.vx;

    //frameIndex is a frame counter which is slower than the base frame counter for the game. It counts up till 8, bc number of frames bg has
    this.frameIndex = 0;

    this.getImages();
}


//gets bg images and stores them in bgFrames array
Background.prototype.getImages = function () {
    let img;
    for (let i = 0; i < 8; i++) {
        img = new Image(); //img instance of Image obj needs to be created for every iteration of the loop
        img.src = './assets/backgrounds/hell-cave-frames/frame_' + i + '.gif'; //creates img obj with corresponding frame
        this.bgFrames.push(img);
    }
    this.health = new Image();
    this.health.src = "./assets/scoreboard/back.png";
    this.percentage = new Image();
    this.percentage.src = "./assets/scoreboard/percentage.png";
    this.numbers = [];
    for(let i = 0; i <= 9; i++){
        img = new Image();
        img.src = './assets/scoreboard/' + i + '.png';
        this.numbers.push(img);
    }

    this.flare = new Image();
    this.flare.src = './assets/backgrounds/flare.png';
    this.flarex = this.game.c.width * 1.85;

}

//draws the bg twice so it is continued when player moves and white canvas doesn't appear
Background.prototype.draw = function () {
    this.game.ctx.drawImage(this.bgFrames[this.frameIndex], this.x, this.y, this.game.c.width, this.game.c.height);
    this.game.ctx.drawImage(this.bgFrames[this.frameIndex], this.x + this.game.c.width, this.y, this.game.c.width, this.game.c.height);
    this.drawSb();
    this.drawElements();
}


//moves the bg according to player movement & velocity. when bg moves an entire game screen, it moves back to original position
Background.prototype.move = function () {
    this.player.x >= this.player.x0 ? this.x -= this.player.vx : 0;

    this.x < -this.game.c.width || this.x > 0 ? this.x = 0 : 0;

}

//counter from 0 to 7, relying on game fps
Background.prototype.imgfps = function () {
    this.game.frames % 8 === 0 ? this.frameIndex++ : 0;
    this.frameIndex === 8 ? this.frameIndex = 0 : 0;

}

Background.prototype.drawSb = function() {
    let healthy = this.game.player.life.toString();
    if(this.game.player.life < 0){ healthy = '00';}
    this.game.ctx.drawImage(this.health, 0, this.game.c.height - this.game.c.height * 0.15, this.game.c.width, this.game.c.height * 0.15);
    if(healthy == '100') {
        this.game.ctx.drawImage(this.numbers[1], this.game.c.width * (0.005 + 0.17), this.game.c.height * 0.87, this.game.c.width * 0.028, this.game.c.height * 0.075);
        this.game.ctx.drawImage(this.numbers[0], this.game.c.width * (0.036 + 0.17), this.game.c.height * 0.87, this.game.c.width * 0.035, this.game.c.height * 0.075);
        this.game.ctx.drawImage(this.numbers[0], this.game.c.width * (0.074 + 0.17), this.game.c.height * 0.87, this.game.c.width * 0.035, this.game.c.height * 0.075);
        // this.game.ctx.drawImage(this.percentage, this.game.c.width * (0.075 + 0.17), this.game.c.height * 0.87, this.game.c.width * 0.035, this.game.c.height * 0.075);


    } else if (healthy.length == 2){
        this.game.ctx.drawImage(this.numbers[parseInt(healthy[0])], this.game.c.width * (0.036 + 0.17), this.game.c.height * 0.87, this.game.c.width * 0.035, this.game.c.height * 0.075);
        this.game.ctx.drawImage(this.numbers[parseInt(healthy[1])], this.game.c.width * (0.074 + 0.17), this.game.c.height * 0.87, this.game.c.width * 0.035, this.game.c.height * 0.075);
        // this.game.ctx.drawImage(this.percentage, this.game.c.width * 0.078, this.game.c.height * 0.87, this.game.c.width * 0.035, this.game.c.height * 0.075);    
    } else {
        this.game.ctx.drawImage(this.numbers[parseInt(healthy[0])], this.game.c.width * (0.036 + 0.17), this.game.c.height * 0.87, this.game.c.width * 0.035, this.game.c.height * 0.075);
        // this.game.ctx.drawImage(this.percentage, this.game.c.width * 0.078, this.game.c.height * 0.87, this.game.c.width * 0.035, this.game.c.height * 0.075);    
    }
}

Background.prototype.drawElements = function() {
    this.game.ctx.drawImage(this.flare, this.flarex, this.game.c.height * 0.27);
    this.flarex -= this.game.player.vx;
}
