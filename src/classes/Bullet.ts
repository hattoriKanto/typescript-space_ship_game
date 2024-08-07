import * as PIXI from "pixi.js";
import { MovementVerticalDirection } from "../types";
import { Actor, Boss, Player } from ".";

export class Bullet {
  private movementDirection: MovementVerticalDirection =
    MovementVerticalDirection.none;
  private graphics: PIXI.Graphics = new PIXI.Graphics();
  private parent: Actor = new Actor();

  set initGraphics(graphics: PIXI.Graphics) {
    this.graphics = graphics;
  }

  set initParent(parent: Actor) {
    this.parent = parent;
  }

  set setMovementDirection(parent: Player | Boss) {
    this.movementDirection =
      parent instanceof Boss
        ? MovementVerticalDirection.down
        : MovementVerticalDirection.up;
  }

  get currentGraphics() {
    return this.graphics;
  }

  get currentParent() {
    return this.parent;
  }

  get currentId() {
    return this.graphics.uid;
  }

  get getMovementDirection() {
    return this.movementDirection;
  }
}
