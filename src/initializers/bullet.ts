import * as PIXI from "pixi.js";
import { Actor, Boss, Bullet, Player } from "../classes";
import { config } from "../config";
import { checkCollision } from "../utils/checkCollision";
import { AsteroidStore } from "../classes/AsteroidStore";
import { addAsteroidTicker } from "../tickers";

export const handleBulletMovement = async (
  app: PIXI.Application<PIXI.Renderer>,
  bullet: Bullet,
  tickerCallback: () => void,
  asteroidsStore: AsteroidStore
) => {
  if (bullet.currentParent instanceof Player) {
    bullet.currentGraphics.y -= config.step.bullet;
  }

  if (bullet.currentParent instanceof Boss) {
    bullet.currentGraphics.y += config.step.bullet;
  }

  if (
    bullet.currentGraphics.y <= 0 ||
    bullet.currentGraphics.y >= app.screen.height ||
    (await handleCollision(app, bullet, tickerCallback, asteroidsStore))
  ) {
    app.stage.removeChild(bullet.currentGraphics);
    app.ticker.remove(tickerCallback);
  }
};

export const initBullet = async (parent: Actor) => {
  // Create a graphic object
  const bulletGraphics = new PIXI.Graphics().circle(0, 0, 5).fill(0xff0000);
  // Create a bullet
  const bullet = new Bullet();
  // Add created sprite to the asteroid
  bullet.initGraphics = bulletGraphics;
  // Set parent
  bullet.initParent = parent;
  // Set initial position
  bullet.currentGraphics.x = parent.currentSprite.x;
  bullet.currentGraphics.y = parent.currentSprite.y;
  // Set movement direction
  bullet.setMovementDirection = parent;

  // Return bullet
  return bullet;
};

const handleCollision = async (
  app: PIXI.Application<PIXI.Renderer>,
  bullet: Bullet,
  tickerCallback: () => void,
  asteroidsStore: AsteroidStore
) => {
  for (let i = 0; i < asteroidsStore.currentAsteroids.length; i++) {
    if (
      checkCollision(
        bullet.currentGraphics,
        asteroidsStore.currentAsteroids[i].currentSprite
      )
    ) {
      app.stage.removeChild(bullet.currentGraphics);
      app.ticker.remove(tickerCallback);

      const ticker = addAsteroidTicker(app, asteroidsStore.currentAsteroids[i]);
      app.stage.removeChild(asteroidsStore.currentAsteroids[i].currentSprite);
      asteroidsStore.popAsteroid(asteroidsStore.currentAsteroids[i].currentId);
      app.ticker.remove(ticker);

      return true;
    }
  }

  return false;
};
