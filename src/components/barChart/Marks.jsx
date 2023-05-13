export const Marks = ({ binnedData, xScale, yScale, innerHeight }) => {
  return (
    <g className="marks">
      {binnedData.map((bin, i) => (
        <rect
          key={i}
          x={xScale(bin.incidentYear)}
          y={yScale(bin.totalDeadAndMissing)}
          width={xScale.bandwidth()}
          height={innerHeight - yScale(bin.totalDeadAndMissing)}
          fill="#4589ff"
        >
          <title>{bin.totalDeadAndMissing}</title>
        </rect>
      ))}
    </g>
  );
};
