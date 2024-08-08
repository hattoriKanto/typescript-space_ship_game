import * as PIXI from "pixi.js";
import { Asteroid } from "../classes";
import { getRandomPosition, getMovementDirection } from "../utils";
import { config } from "../config";
import { addAsteroidTicker } from "../tickers";
import { AsteroidStore } from "../classes/AsteroidStore";

export const initAsteroid = async (
  app: PIXI.Application<PIXI.Renderer>,
  texture: PIXI.Texture
) => {
  // Create a sprite from created texture
  const asteroidSprite = new PIXI.Sprite(texture);
  // Add sprite to the app
  app.stage.addChild(asteroidSprite);
  // Create an asteroid
  const asteroid = new Asteroid();
  // Add created sprite to the asteroid
  asteroid.initSprite = asteroidSprite;
  // Get random position
  const { initialX, initialY } = getRandomPosition(app, asteroid);
  // Set initial position
  asteroid.currentSprite.x = initialX;
  asteroid.currentSprite.y = initialY;
  // Set asteroid size
  asteroid.currentSprite.setSize(config.size.asteroid);
  // Set asteroid origin
  asteroid.currentSprite.anchor.set(0.5);
  // Set movement direction
  asteroid.setMovementDirection = getMovementDirection();
  // Set ticker functions
  const tickerCallback = addAsteroidTicker(app, asteroid);
  app.ticker.add(tickerCallback);
  // Return asteroid
  return asteroid;
};

// Initializer for asteroids
export const initAsteroids = async (
  app: PIXI.Application<PIXI.Renderer>,
  asteroidStore: AsteroidStore
) => {
  // Load texture
  const texture = await PIXI.Assets.load("/asteroid.png");

  for (let i = 0; i < config.amount.asteroid; i++) {
    const asteroid = await initAsteroid(app, texture);
    asteroidStore.pushAsteroid(asteroid);
  }
};
