import { fileURLToPath } from "node:url";
import type { Express } from "express";
import vento from "ventojs";

export function configureViews(app: Express) {
  const viewsDirectory = fileURLToPath(new URL("../views/", import.meta.url));
  const environment = vento({ includes: viewsDirectory, autoescape: true });

  app.engine("vto", (path, data, callback) => {
    if (app.get("env") !== "production") environment.cache.clear();

    environment.run(path, { ...data }).then(
      ({ content }) => callback(null, content),
      (error: unknown) => callback(error),
    );
  });
  app.set("views", viewsDirectory);
  app.set("view engine", "vto");
}
