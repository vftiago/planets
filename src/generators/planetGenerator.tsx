import { v4 } from "uuid";
import { DEFAULT_MEAN_QUALITY, DEFAULT_STANDARD_DEVIATION, Planet } from "../domains/planets/planet";
import { biomeQuantityTable, rarityTable } from "../domains/planets/planet-tables";
import { getNormallyDistributedRandomNumber } from "./utils";
import { generateBiomes } from "./biomeGenerator";
import seedrandom from "seedrandom";

export const generatePlanet = (): Planet => {
  const rarity = rarityTable.pick();
  const biomeQuantity = biomeQuantityTable.pick();
  const biomes = generateBiomes(biomeQuantity);

  const quality = getNormallyDistributedRandomNumber(DEFAULT_MEAN_QUALITY, DEFAULT_STANDARD_DEVIATION);

  const uuid = v4();

  const prng = seedrandom(uuid);

  const planet: Planet = {
    uuid,
    seed: prng(),
    identified: false,
    owned: false,
    rarity,
    biomes,
    quality: Math.round(quality),
  };

  return planet;
};
