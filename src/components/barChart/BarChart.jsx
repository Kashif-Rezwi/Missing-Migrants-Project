import { scaleLinear, timeFormat, bin, sum, max, scaleBand } from "d3";
import { AxisBottom } from "./AxisBottom";
import { Marks } from "./Marks";
import { useData } from "../../hooks/useData";
import { getData } from "../../api/apiBar";
import { useRef } from "react";
import useResizeObserver from "use-resize-observer";

const width = 960;
const height = 500;
const margin = { top: 50, right: 50, bottom: 50, left: 50 };
const dateFormat = timeFormat("%x");
const xValue = (el) => el["Incident Date"];
const yValue = (el) => el["Total Number of Dead and Missing"];
const barChartLabelBottom = "Incident Date";
const barChartLabelLeft = "Total Number of Dead and Missing";

export const BarChart = () => {
  const data = useData(getData);
  const svgRef = useRef();
  const wrapperRef = useRef();
  const dimensions = useResizeObserver(wrapperRef);

  const innerWidth = dimensions?.width || width - margin.left - margin.right;
  const innerHeight = dimensions?.height || height - margin.top - margin.bottom;

  const NanRemovedDates = data.map(xValue).filter((el) => el !== "0NaN");
  const xScale = scaleBand()
    .domain(NanRemovedDates)
    .range([0, innerWidth])
    .paddingInner(0.1)
    .align(0);

  const binnedData = bin()
    .value(xValue)
    .thresholds(xScale.domain())(data)
    .map((arr) => ({
      totalDeadAndMissing: sum(arr, yValue),
      incidentYear: arr.x0,
    }));

  const yScale = scaleLinear()
    .domain([0, max(binnedData, (el) => el.totalDeadAndMissing)])
    .range([innerHeight, 0])
    .nice();

  if (
    //!dimensions || !dimensions.width || !dimensions.height ||
    !data
  ) {
    console.log(dimensions);
    return <pre>Loading...</pre>;
  }

  return (
    <div ref={wrapperRef} style={{ width: "100%", height: "100%" }}>
      <svg
        ref={svgRef}
        width={dimensions?.width || width}
        height={dimensions?.height || height}
      >
        <g transform={`translate(${margin.left}, ${margin.top})`}>
          <AxisBottom
            xScale={xScale}
            binnedData={binnedData}
            innerHeight={innerHeight}
            tickFormat={dateFormat}
          />

          <Marks
            binnedData={binnedData}
            xScale={xScale}
            yScale={yScale}
            innerHeight={innerHeight}
          />
        </g>
      </svg>
    </div>
  );
};
