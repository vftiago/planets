import Terran from "./Planet/Terran";
import NoAtmosphere from "./Planet/NoAtmosphere";
import { PlanetType } from "../domains/planets/planet";
import Lava from "./Planet/Lava";
import Ice from "./Planet/Ice";
import AridColors from "./Planet/AridColors";
import Gas from "./Planet/Gas";
import GasRing from "./Planet/GasRing";
import Ocean from "./Planet/Ocean";

type PlanetObjectProps = {
  seed: number;
  type: PlanetType;
  rotation: number;
};

const Planet = ({ seed, type, rotation }: PlanetObjectProps) => {
  switch (type) {
    case PlanetType.Terran:
      return <Terran seed={seed} rotation={rotation} />;
    case PlanetType.Ocean:
      return <Ocean seed={seed} rotation={rotation} />;
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
