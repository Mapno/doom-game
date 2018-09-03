function Player(game) {

    this.x = 100;
    this.y = 200;
    this.game = game;
    this.vx = 0;
    this.vy = 0;
    this.frame = 0;

    this.eventListener();
}

Player.prototype.draw = function() {
    if(this.vx === 0){
        this.game.ctx.drawImage(this.imgStill, this.x, this.y + 5);
    } else if(this.vx > 0) {
        console.log(this.frame % 4);
        this.game.ctx.drawImage(this.imgMove[this.frame % 4], this.x, this.y);
    } else {
        this.game.ctx.drawImage(this.imgStill, this.x, this.y);
    }
    this.frame++;
}

Player.prototype.getImages = function() {
    this.imgStill = new Image();
    this.imgStill.src = "./assets/sprites/doom-guy/still.png";

    var img;
    this.imgMove = [];
    for(let i = 1; i <= 4; i++) {
        img = new Image();
        img.src = './assets/sprites/doom-guy/move' + i + '.png';
        this.imgMove.push(img);    }
}

const KEY_RIGHT = 39;
const KEY_LEFT = 37;

Player.prototype.move = function() {
    if(this.vx > 0) {
        this.x += this.vx;
        this.vx -= 1;
    };
    if(this.vx < 0) {
        this.x += this.vx;
        this.vx +=1;
    }
};

Player.prototype.eventListener = function() {
    document.onkeydown = function(e) {
        switch(e.keyCode) {
            case KEY_RIGHT:
                this.vx = 2;
                break;
            case KEY_LEFT:
                this.vx = -2;
                break;
        }
    }.bind(this);
}