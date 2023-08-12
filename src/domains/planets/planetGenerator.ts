import { v4 as uuid } from "uuid";
import { Planet } from "./planet";
import { biomeQuantityTable, biomeTable, rarityTable } from "./planet-tables";
import { BiomeType } from "../biomes/biome";

function boxMullerTransform() {
  const u1 = 1 - Math.random();
  const u2 = Math.random();

  const z0 = Math.sqrt(-2.0 * Math.log(u1)) * Math.cos(2.0 * Math.PI * u2);

  return z0;
}

function getNormallyDistributedRandomNumber(mean: number, stddev: number) {
  const z0 = boxMullerTransform();

  const result = z0 * stddev + mean;

  return result;
}

export const generatePlanet = (): Planet => {
  const rarity = rarityTable.pick();
  const biomeQuantity = biomeQuantityTable.pick();
  const biomes: BiomeType[] = [];
  for (let i = 0; biomes.length < biomeQuantity; i++) {
    const biome = biomeTable.pick();

    if (biomes.includes(biome)) {
      break;
    }

    biomes.push(biome);
  }
  const quality = getNormallyDistributedRandomNumber(100, 20);

  const planet: Planet = {
    uuid: uuid(),
    identified: false,
    rarity,
    biomes,
    quality: Math.round(quality),
  };

  return planet;
};
