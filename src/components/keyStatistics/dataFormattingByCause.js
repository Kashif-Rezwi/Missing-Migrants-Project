const keyStatisticsImages = [
  ["Violence", "./Images/violence.png"],
  ["Sickness", "./Images/sickness.png"],
  ["Vehicle", "./Images/vehicle_accident.png"],
  ["Accidental", "./Images/accident.png"],
  ["Drowning", "./Images/drowning.png"],
  ["unknown", "./Images/unknown.png"],
  ["Harsh", "./Images/harshenvironment.png"],
];

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
      let multipleCause = cause.split(",");
      for (let i = 0; i <= multipleCause.length - 1; i++) {
        if (multipleCause[i] in binnedData) {
          binnedData[multipleCause[i]] += totalDeadAndMissing;
          return;
        }
      }
      // If the cause doesn't exist, add it to the binned data object
      binnedData[cause] = totalDeadAndMissing;
    }
  });

  const binnedDataArray = Object.entries(binnedData);
  let newBinnedData = binnedDataArray.map((el) => {
    for (let i = 0; i <= keyStatisticsImages.length - 1; i++) {
      let arr = el[0].split(" ");
      if (arr.includes(keyStatisticsImages[i][0])) {
        let poster = keyStatisticsImages[i][1];
        return {
          CauseOfIncident: el[0],
          TotalNumberOfDeadAndMissing: el[1],
          causePoster: poster,
        };
      }
    }
  });

  return newBinnedData;
};
