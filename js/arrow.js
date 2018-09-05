function Arrow(intro) {
    this.arrPostions = [100, 200];
    this.i = 0;

    this.x = 200;
    this.y = this.arrPostions[this.i % 2];
    this.img = new Image();
    this.img.src = "./assets/other/arrow.png";
    // this.eventListener();

    this.intro = intro;

};

Arrow.prototype.draw = function() {
    this.intro.ctx.drawImage(this.img, this.x ,this.arrPostions[this.i % 2]);
};

// Arrow.prototype.move = function() {
    
// };


// const K_UP = 38;
// const K_DOWN = 40;
// Arrow.prototype.eventListener = function() {
//     document.onkeydown = function(e) {
//         console.log(e.keyCode)
//         switch(e.keyCode) {
//             case K_UP:
//                 this.i++;
//                 break;
//             case K_DOWN:
//                 this.i--;
//         }
//     }.bind(this);
// };
        