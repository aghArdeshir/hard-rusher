import { colorPalette } from "./color-palette.mjs";

document.body.style.margin = "0";
document.body.style.overflow = "hidden";
document.body.style.backgroundColor = colorPalette.one;

function createCanvas({ identifier }) {
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

const playerCanvas = createCanvas({ identifier: "for-player" });
const bulletsCanvas = createCanvas({ identifier: "for-bullets" });
const enemiesCanvas = createCanvas({ identifier: "for-enemies" });
