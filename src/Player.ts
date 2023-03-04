import { colorPalette } from "./color-palette";

type DIRECTION = "UP" | "DOWN" | "LEFT" | "RIGHT";

export class Player {
  x = window.innerWidth / 2;
  y = window.innerHeight / 2;
  width = 50;
  height = 50;
  color = colorPalette.four;
  moving: DIRECTION | null = null;
  movingIntervalRef: number | null = null;

  constructor() {
    window.addEventListener("keydown", this.handleKeyDown);
    window.addEventListener("keyup", this.handleKeyUp);
  }

  handleKeyUp = (event: KeyboardEvent) => {
    if (this.movingIntervalRef) {
      window.clearInterval(this.movingIntervalRef);
      this.movingIntervalRef = null;
    }
    this.moving = null;
  };

  handleKeyDown = (event: KeyboardEvent) => {
    switch (event.key) {
      case "ArrowUp":
        this.moving = "UP";
        break;
      case "ArrowDown":
        this.moving = "DOWN";
        break;
      case "ArrowLeft":
        this.moving = "LEFT";
        break;
      case "ArrowRight":
        this.moving = "RIGHT";
        break;
    }

    if (!this.movingIntervalRef) {
      this.movingIntervalRef = window.setInterval(this.move, 1);
    }
  };

  move = () => {
    switch (this.moving) {
      case "UP":
        this.y -= 1;
        break;
      case "DOWN":
        this.y += 1;
        break;
      case "LEFT":
        this.x -= 1;
        break;
      case "RIGHT":
        this.x += 1;
        break;
      default:
        window.clearInterval(this.movingIntervalRef || 0);
        this.movingIntervalRef = null;
    }
  };

  draw(ctx: CanvasRenderingContext2D) {
    ctx.fillStyle = this.color;
    ctx.fillRect(this.x, this.y, this.width, this.height);
  }
}

export const player = new Player();
