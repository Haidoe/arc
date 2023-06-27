// this api creates report for a prodction into mongoDB using prismas client
import { requireAuth } from "@clerk/nextjs/dist/api";
import { prisma } from "~/server/db";

import SampleDailyProductionReport from "~/json/dailyProductionForm.json"

// handles pages/api/production/[id]/report

const postHandler = async (req, res) => {
    if(req.method !== "POST") {
        return res.status(405).json({ error: "Method not allowed" });
    }

    const { productionId } = req.query;

    res.status(200).json({ message: productionId });

};

export default requireAuth(postHandler);
