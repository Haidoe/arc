//This api is used to get the rolls info of a production

// add helpers
import { requireAuth } from "@clerk/nextjs/api";
import { prisma } from "~/server/db";

// let productionId = "64b2e1c4b1c40edd9b54b0da";

// handles pages/api/production/[id]/rollsInfo
const getHandler = async (req, res) => {
  try {
    const { productionId } = req.query;

    const getRollsInfo = await prisma.production.findUnique({
      where: {
        id: productionId,
      },
      include: {
        report: {
          select: {
            rolls: true,
          },
        },
      },
    });

    //Get into the rolls array and get the entries array and then get aCam and today
    //and combine aCam.today of all the reports
    //if the value is null then it will be 0

    const aCamTotal = getRollsInfo.report.reduce((total, report) => {
      const aCam = report.rolls.entries.aCam.today;
      if (aCam) {
        return total + aCam;
      }
      return total;
    }, 0);

    const bCamTotal = getRollsInfo.report.reduce((total, report) => {
      const bCam = report.rolls.entries.bCam.today;
      if (bCam) {
        return total + bCam;
      }
      return total;
    }, 0);

    const cCamTotal = getRollsInfo.report.reduce((total, report) => {
      const cCam = report.rolls.entries.cCam.today;
      if (cCam) {
        return total + cCam;
      }
      return total;
    }, 0);

    const aSoundTotal = getRollsInfo.report.reduce((total, report) => {
      const aSound = report.rolls.entries.aSound.today;
      if (aSound) {
        return total + aSound;
      }
      return total;
    }, 0);

    return res.status(200).json({
      // getRollsInfo,
      scriptSupervisor: getRollsInfo.scriptSupervisor,
      dataWrangler: getRollsInfo.dataWrangler,
      aCamTotal: aCamTotal,
      bCamTotal: bCamTotal,
      cCamTotal: cCamTotal,
      aSoundTotal: aSoundTotal,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: error });
  }
};

export default requireAuth(getHandler);
