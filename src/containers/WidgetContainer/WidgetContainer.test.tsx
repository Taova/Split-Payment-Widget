import { render, screen, waitFor } from "@testing-library/react";
import { createRef, act } from "react";
import { sendAnalyticsEvent } from "../../api";
import { MIN_PRICE_CENTS } from "../../constants";
import useCreditAgreements from "../../hooks/useCreditAgreements";
import App from "../../App";
import WidgetContainer from ".";
import type { WidgetRef } from "../../types";

jest.mock("../../hooks/useCreditAgreements", () => ({
  __esModule: true,
  default: jest.fn(),
}));

jest.mock("../../api", () => ({
  __esModule: true,
  fetchCreditAgreement: jest.fn(),
  sendAnalyticsEvent: jest.fn(),
}));

const mockAgreements = [
  {
    instalment_count: 3,
    total_with_tax: {
      value: 29999,
      string: "299,99 €",
    },
    instalment_amount: {
      value: 9999,
      string: "99,99 €",
    },
    instalment_fee: {
      value: 500,
      string: "5 €",
    },
    instalment_total: {
      value: 10499,
      string: "104,99 €",
    },
    grand_total: {
      value: 31499,
      string: "314,99 €",
    },
    cost_of_credit: {
      value: 1500,
      string: "15 €",
    },
    cost_of_credit_pct: {
      value: 600,
      string: "6,00 %",
    },
    apr: {
      value: 2500,
      string: "25 %",
    },
    max_financed_amount: {
      value: 200000,
      string: "2000 €",
    },
  },
  {
    instalment_count: 6,
    total_with_tax: {
      value: 29999,
      string: "299,99 €",
    },
    instalment_amount: {
      value: 4999,
      string: "49,99 €",
    },
    instalment_fee: {
      value: 500,
      string: "5 €",
    },
    instalment_total: {
      value: 5499,
      string: "54,99 €",
    },
    grand_total: {
      value: 32999,
      string: "329,99 €",
    },
    cost_of_credit: {
      value: 3000,
      string: "30 €",
    },
    cost_of_credit_pct: {
      value: 600,
      string: "6,00 %",
    },
    apr: {
      value: 2500,
      string: "25 %",
    },
    max_financed_amount: {
      value: 200000,
      string: "2000 €",
    },
  },
  {
    instalment_count: 12,
    total_with_tax: {
      value: 29999,
      string: "299,99 €",
    },
    instalment_amount: {
      value: 2499,
      string: "24,99 €",
    },
    instalment_fee: {
      value: 500,
      string: "5 €",
    },
    instalment_total: {
      value: 2999,
      string: "29,99 €",
    },
    grand_total: {
      value: 35999,
      string: "359,99 €",
    },
    cost_of_credit: {
      value: 6000,
      string: "60 €",
    },
    cost_of_credit_pct: {
      value: 600,
      string: "6,00 %",
    },
    apr: {
      value: 2500,
      string: "25 %",
    },
    max_financed_amount: {
      value: 200000,
      string: "2000 €",
    },
  },
];

const mockSetSelectedAgreement = jest.fn();

describe("WidgetContainer", () => {
  const mockedHook = useCreditAgreements as jest.MockedFunction<
    typeof useCreditAgreements
  >;

  mockedHook.mockReturnValue({
    agreements: mockAgreements,
    error: null,
    setSelectedAgreement: mockSetSelectedAgreement,
    selectedAgreement: mockAgreements[1],
  });

  it("renders selectedAgreement instalment", async () => {
    render(<WidgetContainer price={30000} />);
    await waitFor(() => {
      expect(screen.getByText(/6 cuotas de 54,99 €\/mes/i)).toBeInTheDocument();
    });
  });

  it("does not render Widget when there is an error", () => {
    (useCreditAgreements as jest.Mock).mockReturnValue({
      agreements: null,
      selectedAgreement: null,
      setSelectedAgreement: jest.fn(),
      error: "something went wrong",
    });

    render(<WidgetContainer price={30000} />);

    expect(
      screen.queryByRole("button", { name: /cuotas de/i }),
    ).not.toBeInTheDocument();
  });

  it("updates UI when updatePrice is called imperatively", async () => {
    const mockSetSelectedAgreement = jest.fn();

    // First state: price = 30000
    const firstAgreements = [
      {
        ...mockAgreements[1],
        instalment_count: 6,
        instalment_total: { value: 5499, string: "54,99 €" },
      },
    ];

    // Second state: price = 60000
    const secondAgreements = [
      {
        ...mockAgreements[1],
        instalment_count: 6,
        instalment_total: { value: 8999, string: "89,99 €" },
      },
    ];

    // Mock hook return values sequentially
    (useCreditAgreements as jest.Mock)
      .mockReturnValueOnce({
        agreements: firstAgreements,
        selectedAgreement: firstAgreements[0],
        setSelectedAgreement: mockSetSelectedAgreement,
        error: null,
      })
      .mockReturnValueOnce({
        agreements: secondAgreements,
        selectedAgreement: secondAgreements[0],
        setSelectedAgreement: mockSetSelectedAgreement,
        error: null,
      });

    // Create a ref to control the component from outside
    const ref = createRef<WidgetRef>();

    // Render the App with initial price
    render(<App ref={ref} initialPrice={30000} />);

    // Assert the first UI state is rendered
    expect(await screen.findByText(/6 cuotas de 54,99/i)).toBeInTheDocument();

    // Trigger price update imperatively via ref
    act(() => {
      ref.current?.updatePrice(60000);
    });

    // Assert the updated UI is rendered
    expect(await screen.findByText(/6 cuotas de 89,99/i)).toBeInTheDocument();
  });

  it("sends analytics event when credit agreement loading fails", async () => {
    const mockSetSelectedAgreement = jest.fn();

    (useCreditAgreements as jest.Mock).mockReturnValue({
      agreements: null,
      selectedAgreement: null,
      setSelectedAgreement: mockSetSelectedAgreement,
      error: "credit_agreements_fetch_error",
    });

    render(<WidgetContainer price={30000} />);

    expect(sendAnalyticsEvent).toHaveBeenCalledWith(
      expect.objectContaining({
        context: "installment-widget",
        type: "load-error",
        errorType: "credit_agreements_fetch",
        totalWithTax: 30000,
      }),
    );
  });

  it("does not render Widget if no agreements are available", () => {
    const mockSetSelectedAgreement = jest.fn();

    (useCreditAgreements as jest.Mock).mockReturnValue({
      agreements: [],
      selectedAgreement: null,
      setSelectedAgreement: mockSetSelectedAgreement,
      error: null,
    });

    render(<WidgetContainer price={30000} />);

    expect(
      screen.queryByRole("button", { name: /cuotas de/i }),
    ).not.toBeInTheDocument();
  });

  it("does not render widget if price is less then MIN_PRICE_CENTS", async () => {
    const mockSetSelectedAgreement = jest.fn();

    (useCreditAgreements as jest.Mock).mockReturnValue({
      agreements: mockAgreements,
      selectedAgreement: mockAgreements[0],
      setSelectedAgreement: mockSetSelectedAgreement,
      error: null,
    });

    render(<WidgetContainer price={MIN_PRICE_CENTS - 1} />);

    await waitFor(() => {
      expect(screen.queryByRole("button")).not.toBeInTheDocument();
    });
  });
});
