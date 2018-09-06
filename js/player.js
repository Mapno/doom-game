function Player(game, life) {
    //fetch the game so it can paint on the canvas obj
    this.game = game;
    //basic element positions and measurements
    this.x = 20;
    this.y = this.game.c.height * 0.63;
    this.y0 = this.y;
    this.x0 = this.x;
    this.w = this.game.c.width * 0.06;
    this.h = this.game.c.height * 0.10;

    this.life = life;

    this.getImages();

    this.dead = false;


    //player initial velocities
    this.vx = 0;
    this.vy = 0;

    this.direction = true; //true -> right; false -> left

    this.shooted = false; //variable that registers if playes has shooted so draw method paints shooting frame

    this.impact = false;

    //frameIndex is a frame counter which is slower than the base frame counter for the game
    this.frameIndex = 0;
    this.frameDying = 0;

    this.bullets = []; //array that stores the bullets the player shoots

    this.eventListener(); //this method is initalized when instance is created. creates the listeners for the keys events

    this.movements = {
        right: false,
        left: false,
        up: false,
        shoot: false
    }; //contains properties of player main actions initalized to 0. this resolves simultaneous actions problems and key input delay when key is hold
}

//draw method for player. case 1 -> shoot || case 2 -> still || case 3 -> move
//this.direction determines side player faces (left/right)
//delay is added for shoot for more fluent animation
Player.prototype.draw = function () {
    switch (true) {
        case this.dead && this.frameDying <= 7:
            this.game.ctx.drawImage(this.dieArr[this.frameDying], this.x, this.y + this.h - this.dieArr[this.frameDying].height, this.w * 0.70, this.dieArr[this.frameDying].height);
            break;
        case this.shooted:
            this.direction ? this.game.ctx.drawImage(this.imgShootRight, this.x, this.y, this.w, this.h) : this.game.ctx.drawImage(this.imgShootLeft, this.x, this.y, this.w, this.h);
            setTimeout(function () {
                this.shooted = false;
            }.bind(this), 50);
            break;
        case this.impact:
            this.direction ? this.game.ctx.drawImage(this.hitRight, this.x, this.y, this.w * 0.75, this.h) : this.game.ctx.drawImage(this.hitLeft, this.x, this.y, this.w * 0.75, this.h);
            setTimeout(function () {
                this.impact = false;
            }.bind(this), 100);
            break;
        case this.vx === 0 && this.life > 0:
            this.direction ? this.game.ctx.drawImage(this.imgStillRight, this.x, this.y, this.w, this.h) : this.game.ctx.drawImage(this.imgStillLeft, this.x, this.y, this.w, this.h);
            break;
        case this.life > 0:
            this.direction ? this.game.ctx.drawImage(this.imgMoveRight[this.frameIndex], this.x, this.y, this.w * 0.85, this.h) : this.game.ctx.drawImage(this.imgMoveLeft[this.frameIndex], this.x, this.y, this.w * 0.85, this.h);
    }

    this.drawBullets();
}

//calls bullet draw method
Player.prototype.drawBullets = function () {
    this.bullets.forEach(function (e) {
        e.draw();
    });
}

//gets images for player
Player.prototype.getImages = function () {
    //still imgs
    this.imgStillRight = new Image();
    this.imgStillRight.src = "./assets/sprites/doom-guy/stillRight.png";
    this.imgStillLeft = new Image();
    this.imgStillLeft.src = "./assets/sprites/doom-guy/stillLeft.png";

    //moving array imgs
    var img;
    this.imgMoveRight = [];
    for (let i = 1; i <= 6; i++) {
        img = new Image();
        img.src = './assets/sprites/doom-guy/right' + i + '.png';
        this.imgMoveRight.push(img);
    }
    this.imgMoveLeft = [];
    for (let i = 1; i <= 6; i++) {
        img = new Image();
        img.src = './assets/sprites/doom-guy/left' + i + '.png';
        this.imgMoveLeft.push(img);
    }

    //shoot imgs
    this.imgShootRight = new Image();
    this.imgShootRight.src = "./assets/sprites/doom-guy/shootRight.png";
    this.imgShootLeft = new Image();
    this.imgShootLeft.src = "./assets/sprites/doom-guy/shootLeft.png";

    this.dieArr = [];
    for (let i = 1; i <= 8; i++) {
        img = new Image();
        img.src = './assets/sprites/doom-guy/die' + i + '.png';
        this.dieArr.push(img);
    }

    this.hitRight = new Image();
    this.hitRight.src = "./assets/sprites/doom-guy/hitRight.png";
    this.hitLeft = new Image();
    this.hitLeft.src = "./assets/sprites/doom-guy/hitLeft.png";
}

