function Arrow(intro) {
    this.arrPostions = [100, 200];
    this.i = 0;

    this.x = 200;
    this.y = this.arrPostions[this.i % 2];
    this.img = new Image();
    this.img.src = "./assets/other/arrow.png";

    this.intro = intro;
}

Arrow.prototype.draw = function () {
    this.intro.ctx.drawImage(this.img, this.x, this.arrPostions[this.i % 2]);
};
