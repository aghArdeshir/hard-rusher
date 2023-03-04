import { Drawable } from "./Drawable";

export class Canvas {
  context: CanvasRenderingContext2D;

  constructor({ identifier }: { identifier: string }) {
    const canvas = document.createElement("canvas");
    if (!canvas.getContext("2d")) {
      throw new Error("Could not get context");
    }

    this.context = canvas.getContext("2d") || new CanvasRenderingContext2D();

    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    document.body.appendChild(canvas);

    window.addEventListener("resize", () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    });

    if (identifier) {
      canvas.dataset.identifier = identifier;
    }
  }

  draw(subject: Drawable) {
    this.context.fillStyle = subject.color;
    this.context.fillRect(subject.x, subject.y, subject.width, subject.height);
  }

  clear() {
    this.context.clearRect(0, 0, window.innerWidth, window.innerHeight);
  }
}
