import { useEffect, useState } from "react";
import type { CreditInfo, EventProps } from "../types";

import { fetchCreditAgreement, logEvent } from "../api";

const useFetchCredentialInfo = (price: number) => {
  const [selectedPlan, setSelectedPlan] = useState<CreditInfo | null>(null);
  const [plans, setPlans] = useState<CreditInfo[] | null>(null);

  // TODO: specify error
  const [error, setError] = useState<null | string>(null);

  useEffect(() => {
    async function getCreditTerms() {
      try {
        const data = await fetchCreditAgreement(price);
        console.log(data, "data");
        setPlans(data);

        if (data.length === 0) {
          throw new Error("Empty credential agreement");
        }

        setSelectedPlan(data[0]);
      } catch (e) {
        setError(e);
        const event: EventProps = {
          context: "splitPayWidget",
          type: "fetchingError",
          company: "companyID",
        };

        logEvent(event);
      }
    }

    getCreditTerms();
  }, []);

  return {
    plans,
    selectedPlan,
    error,
    setSelectedPlan,
  };
};

export default useFetchCredentialInfo;
