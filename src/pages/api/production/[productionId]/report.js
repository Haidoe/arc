// this api does two things
// -> creates a new report for a production into mongoDB using prismas client
// -> append the report id into the production document

import { requireAuth } from "@clerk/nextjs/api";
import { prisma } from "~/server/db";
import { getTodayTimestamp } from "~/helper/getTodayTimestamp";

// handles pages/api/production/[id]/report
const postHandler = async (req, res) => {
  try {
    if (req.method !== "POST") {
      return res.status(405).json({ error: "Method not allowed" });
    }

    const { productionId } = req.query;
    const dailyReport = req.body.dailyReport;

    // using prisma create a new daily report to the ProductionReport document
    const report = await prisma.productionReport.create({
      data: {
        ...dailyReport,
        Production: {
          connect: {
            id: productionId,
          },
        },
      },
    });

    // using prisma append the report id into the Production document
    const timestamp = getTodayTimestamp();
    const recordId = report.id;
    const updatedRecordsIdObj = await appendRecordIdInProduction(timestamp, recordId, productionId);

    res.status(200).json({
      reportId: report.id,
      timestamp,
      updatedRecordsIdObj
    });

  } catch (error) {
    console.log(error);
    res.status(500).json({ error: error });
  }
};



// =================================> Dependent Functions
// inserts the record id into the production document
async function appendRecordIdInProduction(timestamp, recordId, productionId) {

   // ==========> FIRST
  // get the production document and select the recordsIdObj from prisma
  const getRsp = await prisma.production.findFirst({
    where: {
      id: productionId,
    },
    select: {
      reportIdsObj: true,
    },
  });

  const reportIdsObj = getRsp.reportIdsObj;
  reportIdsObj[timestamp] = recordId;


  // ==========> SECOND
  // post the recordIdObj into the production document
  const postRsp = await prisma.production.update({
    where: {
      id: productionId,
    },
    data: {
      reportIdsObj: reportIdsObj,
    },
  });

  const updatedRecordsIdObj = postRsp.reportIdsObj;

  return updatedRecordsIdObj;
}

export default requireAuth(postHandler);
