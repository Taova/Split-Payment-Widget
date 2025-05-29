import { useEffect, useState } from "react";
import type { CreditInfo } from "../../types";
import CustomSelect from "../CustomSelect";
import InfoModal from "../InfoModal";
import useFetchCredentialInfo from "../../hooks/useFetchCredentialInfo";

import { logEvent } from "../../api";

interface Props {
  price: number;
}

const Widget: React.FC<Props> = ({ price }) => {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const { plans, selectedPlan, error, setSelectedPlan } =
    useFetchCredentialInfo(price);

  if (error || !plans || !selectedPlan) {
    console.log(error, "error");
    return null;
  }

  return (
    <div className="border rounded-md px-4 py-3 shadow-sm bg-white">
      <div className="flex justify-between text-sm font-medium text-gray-700 mb-2">
        <span>Págalo en</span>
        <button
          type="button"
          onClick={() => setIsOpen(true)}
          className="text-blue-600 hover:underline focus:outline-none cursor-pointer bg-transparent border-0 p-0"
        >
          Más info
        </button>
      </div>
      <CustomSelect
        plans={plans}
        selectedPlan={selectedPlan}
        setSelectedPlan={setSelectedPlan}
      />
      <InfoModal
        fee={selectedPlan.instalment_fee.string}
        isOpen={isOpen}
        onCloseModal={() => setIsOpen(false)}
      />
    </div>
  );
};

export default Widget;
