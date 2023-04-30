import * as common from "./common-scripts.js";

let bgm = undefined;

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

let content = [];

let buttons = ["exit", "next_hat", "prev_hat", "next_upper", "prev_upper", "next_lower", "prev_lower", "next_shoe", "prev_shoe"];

let divs = ["hats", "uppers", "lowers", "shoes"];

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

async function fetchFiles(folder) {
  await fetch(`${folder}/files.json`)
  .then((response) => response.json())
  .then((json) => {
    console.log(json);
    json.files.forEach((file) => {
      content.push(folder + file);
    });
    console.log(content);
});
}

async function loadAssets() {
    await fetchFiles("../assets/");
    await fetchFiles("../assets/hats/boy/");
    await fetchFiles("../assets/hats/girl/");
    await fetchFiles("../assets/uppers/boy/");
    await fetchFiles("../assets/uppers/girl/");
    await fetchFiles("../assets/lowers/boy/");
    await fetchFiles("../assets/lowers/girl/");
    await fetchFiles("../assets/shoes/boy/");
    await fetchFiles("../assets/shoes/girl/");
    console.log("Loading files...")
    var preload = new createjs.LoadQueue(true);
    //This will trigger once as soon as the page is loaded.
    let count = 0;
    preload.loadManifest(content);
    preload.setMaxConnections(60);
    preload.on(
      "fileload",
      function () {
        count++;
        console.log("Files loaded: " + count);
      },
      this
    );
    preload.on("complete", load, this);
    console.log("Done!");    
}

function loadItem(item) {
  let character = localStorage.getItem("character");
  let img = document.getElementById(item);
  let num = 0;
  let data = undefined;
  switch (item) {
    case "hat": {
      data = hatsdata;
      num = hat;
      break;
    }
    case "upper": {
      data = upperdata;
      num = upper;
      let lowersdiv = document.getElementById("lowers");
      if (data[num].conflict === true) lowersdiv.style.display = "none";
      else lowersdiv.style.display = "block";
      break;
    }
    case "lower": {
      data = lowerdata;
      num = lower;
      break;
    }
    case "shoe": {
      data = shoesdata;
      num = shoes;
      break;
    }
    default: {
      break;
    }
  }
  img.src = `../assets/${item}s/${character}/${item}_${num}.avif`;
  img.style.top = data[num].top + "%";
  img.style.left = data[num].left + "%";
  img.style.right = data[num].right + "%";
  img.style.bottom = data[num].bottom + "%";
  img.style.width = data[num].width + "vmin";
  img.style.height = data[num].height;
  img.style.margin = "auto";
  img.style.position = "fixed";
}

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
  })
}

function setDisplay() {
  divs.forEach((div) => {
    let obj = document.getElementById(div);
    let next = obj.getElementsByClassName("next")[0];
    let prev = obj.getElementsByClassName("previous")[0];
    obj.onmouseover = function () {
      next.style.display = "block";
      prev.style.display = "block";
    };
    obj.onmouseout = function () {
      next.style.display = "none";
      prev.style.display = "none";
    };
  })
}

function load() {
  document.getElementById("loading").style.display = "none";
  common.unloadAllStyleSheets();
  common.loadStyleSheet("../assets/main-style.css");
  bgm = common.playMusic(`../assets/bgm.m4a`, true);
  document.getElementsByClassName("exit")[0].style.display = "inline-block";
  document.getElementById("field").style.display = "block";
  const menu = common.getElement("exit");
  menu.onclick = function () {
    common.playSound(`../assets/select.wav`);
    if (
      (upper === 0 && lower === 0) || (upper === 0 && lower !== 0) || (upper !== 0 && lower === 0 && upperdata[upper].conflict === false)
    ) {
      spawnTextBox(
        "../assets/card.avif",
        "2",
        "\n\n\nYou can't go out like this!",
        "3",
        "OK"
      );
    } else {
      common.goToScreen("results.html");
    }
  };
  setHover();
  setDisplay();
  let next_hat = document.getElementById("next_hat");
  next_hat.onclick = function () {
    common.playSound(`../assets/select.wav`);
    hat++;
    if (hat > totalhats) hat = 0;
    loadItem("hat");
  };
  let prev_hat = document.getElementById("prev_hat");
  prev_hat.onclick = function () {
    common.playSound(`../assets/select.wav`);
    hat--;
    if (hat < 0) hat = totalhats;
    loadItem("hat");
  };
  let next_upper = document.getElementById("next_upper");
  next_upper.onclick = function () {
    common.playSound(`../assets/select.wav`);
    upper++;
    if (upper > totaluppers) upper = 0;
    loadItem("upper");
  };
  let prev_upper = document.getElementById("prev_upper");
  prev_upper.onclick = function () {
    common.playSound(`../assets/select.wav`);
    upper--;
    if (upper < 0) upper = totaluppers;
    loadItem("upper");
  };
  let next_lower = document.getElementById("next_lower");
  next_lower.onclick = function () {
    common.playSound(`../assets/select.wav`);
    lower++;
    if (lower > totallowers) lower = 0;
    loadItem("lower");
  };
  let prev_lower = document.getElementById("prev_lower");
  prev_lower.onclick = function () {
    common.playSound(`../assets/select.wav`);
    lower--;
    if (lower < 0) lower = totallowers;
    loadItem("lower");
  };
  let next_shoe = document.getElementById("next_shoe");
  next_shoe.onclick = function () {
    common.playSound(`../assets/select.wav`);
    shoes++;
    if (shoes > totalshoes) shoes = 0;
    loadItem("shoe");
  };
  let prev_shoe = document.getElementById("prev_shoe");
  prev_shoe.onclick = function () {
    common.playSound(`../assets/select.wav`);
    shoes--;
    if (shoes < 0) shoes = totalshoes;
    loadItem("shoe");
  };
  spawnTextBox(
    "../assets/card.avif",
    "2",
    "\n\n\nWelcome!\nFeel free to choose any clothes you like!\nWho are you?",
    "2.5",
    "YesNo"
  );
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
        common.closeTextBox();
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
        common.closeTextBox();
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
        common.closeTextBox();
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

loadAssets();
