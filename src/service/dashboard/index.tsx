import type {
  FinishRateResponse,
  TodaysActiveActorsResponse,
  TodaysActiveExtrasResponse,
} from "~/types/types";
import getURL from "~/helper/helper";

export const getProductionFinishRate = async (
  productionId: string
): Promise<FinishRateResponse> => {
  const url = getURL(`/api/production/${productionId}/finish-rate`);

  const response = await fetch(url);

  if (!response.ok) {
    throw new Error(response.statusText);
  }

  const finishRate = (await response.json()) as Promise<FinishRateResponse>;

  return finishRate;
};

export const getTodaysActiveActors = async (
  productionId: string
): Promise<TodaysActiveActorsResponse> => {
  const url = getURL(`/api/production/${productionId}/todays-active-actors`);

  const response = await fetch(url);

  if (!response.ok) {
    throw new Error(response.statusText);
  }

  const todaysActiveActors =
    (await response.json()) as Promise<TodaysActiveActorsResponse>;

  return todaysActiveActors;
};

export const getTodaysActiveExtras = async (
  productionId: string
): Promise<TodaysActiveExtrasResponse> => {
  const url = getURL(`/api/production/${productionId}/todays-active-extras`);

  const response = await fetch(url);

  if (!response.ok) {
    throw new Error(response.statusText);
  }

  const todaysActiveExtras =
    (await response.json()) as Promise<TodaysActiveExtrasResponse>;

  return todaysActiveExtras;
};
