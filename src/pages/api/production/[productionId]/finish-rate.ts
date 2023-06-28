import { requireAuth } from "@clerk/nextjs/dist/api";
import { getAuth } from "@clerk/nextjs/server";
import type { ProductionReport } from "@prisma/client";
import type { NextApiRequest, NextApiResponse } from "next";
import { prisma } from "~/server/db";

//used requireAuth to make sure the user is logged in
export default requireAuth(async function handler(
  req: NextApiRequest,
  res: NextApiResponse<any>
) {
  const { productionId } = req.query as { productionId: string };

  //I have to get the userId to make sure that the user is part of the production
  const { userId } = getAuth(req);

  try {
    //Make sure production exists and the user is part of the production
    const result = await prisma.production.findFirstOrThrow({
      where: {
        id: productionId,
        producerId: userId ?? "",
      },
      include: {
        report: true,
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
          const secondInputSchedule =
            report.actualSchedule?.secondUnitInput?.schedule ?? 0;
          const prepSchedule = report.actualSchedule?.prep?.schedule ?? 0;
          const idleSchedule = report.actualSchedule?.idle?.schedule ?? 0;

          const totalSchedule =
            firstInputSchedule +
            secondInputSchedule +
            prepSchedule +
            idleSchedule;

          const firstInputActual =
            report.actualSchedule?.firstUnitInput?.actual ?? 0;
          const secondInputActual =
            report.actualSchedule?.secondUnitInput?.actual ?? 0;
          const prepActual = report.actualSchedule?.prep?.actual ?? 0;
          const idleActual = report.actualSchedule?.idle?.actual ?? 0;

          const totalActual =
            firstInputActual + secondInputActual + prepActual + idleActual;

          return (totalActual / totalSchedule) * 100;
        }

        return 0;
      }
    );

    const rate = reports.reduce((a, b) => a + b, 0) / reports.length;

    res.json({ rate: Math.round(rate) });
  } catch (error) {
    res.status(400).json({ message: "Invalid Parameters" });
  }
});
