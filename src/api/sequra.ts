import { SEQURA_EVENTS_URL, CREDIT_AGREEMENT_URL } from "../constants";
import type { HttpMethod, EventProps, CreditInfo } from "../types";

const fetchData = async <T>(
  method: HttpMethod,
  url: string,
  body?: unknown,
): Promise<T> => {
  try {
    const options: RequestInit = {
      method,
      headers: { "Content-Type": "application/json" },
    };

    if (body !== undefined) {
      options.body = JSON.stringify(body);
    }

    const response = await fetch(url, options);

    if (!response.ok) {
      throw new Error(`HTTP error: ${response.status}`);
    }

    const data: T = await response.json();

    return data;
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

export const logEvent = async (payload: EventProps) => {
  try {
    const res = await fetchData("POST", SEQURA_EVENTS_URL, payload);
    return res;
  } catch (e) {
    console.warn("Event logging failed", e);
  }
};
