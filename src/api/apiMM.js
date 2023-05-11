import { csv } from "d3";
import { coordinates } from "../components/dateHistogram/coordinates";

export const getData = async (setData) => {
  const csvUrl =
    "https://gist.githubusercontent.com/Kashif-Rezwi/570c36616e43196f1d356c20ba50d1b3/raw/Missing_Migrants_Global_Data.csv";

  const row = (el) => {
    el["Total Number of Dead and Missing"] =
      +el["Total Number of Dead and Missing"];
    el["Number of Children"] = +el["Number of Children"];
    el["Number of Dead"] = +el["Number of Dead"];
    el["Number of Females"] = +el["Number of Females"];
    el["Number of Males"] = +el["Number of Males"];
    el["Number of Survivors"] = +el["Number of Survivors"];
    el["Total Number of Dead and Missing"] =
      +el["Total Number of Dead and Missing"];
    el["Incident Date"] = new Date(el["Incident Date"]);
    // this function covert coordinates string into a array of 2 values lattitude and longitude
    const [lat, lng] = coordinates(el.Coordinates);
    el.Coordinates = { lat, lng };

    return el;
  };

  csv(csvUrl, row) // d3.csv
    .then((res) => {
      setData(res);
    })
    .catch((err) => {
      console.log(err.message);
    });
};
