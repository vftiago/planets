import { v4 as uuid } from "uuid";
import { DEFAULT_MEAN_QUALITY, DEFAULT_STANDARD_DEVIATION, , Star } from "../domains/planets/planet";
import { rarityTable } from "../domains/planets/planet-tables";
import { getNormallyDistributedRandomNumber } from "./utils";

export const generateStar = (): Star => {
  const rarity = rarityTable.pick();
  const quality = Math.round(getNormallyDistributedRandomNumber(DEFAULT_MEAN_QUALITY, DEFAULT_STANDARD_DEVIATION));

  const star: Star = {
    uuid: uuid(),
    identified: false,
    owned: false,
    rarity,
    quality,
    size,
    temperature,
    planetIds
  };

  return star;
};
