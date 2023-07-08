import type { ProductionWithProducer } from "~/types/types";
import type { ProductionReport } from "@prisma/client";

export const getProductionInfoById = async (
  productionId: string
): Promise<ProductionWithProducer> => {
  const response = await fetch(`/api/production/${productionId}`);

  if (!response.ok) {
    throw new Error(response.statusText);
  }

  const production = (await response.json()) as Promise<ProductionWithProducer>;

  return production;
};

export const getProductionReportById = async (
  productionId: string,
  reportId: string
): Promise<ProductionReport> => {
  const response = await fetch(
    `${
      process.env.HOME_URL ?? ""
    }/api/production/${productionId}/report/${reportId}`
  );

  if (!response.ok) {
    throw new Error(response.statusText);
  }

  const report = (await response.json()) as Promise<ProductionReport>;

  return report;
};
