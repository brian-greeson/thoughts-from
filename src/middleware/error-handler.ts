import type { ErrorRequestHandler } from "express";
import { serializeError } from "../serializers/error.serializer.js";

export const errorHandler: ErrorRequestHandler = (
  error: unknown,
  _request,
  response,
  next,
) => {
  if (response.headersSent) {
    next(error);
    return;
  }

  console.error(error);
  response.status(500).json(serializeError(
    "internal_error",
    "An unexpected error occurred.",
  ));
};
