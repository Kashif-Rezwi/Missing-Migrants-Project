import { max, scaleSqrt } from "d3";
import { Marks } from "./Marks";
import { useMemo } from "react";

const sizeValue = (el) => el["Total Number of Dead and Missing"];
const maxRadious = 15;

export const BubbleMap = ({ data, filteredData, worldAtlas }) => {
  // sizeScale using a squareRoot scale for making such circle on the map.
  const sizeScale = useMemo(
    () =>
      scaleSqrt()
        // this scale has domain for data from 0 to max between size value and data in a array => domain([min, max])
        .domain([0, max(data, sizeValue)])
        // this scale has range for data from 0 to max value in a array for the size of the circle => range([min, max])
        .range([0, maxRadious]),
    [data, sizeValue, maxRadious]
  );

  return (
    <Marks
      worldAtlas={worldAtlas}
      data={filteredData}
      sizeScale={sizeScale}
      sizeValue={sizeValue}
    />
  );
};
