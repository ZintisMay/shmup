import { checkIfOffScreen, checkIfOnScreen, drawCircle } from "./helpers.js";
import { ctx } from "./canvas.js";

export class Entity {
  collisions = 0;
  tags = [];
  name = "Unnamed Entity";
  activeFrames = 0;
  hasBeenOnScreen = false;
  willBeRemoved = false;

  constructor(
    name,
    x,
    y,
    movementPattern,
    collisionTags,
    collisionEffect,
    radius,
    health,
    frame,
    animation
  ) {
    this.x = x;
    this.y = y;
    this.radius = radius;
    this.movementPattern = movementPattern;
    this.collisionTags = collisionTags;
    this.collisionEffect = collisionEffect;
    this.spawnFrame = frame;
    this.health = health;
    this.animation = animation;
    this.name = name;
  }

  willCollideWith(target) {
    return true;
  }

  animate() {
    this.activeFrames++;
    ctx.rect(
      this.x - this.radius,
      this.y - this.radius,
      this.radius * 2,
      this.radius * 2
    );
    if (this.hasCollided) {
      ctx.strokeStyle = "red";
    }
    ctx.stroke();
    this.animation(this.x, this.y, this.radius, "white", "black", 1);
  }

  move() {
    // console.log("move", checkIfOnScreen(this.x, this.y, this.radius));
    if (!this.hasBeenOnScreen && checkIfOnScreen(this.x, this.y, this.radius)) {
      this.hasBeenOnScreen = true;
    }
    this.movementPattern(this);
  }

  canCollideWith(entity) {
    // let collisionTags = entity.willCollideWith;
    if (this.collisionTags.includes(...entity.tags)) {
    }
  }

  getCollisionEffect() {
    return this.collisionEffect;
  }

  // collisionTags(entity) {
  //   console.log("collisionTags", entity.name);
  //   let incomingCollisionEffect = entity.getCollisionEffect();
  //   incomingCollisionEffect(this);
  // }

  performCollisionEffect(effect) {
    console.log(`${this.name} has received a collision effect`, effect);
    effect(this);
  }

  shouldBeRemoved() {
    return (
      this.health <= 0 ||
      (this.hasBeenOnScreen && checkIfOffScreen(this.x, this.y, this.radius)) ||
      this.collisions >= this.collisionLimit ||
      this.willBeRemoved
    );
  }

  collisionEffect() {
    console.log();
  }

  getCollisionEffect() {
    return this.collisionEffect;
  }
}

export class PlayerEntity extends Entity {
  projectileCooldown = 20;
  lastProjectileFrame = 0;
  name = "PlayerEntity";
  constructor(...args) {
    super(...args);
  }
  fireProjectile(frame) {
    this.lastProjectileFrame = frame;
    return new Projectile(this.x, this.y, 5, 0, -5, ["enemy"]);
  }
}

export class Projectile {
  collisions = 0;
  constructor(x, y, radius, vx, vy, allegiance, collisionLimit = 1) {
    this.x = x;
    this.y = y;
    this.radius = radius;
    this.vx = vx; // velocity x
    this.vy = vy; // velocity y
    this.allegiance = allegiance;
    this.collisionLimit = collisionLimit || 1;
  }
  move() {
    this.x += this.vx;
    this.y += this.vy;
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
