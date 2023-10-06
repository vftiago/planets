import Terran from "./Terran";
import NoAtmosphere from "./NoAtmosphere";
import { PlanetType } from "../../domains/planets/planet";
import Lava from "./Lava";
import Ice from "./Ice";
import AridColors from "./AridColors";
import Gas from "./Gas";
import GasRing from "./GasRing";
import Ocean from "./Ocean";

type PlanetObjectProps = {
  seed: number;
  type: PlanetType;
  rotation: number;
};

const Planet = ({ seed, type, rotation }: PlanetObjectProps) => {
  return <Ocean seed={seed} rotation={rotation} />;

  switch (type) {
    case PlanetType.Terran:
      return <Terran seed={seed} rotation={rotation} />;
    case PlanetType.Lava:
      return <Lava seed={seed} rotation={rotation} />;
    case PlanetType.Ice:
      return <Ice seed={seed} rotation={rotation} />;
    case PlanetType.Arid:
      return <AridColors seed={seed} rotation={rotation} />;
    case PlanetType.Gas:
      return <Gas seed={seed} rotation={rotation} />;
    case PlanetType.GasRing:
      return <GasRing seed={seed} rotation={rotation} />;
    default:
      return <NoAtmosphere seed={seed} rotation={rotation} />;
  }
};

export default Planet;
