var pressedKeys = {};
window.onkeyup = function (e) {
  pressedKeys[e.keyCode] = false;
};
window.onkeydown = function (e) {
  pressedKeys[e.keyCode] = true;
};

const canvas = document.getElementById("gameCanvas");
const CANVAS_SIZE = canvas.width;
canvas.width = CANVAS_SIZE;
canvas.height = CANVAS_SIZE;
const ctx = canvas.getContext("2d");
const CANVAS_WIDTH = CANVAS_SIZE;
const CANVAS_HEIGHT = CANVAS_SIZE;

let interval = null;

console.log("CANVAS_SIZE", CANVAS_SIZE);
console.log("CANVAS_WIDTH", CANVAS_WIDTH);
console.log("CANVAS_HEIGHT", CANVAS_HEIGHT);

const backgroundImage = new Image();
backgroundImage.src = "sampleBackgroundVertical.png";
const playerImage = new Image();
playerImage.src = "sampleShip.png";
// document.body.appendChild(backgroundImage);

let frame = 0;

let player = {
  x: CANVAS_SIZE / 2,
  y: CANVAS_SIZE / 2,
  size: 26,
  keys: [],
};

startGame();

function startGame() {
  console.log("STARTGAME()");
  ctx.fillStyle = "black";
  animate();
  // // ctx.fillRect(0, 0, canvas.width, canvas.height);
  // if (!interval) {
  //   interval = setInterval(() => {
  //     animate();
  //   }, 1);
  // }
}

function animate() {
  // console.log("ANIMATE()");
  frame++;
  ctx.clearRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);

  processPlayerInput();
  drawBackground();
  drawPlayer();
  // ctx.fillRect(50, 50, 50, 50);
  requestAnimationFrame(animate);
}

function processPlayerInput() {
  console.log("pressedKeys", pressedKeys);
  if (pressedKeys[87]) {
    player.y -= 1;
  }
  if (pressedKeys[83]) {
    player.y += 1;
  }
  if (pressedKeys[65]) {
    player.x -= 1;
  }
  if (pressedKeys[68]) {
    player.x += 1;
  }
}

function drawBackground() {
  const { height } = backgroundImage;
  const frameOffset = frame % height;

  // draw looping image
  if (height - frameOffset < CANVAS_SIZE) {
    ctx.drawImage(
      backgroundImage, // image

      0, //image X
      height - frameOffset, //image Y (math to pick near bottom of image)
      CANVAS_SIZE, // image ending X
      CANVAS_SIZE, // image ending Y

      0, //canvas x
      0, // canvas y
      CANVAS_SIZE, // canvas ending x
      CANVAS_SIZE // canvas ending y
    );
  }

  // draw main image
  ctx.drawImage(
    backgroundImage, // image
    0, //image X
    height - CANVAS_SIZE - frameOffset, //image Y (math to pick near bottom of image)
    CANVAS_SIZE, // image ending X
    CANVAS_SIZE, // image ending Y
    0, //canvas x
    0, // canvas y
    CANVAS_SIZE, // canvas ending x
    CANVAS_SIZE // canvas ending y
  );

  ctx.fillRect(0, height - frameOffset, CANVAS_SIZE, 1);
}

function drawPlayer() {
  const { x, y, size } = player;
  const { height, width } = playerImage;
  ctx.drawImage(
    playerImage, // image
    0, //image X
    0, //image Y
    width,
    height,
    x - size / 2,
    y - size / 2,
    size,
    size
  );
  ctx.fillRect(x - 1, y - 1, 2, 2);
}

function drawShapeAt(shape, color, x, y, sizeX, sizeY) {
  ctx.fillStyle = color;
  switch (shape) {
    case "square":
      ctx.fillRect(x, y, sizeX, sizeY);
      break;
    case "rectangle":
      ctx.fillRect(x, y, sizeX, sizeY);
      break;
    case "triangle":
      ctx.beginPath();
      ctx.moveTo(x + sizeX / 2, sizeY);
      ctx.lineTo(x + sizeX, y + sizeY);
      ctx.lineTo(x, y + sizeY);
      ctx.closePath();
      ctx.fill();
      break;
    case "circle":
      ctx.fill(x, y, sizeX, sizeY);
      break;
    case "hexagon":
      ctx.fillRect(x, y, sizeX, sizeY);
      break;
  }
}

function drawTriangle(x, y, size) {
  // let region = new Path2D();
}

function drawT() {
  ctx.beginPath();
  ctx.moveTo(0, 0);
  ctx.lineTo(0, 50);
  ctx.lineTo(50, 50);
  ctx.closePath();

  // the outline
  ctx.lineWidth = 1;
  ctx.strokeStyle = "black";
  ctx.stroke();

  // the fill color
  ctx.fillStyle = "red";
  ctx.fill();
}

// Key listeners

// // Add Keys to player keys
// document.addEventListener("keydown", function ({ key }) {
//   console.log(key, player.keys);
//   switch (key) {
//     case "ArrowUp":
//     case "w":
//       !player.keys.includes(DIR.UP) && player.keys.push(DIR.UP);
//       break;
//     case "ArrowLeft":
//     case "a":
//       !player.keys.includes(DIR.LEFT) && player.keys.push(DIR.LEFT);
//       break;
//     case "ArrowRight":
//     case "d":
//       !player.keys.includes(DIR.RIGHT) && player.keys.push(DIR.RIGHT);
//       break;
//     case "ArrowDown":
//     case "s":
//       !player.keys.includes(DIR.DOWN) && player.keys.push(DIR.DOWN);
//       break;
//   }
// });

// function processKeyup() {}

// // Remove Keys from player keys
// document.addEventListener("keyup", function ({ key }) {
//   console.log(key, player.keys);
//   switch (key) {
//     case "ArrowUp":
//     case "w":
//       player.keys = player.keys.filter((dir) => dir === DIR.UP);
//       break;
//     case "ArrowLeft":
//     case "a":
//       player.keys = player.keys.filter((dir) => dir === DIR.LEFT);
//       break;
//     case "ArrowRight":
//     case "d":
//       player.keys = player.keys.filter((dir) => dir === DIR.RIGHT);
//       break;
//     case "ArrowDown":
//     case "s":
//       player.keys = player.keys.filter((dir) => dir === DIR.DOWN);
//       break;
//   }
// });
