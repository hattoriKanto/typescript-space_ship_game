import * as PIXI from "pixi.js";
import { Asteroid } from "../classes";
import { getRandomPosition, getNewID, getMovementDirection } from "../utils";
import { config } from "../config";
import { asteroidsStore } from "../main";
import { addToTicker } from "../ticker";
import { asteroidMovementTicker, asteroidRotationTicker } from "../tickers";

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
  // Set an id
  asteroid.initId = getNewID();
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
  const tickerFunctions = () => {
    asteroidMovementTicker(app, asteroid);
    asteroidRotationTicker(asteroid);
  };
  addToTicker(app, tickerFunctions);
  // Return asteroid
  return asteroid;
};

// Initializer for asteroids
export const initAsteroids = async (app: PIXI.Application<PIXI.Renderer>) => {
  // Load texture
  const texture = await PIXI.Assets.load("/asteroid.png");

  for (let i = 0; i < config.amount.asteroid; i++) {
    const asteroid = await initAsteroid(app, texture);
    asteroidsStore.push(asteroid);
  }
};
