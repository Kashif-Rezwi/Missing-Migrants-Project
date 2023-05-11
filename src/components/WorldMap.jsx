import { useWorldAtlas } from "../hooks/useWorldAtlas";
import { useData } from "../hooks/useData";
import { BubbleMap } from "./bubbleMap/BubbleMap";
import { DateHistogram } from "./dateHistogram/DateHistogram";
import { useState } from "react";

export const WorldMap = () => {
  const width = 960;
  const height = 500;
  const dateHistogramSize = 0.3;
  const worldAtlas = useWorldAtlas();
  const data = useData();
  // updateing the brush selected data
  const [brushExtent, setBrushExtent] = useState();

  const xValue = (el) => el["Incident Date"];

  if (worldAtlas.length === 0 || data.length === 0) {
    return <pre>Loading...</pre>;
  }
  // if brushExtent data is available only the filter the data
  const filteredData = brushExtent
    ? data.filter((el) => {
        // return incident date
        const date = xValue(el);
        // return all dates data between tart and end dates
        return date > brushExtent[0] && date < brushExtent[1];
      })
    : data;

  //counting total dead and missing
  const totalDeadAndMissing = filteredData.reduce(
    (a, el) => a + el["Total Number of Dead and Missing"],
    0
  );

  //counting total dead only
  const totalDead = filteredData.reduce((a, el) => a + el["Number of Dead"], 0);

  //counting total missing only
  const totalMissing = totalDeadAndMissing - totalDead;

  //counting total survivors only
  const totalSurvivors = filteredData.reduce(
    (a, el) => a + el["Number of Survivors"],
    0
  );

  //counting total timeSpan
  const timeSpan = filteredData
    .filter((el, i) => i === 0 || i === filteredData.length - 1)
    .map((el) => {
      return el["Incident Date"]
        .toString()
        .split(" ")
        .filter((el, i) => i === 1 || i === 3)
        .join("/");
    });

  const startDate = timeSpan[0];
  const endDate = timeSpan[1];

  //live data which is shown in the  map (top-left)
  const displayData = [
    totalDeadAndMissing,
    totalDead,
    totalMissing,
    totalSurvivors,
    startDate,
    endDate,
  ];
  // console.log(data);
  return (
    <svg style={{ minWidth: width }} height={height}>
      <BubbleMap
        data={data}
        filteredData={filteredData}
        worldAtlas={worldAtlas}
      />
      <g transform={`translate(0,${height - dateHistogramSize * height})`}>
        <DateHistogram
          data={data}
          height={dateHistogramSize * height}
          setBrushExtent={setBrushExtent}
          xValue={xValue}
          displayData={displayData}
        />
      </g>
    </svg>
  );
};
