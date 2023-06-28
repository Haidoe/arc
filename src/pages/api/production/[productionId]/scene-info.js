//This api is used to get the scene info of a production

// add helpers
import { requireAuth } from "@clerk/nextjs/dist/api";
import { prisma } from "~/server/db";

// let productionId = "648fe91b5a6933035f1b9ab2";

// handles pages/api/production/[id]/scene-info
const getHandler = async (req, res) => {
  const { productionId } = req.query;

  const scenesInfo = await prisma.production.findUnique({
    where: {
      id: productionId,
    },
    include: {
      report: {
        select: {
          shotScene: {
            select: {
              number: true,
              pages: true,
            },
          },
        },
      },
    },
  });

  return res.status(200).json({
    productionId: scenesInfo.id,
    allScenes: scenesInfo.scenes,
    numberOfScenes: scenesInfo.scenes.length,
    shotScene: scenesInfo.report[0].shotScene,
  });
};

export default requireAuth(getHandler);
