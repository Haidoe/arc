const getTodayReportId = async (productionId) => {
  const resp = await fetch(
    `${
      process.env.HOME_URL ?? ""
    }/api/production/${productionId}/today-report-id`
  );
  const respJson = await resp.json();
  return respJson;
};

export default getTodayReportId;
