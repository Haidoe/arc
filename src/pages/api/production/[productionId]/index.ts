import { requireAuth } from "@clerk/nextjs/api";
import { getAuth } from "@clerk/nextjs/server";
import { prisma } from "~/server/db";

import type { NextApiRequest, NextApiResponse } from "next";
import type { ErrorResponse, ProductionWithProducer } from "~/types/types";

//used requireAuth to make sure the user is logged in
export default requireAuth(async function handler(
  req: NextApiRequest,
  res: NextApiResponse<ProductionWithProducer | ErrorResponse>
) {
  const { productionId } = req.query as { productionId: string };

  //I have to get the userId to make sure that the user is part of the production
  const { userId } = getAuth(req);

  try {
    const result = await prisma.production.findFirstOrThrow({
      where: {
        id: productionId,
        producerId: userId ?? "",
      },
      include: {
        producer: true,
      },
    });

    res.json(result as ProductionWithProducer);
  } catch (error) {
    res.status(400).json({ message: "Invalid Parameters" });
  }
});
