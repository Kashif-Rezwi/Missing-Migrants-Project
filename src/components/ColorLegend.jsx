export const ColorLegend = ({ colorScale, scatterPlotSize }) => {
  const migrantStatsName = [
    "Dead and Missing",
    "Dead",
    "Missing",
    "Survivors",
    "Start Date",
    "End Date",
  ];
  return colorScale.domain().map((domainValue, i) => {
    return (
      <g transform={`translate(50, ${i * 30})`} key={i}>
        <circle cy={-4.5} fill={colorScale(domainValue)} r={scatterPlotSize} />
        <text className="migrantStats" x={15}>
          {migrantStatsName[i]} {domainValue}
        </text>
      </g>
    );
  });
};
