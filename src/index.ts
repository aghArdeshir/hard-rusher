import { Canvas } from "./Canvas";
import { colorPalette } from "./color-palette";
import { Enemy } from "./Enemy";
import { player } from "./Player";

document.body.style.margin = "0";
document.body.style.overflow = "hidden";
document.body.style.backgroundColor = colorPalette.one;

const playerCanvas = new Canvas({ identifier: "for-player" });
const bulletsCanvas = new Canvas({ identifier: "for-bullets" });
const enemiesCanvas = new Canvas({ identifier: "for-enemies" });

const enemies = [
  new Enemy(100, 100, 50, 50, player),
  new Enemy(200, 200, 50, 50, player),
];

requestAnimationFrame(function gameLoop() {
  playerCanvas.clear();
  player.draw(playerCanvas.context);

  enemiesCanvas.clear();
  enemies.forEach((enemy) => {
    enemy.draw(enemiesCanvas.context);
  });

  requestAnimationFrame(gameLoop);
});
