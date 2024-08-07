import { Player } from "../classes";
import { config } from "../config";

export const isDefeated = (player: Player) => {
  return player.shootsAmount === config.amount.playerBullets;
};
