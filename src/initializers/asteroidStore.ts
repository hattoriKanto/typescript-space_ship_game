import { AsteroidStore } from "../classes/AsteroidStore";

export const initAsteroidStore = async () => {
  const asteroidStore = new AsteroidStore();
  return asteroidStore;
};
