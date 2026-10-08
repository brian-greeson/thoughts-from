import express from "express";
import { configureViews } from "./config/vento.js";
import { errorHandler } from "./middleware/error-handler.js";
import { helloRoutes } from "./routes/hello.routes.js";

export function createApp() {
  const app = express();

  app.disable("x-powered-by");
  configureViews(app);
  
  app.use(helloRoutes);
  app.use(errorHandler);

  return app;
}
