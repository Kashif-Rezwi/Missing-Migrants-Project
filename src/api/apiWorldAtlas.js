import { json } from "d3";
import { feature, mesh } from "topojson";

// for this worldmap we have topoJson data which is an file format and is an extention of geoJson that encodes topology (topology means place or location)
// geoJson : it is an open standard file format that is designed for representing simple geographical features. based on JavaScript Object Notation (JSON)
// we need to convert topoJson data to geoJson data

export const apiWorldAtlas = async (setData) => {
  // topoJsonUrl source = https://www.npmjs.com/package/world-atlas

  const jsonUrl =
    "https://cdn.jsdelivr.net/npm/world-atlas@2/countries-50m.json";

  // parsing json data
  json(jsonUrl)
    .then((topology) => {
      const { countries, land } = topology.objects;
      setData({
        // feature converts topoJson data to geaJson data
        // feature func needs data and object as parameter =>  feature(data, object)
        land: feature(topology, land),
        //mesh is usefull for rendering strokes in complicated objects efficiently, as edges that are shared by multiple features are only stroked once. => mesh(topology, countries) we can also provide a 3rd parameter to filter the mesh data. below we are using filter to produce a mesh of interior boundaries => (a, b) => a!==b here compareing 2 features that there not the same and if same not return.
        interiors: mesh(topology, countries, (a, b) => a !== b),
      });
    })
    .catch((err) => {
      console.log(err.message);
    });
};
