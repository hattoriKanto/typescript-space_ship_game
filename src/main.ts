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
import {
  defeatedContainer,
  startContainer,
  victoryContainer,
} from "./overlays";

export const bulletBossStore: Bullet[] = [];

(async () => {
  const app = new PIXI.Application();
  await app.init({
    width: config.resolution.width,
    height: config.resolution.height,
  });
  document.body.appendChild(app.canvas);

  await PIXI.Assets.load("./Starjedi.ttf");

  const startOverlay = await startContainer(app);
  startOverlay.on("click", () => {
    startGame();
  });

  async function startGame() {
    app.stage.removeChildren();

    await initBackground(app);
    let player = await initPlayer(app);
    const asteroidStore = await initAsteroidStore();
    await initAsteroids(app, asteroidStore);

    const text = new PIXI.Text({
      text: `Bullets left: ${
        config.amount.playerBullets - player.shootsAmount
      }`,
      style: {
        fontFamily: "Starjedi",
        fontSize: 28,
        fill: 0xffffff, // white color
        align: "center",
      },
      x: 10,
      y: 10,
    });

    app.stage.addChild(text);

    window.addEventListener("keydown", handleKeyDown);

    async function handleKeyDown(event: KeyboardEvent) {
      const bulletsLeft = config.amount.playerBullets - player.shootsAmount;
      text.text = `Bullets left: ${bulletsLeft}`;

      if (asteroidStore.currentAsteroids.length === 0) {
        window.removeEventListener("keydown", handleKeyDown);
        await victoryContainer(app);
        return;
      }

      if (isDefeated(player)) {
        window.removeEventListener("keydown", handleKeyDown);
        const defeatOverlay = await defeatedContainer(app);
        defeatOverlay.on("click", async () => {
          startGame();
        });
        return;
      }

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
        const bullet = await initBullet(player);

        app.stage.addChild(bullet.currentGraphics);
        const tickerCallback = () =>
          handleBulletMovement(app, bullet, tickerCallback, asteroidStore);
        app.ticker.add(tickerCallback);

        player.pushBullet(bullet);
      }
    }
  }
})();
