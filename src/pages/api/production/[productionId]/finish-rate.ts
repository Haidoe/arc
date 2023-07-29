import { requireAuth } from "@clerk/nextjs/api";
import { getAuth } from "@clerk/nextjs/server";
import type { ProductionReport } from "@prisma/client";
import dayjs from "dayjs";
import type { NextApiRequest, NextApiResponse } from "next";
import { prisma } from "~/server/db";

const WORKING_HOURS_PER_DAY = 12;

//used requireAuth to make sure the user is logged in
export default requireAuth(async function handler(
  req: NextApiRequest,
  res: NextApiResponse<any>
) {
  const { productionId, upto } = req.query as { productionId: string, upto: string };

  //I have to get the userId to make sure that the user is part of the production
  const { userId } = getAuth(req);

  try {
    //Make sure production exists and the user is part of the production
    const result = await prisma.production.findFirstOrThrow({
      where: {
        id: productionId,
        producerId: userId ?? ""
      },
      include: {
        report: {
          where: {
            created: {
              lte: upto
            }
          }
        },
      },
    });

    if (!result) {
      throw new Error("User is not part of the production");
    }

    //Doing computations here
    const reports: number[] = result.report.map(
      (report: ProductionReport): number => {
        if (report.actualSchedule !== null) {
          const firstInputSchedule =
            report.actualSchedule?.firstUnitInput?.schedule ?? 0;
          const travelSchedule = report.actualSchedule?.travel?.schedule ?? 0;
          const prepSchedule = report.actualSchedule?.prep?.schedule ?? 0;
          const idleSchedule = report.actualSchedule?.idle?.schedule ?? 0;

          const totalSchedule =
            firstInputSchedule + prepSchedule + idleSchedule + travelSchedule;

          return totalSchedule;
        }

        return 0;
      }
    );

    const totalHoursUsed = reports.reduce((a, b) => a + b, 0);

    //Removing with no valid reports
    const reportsFiltered = reports.filter((report: number) => report !== 0);

    const reportsComputed: number[] = reportsFiltered.map((report: number) => {
      return (report / WORKING_HOURS_PER_DAY) * 100;
    });

    const startDate = result.duration?.startDate ?? null;
    const estimatedFinishDate = result.duration?.estimatedFinishDate ?? null;
    const totalDays = dayjs(estimatedFinishDate).diff(dayjs(startDate), "day");

    const rate = (result.report.length / totalDays) * 100;

    const finishRateAvg =
      reportsComputed.reduce((a, b) => a + b, 0) / reportsComputed.length;

    const finishRateAvg2Decimals = parseFloat(finishRateAvg.toFixed(2));

    res.json({
      reports,
      startDate,
      estimatedFinishDate,
      totalDays,
      projectProgress: parseFloat(rate.toFixed(2)),
      finishRateAvg: finishRateAvg2Decimals,
      totalHoursUsed,
      totalHours: totalDays * WORKING_HOURS_PER_DAY,
    });
  } catch (error) {
    res.status(400).json({ message: "Invalid Parameters" });
  }
});
