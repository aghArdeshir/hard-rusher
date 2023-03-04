import { colorPalette } from "./color-palette";

class Player {
  x = 100;
  y = 100;
  width = 50;
  height = 50;
  color = colorPalette.four
}

export const player = new Player();
