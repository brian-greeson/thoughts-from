import { z } from "zod";

const serverEnvironment = z.object({
  HOST: z.string().trim().min(1).default("127.0.0.1"),
  PORT: z.coerce.number().int().min(1).max(65535).default(3000),
});

export function readServerConfig() {
  const { HOST, PORT } = serverEnvironment.parse(process.env);
  return { host: HOST, port: PORT };
}
