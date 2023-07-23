import getURL from "~/helper/helper";

const getReportById = async (reportId) => {
  try {
    const url = getURL(`/api/report/${reportId}`);
    const resp = await fetch(url);
    const respJson = await resp.json();
    return respJson;
  } catch (error) {
    return null;
  }
};

export default getReportById;
