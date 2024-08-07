import { Asteroid } from ".";

export class AsteroidStore {
  private asteroids: Asteroid[] = [];

  get currentAsteroids() {
    return this.asteroids;
  }

  pushAsteroid(asteroid: Asteroid) {
    this.asteroids.push(asteroid);
  }

  popAsteroid(id: number) {
    this.asteroids = this.asteroids.filter(
      (asteroid) => asteroid.currentId !== id
    );
  }
}
