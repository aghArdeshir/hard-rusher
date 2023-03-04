import { colorPalette } from './color-palette';
import { Player } from './Player';

export class Enemy {
  x: number;
  y: number;
  width: number;
  height: number;
  color = colorPalette.five;
  HP = 1;

  constructor(
    x: number,
    y: number,
    width: number,
    height: number,
    player: Player
  ) {
    this.x = x;
    this.y = y;
    this.width = width;
    this.height = height;

    setInterval(() => {
      this.moveTowardsPlayer(player);
    }, 100);
  }

  moveTowardsPlayer(player: Player) {
    if (this.x < player.x - player.width) {
      this.x += 1;
    } else if (this.x > player.x + player.width) {
      this.x -= 1;
    }

    if (this.y < player.y - player.height) {
      this.y += 1;
    } else if (this.y > player.y + player.height) {
      this.y -= 1;
    }
  }

  draw(context: CanvasRenderingContext2D) {
    context.fillStyle = this.color;
    context.fillRect(this.x, this.y, this.width, this.height);

    context.fillStyle = 'black';
    context.font = '12px Arial';
    context.fillText(`HP: ${this.HP.toString()}`, this.x, this.y + 12);
  }
}
