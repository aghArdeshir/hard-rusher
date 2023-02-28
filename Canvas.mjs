export class Canvas {
  constructor({ identifier }) {
    const canvas = document.createElement("canvas");
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
}
