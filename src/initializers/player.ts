import * as PIXI from "pixi.js";
import { config } from "../config";

export const initPlayer = async (app: PIXI.Application<PIXI.Renderer>) => {
  const playerTexture = await PIXI.Assets.load("/player-ship.png");
  const player = new PIXI.Sprite(playerTexture);

  player.x = app.canvas.width / 2;
  player.y = app.canvas.height - player.height;

  player.setSize(config.size.player);

  player.anchor.set(0.5, 0);

  app.stage.addChild(player);

  return player;
};
