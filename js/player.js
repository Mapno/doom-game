function Player(game) {

    this.x = 100;
    this.y = 200;
    this.game = game;

}

Player.prototype.draw = function() {
    this.game.ctx.drawImage(this.imgStill, this.x, this.y);
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
    // console.log("al menos la llama");
    document.onkeydown = function(e) {
        console.log(e.keyCode);
        switch(e.keyCode) {
            case KEY_RIGHT:
            this.x += 10;
            case KEY_LEFT:
            this.x -= 10;
        }
    };
  };