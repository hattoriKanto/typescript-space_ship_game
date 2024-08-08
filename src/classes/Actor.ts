import * as PIXI from "pixi.js";
import { Bullet } from ".";

export class Actor {
  private sprite: PIXI.Sprite = new PIXI.Sprite();
  private bulletsStore: Bullet[] = [];

  set initSprite(sprite: PIXI.Sprite) {
    this.sprite = sprite;
  }

  get currentSprite() {
    return this.sprite;
  }

  get shootsAmount() {
    return this.bulletsStore.length;
  }

  pushBullet(bullet: Bullet) {
    this.bulletsStore.push(bullet);
  }

  popBullet() {
    this.bulletsStore.pop();
  }


}

export class Player extends Actor {}
export class Boss extends Actor {}
