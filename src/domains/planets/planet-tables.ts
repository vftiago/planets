import { weighted } from "@lrkit/weighted";
import { biomeQuantities, biomes } from "../biomes/biome-tables";
import { rarityLevels } from "../rarities/rarity-tables";
import { PlanetType } from "./planet";

const planetTypes = [
  {
    item: PlanetType.NoAtmosphere,
    weight: 10,
  },
  {
    item: PlanetType.Gas,
    weight: 10,
  },
  {
    item: PlanetType.GasRing,
    weight: 10,
  },
  {
    item: PlanetType.Arid,
    weight: 10,
  },
  {
    item: PlanetType.Ice,
    weight: 10,
  },
  {
    item: PlanetType.Lava,
    weight: 5,
  },
  {
    item: PlanetType.Terran,
    weight: 5,
  },
  {
    item: PlanetType.Ocean,
    weight: 5,
  },
];

export const planetTypeTable = weighted(planetTypes);
export const biomeQuantityTable = weighted(biomeQuantities);
export const biomeTable = weighted(biomes);
export const rarityTable = weighted(rarityLevels);
