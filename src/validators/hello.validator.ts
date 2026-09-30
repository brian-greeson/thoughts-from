import { z } from "zod";

const helloQuery = z.object({
  name: z.string().trim().min(1).max(80).default("world"),
});

export function validateHelloQuery(query: unknown) {
  return helloQuery.safeParse(query);
}
