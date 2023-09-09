import { v4 as uuid } from "uuid";
import { DEFAULT_MEAN_QUALITY, DEFAULT_STANDARD_DEVIATION } from "../domains/planets/planet";
import { biomeTable } from "../domains/planets/planet-tables";
import { getNormallyDistributedRandomNumber } from "./utils";
import { Biome } from "../domains/biomes/biome";

export const generateBiomes = (quantity: number): Biome[] => {
  const biomeTypes = biomeTable.pick({ quantity, exclusive: true });

  const biomes = biomeTypes.map((biome) => {
    const output = getNormallyDistributedRandomNumber(DEFAULT_MEAN_QUALITY, DEFAULT_STANDARD_DEVIATION);

    return {
      uuid: uuid(),
      type: biome,
      output: Math.round(output),
    };
  });

  return biomes;
};
