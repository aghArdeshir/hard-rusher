import { Bullet } from './Bullet';
import { Canvas } from './Canvas';
import { colorPalette } from './color-palette';
import { Enemy } from './Enemy';
import { Player } from './Player';
import { getWindowHeight, getWindowWidth } from './window-dimensions';

document.body.style.margin = '0';
document.body.style.overflow = 'hidden';
document.body.style.backgroundColor = colorPalette.one;

const playerCanvas = new Canvas({ identifier: 'for-player' });
const bulletsCanvas = new Canvas({ identifier: 'for-bullets' });
const enemiesCanvas = new Canvas({ identifier: 'for-enemies' });

const windowWidth = getWindowWidth();
const windowHeight = getWindowHeight();

export const player = new Player(windowWidth / 2, windowHeight / 2);

const enemies = [
  new Enemy(100, 100, 50, 50, player),
  new Enemy(100, windowHeight - 100, 50, 50, player),
  new Enemy(windowWidth - 100, 100, 50, 50, player),
  new Enemy(windowWidth - 100, windowHeight - 100, 50, 50, player),
  new Enemy(windowWidth / 2, windowHeight - 100, 50, 50, player),
  new Enemy(windowWidth - 100, windowHeight / 2, 50, 50, player),
  new Enemy(windowWidth / 2, 100, 50, 50, player),
  new Enemy(100, windowHeight / 2, 50, 50, player),
];

function spawnEnemies() {
  const Coordinates = {
    x: Math.random() * windowWidth,
    y: Math.random() * windowHeight,
  };

  const distanceToPlayer = Math.sqrt(
    (Coordinates.x - player.x) ** 2 + (Coordinates.y - player.y) ** 2
  );

  if (distanceToPlayer < 200) {
    spawnEnemies();
  }

  const enemy = new Enemy(
    Math.random() * windowWidth,
    Math.random() * windowHeight,
    50,
    50,
    player
  );
  enemies.push(enemy);
}

setInterval(() => {
  spawnEnemies();
}, 1000);

const bullets: Bullet[] = [];

setInterval(() => {
  const bullet = new Bullet(player, enemies);
  bullets.push(bullet);
}, 1000);

function checkForCollisions() {
  enemies.forEach((enemy) => {
    bullets.forEach((bullet) => {
      if (
        bullet.x > enemy.x &&
        bullet.x < enemy.x + enemy.width &&
        bullet.y > enemy.y &&
        bullet.y < enemy.y + enemy.height
      ) {
        enemy.HP -= 1;
        bullets.splice(bullets.indexOf(bullet), 1);
      }
    });
  });
}

function checkForEnemyDeaths() {
  enemies.forEach((enemy) => {
    if (enemy.HP <= 0) {
      enemies.splice(enemies.indexOf(enemy), 1);
    }
  });
}

requestAnimationFrame(function gameLoop() {
  playerCanvas.clear();
  player.draw(playerCanvas.context);

  enemiesCanvas.clear();
  enemies.forEach((enemy) => {
    enemy.draw(enemiesCanvas.context);
  });

  bulletsCanvas.clear();
  bullets.forEach((bullet) => {
    if (bullet.isOffScreen()) {
      bullets.splice(bullets.indexOf(bullet), 1);
    }
    bullet.draw(bulletsCanvas.context);
  });

  checkForCollisions();
  checkForEnemyDeaths();

  requestAnimationFrame(gameLoop);
});
