import { requireAuth } from "@clerk/nextjs/dist/api";
import { getAuth } from "@clerk/nextjs/server";
import { type Production } from "@prisma/client";
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
    const result = (await prisma.userProductions.findFirst({
      where: {
        userId: userId ?? "",
        productionId: productionId,
      },

      include: {
        production: true,
      },
    })) as {
      production: Production;
    };

    res.json(result.production);
  } catch (error) {
    res.status(400).json({ message: "Invalid Parameters" });
  }
});
