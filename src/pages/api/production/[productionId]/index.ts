import { requireAuth } from "@clerk/nextjs/dist/api";
import { getAuth } from "@clerk/nextjs/server";
import { prisma } from "~/server/db";

import type { Production } from "@prisma/client";
import type { NextApiRequest, NextApiResponse } from "next";
import type { ErrorResponse } from "~/types/types";

//used requireAuth to make sure the user is logged in
export default requireAuth(async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Production | ErrorResponse>
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
    });

    res.json(result);
  } catch (error) {
    res.status(400).json({ message: "Invalid Parameters" });
  }
});
