// Test the api for daily reports

import { useEffect, useState } from "react";
import SampleDailyProductionReport from "~/jsons/sample_dailyProductionForm.json" assert { type: "json" };

// api paths
let productionId = "648fe91b5a6933035f1b9ab2";
const CREATE_REPORT_API = `/api/production/${productionId}/report`;
const GET_TODAY_REPORT_ID_API = `/api/production/${productionId}/today-report-id`;

const TestDailyReports = () => {
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

  // using fetch to test the api
  const createDailyProductionReport = async () => {
    //pointing to local api
    const resp = await fetch(CREATE_REPORT_API, config);
    const respJson = await resp.json();
    console.log(respJson);
  };

  // returns a report id if exists and if not create a new report
  const getTodayReportId = async () => {
    const resp = await fetch(GET_TODAY_REPORT_ID_API);
    const respJson = await resp.json();
    console.log(respJson);
  };


  // use Effect to get the report id
  useEffect(() => {
    const { reportId, timestamp } = getTodayReportId();
    console.log(timestamp);
    setReportId(reportId);
  }, []);


  return (
    <div>
      <button
        onClick={createDailyProductionReport}
        className="m-4 rounded-lg border border-slate-800 bg-gray-500 px-4 py-2 hover:bg-gray-600"
      >
        Create or Update a Daily Production Report
      </button>
    </div>
  );
};

export default TestDailyReports;
