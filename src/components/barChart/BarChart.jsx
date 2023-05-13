import { scaleLinear, timeFormat, bin, sum, max, scaleBand, svg } from "d3";
import { AxisBottom } from "./AxisBottom";
import { Marks } from "./Marks";
import { useData } from "../../hooks/useData";
import { getData } from "../../api/apiBar";

const margin = { top: 50, right: 50, bottom: 50, left: 50 };
const xValue = (el) => el["Incident Date"];
const yValue = (el) => el["Total Number of Dead and Missing"];

export const BarChart = ({ width = 0, height = 0 }) => {
  const data = useData(getData);

  const innerWidth = width - margin.left - margin.right;
  const innerHeight = height - margin.top - margin.bottom;

  const NanRemovedDates = data.map(xValue).filter((el) => el !== "0NaN");

  const xScale = scaleBand()
    .domain(NanRemovedDates)
    .range([0, innerWidth])
    .paddingInner(0.1);

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

  if (!width || !height || !data) {
    return <pre>Loading...</pre>;
  }

  return (
    <>
      <svg width={width} height={height}>
        <g transform={`translate(${margin.left}, ${margin.top})`}>
          <AxisBottom xScale={xScale} innerHeight={innerHeight} />

          <Marks
            binnedData={binnedData}
            xScale={xScale}
            yScale={yScale}
            innerHeight={innerHeight}
          />
        </g>
      </svg>
    </>
  );
};
