import { SEQURA_EVENTS_URL, CREDIT_AGREEMENT_URL } from "../constants";
import type { HttpMethod, AnalyticsEvent, CreditInfo } from "../types";

const fetchData = async <T>(
  method: HttpMethod,
  url: string,
  body?: unknown,
): Promise<T> => {
  try {
    const headers: HeadersInit = {};

    const options: RequestInit = {
      method,
      headers,
    };

    if (body !== undefined) {
      headers["Content-Type"] = "application/json";
      options.body = JSON.stringify(body);
    }

    const response = await fetch(url, options);

    if (!response.ok) {
      throw new Error(`HTTP error: ${response.status}`);
    }

    const text = await response.text();

    return text ? JSON.parse(text) : ({} as T);
  } catch (e: unknown) {
    let errorMessage = "Something went wrong. Please try later.";

    if (e instanceof Error) {
      errorMessage = e.message;
    } else if (typeof e === "string") {
      errorMessage = e;
    }

    throw new Error(`${errorMessage}`);
  }
};

export const fetchCreditAgreement = async (
  amount: number,
  url: string = CREDIT_AGREEMENT_URL,
): Promise<CreditInfo[]> => {
  return await fetchData<CreditInfo[]>("GET", `${url}?totalWithTax=${amount}`);
};

export const sendAnalyticsEvent = async (event: AnalyticsEvent) => {
  try {
    const res = await fetchData("POST", SEQURA_EVENTS_URL, {
      ...event,
      timestamp: new Date().toISOString(),
    });
    return res;
  } catch (e) {
    console.warn("Event logging failed", e);
  }
};
