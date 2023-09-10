import { v4 } from "uuid";
import { DEFAULT_MEAN_QUALITY, DEFAULT_STANDARD_DEVIATION, Planet } from "../domains/planets/planet";
import { biomeQuantityTable, rarityTable } from "../domains/planets/planet-tables";
import { getNormallyDistributedRandomNumber } from "./utils";
import { generateBiomes } from "./biomeGenerator";
import seedrandom from "seedrandom";
import { MutableRefObject, useRef } from "react";

export const useGeneratePlanet = (quantity = 8): Planet[] => {
  const planets: Planet[] = [];

  for (let i = 0; i < quantity; i++) {
    const rarity = rarityTable.pick();
    const biomeQuantity = biomeQuantityTable.pick();
    const biomes = generateBiomes(biomeQuantity);

    const quality = getNormallyDistributedRandomNumber(DEFAULT_MEAN_QUALITY, DEFAULT_STANDARD_DEVIATION);

    const uuid = v4();

    const prng = seedrandom(uuid);

    // eslint-disable-next-line react-hooks/rules-of-hooks
    const planetRef = useRef<HTMLDivElement>(null) as MutableRefObject<HTMLDivElement>;

    const planet: Planet = {
      uuid,
      planetRef,
      seed: prng(),
      identified: false,
      owned: false,
      rarity,
      biomes,
      quality: Math.round(quality),
    };

    planets.push(planet);
  }

  return planets;
};
