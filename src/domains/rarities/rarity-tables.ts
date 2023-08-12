import { WeightedItem } from "@lrkit/weighted/src/types";
import { Rarity } from "./rarity";

export const rarityLevels: WeightedItem<Rarity>[] = [
  {
    item: Rarity.Common,
    weight: 80,
  },
  {
    item: Rarity.Uncommon,
    weight: 10,
  },
  {
    item: Rarity.Rare,
    weight: 5,
  },
  {
    item: Rarity.Unique,
    weight: 1,
  },
];
