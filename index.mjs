import { colorPalette } from "./color-palette.mjs";

document.body.style.margin = "0";
document.body.style.overflow = "hidden";
document.body.style.backgroundColor = colorPalette.one;

function createCanvas() {
  const canvas = document.createElement("canvas");
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;

  document.body.appendChild(canvas);

  window.addEventListener("resize", () => {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
  });
}

const playerCanvas = createCanvas();
const bulletsCanvas = createCanvas();
const enemiesCanvas = createCanvas();
