import { cpSync } from "node:fs";

cpSync(
  new URL("../src/views/", import.meta.url),
  new URL("../dist/views/", import.meta.url),
  { recursive: true },
);
