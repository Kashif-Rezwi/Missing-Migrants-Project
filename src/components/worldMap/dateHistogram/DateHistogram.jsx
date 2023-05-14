import {
  bin,
  brushX,
  extent,
  max,
  scaleLinear,
  scaleOrdinal,
  scaleTime,
  select,
  sum,
  timeFormat,
  timeMonths,
} from "d3";
import { Marks } from "./Marks";
import { AxisBottom } from "./AxisBottom";
import { AxisLeft } from "./AxisLeft";
import { useEffect, useMemo, useRef } from "react";
import { ColorLegend } from "./ColorLegend";

const scatterPlotSize = 5;
const margin = { top: 0, right: 0, bottom: 45, left: 100 };

const yValue = (el) => el["Total Number of Dead and Missing"];

export const DateHistogram = ({
  data,
  width,
  height,
  setBrushExtent,
  xValue,
  displayData,
}) => {
  const innerWidth = width - margin.left - margin.right;
  const innerHeight = height - margin.top - margin.bottom;

  // this returns a timeScale in domain extent returns array of min and max value for domain and nice func will beautify the chart by adjusting the visual data
  const xScale = useMemo(
    () =>
      scaleTime().domain(extent(data, xValue)).range([0, innerWidth]).nice(),
    [data, xValue, innerWidth]
  );

  // below is the process of binned aggregation to find how many missing and dead within a month which is also called data reduction technique.
  const binnedData = useMemo(() => {
    // xScale.domain() return 2 variable start and stop
    const [start, stop] = xScale.domain();

    return (
      bin()
        //bin has value func for desideing to bin by datesand xValue is the date
        .value(xValue)
        //The domain parameter specifies the range of values for the input data. It is an array with two elements representing the minimum and maximum values of the input data.
        .domain(xScale.domain())
        // The thresholds parameter specifies the boundaries between each bin. It is an array of values that represent the endpoints of each bin.
        .thresholds(timeMonths(start, stop))(data)
        // above we are using timeMonths func for geting array of months
        .map((arr) => ({
          // here we are making sum of total dead and missing using sum func which need a array and a accessor => sum(array, yValue). yValue is a func which returns total dead and missing values
          y: sum(arr, yValue),
          // adding starting and ending date for better visualization
          x0: arr.x0,
          x1: arr.x1,
        }))
    );
  }, [xValue, yValue, xScale, data]);

  // below is yScale ehich is a linearScale for showing total dead and mising data
  const yScale = useMemo(
    () =>
      scaleLinear()
        // in domain we are using binnedData  because binnedData has the total dead and missing data for each month and a folowup func that specifies that to use  particular data which is sum from the binnedData.
        .domain([0, max(binnedData, (el) => el.y)])
        .range([innerHeight, 0])
        .nice(),
    [binnedData, innerHeight]
  );

  const histogramLabelLeft = "Total Number of Dead and Missing";
  const histogramLabelBottom = "Incident Date";

  const xAxisTickFormat = timeFormat("%b/%y");

  const brushRef = useRef();
  // implementing brushX.
  const brush = useMemo(
    () =>
      brushX()
        //extent also return [[y start coordniates], [y end coordinates]]
        .extent([
          [0, 0],
          [innerWidth, innerHeight],
        ])
        // on is a event here the event is brush and end
        .on("brush end", (event) => {
          // inverts converts the number into dates [start and end] and sets to the brushExtent variable using setBrushExtent
          setBrushExtent(event.selection?.map(xScale.invert));
          // event.selection refers to the current selection range in the D3 brush event.
          // event.selection? it means please map only after event is occurs
        }),
    [innerWidth, innerHeight, xScale]
  );

  useEffect(() => {
    // brush can work only after using the select func
    brush(select(brushRef.current));
  }, [, innerHeight, innerWidth]);

  const colorValue = (el) => el;
  // creating colorScale with scaleOrdinal func which maps each unique input value to a distinct output value, typically used for creating a color or shape encoding based on categorical data.
  const colorScale = scaleOrdinal()
    // displaData has a range of unique values maping with range values
    .domain(displayData.map(colorValue))
    // range has a range of unique color values
    .range(["#D21312", "#FC2947", "#FF8B13", "#03C988", "#332FD0", "#0002A1"]);

  return (
    <>
      <g transform={`translate(${margin.left}, ${margin.top})`}>
        {/* this returns live data stats */}
        <g transform={`translate(-132, -325)`}>
          <ColorLegend colorScale={colorScale} scatterPlotSize={"6px"} />
        </g>

        {/* this returns bottom axis scale */}
        <AxisBottom
          xScale={xScale}
          innerHeight={innerHeight}
          tickFormat={xAxisTickFormat}
        />
        {/* this returns left axis scale */}
        <AxisLeft yScale={yScale} />
        {/* this text returns data label */}
        <text
          className="chart-label"
          dy={"-80px"}
          dx={"25px"}
          textAnchor="middle"
          transform={`translate(0, ${innerHeight / 2}) rotate(-90)`}
        >
          {histogramLabelLeft}
        </text>

        <Marks
          binnedData={binnedData}
          xScale={xScale}
          yScale={yScale}
          innerHeight={innerHeight}
          scatterPlotSize={scatterPlotSize}
        />
        {/* this returns brush for selecting particular area and show the data of it */}
        <g ref={brushRef} />
      </g>
    </>
  );
};
