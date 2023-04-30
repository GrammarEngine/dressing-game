import * as common from "./common-scripts.js";

function load() {
  common.loadStyleSheet(`../assets/menu-style.css`);
  const startButton = common.getElement("startbutton");
  const exitButton = common.getElement("exitbutton");
  startButton.onclick = function () {
    common.playSound(`../assets/select.wav`);
    localStorage.clear();
    common.goToScreen(`main.html`);
  };
  exitButton.onclick = function () {
    common.playSound(`../assets/select.wav`);
    common.exit();
  };
  startButton.onmouseover = function () {
    common.playSound(`../assets/hover.wav`);
    startButton.style.backgroundColor = "red";
  };
  startButton.onmouseout = function () {
    startButton.style.backgroundColor = "blueviolet";
  };
  exitButton.onmouseover = function () {
    common.playSound(`../assets/hover.wav`);
    exitButton.style.backgroundColor = "red";
  };
  exitButton.onmouseout = function () {
    exitButton.style.backgroundColor = "blueviolet";
  };
  common.playMusic(`../assets/menu_bgm.m4a`, true);
}

load();
