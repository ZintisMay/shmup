export const images = {};
images.backgroundImage = getImage("sampleBackgroundVertical.png");
images.backgroundImage2 = getImage("sampleBackgroundVertical2.png");
images.playerImage = getImage("sampleShip.png");
images.enemyImage1 = getImage("sampleShip2.png");
images.enemyImage2 = getImage("./assets/ship1.png");

function getImage(file) {
  let i = new Image();
  i.src = file;
  return i;
}
