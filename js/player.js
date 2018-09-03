function Player(game) {

    this.x = 100;
    this.y = 200;
    this.y0 = 200;
    this.game = game;
    this.vx = 0;
    this.vy = 0;
    this.frame = 0;

    this.eventListener();

    this.movements = {
        right: false,
        left: false,
        up: false
    };
}

Player.prototype.draw = function() {
    if(this.vx === 0){
        this.game.ctx.drawImage(this.imgStill, this.x, this.y);
    } else if(this.vx > 0) {
        this.game.ctx.drawImage(this.imgMoveRight[this.game.frames % 6], this.x, this.y);
    } else {
        this.game.ctx.drawImage(this.imgMoveLeft[this.game.frames % 4], this.x, this.y);
    }
    this.frame++;
}

Player.prototype.getImages = function() {
    this.imgStill = new Image();
    this.imgStill.src = "./assets/sprites/doom-guy/still.png";

    var img;
    this.imgMoveRight = [];
    for(let i = 1; i <= 6; i++) {
        img = new Image();
        img.src = './assets/sprites/doom-guy/right' + i + '.png';
        this.imgMoveRight.push(img);
    }
    this.imgMoveLeft = [];
    for(let i = 1; i <= 4; i++) {
        img = new Image();
        img.src = './assets/sprites/doom-guy/left' + i + '.png';
        this.imgMoveLeft.push(img);
    }
}

Player.prototype.move = function() {
    if(this.movements.right) {
        this.vx = 3;
        this.x += this.vx;
    } else if(this.movements.left) {
        this.vx = -3;
        this.x += this.vx;
    } else {
        this.vx = 0;
    }

    if (this.y >= this.y0) {
        this.y = this.y0;
      } else {
        this.y += this.vy;
      }

};

var gravity = 2   ;

Player.prototype.jump = function() {
    
    if (this.movements.up && this.y == this.y0) {
        this.vy = -14;
        this.y += this.vy;
    } else {
        this.vy += gravity;
    }
}

const KEY_RIGHT = 39;
const KEY_LEFT = 37;
const KEY_UP = 38;

Player.prototype.eventListener = function() {
    document.onkeydown = function(e) {
        switch(e.keyCode) {
            case KEY_RIGHT:
                this.movements.right = true;
                break;
            case KEY_LEFT:
                this.movements.left = true;
                break;
            case KEY_UP:
                this.movements.up = true;
                break;
        }
    }.bind(this);

    document.onkeyup = function() {
        for(let key in this.movements) {
            this.movements[key] = false;
        }
    }.bind(this);
}