//movement in x axis.
Player.prototype.moveX = function () {
    if (this.movements.right) {
        this.vx = 2;
        this.x += this.vx;
    } else if (this.movements.left) {
        this.x <= this.x0 ? this.vx = 0 : this.vx = -2; //stops player from moving left from where it spawned
        this.x += this.vx;
    } else {
        this.vx = 0;
    }
};

Player.prototype.moveY = function () {
    if (this.y >= this.y0) {
            this.y = this.y0
    } else {
        if(this.game.platformArray.some(function(e) {
            return this.x + this.w >= e.x &&
            this.x < (e.x + e.w) &&
            this.y + (this.h - 1) >= e.y &&
            this.y <= e.y + e.h &&
            this.vy >= 0;
        }.bind(this))) {
            this.canJump = true;
        } else {
        this.y += this.vy;
        }
    }
}

//executes movement for player and bullets. when bullets exit the canvas are eliminated
Player.prototype.move = function () {
    this.moveX();
    this.moveY();
    this.bullets.forEach(function (e, i, bullets) {
        e.move();
        e.x >= e.game.c.width || e.x <= 0 ? bullets.splice(i, 1) : 0;
    });
}

var gravity = 0.4;

//jumping method
Player.prototype.jump = function () {

    if (this.movements.up && (this.y == this.y0 || this.canJump)) {
        this.vy = -14;
        this.y += this.vy;
    } else {
        this.vy += gravity;
    }

    if(this.vy != 0) { this.canJump = false}
}

const KEY_RIGHT = 39;
const KEY_LEFT = 37;
const KEY_UP = 38;
const SHIFT = 16;

//method to listen to key inputs. sets action property to true until key is released
Player.prototype.eventListener = function () {
    document.onkeydown = function (e) {
        switch (e.keyCode) {
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

    document.onkeyup = function (e) {
        switch (e.keyCode) {
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


Player.prototype.shoot = function () {
    var bullet;
    this.direction ? bullet = new Bullet(this, this.game, this.x + this.w, this.y + this.h / 2.6) : bullet = new Bullet(this, this.game, this.x, this.y + this.h / 2.6);
    this.shooted = true;
    this.bullets.push(bullet);
};

//counter from 0 to 3, relying on game fps
Player.prototype.imgfps = function () {
    this.game.frames % 9 === 0 ? this.frameIndex++ : 0;
    this.frameIndex === 6 ? this.frameIndex = 0 : 0;

}

Player.prototype.dying = function () {
    this.dead = true;
    this.game.frames % 10 === 0 ? this.frameDying++ : 0;
}

Player.prototype.getsHit = function () {
    this.game.enemyArr.forEach(e => {
        if (e.bullets) {
            e.bullets.forEach((b, i, arr) => {
                if (b.x >= this.x && b.x <= (this.x + this.w) && b.y <= this.y + this.h && b.y >= this.y) {
                    arr.splice(i, 1);
                    this.impact = true;
                    this.life -= 40;
                }
            })
        
        // } else if(e.x <= this.x + this.w - 20 && e.x + e.w >= this.x + 20 && e.y + e.h >= this.y + 50) {
        //     this.impact = true;
        }
    })
}