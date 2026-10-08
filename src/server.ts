import { createApp } from "./app.js";
import { readServerConfig } from "./config/server.js";

const { host, port } = readServerConfig();
const server = createApp().listen(port, () => {
  console.log(`Thoughts From listening on ${host}:${port}`);
});

server.on("error", (error) => {
  console.error("Unable to start Thoughts From:", error);
  process.exitCode = 1;
});
