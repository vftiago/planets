import { Biome } from "../biomes/biome";
import { Rarity } from "../rarities/rarity";

export const DEFAULT_MEAN_QUALITY = 100;
export const DEFAULT_STANDARD_DEVIATION = 20;

export type GameEntity = {
  uuid: string;
};

export interface Planet extends GameEntity {
  rarity: Rarity;
  quality: number;
  identified: boolean;
  owned: boolean;
  biomes: Biome[];
  seed: number;
}

export interface Colony extends Planet {
  population: number;
}
