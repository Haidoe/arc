import { prisma } from "~/server/db";

// GET method handler
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
    include: {
      productions: {
        select: {
          id: true,
        },
      },
    },
  });

  res.status(200).json({
    productionIds: user.productionIds,
  });
};

// POST method handler
const postHandler = async (req, res) => {
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
    include: {
      productions: {
        select: {
          id: true,
        },
      },
    },
  });

  if (user && user.productions && user.productions.length > 0) {
    const productionIds = user.productions.map((production) => production.id);

    await prisma.user.update({
      where: {
        externalId: userId,
      },
      data: {
        productionIds: productionIds,
      },
    });
  }

  res.status(200).json({ success: true });
};

// Main handler function that routes the request based on the HTTP method
const handler = (req, res) => {
  if (req.method === "GET") {
    return getHandler(req, res);
  } else if (req.method === "POST") {
    return postHandler(req, res);
  }
};

export default handler;
