import * as PIXI from "pixi.js";
import { config } from "../config";
import { Player } from "../classes";

export const initPlayer = async (app: PIXI.Application<PIXI.Renderer>) => {
  // Load texture
  const texture = await PIXI.Assets.load("/player-ship.png");
  // Create a sprite
  const playerSprite = new PIXI.Sprite(texture);
  // Add sprite to the app
  app.stage.addChild(playerSprite);

  const player = new Player();

  player.initSprite = playerSprite;

  player.currentSprite.setSize(config.size.player);

  player.currentSprite.x = app.canvas.width / 2;
  player.currentSprite.y = app.canvas.height - player.currentSprite.height;

  player.currentSprite.anchor.set(0.5, 0);

  return player;
};
