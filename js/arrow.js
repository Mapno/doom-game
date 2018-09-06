function Arrow(intro) {
    this.intro = intro;
    this.arrPostions = [this.intro.c.height / 2, this.intro.c.height / 1.5];
    this.i = 0;

    this.x = this.intro.c.width / 2.9;
    this.y = this.arrPostions[this.i % 2];
    this.img = new Image();
    this.img.src = "./assets/other/arrow.png";

}

Arrow.prototype.draw = function () {
    this.intro.ctx.drawImage(this.img, this.x, this.arrPostions[this.i % 2]);
};
