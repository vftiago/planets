import Terran from "./Terran";
import NoAtmosphere from "./NoAtmosphere";
import { PlanetType } from "../../domains/planets/planet";
import Lava from "./Lava";
import Ice from "./Ice";
import AridTexture from "./AridTexture";
import AridColors from "./AridColors";
import Gas from "./Gas";
import GasRing from "./GasRing";

type PlanetObjectProps = {
  seed: number;
  type: PlanetType;
};

const Planet = ({ seed, type }: PlanetObjectProps) => {
  switch (type) {
    case PlanetType.Terran:
      return <Terran seed={seed} />;
    case PlanetType.Lava:
      return <Lava seed={seed} />;
    case PlanetType.Ice:
      return <Ice seed={seed} />;
    case PlanetType.Arid:
      return <AridColors seed={seed} />;
    case PlanetType.Gas:
      return <Gas seed={seed} />;
    case PlanetType.GasRing:
      return <GasRing seed={seed} />;
    default:
      return <NoAtmosphere seed={seed} />;
  }
};

export default Planet;
