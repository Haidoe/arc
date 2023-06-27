// Test the api for daily reports

import SampleDailyProductionReport from "~/jsons/sample_dailyProductionForm.json" assert { type: "json" };

// api paths
const CREATE_REPORT_API = "/api/production/648fe91b5a6933035f1b9ab1/report";


const testApi = () => {
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
  
    return (
      <div>
        <button
          onClick={createDailyProductionReport}
          className="m-4 rounded-lg border border-slate-800 bg-gray-500 px-4 py-2 hover:bg-gray-600"
        >
            Create a new Daily Production Report
        </button>
      </div>
    );
  };
  
  export default testApi;
  