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
const backgroundImage2 = new Image();
backgroundImage2.src = "sampleBackgroundVertical2.png";
const playerImage = new Image();
playerImage.src = "sampleShip.png";
// document.body.appendChild(backgroundImage);

let frame = 0;

const player = {
  x: CANVAS_SIZE / 2,
  y: CANVAS_SIZE / 2,
  size: 26,
  radius: 13,
  keys: [],
  lastProjectileFrame: 0,
  projectileCooldown: 10,
};

let entities = [];

startGame();

function startGame() {
  console.log("STARTGAME()");
  ctx.fillStyle = "black";
  animate();
  // // ctx.fillRect(0, 0, canvas.width, canvas.height);
  if (!interval) {
    interval = setInterval(() => {
      animate();
    }, 10);
  }
}

function animate() {
  // console.log("ANIMATE()");
  frame++;
  ctx.clearRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);

  processPlayerInput();
  drawBackground();
  entities = entities
    .map((entity) => {
      entity.move();
      return entity;
    })
    .filter((entity) => {
      return !entity.shouldBeRemoved();
    })
    .map((entity) => {
      entity.animate();
      return entity;
    });
  drawPlayer();
  // ctx.fillRect(50, 50, 50, 50);
  // requestAnimationFrame(animate);
  console.log(entities.length);
}

function processPlayerInput() {
  // console.log("pressedKeys", pressedKeys);

  // w // up
  if (pressedKeys[87] || pressedKeys[38]) player.y -= 1;
  // a // left
  if (pressedKeys[65] || pressedKeys[37]) player.x -= 1;
  // s // down
  if (pressedKeys[83] || pressedKeys[40]) player.y += 1;
  // d // right
  if (pressedKeys[68] || pressedKeys[39]) player.x += 1;
  // spacebar
  if (
    pressedKeys[32] &&
    frame - player.projectileCooldown > player.lastProjectileFrame
  ) {
    player.lastProjectileFrame = frame;
    entities.push(new Projectile(player.x, player.y, 5, 0, -5, ["enemy"]));
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
      2 * height - CANVAS_SIZE - frameOffset, //image Y (math to pick near bottom of image)
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
}

function drawPlayer() {
  const { x, y, size, radius } = player;
  const { height, width } = playerImage;
  ctx.drawImage(
    playerImage, // image
    0, //image X
    0, //image Y
    width, // image width
    height, // image height
    x - radius, // where on canvas
    y - radius, // where on canvas
    size, // w on canvas
    size // h on canvas
  );
  ctx.fillRect(x - 1, y - 1, 2, 2);
}

// function drawShapeAt(shape, color, x, y, sizeX, sizeY) {
//   ctx.fillStyle = color;
//   switch (shape) {
//     case "square":
//       ctx.fillRect(x, y, sizeX, sizeY);
//       break;
//     case "rectangle":
//       ctx.fillRect(x, y, sizeX, sizeY);
//       break;
//     case "triangle":
//       ctx.beginPath();
//       ctx.moveTo(x + sizeX / 2, sizeY);
//       ctx.lineTo(x + sizeX, y + sizeY);
//       ctx.lineTo(x, y + sizeY);
//       ctx.closePath();
//       ctx.fill();
//       break;
//     case "circle":
//       ctx.fill(x, y, sizeX, sizeY);
//       break;
//     case "hexagon":
//       ctx.fillRect(x, y, sizeX, sizeY);
//       break;
//   }
// }

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

class Projectile {
  collisions = 0;
  constructor(x, y, radius, vx, vy, collisionTags, collisionLimit = 1) {
    console.log(x, y, radius, vx, vy, collisionTags);
    this.x = x;
    this.y = y;
    this.radius = radius;
    this.vx = vx; // velocity x
    this.vy = vy; // velocity y
    this.collisionTags = collisionTags;
    this.collisionLimit = collisionLimit || 1;
  }
  move() {
    this.x += this.vx;
    this.y += this.vy;
    console.log("projectile moving", this.x, this.y);
  }
  checkForCollision(targetX, targetY) {
    let distance = determineDistanceBetweenPoints(
      this.x,
      this.y,
      targetX,
      targetY
    );
    let hasCollided = distance < this.radius;
    if (hasCollided) this.collisions++;
    return hasCollided;
  }
  shouldBeRemoved() {
    return (
      checkIfOffScreen(this.x, this.y) || this.collisions >= this.collisionLimit
    );
  }
  animate() {
    drawCircle(this.x, this.y, this.radius, "white", "black", 1);
  }
  checkCollision() {}
}

function determineDistanceBetweenPoints(x1, y1, x2, y2) {
  let a = x1 - x2,
    b = y1 - y2;
  return Math.sqrt(a * a + b * b);
}

function checkIfOffScreen(x, y) {
  if (x < 0 || y < 0 || x > CANVAS_WIDTH || y > CANVAS_HEIGHT) return true;
  return false;
}

function drawCircle(x, y, radius, fill, stroke, strokeWidth) {
  ctx.beginPath();
  ctx.arc(x, y, radius, 0, 2 * Math.PI, false);
  if (fill) {
    ctx.fillStyle = fill;
    ctx.fill();
  }
  if (stroke) {
    ctx.lineWidth = strokeWidth;
    ctx.strokeStyle = stroke;
    ctx.stroke();
  }
}
