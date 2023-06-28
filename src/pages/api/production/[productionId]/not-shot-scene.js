//This api is used to get the not shot scene of a production

// add helpers
import { requireAuth } from "@clerk/nextjs/dist/api";
import { prisma } from "~/server/db";

// let productionId = "648fe91b5a6933035f1b9ab2";

// handles pages/api/production/[id]/scene-info
const getHandler = async (req, res) => {
  try {
    const { productionId } = req.query;

    const notShotScene = await prisma.production.findUnique({
      where: {
        id: productionId,
      },
      include: {
        report: {
          select: {
            shotScene: {
              select: {
                number: true,
              },
            },
            notShotScene: {
              select: {
                number: true,
                description: true,
              },
            },
          },
        },
      },
    });

    const filteredNotShotScene = notShotScene.report[0].notShotScene.filter(
      (scene) => {
        return !notShotScene.report[0].shotScene.some(
          (shotScene) => shotScene.number === scene.number
        );
      }
    );

    return res.status(200).json({
      productionId: notShotScene.id,
      shotScene: notShotScene.report[0].shotScene,
      notShotScene: notShotScene.report[0].notShotScene,
      filterNotShotScene: filteredNotShotScene,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: error });
  }
};

// //testing
// export default getHandler;

export default requireAuth(getHandler);
