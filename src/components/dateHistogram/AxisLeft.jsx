export const AxisLeft = ({ yScale }) => {
  return yScale
    .ticks()
    .filter((el, i) => i % 2 === 0)
    .map((tickValue) => (
      <g
        className="ticks"
        key={tickValue}
        transform={`translate(0,${yScale(tickValue)})`}
      >
        <text style={{ textAnchor: "end" }} dy={"5px"} dx={"-20px"}>
          {tickValue}
        </text>
      </g>
    ));
};
