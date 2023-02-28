export class Canvas {
  constructor({ identifier }) {
    const canvas = document.createElement("canvas");
    this.context = canvas.getContext("2d");

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

  draw(subject) {
    this.context.fillStyle = subject.color;
    this.context.fillRect(subject.x, subject.y, subject.width, subject.height);
  }

  clear() {
    this.context.clearRect(0, 0, window.innerWidth, window.innerHeight);
  }
}
