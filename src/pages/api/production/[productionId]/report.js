// this api does two things
// -> creates a new report for a production into mongoDB using prismas client
// -> append the report id into the production document

import { requireAuth } from "@clerk/nextjs/dist/api";
import { prisma } from "~/server/db";

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
    const production = await prisma.production.update({
      where: {
        id: productionId,
      },
      data: {
        reportIds: {
          push: report.id,
        },
      },
    });

    res.status(200).json({
      newReportId: report.id,
      allReportIds: production.reportIds,
    });

  } catch (error) {
    console.log(error);
    res.status(500).json({ error: error });
  }
};

export default requireAuth(postHandler);
