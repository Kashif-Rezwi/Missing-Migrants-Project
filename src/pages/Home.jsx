import { useEffect, useRef, useState } from "react";
import { WorldMap } from "../components/WorldMap";
import { BarChart } from "../components/barChart/BarChart";
import homeStyle from "../components/home/home.module.css";

export const Home = () => {
  const svgBarChart = useRef();
  const [dimentions, setDimentions] = useState({ width: 0, height: 0 });

  useEffect(() => {
    getSvgContainerSize();
    // listen for resize changes, and detect dimensions again when they change
    window.addEventListener("resize", getSvgContainerSize);
    // cleanup event listener
    return () => window.removeEventListener("resize", getSvgContainerSize);
  }, [dimentions.width]);

  const getSvgContainerSize = () => {
    const width = svgBarChart.current.clientWidth;
    const height = svgBarChart.current.clientHeight;
    setDimentions({ width, height });
  };
  console.log(svgBarChart);

  return (
    <>
      <section className={homeStyle.home}>
        <div className={homeStyle.bannerDiv}>
          <img src="./Images/banner1.jpg" alt="banner1" />
          <div>
            <img src="./Images/banner3.jpg" alt="banner3" />
          </div>
          <div>
            <img src="./Images/banner2.jpg" alt="banner2" />
          </div>
        </div>

        <div className={homeStyle.worldMapVisual}>
          <div>
            <h1>DEATHS AND MISSINGS DURING MIGRATION </h1>
            <h1>RECORDED SINCE 2014, BY REGION AND TIMESPAN OF INCIDENTS.</h1>
          </div>

          <div className={homeStyle.multiVisualComp}>
            <WorldMap />
          </div>

          <div className={homeStyle.disclaimer}>
            <p>
              <span>Disclaimer:</span> The boundaries and names shown and the
              designations used on this map do not imply official endorsement or
              acceptance by the International Organization for Migration. Data
              represent minimum estimates and locations are approximate. These
              figures were last updated on 02 May 2023.
            </p>
          </div>
        </div>

        <div className={homeStyle.dataDiv}>
          <div>
            <img src="./Images/data_logo.png" alt="" />
          </div>
          <div>
            <h1>DATA</h1>
            <p>
              Missing Migrants Project tracks incidents involving migrants,
              including refugees and asylum-seekers, who have died or gone
              missing in the process of migration towards an international
              destination.
            </p>
            <div>
              <button>Original Data Source</button>
              <button>Custom Data Source</button>
            </div>
          </div>
        </div>

        <div className={homeStyle.migrantsBarChart}>
          <div>
            <img src="./Images/migrants.jpeg" alt="migrants" />
          </div>
          <div ref={svgBarChart}>
            <BarChart width={dimentions.width} height={dimentions.height} />
          </div>
        </div>
      </section>
    </>
  );
};
