import { Planet } from "../domains/planets/planet";
import { Rarity } from "../domains/rarities/rarity";

import { Button, Card, CardHeader, CardBody, CardFooter, Text, List, ListItem, Center, Divider } from "@chakra-ui/react";

export const PlanetCard = ({ planet, onScanClick, onColonizeClick }: { planet: Planet; onScanClick: (uuid: string) => void; onColonizeClick: (uuid: string) => void }) => {
  const { uuid, identified, rarity, biomes, owned } = planet;

  return (
    <Card p="0" fontFamily={`Titillium Web`} h="370" minW="350" border={getBorder(rarity, identified)}>
      <CardHeader>
        <Text size="sm">{uuid}</Text>
      </CardHeader>
      <CardBody>
        <Divider />
        <Text>{identified ? rarity : "???"}</Text>
        <Divider />
        <Center>
          <List>{identified ? biomes.map((biome) => <ListItem key={`${uuid}-${biome}`}>{biome}</ListItem>) : "???"}</List>
        </Center>
      </CardBody>
      <CardFooter>
        {owned ? null : identified ? (
          <Button colorScheme={"orange"} size="xs" onClick={() => onColonizeClick(uuid)}>
            Colonize
          </Button>
        ) : (
          <Button size="xs" onClick={() => onScanClick(uuid)}>
            Scan
          </Button>
        )}
        {}
      </CardFooter>
    </Card>
  );
};

const getBorder = (rarity: Rarity, identified: boolean) => {
  let borderColor = "";

  if (identified) {
    switch (rarity) {
      case Rarity.Unique:
        borderColor = "rgb(161, 127, 26)";
        break;
      case Rarity.Rare:
        borderColor = "gold";
        break;
      case Rarity.Uncommon:
        borderColor = "silver";
        break;
      default:
        borderColor = "grey";
        break;
    }
  } else {
    borderColor = "grey";
  }

  return `1px solid ${borderColor}`;
};
