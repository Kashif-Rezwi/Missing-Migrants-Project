export const Marks = ({ binnedData, xScale, yScale, innerHeight }) => {
  return (
    <g>
      {binnedData.map((bin, i) => (
        <rect
          className="bars"
          key={i}
          x={xScale(bin.incidentYear)}
          y={yScale(bin.totalDeadAndMissing)}
          width={xScale.bandwidth()}
          height={innerHeight - yScale(bin.totalDeadAndMissing)}
          fill="#d9e0f1"
        >
          <title>{bin.totalDeadAndMissing}</title>
        </rect>
      ))}
    </g>
  );
};
