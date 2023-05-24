export const dataFormattingByCause = (DATA) => {
  const binnedData = {};

  // Iterate over each row of the data
  DATA.forEach((row) => {
    const cause = row["Cause of Death"];
    const totalDeadAndMissing = parseInt(
      row["Total Number of Dead and Missing"]
    );

    // Check if the cause already exists in the binned data object
    if (cause in binnedData) {
      // If the cause exists, increment the total dead and missing count
      binnedData[cause] += totalDeadAndMissing;
    } else {
      // If the cause doesn't exist, add it to the binned data object
      binnedData[cause] = totalDeadAndMissing;
    }
  });

  const binnedDataArray = Object.entries(binnedData);
  let newBinnedData = binnedDataArray.map((el) => {
    return {
      CauseOfIncident: el[0],
      TotalNumberOfDeadAndMissing: el[1],
    };
  });

  return newBinnedData;
};
