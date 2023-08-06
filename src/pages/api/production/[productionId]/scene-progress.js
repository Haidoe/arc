//This api is used to get the scene info of a production

// add helpers
import { requireAuth } from "@clerk/nextjs/api";
import { prisma } from "~/server/db";

// let productionId = "648fe91b5a6933035f1b9ab2";

// handles pages/api/production/[id]/scene-progress
// handles pages/api/production/648fe91b5a6933035f1b9ab2/scene-progress
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
            shotScene: true,
          },
        },
      },
    });

    const sceneProgressArray = scenesProgress.scenes.map((expected, index) => {
      const completed = scenesProgress.report.reduce((total, report) => {
        const shotScene = report.shotScene.find(
          (shot) => shot.number === index + 1
        );
        if (shotScene) {
          return total + shotScene.pagesToday;
        }
        return total;
      }, 0);

      const remaining = expected - completed;

      return {
        expected: expected,
        completed: completed,
        remaining: remaining,
      };
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

// export default getHandler;
