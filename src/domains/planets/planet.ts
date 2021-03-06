import { MutableRefObject } from "react";
import { Biome } from "../biomes/biome";
import { Rarity } from "../rarities/rarity";

export const DEFAULT_MEAN_QUALITY = 100;
export const DEFAULT_STANDARD_DEVIATION = 20;

export enum PlanetType {
  Gas = "Gas",
  GasRing = "GasRing",
  Terran = "Terran",
  NoAtmosphere = "NoAtmosphere",
  Arid = "Arid",
  Lava = "Lava",
  Ice = "Ice",
  Ocean = "Ocean",
}

export type GameEntity = {
  uuid: string;
};

export interface Planet extends GameEntity {
  rarity: Rarity;
  quality: number;
  identified: boolean;
  owned: boolean;
  biomes: Biome[];
  type: PlanetType;
  seed: number;
  rotation: number;
  planetRef: MutableRefObject<HTMLDivElement>;
}

export interface Colony extends Planet {
  population: number;
}
