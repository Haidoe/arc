import { z } from "zod";

import {
  createTRPCRouter,
  privateProcedure,
  publicProcedure,
} from "~/server/api/trpc";

export const exampleRouter = createTRPCRouter({
  hello: publicProcedure
    .input(z.object({ text: z.string() }))
    .query(({ input }) => {
      return {
        greeting: `Hello ${input.text}`,
      };
    }),
  foo: publicProcedure.query(({ ctx }) => {
    return ctx.prisma.example.findFirstOrThrow();
  }),
  getAll: publicProcedure.query(({ ctx }) => {
    return ctx.prisma.example.findMany();
  }),
  bar: privateProcedure.query(({ ctx }) => {
    return ctx.prisma.example.findFirstOrThrow();
  }),
});
