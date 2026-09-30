import { Router } from "express";
import { showHello } from "../controllers/hello.controller.js";

export const helloRoutes = Router();

helloRoutes.get("/", showHello);
