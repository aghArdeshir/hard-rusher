import { Canvas } from "./Canvas.mjs";
import { colorPalette } from "./color-palette.mjs";
import { player } from "./Player.mjs";

document.body.style.margin = "0";
document.body.style.overflow = "hidden";
document.body.style.backgroundColor = colorPalette.one;

const playerCanvas = new Canvas({ identifier: "for-player" });
const bulletsCanvas = new Canvas({ identifier: "for-bullets" });
const enemiesCanvas = new Canvas({ identifier: "for-enemies" });

playerCanvas.clear();
playerCanvas.draw(player);
