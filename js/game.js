function Game(intro) {
  this.intro = intro;
  this.c = this.intro.c;
  this.ctx = this.intro.ctx;

  this.k = 0;

  this.reset();

  this.enemyCounter = 0;

  // this.platformGenerator();
}

Game.prototype.start = function () {
  this.interval = setInterval(
    function () {
      this.kill();
      this.checkDead();
      // if (this.frames % 200 == 0) {
      //   if(this.enemyCounter < 8){this.enemyGenerator()};
      // }
      this.move();
      this.clear();
      this.draw();
      this.status();
      this.fpsFunction();
      this.getsHit();
      this.frames++;
      this.frames === 1000 ? (this.frames = 0) : 0;
    }.bind(this),
    1000 / this.fps
  );
};

//executes movements of all game elements (player & bullets, bg & enemies)
Game.prototype.move = function () {
  this.player.move();
  this.player.jump();
  this.background.move();
  this.enemyArr.forEach(e => {
    e.move();
  });
};

//clears the entire canvas before painting next frame
Game.prototype.clear = function () {
  this.ctx.clearRect(0, 0, this.c.width, this.c.height);
};

//draws all elements of the game (bg, player & enemies)
Game.prototype.draw = function () {
  this.background.draw();
  this.player.draw();
  this.enemyArr.forEach(e => {
    e.draw();
  });
  this.platformArray.forEach(e => {
    e.draw();
  })
};

//executes the frame counter for every element of game
Game.prototype.fpsFunction = function () {
  this.background.imgfps();
  this.player.imgfps();
  this.enemyArr.forEach(e => {
    e.imgfps();
  });
};

Game.prototype.checkDead = function () {
  this.player.life <= 0 ? this.player.dying() : 0;
  this.enemyArr.forEach(e => {
    e.life <= 0 ? e.dying() : 0;
  });
};

Game.prototype.kill = function () {
  this.enemyArr.forEach(function (e, i, arr) {
    e.frameDying === 8 ? arr.splice(i, 1) : 0;
  });
};

Game.prototype.win = function () {
  if (this.enemyArr.length === 0 && this.player.x >= this.background.flarex) {
      this.ctx.drawImage(this.victory, this.c.width / 2 - this.victory.width / 2, this.c.height / 2 - this.victory.height / 2);
      this.stop();
    }

};

Game.prototype.stop = function () {
  clearInterval(this.interval);
};

Game.prototype.status = function () {
  this.win();
  this.lose();
};

Game.prototype.reset = function () {
  //create instances for the elements of the game (bg, player & enemies)
  this.platformArray = [new Platform(this, this.c.width * 0.45, this.c.height * 0.55), new Platform(this, this.c.width * 0.65, this.c.height * 0.45), new Platform(this, this.c.width * 1.05, this.c.height * 0.55), new Platform(this, this.c.width * 1.55, this.c.height * 0.50), new Platform(this, this.c.width * 1.75, this.c.height * 0.35)];
  this.player = new Player(this, 100);
  this.background = new Background(this, this.player);
  this.enemyArr = [];
  // this.enemyArr.push(new Imp(this, 200, 700));
  this.enemyArr.push(new Sergeant(this, 200, 0));
  // this.enemyArr.push(new Sergeant(this, 200, 1));
  // this.enemyArr.push(new Sergeant(this, 200, 2));
  // this.enemyArr.push(new Sergeant(this, 200, 3));



  //frames counts every time the game executesj its main actions
  this.frames = 1;

  this.fps = 60;

  this.victory = new Image();
  this.victory.src = "./assets/other/victory.png";

  this.defeat = new Image();
  this.defeat.src = "./assets/other/defeat.png";
};

Game.prototype.lose = function () {
  if(this.player.frameDying === 8){
    this.ctx.drawImage(
      this.defeat,
      this.c.width / 2 - this.defeat.width / 2,
      this.c.height / 2 - this.defeat.height / 2
    );
    this.stop();
      // setTimeout(
      //   function() {
      //     if (confirm("Play Again?")) {
      //       this.intro.start();
      //     }
      //   }.bind(this),
      //   400
      // );
    };
};

Game.prototype.enemyGenerator = function () {
  this.enemyArr.push(new Imp(this, 200, this.generateRandom()));
  this.enemyCounter++;
};

Game.prototype.getsHit = function () {
  this.enemyArr.forEach(e => {
    e.getsHit();
  });
  this.player.getsHit();
};


Game.prototype.platformGenerator = function() {
  this.platformArray.push(new Platform(this, 400, 130));
};

Game.prototype.generateRandom = function() {
  let rand = Math.floor(Math.random() * 400 + this.player.x)
  if(rand >= this.player.x + 50 || rand <= this.player.x -50){
    return this.player.x + 300;
  } else {
    return rand;
  }
}