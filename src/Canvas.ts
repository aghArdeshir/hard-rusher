export class Canvas {
  context: CanvasRenderingContext2D;

  constructor({ identifier }: { identifier: string }) {
    const canvas = document.createElement('canvas');

    this.context = canvas.getContext('2d') || new CanvasRenderingContext2D();

    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    canvas.style.position = 'absolute';
    canvas.style.top = '0';
    canvas.style.left = '0';

    document.body.appendChild(canvas);

    window.addEventListener('resize', () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    });

    if (identifier) {
      canvas.dataset.identifier = identifier;
    }
  }

  clear() {
    this.context.clearRect(0, 0, window.innerWidth, window.innerHeight);
  }
}
