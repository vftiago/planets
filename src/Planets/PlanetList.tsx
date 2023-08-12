import { css } from "@emotion/css";
import { ChangeEvent, useState } from "react";
import { Planet } from "../domains/planets/planet";
import { PlanetCard } from "./PlanetCard";

type FilterOptions = {
	searchInput: string;
};

export const PlanetList = ({
	planetList,
	handleScanClick,
}: {
	planetList: Planet[];
	handleScanClick: (uuid: string) => void;
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

	const filteredPlanetList = planetList.filter((planet) =>
		planet.uuid.includes(filterOptions?.searchInput),
	);

	return (
		<div className={planetListContainerStyles}>
			<h2>Planet List</h2>
			<input type="text" onChange={handleSearchInputChange} />
			<ul className={planetListStyles}>
				{filteredPlanetList.map((planet) => {
					return (
						<li key={planet.uuid}>
							<PlanetCard
								planet={planet}
								onScanClick={handleScanClick}
							></PlanetCard>
						</li>
					);
				})}
			</ul>
		</div>
	);
};

const planetListContainerStyles = css`
	h2 {
		font-size: 2rem;
	}
`;

const planetListStyles = css`
	display: grid;
	grid-template-columns: repeat(5, 1fr);
	width: 1000px;
	gap: 8px;
	flex-wrap: wrap;
`;
