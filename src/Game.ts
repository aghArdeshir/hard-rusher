import { Bonus } from './Bonus';
import { Bullet } from './Bullet';
import { Enemy } from './Enemy';
import { Player } from './Player';
import { getWindowHeight, getWindowWidth } from './window-dimensions';

const windowWidth = getWindowWidth();
const windowHeight = getWindowHeight();

class Game {
  player: Player;
  enemies: Enemy[];
  bullets: Bullet[] = [];
  bonuses: Bonus[] = [];

  constructor() {
    this.player = new Player(windowWidth / 2, windowHeight / 2);
    this.enemies = [
      new Enemy(100, 100, 50, 50, this.player),
      new Enemy(100, windowHeight - 100, 50, 50, this.player),
      new Enemy(windowWidth - 100, 100, 50, 50, this.player),
      new Enemy(windowWidth - 100, windowHeight - 100, 50, 50, this.player),
      new Enemy(windowWidth / 2, windowHeight - 100, 50, 50, this.player),
      new Enemy(windowWidth - 100, windowHeight / 2, 50, 50, this.player),
      new Enemy(windowWidth / 2, 100, 50, 50, this.player),
      new Enemy(100, windowHeight / 2, 50, 50, this.player),
    ];

    this.initializeGame();
  }

  initializeGame() {
    setInterval(() => {
      this.spawnNewEnemy();
    }, 1000);

    setInterval(() => {
      this.checkForCollidingEnemies();
    }, 1000);
  }

  spawnNewEnemy() {
    const Coordinates = {
      x: Math.random() * windowWidth,
      y: Math.random() * windowHeight,
    };

    const distanceToPlayer = Math.sqrt(
      (Coordinates.x - this.player.x) ** 2 +
        (Coordinates.y - this.player.y) ** 2
    );

    if (distanceToPlayer < 200) {
      this.spawnNewEnemy();
      return;
    }

    const enemy = new Enemy(
      Math.random() * windowWidth,
      Math.random() * windowHeight,
      50,
      50,
      this.player
    );
    this.enemies.push(enemy);
  }

  checkForCollisions() {
    this.enemies.forEach((enemy) => {
      this.bullets.forEach((bullet) => {
        if (
          bullet.x > enemy.x &&
          bullet.x < enemy.x + enemy.width &&
          bullet.y > enemy.y &&
          bullet.y < enemy.y + enemy.height
        ) {
          enemy.HP -= 1;
          this.bullets.splice(this.bullets.indexOf(bullet), 1);
        }
      });
    });
  }

  checkForEnemyDeaths() {
    this.enemies.forEach((enemy) => {
      if (enemy.HP <= 0) {
        this.enemies.splice(this.enemies.indexOf(enemy), 1);
        this.bonuses.push(new Bonus(1, enemy));
      }
    });
  }

  checkForBonusPickups() {
    this.bonuses.forEach((bonus) => {
      if (
        this.player.x < bonus.x + bonus.width &&
        this.player.x + this.player.width > bonus.x &&
        this.player.y < bonus.y + bonus.height &&
        this.player.y + this.player.height > bonus.y
      ) {
        this.bonuses.splice(this.bonuses.indexOf(bonus), 1);
        this.player.bulletSpeed = Number(
          (this.player.bulletSpeed + 0.01).toFixed(2)
        );
        this.player.fireRate = Number((this.player.fireRate + 0.01).toFixed(2));
      }
    });
  }

  checkForPlayerAndEnemyCollisions() {
    this.enemies.forEach((enemy) => {
      if (
        this.player.x < enemy.x + enemy.width - 1 &&
        this.player.x + this.player.width > enemy.x - 1 &&
        this.player.y < enemy.y + enemy.height + 1 &&
        this.player.y + this.player.height > enemy.y - 1
      ) {
        if (enemy.isCollidingWithPlayer) {
          return;
        }
        enemy.isCollidingWithPlayer = true;
        enemy.HP -= this.player.bodyDamage;
        this.player.HP -= 1;
      } else {
        enemy.isCollidingWithPlayer = false;
      }
    });
  }

  checkForCollidingEnemies() {
    this.enemies.forEach((enemy) => {
      if (enemy.isCollidingWithPlayer) {
        enemy.HP -= this.player.bodyDamage;
        this.player.HP -= 1;
      }
    });
  }
}

export const game = new Game();
