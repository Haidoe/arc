import type { Production, User } from "@prisma/client";

export type ErrorResponse = {
  message: string;
};
type ProductionWithProducer = Production & {
  producer: User;
};

type FinishRateResponse = {
  rate: number;
};

type TodaysActiveActorsResponse = {
  todaysActiveActors: number;
};

type TodaysActiveExtrasResponse = {
  todaysActiveExtras: number;
};
