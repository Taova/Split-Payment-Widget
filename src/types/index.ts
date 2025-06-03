export type { HttpMethod, AnalyticsEvent } from "./api";
export type { CreditInfo } from "./creditData";

export type WidgetRef = {
  updatePrice: (price: number) => void;
};