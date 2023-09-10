import { useState } from "react";
import invariant from "tiny-invariant";
import { Planet } from "./domains/planets/planet";
import { generatePlanet } from "./generators/planetGenerator";
import { PlanetList } from "./Planets/PlanetList";
import { Box, Heading, Stack } from "@chakra-ui/react";
import { Tabs, TabList, Tab, TabPanels, TabPanel } from "@chakra-ui/react";

const initialPlanetList = new Array(8).fill(false).map(() => generatePlanet());

const Game = () => {
  const [planetList, setPlanetList] = useState<Planet[]>(initialPlanetList);

  const handleScanClick = (uuid: string) => {
    const planetToIdentify = planetList.find((planet) => planet.uuid === uuid);

    invariant(planetToIdentify);

    planetToIdentify.identified = true;

    const newPlanetList = [...planetList];

    setPlanetList(newPlanetList);
  };

  const handleColonizeClick = (uuid: string) => {
    const planetToColonize = planetList.find((planet) => planet.uuid === uuid);

    invariant(planetToColonize);

    planetToColonize.owned = true;

    const newPlanetList = [...planetList];

    setPlanetList(newPlanetList);
  };

  return (
    <Stack p="16px">
      <Heading as="h1" size="2xl">
        Planets!
      </Heading>
      <Tabs>
        <TabList fontFamily="Titillium Web">
          <Tab>Galaxy</Tab>
          <Tab>Empire</Tab>
          <Tab>Fleet</Tab>
          <Tab>Race</Tab>
          <Tab>Technology</Tab>
        </TabList>
        <TabPanels>
          <TabPanel>
            <Heading as="h2">Galaxy</Heading>
            <PlanetList
              planetList={planetList}
              handleScanClick={handleScanClick}
              handleColonizeClick={handleColonizeClick}
            ></PlanetList>
          </TabPanel>
          <TabPanel>
            <Heading as="h2">Empire</Heading>
            <PlanetList
              planetList={planetList.filter((planet) => planet.owned)}
              handleScanClick={handleScanClick}
              handleColonizeClick={handleColonizeClick}
            ></PlanetList>
          </TabPanel>
          <TabPanel>
            <Heading as="h2">Fleet</Heading>
          </TabPanel>
          <TabPanel>
            <Heading as="h2">Race</Heading>
          </TabPanel>
          <TabPanel>
            <Heading as="h2">Technology</Heading>
            <Box>Exploration</Box>
            <Box>Expansion</Box>
            <Box>Exploitation</Box>
            <Box>Externmination</Box>
          </TabPanel>
        </TabPanels>
      </Tabs>
    </Stack>
  );
};

export default Game;
