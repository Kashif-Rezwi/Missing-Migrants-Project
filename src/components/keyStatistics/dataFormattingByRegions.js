export const dataFormattingByRegions = (DATA) => {
  const binnedData = {};

  // Iterate over each row of the data
  DATA.forEach((row) => {
    const region = row["Region of Incident"];
    const totalDeadAndMissing = parseInt(
      row["Total Number of Dead and Missing"]
    );

    // Check if the region already exists in the binned data object
    if (region in binnedData) {
      // If the region exists, increment the total dead and missing count
      binnedData[region] += totalDeadAndMissing;
    } else {
      // If the region doesn't exist, add it to the binned data object
      binnedData[region] = totalDeadAndMissing;
    }
  });

  const binnedDataArray = Object.entries(binnedData);
  let newBinnedData = binnedDataArray.map((el) => {
    return {
      RegionOfIncident: el[0],
      TotalNumberOfDeadAndMissing: el[1],
    };
  });

  return newBinnedData;
};
