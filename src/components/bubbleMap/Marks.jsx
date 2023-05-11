import { geoMercator, geoPath } from "d3-geo";
import { useMemo } from "react";

// to project a map we need a prejection
const projection = geoMercator();
// to use  the projection we need a path (geoPath)
const path = geoPath(projection);

const sizeValueDead = (el) => el["Number of Dead"];
const sizeValueMissing = (el) => el["Number of Survivors"];

export const Marks = ({
  worldAtlas: { land, interiors },
  data,
  sizeScale,
  sizeValue,
}) => {
  return (
    <g className="marks">
      {useMemo(
        () => (
          <>
            {/* land.features has the coordinates and the type of geometry to use in the map so below we are mapping the coordinates => d={path(feature)} */}
            {land.features.map((feature, i) => (
              <path key={i} className="land" d={path(feature)} />
            ))}
            {/* this path below is for interior line like country borders */}
            <path className="interiors" d={path(interiors)} />
          </>
        ),
        [path, land, interiors]
      )}

      {/* below is the function which returns some point on the map according to the data we want to visualize */}
      {data.map((el, i) => {
        const { lat, lng } = el.Coordinates;
        //projection return lattitide and longitude coordinates => below lat and lng used for creating points by the coordinates given
        const [x, y] = projection([lat, lng]);
        // console.log(el);
        return (
          <>
            <circle
              key={i}
              cx={x}
              cy={y}
              // here below we are returning tyhe actual size of the data by sizeScale func
              r={sizeScale(sizeValue(el))}
              fill="#D21312"
              opacity={0.3}
            >
              {/* below is the tip tool which will show you the data where mouse tip is hovered */}
              <title>{el["Region of Incident"]}</title>
            </circle>

            {/* <circle
              cx={x}
              cy={y}
              // here below we are returning tyhe actual size of the data by sizeScale func
              r={sizeScale(sizeValueMissing(el))}
              fill="#03C988"
              opacity={0.3}
            >
              <title>{el["Region of Incident"]}</title>
            </circle> */}
          </>
        );
      })}
    </g>
  );
};
