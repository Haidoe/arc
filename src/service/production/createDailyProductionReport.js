import EMPTY_REPORT from "~/jsons/empty_productionReport.json" assert { type: "json" };

const config = {
  method: "POST",
  headers: {
    "Content-Type": "application/json",
  },
  body: JSON.stringify({ dailyReport: EMPTY_REPORT }),
};

const createDailyProductionReport = async (productionId) => {
  const resp = await fetch(
    `${process.env.HOME_URL ?? ""}/api/production/${productionId}/report`,
    config
  );
  const respJson = await resp.json();
  return respJson;
};

export default createDailyProductionReport;
