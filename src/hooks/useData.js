import { useEffect, useState } from "react";

export const useData = (getData) => {
  const [data, setData] = useState([]);
  // console.log(data[0]);
  useEffect(() => {
    getData(setData);
  }, []);

  return data;
};
