import { ChangeEvent, RefObject, useState } from "react";
import { Planet } from "../domains/planets/planet";
import { PlanetCard } from "./PlanetCard";
import { Box, Input, Stack, Wrap } from "@chakra-ui/react";

type FilterOptions = {
  searchInput: string;
};

export const PlanetList = ({
  eventSourceRef,
  planetList,
  handleScanClick,
  handleColonizeClick,
}: {
  eventSourceRef: RefObject<HTMLDivElement>;
  planetList: Planet[];
  handleScanClick: (uuid: string) => void;
  handleColonizeClick: (uuid: string) => void;
}) => {
  const [filterOptions, setfilterOptions] = useState<FilterOptions>({
    searchInput: "",
  });

  const handleSearchInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    const searchInput = e.target.value;

    const newFilterOptions = {
      ...filterOptions,
      searchInput,
    };

    setfilterOptions(newFilterOptions);
  };

  const filteredPlanetList = planetList.filter((planet) => planet.uuid.includes(filterOptions?.searchInput));

  return (
    <Stack spacing="16px">
      <Input size="lg" onChange={handleSearchInputChange} />
      <Wrap spacing={8} ref={eventSourceRef}>
        {filteredPlanetList.map((planet) => {
          return (
            <Box key={planet.uuid}>
              <PlanetCard
                planet={planet}
                onScanClick={handleScanClick}
                onColonizeClick={handleColonizeClick}
              ></PlanetCard>
            </Box>
          );
        })}
      </Wrap>
    </Stack>
  );
};
