import type { Hello } from "../services/hello.service.js";

export function serializeHello(hello: Hello) {
  return {
    title: "Thoughts From",
    message: hello.message,
  };
}
