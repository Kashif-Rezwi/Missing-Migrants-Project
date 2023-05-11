export const AxisBottom = ({ xScale, innerHeight, tickFormat }) => {
  return xScale
    .ticks()
    .filter((el, i) => i !== xScale.ticks().length - 1)
    .map((tickValue) => (
      <g
        className="ticks"
        key={tickValue}
        transform={`translate(${xScale(tickValue)}, 0)`}
      >
        <text style={{ textAnchor: "middle" }} dy={"30px"} y={innerHeight}>
          {tickFormat(tickValue)}
        </text>
      </g>
    ));
};
