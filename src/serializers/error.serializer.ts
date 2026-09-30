export function serializeError(code: string, message: string) {
  return { error: { code, message } };
}
