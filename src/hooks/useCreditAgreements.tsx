import { useEffect, useState } from "react";
import { fetchCreditAgreement, logEvent } from "../api";
import type { CreditInfo, EventProps } from "../types";

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

        const event: EventProps = {
          context: "splitPayWidget",
          type: "fetchingError",
          company: "companyID",
        };

        logEvent(event);
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
