import { requireAuth } from "@clerk/nextjs/dist/api";
import { prisma } from "~/server/db";

const getHandler = async (req, res) => {
  const { userId } = req.query;

  if (!userId) {
    return res.status(404).json({
      error: "Not Found",
      message: "User not found",
    });
  }

  const user = await prisma.user.findUnique({
    where: {
      externalId: userId,
    },
  });

  res.status(200).json({
    productionIds: user.productionIds,
  });
};

const postHandler = async (req, res) => {
  const { userId, productionId } = req.body;

  try {
    const production = await prisma.user.update({
      where: {
        id: userId,
      },
      data: {
        productionIds: {
          push: productionId,
        },
      },
    });

    res.status(200).json({
      productionIds: production.productionIds,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: error });
  }
};

// Main handler function that routes the request based on the HTTP method
const handler = (req, res) => {
  if (req.method === "GET") {
    return getHandler(req, res);
  } else if (req.method === "POST") {
    return postHandler(req, res);
  }
};

export default requireAuth(handler);
