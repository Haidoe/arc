//This api is used to get the not shot scene of a production

// add helpers
import { requireAuth } from "@clerk/nextjs/dist/api";
import { prisma } from "~/server/db";

// let productionId = "648fe91b5a6933035f1b9ab2";

// handles pages/api/production/[id]/report
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

    const combinedShotScenes = notShotScene.report.reduce((acc, report) => {
      acc.push(...report.shotScene.map((scene) => scene.number));
      return acc;
    }, []);

    const filteredNotShotScene = notShotScene.report
      .flatMap((report) => report.notShotScene)
      .filter((scene) => !combinedShotScenes.includes(scene.number));

    return res.status(200).json({
      productionId: notShotScene.id,
      // report: notShotScene.report,
      filteredNotShotScene: filteredNotShotScene,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: error });
  }
};

export default requireAuth(getHandler);
