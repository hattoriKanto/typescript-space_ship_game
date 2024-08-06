import { asteroidsStore } from "../main";

export const getNewID = () => {
  const ids = asteroidsStore.map((asteroid) => asteroid.currentId);

  const maxId = ids.length > 0 ? Math.max(...ids) : 0;

  return maxId + 1;
};
