import { WeightedItem } from "@lrkit/weighted/src/types";
import { BiomeType } from "./biome";

export const biomeQuantities: WeightedItem<number>[] = [
  {
    item: 3,
    weight: 10,
  },
  {
    item: 2,
    weight: 5,
  },
  {
    item: 1,
    weight: 3,
  },
];

export const biomes: WeightedItem<BiomeType>[] = [
  {
    item: BiomeType.Acquatic,
    weight: 10,
  },
  {
    item: BiomeType.Grassland,
    weight: 5,
  },
  {
    item: BiomeType.Forest,
    weight: 5,
  },
  {
    item: BiomeType.Desert,
    weight: 10,
  },
  {
    item: BiomeType.Tundra,
    weight: 10,
  },
];
