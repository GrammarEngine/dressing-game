import * as common from "./common-scripts.js";

let buttons = ["playagain", "exitbutton"];

function setHover() {
  buttons.forEach((button) => {
    console.log(button);
    let btn = common.getElement(button);
    btn.onmouseover = function () {
      common.playSound(`../assets/hover.wav`);
      btn.style.backgroundColor = "red";
    };
    btn.onmouseout = function () {
      btn.style.backgroundColor = "blueviolet";
    };
  });
}

function load() {
  common.loadStyleSheet(`../assets/results-style.css`);
  const PlayAgain = common.getElement("playagain");
  PlayAgain.onclick = function () {
    localStorage.clear();
    common.playSound(`../assets/select.wav`);
    common.goToScreen(`main.html`);
  };
  const exitButton = common.getElement("exitbutton");
  exitButton.onclick = function () {
    common.playSound(`../assets/select.wav`);
    common.goToScreen(`menu.html`);
  };
  setHover();
  common.playSound(`../assets/victory.mp3`);
  let character = localStorage.getItem("result");
  let score = document.getElementById("score");
  score.innerHTML = character;
}

load();
