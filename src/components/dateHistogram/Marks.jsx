export const Marks = ({ binnedData, xScale, yScale, innerHeight }) => {
  return (
    // this returns histogram data chart
    <g className="marks">
      {binnedData.map((el, i) => (
        <rect
          key={i}
          //horizontally aligned
          x={xScale(el.x0)}
          //vertically aligned
          y={yScale(el.y)}
          //bar width endMonth - startMonth
          width={xScale(el.x1) - xScale(el.x0)}
          //height starts from bottom
          height={innerHeight - yScale(el.y)}
          fill="#D21312"
        />
      ))}
    </g>
  );
};
