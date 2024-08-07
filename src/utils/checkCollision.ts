import * as PIXI from "pixi.js";

const getRadius = (object: PIXI.Sprite | PIXI.Graphics) => {
  // Approximate the radius as half the width
  if (object instanceof PIXI.Sprite) {
    return object.width / 2;
  }

  // Approximate the radius for a circle or a rectangular shape
  if (object instanceof PIXI.Graphics) {
    const bounds = object.getLocalBounds();
    return Math.max(bounds.width, bounds.height) / 2;
  }

  return 0;
};

const getDistance = (x1: number, y1: number, x2: number, y2: number) => {
  return Math.sqrt((x2 - x1) ** 2 + (y2 - y1) ** 2);
};

export const checkCollision = (
  object1: PIXI.Sprite | PIXI.Graphics,
  object2: PIXI.Sprite | PIXI.Graphics
) => {
  const distance = getDistance(object1.x, object1.y, object2.x, object2.y);
  const radius1 = getRadius(object1);
  const radius2 = getRadius(object2);

  return distance <= radius1 + radius2;
};
