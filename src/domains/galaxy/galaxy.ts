import { Rarity } from "../rarities/rarity";

export const DEFAULT_MEAN_QUALITY = 100;
export const DEFAULT_STANDARD_DEVIATION = 20;

export enum GalaxyAge {
  YOUNG = "YOUNG",
  MATURE = "MATURE",
  OLD = "OLD",
  ANCIENT = "ANCIENT",
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
