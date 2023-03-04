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

  constructor(player: Player, enemies: Enemy[]) {
    this.x = player.x;
    this.y = player.y;

    const target = this.findClosestEnemy(enemies);

    this.moveTowardsEnemy(target);
  }

  findClosestEnemy(enemies: Enemy[]): Coordinates {
    if (!enemies.length) {
      return {
        x: getWindowWidth() / 2,
        y: 0,
      };
    }

    return enemies.reduce((closestEnemy, enemy) => {
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
      this.x += xVelocity;
      this.y += yVelocity;
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
