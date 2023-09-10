import { View } from "@react-three/drei";
import PlanetObject from "../3d/Planet/Planet";
import { MutableRefObject, useRef } from "react";

const PlanetView = ({ seed, planetRef }: { seed: number; planetRef: MutableRefObject<HTMLElement> }) => {
  const viewRef = useRef(
    <View track={planetRef}>
      <PlanetObject seed={seed} />
    </View>
  );

  return viewRef.current;
};

export default PlanetView;
