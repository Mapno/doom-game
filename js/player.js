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
    this.direction = true; //true -> right; false -> left
    this.shooted = false;

    this.bullets = [];

    this.eventListener();

    this.movements = {
        right: false,
        left: false,
        up: false,
        shoot: false
    };
}

Player.prototype.draw = function() {
    switch(true) {
        case this.shooted:
            this.direction ? this.game.ctx.drawImage(this.imgShootRight, this.x, this.y) : this.game.ctx.drawImage(this.imgShootLeft, this.x, this.y);
            setTimeout(function() {
                this.shooted = false;
            }.bind(this), 50);
            break;
        case this.vx < 0:
            this.game.ctx.drawImage(this.imgMoveLeft[this.game.frames % 4], this.x, this.y);
            break;
        case this.vx > 0:
            this.game.ctx.drawImage(this.imgMoveRight[this.game.frames % 6], this.x, this.y);
            break;
        case this.vx === 0:
            this.direction ? this.game.ctx.drawImage(this.imgStillRight, this.x, this.y) : this.game.ctx.drawImage(this.imgStillLeft, this.x, this.y);
    }

    this.bullets.forEach(function(e){
        e.draw();
    });
}

Player.prototype.getImages = function() {
    this.imgStillRight = new Image();
    this.imgStillRight.src = "./assets/sprites/doom-guy/stillRight.png";
    this.imgStillLeft = new Image();
    this.imgStillLeft.src = "./assets/sprites/doom-guy/stillLeft.png";

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

    this.imgShootRight = new Image();
    this.imgShootRight.src = "./assets/sprites/doom-guy/shootRight.png";
    this.imgShootLeft = new Image();
    this.imgShootLeft.src = "./assets/sprites/doom-guy/shootLeft.png";
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
                this.direction = true;
                break;
            case KEY_LEFT:
                this.movements.left = true;
                this.direction = false;
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
    var bullet;
    this.direction ? bullet = new Bullet(this, this.game, this.x + this.w, this.y + this.h / 2) : bullet = new Bullet(this, this.game, this.x - this.w, this.y + this.h / 2);
    this.shooted = true;
    this.bullets.push(bullet);
  };