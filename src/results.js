import * as common from "./common-scripts.js";

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
  PlayAgain.onmouseover = function () {
    common.playSound(`../assets/hover.wav`);
    PlayAgain.style.backgroundColor = "red";
  };
  PlayAgain.onmouseout = function () {
    PlayAgain.style.backgroundColor = "blueviolet";
  };
  exitButton.onmouseover = function () {
    common.playSound(`../assets/hover.wav`);
    exitButton.style.backgroundColor = "red";
  };
  exitButton.onmouseout = function () {
    exitButton.style.backgroundColor = "blueviolet";
  };
  common.playSound(`../assets/victory.mp3`);
  let money = localStorage.getItem("money") || 0;
  let counter = document.getElementById("money");
  counter.innerHTML = money;
}

load();
