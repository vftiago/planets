import { Rarity } from "../rarities/rarity";

export const DEFAULT_MEAN_QUALITY = 100;
export const DEFAULT_STANDARD_DEVIATION = 20;

export enum StarSize {
  XS = "xs",
  S = "s",
  M = "m",
  L = "l",
  XL = "xl",
}

export enum StarTemperature {
  RED = "red",
  ORANGE = "orange",
  YELLOW = "yellow",
  WHITE = "white",
  BLUE = "blue",
}

export type GameEntity = {
  uuid: string;
  rarity: Rarity;
  quality: number;
  identified: boolean;
  owned: boolean;
};

export interface Star extends GameEntity {
  size: StarSize;
  temperature: StarTemperature;
}
