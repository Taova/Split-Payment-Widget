import { SEQURA_EVENTS_URL, CREDIT_AGREEMENT_URL } from "../constants";
import type { HttpMethod, FetchResult, EventProps } from "../types";

const fetchData = async <T = any>(
  method: HttpMethod,
  url: string,
  body?: any,
): Promise<FetchResult<T>> => {
  try {
    const response = await fetch(url, {
      method,
      headers: { "Content-Type": "application/json" },
      ...(body && { body: JSON.stringify(body) }),
    });

    return response.json();
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
) => {
  // handle errors?
  return await fetchData("GET", `${url}?totalWithTax=${amount}`);
};

export const logEvent = async (payload: EventProps) => {
  try {
    const res = await fetchData("POST", SEQURA_EVENTS_URL, payload);
    return res;
  } catch {}
};
