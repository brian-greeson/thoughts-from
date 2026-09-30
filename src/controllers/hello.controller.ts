import type { Request, Response } from "express";
import { serializeError } from "../serializers/error.serializer.js";
import { serializeHello } from "../serializers/hello.serializer.js";
import { getHello } from "../services/hello.service.js";
import { validateHelloQuery } from "../validators/hello.validator.js";

export function showHello(request: Request, response: Response) {
  const result = validateHelloQuery(request.query);

  if (!result.success) {
    response.status(400).json(serializeError(
      "invalid_request",
      "Name must be a single string between 1 and 80 characters.",
    ));
    return;
  }

  const hello = getHello(result.data.name);
  response.render("hello/show", serializeHello(hello));
}
