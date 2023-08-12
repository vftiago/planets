import { useState } from "react";
import invariant from "tiny-invariant";
import { Planet } from "./domains/planets/planet";
import { generatePlanet } from "./domains/planets/planetGenerator";
import { PlanetList } from "./Planets/PlanetList";
import { Heading, Stack } from "@chakra-ui/react";
import { Tabs, TabList, Tab, TabPanels, TabPanel } from "@chakra-ui/react";

const initialPlanetList = new Array(20).fill(false).map(() => generatePlanet());

const Game = () => {
  const [planetList, setPlanetList] = useState<Planet[]>(initialPlanetList);

  const handleScanClick = (uuid: string) => {
    const planetToIdentify = planetList.find((planet) => planet.uuid === uuid);

    invariant(planetToIdentify);

    planetToIdentify.identified = true;

    const newPlanetList = [...planetList];

    setPlanetList(newPlanetList);
  };

  return (
    <Stack p="16px">
      <Heading as="h1" size="2xl">
        Planets!
      </Heading>
      <Tabs>
        <TabList>
          <Tab>Galaxy</Tab>
          <Tab>Empire</Tab>
          <Tab>Technology</Tab>
        </TabList>
        <TabPanels>
          <TabPanel>
            <PlanetList planetList={planetList} handleScanClick={handleScanClick}></PlanetList>
          </TabPanel>
          <TabPanel>
            <PlanetList planetList={planetList.filter((planet) => planet.identified)} handleScanClick={handleScanClick}></PlanetList>
          </TabPanel>
          <TabPanel>Big tech</TabPanel>
        </TabPanels>
      </Tabs>
    </Stack>
  );
};

export default Game;
