import barChartStyles from "./barChart.module.css";

export const AxisTop = ({ binnedData, xScale, yScale, innerHeight }) => {
  // xScale.domain() has array of unique dates and below we are mapping the date for xScale ticks
  return binnedData.map((el, i) => {
    // console.log(tickValue);
    return (
      <g key={i} transform={`translate(${xScale(el.incidentYear)}, 0)`}>
        <text
          className={barChartStyles.labels}
          style={{ textAnchor: "middle" }}
          dx={xScale.bandwidth() / 2}
          y={yScale(el.totalDeadAndMissing) - 8}
        >
          {el.totalDeadAndMissing}
        </text>
      </g>
    );
  });
};
