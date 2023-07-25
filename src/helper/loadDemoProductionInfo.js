import SampleProductionInfo from "~/jsons/sample_productionInfo.json" assert { type: "json" };

//This function is used to load the demo production info to the database
//Import SampleProductionInfo from "~/jsons/sample_productionInfo.json";

// Function to shuffle the array using the Fisher-Yates algorithm
const shuffleArray = (array) => {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
};

export const loadDemoProductionInfo = async () => {
  // Shuffle the 'SampleProductionInfo' array
  const shuffledProductionInfo = [...SampleProductionInfo];
  shuffleArray(shuffledProductionInfo);

  const config = {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      productionInfo: shuffledProductionInfo,
    }),
  };

  const response = await fetch("/api/production/addProductionDemo", config);
  const data = await response.json();

  return data; // You can optionally return the response data if needed
};
