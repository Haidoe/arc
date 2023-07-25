import { prisma } from "~/server/db";

const handler = async (req, res) => {
  const { reportId } = req.query;

  try {
    const result = await prisma.productionReport.findFirstOrThrow({
      where: {
        id: reportId,
      },
      include: {
        Production: {
          include: {
            producer: true,
          },
        },
      },
    });

    res.json({
      data: result,
    });
  } catch (error) {
    res.status(404).json({ error: "Invalid Parameters", data: null });
  }
};

export default handler;
