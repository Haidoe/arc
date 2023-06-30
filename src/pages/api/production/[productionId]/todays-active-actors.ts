import { requireAuth } from "@clerk/nextjs/dist/api";
import type { NextApiRequest, NextApiResponse } from "next";
import { prisma } from "~/server/db";

//used requireAuth to make sure the user is logged in
export default requireAuth(async function handler(
  req: NextApiRequest,
  res: NextApiResponse<any>
) {
  const { productionId } = req.query as { productionId: string };

  const currentDate = new Date();

  const startDate = new Date(
    currentDate.getFullYear(),
    currentDate.getMonth(),
    currentDate.getDate(),
    0,
    0,
    0
  );
  const endDate = new Date(
    currentDate.getFullYear(),
    currentDate.getMonth(),
    currentDate.getDate(),
    23,
    59,
    59
  );

  try {
    const result = await prisma.productionReport.findFirst({
      where: {
        productionId,
        created: {
          gte: startDate,
          lte: endDate,
        },
      },
      select: {
        castTimeLog: true,
        created: true,
      },
    });

    if (!result) {
      return res.json({ todaysActiveActors: 0 });
    }

    res.json({ todaysActiveActors: result.castTimeLog.length });
  } catch (error) {
    res.status(400).json({ message: "Invalid Parameters" });
  }
});
