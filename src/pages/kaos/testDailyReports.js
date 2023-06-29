// Test the api for daily reports

import { useEffect, useState } from "react";
import SampleDailyProductionReport from "~/jsons/sample_dailyProductionForm.json" assert { type: "json" };
import { getTodayTimestamp } from "~/helper/getTodayTimestamp";

// api paths
let productionId = "648fe91b5a6933035f1b9ab2";
const CREATE_REPORT_API = `/api/production/${productionId}/report`;
const GET_TODAY_REPORT_ID_API = `/api/production/${productionId}/today-report-id`;

const TestDailyReports = () => {
  
  // Production Id Validation Pending

  // store report id in state
  const [reportId, setReportId] = useState(null);
  const [reportTimestamp, setReportTimestamp] = useState(null);

  // change configs in fetch
  const config = {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ dailyReport: SampleDailyProductionReport }),
  };

  // create daily production report
  const createDailyProductionReport = async () => {
    // pointing to local api
    const resp = await fetch(CREATE_REPORT_API, config);
    const respJson = await resp.json();
    return respJson;
  };

  // update daily production report
  const updateDailyProductionReport = async () => {
    const UPDATE_REPORT_API = `/api/production/${productionId}/report/${reportId}`;
    const resp = await fetch(UPDATE_REPORT_API, config);
    const respJson = await resp.json();
    return respJson;
  }

  // returns a report id if exists and if not create a new report
  const getTodayReportId = async () => {
    const resp = await fetch(GET_TODAY_REPORT_ID_API);
    const respJson = await resp.json();
    const { todayReportId, timestamp } = respJson;
    console.log(respJson)
    setReportTimestamp(timestamp);
    setReportId(todayReportId);
    return respJson;
  };


  // use Effect to get the report id
  useEffect(() => {

    // call on page load
    getTodayReportId();

  }, []);

  
  const upsertDailyProductionReport = async () => {

    const currentTimestamp = getTodayTimestamp();
    if (reportTimestamp == null || currentTimestamp !== reportTimestamp) {

      const { reportId, timestamp, updatedRecordsIdObj } = await createDailyProductionReport();      
      setReportId(reportId);
      setReportTimestamp(timestamp);
      console.log('Report created');
      console.log('All updated records ids object', updatedRecordsIdObj);
    } else {
      const { reportId, timestamp, updatedRecordsIdObj } = await updateDailyProductionReport();
      setReportId(reportId);
      setReportTimestamp(timestamp);
      console.log('Report updated');
      console.log('All updated records ids object', updatedRecordsIdObj);
    }
  };


  return (
    <div>
      <div>
        <h1 className="text-2xl font-bold">For Production Id: {productionId}</h1>
      </div>
      <div>
        Action: {reportId ? "Update" : "Save"} a report for today
      </div>
      <button
        onClick={upsertDailyProductionReport}
        className="m-4 rounded-lg border border-slate-800 bg-gray-500 px-4 py-2 hover:bg-gray-600"
      >
        Create or Update a Daily Production Report
      </button>
    </div>
  );
};

export default TestDailyReports;
