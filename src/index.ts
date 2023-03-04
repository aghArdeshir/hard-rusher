import { Canvas } from "./Canvas";
import { colorPalette } from "./color-palette";
import { player } from "./Player";

document.body.style.margin = "0";
document.body.style.overflow = "hidden";
document.body.style.backgroundColor = colorPalette.one;

const playerCanvas = new Canvas({ identifier: "for-player" });
const bulletsCanvas = new Canvas({ identifier: "for-bullets" });
const enemiesCanvas = new Canvas({ identifier: "for-enemies" });

playerCanvas.clear();
playerCanvas.draw(player);
