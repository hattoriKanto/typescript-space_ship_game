import * as PIXI from "pixi.js";
import { Asteroid } from "../classes";
import { asteroidMovementTicker, asteroidRotationTicker } from ".";

export const createTickerCallback = (
  app: PIXI.Application<PIXI.Renderer>,
  asteroid: Asteroid
) => {
  return () => {
    asteroidMovementTicker(app, asteroid);
    asteroidRotationTicker(asteroid);
  };
};
