import { format } from "d3";
import { getData } from "../../api/apiBar";
import { useData } from "../../hooks/useData";
import keyStatistics from "../keyStatistics/keyStatistics.module.css";
import { dataFormattingByRegions } from "./dataFormattingByRegions";
import { dataFormattingByCause } from "./dataFormattingByCause";

export const KeyStatistics = () => {
  const data = useData(getData);
  const formatNumbers = format(",");

  const totalDeadMissing = data.reduce(
    (acm, el) => acm + el["Total Number of Dead and Missing"],
    0
  );

  const totalDeaths = data.reduce((acm, el) => acm + el["Number of Dead"], 0);

  const totalMissings = totalDeadMissing - totalDeaths;

  const formattedDataByRegions = dataFormattingByRegions(data).sort(
    (a, b) => b.TotalNumberOfDeadAndMissing - a.TotalNumberOfDeadAndMissing
  );

  const formattedDataByCause = dataFormattingByCause(data);

  console.log(formattedDataByCause);
  return (
    <>
      <h1>KEY STATISTICS SINCE 2014</h1>
      <div className={keyStatistics.firstBox}>
        <div>
          <img src="./Images/flower.svg" alt="flower" />
          {!totalDeadMissing ? (
            <h4>...Loading</h4>
          ) : (
            <p>
              Missing Migrants Project has recorded the deaths of{" "}
              {formatNumbers(totalDeadMissing)} people since 2014.
            </p>
          )}
        </div>
        <div>
          <img src="./Images/boat.svg" alt="boat" />
          {!totalMissings ? (
            <h4>...Loading</h4>
          ) : (
            <p>
              The remains of {formatNumbers(totalMissings)} people who lost
              their lives during migration have not been recovered.
            </p>
          )}
        </div>
        <div>
          <img src="./Images/route.svg" alt="route" />
          {!formattedDataByRegions[0]?.RegionOfIncident ? (
            <h4>...Loading</h4>
          ) : (
            <p>
              The most deadly route is the{" "}
              <strong>
                {" "}
                Central {formattedDataByRegions[0]?.RegionOfIncident}{" "}
              </strong>{" "}
              route, where at least{" "}
              {formatNumbers(
                formattedDataByRegions[0]?.TotalNumberOfDeadAndMissing
              )}{" "}
              people have died since 2014.
            </p>
          )}
        </div>
      </div>
      <div className={keyStatistics.lastBox}>
        <h1>CAUSE OF DEATH</h1>
        <div>
          {formattedDataByCause.length === 0 ? (
            <h4 style={{ textAlign: "center", width: "100%" }}>...Loading</h4>
          ) : (
            formattedDataByCause?.map((el, i) => {
              return (
                <div>
                  <img src={el.causePoster} alt={el.CauseOfIncident} />
                  <h1>{formatNumbers(el.TotalNumberOfDeadAndMissing)}</h1>
                  <p>{el.CauseOfIncident}</p>
                </div>
              );
            })
          )}
        </div>
      </div>
    </>
  );
};
