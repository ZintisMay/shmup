import { checkPressedKey } from "./keyPressListener.js";
import { images } from "./loadImages.js";
const { backgroundImage, backgroundImage2, playerImage, enemyImage1 } = images;
import { Entity, Projectile, PlayerEntity } from "./classes.js";
import {
  sampleAttackPattern,
  sampleMovementPattern,
  simpleMovementPattern,
} from "./behaviorPatterns.js";
import { ctx, CANVAS_HEIGHT, CANVAS_SIZE, CANVAS_WIDTH } from "./canvas.js";
import { checkForCollisions, drawCircle } from "./helpers.js";

let interval = null;
let frame = 0;
let entities = [];

startGame();

function startGame() {
  console.log("STARTGAME()");
  ctx.fillStyle = "black";

  let enemyEntity = new Entity(
    "generic",
    100,
    -50,
    sampleMovementPattern,
    ["player"],
    () => {
      console.log("enemy has collided with...");
    },
    30,
    1,
    frame,
    // animation function
    (...args) => {
      // console.log(args);
      return drawCircle(...args);
    }
  );

  const playerEntity = new PlayerEntity(
    "player",
    150,
    150,
    playerInputMovementPattern,
    ["enemy"],
    () => {
      console.log("player has collided with...");
    },
    13,
    100,
    frame,
    drawPlayerEntity
  );

  entities.push(playerEntity, enemyEntity);

  // animate();
  // // ctx.fillRect(0, 0, canvas.width, canvas.height);
  requestAnimationFrame(animate);
}

function animate() {
  // console.log("ANIMATE()");
  frame++;
  ctx.clearRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);

  // processPlayerInput();
  drawBackground();
  // Move all entities
  entities.forEach((entity) => entity.move());
  checkForCollisions(entities);
  // check for entity removal
  entities = entities.filter((entity) => {
    // console.log(!entity.shouldBeRemoved());
    return !entity.shouldBeRemoved();
  });
  // animate all entities
  // entities.forEach((entity) => entity.animate());
  for (let i = entities.length - 1; i >= 0; i--) {
    entities[i].animate();
  }

  if (frame < 20000) requestAnimationFrame(animate);
}

function playerInputMovementPattern() {
  // w // up
  if (checkPressedKey(87) || checkPressedKey(38)) this.y -= 1;
  // a // left
  if (checkPressedKey(65) || checkPressedKey(37)) this.x -= 1;
  // s // down
  if (checkPressedKey(83) || checkPressedKey(40)) this.y += 1;
  // d // right
  if (checkPressedKey(68) || checkPressedKey(39)) this.x += 1;
  // spacebar
  if (
    checkPressedKey(32) &&
    frame - this.projectileCooldown > this.lastProjectileFrame
  ) {
    let p = this.fireProjectile(frame);
    entities.push(p);
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

function drawPlayerEntity() {
  const { x, y, size, radius } = this;
  const { height, width } = playerImage;
  // console.log("drawPlayerEntity", this);

  ctx.fillStyle = "white";
  ctx.fillRect(x - radius, y - radius, radius * 2, radius * 2);
  ctx.fillStyle = "green";
  ctx.fillRect(x - 1, y - 1, 2, 2);
  ctx.strokeStyle = "black";
  ctx.stroke();
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
}
