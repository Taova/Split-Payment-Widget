import { useEffect, useState } from "react";
import { fetchCreditAgreement, sendAnalyticsEvent } from "../api";
import { EVENT_CONTEXT, EVENT_TYPE } from "../constants";
import type { CreditInfo, AnalyticsEvent } from "../types";

const useCreditAgreements = (price: number) => {
  const [selectedAgreement, setSelectedAgreement] = useState<CreditInfo | null>(
    null,
  );
  const [agreements, setAgreements] = useState<CreditInfo[] | null>(null);
  const [error, setError] = useState<null | string>(null);

  useEffect(() => {
    if (!price || price <= 0) return;

    async function getCreditTerms() {
      try {
        const response = await fetchCreditAgreement(price);

        if (response.length === 0) {
          throw new Error("No credit agreements returned");
        }

        setAgreements(response);
        setSelectedAgreement(response[0]);
      } catch (e: unknown) {
        const message = e instanceof Error ? e.message : String(e);
        setError(message);

        const event: AnalyticsEvent = {
          context: EVENT_CONTEXT.INSTALLMENT_WIDGET,
          type: EVENT_TYPE.LOAD_ERROR,
          errorType: "credit_agreements_fetch",
          totalWithTax: price,
          // TODO: Add the following props in the next iteration
          // to identify sources

          // companyId: string,
          // userId: string,
        };

        sendAnalyticsEvent(event);
      }
    }

    getCreditTerms();
  }, [price]);

  return {
    agreements,
    selectedAgreement,
    error,
    setSelectedAgreement,
  };
};

export default useCreditAgreements;
