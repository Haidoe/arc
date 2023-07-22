import { requireAuth } from "@clerk/nextjs/api";
import type { NextApiRequest, NextApiResponse } from "next";
import { prisma } from "~/server/db";

type activeActorsQueryType = {
  isYesterday?: boolean;
  productionId?: string;
};

//used requireAuth to make sure the user is logged in
export default requireAuth(async function handler(
  req: NextApiRequest,
  res: NextApiResponse<any>
) {
  const { productionId } = req.query as activeActorsQueryType;

  const d = new Date();

  if (req.query.day == "yesterday") {
    d.setDate(d.getDate() - 1);
  }

  const startOfTheDay =
    String(d.toISOString().split("T")[0]) + "T00:00:00.000Z";
  const endOfTheDay = String(d.toISOString().split("T")[0]) + "T23:59:59.000Z";

  try {
    const result = await prisma.productionReport.findFirst({
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

    res.json({ activeActors: result.castTimeLog.length });
  } catch (error) {
    res.status(400).json({ message: "Invalid Parameters" });
  }
});
