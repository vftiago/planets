import { BiomeType } from "../biomes/biome";
import { Rarity } from "../rarities/rarity";

export type GameEntity = {
  uuid: string;
  rarity: Rarity;
  quality: number;
  identified: boolean;
  owned: boolean;
};

export interface Planet extends GameEntity {
  biomes: BiomeType[];
}
