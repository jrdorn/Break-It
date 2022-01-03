//keep track of brick count and parameters
export class Bricks {
  constructor() {
    this.brickRowCount = 6;
    this.brickColumnCount = 6;
    this.brickWidth = 30;
    this.brickHeight = 12;
    this.brickPadding = 5;
    this.brickOffsetLeft = 80;
    this.brickOffsetTop = 50;
    this.bricks = [];

    this.health3 = [
      "#f9524e",
      "#E68132",
      "#fdbb44",
      "#1eb955",
      "#22c1e0",
      "#BA38E0",
    ];

    this.health2 = [
      "#e03c31",
      "#ff7f41",
      "#f7ea48",
      "#2dc84d",
      "#147bd1",
      "#753bbd",
    ];

    this.health1 = [
      "#ff6663",
      "#feb144",
      "#fdfd97",
      "#99e09e",
      "#9ec1cf",
      "#cc99c9",
    ];
  }
  init() {
    //initialize brick rows and columns
    for (let c = 0; c < this.brickColumnCount; c++) {
      this.bricks[c] = [];
      for (let r = 0; r < this.brickRowCount; r++) {
        this.bricks[c][r] = {
          x: 0,
          y: 0,
          health: 3,
        };
      }
    }
  }
  updateStage(rows, cols) {
    //change number of brick rows and columns
    this.brickRowCount = rows;
    this.brickColumnCount = cols;
  }
}
