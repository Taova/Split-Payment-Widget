import { renderHook, act, waitFor } from "@testing-library/react";
import useCreditAgreements from "./useCreditAgreements";
import { fetchCreditAgreement } from "../api";

jest.mock("../api", () => ({
  __esModule: true,
  fetchCreditAgreement: jest.fn(),
  sendAnalyticsEvent: jest.fn(),
}));

const mockAgreements = [
  {
    instalment_count: 3,
    total_with_tax: { value: 29999, string: "299,99 €" },
    instalment_amount: { value: 9999, string: "99,99 €" },
    instalment_fee: { value: 500, string: "5 €" },
    instalment_total: { value: 10499, string: "104,99 €" },
    grand_total: { value: 31499, string: "314,99 €" },
    cost_of_credit: { value: 1500, string: "15 €" },
    cost_of_credit_pct: { value: 600, string: "6,00 %" },
    apr: { value: 2500, string: "25 %" },
    max_financed_amount: { value: 200000, string: "2000 €" },
  },
  {
    instalment_count: 6,
    total_with_tax: { value: 29999, string: "299,99 €" },
    instalment_amount: { value: 4999, string: "49,99 €" },
    instalment_fee: { value: 500, string: "5 €" },
    instalment_total: { value: 5499, string: "54,99 €" },
    grand_total: { value: 32999, string: "329,99 €" },
    cost_of_credit: { value: 3000, string: "30 €" },
    cost_of_credit_pct: { value: 600, string: "6,00 %" },
    apr: { value: 2500, string: "25 %" },
    max_financed_amount: { value: 200000, string: "2000 €" },
  },
  {
    instalment_count: 12,
    total_with_tax: { value: 29999, string: "299,99 €" },
    instalment_amount: { value: 2499, string: "24,99 €" },
    instalment_fee: { value: 500, string: "5 €" },
    instalment_total: { value: 2999, string: "29,99 €" },
    grand_total: { value: 35999, string: "359,99 €" },
    cost_of_credit: { value: 6000, string: "60 €" },
    cost_of_credit_pct: { value: 600, string: "6,00 %" },
    apr: { value: 2500, string: "25 %" },
    max_financed_amount: { value: 200000, string: "2000 €" },
  },
];

describe("useCreditAgreements", () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  it("loads agreements and sets selectedAgreement on success", async () => {
    (fetchCreditAgreement as jest.Mock).mockResolvedValueOnce(mockAgreements);

    const { result } = renderHook(() => useCreditAgreements(30000));

    await waitFor(() => {
      expect(result.current.agreements).not.toBeNull();
    });

    expect(result.current.agreements).toEqual(mockAgreements);
    expect(result.current.selectedAgreement).toEqual(mockAgreements[0]);
    expect(result.current.error).toBeNull();
  });

  it("does nothing if price is 0", () => {
    const { result } = renderHook(() => useCreditAgreements(0));

    expect(result.current.agreements).toBeNull();
    expect(result.current.selectedAgreement).toBeNull();
    expect(result.current.error).toBeNull();
  });

  it("allows manually changing selectedAgreement", async () => {
    (fetchCreditAgreement as jest.Mock).mockResolvedValueOnce(mockAgreements);

    const { result } = renderHook(() => useCreditAgreements(30000));

    await waitFor(() => {
      expect(result.current.selectedAgreement).toEqual(mockAgreements[0]);
    });

    act(() => {
      result.current.setSelectedAgreement(mockAgreements[2]);
    });

    expect(result.current.selectedAgreement).toEqual(mockAgreements[2]);
  });
});
