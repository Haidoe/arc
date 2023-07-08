// The API to get today's report if exists

// add helpers
import getTodayTimestamp from "~/helper/getTodayTimestamp.js";
import { prisma } from "~/server/db";

// handles /api/production/[id]/today-report-id
const getHandler = async (req, res) => {
  try {
    if (req.method !== "GET") {
      return res.status(405).json({ error: "Method not allowed" });
    }

    const { productionId } = req.query;

    const rsp = await prisma.production.findFirstOrThrow({
      where: {
        id: productionId,
      },
      select: {
        reportIdsObj: true,
      },
    });

    const todayTimestamp = getTodayTimestamp();

    if (!rsp.reportIdsObj || !rsp.reportIdsObj[todayTimestamp]) {
      return res.status(200).json({ todayReportId: null, timestamp: null });
    } else {
      const todayReportId = rsp.reportIdsObj[todayTimestamp];
      return res
        .status(200)
        .json({ todayReportId: todayReportId, timestamp: todayTimestamp });
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: error });
  }
};

export default getHandler;
