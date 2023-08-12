import { css } from "@emotion/css";
import { useState } from "react";
import invariant from "tiny-invariant";
import { Planet } from "./domains/planets/planet";
import { generatePlanet } from "./domains/planets/planetGenerator";
import Header from "./Header";
import NavigationMenu from "./NavigationMenu";
import { PlanetList } from "./Planets/PlanetList";

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
    <div className={appContainerStyles}>
      <Header />
      <NavigationMenu />
      <PlanetList planetList={planetList} handleScanClick={handleScanClick}></PlanetList>
    </div>
  );
};

export default Game;

const appContainerStyles = css`
  height: 100vh;
  font-family: "Red Alert", sans-serif;
  background-color: #181a1f;
  color: white;
  display: flex;
  flex-direction: column;
  gap: 16px;
  padding: 16px;
`;
