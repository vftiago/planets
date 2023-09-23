import { MutableRefObject, useRef, useState } from "react";
import invariant from "tiny-invariant";
import { Planet } from "./domains/planets/planet";
import { useGeneratePlanet } from "./generators/planetGenerator";
import { PlanetList } from "./Planets/PlanetList";
import { Box, Heading, Stack } from "@chakra-ui/react";
import { Tabs, TabList, Tab, TabPanels, TabPanel } from "@chakra-ui/react";
import { Canvas } from "@react-three/fiber";
import PlanetView from "./Planets/PlanetVIew";

const Game = () => {
  const initialPlanetList = useGeneratePlanet(32);

  const [planetList, setPlanetList] = useState<Planet[]>(initialPlanetList);

  const eventSourceRef = useRef<HTMLDivElement>(null);

  const [tabIndex, setTabIndex] = useState(0);

  const handleTabsChange = (index: number) => {
    setTabIndex(index);
  };

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

  const currentPlanetList = tabIndex === 0 ? planetList : planetList.filter((planet) => planet.owned);

  const shouldRenderPlanets = currentPlanetList.length > 0 && (tabIndex === 0 || tabIndex === 1);

  return (
    <Stack p="16px">
      <Heading as="h1" size="2xl">
        Planets!
      </Heading>
      <Tabs isLazy onChange={handleTabsChange}>
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
            {tabIndex === 0 ? (
              <PlanetList
                eventSourceRef={eventSourceRef}
                planetList={currentPlanetList}
                handleScanClick={handleScanClick}
                handleColonizeClick={handleColonizeClick}
              ></PlanetList>
            ) : null}
          </TabPanel>
          <TabPanel>
            <Heading as="h2">Empire</Heading>
            {tabIndex === 1 ? (
              <PlanetList
                eventSourceRef={eventSourceRef}
                planetList={currentPlanetList}
                handleScanClick={handleScanClick}
                handleColonizeClick={handleColonizeClick}
              ></PlanetList>
            ) : null}
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
      <Canvas
        eventSource={eventSourceRef as MutableRefObject<HTMLElement>}
        style={{
          position: "fixed",
          top: 0,
          left: 0,
          width: "100vw",
          height: "100vh",
          pointerEvents: "none",
        }}
      >
        {shouldRenderPlanets &&
          currentPlanetList.map(({ uuid, seed, type, rotation, planetRef }) => {
            return <PlanetView key={uuid} seed={seed} type={type} rotation={rotation} planetRef={planetRef} />;
          })}
      </Canvas>
    </Stack>
  );
};

export default Game;
