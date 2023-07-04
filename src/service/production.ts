import type { ProductionWithProducer } from "~/types/types";

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
