import { colorPalette } from "./color-palette";
import { Coordinates } from "./Coordinates";
import { Enemy } from "./Enemy";
import { Player } from "./Player";
import { getWindowHeight, getWindowWidth } from "./window-dimensions";

export class Bullet {
  x: number;
  y: number;
  width = 10;
  height = 10;
  color = colorPalette.three;
  speed = 1;

  constructor(player: Player, enemies: Enemy[]) {
    this.x = player.x + player.width / 2 - this.width / 2;
    this.y = player.y + player.height / 2 - this.height / 2;

    const target = this.findClosestEnemy(enemies, player);

    this.moveTowardsEnemy(target);
  }

  findClosestEnemy(enemies: Enemy[], player: Player): Coordinates {
    if (!enemies.length) {
      return {
        x: player.x + player.width / 2,
        y: 0,
      };
    }

    const targetEnemy = enemies.reduce((closestEnemy, enemy) => {
      if (closestEnemy === null) {
        return enemy;
      }

      const distanceToClosestEnemy = this.calculateDistance(closestEnemy);
      const distanceToEnemy = this.calculateDistance(enemy);

      if (distanceToEnemy < distanceToClosestEnemy) {
        return enemy;
      }

      return closestEnemy;
    });

    return {
      x: targetEnemy.x + targetEnemy.width / 2,
      y: targetEnemy.y + targetEnemy.height / 2,
    };
  }

  calculateDistance(target: Coordinates) {
    const xDistance = target.x - this.x;
    const yDistance = target.y - this.y;

    return Math.sqrt(xDistance ** 2 + yDistance ** 2);
  }

  moveTowardsEnemy(enemy: Coordinates) {
    const xDistance = enemy.x - this.x;
    const yDistance = enemy.y - this.y;
    const distance = this.calculateDistance(enemy);

    const xVelocity = xDistance / distance;
    const yVelocity = yDistance / distance;

    setInterval(() => {
      this.x += xVelocity * this.speed;
      this.y += yVelocity * this.speed;
    }, 1);
  }

  isOffScreen() {
    return (
      this.y < 0 ||
      this.y > getWindowHeight() ||
      this.x < 0 ||
      this.x > getWindowWidth()
    );
  }

  draw(context: CanvasRenderingContext2D) {
    context.fillStyle = this.color;
    context.fillRect(this.x, this.y, this.width, this.height);
  }
}
