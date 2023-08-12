import { css } from "@emotion/css";
import { Planet } from "../domains/planets/planet";
import { Rarity } from "../domains/rarities/rarity";
import Button from "../glass-ui/Button";

export const PlanetCard = ({ planet, onScanClick }: { planet: Planet; onScanClick: (uuid: string) => void }) => {
  const { uuid, identified, rarity, biomes } = planet;

  return (
    <div className={getPlanetCardStyles(rarity, identified)}>
      <p>{uuid}</p>
      <p>{identified ? rarity : "???"}</p>
      <ul className={biomeListStyles}>{identified ? biomes.map((biome) => <li key={`${uuid}-${biome}`}>{biome}</li>) : "???"}</ul>
      <div>
        <Button variant={identified ? "primary" : "secondary"} onClick={() => (identified ? alert(`${uuid} colonized`) : onScanClick(uuid))}>
          {identified ? "Colonize" : "Scan"}
        </Button>
      </div>
    </div>
  );
};

const biomeListStyles = css`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100%;
  gap: 8px;
  background-color: rgba(0, 0, 0, 0.5);
`;

const getPlanetCardStyles = (rarity: Rarity, identified: boolean) => {
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
        borderColor = "white";
        break;
      default:
        borderColor = "grey";
        break;
    }
  } else {
    borderColor = "black";
  }

  return css`
    display: flex;
    flex-direction: column;
    font-size: 1rem;
    font-family: "Titillium Web";
    gap: 16px;
    height: 18vh;
    width: 18vw;
    padding: 8px;
    border: 1px solid ${borderColor};
    background-color: #282c34;
    backdrop-filter: blur(10px);
  `;
};
