import { csv, timeFormat } from "d3";

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

    const dateFormat = timeFormat("%Y");
    const date = new Date(el["Incident Date"]);
    el["Incident Date"] = dateFormat(date);

    return el;
  };

  csv(csvUrl, row)
    .then((res) => {
      setData(res);
      console.log(res);
    })
    .catch((err) => {
      console.log(err.message);
    });
};
