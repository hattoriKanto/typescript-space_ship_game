import * as PIXI from "pixi.js";
import "./style.css";

import { initBackground, initPlayer } from "./initializers";
import { config } from "./config";
import { Asteroid } from "./classes";
import { initAsteroids } from "./initializers/asteroid";

export const asteroidsStore: Asteroid[] = [];

(async () => {
  const app = new PIXI.Application();

  await app.init({
    width: config.resolution.width,
    height: config.resolution.height,
  });

  document.body.appendChild(app.canvas);

  await initBackground(app);
  const player = await initPlayer(app);
  await initAsteroids(app);

  window.addEventListener("keydown", async (event) => {
    if (event.key === config.keyBindings.left) {
      if (player.x - config.step.player - player.width / 2 >= 0) {
        player.x -= config.step.player;
        return;
      }

      player.x = player.x;
    }

    if (event.key === config.keyBindings.right) {
      if (
        player.x + config.step.player + player.width / 2 <=
        app.canvas.width
      ) {
        player.x += config.step.player;
        return;
      }

      player.x = player.x;
    }

    if (event.key === config.keyBindings.shoot) {
      console.log(asteroidsStore);
    }
  });
})();
