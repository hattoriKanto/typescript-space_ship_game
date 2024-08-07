import * as PIXI from "pixi.js";
import { Asteroid } from "../classes";
import { config } from "../config";
import { MovementHoryzontalDirection } from "../types";
import { createTickerCallback } from "./tickerCallbacks";

export const addAsteroidTicker = (
  app: PIXI.Application<PIXI.Renderer>,
  asteroid: Asteroid
) => {
  const tickerCallback = createTickerCallback(app, asteroid);
  app.ticker.add(tickerCallback);
  return tickerCallback;
};

export const asteroidMovementTicker = (
  app: PIXI.Application<PIXI.Renderer>,
  asteroid: Asteroid
) => {
  // Initialize step variable
  let step: number;
  // Set step value according to movement direction
  switch (asteroid.getMovementDirection) {
    case MovementHoryzontalDirection.left:
      step = config.step.asteroid;
      break;
    case MovementHoryzontalDirection.right:
      step = -config.step.asteroid;
      break;
    default:
      step = 0;
      break;
  }

  asteroid.currentSprite.x += step;

  if (
    asteroid.currentSprite.x + asteroid.currentSprite.width / 2 >=
    app.canvas.width
  ) {
    asteroid.setMovementDirection = 0;
  }
  if (asteroid.currentSprite.x - asteroid.currentSprite.width / 2 <= 0) {
    asteroid.setMovementDirection = 1;
  }
};

export const asteroidRotationTicker = (asteroid: Asteroid) => {
  asteroid.currentSprite.rotation += config.step.asteroidRotation;
};
