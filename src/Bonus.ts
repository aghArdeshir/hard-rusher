import { Enemy } from "./Enemy";

export class Bonus {
  value: number;
  x: number;
  y: number;
  width = 5;
  height = 5;

  constructor(value: number, enemy: Enemy) {
    this.value = value;
    this.x = enemy.x + enemy.width / 2 - this.width / 2;
    this.y = enemy.y + enemy.height / 2 - this.height / 2;
  }

  draw(ctx: CanvasRenderingContext2D) {
    ctx.fillStyle = 'red';
    ctx.fillRect(this.x, this.y, this.width, this.height);
  }
}
