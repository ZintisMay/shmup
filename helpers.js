import { ctx, CANVAS_HEIGHT, CANVAS_WIDTH, CANVAS_SIZE } from "./canvas.js";
// export function drawTriangle(x, y, size) {
//   // let region = new Path2D();
// }

// export function drawT(ctx) {
//   ctx.beginPath();
//   ctx.moveTo(0, 0);
//   ctx.lineTo(0, 50);
//   ctx.lineTo(50, 50);
//   ctx.closePath();

//   // the outline
//   ctx.lineWidth = 1;
//   ctx.strokeStyle = "black";
//   ctx.stroke();

//   // the fill color
//   ctx.fillStyle = "red";
//   ctx.fill();
// }

export function determineDistanceBetweenPoints(x1, y1, x2, y2) {
  let a = x1 - x2,
    b = y1 - y2;
  return Math.sqrt(a * a + b * b);
}

export function checkIfOffScreen(x, y, radius) {
  return !!(
    x + radius < 0 ||
    y + radius < 0 ||
    x - radius > CANVAS_WIDTH ||
    y - radius > CANVAS_HEIGHT
  );
}

export function checkIfOnScreen(x, y, radius) {
  return !checkIfOffScreen(x, y, radius);
}

export function drawCircle(x, y, radius, fill, stroke, strokeWidth) {
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

export function checkForCollisions(entities) {
  for (let a = 0; a < entities.length; a++) {
    for (let b = a + 1; b < entities.length; b++) {
      let entityA = entities[a];
      let entityB = entities[b];
      let hasCollided = checkForEntityCollision(entityA, entityB);
      // @#@#@#

      if (!hasCollided) continue;
      console.log("found collision!", entityA.name, entityB.name);
      if (entityA.canCollideWith(entityB))
        entityA.performCollisionEffect(entityB.getCollisionEffect());
      if (entityB.canCollideWith(entityA))
        entityB.performCollisionEffect(entityA.getCollisionEffect());
    }
  }
}

export function checkForEntityCollision(entity1, entity2) {
  let { x: x1, y: y1, radius: r1 } = entity1;
  let { x: x2, y: y2, radius: r2 } = entity2;
  let distance = determineDistanceBetweenPoints(
    entity1.x,
    entity1.y,
    entity2.x,
    entity2.y
  );
  return distance < r1 + r2;
}

export function arrayIntersection(array1, array2) {
  let allItems = [...array1, ...array2];
  return allItems.filter((item, index) => allItems.includes(item, index + 1));
}
