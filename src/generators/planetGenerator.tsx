import { v4 as uuid } from "uuid";
import { DEFAULT_MEAN_QUALITY, DEFAULT_STANDARD_DEVIATION, Planet } from "../domains/planets/planet";
import { biomeQuantityTable, rarityTable } from "../domains/planets/planet-tables";
import { getNormallyDistributedRandomNumber } from "./utils";
import { generateBiomes } from "./biomeGenerator";
import PlanetObject from "../3d/Planet/Planet";

export const generatePlanet = (): Planet => {
  const rarity = rarityTable.pick();
  const biomeQuantity = biomeQuantityTable.pick();
  const biomes = generateBiomes(biomeQuantity);

  const quality = getNormallyDistributedRandomNumber(DEFAULT_MEAN_QUALITY, DEFAULT_STANDARD_DEVIATION);

  const planet: Planet = {
    uuid: uuid(),
    identified: false,
    owned: false,
    rarity,
    biomes,
    quality: Math.round(quality),
    object: <PlanetObject />,
  };

  return planet;
};
