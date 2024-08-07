import * as PIXI from "pixi.js";
import "./style.css";

import {
  initAsteroidStore,
  initAsteroids,
  initBackground,
  initPlayer,
} from "./initializers";
import { config } from "./config";
import { Bullet } from "./classes";
import { handleBulletMovement, initBullet } from "./initializers/bullet";
import { isDefeated } from "./utils";

export const bulletBossStore: Bullet[] = [];

(async () => {
  const app = new PIXI.Application();

  await app.init({
    width: config.resolution.width,
    height: config.resolution.height,
  });

  document.body.appendChild(app.canvas);

  await initBackground(app);
  const player = await initPlayer(app);
  const asteroidStore = await initAsteroidStore();
  await initAsteroids(app, asteroidStore);
  await PIXI.Assets.load("./Starjedi.ttf");

  const text = new PIXI.Text({
    text: `Bullets left: ${config.amount.playerBullets - player.shootsAmount}`,
    style: {
      fontFamily: "Starjedi",
      fontSize: 28,
      fill: 0xffffff, // white color
      align: "center",
    },
    x: 10,
    y: 10,
  });

  const bigText = new PIXI.Text({
    text: "",
    style: {
      fontFamily: "Starjedi",
      fontSize: 48,
      fill: 0xffffff, // white color
      align: "center",
    },
    anchor: 0.5,
    x: app.canvas.width / 2,
    y: app.canvas.height / 2,
    zIndex: 2,
  });

  app.stage.addChild(text);

  window.addEventListener("keydown", async (event) => {
    if (event.key === config.keyBindings.left) {
      if (
        player.currentSprite.x -
          config.step.player -
          player.currentSprite.width / 2 >=
        0
      ) {
        player.currentSprite.x -= config.step.player;
        return;
      }

      player.currentSprite.x = player.currentSprite.x;
    }

    if (event.key === config.keyBindings.right) {
      if (
        player.currentSprite.x +
          config.step.player +
          player.currentSprite.width / 2 <=
        app.canvas.width
      ) {
        player.currentSprite.x += config.step.player;
        return;
      }

      player.currentSprite.x = player.currentSprite.x;
    }

    if (event.key === config.keyBindings.shoot) {
      if (isDefeated(player)) {
        bigText.text = "You're defeated, try again!";

        app.stage.addChild(bigText);
        return;
      }

      const bullet = await initBullet(player);

      app.stage.addChild(bullet.currentGraphics);
      const tickerCallback = () =>
        handleBulletMovement(app, bullet, tickerCallback, asteroidStore);
      app.ticker.add(tickerCallback);

      player.pushBullet(bullet);

      const bulletsLeft = config.amount.playerBullets - player.shootsAmount;

      text.text = `Bullets left: ${bulletsLeft}`;
    }
  });
})();
