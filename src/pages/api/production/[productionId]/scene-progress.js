//This api is used to get the scene info of a production

// add helpers
import { requireAuth } from "@clerk/nextjs/api";
import { prisma } from "~/server/db";

// let productionId = "648fe91b5a6933035f1b9ab2";

// handles pages/api/production/[id]/scene-progress
const getHandler = async (req, res) => {
  try {
    const { productionId } = req.query;

    const scenesProgress = await prisma.production.findUnique({
      where: {
        id: productionId,
      },
      include: {
        report: {
          select: {
            shotScene: {
              select: {
                number: true,
                pagePortion: true,
              },
            },
          },
        },
      },
    });

    const sceneProgressArray = scenesProgress.scenes.map((expected, index) => ({
      // number: index + 1,
      expected: expected,
      completed: 0,
    }));

    scenesProgress.report.forEach((report) => {
      report.shotScene.forEach((shotScene) => {
        sceneProgressArray[shotScene.number - 1].completed +=
          shotScene.pagePortion;
      });
    });

    return res.status(200).json({
      // scenesProgress,
      // allScenes: scenesProgress.scenes,
      sceneProgressArray,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: error });
  }
};

export default requireAuth(getHandler);
