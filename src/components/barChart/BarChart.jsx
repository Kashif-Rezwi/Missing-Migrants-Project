import { scaleLinear, timeFormat, bin, sum, max, scaleBand, svg } from "d3";
import { AxisBottom } from "./AxisBottom";
import { Marks } from "./Marks";
import { useData } from "../../hooks/useData";
import { getData } from "../../api/apiBar";
import { useEffect, useMemo, useRef, useState } from "react";
import barChartStyles from "./barChart.module.css";
import { AxisTop } from "./AxisTop";

const xValue = (el) => el["Incident Date"];
const yValue = (el) => el["Total Number of Dead and Missing"];

export const BarChart = () => {
  const data = useData(getData);
  const svgBarChart = useRef(null);
  const [width, setWidth] = useState(0);
  const [height, setHeight] = useState(0);
  const margin = { top: 100, right: width / 15, bottom: 60, left: width / 15 };

  const innerWidth = width - margin.left - margin.right;
  const innerHeight = height - margin.top - margin.bottom;

  const getSvgContainerSize = () => {
    setWidth(svgBarChart.current.clientWidth);
    setHeight(svgBarChart.current.clientHeight);
  };

  useEffect(() => {
    getSvgContainerSize();
    // listen for resize changes, and detect dimensions again when they change
    window.addEventListener("resize", getSvgContainerSize);
    // cleanup event listener
    return () => window.removeEventListener("resize", getSvgContainerSize);
  }, [svgBarChart]);

  const NanRemovedDates = useMemo(
    () => data.map(xValue).filter((el) => el !== "0NaN"),
    [data, xValue]
  );

  const xScale = useMemo(
    () =>
      scaleBand()
        .domain(NanRemovedDates)
        .range([0, innerWidth])
        .paddingInner(0.5),
    [NanRemovedDates, innerWidth]
  );

  const binnedData = useMemo(
    () =>
      bin()
        .value(xValue)
        .thresholds(xScale.domain())(data)
        .map((arr) => ({
          totalDeadAndMissing: sum(arr, yValue),
          incidentYear: arr.x0,
        })),
    [xValue, xScale, data, yValue]
  );

  const yScale = useMemo(
    () =>
      scaleLinear()
        .domain([0, max(binnedData, (el) => el.totalDeadAndMissing)])
        .range([innerHeight, 0])
        .nice(),
    [binnedData, innerHeight]
  );

  // console.log(binnedData);

  return (
    <div ref={svgBarChart} style={{ width: "100%", height: "100%" }}>
      {(!width || !height || !data) && <pre>Loading...</pre>}
      {width && height && data && (
        <svg width={width} height={height}>
          <g transform={`translate(${margin.left}, ${margin.top})`}>
            <text
              dy={margin.bottom - margin.top}
              dx={-10}
              className={barChartStyles.barsHeading}
              transform={`translate(0, -10)`}
            >
              DEAD AND MISSING BY YEAR
            </text>

            <AxisBottom xScale={xScale} innerHeight={innerHeight} />
            <AxisTop
              yScale={yScale}
              binnedData={binnedData}
              xScale={xScale}
              innerHeight={innerHeight}
            />
            <Marks
              binnedData={binnedData}
              xScale={xScale}
              yScale={yScale}
              innerHeight={innerHeight}
            />
          </g>
        </svg>
      )}
    </div>
  );
};
