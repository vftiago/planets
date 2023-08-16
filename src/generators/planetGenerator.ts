import { v4 as uuid } from "uuid";
import { DEFAULT_MEAN_QUALITY, DEFAULT_STANDARD_DEVIATION, Planet } from "../domains/planets/planet";
import { biomeQuantityTable, biomeTable, rarityTable } from "../domains/planets/planet-tables";
import { getNormallyDistributedRandomNumber } from "./utils";

export const generatePlanet = (): Planet => {
  const rarity = rarityTable.pick();
  const biomeQuantity = biomeQuantityTable.pick();
  const biomes = biomeTable.pick({ quantity: biomeQuantity, exclusive: true });

  const quality = getNormallyDistributedRandomNumber(DEFAULT_MEAN_QUALITY, DEFAULT_STANDARD_DEVIATION);

  const planet: Planet = {
    uuid: uuid(),
    identified: false,
    owned: false,
    rarity,
    biomes,
    quality: Math.round(quality),
  };

  return planet;
};
