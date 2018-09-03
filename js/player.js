function Player(game) {

    this.x = 100;
    this.y = 210;
    this.y0 = this.y;
    this.x0 = this.x;
    this.game = game;
    this.vx = 0;
    this.vy = 0;
    this.w = 40;
    this.h = 54;

    this.bullets = [];

    this.eventListener();

    this.movements = {
        right: false,
        left: false,
        up: false
    };
}

Player.prototype.draw = function() {
    if(this.vx < 0 && this.y === this.y0){
        this.game.ctx.drawImage(this.imgMoveLeft[this.game.frames % 4], this.x, this.y);
    } else if(this.vx > 0 && this.y === this.y0) {
        this.game.ctx.drawImage(this.imgMoveRight[this.game.frames % 6], this.x, this.y);
    } else {
        this.game.ctx.drawImage(this.imgStill, this.x, this.y);

    }

    this.bullets.forEach(function(e){
        e.draw();
    });
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

Player.prototype.moveX = function() {
    if(this.movements.right) {
        this.vx = 8;
        this.x += this.vx;
    } else if(this.movements.left) {
        this.vx = -8;
        this.x += this.vx;
    } else {
        this.vx = 0;
    }

    // this.x <= 0 ? this.x == 0 : 0;
};

Player.prototype.moveY = function() {
    if (this.y >= this.y0) {
        this.y = this.y0;
      } else {
        this.y += this.vy;
      }
}

Player.prototype.move = function() {
    this.moveX();
    this.moveY();
    this.bullets.forEach(function(e, i, bullets){
        e.move();
        e.x >= e.game.c.width ? bullets.shift() : 0;
    });
}

var gravity = 2;

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
const SHIFT = 16;

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
            case SHIFT:
                this.shoot();
        }
    }.bind(this);

    document.onkeyup = function(e) {
        switch(e.keyCode) {
            case KEY_RIGHT:
                this.movements.right = false;
                break;
            case KEY_LEFT:
                this.movements.left = false;
                break;
            case KEY_UP:
                this.movements.up = false;
                break;
        }
    }.bind(this);
}


Player.prototype.shoot = function() {
    var bullet = new Bullet(this, this.game, this.x + this.w, this.y + this.h / 2);
  
    this.bullets.push(bullet);
  };