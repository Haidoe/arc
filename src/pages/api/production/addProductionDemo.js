import { requireAuth } from "@clerk/nextjs/dist/api";
import { getAuth } from "@clerk/nextjs/server";
import { prisma } from "~/server/db";

const handler = async (req, res) => {
  
  const { userId } = getAuth(req);

  const { productionInfo } = req.body;

  // return res.status(200).json({
  //   productionInfo: productionInfo[0],
  // });

  try {
    const production = await prisma.production.create({
      data: {
        ...productionInfo[0],
        producer: {
          connect: {
            externalId: userId,
          },
        },
      },
    });

    res.status(200).json({
      productionId: production.id,
      userId,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: error });
  }
};

export default requireAuth(handler);
