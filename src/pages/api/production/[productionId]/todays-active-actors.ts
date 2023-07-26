import { requireAuth } from "@clerk/nextjs/api";
import type { NextApiRequest, NextApiResponse } from "next";
import { prisma } from "~/server/db";

type activeActorsQueryType = {
  isYesterday?: boolean;
  productionId?: string;
};

function getStartAndEndDateOfToday(isYesterday: boolean): { startDate: Date; endDate: Date } {
  const today = new Date();
  const startDate = new Date(today);
  startDate.setHours(0, 0, 0, 0);

  const endDate = new Date(today);
  endDate.setHours(23, 59, 59, 999);

  return { startDate, endDate };
}

//used requireAuth to make sure the user is logged in
export default requireAuth(async function handler(
  req: NextApiRequest,
  res: NextApiResponse<any>
) {
  const { productionId } = req.query as activeActorsQueryType;

  const isYesterday = req.query.day == "yesterday";

  const startOfTheDay = getStartAndEndDateOfToday(isYesterday).startDate.toISOString();
  const endOfTheDay = getStartAndEndDateOfToday(isYesterday).endDate.toISOString();

  try {
    const result = await prisma.productionReport.findMany({
      where: {
        productionId,
        created: {
          gte: startOfTheDay,
          lte: endOfTheDay,
        },
      },
    });

    if (!result) {
      return res.json({ activeActors: 0 });
    }

    const activeActorsResult = result.filter((report) => {
      if (report.castTimeLog.length) {
        return report.castTimeLog;
      }
    });
    
    res.json({ activeActors: activeActorsResult.length, startOfTheDay, endOfTheDay });
  } catch (error) {
    res.status(400).json({ message: "Invalid Parameters" });
  }
});
