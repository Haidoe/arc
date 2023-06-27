// this api creates report for a prodction into mongoDB using prismas client
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

    // using prisma create a daily report to the ProductionReport document
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

    res.status(200).json({
      reportId: report.id,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: error });
  }
};

export default requireAuth(postHandler);
