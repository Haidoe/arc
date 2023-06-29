// this api does two things
// -> updates and existing report in the Production Document
// -> gets the repodsIdsObj from the Production Document

import { requireAuth } from "@clerk/nextjs/dist/api";
import { prisma } from "~/server/db";
import getTodayTimestamp from "~/helper/getTodayTimestamp.js";

// handles pages/api/production/[id]/report
const postHandler = async (req, res) => {
  try {

    // validate
    if (req.method !== "POST") {
      return res.status(405).json({ error: "Method not allowed" });
    }

    // prepare payload
    const { productionId, reportId } = req.query;
    const dailyReport = req.body.dailyReport;


    // using prisma update an exiisting daily report
    const updateReportRsp = await prisma.productionReport.update({
      where: {
        id: reportId,
      },
      data: {
        ...dailyReport,
      },
    });

    // get reportIdsObj
    const reportIdsObj = await getReportIdsObj(productionId);

    res.status(200).json({
      reportId: updateReportRsp.id,
      timestamp: getTodayTimestamp(),
      updatedRecordsIdObj: reportIdsObj
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: error });
  }
};



// ====================> GET Report Ids Obj <====================

async function getReportIdsObj(productionId) {
  const rsp = await prisma.production.findFirstOrThrow({
    where: {
      id: productionId,
    },
    select: {
      reportIdsObj: true,
    },
  });

  return rsp.reportIdsObj;
}

export default requireAuth(postHandler);
