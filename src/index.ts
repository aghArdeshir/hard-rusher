import { Bonus } from './Bonus';
import { Bullet } from './Bullet';
import { Canvas } from './Canvas';
import { colorPalette } from './color-palette';
import { Enemy } from './Enemy';
import { game } from './Game';
import { Player } from './Player';
import { getWindowHeight, getWindowWidth } from './window-dimensions';

document.body.style.margin = '0';
document.body.style.overflow = 'hidden';
document.body.style.backgroundColor = colorPalette.one;

const playerCanvas = new Canvas({ identifier: 'for-player' });
const bulletsCanvas = new Canvas({ identifier: 'for-bullets' });
const enemiesCanvas = new Canvas({ identifier: 'for-enemies' });

const keysPressed: string[] = [];

const handleKeyUp = (event: KeyboardEvent) => {
  const lastKeyIndex = keysPressed.findLastIndex((key) => key === event.key);
  if (lastKeyIndex !== -1) {
    keysPressed.splice(lastKeyIndex, 1);
  }
  setPlayerMovingDirection();
};

const handleKeyDown = (event: KeyboardEvent) => {
  if (keysPressed.includes(event.key)) {
    return;
  }

  switch (event.key) {
    case 'ArrowUp':
    case 'ArrowDown':
    case 'ArrowLeft':
    case 'ArrowRight':
      keysPressed.push(event.key);
      setPlayerMovingDirection();
  }
};

const setPlayerMovingDirection = () => {
  if (keysPressed.length === 0) {
    game.player.stopMoving();
    return;
  }

  const lastKey = keysPressed.at(-1);
  switch (lastKey) {
    case 'ArrowUp':
      game.player.setMoving('UP');
      break;
    case 'ArrowDown':
      game.player.setMoving('DOWN');
      break;
    case 'ArrowLeft':
      game.player.setMoving('LEFT');
      break;
    case 'ArrowRight':
      game.player.setMoving('RIGHT');
      break;
  }
};

window.addEventListener('keydown', handleKeyDown);
window.addEventListener('keyup', handleKeyUp);

requestAnimationFrame(function gameLoop() {
  playerCanvas.clear();
  game.player.draw(playerCanvas.context);

  enemiesCanvas.clear();
  game.enemies.forEach((enemy) => {
    enemy.draw(enemiesCanvas.context);
  });

  bulletsCanvas.clear();
  game.bullets.forEach((bullet) => {
    if (bullet.isOffScreen()) {
      game.bullets.splice(game.bullets.indexOf(bullet), 1);
    }
    bullet.draw(bulletsCanvas.context);
  });

  game.bonuses.forEach((bonus) => {
    bonus.draw(bulletsCanvas.context);
  });

  game.checkForCollisions();
  game.checkForEnemyDeaths();
  game.checkForBonusPickups();
  game.checkForPlayerAndEnemyCollisions();

  requestAnimationFrame(gameLoop);
});
