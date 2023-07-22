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

export const updateProductionReportById = async (data: ProductionReport) => {
  try {
    if (!data.id || !data.productionId) {
      throw new Error("Invalid data");
    }

    const url = getURL(
      `/api/production/${data.productionId}/report/${data.id}`
    );

    const config = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ dailyReport: data }),
    };

    const response = await fetch(url, config);

    if (!response.ok) {
      throw new Error("Invalid data");
    }

    const report = (await response.json()) as Promise<ProductionReport>;

    return report;
  } catch (error) {
    console.log("UPDATING PRODUCTION REPORT FAILED", error);
  }
};
