import { GameEntity } from "../planets/planet";

export enum BiomeType {
  Acquatic = "acquatic",
  Grassland = "grassland",
  Forest = "forest",
  Desert = "desert",
  Tundra = "tundra",
}

export enum BiomeSubType {
  Acquatic = "acquatic",
  Grassland = "grassland",
  Forest = "forest",
  Desert = "desert",
  Tundra = "tundra",
}

export interface Biome extends GameEntity {
  type: BiomeType;
  output: number;
}
