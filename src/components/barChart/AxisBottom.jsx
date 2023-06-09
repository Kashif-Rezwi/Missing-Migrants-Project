import barChartStyles from "./barChart.module.css";

export const AxisBottom = ({ xScale, innerHeight }) => {
  // xScale.domain() has array of unique dates and below we are mapping the date for xScale ticks
  return xScale.domain().map((tickValue, i) => {
    // console.log(tickValue);
    return (
      <g key={tickValue} transform={`translate(${xScale(tickValue)}, 0)`}>
        <text
          className={barChartStyles.labels}
          style={{ textAnchor: "middle" }}
          dx={xScale.bandwidth() / 2}
          dy={"30px"}
          y={innerHeight}
        >
          {tickValue}
        </text>
      </g>
    );
  });
};
