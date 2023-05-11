import { useEffect, useState } from "react";
import { getData } from "../api/apiMM";

export const useData = () => {
  const [data, setData] = useState([]);
  // console.log(data[0]);
  useEffect(() => {
    getData(setData);
  }, []);

  return data;
};
