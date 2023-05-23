import { bin, format, scaleBand } from "d3";
import { getData } from "../../api/apiBar";
import { useData } from "../../hooks/useData";
import keyStatistics from "../keyStatistics/keyStatistics.module.css";

export const KeyStatistics = () => {
  const data = useData(getData);
  const formatNumbers = format(",");

  const totalDeadMissing = data.reduce(
    (acm, el) => acm + el["Total Number of Dead and Missing"],
    0
  );

  const totalDeaths = data.reduce((acm, el) => acm + el["Number of Dead"], 0);

  const totalMissings = totalDeadMissing - totalDeaths;

  //   const incidentArea = (el) => el["Region of Incident"];

  //   const xScale = scaleBand().domain(data);

  //   const binnedData = bin().value(incidentArea).thresholds(xScale.domain())(
  //     data
  //   );

  //   console.log(binnedData);
  return (
    <>
      <h1>KEY STATISTICS SINCE 2014</h1>
      <div className={keyStatistics.firstBox}>
        <div>
          <img src="./Images/flower.svg" alt="flower" />
          <p>
            Missing Migrants Project has recorded the deaths of{" "}
            {formatNumbers(totalDeadMissing)} people since 2014.
          </p>
        </div>
        <div>
          <img src="./Images/boat.svg" alt="boat" />
          <p>
            The remains of {formatNumbers(totalMissings)} people who lost their
            lives during migration have not been recovered.
          </p>
        </div>
        <div>
          <img src="./Images/route.svg" alt="route" />
          <p>
            The most deadly route is the Central Mediterranean route, where at
            least 21,209 people have died since 2014.
          </p>
        </div>
      </div>
    </>
  );
};
