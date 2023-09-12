import { View } from "@react-three/drei";
import { MutableRefObject, useRef } from "react";
import Planet from "../3d/Planet/Planet";
import { PlanetType } from "../domains/planets/planet";

const PlanetView = ({
  seed,
  type,
  planetRef,
}: {
  seed: number;
  type: PlanetType;
  planetRef: MutableRefObject<HTMLElement>;
}) => {
  const viewRef = useRef(
    <View track={planetRef}>
      <Planet seed={seed} type={type} />
    </View>
  );

  return viewRef.current;
};

export default PlanetView;
