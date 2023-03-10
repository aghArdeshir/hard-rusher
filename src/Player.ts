import { Bullet } from './Bullet';
import { colorPalette } from './color-palette';
import { game } from './Game';

type DIRECTION = 'UP' | 'DOWN' | 'LEFT' | 'RIGHT';

export class Player {
  x;
  y;
  width = 50;
  height = 50;
  color = colorPalette.four;
  moving: DIRECTION | null = null;
  movingIntervalRef: number | null = null;
  HP = 100;
  speed = 1;
  bulletSpeed = 1;
  fireRate = 1;
  bodyDamage = 1;

  constructor(x: number, y: number) {
    this.x = x;
    this.y = y;
    this.startShootoing();
  }

  startShootoing = () => {
    let oldFireRate = this.fireRate;
    const intervalRef = setInterval(() => {
      const bullet = new Bullet(this, game.enemies, this.bulletSpeed);
      game.bullets.push(bullet);

      if (oldFireRate !== this.fireRate) {
        clearInterval(intervalRef);
        this.startShootoing();
      }
    }, 1000 / this.fireRate);
  };

  stopMoving = () => {
    if (this.movingIntervalRef) {
      window.clearInterval(this.movingIntervalRef);
      this.movingIntervalRef = null;
    }
    this.moving = null;
  };

  setMoving = (direction: DIRECTION) => {
    this.moving = direction;
    if (!this.movingIntervalRef) {
      this.movingIntervalRef = window.setInterval(this.move, 1);
    }
  };

  move = () => {
    switch (this.moving) {
      case 'UP':
        this.y -= this.speed;
        break;
      case 'DOWN':
        this.y += this.speed;
        break;
      case 'LEFT':
        this.x -= this.speed;
        break;
      case 'RIGHT':
        this.x += this.speed;
        break;
      default:
        window.clearInterval(this.movingIntervalRef || 0);
        this.movingIntervalRef = null;
    }
  };

  draw(ctx: CanvasRenderingContext2D) {
    ctx.fillStyle = this.color;
    ctx.fillRect(this.x, this.y, this.width, this.height);

    ctx.fillStyle = 'black';
    ctx.font = '10px Arial';
    ctx.fillText(`HP: ${this.HP}`, this.x, this.y + 12);

    ctx.fillStyle = 'black';
    ctx.font = '10px Arial';
    ctx.fillText(`Speed: ${this.speed}`, this.x, this.y + 24);

    ctx.fillStyle = 'black';
    ctx.font = '10px Arial';
    ctx.fillText(`B.Speed: ${this.bulletSpeed}`, this.x, this.y + 36);

    ctx.fillStyle = 'black';
    ctx.font = '10px Arial';
    ctx.fillText(`F.Rate: ${this.fireRate}`, this.x, this.y + 48);
  }
}
