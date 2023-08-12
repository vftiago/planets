import { ChangeEvent, useState } from "react";
import { Planet } from "../domains/planets/planet";
import { PlanetCard } from "./PlanetCard";
import { Box, Heading, Input, Stack, Wrap } from "@chakra-ui/react";

type FilterOptions = {
  searchInput: string;
};

export const PlanetList = ({ planetList, handleScanClick }: { planetList: Planet[]; handleScanClick: (uuid: string) => void }) => {
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
      <Heading as="h2">Galaxy</Heading>
      <Input size="lg" onChange={handleSearchInputChange} />
      <Wrap spacing={8}>
        {filteredPlanetList.map((planet) => {
          return (
            <Box key={planet.uuid}>
              <PlanetCard planet={planet} onScanClick={handleScanClick}></PlanetCard>
            </Box>
          );
        })}
      </Wrap>
    </Stack>
  );
};
