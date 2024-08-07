import { Asteroid, Bullet } from "../classes";

export const getNewID = (array: Asteroid[] | Bullet[]) => {
  const ids = array.map((value) => value.currentId);

  const maxId = ids.length > 0 ? Math.max(...ids) : 0;

  return maxId + 1;
};
