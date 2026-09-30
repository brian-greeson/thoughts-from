import assert from "node:assert/strict";
import { spawnSync } from "node:child_process";
import { test } from "node:test";
import { fileURLToPath } from "node:url";

function loadConfig(databaseUrl: string | undefined) {
  const environment = { ...process.env };
  if (databaseUrl === undefined) delete environment.DATABASE_URL;
  else environment.DATABASE_URL = databaseUrl;

  return spawnSync(process.execPath, [
    "--import", "tsx", "--input-type=module", "--eval",
    `import assert from "node:assert/strict";
     import config from "./drizzle.config.ts";
     if (process.env.DATABASE_URL) {
       assert.equal(config.dbCredentials.url, process.env.DATABASE_URL);
     }`,
  ], {
    cwd: fileURLToPath(new URL("../", import.meta.url)),
    env: environment,
    encoding: "utf8",
  });
}

test("Drizzle uses DATABASE_URL from the process environment", () => {
  const result = loadConfig("postgresql://127.0.0.1:5432/thoughts_from_test");

  assert.equal(result.status, 0, result.stderr);
});

for (const databaseUrl of [undefined, ""]) {
  test(`Drizzle fails clearly when DATABASE_URL is ${databaseUrl === undefined ? "unset" : "empty"}`, () => {
    const result = loadConfig(databaseUrl);

    assert.equal(result.status, 1);
    assert.match(result.stderr, /DATABASE_URL must be set/);
  });
}
