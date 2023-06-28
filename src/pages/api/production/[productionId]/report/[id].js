// this api does two things
// -> creates a new report for a production into mongoDB using prismas client
// -> append the report id into the production document

import { requireAuth } from "@clerk/nextjs/dist/api";
import { prisma } from "~/server/db";
import getTodayTimestamp from "~/helper/getTodayTimestamp.js";

// handles pages/api/production/[id]/report
const postHandler = async (req, res) => {
  try {
    if (req.method !== "POST") {
      return res.status(405).json({ error: "Method not allowed" });
    }
    
    const { productionId, id } = req.query;


    // end everything here

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

    // using prisma append the report id and timestamp into the Production document

    // =========> FIRST: get the object from database
    const timestamp = getTodayTimestamp();
    const existingObject = await prisma.production.findFirst({
      where: {
        id: productionId,
      },
      select: { reportIdsObj: true }, // select the reportIdsObj
    });

    const updatedReportIdsObj_payload = {
      ...existingObject.reportIdsObj,
      [timestamp]: report.id,
    };

    // =========> SECOND: ovewrite the object with the new report id
    const updatedReportIdsObj = await prisma.production.update({
      where: { id: productionId },
      data: { reportIdsObj: updatedReportIdsObj_payload },
    });

    res.status(200).json({
      newReportId: report.id,
      timestamp: timestamp,
      reportIdsObj: updatedReportIdsObj.reportIdsObj,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: error });
  }
};

// =================================> Dependent Functions

// inserts the record id into the production document
async function appendRecordIdInProduction(timestamp, recordId) {
  // ==========> FIRST
  // get the production document and select the recordsIdObj from prisma
  const getRsp = await prisma.production.findFirst({
    where: {
      id: productionId,
    },
    select: {
      recordsIdObj: true,
    },
  });

  const recordsIdObj = getRsp.recordsIdObj;
  recordsIdObj[timestamp] = recordId;

  // ==========> SECOND
  // post the recordIdObj into the production document
  const postRsp = await prisma.production.update({
    where: {
      id: productionId,
    },
    data: {
      recordsIdObj: recordsIdObj,
    },
  });

  const updatedRecordsIdObj = postRsp.recordsIdObj;

  return updatedRecordsIdObj;
}

export default requireAuth(postHandler);
