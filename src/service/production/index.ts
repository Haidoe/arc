import type { ProductionWithProducer } from "~/types/types";
import type { ProductionReport } from "@prisma/client";
import getURL from "~/helper/helper";

export const getProductionInfoById = async (
  productionId: string
): Promise<ProductionWithProducer> => {
  const url = getURL(`/api/production/${productionId}`);

  const response = await fetch(url);

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
  const url = getURL(`/api/production/${productionId}/report/${reportId}`);

  const response = await fetch(url);

  if (!response.ok) {
    throw new Error(response.statusText);
  }

  const report = (await response.json()) as Promise<ProductionReport>;

  return report;
};
