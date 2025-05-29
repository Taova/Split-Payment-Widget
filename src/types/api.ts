export type HttpMethod = "GET" | "POST"; // extend for PUT, DELETE, etc. if needed

export type EventProps = {
  context: string;
  type: string;
} & Record<string, any>; // eslint-disable-line @typescript-eslint/no-explicit-any
