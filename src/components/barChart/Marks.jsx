import barChartStyles from "./barChart.module.css";

export const Marks = ({ binnedData, xScale, yScale, innerHeight }) => {
  return (
    <g>
      {binnedData.map((bin, i) => (
        <rect
          className={barChartStyles.bars}
          key={i}
          x={xScale(bin.incidentYear)}
          y={yScale(bin.totalDeadAndMissing)}
          width={xScale.bandwidth()}
          height={innerHeight - yScale(bin.totalDeadAndMissing)}
          fill="#d9e0f1"
        />
      ))}
    </g>
  );
};
