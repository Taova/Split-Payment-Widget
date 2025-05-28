export type HttpMethod = "GET" | "POST"; // extend for PUT, DELETE, etc. if needed
export type FetchResult<T> = {
  body?: T;
  error?: string;
};

export type EventProps = {
  context: string;
  type: string;
} & Record<string, any>;
