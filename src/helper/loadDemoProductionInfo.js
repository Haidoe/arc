import SampleProductionInfo from "~/jsons/sample_productionInfo.json" assert { type: "json" };

//This function is used to load the demo production info to the database
//Import SampleProductionInfo from "~/jsons/sample_productionInfo.json";
export const loadDemoProductionInfo = async () => {
  const config = {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      productionInfo: SampleProductionInfo,
    }),
  };

  const response = await fetch("/api/production/addProductionDemo", config);
  const data = await response.json();

  return data; // You can optionally return the response data if needed
};
