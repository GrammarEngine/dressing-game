import * as common from "./common-scripts.js";

let bgm = undefined;
let defaultbgm = undefined;

let money = 0;

let hat = 0;
let upper = 0;
let lower = 0;
let shoes = 0;

let totalhats = 15;
let totaluppers = 20;
let totallowers = 10;
let totalshoes = 1;

let hatsdata = undefined;
let upperdata = undefined;
let lowerdata = undefined;
let shoesdata = undefined;

function load() {
  common.loadStyleSheet("../assets/main-style.css");
  defaultbgm = new Audio(`../assets/bgm.m4a`);
  bgm = defaultbgm;
  bgm.loop = true;
  bgm.play();
  document.getElementsByClassName("exit")[0].style.display = "inline-block";
  document.getElementById("field").style.display = "block";
  const menu = common.getElement("exit");
  menu.onclick = function () {
    common.playSound(`../assets/select.wav`);
    if (money === 0)
      spawnTextBox(
        "../assets/card.avif",
        "2",
        "\n\n\nPlease stay in our shop for a bit!",
        "3",
        "OK"
      );
    else {
      localStorage.setItem("money", money);
      common.goToScreen("results.html");
    }
  };
  menu.onmouseover = function () {
    common.playSound(`../assets/hover.wav`);
    menu.style.backgroundColor = "red";
  };
  menu.onmouseout = function () {
    menu.style.backgroundColor = "blueviolet";
  };
  let hatsdiv = document.getElementById("hats");
  let uppersdiv = document.getElementById("uppers");
  let lowersdiv = document.getElementById("lowers");
  let shoesdiv = document.getElementById("shoes");
  hatsdiv.onmouseover = function () {
    next_hat.style.display = "block";
    prev_hat.style.display = "block";
  };
  uppersdiv.onmouseover = function () {
    next_upper.style.display = "block";
    prev_upper.style.display = "block";
  };
  lowersdiv.onmouseover = function () {
    next_lower.style.display = "block";
    prev_lower.style.display = "block";
  };
  shoesdiv.onmouseover = function () {
    next_shoe.style.display = "block";
    prev_shoe.style.display = "block";
  };
  hatsdiv.onmouseout = function () {
    next_hat.style.display = "none";
    prev_hat.style.display = "none";
  };
  uppersdiv.onmouseout = function () {
    next_upper.style.display = "none";
    prev_upper.style.display = "none";
  };
  lowersdiv.onmouseout = function () {
    next_lower.style.display = "none";
    prev_lower.style.display = "none";
  };
  shoesdiv.onmouseout = function () {
    next_shoe.style.display = "none";
    prev_shoe.style.display = "none";
  };
  let next_hat = document.getElementById("next_hat");
  next_hat.onclick = function () {
    let character = localStorage.getItem("character");
    common.playSound(`../assets/select.wav`);
    money = hat * 100;
    hat++;
    if (hat > totalhats) hat = 0;
    let img = document.getElementById("hat")
    img.src = `../assets/hats/${character}/hat_${hat}.avif`;
    //Load settings from data object.
    img.style.top = hatsdata[hat].top + "%";
    img.style.left = hatsdata[hat].left + "%";
    img.style.right = hatsdata[hat].right + "%";
    img.style.bottom = hatsdata[hat].bottom + "%";
    img.style.width = hatsdata[hat].width + "vmin";
    img.style.height = hatsdata[hat].height;
    img.style.margin = "auto";
    img.style.position = "fixed";
  };
  next_hat.onmouseover = function () {
    common.playSound(`../assets/hover.wav`);
    next_hat.style.backgroundColor = "red";
  };
  next_hat.onmouseout = function () {
    next_hat.style.backgroundColor = "blueviolet";
  };
  let prev_hat = document.getElementById("prev_hat");
  prev_hat.onclick = function () {
    let character = localStorage.getItem("character");
    common.playSound(`../assets/select.wav`);
    money = hat * 100;
    hat--;
    if (hat < 0) hat = totalhats;
    let img = document.getElementById("hat")
    img.src = `../assets/hats/${character}/hat_${hat}.avif`;
    //Load settings from data object.
    img.style.top = hatsdata[hat].top + "%";
    img.style.left = hatsdata[hat].left + "%";
    img.style.right = hatsdata[hat].right + "%";
    img.style.bottom = hatsdata[hat].bottom + "%";
    img.style.width = hatsdata[hat].width + "vmin";
    img.style.height = hatsdata[hat].height;
    img.style.margin = "auto";
    img.style.position = "fixed";
  };
  prev_hat.onmouseover = function () {
    common.playSound(`../assets/hover.wav`);
    prev_hat.style.backgroundColor = "red";
  };
  prev_hat.onmouseout = function () {
    prev_hat.style.backgroundColor = "blueviolet";
  };
  let next_upper = document.getElementById("next_upper");
  next_upper.onclick = function () {
    let character = localStorage.getItem("character");
    common.playSound(`../assets/select.wav`);
    money = upper * 100;
     upper++;
     if (upper > totaluppers) upper = 0;
    let img = document.getElementById("upper")
    img.src = `../assets/uppers/${character}/upper_${upper}.avif`;
    //Load settings from data object.
    img.style.top = upperdata[upper].top + "%";
    img.style.left = upperdata[upper].left + "%";
    img.style.right = upperdata[upper].right + "%";
    img.style.bottom = upperdata[upper].bottom + "%";
    img.style.width = upperdata[upper].width + "vmin";
    img.style.height = upperdata[upper].height;
    img.style.margin = "auto";
    img.style.position = "fixed";
    if (upperdata[upper].conflict === true) lowersdiv.style.display = "none";
    else lowersdiv.style.display = "block"
  };
  next_upper.onmouseover = function () {
    common.playSound(`../assets/hover.wav`);
    next_upper.style.backgroundColor = "red";
  };
  next_upper.onmouseout = function () {
    next_upper.style.backgroundColor = "blueviolet";
  };
  let prev_upper = document.getElementById("prev_upper");
  prev_upper.onclick = function () {
    let character = localStorage.getItem("character");
    common.playSound(`../assets/select.wav`);
    money = upper * 100;
    upper--;
    if (upper < 0) upper = totaluppers;
    let img = document.getElementById("upper")
    img.src = `../assets/uppers/${character}/upper_${upper}.avif`;
    //Load settings from data object.
    img.style.top = upperdata[upper].top + "%";
    img.style.left = upperdata[upper].left + "%";
    img.style.right = upperdata[upper].right + "%";
    img.style.bottom = upperdata[upper].bottom + "%";
    img.style.width = upperdata[upper].width + "vmin";
    img.style.height = upperdata[upper].height;
    img.style.margin = "auto";
    img.style.position = "fixed";
    if (upperdata[upper].conflict === true) lowersdiv.style.display = "none";
    else lowersdiv.style.display = "block"
  };
  prev_upper.onmouseover = function () {
    common.playSound(`../assets/hover.wav`);
    prev_upper.style.backgroundColor = "red";
  };
  prev_upper.onmouseout = function () {
    prev_upper.style.backgroundColor = "blueviolet";
  };
  let next_lower = document.getElementById("next_lower");
  next_lower.onclick = function () {
    let character = localStorage.getItem("character");
    common.playSound(`../assets/select.wav`);
    money = lower * 100;
    lower++;
    if (lower > totallowers) lower = 0;
    let img = document.getElementById("lower")
    img.src = `../assets/lowers/${character}/lower_${lower}.avif`;
    //Load settings from data object.
    img.style.top = lowerdata[lower].top + "%";
    img.style.left = lowerdata[lower].left + "%";
    img.style.right = lowerdata[lower].right + "%";
    img.style.bottom = lowerdata[lower].bottom + "%";
    img.style.width = lowerdata[lower].width + "vmin";
    img.style.height = lowerdata[lower].height;
    img.style.margin = "auto";
    img.style.position = "fixed";
  };
  next_lower.onmouseover = function () {
    common.playSound(`../assets/hover.wav`);
    next_lower.style.backgroundColor = "red";
  };
  next_lower.onmouseout = function () {
    next_lower.style.backgroundColor = "blueviolet";
  };
  let prev_lower = document.getElementById("prev_lower");
  prev_lower.onclick = function () {
    let character = localStorage.getItem("character");
    common.playSound(`../assets/select.wav`);
    money = lower * 100;
    lower--;
    if  (lower < 0) lower = totallowers;
    let img = document.getElementById("lower")
    img.src = `../assets/lowers/${character}/lower_${lower}.avif`;
    //Load settings from data object.
    img.style.top = lowerdata[lower].top + "%";
    img.style.left = lowerdata[lower].left + "%";
    img.style.right = lowerdata[lower].right + "%";
    img.style.bottom = lowerdata[lower].bottom + "%";
    img.style.width = lowerdata[lower].width + "vmin";
    img.style.height = lowerdata[lower].height;
    img.style.margin = "auto";
    img.style.position = "fixed";
  };
  prev_lower.onmouseover = function () {
    common.playSound(`../assets/hover.wav`);
    prev_lower.style.backgroundColor = "red";
  };
  prev_lower.onmouseout = function () {
    prev_lower.style.backgroundColor = "blueviolet";
  };
  let next_shoe = document.getElementById("next_shoe");
  next_shoe.onclick = function () {
    let character = localStorage.getItem("character");
    common.playSound(`../assets/select.wav`);
    money = shoes * 100;
    shoes++;
    if (shoes > totalshoes) shoes = 0;
    let img = document.getElementById("shoe")
    img.src = `../assets/shoes/${character}/shoe_${shoes}.avif`;
    //Load settings from data object.
    img.style.top = shoesdata[shoes].top + "%";
    img.style.left = shoesdata[shoes].left + "%";
    img.style.right = shoesdata[shoes].right + "%";
    img.style.bottom = shoesdata[shoes].bottom + "%";
    img.style.width = shoesdata[shoes].width + "vmin";
    img.style.height = shoesdata[shoes].height;
    img.style.margin = "auto";
    img.style.position = "fixed";
  };
  next_shoe.onmouseover = function () {
    common.playSound(`../assets/hover.wav`);
    next_shoe.style.backgroundColor = "red";
  };
  next_shoe.onmouseout = function () {
    next_shoe.style.backgroundColor = "blueviolet";
  };
  let prev_shoe = document.getElementById("prev_shoe");
  prev_shoe.onclick = function () {
    let character = localStorage.getItem("character");
    common.playSound(`../assets/select.wav`);
    money = shoes * 100;
    shoes--;
    if (shoes < 0) shoes = totalshoes;
    let img = document.getElementById("lower")
    img.src = `../assets/shoes/${character}/lower_${shoes}.avif`;
    //Load settings from data object.
    img.style.top = shoesdata[shoes].top + "%";
    img.style.left = shoesdata[shoes].left + "%";
    img.style.right = shoesdata[shoes].right + "%";
    img.style.bottom = shoesdata[shoes].bottom + "%";
    img.style.width = shoesdata[shoes].width + "vmin";
    img.style.height = shoesdata[shoes].height;
    img.style.margin = "auto";
    img.style.position = "fixed";
  };
  prev_shoe.onmouseover = function () {
    common.playSound(`../assets/hover.wav`);
    prev_shoe.style.backgroundColor = "red";
  };
  prev_shoe.onmouseout = function () {
    prev_shoe.style.backgroundColor = "blueviolet";
  };
  spawnTextBox(
    "../assets/card.avif",
    "2",
    "\n\n\nWelcome to the shop!\nWho would you like to dress?",
    "3",
    "YesNo"
  );
}

