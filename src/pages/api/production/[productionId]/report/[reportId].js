// this api does one things
// -> updates and existing report in the Production Document

import { requireAuth } from "@clerk/nextjs/dist/api";
import { prisma } from "~/server/db";

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

    res.status(200).json({
      reportId: updateReportRsp.id,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: error });
  }
};

export default requireAuth(postHandler);
