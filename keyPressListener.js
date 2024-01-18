var pressedKeys = {};
window.onkeyup = function (e) {
  pressedKeys[e.keyCode] = false;
};
window.onkeydown = function (e) {
  pressedKeys[e.keyCode] = true;
};

export function checkPressedKey(key) {
  return pressedKeys[key];
}
