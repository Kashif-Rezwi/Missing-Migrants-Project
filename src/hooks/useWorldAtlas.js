import { useEffect, useState } from "react";
import { apiWorldAtlas } from "../api/apiWorldAtlas";

export const useWorldAtlas = () => {
  const [data, setData] = useState([]);
  // console.log(data);
  useEffect(() => {
    apiWorldAtlas(setData);
  }, []);

  return data;
};
