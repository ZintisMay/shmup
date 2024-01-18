export function sampleAttackPattern() {
  console.log("sampleAttackPattern");
}

export function sampleMovementPattern(entity) {
  if (entity.activeFrames < 200) {
    entity.y += 1;
  } else if (entity.activeFrames < 600) {
    entity.x += 1;
  } else if (entity.activeFrames < 1000) {
    entity.x -= 1;
  } else if (entity.activeFrames < 2000) {
    entity.y -= 1;
  }
}

export function simpleMovementPattern(entity) {
  if (entity.y) entity.y += 1;
}
