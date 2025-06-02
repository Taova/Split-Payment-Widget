import { EVENT_CONTEXT, EVENT_TYPE } from "../constants";

export type HttpMethod = "GET" | "POST"; // extend for PUT, DELETE, etc. if needed

export type EventContext = (typeof EVENT_CONTEXT)[keyof typeof EVENT_CONTEXT];
export type EventType = (typeof EVENT_TYPE)[keyof typeof EVENT_TYPE];

export type AnalyticsEvent = {
  context: EventContext;
  type: EventType;
  timestamp?: number;
} & Record<string, any>; // eslint-disable-line @typescript-eslint/no-explicit-any
