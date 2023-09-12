import Terran from "./Terran";
import NoAtmosphere from "./NoAtmosphere";
import { PlanetType } from "../../domains/planets/planet";

type PlanetObjectProps = {
  seed: number;
  type: PlanetType;
};

const Planet = ({ seed, type }: PlanetObjectProps) => {
  return type === PlanetType.Terran ? <Terran seed={seed} /> : <NoAtmosphere seed={seed} />;
};

export default Planet;
