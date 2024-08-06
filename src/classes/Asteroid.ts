import * as PIXI from "pixi.js";
import { MovementHoryzontalDirection } from "../types";

export class Asteroid {
  private id: number = 0;
  private movementDirection: MovementHoryzontalDirection =
    MovementHoryzontalDirection.none;
  private sprite: PIXI.Sprite = new PIXI.Sprite();

  set initId(id: number) {
    this.id = id;
  }
  set initSprite(sprite: PIXI.Sprite) {
    this.sprite = sprite;
  }

  set setMovementDirection(randomNum: number) {
    this.movementDirection =
      randomNum === 1
        ? MovementHoryzontalDirection.left
        : MovementHoryzontalDirection.right;
  }

  get currentSprite() {
    return this.sprite;
  }

  get currentId() {
    return this.id;
  }

  get getMovementDirection() {
    return this.movementDirection;
  }
}