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
                pagePortion: true,
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

    //map scenes to the scene progress array
    const sceneProgressArray = notShotScene.scenes.map((expected, index) => ({
      number: index + 1,
      expected: expected,
      completed: 0,
    }));

    //add the completed page portion to the scene progress array
    notShotScene.report.forEach((report) => {
      report.shotScene.forEach((shotScene) => {
        sceneProgressArray[shotScene.number - 1].completed +=
          shotScene.pagePortion;
      });
    });

    //loop through the report and add the not shot scene to the new array
    const combineNotShotScene = notShotScene.report.reduce((acc, report) => {
      acc.push(...report.notShotScene);
      return acc;
    }, []);

    //filter the not shot scene array to remove the scene that expected === completed
    const filteredNotShotScene = combineNotShotScene.filter(
      (scene) =>
        sceneProgressArray[scene.number - 1].expected !==
        sceneProgressArray[scene.number - 1].completed
    );

    return res.status(200).json({
      // sceneProgressArray,
      // combineNotShotScene,
      filteredNotShotScene,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: error });
  }
};

export default requireAuth(getHandler);
