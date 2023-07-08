import getURL from "~/helper/helper";

const getTodayReportId = async (productionId) => {
  const url = getURL(`/api/production/${productionId}/today-report-id`);
  const resp = await fetch(url);
  const respJson = await resp.json();
  return respJson;
};

export default getTodayReportId;
