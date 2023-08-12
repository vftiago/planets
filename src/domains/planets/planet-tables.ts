import { weighted } from "@lrkit/weighted";
import { biomeQuantities, biomes } from "../biomes/biome-tables";
import { rarityLevels } from "../rarities/rarity-tables";

export const biomeQuantityTable = weighted(biomeQuantities);
export const biomeTable = weighted(biomes);
export const rarityTable = weighted(rarityLevels);
