import { Planet } from "../domains/planets/planet";
import { Rarity } from "../domains/rarities/rarity";
import { Button, Box, Text, List, ListItem, Divider, Image, Card, CardFooter, CardBody, CardHeader, Center } from "@chakra-ui/react";
import img from "../assets/planet.gif";

export const PlanetCard = ({ planet, onScanClick, onColonizeClick }: { planet: Planet; onScanClick: (uuid: string) => void; onColonizeClick: (uuid: string) => void }) => {
  const { uuid, identified, rarity, quality, biomes, owned } = planet;

  return (
    <Card p="0" fontFamily="Rittswood" minW="sm" border={getBorder(rarity, identified)}>
      <CardHeader p="2">
        <Text>{uuid}</Text>
      </CardHeader>
      <Divider />
      <CardBody p="0">
        <Box p="2" background="blackAlpha.600">
          <Center h="200">
            <Image src={img} alt={"Planet seen from space."}></Image>
          </Center>
        </Box>
        <Divider />
        <Box p="o" h="130">
          {identified ? (
            <>
              <Box p="2" display="flex" justifyContent="space-between">
                <Text>{`${quality}% quality`}</Text>
                <Text>{rarity}</Text>
              </Box>
              <Divider />
              <Box p="2" background="blackAlpha.600">
                <List>
                  {biomes.map((biome) => (
                    <ListItem key={`${uuid}-${biome}`}>{biome}</ListItem>
                  ))}
                </List>
              </Box>
            </>
          ) : (
            <Center>???</Center>
          )}
        </Box>
      </CardBody>
      <Divider />
      {owned ? null : (
        <CardFooter p="2">
          <Box>
            {identified ? (
              <Button colorScheme={"orange"} size="sm" onClick={() => onColonizeClick(uuid)}>
                Colonize
              </Button>
            ) : (
              <Button size="sm" onClick={() => onScanClick(uuid)}>
                Scan
              </Button>
            )}
          </Box>
        </CardFooter>
      )}
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
