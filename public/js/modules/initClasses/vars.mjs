//keep track of variables for canvas and canvas elements
export class Vars {
  constructor() {
    //score and lives
    this.myScore = document.querySelector("#score");
    this.myLives = document.querySelector("#hearts");

    //render canvas
    this.canvas = document.querySelector("canvas");
    this.canvas.width = 400;
    this.canvas.height = 250;
    this.ctx = this.canvas.getContext("2d");

    //color scheme
    this.itemColor = "#6c9950"; //green
    this.brokenColor1 = "#509199"; //xxxx to display when brick hit once
    this.brokenColor2 = "#7D5099"; //xxxx to display when brick hit twice

    ////////////////////
    this.b1r = "#f9524e";
    this.b1o = "#fdaf45";
    this.b1y = "#fdbb44";
    this.b1g = "#1eb955";
    this.b1b = "#22c1e0";
    this.b1v = "#BA38E0";

    this.b2r = "#e03c31";
    this.b2o = "#ff7f41";
    this.b2y = "#f7ea48";
    this.b2g = "#2dc84d";
    this.b2b = "#147bd1";
    this.b2v = "#753bbd";

    this.b3r = "#ff6663";
    this.b3o = "#feb144";
    this.b3y = "#fdfd97";
    this.b3g = "#99e09e";
    this.b3b = "#9ec1cf";
    this.b3v = "#cc99c9";

    ////////////////////

    //paddle
    this.paddleHeight = 10;
    this.paddleWidth = 60;
    this.paddleX = (this.canvas.width - this.paddleWidth) / 2; // x coordinates of paddle
    this.rightPressed = false;
    this.leftPressed = false;

    //ball
    this.ballRadius = 15;
    this.x = this.canvas.width / 2; //x coordinates of ball
    this.y = this.canvas.height - 30; //y coordinates of ball
    this.dx = 3;
    this.dy = -3;
  }
}
