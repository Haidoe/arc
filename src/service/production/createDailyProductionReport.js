import getURL from "~/helper/helper";
import EMPTY_REPORT from "~/jsons/empty_productionReport.json" assert { type: "json" };

const createDailyProductionReport = async (productionId) => {
  const config = {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ dailyReport: EMPTY_REPORT }),
  };

  const url = getURL(`/api/production/${productionId}/report`);
  const resp = await fetch(url, config);
  const respJson = await resp.json();
  return respJson;
};

export default createDailyProductionReport;
