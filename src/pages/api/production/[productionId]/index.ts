import { prisma } from "~/server/db";

import type { NextApiRequest, NextApiResponse } from "next";
import type { ErrorResponse, ProductionWithProducer } from "~/types/types";

//used requireAuth to make sure the user is logged in
export default (async function handler(
  req: NextApiRequest,
  res: NextApiResponse<ProductionWithProducer | ErrorResponse>
) {
  const { productionId } = req.query as { productionId: string };

  try {
    const result = await prisma.production.findFirstOrThrow({
      where: {
        id: productionId,
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