function fetchData(character) {
  fetch(`../assets/hats/${character}/hats.json`)
    .then((response) => response.json())
    .then((json) => {
      console.log(json);
      hatsdata = json;
    });
  fetch(`../assets/uppers/${character}/uppers.json`)
    .then((response) => response.json())
    .then((json) => {
      console.log(json);
      upperdata = json;
    });
  fetch(`../assets/lowers/${character}/lowers.json`)
    .then((response) => response.json())
    .then((json) => {
      console.log(json);
      lowerdata = json;
    });
  fetch(`../assets/shoes/${character}/shoes.json`)
    .then((response) => response.json())
    .then((json) => {
      console.log(json);
      shoesdata = json;
    });
}

function spawnTextBox(cardasset, scale, text, fontSize, buttontype) {
  common.playSound(`../assets/textbox.wav`);
  const cover = common.createElement("img", "cover", "cover", common.page);
  cover.style.zIndex = "97";
  cover.src = `../assets/cover.avif`;
  cover.style.width = "100%";
  cover.style.height = "100%";
  cover.style.position = "fixed";
  cover.style.top = "0";
  cover.style.left = "0";

  const card = common.createElement("img", "textcard", "textcard", common.page);
  card.src = `../assets/${cardasset}`;
  card.style.position = "absolute";
  card.style.zIndex = "98";
  card.style.scale = scale;

  const cardtext = common.createElement(
    "div",
    "cardtext",
    "cardtext",
    common.page
  );
  cardtext.innerText = text;
  cardtext.style.position = "absolute";
  cardtext.style.zIndex = "99";
  cardtext.style.fontSize = fontSize + "vmax";

  switch (buttontype) {
    case common.TextBoxButtonType.OK:
    case "OK":
      const OKButton = common.createElement("button", "OK", "OK", common.page);
      OKButton.innerText = "OK";
      OKButton.style.zIndex = "99";
      OKButton.onclick = function () {
        common.playSound(`../assets/select.wav`);
        closeTextBox();
      };
      OKButton.onmouseover = function () {
        common.playSound(`../assets/hover.wav`);
        OKButton.style.backgroundColor = "red";
      };
      OKButton.onmouseout = function () {
        OKButton.style.backgroundColor = "blueviolet";
      };
      break;
    case common.TextBoxButtonType.YesNo:
    case "YesNo":
      const YesButton = common.createElement(
        "button",
        "Yes",
        "Yes",
        common.page
      );
      YesButton.innerText = "A girl";
      YesButton.style.zIndex = "99";
      YesButton.onclick = function () {
        localStorage.setItem("character", "girl");
        common.playSound(`../assets/select.wav`);
        document.getElementById("hats").style.display = "block";
        document.getElementById("uppers").style.display = "block";
        document.getElementById("lowers").style.display = "block";
        document.getElementById("shoes").style.display = "block";
        fetchData("girl");
        closeTextBox();
      };
      YesButton.onmouseover = function () {
        document.getElementById("girl").style.display = "block";
        common.playSound(`../assets/hover.wav`);
        YesButton.style.backgroundColor = "red";
      };
      YesButton.onmouseout = function () {
        document.getElementById("girl").style.display = "none";
        YesButton.style.backgroundColor = "blueviolet";
      };
      const NoButton = common.createElement("button", "No", "No", common.page);
      NoButton.innerText = "A boy";
      NoButton.style.zIndex = "99";
      NoButton.onclick = function () {
        localStorage.setItem("character", "boy");
        common.playSound(`../assets/select.wav`);
        document.getElementById("hats").style.display = "block";
        document.getElementById("uppers").style.display = "block";
        document.getElementById("lowers").style.display = "block";
        document.getElementById("shoes").style.display = "block";
        fetchData("boy");
        closeTextBox();
      };
      NoButton.onmouseover = function () {
        document.getElementById("boy").style.display = "block";
        common.playSound(`../assets/hover.wav`);
        NoButton.style.backgroundColor = "red";
      };
      NoButton.onmouseout = function () {
        document.getElementById("boy").style.display = "none";
        NoButton.style.backgroundColor = "blueviolet";
      };
      break;
  }
}

function closeTextBox() {
  const cover = common.getElement("cover");
  const card = common.getElement("textcard");
  const cardtext = common.getElement("cardtext");
  const imagetext = common.getElement("imagetext");
  const OKButton = common.getElement("OK");
  const YesButton = common.getElement("Yes");
  const NOButton = common.getElement("No");
  const PlayAgain = common.getElement("PlayAgain");
  const cardimage = common.getElement("cardimage");
  if (cover) cover.remove();
  if (card) card.remove();
  if (cardtext) cardtext.remove();
  if (imagetext) imagetext.remove();
  if (OKButton) OKButton.remove();
  if (YesButton) YesButton.remove();
  if (NOButton) NOButton.remove();
  if (PlayAgain) PlayAgain.remove();
  if (cardimage) cardimage.remove();
  if (bgm.paused === true || bgm !== defaultbgm) setDefaultMusic();
}

load();
