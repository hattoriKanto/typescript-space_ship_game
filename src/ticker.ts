import * as PIXI from "pixi.js";

export const addToTicker = (
  app: PIXI.Application<PIXI.Renderer>,
  fn: () => void
) => {
  app.ticker.add(fn);
};

export const removeToTicker = (
  app: PIXI.Application<PIXI.Renderer>,
  fn: () => void
) => {
  app.ticker.remove(fn);
};
