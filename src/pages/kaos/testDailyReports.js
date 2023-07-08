// import Header component
import Header from "~/components/global/Header";
import AccordionModal from "~/components/report/AccordionModal.jsx";
import TextInputField from "~/components/TextInputField";
import Accordion from "~/components/report/Accordion";

// Test the api for daily reports

import { useEffect, useState } from "react";
import SampleDailyProductionReport from "~/jsons/sample_dailyProductionForm.json" assert { type: "json" };
import { getTodayTimestamp } from "~/helper/getTodayTimestamp";

// api paths
let productionId = "648fe91b5a6933035f1b9ab2";
const CREATE_REPORT_API = `/api/production/${productionId}/report`;
const GET_TODAY_REPORT_ID_API = `/api/production/${productionId}/today-report-id`;

// Get Report INFO
const REPORT_ID = "649cf18089e11ffb6703ff83";

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
  };

  // returns a report id if exists and if not create a new report
  const getTodayReportId = async () => {
    const resp = await fetch(GET_TODAY_REPORT_ID_API);
    const respJson = await resp.json();
    const { todayReportId, timestamp } = respJson;
    console.log(respJson);
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
      const { reportId, timestamp, updatedRecordsIdObj } =
        await createDailyProductionReport();
      setReportId(reportId);
      setReportTimestamp(timestamp);
      console.log("Report created");
      console.log("All updated records ids object", updatedRecordsIdObj);
    } else {
      const { reportId, timestamp, updatedRecordsIdObj } =
        await updateDailyProductionReport();
      setReportId(reportId);
      setReportTimestamp(timestamp);
      console.log("Report updated");
      console.log("All updated records ids object", updatedRecordsIdObj);
    }
  };

  // ====================> GET Report Info <====================
  const getReportInfo = async () => {
    const GET_REPORT_INFO_API = `/api/production/${productionId}/report/${REPORT_ID}`;
    const resp = await fetch(GET_REPORT_INFO_API);
    const respJson = await resp.json();
    console.log(respJson);
  };

  return (
    <>
      <Header />
      <h1 className="mb-2 text-3xl font-bold">Test Daily Reports</h1>

      <div className="bg-backgroundArc">
        {/* Section to test Accordion */}
        <div className="test-accordion-section mb-5 flex">
          <h2 className="flex-1 text-xl font-bold">Accordion Section</h2>
          <div className="flex-1 px-4">
            <AccordionModal title={"Schedule for the day"} defaultOpen={true} readOnlyState={true}>
              <div className="flex space-x-4">
                <div className="flex-1">
                  <TextInputField
                    label="Email"
                    inputType="Border"
                    className="flex-1"
                  />
                </div>
                <div className="flex-1">
                  <TextInputField
                    label="Password"
                    inputType="Border"
                    className="flex-1"
                  />
                </div>
              </div>
            </AccordionModal>
          </div>
          </div>

        {/* section to test the daily production reports api */}
        <div className="test-api-section mb-5">
          <h2 className="text-xl font-bold">Test Daily Reports API Section</h2>
          <div>
            <h3 className="text-l font-bold">
              For Production Id: {productionId}
            </h3>
          </div>
          <div>Action: {reportId ? "Update" : "Save"} a report for today</div>
          <button
            onClick={upsertDailyProductionReport}
            className="m-4 rounded-lg border border-slate-800 bg-gray-500 px-4 py-2 hover:bg-gray-600"
          >
            Create or Update a Daily Production Report
          </button>
          <button
            onClick={getReportInfo}
            className="m-4 rounded-lg border border-slate-800 bg-gray-500 px-4 py-2 hover:bg-gray-600"
          >
            Get Report Info
          </button>
        </div>
      </div>
    </>
  );
};

export default TestDailyReports;
