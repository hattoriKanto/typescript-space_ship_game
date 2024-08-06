import * as PIXI from "pixi.js";
import { Asteroid } from "../classes";

export const getRandomPosition = (
  app: PIXI.Application<PIXI.Renderer>,
  asteroid: Asteroid
) => {
  const initialX = Math.floor(
    Math.random() *
      (app.canvas.width -
        asteroid.currentSprite.width / 2 -
        asteroid.currentSprite.width +
        1) +
      asteroid.currentSprite.width
  );
  const initialY = Math.floor(100 + (Math.random() * app.canvas.height) / 4);

  return { initialX, initialY };
};
