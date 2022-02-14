//variables for screens and components to display
export class Displays {
  constructor() {
    //main screens
    this.startDisplay = document.querySelector("#start");
    this.winDisplay = document.querySelector("#win");
    this.loseDisplay = document.querySelector("#lose");

    //subcomponents
    this.slDisplay = document.querySelector("#scorelives");
    this.livesDisplay = document.querySelector("#lives");
  }
}
