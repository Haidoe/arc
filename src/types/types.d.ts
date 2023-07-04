import type { Production, User } from "@prisma/client";

export type ErrorResponse = {
  message: string;
};
type ProductionWithProducer = Production & {
  producer: User;
};
