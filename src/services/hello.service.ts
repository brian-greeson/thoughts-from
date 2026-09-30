export interface Hello {
  message: string;
}

export function getHello(name: string): Hello {
  return { message: `Hello ${name}` };
}
