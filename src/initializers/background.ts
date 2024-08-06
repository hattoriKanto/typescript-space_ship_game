import * as PIXI from "pixi.js";

export const initBackground = async (app: PIXI.Application<PIXI.Renderer>) => {
  const backgroundTexture = await PIXI.Assets.load("/background.png");

  const background = new PIXI.Sprite(backgroundTexture);

  background.x = app.canvas.width / 2;
  background.y = app.canvas.height / 2;

  background.anchor.set(0.5);

  app.stage.addChild(background);
};
